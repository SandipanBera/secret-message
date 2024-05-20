import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='w-full bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border-b border-gray-200 flex p-2 items-center justify-between fixed z-10 '>
          <div className='text tracking-tighter font font-semibold text-2xl text-electric-violet-100'>Secret Message</div>
          <Link href={'/sign-in'}>
             <Button className='btn-default hover:btn-hover'>Login</Button>
          </Link>
        
    </div>
  )
}

export default Navbar