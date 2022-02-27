import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { headerlogo, Avatar_02, Avatar_21 } from "../../Entryfile/imagepath";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../../Constants";
const Header = (props) => {
  const [clientData, setClientdata] = useState();
  const [notificationData, setNotificationData] = useState(null);
  const [isRead, setIsRead] = useState(null);

  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("userIbfo");
    history.push("/");
  };
  let d = JSON.parse(localStorage.getItem("userIbfo"));
  useEffect(() => {
   axios
      .get(`${API_URL}/users/${d?._id}`)
      .then((data) => {
        setClientdata(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   let read = notificationData?.filter((res) => !res.isRead) || [];
  //   setIsRead(read.length);
  // }, [notificationData]);

  let pathname = "/app/main/dashboard";
  return (
    <div className="header" style={{ right: "0px" }}>
      {/* Logo */}
      <div className="header-left">
        <a href="/blue/app/main/dashboard" className="logo">
          <img src={headerlogo} width={40} height={40} alt="" />
        </a>
      </div>
      {/* /Logo */}
      <a
        id="toggle_btn"
        href=""
        style={{
          display: pathname.includes("tasks")
            ? "none"
            : pathname.includes("compose")
            ? "none"
            : "",
        }}
      >
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </a>
      <div className="page-title-box">
        <h3>Black Merchant</h3>
      </div>
      <a id="mobile_btn" className="mobile_btn" href="#sidebar">
        <i className="fa fa-bars" />
      </a>
      <ul className="nav user-menu">
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="" className="responsive-search">
              <i className="fa fa-search" />
            </a>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search here"
                // onChange={(e) => handleSearch(e)}
              />
              <button className="btn" type="button">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </li>

        <li className="nav-item dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <i className="fa fa-bell-o" />{" "}
            {isRead ? <span className="badge badge-pill">{isRead}</span> : ""}
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                {notificationData?.map((notification) => (
                  <li className="notification-message">
                    <a href="/blue/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_02} />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">You</span> added new
                            agenda{" "}
                            <span className="noti-title">
                              {notification.title}
                            </span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              {moment(
                                notification.createdAt.seconds * 1000
                              ).fromNow()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              {/* <a href="/blue/app/administrator/activities"> */}
              <a href="#">View all Notifications</a>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown has-arrow main-drop">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <img src={Avatar_21} alt="" />
              <span className="status online" />
            </span>
            <span>{clientData?.firstName}</span>
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              href="/blue/app/profile/employee-profile"
            >
              My Profile
            </a>
            <p className="dropdown-item" onClick={handleLogout}>
              Logout
            </p>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu">
        <a
          href="#"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </a>
        <div className="dropdown-menu dropdown-menu-right">
          <p className="dropdown-item" onClick={handleLogout}>
            Logout
          </p>
        </div>
      </div>
      {/* /Mobile Menu */}
    </div>
  );
};

export default Header;
