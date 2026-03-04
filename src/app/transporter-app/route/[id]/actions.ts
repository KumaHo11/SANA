"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateManifestAction(formData: FormData) {
    const supabase = await createClient();

    const manifest_id = formData.get("manifest_id") as string;
    const declared_bags = parseInt(formData.get("declared_bags") as string);
    const declared_weight = parseFloat(formData.get("declared_weight") as string);
    const transporter_comments = formData.get("transporter_comments") as string;

    const { error } = await supabase.from('manifests').update({
        status: 'IN_TRANSIT',
        declared_bags,
        declared_weight,
        transporter_comments
    }).eq("id", manifest_id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/transporter-app", "layout");
    redirect("/transporter-app/trips?success=true");
}
