import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useTasks(userId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ 1. Obtener tareas del usuario actual
    const fetchTasks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Error al obtener tareas:", error);
        } else {
            setTasks(data);
        }

        setLoading(false);
    };

    // ✅ 2. Hook para cargar al inicio
    useEffect(() => {
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    // Cargar tareas del usuario desde Supabase
    // useEffect(() => {
    //     if (!userId) return;

    //     const fetchTasks = async () => {
    //         const { data, error } = await supabase
    //             .from("tasks")
    //             .select("*")
    //             .eq("user_id", userId)
    //             .order("created_at", { ascending: false });

    //         if (error) console.error("Error fetching tasks:", error);
    //         else setTasks(data);
    //     };

    //     fetchTasks();
    // }, [userId]);

    // Agregar tarea
    const addTask = async (title, repeat = null) => {
        const { data, error } = await supabase.from("tasks").insert([
            {
                title: title.title,
                user_id: userId,
                repeat: title.repeat,
                created_at: title.date,
            },
        ]);

        await fetchTasks();
        if (!error && data) {
            setTasks((prev) => [data[0], ...prev]);
        }
    };

    // Marcar como completada
    const toggleTaskDone = async (id, currentState) => {
        const { error } = await supabase
            .from("tasks")
            .update({ is_done: !currentState })
            .eq("id", id);

        if (!error) {
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, is_done: !currentState } : task
                )
            );
        }
    };

    // Eliminar tarea
    const deleteTaskDone = async (id) => {
        const { error } = await supabase.from("tasks").delete().eq("id", id);
        if (!error) {
            setTasks((prev) => prev.filter((task) => task.id !== id));
        }
    };

    return {
        tasks,
        addTask,
        toggleTaskDone,
        deleteTaskDone,
        tasklength: tasks.length,
    };
}
