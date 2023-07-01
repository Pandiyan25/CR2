
        <div className="card card-table flex-fill">

        {
            showGatthChart == false ?
                <div className="card-body">

                    <div className="content container-fluid" style={{ paddingTop: "30px" }}>

                        {/* budget detail */}
                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Roadmap</h2>
                        <div className="row mb-2" >


                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                                <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].no_of_milesones)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={705450}
                        duration={1.5} /> */}






                                                    </h3>


                                                </div>
                                                <span className="widget-box">Number of Milestones</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 ">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_completed)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={4153900}
                        duration={1.5} /> */}
                                                    </h3>

                                                </div>
                                                <span className="widget-box">Milestone completed</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 col-md-12 col-sm-12">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_in_progress)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={4000000}
                        duration={1.5} /> */}
                                                    </h3>

                                                </div>
                                                <span className="widget-box">Milestone in progress </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Take info from fund raise tab of founders</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].yet_to_start)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={50000000}
                        duration={1.5} /> */}
                                                    </h3>

                                                </div>
                                                <span className="widget-box">Yet to start</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_overdue)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={4859350}
                        duration={1.5} /> */}
                                                    </h3>

                                                </div>
                                                <span className="widget-box">Milestone Overdue</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className=" col-lg-6 col-md-12 col-sm-12">
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].reporting_cycles)}
                                                                    duration={1.5} />
                                                                :
                                                                <CountUp end={0}
                                                                    duration={1.5} />
                                                        }
                                                        {/* <CountUp end={140650}
                        duration={1.5} /> */}
                                                    </h3>

                                                </div>
                                                <span className="widget-box">Reporting Cycles</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Calculate</h3> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 mb-3 pl-4" style={{ display: "flex", justifyContent: 'center', height: '500px' }}>
                                {/* <div className="row">
                                    <div className="col" style={{ textAlign: "center" }}> */}
                                        <div style={{ height: '200px', width: '100%' }}>
                                            <div style={{ width: '100%', height: '270px' }}>
                                                <CanvasJSChart options={optionsss} height="100%" width="100%" />
                                            </div>
                                        </div>
                                        <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Milestone</h4>
                                    {/* </div>
                                </div> */}
                            </div>


                        </div>

                        <div className="col-md-12" style={{ padding: '0px', marginTop: '40px' }}>


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

                                <div className="col-auto float-right ml-auto">

                                    <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => openEditMapfunc()}> View</button>
                                </div>
                            </div>
                        </div>









                        <div className="col-md-12">

                            <div className="row">
                                <div className="col-md-12" style={{ padding: '0px' }} >
                                    <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                                        <div className="card-body" style={{ height: "800px !important" }} >
                                            <div className="table-responsive">

                                                {

                                                    roadMapData?.length > 0 && roadMapData[0]?.Roadmap?.length > 0 ?
                                                        <Table className="table-striped"
                                                            pagination={{
                                                                total: roadMapData[0]?.Roadmap?.length,
                                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                            }}
                                                            style={{ overflowX: 'auto' }}
                                                            columns={columns}
                                                            // bordered
                                                            dataSource={roadMapData[0]?.Roadmap}
                                                            rowKey={record => record.id}
                                                        // onChange={this.handleTableChange}
                                                        />
                                                        :
                                                        ''
                                                }

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
                    <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', margin: '10px' }} onClick={() => goBacktoNormal()}>Back</button>
                    <div className="time-line-container">
                        {
                            roadMapData?.length > 0 && roadMapData[0]?.GattDAta?.length > 0 ?

                                <TimeLine data={roadMapData[0]?.GattDAta} config={config} mode="year" />
                                :
                                ''
                        }

                    </div>

                </div>
        }


    </div>