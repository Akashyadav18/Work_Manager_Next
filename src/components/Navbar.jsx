"use client"

import Logout from '@/app/logout/page'
import UserContext from '@/context/userContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const Navbar = () => {

  const context = useContext(UserContext);

  return (
    <div className='h-16 px-10 border-b-2 border-gray-500 flex justify-between items-center'>
      <div>
        <Link href='/' className='text-xl font-semibold'>Task Manager</Link>
      </div>
      
        <div className='flex gap-20 text-md font-semibold'>
          <Link href="/" className="">Home</Link>
          <Link href="/addTask" className="">Add Task</Link>
          {/* <Link href="/userTask" className="">Task</Link> */}
          <Link href="/allTasks" className="">All Tasks</Link>
        </div>
    
      
        <div className='flex gap-10 text-md font-semibold'>
          {context.user ? <h1>Hii {context.user.name}</h1> : null}
          <Link href="/login" className="">Login</Link>
          <Logout />
        </div>
      
      
    </div>
  )
}

export default Navbar
