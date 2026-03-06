import AuthLayout from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar Contraseña | SANA',
    description: 'Solicita un enlace para restablecer tu contraseña en la plataforma SANA.',
};

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            title="Recuperar contraseña"
            subtitle="Ingresa la dirección de correo electrónico asociada a tu cuenta y te enviaremos un enlace para restablecerla."
            showBackButton={true}
            backUrl="/login"
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
