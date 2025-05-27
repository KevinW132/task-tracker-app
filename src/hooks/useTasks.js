import { useEffect, useState } from "react";
import { shouldShowToday } from "../utils/dateHelpers";

const TASKS_KEY = "task-tracker-tasks";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const tasksForToday = tasks.filter(shouldShowToday);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
        setTasks(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => {
        setTasks((prev) => [
            ...prev,
            { ...task, id: crypto.randomUUID(), done: false },
        ]);
    };

    const toggleTaskDone = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          done: !task.done,
                          lastDone: !task.done
                              ? new Date().toISOString()
                              : null,
                      }
                    : task
            )
        );
    };

    const deleteTaskDone = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    return { tasks: tasksForToday, addTask, toggleTaskDone, deleteTaskDone };
}
