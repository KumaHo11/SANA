"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Save, ArrowLeft, LucideIcon } from "lucide-react";

export function EditCompanyForm({
    company,
    updateAction,
    returnUrl,
    title,
    subtitle,
    Icon,
    iconColorClass,
    iconBgClass
}: {
    company: any;
    updateAction: any;
    returnUrl: string;
    title: string;
    subtitle: string;
    Icon: LucideIcon;
    iconColorClass: string;
    iconBgClass: string;
}) {
    const [state, formAction, isPending] = useActionState(updateAction as any, null as any);

    return (
        <div className="mb-8">
            <Link
                href={returnUrl}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver
            </Link>
            <div className="flex items-center gap-3 mb-8">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgClass} ${iconColorClass}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
            </div>

            <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm">
                <form action={formAction} className="p-6 space-y-8">
                    <input type="hidden" name="id" value={company.id} />
                    <input type="hidden" name="returnPath" value={returnUrl} />

                    {state?.error && (
                        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                            {state.error}
                        </div>
                    )}
                    {state?.success && (
                        <div className="rounded-xl bg-green-50 p-4 text-sm text-green-600">
                            Datos actualizados correctamente. Redirigiendo...
                        </div>
                    )}

                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de la Organización</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Razón Social</label>
                                <input type="text" name="name" defaultValue={company.name} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">CUIT</label>
                                <input type="text" name="cuit" defaultValue={company.cuit} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-700">Dirección</label>
                                <input type="text" name="address" defaultValue={company.address} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Datos de Contacto</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Nombre de Contacto</label>
                                <input type="text" name="contact_name" defaultValue={company.contact_name || ''} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Email de Contacto</label>
                                <input type="email" name="contact_email" defaultValue={company.contact_email || ''} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <Link href={returnUrl} className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            Cancelar
                        </Link>
                        <button type="submit" disabled={isPending || state?.success} className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors disabled:opacity-50 bg-blue-600 hover:bg-blue-700`}>
                            <Save className="h-4 w-4" />
                            {isPending ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
