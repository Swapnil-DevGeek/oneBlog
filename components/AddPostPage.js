"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

// Dynamically import ReactQuill to ensure it's only loaded on the client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AddPostPage = ({ tit, tag , cont , categ , isEdit , id }) => {
  const [title, setTitle] = useState(tit);
  const [tagline, setTagline] = useState(tag);
  const [content, setContent] = useState(cont);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(categ);
  const router = useRouter();

  useEffect(() => {
    setTitle(tit);
    setTagline(tag);
    setContent(cont);
    setCategories(categ);
  }, [tit, tag, cont, categ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryString = categories.join(" ");
    try {
      const response = !isEdit 
        ? await axios.post("http://localhost:3000/api/write", {
            title,
            tagline,
            content,
            categories: categoryString,
          }, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }) 
        : await axios.put("http://localhost:3000/api/updatePost", {
            id : parseInt(id, 10),
            title,
            tagline,
            content,
            categories: categoryString,
          }, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });

      if (response.status === 200) {
        isEdit ? alert("Post updated successfully!") : alert("Post added successfully!");
        // Redirect or perform any additional actions here if needed
        router.push('/');  // Adjust the route if needed
      }

      // Reset form fields if adding a new post
      if (!isEdit) {
        setTitle("");
        setTagline("");
        setContent("");
        setCategories([]);
        setNewCategory("");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("User not logged in!");
        router.push('/login');
      } else {
        alert("Error adding post");
        console.error("Error adding post", error);
      }
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((category) => category !== categoryToRemove));
  };

  return (
    <div className="max-w-[60%] mx-auto">
      <nav className="flex justify-between items-center p-2">
        <a href="/" className="cursor-pointer">
          <img
            className="h-12 w-12"
            src="https://miro.medium.com/v2/resize:fit:1400/1*psYl0y9DUzZWtHzFJLIvTw.png"
            alt="Logo"
          />
        </a>
      </nav>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Tagline:
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <div>
          <label className="block">
            Content:
            <ReactQuill value={content} onChange={setContent} className="mt-1" />
          </label>
        </div>
        <div>
          <label className="block">
            Categories:
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded"
                >
                  {category}
                  <AiFillDelete
                    className="cursor-pointer"
                    onClick={() => handleRemoveCategory(category)}
                  />
                </span>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="block w-full p-2 border rounded-l"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 bg-blue-500 text-white rounded-r"
              >
                Add Category
              </button>
            </div>
          </label>
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {isEdit ? "Update Post" : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostPage;
