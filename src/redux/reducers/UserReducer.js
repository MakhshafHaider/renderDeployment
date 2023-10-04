const initialState = {
  user: null,
  response: null,
  error: null,
  auth: false,
  jwt:null

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: [...state.user, action.payload],
      };

    case "GET_ALL_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        response: action.payload.response,
        error: null,
        auth: true,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        response: action.payload.response,
        error: null,
        auth: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        response: action.payload.response,
        error: action.payload.errorMessage,
      };
    case "USER_RESET":
      return {
        ...state,
        user: null,
        response: null,
        error: null,
        auth: false,
      };

    default:
      return state;
  }
};

export default userReducer;
