import React, { useEffect, useState } from 'react';

import { Button, Modal, } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import ReactSelect from "react-select";
import './fundingMain.css'
import './funding.css'

import usdimage from './assets/images/USD.png'; 
import EUROimage from './assets/images/EUR.png' ;
import POUNDimage  from './assets/images/POUND.png';
import YUANimage  from './assets/images/YUAN.png';
import YENimage  from './assets/images/YEN.png';
import CADimage  from './assets/images/CAD.png';
import SGDimage  from './assets/images/SGD.png';
import AUDimage  from './assets/images/AUD.png';
import DAIimage  from './assets/images/DAI.png';
import BUSDimage  from './assets/images/BUSD.png';
import INRimage  from './assets/images/INR.png';
import USDCimage  from './assets/images/USDC.png';
import USDTimage from './assets/images/USDT.png';
import RUBLEimage from './assets/images/RUBBLE.png';
import CNYimage from './assets/images/CNY.png';
// import JPYImage from './assets/images/YEN.png'








import { usdticon } from "../../../../Entryfile/imagepath"


function FundingModal({
    
    ExternalLeadName,setExternalLeadName,
    show,
    indexCountforSlect,
    handleClose,
    checkData,
    totalFundRaise,
    setTotalFundRaise,
    fundRaiseTillDate,
    setfundRaiseTillDate,
    noofInvestorstilldate,
    setnoofInvestorstilldate,
    leadInvestor,
    setleadInvestor,
    stateOfFunding,
    setstateOfFunding,
    walletAddress,
    // setwalletAddress,
    WalletNetwork,
    setWalletNetwork,
    CurrencyType,
    setCurrencyType,
    setleadI,
    leadI,
    createFundingDetails,
    updateFundingDetails,
    modeOfFunding,
    setModeOfFunding,
    isIncubated,
    setisIncubated,
    receivedGrants,
    setReceivedGrants,
    setIncubatorName,
    setIncubatorWebsite,
    setGrantsName,
    setGrantsLink,
    IncubatorName,
    IncubatorWebsite,
    GrantsName,
    GrantsLink

}) {

    const [getIvestData, setgetIvestData] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)


    const getInvestorDetails = () => {
        try {
            var query = `
            query Query($role: String, $user: ID) {
                allUsers(role: $role, user: $user) {
                  email
                  _id
                  role
                  first_name
                  last_name
                  fund_name
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
                        "role": "Investor",
                        "user": loginId
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    setgetIvestData(data?.data?.allUsers)
                    
                    if(ExternalLeadName != '' && ExternalLeadName != undefined && ExternalLeadName != null && data?.data?.allUsers?.length > 0){
                        var extTrue = data?.data?.allUsers.findIndex((i)=>`${i.first_name}${i.last_name}` == ExternalLeadName)
                        // a.findIndex(x => x.prop2 ==="yutu");
                        console.log(extTrue,"extTrue");
                    }
                })

        } catch (error) {
            console.log(error, "error in InitalProposal Create");
        }
    }

    console.log(CurrencyType, "CurrencyType");

    useEffect(() => {
        if (loginId != '') {

            getInvestorDetails()
        }
    }, [loginId])

    const countries = [
        // { value: "USD", label: "USD", image: usdimage }, 
        // { value: "SDT", label: "SDT", image: AEDimage},
        // { value: "INR", label: "INR", image:  INRimage },
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage},
        // { value: "RUBLE", label: "RUBLE", image: RUBLEimage},
        // { value: "CAD", label: "CAD", image:  CADimage},
        // { value: "GBP", label: "GBP", image:  GBPimage},
        // { value: "AED", label: "AED", image: AEDimage },
        // { value: "CNY", label: "CNY", image: CNYimage},
        // { value: "VMD", label: "VMD", image:  VMDimage},
        // { value: "EURO", label: "EURO", image:  EUROimage},
        // { value: "POUND", label: "POUND", image:  POUNDimage},
        // { value: "YUAN", label: "YUAN", image:  YUANimage},
        // { value: "INR", label: "INR", image:  INRimage},
        // { value: "YEN", label: "YEN", image:  YENimage},
        // { value: "SGD", label: "SGD", image:  SGDimage},
        // { value: "AUD", label: "AUD", image:  AUDimage},
        { value: "USDT", label: "USDT", image:  USDTimage},
        // { value: "YEN", label: "YEN", image:  JPYImage},

    ];

    const changeLeadInv = (e) =>{
        if(e == 'other'){
            setleadI(false)
        }else{
            setExternalLeadName('')
            setleadI(true)
            setleadInvestor(e)
        }
    }

    const handleCloseInputFunc = () =>{
        
        setleadI(true)
    }
    
    const setExternalFunc = (e) =>{
        setExternalLeadName(e)
        
        setleadInvestor(null)
    }
    const handleIncubated = (e) =>{
        if (e==="true"){

            setisIncubated(true);
        }
        else{
            setisIncubated(false);
        }
console.log(e);
    }
    const handleGrants = (e) =>{
        if (e==="true"){
            setReceivedGrants(true);
        }
        else{
            setReceivedGrants(false);
        }
       
        console.log(e);
    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Funding</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form> */}

                    <div className="row">
                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Total Fund Raise Target<span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" defaultValue={totalFundRaise} onChange={(e) => setTotalFundRaise(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Funds Raised till Date</label>
                                        <input type="number" className="form-control" defaultValue={fundRaiseTillDate} onChange={(e) => setfundRaiseTillDate(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Number Of Investors till Date</label>
                                        <input type="number" className="form-control" defaultValue={noofInvestorstilldate} onChange={(e) => setnoofInvestorstilldate(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Lead Investor</label>
                                        <div>
                                            {leadI == true ? 
                                            
                                            <select className="form-control btn-block-height square-edges" defaultValue={leadInvestor} onChange={(e) => changeLeadInv(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                {getIvestData?.length > 0 && getIvestData.filter(i => i.fund_name != null).map(i=> (

                                                    <option style={{ fontSize: '13px' }} value={i?._id} >{i?.fund_name} </option>
                                                ))}
                                                <option style={{ fontSize: '13px' }} value="other">other</option>
                                                {/* <option style={{ fontSize: '13px' }} value="others">others</option> */}
                                            </select>
                                            :
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        {/*  */}
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={ExternalLeadName} onChange={(e) => setExternalFunc(e.target.value)} />
                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '22px',
                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                        }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                    </div>
                                        }
                                        </div>
                                        {/* <input type="text" className="form-control" defaultValue={leadInvestor} onChange={(e) => setleadInvestor(e.target.value)} /> */}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Stage of Funding <span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control" /> */}
                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={stateOfFunding} onChange={(e) => setstateOfFunding(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Preseed">Preseed</option>
                                                <option style={{ fontSize: '13px' }} value="Seed">Seed</option>
                                                <option style={{ fontSize: '13px' }} value="Strategic Round">Strategic Round</option>
                                                <option style={{ fontSize: '13px' }} value="Private Round">Private Round</option>
                                                <option style={{ fontSize: '13px' }} value="Series A">Series A</option>
                                                <option style={{ fontSize: '13px' }} value="Series B">Series B</option>
                                                <option style={{ fontSize: '13px' }} value="others">others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Primary Funding wallet Address <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" readOnly='true' defaultValue={walletAddress}
                                        // onChange={(e) => setwalletAddress(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                {/*                                   
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Project<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Primary Funding Wallet Address Network <span className="text-danger">*</span></label>
                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={WalletNetwork} onChange={(e) => setWalletNetwork(e.target.value)} >
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Polygon">Polygon</option>
                                            </select>
                                        </div>
                                        {/* <input type="text" className="form-control" /> */}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Currency</label>
                                        <div>

                                            {CurrencyType != '' && CurrencyType != null && CurrencyType != undefined ?

                                                <ReactSelect
                                                    // value={CurrencyType}
                                                    style={{ padding: '0px' }}
                                                    className="form-control btn-block-height square-edges"

                                                    defaultValue={countries[indexCountforSlect]}
                                                    // value={}
                                                    onChange={(e) => setCurrencyType(e.value)}
                                                    // value={passenger.nationality}
                                                    options={countries}
                                                    formatOptionLabel={(country) => (
                                                        <div className="country-option">
                                                            <img className='ml-2 mr-2'
                                                                style={{ width: '20px', height: '20px' }}
                                                                src={country.image}
                                                                alt={country.value}
                                                            />
                                                            <span style={{ fontSize: '13px' }}>
                                                                {country.value}
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                                :
                                                <ReactSelect
                                                    style={{ padding: '0px' }}
                                                    className="form-control btn-block-height square-edges"

                                                    // defaultValue={countries[0]}
                                                    // value={}
                                                    onChange={(e) => setCurrencyType(e.value)}
                                                    // value={passenger.nationality}
                                                    options={countries}
                                                    formatOptionLabel={(country) => (
                                                        <div className="country-option">
                                                            <img
                                                                style={{ width: '20px', height: '20px' }}
                                                                src={country.image}
                                                                alt={country.value}
                                                            />
                                                            <span style={{ fontSize: '13px' }}>
                                                                {country.value}
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            }



                                        </div>
                                        {/* <select>
                                            <option value="volvo" style={`background-image:url(${usdticon});`}>Volvo</option>
                                            <option value="saab" style={`background-image:url(${usdticon});`}>Saab</option>
                                            <option value="honda" style={`background-image:url(${usdticon});`}>Honda</option>
                                            <option value="audi" style={`background-image:url(${usdticon});`}>Audi</option>
                                        </select> */}

                                        {/* <div className="dropdown">
                                                <button className="dropbtn">
                                                    Country Flags
                                                </button>

                                                <div className="dropdown-content">
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132503/iflag.jpg"
                                                            width="20" height="15"/> India</a>

                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg"
                                                            width="20" height="15"/> USA</a>
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132502/eflag.jpg"
                                                            width="20" height="15"/> England</a>
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132500/bflag.jpg"
                                                            width="20" height="15"/> Brazil</a>
                                                </div>
                                            </div> */}

                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Mode of Funding </label>
                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={modeOfFunding} onChange={(e) => setModeOfFunding(e.target.value)}>
                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Equity">Equity</option>
                                                <option style={{ fontSize: '13px' }} value="Token">Token</option>
                                                <option style={{ fontSize: '13px' }} value="Hybrid (Token & Equity)">Hybrid (Token + Equity)</option>
                                
                                            </select>
                                        </div>
                           

                                    </div>
                                </div>
                                
                                <div className="col-md-6">
                                <div className="form-group">
                                    {/* {isIncubated ? <p>true</p>:<p>False</p>} */}

                                    
                                
                                        <form onChange={(e) => handleIncubated(e.target.value)} value={isIncubated}>
                                           
                                        <label>Are you incubated? {isIncubated}</label>&nbsp;
                                        <input type="radio" value="true" name="gender" checked={isIncubated}/> yes &nbsp;
                                        <input type="radio" value="false" name="gender" checked={!isIncubated}/> no 
                                   
                                        </form>
                           

                                    </div>
                                </div>

                                <div className="col-md-6">
                                <div className="form-group">
                                {/* {receivedGrants ? <p>true</p>:<p>False</p>} */}
                                        <form onChange={(e) => handleGrants(e.target.value)} defaultValue={receivedGrants}>
                                           
                                        <label>Have you received any Grants? </label>&nbsp;
                                        <input type="radio" value="true" name="gender" checked={receivedGrants}/> yes &nbsp;
                                        <input type="radio" value="false" name="gender" checked={!receivedGrants}/> no 
                                   
                                        </form>
                           

                                    </div>
                                </div>
     <div className="col-md-6">
     {isIncubated? 
                                    <div className="form-group">
                                        <label>Name of the Incubator/Accelerator</label>
                                        <div>
                                     <input className="form-control" type="text" defaultValue={IncubatorName} onChange={(e) => setIncubatorName(e.target.value)}></input>
                                        </div>
                                        <label>Website of the Incubator/Accelerator</label>
                                        <div>
                                        <input className="form-control" type="text" defaultValue={IncubatorWebsite} onChange={(e) => setIncubatorWebsite(e.target.value)}></input>
                                        </div>
                                        </div>:""

}

                                    </div>
 
                          


 <div className="col-md-6">
 {receivedGrants?
                                    <div className="form-group">
                                    <label>Name of Grants programme</label>
                                        <div>
                                        <input className="form-control" type="text" defaultValue={GrantsName} onChange={(e) => setGrantsName(e.target.value)}></input>
                                        </div>
                                        <label>Proof of Grant (Please, provide link of grant approval)</label>
                                        <div>
                                        <input className="form-control" type="text" defaultValue={GrantsLink} onChange={(e) => setGrantsLink(e.target.value)}></input>
                                        </div>
                           

                                    </div>
:""}

                                </div>

                               

                             



                            </div>
                        </div>
                    </div>

                    {/* </form> */}
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    {
                        checkData != null && checkData != undefined && checkData != '' ?
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => updateFundingDetails()}>SAVE</button>
                            </div>
                            :
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => createFundingDetails()}>SAVE</button>
                            </div>
                    }


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default FundingModal;