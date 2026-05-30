const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const jsonServer = require("json-server");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// json-server
const router = jsonServer.router("db.json");
app.use("/api", router);

// Slack通知API
app.post("/slack-notify", async (req, res) => {
  const { content, date } = req.body;

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `⚠️タスク通知\nタスク: ${content}\n期限: ${date || "期限なし"}`,
      }),
    });

    res.json({ message: "Slack通知しました" });
  } catch (error) {
    res.status(500).json({ error: "Slack通知に失敗しました" });
  }
});

// 毎日9時に未完了タスク通知
cron.schedule(
  "0 9 * * *",
  async () => {
    console.log("9時の未完了タスク通知チェック");

    try {
      const response = await axios.get(`http://localhost:${PORT}/api/todos`);
      const todos = response.data;

      const today = new Date().toISOString().slice(0, 10);

      const overdueTodos = todos.filter(
        (todo) => todo.done === false && todo.date && todo.date < today
      );

      const incompleteTodos = todos.filter(
        (todo) => todo.done === false && (!todo.date || todo.date >= today)
      );

      for (const todo of overdueTodos) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: `🚨 期限切れタスクがあります\nタスク: ${todo.content}\n期限: ${todo.date}`,
          }),
        });
      }

      for (const todo of incompleteTodos) {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: `⚠️ 未完了タスクがあります\nタスク: ${todo.content}\n期限: ${
              todo.date || "期限なし"
            }`,
          }),
        });
      }
    } catch (error) {
      console.log("タスク取得エラー:", error.message);
    }
  },
  {
    timezone: "Asia/Tokyo",
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
