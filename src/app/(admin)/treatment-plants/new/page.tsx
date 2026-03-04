"use client";

import { useState, useActionState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { createTreatmentPlant } from "./actions";

export default function NewTreatmentPlant() {
    const [state, formAction, isPending] = useActionState(createTreatmentPlant as any, null as any);

    return (
        <DashboardLayout>
            <div className="mb-8">
                <Link
                    href="/treatment-plants"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Plantas
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nueva Planta de Tratamiento</h1>
                        <p className="text-sm text-slate-500">Registra una nueva instalación operadora en el sistema SANA.</p>
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
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de la Instalación</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Nombre de la Planta</label>
                                <input type="text" name="name" placeholder="Ej: Planta BioNorte S.A." className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">CUIT Empresa Operadora</label>
                                <input type="text" name="cuit" placeholder="Ej: 30-12345678-9" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nro. de Registro / CAA</label>
                                <input type="text" placeholder="Certificado Ambiental Anual" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Operaciones */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Capacidad y Tecnología</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Tipo de Tecnología Principal</label>
                                <select className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" required>
                                    <option value="">Seleccionar tecnología</option>
                                    <option value="incineracion">Incineración</option>
                                    <option value="autoclave">Autoclave / Esterilización</option>
                                    <option value="microondas">Microondas</option>
                                    <option value="quimico">Tratamiento Químico</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Capacidad Tonal/Mes (Estimada)</label>
                                <input type="number" placeholder="Ej: 1500" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Botonera */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Link href="/treatment-plants" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Cancelar
                        </Link>
                        <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {isPending ? "Procesando..." : "Registrar Planta"}
                        </button>
                    </div>

                </form>
            </div>
        </DashboardLayout>
    );
}
