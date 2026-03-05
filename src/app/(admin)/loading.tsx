import { Truck } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full space-y-6 animate-pulse p-4">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="space-y-2">
                    <div className="h-8 w-48 rounded-lg bg-slate-200"></div>
                    <div className="h-4 w-64 rounded-lg bg-slate-100"></div>
                </div>
                <div className="h-10 w-32 rounded-xl bg-slate-200"></div>
            </div>

            {/* Table Skeleton */}
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden relative">
                <div className="border-b p-4 sm:px-6">
                    <div className="h-10 w-full max-w-sm rounded-xl bg-slate-100"></div>
                </div>
                <div className="opacity-50">
                    {/* Header row */}
                    <div className="grid grid-cols-4 gap-4 border-b bg-slate-50 px-6 py-4">
                        <div className="h-4 w-24 rounded bg-slate-200"></div>
                        <div className="h-4 w-32 rounded bg-slate-200"></div>
                        <div className="h-4 w-16 rounded bg-slate-200 justify-self-center"></div>
                        <div className="h-4 w-12 rounded bg-slate-200 justify-self-end"></div>
                    </div>
                    {/* Data rows */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 items-center gap-4 border-b px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200"></div>
                                <div className="h-4 w-32 rounded bg-slate-200"></div>
                            </div>
                            <div className="h-4 w-28 rounded bg-slate-100"></div>
                            <div className="h-6 w-16 rounded-full bg-slate-100 justify-self-center"></div>
                            <div className="h-8 w-8 rounded bg-slate-100 justify-self-end"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
