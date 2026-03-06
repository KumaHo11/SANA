"use client";

import { useState, useTransition } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "@/app/reset-password/actions";

export function ResetPasswordForm() {
    const [isPending, startTransition] = useTransition();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Validación de seguridad básica
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = hasMinLength && hasNumber && hasSymbol && password === confirmPassword && password.length > 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid) return;

        setStatus("idle");

        startTransition(async () => {
            const result = await resetPassword(password);
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
                    <Lock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Contraseña actualizada</h3>
                <p className="text-slate-600 mb-6">
                    Tu contraseña ha sido actualizada exitosamente. Ya puedes ingresar a la plataforma.
                </p>
                <a
                    href="/login"
                    className="inline-block w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
                >
                    Ir al inicio de sesión
                </a>
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

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Nueva contraseña</label>
                    <div className="relative mt-1.5">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-xl border border-slate-300 py-3 pl-11 pr-11 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Confirmar contraseña</label>
                    <div className="relative mt-1.5">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`block w-full rounded-xl border py-3 pl-11 pr-4 sm:text-sm transition-colors focus:outline-none focus:ring-1 ${confirmPassword && password !== confirmPassword
                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/50'
                                    : 'border-slate-300 focus:border-green-500 focus:ring-green-500'
                                }`}
                            required
                        />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-600">Las contraseñas no coinciden</p>
                    )}
                </div>
            </div>

            {/* Indicadores de seguridad */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-sm font-medium text-slate-700 mb-2">Requisitos mínimos:</p>
                <ul className="text-xs space-y-1">
                    <li className={`flex items-center gap-1.5 ${hasMinLength ? 'text-green-600' : 'text-slate-500'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasMinLength ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        Al menos 8 caracteres
                    </li>
                    <li className={`flex items-center gap-1.5 ${hasNumber ? 'text-green-600' : 'text-slate-500'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasNumber ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        Al menos un número
                    </li>
                    <li className={`flex items-center gap-1.5 ${hasSymbol ? 'text-green-600' : 'text-slate-500'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${hasSymbol ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        Al menos un símbolo (ej: !@#$%)
                    </li>
                </ul>
            </div>

            <button
                type="submit"
                disabled={isPending || !isValid}
                className="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isPending ? "Actualizando..." : "Actualizar contraseña"}
            </button>
        </form>
    );
}
