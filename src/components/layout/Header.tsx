import { Bell, Search, Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="fixed right-0 top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white/80 px-4 backdrop-blur-xl lg:w-[calc(100%-16rem)] lg:px-8">
            <div className="flex items-center gap-4">
                {/* Botón de menú en móvil */}
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Buscador: oculto en móviles muy pequeños */}
                <div className="hidden w-full max-w-md items-center gap-2 rounded-full border bg-slate-50/50 px-4 py-2 transition-colors focus-within:border-green-500 focus-within:bg-white focus-within:shadow-sm sm:flex">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar generadores, transportistas..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Icono de búsqueda en móvil */}
                <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 sm:hidden">
                    <Search className="h-5 w-5" />
                </button>

                <button className="relative rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:border lg:bg-white lg:shadow-sm">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white lg:right-1 lg:top-1"></span>
                </button>

                <div className="hidden h-8 w-[1px] bg-slate-200 sm:block"></div>

                <div className="flex items-center gap-3">
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
