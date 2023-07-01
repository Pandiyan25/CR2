import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MileStoneStatusPageReq from './MileStoneStatusPageReq';
// import { apiURI } from '../../../../config/config';
// import MileStoneStatusPage from './MileStoneStatusPage';
// import './PrivateRound.css'


const RoundReqPage = ({ publicId, handleClose }) => {
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
    const [FundRaiseData,setFundRaiseData] = useState([])

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
    const [MileStoneArrayData, setMileStoneArrayData] = useState([{
        milestone: "Choose_MileStone",
        ValueForChoose: 'MileStone1',
        target_date: "12/09/2022",
        percentage: 10,
        validation_status:'completed',
        milestone_status:'completed',
        funds:'200000 USDC',
        estgd: "12/09/2022",
        remarks:'test'

    }])
    const [MilestoneEditData, setMilestoneEditData] = useState([])


    const changeMileStoneFunc = (i) => {
        setMilestoneEditData([i])
        setshowMileStone(false)
    }

    const closeChangeMileStoneFUnc = () => {
        setshowMileStone(true)
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
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Round Type</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.round}


                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Contract ID</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                        {/* 0xf1b9686626D78Df34ec873FBb3B3aD052280505B */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.contract_id}
                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {primaryFundingWallet}
                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Currency</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {Currency}


                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Funds Raised</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {FundRequested}


                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}> Token Ticker</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {TokenTicker}


                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Price Per Token</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                                        {PricePerToken}

                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Stage</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {Stage}


                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Backers</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* 1234 */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.blockers}

                                    </div>
                                </div>


                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Valuation</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {Valuation}
                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Tokens sold</label>
                                    <div style={{ width: '300px' }}>
                                        {/* 6,666,666 CR2 */}
                                        {FundRaiseData.length > 0 && FundRaiseData[0]?.no_of_tokens}

                                    </div>
                                </div>
                                {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}> */}
                                    {/* <label/ style={{ width: '100%' }}>Milestones</label> */}
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
                                                            {i?.percentage}%
                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>

                                                                {i?.validation_status}
                                                            </div>


                                                        </td>
                                                        <td style={{ width: '135px', textAlign: 'center', padding: '5px', paddingTop: '20px' }}>

                                                            <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                                {i?.milestone_status}
                                                            </div>

                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            {i?.funds}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '5px', paddingTop: '20px' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                                                                <Button
                                                                    style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}
                                                                    onClick={() => changeMileStoneFunc(i)}
                                                                >View</Button>


                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>

                                        </div>
                                    </div>

                                </div>


                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Funds Unlocked</label>
                                    <div style={{ width: '300px' }}>

                                    {FundRaiseData.length > 0 && FundRaiseData[0]?.fund_unlocked}

                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Funds locked</label>
                                    <div style={{ width: '300px' }}>
                                        
                                    {FundRaiseData.length > 0 && FundRaiseData[0]?.fund_locked}
                                    </div>
                                </div>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '50px' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Funds Withdrawn</label>
                                    <div style={{ width: '300px' }}>
                                        
                                    {FundRaiseData.length > 0 && FundRaiseData[0]?.fund_withdrawn}
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
                 <MileStoneStatusPageReq data={MilestoneEditData} handleClose={() => closeChangeMileStoneFUnc()} />
             } 
        </div>
    )
}
export default RoundReqPage;
