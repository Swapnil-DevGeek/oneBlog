"use client";
import Posts from "@/components/Posts";
import Navbar from "@/components/Navbar";

export default function Home() {
  
  return (
    <>
      <Navbar/>

      <hr className="mb-3"/>

      <div className="max-w-[50%] mx-auto py-6">
        <Posts fetchAll={true}/>
      </div>    

    </>
  );
}
