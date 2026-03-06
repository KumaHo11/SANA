const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
async function run() {
    const { data, error } = await supabase
        .from('manifests')
        .select(`
            id,
            declared_bags,
            declared_weight,
            generator:generator_id (name, address),
            routes:route_id (scheduled_date)
        `)
        .limit(1)
        .single();
    if (error) {
        console.error("ERROR:", error.message, error.details, error.hint);
    } else {
        console.log("SUCCESS:", JSON.stringify(data, null, 2));
    }
}
run();
