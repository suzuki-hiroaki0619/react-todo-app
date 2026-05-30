import axios from "axios";

const todoDataUrl = "https://react-todo-app-j616.onrender.com/todos";

export const getAllTodosData = async () =>{
 const response = await axios.get(todoDataUrl);
  return response.data;
};

export const addTodoData = async ( todo ) => {
 const response = await axios.post(todoDataUrl, todo);
   return response.data;
};

export const deleteTodoData = async (id) => {
    await axios.delete(`${todoDataUrl}/${id}`);
    return id;
};

export const updateTodoData = async ( id, todo ) => {
    const reponse = await axios.put(`${todoDataUrl}/${id}`, todo);
    return reponse.data;
};

// export default function TodoApp () {

// }
