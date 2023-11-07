"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserTask = () => {

  const [task, setTask] = useState();
    const [loading, setLoading] = useState(true)

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
        getData();
    }, [])

    console.log(task);

  return (
    <div>
      UserTask
    </div>
  )
}

export default UserTask
