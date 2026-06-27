import { useState } from "react";
import {  Box, Text, Flex, Button, IconButton, Input, Textarea, Select }
   from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { isOver } from "../hooks/useTodo";


export const TodoItem = ({ 
    todo,
    index,
    toggleTodoListItemStatus,
    deleteTodoListItem,
    updateTodoListItem,
}) => {
    const [ isEditing, setIsEditing] = useState(false);
    const [ editContent, setEditContent] = useState(todo.content);
    const [ editDate, setEditDate] = useState(todo.date || "");
    const [ editCategory, setEditCategory] = useState(todo.category || ""); 
    const [ editStatus, setEditStatus] = useState(todo.status || "未着手");
    const [editComment, setEditComment] = useState(todo.comment || "");

    const handleToggleTodoListItemStatus= () => 
      toggleTodoListItemStatus( todo.id, todo.done);

    const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

    const notifySlack = async (todo) =>{
        await fetch("http://localhost:4000/slack-notify",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: todo.content,
                date: todo.date
            }),
        });
    };
    

    const handleSave = () => {
        if (editContent === "") return;

        updateTodoListItem( todo.id, editContent, editDate, editCategory, editStatus, editComment);
        setIsEditing(false);
    };

    const label = todo.done ? "未完了リストへ" : "完了リストへ";
    const setColorScheme = todo.done ? "pink" : "blue";

  return (
    <Box
      borderWidth="1px"
      p="4"
      mt="4"
      bg={isOver(todo.date) ? "red.100": "white"}
      borderRadius="md"
      borderColor={isOver(todo.date) ? "red.400" : "gray.300"}
      w="100%"
    >
      { isEditing ? (
        <>
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          mb="3"
          />
        <Input
          type="date"
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
          mb="3"
        />  
        <Textarea
          value={editComment}
          onChange={(e) => setEditComment(e.target.value)}
          placeholder="コメントを入力"
          mb="3"
        />     
        <Select 
          value={editCategory}
          onChange={ (e) => setEditCategory(e.target.value)}
          md="3"
          >
          <Select 
          value={editStatus}
          onClick={ (e) => setEditStatus(e.target.value)}
          md="3"
          ></Select>  
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
          </Select>
        {todo.category === "仕事" && (
          <p>ステート: {todo.status || "未着手"}</p>
        )}

        {editCategory === "仕事" && (
  <Select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
    <option value="未着手">未着手</option>
    <option value="作業中">作業中</option>
    <option value="確認中">確認中</option>
  </Select>
)}
        </>
      ) : (
        <>
         <div>
        <Text mb="2" fontWeight="bold">
         {index + 1}. {todo.content}
         </Text>
        <text fontSize="sm" color="gray.500">
            期限：{todo.date || "未設定"}
        </text>
                  {isOver(todo.date) && (
                    <Text color="red.600" fontWeight="bold" mt="1">期限超過</Text>
                  )}
       </div>
        <Text fontSize="sm" color="purple.500">
            カテゴリー : {todo.category || "未設定"}
        </Text>
        <Text fontSize="sm" color="purple.500">
            ステート : {todo.status || "未設定"}
        </Text>
       {todo.comment && (
       <Text fontSize="sm" 
             color="gray.600"
             mt="2"
             whiteSpace="pre-wrap"
         >
        コメント : 
        {`コメント：\n${todo.comment}`}
        </Text>
)}
        </>
      )}
       <Button
             colorScheme="red"
             size="sm"
             onClick={() => notifySlack(todo)}
           >
             Slack通知
           </Button>

      <Flex align="center" justify="flex-end" gap="2" mt="4">
        { isEditing ? (
            <IconButton
              icon={<CheckIcon />}
              colorScheme="green"
              aria-label="save"
              onClick={handleSave}
            />
        ) : (
            <IconButton
               icon={<EditIcon />}
               colorScheme="yellow"
               aria-label="edit"
               onClick={() => setIsEditing(true)}
            />
        )}

        <Button
          colorScheme={setColorScheme}
          variant="outline"
          size="sm"
          onClick={handleToggleTodoListItemStatus}
          >
            {label}
          </Button>
          <IconButton
            icon={<DeleteIcon />}
            variant="unstyled"
            aria-label="delete"
            onClick={handleDeleteTodoListItem}
           /> 
      </Flex>  
    </Box>
  );
};
