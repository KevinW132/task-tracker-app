import { useEffect } from "react";

export function useDailyNotifications(tasks = []) {
    useEffect(() => {
        if (Notification.permission !== "granted") return;

        const now = new Date();
        const startOfDay = new Date();
        const endOfDay = new Date();

        startOfDay.setHours(now.getHours(), now.getMinutes() + 1, 0, 0);
        endOfDay.setHours(now.getHours(), now.getMinutes() + 2, 0, 0);

        const timeToMorning = startOfDay - now;
        const timeToNight = endOfDay - now;

        // Identificador único por fecha (para evitar repetir)
        const todayKey = new Date().toISOString().split("T")[0];

        // Si aún no se envió la de la mañana
        if (timeToMorning > 0 && !localStorage.getItem(`${todayKey}-morning`)) {
            setTimeout(() => {
                const pending = tasks.filter((t) => !t.done);
                new Notification("☀️ Buen día", {
                    body: `Tienes ${pending.length} tareas pendientes.`,
                });
                localStorage.setItem(`${todayKey}-morning`, "true");
            }, timeToMorning);
        }

        // Si aún no se envió la de la noche
        if (timeToNight > 0 && !localStorage.getItem(`${todayKey}-night`)) {
            setTimeout(() => {
                const pending = tasks.filter((t) => !t.done);
                const completed = tasks.length - pending.length;
                const body =
                    pending.length === 0
                        ? "¡Felicidades! Completaste todas tus tareas. 🎉"
                        : `Terminaste ${completed}, te faltaron ${pending.length}.`;

                new Notification("🌙 Fin del día", {
                    body,
                });

                localStorage.setItem(`${todayKey}-night`, "true");
            }, timeToNight);
        }
    }, [tasks]);
}
