import readUserSession from "@/lib/actions";
import {redirect} from "next/navigation";
import Profile from "@/app/dashboard/components/profile";
import SignOut from "@/app/dashboard/components/SignOut";

export default async function Page() {

    const {data} = await readUserSession();

    // if (!data.session){
    //     return redirect("/auth-server-action");
    // }

    return (
        <main className={'p-36 bg-white h-screen flex flex-col gap-6'}>
            <SignOut />
            <div className={'rounded-2xl h-full'}>
                <Profile session={data.session}></Profile>
            </div>
        </main>
    )




}