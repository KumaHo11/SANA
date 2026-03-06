"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleUserApproval(userId: string, currentStatus: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('profiles')
        .update({ is_approved: !currentStatus })
        .eq('id', userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/users");
    return { success: true };
}

export async function deleteUser(userId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/users");
    return { success: true };
}
