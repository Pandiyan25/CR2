import React, { useEffect, useState } from 'react';
import { MileStonePrivateArray, MileStoneInvestorPrivateArray } from '../../../../reducers/ConstantSlice';

import './PrivateRound.css'
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';


import DAIimage from '../Funding/assets/images/DAI.png';
import BUSDimage from '../Funding/assets/images/BUSD.png';
import USDCimage from '../Funding/assets/images/USDC.png';
import USDTimage from '../Funding/assets/images/USDT.png';




const RejectedPrivateReadOnlyPage = ({ getFundingRound,handleClose, publicId }) => {

    const dispatch = useDispatch()
    const [Count, setCount] = useState([])
    const [PrimaryStatus, setPrimaryStatus] = useState('')
    const [fundRaiseData, setFundRaiseData] = useState([])
    const [primaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const [Currency, setCurrency] = useState('')
    const [currencyValue, setCurrencyValue] = useState(0)
    const [FundRequested, setFundRequested] = useState('')
    const [TokenTicker, setTokenTicker] = useState('')
    const [PricePerToken, setPricePerToken] = useState('')
    const [Stage, setStage] = useState('')
    const [MaxSupply, setMaxSupply] = useState('')
    const [Valuation, setValuation] = useState('')
    const [NoofTokens, setNoOfTokens] = useState('')
    const [initialRelease, setInitialRelease] = useState('')
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [RejectPopup, setRejectPopup] = useState(false)

    var todayMite = new Date();
    var ddMite = todayMite.getDate();
    var mmMite = todayMite.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyyMite = todayMite.getFullYear();
    if (ddMite < 10) {
        ddMite = '0' + ddMite
    }
    if (mmMite < 10) {
        mmMite = '0' + mmMite
    }

    todayMite = yyyyMite + '-' + mmMite + '-' + ddMite;





    const chooseMileStonedata = useSelector((state) => state.constVar.MileStonePrivateArray)


    useEffect(() => {
        getCountofHundFunc()
    }, [])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)
        getValueFunc()
    }
    const countries = [
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage }, 
        { value: "USDT", label: "USDT", image: USDTimage },

    ];

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
                  milestones {
                    milestone
                    target_date
                    percentage
                    validation_status
                    milestone_status
                    funds
                    remarks
                    estimated_target_date
                  }
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


                        if (data?.data?.getFundraise?.currency != '' && data?.data?.getFundraise?.currency != null && data?.data?.getFundraise?.currency != undefined) {
                            var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                            console.log(indexCount, "indexCount");
                            setCurrencyValue(indexCount)
                        } else {

                            setCurrencyValue(0)
                        }


                        getMilestoneFunc(data?.data?.getFundraise?._id)
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
                  milestone_type
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
                    if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                        var mainMileStone = []
                        for (var i = 0; i < data?.data?.allMilestone.length; i++) {

                            if(data?.data?.allMilestone[i]._id != null && data?.data?.allMilestone[i]._id != undefined){
                                
                                mainMileStone.push({
                                    id: data?.data?.allMilestone[i]._id,
                                    "choose":data?.data?.allMilestone[i]?.milestone_type === null ? "set_MileStone": data.data.allMilestone[i].milestone_type,
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "target_date": data?.data?.allMilestone[i].target_date != null ? data?.data?.allMilestone[i].target_date.split('T')[0] : null,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                }) 
                            }
                            
                        }
                        // console.log("Milestone Data 123",mainMileStone);
                        dispatch(MileStonePrivateArray((mainMileStone)))
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

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Private Round Request </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row" style={{ padding: '10px' }}>
                             <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                               <label style={{ width: '310px', marginBottom: '0px' }}>Investor<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} value={"Sharma"} readOnly='true' /> */}

                                    {fundRaiseData.length > 0 ?

                                        <input type="text" className="form-control" style={{ width: '300px' }} value={fundRaiseData[0].investor?.fund_name} readOnly='true' />
                                        :

                                        <input type="text" className="form-control" style={{ width: '300px' }} value={""} readOnly='true' />
                                    }
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
                                {/* <div className="form-group"> */}
                                <label style={{ width: '310px' }}>Currency</label>
                                <div style={{ width: '300px' }}>

                                    {Currency == "BUSD" ?
                                        <div>
                                             <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>BUSD

                                        </div> : ""}
                                    {Currency == "DAI" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img>DAI
                                        </div> : ""}
                                    {Currency == "USDC" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img>USDC
                                        </div> : ""}
                                    {Currency == "USDT" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img>USDT
                                        </div> : ""}
                                </div>


                                {/* </div> */}
                            </div>

                             <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                               <label style={{ width: '310px', marginBottom: '0px' }}>Funds Requested<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>

                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} value={FundRequested} onChange={(e) => fundReqFunc(e.target.value)}  readOnly='true'/> */}
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
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} defaultValue={PricePerToken} readOnly='true' /> */}
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
                                    {NoofTokens}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>

                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} defaultValue={initialRelease}% readOnly='true' /> */}
                                    {initialRelease}%
                                </div>
                            </div>
                            {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <label style={{ width: '100%' }}>Set/Choose Milestones<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" 
                            </div> */}
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
                                                         <input type="text" className="form-control btn-block-height square-edges" style={{ width: '300px' }} defaultValue={"Choose Milestone"} readOnly='true' />

                                                    </div>
                                                </td> */}
                                                <td style={{ width: '45%', padding: '10px' }}>
                                                    {
                                                        i.choose == 'Choose_MileStone' ?
    
                                                            <div> <input type="text" className="form-control btn-block-height square-edges" style={{ width: '600px' }} value={i?.milestone} readOnly='true' />

                                                                {/* <select className="form-control btn-block-height square-edges" value={i?.milestone} placeholder={`Choose MileStone${index + 1}`} onChange={(evnt) => changeValueForChoose(index, evnt)}>
                                                                    <option style={{ fontSize: '13px' }} value={`Complete 50% of the Target Fund Raise`} >Complete 50% of the Target Fund Raise</option>
                                                                    <option style={{ fontSize: '13px' }} value={`Lock the Tokens in Vesting Contracts`} >Lock the Tokens in Vesting Contracts</option>
                                                                    <option style={{ fontSize: '13px' }} value={`Launch Minimum Viable Product`} >Launch Minimum Viable Product</option>
                                                                    <option style={{ fontSize: '13px' }} value={`Complete & Publish Smart Contract Audit Report`} >{'Complete & Publish Smart Contract Audit Report'}</option>
                                                                    <option style={{ fontSize: '13px' }} value={`List the Token in Decentralised Exchange`} >List the Token in Decentralised Exchange</option>
                                                                    <option style={{ fontSize: '13px' }} value={`List the Token in Centralised Exchange`} >List the Token in Centralised Exchange</option>
                                                                    <option style={{ fontSize: '13px' }} value={`Launch Testnet of the Product`} >Launch Testnet of the Product</option>
                                                                    <option style={{ fontSize: '13px' }} value={`Launch Mainnet of the Product`} >Launch Mainnet of the Product</option>
                                                                </select> */}
    
                                                            </div>
                                                            :
                                                            <input className="form-control btn-block-height square-edges" value={i?.milestone} onChange={(evnt) => changeValueForChoose(index, evnt)} readOnly='true' />
                                                    }
                                                </td>
                                                <td style={{ width: '17%', padding: '10px' }}>
                                                    <input type="date" className="form-control" min={todayMite} value={i?.target_date} onChange={(evnt) => changeTargetDate(index, evnt)} readOnly='true' />
                                                </td>
                                                <td style={{ width: '12%', padding: '10px' }}>
    
                                                    <div>
                                                   
                                                        <input type="text" className="form-control btn-block-height square-edges" style={{ width: '300px' }} value={`${i?.percentage}%`} readOnly='true' />

                                                    </div>
                                                </td>
                                            </tr>

                                            ))}
                                        </table>

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                    <label style={{ width: '310px', marginBottom: '0px', width: '25%' }}>Rejected Remarks<span className="text-danger">*</span></label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '75%' }} >
                                        {fundRaiseData.length > 0 ? fundRaiseData[0].remarks : ''}
                                        {/* <textarea style={{ width: '100%', minHeight: '180px' }} va /> */}
                                    </div>
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
        </div>
    )
}
export default RejectedPrivateReadOnlyPage;
