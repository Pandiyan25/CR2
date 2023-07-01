


    useEffect(()=>{
        if(projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 ){
            if (projectDataDetails[0]?.token_supply_breakup.length > 0) {
                var tokenarr = [];
                for (var i = 0; i < projectDataDetails[0]?.token_supply_breakup.length; i++) {
                    tokenarr.push({
                        id: i,
                        name: projectDataDetails[0]?.token_supply_breakup[i].category,
                        y: projectDataDetails[0]?.token_supply_breakup[i].value

                    })

                }


                setMydata(tokenarr)
            }
            if (projectDataDetails[0]?.token_type.length > 0) {

                var arrtype = [];
                for (var i = 0; i < projectDataDetails[0]?.token_type.length; i++) {
                    console.log(i,projectDataDetails[0]?.token_type.length,projectDataDetails[0]?.token_type[i].value);
                    arrtype.push({
                        value: projectDataDetails[0]?.token_type[i].value,
                        label: projectDataDetails[0]?.token_type[i].value,
                         color: "#FFC400"
                    })

                }

                settokenType(arrtype)
            }
        }
    })

    


    <div className="card card-table" style={{ margin: '0px', border: 'none', background: "none" }}>
    {/* padding: '10px'  */}
    <div className="card-body" style={{ padding: '0px' }}>

        <div className="col-md-12" style={{ padding: '0px' }}>
            {/* margin: '10px'  */}
            <div className="profile-view" style={{ margin: '0px' }}>


                <h3 className="card-title">Tokenomics</h3>
                <div className="" style={{ display: 'flex' }}>


                    <div style={{ width: '65%', height: '500px' }}>

                        <div className="row" style={{ margin: '0px', marginBottom: '15px' }}>
                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
                                            <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_ticker}
                                            </h3>
                                            <span className="mainFontSpan2">Token Ticker</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
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
                                              

                                                    // projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                    //     projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                    //         projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                    //             projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                    //                 projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                    //                     projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EUR" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                    //                         projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                    //                             projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                    //                                 projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                    //                                     projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                    //                                         projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                    //                                             ""

                                                    :
                                                    ""
                                                }
                                            <h3 className="mainFontH4 ml-2" style={{ textAlign: 'start' }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.total_token_supply}
                                            </h3></div>
                                            <span className="mainFontSpan2">Total Token Supply</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
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
                                            <h3 className="mainFontH4 ml-2" style={{ textAlign: 'start' }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.public_launch_price}
                                            </h3></div>
                                            <span className="mainFontSpan2">Public Launch Price</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row" style={{ margin: '0px', marginBottom: '15px' }}>
                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
                                            <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.expected_token_generation_event}
                                            </h3>
                                            <span className="mainFontSpan2">Expected Token Generation Event</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
                                            <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_standard}
                                            </h3>
                                            <span className="mainFontSpan2">Token Standard</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                <div className="cardHEight3 card dash-widget">
                                    <div className="card-body">
                                        <div className="">
                                            {/* dash-widget-info */}
                                            <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.primary_network}
                                            </h3>
                                            <span className="mainFontSpan2">Primary Network</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ margin: '0px', marginBottom: '15px' }}>

                            <div className="" style={{ width: '100%', padding: '5px' }}>
                                <table style={{ width: '100%', border: 'none' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Token Type</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                            {tokenType != null && tokenType != undefined && tokenType?.length > 0 ?
                        <div style={{display:'flex'}}>

                            {tokenType.map((i) =>
                                <div>
                                    {i?.value},
                                </div>
                            )}
                        </div>
                        : ''
                    }
                    </td>
                                        </tr>
                                        <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Token Contract</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px' }}>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.contract_address}</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {mydata.length > 0 ?

                        <div style={{ width: '35%', height: '500px' }}>
                            <CanvasJSChart options={options} height="100%" width="100%" />
                        </div>
                        :
                        ''
                    }
                </div>
                {/* <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div> */}

            </div>

        </div>


        <div className="col-md-12" style={{ padding: '0px' }}>


            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                <div className="col" style={{ padding: '0px' }}>
                    <div className="search mt-4 mb-2">
                        <input
                            placeholder="Search"
                            style={{ width: '300px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-12" style={{ padding: '0px' }}>

            <div className="row">
                <div className="col-md-12" style={{ padding: '15px' }}>
                    <div className="card card-table flex-fill">

                        <div className="card-body">
                            <div className="table-responsive">

                                    <Table className="table-striped"
                                        pagination={{
                                            total: allTokenomicsDashboardData.length,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }}
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        // bordered
                                        dataSource={allTokenomicsDashboardData}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div style={{marginTop:'40px',textAlign:'end'}}>
            <button className="btn buttonInProposal1 submit-btn">SAVE</button>
        </div> */}

    </div>
</div>