"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export function SearchInput({ placeholder, colorClass }: { placeholder: string, colorClass: "green" | "orange" | "purple" }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [term, setTerm] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const delaysDebounceFn = setTimeout(() => {
            const currentQuery = searchParams.get('query') || '';
            if (term === currentQuery) return; // Prevent infinite loops

            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set('query', term);
            } else {
                params.delete('query');
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
            });
        }, 300);

        return () => clearTimeout(delaysDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term, pathname]);

    const focusClass = colorClass === 'green' ? 'focus-within:border-green-500' : colorClass === 'orange' ? 'focus-within:border-orange-500' : 'focus-within:border-purple-500';

    return (
        <div className={`flex w-full max-w-sm items-center gap-2 rounded-lg border bg-slate-50/50 px-3 py-2 transition-colors focus-within:bg-white focus-within:shadow-sm ${focusClass} ${isPending ? 'opacity-70' : ''}`}>
            <Search className="h-4 w-4 text-slate-400" />
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
        </div>
    );
}
