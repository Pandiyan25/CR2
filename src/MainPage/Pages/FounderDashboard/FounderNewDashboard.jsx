import { CanvasJSChart } from "canvasjs-react-charts";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Card } from "react-bootstrap";
import { Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";

import CountUp from "react-countup";
import { Table } from "antd";
import "antd/dist/antd.css";
import { ToastContainer, toast } from "material-react-toastify";

import "material-react-toastify/dist/ReactToastify.css";
import StepsImage from "../../../assets/img/userflow.jpg";
import {
  faLongArrowAltRight,
  faGlobe,
  faRetweet,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useHistory } from "react-router-dom";
import {
  designLogo2,
  gamingImg,
  polygon,
  locationPin,
  twitterIcon,
  website,
  ld,
  logoProj,
} from "../../../Entryfile/imagepath";
import { fetchRoadMapProjectDetails } from "../../../reducers/RoadMapSlice";
import { fetchBudgetProjectDetails } from "../../../reducers/BudgetSlice";
import { fetchProjectDetails } from "../../../reducers/ProjectDetailsSlice";
import {
  externalLeadInvestor,
  investorsDataDashboard,
  InvestorsDataInFoundersDashboard,
  projectId,
} from "../../../reducers/ConstantSlice";
import { fetchFundingProjectDetails } from "../../../reducers/FundingProjectSlice";
import { fetchTeamSize } from "../../../reducers/TeamSizeSlice";
import { fetchTokenomicsDetails } from "../../../reducers/TokenomicsSlice";
import { fetchSocialTeam } from "../../../reducers/SocialPageSlice";
import { apiURI } from "../../../config/config";
import { fetchBudgetBannerDetails } from "../../../reducers/BugetBannerSlice";
import CardMain from "./CardMain";
import "./index.css";
import CongPopupLaunch from "../ProjectDataPage/CongPopupLaunch";
import {
  fetchConnectReq,
  searchallconnect,
} from "../../../reducers/ConnectReqSlice";
import Pagination from "../../../Entryfile/Pagination";
import CardInFounder from "./CardInFounder";
import { currencyType, leadInvestor } from "../../../reducers/ConstantSlice";

import {
  fetchLaunchReq,
  selectAllLaunchRequest,
} from "../../../reducers/LaunchSlice";
import CNYimaage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/CNY.png";
import usdimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/USD.png";
import EURimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/EUR.png";
import POUNDimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/POUND.png";
import YUANimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/YUAN.png";
import YENimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/YEN.png";
import CADimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/CAD.png";
import SGDimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/SGD.png";
import AUDimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/AUD.png";
import DAIimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/DAI.png";
import BUSDimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/BUSD.png";
import INRimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/INR.png";
import USDCimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/USDC.png";
import USDTimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/USDT.png";
import RUBLEimage from "../../../MainPage/Pages/FounderProject/Funding/assets/images/RUBBLE.png";

const FounderNewDashboard = ({ isPopupOpen, setIsPopupOpen }) => {
  const [showFilter, setShowFilter] = useState(false);

  const [sortConected, setSortConected] = useState("");
  const [PrefSecSortValue, setPrefSecSortValue] = useState("");
  const [investSortValue, setInvestSortValue] = useState("");
  const [fundSortValue, setFundSortValue] = useState("");
  const [assestMngSortValue, setAssestMngSortValue] = useState("");
  const [nameSortValue, setNameSortValue] = useState("");
  const [minInvSize, setminInvSize] = useState("");
  const [showPopupLaunch, setShowPopupLaunch] = useState(false);
  let PageSizeClosedDeals = 8;
  const [currentPageClosedDeals, setCurrentPageClosedDeals] = useState(1);
  const [UsersDetailsData, setUsersDetailsData] = useState([]);
  const [sortUserData, setSortUserData] = useState([]);
  const [totalFundRaiseTarget, settotalFundRaiseTarget] = useState(0);
  const [OverallScoreOpp, setOverallScoreOpp] = useState(10);
  const [OverallScore, setOverallScore] = useState(0);
  const [validatorScore, setvalidatorScore] = useState(0);
  const [validatorScoreOpp, setvalidatorScoreOpp] = useState(10);
  const [InvestorScoreOpp, setInvestorScoreOpp] = useState(10);
  const [InvestorScore, setInvestorScore] = useState(0);
  const [githubRepo, setgithubRepo] = useState("");
  const [WhitePaperMainLink, setWhitePaperMainLink] = useState("");
  const [OnePageDocMainLink, setOnePageDocMainLink] = useState("");
  const [PitchDeckMainLink, setPitchDeckMainLink] = useState("");
  const [sortNameTrue, setSortNameTrue] = useState(false);
  const [allusersArrayData, setAllusersArrayData] = useState([]);
  const [projectDetailsData, setProjectDetalsData] = useState([]);
  const [userDetailsDashboardData, setuserDetailsDashboardData] = useState([]);
  const percentageData = useSelector(selectAllLaunchRequest);
  //Rating Values
  const [overallRatingScore, setOverallRatingScore] = useState();
  const [investorRatingScore, setInvestorRatingScore] = useState();
  const [validatorRatingScore, setValidatorRatingScore] = useState();

  const projectIdData = useSelector((state) => state.constVar.projectId);
  const [proposalDetalsData, setproposalDetalsData] = useState([]);
  const [userDetailsPageData, setuserDetailsPageData] = useState([]);
  const [allProjectFundingData, setAllProjectFundingData] = useState("");
  const investorsDataDashboarddata = useSelector(
    (state) => state.constVar.investorsDataDashboard
  );

  const InvestorsDataInFoundersDashboardData = useSelector(
    (state) => state.constVar.InvestorsDataInFoundersDashboard
  );

  //   const [isOpen, setIsOpen] = useState(true);
  console.log(investorsDataDashboarddata, "investorsDataDashboarddata");
  const [mydata3, setMydata3] = useState([
    { name: "satisfied", y: 20 },
    { name: "Unsatisfied", y: 5 },
  ]);
  const [mydata4, setMydata4] = useState([
    { name: "satisfied", y: 12 },
    { name: "Unsatisfied", y: 5 },
  ]);

  const [mydata2, setMydata2] = useState([
    { name: "satisfied", y: 5 },
    { name: "Unsatisfied", y: 5 },
  ]);
  const dispatch = useDispatch();
  let history = useHistory();
  const loginId = useSelector((state) => state.constVar.loginId);

  const getUserDetalsFunc = () => {
    try {
      var query = `
                query AllProjects($id: ID, $role: String, $user: ID) {
                    getUser(_id: $id) {
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
                      preferred_stage_of_investment {
                        value
                      }
                    }
                    allUsers(role: $role, user: $user) {
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
                      dummy
                      profile_pic
                      profile_rating {
                        value
                        user_role
                      }
                      proof_number
                      telegram_link
                      fund_logo
                      currency
                      preferred_stage_of_investment {
                        value
                      }
                      twitter_funding
                    }
                    allInvestors(user: $user) {
                      user {
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
                        dummy
                        profile_pic
                        profile_rating {
                          value
                          user_role
                        }
                        proof_number
                        telegram_link
                        fund_logo
                        currency
                        preferred_stage_of_investment {
                          value
                        }
                        twitter_funding
                      }
                      request_status
                    }
                  }
                  
                  
     `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            id: loginId,
            role: "Investor",
            user: loginId,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          // debugger;
          console.log("ProjectGetFunctiondatass", data);
          if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
            setuserDetailsPageData([data?.data?.getUser]);

            //  console.log();
          }
          if (
            data?.data?.allInvestors != null &&
            data?.data?.allInvestors != undefined
          ) {
            // setSortUserData(data?.data?.allInvestors)
            // setUsersDetailsData(data?.data?.allInvestors)
            setSortUserData(
              data?.data?.allInvestors?.filter(
                (i) => i?.user?.fund_name != null
              )
            );
            setUsersDetailsData(
              data?.data?.allInvestors?.filter(
                (i) => i?.user?.fund_name != null
              )
            );
            dispatch(
              investorsDataDashboard(
                data?.data?.allInvestors?.filter(
                  (i) => i?.user?.fund_name != null
                )
              )
            );
            dispatch(
              InvestorsDataInFoundersDashboard({
                currentPageClosedDeals,
                PageSizeClosedDeals,
                data: data?.data?.allInvestors?.filter(
                  (i) => i?.user?.fund_name != null
                ),
              })
            );
          }
        });
    } catch (error) {
      console.log(
        error,
        "ProjectGetFunctionError  in Dashboard in investors error"
      );
    }
  };

  const getProjectDetailsFunc = () => {
    try {
      var query = `
                query AllProjects(
                    $user: ID
                    $project: ID
                    $founder: ID
                    $role: String
                    $connected: Boolean
                  ) {
                    allProjects: allProjects(user: $user) {
                      _id
                      user {
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
                      }
                      email_id
                      first_name
                      last_name
                      linkedin_profile_link
                      project_name
                      project_description
                      nature_of_project
                      project_start_date
                      project_tags
                      project_stage
                      website_link
                      github_repository
                      whitepaper
                      one_pager_document
                      pitch_deck
                      number_of_founders
                      team_size
                      project_id
                      project_status
                      amount_released
                      amount_invested
                      amount_in_escrow
                      project_end_date
                      total_budget
                      validator_score
                      investor_score
                      fund_raised_till_now
                      total_fund_raised
                      investment_date
                      no_of_proposals
                      logo
                      rating {
                        user_role
                        market_validation
                        business_model
                        team
                        tokenomics
                        user_id
                      }
                    }
                    allProposals(user: $user, project: $project) {
                      _id
                      proposal_id
                      name
                      type
                      funds_requested
                      price_per_token
                      number_of_tokens
                      project_token_minted
                      logo
                      project {
                        _id
                        email_id
                        first_name
                        last_name
                        linkedin_profile_link
                        project_name
                        project_description
                        nature_of_project
                        project_start_date
                        project_tags
                        project_stage
                        website_link
                        github_repository
                        whitepaper
                        one_pager_document
                        pitch_deck
                        number_of_founders
                        team_size
                        project_id
                        project_status
                        amount_released
                        amount_invested
                        amount_in_escrow
                        project_end_date
                        total_budget
                        validator_score
                        investor_score
                        fund_raised_till_now
                        total_fund_raised
                        investment_date
                        no_of_proposals
                        logo
                        project_blockchain_id
                      }
                      no_of_validators
                      proposal_status
                      reported_expenditure_previous_cycle
                      reported_expenditure_till_date
                      token_release
                      additional_attachment
                      additional_information
                      receiving_address
                      timeline_update
                      fund_requested_for_current_cycle
                      budget_for_currenct_proposal_cycle
                      current_proposal_cycle
                      variants
                      reported_expenditure
                      reported_budget
                      investor {
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
                      }
                      currency
                      validator_status
                      fund_raised_till_now
                      proposal_blockchain_id
                    }
                    allProjectsNew: allProjects(founder: $founder) {
                      rating {
                        user_role
                        market_validation
                        business_model
                        team
                        tokenomics
                        user_id
                      }
                    }
                    ProjectOverAllRating(project: $project) {
                        overall_rating
                        validator_rating
                        investor_rating
                      }
                    allUsers(role: $role, user: $user, connected: $connected) {
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
                      dummy
                      profile_pic
                      proof_number
                      telegram_link
                      fund_logo
                      currency
                      twitter_funding
                      profile_rating {
                        value
                        user_role
                      }
                    }
                  }
                                 
            
     `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            project: projectIdData,
            user: loginId,
            founder: loginId,
            role: "Investor",
            connected: false,
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

          if (
            data?.data?.ProjectOverAllRating != null &&
            data?.data?.ProjectOverAllRating != undefined
          ) {
            setOverallRatingScore(
              data.data.ProjectOverAllRating.overall_rating
            );
            setInvestorRatingScore(
              data.data.ProjectOverAllRating.investor_rating
            );
            setValidatorRatingScore(
              data.data.ProjectOverAllRating.validator_rating
            );
          }

          if (
            data?.data?.allProjects != null &&
            data?.data?.allProjects != undefined
          ) {
            // setProjectDetalsData(data?.data?.allProjects)
            var arr = [];
            if (data?.data?.allProjects?.length > 0) {
              var main = 0;
              var divide = 0;
              var base10 = 0;
              if (data?.data?.allProjects?.length <= 9) {
                base10 = data?.data?.allProjects?.length;
              } else {
                base10 = 9;
              }
              for (var j = 0; j < base10; j++) {
                if (data?.data?.allProjects[j]?.rating?.length > 0) {
                  for (
                    var i = 0;
                    i < data?.data?.allProjects[j]?.rating?.length;
                    i++
                  ) {
                    main = main + data?.data?.allProjects[j]?.rating[i].value;
                  }
                  divide =
                    main / data?.data?.allProjects[j]?.rating?.length / 2;
                  console.log(divide, "divide1");
                } else {
                  main = 0;
                  divide = 0;
                  console.log(divide, "divide2");
                }

                console.log(
                  data?.data?.allProjects[j]?.project_end_date,
                  "date1"
                );
                var dashboardDate =
                  data?.data?.allProjects[j]?.project_end_date;
                dashboardDate = dashboardDate?.split("T")[0];

                console.log(divide, "divide");

                arr.push({
                  _id: data?.data?.allProjects[j]?._id,

                  linkedin_profile_link:
                    data?.data?.allProjects[j]?.linkedin_profile_link,
                  project_name: data?.data?.allProjects[j]?.project_name,
                  project_description:
                    data?.data?.allProjects[j]?.project_description,
                  nature_of_project:
                    data?.data?.allProjects[j]?.nature_of_project,
                  project_tags: data?.data?.allProjects[j]?.project_tags,
                  project_stage: data?.data?.allProjects[j]?.project_stage,
                  website_link: data?.data?.allProjects[j]?.website_link,
                  whitepaper: data?.data?.allProjects[j]?.whitepaper,
                  project_id: data?.data?.allProjects[j]?.project_id,
                  project_end_date: dashboardDate,
                  total_budget: data?.data?.allProjects[j]?.total_budget,
                  fund_raised_till_now:
                    data?.data?.allProjects[j]?.fund_raised_till_now,
                  total_fund_raised:
                    data?.data?.allProjects[j]?.total_fund_raised,
                  logo: data?.data?.allProjects[j]?.logo,
                  ratingValue: divide,
                });
              }
              setProjectDetalsData(arr);
            }
            //  console.log();
          }
          if (
            data?.data?.allProposals != null &&
            data?.data?.allProposals != undefined
          ) {
            var arr = [];
            if (data?.data?.allProposals?.length > 0) {
              var main = 0;
              var divide = 0;
              var base11 = 0;
              if (data?.data?.allProposals?.length <= 10) {
                base11 = data?.data?.allProposals?.length;
              } else {
                base11 = 10;
              }
              for (var j = 0; j < base11; j++) {
                arr.push({
                  _id: data?.data?.allProposals[j]._id,
                  proposal_id: data?.data?.allProposals[j].proposal_id,
                  name: data?.data?.allProposals[j].name,
                  type: data?.data?.allProposals[j].type,
                  funds_requested: data?.data?.allProposals[j].funds_requested,
                  price_per_token: data?.data?.allProposals[j].price_per_token,
                  number_of_tokens:
                    data?.data?.allProposals[j].number_of_tokens,
                  project_token_minted:
                    data?.data?.allProposals[j].project_token_minted,
                  logo: data?.data?.allProposals[j].logo,
                  no_of_validators:
                    data?.data?.allProposals[j].no_of_validators,
                  proposal_status: data?.data?.allProposals[j].proposal_status,
                  reported_expenditure_previous_cycle:
                    data?.data?.allProposals[j]
                      .reported_expenditure_previous_cycle,
                  reported_expenditure_till_date:
                    data?.data?.allProposals[j].reported_expenditure_till_date,
                  token_release: data?.data?.allProposals[j].token_release,
                  additional_attachment:
                    data?.data?.allProposals[j].additional_attachment,
                  additional_information:
                    data?.data?.allProposals[j].additional_information,
                  receiving_address:
                    data?.data?.allProposals[j].receiving_address,
                  timeline_update: data?.data?.allProposals[j].timeline_update,
                  fund_requested_for_current_cycle:
                    data?.data?.allProposals[j]
                      .fund_requested_for_current_cycle,
                  budget_for_currenct_proposal_cycle:
                    data?.data?.allProposals[j]
                      .budget_for_currenct_proposal_cycle,
                  current_proposal_cycle:
                    data?.data?.allProposals[j].current_proposal_cycle,
                  variants: data?.data?.allProposals[j].variants,
                  reported_expenditure:
                    data?.data?.allProposals[j].reported_expenditure,
                  reported_budget: data?.data?.allProposals[j].reported_budget,

                  currency: data?.data?.allProposals[j].currency,
                  validator_status:
                    data?.data?.allProposals[j].validator_status,
                  fund_raised_till_now:
                    data?.data?.allProposals[j].fund_raised_till_now,
                  proposal_blockchain_id:
                    data?.data?.allProposals[j].proposal_blockchain_id,
                  previous_reporting_cycle:
                    data?.data?.allProposals[j].previous_reporting_cycle,
                  previous_reporting_cycle:
                    data?.data?.allProposals[j].previous_reporting_cycle,
                  project: data?.data?.allProposals[j].project,
                  investor: data?.data?.allProposals[j].investor,
                });
              }

              setproposalDetalsData(arr);
            }
          }

          if (
            data?.data?.allProjectsNew != null &&
            data?.data?.allProjectsNew != undefined &&
            data?.data?.allProjectsNew.length > 0
          ) {
            var overallCount = 0;
            // if(data?.data?.allProjectsNew[i].)
            var investorCount = 0;
            var validatorCount = 0;
            var investor = 0;
            var validator = 0;
            var overall = 0;
            var main = 0;
            var divideValidator = 0;
            var divideOverall = 0;
            var divideInvestor = 0;
            for (var j = 0; j < data?.data?.allProjectsNew?.length; j++) {
              if (data?.data?.allProjectsNew[j]?.rating?.length > 0) {
                for (
                  var i = 0;
                  i < data?.data?.allProjectsNew[j]?.rating?.length;
                  i++
                ) {
                  overall =
                    overall +
                    data?.data?.allProjectsNew[j]?.rating[i].business_model +
                    data?.data?.allProjectsNew[j]?.rating[i].market_validation +
                    data?.data?.allProjectsNew[j]?.rating[i].team +
                    data?.data?.allProjectsNew[j]?.rating[i].tokenomics;
                  if (
                    data?.data?.allProjectsNew[j]?.rating[i].user_role ==
                    "Investor"
                  ) {
                    investor =
                      investor +
                      data?.data?.allProjectsNew[j]?.rating[i].business_model +
                      data?.data?.allProjectsNew[j]?.rating[i]
                        .market_validation +
                      data?.data?.allProjectsNew[j]?.rating[i].team +
                      data?.data?.allProjectsNew[j]?.rating[i].tokenomics;
                    investorCount++;
                  } else if (
                    data?.data?.allProjectsNew[j]?.rating[i].user_role ==
                    "Validator"
                  ) {
                    validator =
                      validator +
                      data?.data?.allProjectsNew[j]?.rating[i].business_model +
                      data?.data?.allProjectsNew[j]?.rating[i]
                        .market_validation +
                      data?.data?.allProjectsNew[j]?.rating[i].team +
                      data?.data?.allProjectsNew[j]?.rating[i].tokenomics;
                    validatorCount++;
                  } else {
                    validator = validator;
                    investor = investor;
                  }
                }
                if (investor == 0) {
                  divideInvestor = 0;
                } else {
                  // / 2
                  divideInvestor = investor / investorCount / 4;
                  divideInvestor = Number(divideInvestor.toFixed(1));
                }

                if (validator == 0) {
                  divideValidator = 0;
                } else {
                  // / 2
                  divideValidator = validator / validatorCount / 4;
                  divideValidator = Number(divideValidator.toFixed(1));
                }
                if (overall == 0) {
                  divideOverall = 0;
                } else {
                  divideOverall =
                    overall / data?.data?.allProjectsNew[j]?.rating?.length / 4;
                  divideOverall = Number(divideOverall.toFixed(1));
                }

                console.log(
                  divideInvestor,
                  investor,
                  investorCount,
                  "divideInvestor"
                );
                console.log(
                  divideValidator,
                  validator,
                  validatorCount,
                  "divideValidator"
                );
              } else {
                divideOverall = 0;
                divideValidator = 0;
                divideInvestor = 0;
                main = 0;
                // divide = 0
              }

              setInvestorScore(divideInvestor);
              setInvestorScoreOpp(10 - divideInvestor);
              setvalidatorScore(divideValidator);
              setvalidatorScoreOpp(10 - divideValidator);
              setOverallScore(divideOverall);

              setOverallScoreOpp(10 - divideOverall);
            }
          } else {
            // setCheckPage('')

            setInvestorScore(0);
            setInvestorScoreOpp(10 - 0);
            setvalidatorScore(0);
            setvalidatorScoreOpp(10 - 0);
            setOverallScore(0);

            setOverallScoreOpp(10 - 0);
          }

          if (
            data?.data?.allUsers != null &&
            data?.data?.allUsers != undefined &&
            data?.data?.allUsers.length > 0
          ) {
            setAllusersArrayData(data?.data?.allUsers);
          } else {
            setAllusersArrayData([]);
          }
        });
    } catch (error) {
      console.log(
        error,
        "ProjectGetFunctionError  in Dashboard in investors error"
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
        if (!event.target.closest('.popup-container')) {
            setIsPopupOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

  useEffect(() => {
    if (loginId != "") {
      dispatch(fetchLaunchReq(loginId));
      getProjectDetailsFunc();
      getUserDetalsFunc();
    }
  }, [loginId]);

  useEffect(() => {
    if (projectIdData != "") {
      getPerProjectDataFunc();
    }
  }, [projectIdData]);

  const getPerProjectDataFunc = () => {
    try {
      const query = `
        
            query AllSentRequest($project: ID) {
                allProjectFunding(project: $project) {
                  _id
                  total_fund_raise_target
                  fund_raised
                  number_of_investors
                  stage_of_funding
                  primary_funding_wallet_address_network
                  primary_funding_wallet_address
                  lead_investor {
                    first_name
                    last_name
                    fund_name
                  }
                  external_lead_investor
                  currency
                }
              }
              `;
      fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            project: projectIdData,
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          // debugger;

          if (
            data?.data?.allProjectFunding != null &&
            data?.data?.allProjectFunding != undefined &&
            data?.data?.allProjectFunding.length > 0
          ) {
            setAllProjectFundingData(data?.data?.allProjectFunding);

            dispatch(currencyType(data?.data?.allProjectFunding[0].currency));
            dispatch(
              leadInvestor(
                data?.data?.allProjectFunding[0].lead_investor?.fund_name
              )
            );
            dispatch(
              externalLeadInvestor(
                data?.data?.allProjectFunding[0].external_lead_investor
              )
            );
          } else {
            setAllProjectFundingData([]);
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const opennewWindow = (i) => {
    // window.open(`https://${i}`)
    window.open(i, "_blank").focus();
  };

  const showLaunch = () => {
    setShowPopupLaunch(true);
  };
  const handleCloseShowPopup = () => {
    setShowPopupLaunch(false);
  };

  const investorConnectFunc = (id) => {
    console.log(loginId, id, projectIdData, "connectcehck");
    if (
      projectIdData != null &&
      projectIdData != undefined &&
      projectIdData != "" &&
      percentageData?.length > 0 &&
      percentageData[0]?.launch_status?.launched == true
    ) {
      try {
        var query = `
                mutation CreateConnectionRequest($input: ConnectionRequestInput) {
                    createConnectionRequest(input: $input) {
                      _id
                    
                      sender_status
                      receiver_status
                    }
                  }
     `;
        fetch(apiURI.URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                sender: loginId,
                receiver: id,
                project: projectIdData,
              },
            },
          }),
        })
          .then((response) => {
            const json = response.json();
            return json;
          })
          .then((data) => {
            // debugger;
            //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
            if (
              data?.data?.createConnectionRequest != null &&
              data?.data?.createConnectionRequest != undefined
            ) {
              dispatch(searchallconnect());

              //
              console.log("dispatch completed");
              showLaunch();

              getProjectDetailsFunc();
              dispatch(fetchConnectReq(loginId));
              getUserDetalsFunc();
            }
          });
      } catch (error) {
        console.log(
          error,
          "ProjectGetFunctionError  in Dashboard in investors error"
        );
      }
    } else if (
      percentageData?.length > 0 &&
      percentageData[0]?.launch_status?.launched == false
    ) {
      alert("Please launch your project to connect with investors");
    } else {
      alert("Please fill Project details to connect with Investors");
    }
  };
  const sortByConnected = (e) => {
    setSortConected(e.target.value);
    let newArray = [];
    if (e.target.value == "Connected") {
      UsersDetailsData.forEach((i) => {
        if (i?.request_status == "Connected") {
          newArray.push(i);
          // console.log(i,"sortByPreferedFunc");
        }
      });
    } else if (e.target.value == "Requested") {
      UsersDetailsData.forEach((i) => {
        if (i?.request_status == "Requested") {
          newArray.push(i);
          // console.log(i,"sortByPreferedFunc");
        }
      });
    } else if (e.target.value == "Pending") {
      UsersDetailsData.forEach((i) => {
        if (
          i?.request_status != "Connected" &&
          i?.request_status != "Requested"
        ) {
          newArray.push(i);
          // console.log(i,"sortByPreferedFunc");
        }
      });
    } else {
      UsersDetailsData.forEach((i) => {
        newArray.push(i);
      });
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
  };
  const sortByPreferedFunc = (e) => {
    setPrefSecSortValue(e.target.value);
    let newArray = [];
    if (e.target.value == "sort_by_prefered") {
      UsersDetailsData.forEach((i) => {
        newArray.push(i);
      });
    } else {
      UsersDetailsData.forEach((i) => {
        if (i?.user?.preferred_sectors.length > 0) {
          i?.user?.preferred_sectors.map((main) => {
            if (main?.value == e.target.value) {
              newArray.push(i);
              // console.log(i,"sortByPreferedFunc");
            }
          });
        }
      });
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
  };

  const sortByStageofIvmt = (e) => {
    setInvestSortValue(e.target.value);
    let newArray = [];
    if (e.target.value == "sort_by_stage_invst") {
      UsersDetailsData.forEach((i) => {
        newArray.push(i);
      });
    } else {
      UsersDetailsData?.length > 0 &&
        UsersDetailsData.forEach((i) => {
          if (i?.user?.preferred_stage_of_investment.length > 0) {
            i?.user?.preferred_stage_of_investment.map((main) => {
              if (main?.value == e.target.value) {
                newArray.push(i);
                // console.log(i,"sortByPreferedFunc");
              }
            });
          }
        });
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
  };

  const clearALlFunc = () => {
    setNameSortValue("sort_by_name");
    setFundSortValue("sort_by_fund");
    setPrefSecSortValue("sort_by_prefered");
    setInvestSortValue("sort_by_mininvt");
    setAssestMngSortValue("sort_by_assestUnderMng");
    setminInvSize("sort_by_mininvt");
    setSortConected("sorteby_connected");
    getUserDetalsFunc();
  };

  const sortByMinInvtSize = (e) => {
    setminInvSize(e.target.value);
    let newArray = [];
    if (e.target.value == "sort_by_mininvt") {
      UsersDetailsData?.length > 0 &&
        UsersDetailsData?.forEach((i) => {
          newArray.push(i);
        });
    }
    // else if (e.target.value == "100000_and_above") {

    //     let arrofInvementSize = e.target.value.split('_')
    //     UsersDetailsData?.length > 0 && UsersDetailsData?.forEach((i) => {
    //         if (parseFloat(i?.user?.minimum_investment_size) >= parseFloat(arrofInvementSize[0])) {
    //             newArray.push(i)
    //         }
    //     })
    // }
    else {
      let dataofAscSort = UsersDetailsData;
      if (dataofAscSort?.length > 0 && e.target.value == "A_to_Z") {
        newArray = [...sortUserData]?.sort((a, b) =>
          a.user.minimum_investment_size == b.user.minimum_investment_size
            ? 0
            : a.user.minimum_investment_size == null
            ? 1
            : b.user.minimum_investment_size == null
            ? -1
            : a.user.minimum_investment_size > b.user.minimum_investment_size
            ? 1
            : -1
        );
      } else if (dataofAscSort?.length > 0 && e.target.value == "Z_to_A") {
        newArray = [...sortUserData]?.sort((a, b) =>
          a.user.minimum_investment_size == b.user.minimum_investment_size
            ? 0
            : a.user.minimum_investment_size == null
            ? 1
            : b.user.minimum_investment_size == null
            ? -1
            : a.user.minimum_investment_size > b.user.minimum_investment_size
            ? -1
            : 1
        );
      }
      // let arrofInvementSize = e.target.value.split('_')
      // console.log(arrofInvementSize, "arrofInvementSize");
      // UsersDetailsData?.length > 0 && UsersDetailsData?.forEach((i) => {
      //     if (parseFloat(i?.user?.minimum_investment_size) >= parseFloat(arrofInvementSize[0]) && parseFloat(i?.user?.minimum_investment_size) <= parseFloat(arrofInvementSize[2])) {
      //         newArray.push(i)
      //     }
      // })
      // A_to_Z
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
  };

  const sortByAssestsUnderMng = (e) => {
    setAssestMngSortValue(e.target.value);
    let newArray = [];
    if (e.target.value == "sort_by_assestUnderMng") {
      UsersDetailsData?.length > 0 &&
        UsersDetailsData?.forEach((i) => {
          newArray.push(i);
        });
    }
    //  else if (e.target.value == "100000_and_above") {

    //     let arrofInvementSize = e.target.value.split('_')
    //     UsersDetailsData?.length > 0 && UsersDetailsData?.forEach((i) => {
    //         if (parseFloat(i?.user?.asset_under_management) >= parseFloat(arrofInvementSize[0])) {
    //             newArray.push(i)
    //         }
    //     })
    // }
    else {
      let dataofAscSort = UsersDetailsData;
      if (dataofAscSort?.length > 0 && e.target.value == "A_to_Z") {
        newArray = [...sortUserData]?.sort((a, b) =>
          a.user.asset_under_management == b.user.asset_under_management
            ? 0
            : a.user.asset_under_management == null
            ? 1
            : b.user.asset_under_management == null
            ? -1
            : a.user.asset_under_management > b.user.asset_under_management
            ? 1
            : -1
        );
      } else if (dataofAscSort?.length > 0 && e.target.value == "Z_to_A") {
        newArray = [...sortUserData]?.sort((a, b) =>
          a.user.asset_under_management == b.user.asset_under_management
            ? 0
            : a.user.asset_under_management == null
            ? 1
            : b.user.asset_under_management == null
            ? -1
            : a.user.asset_under_management > b.user.asset_under_management
            ? -1
            : 1
        );
      }
      // let arrofInvementSize = e.target.value.split('_')
      // console.log(arrofInvementSize, "arrofInvementSize");
      // UsersDetailsData?.length > 0 && UsersDetailsData?.forEach((i) => {
      //     if (parseFloat(i?.user?.asset_under_management) >= parseFloat(arrofInvementSize[0]) && parseFloat(i?.user?.asset_under_management) <= parseFloat(arrofInvementSize[2])) {
      //         newArray.push(i)
      //     }
      // })
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
  };

  const underConstFunc = () => {
    toast.warn("This Field is under Construction", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const sortByFundFunc = (e) => {
    setFundSortValue(e.target.value);
    let newArray = [];
    if (e.target.value == "sort_by_fund") {
      UsersDetailsData.forEach((i) => {
        newArray.push(i);
      });
    } else {
      UsersDetailsData.forEach((i) => {
        if (i?.user?.type_of_fund == e.target.value) {
          newArray.push(i);
        }
      });
    }

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: 1,
        PageSizeClosedDeals,
        data: newArray,
      })
    );
    console.log(newArray, "newArray");
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
      // dispatch(InvestorsDataInFoundersDashboard({ currentPageClosedDeals, PageSizeClosedDeals, data: [] }))
      // dispatch(InvestorsDataInFoundersDashboard({ currentPageClosedDeals, PageSizeClosedDeals, data: UsersDetailsData }))
      getUserDetalsFunc();
      setSortNameTrue(false);
    }
  };

  const getSortByNameFUnc = () => {
    // data4.reverse()
    // console.log(sortUserData, "a?.user?.fund_namedata4");

    console.log(sortUserData, "before");

    let newArrSort = [...sortUserData]?.sort((a, b) =>
      a.user.fund_name?.toLowerCase() == b.user.fund_name?.toLowerCase()
        ? 0
        : a.user.fund_name == null
        ? 1
        : b.user.fund_name == null
        ? -1
        : a.user.fund_name.toLowerCase() > b.user.fund_name.toLowerCase()
        ? 1
        : -1
    );
    // data4.reverse()
    console.log(newArrSort, "after");

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals,
        PageSizeClosedDeals,
        data: newArrSort,
      })
    );
  };

  const getSortByNameDescFUnc = (e) => {
    let newArrSort = [...sortUserData]?.sort((a, b) =>
      a.user.fund_name?.toLowerCase() == b.user.fund_name?.toLowerCase()
        ? 0
        : a.user.fund_name == null
        ? 1
        : b.user.fund_name == null
        ? -1
        : a.user.fund_name.toLowerCase() > b.user.fund_name.toLowerCase()
        ? -1
        : 1
    );
    // data4.reverse()

    // data4.reverse()
    console.log(newArrSort, "after");

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals,
        PageSizeClosedDeals,
        data: newArrSort,
      })
    );
  };

  const changeMainFunc = (page) => {
    setCurrentPageClosedDeals(page);
    // if (sortNameTrue == true) {

    dispatch(
      InvestorsDataInFoundersDashboard({
        currentPageClosedDeals: page,
        PageSizeClosedDeals,
        data: investorsDataDashboarddata,
      })
    );
    // } else {

    // dispatch(InvestorsDataInFoundersDashboard({ currentPageClosedDeals:page, PageSizeClosedDeals, data: [] }))
    //     dispatch(InvestorsDataInFoundersDashboard({ currentPageClosedDeals: page, PageSizeClosedDeals, data: UsersDetailsData }))
    // }
  };
  const showfilterFunc = () => {
    setShowFilter(!showFilter);
  };

  console.log(
    InvestorsDataInFoundersDashboardData,
    UsersDetailsData,
    "InvestorsDataInFoundersDashboardData"
  );

  return (


    <div className="page-wrapper" style={{ paddingTop: "60px" }}>

      {isPopupOpen && (
        <div className="popup-container" 
          style={{
            display: "block",
            position: "fixed",
            top: "20vh",
            marginLeft: "17%",
            zIndex: "1004",
            width: "45%",
            padding: "12px",
            backgroundColor: "rgb(253 254 255)",
            boxShadow: "-1px 21px 34px 15px #dddddd",
            borderRadius: "10px",
          }}
        >
          <div style={{ width: "100%", marginBottom: "5px" }}>
            <button
              style={{
                float: "right",
                border: "0px",
                backgroundColor: "white ",
                color: "#6345ED",
                fontWeight:"600",
                marginBottom: "5px",
                marginRight: "5px",
                borderRadius: "5px",
              }}
              onClick={() => setIsPopupOpen(false)}
            >
              X
            </button>
          </div>
          <img style={{ width: "100%", borderRadius: "15px" }} src={StepsImage}></img>
        </div>
      ) 
      }

      <div className="content container-fluid">
        <div>
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">
                    Welcome{" "}
                    {userDetailsPageData.length > 0 &&
                      userDetailsPageData[0]?.first_name}
                    !
                  </h3>
                </div>
              </div>
            </div>
            <div className="header-right"></div>
          </div>
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "2px",
              boxShadow: "0px 10px 20px #C4C8D0",
            }}
          >
            <div className="row" style={{ margin: "0px" }}>
              <div className="col-md-6" style={{ padding: "0px" }}>
                <div className="borderValueAll" style={{ padding: "15px" }}>
                  <div className="row">
                    <div
                      className="col-md-12"
                      style={{ padding: "0px", marginBottom: "10px" }}
                    >
                      <div
                        className="row align-items-center"
                        style={{
                          width: "100%",
                          margin: "0px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div className="col" style={{ padding: "0px" }}>
                          {/* mt-4 */}
                          <div className="search ">
                            <h3 className="card-title mb-0">
                              Fundraising Analytics
                            </h3>
                          </div>
                        </div>
                        <div className="col-auto float-right ml-auto">
                          <button
                            className="btn add-btn2"
                            style={{
                              margin: "0px",
                              borderRadius: "2px",
                              marginBottom: "0px",
                              marginRight: "0px",
                              width: "75px",
                              padding: "5px",
                            }}
                            onClick={() => underConstFunc()}
                          >
                            View More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className=" col-md-6 col-sm-6 col-lg-6 col-xl-6"
                      style={{ paddingRight: "8px" }}
                    >
                      <div
                        className=" card dash-widget"
                        style={{ height: "100px ", marginBottom: "16px" }}
                      >
                        <div className="card-body" style={{ padding: "15px" }}>
                          <span className="dash-widget-icon">
                            <i
                              className="fa fa-cubes"
                              style={{ fontSize: "26px" }}
                            />
                          </span>
                          <div className="dash-widget-info">
                            {/* 112 */}
                            <h3 style={{ fontSize: "18px" }} className="mb-2">
                              {allProjectFundingData.length > 0 ? (
                                <CountUp
                                  end={
                                    allProjectFundingData[0]
                                      ?.total_fund_raise_target
                                  }
                                  separator=","
                                  duration={2.5}
                                />
                              ) : (
                                <CountUp end={0} duration={2.5} />
                              )}
                              &nbsp;
                              {allProjectFundingData?.length > 0 &&
                              allProjectFundingData[0]?.currency != null &&
                              allProjectFundingData[0]?.currency !=
                                undefined ? (
                                allProjectFundingData[0]?.currency == "BUSD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={BUSDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CAD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CADimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "AUD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={AUDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CNY" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CNYimaage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "DAI" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={DAIimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "EURO" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={EURimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "INR" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={INRimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "RUBLE" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={RUBLEimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "SGD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={SGDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDC" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDCimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDT" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDTimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={usdimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "POUND" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={POUNDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YUAN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YUANimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YEN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YENimage}
                                  ></img>
                                ) : (
                                  <></>
                                )
                              ) : (
                                <></>
                              )}
                            </h3>
                            <span
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Total Fund Raise Target
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="respcard col-md-6 col-sm-6 col-lg-6 col-xl-6"
                      style={{ paddingLeft: "8px" }}
                    >
                      <div
                        className=" card dash-widget"
                        style={{ height: "100px ", marginBottom: "16px" }}
                      >
                        <div className="card-body" style={{ padding: "15px" }}>
                          <span className="dash-widget-icon">
                            <i
                              className="fa fa-usd"
                              style={{ fontSize: "26px" }}
                            />
                          </span>
                          <div className="dash-widget-info">
                            {/* <h3>44</h3> */}
                            <h3 style={{ fontSize: "18px" }} className="mb-2">
                              {allProjectFundingData.length > 0 ? (
                                <CountUp
                                  end={allProjectFundingData[0]?.fund_raised}
                                  separator=","
                                  duration={2.5}
                                />
                              ) : (
                                <CountUp end={0} duration={2.5} />
                              )}
                              &nbsp;
                              {allProjectFundingData?.length > 0 &&
                              allProjectFundingData[0]?.currency != null &&
                              allProjectFundingData[0]?.currency !=
                                undefined ? (
                                allProjectFundingData[0]?.currency == "BUSD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={BUSDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CAD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CADimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "AUD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={AUDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CNY" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CNYimaage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "DAI" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={DAIimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "EURO" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={EURimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "INR" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={INRimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "RUBLE" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={RUBLEimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "SGD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={SGDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDC" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDCimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDT" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDTimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={usdimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "POUND" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={POUNDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YUAN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YUANimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YEN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YENimage}
                                  ></img>
                                ) : (
                                  <></>
                                )
                              ) : (
                                <></>
                              )}
                            </h3>
                            <span
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Fund Raised
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="respcard2 col-md-6 col-sm-6 col-lg-6 col-xl-6"
                      style={{ paddingRight: "8px" }}
                    >
                      <div
                        className=" card dash-widget"
                        style={{ height: "100px ", margin: "0px" }}
                      >
                        <div className="card-body" style={{ padding: "15px" }}>
                          <span className="dash-widget-icon">
                            <i
                              className="fa fa-diamond"
                              style={{ fontSize: "26px" }}
                            />
                          </span>
                          <div className="dash-widget-info">
                            {/* <h3>37</h3> */}
                            <h3 style={{ fontSize: "18px" }} className="mb-2">
                              {userDetailsDashboardData.length > 0 ? (
                                <CountUp
                                  end={
                                    userDetailsDashboardData[0].amount_rejected
                                  }
                                  duration={2.5}
                                  separator=","
                                />
                              ) : (
                                <CountUp end={0} duration={2.5} />
                              )}
                              &nbsp;
                              {allProjectFundingData?.length > 0 &&
                              allProjectFundingData[0]?.currency != null &&
                              allProjectFundingData[0]?.currency !=
                                undefined ? (
                                allProjectFundingData[0]?.currency == "BUSD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={BUSDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CAD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CADimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "AUD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={AUDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CNY" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CNYimaage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "DAI" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={DAIimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "EURO" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={EURimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "INR" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={INRimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "RUBLE" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={RUBLEimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "SGD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={SGDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDC" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDCimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDT" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDTimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={usdimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "POUND" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={POUNDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YUAN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YUANimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YEN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YENimage}
                                  ></img>
                                ) : (
                                  <></>
                                )
                              ) : (
                                <></>
                              )}
                            </h3>
                            <span
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Amount In Escrow
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=" col-md-6 col-sm-6 col-lg-6 col-xl-6"
                      style={{ paddingLeft: "8px" }}
                    >
                      <div
                        className=" card dash-widget"
                        style={{ height: "100px ", margin: "0px" }}
                      >
                        <div className="card-body" style={{ padding: "15px" }}>
                          <span className="dash-widget-icon">
                            <i
                              className="fa fa-user"
                              style={{ fontSize: "26px" }}
                            />
                          </span>
                          <div className="dash-widget-info">
                            {/* <h3>218</h3> */}
                            <h3 style={{ fontSize: "18px" }} className="mb-2">
                              {userDetailsDashboardData.length > 0 ? (
                                <CountUp
                                  end={userDetailsDashboardData[0].my_rewards}
                                  separator=","
                                  duration={2.5}
                                />
                              ) : (
                                <CountUp end={0} duration={2.5} />
                              )}
                              &nbsp;
                              {allProjectFundingData?.length > 0 &&
                              allProjectFundingData[0]?.currency != null &&
                              allProjectFundingData[0]?.currency !=
                                undefined ? (
                                allProjectFundingData[0]?.currency == "BUSD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={BUSDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CAD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CADimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "AUD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={AUDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "CNY" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={CNYimaage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "DAI" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={DAIimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "EURO" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={EURimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "INR" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={INRimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "RUBLE" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={RUBLEimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "SGD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={SGDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDC" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDCimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USDT" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={USDTimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "USD" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={usdimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "POUND" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={POUNDimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YUAN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YUANimage}
                                  ></img>
                                ) : allProjectFundingData[0]?.currency ==
                                  "YEN" ? (
                                  <img
                                    style={{ width: "30px", height: "30px" }}
                                    src={YENimage}
                                  ></img>
                                ) : (
                                  <></>
                                )
                              ) : (
                                <></>
                              )}
                            </h3>
                            <span
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              Escrow Unlocked
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 col-md-6 col-sm-12"
                style={{ padding: "0px" }}
              >
                <div
                  className="borderValueAll"
                  style={{
                    border: "2px solid #E3E9EF",
                    padding: "15px",
                    marginLeft: "10px",
                    height: "100%",
                  }}
                >
                  <div className="row">
                    <div
                      className="col-md-12 "
                      style={{ padding: "0px", marginBottom: "10px" }}
                    >
                      <div
                        className="row align-items-center"
                        style={{ width: "100%", margin: "0px" }}
                      >
                        <div className="col" style={{ padding: "0px" }}>
                          {/* mt-4 mb-2*/}
                          <div className="search ">
                            {/* style={{ padding: '10px' }} */}
                            <h3 className="card-title mb-0">Project Score </h3>
                          </div>
                        </div>
                        <div className="col-auto float-right ml-auto">
                          <button
                            className="btn add-btn2"
                            style={{
                              margin: "0px",
                              borderRadius: "2px",
                              marginBottom: "0px",
                              marginRight: "0px",
                              width: "75px",
                              padding: "5px",
                            }}
                            onClick={() => underConstFunc()}
                          >
                            View More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* style={{ marginTop: '10%' }} */}
                  <div className="row" style={{ height: "80%" }}>
                    <div
                      className="col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ height: "120px", width: "115px" }}>
                        {overallRatingScore != null &&
                        overallRatingScore != undefined ? (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            // labelStyle={{
                            //     fontSize: "5px",
                            //     fill: "#000"
                            // }}
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              {
                                title: "One",
                                value: 10 - overallRatingScore,
                                color: "#CBEDFF",
                              },
                              {
                                title: "Two",
                                value: overallRatingScore,
                                color: "#6345ED",
                              },
                              // { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                            // radius={30}
                          />
                        ) : (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              { title: "One", value: 10, color: "#CBEDFF" },
                              { title: "Two", value: 0, color: "#6345ED" },
                            ]}
                          />
                        )}
                      </div>

                      {overallRatingScore != null &&
                      overallRatingScore != undefined ? (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {overallRatingScore}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {0}
                        </div>
                      )}

                      <div style={{ width: "auto", textAlign: "center" }}>
                        <h3
                          className="card-title mb-0"
                          style={{ padding: "5px", fontSize: "16px" }}
                        >
                          Overall Score
                        </h3>
                      </div>
                      {/* <div style={{ marginTop: '-85px', width:'115px',textAlign:'center', fontSize: '18px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                    </div>
                    <div
                      className="col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ height: "120px", width: "115px" }}>
                        {investorRatingScore != null &&
                        investorRatingScore != undefined ? (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              {
                                title: "One",
                                value: 10 - investorRatingScore,
                                color: "#CBEDFF",
                              },
                              {
                                title: "Two",
                                value: investorRatingScore,
                                color: "#6345ED",
                              },
                            ]}
                          />
                        ) : (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              { title: "One", value: 10, color: "#CBEDFF" },
                              { title: "Two", value: 0, color: "#6345ED" },
                            ]}
                          />
                        )}
                      </div>

                      {investorRatingScore != null &&
                      investorRatingScore != undefined ? (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {investorRatingScore}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {0}
                        </div>
                      )}

                      <div style={{ width: "auto", textAlign: "center" }}>
                        <h3
                          className="card-title mb-0"
                          style={{ padding: "5px", fontSize: "16px" }}
                        >
                          Investor Score
                        </h3>
                      </div>
                    </div>
                    <div
                      className="col"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ height: "120px", width: "115px" }}>
                        {validatorRatingScore != null &&
                        validatorRatingScore != undefined ? (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              {
                                title: "One",
                                value: 10 - validatorRatingScore,
                                color: "#CBEDFF",
                              },
                              {
                                title: "Two",
                                value: validatorRatingScore,
                                color: "#6345ED",
                              },
                            ]}
                          />
                        ) : (
                          <PieChart
                            animate
                            animationDuration={500}
                            animationEasing="ease-out"
                            labelPosition={45}
                            lineWidth={40}
                            data={[
                              { title: "One", value: 10, color: "#CBEDFF" },
                              { title: "Two", value: 0, color: "#6345ED" },
                            ]}
                          />
                        )}
                      </div>

                      {validatorRatingScore != null &&
                      validatorRatingScore != undefined ? (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {validatorRatingScore}
                        </div>
                      ) : (
                        <div
                          style={{
                            marginTop: "-30px",
                            width: "115px",
                            textAlign: "center",
                            fontSize: "24px",
                            fontWeight: "600",
                            position: "absolute",
                          }}
                        >
                          {0}
                        </div>
                      )}

                      <div style={{ width: "auto", textAlign: "center" }}>
                        <h3
                          className="card-title mb-0"
                          style={{ padding: "5px", fontSize: "16px" }}
                        >
                          Guardian Score
                        </h3>
                      </div>
                      {/* <div style={{ marginTop: '-85px', width:'115px',textAlign:'center', fontSize: '18px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row"
              style={{ marginTop: "20px", marginBottom: "0px" }}
            >
              <div className="col-md-12">
                <div className="borderValueAll" style={{ padding: "15px" }}>
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
                          <div className="search">
                            {/* mt-4 mb-2 */}
                            <h3 className="card-title mb-0">Investors</h3>
                          </div>
                        </div>
                        {/* margin: '10px',, marginBottom: '0px', marginRight: '0px'  */}
                        <div className="col-auto float-right ml-auto">
                          <button
                            className="btn add-btn2"
                            style={{ borderRadius: "2px" }}
                            onClick={() => showfilterFunc()}
                          >
                            Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showFilter == true ? (
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{
                          padding: "0px",
                          marginBottom: "10px",
                          display: "flex",
                        }}
                      >
                        <div className="col-md-1" style={{ display: "flex" }}>
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

                        <div className="col-md-3">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height square-edges"
                                style={{ fontWeight: "500" }}
                                value={investSortValue}
                                onChange={(e) => sortByStageofIvmt(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sort_by_stage_invst"
                                >
                                  Stage of Investments
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Pre Seed"
                                >
                                  Pre Seed
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Seed"
                                >
                                  Seed
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Early Stage"
                                >
                                  Early Stage
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Late Stage"
                                >
                                  Late Stage
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="OTC"
                                >
                                  OTC
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height square-edges"
                                style={{ fontWeight: "500" }}
                                value={fundSortValue}
                                onChange={(e) => sortByFundFunc(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sort_by_fund"
                                >
                                  Type of Fund
                                </option>
                                {/* 
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="High Networth Individual">High Networth Individual</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Private Equity Firm">Private Equity Firm</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Mirco VC">Mirco VC</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Hedge Fund">Hedge Fund</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Web3 Startup">Web3 Startup</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Decentralised VC">Decentralised VC</option>
                                                                <option style={{ fontSize: '13px', fontWeight: "500" }} value="Family Office">Family Office</option> */}
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Angel Investor"
                                >
                                  Angel Investor
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="CEX"
                                >
                                  CEX
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Venture Capital"
                                >
                                  Venture Capital
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Family Office"
                                >
                                  Family Office
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Grants"
                                >
                                  Grants
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Incubator"
                                >
                                  Incubator
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Corporate Investors"
                                >
                                  Corporate Investors
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Investment DAO"
                                >
                                  Investment DAO
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Decentralised VC"
                                >
                                  Decentralised VC
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                  value="Syndicate"
                                >
                                  Syndicate
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height squarSelecte-edges"
                                style={{ fontWeight: "500" }}
                                value={PrefSecSortValue}
                                onChange={(e) => sortByPreferedFunc(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sort_by_prefered"
                                >
                                  Prefered Sectors
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="DEFI"
                                >
                                  DEFI
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="DAO"
                                >
                                  DAO
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Gaming"
                                >
                                  Gaming
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Exchange"
                                >
                                  Exchange
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="NFT"
                                >
                                  NFT
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Layer 1&2"
                                >
                                  Layer 1&2
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Oracles"
                                >
                                  Oracles
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Deep Tech"
                                >
                                  Deep Tech
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="CEFI"
                                >
                                  CEFI
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Gamefi"
                                >
                                  Gamefi
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="P2E"
                                >
                                  P2E
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="KYC & AML"
                                >
                                  KYC & AML
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="IOT"
                                >
                                  IOT
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="NFT Marketplace"
                                >
                                  NFT Marketplace
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Enterprise"
                                >
                                  Enterprise
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Payments"
                                >
                                  Payments
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Others"
                                >
                                  Others
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-3">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height square-edges"
                                style={{ fontWeight: "500" }}
                                value={assestMngSortValue}
                                onChange={(e) => sortByAssestsUnderMng(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sort_by_assestUnderMng"
                                >
                                  Assets Under Management
                                </option>

                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="A_to_Z"
                                >
                                  Ascending Order
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Z_to_A"
                                >
                                  Descending Order
                                </option> */}
                                {/* <option style={{ fontSize: '13px' }} value="A_to_Z">A to Z</option>
      <option style={{ fontSize: '13px' }} value="Z_to_A">Z to A</option> */}
                                {/* <option style={{ fontSize: '13px' }} value="1_to_20000">range 1 to 20000</option>
      <option style={{ fontSize: '13px' }} value="20000_to_50000">range 20000 to 50000</option>
      <option style={{ fontSize: '13px' }} value="50000_to_100000">range 50000 to 100000</option>
      <option style={{ fontSize: '13px' }} value="100000_and_above">range 100000 and above</option> */}
                              {/* </select>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-md-1">
                          <div
                            className="form-group"
                            style={{ height: "42px" }}
                          >
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
                        className="col-md-12"
                        style={{
                          padding: "0px",
                          marginBottom: "10px",
                          display: "flex",
                        }}
                      >
                        <div className="col-md-1">
                          <div className="form-group"></div>
                        </div>

                        {/* <div className="col-md-3">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height square-edges"
                                style={{ fontWeight: "500" }}
                                value={minInvSize}
                                onChange={(e) => sortByMinInvtSize(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sort_by_mininvt"
                                >
                                  Minimum Investment Size
                                </option>

                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="A_to_Z"
                                >
                                  Ascending Order
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Z_to_A"
                                >
                                  Descending Order
                                </option>
                              </select>
                            </div>
                          </div>
                        </div> */}

                        <div className="col-md-2">
                          <div className="form-group">
                            <div>
                              <select
                                className="form-control btn-block-height square-edges"
                                style={{ fontWeight: "500" }}
                                value={sortConected}
                                onChange={(e) => sortByConnected(e)}
                              >
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="sorteby_connected"
                                >
                                  Connections
                                </option>
                                {/* <option style={{ fontSize: '13px', fontWeight: "500" }} value="Pending">Pending</option> */}
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Requested"
                                >
                                  Requested
                                </option>
                                <option
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "500",
                                  }}
                                  value="Connected"
                                >
                                  Connected
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2">
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

                  <div className="row mb-2">
                    {InvestorsDataInFoundersDashboardData?.length > 0 &&
                      InvestorsDataInFoundersDashboardData?.filter(i => i?.user?.fund_name != null).map((i, index) => (
                        <CardInFounder
                          i={i}
                          index={index}
                          investorConnectFunc={investorConnectFunc}
                          opennewWindow={opennewWindow}
                        />
                      ))}
                    {/* {InvestorsDataInFoundersDashboardData?.length > 0 && InvestorsDataInFoundersDashboardData?.filter(i => i?.user?.fund_name != null).map((i,index) => 
(
    <CardInFounder i={i} index={index} investorConnectFunc={investorConnectFunc} opennewWindow={opennewWindow} />
))} */}
                  </div>

                  <div className="row ">
                    <div className="col-md-12">
                      <Pagination
                        className="pagination-bar"
                        currentPage={currentPageClosedDeals}
                        totalCount={investorsDataDashboarddata.length}
                        pageSize={PageSizeClosedDeals}
                        onPageChange={(page) => changeMainFunc(page)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
      <CongPopupLaunch
        value="Your Request to Connect has been Sent Successfully"
        show={showPopupLaunch}
        handleClose={handleCloseShowPopup}
      />
    </div>
  );
};

export default FounderNewDashboard;
