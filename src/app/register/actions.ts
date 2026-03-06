"use server";

import { createClient } from "@/utils/supabase/server";

export async function lookupCuitAndRegister(actionType: 'lookup' | 'register', data: any) {
    const supabase = await createClient();

    if (actionType === 'lookup') {
        const { cuit } = data;

        // Limpiamos el CUIT de guiones o espacios para la búsqueda
        const cleanCuit = cuit.replace(/[^0-9]/g, '');

        if (!cleanCuit) return { error: "Formato de CUIT inválido." };

        const { data: company, error } = await supabase
            .from('companies')
            .select('id, name')
            .eq('cuit', cleanCuit)
            .single();

        if (error || !company) {
            return { error: "No encontramos ninguna entidad operando con este CUIT en el sistema." };
        }

        return { company };
    }

    if (actionType === 'register') {
        const { email, password, companyId } = data;

        // 1. Crear el usuario en Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            if (authError.message.includes('already registered')) {
                return { error: 'Este correo ya está registrado.' };
            }
            return { error: authError.message };
        }

        if (authData.user) {
            // 2. Obtener el rol de la empresa asociada (Generador, Planta, etc.)
            const { data: companyRecord } = await supabase
                .from('companies')
                .select('type')
                .eq('id', companyId)
                .single();

            let role = 'ADMIN_GENERATOR'; // Default safe fallback among enum values
            if (companyRecord?.type === 'GENERATOR') role = 'ADMIN_GENERATOR';
            if (companyRecord?.type === 'TRANSPORTER') role = 'OPERATOR_TRANSPORTER';
            if (companyRecord?.type === 'TREATMENT_PLANT') role = 'OPERATOR_PLANT';

            // 3. Asociar el profile a la company y asignar su rol operativo
            // (El trigger de user_signup creará el perfil, necesitamos hacer update)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    company_id: companyId,
                    role: role,
                    is_approved: false // Por defecto, hasta que el Admin lo apruebe
                })
                .eq('id', authData.user.id);

            if (profileError) {
                console.error("Error updating profile association:", profileError);
                // No retornamos error fatal porque el Auth ya se hizo, pero informamos internamente
            }
        }

        return { success: true };
    }

    return { error: "Acción desconocida" };
}
