import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import MileStoneStatusPage from './MileStoneStatusPage';
import './PrivateRound.css'
import CongPopupLaunch from './CongPopupLaunch';
import { tokenStatus,
    initialWithdrawStatus,
    withdrawInitialPct,
    milestoneWithdrawStatus,
    withdrawIndividualMilestoneByFounder
} from '../../../../config/web3Round';
import usdimage from '../Funding/assets/images/USD.png';
import EUROimage from '../Funding/assets/images/EUR.png';
import POUNDimage from '../Funding/assets/images/POUND.png';
import YUANimage from '../Funding/assets/images/YUAN.png';
import YENimage from '../Funding/assets/images/YEN.png';
import CADimage from '../Funding/assets/images/CAD.png';
import SGDimage from '../Funding/assets/images/SGD.png';
import AUDimage from '../Funding/assets/images/AUD.png';
import DAIimage from '../Funding/assets/images/DAI.png';
import BUSDimage from '../Funding/assets/images/BUSD.png';
import INRimage from '../Funding/assets/images/INR.png';
import USDCimage from '../Funding/assets/images/USDC.png';
import USDTimage from '../Funding/assets/images/USDT.png';
import RUBLEimage from '../Funding/assets/images/RUBBLE.png';
import CNYimage from '../Funding/assets/images/CNY.png';

const RoundPage = ({ publicId, handleClose }) => {
    const dispatch = useDispatch()
    const [showMileStone, setshowMileStone] = useState(true)
    const [chooseMileStonedata, setChooseMileStonedata] = useState([
        {
            choose: "Choose_MileStone",
            ValueForChoose: 'MileStone1',
            TargetDate: "",
            percentage: 0
        }
    ])
    const [FundRaiseData, setFundRaiseData] = useState([])

    const [showPopupLaunch, setShowPopupLaunch] = useState(false)
    const [primaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const [Currency, setCurrency] = useState('')
    const [FundRequested, setFundRequested] = useState('')
    const [TokenTicker, setTokenTicker] = useState('')
    const [PricePerToken, setPricePerToken] = useState('')
    const [Stage, setStage] = useState('')
    const [MaxSupply, setMaxSupply] = useState('')
    const [Valuation, setValuation] = useState('')
    const [NoOfTokens, setNoOfTokens] = useState('')
    const [InitialRelease, setInitialRelease] = useState('')
    const [InitialReleaseWithdraw, setInitialReleaseWithdraw] = useState('')
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [MileStoneArrayData, setMileStoneArrayData] = useState([])
    const [MilestoneEditData, setMilestoneEditData] = useState('')
    const [MilestoneNum, setMilestoneNum] = useState('')
    const [MilestoneRoundId, setMilestoneRoundId] = useState('')
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const [TokensStatus, setTokensStatus] = useState({})
    // console.log(MileStoneArrayData,"MileStoneArrayDataMileStoneArrayData");

    const changeMileStoneFunc = (i) => {

        console.log(i, "ijjnjn");
        if (i != null && i != undefined) {

            console.log(i, "setMilestoneEditData");
            setMilestoneEditData(i?.id)
            setMilestoneNum(i?.milestone_blockchain_id);
            setMilestoneRoundId(i?.roundId);
            setshowMileStone(false)
        } else {

        }
    }

    const closeChangeMileStoneFUnc = () => {
        setshowMileStone(true)
    }

    const getCountofHundFunc = () => {


        getValueFunc()
    }
    const getTokenDetails = async (roundId, founder, investor) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let tokensInfo = await tokenStatus(userData?.provider, roundId, founder, investor);
        console.log('tokensInfo: ', tokensInfo);
        setTokensStatus(tokensInfo);
    }
    const getTokenWeb2Details = async () => {
        let web2DataTest = {
            unlockedAmount: 1234,
            lockedAmount: 1234,
            withdrawnTokensByFounder: 1234
          }
        console.log("tokensInfo setting",web2DataTest)
        setTokensStatus(web2DataTest);
        
    }

    useEffect(() => {
        getCountofHundFunc()
    }, [])

    const getValueFunc = () => {
        try {

            var query = `
            query GetFundraise($id: ID) {
                getFundraise(_id: $id) {
                  _id
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
              
                  founder_status
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
                  creator_role
                  initial_release_status
                  fundraise_blockchain_id
                  project {
                        user {
                            wallet_address
                        }
                  }
                  investor {
                    wallet_address
                    _id
                  }
                  currency_contract_id
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
                        "id": publicId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.getFundraise != null && data?.data?.getFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        // getTokenDetails(data?.data?.getFundraise?.fundraise_blockchain_id, data?.data?.getFundraise?.project?.user?.wallet_address, data?.data?.getFundraise?.investor?.wallet_address)
                        getTokenWeb2Details()
                        getMilestoneFunc(data?.data?.getFundraise?._id, data?.data?.getFundraise?.fundraise_blockchain_id)
                        setFundRaiseData([data?.data?.getFundraise])
                        setPrimaryFundingWallet(data?.data?.getFundraise?.primary_funding_wallet)

                        setCurrency(data?.data?.getFundraise?.currency)
                        setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        setValuation(data?.data?.getFundraise?.valuation)
                        setNoOfTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        setInitialReleaseWithdraw(data?.data?.getFundraise?.initial_release_status)
                        if (data?.data?.getFundraise?.end_target_date != '' && data?.data?.getFundraise?.end_target_date != undefined
                            && data?.data?.getFundraise?.end_target_date != null
                        ) {
                            var dateType = data?.data?.getFundraise?.end_target_date.split('T')[0]
                            setEndtargetDate(dateType)
                        } else {
                            setEndtargetDate('')
                        }

                        // var mainMileStone = []
                        // for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
                        //     if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

                        //         // if(data?.data?.getFundraise?.milestones[i].target_date )
                        //         var mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
                        //         mileStoneDate = mileStoneDate.split('T')[0]
                        //         console.log(mileStoneDate, "mileStoneDate");

                        //         mainMileStone.push({

                        //             "choose": "set_MileStone",
                        //             "target_date": mileStoneDate,
                        //             "milestone": data?.data?.getFundraise?.milestones[i].milestone,
                        //             "percentage": data?.data?.getFundraise?.milestones[i].percentage,

                        //             validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
                        //             milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
                        //             funds: data?.data?.getFundraise?.milestones[i].funds,
                        //             remarks: data?.data?.getFundraise?.milestones[i].remarks,
                        //             estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
                        //             // ...data?.data?.getFundraise?.milestones[i]
                        //         }
                        //         )
                        //     } else {
                        //         mainMileStone.push({

                        //             "choose": "set_MileStone",
                        //             "target_date": '',
                        //             "milestone": data?.data?.getFundraise?.milestones[i].milestone,
                        //             "percentage": data?.data?.getFundraise?.milestones[i].percentage,

                        //             validation_status: data?.data?.getFundraise?.milestones[i].validation_status,
                        //             milestone_status: data?.data?.getFundraise?.milestones[i].milestone_status,
                        //             funds: data?.data?.getFundraise?.milestones[i].funds,
                        //             remarks: data?.data?.getFundraise?.milestones[i].remarks,
                        //             estimated_target_date: data?.data?.getFundraise?.milestones[i].estimated_target_date
                        //             // ...data?.data?.getFundraise?.milestones[i]
                        //         }
                        //         )
                        //     }


                        //     console.log(mainMileStone, "MileStoneArrayDataMileStoneArrayData");



                        // }
                        // setMileStoneArrayData(mainMileStone)
                        // (dispatch(MileStoneArray((mainMileStone))))

                    }

                })


        } catch (err) {
            console.log(err);
        }
    }


    const showPopup = () => {

        setShowPopupLaunch(true)
    }

    const handleCloseShowPopup = () => {
        setShowPopupLaunch(false)
        handleClose()
    }

    const withdrawMoney = (id) => {
        try {
            var query = `
            mutation UpdateMilestone($input: MilestoneInput, $id: ID) {
                updateMilestone(input: $input, _id: $id) {
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
                            "id": id,
                            "input": {
                              "withdrawn_status": 'Completed'
                            }
                        
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.updateMilestone != null && data?.data?.updateMilestone != undefined) {

                        showPopup(true)
                        getCountofHundFunc()
                    }

                })


        } catch (error) {
            console.log(error);
        }
    }

    const getMilestoneFunc = (fundraise, roundId) => {
        try {

            var query = `
            query AllMilestone($fundraise: ID) {
                allMilestone(fundraise: $fundraise) {
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
                  blocked_status
                  milestone_blockchain_id
                }
            }`;

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
                        "fundraise": fundraise
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                        var mainMileStone = []
                        for (var i = 0; i < data?.data?.allMilestone.length; i++) {
                            if (data?.data?.allMilestone[i].target_date != '' && data?.data?.allMilestone[i].target_date != undefined) {

                                // if(data?.data?.allMilestone[i].target_date )
                                var mileStoneDate = data?.data?.allMilestone[i].target_date
                                mileStoneDate = mileStoneDate.split('T')[0]
                                console.log(mileStoneDate, "mileStoneDate");
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "target_date": mileStoneDate,
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    blocked_status: data?.data?.allMilestone[i].blocked_status,
                                    milestone_blockchain_id: data?.data?.allMilestone[i].milestone_blockchain_id,
                                    roundId: roundId
                                    // ...data?.data?.allMilestone[i]
                                })

                            } else {
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "target_date": '',
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    blocked_status: data?.data?.allMilestone[i].blocked_status,
                                    milestone_blockchain_id: data?.data?.allMilestone[i].milestone_blockchain_id,
                                    roundId: roundId
                                    // ...data?.data?.allMilestone?.milestones[i]
                                })
                            }




                            console.log(mainMileStone, "mainMileStone");

                        }



                        setMileStoneArrayData(mainMileStone)
                    } else {


                        setMileStoneArrayData([])
                    }

                })


        } catch (err) {
            console.log(err);
        }

    }

    const InitialReleaseWithdrawFunc = (id) => {
        try {
            if(id != null && id != undefined){
                var query = `
                mutation UpdateFundraise($id: ID, $input: FundraiseInput) {
                    updateFundraise(_id: $id, input: $input) {
                      _id
                    }
                  }
                  
                            `;
    
                return fetch(apiURI.URL, {
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
                                "id": id,
                                "input": {
                                  "initial_release_status": 'Completed'
                                }
                            
                        }
    
                    })
                })
                    .then((response) => {
    
                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
    
                            showPopup(true)
                            getCountofHundFunc()
                        }
    
                    })
    
            }else{
                alert("Please Check properly")
            }
           

        } catch (error) {
            console.log(error);
        }
    }

    const withdrawInitialReleaseTokens = async () => { // web3: withdraw initial release tokens
        let round = {};
        if (FundRaiseData && FundRaiseData.length) round = FundRaiseData[0];
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let status =  await initialWithdrawStatus(userData.provider, round?.fundraise_blockchain_id, round?.project?.user?.wallet_address);
            if (status == false) {
                console.log('calling withdraw initial pct');
                withdrawInitialPct(userData.provider, wallet_address, round?.currency_contract_id, round?.fundraise_blockchain_id)
                .then((withStatus) => {
                    console.log('called initial pct: ', withStatus);
                    console.log('updating round record with initial tokens withdrawal status')
                    return InitialReleaseWithdrawFunc(round?._id);
                })
                .then((status) => {
                    console.log('updated record:', status);
                })
                .catch(err => {
                    console.log(err);
                    alert(err.message);
                })
            } else {
                alert('Tokens are already withdrawn');
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet");
        }
    }

    const withdrawMilestoneTokens = async (_id, milestoneId, pct) => { // web3: withdraw milestone tokens
        console.log('milestone withdraw request params: ', _id, milestoneId, pct);
        let round = {};
        if (FundRaiseData && FundRaiseData.length) round = FundRaiseData[0];
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let status = await milestoneWithdrawStatus(userData.provider, parseInt(round?.fundraise_blockchain_id), parseInt(milestoneId));
            if (status == false) {
                console.log('calling withdrawIndividualMilestoneByFounder: ', userData.provider, wallet_address, round.investor?.wallet_address, parseInt(round?.fundraise_blockchain_id), parseInt(milestoneId), parseInt(pct), round?.currency_contract_id);
                withdrawIndividualMilestoneByFounder(userData.provider, wallet_address, round.investor?.wallet_address, parseInt(round?.fundraise_blockchain_id), parseInt(milestoneId), parseInt(pct), round?.currency_contract_id)
                .then((resp) => {
                    console.log('called withdrawIndividualMilestoneByFounder: ', resp);
                    console.log('updating milestone record with withdrawal status');
                    return withdrawMoney(_id);
                })
                .then((status) => {
                    console.log('updated record:', status);
                })
                .catch(err => {
                    console.log(err);
                    alert(err.message);
                })
            } else {
                alert('Tokens are already withdrawn');
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet");
        }
    }

    return (
        <div className="col-md-12">
            {showMileStone == true ?

                <div className="row">
                    <div className="row">

                        <div className="col-md-12" style={{ padding: '0px' }}>


                            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                                <div className="col" style={{ padding: '0px' }}>
                                    {/* mt-4 */}
                                    <div className="search mb-2">

                                        <h3 className="card-title mb-0" style={{ padding: '10px' }}>Round</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <div className="row" style={{ padding: '10px' }}>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Round Type</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.round}


                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Contract ID</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                        {/* 0xf1b9686626D78Df34ec873FBb3B3aD052280505B */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.contract_id}
                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {primaryFundingWallet}
                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Currency</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {Currency == "BUSD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>BUSD

                                            </div> : ""}
                                        {Currency == "CAD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={CADimage}></img>CAD
                                            </div> : ""}
                                        {Currency == "AUD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img>AUD
                                            </div> : ""}
                                        {Currency == "CNY" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img>CNY
                                            </div> : ""}
                                        {Currency == "DAI" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img>DAI
                                            </div> : ""}
                                        {Currency == "EURO" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={EUROimage}></img>EURO
                                            </div> : ""}
                                        {Currency == "INR" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={INRimage}></img>INR
                                            </div> : ""}
                                        {Currency == "RUBLE" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img>RUBLE
                                            </div> : ""}
                                        {Currency == "SGD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img>SGD
                                            </div> : ""}
                                        {Currency == "USDC" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img>USDC
                                            </div> : ""}
                                        {Currency == "USDT" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img>USDT
                                            </div> : ""}
                                        {Currency == "USD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={usdimage}></img>USD
                                            </div> : ""}
                                        {Currency == "POUND" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img>POUND
                                            </div> : ""}
                                        {Currency == "YUAN" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img>YUAN
                                            </div> : ""}
                                        {Currency == "YEN" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={YENimage}></img>YEN
                                            </div> : ""}






                                    </div>
                                </div>

                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Funds Raised</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {FundRequested}


                                    </div>
                                </div>

                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}> Token Ticker</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {TokenTicker}


                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Price Per Token</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                                        {PricePerToken}

                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Stage</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {Stage == 'pre_seed_round' ? 'Pre Seed Round' :
                                            Stage == 'seed_round' ? 'Seed Round' :
                                                Stage == 'strategic_round' ? 'Strategic Round' :
                                                    Stage == 'pre_sale' ? 'Pre Sale' :
                                                        Stage == 'public_round' ? 'Public Round' :
                                                            Stage == 'kol_round' ? 'KOL Round' :
                                                                Stage == 'early_stage' ? 'Early Stage' :
                                                                    Stage == 'seriesA' ? 'Series A' :
                                                                        Stage == 'seriesB' ? 'Series B' :
                                                                            Stage == 'otc' ? 'OTC' :
                                                                                ''
                                        }

                                    </div>
                                </div>

                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Backers</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* 1234 */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.blockers}

                                    </div>
                                </div>


                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Valuation</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {Valuation}
                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Tokens sold</label>
                                    <div style={{ width: '300px' }}>
                                        {/* 6,666,666 CR2 */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.no_of_tokens}

                                    </div>
                                </div>

                                {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <label style={{ width: '100%' }}>Milestones</label> */}
                                    {/* <input type="text" className="form-control"  */}
                                {/* </div> */}
                                <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ width: '100%', marginTop: '20px' }}>
                                        <div>
                                            <table style={{ border: 'none' }}>
                                                <tr>
                                                    <th style={{ textAlign: 'center' }}>Milestones</th>
                                                    <th style={{ textAlign: 'center' }}>Target Date</th>
                                                    <th style={{ textAlign: 'center' }}>Percentage</th>
                                                    <th style={{ textAlign: 'center' }}>Validation Status</th>
                                                    <th style={{ textAlign: 'center' }}>Milestone Status</th>
                                                    <th style={{ textAlign: 'center' }}>Funds</th>
                                                    <th style={{ textAlign: 'center' }}>Actions</th>
                                                </tr>

                                                <tr >
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        {/* Milestone 1 */}
                                                        Initial Release
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        -
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        {InitialRelease}%
                                                    </td>

                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        -
                                                    </td>

                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        -
                                                    </td>

                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                        {FundRequested != null && FundRequested != undefined && InitialRelease != null && InitialRelease != undefined ?
                                                            ((FundRequested * InitialRelease) / 100)
                                                            :
                                                            0
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px', width: '100px' }}>
                                                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            {

                                                            }
                                                            <div className="" style={{ textAlign: 'center' }}>
                                                                {/* onClick={() => showPopup()}/ */}
                                                                {InitialReleaseWithdraw == 'withdraw' ?
                                                                    <Button
                                                                        style={{
                                                                            padding: '0px ',
                                                                            border: '2px solid #1890ff',
                                                                            maxWidth: '95px',
                                                                            fontSize: '14px',
                                                                            fontWeight:'bold',
                                                                            lineHeight: '24px',
                                                                            minHeight: '26px',
                                                                            textAlign: 'center',
                                                                            height: '30px',
                                                                            borderRadius: '2px ',
                                                                            width: '75px',
                                                                            // marginLeft: '10px',
                                                                            background: '#1890ff'
                                                                        }}
                                                                        onClick={() => withdrawInitialReleaseTokens()}
                                                                    //  onClick={() => changeMileStoneFunc(i)}
                                                                    >Withdraw</Button>
                                                                    :
                                                                    
                                                                    
                                                                    <></>
                                                                }
                                                                {/* <button className="btn  submit-btn-milestone" >Withdraw</button> */}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>



                                                {MileStoneArrayData.length > 0 && MileStoneArrayData.map((i) => (

                                                    <tr >
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {/* Milestone 1 */}
                                                            {i?.milestone}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.target_date}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {`${i?.percentage} %`}
                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.validation_status == 'Approved' ?
                                                                // border: '2px solid green',
                                                                <div style={{ color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                    {/* Validated */}
                                                                    {i?.validation_status}
                                                                </div>
                                                                :
                                                                // border: '2px solid red',
                                                                i?.validation_status == 'Rejected' ?
                                                                    <div style={{ color: 'red', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {/* Validated */}
                                                                        {i?.validation_status}
                                                                    </div>
                                                                    :
                                                                    i?.validation_status == 'Pending' ?
                                                                    
                                                                    // border: '2px solid  #ffe510',
                                                                    <div style={{ color: '#ffe510', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {/* Validated */}
                                                                        {i?.validation_status}
                                                                    </div>
                                                                    :
                                                                    
                                                                    <div style={{ color: '#1890ff', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {/* Validated */}
                                                                        {i?.validation_status}
                                                                    </div>

                                                            }


                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.milestone_status == 'Completed' ?
                                                                // border: '2px solid green',
                                                                <div style={{ color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                    {/* Validated */}
                                                                    {i?.milestone_status}
                                                                </div>
                                                                :
                                                                i?.milestone_status == 'Ongoing' ?
                                                                    // border: '2px solid red', 
                                                                    <div style={{ color: '#ffe510', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {/* Validated */}
                                                                        {i?.milestone_status}
                                                                    </div>

                                                                    :
                                                                    
                                                                i?.milestone_status == 'Overdue' ?
                                                                // border: '2px solid red', 
                                                                <div style={{ color: 'red', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                    {/* Validated */}
                                                                    {i?.milestone_status}
                                                                </div>

                                                                    :
                                                                    // border: '2px solid  #ffe510', 
                                                                    <div style={{ color: ' #1890ff', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {/* Validated */}
                                                                        {i?.milestone_status}
                                                                    </div>
                                                            }
                                                            {/* <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                {i?.milestone_status}
                                                                Completed
                                                            </div> */}

                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>


                                                            {
                                                                FundRequested != null && FundRequested != undefined && i?.percentage != null && i?.percentage != undefined ?
                                                                    ((FundRequested * i?.percentage) / 100)
                                                                    :
                                                                    0
                                                            }

                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                                {i?.blocked_status == true ?
                                                                 <Button
                                                                 style={{
                                                                     padding: '0px ',
                                                                     border: '2px solid red',
                                                                     maxWidth: '95px',
                                                                     fontSize: '14px',
                                                                     fontWeight:'bold',
                                                                     lineHeight: '24px',
                                                                     minHeight: '26px',
                                                                     textAlign: 'center',
                                                                     height: '30px',
                                                                     borderRadius: '2px ',
                                                                     width: '55px',
                                                                     // marginLeft: '10px',
                                                                     background: 'red'
                                                                 }}
                                                                 onClick={() => changeMileStoneFunc(i)}
                                                             //  onClick={() => changeMileStoneFunc(i)}
                                                             >Rejected</Button>
                                                                :
                                                                
                                                                i?.validation_status == 'Approved' && i?.milestone_status == 'Completed' && i?.withdrawn_status == 'withdraw' ?
                                                                    <Button
                                                                        style={{
                                                                            padding: '0px ',
                                                                            border: '2px solid #1890ff',
                                                                            maxWidth: '95px',
                                                                            fontSize: '14px',
                                                                            fontWeight:'bold',
                                                                            lineHeight: '24px',
                                                                            minHeight: '26px',
                                                                            textAlign: 'center',
                                                                            height: '30px',
                                                                            borderRadius: '2px ',
                                                                            width: '75px',
                                                                            // marginLeft: '10px',
                                                                            background: '#1890ff'
                                                                        }}
                                                                        onClick={() => withdrawMilestoneTokens(i.id, i.milestone_blockchain_id, i.percentage)}
                                                                    //  onClick={() => changeMileStoneFunc(i)}
                                                                    >Withdraw</Button>
                                                                    :
                                                                    i?.validation_status == 'Approved' && i?.milestone_status == 'Completed' &&  i?.withdrawn_status == 'Completed' ?
                                                                    <Button
                                                                        style={{
                                                                            padding: '0px ',
                                                                            border: '2px solid #1890ff',
                                                                            maxWidth: '95px',
                                                                            fontSize: '14px',
                                                                            fontWeight:'bold',
                                                                            lineHeight: '24px',
                                                                            minHeight: '26px',
                                                                            textAlign: 'center',
                                                                            height: '30px',
                                                                            borderRadius: '2px ',
                                                                            width: '55px',
                                                                            // marginLeft: '10px',
                                                                            background: '#1890ff'
                                                                        }}
                                                                        onClick={() => changeMileStoneFunc(i)}
                                                                    //  onClick={() => changeMileStoneFunc(i)}
                                                                    >View</Button>
                                                                    
                                                                    :
                                                                    <Button
                                                                        style={{
                                                                            padding: '0px ',
                                                                            border: '2px solid #1890ff',
                                                                            maxWidth: '95px',
                                                                            fontSize: '12px',
                                                                            lineHeight: '24px',
                                                                            minHeight: '26px',
                                                                            textAlign: 'center',
                                                                            height: '30px',
                                                                            borderRadius: '2px ',
                                                                            width: '55px',
                                                                            // marginLeft: '10px',
                                                                            background: '#1890ff'
                                                                        }}
                                                                        onClick={() => changeMileStoneFunc(i)}
                                                                    ><i className="fa fa-pencil" /></Button>

                                                                }

                                                                {/* <Button
                                                                    style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}
                                                                onClick={() => changeMileStoneFunc(i)}
                                                                ><i className="fa fa-trash" /></Button> */}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>

                                        </div>
                                    </div>

                                </div>


                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Funds Unlocked</label>
                                    <div style={{ width: '300px' }}>

                                        {TokensStatus?.unlockedAmount}

                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                             <label style={{ width: '310px', marginBottom: '0px' }}>Funds locked</label>
                                    <div style={{ width: '300px' }}>

                                        {TokensStatus?.lockedAmount}
                                    </div>
                                </div>
                                <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '50px' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Funds Withdrawn</label>
                                    <div style={{ width: '300px' }}>

                                        {TokensStatus?.withdrawnTokensByFounder}
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                    {/* submit-section
                        submit-section */}
                                    <div className="" style={{ textAlign: 'center' }}>
                                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                    </div>
                                    {/* <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                            <button className="btn btn-primary submit-btn"  onClick={()=>showPopup()}>Withdraw</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <MileStoneStatusPage getFundingRound={getCountofHundFunc} data={MilestoneEditData} mId={MilestoneNum} rId={MilestoneRoundId} handleClose={() => closeChangeMileStoneFUnc()} />
            }
            <CongPopupLaunch PublicRound='You have Successfully Withdrawn' show={showPopupLaunch} handleClose={handleCloseShowPopup} />
        </div>
    )
}
export default RoundPage;
