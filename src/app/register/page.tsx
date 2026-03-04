import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { Building2, Truck, ArrowRight } from "lucide-react";

export default function RegisterSelectionPage() {
    return (
        <AuthLayout
            title="Crea tu cuenta"
            subtitle="Selecciona tu tipo de entidad para comenzar el registro en la plataforma."
        >
            <div className="space-y-4">
                <Link
                    href="/register/generator"
                    className="group relative flex items-center gap-4 rounded-xl border border-slate-200 p-6 transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-sm"
                >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-white group-hover:text-green-600 group-hover:shadow-sm transition-all">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-800">
                            Generador de residuos
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 group-hover:text-green-700/80">
                            Hospitales, clínicas, laboratorios y centros de salud.
                        </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:text-green-600 group-hover:translate-x-1" />
                </Link>

                <Link
                    href="/register/transporter"
                    className="group relative flex items-center gap-4 rounded-xl border border-slate-200 p-6 transition-all hover:border-orange-500 hover:bg-orange-50 hover:shadow-sm"
                >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 group-hover:bg-white group-hover:text-orange-600 group-hover:shadow-sm transition-all">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-800">
                            Empresa transportista
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 group-hover:text-orange-700/80">
                            Flotas habilitadas para el traslado de residuos.
                        </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:text-orange-600 group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="font-semibold text-green-600 hover:text-green-500">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
