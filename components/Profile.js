"use client";
import React from 'react'
import jwt from "jsonwebtoken"
import { useRouter } from 'next/navigation';
import Posts from './Posts';

const Profile = () => {

    const router = useRouter();
    const token = localStorage.getItem('token');

    if(!token){
        router.push('/login');
        alert("user not logged in!")
    }
    const decode = token ? jwt.decode(token) : "user";

    const userName = token ? decode.username : "User";
    const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

return (
    <div className=' flex min-h-screen'>   
        <div className='w-[70%] border-r-2 px-4 text-left'>

            <h1 className='font-bold text-4xl'> {userName} </h1>
            
            <h4 className='text-gray-400 font-semibold mt-8'>Your Posts</h4>

            <div className='mt-6'>
                <Posts/>
            </div>

        </div>
        <div className='w-[30%] px-8'>
            <div className='h-20 w-20 bg-blue-600 rounded-full flex justify-center items-center text-white mb-3'>
                {initials}
            </div>
            <div className='mb-4'>
                <h3 className='font-semibold text-lg'>{userName}</h3>
            </div>
        </div>
    </div>
  )
}

export default Profile
