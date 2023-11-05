"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Logout = () => {

    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();
       try {
        const res = await axios.get("http://localhost:3000/api/users/logout");
        console.log(res.data);
        toast.success(res.data.message, {position: "top-center"});
        router.push("/login")
       } catch (error) {
        console.log(error);
        toast.error(error.message, {position: "top-center"})
       }
    }

  return (
    <div>

      <button onClick={handleLogout} type='submit'>Logout</button>
    </div>
  )
}

export default Logout
