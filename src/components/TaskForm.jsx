import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [repeat, setRepeat] = useState("none");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;

        onAdd({
            title,
            repeat, // diario, semanal, mensual, etc
            date: new Date().toISOString(),
        });

        setTitle("");
        setRepeat("none");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Escribe una tarea..."
                className="w-full p-2 border rounded"
            />
            <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="w-full p-2 border rounded"
            >
                <option value="none">No repetir</option>
                <option value="daily">Repetir diario</option>
                <option value="weekly">Repetir semanal</option>
                <option value="monthly">Repetir mensual</option>
            </select>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Agregar tarea
            </button>
        </form>
    );
}
