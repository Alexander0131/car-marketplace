import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import { customRoutes } from './../../configs/allRoutes';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
      <Link to={'/'}>
        <img src="/logo.png" width={100} height={70} className='rounded'/>
      </Link>
      <ul className='hidden md:flex gap-16'>
      {customRoutes.map((item, index) => (
         <li key={index} className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
          <Link to={item.route}>{item.label}</Link>
        </li>
      ))}
      </ul>
      <div  className='flex items-center gap-5'>
      {isSignedIn ? 
        <div>
          <UserButton/>
          <Link to={'/profile'}>
          </Link>
        </div>  
        :
          <SignInButton className='bg-primary text-white p-2 rounded'></SignInButton>
      }
      <div className='md:hidden'>
        <DropdownMenu/>
      </div>
      </div>
    </div>
  )
}

export default Header
