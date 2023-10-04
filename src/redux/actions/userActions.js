export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const Error = (user) => ({
  type: "LOGIN_ERROR",
  payload: user,
});

export const LOGIN_SUCCESS = (user) =>({
  type: "LOGIN_SUCCESS",
  payload: {
    user
  },
});
export const SIGNUP_SUCCESS = (user) =>({
  type: "SIGNUP_SUCCESS",
  payload: {
    user
  },
});
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const USER_RESET= "USER_RESET";
