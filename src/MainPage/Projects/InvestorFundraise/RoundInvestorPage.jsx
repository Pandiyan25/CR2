import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
// import MileStoneStatusPage from './MileStoneStatusPage';
import './InvestorPriateRound.css'
import MileStoneInvestorStatusPage from './MileStoneInvestorStatusPage';
import ReactSelect from "react-select";

import { useSelector, useDispatch } from 'react-redux';

import usdimage from '../../Pages/FounderProject/Funding/assets/images/USD.png';
import EUROimage from '../../Pages/FounderProject/Funding/assets/images/EUR.png';
import POUNDimage from '../../Pages/FounderProject/Funding/assets/images/POUND.png';
import YUANimage from '../../Pages/FounderProject/Funding/assets/images/YUAN.png';
import YENimage from '../../Pages/FounderProject/Funding/assets/images/YEN.png';
import CADimage from '../../Pages/FounderProject/Funding/assets/images/CAD.png';
import SGDimage from '../../Pages/FounderProject/Funding/assets/images/SGD.png';
import AUDimage from '../../Pages/FounderProject/Funding/assets/images/AUD.png';
import DAIimage from '../../Pages/FounderProject/Funding/assets/images/DAI.png';
import BUSDimage from '../../Pages/FounderProject/Funding/assets/images/BUSD.png';
import INRimage from '../../Pages/FounderProject/Funding/assets/images/INR.png';
import USDCimage from '../../Pages/FounderProject/Funding/assets/images/USDC.png';
import USDTimage from '../../Pages/FounderProject/Funding/assets/images/USDT.png';
import RUBLEimage from '../../Pages/FounderProject/Funding/assets/images/RUBBLE.png';
import CNYimage from '../../Pages/FounderProject/Funding/assets/images/CNY.png';
import { apiURI } from '../../../config/config';
import { MileStoneInvestorPrivateArray } from '../../../reducers/ConstantSlice';
import { tokenStatus,
    roundStatus,
    remainingTokensOfInvestor,
    batchWithdrawByInvestors,
    withdrawIndividualMilestoneByInvestor
} from '../../../config/web3Round';

const RoundInvestorPage = ({ indexCountforSlect, publicId, handleClose }) => {
    const [showMileStone, setshowMileStone] = useState(true)

    const [mileStoneId, setMileStoneId] = useState('')
    const [ReqStatus, setReqStatus] = useState('')
    const [Count, setCount] = useState([])
    const [Currency, setCurrency] = useState('')
    const [NameValue, setNameValue] = useState('')
    const [ProjectName, setProjectName] = useState('')

    const [RoundType, setRoundType] = useState('')
    const [ProjectId, setProjectId] = useState('')
    const [InitialRelease, setInitialRelease] = useState('')
    const [TokenomicsData, setTokenomicsData] = useState([])
    const [NoofTokens, setNoofTokens] = useState(0)
    const [ValuationValue, setValuationValue] = useState(0)
    const [MaxSupply, setMaxSupply] = useState(0)
    const [Blockers, setBlockers] = useState(0)
    
    const [Stage, setStage] = useState('pre_seed_round')
    const [PricePerToken, setPricePerToken] = useState(0)
    const [TokenTicker, setTokenTicker] = useState(0)
    const [FundInvested, setFundInvested] = useState(0)
    const [FundRequested, setFundRequested] = useState('')
    const [FundingWalletAddress, setFundingWalletAddress] = useState('')
    const [contractId,setContractId] = useState('');
    const dispatch = useDispatch()
    const loginId = useSelector((state) => state.constVar.loginId)
    const [RejectPopup, setRejectPopup] = useState(false)
    const [FundRaiseData, setFundRaiseData] = useState({})
    const [TokensStatus, setTokensStatus] = useState({})
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)

    console.log(chooseMileStonedata, 'chooseMileStonedata');

    const countries = [
        { value: "USD", label: "USD", image: usdimage },
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        { value: "RUBLE", label: "RUBLE", image: RUBLEimage },
        { value: "CAD", label: "CAD", image: CADimage },
        { value: "CNY", label: "CNY", image: CNYimage },
        { value: "EURO", label: "EURO", image: EUROimage },
        { value: "POUND", label: "POUND", image: POUNDimage },
        { value: "YUAN", label: "YUAN", image: YUANimage },
        { value: "INR", label: "INR", image: INRimage },
        { value: "YEN", label: "YEN", image: YENimage },
        { value: "SGD", label: "SGD", image: SGDimage },
        { value: "AUD", label: "AUD", image: AUDimage },
        { value: "USDT", label: "USDT", image: USDTimage },

    ];


    const changeMileStoneFunc = (id) => {
        console.log(id, "id");
        if (id != null && id != undefined && id != '') {

            setMileStoneId(id)
            setshowMileStone(false)
        } else {

            setMileStoneId('')
            // setshowMileStone(false)
        }
    }

    const closeChangeMileStoneFUnc = () => {
        setshowMileStone(true)
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


    const withdrawRemainingTokens = async (milestoneId, percentage) => { // withdraw remaining tokens back from escrow by the investor
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let {fundraise_blockchain_id, currency_contract_id, project, investor} = FundRaiseData || {};
        if (userData) {
            let status = await roundStatus(userData.provider, parseInt(fundraise_blockchain_id));
            let tokens = await remainingTokensOfInvestor(userData.provider, parseInt(fundraise_blockchain_id), wallet_address);
            if (status) {
                if (tokens > 0) {
                    console.log('calling withdrawIndividualMilestoneByInvestor: ', userData.provider, wallet_address, fundraise_blockchain_id, project?.user?.wallet_address, currency_contract_id)
                    withdrawIndividualMilestoneByInvestor(userData.provider, wallet_address, parseInt(fundraise_blockchain_id), parseInt(milestoneId), parseInt(percentage), project?.user?.wallet_address, currency_contract_id)
                    .then((resp) => {
                        console.log('called withdrawIndividualMilestoneByInvestor: ', resp);
                    })
                    .catch(err => {
                        console.log(err);
                        alert(err.message);
                    })
                } else {
                    alert("There are no tokens to withdraw or tokens are already withdrawn");
                }
            } else {
                alert("Round is still on-going");
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet");
        }
    }


    useEffect(() => {
        if (loginId != '') {
            getCountofHundFunc()
        }

    }, [loginId])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)
        getValueFunc()
    }


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
                  contract_id
                  investor {
                    _id
                    wallet_address
                  }
                  project {
                    _id
                    project_name
                    user {
                        wallet_address
                    }
                  }
                  creator
                  project_status
                  investor_status
                  round
                  blockers
                  fundraise_blockchain_id
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
                        getMilestoneFunc(data?.data?.getFundraise?._id)
                        setFundRaiseData(data?.data?.getFundraise)
                        setFundingWalletAddress(data?.data?.getFundraise?.primary_funding_wallet)
                        // setIvestor(data?.data?.investor?._id)
                        setReqStatus(data?.data?.getFundraise?.investor_status)
                        setContractId(data?.data?.getFundraise?.contract_id)
                        // var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                        setCurrency(data?.data?.getFundraise?.currency)
                        setRoundType(data?.data?.getFundraise?.round)

                        setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        
                        setBlockers(data?.data?.getFundraise?.blockers)
                        setValuationValue(data?.data?.getFundraise?.valuation)
                        setNoofTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        setProjectId(data?.data?.getFundraise?.project?._id)
                        setProjectName(data?.data?.getFundraise?.project?.project_name)
                        setNameValue(data?.data?.getFundraise?.creator)


                    } else {
                        setFundingWalletAddress('')
                        // setIvestor(data?.data?.investor?._id)

                        setCurrency('')
                        // setFundRequested(_requested)
                        setTokenTicker('')
                        setPricePerToken('')
                        setStage('')
                        setMaxSupply('')
                        setValuationValue('')
                        setNoofTokens('')
                        setInitialRelease('')

                    }

                })


        } catch (err) {
            console.log(err);
        }
    }

    const getMilestoneFunc = (fundraise) => {
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
                  blocked_status
                  milestone_blockchain_id
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
                                    "TargetDate": mileStoneDate,
                                    "ValueForChoose": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,

                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    blocked_status: data?.data?.allMilestone[i].blocked_status,
                                    milestone_blockchain_id: data?.data?.allMilestone[i].milestone_blockchain_id,
                                    // ...data?.data?.allMilestone[i]
                                })

                            } else {
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "TargetDate": '',
                                    "ValueForChoose": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    blocked_status: data?.data?.allMilestone[i].blocked_status,
                                    milestone_blockchain_id: data?.data?.allMilestone[i].milestone_blockchain_id,
                                    // ...data?.data?.allMilestone?.milestones[i]
                                })
                            }




                            console.log(mainMileStone, "mainMileStone");

                        }
                        (dispatch(MileStoneInvestorPrivateArray((mainMileStone))))
                    } else {


                    }

                })


        } catch (err) {
            console.log(err);
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
                                        {RoundType}

                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Contract ID</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {contractId}
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {FundingWalletAddress}
                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Currency</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {Currency == "BUSD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> BUSD

                                            </div> : ""}
                                        {Currency == "CAD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> CAD
                                            </div> : ""}
                                        {Currency == "AUD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> AUD
                                            </div> : ""}
                                        {Currency == "CNY" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img> CNY
                                            </div> : ""}
                                        {Currency == "DAI" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> DAI
                                            </div> : ""}
                                        {Currency == "EURO" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={EUROimage}></img> EURO
                                            </div> : ""}
                                        {Currency == "INR" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> INR
                                            </div> : ""}
                                        {Currency == "RUBLE" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> RUBLE
                                            </div> : ""}
                                        {Currency == "SGD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> SGD
                                            </div> : ""}
                                        {Currency == "USDC" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> USDC
                                            </div> : ""}
                                        {Currency == "USDT" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> USDT
                                            </div> : ""}
                                        {Currency == "USD" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> USD
                                            </div> : ""}
                                        {Currency == "POUND" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> POUND
                                            </div> : ""}
                                        {Currency == "YUAN" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> YUAN
                                            </div> : ""}
                                        {Currency == "YEN" ?
                                            <div>
                                                <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> YEN
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
                              <label style={{ width: '310px', marginBottom: '0px' }}>Max Supply</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {MaxSupply}

                                    </div>
                                </div>
                                
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Backers</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {Blockers}

                                    </div>
                                </div>
                                

                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Valuation</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {ValuationValue}
                                    </div>
                                </div>
                               <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <label style={{ width: '310px', marginBottom: '0px' }}>Tokens sold</label>
                                    <div style={{ width: '300px' }}>
                                        {NoofTokens}

                                    </div>
                                </div>
                                {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}> */}
                                    {/* <label style={{ width: '100%' }}>Milestones</label> */}
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


                                                        </div>
                                                    </td>
                                                </tr>

                                                {chooseMileStonedata.map((i, index) => (
                                                    <tr key={index}>

                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.ValueForChoose}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.TargetDate}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.percentage}%
                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                               {i?.validation_status == 'Unrequested' ? 
                                                            //    border: '2px solid #6345ED',
                                                                <div style={{  color: '#6345ED', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                Yet to Start
                                                                
                                                            </div>
                                                                 :
                                                                 i?.validation_status == 'Pending' ? 
                                                                //  border: '2px solid rgb(255, 229, 16)',
                                                                 <div style={{ color: 'rgb(255, 229, 16)', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                 {i?.validation_status}
                                                                 
                                                             </div>
                                                                  :
                                                                  i?.validation_status == 'Approved' ? 
                                                                //   border: '2px solid green',
                                                                  <div style={{  color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                  {i?.validation_status}
                                                                  
                                                              </div>
                                                                   : 
                                                                //    border: '2px solid rgb(253, 0, 0)',

                                                                   <div style={{ color: 'rgb(253, 0, 0)', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                    {i?.validation_status}

                                                                  </div>
}

                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.milestone_status == 'Completed' ?
                                                            // border: '2px solid green',
                                                            // border: '2px solid green',
                                                            // border: '2px solid green',
                                                            // border: '2px solid green',
                                                                <div style={{  color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                    {i?.milestone_status}
                                                                </div>
                                                                :
                                                                i?.milestone_status == 'Ongoing' ?

                                                                    <div style={{  color: 'rgb(255, 229, 16)', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                        {i?.milestone_status}
                                                                    </div>
                                                                    :
                                                                    i?.milestone_status == 'Yet_to_start' ?
                                                                        <div style={{  color: '#6345ED', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                            {i?.milestone_status}
                                                                        </div>
                                                                        :
                                                                        <div style={{  color: 'rgb(253, 0, 0)', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                            {i?.milestone_status}
                                                                        </div>

                                                            }


                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {/* 200,000 USDC */}

                                                            {
                                                                FundRequested != null && FundRequested != undefined && i?.percentage != null && i?.percentage != undefined ?
                                                                    ((FundRequested * i?.percentage) / 100)
                                                                    :
                                                                    0
                                                            }
                                                        </td>
                                                        {RoundType == 'Public' ?
                                                            <>
                                                            </>
                                                            :

                                                            <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                                                    {
                                                                        i?.blocked_status == true ? 
                                                                        <Button
                                                                        style={{ padding: '0px ', border: '2px solid red', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: 'red' }}
                                                                        onClick={() => withdrawRemainingTokens(i?.milestone_blockchain_id, i?.percentage)}
                                                                    >Withdraw</Button>
                                                                        :
                                                                        i?.validation_status == 'Unrequested' ?
                                                                        ''
                                                                        :

                                                                        <Button
                                                                            style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}
                                                                            onClick={() => changeMileStoneFunc(i?.id)}
                                                                        >View</Button>
                                                                    }

                                                                </div>
                                                            </td>
                                                        }

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
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '50px' }}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :

                // <></>
                <MileStoneInvestorStatusPage mileStoneId={mileStoneId} getFundingRound={getValueFunc} handleClose={() => closeChangeMileStoneFUnc()} />
            }
        </div>
    )
}
export default RoundInvestorPage;
