import PlantMobileLayout from "@/components/plant/PlantMobileLayout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User, LogOut, Building, Mail, Package } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/login/actions";

export default async function PlantProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`
            first_name,
            last_name,
            role,
            companies:company_id (name, cuit, address)
        `)
        .eq('id', user.id)
        .single();

    const company = profile?.companies ?
        (Array.isArray(profile.companies) ? profile.companies[0] : profile.companies) : null;

    return (
        <PlantMobileLayout>
            {/* Header Area */}
            <div className="bg-[#0f9f3f] px-6 pt-8 pb-12 text-white rounded-b-3xl">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
                        <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{profile?.first_name} {profile?.last_name}</h1>
                        <p className="text-green-100 font-medium">Operario de Planta</p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 -mt-6">
                <div className="space-y-4">

                    {/* Company Details Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Información de la Planta</h2>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                <Building className="h-5 w-5 text-[#0f9f3f]" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Empresa</p>
                                <p className="text-sm font-bold text-slate-800">{company?.name || 'No asignada'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                <Package className="h-5 w-5 text-[#0f9f3f]" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">CUIT</p>
                                <p className="text-sm font-bold text-slate-800">{company?.cuit || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Personal Details Card */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Datos Personales</h2>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                <User className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Nombre Completo</p>
                                <p className="text-sm font-bold text-slate-800">{profile?.first_name} {profile?.last_name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                <Mail className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Correo Electrónico</p>
                                <p className="text-sm font-bold text-slate-800">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4">
                        <form action={logout}>
                            <button
                                type="submit"
                                className="w-full bg-white text-red-600 border border-red-200 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                <LogOut className="h-5 w-5" />
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </PlantMobileLayout>
    );
}
