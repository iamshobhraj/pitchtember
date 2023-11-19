"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { createBrowserClient } from '@supabase/ssr'


export default function OAuthForm() {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	const loginWithGoogle = () =>{
		supabase.auth.signInWithOAuth({
			provider:"google",
			options:{
				redirectTo:`${location.origin}/auth-server-action/callback`
			}
		})
	}


	return <Button className="w-full" onClick={loginWithGoogle}>Login With Google</Button>;
}
