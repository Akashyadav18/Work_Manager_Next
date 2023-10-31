"use client"
import React, { useState } from 'react'

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(loginData);
    }

  return (
    <div className='h-[calc(100vh-8rem)] flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold m-5'>Login</h1>
      <input onChange={(e) => setLoginData({...loginData, email: e.target.value})} value={loginData.email} className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' type="text" placeholder='Email'/>
      <input onChange={(e) => setLoginData({...loginData, password: e.target.value})} value={loginData.password} className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' type="password" placeholder='Password'/>
      <button onClick={handleLogin} className='p-2 bg-green-700 text-white m-5 rounded-md' type="submit">Login</button>
    </div>
  )
}

export default Login
