"use server";

import { createClient } from "@/utils/supabase/server";

export async function resetPassword(password: string) {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: "Sesión inválida o expirada. Por favor, solicita un nuevo enlace de recuperación." };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        password: password
    });

    if (updateError) {
        return { error: "No se pudo actualizar la contraseña. Asegúrate de cumplir con los requisitos mínimos." };
    }

    // Limpiar el flag de "must_change_password"
    await supabase.from('profiles').update({
        must_change_password: false,
        is_verified: true
    }).eq('id', user.id);

    return { success: true };
}
