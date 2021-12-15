import { ReactComponent as Hamburger } from '../public/shared/mobile/icon-hamburger.svg'
import { ReactComponent as Close } from '../public/shared/mobile/icon-close.svg'

function Navbar({sideBar, setSideBar}) {
  return (
    <div className={`bg-cover p-5 md:rounded-xl xl:h-32 bg-[url('/src/public/bg-mobile.png')] md:bg-[url('/src/public/bg-tablet.png')] xl:bg-[url('src/public/bg-desktop.png')]`}>
       <div className='flex justify-between items-center md:h-full md:items-end'>
         
         <div className='flex flex-col text-white'>
           <h1 className='font-bold'>Frontend Mentor</h1>
           <h2 className='text-gray-50 text-opacity-80'>Feedback Board</h2>
         </div>

         <button
           onClick={() => setSideBar(sideBar === 'visible' ? 'hidden': 'visible')}
           className='md:hidden font-bold text-2xl'>
           {sideBar === 'visible' ? <Close/> : <Hamburger/>}
         </button>
       
       </div>
     </div>
  );
}

export default Navbar