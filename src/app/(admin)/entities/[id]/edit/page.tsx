
import { EditCompanyForm } from "@/components/admin/EditCompanyForm";
import { updateCompany } from "@/app/(admin)/entities/actions";

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditEntityPage({ params }: { params: Promise<{ id: string }> }) {
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
                returnUrl="/entities"
                title="Editar Entidad Generadora"
                subtitle="Modificar datos de la organización."
                iconName="Users"
                iconColorClass="text-blue-600"
                iconBgClass="bg-blue-100"
            />
        </div>
    );
}
