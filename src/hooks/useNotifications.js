import { useEffect } from "react";

export function useNotifications(tasks) {
    // Pedir permiso al cargar la app
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    // Lanzar notificación si hay tareas pendientes
    useEffect(() => {
        if (!("Notification" in window)) return;
        if (Notification.permission !== "granted") return;

        const pending = tasks.filter((t) => !t.done);
        if (pending.length === 0) return;

        // Evitar múltiples notificaciones si ya se está ejecutando varias veces
        const now = new Date();
        const hour = now.getHours();
        if (hour >= 9 && hour <= 21) {
            new Notification("Tienes tareas pendientes", {
                body: `Aún te quedan ${pending.length} tareas por hacer hoy.`,
                icon: "/icon-192x192.png", // opcional: ícono en public/
            });
        }
    }, [tasks]);
}
