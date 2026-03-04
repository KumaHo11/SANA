"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { data: authData, error } = await supabase.auth.signInWithPassword(data);

    if (error || !authData?.user) {
        redirect("/login?error=Invalid login credentials");
    }

    // Role and approval check
    const { data: profile } = await supabase
        .from('profiles')
        .select('role, company_id')
        .eq('id', authData.user.id)
        .single();

    if (profile?.company_id) {
        const { data: company } = await supabase
            .from('companies')
            .select('is_approved')
            .eq('id', profile.company_id)
            .single();

        if (company && !company.is_approved) {
            await supabase.auth.signOut();
            redirect("/login?error=pending_approval");
        }
    }

    let targetUrl = "/";
    if (profile?.role === 'ADMIN_TRANSPORTER' || profile?.role === 'TRANSPORTER') {
        targetUrl = "/transporter-app";
    } else if (profile?.role === 'ADMIN_GENERATOR' || profile?.role === 'GENERATOR') {
        targetUrl = "/generator-app"; // If it doesn't exist yet, it'll 404, we can let user handle that or redirect to /
    } else if (profile?.role === 'ADMIN_PLANT' || profile?.role === 'PLANT') {
        targetUrl = "/plant-app";
    }

    // After authenticating, determine where to send the user based on their profile role
    revalidatePath("/", "layout");
    redirect(targetUrl);
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
}
