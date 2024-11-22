import { useState } from "react";

export const TodoItem = ({ task, setAsDone, setAsTodo, removeTask }) => {
    let color = task.done ? "darkgreen" : "black";
    let backgroundColor = task.done ? "lightgreen" : "lightgrey";

    return(
        <div className="todo-item" style={{ color: color, backgroundColor: backgroundColor }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="button-container">
                <button className="done" onClick={() => setAsDone(task.id)}>Done</button>
                <button className="todo" onClick={() => setAsTodo(task.id)}>Todo</button>
                <button className="remove" onClick={() => removeTask(task.id)}>Delete</button>
            </div>
        </div>
    );
}