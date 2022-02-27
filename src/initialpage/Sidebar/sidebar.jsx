/**
 * App Header
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { location } = this.props;
    let pathname = location.pathname;

    return (
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className="submenu">
                <a href="#">
                  <i className="la la-dashboard" /> <span> Dashboard</span>{" "}
                  <span className="menu-arrow" />
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a
                      className={
                        pathname.includes("main/dashboard") ? "active" : ""
                      }
                      href="/blue/app/main/dashboard"
                    >
                      Admin Dashboard
                    </a>
                  </li>
                  {/* <li><a className={pathname.includes('main/employee-') ?"active" :""} 
                        href="/blue/app/main/employee-dashboard">Employee Dashboard</a></li> */}
                </ul>
              </li>

              <li className="menu-title">
                <span>Clients</span>
              </li>

              <li className={pathname.includes("clients") ? "active" : ""}>
                <a href="/blue/app/employees/clients">
                  <i className="la la-users" /> <span>Clients</span>
                </a>
              </li>

         
              <li className={pathname.includes("users") ? "active" : ""}>
                <a href="/blue/app/employees/users-list">
                  <i className="la la-users" /> <span>Users</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
