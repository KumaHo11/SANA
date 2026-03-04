"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function verifyManifestAction(formData: FormData) {
    const supabase = await createClient();

    const manifest_id = formData.get("manifest_id") as string;
    const verified_bags = parseInt(formData.get("verified_bags") as string);
    const verified_weight = parseFloat(formData.get("verified_weight") as string);
    const plant_comments = formData.get("plant_comments") as string;

    const declared_bags = parseInt(formData.get("declared_bags") as string);
    const declared_weight = parseFloat(formData.get("declared_weight") as string);

    // Determine status based on discrepancies
    let status = 'DELIVERED';
    if (verified_bags !== declared_bags || verified_weight !== declared_weight) {
        status = 'DISCREPANCY';
    }

    const { error } = await supabase.from('manifests').update({
        status,
        verified_bags,
        verified_weight,
        plant_comments
    }).eq("id", manifest_id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/plant-app");
    redirect("/plant-app?success=true");
}
