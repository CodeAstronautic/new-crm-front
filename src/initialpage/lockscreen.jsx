import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Applogo, Avatar_02 } from "../Entryfile/imagepath.jsx";

class Lockscreen extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Helmet>
          <title>Lockscreen - Diginfo CRM Dev</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="account-content">
          <a
            href="/blue/applyjob/joblist"
            className="btn btn-primary apply-btn"
          >
            Apply Job
          </a>
          <div className="container">
            <div className="account-logo">
              <a href="/blue/app/main/dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </a>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <div className="lock-user">
                  <img alt="" src={Avatar_02} className="rounded-circle" />
                  <h4>John Doe</h4>
                </div>
                <form action="/blue/app/main/dashboard">
                  <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" />
                  </div>
                  <div className="form-group text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                    >
                      Enter
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Sign in as a different user?{" "}
                      <a href="/blue/register">Login</a>
                    </p>
                  </div>
                </form>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lockscreen;
