import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setError(error.message);
        else onSuccess();
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-black p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-white">
                    Iniciar sesión
                </h2>

                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full mb-3 p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full mb-3 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
