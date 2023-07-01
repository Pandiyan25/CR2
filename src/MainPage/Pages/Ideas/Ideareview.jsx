import "./ideareview.css";
import React, { useState, useEffect, useMemo } from "react";
import { Route, withRouter } from "react-router-dom";
import Ideacreatemodal from "./Ideacreatemodal";
import Ideabox from "./Ideabox";
import { ToastContainer, toast } from "material-react-toastify";
import { useFetch } from "usehooks-ts";
import { loginId } from "../../../reducers/ConstantSlice";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { apiURI } from "../../../config/config";
import reviewers from "./no-of-reviewers.png";
import overalscore from "./overall-score.png";
import cons from "./cons.png";
import pros from "./pros.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import GaugeChart from "react-gauge-chart";
import { Button, Modal } from "react-bootstrap";
import Back from "./leftarrow.png";
import { Link } from "react-router-dom";
import Wallet from "./Wallet";
import Profile from "./idea.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useHistory } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
const Ideareview = ({ plans, setplans }) => {
  const [show, setShow] = useState(false);
  const [Paid, setPaid] = useState(false);
  const [upgradeBtn, setUpgradeBtn] = useState(false);
  const ideaID = useSelector((state) => state.constVar.currentIdeaId);
  const loginId = useSelector((state) => state.constVar.loginId);
  const [profileToggle, setprofileToggle] = useState(false);
  const [projectDetalsData, setProjectDetalsData] = useState([]);
  const [ratings, setratings] = useState();
  const [allRating, setallRating] = useState([]);
  const [ratingIndex, setratingIndex] = useState(0);

  const [ideaDetails, setIdeaDetails] = useState();
  const [togglebtn, setTogglebtn] = useState("review");

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upgrade your current plan to avail more benefits
    </Tooltip>
  );

  const getSubscriptionDetails = () => {
    console.log("subscription called");
    try {
      var query = `
        query Query($userId: ID) {
            getSubscriptionDetails(user_id: $userId) {
            user_id
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
          console.log(data?.data?.getSubscriptionDetails?.plan_name, "sub");
          if (data?.data?.getSubscriptionDetails?.plan_name === "FREE") {
            setPaid(false);
          } else {
            setPaid(true);
          }
          if (
            data?.data?.getSubscriptionDetails?.plan_name === "FREE" ||
            data?.data?.getSubscriptionDetails?.plan_name === "ULTIMATE" ||
            data?.data?.getSubscriptionDetails?.plan_name === "ELITE"
          ) {
            setUpgradeBtn(true);
          } else {
            setUpgradeBtn(false);
          }
          // if(data?.data?.getSubscriptionDetails?.plan_name!=="FREE"){
          getAllRatedIdeas();
          // }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const getAllRatedIdeas = async () => {
    console.log("inside get");
    try {
      var query = `
            query IdeaRating($idea: ID, $allRatedIdeasIdea: ID) {
                getIdeaRatingsScore(idea: $idea) {
                average_score
                one_line_statement
                problem_statement
                solution_statement
                whitepaper
                pitchdeck
                product_rating
                competitive_advantage
                
                }
                allRatedIdeas(idea: $allRatedIdeasIdea) {
                    createdAt
                reviewer_wallet
                one_line_statement
                problem_statement
                solution_statement
                whitepaper
                pitchdeck
                product_rating
                competitive_advantage
                product_worth
                pros
                cons
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
            // "idea": "63e2209fc6175dc2e890b0a8",
            // "allRatedIdeasIdea": "63e2209fc6175dc2e890b0a8"

            idea: ideaID,
            allRatedIdeasIdea: ideaID,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then(async (data) => {
          console.log(data, "inside get");
          setratings(data?.data?.getIdeaRatingsScore);
          setallRating(data?.data?.allRatedIdeas);
        });
    } catch (error) {}
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    console.log("clicked");
    setShow(true);
  };

  const nextRating = () => {
    if (ratingIndex == allRating?.length - 1) {
      setratingIndex(allRating?.length - 1);
    } else {
      setratingIndex(ratingIndex + 1);
    }
    console.log(ratingIndex, "rating index");
  };
  const previousRating = () => {
    if (ratingIndex == 0) {
      setratingIndex(0);
    } else {
      setratingIndex(ratingIndex - 1);
    }
    console.log(ratingIndex, "rating index");
  };

  const history = useHistory();
  const upgradePlans = () => {
    setplans("plans");
    history.push("/subscription");
  };

  const getProjectDetailsFunc = () => {
    try {
      var query = `
          query getUser($id: ID) {
            User :getUser(_id: $id) {
              _id
              email
              password
              role
              contact
              first_name
              last_name
              role_in_organization
              fund_description
              minimum_investment_size
              project_invested
              type_of_fund
              preferred_sectors {
                value
              }
              fund_name
              asset_under_management
              projected_invested_till_date
              fund_head_quarters
              team_size
              linkedin
              linkedin_link
              website_link
              twitter_link
              education
              experience
              industry
              experience_in_blockchain
              current_position
              past_organisation_tags
              current_organisation
              current_income
              wallet_address
              current_location
              nationality
              id_proof
              self_description
              id_number
              aum
              profile_pic
              referral_code
            },
            
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
            id: loginId,
          },
          // allNotification:allNotification(user: $id){
          //   message

          // }
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          // debugger;
          console.log("ProjectGetFunctiondata", data?.data);
          if (data?.data?.User != null && data?.data?.User != undefined) {
            setProjectDetalsData([data?.data?.User]);
            console.log(data?.data?.User, "email getting");
          } else {
            setProjectDetalsData([]);
          }
        });
    } catch (error) {
      console.log(
        error,
        "ProjectGetFunctionError  in Dashboard in investors error"
      );
    }
  };

  const getIdeaDetails = async () => {
    try {
      var query = `
                    query GetIdea($id: ID) {
                        getIdea(_id: $id) {
                        idea_name
                        category{
                            value
                        }
                        idea_logo
                        one_line_desc
                        product_type
                        problem_statement
                        problem_solution
                        target_customers
                        whitepaper_link
                        pitchdeck_link
                        liveProduct_link
                        revenueModel_type
                        competition_links
                        competition_reason
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
            id: ideaID,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then(async (data) => {
          console.log(data?.data?.getIdea, "Api Call");
          setIdeaDetails(data?.data?.getIdea);
          // setratings(data?.data?.getIdeaRatingsScore);
          // setallRating(data?.data?.allRatedIdeas);
        });
    } catch (error) {}
  };

  console.log(ideaDetails, "IdealDetails");

  useEffect(() => {
    console.log("login id from redux", loginId);
    console.log(ideaID, "idearev");
    getSubscriptionDetails();
    getIdeaDetails();
    getProjectDetailsFunc();
  }, [loginId, ideaID]);

  return (
    <div className="mainideabg review">
      <div className="content container-fluid cs t">
        <div className="row mb-2">
          <div className="col-lg-12">
            <Link to="/Idealist">
              <img style={{ width: "30px" }} src={Back}></img>{" "}
            </Link>
          </div>
        </div>
        <div>
          <div className="csnavsub">
            {upgradeBtn ? (
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <button
                    variant="success"
                    onClick={upgradePlans}
                    className="upgradeBtn mr-2 mb-2"
                  >
                    Upgrade
                  </button>
                </OverlayTrigger>
              </>
            ) : (
              <></>
            )}

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
                <div onClick={() => setprofileToggle(!profileToggle)}>
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
                    {/* <p style={{cursor:"pointer"}}>User Id : {projectDetalsData.length > 0 && projectDetalsData[ratingIndex]?.id_number}</p>
    <p style={{cursor:"pointer"}}>Name : {projectDetalsData.length > 0 && projectDetalsData[ratingIndex]?.first_name}</p> */}
                    <p style={{ cursor: "pointer" }}>
                      Email :{" "}
                      <span
                        style={{
                          fontSize: "13px",
                          overflowWrap: "break-word",
                          color: "grey",
                        }}
                      >
                        {projectDetalsData?.length > 0 &&
                          projectDetalsData[0]?.email}
                      </span>
                    </p>
                    <Link to="/subscription">
                      <p style={{ cursor: "pointer" }}>Subscription</p>
                    </Link>
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
          <Navbar.Brand>
          {upgradeBtn ? (
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <button
                    variant="success"
                    onClick={upgradePlans}
                    className="upgradeBtn"
                  >
                    Upgrade
                  </button>
                </OverlayTrigger>
              </>
            ) : (
              <></>
            )}
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
                  {projectDetalsData.length > 0 && projectDetalsData[0]?.email}
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

      <div className="mb-4 d-flex" style={{ padding: "0px 15px 0px 15px" }}>
        <button
          className={togglebtn === "review" ? "planbtactive" : "planbt"}
          onClick={() => setTogglebtn("review")}
        >
          Your Review
        </button>
        <button
          className={togglebtn === "product" ? "planbtactive" : "planbt"}
          onClick={() => setTogglebtn("product")}
        >
          Your Product
        </button>
      </div>

      {togglebtn === "review" && (
        <>
          <div className="content container-fluid cs">
            <div className="mb-4">
              {/* <h2 className="mb-2" style={{ color: "#333333", fontWeight: "600" }}>Virtual Reality</h2>
                    <p style={{ color: "#707070", fontWeight: "400", }}>Get your basic rights. Express your ideas, get reviewed by the experts and improve it</p> */}
            </div>
            <div className="row mb-2">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
                <div className="ideadetTop mb-2 ">
                  <div>
                    <p
                      className="mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#707070",
                      }}
                    >
                      Overall Score
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {(ratings?.average_score / 2).toFixed(1)}/5
                    </p>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      float: "right",
                      margin: "0px 0px 0px 0px",
                    }}
                  >
                    <img src={overalscore} style={{ width: "100%" }}></img>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
                <div className="ideadetTop mb-2 ">
                  <div>
                    <p
                      className="mb-2"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#707070",
                      }}
                    >
                      No of Reviewers
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      {allRating?.length}
                    </p>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      float: "right",
                      margin: "0px 0px 0px 0px",
                    }}
                  >
                    <img src={reviewers} style={{ width: "100%" }}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content container-fluid cs">
            <div className="row mb-2">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Oneline Statement
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.one_line_statement / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                      }}
                    >
                      It's Confusing
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      Very Clear{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.one_line_statement}.0</p> */}
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Problem Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.problem_statement / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                      }}
                    >
                      It's Confusing
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      Very Clear{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.problem_statement}.0</p> */}
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Solution Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.solution_statement / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                        width: "80px",
                        textAlign: "center",
                      }}
                    >
                      Not a pressing problem
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      Major Problem{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.solution_statement}</p> */}
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Whitepaper Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.whitepaper / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                      }}
                    >
                      Least Likely
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      Most Likely{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.whitepaper}</p> */}
                </div>
              </div>
            </div>
            <div className="row justify-content-xl-center justify-content-lg-center ">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    PitchDeck Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.pitchdeck / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                      }}
                    >
                      Poor
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      Outstanding{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.pitchdeck}</p> */}
                </div>
              </div>
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Product Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.product_rating / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                      }}
                    >
                      I won't use it
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                      }}
                    >
                      I will use it{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.product_rating}</p> */}
                </div>
              </div>
              {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                        <div className="ideadet mb-2 cs">
                            <p className="mb-2" style={{ fontSize: "16px", fontWeight: "600", textAlign: "center" }}>Pricing Meter</p>
                            <GaugeChart id="gauge-chart3"
                                nrOfLevels={3}
                                colors={["#6345ED ", "#DC39FC"]}
                                needleColor={"rgb(187 181 215)"}
                                needleBaseColor={"rgb(109 101 149)"}
                                arcWidth={0.2}
                                percent={(ratings?.getIdeaRatingsScore?.one_line_statement)/10}
                                textColor={"black"}
                                hideText={true}
                                cornerRadius={2}
                            />
                            <div>
                                <p style={{ fontSize: "11px", fontWeight: "500", color: "black", float: "left" }}>It's Confusing</p>
                                <p style={{ fontSize: "11px", fontWeight: "500", color: "black", float: "right" }}>Very Clear </p></div>
                            <p className="revval">{0.5}</p>
                        </div>
                    </div> */}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div className="ideadet mb-2 cs">
                  <p
                    className="mb-2"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Competitive Meter
                  </p>
                  <GaugeChart
                    id="gauge-chart3"
                    nrOfLevels={3}
                    colors={["#6345ED ", "#DC39FC"]}
                    needleColor={"rgb(187 181 215)"}
                    needleBaseColor={"rgb(109 101 149)"}
                    arcWidth={0.2}
                    percent={ratings?.competitive_advantage / 10}
                    textColor={"black"}
                    hideText={true}
                    cornerRadius={2}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "left",
                        width: "65px",
                        textAlign: "center",
                      }}
                    >
                      High Competition
                    </p>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "black",
                        float: "right",
                        width: "65px",
                        textAlign: "center",
                      }}
                    >
                      Low Competition{" "}
                    </p>
                  </div>
                  {/* <p className="revval">{ratings?.competitive_advantage}</p> */}
                </div>
              </div>
            </div>

            <div>
              {Paid ? (
                <div>
                  <div className="rate mb-3 ">
                    <div className="row">
                      <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div className="row">
                          <div className="col-6">
                            <p
                              className="mb-2"
                              style={{
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#707070",
                              }}
                            >
                              Reviewed by
                            </p>
                            <p
                              className="mb-0"
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
                                wordWrap: "break-word",
                              }}
                            >
                              {allRating[ratingIndex]?.reviewer_wallet}
                            </p>
                          </div>
                          <div className="col-6">
                            <p
                              className="mb-2"
                              style={{
                                fontSize: "11px",
                                fontWeight: "600",
                                color: "#707070",
                              }}
                            >
                              Date
                            </p>
                            <p
                              className="mb-0"
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              {new Date(
                                parseInt(allRating[ratingIndex]?.createdAt)
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                        <div style={{ float: "right" }}>
                          <button
                            className="routeButtoncsi mr-2"
                            onClick={previousRating}
                          >
                            Previous
                          </button>
                          <button
                            className="routeButtoncsi"
                            onClick={nextRating}
                          >
                            Next
                          </button>
                        </div>
                        {/* <div className="ratedet" style={{ float: "right", display: "flex" }}>
                                            <p className="mb-2 mr-2 pt-2" style={{ fontSize: "11px", fontWeight: "500", color: "#707070" }}>Filter</p>
                                            <select style={{ width: "300px" }}>
                                                <option value>Select</option>
                                                <option value="pending"> Pending </option>
                                                <option value="Approved"> Approved </option>
                                                <option value="Returned"> Returned </option>
                                            </select>
                                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Oneline Statement
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.one_line_statement * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        It's Confusing
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Very Clear{" "}
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Issue Prominence
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.problem_statement * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Not a major issue
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Major pressing issue
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Sucess rate of the solution
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.solution_statement * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Least Likley
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Most Likely
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Whitepaper Rating
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.whitepaper * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Poor
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Outstanding
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      PitchDeck Rating
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.pitchdeck * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Poor
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Outstanding
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Product Utility
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.product_rating * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Least Likely
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Most Likley{" "}
                      </p>
                    </div>
                  </div>

                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Competitive advantage
                    </p>

                    <ProgressBar
                      striped
                      variant="info"
                      animated
                      now={allRating[ratingIndex]?.competitive_advantage * 10}
                    />
                    <div className="mt-2">
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "left",
                        }}
                      >
                        Least Likely
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#707070",
                          float: "right",
                        }}
                      >
                        Most Likely{" "}
                      </p>
                    </div>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <p
                      className="mb-2"
                      style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                      Product worth for{" "}
                    </p>
                    <p>{allRating[ratingIndex]?.product_worth}</p>
                  </div>
                  <div className="ideadet mb-2 cs t">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-2">
                          {" "}
                          <p
                            className="mb-2"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            Pros
                          </p>
                          <ProgressBar
                            className="mb-4"
                            variant="success"
                            now={40}
                            style={{ height: "10px" }}
                          />
                          {allRating[ratingIndex]?.pros.length > 0 &&
                            allRating[ratingIndex]?.pros.map((i, index) => (
                              <div style={{ display: "flex" }}>
                                <img
                                  src={pros}
                                  style={{ width: "20px", height: "20px" }}
                                ></img>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    color: "#707070",
                                  }}
                                  className="mb-4 ml-2"
                                >
                                  {i}
                                </p>
                              </div>
                            ))}
                          {/* <p style={{ fontSize: "15px", fontWeight: "400", color: "#707070" }} className="mb-4 ml-2">{allRating[ratingIndex]?.pros}</p> */}
                        </div>
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-2">
                          {" "}
                          <p
                            className="mb-2"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            Cons
                          </p>
                          <ProgressBar
                            className="mb-4"
                            variant="danger"
                            now={40}
                            style={{ height: "10px" }}
                          />
                          {
                            // allRating[ratingIndex]?.cons.length > 0 &&
                            allRating[ratingIndex]?.cons.map((i, index) => (
                              <div style={{ display: "flex" }}>
                                <img
                                  src={cons}
                                  style={{ width: "20px", height: "20px" }}
                                ></img>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "400",
                                    color: "#707070",
                                  }}
                                  className="mb-4 ml-2"
                                >
                                  {i}
                                </p>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="completeView">
                    <p className="mb-4">
                      Please Upgrade to view complete review
                    </p>
                    <button className="routeButtoncs" onClick={upgradePlans}>
                      Upgrade
                    </button>
                  </div>
                  <div style={{ filter: "blur(8px)" }}>
                    <div className="rate mb-3 ">
                      <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                          <div className="row">
                            <div className="col-4">
                              <p
                                className="mb-2"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  color: "#707070",
                                }}
                              >
                                Reviewed by
                              </p>
                              <p
                                className="mb-0"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                crihon.eth
                              </p>
                            </div>
                            <div className="col-4">
                              <p
                                className="mb-2"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  color: "#707070",
                                }}
                              >
                                Date
                              </p>
                              <p
                                className="mb-0"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                05/Jan/2023
                              </p>
                            </div>
                            <div className="col-4">
                              <p
                                className="mb-2"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  color: "#707070",
                                }}
                              >
                                Time
                              </p>
                              <p
                                className="mb-0"
                                style={{ fontSize: "16px", fontWeight: "600" }}
                              >
                                16:44
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                          <div
                            className="ratedet"
                            style={{ float: "right", display: "flex" }}
                          >
                            <p
                              className="mb-2 mr-2 pt-2"
                              style={{
                                fontSize: "11px",
                                fontWeight: "500",
                                color: "#707070",
                              }}
                            >
                              Filter
                            </p>
                            <select style={{ width: "300px" }}>
                              <option value>Select</option>
                              <option value="pending"> Pending </option>
                              <option value="Approved"> Approved </option>
                              <option value="Returned"> Returned </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Oneline Statement
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          It's Confusing
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Very Clear{" "}
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Issue Prominence
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Not a major issue
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Major pressing issue
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Sucess rate of the solution
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Least Likley
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Most Likely
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Whitepaper Rating
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Poor
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Outstanding
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        PitchDeck Rating
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Poor
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Outstanding
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Product Utility
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Least Likely
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Most Likley{" "}
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Product worth for{" "}
                      </p>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <p
                        className="mb-2"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                      >
                        Competitive advantage
                      </p>

                      <ProgressBar striped variant="info" animated now={45} />
                      <div className="mt-2">
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "left",
                          }}
                        >
                          Least Likely
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            color: "#707070",
                            float: "right",
                          }}
                        >
                          Most Likely{" "}
                        </p>
                      </div>
                    </div>
                    <div className="ideadet mb-2 cs t">
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div className="mb-2">
                            {" "}
                            <p
                              className="mb-2"
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              Pros
                            </p>
                            <ProgressBar
                              className="mb-4"
                              variant="success"
                              now={40}
                              style={{ height: "10px" }}
                            />
                            <div style={{ display: "flex" }}>
                              <img
                                src={pros}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <img
                                src={pros}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <img
                                src={pros}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div className="mb-2">
                            {" "}
                            <p
                              className="mb-2"
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              Cons
                            </p>
                            <ProgressBar
                              className="mb-4"
                              variant="danger"
                              now={40}
                              style={{ height: "10px" }}
                            />
                            <div style={{ display: "flex" }}>
                              <img
                                src={cons}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <img
                                src={cons}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <img
                                src={cons}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                            <div style={{ display: "flex" }}>
                              <img
                                src={cons}
                                style={{ width: "20px", height: "20px" }}
                              ></img>
                              <p
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                  color: "#707070",
                                }}
                                className="mb-4 ml-2"
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <br></br>
          </div>
        </>
      )}

      {togglebtn === "product" && (
        <>
          <section className="section validate-page">
            <div className="container">
              <div className="row border-bottom pb-4">
                <div className="logo-div validate">
                  <img
                    src={ideaDetails.idea_logo}
                    className="logo-validate"
                    alt="logo"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-12">
                  <div className="">
                    <div className="content mt-4">
                      <h4 className="mt-3 ">
                        Project Name :{" "}
                        <span className="ans-validate">
                          {ideaDetails.idea_name == ""
                            ? "Not Provided"
                            : ideaDetails.idea_name}
                        </span>{" "}
                      </h4>
                      <h4 className="mt-3">
                        One Line Description :{" "}
                        <span className="ans-validate">
                          {ideaDetails.one_line_desc == ""
                            ? "Not Providedd"
                            : ideaDetails.one_line_desc}
                        </span>{" "}
                      </h4>
                      <h4 className="mt-3">
                        Product Type :{" "}
                        <span className="ans-validate">
                          {ideaDetails.product_type == ""
                            ? "Not Provided"
                            : ideaDetails.product_type}
                        </span>{" "}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-12">
                  <div className="features feature-primary">
                    <div className="content mt-4">
                      <h4 className=" mt-3">
                        Category :{" "}
                        <span className="ans-validate">
                          <span className="ans-validate">
                            {/* {ideaDetails.category.map(item => item.value + index !== ideaDetails.category.length - 1 && ",")} */}
                            {ideaDetails.category.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.length == 0 ? "Not Provided" : item.value}
                                {index !== ideaDetails.category.length - 1 &&
                                  ","}
                              </React.Fragment>
                            ))}
                          </span>
                        </span>{" "}
                      </h4>
                      <h4 className=" mt-3">
                        White Paper :{" "}
                        <span className="ans-validate">
                          {ideaDetails.whitepaper_link ? (
                            <a
                              href={ideaDetails.whitepaper_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          ) : (
                            <span>Not Provided</span>
                          )}
                        </span>
                      </h4>

                      <h4 className=" mt-3">
                        Pitch Deck :{" "}
                        <span className="ans-validate">
                          {ideaDetails.pitchdeck_link ? (
                            <a
                              href={ideaDetails.pitchdeck_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          ) : (
                            <span>Not Provided</span>
                          )}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-12">
                  <div className="features feature-primary">
                    <div className="content mt-4">
                      <h4 className=" mt-3">
                        Product Link :{" "}
                        <span className="ans-validate">
                          {ideaDetails.pitchdeck_link ? (
                            <a
                              href={ideaDetails.liveProduct_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          ) : (
                            <span>Not Provided</span>
                          )}
                        </span>
                      </h4>
                      <h4 className=" mt-3">
                        Competition Links:{" "}
                        <span className="ans-validate">
                          {ideaDetails.competition_links ? (
                            <a
                              href={ideaDetails.competition_links}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                          ) : (
                            <span>Not Provided</span>
                          )}
                        </span>{" "}
                      </h4>
                      <h4 className=" mt-3">
                        Revenue Module :{" "}
                        <span className="ans-validate">
                          {ideaDetails.revenueModel_type == ""
                            ? "Not Provided"
                            : ideaDetails.revenueModel_type}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mt-4 " style={{ marginTop: "50px" }}>
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 ">
                  <div className="row  pb-2 ">
                    <div className="section-title ">
                      <h4 className="title validate-head-ans mb-3">
                        Problem Statement
                      </h4>

                      <ul className="">
                        {ideaDetails.problem_statement.map((item, index) => (
                          <li key={index}>
                            {index === 0
                              ? "Please update your product details"
                              : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "none",
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                </div>

                <div className="col-lg-12 col-md-12 ">
                  <div className="row  pb-2">
                    <div className="section-title ">
                      <h4 className="title validate-head-ans mb-3">
                        Problem Solution
                      </h4>
                      <ul className="">
                        {ideaDetails.problem_solution.map((item, index) => (
                          <li key={index}>
                            {index === 0
                              ? "Please update your product details"
                              : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  backgroundColor: "black",
                }}
              />
            </div>

            <div className="container mt-4 " style={{ marginTop: "50px" }}>
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12 ">
                  <div className="row  pb-2 ">
                    <div className="section-title ">
                      <h4 className="title validate-head-ans mb-3">
                        Target Audience
                      </h4>

                      <ul className="">
                        {ideaDetails.target_customers.map((item, index) => (
                          <li key={index}>
                            {index === 0
                              ? "Please update your product details"
                              : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "none",
                      height: "1px",
                      backgroundColor: "black",
                    }}
                  />
                </div>

                <div className="col-lg-12 col-md-12 ">
                  <div className="row  pb-2">
                    <div className="section-title ">
                      <h4 className="title validate-head-ans mb-3">
                        Unique Selling Point
                      </h4>
                      <ul className="">
                        {ideaDetails.competition_reason.map((item, index) => (
                          <li key={index}>
                            {index === 0
                              ? "Please update your product details"
                              : item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton style={{ borderBottom: "0px" }}>
          <Modal.Title>Connect Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer style={{ borderTop: "0px", justifyContent: "center" }}>
          {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>CANCEL</button>
                    </div> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withRouter(Ideareview);

// {idea_name: 'Devas Vs Asuras', idea_logo: 'https://dev.crsquare.finance/upload-61001675763687742.jpeg', one_line_desc: 'Mythological game built on indian backset', product_type: 'B2C ', problem_statement: Array(3), …}
