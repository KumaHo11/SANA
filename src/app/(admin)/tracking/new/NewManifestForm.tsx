"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import Link from "next/link";
import { createRouteAndManifest } from "./actions";

export function NewManifestForm({
    generators,
    transporters,
    plants
}: {
    generators: any[],
    transporters: any[],
    plants: any[]
}) {
    const [state, formAction, isPending] = useActionState(createRouteAndManifest as any, null as any);

    return (
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm">
            <form action={formAction} className="p-6 space-y-8">
                {state?.error && (
                    <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                        {state.error}
                    </div>
                )}

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Asignaciones y Ruta</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700">Entidad Generadora</label>
                            <select name="generator_id" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                                <option value="">Seleccionar generador...</option>
                                {generators.map(g => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Empresa Transportista</label>
                            <select name="transporter_id" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                                <option value="">Seleccionar transportista...</option>
                                {transporters.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Planta de Tratamiento Destino</label>
                            <select name="plant_id" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required>
                                <option value="">Seleccionar planta...</option>
                                {plants.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Planificación del Transporte</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Nombre del Conductor</label>
                            <input type="text" name="driver_name" placeholder="Ej: Juan Pérez" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Patente del Vehículo</label>
                            <input type="text" name="truck_plate" placeholder="Ej: AA 123 BB" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Fecha de Recolección Programada</label>
                            <input type="date" name="scheduled_date" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Hora Programada</label>
                            <input type="time" name="scheduled_time" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Detalles del Manifiesto</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-slate-700">ID de Rastreabilidad (Manual)</label>
                            <input type="text" name="tracking_id" placeholder="Ej: MAN-12345" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <Link href="/tracking" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        Cancelar
                    </Link>
                    <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50">
                        <Save className="h-4 w-4" />
                        {isPending ? "Procesando..." : "Crear Hoja de Ruta"}
                    </button>
                </div>
            </form>
        </div>
    );
}
