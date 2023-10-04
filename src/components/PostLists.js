import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deletedPost, addCommentToPost, fetchPosts } from "../api/index";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostList({ post, onEdit }) {
  const [commentTitle, setCommentTitle] = useState("");
  const [ownsBlog, setOwnsBlog] = useState(false);
  const userState = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getDetails() {
      if (userState && userState.id === post.authorId) {
        console.log("userState.name", userState.name);
        console.log("post.author", post.author);
        setOwnsBlog(true);
      }
    }
  
    getDetails();
  }, [userState]);
  

  const handleCommentChange = (e) => {
    setCommentTitle(e.target.value);
  };

  const handleAddComment = () => {
    if (commentTitle !== "") {
      const newComment = {
        commentTitle: commentTitle,
      };

      dispatch(addCommentToPost(post.id, newComment)).then(() => {
        dispatch(fetchPosts());
      });
      setCommentTitle("");
    }
  };

  const handleEditClick = (id) => {
    navigate(`/post/update/${id}`);
  };

  const handleReadMoreClick = (id) => {
    navigate(`/post/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deletedPost(id)).then((response) =>
      console.log("response", response)
    );
  };

  return (
    <PostListStyle>
      <div className="postedContainer">
        <h3 className="titleStyle">Title: {post.title}</h3>
        <p className="contentStyle">Content: {post.content}</p>
        <p>Posted by: {post.author}</p>
        <div className="buttonContainerStyle">
          <Button
            variant="primary"
            style={{
              color: "black",
              marginRight: 10,
            }}
            onClick={() => handleReadMoreClick(post.id)}
          >
            Read More
          </Button>
          {ownsBlog && (
            <>
              <Button
                variant="primary"
                style={{
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() => handleEditClick(post.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="buttonStyle"
                style={{
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() => handleDeleteClick(post.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <Form.Label className="leaveStyle">Leave a Comment</Form.Label>
        <Form.Control
          type="text"
          value={commentTitle}
          onChange={handleCommentChange}
        />
        <Button
          style={{ marginTop: 10, color: "black" }}
          variant="primary"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>{" "}
        {post.comments && post.comments.length > 0 && (
          <div>
            {post.comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <p className="commentStyle">{comment.commentTitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PostListStyle>
  );
}

export default PostList;

const PostListStyle = styled.div`
  .formContainer {
    padding-top: 50px;
    width: 90%;
    margin: 0 auto;
  }
  .contentStyle {
    height: 150px;
    overflow-y: auto;
    background-color: white;
  }
  .leaveStyle {
    background-color: white;
  }
  .buttonContainerStyle {
    background-color: white;
  }
  .titleStyle {
    background-color: white;
    min-height: 70px;
    overflow-y: auto;
  }
  .commentStyle {
    background-color: white;
    margintop: 10;
  }
  .postedContainer {
    // border: 1px solid #eeeeee;
    padding: 10px;
    background-color: white;
    margin-top: 10px;
  }
`;
