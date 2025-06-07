self.addEventListener("install", () => {
    console.log("Service Worker instalado");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("Service Worker activo");
});

self.addEventListener("push", (event) => {
    const data = event.data?.json() || {
        title: "Recordatorio",
        body: "Tienes tareas pendientes",
    };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "/icon-192.png",
        })
    );
});
