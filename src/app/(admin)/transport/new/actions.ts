"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransporter(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const cuit = formData.get("cuit") as string;
    const type = 'TRANSPORTER';

    // Para evitar problemas de RLS si el admin accidentalmente no tiene sesión activa válida o para simplificar la creación
    const companyId = crypto.randomUUID();

    const { error } = await supabase.from('companies').insert({
        id: companyId,
        name,
        cuit,
        type,
        address: "No especificada",
        // Aquí podríamos guardar flota u otros datos si agregamos campos a la tabla companies después
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/transport");
    revalidatePath("/tracking/new");
    redirect("/transport");
}
