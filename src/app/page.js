"use client"
import axios from "axios"
import { useState } from "react";

export default function Home() {

  const [user, setUser] = useState()

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/api/current");
    console.log(res.data);
    setUser(res.data)
  }
  

  return (

    <div>
      <h1>{user}</h1>
      <h1>Home</h1>
    </div>
  )
}
