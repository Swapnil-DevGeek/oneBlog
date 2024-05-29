"use client";
import AddPostPage from '@/components/AddPostPage'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

    const id = params.id;

    const [title, setTitle] = useState("");
    const [tagline, setTagline] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);

    const isEdit = true;

    const post = async () => {
        const res = await fetch(`http://localhost:3000/api/getPost/${id}`);
        const data = await res.json();
        
        setTitle(data.title);
        setTagline(data.tagline);
        setContent(data.content);
        setCategories(data.categories.split(" "));

    }

    useEffect(() => {
        post();
    }, []);

return (
    <AddPostPage 
        tit={title}
        tag={tagline}
        cont={content}
        categ={categories}
        isEdit={isEdit}
        id={id}
    />
)
}

export default page
