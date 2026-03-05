import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();

    if (!authData?.user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

    // Redirigir a usuarios con otros roles a sus apps correspondientes
    if (profile?.role === 'ADMIN_TRANSPORTER' || profile?.role === 'TRANSPORTER') {
        redirect("/transporter-app");
    }

    if (profile?.role === 'ADMIN_GENERATOR' || profile?.role === 'GENERATOR') {
        redirect("/generator-app");
    }

    // Si no es ninguno de esos, asumimos que es Administrador de SANA (o Plant)
    return <DashboardLayout>{children}</DashboardLayout>;
}
