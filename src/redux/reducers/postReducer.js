import { ADD_POST } from "../actions";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      case "ADD_COMMENT":
        const { postId, comment } = action.payload;
        const updatedPost = state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: [...(post.comments || []), { commentTitle: comment }],
              }
            : post
        );
        return {
          ...state,
          posts: updatedPost,
        };
      ;
      
      case "DELETE_POST":
        const filteredPosts = state.posts.filter(
          (post) => post.id !== action.payload
        );
        return {
          ...state,
          posts: filteredPosts,
        };
      
    case "UPDATE_POST":
      const updatedPosts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };

    case "GET_ALL_POST":
      return {
        ...state,
        posts: action.payload,
      };
      case "GET_SINGLE_POST":
        return {
          ...state,
          posts: action.payload,
        };
    default:
      return state;
  }
};

export default postReducer;
