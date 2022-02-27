import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../../Constants"
const AFPR = ({ single_id }) => {
  const [clientList, setClientList] = useState();
  const [client_id, setclient_id] = useState();

  const [single_data, setSingleData] = useState();
  const [checkXirr, setCheckXirr] = useState(true);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reportUpdate, setReportUpdate] = useState(false);
  const [afpr, setafpr] = useState(false);
  const [afprSubmission, setAfprSubmission] = useState(false);
  const [product, setProduct] = useState(false);
  const [implement, setImplement] = useState(false);
  const [fnm, setFnm] = useState(false);
  const [remark, setRemark] = useState();
  const [docLink, setDoclink] = useState();
  let dd = JSON.parse(localStorage.getItem("userIbfo"));
  useEffect(() => {
    axios
      .get(`${API_URL}/client`, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((data) => {
        setClientList(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (client_id) {
      axios
        .get(`${API_URL}/client/${client_id}`)
        .then((data) => {
          setSingleData(data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [client_id]);

  const handleSubmit = () => {
    console.log({
      name: name,
      date: date,
      xirr: checkXirr || false,
      report_update: reportUpdate || false,
      afpr_one: afpr || false,
      afpr_submission: afprSubmission || false,
      product: product || false,
      implement: implement || false,
      fnm: fnm || false,
      doc_link: docLink,
      remark: remark,
    });
    axios
      .put(
        `${API_URL}/client/afpr/${single_id}`,
        {
          name: name,
          date: date,
          xirr: checkXirr || false,
          report_update: reportUpdate || false,
          afpr_one: afpr || false,
          afpr_submission: afprSubmission || false,
          product: product || false,
          implement: implement || false,
          fnm: fnm || false,
          doc_link: docLink,
          remark: remark,
        },
        {
          headers: {
            Authorization: `Bearer ${dd.token}`,
          },
        }
      )
      .then((data) => {
        console.log(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="col-md-12 d-flex">
      <div className="card profile-box flex-fill">
        <div className="card-body">
          <div className="page-wrapper">
            <Helmet>
              <title>AFPR - Diginfo CRM Dev</title>
            </Helmet>
            <div className="content container-fluid">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter ..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>XIRR</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Yes"
                    checked={checkXirr}
                    defaultChecked={"yes"}
                    name={"yes"}
                    label="Yes"
                    onClick={() => setCheckXirr(true)}
                  />{" "}
                  <Form.Check
                    type="checkbox"
                    label="No"
                    checked={!checkXirr}
                    defaultChecked={"yes"}
                    name={"no"}
                    label="no"
                    onClick={() => setCheckXirr(false)}
                  />{" "}
                </Form.Group>
                {checkXirr ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Report Updation</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={reportUpdate}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setReportUpdate(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!reportUpdate}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setReportUpdate(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                {reportUpdate ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>AFPR</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={afpr}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setafpr(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!afpr}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setafpr(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                {afpr ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>AFPR Submission</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={afprSubmission}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setAfprSubmission(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!afprSubmission}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setAfprSubmission(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                {afprSubmission ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={product}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setProduct(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!product}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setProduct(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                {product ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Implementation</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={implement}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setImplement(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!implement}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setImplement(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                {implement ? (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>FNM</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Yes"
                      checked={fnm}
                      defaultChecked={"yes"}
                      name={"yes"}
                      label="Yes"
                      onClick={() => setFnm(true)}
                    />{" "}
                    <Form.Check
                      type="checkbox"
                      label="No"
                      checked={!fnm}
                      defaultChecked={"yes"}
                      name={"no"}
                      label="no"
                      onClick={() => setFnm(false)}
                    />{" "}
                  </Form.Group>
                ) : null}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Docs link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ..."
                    value={docLink}
                    onChange={(e) => setDoclink(e.target.value)}
                  />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Remark</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </Form.Group>{" "}
                <Button variant="primary" type="button" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AFPR;
