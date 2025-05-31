"use client";

import React, { useEffect, useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [editingId, setEditingId] = useState(null);
    const addTodoItem = (item) => {
        setInputVal("");
        setTodos((todos) => [...todos, item]); // Add the new item to the todos array, spread array syntax is used to create a new array with the existing todos and the new item
    };
    const deleteItem = (id) => {
        console.log(id);
        setTodos((prevTodos) => prevTodos.filter((_, index) => index !== id)); // Filter out the item with the given id from the todos array
    };
    const editItem = (id) => {
        setInputVal(todos[id]);
        setUpdating(true);
        console.log("edit", todos);
        setEditingId(id);
    };
    const updateItem = (input) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo, index) => (index === editingId ? input : todo))
        ); // Update the item at the editingId with the new input value
        setInputVal("");
        setUpdating(false);
        setEditingId(null);
    };
    const cancelEdit = () => {
        setInputVal("");
        setUpdating(false);
        setEditingId(null);
    };
    return (
        <div className="flex justify-center h-screen py-40">
            <div className="_todo_wrap w-150 card bg-white shadow-md rounded-lg p-6 mt-4 mx-auto h-auto">
                <div className="_todo_title_wrap">
                    <h1 className="_todo_title text-3xl font-bold text-cyan-800 text-center">
                        Todo Builder
                    </h1>
                </div>
                <div className="_todo_input_wrap my-10">
                    <input
                        type="text"
                        placeholder="Enter your todo"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                    />
                    {(updating && (
                        <>
                            <button
                                onClick={() => {
                                    updateItem(inputVal);
                                }}
                                className="mt-4 w-20 cursor-pointer bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => {
                                    cancelEdit();
                                }}
                                className="mt-4 ms-2 w-20 cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Cancel
                            </button>
                        </>
                    )) || (
                        <button
                            onClick={() => {
                                addTodoItem(inputVal);
                            }}
                            className="mt-4 w-20 cursor-pointer bg-cyan-600 text-white p-2 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            Add
                        </button>
                    )}
                </div>
                <div className="_todo_list_wrap">
                    <ol className="list-inside space-y-2 list-decimal text-black">
                        {todos.map((todo, id) => {
                            return (
                                <li
                                    className="text-black flex gap-2 p-2 hover:bg-cyan-100 transition-colors duration-200 w-[100%] items-center justify-between"
                                    key={id}
                                >
                                    {todo}
                                    <div className="_todo_li_modify_wrap flex gap-2">
                                        <button
                                            onClick={() => editItem(id)}
                                            className="_todo_li_modify_btn cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteItem(id)}
                                            className="_todo_li_modify_btn cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Todo;
