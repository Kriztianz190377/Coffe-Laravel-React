import { Outlet } from 'react-router-dom'

import LOGO from '../assets/img/logo.svg'



export default function AuthLayout () {
  return (
    <main className='max-w-4xl mx-auto mt-10 flex flex-col md:flex-row  items-center gap-10'>
      <img 
      src={LOGO} 
      alt='Image Logo' 
    
      className=' md:w  max-w-xs ' 
      />

      <div className='w-full'>
        <Outlet />
      </div>

    </main>
  )
}
