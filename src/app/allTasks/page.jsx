"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const AllTasks = () => {

    const [task, setTask] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/tasks")
                setTask(data)
                setLoading(false)
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getData();
    }, [])

    return (
        <div className=''>
            <div className='h-[calc(100vh-9rem)] flex-col justify-center items-center overflow-y-auto w-[70%] mx-auto'>
            {loading ? <p>Loading...</p> : (

                task.map((item) => (
                    <div key={item.id} className='ring-2 ring-gray-500 mt-5 text-center rounded-md'>
                        <h1 className='p-3 text-xl font-semibold bg-slate-200 uppercase'>{item.title}</h1>
                        <p className='p-10 text-xl'>{item.content}</p>
                        <div className='flex justify-between'>
                            <p>{item.status}</p>
                            <p>{item.addedDate}</p>
                        </div>
                    </div>
                ))


            )}
        </div>
        </div>
        
    )
}

export default AllTasks
