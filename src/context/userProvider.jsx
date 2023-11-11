"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const UserProvider = ({children}) => {

    const router = useRouter();

    const [user, setUser] = useState("No User");

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/current`)
                setUser(data);
                router.refresh();
            }
            catch (error) {
                console.log(error);
                toast.error("Error while getting Current User")
                setUser(undefined)
            }
        }
        getUserData();
    }, [])
    
  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  )
}

export default UserProvider
