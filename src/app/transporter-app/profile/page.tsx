
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User, LogOut, Mail, Building2, Truck, HelpCircle } from "lucide-react";
import { logout } from "@/app/login/actions";

export default async function TransporterProfile() {
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
            company:company_id (name, cuit)
        `)
        .eq('id', user.id)
        .single();

    if (!profile) {
        return <div>No profile found.</div>;
    }

    const company = Array.isArray(profile.company) ? profile.company[0] : profile.company as any;

    return (
        <div className="flex flex-col relative w-full h-full">
            <div className="bg-green-600 px-6 pt-8 pb-16 text-white text-center rounded-b-3xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-green-600 mb-4 shadow-lg border-4 border-green-500/50">
                    <User className="h-10 w-10" />
                </div>
                <h1 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h1>
                <p className="text-green-100 mt-1">{user.email}</p>
            </div>

            <div className="px-4 py-6 -mt-10 space-y-4">

                {/* Company Info */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Datos de la Empresa</h2>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-50 p-2.5 rounded-xl text-green-600">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Razón Social</p>
                                <p className="font-semibold text-slate-900">{company?.name || 'No registrada'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-50 p-2.5 rounded-xl text-slate-500">
                                <Truck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">CUIT Empresa</p>
                                <p className="font-semibold text-slate-900">{company?.cuit || 'Sin CUIT'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings & Support */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <a href="mailto:soporte@sana.com" className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors border-b border-slate-50">
                        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                            <HelpCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-slate-900">Soporte y Ayuda</p>
                            <p className="text-sm text-slate-500">¿Tienes un problema con tu viaje?</p>
                        </div>
                    </a>
                </div>

                {/* Logout Button */}
                <div className="pt-4 pb-8">
                    <form action={logout}>
                        <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600 px-4 py-4 font-semibold shadow-sm transition-all hover:bg-red-100 active:scale-[0.98]">
                            <LogOut className="h-5 w-5" />
                            Cerrar Sesión
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
