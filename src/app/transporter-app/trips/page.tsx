
import Link from "next/link";
import { Bell, MapPin, Package, Clock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TransporterDashboard() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase.from('profiles').select('company_id, first_name').eq('id', user.id).single();
    if (!profile?.company_id) {
        // Fallback if no company assigned
        return <div>No company assigned to this profile.</div>;
    }

    // Fetch manifests assigned to this transporter's routes
    const { data: manifests } = await supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            status,
            declared_bags,
            declared_weight,
            generator:generator_id (name, address),
            routes!inner (
                id,
                status,
                scheduled_date,
                transporter_id
            )
        `)
        .eq('routes.transporter_id', profile.company_id)
        .order('created_at', { ascending: false });

    // Filter pending or in-progress trips
    const activeManifests = manifests?.filter(m => m.status === 'CREATED' || m.status === 'PICKED_UP' || m.status === 'IN_TRANSIT') || [];

    return (
        <div className="flex flex-col relative w-full h-full">
            <div className="bg-green-600 px-6 pt-4 pb-8 text-white rounded-b-3xl">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-sm font-medium text-green-100">Hola {profile.first_name}!</p>
                        <h1 className="text-2xl font-bold mt-1">{activeManifests.length} viajes por hacer</h1>
                    </div>
                    <button className="p-2 hover:bg-green-700 rounded-full transition-colors relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-2 block h-2 w-2 rounded-full bg-red-500 border border-green-600"></span>
                    </button>
                </div>
                <h2 className="font-semibold text-lg">Hoja de ruta</h2>
            </div>

            <div className="px-4 py-6 -mt-6">
                <div className="space-y-4">

                    {activeManifests.map((loc: any, idx: number) => (
                        <div key={loc.id} className="bg-white rounded-xl border border-green-200/50 shadow-sm overflow-hidden relative animate-in fade-in slide-in-from-bottom flex flex-col" style={{ animationDelay: `${idx * 150}ms` }}>

                            <div className="p-4 border-b border-green-50/50">
                                {(loc.status === 'PICKED_UP' || loc.status === 'IN_TRANSIT') && (
                                    <div className="bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
                                        <TruckIcon className="w-3 h-3" />
                                        en curso
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-green-600 font-bold text-lg leading-tight">{loc.generator?.name}</h3>
                                    <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                                        {loc.tracking_id || loc.id.slice(0, 8)}
                                    </span>
                                </div>

                                <div className="space-y-2.5 text-xs text-slate-500">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 shrink-0 text-green-500" />
                                        <span>{loc.generator?.address || 'Sin dirección'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 shrink-0 text-green-500" />
                                        <span>
                                            {loc.declared_bags !== null ? `Bolsas: ${loc.declared_bags} · Peso: ${loc.declared_weight} kg` : "Pendiente de carga"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 shrink-0 text-green-500" />
                                        <span>{loc.routes?.scheduled_date ? loc.routes.scheduled_date : "Sin fecha"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón de acción */}
                            {loc.status === "CREATED" ? (
                                <div className="p-3 bg-slate-50/50">
                                    <Link href={`/transporter-app/route/${loc.id}`} className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 active:scale-[0.98]">
                                        <Package className="h-4 w-4" />
                                        Cargar datos
                                    </Link>
                                </div>
                            ) : (
                                <div className="h-1 bg-green-500 w-full rounded-b-xl absolute bottom-0 left-0"></div>
                            )}
                        </div>
                    ))}

                    {activeManifests.length === 0 && (
                        <div className="text-center p-8 text-slate-500 bg-white rounded-xl border border-slate-200">
                            No tienes hojas de ruta asignadas.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

// Helper icon
function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10 17h4V5H2v12h3" />
            <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
            <path d="M14 17h1" />
            <circle cx="7.5" cy="17.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    );
}
