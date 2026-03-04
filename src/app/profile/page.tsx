"use client";

import { UserCircle, Mail, Phone, Camera, Shield, Activity, Calendar } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">

            {/* Cabecera del perfil */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-32 w-full bg-gradient-to-r from-green-500 to-green-700"></div>
                <div className="relative px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div className="relative -mt-16 flex items-end">
                            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                                <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-sm transition-colors hover:bg-slate-900/80">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="ml-6 pb-2">
                                <h1 className="text-2xl font-bold text-slate-900">Juan Pérez</h1>
                                <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                                    <Shield className="h-4 w-4 text-green-600" />
                                    Administrador General
                                </p>
                            </div>
                        </div>

                        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200">
                            Editar perfil
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Columna izquierda: Información personal */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <UserCircle className="h-5 w-5 text-slate-400" />
                            Datos personales
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-500">Nombre completo</label>
                                <div className="mt-1 font-medium text-slate-900">Juan Carlos Pérez</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500">DNI / CUIL</label>
                                <div className="mt-1 font-medium text-slate-900">20-33444555-8</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500">Cargo</label>
                                <div className="mt-1 font-medium text-slate-900">Director de Logística</div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500">Departamento</label>
                                <div className="mt-1 font-medium text-slate-900">Operaciones Tácticas</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6">Información de contacto</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 bg-slate-50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-slate-500">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Correo electrónico corporativo</p>
                                    <p className="text-sm font-medium text-slate-900">jperez@ministerio.salud.gob.ar</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 bg-slate-50">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-slate-500">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500">Teléfono móvil</p>
                                    <p className="text-sm font-medium text-slate-900">+54 9 11 1234-5678</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Actividad reciente */}
                <div className="col-span-1 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-slate-400" />
                            Tu actividad reciente
                        </h2>

                        <div className="space-y-5">
                            {[
                                { title: "Manifiesto aprobado", desc: "Autorizaste el envío MNF-2024-001", time: "Hace 2 horas" },
                                { title: "Perfil actualizado", desc: "Cambiaste el teléfono de contacto", time: "Ayer" },
                                { title: "Nueva empresa", desc: "Diste de alta a Transportes S.A.", time: "Hace 3 días" },
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 border border-green-100 text-green-600">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        {i !== 2 && <div className="h-full w-px bg-slate-200 mt-2"></div>}
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{activity.desc}</p>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
