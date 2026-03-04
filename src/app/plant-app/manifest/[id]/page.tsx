import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PlantManifestForm from "./PlantManifestForm";

export default async function PlantManifestVerification({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // Fetch the specific manifest
    const { data: manifest } = await supabase
        .from('manifests')
        .select(`
            id,
            declared_bags,
            declared_weight,
            generator:generator_id (name, address),
            routes (scheduled_date)
        `)
        .eq('id', params.id)
        .single();

    if (!manifest) {
        return <div className="p-8 text-center text-red-500">Manifiesto no encontrado.</div>;
    }

    const generator = Array.isArray(manifest.generator) ? manifest.generator[0] : manifest.generator as any;
    const route = Array.isArray(manifest.routes) ? manifest.routes[0] : manifest.routes as any;

    return (
        <PlantManifestForm
            manifestId={manifest.id}
            declaredBags={manifest.declared_bags || 0}
            declaredWeight={manifest.declared_weight || 0}
            generatorName={generator?.name || 'Desconocido'}
            generatorAddress={generator?.address || 'Sin dirección'}
            scheduledDate={route?.scheduled_date || ''}
        />
    );
}
