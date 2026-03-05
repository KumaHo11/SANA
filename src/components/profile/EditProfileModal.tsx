"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/profile/actions";
import { X, Save, Loader2 } from "lucide-react";

export function EditProfileModal({
    initialName,
    onClose
}: {
    initialName: string;
    onClose: () => void;
}) {
    const [state, formAction, isPending] = useActionState(updateProfile, null);

    if (state?.success) {
        onClose();
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl animate-in zoom-in-95">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-800">Editar Perfil</h2>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form action={formAction} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">Nombre completo</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                defaultValue={initialName}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                            />
                        </div>

                        {state?.error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                {state.error}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-green-700 hover:shadow disabled:opacity-50"
                        >
                            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {isPending ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
