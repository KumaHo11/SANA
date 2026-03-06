import PlantMobileLayout from "@/components/plant/PlantMobileLayout";
import Link from "next/link";
import { Package, Truck } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PlantDashboard() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase.from('profiles').select('company_id, first_name').eq('id', user.id).single();
    if (!profile?.company_id) {
        return <div>No se ha asignado ninguna empresa a este perfil.</div>;
    }

    // Fetch manifests assigned to this plant, that are in transit or picked up
    const { data: manifests } = await supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            status,
            declared_bags,
            declared_weight,
            generator:generator_id (name),
            routes:route_id (
                scheduled_date,
                transporter:transporter_id (name)
            )
        `)
        .eq('plant_id', profile.company_id)
        .in('status', ['PICKED_UP', 'IN_TRANSIT', 'CREATED'])
        .order('created_at', { ascending: false });

    // Fetch completed/history manifests
    const { data: completedManifests } = await supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            status,
            verified_bags,
            verified_weight,
            created_at,
            generator:generator_id (name)
        `)
        .eq('plant_id', profile.company_id)
        .in('status', ['DELIVERED', 'DISCREPANCY', 'REJECTED'])
        .order('created_at', { ascending: false })
        .limit(20);

    return (
        <PlantMobileLayout>
            <div className="bg-[#0f9f3f] px-6 pt-4 pb-8 text-white rounded-b-3xl">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm font-medium text-green-100">¡Hola {profile.first_name}!</p>
                            <h1 className="text-2xl font-bold mt-1">{manifests?.length || 0} recorridos en proceso</h1>
                        </div>
                    </div>
                    <h2 className="font-semibold text-lg">Recepciones esperadas</h2>
                </div>
            </div>

            <div className="px-4 py-6 -mt-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Recepciones Pendientes */}
                    <div className="space-y-4">
                        {manifests?.map((loc: any, idx: number) => (
                            <div key={loc.id} className="bg-white rounded-xl border border-green-200/50 shadow-sm overflow-hidden relative animate-in fade-in flex flex-col" style={{ animationDelay: `${idx * 150}ms` }}>

                                <div className="p-4 border-b border-green-50/50">
                                    <div className="text-xs font-bold text-slate-500 mb-2">Hoja de ruta: {loc.tracking_id || loc.id}</div>
                                    <h3 className="text-[#0f9f3f] font-bold text-lg leading-tight mb-3">De: {loc.generator?.name}</h3>

                                    <div className="space-y-2.5 text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4 shrink-0 text-green-500" />
                                            <span>Transporte: {loc.routes?.transporter?.name || 'A designar'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 shrink-0 text-green-500" />
                                            <span>
                                                Bolsas: {loc.declared_bags} · Peso: {loc.declared_weight} kg
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-slate-50/50">
                                    <Link href={`/plant-app/manifest/${loc.id}`} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0f9f3f] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0c8534] active:scale-[0.98]">
                                        <Package className="h-4 w-4" />
                                        Verificar recepción
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {(!manifests || manifests.length === 0) && (
                            <div className="text-center p-8 text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <Package className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                                <p className="font-medium text-slate-600">No hay recepciones pendientes.</p>
                                <p className="text-sm mt-1">Cuando un transportista cargue residuos hacia tu planta, aparecerán aquí.</p>
                            </div>
                        )}
                    </div>

                    {/* Historial de Recepciones */}
                    <div className="mt-8">
                        <h2 className="font-semibold text-lg text-slate-800 mb-4 px-2">Historial de recepciones</h2>
                        <div className="space-y-4">
                            {completedManifests?.map((loc: any, idx: number) => (
                                <div key={loc.id} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden opacity-80 transition-opacity hover:opacity-100 flex flex-col">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xs font-bold text-slate-500">Hoja de ruta: {loc.tracking_id || loc.id}</div>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${loc.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {loc.status === 'DELIVERED' ? 'Recibido' : 'Discrepancia'}
                                            </span>
                                        </div>
                                        <h3 className="text-slate-700 font-bold text-base mb-2">De: {loc.generator?.name}</h3>
                                        <div className="flex justify-between items-center text-xs text-slate-500">
                                            <div>Verificado: {loc.verified_bags} bolsas ({loc.verified_weight} kg)</div>
                                            <div>{new Date(loc.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-3 pt-1 text-xs">
                                        <Link href={`/plant-app/manifest/${loc.id}`} className="text-slate-400 font-medium hover:text-[#0f9f3f] transition-colors flex items-center gap-1">
                                            Ver detalles &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {(!completedManifests || completedManifests.length === 0) && (
                                <div className="text-center p-6 text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-sm">
                                    Aún no has completado ninguna recepción.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PlantMobileLayout>
    );
}
