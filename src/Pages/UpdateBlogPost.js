import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import { useParams } from "react-router-dom";
import { SinglePost } from "../api";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateBlogPost() {
  const [editedPost, setEditedPost] = useState(null);

  const postData = useSelector((state) => state.postReducer.posts);

  console.log("postData", postData);
  const params = useParams();
  const dispatch = useDispatch();
  const postId = params.id;
  useEffect(() => {
    (async function getBlogDetails() {
      dispatch(SinglePost(postId));
    })();
  }, [postId]);
 
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <PostForm editedPost={postData} setEditedPost={setEditedPost} />
    </div>
  );
}
