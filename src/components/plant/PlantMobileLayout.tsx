import { ReactNode } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function PlantMobileLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-[100dvh] flex-col bg-slate-50 relative overflow-hidden">

            {/* Header / Barra superior "Hola operario!" */}
            <div className="flex items-center justify-between bg-[#0f9f3f] px-5 py-4 text-white shrink-0">
                <span className="font-medium text-lg">Hola operario!</span>
                <Link href="/login" className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                    <LogOut className="h-6 w-6" />
                </Link>
            </div>

            {/* Contenido scrolleable central */}
            <div className="flex-1 overflow-y-auto w-full">
                {children}
            </div>

        </div>
    );
}
