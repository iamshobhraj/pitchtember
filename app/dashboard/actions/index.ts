"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import readUserSession from "@/lib/actions";

export default async function getUser() {
    const {data} = await readUserSession();
    return data.session?.user
}


export async function readProfileById() {
    const user = await getUser();
    const id = user?.id;
    const supabase = await createSupabaseServerClient();

    const {data} = await supabase
        .from('profiles')
        .select(`full_name, username, city, avatar_url`)
        .eq('id', id)
        .single();

    return data;
}

export async function updateProfileById() {
    const supabase = await createSupabaseServerClient();


}