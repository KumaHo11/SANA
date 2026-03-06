"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendPasswordResetEmail(email: string) {
    if (!email) {
        return { error: "El correo electrónico es obligatorio." };
    }

    const supabase = await createClient();

    // Supabase intentará enviar el correo de reset
    // Notar que auth.resetPasswordForEmail requiere que tengas configurada
    // la URL de redirección en el dashboard de Supabase (Site URL y Redirect URLs).
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
        return { error: "No se pudo enviar el correo de recuperación. Verifica que la dirección sea correcta." };
    }

    return { success: true };
}
