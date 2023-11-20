import {Button} from "@/components/ui/button";
import React from "react";
import createSupabaseServerClient from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default function SignOut() {


    const logout = async () => {
        "use server";

        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        redirect("/");
    }



    return(
        <form action={logout}>
            <Button>
                SignOut
            </Button>
        </form>
    )
}
