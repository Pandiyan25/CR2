
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import CreateInvestorPrivateRound from './CreatePrivateRound';
import ReceivedInvestorPrivatePage from './ReceivedInvestorFund';
import AcceptedInvestorPrivatePage from './AcceptPrivatePage';
import RoundInvestorPage from './RoundInvestorPage';

import { useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';

import DraftPrivateRound from './DraftPrivateRound';
import RejectedEditInvestor from './RejectedEditInvestor';


import { text } from '@fortawesome/fontawesome-svg-core';
import PendingMileStone from './PendingMileStone';
import MileStoneInvestorStatusPage from './MileStoneInvestorStatusPage';
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice';
import { projectId } from '../../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice';

import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Analytics from './Analytics';
import TableMainPage from './TableMainPage';

const InvestorFundRaise = () => {
    const [FundRaiseData, setFundRaiseData] = useState([])

    const dispatch = useDispatch()
    const [mileStoneId, setMileStoneId] = useState('')
    const [indexCountforSlect, setindexCountforSlect] = useState(0)
    const [publicId, setPublicId] = useState('')
    const [analyticsData, setAnalyticsData] = useState([])

    let history = useHistory()
    const [DraftFundRaiseData, setDraftFundRaiseData] = useState([])
    const [FundRaisePrivateData, setFundRaisePrivateData] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)
    const [currency, setCurrency] = useState('')
    console.log(currency, "currency");
    const [tokenStd, settokenStd] = useState([{
        "Contract_ID": '091axxx8727',
        "Round": 'Public',
        "Price": '$ 0.04',
        "Target": '$ 500000',
        "Tokens": '12500000',
        "Valuation": '$ 10 Million',
        "Blockers": '1243',
        "Status": '100%',
        "Project": "Name",
        "Stage": 'value'

    },
    {
        "Contract_ID": '091axxx11211',
        "Round": 'Private',
        "Price": '$ 0.06',
        "Target": '$ 100000',
        "Tokens": '2500000',
        "Valuation": '$ 15 Million',
        "Blockers": '1',
        "Status": '100%',
        "Project": "Name",
        "Stage": 'value'

    }
    ])
    const [tokenStd2, settokenStd2] = useState([{
        "Round": 'Public',
        "Price": '$ 0.04',
        "Target": '$ 500000',
        "Tokens": '12500000',
        "Valuation": '$ 10 Million',
        "Project": "Name",

    },
    {
        "Round": 'Private',
        "Price": '$ 0.06',
        "Target": '$ 100000',
        "Tokens": '2500000',
        "Valuation": '$ 15 Million',
        "Project": "Name",

    }
    ])

    const [shiftBtwPrivPub, setShiftBtwPrivPub] = useState('Home')

    const [tokenStd3, settokenStd3] = useState([
        {
            Creator: 'Founder',
            Investor: "Sharma",
            Round: 'Private',
            Price: '$ 0.04',
            Fund: '$ 50000',
            Tokens: '12500000',
            Valuation: '$ 10 Million',
            Status: 'Sent',

            "Project": "Name",

        },
        {
            Creator: 'Founder',
            Investor: "Sharma",
            Round: 'Private',
            Price: '$ 0.04',
            Fund: '$ 50000',
            Tokens: '12500000',
            Valuation: '$ 10 Million',
            Status: 'Rejected',

            "Project": "Name",

        },
        {
            Creator: 'Founder',
            Investor: "Sharma",
            Round: 'Private',
            Price: '$ 0.04',
            Fund: '$ 50000',
            Tokens: '12500000',
            Valuation: '$ 10 Million',
            Status: 'Received',

            "Project": "Name",

        },

    ])

    const [tokenStd4, settokenStd4] = useState([])




    const showRoundFunc = (text) => {
        handleShow(text?.currency)
        setPublicId(text._id)
        setShiftBtwPrivPub('View_Round')

    }
    const showEditDraftRound = (text) => {
        handleShow(text?.currency)
        setShiftBtwPrivPub('Edit_Draft_Private')
        setPublicId(text._id)
    }

    const investorDashBoard = ()  =>{
        history.push('/dashboard')
    }


    const handleShow = (currency) => {
        const countries = [
            { value: "USDC", label: "USDC" },
            { value: "DAI", label: "DAI" },
            { value: "BUSD", label: "BUSD" },
            { value: "USDT", label: "USDT" },
            // { value: "USD", label: "USD" },
            // { value: "SDT", label: "SDT"
            // { value: "INR", label: "INR"},
            // { value: "RUBLE", label: "RUBLE" },
            // { value: "CAD", label: "CAD" },
            // // { value: "GBP", label: "GBP",
            // // { value: "AED", label: "AED",
            // { value: "CNY", label: "CNY" },
            // // { value: "VMD", label: "VMD",
            // { value: "EURO", label: "EURO" },
            // { value: "POUND", label: "POUND" },
            // { value: "YUAN", label: "YUAN" },
            // { value: "INR", label: "INR" },
            // { value: "YEN", label: "YEN" },
            // { value: "SGD", label: "SGD" },
            // { value: "AUD", label: "AUD" },
            // { value: "YEN", label: "YEN",

        ]
        if (currency != '' && currency != null && currency != undefined) {
            var indexCount = countries.findIndex((element) => element.value == currency)
            console.log(indexCount, "indexCount");
            setindexCountforSlect(indexCount)
            // setShow(true)
        } else {

            setindexCountforSlect(0)
            // setShow(true)
        }
    }


    const showPrivateRoundAccept = (text) => {
        setPublicId(text._id)
        setShiftBtwPrivPub('Accept_Private')
        handleShow(text?.currency)
    }

    const setToPrivateFunc = () => {
        setShiftBtwPrivPub('Create_Private')
    }
    const setToHomeFunc = () => {
        setShiftBtwPrivPub('Home')
        getFundingRound()

    }

    const showPrivateRoundReceived = (text) => {
        handleShow(text?.currency)
        setShiftBtwPrivPub('Received_Private')
        setPublicId(text._id)
    }
    const showPrivateRoundRejected = (text) => {
        if (text?.creator_role == 'investor') {

            handleShow(text?.currency)

            setShiftBtwPrivPub('Rejected_Private_Write')
            setPublicId(text._id)
        } else {
            handleShow(text?.currency)

            setShiftBtwPrivPub('Rejected_Private')
            setPublicId(text._id)

        }
    }

    useEffect(() => {
        if (loginId != '') {
            getMyOwnProjectDetailsFunc()
            getFundingRound()
            getMyInvestmentsDetailsFunc()
        }

    }, [loginId])

    

    const getMyOwnProjectDetailsFunc = () => {
        try {

            var query =
                `
                query AllProposals($id: ID) {
                    getUser(_id: $id) {
                      _id
                  
                      currency
                    }
                    allMilestone(investor: $id) {
                      _id
                      milestone
                      target_date
                      percentage
                      validation_status
                      milestone_status
                      funds
                      estimated_target_date
                      remarks
                      withdrawn_status
                  
                      investor_remarks
                      fundraise {
                        project {
                          project_name
                          _id
                        }
                        _id
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
                    variables: {
                        "id": loginId,

                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data);
                    if (data?.data?.getUser != null && data?.data?.getUser != undefined) {

                        setCurrency(data?.data?.getUser.currency)
                    } else {

                        setCurrency('')
                    }

                    if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                        var milestoneMainData = []
                        for (var i = 0; i < data?.data?.allMilestone.length; i++) {
                            if (data?.data?.allMilestone[i].validation_status != 'Unrequested') {

                                var estDate = ''
                                var targetdate = ''
                                if (data?.data?.allMilestone[i]?.target_date != null && data?.data?.allMilestone[i]?.target_date != undefined) {
                                    targetdate = data?.data?.allMilestone[i]?.target_date.split('T')[0]
                                    console.log(targetdate, "targetdate");
                                } else {
                                    targetdate = ''
                                }
                                if (data?.data?.allMilestone[i]?.estimated_target_date != null && data?.data?.allMilestone[i]?.estimated_target_date != undefined) {
                                    estDate = data?.data?.allMilestone[i]?.estimated_target_date.split('T')[0]
                                } else {
                                    estDate = ''
                                }
                                milestoneMainData.push({
                                    targetdate,
                                    estDate,
                                    ...data?.data?.allMilestone[i]
                                }

                                )
                            }

                        }
                        console.log(milestoneMainData, "milestoneMainData");

                        settokenStd4(milestoneMainData)
                    } else {
                        settokenStd4([])
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

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




    const FundingReqFunc = (id) => {
        // showPrivateRoundReceived
        // console.log(text.Status);
        // if (text.Status == 'Pending') {
        //     setShiftBtwPrivPub('Pending_show')
        // } else {

        //     setShiftBtwPrivPub('Pending_completed_show')
        // }


        // console.log(id, "id");
        if (id != null && id != undefined && id != '') {

            setMileStoneId(id)
            setShiftBtwPrivPub('Show_MileStone')
        } else {

            setMileStoneId('')
            // setshowMileStone(false)
        }

    }



    const getFundingRound = () => {
        try {

            var query = `
            query AllFundraise($investor: ID) {
                allFundraise(investor: $investor) {
                  _id
                  investor {
                    last_name
                    first_name
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
                  tokens_sold
                  fund_unlocked
                  fund_locked
                  fund_withdrawn
                  remarks
                  blockers
                  project_status
                  fund_raised
                  creator
                  project {
                    _id
                    project_name
                  }
                  founder_status
                  investor_status
                  funds_requested
                  creator_role
                  deposited
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
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.allFundraise != null && data?.data?.allFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        var arrayFunding = []
                        var arrayDraftData = []
                        var arrayPublicData = []
                        for (var i = 0; i < data?.data?.allFundraise.length; i++) {
                            console.log(data?.data?.allFundraise[i], "arrayData");
                            if (data?.data?.allFundraise[i].investor_status == 'Draft' && data?.data?.allFundraise[i].creator_role == 'investor') {
                                arrayDraftData.push(data?.data?.allFundraise[i])
                            } else if (data?.data?.allFundraise[i].founder_status == 'Draft' && data?.data?.allFundraise[i].creator_role == 'investor') {
                                arrayDraftData = arrayDraftData
                            }
                            else if (data?.data?.allFundraise[i].founder_status != 'Draft' && data?.data?.allFundraise[i].deposited == true) {
                                arrayPublicData.push(data?.data?.allFundraise[i])
                            }
                            else if (data?.data?.allFundraise[i].founder_status != 'Draft' && data?.data?.allFundraise[i].round == 'Private' && data?.data?.allFundraise[i].deposited == false) {
                                arrayFunding.push(
                                    data?.data?.allFundraise[i]
                                )
                            }
                            // else {
                            //     arrayPublicData.push(data?.data?.allFundraise[i])
                            // }
                        }
                        console.log(arrayFunding, "arrayFunding");
                        setFundRaisePrivateData(arrayFunding)
                        setDraftFundRaiseData(arrayDraftData)
                        setFundRaiseData(arrayPublicData)
                    }
                    else {

                        setFundRaisePrivateData([])
                        setDraftFundRaiseData([])
                        setFundRaiseData([])
                    }

                })


        } catch (err) {
            console.log(err);
        }
    }

    const getMyInvestmentsDetailsFunc = () => {
        try {

            var query = `
            query GetInvestmentAnalytics($user: ID) {
                getInvestmentAnalytics(user: $user) {
                  amount_invested
                  escrow_unlocked
                  escrow_locked
                  invested_projects
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
                        "user": loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.getInvestmentAnalytics != null && data?.data?.getInvestmentAnalytics != undefined) {
                        // console.log(data?.data?.getInvestmentAnalytics, "getInvestmentAnalytics");
                        setAnalyticsData([data?.data?.getInvestmentAnalytics])
                    } else {
                        setAnalyticsData([])
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="page-wrapper" style={{ paddingTop: '60px' }}>
            <div className="content container-fluid">
                <div >
                    <div className="page-header">
                        <div className="header-left">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Investments</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        shiftBtwPrivPub == "Pending_show" ?
                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                <PendingMileStone getFundingRound={getFundingRound} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                            </div>
                            :
                            shiftBtwPrivPub == 'Create_Private' ?
                                <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                    <div className="row">
                                        <div className="col-md-12" style={{ padding: '0px' }}>
                                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                <div className="col" style={{ padding: '0px' }}>
                                                    <div className="search mb-2">
                                                        <h3 className="card-title mb-0" style={{ padding: '10px' }}>Create Private Round</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <CreateInvestorPrivateRound investorDashBoard={investorDashBoard} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                </div>
                                :
                                shiftBtwPrivPub == 'Edit_Draft_Private' ?
                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                        <div className="row">
                                            <div className="col-md-12" style={{ padding: '0px' }}>
                                                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                    <div className="col" style={{ padding: '0px' }}>
                                                        <div className="search mb-2">
                                                            <h3 className="card-title mb-0" style={{ padding: '10px' }}>Draft Round</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <DraftPrivateRound indexCountforSlect={indexCountforSlect} publicId={publicId} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                    </div>
                                    :
                                    shiftBtwPrivPub == 'View_Round' ?
                                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                            <RoundInvestorPage indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                                        </div>
                                        :
                                        shiftBtwPrivPub == 'Received_Private' ?
                                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                <ReceivedInvestorPrivatePage getFundingRound={getFundingRound} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                                            </div>
                                            :
                                            shiftBtwPrivPub == 'Rejected_Private' ?
                                                <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                    <ReceivedInvestorPrivatePage getFundingRound={getFundingRound} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                                                </div>
                                                :
                                                shiftBtwPrivPub == 'Rejected_Private_Write' ?
                                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                        <RejectedEditInvestor getFundingRound={getFundingRound} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                                                        {/* <RejectedDraftTest getFundingRound={getFundingRound} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} /> */}
                                                        
                                                    </div>
                                                    :
                                                    shiftBtwPrivPub == 'Show_MileStone' ?
                                                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                            <MileStoneInvestorStatusPage mileStoneId={mileStoneId} getFundingRound={getMyOwnProjectDetailsFunc} handleClose={setToHomeFunc} />
                                                        </div>
                                                        :
                                                        shiftBtwPrivPub == 'Accept_Private' ?
                                                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                                <AcceptedInvestorPrivatePage getFundingRound={getMyOwnProjectDetailsFunc} indexCountforSlect={indexCountforSlect} publicId={publicId} handleClose={setToHomeFunc} />
                                                                {/* <RejectedPrivatePage handleClose={setToHomeFunc} /> */}
                                                            </div>
                                                            :
                                                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                                <div className="row">
                                                                    <div className="col-md-12" style={{ padding: '0px' }}>
                                                                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                                            <div className="col" style={{ padding: '0px' }}>
                                                                                {/* mt-4 */}
                                                                                <div className="search mb-2">
                                                                                    <h3 className="card-title mb-0">Analytics</h3>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <Analytics
                                                                        endValue={analyticsData?.length > 0 && analyticsData[0]?.amount_invested != null && analyticsData[0]?.amount_invested != undefined && analyticsData[0]?.amount_invested != '' ? analyticsData[0]?.amount_invested : 0}
                                                                        currency={currency}
                                                                        textValue={'Amount Invested'}
                                                                    />
                                                                    <Analytics
                                                                        endValue={analyticsData?.length > 0 && analyticsData[0]?.escrow_unlocked != null && analyticsData[0]?.escrow_unlocked != undefined && analyticsData[0]?.escrow_unlocked != '' ? analyticsData[0]?.escrow_unlocked : 0}
                                                                        currency={currency}
                                                                        textValue={'Escrow unlocked'}
                                                                    />
                                                                    <Analytics
                                                                        endValue={analyticsData?.length > 0 && analyticsData[0]?.escrow_locked != null && analyticsData[0]?.escrow_locked != undefined && analyticsData[0]?.escrow_locked != '' ? analyticsData[0]?.escrow_locked : 0}
                                                                        currency={currency}
                                                                        textValue={'Escrow Locked'}
                                                                    />
                                                                    <Analytics
                                                                        endValue={analyticsData?.length > 0 && analyticsData[0]?.invested_projects != null && analyticsData[0]?.invested_projects != undefined && analyticsData[0]?.invested_projects != '' ? analyticsData[0]?.invested_projects : 0}
                                                                        currency={currency}
                                                                        textValue={'Invested Projects'}
                                                                    />
                                                                </div>
                                                                <TableMainPage
                                                                    FundRaiseData={FundRaiseData}
                                                                    setToPrivateFunc={setToPrivateFunc}
                                                                    showRoundFunc={showRoundFunc}
                                                                    DraftFundRaiseData={DraftFundRaiseData}
                                                                    FundRaisePrivateData={FundRaisePrivateData}
                                                                    tokenStd4={tokenStd4}
                                                                    showEditDraftRound={showEditDraftRound}
                                                                    showPrivateRoundAccept={showPrivateRoundAccept}
                                                                    showPrivateRoundReceived={showPrivateRoundReceived}
                                                                    showPrivateRoundRejected={showPrivateRoundRejected}
                                                                    FundingReqFunc={FundingReqFunc}
                                                                    getFundingRound={getFundingRound}
                                                                />
                                                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default InvestorFundRaise;