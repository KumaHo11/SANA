
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing supabase env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createPlant() {
    const email = 'planta@sana.com';
    const password = 'password123';

    console.log('Registering user...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError || !authData?.user) {
        console.error('Error signing up:', authError);
        // Wait, what if it already exists?
        if (authError && authError.message.includes('already registered')) {
            console.log('User naturally exists. We will try to update it.');
            // However anon key can't list users easily. 
            // I'll just login instead.
            const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
            if (loginData?.user) {
                console.log('SUCCESS: Can login as planta@sana.com / password123 !');
                return;
            } else {
                console.log('Login failed for', email, loginErr);
            }
        }
        return;
    }

    console.log('User registered with ID:', authData.user.id);
    const companyId = require('crypto').randomUUID();

    const { error: companyError } = await supabase.from('companies').insert({
        id: companyId,
        name: 'Planta de Tratamiento DEMO',
        cuit: '30-11111111-5',
        type: 'TREATMENT_PLANT',
        address: 'Ruta 9 Km 45, Cordoba',
        is_approved: true
    });

    if (companyError) {
        console.error('Company error:', companyError);
    }

    const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        first_name: 'Admin',
        last_name: 'Planta',
        dni: '11111111',
        role: 'ADMIN_PLANT',
        company_id: companyId
    });

    if (profileError) {
        console.error('Profile error:', profileError);
    }

    console.log('SUCCESS: credentials are planta@sana.com / password123');
}

createPlant();
