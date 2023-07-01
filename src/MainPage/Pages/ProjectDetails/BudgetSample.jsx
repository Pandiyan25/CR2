{
    showGatthChart == false ?
      <div className="card-body">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center" style={{ width: '100%' }}>
              <div className="col">
                <h3 className="page-title" style={{ fontSize: '25px' }}>Budget</h3>
              </div>
              <div className="col-auto float-right ml-auto">
                  <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> VIEW</button>
              </div>
            </div>
          </div>

          <div className="row filter-row">
            <div className="col-md-3" style={{ padding: '0px' }}>
              <div className="dateDiv">
                <h5 style={{
                  fontWeight: '600', marginBottom: '0px'
                }}>Current Date:</h5>
                <h5 style={{ marginBottom: '0px' }}>{datetime}</h5>
              </div>
            </div>
            <div className="col-md-7 dateMainDiv">
              <div className="subMainDiv">
                <h5 className="subMainDivH5" style={{
                  fontWeight: '600', marginBottom: '0px'
                }} >From Date:</h5>
                <input className="form-control floating datetimepicker" type="date" onChange={(e) => setFromDateSearch(e.target.value)} style={{ height: '35px' }} />
              </div>
              <div className="subMainDiv">
                <h5 className="subMainDivH5" style={{
                  fontWeight: '600', marginBottom: '0px'
                }}>To Date:</h5>
                <input className="form-control floating datetimepicker" type="date" min={disablePastDate()} style={{ height: '35px' }} />
              </div>
            </div>
            <div className="col-md-2" style={{ padding: '0px' }}>
              <div className="">
                <button className="btn2 add-btn3"> Search</button>
              </div>
            </div>

          </div>

          <div className="col-md-12">
          {getBudgetData?.length > 0 && getBudgetData[0]?.length > 0 ? 
            <div className="row">
              <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="card card-table flex-fill">

                  <div className="card-body">
                    <div className="table-responsive">
                      <Table className="table-striped"
                        pagination={{
                          total: getBudgetData[0].length,
                          showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }}
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        dataSource={getBudgetData[0]}
                        rowKey={record => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :''}
          </div>

          {getBudgetData?.length > 0 && getBudgetData[0]?.length > 0 ? 
          <div className="col-md-12">
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Life Time Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={50000000}
                      duration={1.5} /></h3>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Actual Expense Till Date </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4859350}
                      duration={1.5} /></h3>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text"> Balance Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={140650}
                      duration={1.5} /></h3>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Total Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={50000000}
                      duration={1.5} /></h3>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Allocated Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4859350}
                      duration={1.5} /></h3>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text"> Unallocated Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={140650}
                      duration={1.5} /></h3>

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Spent Budget till Date </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={705450}
                      duration={1.5} /></h3>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Unspent Budget </span>
                  <div className="dash-widget-info">
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4153900}
                      duration={1.5} /></h3>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <span className="dash-widget-text">Funds Raised till Date </span>
                  <div className="dash-widget-info">
                    {/* 112 */}
                    <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4000000}
                      duration={1.5} /></h3>

                  </div>
                </div>

                {/* <h3 className="mainFontH4">Take info from fund raise tab of founders</h3> */}
              </div>
            </div>
          </div>

          <div className="row">

            <div className="col-md-12 " style={{ display: 'flex', alignItems: 'center' }}>
              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <label style={{ marginRight: '15px', color: 'black', fontWeight: '500' }}>Select Reporting Cycle Frequency <span className="text-danger">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '190px' }}>
                    <div style={{ width: '100%' }} >
                      <select className="form-control btn-block-height square-edges" >
                        <option style={{ fontSize: '13px' }} value="Monthly">Monthly</option>
                        <option style={{ fontSize: '13px' }} value="Quarter ">Quarter </option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className="form-group">
                  <button style={{ border: '2px solid #6345ED', color: '#6345ED', borderRadius: '50px', width: '100px', height: '40px' }} onClick={() => changeFunc()}>
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">

              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className=" card dash-widget" style={{ height: '45px', padding: '0px', border: '0px' }}>
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span className="dash-widget-text">No of Reporting Cycles </span>
                    <div className="dash-widget-info">
                      <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={49}
                        duration={1.5} /></h3>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 ">

              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className=" card dash-widget" style={{ height: '45px', padding: '0px', border: '0px' }}>
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span className="dash-widget-text">Shortfall/ Excess Cash Flow </span>
                    <div className="dash-widget-info">
                      <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={859350}
                        duration={1.5} /></h3>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 ">

              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className=" card dash-widget" style={{ height: '45px', padding: '0px', border: '0px' }}>
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span className="dash-widget-text">Budget Start Date </span>
                    <div className="dash-widget-info">
                      <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>12/09/2022</h5>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-md-12 ">

              <div className="col-md-6" style={{ padding: '0px' }}>
                <div className=" card dash-widget" style={{ height: '45px', padding: '0px', border: '0px' }}>
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <span className="dash-widget-text">Budget End Date </span>
                    <div className="dash-widget-info">
                      <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>12/10/2022</h5>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          </div>
          :
          ''
          }
        </div>
      </div>
      :
      <div className="app-container">
        <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', marginBottom: '15px' }} onClick={() => goBacktoNormal()}>Back</button>
        <div className="time-line-container">
          
          <TimeLine data={gattDAta} />

        </div>
      </div>
  }






  
  <div className="card card-table flex-fill" style={{ border: '0px', margin: '0px' }}>
  {
  showGatthChart == false ?
    <div className="card-body">


      <div className="content container-fluid">

        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Budget</h2>
        <div className="row mb-2" >


          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
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
                      <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.spent_budget_till_date != null && getBudgetBannerData[0]?.spent_budget_till_date != undefined && getBudgetBannerData[0]?.spent_budget_till_date != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].spent_budget_till_date)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }

                      </h3>

                      </div>

                    </div>
                    <span className="widget-box">Spent Budget till Date </span>
                  </div>

                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                      
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

                      <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.unspent_budget != null && getBudgetBannerData[0]?.unspent_budget != undefined && getBudgetBannerData[0]?.unspent_budget != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].unspent_budget)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }
                      </h3>

                    </div>
                    </div>
                    <span className="widget-box">Unspent Budget </span>
                  </div>

                </div>
              </div>
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                      
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
                      <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.funds_raised_till_date != null && getBudgetBannerData[0]?.funds_raised_till_date != undefined && getBudgetBannerData[0]?.funds_raised_till_date != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].funds_raised_till_date)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }
                      </h3>

                      </div>
                    </div>
                    <span className="widget-box">Funds Raised till Date </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                      
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
                      <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.total_budget != null && getBudgetBannerData[0]?.total_budget != undefined && getBudgetBannerData[0]?.total_budget != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].total_budget)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }
                      </h3>

                      </div>
                    </div>
                    <span className="widget-box">Total Budget </span>
                  </div>

                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                      
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
                      <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.allocated_budget != null && getBudgetBannerData[0]?.allocated_budget != undefined && getBudgetBannerData[0]?.allocated_budget != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].allocated_budget)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }
                      </h3>
                    </div>

                    </div>
                    <span className="widget-box">Allocated Budget </span>
                  </div>
                </div>
              </div>
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                  <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                    <div className="widget-info-new">
                      
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
                      <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                        {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.unallocated_budget != null && getBudgetBannerData[0]?.unallocated_budget != undefined && getBudgetBannerData[0]?.unallocated_budget != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].unallocated_budget)}
                            duration={1.5} />
                          :
                          <CountUp end={0}
                            duration={1.5} />
                        }
                      </h3>

                      </div>
                    </div>
                    <span className="widget-box"> Unallocated Budget </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 pl-4" style={{ display: "flex", marginBottom: '40px' }}>
            <div className="row">
              <div className="col" style={{ textAlign: "center" }}>
                {
                  getBudgetBannerData.length > 0 && getBudgetBannerData[0].allocated_budget != undefined && getBudgetBannerData[0].allocated_budget != null ?

                  
                  <PieChart
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  labelPosition={45}
                  lineWidth={20}
                  data={[
                    { title: getBudgetBannerData[0].unallocated_budget, value: getBudgetBannerData[0].unallocated_budget, color: '#94B3E8' },
                    { title: getBudgetBannerData[0].allocated_budget, value: getBudgetBannerData[0].allocated_budget, color: '#6345ED' },
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
                    { title: 10, value: 10, color: '#94B3E8' },
                    { title: 0, value: 0, color: '#6345ED' },
                  ]}
                />
                }
                <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Allocated Vs Unallocated Expense</h4>
              </div>
              <div className="col" style={{ textAlign: "center" }}>
              {expenseWisePieChartData.length > 0 && expenseWisePieChartData[0].expenseChart.length > 0 ?
                  <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    labelPosition={45}
                    lineWidth={20}
                    data={expenseWisePieChartData[0].expenseChart}
                  />
                  :
                  <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    labelPosition={45}
                    lineWidth={20}
                    data={[
                      { title: 10, value: 10, color: '#94B3E8' },
                      { title: 0, value: 0, color: '#6345ED' },
                    ]}
                  />
                }
                <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Expense Wise</h4>
              </div></div>
          </div>


        </div>
    

        {/* <div className="col-md-12 " style={{ padding: '0px',display:'flex',flexDirection:'row',marginTop:'40px' }}>


            <div className="" style={{display:'flex',alignItems:'center'}}>
              <h5 className="" style={{
                fontWeight: '600', marginBottom: '0px',width:'40%' 
              }} >From Date:</h5>
              <input className="form-control floating datetimepicker" type="date" max={disableFutureDate()} onChange={(e) => changeFromDateFunc(e)} style={{ height: '35px' ,width:'155px'}} />
            </div>
            <div className="" style={{display:'flex',alignItems:'center',marginLeft:'30px'}}>
              <h5 className="" style={{
                fontWeight: '600', marginBottom: '0px',width:'40%'
              }}>To Date:</h5>
              <input className="form-control floating datetimepicker" type="date" min={disablePastDate()} style={{ height: '35px',width:'155px' }} onChange={(e) => changeDateFunc(e)} />
            </div>
          </div> */}




        <div className="col-md-12" style={{ padding: '0px' }}>


          <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
            <div className="col" style={{ padding: '0px' }}>
              <div className="search mt-4 mb-2">
                <input
                  placeholder="Search"
                  style={{ width: '300px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
               
                />
              </div>
            </div>
          </div>
        </div>





        <div className="col-md-12">

          <div className="row">
            <div className="col-md-12" style={{ padding: '0px' }} >
              <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                <div className="card-body" style={{ height: "800px !important" }} >
                  <div className="table-responsive">
                    <Table className="table-striped"
                      pagination={{
                        total: getBudgetDataMain.length > 0 ? getBudgetDataMain[0].budget.length : 0 ,
                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                      }}
                      style={{ overflowX: 'auto' }}
                      columns={columns}
                      dataSource={getBudgetDataMain.length > 0 ? getBudgetDataMain[0].budget : []}
                      rowKey={record => record.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>





    </div>
    :
    <div className="app-container">
      <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', marginBottom: '15px' }} onClick={() => goBacktoNormal()}>Back</button>
       <div className="time-line-container">
       
        <TimeLine data={gattDAta} config={config2} mode="year" />

        </div>
      <div>
        
      </div>
    </div>
}
</div>