import React from 'react'
import CountUp from 'react-countup';

import CNYimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USD.png'
import EURimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../../../MainPage/Pages/FounderProject/Funding/assets/images/RUBBLE.png'


const Analytics = ({endValue,currency,textValue}) => {
  return (
    
    <div className=" col-md-3 col-sm-3 col-lg-3 col-xl-3" style={{ flex: '0 0 25%', maxWidth: '25%', padding: '5px' }}>
    <div className="dash-wid" style={{ minHeight: '75px', padding: '5px' }}>
        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

            <div className="widget-info-new">
                {/* 112 */}
                <div style={{ display: "flex" }} className="mb-2">

                    {currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                    {currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                    {currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                    {currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img> : ""}
                    {currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                    {currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                    {currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                    {currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                    {currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                    {currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                    {currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                    {currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                    {currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                    {currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                    {currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                    <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                        <CountUp  end={endValue}
                            duration={1.5}
                            separator=","

                        />

                    </h3>


                </div>

            </div>
            <span className="widget-box ft-weight">{textValue}</span>
        </div>

        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
    </div>
</div>

  )
}

export default Analytics