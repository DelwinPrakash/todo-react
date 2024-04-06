import React from "react";
import items from "./todoItems"
import { useState } from "react";
import Header from "./Header";

const list = JSON.parse(localStorage.getItem('todoItem'));
let keyID = 0;
export default function AddTodo(){

    const [item, setItem] = useState({
        todo: ""
    });    

    const [todoItem, setTodoItem] = useState(list || items);

    function getToDo(event){
        const {name, value} = event.target;
        setItem((prevItem) => {
            return {
                ...prevItem,
                [name]: value
            }
        });
    }
    
    function addToDo(){
        if(item.todo !== ""){
            keyID = todoItem[todoItem.length - 1] ? (todoItem[todoItem.length - 1].id) + 1 : 0
            const newItem = {
                id: keyID,
                todo: item.todo
            };
            setTodoItem(prevItem => {
                localStorage.setItem('todoItem', JSON.stringify([...prevItem, newItem]));
                setItem({
                    todo: ""
                });
                // document.querySelector(".input-bar").textContent = "Hello";
                return [...prevItem, newItem];
            });
        }
    }

    function deleteItem(id){
        if(todoItem.length === 0){
            keyID = 0;
        }
        const list = todoItem.filter(item => {
            return item.id !== id;
        });
        setTodoItem(list);
        localStorage.setItem('todoItem', JSON.stringify(list));
    }

    function addTodo(event){
        if(event.key === "Enter"){
            addToDo();
        }
    }
    return (
        <main>
            <Header/>
            <div className="input-field">
                <input onChange={getToDo} onKeyUp={addTodo} className="input-bar" name="todo" placeholder="Enter new item..."/>
                <button onClick={addToDo} className="add-item">Add</button>
            </div><br/>
            <div className="main-container">
                {todoItem.map(item => {
                    return (
                            <div className="child-container" key={item.id}>
                                <p className="todo-description">{item.todo}</p>
                                <button onClick={() => deleteItem(item.id)} className="delete-btn">Delete</button>
                            </div>
                    );
                })}
            </div>
            {todoItem.length > 0 ? "" : <h3 className="isEmpty">LIST IS EMPTY!</h3>}
        </main>
    );
}