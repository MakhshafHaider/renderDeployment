import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { addPosts, updatedPost, fetchPosts } from "../api/index";
import InputField from "../shared/InputField";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ editedPost, setEditedPost, title, subtitle, buttonText }) {
 
  const [postTitle, setPostTitle] = useState(
    editedPost ? editedPost.title : ""
  );
  const [postContent, setPostContent] = useState(
    editedPost ? editedPost.content : ""
  );
  const [error, setError] = useState("");

  const userState = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (editedPost) {
      setPostTitle(editedPost.title);
      setPostContent(editedPost.content);
    } else {
      setPostTitle("");
      setPostContent("");
    }
  }, [editedPost]);

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleData = () => {
    if (postTitle !== "" && postContent !== "") {
      const newPost = {
        title: postTitle,
        content: postContent,
        author: userState.name,
         authorId: userState.id
      };

      if (editedPost) {
        dispatch(updatedPost(editedPost.id, newPost)).then(() => {
          dispatch(fetchPosts());
          navigate('/');

        });
      } else {
        dispatch(addPosts(newPost));
        navigate('/');
      }

      setPostTitle("");
      setPostContent("");
      // setEditedPost(null);

      setError("");
    } else {
      setError("Please fill in both title and content fields.");
    }
  };

  return (
    <div>
      <Form className="formContainer">
        <InputField
          title="Post Title"
          value={postTitle}
          onChange={handleTitleChange}
        />
        <InputField
          title="Post Content"
          value={postContent}
          onChange={handleContentChange}
          as="textarea"
        />
      </Form>
      <div>
        <Button
          variant="primary"
          style={{
            color: "black",
          }}
          onClick={handleData}
        >
          {editedPost ? "Update" : "Post"}
        </Button>
      </div>
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default PostForm;
