"use client";

import { useState } from "react";
import { User, MapPin, Clock, Check, X } from "lucide-react";
import PlantMobileLayout from "@/components/plant/PlantMobileLayout";
import { verifyManifestAction } from "./actions";

export default function PlantManifestForm({
    manifestId,
    trackingId,
    declaredBags,
    declaredWeight,
    generatorName,
    generatorAddress,
    scheduledDate
}: {
    manifestId: string;
    trackingId?: string;
    declaredBags: number;
    declaredWeight: number;
    generatorName: string;
    generatorAddress: string;
    scheduledDate: string;
}) {
    const [bagsCorrect, setBagsCorrect] = useState<boolean | null>(null);
    const [weightCorrect, setWeightCorrect] = useState<boolean | null>(null);

    const [actualBags, setActualBags] = useState<string>("");
    const [actualWeight, setActualWeight] = useState<string>("");
    const [comments, setComments] = useState<string>("");
    const [isPending, setIsPending] = useState(false);

    const isFormValid = () => {
        if (bagsCorrect === null || weightCorrect === null) return false;
        if (bagsCorrect === false && !actualBags) return false;
        if (weightCorrect === false && !actualWeight) return false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData();
        formData.append("manifest_id", manifestId);

        formData.append("declared_bags", declaredBags.toString());
        formData.append("declared_weight", declaredWeight.toString());

        formData.append("verified_bags", bagsCorrect ? declaredBags.toString() : actualBags);
        formData.append("verified_weight", weightCorrect ? declaredWeight.toString() : actualWeight);
        formData.append("plant_comments", comments);

        const result = await verifyManifestAction(formData);

        if (result?.error) {
            alert(result.error);
            setIsPending(false);
        }
    };

    return (
        <PlantMobileLayout>
            <form onSubmit={handleSubmit} className="px-5 py-6 pb-24 space-y-6">

                <div>
                    <label className="block text-[#0f9f3f] font-medium text-sm mb-1.5">Hoja de Ruta</label>
                    <div className="w-full rounded-xl border border-green-400 p-3 bg-white shadow-sm flex items-center">
                        <span className="text-slate-800 font-medium w-full truncate" title={trackingId || manifestId}>
                            {trackingId || manifestId}
                        </span>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
                    <h2 className="text-lg font-bold text-[#0f9f3f]">{generatorName}</h2>
                    <div className="space-y-2 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-2">
                            <MapPin className="h-4 w-4 text-[#0f9f3f]" />
                            <span>{generatorAddress}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-[#0f9f3f]" />
                            <span>{scheduledDate}</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-green-200/60 bg-green-50/40 p-5 shadow-sm space-y-4 text-center">
                    <h3 className="text-sm font-bold text-slate-900">Cantidad de bolsas declaradas</h3>
                    <p className="text-4xl font-semibold text-[#0f9f3f]">{declaredBags}</p>
                    <p className="text-sm font-bold text-slate-900">¿Es correcto?</p>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => { setBagsCorrect(true); setActualBags(""); }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-bold transition-all border
                                ${bagsCorrect === true
                                    ? "bg-[#0f9f3f] text-white border-[#0f9f3f]"
                                    : "bg-white text-slate-800 border-green-500"}`}
                        >
                            <Check className="h-5 w-5" /> Si
                        </button>
                        <button
                            type="button"
                            onClick={() => setBagsCorrect(false)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-bold transition-all border
                                ${bagsCorrect === false
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-white text-slate-800 border-red-500"}`}
                        >
                            <X className="h-5 w-5" /> No
                        </button>
                    </div>

                    {bagsCorrect === false && (
                        <div className="pt-2 animate-in slide-in-from-top-2">
                            <input
                                type="number"
                                placeholder={declaredBags.toString()}
                                value={actualBags}
                                onChange={(e) => setActualBags(e.target.value)}
                                className="w-full bg-white text-center text-xl text-slate-600 font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0f9f3f]"
                                min="0"
                            />
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-green-200/60 bg-green-50/40 p-5 shadow-sm space-y-4 text-center">
                    <h3 className="text-sm font-bold text-slate-900">Peso total declarado</h3>
                    <p className="text-4xl font-semibold text-[#0f9f3f]">{declaredWeight}</p>
                    <p className="text-sm font-bold text-slate-900">¿Es correcto?</p>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => { setWeightCorrect(true); setActualWeight(""); }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-bold transition-all border
                                ${weightCorrect === true
                                    ? "bg-[#0f9f3f] text-white border-[#0f9f3f]"
                                    : "bg-white text-slate-800 border-green-500"}`}
                        >
                            <Check className="h-5 w-5" /> Si
                        </button>
                        <button
                            type="button"
                            onClick={() => setWeightCorrect(false)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 font-bold transition-all border
                                ${weightCorrect === false
                                    ? "bg-red-600 text-white border-red-600"
                                    : "bg-white text-slate-800 border-red-500"}`}
                        >
                            <X className="h-5 w-5" /> No
                        </button>
                    </div>

                    {weightCorrect === false && (
                        <div className="pt-2 animate-in slide-in-from-top-2">
                            <input
                                type="number"
                                step="0.1"
                                placeholder="0.0"
                                value={actualWeight}
                                onChange={(e) => setActualWeight(e.target.value)}
                                className="w-full bg-white text-center text-xl text-slate-600 font-medium p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0f9f3f]"
                                min="0"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-[#0f9f3f] font-medium mb-2">Comentarios</label>
                    <textarea
                        rows={3}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Ej: Se reciben en plantas 50 bolsas correspondientes a 25 kg"
                        className="w-full rounded-xl border border-slate-200 p-4 text-sm text-slate-900 shadow-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 resize-none"
                    />
                </div>

                <div className="pt-4 pb-6">
                    <button
                        type="submit"
                        disabled={!isFormValid() || isPending}
                        className={`w-full rounded-xl py-4 font-semibold transition-all flex items-center justify-center gap-2
                            ${isFormValid() && !isPending
                                ? "bg-[#0f9f3f] hover:bg-[#0c8534] text-white shadow-md shadow-green-600/20"
                                : "bg-[#9eb9a8] text-white/90"}`}
                    >
                        <CarIcon className="h-5 w-5" />
                        {isPending ? "Procesando..." : (isFormValid() ? "Confirmar finalización" : "Confirmar verificación")}
                    </button>
                </div>

            </form>
        </PlantMobileLayout>
    );
}

function CarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
        </svg>
    );
}
