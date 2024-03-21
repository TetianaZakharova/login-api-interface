import React from "react";
// import AuthContext from "../../context/AuthProvider";
import { LoginForm } from "../loginForm/LoginForm";
import { Delimeter } from "../delimeter/Delimeter";
import { ThirdPartAuth } from "../thirdPartAuth/ThirdPartAuth";

import "./login.scss";

export const Login = () => {

  return (
    <>
      <h2 className="form-title">Log in to your account</h2>
      <ThirdPartAuth />
      <Delimeter />
      <LoginForm  />
      <p className="">
        Is your company new to Qencode?
        <span className="line">
          <a className="active-link" href="#">
            {" "}
            Sign up
          </a>
        </span>
      </p>
    </>
  );
};
