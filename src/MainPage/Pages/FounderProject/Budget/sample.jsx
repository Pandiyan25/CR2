    {/* budget details end */}




// import {
//   ColumnDirective, ColumnsDirective, GanttComponent
// } from 'react-gantt-timeline';
      // (optional) column widths, etc.
    // e.preventDefault();
    // console.log(e,"event");

  // const addBultdata = async (i) =>{
  //   console.log(i,"maybedone");
  //   try{

  //   }catch(error){
  //     alert('this mite me',error.message)
  //   }
  // }

    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }









              {/* old design */}
              {/* 
              <div className="page-header">
                <div className="row align-items-center" style={{ width: '100%' }}>
                  <div className="col">
                    <h3 className="page-title" style={{ fontSize: '25px' }}>Budget</h3>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => openAddMapfunc()}> ADD</button>
                    <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> VIEW</button>
                  </div>
                </div>
              </div> */}
              {/* /Page Header */}
              {/* Search Filter */}

              {/* <div className="row filter-row">
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
                    <input className="form-control floating datetimepicker" type="date" min={disablePastDate()} style={{ height: '35px' }} onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-2" style={{ padding: '0px' }}>
                  <div className="">
                    <button className="btn2 add-btn3" onClick={() => getUserDetailsFunc()}> Search</button>
                  </div>
                </div> */}

              {/* </div>
              <div className="page-header">
                <div className="row align-items-center" style={{ width: '100%' }}>
                  <div className="col"> */}
              {/* <h3 className="page-title" style={{ fontSize: '25px' }}>Roadmap</h3> */}
              {/* </div>
                  <div className="col-auto float-right ml-auto">
                    <input className="btn add-btn-search" type="file" placeholder='Upload File' style={{ margin: '10px' }} onChange={(e) => uploadExcelData(e.target.files[0])} /> */}
              {/* <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> Upload File</button> */}
              {/* <Upload
                      accept="application/vnd.xlsx"
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={(e) => {uploadExcelData(e.target.files[0]);
                      }
                    >
                      <div className="ant-upload-text">Upload</div>

                    </Upload> */}
              {/* <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => downloadBugetDatafunc()}> Download Sample Format</button>
                  </div>
                </div>
              </div> */}

              {/* <div className="row filter-row">
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <div>
                                <input className="form-control floating datetimepicker" type="date" />
                            </div>
                            <label className="focus-label">From</label>
                        </div>
                        
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <div>
                                <input className="form-control floating datetimepicker" type="date" />
                            </div>
                            <label className="focus-label">To</label>
                        </div>
                    </div>
                   
                    <div className="col-sm-6 col-md-3">
                        <a href="#" className="btn btn-success btn-block"> Search </a>
                    </div>
                </div> */}
              {/* /Search Filter */}
              {/* old design end */}












{/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box">Life Time Budget </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}>
                              {bannersData?.length > 0 && bannersData[0]?.lifetime_budget != 0 ?
                                <CountUp end={parseInt(bannersData[0].lifetime_budget)}
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }

                            </h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3>
                      </div>
                    </div> */}
                    {/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box">Actual Expense Till Date </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> 
                            {bannersData?.length > 0 && bannersData[0]?.actual_expense_till_date != 0 ?
                                <CountUp end={parseInt(bannersData[0].actual_expense_till_date)}
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                            <CountUp end={4859350}
                              duration={1.5} />
                              </h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Info from budget page</h3>
                      </div>
                    </div> */}
                    {/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box"> Balance Budget </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> 
                            <CountUp end={140650}
                              duration={1.5} /></h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Calculate</h3>
                      </div>
                    </div> */}







                    {/* <div className="row">

                    <div className="col-md-12 " style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <label style={{ marginRight: '15px', color: 'black', fontWeight: '500' }}>Select Reporting Cycle Frequency <span className="text-danger">*</span></label>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '190px' }}>
                            <div style={{ width: '100%' }} >
                              <select className="form-control btn-block-height square-edges" > */}
                  {/* <option style={{ fontSize: '13px' }} value="Monthly">Monthly</option> */}
                  {/* <option style={{ fontSize: '13px' }} value="Quarter ">Quarter </option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </div> */}

                  {/* <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="form-group">
                          <button style={{ border: '2px solid #6345ED', color: '#6345ED', borderRadius: '50px', width: '100px', height: '40px' }} onClick={() => changeFunc()}>
                            Change
                          </button>
                        </div>
                      </div> */}
                  {/* </div>
                  </div> */}
                  {/* <div className="row"> */}
                  {/* <div className="col-md-4 ">
                  <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                      <span className="widget-box">Select Reporting Cycle Frequency :</span>
                      <div className="widget-info-new">
                        112
                        <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>Month or Quarter</h5>

                      </div>
                    </div>

                    <h3 className="mainFontH4">Select Option</h3>
                  </div>
                </div> */}
                  {/* <div className="col-md-12 ">

                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">No of Reporting Cycles </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> */}
                  {/* {bannersData?.length > 0 && bannersData[0]?.no_of_reporting_cycles != null && bannersData[0]?.no_of_reporting_cycles != undefined && bannersData[0]?.no_of_reporting_cycles != 0 ?

                                  <CountUp end={bannersData[0]?.no_of_reporting_cycles}
                                    duration={1.5} />
                                  :

                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3> */}
                  {/* 
                            </div>
                          </div>
                        </div> */}

                  {/* <h3 className="mainFontH4">calculate based on select option</h3> */}
                  {/* </div>
                    </div>
                    <div className="col-md-12 ">

                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Shortfall/ Excess Cash Flow </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}>
                                <CountUp end={859350}
                                  duration={1.5} /></h3> */}
                  {/* <h3 className="mainFontH5" style={{ marginBottom: '0px' }}>
                                {bannersData?.length > 0 && bannersData[0]?.no_of_reporting_cycles != null && bannersData[0]?.no_of_reporting_cycles != undefined && bannersData[0]?.no_of_reporting_cycles != 0 ?

                                  <CountUp end={bannersData[0]?.excess_cash_flow}
                                    duration={1.5} />
                                  :

                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                </h3> */}

                  {/* </div>
                          </div> */}

                  {/* <h3 className="mainFontH4">calculate based on select option</h3> */}
                  {/* </div>
                      </div>
                    </div> */}
                  {/* </div> */}
                  {/* <div className="row">
                    <div className="col-md-12 "> */}

                  {/* <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Budget Start Date </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* 
                              <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>{bannersData?.length > 0 && bannersData[0]?.project_start_date}</h5>

                            </div>
                          </div> */}

                  {/* <h3 className="mainFontH4">Select Option</h3> */}
                  {/* </div>
                      </div>
                    </div>
                    <div className="col-md-12 "> */}
                  {/* 
                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Budget End Date </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>{bannersData?.length > 0 && bannersData[0]?.project_end_date}</h5>

                            </div>
                          </div>
                        </div> */}

                  {/* <h3 className="mainFontH4">Select Option</h3> */}
                  {/* </div>
                    </div>
                  </div> */}
              {/* <AddRoadMap show={showAddPage} handleClose={onHandleClose} />
            <EditRoadMap show={showEditPage} handleClose={onHandleEditClose} /> */}






             {/* <GanttComponent dataSource={gattDAta} taskFields={taskFields} height='400px' rowHeight={65} borderRadius={'15px'} >
                <ColumnsDirective> */}
              {/* <ColumnDirective field='TaskID' width='80'></ColumnDirective> */}
              {/* <ColumnDirective
                    field="TaskName"
                    headerText="Project Name"
                    width="250"
                    clipMode="EllipsisWithTooltip"
                  ></ColumnDirective> */}
              {/* <ColumnDirective field="StartDate"></ColumnDirective>
              <ColumnDirective field="Duration"></ColumnDirective>
              <ColumnDirective field="Progress"></ColumnDirective>
              <ColumnDirective field="Predecessor"></ColumnDirective> */}
              {/* </ColumnsDirective>
              </GanttComponent> */}


{/* DayWidth<input type="range" min="30" max="500" value={this.state.daysWidth} onChange={this.handleDayWidth} step="1"/>
       Item Height<input type="range" min="30" max="500" value={this.state.itemheight} onChange={this.handleItemHeight} step="1"/> */}
            {/* <TimeLine data={dataGantt} config={config} nonEditableName={true} height='40px' /> */}
           




              {/* <div style={{ width: '100%', height: '500px', marginTop: '10px' }}> */}

              {/* <div style={{ width: '100%', height: '500px' }}>
                <CanvasJSChart options={options} height="100%" width="100%" />
              </div> */}
              {/* </div> */}








              
              <div className="col" style={{ textAlign: "center" }}>
              {
                bannersData.length > 0 && bannersData[0].allocated_budget != undefined && bannersData[0].allocated_budget != null ?


                  <PieChart
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    labelPosition={45}
                    lineWidth={20}
                    data={[
                      { title: bannersData[0].unallocated_budget, value: bannersData[0].unallocated_budget, color: '#94B3E8' },
                      { title: bannersData[0].allocated_budget, value: bannersData[0].allocated_budget, color: '#6345ED' },
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
                      // { title: 0, value: 1, color: '#6345ED' },
                    ]}
                  />
              }

              {/* <img className="chart" src={chart}></img> */}
              <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Allocated Vs Unallocated Expense</h4>
            </div>








