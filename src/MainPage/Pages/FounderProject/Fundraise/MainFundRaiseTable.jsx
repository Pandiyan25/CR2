import React from 'react'
import AnalyticsMainPage from './AnalyticsMainPage'
import DraftTable from './DraftTable'
import FundRaiseTable from './FundRaiseTable'
import FundReqTable from './FundReqTable'
import ValidationReqTable from './ValidationReqTable'
import { ToastContainer, toast } from 'material-react-toastify';
import './newStyle.css'

import 'material-react-toastify/dist/ReactToastify.css';
import { apiURI } from '../../../../config/config'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MileStoneArray } from '../../../../reducers/ConstantSlice'
import ErrorBoundary from './errorBon'
import { useState } from 'react'

const MainFundRaiseTable = ({
    tokenStd4,
    getFundingRound,
    FundRaisePrivateData,
    DraftFundRaiseData,
    FundRaiseData,
    handleShow,
    setShiftBtwPrivPub,
    setPublicId,
    analyticsData
}) => {

    const [changeTab, setChangeTab] = useState('FundingReq')
    const dispatch = useDispatch()
    const leadInvestor = useSelector((state) => state.constVar.leadInvestor)
    const externalLeadInvestor = useSelector((state) => state.constVar.externalLeadInvestor)

    const showPrivateRoundReceived = (text) => {

        setPublicId(text)
        setShiftBtwPrivPub('Received_Private')
    }

    const setToPublicFunc = () => {

        toast.warning("Under Construction", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        // setShiftBtwPrivPub('Create_Public')
    }

    const setToPrivateFunc = () => {
        setShiftBtwPrivPub('Create_Private')
    }


    const showPrivateRoundRejected = (text) => {
        console.log(text, "founder_rej");
        if (text?.creator_role == 'founder') {

            setPublicId(text._id)
            handleShow(text?.currency)
            setShiftBtwPrivPub('Rejected_Private')
        } else {

            setPublicId(text._id)
            setShiftBtwPrivPub('Rejected_Private_ReadOnly')
        }
    }

    const showRoundFunc = (text) => {
        setShiftBtwPrivPub('View_Round')
        setPublicId(text._id)

    }

    const FundingReqFunc = (id) => {
        console.log("Milestone Id ",id)
        setShiftBtwPrivPub('View_Round')
        setPublicId(id)
    }

    const deleteFunding = (i) => {
        try {



            var query = `
                mutation DeleteFundraise($id: ID) {
                    deleteFundraise(_id: $id) {
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
                        "id": i._id,

                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.deleteFundraise != null && data?.data?.deleteFundraise != undefined) {

                        toast.success("Successfully Deleted", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        getFundingRound()
                    }

                })


        } catch (error) {
            console.log(error);
        }
    }

    const editDraftData = (text) => {
        try {
            if (text?.round == 'Private') {

                var milestoneMaindata = []
                setShiftBtwPrivPub("Edit_Private")
            } else {
                var milestoneMaindataPublic = []
                if (text?.milestones?.length > 0) {
                    for (var i = 0; i < text?.milestones?.length; i++) {

                        var dateTag = ''
                        if (text?.milestones[i].target_date) {
                            dateTag = text?.milestones[i].target_date.split("T")[0]
                        } else {
                            dateTag = ''
                        }
                        milestoneMaindataPublic.push({
                            choose: "set_MileStone",
                            milestone: text.milestones[i].milestone,
                            // placeHolder:'MileStone1',
                            target_date: dateTag,
                            percentage: text.milestones[i].percentage,
                        })
                    }
                } else {
                    milestoneMaindataPublic = []
                }



                dispatch(MileStoneArray(
                    milestoneMaindataPublic
                ))
                setShiftBtwPrivPub("Edit_Public")
            }
            handleShow(text?.currency)
            // 
            setPublicId(text._id)
        } catch (error) {

        }
    }

    const changeToFundingReqfunc = () => setChangeTab('FundingReq')
    const changeToDraftfunc = () => setChangeTab('DraftReq')
    const changeToValidationfunc = () => setChangeTab('ValidationReq')
    const changeToMileStonefunc = () => setChangeTab('MileStoneReq')


    return (
        <ErrorBoundary>



            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                <div className="row">

                    <div className="col-md-12" style={{ padding: '0px' }}>


                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                            <div className="col" style={{ padding: '0px' }}>
                                {/* mt-4 */}
                                <div className="search mb-2">

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Analytics</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>


                <div className="row">
                    <AnalyticsMainPage MainText={'Fund Raised'} endValue={analyticsData?.length > 0 && analyticsData[0]?.fund_raised != null && analyticsData[0]?.fund_raised != undefined ? analyticsData[0]?.fund_raised : 0} textPAgeType={false} />


                    <AnalyticsMainPage MainText={'Public Rounds'} endValue={analyticsData?.length > 0  && analyticsData[0]?.public_round != null && analyticsData[0]?.public_round != undefined ? analyticsData[0]?.public_round : 0}  textPAgeType={false} />
                    <AnalyticsMainPage MainText={'Private Rounds'} endValue={analyticsData?.length > 0  && analyticsData[0]?.private_round != null && analyticsData[0]?.private_round != undefined ? analyticsData[0]?.private_round : 0}  textPAgeType={false} />
                    <AnalyticsMainPage MainText={'Amount in Escrow'} endValue={analyticsData?.length > 0  && analyticsData[0]?.amount_in_escrow != null && analyticsData[0]?.amount_in_escrow != undefined ? analyticsData[0]?.amount_in_escrow : 0}  textPAgeType={false} />

                    <AnalyticsMainPage leadInvestor={leadInvestor} MainText={'Lead Investor'} externalLeadInvestor={externalLeadInvestor} endValue={analyticsData?.length > 0  && analyticsData[0]?.lead_investor != null && analyticsData[0]?.lead_investor != undefined ? analyticsData[0]?.lead_investor :  ' '}  textPAgeType={true} />



                </div>

                <div className="row">

                    <AnalyticsMainPage MainText={'No of Private Investors'} endValue={analyticsData?.length > 0   && analyticsData[0]?.no_of_private_investors != null && analyticsData[0]?.no_of_private_investors != undefined ? analyticsData[0]?.no_of_private_investors : 0}  textPAgeType={false} />


                    <AnalyticsMainPage MainText={'No of Public Investors'} endValue={analyticsData?.length > 0  && analyticsData[0]?.no_of_public_investors != null && analyticsData[0]?.no_of_public_investors != undefined ? analyticsData[0]?.no_of_public_investors : 0}  textPAgeType={false} />
                    <AnalyticsMainPage MainText={'Completed Rounds'} endValue={analyticsData?.length > 0  && analyticsData[0]?.completed_rounds != null && analyticsData[0]?.completed_rounds != undefined ? analyticsData[0]?.completed_rounds : 0}  textPAgeType={false} />
                    <AnalyticsMainPage MainText={'Escrow Unlocked'} endValue={analyticsData?.length > 0  && analyticsData[0]?.escrow_unlocked != null && analyticsData[0]?.escrow_unlocked != undefined ? analyticsData[0]?.escrow_unlocked : 0}  textPAgeType={false} />

                    <AnalyticsMainPage MainText={'Rejected Private Rounds'} endValue={analyticsData?.length > 0  && analyticsData[0]?.rejected_private_rounds != null && analyticsData[0]?.rejected_private_rounds != undefined ? analyticsData[0]?.rejected_private_rounds : 0}  textPAgeType={false} />






                </div>

                <div className="row">
                <div className=" col-md-12 col-sm-12 col-lg-12 col-xl-12" style={{ marginTop: '15px', marginBottom: '15px', display: "flex",padding:'0px',paddingLeft:"5px" }} >
                    <button className={changeTab == 'FundingReq' ? "newbtt2" : "newbtt"} onClick={() => changeToFundingReqfunc()}>Funding Requests</button>
                    <button className={changeTab == 'DraftReq' ? "newbtt2" : "newbtt"} onClick={() => changeToDraftfunc()}>Drafts</button>
                    <button className={changeTab == 'ValidationReq' ? "newbtt2" : "newbtt"} onClick={() => changeToValidationfunc()}>Validation Requests</button>
                    <button className={changeTab == 'MileStoneReq' ? "newbtt2" : "newbtt"} onClick={() => changeToMileStonefunc()}>Milestone Status</button>
                </div>
                </div>

                <div className={changeTab == 'FundingReq' ? "" : "newStylepart1"}>
                    <FundRaiseTable
                        showPrivateRoundReceived={showPrivateRoundReceived}
                        FundRaisePrivateData={FundRaisePrivateData}
                        setToPublicFunc={setToPublicFunc}
                        setToPrivateFunc={setToPrivateFunc}
                        showPrivateRoundRejected={showPrivateRoundRejected}
                    />
                </div>

                <div className={changeTab == 'DraftReq' ? "" : "newStylepart1"}>

                    <DraftTable
                        DraftFundRaiseData={DraftFundRaiseData}
                        setToPrivateFunc={setToPrivateFunc}
                        setToPublicFunc={setToPublicFunc}
                        editDraftData={editDraftData}
                        deleteFunding={deleteFunding} />
                </div>

                <div className={changeTab == 'ValidationReq' ? "" : "newStylepart1"}>


                    <FundReqTable
                        showRoundFunc={showRoundFunc}
                        FundRaiseData={FundRaiseData}
                        setToPrivateFunc={setToPrivateFunc}
                        setToPublicFunc={setToPublicFunc}
                    />
                </div>

                <div className={changeTab == 'MileStoneReq' ? "" : "newStylepart1"}>

                    <ValidationReqTable
                        tokenStd4={tokenStd4}
                        setToPrivateFunc={setToPrivateFunc}
                        setToPublicFunc={setToPublicFunc}
                        FundingReqFunc={FundingReqFunc}
                    />

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
        </ErrorBoundary>
    )
}

export default MainFundRaiseTable;