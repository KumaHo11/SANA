import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Test the companies table
    const { data: companies, error: cErr } = await supabase.from('companies').select('*').limit(1);

    // Test the profiles table
    const { data: profiles, error: pErr } = await supabase.from('profiles').select('*').limit(1);

    return NextResponse.json({
        companies: cErr ? cErr.message : companies,
        profiles: pErr ? pErr.message : profiles
    });
}
