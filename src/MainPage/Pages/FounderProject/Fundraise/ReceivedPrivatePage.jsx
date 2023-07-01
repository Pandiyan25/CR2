import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import { MileStonePrivateArray } from '../../../../reducers/ConstantSlice';
import './PrivateRound.css'
import RejectStatusModal from './RejectStatus';
import { ToastContainer, toast } from 'material-react-toastify';
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

import 'material-react-toastify/dist/ReactToastify.css';


const ReceivedPrivatePage = ({ handleClose, publicId, getFundingRound }) => {
    const dispatch = useDispatch()
    const [Count, setCount] = useState([])

    const [remarks, setRemarks] = useState('')
    const [PrimaryStatus, setPrimaryStatus] = useState('')
    const [fundRaiseData, setFundRaiseData] = useState([])
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
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [MileStoneArrayData, setMileStoneArrayData] = useState([])
    const [MilestoneEditData, setMilestoneEditData] = useState([])


    const [RejectPopup, setRejectPopup] = useState(false)

    const chooseMileStonedata = useSelector((state) => state.constVar.MileStonePrivateArray)

    // const [chooseMileStonedata, setChooseMileStonedata] = useState([
    //     {
    //         choose: "Choose_MileStone",
    //         ValueForChoose: 'MileStone1',
    //         TargetDate: "",
    //         percentage: 0
    //     }
    // ])




    console.log(chooseMileStonedata, "chooseMileStonedata");

    const rejectPrivate = () => {
        setRejectPopup(true)
    }

    const acceptPrivate = () => {
        try {
            var query = `
            mutation Mutation($id: ID, $input: FundraiseInput) {
                updateFundraise(_id: $id, input: $input) {
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
                        "id": publicId,
                        "input": {
                            "founder_status": 'Accepted',
                            // "investor_status": 'Accepted',

                            "initial_release_status": 'withdraw',
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        toast.success("Successfully Created", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        getFundingRound()
                        handleClose()
                    }

                })

        } catch (error) {
            console.log(error);
        }
    }

    const rejPrivate = () => {
        try {
            var query = `
            mutation Mutation($id: ID, $input: FundraiseInput) {
                updateFundraise(_id: $id, input: $input) {
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
                        "id": publicId,
                        "input": {
                            "founder_status": 'Rejected',
                            "investor_status": 'Rejected',
                            "remarks": remarks
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        toast.success("Successfully Rejected", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        setRejectPopup(true)
                        getFundingRound()
                        handleClose()
                    }

                })

        } catch (error) {
            console.log(error);
        }
    }


    const rejectClosePrivate = () => {
        setRejectPopup(false)
    }

    useEffect(() => {
        getCountofHundFunc()
    }, [])

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
                 
                  round
                  contract_id
                  
                  fund_raised
                  tokens_sold
                  fund_unlocked
                  fund_locked
                  fund_withdrawn
                  remarks
                  blockers
                  investor {
                    first_name
                    last_name
                    fund_name
                  }
                  founder_status
                  project_status
                  investor_status
                  creator
                  funds_to_be_invested
                  creator_role
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
                        setFundRaiseData([data?.data?.getFundraise])
                        setPrimaryFundingWallet(data?.data?.getFundraise?.primary_funding_wallet)
                        setPrimaryStatus(data?.data?.getFundraise?.founder_status)

                        setCurrency(data?.data?.getFundraise?.currency)
                        setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        setValuation(data?.data?.getFundraise?.valuation)
                        setNoOfTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        if (data?.data?.getFundraise?.end_target_date != '' && data?.data?.getFundraise?.end_target_date != undefined
                            && data?.data?.getFundraise?.end_target_date != null
                        ) {
                            var dateType = data?.data?.getFundraise?.end_target_date.split('T')[0]
                            setEndtargetDate(dateType)
                        } else {
                            setEndtargetDate('')
                        }

                        getMilestoneFunc(data?.data?.getFundraise?._id)
                        // setMileStoneArrayData(mainMileStone)
                        // dispatch()

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
                                    "target_date": mileStoneDate,
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,

                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    // ...data?.data?.allMilestone[i]
                                })

                            } else {
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "target_date": '',
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    // ...data?.data?.allMilestone?.milestones[i]
                                })
                            }




                            console.log(mainMileStone, "mainMileStone");

                        }



                        (dispatch(MileStonePrivateArray((mainMileStone))))
                    } else {


                        (dispatch(MileStonePrivateArray(([{
                            choose: "set_MileStone",
                            milestone: 'Complete 50% of the Target Fund Raise`',
                            target_date: "2022-08-23",
                            percentage: 1,

                            validation_status: '',
                            milestone_status: '',
                            funds: '',
                            remarks: '',
                            estimated_target_date: ''
                        }]))))
                    }

                })


        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="col-md-12">
            <div className="row">
                <div className="row">

                    <div className="col-md-12" style={{ padding: '0px' }}>


                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                            <div className="col" style={{ padding: '0px' }}>
                                {/* mt-4 */}
                                <div className="search mb-2">

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Private Round Request</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row" style={{ padding: '10px' }}>
                            {
                                fundRaiseData.length > 0 && fundRaiseData[0].round == 'Private' ?
                                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px', marginBottom: '0px' }}>Investor<span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control"  */}
                                        <div style={{ width: '300px' }}>
                                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                            {fundRaiseData.length > 0 ?

                                                <input type="text" className="form-control" style={{ width: '300px' }} value={fundRaiseData[0].investor?.fund_name} readOnly='true' />
                                                :

                                                <input type="text" className="form-control" style={{ width: '300px' }} value={""} readOnly='true' />
                                            }


                                        </div>
                                    </div>
                                    :
                                    <>
                                    </>
                            }

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {primaryFundingWallet}

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Choose Currency<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* {Currency} */}

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
                                <label style={{ width: '310px', marginBottom: '0px' }}>Funds Requested<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {FundRequested}

                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Token Ticker</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {TokenTicker}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}> Price Per Token<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {PricePerToken}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Stage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {Stage ===  "pre_seed_round" ? "Pre Seed Round "
                                    : Stage === "seed_round" ? "Seed Round" 
                                    : Stage === "strategic_round" ? "Strategic Round" 
                                    : Stage === "pre_sale" ? "Pre Sale" 
                                    : Stage === "public_round" ? "Public Round" 
                                    : Stage === "kol_round" ? "KOL Round" 
                                    : Stage === "early_stage" ? "Early Stage" 
                                    : Stage === "seriesA" ? "Series A" 
                                    : Stage === "seriesB" ? "Series B" 
                                    : Stage === "otc" ? "OTC" 
                                    : "Stage"
                                    } 
                                    {/* {Stage} */}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Max Supply<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {MaxSupply}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Valuation<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {Valuation}
                                </div>
                            </div>


                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {NoOfTokens}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {InitialRelease}%
                                </div>
                            </div>
                            {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <label style={{ width: '100%' }}>Set/Choose Milestones<span className="text-danger">*</span></label> */}
                                {/* <input type="text" className="form-control"  */}
                            {/* </div> */}
                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ width: '100%', marginTop: '20px' }}>
                                    <div>
                                        <table style={{ border: 'none' }}>
                                            <tr>
                                                {/* <th style={{ textAlign: 'center' }}>Choose/Set Milestones</th> */}
                                                <th style={{ textAlign: 'center' }}>Milestones</th>
                                                <th style={{ textAlign: 'center' }}>Target Date </th>
                                                <th style={{ textAlign: 'center' }}>Percentage</th>
                                            </tr>
                                            {chooseMileStonedata.map((i, index) => (
                                                <tr key={index}>
                                                    {/* <td style={{ width: '20%', padding: '10px' }}>
                                                        <div>
                                                            <select className="form-control btn-block-height square-edges" readOnly='true' value={i?.choose} onChange={(e) => setChooseMileStonedataFunc(e.target.value, index)} >
                                                                <option style={{ fontSize: '13px' }} value="Choose_MileStone" >Choose Milestone</option>
                                                                <option style={{ fontSize: '13px' }} value="set_MileStone" >Set Own Milestone</option>
                                                            </select>
                                                        </div>
                                                    </td> */}
                                                    <td style={{ width: '35%', padding: '10px' }}>
                                                        {/* {
                                                            i.choose == 'Choose_MileStone' ?

                                                                <div>
                                                                    <select className="form-control btn-block-height square-edges" value={i?.milestone} readOnly='true' >
                                                                        <option style={{ fontSize: '13px' }} value={`Choose MileStone${index + 1}`} >Choose MileStone{index + 1}</option>
                                                                    </select>
                                                                </div>
                                                                : */}
                                                        <input className="form-control" value={i?.milestone} readOnly='true' />
                                                        {/* } */}
                                                    </td>
                                                    <td style={{ width: '17%', padding: '10px' }}>
                                                        <input type='date' className="form-control" value={i?.target_date} readOnly='true' />
                                                    </td>
                                                    <td style={{ width: '12%', padding: '10px' }}>

                                                        <div>
                                                            <input className="form-control" value={`${i?.percentage}%`} readOnly='true' />
                                                            {/* <select className="form-control btn-block-height square-edges" value={i?.percentage} readOnly='true' >
                                                                <option style={{ fontSize: '13px' }} value={`20`} >20%</option>
                                                                <option style={{ fontSize: '13px' }} value={`30`} >30%</option>
                                                            </select> */}
                                                        </div>
                                                    </td>
                                                    {/* <td style={{ width: '15%', padding: '10px' }}>

                                                        <div >
                                                            <div className="" style={{ textAlign: 'center', justifyContent: 'space-evenly', display: 'flex' }}>
                                                                <button className="btn btn-primary submit-btn"
                                                                    style={{
                                                                        minWidth: '44px',
                                                                        fontSize: '30px',
                                                                        padding: '5px',
                                                                        height: '35px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontWeight: 'bolder',
                                                                        marginRight: '10px'
                                                                    }} onClick={() => dleteColumnMileStone(index)}>-</button>
                                                               <button className="btn btn-primary submit-btn" style={{
                                                                    minWidth: '44px',
                                                                    fontSize: '30px',
                                                                    padding: '5px',
                                                                    height: '35px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontWeight: 'bolder'
                                                                }} onClick={() => addColumnMileStone(index)}>+</button>
                                                            </div>
                                                        </div>
                                                    </td> */}
                                                </tr>

                                            ))}
                                        </table>

                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                                {fundRaiseData.length > 0 && (fundRaiseData[0].founder_status == 'Sent' || fundRaiseData[0].founder_status == 'Rejected'|| fundRaiseData[0].founder_status == 'Accepted') ?
                                    <>
                                    </>
                                    :

                                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                            <button className="btn btn-primary submit-btn" onClick={() => acceptPrivate()}>Accept</button>
                                        </div>

                                        <div className="" style={{ textAlign: 'center' }}>
                                            <button className="btn btn-primary submit-btn" onClick={() => rejectPrivate()}>Reject</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <RejectStatusModal remarks={remarks} setRemarks={setRemarks} rejPrivate={rejPrivate} show={RejectPopup} handleClose={rejectClosePrivate} />
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
    )
}
export default ReceivedPrivatePage;
