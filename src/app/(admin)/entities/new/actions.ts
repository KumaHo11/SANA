"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEntity(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const cuit = formData.get("cuit") as string;
    const address = formData.get("address") as string;
    const type = 'GENERATOR';

    const { error } = await supabase.from('companies').insert({
        name,
        cuit,
        type,
        address
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/entities");
    redirect("/entities");
}
