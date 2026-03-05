
import { EditCompanyForm } from "@/components/admin/EditCompanyForm";
import { updateCompany } from "@/app/(admin)/entities/actions";
import { Building2 } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditTreatmentPlantPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: company } = await supabase.from('companies').select('*').eq('id', id).single();

    if (!company) {
        notFound();
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <EditCompanyForm
                company={company}
                updateAction={updateCompany}
                returnUrl="/treatment-plants"
                title="Editar Planta de Tratamiento"
                subtitle="Modificar datos de la planta operadora."
                Icon={Building2}
                iconColorClass="text-purple-600"
                iconBgClass="bg-purple-100"
            />
        </div>
    );
}
