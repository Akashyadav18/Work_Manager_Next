"use client";

import UserContext from '@/context/userContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const UserTask = () => {

  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(UserContext);

  useEffect(() => {
    const getData = async (userId) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/users/${userId}/tasks`)
        setTask(data)
        setLoading(false)
      }
      catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData(context.user._id);
  }, [])

  console.log(task);

  return (
    <div className='h-[calc(100vh-9rem)] flex-col justify-center items-center overflow-y-auto w-[70%] mx-auto'>
      {loading ? <p>Loading...</p> : 
        task && (
        task.map((item) => (
          <div key={item.id} className='ring-2 ring-gray-500 mt-5 text-center rounded-md'>
            <h1 className='p-3 text-xl font-semibold bg-slate-200 uppercase'>{item.title}</h1>
            <p className='p-10 text-xl'>{item.content}</p>
            <div className='flex justify-between'>
              <p>Status :{item.status}</p>
              <p>Date :{item.addedDate.substring(0,10)}</p>
            </div>
          </div>
        ))
       
      )}
    </div>
  )
}

export default UserTask
