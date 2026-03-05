import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    const { data: companies, error: companiesError } = await supabase
        .from('companies')
        .select('*');

    const { data: manifests, error: manifestsError } = await supabase
        .from('manifests')
        .select('*');

    if (companiesError || manifestsError) {
        return NextResponse.json({ error: "Failed to fetch export data" }, { status: 500 });
    }

    const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
    };

    let csvContent = "";

    csvContent += "--- ENTIDADES (GENERADORES, TRANSPORTISTAS, PLANTAS) ---\n";
    csvContent += "ID,Nombre,CUIT,Tipo,Estado,Direccion,Nombre_Contacto,Email_Contacto\n";
    companies?.forEach(c => {
        csvContent += `${escapeCsv(c.id)},${escapeCsv(c.name)},${escapeCsv(c.cuit)},${escapeCsv(c.type)},${escapeCsv(c.is_approved ? 'Aprobado' : 'Pendiente')},${escapeCsv(c.address)},${escapeCsv(c.contact_name || '')},${escapeCsv(c.contact_email || '')}\n`;
    });

    csvContent += "\n--- HOJAS DE RUTA / MANIFIESTOS ---\n";
    csvContent += "ID,Tracking ID,Generador,Transportista,Planta,Estado,Fecha_Creacion\n";
    manifests?.forEach(m => {
        csvContent += `${escapeCsv(m.id)},${escapeCsv(m.tracking_id)},${escapeCsv(m.generator_id)},${escapeCsv(m.transporter_id)},${escapeCsv(m.treatment_plant_id)},${escapeCsv(m.status)},${escapeCsv(m.created_at)}\n`;
    });

    return new NextResponse(csvContent, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="sana_export_${new Date().toISOString().split('T')[0]}.csv"`
        }
    });
}
