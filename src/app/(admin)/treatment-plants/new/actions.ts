"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTreatmentPlant(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const cuit = formData.get("cuit") as string;
    const contact_name = formData.get("contact_name") as string;
    const contact_email = formData.get("contact_email") as string;
    const type = 'TREATMENT_PLANT';

    // Generamos el UUID
    const companyId = crypto.randomUUID();

    const { error } = await supabase.from('companies').insert({
        id: companyId,
        name,
        cuit,
        type,
        address: "No especificada",
        contact_name,
        contact_email
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/treatment-plants");
    revalidatePath("/tracking/new");
    redirect("/treatment-plants");
}
