import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_RESET } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const isAuthenticated = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const handleSignOut = async () =>{
    dispatch({ type: USER_RESET }); 
   }
  return (
    <NavBarStyled>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="postLogo">
            <Link to="/" className="navbar-brand">
              Posts
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/create" className="nav-item nav-link">
                  Create a post
                </Link>
              </div>
              <div className="buttonContainer">
                {isAuthenticated && isAuthenticated.jwt ? (
                  <button className="Signup" onClick={handleSignOut}>Sign Out</button>
                ) : (
                  <>
                    <Link to="/login" className="Login">
                      Login
                    </Link>
                    <Link to="/signup" className="Signup">
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </NavBarStyled>
  );
}

const NavBarStyled = styled.div`
  .Login {
    padding: 5px 10px;
    margin-right: 40px;
    text-decoration: none;
    background-color: blue;
    color: white;
    border-radius: 10;
  }
  .Signup {
    background-color: blue;
    color: white;
    padding: 5px 10px;
    text-decoration: none;
    margin-right: 80px;
  }
  .postLogo {
    display: flex;
    margin-left: 70px;
  }
  .buttonContainer {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }
`;
