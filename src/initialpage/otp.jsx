/**
 * Signin Firebase
 */

import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Applogo } from "../Entryfile/imagepath.jsx";

class OTPscreen extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Helmet>
          <title>OTP - Diginfo CRM Dev</title>
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
                <h3 className="account-title">OTP</h3>
                <p className="account-subtitle">Verification your account</p>
                <form action="/blue/app/main/dashboard">
                  <div className="otp-wrap">
                    <input
                      type="text"
                      placeholder={0}
                      maxLength={1}
                      className="otp-input"
                    />
                    <input
                      type="text"
                      placeholder={0}
                      maxLength={1}
                      className="otp-input"
                    />
                    <input
                      type="text"
                      placeholder={0}
                      maxLength={1}
                      className="otp-input"
                    />
                    <input
                      type="text"
                      placeholder={0}
                      maxLength={1}
                      className="otp-input"
                    />
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
                      Not yet received? <a href="">Resend OTP</a>
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

export default OTPscreen;
