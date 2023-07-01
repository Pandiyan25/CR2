import "./idealist.css";
import React, { useState, useEffect, useMemo } from "react";
import { Route, withRouter } from "react-router-dom";
import Ideacreatemodal from "./Ideacreatemodal";
import Ideabox from "./Ideabox";
import { ToastContainer, toast } from "material-react-toastify";
import { useFetch } from "usehooks-ts";
import { loginId, subscriptionData } from "../../../reducers/ConstantSlice";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { apiURI } from "../../../config/config";
import IdeaDisplay from "./Ideadisplay";
import { Link } from "react-router-dom";
import Wallet from "./Wallet";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Profile from "./idea.png";
import Back from "./leftarrow.png";
import { useHistory } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";

const IdeaList = ({ plans, setplans, profileToggle, setprofileToggle }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [show, setShow] = useState(false);
  const [showideaDisplay, setshowideaDisplay] = useState(false);
  const [imageCoverData, setImageCoverData] = useState("");
  const [imageData, setImageData] = useState("");
  const [allIdeas, setAllIdeas] = useState([]);
  const [allIdeassorted, setAllIdeassorted] = useState([]);
  const [makelivepopup, setmakelivepopup] = useState(false);

  const [currentIdeaData, setcurrentIdeaData] = useState();

  const [whitePaper, setWhitepaper] = useState("");
  const [whitePaperLink, setWhitePaperLink] = useState("");
  const [pitchDeck, setpitchDeck] = useState("");
  const [pitchDeckLink, setPitchDeckLink] = useState("");

  const [projectDetalsData, setProjectDetalsData] = useState([]);

  const [liveProduct, setliveProduct] = useState("");
  const [liveProductLink, setLiveProductLink] = useState("");
  const [sortNameTrue, setSortNameTrue] = useState(false);
  const [revenueModel, setrevenueModel] = useState("");
  const [revenueModelData, setRevenueModelData] = useState("");
  const [nameSortValue, setNameSortValue] = useState("");
  const [competition, setcompetition] = useState("");
  const [onelineDescription, setonelineDescription] = useState("");
  const [projectName, setprojectName] = useState("");
  const [draftstatus, setdraftstatus] = useState(true);
  const [productType, setproductType] = useState("");
  const [twitterlink, settwitterlink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [websiteLink, setwebsiteLink] = useState("");
  const [category, setcategory] = useState([{ value: "AMM" }]);
  const [sortUserData, setSortUserData] = useState([]);
  const [problemStatement, setproblemStatement] = useState([""]);
  const [solution, setsolution] = useState([""]);
  const [targetCustomers, setTargetCustomers] = useState([""]);
  const [competitionLinks, setCompetitionLinks] = useState([""]);
  const [competitionReason, setCompetitionReason] = useState([""]);

  const [filterstate, setfilterstate] = useState(false);
  const [currentIdeaId, setcurrentIdeaId] = useState("");
  const [edit, setedit] = useState(false);

  const [showdd, setshowdd] = useState(false);
  const loginId = useSelector((state) => state.constVar.loginId);
  const emailid = useSelector((state) => state.constVar.emailid);
  const subscriptionData = useSelector(
    (state) => state.constVar.subscriptionData
  );
  console.log(subscriptionData, "Subscription data");

  const [showModal, setShowModal] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upgrade your current plan to avail more benefits
    </Tooltip>
  );

  useEffect(() => {
    setShowModal(true);
  }, []);
  console.log(showModal);

  const history = useHistory();
  const createIdea = async () => {
    console.log(
      problemStatement,
      solution,
      targetCustomers,
      competitionLinks,
      competitionReason,
      "inside create"
    );
    setdraftstatus(true);
    console.log("after wait", draftstatus, category);
    var arrtype = [];

    for (var i = 0; i < category.length; i++) {
      arrtype.push({
        value: category[i].value,
      });
    }

    try {
      var query = `
            mutation Mutation($input: IdeaInput) {
                createIdea(input: $input) {
                _id
                email_id
                idea_name
                idea_logo
                one_line_desc
                product_type
                category{
                    value
                }
                isWhitepaper
                whitepaper_link
                isPitchdeck
                pitchdeck_link
                isProductLive
                liveProduct_link
                isRevenueModel
                revenueModel_type
                isCompetition
                draft_status
                competition_links 
                problem_statement 
                problem_solution 
                target_customers 
                competition_reason 
                twitter_link
                linkedin_link
                discord_link
                website_link
                user {
                _id
                first_name
                last_name
                }
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
            input: {
              user: loginId,
              email_id: emailid,
              idea_name: projectName,
              idea_logo: imageData,
              one_line_desc: onelineDescription,
              draft_status: draftstatus == false ? true : true,
              product_type: productType,
              category: arrtype,
              isWhitepaper: whitePaper == "true" ? true : false,
              whitepaper_link: whitePaperLink,
              isPitchdeck: pitchDeck == "true" ? true : false,
              pitchdeck_link: pitchDeckLink,
              problem_statement: problemStatement,
              competition_links: competitionLinks,
              problem_solution: solution,
              target_customers: targetCustomers,
              competition_reason: competitionReason,
              isProductLive: liveProduct == "true" ? true : false,
              liveProduct_link: liveProductLink,
              isRevenueModel: revenueModel == "true" ? true : false,
              revenueModel_type: revenueModelData,
              isCompetition: competition == "true" ? true : false,
              twitter_link: twitterlink,
              linkedin_link: linkedinLink,
              website_link: websiteLink,
            },
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then(async (data) => {
          console.log("current idea ID:", data?.data?.createIdea?._id);
          getCurrentIdea(data?.data?.createIdea?._id);
          setcurrentIdeaId(data?.data?.createIdea?._id);
        });
    } catch (error) {}
    await getAllIdeas();
  };
  const upgradePlans = () => {
    setplans("plans");
    history.push("/subscription");
  };

  const updateIdea = async (props) => {
    console.log("update data", draftstatus, currentIdeaId);
    var arrtype = [];

    for (var i = 0; i < category.length; i++) {
      arrtype.push({
        value: category[i].value,
      });
    }

    try {
      var query = `
                mutation UpdateIdea($id: ID, $input: IdeaInput) {
                    updateIdea(_id: $id, input: $input) {
                    _id
                    email_id
                    idea_name
                    idea_logo
                    one_line_desc
                    product_type
                    category{
                        value
                    }
                    isWhitepaper
                    whitepaper_link
                    isPitchdeck
                    pitchdeck_link
                    isProductLive
                    liveProduct_link
                    isRevenueModel
                    revenueModel_type
                    isCompetition
                    draft_status
                    twitter_link
                    linkedin_link
                    discord_link
                    website_link
                    user {
                    first_name
                    last_name
                    _id
                    }
                    problem_statement 
                    problem_solution 
                    target_customers 
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
            id: currentIdeaId,
            input: {
              user: loginId,
              draft_status: props == undefined ? draftstatus : props,
              email_id: emailid,
              idea_name: projectName,
              idea_logo: imageData,
              one_line_desc: onelineDescription,
              product_type: productType,
              category: arrtype,
              isWhitepaper: whitePaper == "true" ? true : false,
              whitepaper_link: whitePaperLink,
              isPitchdeck: pitchDeck == "true" ? true : false,
              pitchdeck_link: pitchDeckLink,
              isProductLive: true,
              liveProduct_link: liveProductLink,
              isRevenueModel: true,
              revenueModel_type: revenueModelData,
              isCompetition: true,
              problem_statement: problemStatement,
              competition_links: competitionLinks,
              problem_solution: solution,
              target_customers: targetCustomers,
              competition_reason: competitionReason,
              twitter_link: twitterlink,
              linkedin_link: linkedinLink,
              website_link: websiteLink,
            },
          },
        }),
      })
        .then((response) => {
          const json = response.json();

          return json;
        })
        .then(async (data) => {
          console.log(data, "inside get");
          // setAllIdeas(data);
        });
    } catch (error) {}
    await getAllIdeas();
    setedit(false);
  };

  const getAllIdeas = async () => {
    console.log("inside get");
    try {
      var query = `
                    query Query($id: ID, $user: ID) {
                        allIdeas(_id: $id, user: $user) {
                        _id
                        email_id
                        idea_name
                        idea_logo
                        one_line_desc
                        product_type
                        category{
                            value
                        }
                        isWhitepaper
                        whitepaper_link
                        isPitchdeck
                        pitchdeck_link
                        isProductLive
                        liveProduct_link
                        isRevenueModel
                        revenueModel_type
                        isCompetition
                        draft_status
                        problem_statement 
                        problem_solution
                        target_customers 
                        competition_links 
                        competition_reason
                        validated
                        average_score
                        total_reviews
                        user {
                        _id
                        first_name
                        last_name
                        }
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
            user: loginId,
          },
        }),
      })
        .then((response) => {
          const json = response.json();

          return json;
        })
        .then(async (data) => {
          console.log(data, "inside get");
          setAllIdeas(data);
          setAllIdeassorted(data);
          setSortUserData(
            data?.data?.allIdeas?.filter((i) => i?.idea_name != null)
          );
        });
    } catch (error) {}
  };

  const getCurrentIdea = async (currentID) => {
    console.log("current Idea call", currentID);
    try {
      var query = `
            query Query($id: ID) {
                getIdea(_id: $id) {
                _id
                email_id
                idea_name
                idea_logo
                one_line_desc
                product_type
                category{
                    value
                }
                isWhitepaper
                whitepaper_link
                isPitchdeck
                pitchdeck_link
                isProductLive
                liveProduct_link
                isRevenueModel
                revenueModel_type
                isCompetition
                draft_status
                twitter_link
                linkedin_link
                discord_link
                website_link
                user {
                _id
                first_name
                last_name
                }
                problem_statement 
                problem_solution 
                target_customers 
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
            id: currentID,
          },
        }),
      })
        .then((response) => {
          const json = response.json();

          return json;
        })
        .then(async (data) => {
          setCompetitionLinks(data?.data?.getIdea?.competition_links);
          setCompetitionReason(data?.data?.getIdea?.competition_reason);
          setcurrentIdeaData(data);
          setcurrentIdeaId(data?.data?.getIdea?._id);
          setprojectName(data?.data?.getIdea?.idea_name);
          setImageData(data?.data?.getIdea?.idea_logo);
          setonelineDescription(data?.data?.getIdea?.one_line_desc);
          setproductType(data?.data?.getIdea?.product_type);
          const apiData = data?.data?.getIdea?.category;

          const val = apiData.map((item) => ({
            value: item.value,
            label: item.value,
          }));

          setcategory(val);
          console.log("category", data?.data?.getIdea?.category);
          setproblemStatement(data?.data?.getIdea?.problem_statement);
          setsolution(data?.data?.getIdea?.problem_solution);
          setTargetCustomers(data?.data?.getIdea?.target_customers);
          settwitterlink(data?.data?.getIdea?.twitter_link);
          setLinkedinLink(data?.data?.getIdea?.linkedin_link);
          setwebsiteLink(data?.data?.getIdea?.website_link);
          setdraftstatus(data?.data?.getIdea?.draft_status);

          if (data?.data?.getIdea?.isWhitepaper == true) {
            setWhitepaper("true");
          } else {
            setWhitepaper("false");
          }
          setWhitePaperLink(data?.data?.getIdea?.whitepaper_link);

          if (data?.data?.getIdea?.isPitchdeck == true) {
            setpitchDeck("true");
          } else {
            setpitchDeck("false");
          }
          setPitchDeckLink(data?.data?.getIdea?.pitchdeck_link);

          setLiveProductLink(data?.data?.getIdea?.liveProduct_link);
          setRevenueModelData(data?.data?.getIdea?.revenueModel_type);
        });
    } catch (error) {}
  };

  const deleteIdea = async (currentID) => {
    try {
      var query = `
            mutation DeleteIdea($id: ID) {
                deleteIdea(_id: $id)
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
            id: currentID,
          },
        }),
      })
        .then((response) => {
          const json = response.json();

          return json;
        })
        .then(async (data) => {});
    } catch (error) {}
    await getAllIdeas();
  };

  useEffect(() => {
    getAllIdeas();
    getProjectDetailsFunc();
  }, [currentIdeaData, loginId]);

  const handleShow = () => setshowdd(true);
  const setShowpop = () => {
    setShow(true);
    setshowdd(false);
  };
  const confirmMakelive = () => {
    setmakelivepopup(false);
    updateIdea(false);
  };

  const createShow = () => {
    setproblemStatement([""]);
    setsolution([""]);
    setCompetitionLinks([""]);
    setCompetitionReason([""]);
    setprojectName("");
    setImageData("");
    setonelineDescription("");
    setproductType("");
    setcategory([]);
    setTargetCustomers([""]);
    settwitterlink("");
    setLinkedinLink("");
    setwebsiteLink("");
    setdraftstatus("");
    setPitchDeckLink("");
    setLiveProductLink("");
    setRevenueModelData("");
    setedit(false);
    setdraftstatus(true);
    // handleShow();
    setShow(true);
  };

  const handleCloseShow = () => {
    setShow(false);
  };
  const handleCloseShowdd = () => {
    setShowdd(false);
  };
  const handleOpenIdeaDisplay = () => {
    console.log("called");
    setdraftstatus(false);
    // setshowdd(true)
    // setshowideaDisplay(true);
  };
  const handleCloseIdeaDisplay = () => {
    setshowideaDisplay(false);
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

 

  //Filter area
  const showfilterFunc = () => {
    setShowFilter(!showFilter);
  };

  const sortByNameFunc = (e) => {
    setNameSortValue(e.target.value);
    console.log(e.target.value, "e.target.value");
    if (e.target.value == "A_to_Z") {
      getSortByNameFUnc();
      setSortNameTrue(true);
    } else if (e.target.value == "Z_to_A") {
      getSortByNameDescFUnc();
      setSortNameTrue(true);
    } else {
      getUserDetalsFunc();
      setSortNameTrue(false);
    }
  };
  const getSortByNameFUnc = () => {
    setfilterstate(true);
    // data4.reverse()
    // console.log(sortUserData, "a?.user?.fund_namedata4");

    console.log(sortUserData, "before");

    let newArrSort = [...sortUserData]?.sort((a, b) =>
      a.idea_name?.toLowerCase() == b.idea_name?.toLowerCase()
        ? 0
        : a.idea_name == null
        ? 1
        : b.idea_name == null
        ? -1
        : a.idea_name?.toLowerCase() > b.idea_name?.toLowerCase()
        ? 1
        : -1
    );
    // data4.reverse()
    console.log(newArrSort, "after");
    setAllIdeassorted(newArrSort);
  };
  const getSortByNameDescFUnc = (e) => {
    setfilterstate(true);
    let newArrSort = [...sortUserData]?.sort((a, b) =>
      a.idea_name?.toLowerCase() == b.idea_name?.toLowerCase()
        ? 0
        : a.idea_name == null
        ? 1
        : b.idea_name == null
        ? -1
        : a.idea_name?.toLowerCase() > b.idea_name?.toLowerCase()
        ? -1
        : 1
    );

    console.log(newArrSort, "after");
    setAllIdeassorted(newArrSort);
  };

  const clearALlFunc = () => {
    setNameSortValue("sort_by_name");
    setfilterstate(false);
  };

  console.log(emailid, "eeemaaaill");

  const upgradePlan = localStorage.getItem("subscriptiondata");

  useEffect(() => {
    setprofileToggle(false);
  }, []);

  return (
    <div>
      <div className="mainideabg">
        <div className="content container-fluid cs t">
          <div className="mb-4">
            <Link to="/home">
              <img style={{ width: "30px" }} src={Back}></img>{" "}
            </Link>
          </div>
          <div>
            <div className="csnavsub">
              {subscriptionData.plan_name === "MASTER" ||
              upgradePlan === "MASTER" ? (
                <></>
              ) : (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <button
                      className="upgradePlan mr-2 mb-2"
                      onClick={upgradePlans}
                    >
                      Upgrade
                    </button>
                  </OverlayTrigger>
                </>
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
                          {projectDetalsData.length > 0 &&
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
            {subscriptionData.plan_name === "MASTER" ||
              upgradePlan === "MASTER" ? (
                <></>
              ) : (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <button
                      className="upgradePlan mr-2"
                      onClick={upgradePlans}
                    >
                      Upgrade
                    </button>
                  </OverlayTrigger>
                </>
              )} </Navbar.Brand>
            <Navbar.Toggle style={{ border: "none" }} />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0">
              <Link to="/dashboard">
                <button className="routeButtoncsi mr-2 mb-2">
                  Switch to Fundraising
                </button>
              </Link>
                <Wallet />

                <NavDropdown title="Profile" >
                  <NavDropdown.Item>Email {":"} {projectDetalsData.length > 0 && projectDetalsData[0]?.email}</NavDropdown.Item>
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
            Product Validation
          </h2>
        </div>

        <div
          className="content container-fluid cs"
          style={{ marginTop: "20px" }}
        >
          {/* <p>{draftstatus}</p> */}
          <div className="row">
            <div
              className="col-md-12"
              style={{ padding: "0px", marginBottom: "10px" }}
            >
              <div
                className="row align-items-center"
                style={{ width: "100%", margin: "0px" }}
              >
                <div className="col" style={{ padding: "0px" }}>
                  <div className="search"></div>
                </div>
                <div className="col-auto float-right ml-auto"></div>
              </div>
            </div>
          </div>
          {showFilter == true ? (
            <div className="row">
              <div
                className="col-md-4"
                style={{
                  padding: "0px",
                  marginBottom: "10px",
                  display: "flex",
                }}
              >
                <div className="col-md-6" style={{ display: "flex" }}>
                  <div
                    className="form-group"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      fontWeight: "500",
                    }}
                  >
                    Sort By
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group" style={{ height: "42px" }}>
                    <button
                      className="clear-btn"
                      style={{ fontWeight: "500" }}
                      onClick={() => clearALlFunc()}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4"
                style={{
                  padding: "0px",
                  marginBottom: "10px",
                  display: "flex",
                }}
              >
                <div className="col-md-1">
                  <div className="form-group"></div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <div>
                      <select
                        className="form-control btn-block-height square-edges"
                        style={{ fontWeight: "500" }}
                        value={nameSortValue}
                        onChange={(e) => sortByNameFunc(e)}
                      >
                        <option
                          style={{
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                          value="sort_by_name"
                        >
                          Name
                        </option>
                        <option
                          style={{
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                          value="A_to_Z"
                        >
                          A to Z
                        </option>
                        <option
                          style={{
                            fontSize: "13px",
                            fontWeight: "500",
                          }}
                          value="Z_to_A"
                        >
                          Z to A
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="slider-item mb-4">
                <div className="sc-product-item cs">
                  <div style={{ margin: "40% auto" }}>
                    <button
                      className="createIdea mb-4"
                      onClick={() => createShow()}
                    >
                      +
                    </button>
                    <h4 className="mb-2 createIdea-h">
                      Update your new product
                    </h4>
                    <p className="createIdea-p">
                      {" "}
                      Create Idea to generate a unique and innovative startup
                      concept to jumpstart your entrepreneurial journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {filterstate != true &&
              allIdeas?.data?.allIdeas?.length > 0 &&
              allIdeas?.data?.allIdeas
                ?.slice(0)
                .reverse()
                .map((i, index) => (
                  <Ideabox
                    i={i}
                    index={index}
                    handleOpenIdeaDisplay={handleOpenIdeaDisplay}
                    getCurrentIdea={getCurrentIdea}
                    setdraftstatus={setdraftstatus}
                    handleShow={handleShow}
                    edit={edit}
                    setedit={setedit}
                    deleteIdea={deleteIdea}
                    updateIdea={updateIdea}
                    makelivepopup={makelivepopup}
                    setmakelivepopup={setmakelivepopup}
                  ></Ideabox>
                ))}

            {/* {
                        filterstate && allIdeassorted?.length > 0 &&
                        allIdeassorted?.map((i, index) => (
                            <Ideabox 
                            i={i} 
                            index={index} 
                            handleOpenIdeaDisplay={handleOpenIdeaDisplay} 
                            getCurrentIdea={getCurrentIdea} 
                            setdraftstatus={setdraftstatus} 
                            handleShow={handleShow}
                            edit={edit}
                            setedit={setedit}
                            deleteIdea={deleteIdea}
                            >
                            </Ideabox>
                        ))

                       
                    } */}
          </div>

          {/* <div className="mt-4">
                <h2 className="mb-4">Draft Ideas</h2>
                <div className='row'>
 
                {
                                            allIdeas?.data?.allIdeas?.length > 0 &&
                                            allIdeas?.data?.allIdeas?.filter(i => i.draft_status == true).map((i,index) => (
                                                <Ideabox i={i} index={index}>
                                                </Ideabox>
                                            ))


                                        }
         
                </div>

                </div> */}
        </div>
        <Ideacreatemodal
          show={show}
          handleClose={handleCloseShow}
          imageCoverData={imageCoverData}
          setImageCoverData={setImageCoverData}
          imageData={imageData}
          setImageData={setImageData}
          createIdea={createIdea}
          getAllIdeas={getAllIdeas}
          projectName={projectName}
          setprojectName={setprojectName}
          onelineDescription={onelineDescription}
          setonelineDescription={setonelineDescription}
          draftstatus={draftstatus}
          setdraftstatus={setdraftstatus}
          updateIdea={updateIdea}
          productType={productType}
          setproductType={setproductType}
          category={category}
          setcategory={setcategory}
          problemStatement={problemStatement}
          setProblemStatement={setproblemStatement}
          solution={solution}
          setSolution={setsolution}
          targetCustomers={targetCustomers}
          setTargetCustomers={setTargetCustomers}
          competition={competition}
          setcompetition={setcompetition}
          competitionLinks={competitionLinks}
          setCompetitionLinks={setCompetitionLinks}
          competitionReason={competitionReason}
          setCompetitionReason={setCompetitionReason}
          handleOpenIdeaDisplay={handleOpenIdeaDisplay}
          edit={edit}
          setedit={setedit}
          /* White Paper */
          setWhitepaper={setWhitepaper}
          whitePaper={whitePaper}
          whitePaperLink={whitePaperLink}
          setWhitePaperLink={setWhitePaperLink}
          /*Pitch Deck */
          pitchDeckLink={pitchDeckLink}
          setPitchDeckLink={setPitchDeckLink}
          pitchDeck={pitchDeck}
          setpitchDeck={setpitchDeck}
          /* Revenue Model */
          revenueModel={revenueModel}
          setrevenueModel={setrevenueModel}
          revenueModelData={revenueModelData}
          setRevenueModelData={setRevenueModelData}
          /* Live Product */
          liveProduct={liveProduct}
          setliveProduct={setliveProduct}
          liveProductLink={liveProductLink}
          setLiveProductLink={setLiveProductLink}
          settwitterlink={settwitterlink}
          setLinkedinLink={setLinkedinLink}
          setwebsiteLink={setwebsiteLink}
          twitterlink={twitterlink}
          linkedinLink={linkedinLink}
          websiteLink={websiteLink}
          currentIdeaData={currentIdeaData}
        ></Ideacreatemodal>
        <IdeaDisplay
          showideaDisplay={showideaDisplay}
          setshowideaDisplay={setshowideaDisplay}
          handleCloseIdeaDisplay={handleCloseIdeaDisplay}
          currentIdeaData={currentIdeaData}
          updateIdea={updateIdea}
          setdraftstatus={setdraftstatus}
          draftstatus={draftstatus}
          setcurrentIdeaId={setcurrentIdeaId}
          currentIdeaId={currentIdeaId}
        ></IdeaDisplay>
        <Modal
          show={showdd}
          onHide={handleCloseShowdd}
          backdrop="static"
          keyboard={false}
          size="sm"
        >
          <Modal.Body style={{ padding: "20px", borderRadius: "20px" }}>
            <p>Edit Product?</p>
            <div style={{ display: "flex", width: "50%" }}>
              <button
                type="button"
                className="btn btn-dark  btn-sm mr-2"
                onClick={() => setShowpop()}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-dark  btn-sm"
                onClick={() => setshowdd(false)}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={makelivepopup}
          onHide={handleCloseShowdd}
          backdrop="static"
          keyboard={false}
          size="sm"
        >
          <Modal.Body style={{ padding: "20px", borderRadius: "20px" }}>
            <p>Are you sure you want to make your product live?</p>
            <div style={{ display: "flex", width: "50%" }}>
              <button
                type="button"
                className="btn btn-dark  btn-sm mr-2"
                onClick={() => confirmMakelive()}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-dark  btn-sm"
                onClick={() => setmakelivepopup(false)}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(IdeaList);
