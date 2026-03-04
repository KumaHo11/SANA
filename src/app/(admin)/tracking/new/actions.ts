"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRouteAndManifest(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const generator_id = formData.get("generator_id") as string;
    const transporter_id = formData.get("transporter_id") as string;
    const plant_id = formData.get("plant_id") as string;

    // Rutas/Programacion payload
    const scheduled_date = formData.get("scheduled_date") as string;
    const scheduled_time = formData.get("scheduled_time") as string;
    const driver_name = formData.get("driver_name") as string;
    const truck_plate = formData.get("truck_plate") as string;

    // Manifiesto payload
    const tracking_id = formData.get("tracking_id") as string;

    // 1. Create Route
    const { data: route, error: routeError } = await supabase.from('routes').insert({
        transporter_id,
        status: 'PENDING',
        scheduled_date,
        scheduled_time,
        driver_name,
        truck_plate
    }).select().single();

    if (routeError || !route) {
        return { error: "Error al crear la hoja de ruta: " + routeError?.message };
    }

    // 2. Create Manifest
    const { error: manifestError } = await supabase.from('manifests').insert({
        route_id: route.id,
        generator_id,
        plant_id,
        tracking_id,
        status: 'CREATED'
    });

    if (manifestError) {
        return { error: "Error al crear el manifiesto: " + manifestError.message };
    }

    revalidatePath("/tracking");
    redirect("/tracking");
}
