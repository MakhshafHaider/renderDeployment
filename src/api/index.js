import {
  addPost,
  getAllPost,
  deletePost,
  updatePost,
  addComment,
  getComment,
  singlePost,
} from "../redux/actions";
import axios from "axios";
export const addPosts = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3000/posts/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = response.data;
      dispatch(addPost(posts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
};
export const getPostComment = (data) => {
  console.log("data", data);
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3000/posts/comment`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = response.data;
      dispatch(addPost(posts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
};

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3000/posts/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const posts = response.data;
      dispatch(getAllPost(posts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
};

export const deletedPost = (postId) => {
  return async (dispatch) => {
    try {
      console.log("id", postId);
      await axios.delete(`http://localhost:3000/posts/${postId}`);

      dispatch(deletePost(postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
};

export const updatedPost = (postId, data) => {
  return async (dispatch) => {
    try {
      console.log("postid", postId);
      console.log("data", data);
      const response = await axios.put(
        `http://localhost:3000/posts/${postId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updatePost(response.data));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
};

export const SinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/getSinglePost`,postId,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", response);
      dispatch(singlePost(response.data));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
};

export const addCommentToPost = (postId, data) => {
  return async (dispatch) => {
    try {
      console.log("postid", postId);
      console.log("data", data);
      const response = await axios.post(
        `http://localhost:3000/posts/${postId}/comment`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(addComment(response.data));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
};

export const addUsers = async (data) => {
  let response;
  try {
    response = await axios.post("http://localhost:3000/users/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return response;
};

export const LoginUsers = async (data) => {
  let response;
  try {
    response = await axios.post("http://localhost:3000/users/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return response;
};
