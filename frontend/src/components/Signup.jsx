import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

const Signup = () => {
   const [input,setInput] = useState({
     fullname:"",
     email:"",
     password:""
   });

   const navigate = useNavigate();
   const changeHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
   }

   const submitHandler = async (e)=>{
     e.preventDefault();
     try{
       const res = await axios.post("http://localhost:4000/api/v1/user/signup",input,{
        headers:{
          'Content-Type': "application/json"
        },
        withCredentials:true
       });

       console.log(res.data);
       if(res.data.success){
        navigate("/login");
        toast.success(res.data.message);
       }
     }
     catch(error){
      console.log(error);
      toast.error("Unable to create Account");
     }
   }
  return (
    <div className='flex items-center justify-center w-screen mt-32'>
        <form onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl uppercase my-2'>Signup</h1>
            <input onChange={changeHandler} value={input.fullname} name="fullname"  type='text' placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} value={input.email} name="email" type='email' placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1'/>
            <input onChange={changeHandler} value={input.password} name='password' type='password' placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1'/>
            <button type='submit' className='bg-gray-800 p-2 text-white my-2 rounded-md'>SignUp</button>
            <p>Already have an account?  <Link to={"/login"} className='text-blue-600'>Login</Link></p>
        </form>
    </div>
  )
}

export default Signup
