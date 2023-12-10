import Image from 'next/image'
import Nav from './nav'


export default function Home() {
  return (
    <main className = "bg-gradient-to-r from-black via-blue-900 to-blue-200 w-screen h-screen">
   <Nav></Nav>
   <div className='flex justify-center flex-col items-center md:flex-row'>

  <Image
    src="/event.png"
    height={700}
    width={700}   
  >
  </Image>
  <div className='flex flex-col'>

  <div className='md:text-3xl font-bold w-full text-center '>"Connect Beyond Screens: Your Events, Your Way-Create,Join,Enjoy Offline Experiences Together!"</div>
   <Image
    src="/event2.png"
    height={500}
    width={600}   
  >
  </Image>
  </div>
   </div>
    </main>
  )
}
