"use client";

import Link from "next/link";
import { ArrowLeft, Truck, Save } from "lucide-react";
import { useActionState } from "react";
import { createTransporter } from "./actions";

export default function NewTransport() {
    const [state, formAction, isPending] = useActionState(createTransporter as any, null as any);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <Link
                    href="/transport"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver a Transporte
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Alta de empresa transportista</h1>
                        <p className="text-sm text-slate-500">Registra una nueva flota autorizada para el movimiento de residuos.</p>
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

                    {/* Sección 1: Empresa */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de la Empresa de Transporte</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Razón Social</label>
                                <input type="text" name="name" placeholder="Ej: Logística Ambiental S.A." className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">CUIT de la Empresa</label>
                                <input type="text" name="cuit" placeholder="Ej: 30-12345678-9" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Permiso R.U.T.A. / Autorización</label>
                                <input type="text" placeholder="Número de habilitación nacional/provincial" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Flota inicial */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Capacidad y Flota Autorizada</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Vehículos Registrados (Inicial)</label>
                                <input type="number" placeholder="Ej: 5" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Ámbito de Operación</label>
                                <select className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required>
                                    <option value="">Seleccionar ámbito</option>
                                    <option value="provincial">Provincial</option>
                                    <option value="interprovincial">Interprovincial (Nacional)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Datos de Contacto */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de Contacto</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nombre del Contacto</label>
                                <input type="text" name="contact_name" placeholder="Ej: Juan Pérez" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Email de Contacto</label>
                                <input type="email" name="contact_email" placeholder="Ej: contacto@transporte.com" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                        </div>
                    </div>

                    {/* Botonera */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Link href="/transport" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Cancelar
                        </Link>
                        <button type="submit" disabled={isPending} className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700 transition-colors disabled:opacity-50">
                            <Save className="h-4 w-4" />
                            {isPending ? "Procesando..." : "Dar de alta Transportista"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
