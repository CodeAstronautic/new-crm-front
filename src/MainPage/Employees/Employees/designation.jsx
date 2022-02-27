import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";

import "../../antdstyle.css";

class Designations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, department: "Web Development", designation: "Web Developer" },
        {
          id: 2,
          department: "Application Development",
          designation: "Application Developer",
        },
        { id: 3, department: "Web Development", designation: "Web Developer" },
        { id: 4, department: "Web Development", designation: "Web Developer" },
        { id: 5, department: "Web Development", designation: "Web Developer" },
        {
          id: 6,
          department: "Application Development",
          designation: "Application Developer",
        },
      ],
    };
  }
  render() {
    const { data } = this.state;
    const columns = [
      {
        title: "#",
        dataIndex: "id",
        sorter: (a, b) => a.id.length - b.id.length,
      },
      {
        title: "Department",
        dataIndex: "department",
        sorter: (a, b) => a.department.length - b.department.length,
      },
      {
        title: "Designation",
        dataIndex: "designation",
        sorter: (a, b) => a.designation.length - b.designation.length,
      },
      {
        title: "Action",
        render: (text, record) => (
          <div className="dropdown dropdown-action text-right">
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#edit_designation"
              >
                <i className="fa fa-pencil m-r-5" /> Edit
              </a>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#delete_designation"
              >
                <i className="fa fa-trash-o m-r-5" /> Delete
              </a>
            </div>
          </div>
        ),
      },
    ];
    return (
      <div className="page-wrapper">
        <Helmet>
          <title>Designations - Diginfo CRM Dev</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Designations</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/blue/app/main/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Designations</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a
                  href="#"
                  className="btn add-btn"
                  data-toggle="modal"
                  data-target="#add_designation"
                >
                  <i className="fa fa-plus" /> Add Designation
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped"
                  pagination={{
                    total: data.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                  onChange={this.handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="add_designation"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Designation</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>
                      Designation Name <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group">
                    <label>
                      Department <span className="text-danger">*</span>
                    </label>
                    <select className="select">
                      <option>Select Department</option>
                      <option>Web Development</option>
                      <option>IT Management</option>
                      <option> Marketing</option>
                    </select>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          id="edit_designation"
          className="modal custom-modal fade"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Designation</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>
                      Designation Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      defaultValue="Web Developer"
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Department <span className="text-danger">*</span>
                    </label>
                    <select className="select">
                      <option>Select Department</option>
                      <option>Web Development</option>
                      <option>IT Management</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal custom-modal fade"
          id="delete_designation"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Designation</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn">
                        Delete
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        href=""
                        data-dismiss="modal"
                        className="btn btn-primary cancel-btn"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Designations;
