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
            status,
            declared_bags,
            declared_weight,
            generator:generator_id (name),
            routes:route_id (companies:transporter_id (name), scheduled_date)
        `)
        .eq('plant_id', profile.company_id)
        .in('status', ['PICKED_UP', 'IN_TRANSIT', 'CREATED'])
        .order('created_at', { ascending: false });

    return (
        <PlantMobileLayout>
            <div className="bg-[#0f9f3f] px-6 pt-4 pb-8 text-white rounded-b-3xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-sm font-medium text-green-100">Hola {profile.first_name}!</p>
                        <h1 className="text-2xl font-bold mt-1">{manifests?.length || 0} manifiestos en camino</h1>
                    </div>
                </div>
                <h2 className="font-semibold text-lg">Recepciones Esperadas</h2>
            </div>

            <div className="px-4 py-6 -mt-6">
                <div className="space-y-4">
                    {manifests?.map((loc: any, idx: number) => (
                        <div key={loc.id} className="bg-white rounded-xl border border-green-200/50 shadow-sm overflow-hidden relative animate-in fade-in flex flex-col" style={{ animationDelay: `${idx * 150}ms` }}>

                            <div className="p-4 border-b border-green-50/50">
                                <div className="text-xs font-bold text-slate-500 mb-2">Manifiesto {loc.id}</div>
                                <h3 className="text-[#0f9f3f] font-bold text-lg leading-tight mb-3">De: {loc.generator?.name}</h3>

                                <div className="space-y-2.5 text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 shrink-0 text-green-500" />
                                        <span>Transporte: {loc.routes?.companies?.name || 'A designar'}</span>
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
                                    Verificar Recepción
                                </Link>
                            </div>
                        </div>
                    ))}

                    {(!manifests || manifests.length === 0) && (
                        <div className="text-center p-8 text-slate-500 bg-white rounded-xl border border-slate-200">
                            No hay recepciones pendientes.
                        </div>
                    )}
                </div>
            </div>
        </PlantMobileLayout>
    );
}
