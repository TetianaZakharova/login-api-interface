import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import "./forgot-password.scss";
import axios from "../../api/axios";
import { RESET_URL } from "../../api/apiUrls";
import { EMAIL_REGEX } from "../../helpers/regex";

export const ForgotPassword = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState(false);
  const [validation, setValidation] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (!inputError && email) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [inputError, email]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (!EMAIL_REGEX.test(value) && value) {
      setInputError(true);
      setValidation(`Email is incorrect. Please enter valid Email`);
      setErrMsg("");
    } else if (!value) {
      setInputError(true);
      setValidation(`Email is required`);
      setErrMsg("");
    } else {
      setInputError(false);
      setValidation("");
      setErrMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirect_url = "https://auth-qa.qencode.com/password-set";
    try {
      // const response = await axios.post(
      //   RESET_URL,
      //   JSON.stringify({ email, redirect_url }),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );
      // console.log(JSON.stringify(response?.data));
      // const details = response?.data?.detail;
      // console.log(details);
      // setAuth({
      //   email,
      //   redirect_url,
      //   details,
      // });
      navigate("/password-set");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Request failed with status code: 400");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid User");
      } else if (err.response?.status === 422) {
        setErrMsg(" Request failed with status code: 422");
      } else {
        errRef.current.focus();
      }
    }
  };

  return (
    <>
      <h2 className="form-title">Forgot Password?</h2>
      <p ref={errRef} className="form-error" aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={handleSubmit} className="loginform">
        <input
          type="text"
          id="email"
          name="email"
          className="login-input"
          ref={userRef}
          autoComplete="off"
          onChange={handleInputChange}
          value={email}
          required
          placeholder="Enter your email"
        />
        <p className="input-error">{validation}</p>
        <button className="submit-btn" disabled={disabledBtn}>
          Send
        </button>
        <Link className="cancel-btn" to={"/"}>
          Cancel
        </Link>
      </form>
    </>
  );
};
