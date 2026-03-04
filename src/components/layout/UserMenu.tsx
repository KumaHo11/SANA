"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { LogOut, User, Settings } from "lucide-react";

export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 rounded-full p-1 pl-3 transition-colors hover:bg-slate-100"
            >
                <div className="hidden flex-col items-end sm:flex text-left">
                    <span className="text-sm font-medium text-slate-900 leading-none mb-1">Admin</span>
                    <span className="text-xs text-slate-500 leading-none">Administrador</span>
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-green-100 bg-green-50">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Admin"
                        className="h-full w-full object-cover"
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2">

                    {/* Header móvil del menú */}
                    <div className="mb-2 border-b border-slate-100 px-3 pb-3 sm:hidden">
                        <p className="text-sm font-medium text-slate-900">Admin</p>
                        <p className="text-xs text-slate-500">Administrador</p>
                    </div>

                    <div className="space-y-1">
                        <Link
                            href="/profile"
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <User className="h-4 w-4 text-slate-400 group-hover:text-green-600" />
                            Mi perfil
                        </Link>
                        <Link
                            href="/settings"
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="h-4 w-4 text-slate-400 group-hover:text-green-600" />
                            Configuración
                        </Link>
                    </div>

                    <div className="my-1 h-px bg-slate-100"></div>

                    <Link
                        href="/login"
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-700" />
                        Cerrar sesión
                    </Link>
                </div>
            )}
        </div>
    );
}
