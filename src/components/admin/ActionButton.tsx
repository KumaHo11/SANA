"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Trash2 } from "lucide-react";

type ActionType = "approve" | "reject" | "delete";

export function ActionButton({
    id,
    type,
    onConfirm,
    title
}: {
    id: string;
    type: ActionType;
    onConfirm: (id: string, type: ActionType) => Promise<void>;
    title?: string;
}) {
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleConfirm = async () => {
        setIsPending(true);
        await onConfirm(id, type);
        setIsPending(false);
        setShowModal(false);
    };

    const Icon = type === 'approve' ? CheckCircle : type === 'reject' ? XCircle : Trash2;
    const btnColor = type === 'approve' ? "text-green-600 hover:bg-green-50" : type === 'reject' ? "text-amber-500 hover:bg-amber-50" : "text-red-500 hover:bg-red-50";

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                title={title}
                className={`rounded-lg p-2 transition-colors ${btnColor}`}
            >
                <Icon className="h-4 w-4" />
            </button>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-200 text-red-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-slate-900 leading-snug">
                            Confirmar acción crítica
                        </h3>
                        <p className="mb-6 text-[15px] text-slate-600 leading-relaxed">
                            {type === 'approve' && '¿Estás seguro de que quieres aprobar esta entidad para operar en SANA?'}
                            {type === 'reject' && '¿Estás seguro de que rechazar / suspender a esta entidad? No podrá operar en SANA.'}
                            {type === 'delete' && '¿Estás seguro de que quieres eliminar esta entidad PERMANENTEMENTE? Esta acción no se puede deshacer.'}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isPending}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[15px] font-bold text-slate-900 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isPending}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-[15px] font-bold text-white hover:bg-red-700 flex items-center justify-center disabled:opacity-50"
                            >
                                {isPending ? "Procesando..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
