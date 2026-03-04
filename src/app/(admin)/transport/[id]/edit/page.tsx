import DashboardLayout from "@/components/layout/DashboardLayout";
import { EditCompanyForm } from "@/components/admin/EditCompanyForm";
import { updateCompany } from "@/app/(admin)/entities/actions";
import { Truck } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export default async function EditTransportPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: company } = await supabase.from('companies').select('*').eq('id', id).single();

    if (!company) {
        notFound();
    }

    return (
        <DashboardLayout>
            <EditCompanyForm
                company={company}
                updateAction={updateCompany}
                returnUrl="/transport"
                title="Editar Empresa Transportista"
                subtitle="Modificar datos del transportista y flota."
                Icon={Truck}
                iconColorClass="text-orange-600"
                iconBgClass="bg-orange-100"
            />
        </DashboardLayout>
    );
}
