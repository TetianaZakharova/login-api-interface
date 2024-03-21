import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { SET_PASSWORD } from "../../api/apiUrls";
import { PWD_REGEX } from "../../helpers/regex";
import './setPassword.scss'

export const SetPassword = () => {
  const { setAuth } = useContext(AuthContext);
  const { token, secret } = useParams();
  const navigate = useNavigate();
  const errRef = useRef();

  const [inputData, setInputData] = useState({
    password: "",
    matchPassword: "",
  });

  const [validation, setValidation] = useState({
    password: "",
    matchPassword: "",
  });

  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(inputData.password));
    setValidMatch(inputData.password === inputData.matchPassword);
    setErrMsg('');
  }, [inputData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));

    if (!value) {   
      setValidation((prev) => ({
        ...prev,
        [name]: `This field is required`,
      }));
    } else {
      setValidation((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SET_PASSWORD,
        JSON.stringify({
          token: token,
          secret: secret,
          password: inputData.password,
          password_confirm: inputData.matchPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));

      setAuth({
        token: token,
        secret: secret,
        password: inputData.password,
        password_confirm: inputData.matchPassword,
      });
      console.log("Password updated");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Request Failed");
      } else if (err.response?.status === 422) {
        setErrMsg("Request Failed");
      } else {
        errRef.current.focus();
      }
    }
  };

  return (
    <>
      <h2 className="form-title">Create new Password?</h2>
      <p ref={errRef} className="form-error" aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={handleSubmit} className="loginform setpswform">
        <div>
          <label htmlFor="password" className="input-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-input setpwd"            
            onChange={handleInputChange}
            value={inputData.password}
            required
            placeholder="Password"
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="pwdnote"
          />
          <p className="psw-err">{validation.password}</p>
          <p id="pwdnote" className="psw-err">
            {!validPassword && inputData.password
              ? `Password should be 8 - 24 characters.
      Must include uppercase and lowercase letters, a number and a
      special character.`
              : ``}
          </p>
        </div>
        <div>
          <label htmlFor="matchPassword" className="input-label">Confirm Password:</label>
          <input
            type="password"
            id="matchPassword"
            name="matchPassword"
            className="login-input setpwd"       
            onChange={handleInputChange}
            value={inputData.matchPassword}
            required
            placeholder="Password"
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
          />
          <p className="psw-err">{validation.matchPassword}</p>
          <p id="pwdnote" className="psw-err">
            {!validMatch && inputData.matchPassword
              ? `Must match the first password input field.`
              : ``}
          </p>
        </div>
        <button
          className="submit-btn"
          disabled={!validPassword || !validMatch ? true : false}
        >
          Reset Password
        </button>
      </form>
    </>
  );
};
