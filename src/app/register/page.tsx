import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { CuitLookupForm } from "@/components/auth/CuitLookupForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Registro de Usuarios | SANA',
    description: 'Vincúlate a tu organización a través del CUIT.',
};

export default function RegisterSelectionPage() {
    return (
        <AuthLayout
            title="Registro de usuario"
            subtitle="Para operar en SANA, debes vincular tu cuenta a una entidad previamente registrada."
            showBackButton={true}
            backUrl="/login"
        >
            <CuitLookupForm />

            <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-600">
                    ¿Ya tienes una cuenta vinculada?{' '}
                    <Link href="/login" className="font-semibold text-green-600 hover:text-green-500">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
