
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TrendingUp, Truck, CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function TransporterHome() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('company_id, first_name')
        .eq('id', user.id)
        .single();

    if (!profile?.company_id) {
        return <div>No company assigned to this profile.</div>;
    }

    // Fetch manifests assigned to this transporter to calculate metrics
    const { data: manifests } = await supabase
        .from('manifests')
        .select(`
            status,
            declared_weight,
            declared_bags,
            routes!inner (
                transporter_id
            )
        `)
        .eq('routes.transporter_id', profile.company_id);

    // Calculate metrics
    const activeTrips = manifests?.filter(m => ['CREATED', 'IN_TRANSIT', 'PICKED_UP'].includes(m.status)).length || 0;
    const completedTrips = manifests?.filter(m => m.status === 'DELIVERED').length || 0;
    const totalWeight = manifests?.reduce((acc, m) => acc + (Number(m.declared_weight) || 0), 0) || 0;
    const totalBags = manifests?.reduce((acc, m) => acc + (Number(m.declared_bags) || 0), 0) || 0;

    return (
        <div className="flex flex-col relative w-full h-full">
            <div className="bg-green-600 px-6 pt-4 pb-12 text-white rounded-b-3xl shadow-sm">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-sm font-medium text-green-100">¡Hola {profile.first_name}!</p>
                        <h1 className="text-2xl font-bold mt-1">Resumen de Actividad</h1>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 -mt-10 space-y-6">

                {/* Main Metrics Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <TrendingUp className="h-24 w-24" />
                    </div>
                    <div className="relative">
                        <p className="text-sm font-medium text-slate-500 mb-1">Peso Total Transportado</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-slate-900">{totalWeight.toLocaleString()}</span>
                            <span className="text-lg font-semibold text-slate-500">kg</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Active Trips Details Card */}
                    <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <Truck className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-slate-300">Viajes Pendientes</h3>
                                <div className="text-3xl font-bold mt-1">{activeTrips}</div>
                            </div>
                            <Link href="/transporter-app/trips" className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors w-max">
                                Ir a recolecciones
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Bags Metric Card */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center justify-center text-center">
                        <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-3">
                            <Package className="h-5 w-5" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 mb-1">{totalBags}</span>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Bolsas <br />Recolectadas</span>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col items-center justify-center text-center">
                        <div className="h-10 w-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                            <CheckCircle className="h-5 w-5" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 mb-1">{completedTrips}</span>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Viajes <br />Completados</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
