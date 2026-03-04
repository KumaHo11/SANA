"use server";

import { createClient } from "@/utils/supabase/server";

export async function registerCompanyAndUser(data: any, type: 'GENERATOR' | 'TRANSPORTER', role: 'ADMIN_GENERATOR' | 'ADMIN_TRANSPORTER') {
    const supabase = await createClient();

    // 1. Check if CUIT already exists just to be safe and provide a nice error
    const { data: existingCompany } = await supabase.from('companies').select('id').eq('cuit', data.cuit).single();
    if (existingCompany) {
        return { error: "Ya existe una empresa registrada con ese CUIT." };
    }

    // 2. Sign Up User
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    });

    if (authError || !authData?.user) {
        return { error: authError?.message || "Error al crear la cuenta de usuario." };
    }

    // 3. Create Company
    const companyId = crypto.randomUUID();
    const { error: companyError } = await supabase.from('companies').insert({
        id: companyId,
        name: data.company,
        cuit: data.cuit,
        type: type,
        address: data.address,
    });

    if (companyError) {
        return { error: companyError.message };
    }

    // 4. Create Profile
    const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        dni: data.dni,
        role: role,
        company_id: companyId
    });

    if (profileError) {
        return { error: profileError.message };
    }

    return { success: true };
}
