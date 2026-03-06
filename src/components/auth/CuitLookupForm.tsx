"use client";

import { useState, useTransition } from "react";
import { Building2, Search, ArrowRight, UserPlus } from "lucide-react";
import { lookupCuitAndRegister } from "@/app/register/actions";

export function CuitLookupForm() {
    const [isPending, startTransition] = useTransition();
    const [cuit, setCuit] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [step, setStep] = useState<"lookup" | "register" | "success">("lookup");
    const [companyInfo, setCompanyInfo] = useState<{ id: string, name: string } | null>(null);
    const [error, setError] = useState("");

    const handleLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simulación temporal de la llamada al servidor para buscar CUIT
        // Deberás implementar la búsqueda real en tu backend (actions)
        startTransition(async () => {
            const result = await lookupCuitAndRegister('lookup', { cuit });

            if (result.error) {
                setError(result.error);
            } else if (result.company) {
                setCompanyInfo(result.company);
                setStep("register");
            }
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        startTransition(async () => {
            const result = await lookupCuitAndRegister('register', {
                cuit,
                email,
                password,
                companyId: companyInfo?.id
            });

            if (result.error) {
                setError(result.error);
            } else {
                setStep("success");
            }
        });
    };

    if (step === "success") {
        return (
            <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
                    <UserPlus className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">¡Registro exitoso!</h3>
                <p className="text-slate-600 mb-6">
                    Te has vinculado correctamente a <span className="font-semibold text-slate-900">{companyInfo?.name}</span>.
                    Hemos enviado un correo a <span className="font-semibold">{email}</span> para verificar tu cuenta.
                </p>
                <a
                    href="/login"
                    className="inline-block w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-all text-center"
                >
                    Ir al inicio de sesión
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                    {error}
                </div>
            )}

            {step === "lookup" ? (
                <form onSubmit={handleLookup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Ingresa el CUIT de la Institución
                        </label>
                        <p className="text-sm text-slate-500 mb-4 mt-1">Buscaremos si la empresa ya está registrada en SANA.</p>
                        <div className="relative mt-1.5">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={cuit}
                                onChange={(e) => setCuit(e.target.value)}
                                placeholder="Ej: 30-12345678-9"
                                className="block w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending || !cuit}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 transition-all"
                    >
                        {isPending ? "Buscando..." : "Buscar Entidad"}
                        {!isPending && <ArrowRight className="h-4 w-4" />}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleRegister} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-4">
                        <div className="flex bg-green-100 text-green-700 p-2 rounded-lg">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-green-900">Entidad Encontrada</h4>
                            <p className="text-sm text-green-800 mt-1">{companyInfo?.name}</p>
                            <p className="text-xs text-green-700 mt-1 font-mono">CUIT: {cuit}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="border-t border-slate-100 pt-4">
                            <h3 className="text-sm font-medium text-slate-900 mb-4">Crea tu cuenta de acceso</h3>

                            <label className="block text-sm font-medium text-slate-700">Correo Electrónico (Corporativo)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1.5 block w-full rounded-xl border border-slate-300 py-2.5 px-4 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1.5 block w-full rounded-xl border border-slate-300 py-2.5 px-4 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setStep("lookup")}
                            className="w-1/3 rounded-xl bg-white border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all font-medium"
                        >
                            Atrás
                        </button>
                        <button
                            type="submit"
                            disabled={isPending || !email || !password}
                            className="w-2/3 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Registrando..." : "Completar Registro"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
