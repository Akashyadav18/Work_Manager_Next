"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const SignUp = () => {

  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACFCAMAAABCBMsOAAAAZlBMVEX///8WFhgAAAD8/PwSEhRXV1gLCw7Z2dlRUVIYGBrf39/39/ezs7QAAAYmJiabm5xjY2Rvb2+UlJQ2Njbr6+uOjo6qqqpLS0yBgYJdXV7l5eVAQEF4eHjMzMwuLi/GxsYeHiC9vb2/Dj+0AAAGA0lEQVR4nO1aC7OqKhS2BZIl+S7LtmX//09eHlaKgIm2z74zfjPnzE5BP9ebBZ63YsWKFStWrFixYsUKO9D7L4Q0V38NYU3jc5pwpOeY1uGvE9jSNAeOg4T4O0/p9teohPtjgAEI3vSBCQAOjvvfIIJOvoZBl4l/+rZ5VBmj0HkpJhK4Q4sRyapvEWAfWMQR4M5XQ5NfS9/3y2veQEdCGKK4+JbHPPInB8zM8fZD7/si5FYQhsX+Tn9uzFifAyB/fIVDdXnqgkCT0kIzpKBp8x50WVotTLY0Avl4gEBL4UkkgOfAiC6qFfaoc6uMAyQ8PCH90/nlsE7g0KrlvCiNIoD2uX79wfDabzlDYJbaNLDv214lCbhR9MHHsTH01s7Itya5TWThbW8HKYi06OUuM2/kFakUB0TbJZTCSDREGj2Vvz+Zw0Clt5BmARqMRMSftoN8P3xX9ciSoAyS7FEN+e1z2HEa86XBRJsfBAm/6j8LeeEjucmsyv6/JY9QHVD5gsYhL2ZLQ3gHIxH2Khv2714CvLMHS7Ll3VPGhJIGBDM5sDghbMzvX2WCSLtZrY2Waah+tC+nn+eRoC0J9fFVDpq8Dnk/aCMuDXGDulNgmhWWSXI1I2wjHQnpl31UuXhCVM0wjQtsMFN53zs4uYOWBLPEwev2wnjg4szBe8BmJ8SphKpSGJ0OOyj7jNFTqc6JPrxyaUKqXj/p1dEq5aQOT/lwcnUtR2Mx/aYmpGJnqjo58G4w/iY+JnYjUUVYa95nmyh0bil0giO3oifjdkX8vknwYGoTBXvdIFQin/CwlrmQQNK4azVBPGCEhWKIbHYthAEuvipskHmYmsp/7Aphc36Uz0Hc43V2O45QivE+uHFTI7cKchvMuUvlTneTvXCQYDAxNK7LXiohw0mBcBO1NhjHUQhxGP/3YwrRvk24CRynUUCSPW6Gxasbi6LBUrLTLHTLV57DsOnKQgRQjNVcZ0cb/XkGUW9VH7AYxCfL86wQwR80q4kQj1on1vhCIZ6nka0VvCwguemOFeZp+jtmFNzB1fAjMZJGTPUdD3ZYJ1wLaoOfMtxHZTGMdN7TVz9ZX/bn6AKnx6uOkTyiryTu5u8ygpcWONLFOiTLDotCYq0j7HnEmFhkCC3mei2GVvskuT5biIJAb2lGpAdLkfawVnyGAlOUj4dprppwFqUpByZmGpAY5oQlZ2G6qwUSLAwLO+Shi6EI38HF2OAIBIspsRMlPMb4prtecTGsii7mhTGvV8hEFhZZyJSrqfsw2JLmdFmM2AV/VUwUHhhIbGmyONiF3UckqnTTWbYT2KTWUt/FR2zx4oVt1sATTTZSO7jEC3PsbNGKqXrE2TGLH9X7qkEn+2h67LTkEe4ip7LJ47B/0QvjvClPJicRZfjEPGLJqR6iORBM4Eq7PEJ6FVdzqmfhklP19YVodtbX1igJQEprbjtFTVN4Xb3WnqYt6lJfGEojFiiyjmNgbpeE8J2SjtsSyDRhw6XW0tedoqk2iFXDQlTTZnOpO/U1MyNRjlfggkYZKjPdanDNeoQ3DT4jwbt9ihjd1iPDtRlCYWLsZ6nYQRJ2DdRxbTZcp6Lx6rsnjXP3jU7rVE+3ZqdTSPS/wHnNPuhfFJuxRVkfePNWp3P/4t3LaX8fp4mio4AZvZx3X0ta2XaknaURBgiXYNNn9LWUHt9oO0sjjDYDIP/g3OPr9zvlj4nCaFucs/qdvd6vtetsFIawhHm9314ffLRfoIPMXjP74O89AZmMHIRRSH3sZuwJdPZHJkasFwsq9kfwnP2R915RMTlYtCyOxQJ7Ra99s2C6h3DgYP6+GYfMYMTFNtuJu/l7iO1+6jzM3k997i3PwQJ7y899dncssM/eOXPgSmKJMwdSGu5KOSxz/kKcRfm46lWx2FkUYaKOnsLP5Sx2PKhzRmkKlj6j1D2v9bkgFj6vJfA+u/YRvnB2TeJ9ju8DZeQzU4cByplGO4cvnmn0Buc7Dbr44vnOFn/hrCvHXzj3K4n8+zPQLyr/+jz4Hzobv2LFihUrVqxYsWLF/wz/AdmNSWuzlyc/AAAAAElFTkSuQmCC",
  })

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/signup", data);
      console.log(res.data);
      if(res.data.status === 201){
        toast.success(res.data.message, {position: "top-center"});
        router.push('/login')
      }
      if(res.data.status ===400){
        toast.error(res.data.message, {position: "top-center"});
      }
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed", {position: "top-center"})
    } finally{
      setData({name: "", email: "", password: "", about: "", profileURL: "",})
    }
  }

  return (
    <div className='h-[calc(100vh-8rem)] flex flex-col justify-center items-center'>
      <h1 className='text-xl font-semibold m-10 text-center'>Sign Up</h1>
        <input onChange={(e) => setData({...data, name: e.target.value})} value={data.name} required type='text' className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' placeholder="Name"/>
        <input onChange={(e) => setData({...data, email: e.target.value})} value={data.email} required type='text' className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' placeholder="Email"/>
        <input onChange={(e) => setData({...data, password: e.target.value})} value={data.password} required type='password' className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' placeholder="Password"/>
        <textarea onChange={(e) => setData({...data, about: e.target.value})} value={data.about} required rows={5} cols={10} type='text' className='flex p-2 m-3 ring-1 ring-gray-300 w-[500px]' placeholder="About"/>
        <button onClick={submitSignup} type='submit' className='p-2 m-5 bg-green-600 ring-2 text-white text-xl font-semibold hover:ring-green-900 rounded-md'>Sign up</button>
    </div>
  )
}

export default SignUp
