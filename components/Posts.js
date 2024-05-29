import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdOutlineDelete } from "react-icons/md";

const Posts = ({ fetchAll }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not logged in!');
      }

      const res = fetchAll
        ? await fetch("http://localhost:3000/api/getAll")
        : await fetch(`http://localhost:3000/api/userPosts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          });

      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json(); // Parse the response as JSON
      const sortedPosts = data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts); // Assuming data is an array of posts
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

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
    return div.textContent || div.innerText || '';
  };

  const handleUpdate = (postId) => {
      router.push("http://localhost:3000/update/"+postId);
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not logged in!');
        return;
      }
      const res = await fetch(`http://localhost:3000/api/deletePost`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          id: postId
        })
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      alert('Post deleted successfully!');
      // Update the state to remove the deleted post
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map(post => (
          <>
          <div className='flex justify-end px-4 items-center gap-2 mb-3'>
          {!fetchAll && (
                  <div className='cursor-pointer' onClick={() => handleUpdate(post.id)}>
                  <svg className="w-6 h-6 dark:text-gray-500 hover:dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                  </svg>
                </div>
                )}

                {!fetchAll && (
                  <div className='cursor-pointer' onClick={() => handleDelete(post.id)}>
                  <MdOutlineDelete className='h-6 w-6 text-gray-500 hover:dark:text-gray-800'/>
                </div>
                )}  
          </div>
          <div key={post.id} onClick={()=>{router.push("http://localhost:3000/post/"+post.id)}} className='mb-4 border-b-2 pb-8 cursor-pointer'>
            <div className='content mb-7'>
              <div className='Author mb-2 flex items-center gap-2 text-sm'>
                <div className='avatar w-7 h-7 text-xs flex justify-center items-center rounded-full bg-blue-700 text-white'>
                  {post.author.name.split(" ").map((name) => name[0]).join("")}
                </div>
                <div className='Name text-gray-800'>
                  {post.author.name}
                </div>

                <div className='Date flex items-center gap-1'>
                  <div className='w-[4px] h-[4px] flex justify-center items-center rounded-full bg-gray-400'></div>
                  <div className='text-gray-500'>{formatISODate(post.createdAt)}</div>
                </div>
              </div>

              <div>
                <h2 className='font-bold text-xl mb-1'> {post.title} </h2>
              </div>

              <div>
                <p>{stripHtmlTags(post.content).substring(0, 600)}...</p>
              </div>
            </div>

            <div className='extras text-xs flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='tags bg-gray-100 py-1 px-3 rounded-2xl'>
                  {post.categories.split(' ')[0]}
                </div>
                <div className='text-xs text-gray-500'>
                  {calculateReadingTime(post.content)} min read
                </div>
              </div>

                <div className='px-4' onClick={() => console.log("clicked!")}>
                  <svg className="w-[24px] h-[24px] dark:text-gray-500 hover:dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                  </svg>
                </div>

            </div>
          </div>
          </>
        ))
      ) : (
        <p>No Posts</p>
      )}
    </div>
  );
};

export default Posts;
