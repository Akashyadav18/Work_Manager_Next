"use client"
import UserContext from "@/context/userContext";
import { useContext, useState } from "react";

export default function Home() {

  const {user} = useContext(UserContext);
console.log(user);
  return (

    <div className="h-[calc(100vh-8rem)] text-xl font-semibold pt-40 text-center">
      <h1>Name : {user.name}</h1>
      <p className="p-4">Email : {user.email}</p>
      <h3>About : {user.about}</h3>
    </div>
  )
}
