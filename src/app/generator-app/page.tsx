import { Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/login/actions";

export default function GeneratorAppPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                    <CheckCircle className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">App de Generadores en Desarrollo</h1>
                <p className="text-slate-600 mb-8">
                    El portal web para Entidades Generadoras está en construcción. Pronto podrás gestionar tus manifiestos y programar tus recolecciones desde aquí.
                </p>

                <form action={logout}>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}
