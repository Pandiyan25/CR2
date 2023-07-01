
        <div className="card card-table container-fluid" style={{ height: "210vh", overflowY: 'auto' }}>

        <div className="card-body" style={{ padding: '10px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '10px' }}>


                    <h3 className="card-title">Project</h3>

                    <div className="wrap p2">
                        <div style={{ minHeight: '300px' }}>
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].logo != null && projectDataDetails[0].logo != undefined ?
                                <img src={projectDataDetails[0].logo} style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', border: '2px solid black' }}></img>
                                //   <img src={projectDataDetails[0].logo} style={{ boxShadow: 'rgb(196, 200, 208) 0px 10px 20px', borderRadius: '50%', position: "absolute", marginLeft: "60%", marginTop: "140px", width: "10%", minWidth: '150px', minHeight: '150px' }}></img>
                                :

                                <img src={""} style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', border: '2px solid black' }}></img>


                            }

                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].cover_page != null && projectDataDetails[0].cover_page != undefined ?
                                <img src={projectDataDetails[0].cover_page} style={{ width: "100%", height: '300px' }}></img>

                                // <img src={/projectDataDetails[0].cover_page} style={{ width: "100%", height: '220px' }}></img>
                                :

                                <img src={''} style={{ width: "100%", height: '300px' }}></img>

                            }


                        </div>
                        <div className="mt-3" style={{ display: "flex", marginBottom: '25px', justifyContent: 'end' }}>
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].website_link != null && projectDataDetails[0].website_link != undefined ?

                                <img className="sociallogo" src={website} onClick={() => { opennewWindow(projectDataDetails[0].website_link) }}>
                                </img>
                                :
                                <img className="sociallogo" src={website} >
                                </img>

                            }
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].twitter != null && projectDataDetails[0].twitter != undefined ?

                                <img className="sociallogo" src={twitterIcon} onClick={() => { opennewWindow(projectDataDetails[0].twitter) }}>
                                </img>
                                :
                                <img className="sociallogo" src={twitterIcon}>
                                </img>
                            }

                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].youtube != null && projectDataDetails[0].youtube != undefined ?

                                <img className="sociallogo" src={youtube} onClick={() => { opennewWindow(projectDataDetails[0].youtube) }}>
                                </img>
                                :
                                <img className="sociallogo" src={youtube}>
                                </img>
                            }

                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].medium != null && projectDataDetails[0].medium != undefined ?

                                <img className="sociallogo" src={medium} onClick={() => { opennewWindow(projectDataDetails[0].medium) }}>
                                </img>
                                :
                                <img className="sociallogo" src={medium}>
                                </img>
                            }

                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].instagram != null && projectDataDetails[0].instagram != undefined ?

                                <img className="sociallogo" src={instagram} onClick={() => { opennewWindow(projectDataDetails[0].instagram) }}>
                                </img>
                                :
                                <img className="sociallogo" src={instagram}>
                                </img>
                            }
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].discord != null && projectDataDetails[0].discord != undefined ?

                                <img className="sociallogo" src={discord} onClick={() => { opennewWindow(projectDataDetails[0].discord) }}>
                                </img>
                                :
                                <img className="sociallogo" src={discord}>
                                </img>
                            }
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].telegram != null && projectDataDetails[0].telegram != undefined ?

                                <img className="sociallogo" src={telegram} onClick={() => { opennewWindow(projectDataDetails[0].telegram) }}>
                                </img>
                                :
                                <img className="sociallogo" src={telegram}>
                                </img>
                            }
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].facebook != null && projectDataDetails[0].facebook != undefined ?

                                <img className="sociallogo" src={facebookIcon} onClick={() => { opennewWindow(projectDataDetails[0].facebook) }}>
                                </img>
                                :
                                <img className="sociallogo" src={facebookIcon}>
                                </img>
                            }
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].linkedin != null && projectDataDetails[0].linkedin != undefined ?

                                <img className="sociallogo" src={ld} onClick={() => { opennewWindow(projectDataDetails[0].linkedin) }}>
                                </img>
                                :
                                <img className="sociallogo" src={ld}>
                                </img>

                            }

                            <img className="sociallogo" src={shareIcon} >
                            </img>
                        </div>
                        <div>



                            <div className="row " style={{ marginTop: '40px' }}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>
                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_name}</h3>
                                    <h4>
                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].one_line_description}

                                    </h4>
                                    <div className="row">
                                        <div className="col-3">
                                            <p>Nature</p>
                                            <p>Tags</p>
                                            <p>Stage</p>
                                            <p>About</p>
                                        </div>
                                        <div className="col-9">
                                            <p>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].nature_of_project != null && projectDataDetails[0].nature_of_project != undefined && projectDataDetails[0].nature_of_project}</p>
                                            <p>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_tags != null && projectDataDetails[0].project_tags != undefined && projectDataDetails[0].project_tags
                                            }</p>
                                            <p>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_stage != null && projectDataDetails[0].project_stage != undefined && projectDataDetails[0].project_stage
                                            }</p>
                                            {/* <p>Project Description</p> */}
                                            <p> {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_description != null && projectDataDetails[0].project_description != undefined && projectDataDetails[0].project_description
                                            }</p>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-3">
                                            <div style={{ height: "100px" }}>
                                                <p>Team</p></div>
                                        </div>
                                        <div className="col-9">
                                            <div className="row " style={{ minHeight: "100px", display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                <div className="col p-2 m-2" style={{ minWidth: "45%", minHeight: "80px", border: "solid 1px #d2d2d2" }}>
                                                    <h2 className="bcolor">
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].number_of_founders != null && projectDataDetails[0].number_of_founders != undefined ?
                                                            projectDataDetails[0].number_of_founders : 0}</h2>
                                                    <p>Founder</p>
                                                </div>
                                                <div className="col p-2 m-2" style={{ minWidth: "45%", minHeight: "80px", border: "solid 1px #d2d2d2" }}>
                                                    <h2 className="bcolor">
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].team_size != null && projectDataDetails[0].team_size != undefined ?
                                                            projectDataDetails[0].team_size : 0}</h2>
                                                    <p>Team</p>

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-3">
                                            <div style={{ height: "100px" }}>
                                                <p>Funding</p></div>
                                        </div>
                                        <div className="col-9">


                                            <div className="row " style={{ minHeight: "100px", display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                <div className="col p-2 m-2" style={{ minWidth: "45%", minHeight: "80px", border: "solid 1px #d2d2d2" }}>

                                                    <div style={{ display: "flex" }}>
                                                    
                                                   
                                                    {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0
                                                            ?
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""
                                                      

                                                        //     projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency== "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EUR" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                        // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                        // ""

                                                        :
                                                        ""
                                                    }
                                                        <h2 className="bcolor ml-2">
                                                            {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.total_fund_raise_target}

                                                            {/* {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].total_fund_raised != null && projectDataDetails[0].total_fund_raised != undefined ?
                                                            projectDataDetails[0]?.total_fund_raised : ""}*/}
                                                        </h2>

                                                    </div>
                                                    <p>Total Fund Raise</p>
                                                </div>
                                                <div className="col p-2 m-2" style={{ minWidth: "45%", minHeight: "80px", border: "solid 1px #d2d2d2" }}>
                                                    <div style={{ display: "flex" }}>

                                                        {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0
                                                            ?


                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""
                                                        

                                                        :
                                                        ""
                                                    }
                                                        <h2 className="bcolor ml-2">
                                                            {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.fund_raised}

                                                            {/* {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].fund_raised_till_now != null && projectDataDetails[0].fund_raised_till_now != undefined ?
                                                        projectDataDetails[0]?.fund_raised_till_now : ""} */}
                                                        </h2>
                                                    </div>
                                                    <p >Fund Raised</p>
                                                </div>

                                            </div>
                                            <div className="row " style={{ minHeight: "100px", display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                <div className="col p-2 m-2" style={{ minWidth: "45%", minHeight: "80px", border: "solid 1px #d2d2d2" }}>
                                                    <h2 className="bcolor">
                                                        {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.number_of_investors}

                                                        {/* {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].pitch_deck != null && projectDataDetails[0].pitch_deck != undefined ?
                                                            allProjectFundingData[0]?.number_of_investors : ""} */}
                                                    </h2>
                                                    <p >No of Investors</p>
                                                </div>
                                                <div className="col p-2 m-2 " style={{ minWidth: "45%", minminHeight: "80px", border: "solid 1px #d2d2d2" }}>
                                                    <h2 className="bcolor">
                                                        {/* {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].pitch_deck != null && projectDataDetails[0].pitch_deck != undefined ?

                                                            allProjectFundingData[0]?.lead_investor?.first_name : ""} */}
                                                        {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.lead_investor?.first_name}

                                                    </h2>
                                                    <p >Lead Investor</p>
                                                </div>

                                            </div>
                                            <div className="row" style={{ minHeight: "100px", display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                <div className=" p-2 m-2 " style={{
                                                    minHeight: "80px", border: "solid 1px #d2d2d2",
                                                    position: 'relative',
                                                    width: '100%',
                                                    flexBasis: '0',
                                                    flexGrow: '1',
                                                    maxWidth: '100%'
                                                }}>        <h2 className="bcolor">
                                                        {/* {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].pitch_deck != null && projectDataDetails[0].pitch_deck != undefined ?
                                                            allProjectFundingData[0]?.stage_of_funding : ""} */}
                                                        {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.stage_of_funding}

                                                    </h2>
                                                    <p >Stage of Funding</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>



                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col">
                                            <div style={{ height: '135px', width: '115px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideOverall != null && projectDataDetails[0].divideOverall != undefined ?

                                                    // { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?
                                                    <PieChart

                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"

                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: 10 - projectDataDetails[0].divideOverall, value: 10 - projectDataDetails[0].divideOverall, color: '#94B3E8' },
                                                            { title: projectDataDetails[0].divideOverall, value: projectDataDetails[0].divideOverall, color: '#6345ED' },
                                                        ]}

                                                    />
                                                    :
                                                    <PieChart
                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"
                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: "10", value: 10, color: '#94B3E8' },
                                                            { title: '0', value: 0, color: '#6345ED' },
                                                        ]}

                                                    />
                                                }
                                            </div>

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideOverall != null && projectDataDetails[0].divideOverall != undefined ?

                                                // { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{projectDataDetails[0].divideOverall}</div>
                                                :
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{0}</div>
                                            }

                                            <div>

                                                <h3 className="card-title mb-0" style={{ padding: '10px', fontSize: '16px' }}>Overall Score</h3>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ height: '135px', width: '115px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideInvestor != null && projectDataDetails[0].divideInvestor != undefined ?
                                                    //    { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?
                                                    <PieChart
                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"
                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: 10 - projectDataDetails[0].divideInvestor, value: 10 - projectDataDetails[0].divideInvestor, color: '#94B3E8' },
                                                            { title: projectDataDetails[0].divideInvestor, value: projectDataDetails[0].divideInvestor, color: '#6345ED' },
                                                        ]}

                                                    />
                                                    :
                                                    <PieChart
                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"
                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: '10', value: 10, color: '#94B3E8' },
                                                            { title: '0', value: 0, color: '#6345ED' },
                                                        ]}

                                                    />
                                                }

                                            </div>

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideInvestor != null && projectDataDetails[0].divideInvestor != undefined ?
                                                // { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{projectDataDetails[0].divideInvestor}</div>
                                                :
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{0}</div>
                                            }

                                            <div>

                                                <h3 className="card-title mb-0" style={{ padding: '10px', fontSize: '16px' }}>Investor Score</h3>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ height: '135px', width: '115px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideValidator != null && projectDataDetails[0].divideValidator != undefined ?

                                                    // { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?

                                                    <PieChart
                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"
                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: 10 - projectDataDetails[0].divideValidator, value: 10 - projectDataDetails[0].divideValidator, color: '#94B3E8' },
                                                            { title: projectDataDetails[0].divideValidator, value: projectDataDetails[0].divideValidator, color: '#6345ED' },
                                                        ]}
                                                    />
                                                    :
                                                    <PieChart
                                                        animate
                                                        animationDuration={500}
                                                        animationEasing="ease-out"
                                                        labelPosition={45}
                                                        lineWidth={20}
                                                        data={[
                                                            { title: '10', value: 10, color: '#94B3E8' },
                                                            { title: '0', value: 0, color: '#6345ED' },
                                                        ]}
                                                    />
                                                }


                                            </div>

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideValidator != null && projectDataDetails[0].divideValidator != undefined ?
                                                // { projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ?
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{projectDataDetails[0].divideValidator}</div>
                                                :
                                                <div style={{ marginTop: '-85px', marginLeft: '45px', fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>{0}</div>
                                            }

                                            <div>

                                                <h3 className="card-title mb-0" style={{ padding: '10px', fontSize: '16px' }}>Validator Score</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row text-align-center">
                                        <div className="col-6" style={{ textAlign: "center" }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].one_pager_document != null && projectDataDetails[0].one_pager_document != undefined ?
                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].one_pager_document) }}>One pager</button>
                                                :
                                                <button type="button" className="linkbt mt-2">One pager</button>
                                            }
                                        </div>
                                        <div className="col-6" style={{ textAlign: "center" }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].whitepaper != null && projectDataDetails[0].whitepaper != undefined ?

                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].whitepaper) }}>Whitepaper</button>
                                                :
                                                <button type="button" className="linkbt mt-2" >Whitepaper</button>
                                            }
                                        </div>
                                        <div className="col-6" style={{ textAlign: "center" }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].pitch_deck != null && projectDataDetails[0].pitch_deck != undefined ?

                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].pitch_deck) }}>Pitch Deck</button>
                                                :
                                                <button type="button" className="linkbt mt-2">Pitch Deck</button>
                                            }
                                        </div>
                                        <div className="col-6" style={{ textAlign: "center" }}>

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].github_repository != null && projectDataDetails[0].github_repository != undefined ?

                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].github_repository) }}>Git Hub</button>
                                                :
                                                <button type="button" className="linkbt mt-2">Git Hub</button>
                                            }
                                        </div>

                                        <div className="col-6" style={{ textAlign: "center" }}>
                                            {/* <button type="button" className="linkbt mt-2"></button>  onClick={() => { opennewWindowForDoc(productDemo) }}*/}

                                            {/* {productDemo != '' && productDemo != null && productDemo != undefined ? */}
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].product_demo != null && projectDataDetails[0].product_demo != undefined ?

                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].product_demo) }}>Product Demo</button>
                                                :
                                                <button type="button" className="linkbt mt-2">Product Demo</button>
                                            }
                                        </div>
                                        <div className="col-6" style={{ textAlign: "center" }}>
                                            {/* <button type="button" className="linkbt mt-2"></button>  onClick={() => { opennewWindowForDoc(VideoPitch) }}*/}

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].video_pitch != null && projectDataDetails[0].video_pitch != undefined ?


                                                <button type="button" className="linkbt mt-2" onClick={() => { opennewWindowForDoc(projectDataDetails[0].video_pitch) }}> Video Pitch</button>
                                                :
                                                <button type="button" className="linkbt mt-2">Video Pitch</button>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>






                </div>
            </div>

        </div>
    </div>
