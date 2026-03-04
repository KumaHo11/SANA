import { Filter, MapPin, Truck, Activity, FileText, Plus, X } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SearchInput } from "@/components/admin/SearchInput";

export default async function TrackingPage({ searchParams }: { searchParams: Promise<{ manifest?: string, query?: string }> }) {
    const supabase = await createClient();
    const { manifest: manifestIdQuery, query } = await searchParams;

    // Fetch manifests along with their related companies (generator, plant) and route.
    let queryBuilder = supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            status,
            declared_bags,
            declared_weight,
            routes (
                scheduled_date,
                status,
                companies:transporter_id (name)
            ),
            generator:generator_id (name),
            plant:plant_id (name)
        `)
        .order('created_at', { ascending: false });

    if (query) {
        queryBuilder = queryBuilder.ilike('tracking_id', `%${query}%`);
    }

    const { data: manifests } = await queryBuilder;

    // Calculate sum of active tracking metrics
    const activeCount = manifests?.filter(m => m.status === 'IN_TRANSIT' || m.status === 'PICKED_UP').length || 0;
    const discrepancyCount = manifests?.filter(m => m.status === 'DISCREPANCY').length || 0;

    // Fetch details for the modal if present
    let selectedManifest = null;
    let selectedRoute = null;
    if (manifestIdQuery) {
        const { data: mData } = await supabase
            .from('manifests')
            .select(`
                *,
                generator:generator_id (name, address),
                plant:plant_id (name, address)
            `)
            .eq('id', manifestIdQuery)
            .single();
        selectedManifest = mData;

        if (selectedManifest?.route_id) {
            const { data: routeData } = await supabase
                .from('routes')
                .select(`
                    *,
                    transporter:transporter_id (name)
                `)
                .eq('id', selectedManifest.route_id)
                .single();
            selectedRoute = routeData;
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hojas de Ruta</h1>
                        <p className="text-sm text-slate-500">Monitoreo de hojas de ruta y vehículos activos</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <SearchInput placeholder="Buscar por ID..." colorClass="green" />
                        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                            <Filter className="h-4 w-4" />
                            Filtros
                        </button>
                        <Link href="/tracking/new" className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_20px_rgba(22,163,74,0.3)] transition-all hover:bg-green-700 hover:shadow-[0_0_25px_rgba(22,163,74,0.4)]">
                            <Plus className="h-4 w-4" />
                            Nueva
                        </Link>
                    </div>
                </div>

                {/* Grid principal de trazabilidad */}
                <div className="flex flex-col gap-6">

                    {/* Card Resumen */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-slate-500" />
                            Estado general
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="rounded-xl bg-slate-50 p-3">
                                <p className="text-xs text-slate-500 font-medium">En tránsito / Retirado</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{activeCount}</p>
                            </div>
                            <div className="rounded-xl bg-red-50 p-3">
                                <p className="text-xs text-red-600 font-medium">Discrepancias</p>
                                <p className="text-2xl font-bold text-red-700 mt-1">{discrepancyCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lista de envíos activos en Grilla */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 shadow-sm flex flex-col">
                        <div className="border-b border-slate-200 p-4 bg-white rounded-t-2xl">
                            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-500" />
                                Hojas de Ruta
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {manifests?.map((shipment: any) => {
                                    const statusMap: Record<string, string> = {
                                        'SCHEDULED': 'Programado',
                                        'PICKED_UP': 'Retirado',
                                        'IN_TRANSIT': 'En tránsito',
                                        'DELIVERED': 'Entregado',
                                        'DISCREPANCY': 'Discrepancia'
                                    };
                                    const translatedStatus = statusMap[shipment.status] || shipment.status;

                                    return (
                                        <Link href={`/tracking?manifest=${shipment.id}`} key={shipment.id} className="block group rounded-xl border border-slate-200 bg-white p-4 shadow-md hover:shadow-lg hover:border-green-300 hover:-translate-y-1 transition-all cursor-pointer">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-sm font-bold text-slate-900 w-24 truncate" title={shipment.tracking_id || shipment.id}>
                                                    {shipment.tracking_id || shipment.id.slice(0, 8)}
                                                </span>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${['PICKED_UP', 'IN_TRANSIT'].includes(shipment.status) ? 'bg-amber-100 text-amber-800' :
                                                    shipment.status === 'DISCREPANCY' ? 'bg-red-100 text-red-800' :
                                                        shipment.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {translatedStatus}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-600 space-y-1.5 mb-4">
                                                <p><span className="font-semibold text-slate-700">De:</span> {shipment.generator?.name || 'Desconocido'}</p>
                                                <p><span className="font-semibold text-slate-700">Para:</span> {shipment.plant?.name || 'Desconocido'}</p>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-slate-100 pt-3 group-hover:border-green-100">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[120px]">
                                                    <Truck className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                                    <span className="truncate">{shipment.routes?.companies?.name || 'Sin Asignar'}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-slate-700">{shipment.routes?.scheduled_date || 'N/A'}</span>
                                            </div>
                                        </Link>
                                    );
                                })}

                                {(!manifests || manifests.length === 0) && (
                                    <div className="col-span-full p-8 text-center text-sm text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        No hay manifiestos que coincidan con la búsqueda.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Detalle del Manifiesto */}
            {selectedManifest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    Manifiesto: {selectedManifest.tracking_id || selectedManifest.id.slice(0, 8)}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Estado: <span className="font-semibold text-blue-600">{selectedManifest.status}</span>
                                </p>
                            </div>
                            <Link href="/tracking" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                <X className="h-5 w-5" />
                            </Link>
                        </div>

                        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
                            {/* Ruta / Actores */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-slate-400" /> Origen y Destino
                                </h4>
                                <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-xs font-medium">Generador (Origen)</span>
                                        <span className="font-semibold text-slate-800">{Array.isArray(selectedManifest.generator) ? selectedManifest.generator[0]?.name : selectedManifest.generator?.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-xs font-medium">Planta (Destino)</span>
                                        <span className="font-semibold text-slate-800">{Array.isArray(selectedManifest.plant) ? selectedManifest.plant[0]?.name : selectedManifest.plant?.name}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Transportista */}
                            {selectedRoute && (
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-slate-400" /> Información de Ruta
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs font-medium">Transportista</span>
                                            <span className="font-semibold text-slate-800">{Array.isArray(selectedRoute.transporter) ? selectedRoute.transporter[0]?.name : selectedRoute.transporter?.name || '-'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs font-medium">Chofer</span>
                                            <span className="font-semibold text-slate-800">{selectedRoute.driver_name || '-'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs font-medium">Patente</span>
                                            <span className="font-semibold text-slate-800">{selectedRoute.truck_plate || '-'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-500 text-xs font-medium">Programado</span>
                                            <span className="font-semibold text-slate-800">{selectedRoute.scheduled_date} {selectedRoute.scheduled_time}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pesos y bolsas */}
                            <div>
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-slate-400" /> Carga Registrada
                                </h4>
                                <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-xs font-medium">Bolsas (Transportista)</span>
                                        <span className="font-semibold text-slate-800">{selectedManifest.verified_bags !== null ? selectedManifest.verified_bags : 'No registradas'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-xs font-medium">Peso (Transportista)</span>
                                        <span className="font-semibold text-slate-800">{selectedManifest.verified_weight !== null ? `${selectedManifest.verified_weight} kg` : 'No registrado'}</span>
                                    </div>
                                </div>
                                {(selectedManifest.transporter_comments || selectedManifest.plant_comments) && (
                                    <div className="mt-3 space-y-2 text-sm rounded-xl border border-amber-200 bg-amber-50 p-4">
                                        {selectedManifest.transporter_comments && (
                                            <p className="text-amber-800"><span className="font-bold">Nota Transportista:</span> {selectedManifest.transporter_comments}</p>
                                        )}
                                        {selectedManifest.plant_comments && (
                                            <p className="text-amber-800"><span className="font-bold">Nota Planta:</span> {selectedManifest.plant_comments}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
