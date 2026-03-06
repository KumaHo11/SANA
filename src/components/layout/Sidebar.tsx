"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Map,
    Truck,
    Settings,
    Users,
    X,
    Building2,
    FileText
} from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    routes?: { label: string; icon: React.ElementType; href: string }[];
}

export function Sidebar({ isOpen, onClose, routes: customRoutes }: SidebarProps) {
    const pathname = usePathname();

    const defaultRoutes = [
        { label: "Panel principal", icon: LayoutDashboard, href: "/" },
        { label: "Hojas de ruta", icon: FileText, href: "/tracking" },
        { label: "Usuarios", icon: Users, href: "/users" },
        { label: "Generadores", icon: Building2, href: "/entities" },
        { label: "Transportistas", icon: Truck, href: "/transport" },
        { label: "Plantas", icon: Building2, href: "/treatment-plants" },
        { label: "Configuración", icon: Settings, href: "/settings" },
    ];

    const routes = customRoutes || defaultRoutes;

    return (
        <>
            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar contenedor */}
            <aside className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-white border-r transition-transform duration-300 ease-in-out lg:w-64 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
                    <div className="mb-8 flex items-center justify-between lg:justify-center">
                        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-xl shadow-lg shadow-green-600/30">
                                S
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-900">
                                SANA
                            </span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-1.5">
                        {routes.map((route) => {
                            const isActive = pathname === route.href;
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-all ${isActive
                                        ? "bg-green-50 text-green-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <route.icon className={`h-5 w-5 ${isActive ? "text-green-600" : "text-slate-400"}`} />
                                    {route.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-8">
                        <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-700 p-4 text-white shadow-lg">
                            <p className="text-sm font-medium">Plataforma SANA</p>
                            <p className="mt-1 text-xs text-green-100">v1.0.0-beta</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
