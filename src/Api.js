import { useCallback, useEffect, useState } from "react";

const URL = "http://127.0.0.1:5000/tasks/";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await fetch(URL);
            const data = await response.json();
            console.log(data);
            setTasks(data.filter(({ title }) => Boolean(title)));
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, setTasks };
}

export const useTaskActions = () => {
    const markAsDone = useCallback(async (id) => {
        try {
            const response = await fetch(`${URL}${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ done: true }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            alert(error);
        }
    }, []);

    const markAsTodo = useCallback(async (id) => {
        try {
            const response = await fetch(`${URL}${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ done: false }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            alert(error);
        }
    }, []);

    const deleteTask = useCallback(async (id) => {
        try {
            await fetch(`${URL}${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            alert(error);
        }
    }, []);

    const createTask = useCallback(async (task) => {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        return data;
    }, []);

    return { markAsDone, markAsTodo, deleteTask, createTask };
}

export const useTodos = () => {
    const { tasks, loading, setTasks } = useTasks();
    const { markAsDone, markAsTodo, deleteTask, createTask } = useTaskActions();

    const setAsDone = async (id) => {
        const updatedTask = await markAsDone(id);
        setTasks((tasks) =>
            tasks.map((task) => (task.id === id ? updatedTask : task))
        );
    };

    const setAsTodo = async (id) => {
        const updatedTask = await markAsTodo(id);
        setTasks((tasks) =>
            tasks.map((task) => (task.id === id ? updatedTask : task))
        );
    };

    const removeTask = useCallback(
        async (id) => {
            await deleteTask(id);
            setTasks((tasks) => tasks.filter((task) => task.id !== id));
        },
        [deleteTask, setTasks]
    );

    const creationTask = async (task) => {
        const newTask = await createTask(task);
        setTasks([newTask, ...tasks]);
    };

    return {
        tasks,
        loading,
        creationTask,
        setAsDone,
        setAsTodo,
        removeTask,
    };
};
