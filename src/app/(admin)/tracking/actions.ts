"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function receiveManifestAction(formData: FormData) {
    const supabase = await createClient();

    const manifest_id = formData.get("manifest_id") as string;
    const verified_bags = parseInt(formData.get("verified_bags") as string);
    const verified_weight = parseFloat(formData.get("verified_weight") as string);
    const plant_comments = formData.get("plant_comments") as string;

    // 1. Obtener valores declarados
    const { data: manifest, error: fetchError } = await supabase
        .from('manifests')
        .select('declared_bags, declared_weight')
        .eq("id", manifest_id)
        .single();

    if (fetchError || !manifest) {
        return { error: "No se encontró el manifiesto para validar." };
    }

    // 2. Regla Crítica: Si hay discrepancias a la baja, el comentario es obligatorio
    const hasDiscrepancy =
        verified_bags < manifest.declared_bags ||
        verified_weight < manifest.declared_weight;

    if (hasDiscrepancy && (!plant_comments || plant_comments.trim() === "")) {
        return {
            error: "Discrepancia detectada: La cantidad recibida es MENOR a la declarada. Es obligatorio justificar el motivo en los comentarios."
        };
    }

    // 3. Actualizar manifiesto
    const { error: updateError } = await supabase.from('manifests').update({
        status: 'RECEIVED',
        verified_bags,
        verified_weight,
        plant_comments
    }).eq("id", manifest_id);

    if (updateError) {
        return { error: updateError.message };
    }

    revalidatePath("/(admin)/tracking", "layout");
    redirect("/tracking?success=received");
}
