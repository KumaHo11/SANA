import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PlantAppLayout({
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

    // Roles permitidos para la app de plantas
    if (profile?.role !== 'ADMIN_PLANT' && profile?.role !== 'PLANT_OPERATOR' && profile?.role !== 'PLANT' && profile?.role !== 'OPERATOR_PLANT' && profile?.role !== 'ADMIN_GENERAL' && profile?.role !== 'SUPERADMIN') {
        if (profile?.role === 'ADMIN_TRANSPORTER' || profile?.role === 'TRANSPORTER' || profile?.role === 'OPERATOR_TRANSPORTER') {
            redirect("/transporter-app");
        }
        if (profile?.role === 'ADMIN_GENERATOR' || profile?.role === 'GENERATOR' || profile?.role === 'OPERATOR_GENERATOR') {
            redirect("/generator-app");
        }
        redirect("/");
    }

    return <>{children}</>;
}
