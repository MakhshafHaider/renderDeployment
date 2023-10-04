export const ADD_POST = "ADD_POST";

export const addPost = (post) => ({
  type: ADD_POST,
  payload: post,
});

export const deletePost = (postId) => ({
  type: "DELETE_POST",
  payload: postId,
});

export const updatePost = (post) => ({
  type: "UPDATE_POST",
  payload: post,
});
export const getAllPost = (post) => ({
  type: "GET_ALL_POST",
  payload:post
});
export const addComment = (post) => ({
  type: "ADD_COMMENT",
  payload:post
});
export const getComment = (post) => ({
  type: "GET_COMMENT",
  payload:post
});
