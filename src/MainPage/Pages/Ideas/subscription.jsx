import "./subscription.css";
import React, { useState, useEffect, useRef } from "react";
import { Route, withRouter, Link, useHistory } from "react-router-dom";
import Profile from "./idea.png";
import pros from "./pros.png";
import cons from "./cons.png";
import Back from "./leftarrow.png";
import Changeplanmodal from "./changeplanmodal";
import Addnewcardmodal from "./addnewcardmodal";
import Paymentmodemodal from "./paymentmodemodal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Cookies from "js-cookie";
import { loginId, subscriptionData } from "../../../reducers/ConstantSlice";
import { gql, useMutation } from "@apollo/client";
import { apiURI } from "../../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Wallet from "./Wallet";
import Container from "react-bootstrap/Container";
var ethereumBlockies = require("ethereum-blockies");

const Subscription = ({ plans, setplans, profileToggle, setprofileToggle }) => {
  const loginId = useSelector((state) => state.constVar.loginId);
  const subscriptionData = useSelector(
    (state) => state.constVar.subscriptionData
  );

  const [termStarter, settermStarter] = useState("MONTHLY");
  const [termPro, settermPro] = useState("MONTHLY");
  const [currentTerm, setcurrentTerm] = useState("");
  const [currentPlan, setcurrentPlan] = useState("");
  const [show, setShow] = useState(false);
  const [showCard, setshowCard] = useState(false);
  const [showpayment, setshowpayment] = useState(false);
  const [planDet, setplanDet] = useState();
  const [value, setValue] = useState("");
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const dispatch = useDispatch();

  

  const handleCloseShow = () => {
    setShow(false);
  };
  const handleShow = () => {
    console.log("create modal");
    setShow(true);
  };

  const handleCloseShowCard = () => {
    setshowCard(false);
  };
  const handleCloseShowPayment = () => {
    setshowpayment(false);
  };
  const handleShowCard = () => {
    console.log("create modal");
    setshowCard(true);
  };

  const getStarted = (e) => {
    console.log("plan:", e);
    setcurrentPlan(e);
    if (e === "ULTIMATE") {
      setcurrentTerm("ONE_TIME");
    } else if (e === "ELITE") {
      setcurrentTerm(termStarter);
    } else if (e === "MASTER") {
      setcurrentTerm(termPro);
    }
    setshowpayment(true);
  };

  const makePayment = (mode) => {
    console.log(
      "currentplan:",
      currentPlan,
      "currentTerm:",
      currentTerm,
      "country",
      value.label,
      mode
    );
    try {
      var query = `
            mutation CreateSubscription($input: SubscriptionInput) {
                createSubscription(input: $input)
            }
          `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-power": process.env.POWER_KEY,
          "x-domain-agent": process.env.DOMAIN_AGENT,
          "x-strict-origin-name": process.env.ORIGIN_NAME,
          "x-range-name": process.env.RANGE_NAME,
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              user_id: loginId,
              plan_type: currentTerm,
              plan_name: currentPlan,
              is_India: value?.label === "India" ? true : false,
              isCrypto: mode === "CRYPTO" ? true : false,
            },
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          console.log(data?.data?.createSubscription, "sublink");
          if (data?.data?.createSubscription === "Success") {
            toast.success("Please check you mail for payment link", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            // alert("Please Check your mail for Payment link")
          } else {
            window.location.replace(data?.data?.createSubscription);
          }
        });
    } catch (error) {
      console.log(error, "error");
    }

    setshowpayment(false);
  };

  const getSubscriptionDetails = () => {
    console.log("subscription called");
    try {
      var query = `
            query Query($userId: ID) {
                getSubscriptionDetails(user_id: $userId) {
                user_id
                user_email
                plan_name
                plan_type
                start_date
                end_date
                status
                }
                }
          `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-power": process.env.POWER_KEY,
          "x-domain-agent": process.env.DOMAIN_AGENT,
          "x-strict-origin-name": process.env.ORIGIN_NAME,
          "x-range-name": process.env.RANGE_NAME,
        },
        body: JSON.stringify({
          query,
          variables: {
            userId: loginId,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          console.log(data?.data?.getSubscriptionDetails, "sub");
          setplanDet(data?.data?.getSubscriptionDetails);

          const startdate = new Date(
            data?.data?.getSubscriptionDetails?.start_date * 1000
          );
          const enddate = new Date(
            data?.data?.getSubscriptionDetails?.end_date * 1000
          );
          const year1 = startdate.getFullYear();
          const month1 = startdate.getMonth() + 1;
          const day1 = startdate.getDate();
          const year2 = enddate.getFullYear();
          const month2 = enddate.getMonth() + 1;
          const day2 = enddate.getDate();
          setstartdate(
            `${year1}-${month1.toString().padStart(2, "0")}-${day1
              .toString()
              .padStart(2, "0")}`
          );
          setenddate(
            `${year2}-${month2.toString().padStart(2, "0")}-${day2
              .toString()
              .padStart(2, "0")}`
          );
          localStorage.setItem(
            "subscriptiondata",
            data?.data?.getSubscriptionDetails?.plan_name
          );
          dispatch(subscriptionData(data?.data?.getSubscriptionDetails));
          // Cookies.set('subscriptiondata', data?.data?.getSubscriptionDetails?.plan_name);
          // Cookies.set('subscriptiondata', { subdt: data?.data?.getSubscriptionDetails?.plan_name,});
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getSubscriptionDetails();
    console.log("login Id", loginId);
  }, [loginId]);

  useEffect(() => {
    setprofileToggle(false);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const canceledParam = urlParams.get("canceled");
    const successParam = urlParams.get("success");
    if (successParam === "true") {
      toast.success("Subscribed Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    if (canceledParam === "true") {
      toast.error("Payment Cancelled", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  return (
    <>
      <div className="mainideabg subscription" style={{overflowX:"hidden"}}>
        <div className="content container-fluid cs t">
          <div className="mb-4">
            <Link to="/Idealist">
              <img style={{ width: "30px" }} src={Back}></img>{" "}
            </Link>
          </div>
          <div>
            <div className="csnavsub">
              <Link to="/dashboard">
                <button className="routeButtoncsi mr-2 mb-2">
                  Switch to Fundraising
                </button>
              </Link>
              <Wallet />
              <Nav
                className=" my-2 my-lg-0 d-flex"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <div>
                  <div
                    onClick={() => setprofileToggle(!profileToggle)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      style={{
                        width: "37px",
                        marginLeft: "10px",
                        borderRadius: "50%",
                        border: "solid 2px grey",
                      }}
                      src={Profile}
                    ></img>
                  </div>
                  <div
                    className="dpd"
                    style={{
                      zIndex: "5",
                      width: "195px",
                      display: profileToggle ? "block" : "none",
                    }}
                  >
                    <div className="profileul">
                      <p style={{ cursor: "pointer" }}>
                        Email :{" "}
                        <span
                          style={{
                            fontSize: "13px",
                            overflowWrap: "break-word",
                            color: "grey",
                          }}
                        >
                            {planDet?.user_email}
                        </span>
                      </p>
                      {/* <Link to="/subscription"><p style={{ cursor: "pointer" }}>Subscription</p></Link> */}
                      <Link to="/login">
                        <p style={{ cursor: "pointer" }}>Logout</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </Nav>
            </div>
          </div>
        </div>

        
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/home">
              <img style={{ width: "30px" }} src={Back}></img>{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle style={{ border: "none" }} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Link to="/dashboard">
                <button className="routeButtoncsi mr-2 mb-2">
                  Switch to Fundraising
                </button>
              </Link>
              <Wallet />

              <NavDropdown title="Profile">
                <NavDropdown.Item>
                  Email {":"}{" "}
                  {planDet?.user_email}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/subscription">Subscription</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/login"> Logout</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <div className="mb-4">
          <h2
            className="mb-2 ml-3"
            style={{ color: "#333333", fontWeight: "600" }}
          >
            Subscription
          </h2>
        </div>
        <div className="content container-fluid cs">
          {/* <div className="icon"></div> */}
          <div className="mb-4 d-flex">
            {plans == "plans" ? (
              <>
                {planDet?.plan_name === "FREE" ? (
                  <button
                    className="planbtactive"
                    onClick={() => setplans("plans")}
                  >
                    Plans
                  </button>
                ) : (
                  ""
                )}
                <button className="planbt" onClick={() => setplans("myplans")}>
                  My Plans
                </button>
              </>
            ) : plans == "myplans" ? (
              <>
                {planDet?.plan_name === "FREE" ? (
                  <button className="planbt" onClick={() => setplans("plans")}>
                    Plans
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="planbtactive"
                  onClick={() => setplans("myplans")}
                >
                  My Plans
                </button>
              </>
            ) : (
              <></>
            )}
          </div>

          <hr
            style={{
              background: "#979797",
              marginTop: "37px",
              marginBottom: "37px",
            }}
          ></hr>

          {plans == "plans" ? (
            <div className="row">
              {planDet?.plan_name === "FREE" ? (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div
                    className="cardplan"
                    style={{ border: "1px solid #2AC000" }}
                  >
                    {/* <div className="featured-ribbon top-left top-right bottom-left bottom-right sticky shadow ">Best Value</div> */}

                    <div style={{ textAlignLast: "end" }}></div>
                    <h6 style={{ color: "#2AC000" }}>Current Plan</h6>
                    <h2 className="planhead" style={{ height: "86px" }}>
                      FREE
                    </h2>
                    {/* <p className="plandet"><span className="high">$149</span> One Time Payment</p> */}

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ULTIMATE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="cardplan">
                    <div style={{ textAlignLast: "end" }}>
                      {/* <button >MONTHLY </button>
                            <button >YEARLY</button> */}
                    </div>
                    <h6 style={{ color: "#2AC000", visibility: "hidden" }}>
                      Current Plan
                    </h6>
                    <h2 className="planhead" style={{ height: "86px" }}>
                      FREE
                    </h2>

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ULTIMATE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}

              {planDet?.plan_name === "ULTIMATE" ? (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div
                    className="cardplan"
                    style={{ border: "1px solid #2AC000" }}
                  >
                    <h6 style={{ color: "#2AC000" }}>Current Plan</h6>
                    <div style={{ textAlignLast: "end" }}>
                      {/* <button >MONTHLY </button>
                                <button >YEARLY</button> */}
                    </div>

                    <h2 className="planhead">Ultimate</h2>
                    <p className="plandet">
                      <span className="high">$149</span> One Time Payment
                    </p>

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ULTIMATE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="cardplan">
                    <h6></h6>
                    <div style={{ textAlignLast: "end" }}>
                      {/* <button >MONTHLY </button>
                            <button >YEARLY</button> */}
                    </div>
                    <h6 style={{ color: "#2AC000", visibility: "hidden" }}>
                      Current Plan
                    </h6>
                    <h2 className="planhead">Ultimate</h2>
                    <p className="plandet">
                      <span className="high">$149</span> One Time Payment
                    </p>

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ULTIMATE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}
              {planDet?.plan_name === "ELITE" ? (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div
                    className="cardplan"
                    style={{ border: "1px solid #2AC000" }}
                  >
                    <h6 style={{ color: "#2AC000" }}>Current Plan</h6>
                    <div style={{ textAlignLast: "end" }}>
                      {termStarter == "MONTHLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="termactive"
                            onClick={() => settermStarter("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="term"
                            onClick={() => settermStarter("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : termStarter == "YEARLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="term"
                            onClick={() => settermStarter("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="termactive"
                            onClick={() => settermStarter("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <h2 className="planhead">Elite</h2>
                    {termStarter == "MONTHLY" ? (
                      <p className="plandet">
                        <span className="high">$49/Month</span>
                      </p>
                    ) : termStarter == "YEARLY" ? (
                      <p className="plandet">
                        <span className="high">$399/Year</span>
                      </p>
                    ) : (
                      ""
                    )}

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ELITE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="cardplan">
                    <h6></h6>
                    <div style={{ textAlignLast: "end" }}>
                      {termStarter == "MONTHLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="termactive"
                            onClick={() => settermStarter("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="term"
                            onClick={() => settermStarter("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : termStarter == "YEARLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="term"
                            onClick={() => settermStarter("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="termactive"
                            onClick={() => settermStarter("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h6 style={{ color: "#2AC000", visibility: "hidden" }}>
                      Current Plan
                    </h6>
                    <h2 className="planhead">Elite</h2>
                    {termStarter == "MONTHLY" ? (
                      <p className="plandet">
                        <span className="high">$49/Month</span>
                      </p>
                    ) : termStarter == "YEARLY" ? (
                      <p className="plandet">
                        <span className="high">$399/Year</span>
                      </p>
                    ) : (
                      ""
                    )}

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={cons}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("ELITE");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}

              {planDet?.plan_name === "MASTER" ? (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                  <div
                    className="cardplan"
                    style={{ border: "1px solid #2AC000" }}
                  >
                    <h6 style={{ color: "#2AC000" }}>Current Plan</h6>
                    <div style={{ textAlignLast: "end" }}>
                      {termPro == "MONTHLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="termactive"
                            onClick={() => settermPro("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="term"
                            onClick={() => settermPro("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : termPro == "YEARLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="term"
                            onClick={() => settermPro("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="termactive"
                            onClick={() => settermPro("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <h2 className="planhead">Master</h2>
                    {termPro == "MONTHLY" ? (
                      <p className="plandet">
                        <span className="high">$249/Month</span>
                      </p>
                    ) : termPro == "YEARLY" ? (
                      <p className="plandet">
                        <span className="high">$2499/Year</span>
                      </p>
                    ) : (
                      ""
                    )}

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("MASTER");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                  <div className="cardplan">
                    <h6></h6>
                    <div style={{ textAlignLast: "end" }}>
                      {termPro == "MONTHLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="termactive"
                            onClick={() => settermPro("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="term"
                            onClick={() => settermPro("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : termPro == "YEARLY" ? (
                        <div
                          style={{
                            backgroundColor: "#f9ecff",
                            width: "auto",
                            float: "right",
                            borderRadius: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            className="term"
                            onClick={() => settermPro("MONTHLY")}
                          >
                            MONTHLY
                          </button>
                          <button
                            className="termactive"
                            onClick={() => settermPro("YEARLY")}
                          >
                            YEARLY
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h6 style={{ color: "#2AC000", visibility: "hidden" }}>
                      Current Plan
                    </h6>
                    <h2 className="planhead">Master</h2>
                    {termPro == "MONTHLY" ? (
                      <p className="plandet">
                        <span className="high">$249/Month</span>
                      </p>
                    ) : termPro == "YEARLY" ? (
                      <p className="plandet">
                        <span className="high">$2499/Year</span>
                      </p>
                    ) : (
                      ""
                    )}

                    <h3 className="features">Features</h3>
                    <div className="points">
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to fundraising platform
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access complete reviews of the guardians
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Access to Four investor pitching sessions
                        </p>
                      </div>

                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          {" "}
                          Two private sessions with top investors each quarter{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          $25,000 worth AWS Credits and more{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Your very own dedicated investor relationship manager
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          A valuation report from a certified expert{" "}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <img className="featurepointimg" src={pros}></img>
                        <p className="featurepoints">
                          Support in improving your pitch deck for maximum
                          impact
                        </p>
                      </div>
                    </div>
                    <button
                      className="getstarted"
                      onClick={() => {
                        getStarted("MASTER");
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : plans == "myplans" ? (
            <div>
              <h2
                className="mb-4 mt-4"
                style={{ color: "#333333", fontWeight: "600" }}
              >
                My Plans
              </h2>

              <div className="myplan mb-4">
                <div className="planFlex">
                  <div>
                    <h3 className="billinfoh">Plan Details</h3>
                    <p className="billinfop">{planDet?.plan_name}</p>
                  </div>
                  {planDet?.plan_name === "FREE" ? (
                    ""
                  ) : planDet?.plan_name === "ULTIMATE" ? (
                    <></>
                  ) : (
                    <>
                      <div>
                        <h3 className="billinfoh">Plan Type</h3>
                        <p className="billinfop">{planDet?.plan_type}</p>
                      </div>
                      <div>
                        <h3 className="billinfoh">Start Date</h3>
                        <p className="billinfop">{startdate}</p>
                      </div>
                      <div>
                        <h3 className="billinfoh">End Date</h3>
                        <p className="billinfop">{enddate}</p>
                      </div>
                    </>
                  )}

                  <div style={{ width: "400px" }}>
                    <button className="changeplan" onClick={handleShow}>
                      Upgrade
                    </button>
                  </div>
                </div>
<div className="row">
                {planDet?.plan_name === "FREE" ? (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div className="cardMyPlan">
                      <div style={{ textAlignLast: "end" }}></div>

                      <h3 className="features">Features</h3>
                      <span className="itemFeature">
                        The following features are included in the current plan:
                      </span>
                      <div
                        className="points row"
                        style={{ width: "100%", marginTop: "15px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Access to fundraising platform
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            Access complete reviews of the guardians
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            Access to Four investor pitching sessions
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            {" "}
                            Two private sessions with top investors each quarter{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            $25,000 worth AWS Credits and more{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            Your very own dedicated investor relationship
                            manager
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            A valuation report from a certified expert{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={cons}></img>
                          <p className="featurepoints">
                            Support in improving your pitch deck for maximum
                            impact
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : planDet?.plan_name === "ULTIMATE" ? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="cardMyPlan">
                      <div style={{ textAlignLast: "end" }}></div>

                      <h3 className="features">Features</h3>

                      <span className="itemFeature">
                        The following features are included in the current plan:
                      </span>
                      <div className="points row" style={{ width: "100%" }}>
                        <div
                          className="col-xl-5 col-lg-5"
                          style={{ marginTop: "15px" }}
                        >
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access to fundraising platform
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access complete reviews of the guardians
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access to Four investor pitching sessions
                            </p>
                          </div>
                        </div>

                        <div
                          className="col-xl-5 col-lg-5"
                          style={{ marginTop: "15px" }}
                        >
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              {" "}
                              Two private sessions with top investors each
                              quarter{" "}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              $25,000 worth AWS Credits and more{" "}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              Your very own dedicated investor relationship
                              manager
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              A valuation report from a certified expert{" "}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              Support in improving your pitch deck for maximum
                              impact
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : planDet?.plan_name === "ELITE" ? (
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="cardMyPlan">
                      <h3 className="features">Features</h3>
                      <div className="points row" style={{ width: "100%" }}>
                        <span className="itemFeature">
                          The following features are included in the current
                          plan:
                        </span>
                        <div
                          className="col-xl-5 col-lg-5"
                          style={{ marginTop: "15px " }}
                        >
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access to fundraising platform
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access complete reviews of the guardians
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              Access to Four investor pitching sessions
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              {" "}
                              Two private sessions with top investors each
                              quarter{" "}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={pros}></img>
                            <p className="featurepoints">
                              $25,000 worth AWS Credits and more{" "}
                            </p>
                          </div>
                        </div>

                        <div
                          className=" col-xl-5 col-lg-5 "
                          style={{ marginTop: "15px " }}
                        >
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              Your very own dedicated investor relationship
                              manager
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              A valuation report from a certified expert{" "}
                            </p>
                          </div>
                          <div style={{ display: "flex" }}>
                            <img className="featurepointimg" src={cons}></img>
                            <p className="featurepoints">
                              Support in improving your pitch deck for maximum
                              impact
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
                    <div className="cardMyPlan">
                      <h3 className="features">Features</h3>
                      <span className="itemFeature">
                        The following features are included in the current plan:
                      </span>
                      <div
                        className="points row"
                        style={{ width: "100%", marginTop: "15px" }}
                      >
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Access to fundraising platform
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Access complete reviews of the guardians
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Access to Four investor pitching sessions
                          </p>
                        </div>

                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            {" "}
                            Two private sessions with top investors each quarter{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            $25,000 worth AWS Credits and more{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Your very own dedicated investor relationship
                            manager
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            A valuation report from a certified expert{" "}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <img className="featurepointimg" src={pros}></img>
                          <p className="featurepoints">
                            Support in improving your pitch deck for maximum
                            impact
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </div>

              {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h2 className="mb-4 mt-4" style={{ color: "#333333", fontWeight: "600" }}>Card Details</h2>
                                <button className="addcard mt-2 mb-4" onClick={handleShowCard}>Add Card</button>

                            </div> */}
              {/* <div className="addcardinfo mb-4">
                                <div className="cardinfosub mb-2">
                                    <input type="radio"></input>
                                    <div>
                                        <h3 className="billinfoh">Bank</h3>
                                        <p className="billinfop">ICICI</p>
                                    </div>
                                    <div>
                                        <h3 className="billinfoh">Card Number</h3>
                                        <p className="billinfop">*** *** ***1234</p>
                                    </div>
                                    <div style={{ width: "200px" }}>
                                        <button className="changeplan">Edit</button>
                                    </div>
                                </div>
                                <div className="cardinfosub mb-2">
                                    <input type="radio"></input>
                                    <div>
                                        <h3 className="billinfoh">Bank</h3>
                                        <p className="billinfop">ICICI</p>
                                    </div>
                                    <div>
                                        <h3 className="billinfoh">Card Number</h3>
                                        <p className="billinfop">*** *** ***1234</p>
                                    </div>
                                    <div style={{ width: "200px" }}>
                                        <button className="changeplan">Edit</button>
                                    </div>
                                </div>
                            </div> */}
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* <Changeplanmodal
                show={show}
                handleClose={handleCloseShow}
            >


            </Changeplanmodal> */}
        <Paymentmodemodal
          value={value}
          setValue={setValue}
          makePayment={makePayment}
          showpayment={showpayment}
          handleCloseShowPayment={handleCloseShowPayment}
          setShow={setShow}
        ></Paymentmodemodal>

        <Addnewcardmodal
          showCard={showCard}
          handleCloseShowCard={handleCloseShowCard}
        ></Addnewcardmodal>
        <Modal
          show={show}
          onHide={handleCloseShow}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="modal-header" style={{borderBottom:'none'}}>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseShow}
            > 
              <span aria-hidden="true" style={{fontSize:'36px'}}>&times;</span>
            </button>
          </div>
          <Modal.Body closeButton>
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="cardplan">
                  <div style={{ textAlignLast: "end" }}>
                    {/* <button >MONTHLY </button>
                                <button >YEARLY</button> */}
                  </div>
                  <h2 className="planhead">Ultimate</h2>
                  <p className="plandet">
                    <span className="high">$149</span> One Time Payment
                  </p>

                  <h3 className="features">Features</h3>
                  <div className="points">
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to fundraising platform
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access complete reviews of the guardians
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to Four investor pitching sessions
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        {" "}
                        Two private sessions with top investors each quarter{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        $25,000 worth AWS Credits and more{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        Your very own dedicated investor relationship manager
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        A valuation report from a certified expert{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        Support in improving your pitch deck for maximum impact
                      </p>
                    </div>
                  </div>
                  <button
                    className="getstarted"
                    onClick={() => {
                      getStarted("ULTIMATE");
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="cardplan">
                  <div style={{ textAlignLast: "end" }}>
                    {termStarter == "MONTHLY" ? (
                      <div
                        style={{
                          backgroundColor: "#f9ecff",
                          width: "auto",
                          float: "right",
                          borderRadius: "15px",
                        }}
                      >
                        <button
                          className="termactive"
                          onClick={() => settermStarter("MONTHLY")}
                        >
                          MONTHLY
                        </button>
                        <button
                          className="term"
                          onClick={() => settermStarter("YEARLY")}
                        >
                          YEARLY
                        </button>
                      </div>
                    ) : termStarter == "YEARLY" ? (
                      <div
                        style={{
                          backgroundColor: "#f9ecff",
                          width: "auto",
                          float: "right",
                          borderRadius: "15px",
                        }}
                      >
                        <button
                          className="term"
                          onClick={() => settermStarter("MONTHLY")}
                        >
                          Montly
                        </button>
                        <button
                          className="termactive"
                          onClick={() => settermStarter("YEARLY")}
                        >
                          YEARLY
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <h2 className="planhead">Elite</h2>
                  {termStarter == "MONTHLY" ? (
                    <p className="plandet">
                      <span className="high">$49/Month</span>
                    </p>
                  ) : termStarter == "YEARLY" ? (
                    <p className="plandet">
                      <span className="high">$399/Year</span>
                    </p>
                  ) : (
                    ""
                  )}
                  <h3 className="features">Features</h3>
                  <div className="points">
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to fundraising platform
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access complete reviews of the guardians
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to Four investor pitching sessions
                      </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        {" "}
                        Two private sessions with top investors each quarter{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        $25,000 worth AWS Credits and more{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        Your very own dedicated investor relationship manager
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        A valuation report from a certified expert{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={cons}></img>
                      <p className="featurepoints">
                        Support in improving your pitch deck for maximum impact
                      </p>
                    </div>
                  </div>
                  <button
                    className="getstarted"
                    onClick={() => {
                      getStarted("ELITE");
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="cardplan">
                  <div style={{ textAlignLast: "end" }}>
                    {termPro == "MONTHLY" ? (
                      <div
                        style={{
                          backgroundColor: "#f9ecff",
                          width: "auto",
                          float: "right",
                          borderRadius: "15px",
                        }}
                      >
                        <button
                          className="termactive"
                          onClick={() => settermPro("MONTHLY")}
                        >
                          MONTHLY
                        </button>
                        <button
                          className="term"
                          onClick={() => settermPro("YEARLY")}
                        >
                          YEARLY
                        </button>
                      </div>
                    ) : termPro == "YEARLY" ? (
                      <div
                        style={{
                          backgroundColor: "#f9ecff",
                          width: "auto",
                          float: "right",
                          borderRadius: "15px",
                        }}
                      >
                        <button
                          className="term"
                          onClick={() => settermPro("MONTHLY")}
                        >
                          MONTHLY
                        </button>
                        <button
                          className="termactive"
                          onClick={() => settermPro("YEARLY")}
                        >
                          YEARLY
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <h2 className="planhead">Master</h2>
                  {termPro == "MONTHLY" ? (
                    <p className="plandet">
                      <span className="high">$249/Month</span>
                    </p>
                  ) : termPro == "YEARLY" ? (
                    <p className="plandet">
                      <span className="high">$2499/Year</span>
                    </p>
                  ) : (
                    ""
                  )}

                  <h3 className="features">Features</h3>
                  <div className="points">
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to fundraising platform
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access complete reviews of the guardians
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Access to Four investor pitching sessions
                      </p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        {" "}
                        Two private sessions with top investors each quarter{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        $25,000 worth AWS Credits and more{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Your very own dedicated investor relationship manager
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        A valuation report from a certified expert{" "}
                      </p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <img className="featurepointimg" src={pros}></img>
                      <p className="featurepoints">
                        Support in improving your pitch deck for maximum impact
                      </p>
                    </div>
                  </div>
                  <button
                    className="getstarted"
                    onClick={() => {
                      getStarted("MASTER");
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        
        </Modal>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default withRouter(Subscription);
