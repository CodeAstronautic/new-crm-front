import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { API_URL } from "../../../Constants";
import "../Apps/calendar.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import moment from "moment";

import axios from "axios";

class AdminDashboard extends Component {
  state = {
    isLoading: true,
    iseditdelete: false,
    addneweventobj: null,
    isnewevent: false,
    clientSingle:'',
    event_title: "",
    event_start_time: null,
    event_end_time: null,
    category_color: "",
    weekendsVisible: true,
    currentEvents: [],
    defaultEvents: [],
    userDatas: "",
  };
  componentWillMount() {
    setTimeout(() => {
      this.setState({ ...this.state, isLoading: false });
      this.getEvents();
    }, 3000);
  }
  handleDateSelect = (selectInfo) => {
    this.setState({
      isnewevent: true,
      addneweventobj: selectInfo,
    });
  };
  // async componentDidMount() {}
  componentDidMount() {
    let d = JSON.parse(localStorage.getItem("userIbfo"));
      axios
         .get(`${API_URL}/users/${d?._id}`)
         .then((data) => {
           this.setState({clientSingle:data?.data});
         })
         .catch((err) => {
           console.log(err);
         });
  }

  getEvents = () => {
    let dd = JSON.parse(localStorage.getItem("userIbfo"));

    axios
      .get(`${API_URL}/event`, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((data) => {
        this.setState({ ...this.state, defaultEvents: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addnewevent() {
    const {
      event_title,
      event_start_time,
      event_end_time,
      category_color,
      addneweventobj,
    } = this.state;
    let dd = localStorage.getItem("userIbfo");
    let calendarApi = addneweventobj.view?.calendar;
    calendarApi.unselect();
    let datas = {
      title: event_title,
      startTime: new Date(
        `${addneweventobj.startStr} ${this.state.event_start_time}`
      ),
      endTime: new Date(
        `${addneweventobj.endStr} ${this.state.event_end_time}`
      ),
      date: moment(addneweventobj.startStr).format("YYYY-MM-DD"),
    };
    axios
      .post(`${API_URL}/event/event-create`, datas, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((data) => {
        this.getEvents();
        this.setState({ isnewevent: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEventChange = (event) => {
    const eventData = this.state.currentEvents;
    this.setState({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  onupdateModalClose() {
    this.setState({
      iseditdelete: false,
      event_title: "",
    });
  }
  oncreateeventModalClose() {
    this.setState({
      isnewevent: false,
      event_title: "",
    });
  }
  handleEventClick = (clickInfo) => {
    this.setState({
      iseditdelete: true,
      event_title: clickInfo.event.title,
      calenderevent: clickInfo.event,
    });
  };
  removeevent() {
    const { calenderevent } = this.state;
    calenderevent.remove();
    let dd = JSON.parse(localStorage.getItem("userIbfo"));

    axios
      .delete(`${API_URL}/event/${calenderevent?._def?.extendedProps?._id}`, {
        headers: {
          Authorization: `Bearer ${dd.token}`,
        },
      })
      .then((data) => {
        this.getEvents();
        this.setState({ iseditdelete: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  clickupdateevent() {
    const { defaultEvents, calenderevent, event_title } = this.state;
    // const newArray = defaultEvents;
    // for (let i = 0; i < newArray.length; i++) {
    //   if (newArray[i].id === parseInt(calenderevent.id)) {
    //     newArray[i].title = event_title;
    //   }
    // }
    // this.setState({ defaultEvents: newArray, iseditdelete: false });
    let dd = JSON.parse(localStorage.getItem("userIbfo"));

    axios
      .put(
        `${API_URL}/event/${calenderevent?._def?.extendedProps?._id}`,
        { title: event_title },
        {
          headers: {
            Authorization: `Bearer ${dd.token}`,
          },
        }
      )
      .then((data) => {
        this.getEvents();
        this.setState({ iseditdelete: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      defaultEvents,
      iseditdelete,
      isnewevent,
      currentEvents,
    } = this.state;
    const ll = JSON.parse(localStorage.getItem("userIbfo"));
    return (
      <>
        {this.state.isLoading ? (
          <div
            style={{
              display: "list-item",
              textAlign: "center",
              marginTop: "260px",
            }}
          >
            <Spinner color="primary" />
          </div>
        ) : (
          <div className="page-wrapper">
            <Helmet>
              <title>Today Agenda - Diginfo CRM Dev</title>
              <meta name="description" content="Chat" />
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Welcome {this.state.clientSingle?.firstName}!</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item active">Dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="content container-fluid"> */}
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Today Agenda</h3>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          {/* Calendar */}
                          {/* <div id="calendar" /> */}
                          <FullCalendar
                            plugins={[
                              dayGridPlugin,
                              timeGridPlugin,
                              interactionPlugin,
                            ]}
                            headerToolbar={{
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            data-target="#add_event"
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={this.state.weekendsVisible}
                            initialEvents={defaultEvents} // alternatively, use the `events` setting to fetch from a feed
                            select={this.handleDateSelect}
                            // eventContent={renderEventContent} // custom render function
                            eventClick={(clickInfo) =>
                              this.handleEventClick(clickInfo)
                            }
                            events={this.state.defaultEvents}
                            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                            /* you can update a remote database when these fire:
                               eventAdd={function(){}}
                               eventChange={function(){}}
                               eventRemove={function(){}}
                               */
                          />
                          {/* /Calendar */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Content */}
            {/* Add Event Modal */}
            <div
              id="add_event"
              className="modal custom-modal fade"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Today agenda</h5>
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
                          Event Name <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="event_title"
                          name="event_title"
                          value={this.statedefaultEvents?.title}
                          // onBlur={() => setFieldTouched("event_title")}
                          onChange={(event) => this.handleEventChange(event)}
                        />
                      </div>
                      <div className="form-group">
                        <label>
                          Event Date <span className="text-danger">*</span>
                        </label>
                        <div className="cal-icon">
                          <input
                            className="form-control datetimepicker"
                            type="text"
                            // value={addneweventobj}
                            // onChange={(event) =>
                            //   this.setState({ addneweventobj: event.target.value })
                            // }
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label">Category</label>
                        <select
                          className="select form-control"
                          name="category_color"
                          id="category_color"
                          value={currentEvents.category_color}
                          // onBlur={() => setFieldTouched("category_color")}
                          onChange={(event) => this.handleEventChange(event)}
                        >
                          <option name="Danger" value="Danger">
                            Danger
                          </option>
                          <option name="Success" value="Success">
                            Success
                          </option>
                          <option name="Purple" value="Purple">
                            Purple
                          </option>
                          <option name="Primary" value="Primary">
                            Primary
                          </option>
                          <option name="Pink" value="Pink">
                            Pink
                          </option>
                          <option name="Info" value="Info">
                            Info
                          </option>
                          <option name="Inverse" value="Inverse">
                            Inverse
                          </option>
                          <option name="Orange" value="Orange">
                            Orange
                          </option>
                          <option name="Brown" value="Brown">
                            Brown
                          </option>
                          <option name="Teal" value="Teal">
                            Teal
                          </option>
                          <option name="Warning" value="Warning">
                            Warning
                          </option>
                        </select>
                      </div>
                      <div className="submit-section">
                        <button
                          type="button"
                          data-dismiss="modal"
                          className="btn btn-primary submit-btn"
                          onClick={() => this.addnewevent()}
                        >
                          Submit
                        </button>
                      </div>
                      {/* </>
                  )} */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* /Add Event Modal */}
            {/* Event Modal */}
            <div className="modal custom-modal fade" id="event-modal">
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Today agenda</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body" />
                  <div className="modal-footer text-center">
                    <button
                      type="button"
                      className="btn btn-success submit-btn save-event"
                    >
                      Create today agenda
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger submit-btn delete-event"
                      data-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /Event Modal */}
            {/* Add Category Modal*/}
            <div className="modal custom-modal fade" id="add-category">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      ×
                    </button>
                    <h4 className="modal-title">Add a category</h4>
                  </div>
                  <div className="modal-body p-20">
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="col-form-label">
                            Category Name
                          </label>
                          <input
                            className="form-control"
                            placeholder="Enter name"
                            type="text"
                            name="category-name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="col-form-label">
                            Choose Category Color
                          </label>
                          <select
                            className="form-control"
                            data-placeholder="Choose a color..."
                            name="category-color"
                            id="category_color"
                          >
                            <option value="success">Success</option>
                            <option value="danger">Danger</option>
                            <option value="info">Info</option>
                            <option value="pink">Pink</option>
                            <option value="primary">Primary</option>
                            <option value="warning">Warning</option>
                            <option value="orange">Orange</option>
                            <option value="brown">Brown</option>
                            <option value="teal">Teal</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-white"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger save-category"
                      data-dismiss="modal"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* /Add Category Modal*/}
            {/* {Event Click} */}
            <Modal centered isOpen={iseditdelete}>
              <ModalHeader toggle={() => this.onupdateModalClose()}>
                Today agenda
              </ModalHeader>
              <ModalBody>{this.rendereventclick()}</ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn-danger submit-btn delete-event"
                  data-dismiss="modal"
                  onClick={() => this.removeevent()}
                >
                  Delete
                </button>
              </ModalFooter>
            </Modal>
            <Modal centered isOpen={isnewevent}>
              <ModalHeader toggle={() => this.oncreateeventModalClose()}>
                Today agenda
              </ModalHeader>
              <ModalBody>{this.renderaddnewevent()}</ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  className="btn btn-success submit-btn delete-event"
                  data-dismiss="modal"
                  onClick={() => this.addnewevent()}
                >
                  Create today agenda
                </button>
              </ModalFooter>
            </Modal>
          </div>
        )}
      </>
    );
  }
  rendereventclick() {
    const { event_title } = this.state;

    return (
      <form className="event-form">
        <label>Change event name</label>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={event_title}
            onChange={(event) =>
              this.setState({ event_title: event.target.value })
            }
          />
          <span className="input-group-append">
            <button
              type="button"
              className="btn btn-success btn-md"
              onClick={() => this.clickupdateevent()}
            >
              Save
            </button>
          </span>
        </div>
      </form>
    );
  }
  renderaddnewevent() {
    const { event_title, category_color, event_start_time, event_end_time } =
      this.state;

    return (
      <form>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label className="control-label">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={event_title}
                onChange={(event) =>
                  this.setState({ event_title: event.target.value })
                }
              />
            </div>{" "}
            <div className="form-group">
              <label className="control-label">Start Time</label>
              <input
                className="form-control"
                type="time"
                name="startTime"
                value={event_start_time}
                onChange={(event) =>
                  this.setState({ event_start_time: event.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label className="control-label">End Time</label>
              <input
                className="form-control"
                type="time"
                name="endTime"
                value={event_end_time}
                onChange={(event) =>
                  this.setState({ event_end_time: event.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="control-label">Category</label>
              <select
                className="select form-control"
                name="category"
                value={category_color}
                onChange={(event) =>
                  this.setState({ category_color: event.target.value })
                }
              >
                <option value="bg-danger">Danger</option>
                <option value="bg-success">Success</option>
                <option value="bg-purple">Purple</option>
                <option value="bg-primary">Primary</option>
                <option value="bg-pink">Pink</option>
                <option value="bg-info">Info</option>
                <option value="bg-inverse">Inverse</option>
                <option value="bg-orange">Orange</option>
                <option value="bg-brown">Brown</option>
                <option value="bg-teal">Teal</option>
                <option value="bg-warning">Warning</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(AdminDashboard);
