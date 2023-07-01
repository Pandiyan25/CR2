
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14, designLogo2, gamingImg, polygon } from '../../../../Entryfile/imagepath.jsx'
import './index.css'

import {IconArrowBarUp, IconDashboard, IconStack2, IconUser, IconUserCheck, IconUsers }from '@tabler/icons';
import { useHistory } from "react-router-dom";
// import {
//   BarChart, Bar, Cell, ResponsiveContainer,
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
import Rating from 'react-rating'

import { Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
import "../../../index.css"
import { Button } from 'react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../../paginationfunction.jsx';
import { apiURI } from '../../../../config/config.jsx';
import { fetchProjectDetails } from '../../../../reducers/ProjectDetailsSlice.js';
import { projectId } from '../../../../reducers/ConstantSlice.js';
import { fetchFundingProjectDetails } from '../../../../reducers/FundingProjectSlice.js';
import { fetchTeamSize } from '../../../../reducers/TeamSizeSlice.js';
import { fetchTokenomicsDetails } from '../../../../reducers/TokenomicsSlice.js';
import { fetchSocialTeam } from '../../../../reducers/SocialPageSlice.js';
import { fetchRoadMapProjectDetails } from '../../../../reducers/RoadMapSlice.js';
import { fetchBudgetProjectDetails } from '../../../../reducers/BudgetSlice.js';
import { faLongArrowAltRight, faGlobe, faRetweet, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedinIn, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { fetchBudgetBannerDetails } from '../../../../reducers/BugetBannerSlice.js';
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';


const SuperAdminDashboard = () => {


  const dispatch = useDispatch()
  let history = useHistory()

  const loginId = useSelector((state) => state.constVar.loginId)
  const [projectDetailsData, setProjectDetalsData] = useState([])
  const [superAdminDataNew, setsuperAdminDataNew] = useState([])

  const COLORS = ["orange", "gray"];

  const data = [
    { name: 'Supporters', students: 400, color: 'green' },
    { name: 'Opposer', students: 400, color: 'red' },
    // {name: 'Opposers', students: 700},
    // {name: 'Geek-i-knack', students: 200},
    // {name: 'Geek-o-mania', students: 1000}
  ];

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

        <div style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => sendDatatoProjectPage(i?._id)}>{text.project_id}</div>
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
      sorter: (a, b) => a?.project_description?.length - b?.project_description?.length,
    },
    , {
      title: ' Total Fund Raise',
      dataIndex: 'total_fund_raised',
      align: 'center',
      render: (text, record) => (

        <div>{text} USD</div>
      ),
      sorter: (a, b) => a?.total_fund_raised?.length - b?.total_fund_raised?.length,
    }, {
      title: 'Funds Raised Till Now',
      dataIndex: 'fund_raised_till_now',
      align: 'center',
      sorter: (a, b) => a?.fund_raised_till_now?.length - b?.fund_raised_till_now?.length,
    },
    //  {
    //   title: 'Rate Project',
    //   dataIndex: 'rating',
    //   align: 'center',
    //   sorter: (a, b) => a.rateProject.length - b.rateProject.length,
    //   render: (text, record) => (
    //     <Rating
    //       style={{ color: 'red' }}
    //       emptySymbol="fa fa-star-o fa-mx"
    //       fullSymbol="fa fa-star fa-mx"
    //       readonly={true}
    //       initialRating={text}
    //     />
    //   ),
    //   align: 'center',
    // },


  ]

  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query AllProjects {
          allProjects {
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
            logo
            rating {
              value
              user_role
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
              for (var j = 0; j < data?.data?.allProjects?.length; j++) {
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
                console.log(divide, "divide");
               
                
                console.log(data?.data?.allProjects[j]?.project_end_date, "date1");
                var dashboardDate =data?.data?.allProjects[j]?.project_end_date
                dashboardDate = dashboardDate?.split('T')[0];


                console.log(divide,"divide");
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
                  project_end_date:dashboardDate ,
                  total_budget: data?.data?.allProjects[j]?.total_budget,
                  fund_raised_till_now: data?.data?.allProjects[j]?.fund_raised_till_now,
                  total_fund_raised: data?.data?.allProjects[j]?.total_fund_raised,
                  logo: data?.data?.allProjects[j]?.logo,
                  ratingValue:divide


                })
              }
              setProjectDetalsData(arr)
            }


            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const getSuperAdminFunc = () => {
    try {

      var query =
        `
        query Query($user: ID) {
          getSuperAdminDashboard(user: $user) {
            founders
            validators
            investors
            projects
            initial_proposals
            Subsequent_proposal
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
          if (data?.data?.getSuperAdminDashboard != null && data?.data?.getSuperAdminDashboard != undefined) {
            setsuperAdminDataNew([data?.data?.getSuperAdminDashboard])

            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  useEffect(() => {
    if (loginId != '') {

      getProjectDetailsFunc()
      getSuperAdminFunc()
    }

  }, [loginId])


  const opennewWindow = (i) => {
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }
  
  return (

    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Dashboard </h3>

                </div>
              </div>
            </div>

          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

            <div className="row" >
              <div className="col-md-4 col-sm-4 col-lg-4">
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon">
                <IconUser className='sidebaricon' /></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.founders).toLocaleString("en-US")}</h3>
                      <span>Founders</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" >
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon">
                <IconUserCheck className='sidebaricon' /></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.validators).toLocaleString("en-US")}</h3>
                      <span>Validators</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" >
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon">
                <IconUsers className='sidebaricon' /></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.investors).toLocaleString("en-US")}</h3>
                      <span>Investors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" >
              <div className="col-md-4 col-sm-4 col-lg-4">
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon"><FontAwesomeIcon  className='sidebaricon'   icon={faHandshake} style={{fontSize:'20px'}}/></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.initial_proposals).toLocaleString("en-US")}</h3>
                      <span>Initial Proposals</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" >
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon"><FontAwesomeIcon  className='sidebaricon'   icon={faHandshake} style={{fontSize:'20px'}}/></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.Subsequent_proposal).toLocaleString("en-US")}</h3>
                      <span>Subsequent Proposals </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" >
                <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                  <div className="card-body">
                    <span className="dash-widget-icon">
                   <IconStack2 className='sidebaricon' /></span>
                    <div className="dash-widget-info">
                      <h3>{Number(superAdminDataNew.length > 0 && superAdminDataNew[0]?.projects).toLocaleString("en-US")}</h3>
                      <span>Projects</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* <div className="row"> */}
            {/* <div className="col-md-12 d-flex">
                <div className="card card-table flex-fill">
                  <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title mb-0">Live Projects</h3>
                    <Button variant="secondary" style={{ background: '#6345ED', color: 'white', border: '1px solid #6345ED', fontSize: '12px', borderRadius: '50px' }}>
                      View All
                    </Button>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table
                        pagination={{
                          total: projectDetailsData.length,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }
                        }
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        bordered
                        dataSource={projectDetailsData}
                        rowKey={record => record.id}
                      // onChange={this.handleTableChange}
                      />

                    </div>
                  </div>

                </div>
              </div> */}
            <div className="row">
              {projectDetailsData.length > 0 && projectDetailsData.map((i) => (


                <div className='col-sm-4 col-md-4 col-lg-4 col-xl-4' style={{ marginBottom: '15px' }}>
                  {/* style={{ , marginBottom: '0px',border:'2px solid #1890ff',boxShadow:' 0 5px 5px 0 rgba(0, 0, 0, 0.2)' }} */}
                  <Card className='cardInDashboard'  style={{cursor:'pointer'}}>
                    <Card.Img variant="top" src={gamingImg} style={{
                      // height: '155px',
                      height: '130px',
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px'
                    }} onClick={() => sendDatatoProjectPage(i?._id)} />
                    <div className='cardFlexDiv'>

                      <div className='cardSubText'>
                        <span style={{ width: '100%', heigth: '100%' }} onClick={() => sendDatatoProjectPage(i?._id)}>
                          {i.logo != null && i.logo != undefined ?

                            <img src={i?.logo} alt="" className='cardTextImage' />
                            :
                            ''
                          }


                        </span>
                      </div>

                      <div className='cardparDiv' onClick={() => sendDatatoProjectPage(i?._id)}>
                        <p className='cardPar'>
                          End Date
                        </p>
                        <p className='cardPar'>
                          {/* March 14, 2022 */}
                          {i?.project_end_date}
                        </p>
                      </div>
                    </div>
                    <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                      <div className='gridBox' onClick={() => sendDatatoProjectPage(i?._id)}>
                        <div className='firstGrid'>
                          <div className='firstInnerGrid'>
                            <h2 className='firstGridH2' >
                              {/* Founder First Project */}
                                <span className='descSpan'>

                                  {i?.project_name}
                                </span>

                            </h2>
                            <p className='firstGridp' style={{ margin: '0px' }}>
                              {/* NFTS */}
                                <span className='descSpan'>
                              {i?.nature_of_project} ,{i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''}
                              </span>{/* Level */}
                            </p>
                            {/* {i?.project_stage != null && i?.project_stage != undefined ?
           <p className='firstGridp' style={{ margin: '0px' }}>
           {i?.project_stage} Level
         </p> : ''} */}

                          </div>
                          <div className='secondInnerGrid'>
                            <div className='secondInnerGridInner'>
                              <img src={polygon} alt="" className='secondGridDivLogo' />
                            </div>
                          </div>
                        </div>
                        <p className='MaindescParagraph' >
                          <span className='descSpan'>
                            <span>{i?.project_description}</span>
                            {/* <span>A 3D Metaverse of Everything</span> */}
                          </span>
                        </p>
                      </div >

                      <div className='gridBox2' onClick={() => sendDatatoProjectPage(i?._id)}>
                        <div className='firstDivGridBOx2'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Total Fund Raise
                          </p>
                          <hr className='firstDivHr' />
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            <span>
                              {/* $300000 */}
                              {i?.total_budget != null && i?.total_budget != undefined ? Number(i?.total_budget).toLocaleString("en-US") : '0'} USD
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className='gridBox2' onClick={() => sendDatatoProjectPage(i?._id)}>
                        <div className='firstDivGridBOx2'>
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            Funds Raised Till Now
                          </p>
                          <hr className='firstDivHr' />
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            <span>
                              {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? Number(i?.fund_raised_till_now).toLocaleString("en-US") : '0'} USD
                            </span>
                          </p>
                        </div>
                      </div>


                      {/* <div className='gridBox2'>
      <div className='firstDivGridBOx2'>
        <p className='firstDivPara' style={{ margin: '0px' }}>
          Project Stage
        </p>
        <hr className='firstDivHr' />
        <p className='firstDivPara' style={{ margin: '0px' }}>
          <span>
            {i?.project_stage != null && i?.project_stage != undefined ? i?.project_stage : ''}
          </span>
        </p>
      </div>
    </div>  */}
                      <div className='gridBox2' onClick={() => sendDatatoProjectPage(i?._id)}>
                        {/* height: '25px' */}
                        <div className='firstDivGridBOx2' style={{}}>
                          {/* <p className='firstDivPara' style={{ margin: '0px' }}>
          Funds Raised Till Now
        </p> */}
                          {/* <hr className='firstDivHr' #1890ff' /> */}
                          <p className='firstDivPara' style={{ margin: '0px' }}>
                            <span style={{ color: '#000000a1 ', fontSize: '14px' }}>
                              {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''}
                            </span>
                          </p>
                        </div>
                      </div>


                      <div className='gridBox3'>
                        {i?.website_link != '' && i?.website_link != null && i?.website_link != undefined ?

                          <div className="gridBox3IconDiv">
                            <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.website_link)} />
                          </div>
                          :
                          ''
                        }
                        {i?.linkedin_profile_link != '' && i?.linkedin_profile_link != null && i?.linkedin_profile_link != undefined ?

                          <div className="gridBox3IconDiv">
                            <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.linkedin_profile_link)} />
                          </div>
                          :
                          ''
                        }
                        {i?.whitepaper != '' && i?.whitepaper != null && i?.whitepaper != undefined ?

                          <div className="gridBox3IconDiv">
                            <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.whitepaper)} />
                          </div>
                          :
                          ''
                        }
                      </div>
                      {/* <Card.Title style={{ margin: '0px', textAlign: 'center', height: '110px', overflow: 'auto' }}>{i?.project_name}</Card.Title> */}

                      <div className="CardiconDiv" onClick={() => sendDatatoProjectPage(i?._id)}>
                        <Rating
                          style={{ color: '#ff9800', fontSize: '23px' }}
                          emptySymbol="fa fa-star-o fa-mx"
                          fullSymbol="fa fa-star fa-mx"
                          readonly={true}
                          initialRating={i?.ratingValue}
                        />
                      </div>
                    </Card.Body>
                    {/* <Card.Footer className="CardFooterDiv">
    <div className="CardiconDiv">
      <div className='cardIconRatingDiv'>
        <Rating
          style={{ color: '#ff9800', fontSize: '25px' }}
          emptySymbol="fa fa-star-o fa-mx"
          fullSymbol="fa fa-star fa-mx"
          // readonly={true}
          initialRating={2}
        />
      </div>
      <FontAwesomeIcon icon={faLongArrowAltRight} className='CardIcon' onClick={() => sendDatatoProjectPage(i?._id)} />
    </div>
  </Card.Footer> */}
                  </Card>
                </div>

              ))}


            </div>

            {/* </div> */}

          </div>
        </div>

      </div>
      {/* /Page Content */}
    </div>
  );
}

export default SuperAdminDashboard;
