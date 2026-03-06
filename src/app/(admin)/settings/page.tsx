"use client";

import { useState } from "react";
import { Bell, Shield, Key, Save, User, Building, Database } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Configuración del sistema</h1>
                    <p className="mt-2 text-sm text-slate-600">Administra las preferencias y ajustes de tu cuenta SANA</p>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">

                    {/* Navigation Sidebar */}
                    <div className="w-full lg:w-64">
                        <nav className="flex flex-col space-y-1 rounded-2xl bg-white p-2 shadow-sm border">
                            <button
                                onClick={() => setActiveTab("general")}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${activeTab === "general" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <Building className="h-4 w-4" />
                                Datos de Empresa
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === "notifications" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <Bell className="h-4 w-4" />
                                Notificaciones
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === "security" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <Shield className="h-4 w-4" />
                                Seguridad
                            </button>
                            <button
                                onClick={() => setActiveTab("integrations")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === "integrations" ? "bg-green-50 text-green-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <Database className="h-4 w-4" />
                                Integraciones API
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="rounded-2xl border bg-white shadow-sm">
                            {activeTab === "general" && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="border-b border-slate-100 p-6">
                                        <h2 className="text-lg font-semibold text-slate-800">Información de la Entidad</h2>
                                        <p className="text-sm text-slate-500">Actualiza los datos fiscales y de contacto público de tu empresa.</p>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">Razón Social</label>
                                                <input type="text" defaultValue="Ministerio de Salud" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700">CUIT</label>
                                                <input type="text" defaultValue="30-55555555-9" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-500 bg-slate-50" readOnly />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700">Dirección Fiscal</label>
                                                <input type="text" defaultValue="Av. 9 de Julio 1925, CABA" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="border-b border-slate-100 p-6">
                                        <h2 className="text-lg font-semibold text-slate-800">Preferencias de Alertas</h2>
                                        <p className="text-sm text-slate-500">Elige cómo y cuándo quieres recibir avisos del sistema SANA.</p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        {[
                                            { id: "n1", title: "Nuevos manifiestos generados", desc: "Recibir un correo electrónico cuando se genere un nuevo certificado.", active: true },
                                            { id: "n2", title: "Alertas de desvíos en ruta", desc: "Notificaciones inmediatas si un transporte se sale de la ruta planificada.", active: true },
                                            { id: "n3", title: "Reportes mensuales", desc: "Resumen estadístico del mes enviado a tu correo.", active: false },
                                        ].map((item) => (
                                            <div key={item.id} className="flex items-start justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50">
                                                <div>
                                                    <p className="font-medium text-slate-900">{item.title}</p>
                                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                                </div>
                                                <div className="ml-4 flex h-6 items-center">
                                                    <input
                                                        id={item.id}
                                                        name={item.id}
                                                        type="checkbox"
                                                        defaultChecked={item.active}
                                                        className="h-5 w-5 rounded border-slate-300 text-green-600 focus:ring-green-600"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="border-b border-slate-100 p-6">
                                        <h2 className="text-lg font-semibold text-slate-800">Seguridad de la Cuenta</h2>
                                        <p className="text-sm text-slate-500">Gestiona tus credenciales y opciones de acceso seguro.</p>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-900 mb-4">Cambiar Contraseña</h3>
                                            <div className="space-y-4 max-w-md">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700">Contraseña actual</label>
                                                    <input type="password" placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700">Nueva contraseña</label>
                                                    <input type="password" placeholder="Mínimo 8 caracteres" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
                                                </div>
                                                <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                                                    <Key className="h-4 w-4" /> Actualizar seguridad
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Acciones del pie de página */}
                            {activeTab !== "security" && (
                                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end rounded-b-2xl">
                                    <button className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700">
                                        <Save className="h-4 w-4" />
                                        Guardar cambios
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
