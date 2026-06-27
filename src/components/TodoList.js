import { TodoTitle } from "./TodoTitle";
import { TodoItem } from "./TodoItem";
import { List, Box } from "@chakra-ui/react"

 export const TodoList = ({ 
    title,
    as,
    fontSize,
    todoList,
    toggleTodoListItemStatus,
    deleteTodoListItem,
    updateTodoListItem,
 }) => {
  return (
     <Box flex="1" w="100%">
     {todoList.length !== 0 && (
        <>
        <TodoTitle title={title} as={as} fontSize={fontSize} mt="12" />
        <List w="full">
            {todoList.map((todo) => (
        <TodoItem 
        todo={todo} 
        key={todo.id}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        updateTodoListItem={updateTodoListItem}
        />
         ))}
        </List>
        </>
     )}
     </Box>
  );
};
