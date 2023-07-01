
        <div className="card card-table" style={{ border: 'none', background: 'transparent' }}>

        <div className="card-body" style={{ padding: '0px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '0px' }}>


                    <h3 className="card-title">Funding</h3>
                    <div className="" style={{ display: 'flex' }}>

                        <div style={{ width: '65%', height: '500px' }}>

                            <div className="row" style={{ margin: '0px', marginBottom: '15px' }}>
                                <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                    <div className="cardHEight3 card dash-widget">
                                        <div className="card-body">
                                            <div className="">
                                                <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.stage_of_funding}
                                                </h3>
                                                <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Stage of Funding </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                    <div className="cardHEight3 card dash-widget">
                                        <div className="card-body">
                                            <div className="" style={{ textAlign: 'start' }}>
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

                                                    <h3 className="mainFontH4 ml-2"  style={{ textAlign: 'start' }}>
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.total_fund_raise_target}
                                                    </h3>
                                                </div>
                                                <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Total Fund Raise</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                    <div className="cardHEight3 card dash-widget">
                                        <div className="card-body">
                                            <div className="" style={{ textAlign: 'start' }}>
                                                <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.lead_investor?.first_name}
                                                </h3>
                                                <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Lead Investor</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row" style={{ margin: '0px', marginBottom: '15px' }}>
                                <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                    <div className="cardHEight3 card dash-widget">
                                        <div className="card-body">
                                            <div className="" style={{ textAlign: 'start' }}>
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
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.fund_raised}
                                                </h3></div>
                                                <span className="mainFontSpan2" style={{ textAlign: 'start' }}>Funds Raised</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{ width: '32%', maxWidth: '32%', padding: '5px' }}>
                                    <div className="cardHEight3 card dash-widget">
                                        <div className="card-body">
                                            {/* dash-widget-info
                                            dash-widget-info
                                            dash-widget-info
                                            dash-widget-info
                                            dash-widget-info */}
                                            <div className="" style={{ textAlign: 'start' }}>
                                                <h3 className="mainFontH4" style={{ textAlign: 'start' }}>
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.number_of_investors}
                                                </h3>
                                                <span className="mainFontSpan2" style={{ textAlign: 'start' }}>No of Investors</span>
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
                                                <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Primary Funding Wallet Address Network</td>
                                                <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.primary_funding_wallet_address_network}</td>
                                            </tr>
                                            <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Primary Funding wallet Address</td>
                                                <td style={{ wordSpacing: 'normal', padding: '10px 0px' }}>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.primary_funding_wallet_address}</td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div style={{ width: '35%', height: '500px' }}>
                            {/* <CanvasJSChart height="100%" width="100%" /> */}
                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 ?

                                <CanvasJSChart options={options} height="100%" width="100%" />
                                :
                                ''
                            }
                        </div>
                    </div>



                    {/* <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div> */}

                </div>
            </div>

            <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                    <div className="col" style={{ padding: '0px' }}>
                        <div className="search ">
                            <input
                                placeholder="Search"
                                style={{ width: '300px', borderRadius: '2px',minHeight:'35px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="col-auto float-right ml-auto">
                        <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => downloadFunc()}> DOWNLOAD SAMPLE FORMAT</button>
                        <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => handleClickFile2()}>UPLOAD FILE</button>
                        <input
                            type="file"
                            ref={hiddenFileInput2}
                            onChange={uploadExcelData}
                            style={{ display: 'none' }}
                        />
                        <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => showFundingTablefunc()}> ADD</button>
                    </div> */}
                </div>
            </div>
            <div className="col-md-12" style={{ padding: '0px' }}>

                <div className="row">
                    <div className="col-md-12" style={{ padding: '15px' }}>
                        <div className="card card-table flex-fill">

                            <div className="card-body">
                                <div className="table-responsive">

                                    {
                                        projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0
                                            ?
                                            <Table className="table-striped"
                                                pagination={{
                                                    total: projectDataDetails[0].allProjectFundingData.length,
                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                }}
                                                style={{ overflowX: 'auto' }}
                                                columns={columns}
                                                // bordered
                                                dataSource={projectDataDetails[0].allProjectFundingData}
                                                rowKey={record => record.id}
                                            // onChange={this.handleTableChange}
                                            />
                                            :

                                            <Table className="table-striped"
                                                pagination={{
                                                    total: tokenStd1.length,
                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                }}
                                                style={{ overflowX: 'auto' }}
                                                columns={columns}
                                                // bordered
                                                dataSource={tokenStd1}
                                                rowKey={record => record.id}
                                            // onChange={this.handleTableChange}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
