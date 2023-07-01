

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Rating from 'react-rating'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
import "../../index.css"
import { Button, Card } from 'react-bootstrap';
import { designLogo2, gamingImg, polygon } from '../../../Entryfile/imagepath';
import CountUp from 'react-countup';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { apiURI } from '../../../config/config';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice';
import { projectId } from '../../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice';
import { useHistory } from "react-router-dom";
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faGlobe, faRetweet, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedinIn, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice';

const ValidatorDashboard = () => {

  // useEffect(() => {
  //   let firstload = localStorage.getItem("firstload")
  //   if (firstload === "true") {
  //     setTimeout(function () {
  //       window.location.reload(1)
  //       localStorage.removeItem("firstload")
  //     }, 1000)
  //   }
  // });
  const [mydata2, setMydata2] = useState([
    { name: "satisfied", y: 5 },
    { name: "Unsatisfied", y: 5 },
  ])
  const dispatch = useDispatch()
  let history = useHistory()
  const COLORS = ["orange", "gray"];
  const [proposalDetalsData, setproposalDetalsData] = useState([])
  const [userDetailsDashboardData, setuserDetailsDashboardData] = useState([])

  const [userDetailsPageData, setuserDetailsPageData] = useState([])
  const loginId = useSelector((state) => state.constVar.loginId)
  const [projectDetailsData, setProjectDetalsData] = useState([])
  const [projectperticularDetailsData, setProjectPerticularDetalsData] = useState([])

  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
  ];
  const data = [

    { name: 'Completed', value: 70, color: 'green' },
    { name: 'Pending', value: 50, color: 'red' },
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
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 2,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '3'

    },
    {
      sno: 3,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '4'

    },
    {
      sno: 4,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '5'

    },
    {
      sno: 5,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '1'

    },
    {
      sno: 6,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'
    },
    {
      sno: 7,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '3'

    },
    {
      sno: 8,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '4'

    },
    {
      sno: 9,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '5'

    },
    {
      sno: 10,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 11,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2'

    },
    {
      sno: 12,
      projectId: '#001',
      logo: designLogo2,
      name: 'TEST',
      description: 'TEST',
      totalFundRaise: '1000 USD',
      fundRaisedtillNow: '5000 USD',
      rateProject: '2',
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

        <div style={{ color: 'blue', textDecoration: 'underline' }}>{text.project_id}</div>
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
      dataIndex: 'project_name',
      align: 'center',
    }
    , {
      title: 'Description',
      dataIndex: 'project_description',
      align: 'center',
      sorter: (a, b) => a.project_description.length - b.project_description.length,
    },
    , {
      title: ' Total Fund Raise',
      dataIndex: 'total_fund_raised',
      align: 'center',
      render: (text, record) => (

        <div>{text} USD</div>
      ),
      sorter: (a, b) => a.total_fund_raised.length - b.total_fund_raised.length,
    }, {
      title: 'Funds Raised Till Now',
      dataIndex: 'fund_raised_till_now',
      align: 'center',
      sorter: (a, b) => a.fund_raised_till_now.length - b.fund_raised_till_now.length,
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

          <div> {Number(text?.funds_requested).toLocaleString("en-US")} </div>
          :
          <div></div>)
      //   sorter: (a, b) => a.age.length - b.age.length,
    },
    {
      title: 'Released Amount',
      // dataIndex: 'released_amount',
      align: 'center',

      render: (text, record) => (
        <div>{Number(text?.project != null && text?.project?.amount_released).toLocaleString("en-US")}</div>
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
  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query AllProjects($user: ID) {
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
            cover_page
          }
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
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.allProjects != null && data?.data?.allProjects != undefined) {
            // setProjectDetalsData(data?.data?.allProjects)
            var arr = [];
            if (data?.data?.allProjects?.length > 0) {
              var main = 0
              var divide = 0
              var base10 = 0
              if (data?.data?.allProjects?.length <= 9) {
                base10 = data?.data?.allProjects?.length
              } else {
                base10 = 9
              }
              for (var j = 0; j < base10; j++) {
                if (data?.data?.allProjects[j]?.rating?.length > 0) {
                  for (var i = 0; i < data?.data?.allProjects[j]?.rating?.length; i++) {
                    main = main + data?.data?.allProjects[j]?.rating[i].value
                  }
                  divide = (main / data?.data?.allProjects[j]?.rating?.length) / 2;
                  console.log(divide, "divide1");
                } else {
                  main = 0
                  divide = 0
                  console.log(divide, "divide2");
                }


                console.log(data?.data?.allProjects[j]?.project_end_date, "date1");
                var dashboardDate = data?.data?.allProjects[j]?.project_end_date
                dashboardDate = dashboardDate?.split('T')[0];


                console.log(divide, "divide");
                arr.push({
                  _id: data?.data?.allProjects[j]?._id,

                  linkedin_profile_link: data?.data?.allProjects[j]?.linkedin_profile_link,
                  project_name: data?.data?.allProjects[j]?.project_name,
                  project_description: data?.data?.allProjects[j]?.project_description,
                  nature_of_project: data?.data?.allProjects[j]?.nature_of_project,
                  project_tags: data?.data?.allProjects[j]?.project_tags,
                  project_stage: data?.data?.allProjects[j]?.project_stage,
                  website_link: data?.data?.allProjects[j]?.website_link,
                  whitepaper: data?.data?.allProjects[j]?.whitepaper,
                  project_id: data?.data?.allProjects[j]?.project_id,
                  project_end_date: dashboardDate,
                  total_budget: data?.data?.allProjects[j]?.total_budget,
                  fund_raised_till_now: data?.data?.allProjects[j]?.fund_raised_till_now,
                  total_fund_raised: data?.data?.allProjects[j]?.total_fund_raised,
                  logo: data?.data?.allProjects[j]?.logo,
                  ratingValue: divide,
                  cover_page: data?.data?.allProjects[j]?.cover_page

                })
              }
              setProjectDetalsData(arr)
            }
            //  console.log();
          }
          if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
            var arr = [];
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

                arr.push({
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


              setproposalDetalsData(arr)
            }
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const getDashboardDetails = () => {
    try {

      var query =
        `
        query AllValidatorProposal($validator: ID) {
          getValidatorDashboard(validator: $validator) {
            proposals_validated
            amount_apporved
            amount_rejected
            my_rewards
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
            "validator": loginId
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.AllValidatorProposal != null && data?.data?.AllValidatorProposal != undefined) {
            setuserDetailsDashboardData([data?.data?.AllValidatorProposal])
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }


  const getMyOwnProjectDetailsFunc = () => {
    try {

      var query =
        `query Query($id: ID) {
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
            }
            project_id
            no_of_proposals
            amount_invested
            amount_in_escrow
            total_fund_raised
            fund_raised_till_now
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
            setProjectPerticularDetalsData(data?.data?.getProject)

            for (let i = 0; i < data?.data?.getProject.length; i++) {
              totalInvested = data?.data?.getProject[i].amount_invested + totalInvested
            }
            console.log(totalInvested, "totalInvested");
            setTotalInvestedbyUser(totalInvested)
            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
  useEffect(() => {
    getProjectDetailsFunc()
    getUserDetalsFunc()
    getMyOwnProjectDetailsFunc()
    getDashboardDetails()
  }, [])


  const sendDatatoProjectPage = (i) => {
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

  const opennewWindow = (i) => {

    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }

  const opennewWindow2 = () => {
    window.open(i)

  }


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
      text: "71% Positive",
      verticalAlign: "center",
      fontSize: 24,
      dockInsidePlotArea: true
    }],
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      // indexLabel: "{name}: {y}",
      // yValueFormatString: "#,###'%'",
      dataPoints: mydata2,
    }]
  }

  console.log(projectDetailsData, "projectDetailsData in Dashboard in validator");
  console.log(projectperticularDetailsData, "projectperticularDetailsData in Dashboard in validator");
  return (

    <div className="page-wrapper" style={{ paddingTop: '60px' }}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome {userDetailsPageData.length > 0 && userDetailsPageData[0]?.first_name}!</h3>

                </div>
              </div>
            </div>

          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

            <div className="row">

              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px' }}>
                    {/* mt-4 */}
                    <div className="search mb-2">

                      <h3 className="card-title mb-0" style={{ padding: '15px' }}>Investments</h3>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }}>View More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" >




              <div className="col-md-6">
                <div className="row">
                  <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <div className=" card dash-widget" style={{ height: '100px !important' }}>
                      <div className="card-body" style={{ padding: '15px' }}>
                        <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                        <div className="dash-widget-info">
                          {/* 112 */}
                          <h3 style={{ fontSize: '20px' }}>
                            {userDetailsDashboardData.length > 0 ?
                              <CountUp end={userDetailsDashboardData[0].proposals_validated}
                                duration={2.5}
                                separator=',' />
                              :
                              <CountUp end={0}
                                duration={2.5}
                                separator=',' />
                            }
                          </h3>
                          <span style={{ fontSize: '14px' }}>Proposals Validated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="respcard col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <div className=" card dash-widget" style={{ height: '100px !important' }}>
                      <div className="card-body" style={{ padding: '15px' }}>
                        <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                        <div className="dash-widget-info">
                          {/* <h3>44</h3> */}
                          <h3 style={{ fontSize: '20px' }}>
                            {userDetailsDashboardData.length > 0 ?
                              <CountUp end={userDetailsDashboardData[0].amount_apporved}
                                duration={2.5}
                                separator=',' />
                              :
                              <CountUp end={0}
                                duration={2.5}
                                separator=',' />
                            } USD</h3>
                          <span style={{ fontSize: '14px' }}>Amount Approved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="respcard2 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <div className=" card dash-widget" style={{ height: '100px !important' }}>
                      <div className="card-body" style={{ padding: '15px' }}>
                        <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                        <div className="dash-widget-info">
                          {/* <h3>37</h3> */}
                          <h3 style={{ fontSize: '20px' }}>
                            {userDetailsDashboardData.length > 0 ?
                              <CountUp end={userDetailsDashboardData[0].amount_rejected}
                                duration={2.5}
                                separator=',' />
                              :
                              <CountUp end={0}
                                duration={2.5}
                                separator=',' />
                            } USD</h3>
                          <span style={{ fontSize: '14px' }}>Amount Rejected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-6">
                    <div className=" card dash-widget" style={{ height: '100px !important' }}>
                      <div className="card-body" style={{ padding: '15px' }}>
                        <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                        <div className="dash-widget-info">
                          {/* <h3>218</h3> */}
                          <h3 style={{ fontSize: '20px' }}>
                            {userDetailsDashboardData.length > 0 ?
                              <CountUp end={userDetailsDashboardData[0].my_rewards}
                                duration={2.5}
                                separator=',' />
                              :
                              <CountUp end={0}
                                duration={2.5}
                                separator=',' />
                            } CR2</h3>
                          <span style={{ fontSize: '14px' }}>My Rewards</span>
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

            <div className="row">

              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px', marginBottom: '20px' }}>
                    {/* mt-4 */}
                    <div className="search ">

                      <h3 className="card-title mb-0" style={{ padding: '15px' }}>Proposals</h3>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }}>View More</button>
                  </div>
                </div>
              </div>
            </div>

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

            </div>

            <div className="row">


            </div>

            <div className="row">

              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px' }}>
                    <div className="search mt-4 mb-2">

                      <h3 className="card-title mb-0" style={{ padding: '15px' }}>Live Projects</h3>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }}>View More</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {projectDetailsData.length > 0 && projectDetailsData.map((i) => (
                // maxWidth: "330px"
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: '15px', }}>
                  {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:'500px 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                  {/* width: '100%', */}
                  <Card className='cardInDashboard' style={{ cursor: 'pointer', width: '300px', height: '490px', margin: 'auto', gap: '6px' }}>

                    {i.cover_page != null && i.cover_page != undefined ?




                      <Card.Img variant="top" src={i.cover_page} style={{
                        // height: '155px',
                        height: '130px',
                        // borderTopLeftRadius: '15px',
                        // borderTopRightRadius: '15px'
                      }} onClick={() => sendDatatoProjectPage(i?._id)} />
                      :

                      <Card.Img variant="top" src="" style={{
                        // height: '155px',
                        height: '130px',
                        // borderTopLeftRadius: '15px',
                        // borderTopRightRadius: '15px'
                      }} onClick={() => sendDatatoProjectPage(i?._id)} />
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

                            <p className='MaindescParagraph'>
                              <span className='descSpan'>
                                <span>{i?.project_description}</span>
                                {/* <span>A 3D Metaverse of Everything</span> */}
                              </span>
                            </p>


                          </div>
                          <div className='secondInnerGrid'>
                            <div className='secondInnerGridInner'>

                              <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                                <CanvasJSChart options={options} height="80px" width="80px" showInLegend='false' />
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
                        <p className='MaindescParagraph'>
                          <span className='descSpan'>
                            {/* <span>{i?.project_description}/</span> */}
                          </span>
                        </p>
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


                      <div className='gridBox3Main' >
                        <div className='firstDivGridBOxtag'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Tags
                          </p>
                          {/* <hr className='firstDivHr' /> */}
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            <span>
                              {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''}
                              {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='gridBox3Main2'></div>

                      <div className='gridBox2' >
                        <div className='firstDivGridBOx2'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Stage of Funding
                          </p>
                          {/* <hr className='firstDivHr' /> */}
                          <p className='firstDivPararight' style={{ margin: '0px' }}>
                            <span className='gridSpan'>
                              {/* {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''} */}
                              {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className='gridBox2' >
                        <div className='firstDivGridBOx2'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Total Fund Raise
                          </p>
                          {/* <hr className='firstDivHr' /> */}
                          <p className='firstDivPararight' style={{ margin: '0px' }}>
                            <span className='gridSpan'>
                              $  {i?.total_budget != null && i?.total_budget != undefined ? Number(i?.total_budget).toLocaleString("en-US") : '0'}
                              {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='gridBox2'  >
                        <div className='firstDivGridBOx2'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Funds Raised Till Now
                          </p>
                          {/* <hr className='firstDivHr' /> */}
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
                          {/* <hr className='firstDivHr' /> */}
                          <p className='firstDivPararight' style={{ margin: '0px' }}>
                            <span className='gridSpan'>
                              Sharma
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
                          {/* <hr className='firstDivHr' /> */}
                          <p className='firstDivPararight' style={{ margin: '0px' }}>
                            <span className='gridSpan'>
                              12/04/2022
                              {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
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

                        <div className='gridBox3ButtonsMain'>
                          <div className='gridAlignItems'>
                            <button className='gridbuttonClass'>
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* <div className="CardiconDiv"  >
                      <Rating
                        style={{ color: '#ff9800', fontSize: '23px' }}
                        emptySymbol="fa fa-star-o fa-mx"
                        fullSymbol="fa fa-star fa-mx"
                        readonly={true}
                        initialRating={2}
                      />
                    </div> */}
                    </Card.Body>

                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      {/* /Page Content */}
    </div>
  );
}

export default withRouter(ValidatorDashboard);
