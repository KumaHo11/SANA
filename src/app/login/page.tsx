import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { LogIn, AlertCircle } from "lucide-react";
import { login } from "./actions";

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
    const searchParams = await props.searchParams;
    const errorMessage = searchParams?.error;

    return (
        <AuthLayout
            title="Iniciar sesión"
            subtitle="Ingresa tus credenciales para acceder a la plataforma SANA."
        >
            <form action={login} className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                {errorMessage === 'pending_approval' ? (
                    <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-700 flex items-start gap-3 ring-1 ring-amber-600/20">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span>Tu cuenta está pendiente de aprobación. Un administrador debe verificar tu identidad antes de que puedas ingresar a la plataforma.</span>
                    </div>
                ) : errorMessage ? (
                    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <span>Credenciales incorrectas o usuario no encontrado. Verifica tu email y contraseña.</span>
                    </div>
                ) : null}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="ejemplo@empresa.com"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                            Contraseña
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-green-600 hover:text-green-500"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.98]"
                >
                    <LogIn className="h-4 w-4" />
                    Ingresar a SANA
                </button>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-slate-600">
                        ¿No tienes una cuenta?{' '}
                        <Link href="/register" className="font-semibold text-green-600 hover:text-green-500">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
