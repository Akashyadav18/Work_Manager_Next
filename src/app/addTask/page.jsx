"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const addTask = () => {

    const router = useRouter();

    const [task, setTask] = useState({
        title: "",
        content: "",
        status: "none",
        userId: "",
    })

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/tasks", task);
            console.log(res.data);
            if(res.data.status === 201){
                toast.success("Task added successfully..", {position: "top-center"});
                router.push("/allTask")
            }
        } catch (error) {
            console.log(error);
            toast.error("Task not created", {position: "top-center"})
        } finally {
            setTask({title: "", content: "", status: "", })
        }
    }

    return (
        <div className='h-[calc(100vh-8rem)] grid grid-cols-12 justify-center items-center w-[100%] mx-auto'>
            <div className='col-span-6 col-start-5'>
                <h1 className='text-xl font-semibold m-10 pr-40 text-center'>Add Task</h1>
                <form className=''>
                    <input onChange={(e) => setTask({...task, title: e.target.value})} value={task.title} name="task_title" required type="text" className='flex p-2 m-5 ring-1 ring-gray-300 w-[500px]' placeholder='Title' />
                    <textarea onChange={(e) => setTask({...task, content: e.target.value})} value={task.content} name="task_content" required type="text" className='flex p-2 m-5 ring-1 ring-gray-300 w-[500px] h-[150px]' placeholder='Content' />
                    <select onChange={(e) => setTask({...task, status: e.target.value})} value={task.status}  name='task_status' required className='flex p-2 m-5 ring-1 ring-gray-300 w-[500px]'>
                        <option value="none">---Select Status---</option>
                        <option value="Just Added">Just Added</option>
                        <option value="Started">Started</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <div className='flex justify-center items-center mr-32'>
                        <button onClick={submitForm} type='text' className='p-2 bg-indigo-500 text-white text-xl hover:ring-2 ring-violet-600 m-4 rounded-md'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default addTask
