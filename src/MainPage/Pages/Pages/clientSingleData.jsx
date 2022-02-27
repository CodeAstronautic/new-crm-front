import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { API_URL } from "../../../Constants";
import "./clientSingleData.css";

const familYForm = [
  {
    fieldname: "Relation",
    label: "Relation",
    type: "text",
  },
  {
    fieldname: "Name",
    label: "Name",
    type: "text",
  },
  {
    fieldname: "Date_of_birth",
    label: "Date of birth",
    type: "date",
  },
  {
    fieldname: "mobile",
    label: "mobile",
    type: "text",
  },
  {
    fieldname: "Income",
    label: "Income",
    type: "numer",
  },
  {
    fieldname: "Retirement_age",
    label: "Retirement_age",
    type: "numer",
  },
];
const ClientSingleData = () => {
  let history = useHistory();
  const [flag, setFlag] = useState(false);
  const [familyData, setFamilyData] = useState(null);
  const [clientData, setClientData] = useState();

  const handleFamilyChange = (event) => {
    setFamilyData({
      ...familyData,
      [event.target.name]: event.target.value,
    });
  };
  const getData = () => {
    axios
      .get(`${API_URL}/client/${history?.location?.state?._id}`)
      .then((d) => {
        setClientData(d?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (history?.location?.state?._id) {
      getData();
    }
  }, []);

  const handleFamilySubmit = (event) => {
    event.preventDefault();
    let token = JSON.parse(localStorage.getItem("userIbfo"));
    axios
      .put(
        `${API_URL}/client/family/${history?.location?.state?._id}`,
        familyData,
        {
          headers: { authorization: `Bearer ${token?.token}` },
        }
      )
      .then((data) => {
        getData();
        setFlag(false);
        document.getElementById("Family_update").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteFamilyById = (i) => {
  
    axios
      .delete(
        `${API_URL}/client/family/${history?.location?.state?._id}/${i}`
      )
      .then((d) => {
        console.log(d);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
      clientData.family.splice(i);
  };
  return (
    <div>
      <div class="page-content">
        <div class="page-header">
          <h1> Client Profile </h1>
        </div>
        <div class="row fixed-bar affix-top">
          <div class="col-xs-12 col-md-12 col-lg-10 hidden-xs">
            <div class="col-xs-9 center">
              <a class="btn  btn-success btn-xs self-spin mmedittwo">
                <i class="fa fa-edit"></i> Edit
              </a>
              <a class="btn cmsprofdel fa-trash-delete btn-danger btn-xs self-spin-delete mmclientprofil INACTIVE ">
                <i class="fa fa-trash"></i> Delete
              </a>
            </div>
          </div>
        </div>
        <div
          class="row"
          style={{
            marginLeft: "16%",
            marginTop: "30px",
          }}
        >
          <div class="col-xs-12 col-md-12 col-lg-10 mmedittwelve">
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> First Name </div>
                <div
                  class="profile-info-value"
                  style={{ textTransform: "capitalize" }}
                >
                  {" "}
                  {clientData?.firstName}
                </div>
                <div class="profile-info-name"> Last Name </div>
                <div
                  class="profile-info-value"
                  // style="text-transform: capitalize;"
                >
                  {clientData?.lastName}
                </div>
              </div>
              <div class="profile-info-row">
                <div class="profile-info-name"> Occupation </div>
                <div class="profile-info-value"> {clientData?.occupation} </div>
                <div class="profile-info-name"> Income </div>
                <div class="profile-info-value">
                  {" "}
                  {clientData?.annualincome}{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-10">
            <div
              class="profile-user-info profile-user-info-striped"
              // style="border-top:none; "
            >
              <div class="profile-info-row">
                <div class="profile-info-name">Organization Name </div>
                <div class="profile-info-value full-width">
                  {clientData?.organization}{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-10">
            <div
              class="profile-user-info profile-user-info-striped"
              // style="border-top:none; border-bottom:none;"
            >
              <div class="profile-info-row">
                <div class="profile-info-name">Designation </div>
                <div class="profile-info-value full-width">
                  {clientData?.designation}{" "}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-10">
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> PAN </div>
                <div class="profile-info-value">
                  {" "}
                  {clientData?.documentation[0]?.pan}{" "}
                </div>
                <div class="profile-info-name"> GST No. </div>
                <div class="profile-info-value">
                  {" "}
                  {clientData?.documentation[0]?.gst_no}
                </div>
              </div>
              <div class="profile-info-row">
                <div class="profile-info-name"> Date of Birth </div>
                <div class="profile-info-value"> 11-03-1995 </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> Home Phone </div>
                <div class="profile-info-value"> </div>
              </div>
              <div class="profile-info-row">
                <div class="profile-info-name"> Primary Mobile No. </div>
                <div class="profile-info-value"> 8516894284 </div>
              </div>
              <div class="profile-info-row">
                <div class="profile-info-name"> Email </div>
                <div class="profile-info-value"> {clientData?.email}</div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name">Address </div>
                <div class="profile-info-value full-width">
                  {" "}
                  {clientData?.pemanentaddress}
                </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> Area </div>
                <div class="profile-info-value"> keshar bagh </div>
                <div class="profile-info-name"> State </div>
                <div class="profile-info-value"> MADHYA PRADESH </div>
              </div>
              <div class="profile-info-row">
                <div class="profile-info-name"> City </div>
                <div class="profile-info-value"> Indore </div>
                <div class="profile-info-name">PIN </div>
                <div class="profile-info-value"> 452009 </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped"></div>
            <div class="space-6"></div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name">Description </div>
                <div class="profile-info-value full-width"> </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="clear"></div>

            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> Adhar </div>
                <div class="profile-info-value full-width">
                  {" "}
                  {clientData?.documentation[0]?.aadhar}
                </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> FNM </div>
                <div class="profile-info-value full-width"> </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> UCC </div>
                <div class="profile-info-value full-width"> </div>
              </div>
            </div>
            <div class="space-6"></div>
            <div class="space-6"></div>

            <div class="space-6"></div>
            <div class="profile-user-info profile-user-info-striped">
              <div class="profile-info-row">
                <div class="profile-info-name"> BO ID </div>
                <div class="profile-info-value full-width"> </div>
              </div>
            </div>
            <div class="space-6"></div>
          </div>
        </div>

        <div class="space-12"></div>
        <div class="row" style={{ marginTop: "46px" }}>
          <div
            class="col-xs-12 col-md-12 col-lg-10 mmeditthirteen"
            id="followup-content"
            style={{ marginLeft: "17%" }}
          >
            {" "}
            <div>
              <div class="hr hr12 hr-dotted"></div>
              <form
                role="form"
                id="followupform"
                method="post"
                class="form-horizontal"
                novalidate="novalidate"
              >
                <div class="form-group">
                  <div class="col-xs-12 text-right pull-right pad0">
                    <div>
                      <input
                        type="hidden"
                        name="send_time[]"
                        value="10"
                        id="send_time[]"
                      />
                      <input
                        type="hidden"
                        name="send[]"
                        value="before"
                        id="send[]"
                      />
                      <input
                        type="hidden"
                        name="send_by[]"
                        value="sms"
                        id="send_by[]"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-md-12 col-lg-10 mmeditfourteen"
            style={{ marginLeft: "238px" }}
          >
            <div class="widget-box profile-user-info  widget-color-blue ui-sortable-handle">
              <div class="widget-body">
                <div class="widget-main no-padding" data-size="250">
                  <div id="note-content">
                    {" "}
                    <div id="editNote" class="modal" tabIndex="-1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                            >
                              ×
                            </button>
                            <h4 class="white bigger" id="modal-title">
                              Add Notes
                            </h4>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12">
                                <form
                                  id="noteForm"
                                  method="post"
                                  class="form-horizontal"
                                  novalidate="novalidate"
                                >
                                  <input
                                    type="hidden"
                                    name="user_id"
                                    value="115709"
                                  />
                                  <input
                                    type="hidden"
                                    name="notes_id"
                                    id="notes_id"
                                    value=""
                                  />
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Notes Title
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="title"
                                        class="form-control"
                                        maxLength="100"
                                        name="notes_title"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Notes <em class="orange">*</em>
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <textarea
                                        name="notes"
                                        id="notes"
                                        class="form-control"
                                        cols="40"
                                        maxLength="1000"
                                        rows="2"
                                        style={{ resize: "none" }}
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12"></label>
                                    <div class="col-md-9 col-xs-12">
                                      <button
                                        type="reset"
                                        id="reset"
                                        class="btn btn-sm"
                                        data-dismiss="modal"
                                      >
                                        Cancel
                                      </button>

                                      <button
                                        type="submit"
                                        id="submit"
                                        class="btn btn-sm btn-success"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="widget-box-overlay note-loader"
                style={{ display: "none" }}
              >
                <i class="ace-icon loading-icon fa fa-spinner fa-spin fa-2x white"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="space-12"></div>
        <div class="row">
          <div
            class="col-xs-12 col-md-12 col-lg-10 mmeditfifteen"
            style={{ marginLeft: "238px" }}
          >
            <div class="widget-box profile-user-info  widget-color-blue ui-sortable-handle">
              <div class="widget-header" style={{ display: "flex" }}>
                <h5 class="widget-title bigger lighter"> Family </h5>
                <div class="widget-toolbar" onClick={() => setFlag(true)}>
                  {/* <p>+ Add</p> */}
                  <button className="btn btn-success" type="submit">+ Add</button>
                </div>
              </div>
              {flag && (
                <Modal show={flag} onHide={() => setFlag(false)}>
                  <div>
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Family Members</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          id="close-document-modal"
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleFamilySubmit}>
                          <div className="row">
                            {familYForm.map((res) => (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="col-form-label">
                                    {res.label}{" "}
                                    <span className="text-danger"></span>
                                  </label>
                                  <input
                                    className="form-control"
                                    type={res.type}
                                    name={res.fieldname}
                                    value={familyData?.[res.fieldname] || ""}
                                    onChange={handleFamilyChange}
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="submit-section">
                              <button
                                className="btn btn-primary submit-btn"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
              <div class="widget-body">
                <div class="widget-main no-padding" data-size="250">
                  <div id="dependent-content">
                    <table
                      class="table table-striped table-bordered table-hover"
                      id="dependenttable"
                    >
                      <thead class="thin-border-bottom">
                        <tr>
                          <th class="td_name_rky"> Name </th>
                          <th class="td_contact_rky">Relationship</th>
                          <th class="td_contact_rky">Retirement Age</th>
                          <th class="td_contact_rky">Contact No.</th>
                          <th class="td_contact_rky">Income</th>
                          <th class="td_status_rky">Date of birth</th>
                          <th class="td_status_rky">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientData?.family?.map((data,index) => {
                          return (
                            <tr>
                              <td>{data?.Name}</td>
                              <td>{data?.Relation}</td>
                              <td>{data?.Retirement_age}</td>
                              <td>{data?.mobile}</td>
                              <td>{data?.Income}</td>
                              <td>{data?.Date_of_birth}</td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div
                                  onClick={() => handleDeleteFamilyById(index)}
                                >
                                  <i
                                    className="fa fa-trash"
                                    style={{ paddingLeft: "8px" }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div
                      class="scrollable ace-scroll"
                      data-size="250"
                      style={{ position: "relative" }}
                    >
                      <div class="scroll-track" style={{ display: "none" }}>
                        <div class="scroll-bar"></div>
                      </div>
                      <div class="scroll-content">
                        {clientData?.family?.length < 0 ? (
                          <table
                            class="table table-striped table-bordered table-hover"
                            id="dependenttable"
                          >
                            <thead></thead>
                            <tbody>
                              <tr>
                                <td colspan="6" class="center">
                                  No records found!
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div
                      id="editDependent"
                      class="modal"
                      tabIndex="-1"
                      aria-hidden="true"
                      // style="display: none;"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                            >
                              ×
                            </button>
                            <h4 class="white bigger" id="modal-title">
                              Add Contact
                            </h4>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-xs-12 col-sm-12">
                                <form
                                  id="dependentForm"
                                  method="post"
                                  class="form-horizontal"
                                  // style="display:;"
                                  novalidate="novalidate"
                                >
                                  <input
                                    type="hidden"
                                    name="user_id"
                                    value="115709"
                                  />
                                  <input
                                    type="hidden"
                                    name="dependent_id"
                                    id="dependent_id"
                                    value=""
                                  />
                                  <input
                                    type="hidden"
                                    name="c_client_id"
                                    id="c_client_id"
                                    value=""
                                  />
                                  <input
                                    type="hidden"
                                    name="uid"
                                    id="uid"
                                    value="0"
                                  />

                                  <input
                                    type="hidden"
                                    name="gender"
                                    id="gender"
                                    value=""
                                  />
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      User Type <em class="orange">* </em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <select
                                        name="user_type"
                                        id="user_type"
                                        class="form-control"
                                      >
                                        <option value="">New Contact</option>
                                        <option value="C">Client</option>
                                        <option value="P">Prospect</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="form-group selusr hide">
                                    <label class="col-sm-3 col-xs-12 ">
                                      Select User{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <div
                                        class="select2-container select2"
                                        id="s2id_select_user"
                                      >
                                        <a
                                          href="javascript:void(0)"
                                          class="select2-choice"
                                          tabIndex="-1"
                                        >
                                          {" "}
                                          <span
                                            class="select2-chosen"
                                            id="select2-chosen-1"
                                          ></span>
                                          <abbr class="select2-search-choice-close"></abbr>{" "}
                                          <span
                                            class="select2-arrow"
                                            role="presentation"
                                          >
                                            <b role="presentation"></b>
                                          </span>
                                        </a>
                                        <label
                                          for="s2id_autogen1"
                                          class="select2-offscreen"
                                        ></label>
                                        <input
                                          class="select2-focusser select2-offscreen"
                                          type="text"
                                          aria-haspopup="true"
                                          role="button"
                                          aria-labelledby="select2-chosen-1"
                                          id="s2id_autogen1"
                                        />
                                        <div class="select2-drop select2-display-none select2-with-searchbox">
                                          {" "}
                                          <div class="select2-search">
                                            {" "}
                                            <label
                                              for="s2id_autogen1_search"
                                              class="select2-offscreen"
                                            ></label>
                                            <input
                                              type="text"
                                              autoComplete="off"
                                              autoCorrect="off"
                                              autoCapitalize="off"
                                              spellCheck="false"
                                              class="select2-input"
                                              role="combobox"
                                              aria-expanded="true"
                                              aria-autocomplete="list"
                                              aria-owns="select2-results-1"
                                              id="s2id_autogen1_search"
                                              placeholder=""
                                            />{" "}
                                          </div>{" "}
                                          <ul
                                            class="select2-results"
                                            role="listbox"
                                            id="select2-results-1"
                                          >
                                            {" "}
                                          </ul>
                                        </div>
                                      </div>
                                      <select
                                        name="select_user"
                                        id="select_user"
                                        class="select2"
                                        tabIndex="-1"
                                        title=""
                                        style={{ display: "none" }}
                                      ></select>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Name <em class="orange">*</em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="name"
                                        maxLength="50"
                                        class="form-control txtcaptalize"
                                        name="name"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group gender_row">
                                    <label class="col-md-3 col-xs-12">
                                      Relationship <em class="orange">*</em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <select
                                        class="form-control relation-select"
                                        id="rel"
                                        name="rel"
                                      >
                                        <option value="">
                                          {" "}
                                          --- Select Relation ---{" "}
                                        </option>
                                        <option class="gend" value="brother">
                                          Brother
                                        </option>
                                        <option class="gend" value="daughter">
                                          Daughter
                                        </option>
                                        <option
                                          class="gend"
                                          value="daughter_in_law"
                                        >
                                          Daughter-In-Law
                                        </option>
                                        <option class="gend" value="father">
                                          Father
                                        </option>
                                        <option
                                          class="gend"
                                          value="grand_daughter"
                                        >
                                          Grand Daughter
                                        </option>
                                        <option class="gend" value="grand_son">
                                          Grand Son
                                        </option>
                                        <option class="gend" value="guardian">
                                          Guardian
                                        </option>
                                        <option class="gend" value="mother">
                                          Mother
                                        </option>
                                        <option class="gend" value="sister">
                                          Sister
                                        </option>
                                        <option class="gend" value="son">
                                          Son
                                        </option>
                                        <option class="gend" value="son_in_law">
                                          Son-In-Law
                                        </option>
                                        <option class="gend" value="spouse">
                                          Spouse
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Date of Birth
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <div class="input-group">
                                        <input
                                          type="text"
                                          id="dob"
                                          readOnly="readonly"
                                          class="form-control dobdate-picker"
                                          name="dob"
                                        />
                                        <span class="input-group-addon ">
                                          {" "}
                                          <i class="fa fa-calendar bigger-110"></i>{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="form-group gender_row">
                                    <label class="col-md-3 col-xs-12">
                                      Dependent <em class="orange">*</em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <select
                                        class="form-control relation-select"
                                        id="dependent"
                                        name="dependent"
                                        // style="min-width: 50px !important;"
                                        required=""
                                        aria-required="true"
                                      >
                                        <option value=""> </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="form-group gender_row">
                                    <label class="col-md-3 col-xs-12">
                                      Earning <em class="orange">*</em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <select
                                        class="form-control relation-select"
                                        id="earning"
                                        name="earning"
                                        // style="min-width: 50px !important;"
                                        required=""
                                        aria-required="true"
                                      >
                                        <option value=""></option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="form-group gender_row">
                                    <label class="col-md-3 col-xs-12">
                                      Occupation <em class="orange">*</em>{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <select
                                        class="occupation relation-select"
                                        id="occupation"
                                        name="occupation"
                                        // style="min-width: 100% !important;"
                                        required=""
                                        aria-required="true"
                                      >
                                        <option value="">
                                          {" "}
                                          --- Select Occupation ---
                                        </option>
                                        <option value="salaried">
                                          Salaried
                                        </option>
                                        <option value="self_employed">
                                          Self Employed
                                        </option>
                                        <option value="retired">Retired</option>
                                        <option value="house_wife">
                                          House Wife
                                        </option>
                                        <option value="student">Student</option>
                                        <option value="unemployed">
                                          UnEmployed
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Annual Income
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="annual_income"
                                        name="annual_income"
                                        class="form-control"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Retire Age
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="ret_age"
                                        name="ret_age"
                                        class="form-control"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Mobile No.
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="mobile"
                                        maxLength="13"
                                        class="form-control"
                                        name="mobile"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      Email Address{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="email"
                                        id="email"
                                        class="form-control"
                                        name="email"
                                      />
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12">
                                      PAN Number{" "}
                                    </label>
                                    <div class="col-md-9 col-xs-12">
                                      <input
                                        type="text"
                                        id="pan"
                                        maxLength="10"
                                        class="form-control"
                                        name="pan"
                                      />
                                    </div>
                                  </div>

                                  <div class="form-group">
                                    <label class="col-md-3 col-xs-12"></label>
                                    <div class="col-md-9 col-xs-12">
                                      <button
                                        type="reset"
                                        id="reset"
                                        class="btn btn-sm"
                                        data-dismiss="modal"
                                      >
                                        {" "}
                                        Cancel{" "}
                                      </button>
                                      <button
                                        type="submit"
                                        id="submit"
                                        class="btn btn-sm btn-success"
                                      >
                                        {" "}
                                        Save{" "}
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="widget-box-overlay dependent-loader"
                  style={{ display: "none" }}
                >
                  <i class="ace-icon loading-icon fa fa-spinner fa-spin fa-2x white"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="space-12"></div>
          <div class="row">
            <div
              class="col-xs-12 col-md-12 col-lg-10 mmeditsixteen"
              style={{ marginLeft: "238px" }}
            >
              <div class="widget-box profile-user-info  widget-color-blue ui-sortable-handle">
                <div class="widget-body">
                  <div class="widget-main no-padding" data-size="250">
                    <div id="reminder-content">
                      <div
                        class="scrollable ace-scroll"
                        data-size="250"
                        style={{ position: "relative" }}
                      >
                        <div class="scroll-track" style={{ display: "none" }}>
                          <div class="scroll-bar"></div>
                        </div>
                        <div class="scroll-content">
                          <div id="add_event" class="modal" tabIndex="-1">
                            <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                  >
                                    ×
                                  </button>
                                  <h4 class="white bigger">
                                    Add Event/Reminder
                                  </h4>
                                </div>
                                <div class="modal-body">
                                  <div class="row">
                                    <div
                                      class="col-xs-12 col-sm-12 scrollable ace-scroll"
                                      data-size="300"
                                    >
                                      <div
                                        class="scroll-track"
                                        style={{ display: "none" }}
                                      >
                                        <div class="scroll-bar"></div>
                                      </div>
                                      <div
                                        class="scroll-content"
                                        style={{ maxHeight: "300px" }}
                                      >
                                        <form
                                          class="form-horizontal"
                                          name="add_reminder"
                                        >
                                          <input
                                            type="hidden"
                                            name="id"
                                            value=""
                                            id="event_id"
                                          />
                                          <input
                                            type="hidden"
                                            name="client_id"
                                            value="115709"
                                          />
                                          {/* </form> */}
                                          <div class="">
                                            <div class="form-group">
                                              <div class="col-sm-3">
                                                <div class="input-group">
                                                  <input
                                                    class="form-control date-picker"
                                                    value="03-01-2022"
                                                    name="start_date"
                                                    id="start_date"
                                                    style={{ minWidth: "89px" }}
                                                  />
                                                  <span class="input-group-addon ">
                                                    {" "}
                                                    <i class="fa fa-calendar bigger-110"></i>{" "}
                                                  </span>
                                                </div>
                                              </div>
                                              <div
                                                class="col-sm-3 allday"
                                                style={{ width: "114px" }}
                                              >
                                                <select
                                                  name="start_time"
                                                  id="start_time"
                                                ></select>
                                              </div>
                                              <div style={{ float: "left" }}>
                                                to
                                              </div>
                                              <div class="col-sm-3">
                                                <div class="input-group">
                                                  <input
                                                    class="form-control end-picker"
                                                    id="end_date"
                                                    value="03-01-2022"
                                                    name="end_date"
                                                    style={{ minWidth: "89px" }}
                                                  />
                                                  <span class="input-group-addon ">
                                                    {" "}
                                                    <i class="fa fa-calendar bigger-110"></i>{" "}
                                                  </span>
                                                </div>
                                              </div>
                                              <div class="col-sm-2 allday">
                                                <select
                                                  name="end_time"
                                                  id="end_time"
                                                >
                                                  <option value="12:00 am">
                                                    12:00 am
                                                  </option>
                                                  <option value="12:30 am">
                                                    12:30 am
                                                  </option>
                                                  <option value="01:00 am">
                                                    01:00 am
                                                  </option>
                                                  <option value="01:30 am">
                                                    01:30 am
                                                  </option>
                                                  <option value="02:00 am">
                                                    02:00 am
                                                  </option>
                                                  <option value="02:30 am">
                                                    02:30 am
                                                  </option>
                                                  <option value="03:00 am">
                                                    03:00 am
                                                  </option>
                                                  <option value="03:30 am">
                                                    03:30 am
                                                  </option>
                                                  <option value="04:00 am">
                                                    04:00 am
                                                  </option>
                                                  <option value="04:30 am">
                                                    04:30 am
                                                  </option>
                                                  <option value="05:00 am">
                                                    05:00 am
                                                  </option>
                                                  <option value="05:30 am">
                                                    05:30 am
                                                  </option>
                                                  <option value="06:00 am">
                                                    06:00 am
                                                  </option>
                                                  <option value="06:30 am">
                                                    06:30 am
                                                  </option>
                                                  <option value="07:00 am">
                                                    07:00 am
                                                  </option>
                                                  <option value="07:30 am">
                                                    07:30 am
                                                  </option>
                                                  <option value="08:00 am">
                                                    08:00 am
                                                  </option>
                                                  <option value="08:30 am">
                                                    08:30 am
                                                  </option>
                                                  <option value="09:00 am">
                                                    09:00 am
                                                  </option>
                                                  <option value="09:30 am">
                                                    09:30 am
                                                  </option>
                                                  <option value="10:00 am">
                                                    10:00 am
                                                  </option>
                                                  <option value="10:30 am">
                                                    10:30 am
                                                  </option>
                                                  <option value="11:00 am">
                                                    11:00 am
                                                  </option>
                                                  <option value="11:30 am">
                                                    11:30 am
                                                  </option>
                                                  <option value="12:00 pm">
                                                    12:00 pm
                                                  </option>
                                                  <option value="12:30 pm">
                                                    12:30 pm
                                                  </option>
                                                  <option value="01:00 pm">
                                                    01:00 pm
                                                  </option>
                                                  <option value="01:30 pm">
                                                    01:30 pm
                                                  </option>
                                                  <option value="02:00 pm">
                                                    02:00 pm
                                                  </option>
                                                  <option value="02:30 pm">
                                                    02:30 pm
                                                  </option>
                                                  <option value="03:00 pm">
                                                    03:00 pm
                                                  </option>
                                                  <option value="03:30 pm">
                                                    03:30 pm
                                                  </option>
                                                  <option value="04:00 pm">
                                                    04:00 pm
                                                  </option>
                                                  <option value="04:30 pm">
                                                    04:30 pm
                                                  </option>
                                                  <option value="05:00 pm">
                                                    05:00 pm
                                                  </option>
                                                  <option value="05:30 pm">
                                                    05:30 pm
                                                  </option>
                                                  <option value="06:00 pm">
                                                    06:00 pm
                                                  </option>
                                                  <option value="06:30 pm">
                                                    06:30 pm
                                                  </option>
                                                  <option value="07:00 pm">
                                                    07:00 pm
                                                  </option>
                                                  <option value="07:30 pm">
                                                    07:30 pm
                                                  </option>
                                                  <option value="08:00 pm">
                                                    08:00 pm
                                                  </option>
                                                  <option value="08:30 pm">
                                                    08:30 pm
                                                  </option>
                                                  <option value="09:00 pm">
                                                    09:00 pm
                                                  </option>
                                                  <option value="09:30 pm">
                                                    09:30 pm
                                                  </option>
                                                  <option value="10:00 pm">
                                                    10:00 pm
                                                  </option>
                                                  <option value="10:30 pm">
                                                    10:30 pm
                                                  </option>
                                                  <option value="11:00 pm">
                                                    11:00 pm
                                                  </option>
                                                  <option value="11:30 pm">
                                                    11:30 pm
                                                  </option>
                                                </select>
                                              </div>
                                            </div>
                                            <div class="form-group">
                                              <div class="col-xs-4">
                                                <input
                                                  id="allday"
                                                  name="allday"
                                                  type="checkbox"
                                                  value="1"
                                                />{" "}
                                                <label for="allday">
                                                  All Day{" "}
                                                </label>
                                                &nbsp;&nbsp;
                                                <input
                                                  id="repeat"
                                                  name="repeat"
                                                  type="checkbox"
                                                  value="1"
                                                />{" "}
                                                <label for="repeat">
                                                  Repeat
                                                </label>
                                              </div>
                                            </div>
                                            <div class="col-xs-12 repeat_div">
                                              <div class="form-group">
                                                <label>Repeats</label>
                                                <select
                                                  name="repeats"
                                                  class="repeats"
                                                  id="repeats"
                                                >
                                                  <option value="0">
                                                    Daily
                                                  </option>
                                                  <option value="1">
                                                    Weekly
                                                  </option>
                                                  <option value="2">
                                                    Monthly
                                                  </option>
                                                  <option value="3">
                                                    Yearly
                                                  </option>
                                                </select>
                                              </div>
                                              <div id="repeats-0">
                                                <div class="form-group">
                                                  <input
                                                    type="radio"
                                                    name="daily"
                                                    value="0"
                                                    id="daily-0"
                                                    checked="checked"
                                                  />{" "}
                                                  <label for="daily-0">
                                                    {" "}
                                                    Every
                                                    <input
                                                      style={{ width: "40px" }}
                                                      type="text"
                                                      value="1"
                                                      name="every_day"
                                                      id="every_day"
                                                      class="daily-0"
                                                    />
                                                    day(s)
                                                  </label>
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                </div>
                                                <div class="form-group">
                                                  <input
                                                    type="radio"
                                                    name="daily"
                                                    value="1"
                                                    id="daily-1"
                                                  />{" "}
                                                  <label for="daily-1">
                                                    {" "}
                                                    Every weekday
                                                  </label>
                                                </div>
                                              </div>
                                              <div
                                                id="repeats-1"
                                                style={{ display: "none" }}
                                              >
                                                <div class="form-group">
                                                  Recur{" "}
                                                  <select
                                                    name="weekly"
                                                    id="weekly"
                                                    class=""
                                                  >
                                                    <option value="*">
                                                      every
                                                    </option>
                                                    <option value="1">
                                                      first
                                                    </option>
                                                    <option value="2">
                                                      second
                                                    </option>
                                                    <option value="3">
                                                      third
                                                    </option>
                                                    <option value="4">
                                                      fourth
                                                    </option>
                                                    <option value="5">
                                                      last
                                                    </option>
                                                  </select>
                                                  <input
                                                    style={{ width: "40px" }}
                                                    type="text"
                                                    value="1"
                                                    name="weekly"
                                                    id="weekly"
                                                  />
                                                </div>
                                                <div class="form-group">
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="0"
                                                    id="week_day-0"
                                                  />{" "}
                                                  <label for="week_day-0">
                                                    Sun{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="1"
                                                    id="week_day-1"
                                                  />{" "}
                                                  <label for="week_day-1">
                                                    Mon{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="2"
                                                    id="week_day-2"
                                                  />{" "}
                                                  <label for="week_day-2">
                                                    Tue{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="3"
                                                    id="week_day-3"
                                                  />{" "}
                                                  <label for="week_day-3">
                                                    Wed{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="4"
                                                    id="week_day-4"
                                                  />{" "}
                                                  <label for="week_day-4">
                                                    Thu{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="5"
                                                    id="week_day-5"
                                                  />{" "}
                                                  <label for="week_day-5">
                                                    Fri{" "}
                                                  </label>
                                                  &nbsp;
                                                  <input
                                                    type="checkbox"
                                                    name="week_day[]"
                                                    value="6"
                                                    id="week_day-6"
                                                  />{" "}
                                                  <label for="week_day-6">
                                                    Sat{" "}
                                                  </label>
                                                  &nbsp;
                                                </div>
                                              </div>
                                              <div
                                                id="repeats-2"
                                                style={{ display: "none" }}
                                              >
                                                <div class="form-group">
                                                  <input
                                                    type="hidden"
                                                    name="monthly"
                                                    value="0"
                                                    id="monthly-0"
                                                  />
                                                  <label for="monthly-0">
                                                    {" "}
                                                    Day
                                                    <input
                                                      style={{ width: "40px" }}
                                                      type="text"
                                                      value="1"
                                                      name="month[day]"
                                                      id="day"
                                                      class="monthly-0"
                                                    />
                                                    of
                                                    <input
                                                      type="hidden"
                                                      name="month[month]"
                                                      id="month"
                                                      class="monthly-0"
                                                      value="*"
                                                    />{" "}
                                                    every month
                                                  </label>
                                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                                </div>
                                              </div>
                                              <div
                                                id="repeats-3"
                                                style={{ display: "none" }}
                                              >
                                                <div class="form-group">
                                                  <input
                                                    type="radio"
                                                    name="yearly"
                                                    value="0"
                                                    id="yearly-0"
                                                    checked="checked"
                                                  />
                                                  <label for="yearly-0">
                                                    Every
                                                    <select
                                                      name="year[month]"
                                                      id="yearly_month"
                                                      class="yearly-0"
                                                    >
                                                      <option value="1">
                                                        Jan
                                                      </option>
                                                      <option value="2">
                                                        Feb
                                                      </option>
                                                      <option value="3">
                                                        Mar
                                                      </option>
                                                      <option value="4">
                                                        Apr
                                                      </option>
                                                      <option value="5">
                                                        May
                                                      </option>
                                                      <option value="6">
                                                        Jun
                                                      </option>
                                                      <option value="7">
                                                        Jul
                                                      </option>
                                                      <option value="8">
                                                        Aug
                                                      </option>
                                                      <option value="9">
                                                        Sep
                                                      </option>
                                                      <option value="10">
                                                        Oct
                                                      </option>
                                                      <option value="11">
                                                        Nov
                                                      </option>
                                                      <option value="12">
                                                        Dec
                                                      </option>
                                                    </select>
                                                    <input
                                                      style={{ width: "40px" }}
                                                      type="text"
                                                      value="1"
                                                      class="yearly-0"
                                                      name="year[day]"
                                                      id="yearly_day"
                                                    />
                                                  </label>
                                                </div>
                                                <div class="form-group">
                                                  <input
                                                    type="radio"
                                                    name="yearly"
                                                    value="1"
                                                    id="yearly-1"
                                                  />
                                                  <label for="yearly-1">
                                                    The
                                                    <select
                                                      name="year[weeks]"
                                                      id="yearly_weeks"
                                                      class="yearly-1"
                                                    >
                                                      <option value="1">
                                                        first
                                                      </option>
                                                      <option value="2">
                                                        second
                                                      </option>
                                                      <option value="3">
                                                        third
                                                      </option>
                                                      <option value="4">
                                                        fourth
                                                      </option>
                                                      <option value="5">
                                                        last
                                                      </option>
                                                    </select>
                                                    <select
                                                      name="year[days]"
                                                      id="yearly_days"
                                                      class="yearly-1"
                                                    >
                                                      <option value="0">
                                                        Sunday
                                                      </option>
                                                      <option value="1">
                                                        Monday
                                                      </option>
                                                      <option value="2">
                                                        Tuesday
                                                      </option>
                                                      <option value="3">
                                                        Wednesday
                                                      </option>
                                                      <option value="4">
                                                        Thursday
                                                      </option>
                                                      <option value="5">
                                                        Friday
                                                      </option>
                                                      <option value="6">
                                                        Saturday
                                                      </option>
                                                    </select>{" "}
                                                    of
                                                    <select
                                                      name="year[months]"
                                                      id="yearly_months"
                                                      class="yearly-1"
                                                    >
                                                      <option value="1">
                                                        Jan
                                                      </option>
                                                      <option value="2">
                                                        Feb
                                                      </option>
                                                      <option value="3">
                                                        Mar
                                                      </option>
                                                      <option value="4">
                                                        Apr
                                                      </option>
                                                      <option value="5">
                                                        May
                                                      </option>
                                                      <option value="6">
                                                        Jun
                                                      </option>
                                                      <option value="7">
                                                        Jul
                                                      </option>
                                                      <option value="8">
                                                        Aug
                                                      </option>
                                                      <option value="9">
                                                        Sep
                                                      </option>
                                                      <option value="10">
                                                        Oct
                                                      </option>
                                                      <option value="11">
                                                        Nov
                                                      </option>
                                                      <option value="12">
                                                        Dec
                                                      </option>
                                                    </select>
                                                  </label>
                                                </div>
                                              </div>
                                              <div class="hr hr4 hr-dotted"></div>
                                              <label>Ends</label>
                                              <div class="form-group">
                                                <div class="col-xs-3">
                                                  <input
                                                    type="radio"
                                                    name="repeat_end"
                                                    id="repeat_end-1"
                                                    value="1 "
                                                  />
                                                  <label for="repeat_end-1">
                                                    &nbsp; No end date{" "}
                                                  </label>
                                                </div>

                                                <div class="pull-left">
                                                  <input
                                                    type="radio"
                                                    name="repeat_end"
                                                    value="0"
                                                    id="repeat_end-0"
                                                    checked="checked"
                                                  />
                                                  &nbsp;{" "}
                                                </div>
                                                <div class="col-xs-6">
                                                  <div class="input-group until">
                                                    <span class="input-group-addon ">
                                                      {" "}
                                                      Until{" "}
                                                    </span>
                                                    <input
                                                      class="form-control col-xs-12 until-picker"
                                                      id="repeat_end"
                                                      name="until"
                                                      value="03-01-2023"
                                                    />
                                                    <span class="input-group-addon ">
                                                      {" "}
                                                      <i class="fa fa-calendar bigger-110"></i>{" "}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="multi-field-wrapper">
                                              <div class="multi-fields col-xs-12"></div>
                                              <span class="add_reminder">
                                                Add Reminder
                                                <button
                                                  type="button"
                                                  title=""
                                                  data-rel="tooltip"
                                                  class="btn btn-success btn-minier add-field"
                                                >
                                                  <i class="fa fa-plus"></i>
                                                </button>
                                              </span>
                                            </div>
                                          </div>
                                          <div class="space-2"></div>
                                          <div class="hr hr4 hr-dotted"></div>
                                          <div class="form-group">
                                            <div class="col-sm-12 text-right">
                                              <button
                                                id="reset"
                                                class="btn btn-sm"
                                                data-dismiss="modal"
                                              >
                                                <i class="ace-icon fa fa-times"></i>{" "}
                                                Cancel{" "}
                                              </button>
                                              <button
                                                type="submit"
                                                class="btn btn-sm btn-success"
                                              >
                                                <i class="ace-icon fa fa-check"></i>{" "}
                                                Save{" "}
                                              </button>

                                              <input
                                                type="reset"
                                                value="reset"
                                                id="reset"
                                                style={{ display: "none" }}
                                              />
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="widget-box-overlay reminderw-loader"
                  style={{ display: "none" }}
                >
                  <i class="ace-icon loading-icon fa fa-spinner fa-spin fa-2x white"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="space-12"></div>
          <div class="row hidden">
            <div class="col-xs-12 col-md-12 col-lg-10">
              <div class="widget-box profile-user-info widget-color-blue ui-sortable-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientSingleData;
