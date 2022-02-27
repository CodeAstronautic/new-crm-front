import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Applogo } from "../Entryfile/imagepath.jsx";
import axios from "axios";
import { useHistory } from "react-router";
import { API_URL } from "../Constants";

const Loginpage = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${API_URL}/users/signin`, data)
      .then((data) => {
        localStorage.setItem("userIbfo", JSON.stringify(data?.data));
        history.push("/app/main/dashboard");
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  return (
    <div className="main-wrapper">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content">
        <div className="login-card">
          <div className="container">
            <div className="account-logo">
              <a href="/blue/app/main/dashboard">
                <img src={Applogo} alt="Diginfo Technologies" />
              </a>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      placeholder="Enter Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      variant="contained"
                      className="btn btn-primary account-btn"
                      color="primary"
                      type="submit"
                    >
                      <span className="auth-modal-btn-txt">Login</span>
                    </button>
                    <div className="account-footer">
                      <p>
                        Already have an account? <a href="/blue/register">Register</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
