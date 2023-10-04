import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUsers } from "../api";
import InputField from "../shared/InputField";
import salt from '../config/index.js';
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS } from "../redux/actions/userActions";
import bcrypt from 'bcryptjs'

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseuser = useSelector((state) => state.userReducer.response);

  const hanleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const hanlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const hanleNameChange = (e) => {
    setName(e.target.value);
  };

  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log('hashedpas', hashedPassword);
  const handleData = async () => {
    const newUser = {
      email,
      name,
      password:hashedPassword,
    };

    const response = await LoginUsers(newUser);

    if (response && response.status === 201) {
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        auth: response.data.auth,
        jwt: response.data.jwt,
      };
      dispatch(LOGIN_SUCCESS(user));

      navigate("/");
    } 
    else{
      setError("Invalid credentials")
    }
  };

  return (
    <LoginContainer>
      <div>
        <div className="LoginStyle">
          <InputField
            title="Enter email"
            value={email}
            onChange={hanleEmailChange}
          />
          
          <InputField
          type="password"
            title="Enter Password"
            value={password}
            onChange={hanlePasswordChange}
          />
          <Button variant="primary" onClick={handleData}>
            Log In
          </Button>
          {error &&  (
            <h4>{error}</h4>
          )}
        </div>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  .LoginStyle {
    width: 50%;
    margin: 0 auto;
  }
`;
