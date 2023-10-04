import React, { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePostPage from "./Pages/CreatePostPage";
import BlogPostPage from "./Pages/BlogPostPage";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";
import UpdateBlogPost from "./Pages/UpdateBlogPost";

function App() {
  const isAuthenticated = useSelector((state) => state.userReducer.user);
  const isUserAuthenticated = isAuthenticated && isAuthenticated.jwt;

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" name="Home" element={<HomePage />} />
          <Route
            exact
            path="/create"
            name="Home"
            element={
              <Protected isAuth={isUserAuthenticated}>
                <CreatePostPage />
              </Protected>
            }
          />
          <Route
            exact
            path="/post/:id"
            name="Home"
            element={<BlogPostPage />}
          />
          <Route
            exact
            path="/post/update/:id"
            name="Home"
            element={<UpdateBlogPost />}
          />
          <Route
            exact
            path="/Login"
            name="Login page"
            element={<LoginPage />}
          />
          <Route
            exact
            path="/Signup"
            name="Signup Page"
            element={<SignupPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
