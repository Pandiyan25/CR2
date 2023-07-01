
                                            <select className="css-1s2u09g-control" value={CurrencyType} onChange={(e) => setCurrencyType(e.target.value)}>
                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                            {/* <option style={{ fontSize: '13px' }} value="USDT" >
                                             
                                                <img src={usdticon} style={{ height: '20px', width: '20px' }} /> USDT - US Dollar($)
                                                
                                            </option> */}
                                            <option style={{ fontSize: '13px' }} value="USD">USD</option>
                                            <option style={{ fontSize: '13px' }} value="EUR">EUR</option>
                                            <option style={{ fontSize: '13px' }} value="SDT">SDT</option>
                                            <option style={{ fontSize: '13px' }} value="INR">INR</option>
                                            <option style={{ fontSize: '13px' }} value="USDC">USDC</option>
                                            <option style={{ fontSize: '13px' }} value="DAI">DAI</option>
                                            <option style={{ fontSize: '13px' }} value="BUSD">BUSD</option>
                                            <option style={{ fontSize: '13px' }} value="RUB">RUB</option>
                                            <option style={{ fontSize: '13px' }} value="CAD">CAD</option>
                                            <option style={{ fontSize: '13px' }} value="GBP">GBP</option>
                                            <option style={{ fontSize: '13px' }} value="AED">AED</option>
                                            <option style={{ fontSize: '13px' }} value="CNY">CNY</option>
                                            <option style={{ fontSize: '13px' }} value="VMD">VMD</option>
                                        </select>
















<div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="">
            <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                {stateOfFunding != null && stateOfFunding != undefined && stateOfFunding}
            </h3>
            <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Stage of Funding </span>
        </div>
    </div>
</div>
</div>




<div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="" style={{ textAlign: 'start' }}>
            <div style={{ display: "flex" }}>

                {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>
                    {totalFundRaise != null && totalFundRaise != undefined &&

                        Number(totalFundRaise).toLocaleString("en-US")
                    }
                </h3></div>
            <span className="mainFontSpan2 ml-2" style={{ textAlign: 'start' }}>Total Fund Raise</span>
        </div>
    </div>
</div>
</div>







<div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
<div className="cardHEight3 card dash-widget">
    <div className="card-body">
        <div className="" style={{ textAlign: 'start' }}>
            {leadI == true ?

                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>

                    {showLeadInvestor != null && showLeadInvestor != undefined && showLeadInvestor.first_name}
                </h3>
                :

                <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>

                    {ExternalLeadName != null && ExternalLeadName != undefined && ExternalLeadName}
                </h3>
            }
            <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Lead Investor</span>
        </div>
    </div>
</div>
</div>










{/* </div>
                                <div className="row" style={{ margin: '0px', marginBottom: '15px' }}> */}
                                <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="" style={{ textAlign: 'start' }}>
                                            <div style={{ display: "flex" }}>

                                                {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                                                {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}



                                                {/* {CurrencyType=="CAD"?<img style={{width:"30px",height:"30px"}}src={CADimage}></img>:""}? */}
                                                {/* {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""}
                                            {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""}
                                            {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""}
                                            {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""}
                                            {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""}
                                            {CurrencyType=="BUSD"?<img src={BUSDimage}></img>:""}
                                            {CurrencyType=="CAD"?<img src={CADimage}></img>:""} */}


                                                <h3 className="mainFontH4 ml-2" style={{ textAlign: 'start', color: '#1890ff' }}>
                                                    {/* {CurrencyType != '' && CurrencyType != null && CurrencyType != undefined && CurrencyType}  */}
                                                    {fundRaiseTillDate != null && fundRaiseTillDate != undefined &&


                                                        Number(fundRaiseTillDate).toLocaleString("en-US")
                                                    }
                                                </h3>
                                            </div>
                                            <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Funds Raised</span>
                                        </div>
                                    </div>
                                </div>
                            </div>










<div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
<div className="cardHEight3 card dash-widget">
    <div className="card-body">

        <div className="" style={{ textAlign: 'start' }}>
            <h3 className="mainFontH4" style={{ textAlign: 'start', color: '#1890ff' }}>


                {Number(tokenStd1.length).toLocaleString("en-US")}

            </h3>
            <span className="mainFontSpan2" style={{ textAlign: 'start' }}>No of Investors</span>
        </div>
    </div>
</div>
</div>