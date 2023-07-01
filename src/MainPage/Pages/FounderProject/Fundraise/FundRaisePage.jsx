
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { Button } from 'reactstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import CountUp from 'react-countup';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import CreatePrivateRound from './CreatePrivateRound';
import CreatePublicRound from './CreatePublicRound';
import RoundPage from './RoundPage'
import ReceivedPrivatePage from './ReceivedPrivatePage';
import RejectedPrivatePage from './RejectedPrivatePage';
import { apiURI } from '../../../../config/config';
import EditPublicRound from './EditPublicRound';
import EditPrivateRound from './EditPrivateRound';
import { array } from 'prop-types';
import { MileStoneArray, MileStoneInvestorPrivateArray, MileStonePrivateArray,showTokenomicsData } from '../../../../reducers/ConstantSlice';
import RejectedPrivateReadOnlyPage from './RejectedPrivateReadOnlyPage';
import MainFundRaiseTable from './MainFundRaiseTable';


const FundRaisePage = () => {
const[analyticsData,setAnalyticsData] = useState([])
    const dispatch = useDispatch()
    const [tokenStd4, setTokenStd4] = useState([])
    const [indexCountforSlect, setindexCountforSlect] = useState(0)
    const [DraftFundRaiseData, setDraftFundRaiseData] = useState([])
    const [FundRaisePrivateData, setFundRaisePrivateData] = useState([])

    const [tokenStd1, setTokenStd1] = useState([])
    var history = useHistory()
    const [publicId, setPublicId] = useState('')
    const [FundRaiseData, setFundRaiseData] = useState([])
    const projectIdData = useSelector((state) => state.constVar.projectId)
    const [shiftBtwPrivPub, setShiftBtwPrivPub] = useState('Home')
    const loginId = useSelector((state) => state.constVar.loginId)
    const currencyType = useSelector((state) => state.constVar.currencyType)
    const showTokenomicsData1 = useSelector((state) => state.constVar.showTokenomicsData)
    const setToPrivateFunc = () => {    
        setShiftBtwPrivPub('Create_Private')
    }
    
    const founderDashBoard =() => {
        history.push('/dashboard')
    }

    const TokenomicsPage = () =>{
        dispatch(showTokenomicsData(true))
        history.push('/Project')
    }

    const setToHomeFunc = () => {
        setShiftBtwPrivPub('Home')
        dispatch(MileStoneArray([{
            choose: "Choose_MileStone",
            milestone: 'Complete 50% of the Target Fund Raise',
            target_date: "",
            percentage: 1


        }]))
        dispatch(MileStonePrivateArray([{

            choose: "Choose_MileStone",
            milestone: 'Complete 50% of the Target Fund Raise',
            target_date: "",
            percentage: 1,

            validation_status: '',
            milestone_status: '',
            funds: '',
            remarks: '',
            estimated_target_date: ''


        }]))
        dispatch(MileStoneInvestorPrivateArray([{

            choose: "Choose_MileStone",
            milestone: 'Complete 50% of the Target Fund Raise',
            target_date: "",
            percentage: 1


        }]))

    }






    useEffect(() => {
        // console.log(currencyType,"indexCount parent")
        getMyOwnProjectDetailsFunc()
        getFundingRound()
        getValidationRequests()
    }, [])


    const getValidationRequests = () => {
        try{
            var query = `
            query AllMilestone($id: ID)
            {
                allMilestone(project: $id) {
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
                    rejected_count
                    fundraise {
                      investor {
                        fund_name
                        _id
                      }
                      _id
                    }
                  }
            }`;
            fetch(apiURI.URL,{
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
                        "id": projectIdData,
                    }
                })
            })
            .then((response) => {
                const json = response.json();
                return json;
            })
            .then(data => {
                console.log('ProjectGetFunctiondata', data?.data?.allMilestone);
                if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                    var milestoneMainData = []
                    for (var i = 0; i < data?.data?.allMilestone.length; i++) {
                        if (data?.data?.allMilestone[i].validation_status != 'Unrequested') {
                            var estDate = ''
                            var targetdate = ''
                            if (data?.data?.allMilestone[i]?.target_date != null && data?.data?.allMilestone[i]?.target_date != undefined) {
                                targetdate = data?.data?.allMilestone[i]?.target_date.split('T')[0]
                                // console.log(targetdate, "targetdate");
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
                            })
                        }
                    }
                    
                    console.log(milestoneMainData, "ProjectGetFunctiondata Milestone Array");
                    setTokenStd4(milestoneMainData)
                }else{
                    setTokenStd4([])
                }
            })            
        }catch(e){

        }
    }
    const getMyOwnProjectDetailsFunc = () => {
        try {

            var query = `
            query GetFundraiseAnalytics($project: ID) {
                getFundraiseAnalytics(project: $project) {
                  fund_raised
                  public_round
                  private_round
                  amount_in_escrow
                  escrow_unlocked
                  lead_investor
                  no_of_private_investors
                  no_of_public_investors
                  completed_rounds
                  rejected_private_rounds
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
                        "project": projectIdData
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.getFundraiseAnalytics != null && data?.data?.getFundraiseAnalytics != undefined) {
                        // console.log(data?.data?.GetFundraiseAnalytics);
                        setAnalyticsData([data?.data?.getFundraiseAnalytics])
                    }else{
                        setAnalyticsData([])
                    }
                })


        } catch (err) {
            console.log(err);
        }
    }



    const   getFundingRound = () => {
        console.log("project id",projectIdData)
        try {

            var query = `
            query AllFundraise($project: ID, $role: String, $user: ID, $connected: Boolean) {
                allFundraise(project: $project) {
                  _id
                  investor {
                    last_name
                    first_name
                    fund_name
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
                  founder_status
                  project_status
                  fund_raised
                  creator
                  investor_status
                  creator_role
                  funds_to_be_invested
                  deposited
                }
                allUsers(role: $role, user: $user, connected: $connected) {
                    wallet_address
                    fund_name
                    first_name
                    last_name
                    _id
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
                        "project": projectIdData,
                        "role": 'Investor',
                        "user": loginId,
                        "connected": true
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allFundraise != null && data?.data?.allFundraise != undefined) {
                        var arrayFunding = []
                        var arrayDraftData = []
                        var arrayPublicData = []
                        for (var i = 0; i < data?.data?.allFundraise.length; i++) {
                            console.log(data?.data?.allFundraise[i], "arrayData");
                            if (data?.data?.allFundraise[i].founder_status == 'Draft' && data?.data?.allFundraise[i].creator_role == 'founder') {
                                arrayDraftData.push(data?.data?.allFundraise[i])
                            }
                            // data?.data?.allFundraise[i].round == 'Private' &&
                            else if (data?.data?.allFundraise[i].deposited == false && data?.data?.allFundraise[i].investor_status != 'Draft') {
                                arrayFunding.push(
                                    data?.data?.allFundraise[i]
                                )
                            }
                            else if (data?.data?.allFundraise[i].founder_status != 'Draft' && data?.data?.allFundraise[i].investor_status != 'Draft' && data?.data?.allFundraise[i].deposited == true) {
                                arrayPublicData.push(data?.data?.allFundraise[i])
                            }
                        }
                        console.log(arrayPublicData, "arrayFunding");
                        setFundRaisePrivateData(arrayFunding)
                        setDraftFundRaiseData(arrayDraftData)
                        setFundRaiseData(arrayPublicData)
                    } else {

                        setFundRaisePrivateData([])
                        setDraftFundRaiseData([])
                        setFundRaiseData([])
                    }

                    if (data?.data?.allUsers != null && data?.data?.allUsers != undefined && data?.data?.allUsers.length > 0) {
                        setTokenStd1(data?.data?.allUsers)

                    } 
                    else {
                        setTokenStd1([])
                    }

                })


        } catch (err) {
            console.log(err);
        }
    }


    const handleShow = (currency) => {
        // console.log("indexCount handle show called")
        const countries = [
            // { value: "USD", label: "USD" },
            // { value: "SDT", label: "SDT"
            // { value: "INR", label: "INR"},
            // { value: "RUBLE", label: "RUBLE" },
            // { value: "CAD", label: "CAD" },
            // { value: "GBP", label: "GBP",
            // { value: "AED", label: "AED",
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
            { value: "USDC", label: "USDC" },
            { value: "DAI", label: "DAI" },
            { value: "BUSD", label: "BUSD" },
            { value: "USDT", label: "USDT" },

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

    // const FundingReqFunc = (id) => {
    //     console.log("Milestone Id ",id)
    // }


    return (
        <div className="page-wrapper" style={{ paddingTop: '60px' }}>
                           

            <div className="content container-fluid">
                <div >
                    <div className="page-header">
                        <div className="header-left">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Fund Raise</h3>

                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                   
               
                    </div>

                    </div>

                    {
                        shiftBtwPrivPub == 'Create_Private' ?

                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                <div className="row">

                                    <div className="col-md-12" style={{ padding: '0px' }}>


                                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                            <div className="col" style={{ padding: '0px' }}>
                                                {/* mt-4 */}
                                                <div className="search mb-2">

                                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Create Private Round</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <CreatePrivateRound tokenStd1={tokenStd1} founderDashBoard={founderDashBoard} TokenomicsPage={TokenomicsPage} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />



                            </div>
                            :
                            shiftBtwPrivPub == 'Edit_Private' ?

                                <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                    <div className="row">

                                        <div className="col-md-12" style={{ padding: '0px' }}>


                                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                <div className="col" style={{ padding: '0px' }}>
                                                    {/* mt-4 */}
                                                    <div className="search mb-2">

                                                        <h3 className="card-title mb-0" style={{ padding: '10px' }}>Edit Private Round</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <EditPrivateRound indexCountforSlect={indexCountforSlect} getFundingRound={getFundingRound} publicId={publicId} handleClose={setToHomeFunc} />



                                </div>

                                :
                                shiftBtwPrivPub == 'Edit_Public' ?

                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                        <div className="row">

                                            <div className="col-md-12" style={{ padding: '0px' }}>


                                                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                    <div className="col" style={{ padding: '0px' }}>
                                                        {/* mt-4 */}
                                                        <div className="search mb-2">

                                                            <h3 className="card-title mb-0" style={{ padding: '10px' }}>Edit Public Round</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <EditPublicRound indexCountforSlect={indexCountforSlect} getFundingRound={getFundingRound} publicId={publicId} handleClose={setToHomeFunc} />



                                    </div>
                                    :
                                    shiftBtwPrivPub == 'Create_Public' ?

                                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                            <div className="row">

                                                <div className="col-md-12" style={{ padding: '0px' }}>


                                                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                                        <div className="col" style={{ padding: '0px' }}>
                                                            {/* mt-4 */}
                                                            <div className="search mb-2">

                                                                <h3 className="card-title mb-0" style={{ padding: '10px' }}>Create Public Round</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <CreatePublicRound getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                        </div>

                                        :

                                        shiftBtwPrivPub == 'View_Round' ?

                                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>


                                                <RoundPage getFundingRound={getFundingRound} publicId={publicId} handleClose={setToHomeFunc} />
                                            </div>
                                            :
                                            shiftBtwPrivPub == 'Received_Private' ?

                                                <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>


                                                    <ReceivedPrivatePage publicId={publicId} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                                </div>
                                                :
                                                shiftBtwPrivPub == 'Rejected_Private' ?

                                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                                        <RejectedPrivatePage indexCountforSlect={indexCountforSlect} publicId={publicId} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                                    </div>

                                                    :
                                                    shiftBtwPrivPub == 'Rejected_Private_ReadOnly' ?

                                                        <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>


                                                            <RejectedPrivateReadOnlyPage publicId={publicId} getFundingRound={getFundingRound} handleClose={setToHomeFunc} />
                                                        </div>


                                                        :
                                                        <MainFundRaiseTable
                                                            setShiftBtwPrivPub={setShiftBtwPrivPub}
                                                            setPublicId={setPublicId}
                                                            handleShow={handleShow}
                                                            getFundingRound={getFundingRound}
                                                            FundRaisePrivateData={FundRaisePrivateData}
                                                            DraftFundRaiseData={DraftFundRaiseData}
                                                            FundRaiseData={FundRaiseData}
                                                            analyticsData={analyticsData}
                                                            tokenStd4={tokenStd4}
                                                            // FundingReqFunc={FundingReqFunc}


                                                        />


                    }

                </div>
            </div>

        </div>

    )
}

export default FundRaisePage;
