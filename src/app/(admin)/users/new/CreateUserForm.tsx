"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Lock, Building2 } from "lucide-react";
import Link from "next/link";
import { createUserByAdmin } from "./actions";

type Company = {
    id: string;
    name: string;
    cuit: string;
    type: string;
};

export function CreateUserForm({ companies }: { companies: Company[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        const email = formData.get("email") as string;
        const fullName = formData.get("fullName") as string;
        const password = formData.get("password") as string;
        const companyId = formData.get("companyId") as string;

        // Find company role
        const selectedCompany = companies.find(c => c.id === companyId);
        let role = 'ADMIN_GENERATOR'; // Fallback
        if (selectedCompany?.type === 'GENERATOR') role = 'ADMIN_GENERATOR';
        if (selectedCompany?.type === 'TRANSPORTER') role = 'OPERATOR_TRANSPORTER';
        if (selectedCompany?.type === 'TREATMENT_PLANT') role = 'OPERATOR_PLANT';

        try {
            const result = await createUserByAdmin({ email, fullName, password, companyId, role });

            if (result.error) {
                setError(result.error);
                return;
            }

            router.push("/users");
            router.refresh();
        } catch (err) {
            setError("Ocurrió un error de red o de servidor.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <Link
                            href="/users"
                            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Nuevo usuario
                        </h1>
                    </div>
                    <p className="ml-11 text-sm text-slate-600">
                        Crea un usuario manualmente y asígnale su empresa.
                    </p>
                </div>
            </div>

            <div className="ml-11 max-w-2xl">
                <form action={handleSubmit} className="space-y-6 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-200">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                <User className="h-4 w-4 text-green-600" />
                                Nombre completo
                            </label>
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 placeholder:text-slate-400"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                <Mail className="h-4 w-4 text-green-600" />
                                Correo electrónico
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 placeholder:text-slate-400"
                                placeholder="ejemplo@empresa.com"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                <Lock className="h-4 w-4 text-green-600" />
                                Contraseña inicial
                            </label>
                            <input
                                name="password"
                                type="text"
                                required
                                minLength={6}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10 placeholder:text-slate-400"
                                placeholder="Minimo 6 caracteres..."
                            />
                            <p className="text-xs text-slate-500">El usuario será forzado a cambiarla al iniciar sesión por primera vez.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-900">
                                <Building2 className="h-4 w-4 text-green-600" />
                                Empresa vinculada
                            </label>
                            <div className="relative">
                                <select
                                    name="companyId"
                                    required
                                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-green-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-500/10"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Seleccionar empresa...</option>
                                    {companies.map(company => (
                                        <option key={company.id} value={company.id}>
                                            {company.name} ({company.cuit})
                                        </option>
                                    ))}
                                </select>
                                <Building2 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t">
                        <Link
                            href="/users"
                            className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                            onClick={(e) => {
                                if (isLoading) e.preventDefault();
                            }}
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-green-600 px-8 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all hover:bg-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.4)] disabled:pointer-events-none disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                            ) : (
                                "Crear usuario"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
