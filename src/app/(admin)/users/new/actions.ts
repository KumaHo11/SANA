"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createUserByAdmin({
    email,
    fullName,
    password,
    companyId,
    role
}: {
    email: string,
    fullName: string,
    password: string,
    companyId: string,
    role: string
}) {
    // 1. Necesitamos el Service Role Key para crear auth users sin auto-logueo
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 2. Crear usuario en Auth (Supabase)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email when created by Admin
        user_metadata: {
            first_name: fullName.split(" ")[0], // Se inyecta al trigger para popular el primer nombre
            last_name: fullName.split(" ").slice(1).join(" ") // Resto del nombre
        }
    });

    if (authError) {
        if (authError.message.includes('already registered')) {
            return { error: 'Este correo ya está registrado.' };
        }
        return { error: authError.message };
    }

    if (authData.user) {
        // 3. Forzar el update del perfil (el trigger handle_new_user crea el profile base)
        // Como Admin, lo asociamos a la empresa y lo aprobamos automáticamente
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({
                company_id: companyId,
                role: role,
                is_approved: true, // Como lo crea un Admin, asume que está aprobado
                must_change_password: true // Forzamos cambio de clave temporal
            })
            .eq('id', authData.user.id);

        if (profileError) {
            console.error("Error setting user profile as admin:", profileError);
            return { error: "El usuario se creó pero hubo un fallo al asignar sus permisos." };
        }
    }

    revalidatePath("/users");
    return { success: true };
}
