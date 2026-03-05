
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { NewManifestForm } from "./NewManifestForm";

export const dynamic = 'force-dynamic';

export default async function NewShipmentPage() {
    const supabase = await createClient();

    // Fetch companies to populate dropdowns
    const { data: companies } = await supabase.from('companies').select('id, name, type');

    const generators = companies?.filter(c => c.type === 'GENERATOR') || [];
    const transporters = companies?.filter(c => c.type === 'TRANSPORTER') || [];
    const plants = companies?.filter(c => c.type === 'TREATMENT_PLANT') || [];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <Link
                    href="/tracking"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nueva hoja de ruta</h1>
                        <p className="text-sm text-slate-500">Crear una ruta y asignar manifiesto para su recolección.</p>
                    </div>
                </div>
            </div>

            <NewManifestForm generators={generators} transporters={transporters} plants={plants} />

        </div>
    );
}
