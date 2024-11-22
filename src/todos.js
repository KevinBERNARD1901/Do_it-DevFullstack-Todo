import React, { useState } from "react";
import {useTodos} from "./Api";
import { TodoItem } from "./todoItem";

export const Todos = () => {
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {
        tasks,
        loading,
        creationTask,
        setAsDone,
        setAsTodo,
        removeTask,
    } = useTodos();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            setErrorMessage("Title is required");
            setTimeout(() => setErrorMessage(""), 2000);
            return;
        }
        creationTask({ title });
        setTitle("");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 style={{textAlign: "center"}}>Tasks</h1>
            <div className="task-container">
                {tasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        setAsDone={setAsDone}
                        setAsTodo={setAsTodo}
                        removeTask={removeTask}
                    />
                ))}
            </div>
            <form className="task-form" onSubmit={ handleSubmit }>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="task-input" placeholder="Enter task title" />
                <button type="submit" className="task-button">Create task</button>
            </form>    
            {errorMessage && <p className="error-message">{errorMessage}</p>}       
        </>
    );
};