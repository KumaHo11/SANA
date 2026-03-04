import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TransporterLayout from "@/components/transporter/TransporterLayout";

export default async function TransporterAppLayout({
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

    if (profile?.role !== 'ADMIN_TRANSPORTER' && profile?.role !== 'TRANSPORTER') {
        if (profile?.role === 'ADMIN_GENERATOR' || profile?.role === 'GENERATOR') {
            redirect("/generator-app");
        }
        // Si no es transportista ni generador, asumimos Admin SANA
        redirect("/");
    }

    return (
        <TransporterLayout>
            {children}
        </TransporterLayout>
    );
}
