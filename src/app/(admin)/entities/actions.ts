"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleCompanyApproval(companyId: string, currentStatus: boolean, returnPath: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('companies')
        .update({ is_approved: !currentStatus })
        .eq('id', companyId);

    if (error) {
        console.error("Error toggling approval:", error);
        return { error: error.message };
    }

    revalidatePath(returnPath);
    return { success: true };
}

export async function deleteCompany(companyId: string, returnPath: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);

    if (error) {
        console.error("Error deleting company:", error);
        return { error: "No se pudo eliminar la entidad. Es posible que tenga registros asociados." };
    }

    revalidatePath(returnPath);
    return { success: true };
}

export async function updateCompany(
    prevState: any,
    formData: FormData
) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const cuit = formData.get("cuit") as string;
    const address = formData.get("address") as string;
    const contact_name = formData.get("contact_name") as string;
    const contact_email = formData.get("contact_email") as string;
    const returnPath = formData.get("returnPath") as string;

    // Address may be passed as optional in some cases but currently required
    if (!id || !name || !cuit) {
        return { error: "Los campos principales son obligatorios" };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from('companies')
        .update({
            name,
            cuit,
            address,
            contact_name,
            contact_email
        })
        .eq('id', id);

    if (error) {
        console.error("Error updating company:", error);
        return { error: error.message };
    }

    revalidatePath(returnPath);
    return { success: true };
}
