"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function readProfileById(id:string) {
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