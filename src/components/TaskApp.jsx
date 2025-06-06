import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useTasks } from "../hooks/useTasks";
import { useNotifications } from "../hooks/useNotifications";
import { supabase } from "../lib/supabaseClient";

function TaskApp({ user }) {
    const { tasks, addTask, toggleTaskDone, deleteTaskDone, tasklength } =
        useTasks(user.id);
    useNotifications(useTasks().tasks, tasklength);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        location.reload();
    };

    return (
        <main className="min-h-screen bg-gray-100 text-gray-800 p-4 w-full mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">📋 Task Tracker</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>
            </div>

            <TaskForm onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={toggleTaskDone}
                onDelete={deleteTaskDone}
            />
        </main>
    );
}

export default TaskApp;
