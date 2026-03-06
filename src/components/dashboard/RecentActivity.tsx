import { CheckCircle2, Clock, Truck, AlertTriangle } from "lucide-react";

export function RecentActivity({ activities }: { activities: any[] }) {

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "IN_TRANSIT":
            case "PICKED_UP":
                return {
                    label: "En Tránsito",
                    style: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20"
                };
            case "DELIVERED":
                return {
                    label: "Completado",
                    style: "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                };
            case "CREATED":
            case "PENDING":
                return {
                    label: "Creado",
                    style: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                };
            case "SCHEDULED":
                return {
                    label: "Programado",
                    style: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"
                };
            case "DISCREPANCY":
                return {
                    label: "Discrepancia",
                    style: "bg-red-50 text-red-700 ring-1 ring-red-600/20"
                };
            default:
                return {
                    label: status,
                    style: "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20"
                };
        }
    };

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Actividad reciente</h3>
                <button className="text-sm font-medium text-green-600 hover:text-green-700">
                    Ver todo &rarr;
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="border-b text-slate-500">
                            <th className="pb-3 font-medium">Manifiesto ID</th>
                            <th className="pb-3 font-medium">Generador</th>
                            <th className="pb-3 font-medium">Carga Reportada</th>
                            <th className="pb-3 font-medium">Estado</th>
                            <th className="pb-3 font-medium text-right">Actualización</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {activities.map((activity) => {
                            const statusInfo = getStatusInfo(activity.status);

                            return (
                                <tr key={activity.id} className="transition-colors hover:bg-slate-50/50">
                                    <td className="py-4 font-medium text-slate-900">
                                        <span className="w-24 truncate block" title={activity.id}>{activity.tracking_id || activity.id.slice(0, 8)}</span>
                                    </td>
                                    <td className="py-4 text-slate-600">{activity.generator?.name || 'Desconocido'}</td>
                                    <td className="py-4 text-slate-600">
                                        {activity.declared_bags || 0} bolsas ({activity.declared_weight || 0} kg)
                                    </td>
                                    <td className="py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusInfo.style}`}
                                        >
                                            {statusInfo.label}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right text-slate-500">
                                        {new Date(activity.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            )
                        })}

                        {activities.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-500">
                                    No hay actividad registrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
