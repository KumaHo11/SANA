import { CreateUserForm } from "./CreateUserForm";
import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function NewUserPage() {
    const supabase = await createClient();

    // Fetch all approved companies to associate the user
    const { data: companies } = await supabase
        .from('companies')
        .select('id, name, cuit, type')
        .eq('is_approved', true)
        .order('name');

    return <CreateUserForm companies={companies || []} />;
}
