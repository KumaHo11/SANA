"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "No user found" };

    const fullName = formData.get("fullName") as string;

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
        })
        .eq('id', user.id);

    if (error) {
        return { error: error.message };
    }

    await supabase.auth.updateUser({
        data: { name: fullName }
    });

    revalidatePath("/profile");
    return { success: true };
}
