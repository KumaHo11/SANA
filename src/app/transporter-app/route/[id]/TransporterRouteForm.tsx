"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, MapPin, Clock, User, AlertTriangle, CheckCircle2, XCircle, Truck } from "lucide-react";
import { updateManifestAction } from "./actions";

export default function TransporterRouteForm({
    manifestId,
    trackingId,
    locationName,
    address,
    scheduledDate,
    scheduledTime,
    driverName,
    truckPlate
}: {
    manifestId: string;
    trackingId: string | null;
    locationName: string;
    address: string;
    scheduledDate: string;
    scheduledTime?: string;
    driverName?: string;
    truckPlate?: string;
}) {

    const [realBags, setRealBags] = useState<string>("");
    const [realWeight, setRealWeight] = useState<string>("");

    const [comments, setComments] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const finalBags = parseInt(realBags) || 0;
    const finalWeight = parseFloat(realWeight) || 0;

    const isValid = realBags !== "" && realWeight !== "";

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) setShowModal(true);
    };

    const submitForm = async () => {
        setIsPending(true);
        const formData = new FormData();
        formData.append("manifest_id", manifestId);
        formData.append("declared_bags", finalBags.toString());
        formData.append("declared_weight", finalWeight.toString());
        formData.append("transporter_comments", comments);

        const result = await updateManifestAction(formData);

        if (result?.error) {
            alert(result.error);
            setIsPending(false);
            setShowModal(false);
        }
    };

    const formatDateTime = () => {
        if (!scheduledDate) return "No programado";
        return `${scheduledDate}${scheduledTime ? `, ${scheduledTime.slice(0, 5)} hrs` : ''}`;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 pb-20 lg:pb-8">
            {/* Header */}
            <div className="bg-[#10A34A] px-6 py-5 flex items-center justify-between text-white shadow-sm">
                <h1 className="text-xl font-medium">Hola operario!</h1>
                <Link href="/transporter-app/trips" className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                    <LogOut className="h-6 w-6" />
                </Link>
            </div>

            <div className="flex-1 px-4 py-6 max-w-xl mx-auto w-full space-y-4">

                <div className="bg-white rounded-xl border border-green-300 p-4 shadow-sm">
                    <label className="block text-sm font-medium text-[#10A34A] mb-1.5">ID Manifiesto / Rastreabilidad</label>
                    <div className="w-full rounded-lg border border-green-500 px-3 py-2.5 text-slate-900 bg-white font-medium">
                        {trackingId || manifestId.slice(0, 8)}
                    </div>
                </div>

                {/* Info Hospital / Generador */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                    <h2 className="text-lg font-bold text-[#10A34A]">{locationName}</h2>
                    <div className="space-y-2.5 text-sm text-slate-600 font-medium">
                        {(driverName) && (
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-[#10A34A]" />
                                <span>{driverName}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-[#10A34A]" />
                            <span>{address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-[#10A34A]" />
                            <span>{formatDateTime()}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleConfirm} className="space-y-4">

                    {/* Cantidad de Bolsas */}
                    <div className="bg-[#F4FBF4] rounded-xl border border-green-200 p-6 shadow-sm flex flex-col items-center text-center">
                        <p className="text-sm font-bold text-slate-900 mb-2">Cantidad de bolsas recolectadas</p>
                        <input
                            type="number"
                            value={realBags}
                            onChange={(e) => setRealBags(e.target.value)}
                            placeholder="Ej: 15"
                            className="w-full max-w-[200px] mt-2 rounded-xl border border-slate-300 px-4 py-3 text-center text-xl text-slate-900 bg-white focus:outline-none focus:border-green-500 font-medium"
                            required
                        />
                    </div>

                    {/* Peso Total */}
                    <div className="bg-[#F4FBF4] rounded-xl border border-green-200 p-6 shadow-sm flex flex-col items-center text-center">
                        <p className="text-sm font-bold text-slate-900 mb-2">Peso total recolectado (kg)</p>
                        <input
                            type="number"
                            step="0.1"
                            value={realWeight}
                            onChange={(e) => setRealWeight(e.target.value)}
                            placeholder="Ej: 45.5"
                            className="w-full max-w-[200px] mt-2 rounded-xl border border-slate-300 px-4 py-3 text-center text-xl text-slate-900 bg-white focus:outline-none focus:border-green-500 font-medium"
                            required
                        />
                    </div>

                    {/* Comentarios */}
                    <div className="pt-2">
                        <label className="block text-[15px] font-medium text-[#10A34A] mb-2">Comentarios</label>
                        <textarea
                            rows={3}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Observaciones"
                            className="w-full rounded-xl border border-slate-200 p-4 text-[15px] text-[#94a3b8] bg-white shadow-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div className="pt-4 pb-6">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-center font-semibold shadow-sm transition-all ${isValid
                                ? "bg-[#10A34A] text-white hover:bg-green-700 active:scale-[0.98]"
                                : "bg-[#92BAA1] text-white/90 cursor-not-allowed"
                                }`}
                        >
                            <Truck className="h-5 w-5" />
                            {isValid ? "Confirmar finalización" : "Confirmar verificación"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-[340px] rounded-2xl bg-white p-6 shadow-xl animate-in zoom-in-95">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50/80">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                        </div>
                        <h3 className="mb-3 text-[17px] font-bold text-slate-900 leading-snug">
                            ¿Está seguro que desea confirmar la verificación?
                        </h3>
                        <p className="mb-6 text-[15px] text-slate-600 leading-relaxed">
                            Al confirmar, declarás que las bolsas fueron recibidas correctamente.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                disabled={isPending}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-bold text-slate-900 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={submitForm}
                                disabled={isPending}
                                className="flex-1 rounded-lg bg-[#FBBF24] px-4 py-3 text-[15px] font-bold text-white hover:bg-yellow-500 flex items-center justify-center whitespace-nowrap disabled:opacity-50"
                            >
                                {isPending ? "Validando..." : "Si, confirmar viaje"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
