import {
    Building2,
    Map,
    Recycle,
    Truck,
    ArrowUpRight,
    ArrowDownRight,
    Package
} from "lucide-react";

export function OverviewCards({ stats }: {
    stats: {
        generators: number,
        transporters: number,
        plants: number,
        activeManifests: number,
        transportWeight: number,
        plantWeight: number,
        transportBags: number,
        plantBags: number
    }
}) {
    const cards = [
        {
            title: "Generadores",
            value: stats.generators.toString(),
            change: "+0%",
            trend: "up",
            icon: Building2,
            color: "blue",
        },
        {
            title: "Transportistas",
            value: stats.transporters.toString(),
            change: "+0%",
            trend: "up",
            icon: Truck,
            color: "orange",
        },
        {
            title: "Plantas de tratamiento",
            value: stats.plants.toString(),
            change: "+0%",
            trend: "up",
            icon: Recycle,
            color: "green",
        },
        {
            title: "Manifiestos en curso",
            value: stats.activeManifests.toString(),
            change: "+0%",
            trend: "up",
            icon: Map,
            color: "purple",
        },
        {
            title: "Kg por Transporte",
            value: stats.transportWeight.toString() + " kg",
            change: "",
            trend: "up",
            icon: Truck,
            color: "blue",
        },
        {
            title: "Kg en Plantas",
            value: stats.plantWeight.toString() + " kg",
            change: "",
            trend: "up",
            icon: Recycle,
            color: "green",
        },
        {
            title: "Bolsas (Transporte)",
            value: stats.transportBags.toString(),
            change: "",
            trend: "up",
            icon: Package,
            color: "orange",
        },
        {
            title: "Bolsas (Plantas)",
            value: stats.plantBags.toString(),
            change: "",
            trend: "up",
            icon: Package,
            color: "purple",
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">{card.title}</p>
                        <div className={`p-2 rounded-xl bg-${card.color}-50 text-${card.color}-600`}>
                            <card.icon className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                                {card.value}
                            </h3>
                            <p className="mt-1 flex items-center gap-1 text-sm">
                                {card.change && (
                                    <>
                                        <span
                                            className={`flex items-center font-medium text-slate-400`}
                                        >
                                            {card.trend === "up" ? (
                                                <ArrowUpRight className="h-4 w-4" />
                                            ) : (
                                                <ArrowDownRight className="h-4 w-4" />
                                            )}
                                            {card.change}
                                        </span>
                                        <span className="text-slate-500">desde inicio</span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
}
