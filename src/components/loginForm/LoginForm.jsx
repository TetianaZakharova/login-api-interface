import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { LOGIN_URL } from "../../api/apiUrls";
import { EMAIL_REGEX, PWD_REGEX } from "../../helpers/regex";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
    setValidPassword(PWD_REGEX.test(formData.password));
    setErrMsg("");
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      setValidation((prev) => ({
        ...prev,
        [name]: `${[name.charAt(0).toUpperCase() + name.slice(1)]} is required`,
      }));
    } else {
      setValidation((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: formData.email, password: formData.password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //   console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      setAuth({
        email: formData.email,
        password: formData.password,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 422) {
        setErrMsg("Invalid Email or Password");
      } else {
        errRef.current.focus();
      }
    }
  };
  return (
    <>
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
          value={formData.email}
          required
          placeholder="Work email"
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
        />
        <p className="input-error">{validation.email}</p>
        <p id="emailnote" className="psw-err">
          {!validEmail && formData.email
            ? `Email is incorrect. Please enter valid Email`
            : ``}
        </p>
        <div className="psw-wrap">
          <input
            // type="password"
            type={visible ? "test" : "password"}
            id="password"
            name="password"
            className="login-input"
            onChange={handleInputChange}
            value={formData.password}
            required
            placeholder="Password"
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
          />
          <div onClick={() => setVisible(!visible)} >
            {visible ? (
              <FiEyeOff className="psw-icon" />
            ) : (
              <FiEye className="psw-icon" />
            )}
          </div>
        </div>
        <p className="input-error">{validation.password}</p>
        <p id="pwdnote" className="psw-err">
          {!validPassword && formData.password
            ? `Password should be 8 - 24 characters.
  Must include uppercase and lowercase letters, a number and a
  special character.`
            : ``}
        </p>
        <Link to="/forgot-password" className="active-link">
          Forgot your password?
        </Link>
        <button
          className="submit-btn"
          disabled={!validPassword || !validEmail ? true : false}
        >
          Log in to Emiorad
        </button>
      </form>
    </>
  );
};
