import React from 'react'
import CountUp from 'react-countup';


import CNYimaage from '../../FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../../FounderProject/Funding/assets/images/USD.png'
import EURimage from '../../FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../../FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../../FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../../FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../../FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../../FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../../FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../../FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../../FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../../FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../../FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../../FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../../FounderProject/Funding/assets/images/RUBBLE.png'
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react'
import { externalLeadInvestor } from '../../../../reducers/ConstantSlice';

const AnalyticsMainPage = ({endValue, MainText, textPAgeType,leadInvestor,externalLeadInvestor}) => {
    const CurrencyType = useSelector((state) => state.constVar.currencyType)
    const [marginLeft, setmarginLeft] = useState("")



    useEffect(() => {
        if((leadInvestor == null || leadInvestor == "" || leadInvestor == undefined) && (externalLeadInvestor == null || externalLeadInvestor == "" || externalLeadInvestor == undefined))
        {
setmarginLeft("10px")
        }
        else{
            setmarginLeft("0px")
        }
    }, [])
    

    return (
        <div className=" col-md-2 col-sm-2 col-lg-2 col-xl-2" style={{ flex: '0 0 20%', maxWidth: '20%', padding: '5px' }}>
            <div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                        <div style={{display:"flex"}}>
                        {/* 112 */}
                        {/* need to implement if external lead investor also */}
                        { (leadInvestor == null || leadInvestor == "" || leadInvestor == undefined) && (externalLeadInvestor == null || externalLeadInvestor == "" || externalLeadInvestor == undefined) ?
                            <div>
                            {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={BUSDimage}></img> : ""}
                                                            {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CADimage}></img> : ""}
                                                            {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={AUDimage}></img> : ""}
                                                            {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CNYimaage}></img> : ""}
                                                            {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={DAIimage}></img> : ""}
                                                            {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={EURimage}></img> : ""}
                                                            {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={INRimage}></img> : ""}
                                                            {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={RUBLEimage}></img> : ""}
                                                            {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={SGDimage}></img> : ""}
                                                            {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDCimage}></img> : ""}
                                                            {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDTimage}></img> : ""}
                                                            {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={usdimage}></img> : ""}
                                                            {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={POUNDimage}></img> : ""}
                                                            {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YUANimage}></img> : ""}
                                                            {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YENimage}></img> : ""}
    
    </div>:""
    

                        }





                        <h3 className="mainFontH5 mb-2 " style={{ marginBottom: '0px',marginLeft:marginLeft ,fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED",minHeight:'25px' }}>
                            {/* {textPAgeType == true ?
                                endValue
                                :
                                <CountUp end={endValue}
                                    duration={1.5}
                                    separator=","
                                    prefix=''
                                />
                            } */}
                            {leadInvestor == null || leadInvestor == "" || leadInvestor == undefined? externalLeadInvestor : leadInvestor}



                        </h3>
                        


                        </div>

                    </div>
                    <span className="widget-box ft-weight">{MainText}</span>
                </div>

                {/* <h3 className="mainFontH4">Info from budget page</h3> */}
            </div>
        </div>
    )
}

export default AnalyticsMainPage