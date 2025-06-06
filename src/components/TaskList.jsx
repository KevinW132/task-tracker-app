export default function TaskList({ tasks, onToggle, onDelete }) {
    if (tasks.length === 0)
        return <p className="text-center">No hay tareas aún.</p>;

    return (
        <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex items-center justify-between bg-white p-2 rounded shadow"
                >
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.is_done}
                            onChange={() => onToggle(task.id, task.is_done)}
                        />
                        <span
                            className={
                                task.is_done ? "line-through text-gray-500" : ""
                            }
                        >
                            {task.title}
                        </span>
                    </label>
                    <div className="flex items-center gap-2">
                        <small className="text-xs text-gray-500">
                            {task.repeat}
                        </small>
                        <button
                            onClick={() => onDelete(task.id)}
                            className={
                                task.is_done
                                    ? "text-red-500 text-sm hover:underline"
                                    : "hidden"
                            }
                        >
                            🗑
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
