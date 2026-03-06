const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createPlantUser() {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: 'planta@gmail.com',
        password: '1q2w3e4r',
        email_confirm: true,
        user_metadata: {
            first_name: 'Admin',
            last_name: 'Planta'
        }
    });

    if (authError) {
        if (authError.message.includes('already registered')) {
            console.log('El usuario ya existe');

            // Si ya existe, tratamos de sacar su ID
            const { data: users } = await supabaseAdmin.auth.admin.listUsers();
            const user = users.users.find(u => u.email === 'planta@gmail.com');
            if (user) {
                await updateProfile(user.id);
            }
            return;
        }
        console.error('Error creating user:', authError);
        return;
    }

    if (authData.user) {
        await updateProfile(authData.user.id);
    }
}

async function updateProfile(userId) {
    const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({
            company_id: 'e3d74df8-4e6f-4bac-8516-a33f22fb4954', // Planta de Tratamiento DEMO
            role: 'OPERATOR_PLANT',
            is_approved: true,
            must_change_password: false // false para facilitar testing
        })
        .eq('id', userId);

    if (profileError) {
        console.error("Error updating profile:", profileError);
    } else {
        console.log("Profile updated successfully!");
    }
}

createPlantUser();
