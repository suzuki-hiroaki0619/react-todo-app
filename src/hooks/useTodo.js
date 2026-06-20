import { useState, useEffect } from "react";
import { ulid } from "ulid";
import * as todoData from "../apis/todos";

export const useTodo = () => {
    const [ todoList, setTodoList ] = useState([]);
    useEffect (() => {
        todoData.getAllTodosData().then(( todo ) => {
            setTodoList([...todo].reverse());
        });
    },[]);

    const toggleTodoListItemStatus = ( id, done ) => {
        const todoItem = todoList.find((itme) => itme.id === id);
        const newTodoItem = { ...todoItem, done: !done };

        todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
           const newTodoList = todoList.map((item) => 
            item.id !== updatedTodo.id ? item : updatedTodo
        );
        setTodoList(newTodoList);
        });
    };

    const addTodoListItem = (todoContent, todoDate, category, comment) => {
        const newTodoItem = {
            content: todoContent,
            date: todoDate,
            category: category,
            id: ulid(),
            done: false,
            comment: comment || "",
        };

        return todoData.addTodoData(newTodoItem).then((addTodo) => {
            setTodoList([addTodo, ...todoList]);
        });
    };

    const deleteTodoListItem = (id) => {
        todoData.deleteTodoData(id).then((deleteListItemId) => {
            const newTodoList = todoList.filter(
                (item) => item.id !== deleteListItemId
            );
            setTodoList(newTodoList);
        });
    };

    const updateTodoListItem = ( id, content, date, category, status) => {
        const todoItem = todoList.find((item) => item.id === id );

        const newTodoItem = {
            ...todoItem,
            content,
            date,
            category,
            status: category === "仕事" ? status : "",
            comment,
        };

        todoData.updateTodoData( id, newTodoItem).then((updatedTodo) => {
          const newTodoList = todoList.map((item) =>
            item.id === updatedTodo.id ? updatedTodo : item
        );
        setTodoList(newTodoList);
        });    
    } ;

   

    return {
        todoList,
        toggleTodoListItemStatus,
        addTodoListItem,
        deleteTodoListItem,
        updateTodoListItem,
    };
};

 export const isOver = (todoDate) => {
    const today = new Date();


    const todayString =
       today.getFullYear() +
       "-" +
       String(today.getMonth() +1).padStart(2, "0") +
       "-" +
       String(today.getDate()).padStart(2, "0");

    return todoDate < todayString;

    };
