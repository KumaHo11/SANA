"use client";

import { useState, useTransition } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { sendPasswordResetEmail } from "@/app/forgot-password/actions";

export function ForgotPasswordForm() {
    const [isPending, startTransition] = useTransition();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("idle");

        startTransition(async () => {
            const result = await sendPasswordResetEmail(email);
            if (result.error) {
                setStatus("error");
                setErrorMessage(result.error);
            } else {
                setStatus("success");
            }
        });
    };

    if (status === "success") {
        return (
            <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Revisa tu correo</h3>
                <p className="text-slate-600 mb-6">
                    Hemos enviado un enlace de recuperación a <span className="font-semibold text-slate-900">{email}</span>.
                    Haz clic en el enlace para restablecer tu contraseña.
                </p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setEmail("");
                    }}
                    className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline"
                >
                    Intentar con otro correo electrónico
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {status === "error" && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                    {errorMessage}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700">
                    Correo electrónico
                </label>
                <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@empresa.com"
                        className="block w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending || !email}
                className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isPending ? "Enviando enlace..." : "Enviar enlace de recuperación"}
            </button>
        </form>
    );
}
