"use client";

import { useActionState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { ArrowLeft, Users, Save } from "lucide-react";
import { createEntity } from "./actions";

export default function NewEntity() {
    const [state, formAction, isPending] = useActionState(createEntity as any, null as any);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <Link
                    href="/entities"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Entidades
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nueva Entidad Generadora</h1>
                        <p className="text-sm text-slate-500">Alta administrativa de generadores de residuos.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm">
                <form action={formAction} className="p-6 space-y-8">

                    {state?.error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                            {state.error}
                        </div>
                    )}

                    {/* Sección 1: Datos Generales */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de la Organización</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Razón Social</label>
                                <input type="text" name="name" placeholder="Ej: Hospital San Martín de La Plata" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">CUIT</label>
                                <input type="text" name="cuit" placeholder="Ej: 30-12345678-9" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Dirección</label>
                                <input type="text" name="address" placeholder="Ej: Calle Falsa 123, CABA" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Botonera */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Link href="/entities" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Cancelar
                        </Link>
                        <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {isPending ? "Guardando..." : "Dar de alta Entidad"}
                        </button>
                    </div>

                </form>
            </div>
        </DashboardLayout>
    );
}
