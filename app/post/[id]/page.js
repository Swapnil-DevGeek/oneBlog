"use client";
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react'

import { AiOutlineLike , AiFillLike} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import axios from 'axios';

const page = ({params}) => {
    const id = params.id;

    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);

    const [date,setDate] = useState(Date.now());

    const [username, setUsername] = useState("");

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const post = async () => {
        const res = await fetch(`http://localhost:3000/api/getPost/${id}`);
        const data = await res.json();
        
        setTitle(data.title);
        setTagline(data.tagline);
        setContent(data.content);
        setCategories(data.categories.split(" "));

        setUsername(data.author.name);
        setDate(data.createdAt);
        setLikes(data.likes);
    }

    useEffect(() => {
        post();
    }, []);

    const initials = username
    .split(" ")
    .map((name) => name[0])
    .join("");

    function formatISODate(isoDate) {
        const date = new Date(isoDate);
    
        // Define options for toLocaleDateString to format the date as needed
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
    
        // Convert the date to the desired format
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        // Rearrange the date string to match "Mar 27, 2024" format
        const [month, day, year] = formattedDate.split(' ');
        const finalDate = `${month} ${day.replace(',', '')}, ${year}`;
    
        return finalDate;
    }
    
    function calculateReadingTime(content) {
        // Average reading speed in words per minute
        const wordsPerMinute = 250;
    
        // Split the content into words and count them
        const wordCount = content.split(/\s+/).length;
    
        // Calculate the reading time in minutes
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
        return readingTime;
    }

    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;

        const processNode = (node) => {
        let text = '';

        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent;
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              text += processNode(child) + '\n';  // Add a newline after processing an element
            }
        });
              return text.trim(); // Trim to remove leading/trailing newlines
        };
    
        return processNode(div);
    };

    const handleLikes = async ()=>{
        try {
            const response = await axios.put("http://localhost:3000/api/likePost",{
                postId : parseInt(id, 10)
            },{
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })

            if(response.status === 200){
                setLikes(response.data.likes);
                setIsLiked(true);
            }

        } catch (error) {   
            console.error(error);
        }
    }

    const handleCopyUrl = async ()=> {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("URL Copied");
            console.log("clicked")
        } catch (error) {
            console.error("Error", error);
        }
    }

    return (
    <>
        <Navbar/>

        <hr className="mb-3"/>
    
        <div className='max-w-[50%] px-8 mx-auto mt-14'>
            
            {/* title and tagline */}
            <div>
                <h1 className='text-4xl font-extrabold text-gray-800'>{title}</h1>
                <p className='text-gray-500 my-2 '>{tagline}</p>
            </div>

            {/* user details */}
            <div className='flex items-center gap-2 mt-6'>
                <div className='flex justify-center items-center h-12 w-12 bg-blue-600 text-white rounded-full'>
                    {initials}
                </div>
                <div>
                    <div>
                        <h3>{username}</h3>
                    </div>
                    <div className='flex items-center gap-1 text-gray-600 text-sm'>
                        <div>
                            {calculateReadingTime(content)} min read
                        </div>

                        <div className='h-1 w-1 rounded-full bg-gray-600'> 
                        </div>
                        
                        <div>
                            {formatISODate(date)}
                        </div>
                    </div>
                </div>
            </div>

            {/* likes and save */}

            <div className='flex justify-between items-center px-2 my-8 border-y py-4'>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        {isLiked ? <AiFillLike 
                        className='h-6 w-6 text-gray-700 cursor-pointer'/> : 
                        
                        <AiOutlineLike 
                        onClick={handleLikes}
                        className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700'/>

                        }
                    
                        <div>
                            <p>{likes}</p>
                        </div>
                    </div>
                    <div>
                        <FaRegComment className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>  
                </div>

                <div className='flex items-center gap-3'>
                    <div>
                        <MdOutlineBookmarkAdd className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>
                    <div>
                        <FaRegCirclePlay className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>
                    <div>
                        <MdIosShare 
                        onClick={handleCopyUrl}
                        className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>
                </div>

            </div>

            {/* content */}
            <div className='my-4 font-serif text-lg '>
                {stripHtmlTags(content)}
            </div>

            {/* categories */}
            <div className='flex flex-wrap gap-2 mt-1'>

                {categories.map((category,index) => {
                    return (
                        <span
                            key={index}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded"
                        >
                            {category}
                        </span>
                    )
                })}

            </div>

            {/* likes and save */}

            <div className='flex justify-between items-center px-2 my-6 py-4'>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        {isLiked ? <AiFillLike 
                        className='h-6 w-6 text-gray-700 cursor-pointer'/> : 
                        
                        <AiOutlineLike 
                        onClick={handleLikes}
                        className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700'/>

                        }
                    
                        <div>
                            <p>{likes}</p>
                        </div>
                    </div>
                    <div>
                        <FaRegComment className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>  
                </div>

                <div className='flex items-center gap-3'>
                    <div>
                        <MdOutlineBookmarkAdd className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>

                    <div>
                        <MdIosShare
                        onClick={handleCopyUrl}
                        className='h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700 ' />
                    </div>
                </div>

            </div>
            
        </div>
    
    </>
)
}

export default page
