import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileView from "@/app/profile/ProfileView";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return <ProfileView user={user} profile={profile} />;
}
