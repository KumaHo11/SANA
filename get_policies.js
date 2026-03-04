require('dotenv').config({path: '.env.local'});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('pg_policies').select('*').eq('tablename', 'companies');
  // if no pg_policies accessible via RPC, we might need a workaround.
  console.log(data || error);
}
run();
