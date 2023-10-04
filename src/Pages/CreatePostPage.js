import React , {useState, useEffect} from 'react'
import PostForm from '../components/PostForm'


export default function CreatePostPage() {
    

  return (
    <div style={{width: '90%', margin: "0 auto"}}>
        <PostForm  
          title="Post title"
          subtitle="Post Content"
          />
    </div>
  )
}
