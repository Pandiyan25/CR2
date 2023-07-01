

import React, { useState, useEffect, useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar_02, designLogo2, gamingImg, projMang } from '../../Entryfile/imagepath';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import { Button, Card } from 'react-bootstrap';

import ProgressBar from 'react-bootstrap/ProgressBar';
import { useHistory } from "react-router-dom";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../antdstyle.css";
import { apiURI } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectDetails } from '../../reducers/ProjectDetailsSlice';
import { projectId } from '../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../reducers/SocialPageSlice';
import { fetchRoadMapProjectDetails } from '../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../reducers/BudgetSlice';
import { fetchBudgetBannerDetails } from '../../reducers/BugetBannerSlice';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import './main.css'
import Pagination from '../../Entryfile/Pagination';
import ReactTooltip from 'react-tooltip';

const ProjectsMainPage = () => {
    let history = useHistory()
    const [currentPageLiveDeals, setCurrentPageLiveDeals] = useState(1);
    const [currentPageClosedDeals, setCurrentPageClosedDeals] = useState(1);

    const dispatch = useDispatch()
    const loginId = useSelector((state) => state.constVar.loginId)
    const [projectDetailsData, setProjectDetalsData] = useState([])
    const [tableData, settableData] = useState([
        {
            sno: 1,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: 'Ongoing'

        },
        {
            sno: 2,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: 'Completed'

        },
        {
            sno: 3,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: 'Ongoing'
        },
        {
            sno: 4,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: 'Ongoing'

        },
        {
            sno: 5,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: ''

        },
        {
            sno: 6,
            projectID: '98129',
            logo: 'logo',
            Name: 'Test',
            Amount: '500 USD',
            investmentDate: '03 May 2022',
            noofProposals: '4',
            amountInvested: '5000 USD',
            releasedAmount: '5000 USD',
            status: 'Rejected'
        }
    ])

    let PageSizeLiveDeals = 6;
    let PageSizeClosedDeals = 6;
    const now = 60;
    const [mydata2, setMydata2] = useState([
        { name: "satisfied", y: 5 },
        { name: "Unsatisfied", y: 5 },
    ])
    // const sendDatatoProjectPage = (i) => {
    //     dispatch(fetchProjectDetails(i)) 
    //     dispatch(projectId(i))
    //     dispatch(fetchFundingProjectDetails(i))
    //     dispatch(fetchTeamSize(i))
    //     dispatch(fetchTokenomicsDetails(i))
    //     dispatch(fetchSocialTeam(i))
    //     history.push('/detail-projects')
    // }

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

        {
            title: 'Project Id',
            //   dataIndex: 'proposalNo',
            align: 'center',

            render: (text, record) => (

                <div style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => sendDatatoProjectPage(text._id)}>{text.project_id}</div>
            ),
            sorter: (a, b) => a?.project_id?.localeCompare(b?.project_id),
        },

        {
            title: 'Logo',
            // dataIndex: 'logo',
            render: (text, record) => (
                <img src={text?.logo != '' ? text?.logo : Avatar_02} alt="" width="20px" style={{ borderRadius: '50px', height: '50px', width: '50px', cursor: 'default' }} />
            ),
            align: 'center',

        },

        {
            title: 'Name',
            // dataIndex: 'project_name',
            align: 'center',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{text.project_name}</div>
            ),
            sorter: (a, b) => a?.project_name?.localeCompare(b?.project_name),
            // sorter: (a, b) => a?.project_name?.length - b?.project_name?.length,
        }, {
            title: 'Amount in Escrow',
            // dataIndex: 'amount_in_escrow',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{Number(text.amount_in_escrow).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            // sorter: (a, b) => a?.amount_in_escrow?.localeCompare(b?.amount_in_escrow) ,
            // sorter: (a, b) => a?.amount_in_escrow?.length - b?.amount_in_escrow?.length,
        },
        , {
            title: ' Investment Date',
            // dataIndex: 'investment_date',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{text.investment_date}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.investment_date?.localeCompare(b?.investment_date),
            // sorter: (a, b) => a?.investment_date?.length - b?.investment_date?.length,
        }, {
            title: 'Number of Proposals',
            // dataIndex: 'no_of_proposals',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{Number(text.no_of_proposals).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.no_of_proposals?.localeCompare(b?.no_of_proposals),
            // sorter: (a, b) => a?.no_of_proposals?.length - b?.no_of_proposals?.length,
        },
        {
            title: 'Amount Invested',
            // dataIndex: 'amount_invested',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{Number(text.amount_invested).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.amount_invested?.localeCompare(b?.amount_invested),
            // sorter: (a, b) => a?.amount_invested?.length - b?.amount_invested?.length,
        },
        {
            title: 'Released Amount',
            // dataIndex: 'amount_released',
            render: (text, record) => (

                <div style={{ cursor: 'default' }}>{Number(text.amount_released).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.amount_released?.localeCompare(b?.amount_released),
            // sorter: (a, b) => a?.amount_released?.length - b?.amount_released?.length,
        },
        {
            title: 'Project Status',
            // dataIndex: 'fundRaisedtillNow',
            align: 'center',
            render: (text, record) => (
                text.project_status == 'Completed' ?
                    <div className=" bg-inverse-info" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%', cursor: 'default' }}>Approved
                    </div>
                    : text.project_status == 'Rejected' ?
                        <div className=" bg-inverse-danger" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%', cursor: 'default' }}>Rejected
                        </div>
                        : text.project_status == 'Ongoing' ?
                            <div className=" bg-inverse-warning" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%', cursor: 'default' }}>Ongoing
                            </div>
                            : <div style={{ cursor: 'default' }}>

                                {text.project_status}
                            </div>


            ),
            sorter: (a, b) => a?.project_status?.localeCompare(b?.project_status),
            // sorter: (a, b) => a?.project_status?.length - b?.project_status?.length,
        },




    ]

    const getProjectDetailsFunc = () => {
        try {

            var query =
                `
                query Query($investor: ID) {
                    allFundraise(investor: $investor) {
                      _id
                      project {
                        _id
                        logo
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
                        project_blockchain_id
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
                        fund_raised_target
                        public_launch_price
                        funds_released_till_date
                        cover_page
                        twitter
                        instagram
                        medium
                        facebook
                        linkedin
                        discord
                        telegram
                        reddit
                        youtube
                        one_line_description
                        product_demo
                        video_pitch
                      }
                      primary_funding_wallet
                      currency
                      funds_requested
                      token_ticker
                      price_per_token
                      stage
                      max_supply
                      valuation
                      no_of_tokens
                      initial_release_percentage
                      
                      end_target_date
                      round
                      contract_id
                      project_status
                      fund_raised
                      tokens_sold
                      fund_unlocked
                      fund_locked
                      fund_withdrawn
                      remarks
                      blockers
                      creator
                      funds_to_be_invested
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
                        "investor": loginId
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
                    if (data?.data?.allFundraise != null && data?.data?.allFundraise != undefined) {
                        var totalInvested = 0;
                        setProjectDetalsData(data?.data?.allFundraise)

                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }
    useEffect(() => {
        getProjectDetailsFunc()
    }, [])

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

    const openNewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }
    const currentTableDataLiveDeals = useMemo(() => {
        const firstPageIndex = (currentPageLiveDeals - 1) * PageSizeLiveDeals;
        const lastPageIndex = firstPageIndex + PageSizeLiveDeals;
        var data = []
        data = projectDetailsData
        console.log(projectDetailsData, "projectDetailsData in live");
        console.log(data, "data in live");
        if (data.length > 0) {

            return data.slice(firstPageIndex, lastPageIndex);
        } else {

            return data = [];
        }
    }, [currentPageLiveDeals, projectDetailsData]);

    console.log(currentTableDataLiveDeals, projectDetailsData, "currentTableDataLiveDeals in project in investors");
    return (

        <div className="page-wrapper" style={{ paddingTop: '60px' }}>

            <div className="content container-fluid">
                <div className="page-header">

                    <div className="header-left">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title" style={{ wordSpacing: 'normal' }}>Deals</h3>

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

                                        <h3 className="card-title mb-0" style={{ padding: '10px', paddingLeft: '15px' }}>Live Deals</h3>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="row" style={{ marginTop: '0px', marginBottom: '0px' }}>

                        <div className="col-md-12">

                            <div className='borderValueAll' style={{ padding: '15px', paddingBottom: '0px' }}>
                                <div className='row '>

                                    {
                                        currentTableDataLiveDeals?.length > 0 ?

                                            currentTableDataLiveDeals?.map((i) => (

                                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                    <div style={{ marginBottom: "30px" }} key={i?._id}>

                                                        {/* 555px */}

                                                        <Card className='cardInDashboard' style={{ cursor: 'pointer', minHeight: '540px', margin: 'auto', gap: '6px' }}>
                                                            <Card.Img variant="top" src={i?.project?.cover_page != null && i?.project?.cover_page != undefined ? i?.project?.cover_page : ''} style={{
                                                                height: '100px',
                                                            }} />
                                                            <div className='cardFlexDiv'  >

                                                                <div className='cardSubTextPro'>
                                                                    <span style={{ width: '100%', heigth: '100%' }}>

                                                                        <img src={i?.project?.logo != null && i?.project?.logo != undefined ? i?.project?.logo : ''} alt="" className='cardTextImage' />





                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                                                                <div className='gridBox'>
                                                                    <div className='firstGrid'>
                                                                        <div className='firstInnerGrid'>
                                                                            <h2 className='firstGridH2'>

                                                                                <span className='descSpan' style={{ fontSize: "25px" }}>
                                                                                    {/* {i?.project_name} */}
                                                                                    {i?.project?.project_name != null && i?.project?.project_name != undefined ? i?.project?.project_name : ''}
                                                                                </span>


                                                                            </h2>

                                                                            <p className='MaindescParagraph'>
                                                                                <span className='descSpan' >
                                                                                    {/* <span>{i?.project_description}</span> */}
                                                                                    <span>
                                                                                        {i?.project?.project_description != null && i?.project?.project_description != undefined ? i?.project?.project_description : ''}</span>

                                                                                </span>
                                                                            </p>


                                                                        </div>
                                                                        <div className='secondInnerGrid'>
                                                                            <div className='secondInnerGridInner'>

                                                                                <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                                                                                    <CanvasJSChart options={options} height="80px" width="80px" showInLegend='false' />
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div >

                                                                <div className='gridBox2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px', color: "#282828" }}>
                                                                            Nature of Project
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px', fontWeight: "600" }}>
                                                                            <span>
                                                                                {/* {i?.nature_of_project} */}

                                                                                {i?.project?.nature_of_project != null && i?.project?.nature_of_project != undefined ? i?.project?.nature_of_project : ''}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2 mb-2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px', color: "#282828" }}>
                                                                            Project Stage
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px', fontWeight: "600" }}>
                                                                            <span>
                                                                                {i?.project?.project_stage != null && i?.project?.project_stage != undefined ? i?.project?.project_stage : ''}

                                                                                {/* {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox3Main' >
                                                                    <div className='firstDivGridBOxtag'>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            {/* Tags */}
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            <span>
                                                                                {i?.project?.project_tags != null && i?.project?.project_tags != undefined ? i?.project?.project_tags : ''}

                                                                                {/* {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className='gridBox3Main2'></div> */}

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

                                                                                {/* {i?.funds_requested} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className='gridBox2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Total Fund Raise Target
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {i?.project?.fund_raised_target != null && i?.project?.fund_raised_target != undefined ? i?.project?.fund_raised_target : ''}

                                                                                {/* $  {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
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

                                                                                {/* {i?.funds_requested} */}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2 mb-2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Expected TGE
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>

                                                                                {/* {i?.funds_requested} */}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <h6 style={{ fontWeight: "600", paddingLeft: '10px' }}>Deal</h6>

                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Funds Requested
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {/* 1000 USD */}

                                                                                {i?.funds_requested}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Token ticker
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>

                                                                                {i?.token_ticker}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Price per Token
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {/* 0.002USD */}
                                                                                {i?.price_per_token}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Stage
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {i?.stage}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>



                                                                <div style={{ padding: '5px 10px 5px 10px', marginBottom: '40px' }}><ProgressBar now={now} label={`${now}%`} style={{ height: '12px' }} /></div>


                                                                <div className='gridButtonsPro'>





                                                                    <div className='gridBox3ButtonsMain' style={{ marginRight: '5px' }}>
                                                                        <div className='gridAlignItems' style={{ display: "flex" }}>
                                                                            <button className='gridbuttonClass' style={{ minWidth: '80px', minHeight: '30px' }}
                                                                                onClick={() => sendDatatoProjectPage(i?.project?._id)}>
                                                                                Project
                                                                            </button>

                                                                            <button className='gridbuttonClass ml-2' style={{ minWidth: '80px', minHeight: '30px' }}>
                                                                                Invest
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className='gridBox3ButtonsPro'>

                                                                        {i?.project?.website_link != null && i?.project?.website_link != undefined ?
                                                                            <div className="gridBox3IconDiv">
                                                                                <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => openNewWindow(i?.project?.website_link)} />
                                                                            </div>
                                                                            :
                                                                            ''
                                                                        }
                                                                        {/* <FontAwesomeIcon icon={solid('globe')} className='gridBox3Icons' /> */}




                                                                        {i?.project?.linkedin_profile_link != null && i?.project?.linkedin_profile_link != undefined ?

                                                                            <div className="gridBox3IconDiv">
                                                                                <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => openNewWindow(i?.project?.linkedin_profile_link)} />

                                                                            </div>
                                                                            : ''}



                                                                        {i?.project?.twitter != null && i?.project?.twitter != undefined ?
                                                                            <div className="gridBox3IconDiv">
                                                                                <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => openNewWindow(i?.project?.twitter)} />

                                                                            </div>
                                                                            : ''}
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
                                                    </div>  </div>


                                            ))

                                            :
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div style={{ marginBottom: "30px" }} >

                                                    {/* 555px */}

                                                    <Card className='cardInDashboard' style={{ cursor: 'pointer', minHeight: '540px', margin: 'auto', gap: '6px' }}>

                                                    </Card>
                                                </div>
                                            </div>
                                    }


                                </div>


                            </div>
                        </div>

                    </div>


                    <div className='row '>


                        <div className="col-md-12">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPageLiveDeals}
                                totalCount={projectDetailsData.length}
                                pageSize={PageSizeLiveDeals}
                                onPageChange={page => setCurrentPageLiveDeals(page)}
                            />
                        </div>

                    </div>



                    <div className="row">

                        <div className="col-md-12" style={{ padding: '0px' }}>


                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                <div className="col" style={{ padding: '0px' }}>
                                    {/* mt-4 */}
                                    <div className="search mb-2">

                                        <h3 className="card-title mb-0" style={{ padding: '10px', paddingLeft: '15px' }}>Closed Deals</h3>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row" style={{ marginTop: '0px', marginBottom: '0px' }}>

                        <div className="col-md-12">

                            <div className='borderValueAll' style={{ padding: '15px', paddingBottom: '0px' }}>
                                <div className='row '>

                                    {
                                        currentTableDataClosedDeals?.length > 0 ?

                                            currentTableDataClosedDeals?.map((i) => (

                                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                    <div style={{ marginBottom: "30px" }} key={i?._id}>

                                                        {/* 555px */}

                                                        <Card className='cardInDashboard' style={{ cursor: 'pointer', minHeight: '540px', margin: 'auto', gap: '6px' }}>
                                                            <Card.Img variant="top" src={i?.project?.cover_page != null && i?.project?.cover_page != undefined ? i?.project?.cover_page : ''} style={{
                                                                height: '100px',
                                                            }} />
                                                            <div className='cardFlexDiv'  >

                                                                <div className='cardSubTextPro'>
                                                                    <span style={{ width: '100%', heigth: '100%' }}>

                                                                        <img src={i?.project?.logo != null && i?.project?.logo != undefined ? i?.project?.logo : ''} alt="" className='cardTextImage' />





                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <Card.Body style={{ padding: '0px' }} className="cardBodyStyle">
                                                                <div className='gridBox'>
                                                                    <div className='firstGrid'>
                                                                        <div className='firstInnerGrid'>
                                                                            <h2 className='firstGridH2'>

                                                                                <span className='descSpan' style={{ fontSize: "25px" }}>
                                                                                    {/* {i?.project_name} */}
                                                                                    {i?.project?.project_name != null && i?.project?.project_name != undefined ? i?.project?.project_name : ''}
                                                                                </span>


                                                                            </h2>

                                                                            <p className='MaindescParagraph'>
                                                                                <span className='descSpan' >
                                                                                    {/* <span>{i?.project_description}</span> */}
                                                                                    <span>
                                                                                        {i?.project?.project_description != null && i?.project?.project_description != undefined ? i?.project?.project_description : ''}</span>

                                                                                </span>
                                                                            </p>


                                                                        </div>
                                                                        <div className='secondInnerGrid'>
                                                                            <div className='secondInnerGridInner'>

                                                                                <div style={{ width: '100px', height: '60px', overflow: 'hidden', marginTop: '-30px', position: 'absolute', right: '0px' }}>
                                                                                    <CanvasJSChart options={options} height="80px" width="80px" showInLegend='false' />
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div >

                                                                <div className='gridBox2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px', color: "#282828" }}>
                                                                            Nature of Project
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px', fontWeight: "600" }}>
                                                                            <span>
                                                                                {/* {i?.nature_of_project} */}

                                                                                {i?.project?.nature_of_project != null && i?.project?.nature_of_project != undefined ? i?.project?.nature_of_project : ''}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2 mb-2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px', color: "#282828" }}>
                                                                            Project Stage
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px', fontWeight: "600" }}>
                                                                            <span>
                                                                                {i?.project?.project_stage != null && i?.project?.project_stage != undefined ? i?.project?.project_stage : ''}

                                                                                {/* {i?.project_stage != null && i?.project_stage != undefined ? `${i?.project_stage} ` : ''} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox3Main' >
                                                                    <div className='firstDivGridBOxtag'>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            {/* Tags */}
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            <span>
                                                                                {i?.project?.project_tags != null && i?.project?.project_tags != undefined ? i?.project?.project_tags : ''}

                                                                                {/* {i?.project_tags != null && i?.project_tags != undefined ? i?.project_tags : ''} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                {/* <div className='gridBox3Main2'></div> */}

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

                                                                                {/* {i?.funds_requested} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className='gridBox2' >
                                                                    <div className='firstDivGridBOx2'>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Total Fund Raise Target
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {i?.project?.fund_raised_target != null && i?.project?.fund_raised_target != undefined ? i?.project?.fund_raised_target : ''}

                                                                                {/* $  {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
                                                                                {/* {i?.total_budget != null && i?.total_budget != undefined ? i?.total_budget : '0'} */}
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

                                                                                {/* {i?.funds_requested} */}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2 mb-2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Expected TGE
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>

                                                                                {/* {i?.funds_requested} */}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <h6 style={{ fontWeight: "600", paddingLeft: '10px' }}>Deal</h6>

                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Funds Requested
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {/* 1000 USD */}

                                                                                {i?.funds_requested}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>


                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Token ticker
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>

                                                                                {i?.token_ticker}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Price per Token
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {/* 0.002USD */}
                                                                                {i?.price_per_token}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='gridBox2'  >
                                                                    <div className='firstDivGridBOx2' style={{ display: 'flex' }}>
                                                                        <p className='firstDivPara' style={{ margin: '0px' }}>
                                                                            Stage
                                                                        </p>
                                                                        {/* <hr className='firstDivHr' /> */}
                                                                        <p className='firstDivPararight' style={{ margin: '0px' }}>
                                                                            <span className='gridSpan'>
                                                                                {i?.stage}
                                                                                {/* {i?.fund_raised_till_now != null && i?.fund_raised_till_now != undefined ? i?.fund_raised_till_now : '0'} */}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                </div>



                                                                <div style={{ padding: '5px 10px 5px 10px', marginBottom: '40px' }}><ProgressBar now={now} label={`${now}%`} style={{ height: '12px' }} /></div>


                                                                <div className='gridButtonsPro'>





                                                                    <div className='gridBox3ButtonsMain12' style={{ marginRight: '5px' }}>
                                                                        <div className='gridAlignItems' style={{ display: "flex" }}>
                                                                            <button data-for='test' className='gridbuttonClass23' data-tip="Project" style={{ minWidth: '0px', minHeight: '32px' }}
                                                                                onClick={() => sendDatatoProjectPage(i?.project?._id)}>
                                                                                <img src={projMang} alt='Project' style={{ height: '25px', width: '30px' }} />
                                                                                {/* Project */}
                                                                                
                                                                            <ReactTooltip id='test' place="top" type="info" effect="float" />
                                                                            </button>
                  

                                                                        </div>
                                                                        {i?.project?.website_link != null && i?.project?.website_link != undefined ?
                                                                            <div className="gridBox3IconDiv13">
                                                                                <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons23' onClick={() => openNewWindow(i?.project?.website_link)} />
                                                                            </div>
                                                                            :
                                                                            ''
                                                                        }



                                                                        {i?.project?.linkedin_profile_link != null && i?.project?.linkedin_profile_link != undefined ?

                                                                            <div className="gridBox3IconDiv13">
                                                                                <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons23' onClick={() => openNewWindow(i?.project?.linkedin_profile_link)} />

                                                                            </div>
                                                                            : ''}



                                                                        {i?.project?.twitter != null && i?.project?.twitter != undefined ?
                                                                            <div className="gridBox3IconDiv13">
                                                                                <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons23' onClick={() => openNewWindow(i?.project?.twitter)} />

                                                                            </div>
                                                                            : ''}

                                                                    </div>

                                                                        {/* <FontAwesomeIcon icon={solid('globe')} className='gridBox3Icons' /> */}
                                                                    {/* <div className='gridBox3ButtonsPro'>
                                                                    </div> */}


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
                                                    </div>  </div>


                                            ))

                                            :
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div style={{ marginBottom: "30px" }} >

                                                    {/* 555px */}

                                                    <Card className='cardInDashboard' style={{ cursor: 'pointer', minHeight: '540px', margin: 'auto', gap: '6px' }}>

                                                    </Card>
                                                </div>
                                            </div>
                                    }


                                </div>


                            </div>
                        </div>

                    </div>
                    <div className='row '>


                        <div className="col-md-12">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPageClosedDeals}
                                totalCount={projectDetailsData.length}
                                pageSize={PageSizeClosedDeals}
                                onPageChange={page => setCurrentPageClosedDeals(page)}
                            />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default withRouter(ProjectsMainPage);