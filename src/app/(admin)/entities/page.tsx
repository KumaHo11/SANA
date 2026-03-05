import Link from "next/link";
import { Plus, Building2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { CompanyActions } from "@/components/admin/CompanyActions";
import { SearchInput } from "@/components/admin/SearchInput";

export const dynamic = 'force-dynamic';

export default async function EntitiesPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const supabase = await createClient();
    const { query } = await searchParams;

    let queryBuilder = supabase
        .from('companies')
        .select('*')
        .eq('type', 'GENERATOR')
        .order('created_at', { ascending: false });

    if (query) {
        queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }

    const { data: entities, error } = await queryBuilder;

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Entidades generadoras
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Gestión y registro de generadores de residuos.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/entities/new" className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all hover:bg-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.4)]">
                        <Plus className="h-4 w-4" />
                        Nueva
                    </Link>
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SearchInput placeholder="Buscar entidad..." colorClass="green" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b bg-slate-50/50 text-slate-500">
                                <th className="px-6 py-4 font-medium">Empresa</th>
                                <th className="px-6 py-4 font-medium">CUIT</th>
                                <th className="px-6 py-4 font-medium">Datos de Contacto</th>
                                <th className="px-6 py-4 font-medium text-center">Estado</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {entities?.map((entity) => (
                                <tr key={entity.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                                <Building2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{entity.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{entity.cuit}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{entity.contact_email || "Sin email"}</span>
                                            <span className="text-xs text-slate-500 mt-0.5">{entity.address || "Sin dirección"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {entity.is_approved ? (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                                Aprobado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                                                Pendiente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <CompanyActions id={entity.id} isApproved={entity.is_approved} path="/entities" editUrl={`/entities/${entity.id}/edit`} />
                                    </td>
                                </tr>
                            ))}
                            {(!entities || entities.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No hay entidades generadoras registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
