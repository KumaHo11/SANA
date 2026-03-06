"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Home, User, Package } from "lucide-react";

import { Sidebar } from "../layout/Sidebar";
import { Header } from "../layout/Header";

const plantRoutes = [
    { label: "Inicio", icon: Home, href: "/plant-app" },
    { label: "Perfil", icon: User, href: "/plant-app/profile" },
];

export default function PlantMobileLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-[100dvh] bg-slate-50 relative flex flex-col">

            {/* DESKTOP (lg and above): Sidebar and Header */}
            <div className="hidden lg:block">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    routes={plantRoutes}
                />
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
            </div>

            {/* MOBILE (< lg): Top Header Bar */}
            <div className="flex lg:hidden items-center justify-between bg-[#0f9f3f] px-4 py-3 text-white border-b border-green-700/50">
                <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <span className="font-semibold text-lg">SANA Planta</span>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/login" className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                        <LogOut className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto pb-24 lg:pb-8 lg:pt-20 lg:ml-64 relative">
                <div className="w-full lg:max-w-6xl lg:mx-auto lg:p-8">
                    {children}
                </div>
            </main>

            {/* MOBILE (< lg): Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 w-full border-t border-green-500 bg-[#0f9f3f] px-6 py-3 pb-8 text-white z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(15,159,63,0.3)] lg:hidden">
                <div className="flex justify-around max-w-md mx-auto relative px-4">
                    <Link href="/plant-app" className={`flex flex-col items-center gap-1 transition-opacity ${pathname === '/plant-app' ? 'opacity-100 text-white' : 'opacity-70 hover:opacity-100'}`}>
                        <Home className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Inicio</span>
                    </Link>

                    <Link href="/plant-app/profile" className={`flex flex-col items-center gap-1 transition-opacity ${pathname === '/plant-app/profile' ? 'opacity-100 text-white' : 'opacity-70 hover:opacity-100'}`}>
                        <User className="h-6 w-6" />
                        <span className="text-[10px] font-medium">Perfil</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}
