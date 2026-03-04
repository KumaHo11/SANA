import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
    backUrl?: string;
    title: string;
    subtitle?: string;
}

export default function AuthLayout({
    children,
    showBackButton = false,
    backUrl = "/register",
    title,
    subtitle
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sección izquierda - Decorativa y Branding */}
            <div className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gradient-to-br from-green-600 to-green-800 text-white flex-col justify-between p-12">
                <div className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-green-700 font-bold text-2xl shadow-lg">
                        S
                    </div>
                    <span className="text-3xl font-bold tracking-tight">SANA</span>
                </div>

                <div className="max-w-md">
                    <h2 className="text-3xl font-semibold leading-tight mb-4">
                        Transformando la gestión de residuos en Argentina
                    </h2>
                    <p className="text-green-100 text-lg">
                        Únete a la plataforma líder en rastreabilidad y control documental para un futuro más sostenible.
                    </p>
                </div>

                <div className="text-sm font-medium text-green-200">
                    © {new Date().getFullYear()} Plataforma SANA. Todos los derechos reservados.
                </div>
            </div>

            {/* Sección derecha - Contenido del formulario */}
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-lg">

                    {/* Header móvil */}
                    <div className="flex md:hidden items-center gap-2 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-xl shadow-md">
                            S
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">SANA</span>
                    </div>

                    {showBackButton && (
                        <Link
                            href={backUrl}
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    )}

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
                        {subtitle && (
                            <p className="mt-2 text-base text-slate-600">{subtitle}</p>
                        )}
                    </div>

                    <div className="bg-white px-6 py-8 sm:px-10 rounded-2xl shadow-sm border border-slate-100">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}
