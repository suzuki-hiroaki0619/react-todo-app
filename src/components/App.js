import React, {  useRef } from "react";
import { Container, Flex} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons"
import { useTodo } from "../hooks/useTodo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";
//import { updateTodoData } from "../apis/todos";
//import { isOver } from "../hooks/useTodo";

/*  TodoTitle コンポーネントへ　*/
// const TodoTitle = ({ title, as }) => {
//   if (as === "h1") return <h1>{title}</h1>;
//   if (as === "h2") return <h2>{title}</h2>;
//    return <p>{title}</p>;
// };

/* TodoItem コンポーネントへ　*/
// const TodoItem = 
// ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
//   const handleToggleTodoListItemStatus=
//   () => toggleTodoListItemStatus( todo.id, todo.done);
//   const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);
//   return (
//     <li>
//       {todo.content}
//       <button onClick={ handleToggleTodoListItemStatus }>
//         {todo.done ? "未完了リストへ":"完了リストへ"}
//       </button>
//       <button onClick={handleDeleteTodoListItem}>
//         削除</button>
//     </li>
//   );
// };

/* TodoList　コンポーネントへ */
// const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem
// }) => {
//   return (
//     <ul>
//       {todoList.map((todo) => (
//         <TodoItem 
//         todo={todo} 
//         key={todo.id}
//         toggleTodoListItemStatus={toggleTodoListItemStatus}
//         deleteTodoListItem={deleteTodoListItem}
//         />
//       ))}
//     </ul>
//   );
// };

/* TodoAdd コンポーネントへ　*/
// const TodoAdd = ({ inputEl, handleAddTodoListItem}) => {
//   return (
//     <>
//     <textarea ref={ inputEl } />
//     <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
//     </>
//   );
// };

function App (){
  const { 
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
    updateTodoListItem,
  } = useTodo();

  const inputEl = useRef(null);

  const dateInputEl = useRef(null);

  const categoryInputEl = useRef(null);


  const handleAddTodoListItem = (status, comment) => {
    if (inputEl.current.value === "") return;
    if (dateInputEl.current.value === "") return;
    if (categoryInputEl.current.value === "") return;
    
    addTodoListItem(
      inputEl.current.value,
      dateInputEl.current.value,
      categoryInputEl.current.value,
      status,
      comment
    );
    inputEl.current.value = "";
    dateInputEl.current.value = "";
    categoryInputEl.current.value = "";
  };

  //const [ todoList, setTodoList] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(todoDataUrl);
  //     setTodoList(response.data);
  //   };
  //   fetchData();
  // },[]);

  //console.log("TODOリスト：", todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });
  // console.log("未完了TODOリスト:",completedList);

  return (
    <Container centerContent p={{ base: "4", md: "6" }} maxWidth="7xl">
    <TodoTitle 
      title="TODO進捗管理" 
      as="h1"
      fontSize={{ base: "2xl", md: "3xl"
      }} />
    <TodoAdd 
      placeholder=" ADD TODO"
      leftIcon={<AddIcon />}
      buttonText="+ TODOを追加"
      inputEl={ inputEl }
      dateInputEl={dateInputEl}
      categoryInputEl={categoryInputEl}      
      handleAddTodoListItem={handleAddTodoListItem} 
    />
    <Flex
      w="100"
      gap="6"
      align="flex-start"
      direction={{ base: "column", lg: "row"}}
    >
    <TodoList
      todoList={inCompletedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
      updateTodoListItem={updateTodoListItem}
      categoryInputEl={categoryInputEl}
      title="未完了TODOリスト" 
      as="h2" 
      fontSize={{ base: "xl", md: "2xl"}}
    />
    <TodoList 
      todoList={completedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
      updateTodoListItem={updateTodoListItem}
      categoryInputEl={categoryInputEl}
      title="完了TODOリスト" 
      as="h2"
      fontSize={{ base: "xl", md: "2xl"}}
    />
      </Flex>
    </Container>
  );
}

export default App;
