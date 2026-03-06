import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PlantManifestForm from "./PlantManifestForm";

export default async function PlantManifestVerification({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id } = await params;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Fetch the specific manifest
    const { data: manifest, error } = await supabase
        .from('manifests')
        .select(`
            id,
            tracking_id,
            declared_bags,
            declared_weight,
            generator:generator_id (name, address),
            routes:route_id (scheduled_date)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error("Error fetching manifest:", error);
    }

    if (!manifest) {
        return <div className="p-8 text-center text-red-500">Manifiesto no encontrado.</div>;
    }

    const generator = Array.isArray(manifest.generator) ? manifest.generator[0] : manifest.generator as any;
    const route = Array.isArray(manifest.routes) ? manifest.routes[0] : manifest.routes as any;

    return (
        <PlantManifestForm
            manifestId={manifest.id}
            trackingId={manifest.tracking_id}
            declaredBags={manifest.declared_bags || 0}
            declaredWeight={manifest.declared_weight || 0}
            generatorName={generator?.name || 'Desconocido'}
            generatorAddress={generator?.address || 'Sin dirección'}
            scheduledDate={route?.scheduled_date || ''}
        />
    );
}
