import Image from 'next/image'
import readUserSession from "@/lib/actions";
import {redirect} from "next/navigation";
import Link from "next/link";


export default async function Page() {
  const {data} = await readUserSession();
  if(data.session){
    return redirect("/dashboard")
  }

  return (
      <main className = "bg-gradient-to-r from-black via-blue-900 to-blue-200 w-screen h-screen">
        <div className="flex justify-between bg-opacity-5">
          <div>XYZ</div>
          <div className='flex md:justify-around md:w-1/6 w-2/5 justify-evenly'>
            <Link href={"/auth-server-action"} className='bg-black px-2 rounded-xl text-blue-400 hover:bg-slate-500'>Login/Signup</Link>
          </div>
        </div>
        <div className='flex justify-center flex-col items-center md:flex-row'>

          <Image
              src="/event.png"
              height={700}
              width={700}
              alt={"image"}
          >
          </Image>
          <div className='flex flex-col'>

            <div className='md:text-3xl font-bold w-full text-center '>Connect Beyond Screens: Your Events, Your Way-Create,Join,Enjoy Offline Experiences Together!</div>
            <Image
                src="/event2.png"
                height={500}
                width={600}
                alt={"image"}
            >
            </Image>
          </div>
        </div>
      </main>
  )
}
