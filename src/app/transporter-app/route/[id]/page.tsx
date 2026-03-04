import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TransporterRouteForm from "./TransporterRouteForm";

export default async function TransporterRouteDetail({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { id } = await params;

    const { data: manifest, error } = await supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            declared_bags,
            declared_weight,
            route_id,
            generator:generator_id (name, address)
        `)
        .eq('id', id)
        .single();

    if (!manifest) {
        return (
            <div className="p-8 text-center text-red-500">
                <p>Manifiesto no encontrado.</p>
                {/* Ocultamos el error crudo para no confundir al usuario, pero se loguea en consola */}
            </div>
        );
    }

    let routeRef = null;
    if (manifest.route_id) {
        const { data: routeData } = await supabase
            .from('routes')
            .select('*')
            .eq('id', manifest.route_id)
            .single();
        if (routeData) {
            routeRef = routeData;
        }
    }

    const generator = Array.isArray(manifest.generator) ? manifest.generator[0] : manifest.generator as any;

    return (
        <TransporterRouteForm
            manifestId={manifest.id}
            trackingId={manifest.tracking_id}
            locationName={generator?.name || 'Desconocido'}
            address={generator?.address || 'Sin dirección'}
            scheduledDate={routeRef?.scheduled_date || ''}
            scheduledTime={routeRef?.scheduled_time || ''}
            driverName={routeRef?.driver_name || ''}
            truckPlate={routeRef?.truck_plate || ''}
        />
    );
}
