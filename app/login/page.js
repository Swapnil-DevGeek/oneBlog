"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setError("");
        alert("Login successful");
        const data = res.data;
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.error('Error', err.message);
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
              Sign in to your account
            </h1>
            <p className="text-sm font-semibold text-red-700"> {error} </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-100 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
