const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

cron.schedule("1 7 * *  *", async () => {
  console.log("９時の未完了タスク通知チェック");

  try {
    const response = await axios.get("http://localhost:3100/todos");
    const todos = response.data;

    const today = new Date().toISOString().slice(0, 10);

    const overdueTodos = todos.filter (
      (todo) => todo.done === false && todo.date < today
    );

    const incompleteTodos = todos.filter (
      (todo) => todo.done === false && (!todo.date || todo.date >= today)
    );

    console.log("今日", today);
    console.log("期限切れ", overdueTodos);
    console.log("未完了", incompleteTodos);

     for (const todo of overdueTodos) {
      const slackResponse = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `🚨 期限切れタスクがあります\nタスク: ${todo.content}\n期限: ${todo.date}`,
        }),
      });
      console.log("期限切れ Slack:", slackResponse.status);
    }

      for (const todo of incompleteTodos) {
      const slackResponse = await fetch(process.env.SLACK_WEBHOOK_URL, {
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
      console.log("未完了 Slack:", slackResponse.status);
    }
} catch (error) {
  console.log("タスク取得エラー:", error.message);
 }
},
{
  timezone: "Asia/Tokyo",
}
);

app.post("/slack-notify", async (req, res) => {
  const { content, date } =req.body;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Cpntent-Type": "application/json",
    },
    body: JSON.stringify({
      text: `⚠️タスク通知\nタスク: ${content}\n 期限: ${date || "期限なし"}`,
    }),
  });
  res.json({ message: "Slack通知しました"});
});

// app.get("/test-slack", async (req, res) => {
//   const slackResponse = await fetch(process.env.SLACK_WEBHOOK_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       text: "✅ Slack通知テストです",
//     }),
//   });

//   res.json({
//     message: "テスト通知しました",
//     status: slackResponse.status,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});