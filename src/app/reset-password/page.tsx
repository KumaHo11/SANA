import AuthLayout from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import type { Metadata } from 'next';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Actualizar Contraseña | SANA',
    description: 'Establece una nueva contraseña segura para tu cuenta.',
};

export default async function ResetPasswordPage() {
    // Si llegas aquí sin una sesión válida tras el link, el formulario fallará al intentar guardarlo.
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    // Si no hay sesión, supabase te redireccionará si pones un redirect param, pero lo manejamos
    // aquí para ser explicitos si el usuario entra directo sin link de reset
    if (!data?.user) {
        redirect("/login");
    }

    return (
        <AuthLayout
            title="Establecer contraseña"
            subtitle="Por seguridad, tu nueva contraseña debe incluir letras, números y al menos un símbolo especial."
        >
            <ResetPasswordForm />
        </AuthLayout>
    );
}
