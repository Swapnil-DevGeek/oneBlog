"use client";
import AddPostPage from '@/components/AddPostPage'
import React from 'react'

const page = () => {
  const title = ""
  const tagline = ""
  const content = ""
  const categories = []
  const isEdit = false
  
  return (
    <AddPostPage 
      tit={title}
      tag={tagline}
      cont={content}
      categ={categories}
      isEdit = {isEdit}
      id={-1}
    />
  )
}

export default page
