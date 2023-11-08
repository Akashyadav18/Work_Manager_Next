"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {

  const router = useRouter()

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:3000/api/users/login", loginData);
          console.log(res.data);
          if(res.data.status === 201) {
            toast.success(res.data.message, {position: "top-center"});
            router.push("/addTask")
            router.refresh();
          }
          if(res.data.status ===400){
            toast.error(res.data.message, {position: "top-center"});
          }
        } catch (error) {
          console.log(error);
          toast.error("Login failed", {position: "top-center"})
        }
    }

  return (
    <div className='h-[calc(100vh-8rem)] flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold m-5'>Login</h1>
      <input onChange={(e) => setLoginData({...loginData, email: e.target.value})} value={loginData.email} className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' type="text" placeholder='Email'/>
      <input onChange={(e) => setLoginData({...loginData, password: e.target.value})} value={loginData.password} className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' type="password" placeholder='Password'/>
      <button onClick={handleLogin} className='p-2 bg-green-700 text-white m-5 rounded-md' type="submit">Login</button>
      <div className='flex gap-10 text-lg'>
      <p>Don't have account</p>
      <Link href="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login
