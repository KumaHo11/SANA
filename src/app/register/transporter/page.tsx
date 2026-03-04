"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Truck, UserCircle, CheckCircle, Loader2 } from "lucide-react";
import { registerCompanyAndUser } from "../actions";

export default function TransporterRegisterPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        cuit: "",
        company: "",
        address: "",
        license: "",
        dni: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        const res = await registerCompanyAndUser(formData, "TRANSPORTER", "ADMIN_TRANSPORTER");

        setIsLoading(false);
        if (res.error) {
            setErrorMsg(res.error);
        } else {
            setStep(3);
        }
    };

    return (
        <AuthLayout
            title="Registro de transportista"
            subtitle="Únete a la red de transporte de residuos habilitados."
            showBackButton={true}
            backUrl="/register"
        >
            <div className="mb-8">
                {/* Progress Tracker */}
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 rounded-full z-0 transition-all duration-300"
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    ></div>

                    <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 1 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white transition-colors ${step >= 1 ? 'border-orange-500' : 'border-slate-300'}`}>
                            <Truck className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium">Empresa</span>
                    </div>

                    <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 2 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white transition-colors ${step >= 2 ? 'border-orange-500' : 'border-slate-300'}`}>
                            <UserCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium">Responsable</span>
                    </div>

                    <div className={`relative z-10 flex flex-col items-center gap-2 ${step >= 3 ? 'text-orange-600' : 'text-slate-400'}`}>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white transition-colors ${step >= 3 ? 'border-orange-500' : 'border-slate-300'}`}>
                            <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium">Validación</span>
                    </div>
                </div>
            </div>

            {errorMsg && (
                <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
                    {errorMsg}
                </div>
            )}

            <form className="space-y-6" onSubmit={step === 1 ? handleNextStep : handleSubmit}>
                {step === 1 && (
                    <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                        <div>
                            <label htmlFor="cuit" className="block text-sm font-medium text-slate-700">CUIT de la empresa</label>
                            <input type="text" id="cuit" value={formData.cuit} onChange={handleChange} placeholder="Ej: 30-12345678-9" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-slate-700">Razón social</label>
                            <input type="text" id="company" value={formData.company} onChange={handleChange} placeholder="Nombre legal de la empresa" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-slate-700">Dirección legal</label>
                            <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Calle, número, localidad, provincia" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label htmlFor="license" className="block text-sm font-medium text-slate-700">Permiso R.U.T.A. / Habilitación</label>
                            <input type="text" id="license" value={formData.license} onChange={handleChange} placeholder="Nro. de registro provincial o nacional" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <button type="submit" className="w-full mt-6 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none active:scale-[0.98] transition-all">
                            Siguiente paso
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                        <div>
                            <label htmlFor="dni" className="block text-sm font-medium text-slate-700">DNI del responsable</label>
                            <input type="text" id="dni" value={formData.dni} onChange={handleChange} placeholder="Sin puntos" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">Nombres</label>
                                <input type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Apellidos</label>
                                <input type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo electrónico corporativo</label>
                            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="correo@transporte.com" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Contraseña</label>
                            <input type="password" id="password" value={formData.password} onChange={handleChange} className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" required />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setStep(1)} className="w-1/3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                                Atrás
                            </button>
                            <button type="submit" disabled={isLoading} className="w-2/3 flex justify-center items-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 transition-all">
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear cuenta"}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-8 animate-in zoom-in-95 fade-in duration-300">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 mb-6">
                            <CheckCircle className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud recibida!</h3>
                        <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                            Hemos recibido los datos de tu empresa transportista. Se verificarán las habilitaciones vigentes antes de activar la cuenta.
                        </p>
                        <button type="button" onClick={() => window.location.href = '/login'} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all">
                            Volver al inicio
                        </button>
                    </div>
                )}
            </form>
        </AuthLayout>
    );
}
