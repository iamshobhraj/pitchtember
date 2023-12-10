import Link from 'next/link'

export default function Nav() {
    return(
        <main className="flex justify-between bg-opacity-5">
            <div>XYZ</div>
            <div className='flex md:justify-around md:w-1/6 w-2/5 justify-evenly'><Link href="/signup" className='bg-black mx-2 px-2 rounded-xl hover:bg-slate-500'>Sign Up</Link>
            <Link href="/login" className='bg-black px-2 rounded-xl hover:bg-slate-500'>Login</Link>
            </div>
        </main>
    )
}