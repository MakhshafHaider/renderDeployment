import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SinglePost } from "../api";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function BlogPostPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.postReducer.posts);
  const postId = params.id;
  useEffect(() => {
    (async function getBlogDetails() {
      dispatch(SinglePost(postId));
    })();
  }, [postId]);
  return (
    <SinglePostStyle>
      <div className="post">
        <h2 className="titleStyle">{postData.title}</h2>
        <p>{postData.content}</p>
      </div>
    </SinglePostStyle>
  );
}

const SinglePostStyle = styled.div`
  .post {
    width: 90%;
    margin : 0 auto;
  }
  .titleStyle{
   margin-top : 20px;
  }
`;
