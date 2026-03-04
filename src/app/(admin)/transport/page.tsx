import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Plus, Truck, Filter } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { CompanyActions } from "@/components/admin/CompanyActions";
import { SearchInput } from "@/components/admin/SearchInput";

export const dynamic = 'force-dynamic';

export default async function TransportPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const supabase = await createClient();
    const { query } = await searchParams;

    let queryBuilder = supabase
        .from('companies')
        .select('*')
        .eq('type', 'TRANSPORTER')
        .order('created_at', { ascending: false });

    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }

    const { data: transporters, error } = await queryBuilder;

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Transporte
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Control de flota y empresas transportistas registradas.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/transport/new" className="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all hover:bg-orange-700 hover:shadow-[0_0_25px_rgba(234,88,12,0.4)]">
                        <Plus className="h-4 w-4" />
                        Nuevo transportista
                    </Link>
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SearchInput placeholder="Buscar transportista..." colorClass="orange" />
                    <button className="flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto">
                        <Filter className="h-4 w-4" />
                        Filtros
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b bg-slate-50/50 text-slate-500">
                                <th className="px-6 py-4 font-medium">Empresa</th>
                                <th className="px-6 py-4 font-medium">Flota (Vehículos)</th>
                                <th className="px-6 py-4 font-medium">Estado</th>
                                <th className="px-6 py-4 font-medium">Rutas activas</th>
                                <th className="px-6 py-4 font-medium">Última actividad</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transporters?.map((trp) => (
                                <tr key={trp.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                                <Truck className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{trp.name}</p>
                                                <p className="text-xs text-slate-500 w-32 truncate" title={trp.id}>{trp.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">-</td>
                                    <td className="px-6 py-4">
                                        {trp.is_approved ? (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                                Aprobado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                                                Pendiente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">-</td>
                                    <td className="px-6 py-4 text-slate-500">-</td>
                                    <td className="px-6 py-4 text-right">
                                        <CompanyActions id={trp.id} isApproved={trp.is_approved} path="/transport" editUrl={`/transport/${trp.id}/edit`} />
                                    </td>
                                </tr>
                            ))}
                            {(!transporters || transporters.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No hay transportistas registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t p-4 sm:px-6 flex items-center justify-between text-sm text-slate-500">
                    <p>Mostrando {transporters?.length || 0} transportistas</p>
                    <div className="flex gap-2">
                        <button className="rounded border px-3 py-1 hover:bg-slate-50" disabled>Anterior</button>
                        <button className="rounded border px-3 py-1 hover:bg-slate-50" disabled>Siguiente</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
