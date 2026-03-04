"use client";

import { ActionButton } from "./ActionButton";
import { toggleCompanyApproval, deleteCompany } from "@/app/(admin)/entities/actions";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CompanyActions({
    id,
    isApproved,
    path,
    editUrl
}: {
    id: string;
    isApproved: boolean;
    path: string;
    editUrl: string;
}) {
    const router = useRouter();

    const handleAction = async (companyId: string, type: "approve" | "reject" | "delete") => {
        if (type === 'approve' || type === 'reject') {
            const result = await toggleCompanyApproval(companyId, isApproved, path);
            if (result?.error) alert(result.error);
        } else if (type === 'delete') {
            const result = await deleteCompany(companyId, path);
            if (result?.error) alert(result.error);
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {isApproved ? (
                <ActionButton id={id} type="reject" onConfirm={handleAction} title="Rechazar / Suspender" />
            ) : (
                <ActionButton id={id} type="approve" onConfirm={handleAction} title="Aprobar" />
            )}
            <Link href={editUrl} title="Editar" className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Pencil className="h-4 w-4" />
            </Link>
            <ActionButton id={id} type="delete" onConfirm={handleAction} title="Eliminar" />
        </div>
    );
}
