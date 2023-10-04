import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { addUsers } from "../api";
import { useNavigate } from "react-router-dom";
import { SIGNUP_SUCCESS } from "../redux/actions/userActions";
import bcrypt from "bcryptjs";
import salt from "../config";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };
  const hanleNameChange = (e) => {
    setName(e.target.value);
  };

  const hanlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const hashedPassword = bcrypt.hashSync(password, salt);
  const handleData = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character."
      );
      return;
    }

    const data = {
      email,
      name,
      password: hashedPassword,
    };
    const response = await addUsers(data);

    if (response && response.status === 201) {
      const user = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: response.data.user.name,
        auth: response.data.auth,
        jwt: response.data.jwt,
      };
      dispatch(SIGNUP_SUCCESS(user));

      navigate("/");
    }
  };
  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      // setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password) => {
    const capitalLetterPattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (
      password.length < 8 ||
      !capitalLetterPattern.test(password) ||
      !numberPattern.test(password) ||
      !specialCharacterPattern.test(password)
    ) {
      // setPasswordError(
      //   "Password must be at least 8 characters long and contain at least one capital letter, one number, and one special character."
      // );
      return false;
    }

    setPasswordError("");
    return true;
  };

  return (
    <LoginContainer>
      <div className="LoginStyle">
        <InputField
          title="Enter email"
          value={email}
          onChange={hanleEmailChange}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}

        <InputField
          title="Enter name"
          value={name}
          onChange={hanleNameChange}
        />
        <InputField
          type="password"
          title="Enter Password"
          value={password}
          onChange={hanlePasswordChange}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

        <Button variant="primary" onClick={handleData}>
          Sign up
        </Button>
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
