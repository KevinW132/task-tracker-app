import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import TaskApp from "./components/TaskApp"; // tu app de tareas

export default function App() {
    const [session, setSession] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
            }
        );
        return () => listener?.subscription.unsubscribe();
    }, []);

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
                {showLogin ? (
                    <Login onSuccess={() => {}} />
                ) : (
                    <Signup onSuccess={() => {}} />
                )}
                <p className="mt-4 text-sm text-gray-200">
                    {showLogin
                        ? "¿No tienes cuenta?"
                        : "¿Ya tienes una cuenta?"}
                    <button
                        onClick={() => setShowLogin(!showLogin)}
                        className="ml-2 text-blue-600 hover:underline"
                    >
                        {showLogin ? "Regístrate" : "Inicia sesión"}
                    </button>
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <TaskApp user={session.user} />
        </div>
    );
}
