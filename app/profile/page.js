import Navbar from '@/components/Navbar'
import Profile from '@/components/Profile'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar/>
      <hr className="mb-3"/>
      <div className="max-w-[60%] mx-auto py-6 mt-10">
        <Profile fetchAll={false}/>
      </div> 
    </>
  )
}

export default page
