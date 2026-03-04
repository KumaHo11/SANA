import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { Plus, Building2, Filter } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { CompanyActions } from "@/components/admin/CompanyActions";
import { SearchInput } from "@/components/admin/SearchInput";

export const dynamic = 'force-dynamic';

export default async function TreatmentPlantsPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const supabase = await createClient();
    const { query } = await searchParams;

    let queryBuilder = supabase
        .from('companies')
        .select('*')
        .eq('type', 'TREATMENT_PLANT')
        .order('created_at', { ascending: false });

    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }

    const { data: plants, error } = await queryBuilder;

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Plantas de tratamiento
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Gestión de plantas operadoras y capacidad de procesamiento.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/treatment-plants/new" className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]">
                        <Plus className="h-4 w-4" />
                        Nueva planta
                    </Link>
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SearchInput placeholder="Buscar planta..." colorClass="purple" />
                    <button className="flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:w-auto">
                        <Filter className="h-4 w-4" />
                        Filtros
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b bg-slate-50/50 text-slate-500">
                                <th className="px-6 py-4 font-medium">Planta</th>
                                <th className="px-6 py-4 font-medium">Tecnología</th>
                                <th className="px-6 py-4 font-medium">Estado</th>
                                <th className="px-6 py-4 font-medium">Capacidad</th>
                                <th className="px-6 py-4 font-medium">Última actividad</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {plants?.map((plt) => (
                                <tr key={plt.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                                                <Building2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{plt.name}</p>
                                                <p className="text-xs text-slate-500 w-32 truncate" title={plt.id}>{plt.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">-</td>
                                    <td className="px-6 py-4">
                                        {plt.is_approved ? (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                                Aprobado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                                                Pendiente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-600">-</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">-</td>
                                    <td className="px-6 py-4 text-right">
                                        <CompanyActions id={plt.id} isApproved={plt.is_approved} path="/treatment-plants" editUrl={`/treatment-plants/${plt.id}/edit`} />
                                    </td>
                                </tr>
                            ))}
                            {(!plants || plants.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No hay plantas operadoras registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
