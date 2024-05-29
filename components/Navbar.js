"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        console.error('Error searching posts:', data);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        router.push("/login");
      }
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
  }, [router, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const decode = token ? jwt.decode(token) : "";

  const userName = token ? decode.username : "User";
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <>
    <nav className="flex justify-between items-center py-4 px-12 ">
      <div className="flex justify-center items-center gap-4">
        <a href="/" className="cursor-pointer">
          <img
            className="h-12 w-12"
            src="https://miro.medium.com/v2/resize:fit:1400/1*psYl0y9DUzZWtHzFJLIvTw.png"
            alt="Logo"
          />
        </a>
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div 
            onClick={handleSearch}
            className="cursor-pointer absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e)=>{setSearchTerm(e.target.value)}}
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50  dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-600"
              placeholder="Search Posts"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-8 hover:text-gray-700">
        <a href="/addPost">
          <div className="flex justify-center items-center gap-1 cursor-pointer">
            <svg
              class="w-[18px] h-[18px] dark:text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.1"
                d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
              />
            </svg>
            <p className="text-gray-500">Write</p>
          </div>
        </a>

        <div className="relative">
          <div
            id="avatarButton"
            type="button"
            onClick={toggleDropdown}
            className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-700 text-white cursor-pointer"
          >
            {initials}
          </div>

          {isDropdownOpen && (
            <div
              id="userDropdown"
              className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{userName}</div>
                <div className="font-medium truncate">{decode.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Library
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="/login"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>

    <div>
      
      

    </div>

    </>
  );
};

export default Navbar;
