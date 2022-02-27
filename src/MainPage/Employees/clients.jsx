import React, { useEffect, useState, useRef, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Country, State, City } from "country-state-city";
import { useHistory } from "react-router";
import { Avatar_19 } from "../../Entryfile/imagepath";
import { useFormik } from "formik";
import Select from "react-select";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { API_URL } from "../../Constants";

const Clients = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [firstname, setfirstname] = useState();
  const [middleName, setmiddleName] = useState();
  const [lastName, setlastName] = useState();
  const [userName, setuserName] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [clientId, setclientId] = useState();
  const [client_id, setClient_Id] = useState(
    localStorage.getItem("client_ids")
  );
  const [occupation, setoccupation] = useState();
  const [designation, setdesignation] = useState();
  const [organization, setorganization] = useState();
  const [phone, setphone] = useState();
  const [DOB, setDOB] = useState();
  const [palceOfBirth, setpalceOfBirth] = useState();
  const [annualIncome, setannualIncome] = useState();
  const [companyName, setcompanyName] = useState();
  const [permanentAddress, setpermanentAddress] = useState();
  const [correspondanceAddress, setcorrespondanceAddress] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [clientDatas, setClientDatas] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [checkValue, setCheckValue] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [classUpdate, setUpdate] = useState(false);
  const addressFromik = useFormik({
    initialValues: {
      country: null,
      state: null,
      city: null,
    },
    onSubmit: (values) => console.log(JSON.stringify(values)),
  });
  const { values, handleSubmit, setFieldValue, setValues } = addressFromik;
  const localData = localStorage.getItem("userIbfo");
  const isRole = JSON.parse(localData).isAdmin;
  console.log(JSON.parse(localData).isAdmin, "from api");
  const countries = Country?.getAllCountries();

  const updatedCountries =
    countries &&
    countries.map((country) => ({
      label: country.name,
      value: country.id,
      ...country,
    }));
  const updatedStates = useMemo(() => {
    if (values?.country?.isoCode) {
      let aa = State?.getStatesOfCountry(values?.country?.isoCode).map(
        (state) => ({ label: state.name, value: state.id, ...state })
      );
      console.log(aa);
      return aa;
    } else {
      return [];
    }
  }, [values?.country]);
  const updatedCities = useMemo(
    (stateId) => {
      if (values?.country && values?.state) {
        return City?.getCitiesOfState(
          values?.country?.isoCode,
          values?.state?.isoCode
        ).map((city) => ({ label: city.name, value: city.id, ...city }));
      } else {
        return [];
      }
    },
    [values?.country, values?.state]
  );

  useEffect(() => {}, [values]);
  const ref = useRef();

  let history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    let dd = JSON.parse(localStorage.getItem("userIbfo"));
    let userdata = {
      firstName: firstname,
      middleName: middleName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      clientId: clientId,
      occupation: occupation,
      designation: designation,
      dob: DOB,
      organization: organization,
      phone: phone,
      placeofbirth: palceOfBirth,
      annualincome: annualIncome,
      companyName: companyName,
      pemanentaddress: permanentAddress,
      correspondance_address: correspondanceAddress,
      country: country.value?.name,
      state: state.value?.name,
      city: city.value?.name,
      attachments: {},
    };
    axios
      .post(`${API_URL}/client/create-client`, userdata, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((D) => {
        if (D?.data?.error?.code === 11000) {
          setErrorMsg("email already exist");
        }
        setUpdate(true);
        console.log("Document successfully written!", D.data);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  const handleDeletClient = (e, _id) => {
    setDeleteModal(e);
    localStorage.setItem("client_ids", _id);
  };
  const DeletClientFromApi = (e) => {
    axios
      .delete(`${API_URL}/client/${localStorage.getItem("client_ids")}`, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((d) => {
        if (d?.data?.message == "User Deleted") {
          setDeleteModal(false);
          axios
            .get(`${API_URL}/client`, {
              headers: {
                Authorization: `Bearer ${dd.token}`,
              },
            })
            .then((data) => {
              setClientDatas(data?.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let dd = JSON.parse(localStorage.getItem("userIbfo"));

  useEffect(() => {
    axios
      .get(`${API_URL}/client`, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((data) => {
        setClientDatas(data?.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleSerch = () => {
    const FilterValue = filterData.filter((client) => {
      return (
        client.firstName.toLowerCase().includes(clientName.toLowerCase()) ||
        client.lastName.toLowerCase().includes(clientName.toLowerCase()) ||
        client.middleName.toLowerCase().includes(clientName.toLowerCase())
      );
    });
    setClientDatas(FilterValue);
  };

  const handleSerch2 = () => {
    const FilterValue = filterData.filter((client) => {
      return client.city.toLowerCase().includes(clientCity.toLowerCase());
    });
    setClientDatas(FilterValue);
  };

  const handleCopyAddress = (e) => {
    const check = e.target.checked;
    setCheckValue(check);
    if (check) {
      setpermanentAddress(permanentAddress);
      setcorrespondanceAddress(permanentAddress);
    } else {
      setcorrespondanceAddress("");
    }
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Clients - Diginfo CRM Dev</title>
        <meta name="description" content="Login page" />
      </Helmet>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Clients</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/blue/app/main/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Clients</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#add_client"
              >
                <i className="fa fa-plus" /> Add Client
              </a>
              <div className="view-icons">
                <a
                  href="/blue/app/employees/clients"
                  className="grid-view btn btn-link active"
                >
                  <i className="fa fa-th" />
                </a>
                <a
                  href="/blue/app/employees/clients-list"
                  className="list-view btn btn-link"
                >
                  <i className="fa fa-bars" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Client ID</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={(e) => setClientName(e.target.value)}
              />
              <label className="focus-label">Client Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="form-group form-focus">
              <input
                type="text"
                className="form-control floating"
                onChange={(e) => setClientCity(e.target.value)}
              />
              <label className="focus-label">Client City</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <a
              href="#"
              className="btn btn-success btn-block"
              onClick={() => {
                handleSerch();
                handleSerch2();
              }}
            >
              {" "}
              Search{" "}
            </a>
          </div>
        </div>
        {/* Search Filter */}
        {isRole && (
          <div className="row staff-gridhfgh-row">
            {clientDatas &&
              clientDatas.map((data, i) => {
                return (
                  <div
                    className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                    key={i}
                  >
                    <div className="profile-widget">
                      <div className="profile-img">
                        <a
                          href="/blue/app/profile/client-profile"
                          className="avatar"
                        >
                          <img alt="" src={Avatar_19} />
                        </a>
                      </div>
                      <div
                        className="dropdown profile-action"
                        onClick={() => handleDeletClient(true, data?._id)}
                      >
                        <a
                          href="#"
                          className="action-icon dropdown-toggle"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="material-icons">more_vert</i>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right">
                          {deleteModal ? (
                            <a
                              className="dropdown-item"
                              href="#"
                              data-toggle="modal"
                              data-target="#delete_client"
                            >
                              <i className="fa fa-trash-o m-r-5" /> Delete
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                        <a href="#">{data?.organization}</a>
                      </h4>
                      <h5 className="user-name m-t-10 mb-0 text-ellipsis">
                        <a href="/blue/app/profile/client-profile">
                          {data?.firstName + "" + data?.lastName}
                        </a>
                      </h5>
                      <div className="small text-muted">
                        {data?.designation}
                      </div>
                      <p
                        onClick={() =>
                          history.push({
                            pathname: "/blue/conversation/chat",
                          })
                        }
                        className="btn btn-white btn-sm m-t-10 mr-1"
                      >
                        Message
                      </p>
                      <p
                        onClick={() =>
                          history.push({
                            pathname: "/app/profile/client-profile",
                            state: { _id: data?._id },
                          })
                        }
                        className="btn btn-white btn-sm m-t-10"
                      >
                        View Profile
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {/* /Page Content */}
      {/* Add Client Modal */}
      <div id="add_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Client</h5>
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
              <form onSubmit={handelSubmit}>
                {errorMsg && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    {errorMsg}
                  </p>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        First Name <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={firstname}
                        onChange={(e) => {
                          setfirstname(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Middle Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="middleName"
                        value={middleName}
                        onChange={(e) => {
                          setmiddleName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => {
                          setlastName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Username <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={(e) => {
                          setuserName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setconfirmPassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Client ID <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        name="clientId"
                        value={clientId}
                        onChange={(e) => {
                          setclientId(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Occupation <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        name="occupation"
                        value={occupation}
                        onChange={(e) => {
                          setoccupation(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Designation <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        name="designation"
                        value={designation}
                        onChange={(e) => {
                          setdesignation(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Organization <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        name="organization"
                        value={organization}
                        onChange={(e) => {
                          setorganization(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Phone </label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        value={phone}
                        onChange={(e) => {
                          setphone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        DOB <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="date"
                        name="DOB"
                        placeholder="dd/mm/yy"
                        value={DOB}
                        onChange={(e) => {
                          setDOB(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Place of Birth <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="text"
                        name="palceOfBirth"
                        value={palceOfBirth}
                        onChange={(e) => {
                          setpalceOfBirth(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Annual Income <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        type="number"
                        name="annualIncome"
                        value={annualIncome}
                        onChange={(e) => {
                          setannualIncome(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Company Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="companyName"
                        value={companyName}
                        onChange={(e) => {
                          setcompanyName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Permanent Address
                      </label>

                      <div>
                        <input
                          className="form-control"
                          type="text"
                          name="permanentAddress"
                          value={permanentAddress}
                          onChange={(e) => {
                            setpermanentAddress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Correspondance Address
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="correspondanceAddress"
                        value={
                          checkValue ? permanentAddress : correspondanceAddress
                        }
                        onChange={(e) => {
                          setcorrespondanceAddress(e.target.value);
                        }}
                      />
                      <label>Same as permanent</label>
                      <input
                        type="checkbox"
                        onClick={(e) => handleCopyAddress(e)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select
                        id="country"
                        name="country"
                        label="country"
                        options={updatedCountries}
                        value={values.country}
                        onChange={(value) => {
                          setValues(
                            { country: value, state: null, city: null },
                            false
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <Select
                      id="state"
                      name="state"
                      options={updatedStates}
                      value={values.state}
                      onChange={(value) => {
                        setValues(
                          { ...values, state: value, city: null },
                          false
                        );
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <Select
                      id="city"
                      name="city"
                      options={updatedCities}
                      value={values.city}
                      onChange={(value) => setFieldValue("city", value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">PIN</label>
                      <input
                        className="form-control"
                        type="number"
                        name="pin"
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
      {/* /Add Client Modal */}
      {/* Edit Client Modal */}
      <div id="edit_client" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Client</h5>
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="Barry"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Last Name</label>
                      <input
                        className="form-control"
                        defaultValue="Cuda"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Username <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="barrycuda"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Email <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        defaultValue="barrycuda@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <input
                        className="form-control"
                        defaultValue="barrycuda"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        defaultValue="barrycuda"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">
                        Client ID <span className="text-danger"></span>
                      </label>
                      <input
                        className="form-control floating"
                        defaultValue="CLT-0001"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Phone </label>
                      <input
                        className="form-control"
                        defaultValue={9876543210}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="col-form-label">Company Name</label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Global Technologies"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Chat</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Estimates</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Invoices</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                        <td className="text-center">
                          <input defaultChecked type="checkbox" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Edit Client Modal */}
      {/* Delete Client Modal */}
      <div className="modal custom-modal fade" id="delete_client" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Client</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6" onClick={DeletClientFromApi}>
                    {/* <a href="" className="btn btn-primary continue-btn"> */}
                    <button className="btn btn-primary continue-btn">
                      Delete
                    </button>
                    {/* </a> */}
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
      {/* /Delete Client Modal */}
    </div>
  );
};

export default Clients;
