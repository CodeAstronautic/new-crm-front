import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { Applogo } from "../Entryfile/imagepath.jsx";
import axios from "axios";
import { API_URL } from "../Constants.js";
const Registrationpage = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    lastName: "",
    mobileNo: "",
    password: "",
    repeatPassword: "",
  });
  const [errorMessage, setMessage] = useState("");
  const [errors, setErrors] = useState({
    firstName: null,
    email: null,
    password: null,
    loginError: null,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      repeatPassword: values.repeatPassword,
      lastName: values.lastName,
      mobileNo: values.mobileNo,
      address: values.address,
      email: values.email,
      password: values.password,
    };
    axios
      .post(`${API_URL}/users/register`, data)
      .then((data) => {
        localStorage.setItem("token", data?.data?.token);
        if (data?.data?.token) {
          history.push("/login");
        }
      })
      .catch((Err) => {
        if (Err.response?.data?.message.split(" ")[0] == "E11000") {
          setMessage("The data already registered");
        }
      });
  };
  return (
    <div className="main-wrapper">
      <Helmet>
        <title>Register - Diginfo CRM Dev</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="account-content" style={{ marginTop: "264px" }}>
        {/* <a href="/blue/applyjob/joblist" className="btn btn-primary apply-btn">
          Apply Job
        </a> */}
        <div className="container">
          {/* Account Logo */}
          <div className="account-logo">
            <a href="/blue/app/main/dashboard">
              <img src={Applogo} alt="Black Merchant" className="logo"/>
            </a>
          </div>
          {/* /Account Logo */}
          <div className="account-box, form-position">
            <div className="register">
              <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <h3 style={{ color: "red" }}>{errorMessage}</h3>
                  )}
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      placeholder="Enter First Name"
                      value={values.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      placeholder="Enter last name"
                      value={values.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      placeholder="Enter Email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile No.</label>
                    <input
                      className="form-control"
                      placeholder="Enter Mobile No"
                      value={values.mobileNo}
                      name="mobileNo"
                      type="number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      placeholder="Enter Password"
                      value={values.password}
                      name="password"
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      className="form-control"
                      placeholder="Enter Repeat Password"
                      value={values.repeatPassword}
                      type="password"
                      name="repeatPassword"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      className="form-control"
                      placeholder="Address"
                      type="text"
                      value={values.address}
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group text-center">
                    <button
                      variant="contained"
                      className="btn btn-primary account-btn"
                      color="primary"
                      disabled={loading}
                    >
                      <span className="auth-modal-btn-txt">Register</span>
                    </button>
                    <div className="account-footer">
                      <p>
                        Already have an account? <a href="/blue/login">Login</a>
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
export default Registrationpage;
