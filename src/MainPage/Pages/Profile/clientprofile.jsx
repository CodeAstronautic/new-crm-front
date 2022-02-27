import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Avatar_19 } from "../../../Entryfile/imagepath";
import { useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import Select from "react-select";
import "react-image-lightbox/style.css";
import axios from "axios";
import AFPR from "../../Employees/afpr";
import { API_URL } from "../../../Constants";
const LOCAL_PORT = "http://localhost:5999";

const personalInfo = [
  {
    fieldname: "firstName",
    required: true,
    label: "FirstName",
    type: "text",
  },
  {
    fieldname: "lastName",
    required: true,
    label: "LastName",
    type: "text",
  },
  {
    fieldname: "occupation",
    required: true,
    label: "Occupation",
    type: "text",
  },
  {
    fieldname: "designation",
    required: true,
    label: "Designation",
    type: "text",
  },
  {
    fieldname: "organization",
    required: true,
    label: "Organization",
    type: "text",
  },
  {
    fieldname: "annualincome",
    required: true,
    label: "Annual Income",
    type: "number",
  },
  {
    fieldname: "dob",
    required: true,
    label: "D.O.B.",
    type: "date",
  },
  {
    fieldname: "placeofbirth",
    required: true,
    label: "Place of Birth",
    type: "text",
  },
  {
    fieldname: "address",
    required: true,
    label: "Address",
    type: "text",
  },
];

const documentationInfo = [
  {
    fieldname: "gst_no",
    label: "GST No",
    required: true,
    type: "text",
  },
  {
    fieldname: "adhaarNumber",
    label: "Adhaar Number",
    required: true,
    type: "numer",
  },
  {
    fieldname: "panNumber",
    label: "PAN Number",
    required: true,
    type: "text",
  },
  {
    fieldname: "bank",
    label: "Bank",
    required: true,
    type: "text",
  },
  {
    fieldname: "accountNo",
    label: "Account Number",
    required: true,
    type: "number",
  },
  {
    fieldname: "ifsc",
    label: "IFSC",
    required: true,
    type: "text",
  },
  {
    fieldname: "micr",
    label: "MICR",
    required: true,
    type: "text",
  },
  {
    fieldname: "branch",
    label: "Branch",
    required: true,
    type: "text",
  },
  {
    fieldname: "address",
    label: "Address",
    required: true,
    type: "text",
  },
];

const lifeInsuranceForm = [
  {
    fieldname: "policy_holder",
    label: "Policy Holder",
    required: true,
    type: "text",
  },
  {
    fieldname: "insuered",
    label: "Insured Name",
    required: true,
    type: "text",
  },
  {
    label: "Company Name",
    fieldname: "company_name",
    required: true,
    type: "text",
  },
  {
    label: "Policy Number",
    fieldname: "policy_number",
    required: true,
    type: "text",
  },
  {
    label: "Product Name",
    fieldname: "product_name",
    required: true,
    type: "text",
  },
  {
    label: "Sum Assred",
    fieldname: "sum_assred",
    required: true,
    type: "text",
  },
  {
    fieldname: "premium",
    label: "Premium",
    required: true,
    type: "number",
  },
  {
    label: "Mode",
    fieldname: "mode",
    required: true,
  },
  {
    label: "Tenure",
    fieldname: "tenure",
    required: true,
    type: "select",
  },
  {
    label: "Pay Term",
    fieldname: "pay_term",
    required: true,
    type: "text",
  },
  {
    label: "Document",
    fieldname: "document",
    required: true,
    type: "text",
  },
  {
    label: "Maturity Date",
    fieldname: "maturity_date",
    required: true,
    type: "date",
  },
  {
    label: "Advisor",
    fieldname: "advisor",
    required: true,
    type: "text",
  },
  {
    label: "Remarks",
    fieldname: "remarks",
    required: true,
    type: "text",
  },
];

const bankInfo = [
  {
    fieldname: "GST",
    label: "gst_no",
    type: "text",
  },
  {
    fieldname: "PAN",
    label: "pan",
    type: "text",
  },
  {
    fieldname: "Adhar No",
    label: "adharno",
    type: "number",
  },
  {
    fieldname: "Bank",
    label: "bank",
    type: "text",
  },
  {
    fieldname: "Account Number",
    label: "accountNumber",
    type: "number",
  },
  {
    fieldname: "IFSC",
    label: "ifsc",
    type: "text",
  },
  {
    fieldname: "MICR",
    label: "micr",
    type: "text",
  },
  {
    fieldname: "Address",
    label: "address",
    type: "text",
  },
];

const healthInsuranceForm = [
  {
    fieldname: "policy_holder_name",
    label: "Policy Holder Name",
    type: "text",
  },
  {
    fieldname: "insured_name",
    label: "Insured Name",
    type: "text",
  },
  {
    fieldname: "company",
    label: "Company",
    type: "text",
  },
  {
    fieldname: "policy_name",
    label: "Policy Name",
    type: "text",
  },
  {
    fieldname: "policy_number",
    label: "Policy Number",
    type: "text",
  },
  {
    fieldname: "policy_type",
    label: "Policy Type",
    type: "text",
  },
  {
    fieldname: "sa",
    label: "SA",
    type: "text",
  },
  {
    fieldname: "premium",
    label: "Premium",
    type: "number",
  },
  {
    fieldname: "premium_due_date",
    label: "Premium Due Date",
    type: "date",
  },
  {
    fieldname: "advisor",
    label: "Advisor",
    type: "text",
  },
  {
    fieldname: "remarks",
    label: "Remarks",
    type: "text",
  },
];

const motorInsuranceForm = [
  {
    fieldname: "policy_holder_name",
    label: "Policy Holder Name",
    type: "text",
  },
  {
    fieldname: "vehicle_number",
    label: "Vehicle Number",
    type: "text",
  },
  {
    fieldname: "vehicle",
    label: "Vehicle",
    type: "text",
  },
  {
    fieldname: "company",
    label: "Company",
    type: "text",
  },
  {
    fieldname: "policy_number",
    label: "Policy Number",
    type: "text",
  },
  {
    fieldname: "policy_type",
    label: "Policy Type",
    type: "text",
  },
  {
    fieldname: "premium",
    label: "Premium",
    type: "number",
  },
  {
    fieldname: "premium_due_date",
    label: "Premium Due Date",
    type: "date",
  },
  {
    fieldname: "advisor",
    label: "Advisor",
    type: "text",
  },
  {
    fieldname: "remarks",
    label: "Remarks",
    type: "text",
  },
];
const dematForm = [
  {
    fieldname: "ac1",
    label: "A/C 1:",
    type: "text",
  },
  {
    fieldname: "ac2",
    label: "A/C 2:",
    type: "text",
  },
  {
    fieldname: "ucc",
    label: "UCC",
    type: "text",
  },
  {
    fieldname: "dp",
    label: "DP Name",
    type: "text",
  },
  {
    fieldname: "bo_id",
    label: "BO Id",
    type: "text",
  },
];
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
  }
];
const ClientProfile = (props) => {
  let single_id = props?.history?.location?.state?._id;
  const [clientSingle, setClientSingle] = useState();
  const [documentsValue, setDocutmentsValue] = useState(null);
  const [lifeValue, setLifeValue] = useState(null);
  const [healthValue, setHealthValue] = useState(null);
  const [moterValue, setmoterValue] = useState(null);
  const [dmtValue, setdmtValue] = useState(null);
  const [imageAsFile, setImageAsFile] = useState(null);
  const [familyData, setFamilyData] = useState(null);
  const [imageAsUrl2, setImageAsUrl2] = useState("");
  const [trueImage, setTrueImage] = useState(false);
  const [selectImg, setSelectImg] = useState(null);
  const [personalFrom, setPersonalForm] = useState(null);

  const download = (e) => {
    let name = e.split("/")[e.split("/").length - 1];
    fetch(e, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", name);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClick();
  }, []);

  // const saveFile = () => {
  //   saveAs(clientSingle?.attachments?.cheque, "example.pdf");
  // };

  const getClick = () => {
    axios
      .get(`${API_URL}/client/${single_id}`)
      .then((data) => {
        setClientSingle(data?.data);
        setPersonalForm({
          firstName: data?.data.firstName || "",
          lastName: data?.data.lastName || "",
          organization: data?.data.organization || "",
          occupation: data?.data.occupation || "",
          phone: data?.data.phone || "",
          email: data?.data.email || "",
          designation: data?.data?.designation || "",
          address: data?.data?.address || "",
          palceOfBirth: data?.data?.palceOfBirth || "",
          dob: data?.data?.dob || "",
        });
        setFamilyData({
          Relation: data?.data.Relation || "",
          Name: data?.data.Name || "",
          Date_of_birth: data?.data?.Date_of_birth || "",
          mobile: data?.data?.mobile || "",
          Income: data?.data?.Income || "",
          Retirement_age: data?.data.Retirement_age || "",
          Action: data?.data.Action || "",
        });
        setdmtValue({
          ac1: data?.data?.ac1 || "",
          ac2: data?.data?.ac2 || "",
          ucc: data?.data?.ucc || "",
          dp: data?.data?.dp || "",
          bo_id: data?.data?.bo_id || "",
        });
        setDocutmentsValue({
          gst_no: data?.data?.documentation?.[0]?.gst_no || "",
          adhaarNumber: data?.data?.documentation?.[0]?.adhaarNumber || "",
          panNumber: data?.data?.documentation?.[0]?.panNumber || "",
          bank: data?.data?.documentation?.[0]?.bank || "",
          accountNo: data?.data?.documentation?.[0]?.accountNo || "",
          ifsc: data?.data?.documentation?.[0]?.ifsc || "",
          micr: data?.data?.documentation?.[0]?.micr || "",
          branch: data?.data?.documentation?.[0]?.branch || "",
          address: data?.data?.documentation?.[0]?.address || "",
        });

        setLifeValue({
          policy_holder: data?.data?.lifeInsurance?.[0]?.policy_holder || "",
          insured_name: data?.data?.lifeInsurance?.[0]?.insured_name || "",
          company_name: data?.data?.lifeInsurance?.[0]?.company_name || "",
          policy_number: data?.data?.lifeInsurance?.[0]?.policy_number || "",
          product_name: data?.data?.lifeInsurance?.[0]?.product_name || "",
          sum_assred: data?.data?.lifeInsurance?.[0]?.sum_assred || "",
          premium: data?.data?.lifeInsurance?.[0]?.premium || "",
          mode: data?.data?.lifeInsurance?.[0]?.mode || "",
          tenure: data?.data?.lifeInsurance?.[0]?.tenure || "",
          pay_term: data?.data?.lifeInsurance?.[0]?.pay_term || "",
          document: data?.data?.lifeInsurance?.[0]?.document || "",
          maturity_date: data?.data?.lifeInsurance?.[0]?.maturity_date || "",
          advisor: data?.data?.lifeInsurance?.[0]?.advisor || "",
          remarks: data?.data?.lifeInsurance?.[0]?.remarks || "",
        });

        setHealthValue({
          policy_holder_name:
            data?.data?.healthInsurance?.[0]?.policy_holder_name || "",
          insured_name: data?.data?.healthInsurance?.[0]?.insured_name || "",
          company: data?.data?.healthInsurance?.[0]?.company || "",
          policy_name: data?.data?.healthInsurance?.[0]?.policy_name || "",
          policy_type: data?.data?.healthInsurance?.[0]?.policy_type || "",
          sa: data?.data?.healthInsurance?.[0]?.sa || "",
          premium: data?.data?.healthInsurance?.[0]?.premium || "",
          premium_due_date:
            data?.data?.healthInsurance?.[0]?.premium_due_date || "",
          tenure: data?.data?.healthInsurance?.[0]?.tenure || "",
          advisor: data?.data?.healthInsurance?.[0]?.advisor || "",
          remarks: data?.data?.healthInsurance?.[0]?.remarks || "",
        });
        setmoterValue({
          policy_holder_name:
            data?.data?.motorInsurance?.[0]?.policy_holder_name || "",
          vehicle_number: data?.data?.motorInsurance?.[0]?.vehicle_number || "",
          vehicle: data?.data?.motorInsurance?.[0]?.vehicle || "",
          company: data?.data?.motorInsurance?.[0]?.company || "",
          policy_number: data?.data?.motorInsurance?.[0]?.policy_number || "",
          policy_type: data?.data?.motorInsurance?.[0]?.policy_type || "",
          premium: data?.data?.motorInsurance?.[0]?.premium || "",
          premium_due_date:
            data?.data?.motorInsurance?.[0]?.premium_due_date || "",
          advisor: data?.data?.motorInsurance?.[0]?.advisor || "",
          remarks: data?.data?.motorInsurance?.[0]?.remarks || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    setDocutmentsValue({
      ...documentsValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleDmtChange = (event) => {
    setdmtValue({
      ...dmtValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleMotorChange = (event) => {
    setmoterValue({
      ...moterValue,
      [event.target.name]: event.target.value,
    });
  };

  const handlePersonChange = (event) => {
    setPersonalForm({
      ...personalFrom,
      [event.target.name]: event.target.value,
    });
  };

  const handleFamilyChange = (event) => {
    setFamilyData({
      ...familyData,
      [event.target.name]: event.target.value,
    });
  };

  const handledocedit = (e) => {
    e.preventDefault();
    let upid = props?.location?.state?._id; 
    axios
      .post(`${API_URL}/client/id/${upid}`)
      .then((D) => {
        console.log("Document successfully updated!", D);
      })
      .catch((error) => {
        console.error("Error! Not Updated: ", error);
      });
  };

  const handleMotorSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .put(
        `${API_URL}/client/${single_id}`,
        { motorInsurance: moterValue },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((data) => {
        getClick();
        document.getElementById("motor_client").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDmtSubmit = (event) => {
    event.preventDefault();
    let token = JSON.parse(localStorage.getItem("userIbfo"));
    axios
      .put(
        `${API_URL}/client/${single_id}`,
        { dmtDetail: dmtValue },
        { headers: { authorization: `Bearer ${token?.token}` } }
      )
      .then((data) => {
        getClick();
        document.getElementById("Family_update").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFamilySubmit = (event) => {
    event.preventDefault();
    let token = JSON.parse(localStorage.getItem("userIbfo"));
    axios
      .put(`${API_URL}/client/family/${single_id}`, familyData, {
        headers: { authorization: `Bearer ${token?.token}` },
      })
      .then((data) => {
        getClick();
        document.getElementById("Family_update").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLifeChange = (event) => {
    setLifeValue({
      ...lifeValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleHealthChange = (event) => {
    setHealthValue({
      ...healthValue,
      [event.target.name]: event.target.value,
    });
  };
  // Family Members

  const handleLifeSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    axios
      .put(
        `${API_URL}/client/${single_id}`,
        { lifeInsurance: lifeValue, tenure: lifeValue.value },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((data) => {
        getClick();
        document.getElementById("life_client").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitPersonalInfo = () => {
    let token = localStorage.getItem("token");
    axios
      .put(`${API_URL}/client/${single_id}`, personalFrom, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((data) => {
        getClick();
        document.getElementById("close-document-modal").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");

    axios
      .put(
        `${API_URL}/client/${single_id}`,
        { documentation: documentsValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((d) => {
        getClick();
        document.getElementById("add_client").click();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const handleHealthInsuranceSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");

    axios
      .put(
        `${API_URL}/client/${single_id}`,
        { healthInsurance: healthValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((d) => {
        getClick();
        document.getElementById("add_client").click();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  

  const handleImageAsFile = (e, type) => {
    const image = e.target.files[0];
    setImageAsFile({ ...imageAsFile, [type]: image });
  };

  const handleImageAsFile2 = (e) => {
    const image = e.target.files[0];
    setImageAsUrl2(image);
  };

  const handleAttachmentSubmit = (e) => {
    e.preventDefault();
    let formdaata = new FormData();
    Object.entries(imageAsFile).map((res) => {
      formdaata.append(res[0], res[1]);
    });
    let token = localStorage.getItem("token");
    axios
      .put(`${API_URL}/client/upload/attachments/${single_id}`, formdaata, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((data) => {
        getClick();
        document.getElementById("attach").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteFamilyById = (i) => {
    axios
      .delete(`${API_URL}/api/client/family/${single_id}/${i}`)
      .then((d) => {
        console.log(d);
        getClick();
      })
      .catch((err) => {
        console.log(err);
      });
    clientSingle.family.splice(i);
    
  };
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Client Profile - Diginfo CRM Dev</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Profile</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/blue/app/main/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <div className="card mb-0">
          <div className="card-body " style={{ marginBottom: "70px" }}>
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="">
                        <img src={Avatar_19} alt="" />
                      </a>
                    </div>
                  </div>
                  {console.log(
                    clientSingle,
                    "clientSingleclientSingleclientSingle"
                  )}
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0">
                            {clientSingle?.companyName}
                          </h3>
                          <h5 className="company-role m-t-0 mb-0">
                            {clientSingle?.firstName +
                              " " +
                              clientSingle?.lastName}
                          </h5>
                          {/* <small className="text-muted">CEO</small> */}
                          <div className="staff-id">
                            Client ID :{clientSingle?._id}
                          </div>
                          {/* <div className="staff-msg">
                              <a
                                href="/blue/conversation/chat"
                                className="btn btn-custom"
                              >
                                Send Message
                              </a>
                            </div> */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <span className="title">Phone:</span>
                            <span className="text">
                              <a href="">{clientSingle?.phone}</a>
                            </span>
                          </li>
                          <li>
                            <span className="title">Email:</span>
                            <span className="text">
                              <a href="">{clientSingle?.email}</a>
                            </span>
                          </li>
                          <li>
                              <span className="title">Birthday:</span>
                              <span className="text">{clientSingle?.dob}</span>
                            </li> 
                          <li>
                            <span className="title">Address:</span>
                            <span className="text">
                              {clientSingle?.pemanentaddress}
                            </span>
                          </li>
                          {/* <li>
                            <span className="title">Gender:</span>
                            <span className="text">Male</span>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card tab-box">
          <div className="row user-tabs">
            <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
              <ul className="nav nav-tabs nav-tabs-bottom"></ul>
            </div>
          </div>
        </div>
        <Tabs fill defaultActiveKey="Profile" id="uncontrolled-tab-example">
          <Tab
            eventKey="Profile"
            title="Profile"
            mountOnEnter // <<<
            unmountOnExit={false} // <<<
          >
            <div
              id="emp_profile"
              className="pro-overview tab-pane fade show active"
            >
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">
                        Personal Informations{" "}
                        <a
                          href="#"
                          className="edit-icon"
                          data-toggle="modal"
                          data-target="#personal_info_modal"
                        >
                          <i className="fa fa-pencil" />
                        </a>
                      </h3>
                      <ul className="personal-info">
                        <li>
                          <div className="title">FirstName:</div>
                          <div className="text">{clientSingle?.firstName}</div>
                        </li>

                        <li>
                          <div className="title">LastName:</div>
                          <div className="text">{clientSingle?.lastName}</div>
                        </li>

                        <li>
                          <div className="title">Occupation:</div>
                          <div className="text">{clientSingle?.occupation}</div>
                        </li>

                        <li>
                          <div className="title">Designation:</div>
                          <div className="text">
                            {clientSingle?.designation}
                          </div>
                        </li>

                        <li>
                          <div className="title">Organization</div>
                          <div className="text">
                            {clientSingle?.organization}
                          </div>
                        </li>

                        <li>
                          <div className="title">Annual Income:</div>
                          <div className="text">
                            {clientSingle?.annualincome}
                          </div>
                        </li>
                        <li>
                          <div className="title">D.O.B:</div>
                          <div className="Number">{clientSingle?.dob}</div>
                        </li>
                        <li>
                          <div className="title">Place Of Birth:</div>
                          <div className="text">
                            {clientSingle?.placeofbirth}
                          </div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text"> {clientSingle?.correspondance_address}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Documentation</h3>

                      <div className="col-auto float-right ml-auto">
                        {!clientSingle?.documentation ? (
                          <a
                            href="#"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#add_client"
                          >
                            <i className="fa fa-plus" /> Add
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="edit-icon"
                            data-toggle="modal"
                            data-target="#add_client"
                          >
                            <i className="fa fa-pencil" />
                          </a>
                        )}
                      </div>
                      <ul className="personal-info">
                        <li>
                          <div className="title">GST No:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.gst_no || ""}{" "}
                          </div>
                        </li>
                        <li>
                          <div className="title">PAN:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.pan || ""}
                          </div>
                        </li>
                        <li>
                          <div className="title">Aadhar No.:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.aadhar || ""}
                          </div>
                        </li>
                        {/* <li>
                              <div className="title">Relationship</div>
                              <div className="text">Father</div>
                            </li> */}
                        <li>
                          <div className="title">Bank:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.bank || ""}
                          </div>
                        </li>
                      </ul>
                      {/* <hr /> */}
                      <ul className="personal-info">
                        <li>
                          <div className="title">Account Number:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.accountNo}
                          </div>
                        </li>
                        <li>
                          <div className="title">IFSC:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.ifsc}
                          </div>
                        </li>
                        <li>
                          <div className="title">MICR:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.micr || ""}
                          </div>
                        </li>
                        <li>
                          <div className="title">Address:</div>
                          <div className="text">
                            {clientSingle?.documentation?.[0]?.address || ""}
                          </div>
                        </li>
                      </ul>
                      <hr></hr>
                      <div className="col-auto float-right ml-auto">
                        <a
                          href="#"
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#dmat"
                        >
                          <i className="fa fa-plus" />
                        </a>
                      </div>
                      <ul className="personal-info">
                        <h5 className="section-title">Demat Details</h5>
                        <li>
                          <div className="title">A/C 1:</div>
                          <div className="text">
                            {clientSingle?.dmtDetail?.[0]?.ac1}
                          </div>
                        </li>
                        <li>
                          <div className="title">A/C 2:</div>
                          <div className="text">
                            {clientSingle?.dmtDetail?.[0]?.ac2}
                          </div>
                        </li>
                        <li>
                          <div className="title">Dp Name:</div>
                          <div className="text">
                            {clientSingle?.dmtDetail?.[0]?.dp}
                          </div>
                        </li>
                        <li>
                          <div className="title">UCC:</div>
                          <div className="text">
                            {clientSingle?.dmtDetail?.[0]?.ucc}
                          </div>
                        </li>
                        <li>
                          <div className="title">BO ID:</div>
                          <div className="text">
                            {clientSingle?.dmtDetail?.[0]?.bo_id}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Life Insurence</h3>
                      <hr></hr>
                      <div className="col-auto float-right ml-auto">
                        {!clientSingle?.lifeInsurance ? (
                          <a
                            href="#"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#life_client"
                          >
                            <i className="fa fa-plus" /> Add
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="edit-icon"
                            data-toggle="modal"
                            data-target="#life_client"
                          >
                            <i className="fa fa-pencil" />
                          </a>
                        )}
                      </div>

                      <ul className="personal-info">
                        <li>
                          <div className="title">Policy Holder:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.policy_holder}
                          </div>
                        </li>
                        <li>
                          <div className="title">Insured Name:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.insured_name}
                          </div>
                        </li>
                        <li>
                          <div className="title">Company Name:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.company_name}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Number</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.policy_number}
                          </div>
                        </li>
                        <li>
                          <div className="title">Product Name:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.product_name}
                          </div>
                        </li>

                        <li>
                          <div className="title">Sum Assred:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.sum_assred}
                          </div>
                        </li>
                        <li>
                          <div className="title">Premium:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.premium}
                          </div>
                        </li>
                        <li>
                          <div className="title">Mode:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.mode}
                          </div>
                        </li>
                        <li>
                          <div className="title">Tenure:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.tenure}
                          </div>
                        </li>
                        <li>
                          <div className="title">Pay Term:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.pay_term}
                          </div>
                        </li>
                        <li>
                          <div className="title">Document:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.document}
                          </div>
                        </li>
                        <li>
                          <div className="title">Maturity Date:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.maturity_date}
                          </div>
                        </li>
                        <li>
                          <div className="title">Advisor:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.advisor}
                          </div>
                        </li>
                        <li>
                          <div className="title">Remarks:</div>
                          <div className="text">
                            {clientSingle?.lifeInsurance?.[0]?.remarks}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Motor Insurance </h3>
                      <hr></hr>
                      <div className="col-auto float-right ml-auto">
                        {!clientSingle?.motorInsurance ? (
                          <a
                            href="#"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#motor_client"
                          >
                            <i className="fa fa-plus" /> Add
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="edit-icon"
                            data-toggle="modal"
                            data-target="#motor_client"
                          >
                            <i className="fa fa-pencil" />
                          </a>
                        )}
                      </div>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Policy Holder Name:</div>
                          <div className="text">
                            {
                              clientSingle?.motorInsurance?.[0]
                                ?.policy_holder_name
                            }
                          </div>
                        </li>
                        <li>
                          <div className="title">Vehicle Number:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.vehicle_number}
                          </div>
                        </li>
                        <li>
                          <div className="title">Vehicle:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.vehicle}
                          </div>
                        </li>
                        <li>
                          <div className="title">Company:</div>
                          <div className="text">
                            {" "}
                            {clientSingle?.motorInsurance?.[0]?.company}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Number:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.policy_number}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Type:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.policy_Type}
                          </div>
                        </li>
                        <li>
                          <div className="title">Premium:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.premium}
                          </div>
                        </li>
                        <li>
                          <div className="title">Premium Due Date:</div>
                          <div className="text">
                            {
                              clientSingle?.motorInsurance?.[0]
                                ?.premium_due_date
                            }
                          </div>
                        </li>
                        <li>
                          <div className="title">Advisor:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.advisor}
                          </div>
                        </li>
                        <li>
                          <div className="title">Remarks:</div>
                          <div className="text">
                            {clientSingle?.motorInsurance?.[0]?.remark}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3 className="card-title">Health Insurance </h3>
                      <hr></hr>
                      <div className="col-auto float-right ml-auto">
                        {!clientSingle?.healthInsurance ? (
                          <a
                            href="#"
                            className="btn btn-success"
                            data-toggle="modal"
                            data-target="#health_client"
                          >
                            <i className="fa fa-plus" /> Add
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="edit-icon"
                            data-toggle="modal"
                            data-target="#health_client"
                          >
                            <i className="fa fa-pencil" />
                          </a>
                        )}
                      </div>
                      <ul className="personal-info">
                        <li>
                          <div className="title">Policy Holder Name:</div>
                          <div className="text">
                            {
                              clientSingle?.healthInsurance?.[0]
                                ?.policy_holder_name
                            }
                          </div>
                        </li>
                        <li>
                          <div className="title">Insured Name:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.insured_name}
                          </div>
                        </li>
                        <li>
                          <div className="title">Company:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.company}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Name:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.policy_name}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Number:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.policy_number}
                          </div>
                        </li>
                        <li>
                          <div className="title">Policy Type:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.policy_type}
                          </div>
                        </li>
                        <li>
                          <div className="title">SA:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.sa}
                          </div>
                        </li>
                        <li>
                          <div className="title">Premium:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.premium}
                          </div>
                        </li>
                        <li>
                          <div className="title">Premium Due Date:</div>
                          <div className="text">
                            {
                              clientSingle?.healthInsurance?.[0]
                                ?.premium_due_date
                            }
                          </div>
                        </li>
                        <li>
                          <div className="title">Advisor:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.advisor}
                          </div>
                        </li>
                        <li>
                          <div className="title">Remarks:</div>
                          <div className="text">
                            {clientSingle?.healthInsurance?.[0]?.remarks}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="card profile-box flex-fill">
                    <div className="card-body">
                      <h3>Attachment</h3>
                      <hr></hr>
                      <div className="col-auto float-right ml-auto">
                        <a
                          href="#"
                          className="btn btn-warning"
                          data-toggle="modal"
                          data-target="#attach"
                        >
                          Upload
                        </a>
                      </div>
                      <ul className="personal-info">
                        <li>
                          <div className="title">PAN:</div>
                          <div className="text">
                            <a href={clientSingle?.attachments?.pan} download>
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("pan");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.pan
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.pan.split("/")
                                        .length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>

                            {clientSingle?.attachments?.[0]?.pan ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.pan}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.pan}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="title">Adhaar:</div>
                          <div className="text">
                            {" "}
                            <a
                              href={clientSingle?.attachments?.adhaar}
                              download
                            >
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("adhaar");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.adhaar
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.adhaar.split(
                                        "/"
                                      ).length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>{" "}
                            {console.log(
                              clientSingle?.attachments?.[0]?.aadhar,
                              "llll"
                            )}
                            {clientSingle?.attachments?.[0]?.aadhar ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.aadhar}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.aadhar}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="title">Cheque:</div>
                          <div className="text">
                            {" "}
                            {/* <button onClick={saveFile}>download</button> */}
                            <a
                              href={clientSingle?.attachments?.cheque}
                              download
                            >
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("cheque");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.cheque
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.cheque.split(
                                        "/"
                                      ).length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>
                            {clientSingle?.attachments?.[0]?.cheque ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.cheque}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.cheque}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="title">Health Policies:</div>
                          <div className="text">
                            {" "}
                            <a
                              href={
                                clientSingle?.attachments?.["health-policy"]
                              }
                              download
                            >
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("health-policy");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.["health-policy"]
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.[
                                        "health-policy"
                                      ].split("/").length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>
                            {console.log(
                              clientSingle?.attachments?.["health_policies"],
                              "gea"
                            )}
                            {clientSingle?.attachments?.[0]?.[
                              "health_policies"
                            ] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["health_policies"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["health_policies"]}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {/* {trueImage ? (
                              <Lightbox
                                mainSrc={clientSingle?.attachments?.['health-policy']}
                                onCloseRequest={() => setTrueImage(false)}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </li>
                        <li>
                          <div className="title">Motor Policies:</div>
                          <div className="text">
                            {" "}
                            <p
                              onClick={() => {
                                setTrueImage(true);
                                setSelectImg("motor-policy");
                              }}
                            >
                              {
                                clientSingle?.attachments?.["motor-policy"]
                                  ?.split("/")
                                  [
                                    clientSingle?.attachments?.[
                                      "motor-policy"
                                    ].split("/").length - 1
                                  ].split("?")[0]
                              }
                            </p>{" "}
                            {clientSingle?.attachments?.[0]?.[
                              "motor_policies"
                            ] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["motor_policies"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["motor_policies"]}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {/* {trueImage ? (
                              <Lightbox
                                mainSrc={clientSingle?.attachments?.['motor-policy']}
                                onCloseRequest={() => setTrueImage(false)}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </li>
                        <li>
                          <div className="title">Financial Planning:</div>
                          <div className="text">
                            {" "}
                            <a
                              href={clientSingle?.attachments?.financial}
                              download
                            >
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("financial");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.financial
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.financial.split(
                                        "/"
                                      ).length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>
                            {clientSingle?.attachments?.[0]?.[
                              "financial_planning"
                            ] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["financial_planning"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["financial_planning"]}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {/* {trueImage ? (
                              <Lightbox
                                mainSrc={clientSingle?.attachments?.financial}
                                onCloseRequest={() => setTrueImage(false)}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </li>
                        <li>
                          <div className="title">XIRR:</div>
                          <div className="text">
                            {" "}
                            <a href={clientSingle?.attachments?.xirr} download>
                              <p
                                onClick={() => {
                                  setTrueImage(true);
                                  setSelectImg("xirr");
                                }}
                              >
                                {
                                  clientSingle?.attachments?.xirr
                                    ?.split("/")
                                    [
                                      clientSingle?.attachments?.xirr.split("/")
                                        .length - 1
                                    ].split("?")[0]
                                }
                              </p>{" "}
                            </a>
                            {clientSingle?.attachments?.[0]?.["xirr"] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["xirr"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["xirr"]}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {/* {trueImage ? (
                              <Lightbox
                                mainSrc={clientSingle?.attachments?.[selectImg]}
                                onCloseRequest={() => setTrueImage(false)}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </li>
                        <li>
                          <div className="title">Other Attachments:</div>
                          <div className="text">
                            {/* <a
                              href={
                                clientSingle?.attachments?.cheque
                                  ?.split("/")
                                  [
                                    clientSingle?.attachments?.cheque.split("/")
                                      .length - 1
                                  ].split("?")[0]
                              }
                              download
                            > */}
                            <p
                              onClick={() => {
                                setTrueImage(true);
                                setSelectImg("cheque");
                              }}
                            >
                              {
                                clientSingle?.attachments?.cheque
                                  ?.split("/")
                                  [
                                    clientSingle?.attachments?.cheque.split("/")
                                      .length - 1
                                  ].split("?")[0]
                              }
                            </p>{" "}
                            {clientSingle?.attachments?.[0]?.[
                              "other_attachments"
                            ] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["other_attachments"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["other_attachments"]}`}
                                  width="100px"
                                  height="100px"
                                  alt="ImageName"
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </li>
                        <li>
                          <div className="title">P&L Reports:</div>
                          <div className="text">
                            {" "}
                            <p
                              onClick={() => {
                                setTrueImage(true);
                                setSelectImg("cheque");
                              }}
                            >
                              {
                                clientSingle?.attachments?.cheque
                                  ?.split("/")
                                  [
                                    clientSingle?.attachments?.cheque.split("/")
                                      .length - 1
                                  ].split("?")[0]
                              }
                            </p>{" "}
                            {clientSingle?.attachments?.[0]?.[
                              "other_attachments"
                            ] ? (
                              <>
                                <div
                                  onClick={(e) =>
                                    download(
                                      `${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["other_attachments"]}`
                                    )
                                  }
                                >
                                  Download
                                </div>
                                <img
                                  src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.["other_attachments"]}`}
                                  width="100px"
                                  height="100px"
                                />
                              </>
                            ) : (
                              ""
                            )}
                            {/* {trueImage ? (
                              <Lightbox
                                mainSrc={clientSingle?.attachments?.cheque}
                                onCloseRequest={() => setTrueImage(false)}
                              />
                            ) : (
                              ""
                            )} */}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <div className="card-body " style={{ marginBottom: "70px" }}>
                <h1>AFPR</h1>
                <AFPR single_id={single_id} />
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="Family"
            title="Family"
            mountOnEnter // <<<
            unmountOnExit={false} // <<<
          >
            <div
              className="col-auto float-right ml-auto"
              style={{ paddingBottom: "15px" }}
            >
              <a
                href="#"
                className=""
                data-toggle="modal"
                data-target="#family_client"
              >
                Add family Member
              </a>
            </div>
            <Table responsive="sm">
              <thead style={{ backgroundColor: "bisque" }}>
                <tr>
                  <th>Relation</th>
                  <th>Name</th>
                  <th>Date of birth</th>
                  <th>Mobile</th>
                  <th>Income</th>
                  <th>Retirement age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clientSingle?.family &&
                  clientSingle?.family.map((data, index) => {
                    return (
                      <tr onClick={() => console.log(index, "from index")}>
                        <td>{data?.Relation}</td>
                        <td>{data?.Name}</td>
                        <td>{data?.Date_of_birth}</td>
                        <td>{data?.mobile}</td>
                        <td>{data?.Income}</td>
                        <td>{data?.Retirement_age}</td>
                        <td style={{display:"flex",justifyContent:"space-around"}}>
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#Family_update"
                            // onClick={handleEditData}
                          >
                            <i className="fa fa-pencil" />
                          </a>
                          <div onClick={() => handleDeleteFamilyById(index)}>
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
            </Table>
          </Tab>
        </Tabs>

        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content profile-tab-content"></div>
          </div>
        </div>
      </div>

      {/* Delete MOdal */}
      <div id="myModal" class="modal fade">
        <div class="modal-dialog modal-confirm">
          <div class="modal-content">
            <div class="modal-header flex-column">
              {/* <div class="icon-box">
                <i class="material-icons">&#xE5CD;</i>
              </div> */}
              <h4 class="modal-title w-100">Are you sure?</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>Do you really want to delete these records?</p>
            </div>
            <div class="modal-footer justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* personal Info */}
      <div
        id="personal_info_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
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
              <form>
                <div className="row">
                  {personalInfo.map((filed) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {filed.label} <span className="text-danger"></span>
                        </label>
                        <input
                          className="form-control floating"
                          type={filed.type}
                          name={filed.fieldname}
                          value={personalFrom?.[filed.fieldname] || ""}
                          onChange={handlePersonChange}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="submit-section document-Submit">
                    <p className="form-error"></p>
                    <button
                      className="btn btn-primary submit-btn"
                      type="button"
                      onClick={handleSubmitPersonalInfo}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Personal Info */}

      {/* /Page Content */}
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Documentation</h5>
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
              <form onSubmit={handleDocumentSubmit}>
                <div className="row">
                  {documentationInfo.map((field) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {field.label} <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control floating"
                          type={field.type}
                          name={field.fieldname}
                          value={documentsValue?.[field.fieldname] || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="submit-section document-Submit">
                    <p className="form-error">{documentsValue?.error}</p>
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
      </div>

      {/* Modal Life Insurence*/}
      <div id="life_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Life Insurence</h5>
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
              <form onSubmit={handleLifeSubmit}>
                <div className="row">
                  {lifeInsuranceForm.map((res) => (
                    <>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="col-form-label">
                            {res.label} <span className="text-danger"></span>
                          </label>
                          {res.type === "select" ? (
                            <Select
                              name={res.fieldname}
                              id={res.fieldname}
                              label={res.fieldname}
                              options={[
                                { value: "monthly", label: "Monthly" },
                                { value: "yearly", label: "Yearly" },
                              ]}
                              value={lifeValue?.[res.fieldname] || ""}
                              onChange={(value) => {
                                setLifeValue({
                                  ...lifeValue,
                                  [res.fieldname]: value?.value,
                                });
                              }}
                            />
                          ) : (
                            <input
                              className="form-control"
                              type={res.type}
                              name={res.fieldname}
                              value={lifeValue?.[res.fieldname] || ""}
                              onChange={handleLifeChange}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="submit-section">
                    <p className="form-error">{documentsValue?.error}</p>
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
      </div>

      {/* Documentation */}
      <div
        id="document_modal"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Documentation Update</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handledocedit}>
                <div className="row">
                  {bankInfo.map((field) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {field.label} <span className="text-danger"></span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name={field.firstName}
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
      </div>

      {/* Family Information*/}
      <div id="family_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
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
                          {res.label} <span className="text-danger"></span>
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
      </div>

      {/* Family_update */}
      <div id="Family_update" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Family Members</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body"></div>
          </div>
        </div>
      </div>

      {/* Health Insurence*/}
      <div id="health_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Health Insurence</h5>
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
              <form onSubmit={handleHealthInsuranceSubmit}>
                <div className="row">
                  {healthInsuranceForm.map((field) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {field.label} <span className="text-danger"></span>
                        </label>
                        <input
                          className="form-control floating"
                          type={field.type}
                          name={field.fieldname}
                          value={healthValue?.[field.fieldname]}
                          onChange={handleHealthChange}
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
      </div>

      {/* Motor Insurence*/}
      <div id="motor_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Motor Insurence</h5>
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
              <form onSubmit={handleMotorSubmit}>
                <div className="row">
                  {motorInsuranceForm.map((field) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {field.label} <span className="text-danger"></span>
                        </label>
                        <input
                          className="form-control floating"
                          type={field.type}
                          name={field.fieldname}
                          value={moterValue?.[field.fieldname]}
                          onChange={handleMotorChange}
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
      </div>

      {/* dmat */}
      <div id="dmat" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Dmat Details</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleDmtSubmit}>
                <div className="row">
                  {dematForm.map((field) => (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">
                          {field.label} <span className="text-danger"></span>
                        </label>
                        <input
                          className="form-control floating"
                          type={field.type}
                          name={field.fieldname}
                          value={dmtValue?.[field.fieldname]}
                          onChange={handleDmtChange}
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
      </div>

      {/* Attachments*/}
      <div id="attach" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Attachment</h5>
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
              <form onSubmit={handleAttachmentSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        PAN: <span className="text-danger"></span>
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.pan ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.pan}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "pan")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Adhaar Card:</label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.aadhar ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.aadhar}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "aadhar")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Cheque:</label>
                      <br></br>
                      {/* <img src={clientSingle?.attachments?.cheque} width="100px" height="100px"/> */}
                      {clientSingle?.attachments?.[0]?.cheque ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.cheque}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "cheque")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Health policies: <span className="text-danger"></span>
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.health_policies ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.health_policies}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageAsFile(e, "health_policies")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Motor Policies: <span className="text-danger"></span>
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.motor_policies ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.motor_policies}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "motor_policies")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        {console.log(
                          clientSingle?.attachments?.[0]?.financial_planning
                        )}
                        Financial Planning:
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.financial_planning ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.financial_planning}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageAsFile(e, "financial_planning")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">XIRR:</label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.xirr ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.xirr}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "xirr")}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Other Attachments: <span className="text-danger"></span>
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.other_attachments ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.other_attachments}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) =>
                          handleImageAsFile(e, "other_attachments")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        P&L: <span className="text-danger"></span>
                      </label>
                      <br></br>
                      {clientSingle?.attachments?.[0]?.reports ? (
                        <img
                          src={`${LOCAL_PORT}/${clientSingle?.attachments?.[0]?.reports}`}
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => handleImageAsFile(e, "reports")}
                      />
                    </div>
                  </div>
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
      </div>
    </div>
  );
};
export default ClientProfile;
