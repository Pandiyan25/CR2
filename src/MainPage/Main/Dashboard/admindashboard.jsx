
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Cryptologo2, Cryptologo3, cryptoCover3, cryptoCover2, Avatar_07, Avatar_06, Avatar_14, polygon, designLogo2, fighterCover, designLogo, gamingImg, logoCrypto } from '../../../Entryfile/imagepath.jsx'
import './index.css'
import CountUp from 'react-countup';

// import {
//   BarChart, Bar, Cell, ResponsiveContainer,
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
import Rating from 'react-rating'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "../../index.css"
import { Button, Card } from 'react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../paginationfunction.jsx';
import { apiURI } from '../../../config/config.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice.js';
import { founderDataInInvestorsDashboard, projectId } from '../../../reducers/ConstantSlice.js';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice.js';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice.js';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice.js';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice.js';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import CNYimaage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USD.png'
import EURimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/RUBBLE.png'

// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';

import { useHistory } from "react-router-dom";
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice.js';
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faGlobe, faRetweet, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedinIn, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { CanvasJSChart } from 'canvasjs-react-charts';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice.js';
import Pagination from '../../../Entryfile/Pagination/index.jsx';
import CongPopupLaunch from './congPopuplaunch.jsx';
import { fetchConnectReq, searchallconnect } from '../../../reducers/ConnectReqSlice.js';
const AdminDashboard = () => {

  // useEffect(() => {
  //   let firstload = localStorage.getItem("firstload")
  //   if (firstload === "true") {
  //     setTimeout(function () {
  //       window.location.reload(1)
  //       localStorage.removeItem("firstload")
  //     }, 1000)
  //   }
  // });
  const [showPopupLaunch, setShowPopupLaunch] = useState(false)
  const founderDataInInvestorsDashboardData = useSelector((state) => state.constVar.founderDataInInvestorsDashboard)

  const FoundersDataDashboardData = useSelector((state) => state.constVar.FoundersDataDashboard)
  let PageSizeClosedDeals = 6;
  const [currentPageClosedDeals, setCurrentPageClosedDeals] = useState(1);
  const [mydata2, setMydata2] = useState([
    { name: "satisfied", y: 5 },
    { name: "Unsatisfied", y: 5 },
  ])
  const dispatch = useDispatch()
  let history = useHistory()
  const loginId = useSelector((state) => state.constVar.loginId)
  const [sortUserData, setSortUserData] = useState([])
  const [proposalDetalsData, setproposalDetalsData] = useState([])
  const [AmtReleased, setAmtReleased] = useState(0)
  const [AmtInEscrow, setAmtInEscrow] = useState(0)
  const [totalInvestedbyUser, setTotalInvestedbyUser] = useState(0)
  const [projectDetailsData, setProjectDetalsData] = useState([])
  const [projectperticularDetailsData, setProjectPerticularDetalsData] = useState([])
  const COLORS = ["orange", "gray"];

  const [fundSortValue, setFundSortValue] = useState(0)
  const [fundRaisedValue, setFundRaisedValue] = useState(0)
  const [nameValue, setNameValue] = useState(0)
  const [natureofProjValue, setNatureofProjValue] = useState(0)
  const [projectStageValue, setProjectStageValue] = useState(0)

  const [sortConnectedValue, setSortConnectedValue] = useState('')

  const [showFilter, setShowFilter] = useState(false)
  const [userDetailsPageData, setuserDetailsPageData] = useState([])
  const data = [
    { name: 'Completed', value: 50, color: 'green' },
    { name: 'Pending', value: 50, color: 'red' },

    // { name: 'Tea', value: 400 },
    // { name: 'Coffee', value: 300 },
    // { name: 'Cola', value: 300 },
    // { name: 'Water', value: 200 },
    // {name: 'Opposers', students: 700},
    // {name: 'Geek-i-knack', students: 200},
    // {name: 'Geek-o-mania', students: 1000}
  ];



  const [tableData, settableData] = useState([
    {
      sno: 1,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 2,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '3'

    },
    {
      sno: 3,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '4'

    },
    {
      sno: 4,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '5'

    },
    {
      sno: 5,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '1'

    },
    {
      sno: 6,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'
    },
    {
      sno: 7,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '3'

    },
    {
      sno: 8,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '4'

    },
    {
      sno: 9,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '2000',
      fundRaisedtillNow: '5000 USD',
      rateProject: '5'

    },
    {
      sno: 10,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: 1000,
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 11,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '2000',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 12,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '3000',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2',
      status: 'Rejected',
      fundReleasedTillDate: '500 USDC',
    }
  ])


  const columns = [
    // {
    //   title: 'S.No',
    //   dataIndex: 'sno',
    //   align: 'center',
    //   sorter: (a, b) => a.sno.length - b.sno.length,
    // },
    {
      title: 'Project Id',
      //   dataIndex: 'proposalNo',
      align: 'center',

      render: (text, record) => (

        <div style={{ color: 'blue', textDecoration: 'underline' }}><Link to='/detail-projects'>{text.project_id}</Link></div>
      ),
    },

    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (text, record) => (
        <img src={designLogo2} alt="" width="20px" />
      ),
      align: 'center',
    },

    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    }
    , {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      sorter: (a, b) => a.description.length - b.description.length,
    },
    , {
      title: ' Total Fund Raise',
      dataIndex: 'total_fund_raised',
      align: 'center',
      render: (text, record) => (

        <div>{text} USD</div>
      ),
      sorter: (a, b) => a.totalFundRaise.length - b.totalFundRaise.length,
    }, {
      title: 'Funds Raised Till Now',
      dataIndex: 'fund_raised_till_now',
      align: 'center',
      sorter: (a, b) => a.fundRaisedtillNow.length - b.fundRaisedtillNow.length,
    }, {
      title: 'Rate Project',
      dataIndex: 'rating',
      align: 'center',
      // sorter: (a, b) => a.rateProject.length - b.rateProject.length,
      render: (text, record) => (
        <Rating
          style={{ color: 'red' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          readonly={true}
          initialRating={text}
        />
      ),
      align: 'center',
    },


  ]

  const columns2 = [
    // {
    //     title: 'S.No',
    //     dataIndex: 'sno',
    //     align: 'center',
    //     sorter: (a, b) => a.sno.length - b.sno.length,
    // },
    {
      title: 'Proposal Id',
      //   dataIndex: 'proposalNo',
      align: 'center',

      render: (text, record) => (

        <div style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => showProposalsDataFun(text)}>{text.proposal_id}</div>
        // onClick={() => showProposalsDataFun(i)}
      ),
      //   sorter: (a, b) => a.position.length - b.position.length,
    },

    {
      title: 'Logo',
      // dataIndex: 'logo',

      render: (text, record) => (
        <img src={text?.project?.logo} alt="" width="20px" style={{ borderRadius: '50px' }} />
      ),
      align: 'center',
      //   sorter: (a, b) => a.salary.length - b.salary.length,
      // },
      //   sorter: (a, b) => a.office.length - b.office.length,
    },

    {
      title: 'Project Name',
      // dataIndex: 'projectName',
      align: 'center',
      render: (text, record) => (

        <div>{text?.project != null && text?.project?.project_name}</div>
        // onClick={() => showProposalsDataFun(i)}
      ),
      //   sorter: (a, b) => a.age.length - b.age.length,
    }, {
      title: 'Proposal Type',
      dataIndex: 'type',
      align: 'center',
      //   sorter: (a, b) => a.age.length - b.age.length,
    }, {
      title: 'Funds Raised till Date',
      // dataIndex: 'fund_raised_till_now',
      // <<<<<<< HEAD
      // =======
      // render: (text, record) => (
      //   text?.fund_raised_till_now != null && text?.fund_raised_till_now != undefined && text?.fund_raised_till_now != '' ?

      //     <div> {Number(text?.fund_raised_till_now).toLocaleString("en-US")} </div>
      //     :
      //     <div></div>
      // onClick={() => showProposalsDataFun(i)}
      // ),
      // >>>>>>> 19b31ff06d17a3e3dab1af83df73abcff16e3740
      align: 'center',
      render: (text, record) => (
        text?.fund_raised_till_now != null && text?.fund_raised_till_now != undefined && text?.fund_raised_till_now != '' ?

          <div> {Number(text?.fund_raised_till_now).toLocaleString("en-US")} </div>
          :
          <div></div>)

      // render: (text, record) => (
      //     <div>{text?.project != null && text.fund_raised_till_now}</div>
      //   sorter: (a, b) => a.age.length - b.age.length,
      // )
      //   sorter: (a, b) => a.age.length - b.age.length,
    },
    , {
      title: 'No. of Validations',
      // dataIndex: 'no_of_validators',
      align: 'center',
      render: (text, record) => (
        text?.no_of_validators != null && text?.no_of_validators != undefined && text?.no_of_validators != '' ?

          <div> {Number(text?.no_of_validators).toLocaleString("en-US")} </div>
          :
          <div></div>)
      //   sorter: (a, b) => a.age.length - b.age.length,
    },
    , {
      title: 'Status',
      dataIndex: 'proposal_status',
      align: 'center',
      render: (text, record) => (


        text == 'Approved' ?
          <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
            <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
            </div></td>
          : (text == 'Rejected' ?
            <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
              <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
              </div></td>
            :
            <td style={{ textAlign: 'center', padding: '10px 0px !important', fontSize: '14px' }}>{text}</td>
          )


      ),
      //   sorter: (a, b) => a.age.length - b.age.length,
    },
    , {
      title: 'Funds Requested',
      // dataIndex: 'funds_requested',
      align: 'center',
      render: (text, record) => (
        text?.funds_requested != null && text?.funds_requested != undefined && text?.funds_requested != '' ?
          // <<<<<<< HEAD

          <div> {Number(text?.funds_requested).toLocaleString("en-US")} </div>
          :
          <div></div>)
      // =======

      //           <div> {Number(text?.funds_requested).toLocaleString("en-US")} </div>
      //           :
      //           <div></div>
      // onClick={() => showProposalsDataFun(i)}
      // ),
      // >>>>>>> 19b31ff06d17a3e3dab1af83df73abcff16e3740
      //   sorter: (a, b) => a.age.length - b.age.length,
    },
    {
      title: 'Released Amount',
      // dataIndex: 'released_amount',
      align: 'center',

      render: (text, record) => (
        <div>{text?.project != null && Number(text?.project?.amount_released).toLocaleString("en-US")}</div>
        //   sorter: (a, b) => a.age.length - b.age.length,
      )
    }, {
      title: 'Project Status',
      // dataIndex: 'projectStatus',
      align: 'center',
      render: (text, record) => (
        text?.project?.status == 'Ongoing' ?
          <div onClick={() => showProposalsDataFun(text)} className=" bg-inverse-warning" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Ongoing
          </div>
          :
          <div onClick={() => showProposalsDataFun(text)} >{text?.project?.status}</div>




      ),
      //   sorter: (a, b) => a.age.length - b.age.length,
    },

    // {
    //   title: '',
    //   dataIndex: 'salary', 
    //   render: (text, record) => (            
    //   <span>$ {text}</span>
    //     ), 
    //   sorter: (a, b) => a.salary.length - b.salary.length,
    // },
  ]

  const getMyOwnProjectDetailsFunc = () => {
    try {

      var query =
        `query GetProject($id: ID) {
          getProject(_id: $id) {
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
            one_line_description
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
          }
        }
     `;
      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            "id": loginId

          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.getProject != null && data?.data?.getProject != undefined) {
            var totalInvested = 0;
            var amountInEscrow = 0;
            var amountReleased = 0;
            setProjectPerticularDetalsData(data?.data?.getProject)

            for (let i = 0; i < data?.data?.getProject.length; i++) {
              totalInvested = data?.data?.getProject[i].amount_invested + totalInvested
            }
            for (let j = 0; j < data?.data?.getProject.length; j++) {
              amountInEscrow = data?.data?.getProject[j].amount_in_escrow + amountInEscrow
            }
            for (let k = 0; k < data?.data?.getProject.length; k++) {
              amountReleased = data?.data?.getProject[k].amount_released + amountReleased
            }
            setTotalInvestedbyUser(totalInvested)
            setAmtInEscrow(amountInEscrow)
            setAmtReleased(amountReleased)
            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
  useEffect(() => {
    getProjectDetailsFunc()
    getMyOwnProjectDetailsFunc()
    getUserDetalsFunc()
  }, [])
  const sendDatatoProjectPage = (i) => {

    console.log(i, "sent");
    dispatch(fetchRoadMapProjectDetails(i))
    dispatch(fetchBudgetProjectDetails(i))
    dispatch(fetchProjectDetails(i))
    dispatch(projectId(i))
    dispatch(fetchFundingProjectDetails(i))
    dispatch(fetchTeamSize(i))
    dispatch(fetchTokenomicsDetails(i))
    dispatch(fetchSocialTeam(i))
    dispatch(fetchBudgetBannerDetails(i))
    history.push('/detail-projects')
  }

  const opennewWindow = (i) => {
    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }

  const handleCloseShowPopup = () => {
    setShowPopupLaunch(false)
  }

  const getUserDetalsFunc = () => {
    try {

      var query =
        `
        query AllProjects($id: ID) {
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
            currency
          }
        }
     `;
      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {

            "id": loginId

          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
            setuserDetailsPageData([data?.data?.getUser])

            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc"
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log(userDetailsPageData, "userDetailsPageData");


  const options = {
    height: 100,
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    label: '',
    toolTip: {
      enabled: false,
    },
    title: {
      
      fontSize: 20,
      // verticalAlign: "bottom",
      // dockInsidePlotArea: true
    },
    subtitles: [{
      text: "23",
      fontSize: 24,
      verticalAlign: "center",
      dockInsidePlotArea: true,
    }],
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      // indexLabel: "{name}: {y}",
      // yValueFormatString: "#,###'%'",
      // dataPoints: mydata2,
      dataPoints: [
        {  y: 80, color:"#6345ED" },
        {  y: 20, color:"white" }
     
        ]
    },

  ]
  }


  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query AllProjects($user: ID) {
          
          allProposals(user: $user) {
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
              one_line_description
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

          
        }
        
        
 `;
      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables:
          {
            "user": loginId,

          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          getFounderProjectDetailsFunc()
          if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
            var arr2 = [];
            if (data?.data?.allProposals?.length > 0) {
              var main = 0
              var divide = 0
              var base11 = 0
              if (data?.data?.allProposals?.length <= 10) {
                base11 = data?.data?.allProposals?.length
              } else {
                base11 = 10
              }
              for (var j = 0; j < base11; j++) {

                arr2.push({
                  _id: data?.data?.allProposals[j]._id,
                  proposal_id: data?.data?.allProposals[j].proposal_id,
                  name: data?.data?.allProposals[j].name,
                  type: data?.data?.allProposals[j].type,
                  funds_requested: data?.data?.allProposals[j].funds_requested,
                  price_per_token: data?.data?.allProposals[j].price_per_token,
                  number_of_tokens: data?.data?.allProposals[j].number_of_tokens,
                  project_token_minted: data?.data?.allProposals[j].project_token_minted,
                  logo: data?.data?.allProposals[j].logo,
                  no_of_validators: data?.data?.allProposals[j].no_of_validators,
                  proposal_status: data?.data?.allProposals[j].proposal_status,
                  reported_expenditure_previous_cycle: data?.data?.allProposals[j].reported_expenditure_previous_cycle,
                  reported_expenditure_till_date: data?.data?.allProposals[j].reported_expenditure_till_date,
                  token_release: data?.data?.allProposals[j].token_release,
                  additional_attachment: data?.data?.allProposals[j].additional_attachment,
                  additional_information: data?.data?.allProposals[j].additional_information,
                  receiving_address: data?.data?.allProposals[j].receiving_address,
                  timeline_update: data?.data?.allProposals[j].timeline_update,
                  fund_requested_for_current_cycle: data?.data?.allProposals[j].fund_requested_for_current_cycle,
                  budget_for_currenct_proposal_cycle: data?.data?.allProposals[j].budget_for_currenct_proposal_cycle,
                  current_proposal_cycle: data?.data?.allProposals[j].current_proposal_cycle,
                  variants: data?.data?.allProposals[j].variants,
                  reported_expenditure: data?.data?.allProposals[j].reported_expenditure,
                  reported_budget: data?.data?.allProposals[j].reported_budget,

                  currency: data?.data?.allProposals[j].currency,
                  validator_status: data?.data?.allProposals[j].validator_status,
                  fund_raised_till_now: data?.data?.allProposals[j].fund_raised_till_now,
                  proposal_blockchain_id: data?.data?.allProposals[j].proposal_blockchain_id,
                  previous_reporting_cycle: data?.data?.allProposals[j].previous_reporting_cycle,
                  previous_reporting_cycle: data?.data?.allProposals[j].previous_reporting_cycle,
                  project: data?.data?.allProposals[j].project,
                  investor: data?.data?.allProposals[j].investor

                })
              }


              setproposalDetalsData(arr2)
            }
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }



  const getFounderProjectDetailsFunc = () => {
    try {

      var query =
        `
        query AllFounders($user: ID) {
          allFounders(user: $user) {
            request_status
            project {
              _id
              user {
                _id
              }
              logo
              cover_page
              email_id
              first_name
              linkedin_profile_link
              last_name
              project_name
              project_description
              one_line_description
              nature_of_project
              project_start_date
              project_tags
              project_stage
              website_link
              whitepaper
              project_id
              rating {
                market_validation
                business_model
                team
                tokenomics
                user_role
                user_id
                remarks
              }
              total_budget
              fund_raised_till_now
              total_fund_raised
              project_end_date
            }
            FundingDetails {
              stage_of_funding
              lead_investor {
                fund_name
                fund_head_quarters
                _id
                email
                user_status
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
                asset_under_management
                projected_invested_till_date
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
                block_pass_kyc_status
                referral_code
                quadrata_kyc_status
                no_of_referrals
                invited_code
                
              }
            }
            TokenDetails {
              expected_token_generation_event
              }
          }
        }
        
 `;
      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables:
          {
            "user": loginId,

          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.allFounders != null && data?.data?.allFounders != undefined) {
            // setProjectDetalsData(data?.data?.allFounders)
            var arr = [];
            if (data?.data?.allFounders?.length > 0) {
              var main = 0
              var divide = 0
              var base10 = 0
              if (data?.data?.allFounders?.length) {
                base10 = data?.data?.allFounders?.length
              } else {
                base10 = 9
              }
              for (var j = 0; j < base10; j++) {
                if (data?.data?.allFounders[j]?.project?.rating?.length > 0) {
                  for (var i = 0; i < data?.data?.allFounders[j]?.project?.rating?.length; i++) {
                    main = main + data?.data?.allFounders[j]?.project?.rating[i].value
                  }
                  divide = (main / data?.data?.allFounders[j]?.project?.rating?.length) / 2;
                  console.log(divide, "divide1");
                } else {
                  main = 0
                  divide = 0
                  console.log(divide, "divide2");
                }


                console.log(data?.data?.allFounders[j]?.project?.project_end_date, "date1");
                var dashboardDate = data?.data?.allFounders[j]?.project?.project_end_date
                dashboardDate = dashboardDate?.split('T')[0];


                console.log(divide, "divide");
                arr.push({
                  _id: data?.data?.allFounders[j]?.project?._id,

                  linkedin_profile_link: data?.data?.allFounders[j]?.project?.linkedin_profile_link,
                  project_name: data?.data?.allFounders[j]?.project?.project_name,
                  one_line_description: data?.data?.allFounders[j]?.project?.one_line_description,
                  nature_of_project: data?.data?.allFounders[j]?.project?.nature_of_project,
                  project_tags: data?.data?.allFounders[j]?.project?.project_tags,
                  project_stage: data?.data?.allFounders[j]?.project?.project_stage,
                  website_link: data?.data?.allFounders[j]?.project?.website_link,
                  whitepaper: data?.data?.allFounders[j]?.project?.whitepaper,
                  project_id: data?.data?.allFounders[j]?.project?.project_id,
                  project_end_date: dashboardDate,
                  total_budget: data?.data?.allFounders[j]?.project?.total_budget,
                  fund_raised_till_now: data?.data?.allFounders[j]?.project?.fund_raised_till_now,
                  total_fund_raised: data?.data?.allFounders[j]?.project?.total_fund_raised,
                  logo: data?.data?.allFounders[j]?.project?.logo,
                  ratingValue: divide,
                  userId: data?.data?.allFounders[j]?.project?.user?._id,
                  request_status: data?.data?.allFounders[j]?.request_status,
                  stage_of_funding:data?.data?.allFounders[j]?. FundingDetails?.stage_of_funding,
                  expected_event :data?.data?.allFounders[j]?. TokenDetails?.expected_token_generation_event,
                  lead_investor_fundname:data?.data?.allFounders[j]?. FundingDetails?.lead_investor?.fund_name,
                  cover_page:data?.data?.allFounders[j]?.project?.cover_page,
                })
              }
              setProjectDetalsData(arr)
              setSortUserData(arr)

              dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: arr }))
              console.log(currentTableDataClosedDeals, 'currentTableDataClosedDealsss')
            }
            //  console.log();
          } else {
            setSortUserData([])
            dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: [] }))
            setProjectDetalsData([])
          }

        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }


  const currentTableDataClosedDeals = useMemo(() => {
    const firstPageIndex = (currentPageClosedDeals - 1) * PageSizeClosedDeals;
    const lastPageIndex = firstPageIndex + PageSizeClosedDeals;
    var data = []
    data = projectDetailsData
    console.log(projectDetailsData, "projectDetailsData in live");
    console.log(data, "data in live");
    if (data.length > 0) {

      return data.slice(firstPageIndex, lastPageIndex);
    } else {

      return data = [];
    }
  }, [currentPageClosedDeals, projectDetailsData]);


  const investorConnectFunc = (id, projId) => {
    try {

      var query =
        `
            mutation CreateConnectionRequest($input: ConnectionRequestInput) {
                createConnectionRequest(input: $input) {
                  _id
                
                  sender_status
                  receiver_status
                }
              }
 `;
      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            "input": {
              "sender": loginId,
              "receiver": id,
              "project": projId

            }
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.createConnectionRequest != null && data?.data?.createConnectionRequest != undefined) {
            // showLaunch()
            dispatch(searchallconnect())

            // 
            console.log('dispatch completed');
            showLaunch()

            dispatch(fetchConnectReq(loginId))
            getProjectDetailsFunc()
            getMyOwnProjectDetailsFunc()
            getUserDetalsFunc()

            //  console.log();
          }

        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const showLaunch = () => {
    setShowPopupLaunch(true)
  }

  const nameSortFunc = (e) => {
    setNameValue(e)
    if (e == 'A_to_Z') {

      console.log(sortUserData, "before");

      let newArrSort = [...sortUserData]?.sort((a, b) => (
        (a.project_name?.toLowerCase() == b.project_name?.toLowerCase()) ? 0 :
          (a.project_name == null) ? 1 :
            (b.project_name == null) ? -1 :
              (a.project_name.toLowerCase() > b.project_name.toLowerCase()) ? 1 : -1
      ))
      dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArrSort }))

    } else if (e == 'Z_to_A') {

      let newArrSort = [...sortUserData]?.sort((a, b) => (
        (a.project_name?.toLowerCase() == b.project_name?.toLowerCase()) ? 0 :
          (a.project_name == null) ? 1 :
            (b.project_name == null) ? -1 :
              (a.project_name.toLowerCase() > b.project_name.toLowerCase()) ? -1 : 1
      ))
      dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArrSort }))

    } else {
      getFounderProjectDetailsFunc()
    }

  }

  const natureOfProjSortFunc = (e) => {
    setNatureofProjValue(e)
    let newArray = []
    if (e == 'sort_by_fund') {

      getFounderProjectDetailsFunc()
    }
    sortUserData.forEach((i) => {
      if (i?.nature_of_project == e) {
        newArray.push(i)
      }
    })
    dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArray }))
  }

  const projectStageSort = (e) => {
    setProjectStageValue(e)
    let newArray = []
    if (e == 'sort_by_prefered') {

      getFounderProjectDetailsFunc()
    } else {
      sortUserData.forEach((i) => {
        if (i?.project_stage == e) {
          newArray.push(i)
        }
      })
    }
    dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArray }))

  }

  const stageFundSortFunc = (e) => {
    setFundSortValue(e)
    let newArray = []
      sortUserData.forEach((i) => {
        if (i?.stage_of_funding == e) {
          newArray.push(i)
      }
    })
    dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArray }))
  }

  const sortByConnectedFunc = (e) => {
    setSortConnectedValue(e)

    let newArray = []
    if (e == "Connected") {
      sortUserData.forEach((i) => {
        if (i?.request_status == 'Connected') {
          newArray.push(i)
          // console.log(i,"sortByPreferedFunc");
        }


      })
    } else if (e == "Requested") {
      sortUserData.forEach((i) => {
        if (i?.request_status == 'Requested') {
          newArray.push(i)
          // console.log(i,"sortByPreferedFunc");
        }


      })
    }

    else if (e == "Pending") {
      sortUserData.forEach((i) => {
        if (i?.request_status != 'Connected' && i?.request_status != 'Requested') {
          newArray.push(i)
          // console.log(i,"sortByPreferedFunc");
        }


      })
    } else {

      getFounderProjectDetailsFunc()
    }
    dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArray }))

  }

  const fundRasiedSort = (e) => {
    if (e == 'sort_by_assestUnderMng') {

      getFounderProjectDetailsFunc()
    } else {

      let newArrSort = [...sortUserData]?.sort((a, b) => (
        (a.fund_raised_till_now?.toLowerCase() == b.fund_raised_till_now?.toLowerCase()) ? 0 :
          (a.fund_raised_till_now == null) ? 1 :
            (b.fund_raised_till_now == null) ? -1 :
              (a.fund_raised_till_now.toLowerCase() > b.fund_raised_till_now.toLowerCase()) ? 1 : -1
      ))

      dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: newArrSort }))
    }
  }

  const clearSortFunc = () => {

    getFounderProjectDetailsFunc()
    setFundSortValue('sort_by_stage_invst')
    setFundRaisedValue('sort_by_assestUnderMng')
    setNameValue('sort_by_name')
    setNatureofProjValue('sort_by_fund')
    setProjectStageValue('sort_by_prefered')
  }

  const pageNumberChangeFunc = (page) => {
    setCurrentPageClosedDeals(page)
    dispatch(founderDataInInvestorsDashboard({ currentPageClosedDeals: 1, PageSizeClosedDeals, data: FoundersDataDashboardData }))

  }

  
  const underConstFunc = () =>{
    toast.warn('This Field is under Construction', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}
const showfilterFunc = () => {
  setShowFilter(!showFilter)
}
console.log(loginId,"skdjhgfsjfdh");
console.log(founderDataInInvestorsDashboardData,"data fetch");




  return (

    <div className="page-wrapper" style={{ paddingTop: '60px' }}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome  {userDetailsPageData.length > 0 && userDetailsPageData[0]?.first_name}!</h3>

                </div>
              </div>
            </div>

          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>










            <div style={{ border: "solid 2px rgb(232, 232, 232)", padding: "10px 15px 15px 15px", borderRadius: "2px" }}>
              <div className="row">
                <div className="col-md-12" style={{ padding: '0px', marginBottom: '5px' }}>


                  <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                    <div className="col" style={{ padding: '0px' }}>
                      {/* mt-4 */}
                      <div className="search">

                        <h3 className="card-title mb-0" >Investments</h3>
                      </div>
                    </div>
                    <div className="col-auto float-right ml-auto">
                      <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={()=>underConstFunc()} >View More</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" >
                <div className="col-md-6">
                  <div className="row" style={{ marginBottom: "15px" }}>




                    <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6" style={{ paddingRight: "0px" }}>
                      <div className=" card dash-widget inv" style={{ height: '100px !important' }}>
                        <div className="card-body" style={{ padding: '15px' }}>
                          <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                          <div className="dash-widget-info">
                            {/* 112 */}
                            <h3 style={{ fontSize: '20px' }} className="mb-2">
                              {totalInvestedbyUser != null && totalInvestedbyUser != undefined ?
                                <CountUp end={totalInvestedbyUser} style={{ marginRight: '5px' }}
                                  duration={2.5}
                                  separator=',' />
                                :
                                <CountUp end={0} style={{ marginRight: '5px' }}
                                  separator=','
                                  duration={2.5} />
                              }
                              {userDetailsPageData?.length > 0 && userDetailsPageData[0]?.currency != null && userDetailsPageData[0]?.currency != undefined ?


                                userDetailsPageData[0]?.currency == "BUSD" ?
                                  <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>
                                  :
                                  userDetailsPageData[0]?.currency == "CAD"
                                    ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img>
                                    :
                                    userDetailsPageData[0]?.currency == "AUD" ?
                                      <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img>
                                      :
                                      userDetailsPageData[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                        userDetailsPageData[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                          userDetailsPageData[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                            userDetailsPageData[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                              userDetailsPageData[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                userDetailsPageData[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                  userDetailsPageData[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                    userDetailsPageData[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                      userDetailsPageData[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                        userDetailsPageData[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                          userDetailsPageData[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                            userDetailsPageData[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : <></>

                                :
                                <></>
                              }
                            </h3>
                            <span style={{ fontSize: '14px' }} className="ft-weight">Amount Invested</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="respcard col-md-6 col-sm-6 col-lg-6 col-xl-6" >
                      <div className=" card dash-widget inv" style={{ height: '100px !important' }}>
                        <div className="card-body" style={{ padding: '15px' }}>
                          <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                          <div className="dash-widget-info">
                            {/* <h3>44</h3> */}
                            <h3 style={{ fontSize: '20px' }} className="mb-2">
                              {projectperticularDetailsData.length > 0 ?
                                <CountUp end={projectperticularDetailsData.length}
                                  duration={2.5}
                                  separator=',' />
                                :
                                <CountUp end={0}
                                  duration={2.5}
                                  separator=',' />
                              }</h3>
                            <span style={{ fontSize: '14px' }} className="ft-weight">Number of Projects</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div className='row' >
                    <div className="respcard2 col-md-6 col-sm-6 col-lg-6 col-xl-6" style={{ paddingRight: "0px" }}>
                      <div className=" card dash-widget inv" style={{ height: '100px !important' }}>
                        <div className="card-body" style={{ padding: '15px' }}>
                          <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                          <div className="dash-widget-info">
                            {/* <h3>37</h3> */}
                            <h3 style={{ fontSize: '20px' }} className="mb-2">
                              {AmtInEscrow != null && AmtInEscrow != undefined ?
                                <CountUp end={AmtInEscrow} style={{ marginRight: '5px' }}
                                  duration={2.5}
                                  separator=',' />
                                :
                                <CountUp end={0} style={{ marginRight: '5px' }}
                                  duration={2.5}
                                  separator=',' />

                              }
                              {userDetailsPageData?.length > 0 && userDetailsPageData[0]?.currency != null && userDetailsPageData[0]?.currency != undefined ?


                                userDetailsPageData[0]?.currency == "BUSD" ?
                                  <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>
                                  :
                                  userDetailsPageData[0]?.currency == "CAD"
                                    ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img>
                                    :
                                    userDetailsPageData[0]?.currency == "AUD" ?
                                      <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img>
                                      :
                                      userDetailsPageData[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                        userDetailsPageData[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                          userDetailsPageData[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                            userDetailsPageData[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                              userDetailsPageData[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                userDetailsPageData[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                  userDetailsPageData[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                    userDetailsPageData[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                      userDetailsPageData[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                        userDetailsPageData[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                          userDetailsPageData[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                            userDetailsPageData[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : <></>

                                :
                                <></>
                              }

                            </h3>
                            <span style={{ fontSize: '14px' }} className="ft-weight">Amount Escrow</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6">
                      <div className=" card dash-widget inv" style={{ height: '100px !important' }}>
                        <div className="card-body" style={{ padding: '15px' }}>
                          <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                          <div className="dash-widget-info">
                            {/* <h3>218</h3> */}
                            <h3 style={{ fontSize: '20px' }} className="mb-2">

                              {AmtReleased != null && AmtReleased != undefined ?
                                <CountUp end={AmtReleased} style={{ marginRight: '5px' }}
                                  duration={2.5}
                                  separator=',' />
                                :
                                <CountUp end={0} style={{ marginRight: '5px' }}
                                  duration={2.5}
                                  separator=',' />
                              }
                              {userDetailsPageData?.length > 0 && userDetailsPageData[0]?.currency != null && userDetailsPageData[0]?.currency != undefined ?


                                userDetailsPageData[0]?.currency == "BUSD" ?
                                  <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>
                                  :
                                  userDetailsPageData[0]?.currency == "CAD"
                                    ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img>
                                    :
                                    userDetailsPageData[0]?.currency == "AUD" ?
                                      <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img>
                                      :
                                      userDetailsPageData[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                        userDetailsPageData[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                          userDetailsPageData[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                            userDetailsPageData[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                              userDetailsPageData[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                userDetailsPageData[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                  userDetailsPageData[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                    userDetailsPageData[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                      userDetailsPageData[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                        userDetailsPageData[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                          userDetailsPageData[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                            userDetailsPageData[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : <></>

                                :
                                <></>
                              }
                            </h3>
                            <span style={{ fontSize: '14px' }} className="ft-weight">Escrow Unlocked</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className="row">
                    <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6">

                      <ResponsiveContainer width='100%' height={200} className="text-center">
                        <PieChart width='100%' height={200}  >
                          <Legend layout="vertical" verticalAlign="top" align="top" />

                          <Pie
                            data={data}
                            color="#000000"
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            isAnimationActive={true}
                            animationBegin={400}
                            animationDuration={1500}
                            padding={{ left: '0px', right: '0px' }}
                            fill="#8884d8"

                          >
                            {
                              data.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                              )
                            }
                          </Pie>

                          <Tooltip content={CustomTooltip} />
                        </PieChart>

                      </ResponsiveContainer>
                      <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: '600', color: '#1890ff' }}>
                        Locked Funds vs Un Locked Funds
                      </div>
                    </div>
                    <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6">
                      <ResponsiveContainer width='100%' height={200} className="text-center">
                        <PieChart width='100%' height={200}  >
                          <Legend layout="vertical" verticalAlign="top" align="top" />

                          <Pie
                            data={data}
                            color="#000000"
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            isAnimationActive={true}
                            animationBegin={400}
                            animationDuration={1500}
                            padding={{ left: '0px', right: '0px' }}
                            fill="#8884d8"

                          >
                            {
                              data.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                              )
                            }
                          </Pie>

                          <Tooltip content={CustomTooltip} />
                        </PieChart>

                      </ResponsiveContainer>

                      <div style={{ textAlign: 'center', fontSize: '15px', fontWeight: '600', color: '#1890ff' }}>
                        Sector Wise Investments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            <div className="row">

              <div className="col-md-12" style={{ padding: '0px', margin: '10px 0px' }}>


                {/* <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px' }}>
                    
                    <div className="search ">

                      <h3 className="card-title mb-0">Proposals</h3>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }}>View More</button>
                  </div>
                </div> */}
              </div>
            </div>
            {/* 
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="card card-table flex-fill" style={{ border: 'none' }}>

                  <div className="card-body">
                    <div className="table-responsive">
                      <Table

                        pagination={false}
                        // pagination={{
                        //   total: proposalDetalsData.length,
                        //   showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        // }
                        // }

                        style={{ overflowX: 'auto' }}
                        columns={columns2}
                        bordered
                        dataSource={proposalDetalsData}
                        rowKey={record => record.id}
                      />

                    </div>
                  </div>

                </div>
              </div>

            </div> */}

            <div className="row">


            </div>
            <div style={{ border: "solid 2px rgb(232, 232, 232)", padding: "15px", borderRadius: "2px" }}>
              <div className="row">

                <div className="col-md-12" style={{ padding: '0px', margin: '0px 0px 10px' }}>


                  <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                    <div className="col" style={{ padding: '0px' }}>
                      <div className="search">
                        {/* mt-4 mb-2 */}
                        <h3 className="card-title mb-0" >Live Project</h3>
                      </div>
                    </div>
                    <div className="col-auto float-right ml-auto">
                                                    <button className="btn add-btn2" style={{ borderRadius: '2px' }} onClick={() => showfilterFunc()}>Filters</button>
                                                </div>
                    {/* <div className="col-auto float-right ml-auto" >
                    <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px', width: '90px', fontSize: '15px', fontWeight: '500' }}>View More</button>
                  </div> */}
                  </div>
                </div>
              </div>

              {showFilter == true ?
              <div className="row">

                <div className="col-md-12" style={{ padding: '0px', marginBottom: '10px', display: 'flex' }}>
                  <div className="col-md-1" style={{ display: 'flex' }}>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', fontWeight: "600" }}>
                      Sort By
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height square-edges" style={{ fontWeight: "600" }} value={fundSortValue} onChange={(e) => stageFundSortFunc(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_stage_invst'> Stage of Funding</option>

                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Preseed">Preseed</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Seed">Seed</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Strategic Round">Strategic Round</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Private Round">Private Round</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Series A">Series A</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Series B">Series B</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="others">others</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height square-edges" style={{ fontWeight: "600" }} value={nameValue} onChange={(e) => nameSortFunc(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_name'>Name</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="A_to_Z">A to Z</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Z_to_A">Z to A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height square-edges" style={{ fontWeight: "600" }} value={natureofProjValue} onChange={(e) => natureOfProjSortFunc(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_fund'>Nature of Project</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="DEFI ">DEFI </option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="gamify">gamify</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="P2E">P2E</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Metaverse">Metaverse</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="exchange">exchange</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="infrastructure">infrastructure</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="layer 1">layer 1</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="layer 2">layer 2</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="NFT">NFT</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="others">others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height squarSelecte-edges" style={{ fontWeight: "600" }} value={projectStageValue} onChange={(e) => projectStageSort(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_prefered'>Project Stage</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Ideation">Ideation</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Proof of concept">Proof of concept</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Minimum Viable Product">Minimum Viable Product</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Growth Stage ">Growth Stage </option>

                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-1" style={{ paddingLeft: '10px' }}>
                    <div className="form-group" style={{ height: '42px' }}>
                      <button className='clear-btn' style={{ fontWeight: "600" }} onClick={() => clearSortFunc()}>Clear</button>
                    </div>
                  </div>


                </div>

                <div className="col-md-12" style={{ padding: '0px', marginBottom: '10px', display: 'flex' }}>

                  <div className="col-md-1" >
                    <div className="form-group" >
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height square-edges" style={{ fontWeight: "600" }} value={fundRaisedValue} onChange={(e) => fundRasiedSort(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_assestUnderMng'>Funds Raised </option>

                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="A_to_Z">Ascending Order</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Z_to_A">Descending Order</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="form-group">
                      <div>
                        <select className="form-control btn-block-height square-edges" style={{ fontWeight: "600" }} value={sortConnectedValue} onChange={(e) => sortByConnectedFunc(e.target.value)}>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value='sort_by_connected'>Connections</option>
                          {/* <option style={{ fontSize: '13px', fontWeight: "600" }} value="Pending">Pending</option> */}
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Requested">Requested</option>
                          <option style={{ fontSize: '13px', fontWeight: "600" }} value="Connected">Connected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>:""}


              <div className="row">
                {/* 555px */}
                {/* {projectDetailsData.length > 0 && projectDetailsData.map((i) => ( */}
                {
                  founderDataInInvestorsDashboardData?.length > 0 ?

                    founderDataInInvestorsDashboardData?.map((i) => (

                      <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12' style={{ marginBottom: '30px' }}>
                        {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff'width: '300px',boxShadow:'500px 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                        {/* width: '100%',  col-sm-4 col-md-4 col-lg-4 col-xl-4*/}
                        <Card className='cardInDashboard-inv' style={{ cursor: 'pointer', gap: '6px' }}>
                        {i.cover_page != null && i.cover_page != undefined && i.cover_page!= '' ?

                              <Card.Img variant="top" src={i.cover_page} style={{height: '130px'}} onClick={() => sendDatatoProjectPage(i?._id)} />
                              :
                              <Card.Img variant="top" src={gamingImg} style={{height: '130px'}} onClick={() => sendDatatoProjectPage(i?._id)} />

                        }
                          
                          <div className='cardFlexDiv' onClick={() => sendDatatoProjectPage(i?._id)} >

                            <div className='cardSubText'>
                              <span style={{ width: '100%', heigth: '100%' }}>
                                {i.logo != null && i.logo != undefined ?

                                  <img src={i?.logo} alt="" className='cardTextImage' />
                                  :
                                  <img src={''} alt="" className='cardTextImage' />

                                }



                              </span>
                            </div>

                            {/* <div className='cardparDiv'>
                      <p className='cardPar'>
                        End Date
                      </p>
                      <p className='cardPar'>
                        March 14, 2022
                      </p>
                    </div> */}
                          </div>
                          <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                            <div className='gridBox'>
                              <div className='firstGrid'>
                                <div className='firstInnerGrid'>
                                  <h2 className='firstGridH2'>

                                    <span className='descSpan'>
                                      {i?.project_name}
                                      {/* {i?.project_name} */}
                                    </span>

                                    {/* Founder First Project */}
                                  </h2>
                                  {/* className='MaindescParagraph' */}
                                  <p  >
                                    <span className='descSpan' style={{overflow:"visible"}}>
                                      {/* <span>{i?.one_line_description}</span> */}
                                      
                                      <span>{i?.one_line_description != null && i?.one_line_description != undefined 
  ? (i.one_line_description.split(' ').length > 10 
    ? i.one_line_description.split(' ').slice(0, 10).join(' ') + '...' 
    : i.one_line_description)
  : ''}</span>
                                      {/* <span>A 3D Metaverse of Everything</span> */}
                                    </span>
                                  </p>
                                  
                                  <div>
                                    <p className='firstDivPara' style={{ margin: '0px', fontWeight:"800"  }}>
                                    <span>
                                    {/* {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''} */}
                                    {i?.project_tags != null && i?.project_tags != undefined 
  ? (i.project_tags.length > 40 ? i.project_tags.substr(0, 40) + '...' : i.project_tags)
  : ''}
                                    </span>
                                    </p>
                                  </div>


                                </div>
                                <div className='secondInnerGrid'>
                                  <div className='secondInnerGridInner'>

                                    <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                                      <CanvasJSChart options={options} height="100px" width="100px" colo showInLegend='false' />
                                    </div>
                                    {/* <ResponsiveContainer width='100%' height={300} className="text-center">
                          <PieChart width='100%' height={300}  >
                            <Legend layout="vertical" verticalAlign="top" align="top" />

                            <Pie
                              data={data}
                              color="#000000"
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={120}
                              isAnimationActive={true}
                              animationBegin={400}
                              animationDuration={1500}
                              padding={{ left: '0px', right: '0px' }}
                              fill="#8884d8"

                            >
                             {
                                data.map((entry, index) =>
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                                )
                              }
                            </Pie>

                            <Tooltip content={CustomTooltip} />
                          </PieChart>
                          
                        </ResponsiveContainer> */}
                                    {/* <Legend /> */}
                                    {/* <img src={''} alt="" className='secondGridDivLogo' /> */}
                                  </div>
                                </div>
                              </div>
                     
                            </div >

                            <div className='gridBox2' >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Nature of Project
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span>
                                    {i?.nature_of_project}

                                    {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                  </span>
                                </p>
                              </div>
                            </div>


                            <div className='gridBox2' >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Project Stage
                                </p>
                                {/* <hr className='firstDivHr' /> */}
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span>
                                    {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''}
                                    {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                  </span>
                                </p>
                              </div>
                            </div>


                            {/* <div className='gridBox3Main' >
                              <div className='firstDivGridBOxtag'>
                                
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  <span>
                                    {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''}
                                    
                                  </span>
                                </p>
                              </div>
                            </div> */}

                            <div className='gridBox3Main2'></div>

                            <div className='gridBox2' >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Stage of Funding
                                </p>

                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span className='gridSpan'>

                                    {i?.stage_of_funding != null && i?.stage_of_funding != undefined ? `${i?.stage_of_funding} ` : ''}

                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className='gridBox2' >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Total Fund Raise
                                </p>

                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span className='gridSpan'>


                                    $  {i?.total_budget != null && i?.total_budget != undefined && i?.total_budget != '' ? Number(i?.total_budget).toLocaleString("en-US") : '0'}

                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className='gridBox2'  >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Funds Raised Till Now
                                </p>
                        
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span className='gridSpan'>
                                    $ {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? Number(i?.fund_raised_till_now).toLocaleString("en-US") : '0'}
                                    {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className='gridBox2'  >
                              <div className='firstDivGridBOx2'>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Lead Investor
                                </p>
                          
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span className='gridSpan'>
                                  {i?.lead_investor_fundname != null && i?.lead_investor_fundname != undefined ? `${i?.lead_investor_fundname} ` : ''}
                                    {/* Sharma */}
                                    {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className='gridBox2'  >
                              <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                <p className='firstDivPara' style={{ margin: '0px' }}>
                                  Expected Token Generation Event
                                </p>
                          
                                <p className='firstDivPararight' style={{ margin: '0px' }}>
                                  <span className='gridSpan'>
                                  {i?.expected_event != null && i?.expected_event != undefined ? `${i?.expected_event} ` : ''}

                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className='gridButtons'>
                              <div className='gridBox3Buttons'>
                                {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ?

                                  <div className="gridBox3IconDiv">
                                    <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                                  </div>
                                  :
                                  ''
                                }
                                {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ?

                                  <div className="gridBox3IconDiv">
                                    <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                                  </div>
                                  :
                                  ''
                                }
                                {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ?

                                  <div className="gridBox3IconDiv">
                                    <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                                  </div>
                                  :
                                  ''
                                }
                              </div>

                     

                              {
                                (i?.request_status == "Connected" || i?.request_status == "Requested" || i?.request_status == "RequestSent") ?
                                  <div className='gridBox3ButtonsMain'>
                                    <div className='gridAlignItems'>
                                      <button className='gridbuttonClass2' style={{ width: "70%" }} >
                                        {i?.request_status}
                                      </button>
                                    </div>
                                  </div>
                                  :


                                  <div className='gridBox3ButtonsMain'>
                                    <div className='gridAlignItems'>
                                      <button className='gridbuttonClass' style={{ width: "70%" }} onClick={() => investorConnectFunc(i?.userId, i?._id)}>
                                        Connect
                                      </button>
                                    </div>
                                  </div>


                              }

                            </div>

                  
                          </Card.Body>

                        </Card>
                      </div>

                    ))
                    :
                    ''
             
                }
              </div>
            </div>

            <div className='row '>


              <div className="col-md-12">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPageClosedDeals}
                  totalCount={FoundersDataDashboardData.length}
                  pageSize={PageSizeClosedDeals}
                  onPageChange={page => pageNumberChangeFunc(page)}
                />
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
      </div>
      <CongPopupLaunch value="Your Request to Connect has been Sent Successfully" show={showPopupLaunch} handleClose={handleCloseShowPopup} />
      {/* /Page Content */}
    </div>
  );
}

export default withRouter(AdminDashboard);
