import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
            (registration) => {
                console.log("✅ Service Worker registrado:", registration);
            },
            (err) => {
                console.error("❌ Error al registrar Service Worker:", err);
            }
        );
    });
}
