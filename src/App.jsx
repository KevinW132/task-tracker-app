import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";
import { useNotifications } from "./hooks/useNotifications";

function App() {
    useNotifications(useTasks().tasks);
    const { tasks, addTask, toggleTaskDone, deleteTaskDone } = useTasks();

    return (
        <main className="min-h bg-gray-100 text-gray-800 p-4 max-w-xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-2xl font-bold mb-4">📋 Task Tracker</h1>
            <TaskForm onAdd={addTask} />
            <TaskList
                tasks={tasks}
                onToggle={toggleTaskDone}
                onDelete={deleteTaskDone}
            />
        </main>
    );
}

export default App;
