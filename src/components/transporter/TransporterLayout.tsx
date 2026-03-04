"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText, User } from "lucide-react";

import { Sidebar } from "../layout/Sidebar";
import { Header } from "../layout/Header";

const transporterRoutes = [
    { label: "Inicio", icon: Home, href: "/transporter-app" },
    { label: "Mis viajes", icon: FileText, href: "/transporter-app/trips" },
    { label: "Perfil", icon: User, href: "/transporter-app/profile" },
];

export default function TransporterLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-[100dvh] bg-slate-50 relative flex flex-col">

            {/* DESKTOP (lg and above): Sidebar and Header */}
            <div className="hidden lg:block">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    routes={transporterRoutes}
                />
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
            </div>

            {/* MOBILE (< lg): Top Header Bar */}
            <div className="flex lg:hidden items-center justify-between bg-green-600 px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">SANA</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Botón de notificaciones en móvil */}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto pb-24 lg:pb-8 lg:pt-20 lg:ml-64 relative">
                <div className="w-full lg:max-w-6xl lg:mx-auto lg:p-8">
                    {children}
                </div>
            </main>

            {/* MOBILE (< lg): Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full border-t border-green-500 bg-green-600 px-6 py-3 pb-8 text-white z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(22,163,74,0.3)] lg:hidden">
                <div className="flex justify-between max-w-md mx-auto relative">
                    <Link href="/transporter-app" className={`flex flex-col items-center gap-1 transition-opacity ${pathname === '/transporter-app' ? 'opacity-100 text-white' : 'opacity-70 hover:opacity-100'}`}>
                        <Home className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Inicio</span>
                    </Link>

                    <Link href="/transporter-app/trips" className={`flex flex-col items-center gap-1 transition-opacity ${pathname.includes('/transporter-app/trips') || pathname.includes('/transporter-app/route') ? 'opacity-100 text-white' : 'opacity-70 hover:opacity-100'}`}>
                        <FileText className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Mis viajes</span>
                    </Link>

                    <Link href="/transporter-app/profile" className={`flex flex-col items-center gap-1 transition-opacity ${pathname === '/transporter-app/profile' ? 'opacity-100 text-white' : 'opacity-70 hover:opacity-100'}`}>
                        <User className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Perfil</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}
