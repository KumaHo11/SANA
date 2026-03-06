"use client";

import { ActionButton } from "./ActionButton";
import { toggleUserApproval, deleteUser } from "@/app/(admin)/users/actions";

export function UserActions({
    id,
    isApproved,
}: {
    id: string;
    isApproved: boolean;
}) {
    const handleAction = async (userId: string, type: "approve" | "reject" | "delete") => {
        if (type === 'approve' || type === 'reject') {
            const result = await toggleUserApproval(userId, isApproved);
            if (result?.error) alert(result.error);
        } else if (type === 'delete') {
            if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                const result = await deleteUser(userId);
                if (result?.error) alert(result.error);
            }
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {isApproved ? (
                <ActionButton id={id} type="reject" onConfirm={handleAction} title="Rechazar / Suspender" />
            ) : (
                <ActionButton id={id} type="approve" onConfirm={handleAction} title="Aprobar" />
            )}
            <ActionButton id={id} type="delete" onConfirm={handleAction} title="Eliminar" />
        </div>
    );
}
