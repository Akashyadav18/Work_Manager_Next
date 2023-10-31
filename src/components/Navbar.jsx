import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='h-16 px-10 border-b-2 border-gray-500 flex justify-between items-center'>
      <div>
        <Link href='/' className='text-xl font-semibold'>Task Manager</Link>
      </div>
      <div className='flex gap-20 text-md font-semibold'>
        <Link href="/" className="">Home</Link>
        <Link href="/addTask" className="">Add Task</Link>
        <Link href="/showTasks" className="">Tasks</Link>
      </div>
      <div className='flex gap-10 text-md font-semibold'>
        <Link href="/signup" className="">SignUp</Link>
        <Link href="/login" className="">Login</Link>
        <Link href="#" className="">Logout</Link>
      </div>
    </div>
  )
}

export default Navbar
