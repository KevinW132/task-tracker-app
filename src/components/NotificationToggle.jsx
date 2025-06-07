import { useState } from "react";

export function NotificationToggle() {
    const [permission, setPermission] = useState(Notification.permission);

    const handleEnable = async () => {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === "granted") {
            new Notification("🔔 Notificaciones activadas", {
                body: "Te avisaremos sobre tus tareas diarias.",
            });
        }
    };

    return (
        <button
            onClick={handleEnable}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
            {permission === "granted"
                ? "✅ Notificaciones activadas"
                : "Activar notificaciones"}
        </button>
    );
}
