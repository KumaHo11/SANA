"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, User } from "lucide-react";

export default function TransporterMobileLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    return (
        <div className="flex h-[100dvh] flex-col bg-slate-50 relative overflow-hidden">

            {/* Header / Barra de estado falso */}
            <div className="flex items-center justify-between bg-green-600 px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">SANA</span>
                </div>
                <div className="flex items-center gap-2">
                    {/* Botón de notificaciones como en el diseño (campanita) */}
                </div>
            </div>

            {/* Contenido scrolleable central */}
            <div className="flex-1 overflow-y-auto pb-20">
                {children}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full border-t border-green-500 bg-green-600 px-6 py-3 pb-8 text-white z-50 rounded-t-2xl shadow-[0_-4px_20px_rgba(22,163,74,0.3)]">
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
