import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { FileDown, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Parallel requests for counts
  const [{ count: generatorsCount }, { count: transportersCount }, { count: plantsCount }, { count: activeManifestsCount }] = await Promise.all([
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('type', 'GENERATOR'),
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('type', 'TRANSPORTER'),
    supabase.from('companies').select('*', { count: 'exact', head: true }).eq('type', 'TREATMENT_PLANT'),
    supabase.from('manifests').select('*', { count: 'exact', head: true }).in('status', ['IN_TRANSIT', 'PICKED_UP'])
  ]);

  const stats = {
    generators: generatorsCount || 0,
    transporters: transportersCount || 0,
    plants: plantsCount || 0,
    activeManifests: activeManifestsCount || 0
  };

  // Fetch recent manifests
  const { data: recentManifests } = await supabase
    .from('manifests')
    .select(`
            id,
            tracking_id,
            status,
            declared_bags,
            declared_weight,
            created_at,
            generator:generator_id (name)
        `)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Resumen general
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Monitorea el progreso y la trazabilidad de los residuos a nivel nacional.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton />
        </div>
      </div>

      <div className="space-y-6">
        <OverviewCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity activities={recentManifests || []} />
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-slate-900">Distribución de estados</h3>
            <div className="flex h-64 items-center justify-center rounded-xl bg-slate-50 border border-dashed border-slate-200">
              <span className="text-sm text-slate-500">Gráfico circular en desarrollo</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
