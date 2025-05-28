"use client";

import React, { useEffect } from "react";
import { useState } from "react";

const HomePage = () => {
    const [todos, setTodo] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const limit = 10;
    const data = async () => {
        // await fetch("https://jsonplaceholder.typicode.com/todos")
        //     .then((response) => response.json())
        //     .then((data) => setTodo(data));
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos"
            );
            const todoss = await response.json();
            setSpinner(false);
            setTodo(todoss.filter((todo) => todo.id <= limit));
        } catch (error) {
            // Handle network errors or other issues during the fetch or JSON parsing
            console.error("Error fetching data:", error);
            // You might also want to set an error state here, e.g., setError(true);
        }
    };
    useEffect(() => {
        // Fetch data when the component mounts
        data();
    }, []); //An empty array ([]) signifies that the effect should only run once after the initial render of the component.
    return (
        <div>
            <h1>Homepage</h1>
            {/* <button
                onClick={handleCount}
                className="bg-blue-800 px-10 py-2 my-10"
            >
                Add
            </button>
            <ul className="flex flex-wrap gap-2">
                {counts.map((count) => {
                    return <li key={count}>{count}</li>;
                })}
            </ul> */}
            {(spinner && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )) || (
                <ul className="flex flex-col flex-wrap gap-2">
                    {todos.map((todo) => {
                        if (todo.id <= limit) {
                            console.log(todo);
                            return (
                                <li
                                    key={todo.id}
                                    className="flex border p-2"
                                >
                                    {todo.title}
                                    <button
                                        className="bg-blue-800 px-2 py-1 ml-auto text-white"
                                        onClick={() => {
                                            setTodo(
                                                todos.filter(
                                                    (t) => t.id !== todo.id
                                                )
                                            );
                                        }}
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
            {todos.length == 0 && (
                <div className="flex justify-center items-center h-screen">
                    <button
                        onClick={() => {
                            data();
                        }}
                        className="bg-blue-800 px-10 py-2 my-10"
                    >
                        Fetch Data
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
