<div style={{ marginBottom: "30px" }}>
<Card className='cardInDashboard' style={{ cursor: 'pointer', minHeight: 'auto', margin: 'auto', gap: '6px' }}>
    <div className='cardFlexDivfd' >
        <div className='cardSubText2 mb-2'>
            <span style={{ width: '100%', heigth: '100%' }}>
                {
                    i?.user?.fund_logo != null && i?.user?.fund_logo != undefined && i?.user?.fund_logo != '' ?
                        <img src={i?.user?.fund_logo} alt="" className='cardTextImage' style={{ border: '1px solid white' }} />
                        :
                        <img src={logoProj} alt="" className='cardTextImage' style={{ border: '1px solid white' }} />
                }
                {/* #1890ff */}
            </span>
        </div>
        <h2 style={{ height: "55px" }} className='fundname mb-2'>{i?.user?.fund_name}</h2>

        <div className='location ' style={{ height: "74px" }}>
            {i?.user?.fund_head_quarters != null && i?.user?.fund_head_quarters != undefined && i?.user?.fund_head_quarters != '' ?
                <div className='mb-2'>
                    <img src={locationPin} alt='' style={{ height: '18px', width: '18px' }} /> <span style={{ fontSize: "12px", fontWeight: "500" }}>{i?.user?.fund_head_quarters}</span>
                </div>
                :
                <>
                </>
            }
            <div className='mb-2'>
                <span style={{ color: "rgb(0, 119, 255)", fontSize: "18px", fontWeight: "600" }} >
                    ${i?.user?.asset_under_management != '' && i?.user?.asset_under_management != null && i?.user?.asset_under_management != undefined && Number(i?.user?.asset_under_management).toLocaleString("en-US")}
                </span></div>
            <p className='foundercardlabel2' style={{ margin: '0px' }}>
                Assets Under Management
            </p>
        </div>
        <hr style={{ margin: "14px 0px 2px 0px" }}></hr>
    </div>

    <Card.Body style={{ padding: '0px', height: "auto" }} className="cardBodyStyle">
        {/* <div className='gridBox'>
            <div className='firstGrid'>
                <div className='firstInnerGrid'> */}
        {/* <h2 className='firstGridH2' style={{ width: '200px' }}>

                        <span className='descSpan'>
                            Fund Name
                        </span>

                    </h2> */}

        {/* <p className='MaindescParagraph' >
                        <span className='descSpan'>

                            <span>{i?.user?.fund_name}</span>
                        </span>
                    </p> */}
        {/* </div>
            </div>
        </div> */}

        {/* <div className='gridBox'>
            <div className='firstGrid'>
                <div className='firstInnerGrid'> */}
        {/* <h2 className='firstGridH2' style={{ width: '200px' }}>
<span className='descSpan'>
Fund Name
</span>
</h2> */}
        {/* 
<p className='MaindescParagraph' >
<span className='descSpan'>
<span>{i?.user?.fund_name}</span>
</span>
</p>
*/}
        {/* </div>
            </div>
        </div> */}
        <div className='gridBox' style={{ minHeight: '80px' }}>
            <div className='row mb-1'>
                <div className='col'>
                    <p className='foundercardlabel' style={{ margin: '0px' }}>
                        Preffered Sectors
                    </p>
                </div>
                <div className='col align-end'>
                    {
                        i?.user?.preferred_sectors.length > 0 && getMultipleRandom(i?.user?.preferred_sectors, 3)?.map((main) => (
                            <button className="profile-bt-Preffered p-1 ml-1" style={{ borderRadius: "2px", width: "auto", margin: "0px 0px 1px 0px" }}>
                                {main?.value}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col'>
                    <p className='foundercardlabel' style={{ margin: '0px' }}>
                        Preferred stage of investment
                    </p>
                </div>
                <div className='col align-end'>

                    {
                        i?.user?.preferred_stage_of_investment?.length > 0 && getMultipleRandom(i?.user?.preferred_stage_of_investment, 3)?.map((main) => (
                            <button className="profile-bt-Preffered ml-1" style={{ borderRadius: "2px", width: "auto" }}>
                                {main?.value}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col'>
                    <p className='foundercardlabel' style={{ margin: '0px' }}>
                        Projects Invested
                    </p>
                </div>
                <div className='col align-end'>
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                        <span>
                            {i?.user?.project_invested}
                        </span>
                    </p>
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col'>
                    <p className='foundercardlabel' style={{ margin: '0px' }}>
                        Type of Fund
                    </p>
                </div>
                <div className='col align-end'>
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                        <span style={{ color: "rgb(0, 119, 255)" }}>
                            {i?.user?.type_of_fund}
                        </span>
                    </p>
                </div>
            </div>
            {/* <div className='row mb-1'>
<div className='col'>
<p className='foundercardlabel2' style={{ margin: '0px' }}>
Assets Under Management
</p>
</div>
<div className='col align-end'>
<p className='firstDivPararight' style={{ margin: '0px' }}>
<span style={{color:"rgb(0, 119, 255)"}}>
${i?.user?.asset_under_management != '' && i?.user?.asset_under_management != null && i?.user?.asset_under_management != undefined && Number(i?.user?.asset_under_management).toLocaleString("en-US")}
</span>
</p>
</div>
</div> */}
            <div className='row mb-1'>
                <div className='col'>
                    <p className='foundercardlabel' style={{ margin: '0px' }}>
                        Minimum Investment size
                    </p>
                </div>
                <div className='col align-end'>
                    <p className='firstDivPararight' style={{ margin: '0px' }}>
                        <span style={{ color: "rgb(0, 119, 255)" }}>
                            ${i?.user?.minimum_investment_size != null && i?.user?.minimum_investment_size != undefined && Number(i?.user?.minimum_investment_size).toLocaleString("en-US")}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        {/* <div className='gridBox mb-2' >
            <div className='col' style={{ padding: '0px', borderTop: '1.5px solid rgb(227, 233, 239)', paddingTop: '10px' }}>
               
            </div>
            <div className='col' style={{ padding: '0px' }}>
                <p className='firstDivPararight' style={{ margin: '0px', textAlign: 'left' }}>
                    <span>
                        {i?.user?.project_invested}

                    </span>
                </p>
            </div>
        </div> */}
        {/* <div className='gridBox2 mb-2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Preferred Stage of Investment
                </p>

                <div className="firstDivPararight" >
                    {
                        i?.user?.preferred_stage_of_investment?.length > 0 && i?.user?.preferred_stage_of_investment.map((main) => (
                            <button className="profile-bt-Preffered ml-1" style={{ borderRadius: "2px", width: "auto" }}>
                                {main?.value}
                            </button>
                        ))
                    }
                </div>

            </div>
        </div> */}
        {/* <div className='gridBox2 mb-2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Type of Fund
                </p>
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        {i?.user?.type_of_fund}

                    </span>
                </p>


            </div>
        </div> */}
        {/* <div className='gridBox2 mb-2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                Assets Under Management
                </p>
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>


                        ${i?.user?.asset_under_management != '' && i?.user?.asset_under_management != null && i?.user?.asset_under_management != undefined && Number(i?.user?.asset_under_management).toLocaleString("en-US")}
                    </span>
                </p>
            </div>
        </div> */}
        {/* <div className='gridBox2' >
            <div className='firstDivGridBOx2'>
                <p className='firstDivPara' style={{ margin: '0px' }}>
                    Minimum Investment Size
                </p>
                <p className='firstDivPararight' style={{ margin: '0px' }}>
                    <span>
                        ${i?.user?.minimum_investment_size != null && i?.user?.minimum_investment_size != undefined && Number(i?.user?.minimum_investment_size).toLocaleString("en-US")}


                    </span>
                </p>
            </div>
        </div> */}
        <div className='gridButtons' style={{ alignItems: "self-end", position: "absolute", bottom: "13px" }} >
            <div className='gridBox3Buttons'>
                {/* gridBox3IconDiv
                                                            gridBox3IconDiv
                                                            gridBox3IconDiv */}
                <div className="">
                    {
                        i?.user?.website_link != '' && i?.user?.website_link != null && i?.user?.website_link != undefined ?
                            <img src={website} alt='' className='imageConnectBtn' onClick={() => opennewWindow(i?.user?.website_link)} />
                            // <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.website_link)} />
                            :
                            <></>
                        // <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons' />
                    }
                </div>

                <div className="">
                    {
                        i?.user?.linkedin_link != '' && i?.user?.linkedin_link != null && i?.user?.linkedin_link != undefined ?
                            <img src={ld} alt='' className='imageConnectBtn' onClick={() => opennewWindow(i?.user?.linkedin_link)} />
                            // <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.linkedin_link)} />
                            :
                            <></>
                        // <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' />
                    }
                </div>
                <div className=""  >
                    {
                        i?.user?.twitter_funding != '' && i?.user?.twitter_funding != null && i?.user?.twitter_funding != undefined ?
                            <img src={twitterIcon} alt='' className='imageConnectBtn' onClick={() => opennewWindow(i?.user?.twitter_funding)} />
                            // <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.twitter_funding)} />
                            :
                            <></>
                        // <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' />
                    }
                </div>
            </div>
            {
                (i?.request_status == "Connected" || i?.request_status == "Requested" || i?.request_status == "RequestSent") ?
                    <div className='gridBox3ButtonsMain'>
                        <div className='gridAlignItems'>
                            <button className='gridbuttonClass2c' style={{ width: "70%" }} >
                                {i?.request_status}
                            </button>
                        </div>
                    </div>
                    :
                    <div className='gridBox3ButtonsMain'>
                        <div className='gridAlignItems'>
                            <button className='gridbuttonClass' style={{ width: "70%" }} onClick={() => investorConnectFunc(i?.user?._id)}>
                                Connect
                            </button>
                        </div>
                    </div>
            }
        </div>
    </Card.Body>
</Card>
</div> 