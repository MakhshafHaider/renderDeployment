import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { fetchPosts } from "../api/index";
import PostLists from "../components/PostLists";
import PostForm from "../components/PostForm";

function App() {
  const dispatch = useDispatch();
  const totalPosts = useSelector((state) => state.postReducer.posts);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleEdit = (post) => {
    setEditedPost(post);
  };

  return (
    <PostContainer>
      <div className="app">
        <div className="post-row">
          {totalPosts.length > 0 ? (
            totalPosts.map((post) => (
              <div key={post.id} className="post-item">
                <PostLists post={post} onEdit={handleEdit} />
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </PostContainer>
  );
}

export default App;

const PostContainer = styled.div`
  * {
    background-color: #f7f7f7;
  }
  .app {
    // width: 90%;
    // margin: 0 auto;
  }
  .post-row {
    width: 90%;
    margin-left: 65px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 300px;
    overflow-y: auto;
  }
  .post-item {
    width: calc(33.33% - 10px);
    background-color: white;
    border: 1px solid #eeeeee;
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .formContainer {
    padding-top: 50px;
    width: 90%;
    margin: 0 auto;
  }

  .postedContainer {
    // border: 1px solid #eeeeee;
    padding: 10px;
    background-color: white;
    margin-top: 10px;
  }
`;
