import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const { data: companies, error: cErr } = await supabase.from('companies').select('*').limit(3);
  console.log("Companies:", companies, cErr);

  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*').limit(3);
  console.log("Profiles:", profiles, pErr);
}
run();
