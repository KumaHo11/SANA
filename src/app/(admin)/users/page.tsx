import { SearchInput } from "@/components/admin/SearchInput";
import { UserActions } from "@/components/admin/UserActions";
import { createClient } from "@/utils/supabase/server";
import { User, ShieldAlert, CheckCircle2, Clock, UserPlus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function UsersPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const supabase = await createClient();
    const { query } = await searchParams;

    // Fetch profiles that are not admins
    let queryBuilder = supabase
        .from('profiles')
        .select(`
            id,
            first_name,
            last_name,
            role,
            is_approved,
            created_at,
            companies ( id, name, cuit )
        `)
        .neq('role', 'SUPERADMIN')
        .order('created_at', { ascending: false });

    // In a real scenario with many users, you'd want RPC or text search.
    // Given the inner join, filtering by company name requires a slightly different syntax in Supabase,
    // but we can filter by full_name for now.
    if (query) {
        queryBuilder = queryBuilder.ilike('first_name', `%${query}%`);
    }

    const { data: users, error } = await queryBuilder;

    // Helper para formatear el rol
    const formatRole = (role: string) => {
        switch (role) {
            case 'GENERATOR': return 'Generador';
            case 'TRANSPORTER': return 'Transportista';
            case 'PLANT': return 'Planta de Trat.';
            default: return role;
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Gestión de usuarios
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Administra y aprueba el acceso de los empleados vinculados a las entidades.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/users/new" className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all hover:bg-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.4)]">
                        <UserPlus className="h-4 w-4" />
                        Nuevo
                    </Link>
                </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <SearchInput placeholder="Buscar por nombre..." colorClass="green" />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="border-b bg-slate-50/50 text-slate-500">
                                <th className="px-6 py-4 font-medium">Usuario</th>
                                <th className="px-6 py-4 font-medium">Entidad Vinculada</th>
                                <th className="px-6 py-4 font-medium">Rol Asignado</th>
                                <th className="px-6 py-4 font-medium text-center">Estado de Acceso</th>
                                <th className="px-6 py-4 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users?.map((user: any) => (
                                <tr key={user.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-medium text-slate-900">{user.first_name || user.last_name ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "Usuario sin nombre"}</p>
                                                <p className="text-xs text-slate-500">Registrado el {new Date(user.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.companies ? (
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900">{user.companies.name}</span>
                                                <span className="text-xs text-slate-500">CUIT: {user.companies.cuit}</span>
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 italic">Sin entidad</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                            {formatRole(user.role)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {user.is_approved ? (
                                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Aprobado
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-600/20">
                                                <Clock className="h-3.5 w-3.5" />
                                                Pendiente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <UserActions id={user.id} isApproved={user.is_approved} />
                                    </td>
                                </tr>
                            ))}
                            {(!users || users.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <ShieldAlert className="h-10 w-10 text-slate-300 mb-3" />
                                            <p className="text-base font-medium text-slate-900">No hay usuarios registrados</p>
                                            <p className="text-sm mt-1">Los empleados aparecerán aquí cuando se registren con el CUIT de su empresa.</p>
                                        </div>
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
