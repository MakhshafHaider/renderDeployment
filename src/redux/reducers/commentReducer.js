const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "GET_COMMENTS":
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default commentReducer;
