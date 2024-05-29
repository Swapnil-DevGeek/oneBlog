"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/api/signup", {
      name : username,
      email,
      password,
    });
    if (res.status === 200) {
      alert("User successfully signed up!");
      router.push("/login");
    }
    else {
      const data = await res.json();
      alert(data.message);
    }
  }

    return (
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                  <label for="usernme" className="block mb-2 text-sm font-medium text-gray-700">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    className="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    className="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline">Log In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default page;
  