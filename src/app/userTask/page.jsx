"use client";

import UserContext from '@/context/userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md"
import {CiEdit} from "react-icons/ci"

const UserTask = () => {

  const router = useRouter();

  const [task, setTask] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  console.log("User: " + user);

  useEffect(() => {
    const getData = async (userId) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/users/${userId}/tasks`)
        setTask(data)
        router.refresh();
        setLoading(false)
      }
      catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData(user._id);
  }, [])

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/tasks/${_id}`);
      console.log(res);
      toast.success("Task deleted successfully")
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting data")
    }
  }

  console.log(task);

  return (
    <div className='h-[calc(100vh-9rem)] flex-col justify-center items-center overflow-y-auto w-[70%] mx-auto'>
      {loading ? <p>Loading...</p> :
        task.length > 0 ? (
          task.map((item) => (
            <div key={item.id} className='ring-2 ring-gray-500 mt-5 text-center rounded-md'>
              <div className='p-3 flex justify-between items-center text-xl font-semibold bg-slate-200 uppercase'>
                <h1 className='text-center'>{item.title}</h1>
                <div className='flex gap-4'>
                
                <MdDelete color={"red"} size={25} onClick={() => handleDelete(item._id)} className='cursor-pointer'/>
                </div>
              </div>
              <p className='p-10 text-xl'>{item.content}</p>
              <div className='flex justify-between'>
                <p>Status :{item.status}</p>
                <p>Date :{item.addedDate.substring(0, 10)}</p>
              </div>
            </div>
          ))

        ) :
          <h1 className=''>User has no Task...</h1>
      }
    </div>
  )
}

export default UserTask
