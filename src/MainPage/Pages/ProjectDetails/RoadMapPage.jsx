
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { CanvasJSChart } from 'canvasjs-react-charts'

import TimeLine from "react-gantt-timeline";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { useSelector } from 'react-redux';
import { selectAllRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { PieChart } from 'react-minimal-pie-chart';

const RoadmapPage = () => {
    const [showGatthChart, setShowGatthChart] = useState(false)
    const [data, setData] = useState([
        { id: 1, mainDesc: "Funding", subDesc: 'Seed Sale', noofworkingDays: '30', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Completed' },
        { id: 2, mainDesc: "Funding", subDesc: "Stragetic & Presale", noofworkingDays: '60', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Ongoing' },
    ]);

    const roadMapData = useSelector(selectAllRoadMapProjectDetails)
    const columns = [

        {
            title: 'Main Description',
            dataIndex: 'main_description',
            sorter: (a, b) => a?.main_description.localeCompare(b?.main_description),

            align: 'center',
            // sorter: (a, b) => a.main_description.length - b.main_description.length,
        },
        {
            title: 'Sub Description',
            dataIndex: 'sub_description',
            sorter: (a, b) => a?.sub_description.localeCompare(b?.sub_description),
            // sorter: (a, b) => a.sub_description.length - b.sub_description.length,
            align: 'center',
        },

        {
            title: 'Start Date',
            dataIndex: 'start_date',
            sorter: (a, b) => new Date(a?.start_date) - new Date(b?.start_date),

            // sorter: (a, b) => a.start_date.length - b.start_date.length,
            align: 'center',
        },
        {
            title: 'Number of Working Days',
            // dataIndex: 'no_of_working_days',

            render: (text, record) => (
                <div>

                    {Number(text?.no_of_working_days).toLocaleString("en-US")}
                </div>
            ),

            sorter: (a, b) => a?.no_of_working_days - b?.no_of_working_days,
            // sorter: (a, b) => a.no_of_working_days.length - b.no_of_working_days.length,
            align: 'center',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            sorter: (a, b) => new Date(a?.end_date) - new Date(b?.end_date),
            // sorter: (a, b) => a.end_date.length - b.end_date.length,
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a?.status.localeCompare(b?.status),
            // sorter: (a, b) => a.status.length - b.status.length,
            align: 'center',
        },


    ]

    const config = {
        header: {
            top: {
                style: {
                    background: "linear-gradient( grey, black)",
                    textShadow: "0.5px 0.5px black",
                    fontSize: 12
                }
            },
            middle: {
                style: {
                    background: "linear-gradient( orange, grey)",
                    fontSize: 9
                }
            },
            bottom: {
                style: {
                    background: "linear-gradient( grey, black)",
                    fontSize: 9,
                    color: "orange"
                },
                selectedStyle: {
                    background: "linear-gradient( #d011dd ,#d011dd)",
                    fontWeight: "bold",
                    color: "white"
                }
            }
        },
        taskList: {
            title: {
                label: "Main Description",
                style: {
                    background: "linear-gradient( grey, black)"
                }
            },
            task: {
                style: {
                    backgroundColor: "green",
                    color: "white"
                }
            },
            verticalSeparator: {
                style: {
                    backgroundColor: "#fbf9f9"
                },
                grip: {
                    style: {
                        backgroundColor: "red"
                    }
                }
            }
        },
        dataViewPort: {
            rows: {
                style: {
                    backgroundColor: "white",
                    borderBottom: "solid 0.5px silver"
                }
            },
            task: {
                showLabel: true,
                style: {
                    borderRadius: 1,
                    boxShadow: "2px 2px 8px #888888"
                }
            }
        }
    };
    const TodayDate = new Date();

    var date = TodayDate.toISOString().substr(0, 10);

    console.log(roadMapData, "roadMapData in reducer");

    const openEditMapfunc = () => {

        setShowGatthChart(true)
    }

    const goBacktoNormal = () => {
        setShowGatthChart(!showGatthChart)
    }


    
  const optionsss = {
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    title: {
      text: "Milestone",
      fontSize: 20,
      // verticalAlign: "bottom",
      dockInsidePlotArea: true
    },
    // subtitles: [{
    //     text: "71% Positive",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: (roadMapData.length > 0 ? roadMapData[0].mileStoneChartData: []),
    }]
  }

    return (

        <div className="card card-table flex-fill" style={{ border: 'none' ,margin:'0px' }}>

        {
          showGatthChart == false ?
            <div className="card-body">
  
              <div className="content container-fluid" style={{ padding: "0px" }}>
  
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Roadmap</h2>
                <div className="row mb-2" >
  
  
                  <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                { roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                            <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].no_of_milesones)}
                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
  
  
  
  
  
  
                              </h3>
  
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Number of Milestones</span>
                          </div>
  
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 " style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              {/* 112 */}
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {  roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                            <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_completed)}
                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3>
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Milestone completed</span>
                          </div>
  
                        </div>
                      </div>
                      <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {  roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                           <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_in_progress)}
                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3>
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Milestone in progress </span>
                          </div>
  
                        </div>
                      </div>
  
                      <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {
                                                            roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ? 
                                  <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].yet_to_start)}
                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3>
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Yet to start</span>
                          </div>
  
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              {/* 112 */}
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].milestone_overdue)}
                                                                    duration={1.5} />
                                                               :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3>
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Milestone Overdue</span>
                          </div>
  
                        </div>
                      </div>
                      <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                          <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>
  
                            <div className="widget-info-new">
                              <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
  
                                { roadMapData?.length > 0 && roadMapData[0]?.RoadMapDashboard?.length > 0 ?
                                                                <CountUp end={parseInt(roadMapData[0]?.RoadMapDashboard[0].reporting_cycles)}
                                                                    duration={1.5} />
                                                             :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3>
  
                            </div>
                            <span className="widget-box" style={{fontWeight:'600'}}>Reporting Cycles</span>
                          </div>
  
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3 pl-4" style={{ display: "flex", justifyContent: 'center', height: '500px' }}>
                 
                    <div style={{ height: '200px', width: '100%' }}>
                     
  
                        <div style={{ width: '100%', height: '270px' }}>
                          <CanvasJSChart options={optionsss} height="100%" width="100%" />
                        </div>
                       
  
                    </div> 
                
                      <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Milestone</h4>
                    
  
                  </div>
  
  
                </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
                <div className="col-md-12 " style={{ padding: '0px', display: 'flex', flexDirection: 'row' }}>
  
                </div>
  
  
  
                <div className="col-md-12" style={{ padding: '0px' }}>
  
  
                  <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                    <div className="col" style={{ padding: '0px' }}>
                      <div className="search " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <input
                          placeholder="Search"
                          style={{ width: '300px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        /> */}
  
  
                        {/* <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                          <h5 className="" style={{
                            fontWeight: '600', marginBottom: '0px', width: '40%'
                          }} >From Date:</h5>
                          <input className="form-control floating datetimepicker" type="date" max={toDate} onChange={(e) => changeFromDateFunc(e)} style={{ height: '35px', width: '155px' }} />
                        </div>
                        <div className="" style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                          <h5 className="" style={{
                            fontWeight: '600', marginBottom: '0px', width: '40%'
                          }}>To Date:</h5>
                          <input className="form-control floating datetimepicker" type="date" min={fromDateSearch} style={{ height: '35px', width: '155px' }} onChange={(e) => changeDateFunc(e)} />
                        </div> */}
                      </div>
                    </div>
                    <div className="col-auto float-right ml-auto" style={{ padding: '0px' }}>
                      
                      <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginRight: '10px' }} onClick={() => openEditMapfunc()}> View</button>
                    </div>
                  </div>
                </div>
  
  
  
  
  
  
  
  
  
                <div className="col-md-12" style={{ marginTop: '15px' }}>
  
                  <div className="row">
                    <div className="col-md-12" style={{ padding: '0px' }} >
                      <div className=" card-table flex-fill" style={{ height: "800px !important" }}>
  
                        <div className="card-body" style={{ height: "800px !important" }} >
                          <div className="table-responsive">
                            <Table className="table-striped"
                              pagination={{
                                total: roadMapData[0]?.Roadmap?.length,
                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                              }}
                              style={{ overflowX: 'auto' }}
                              columns={columns}
                              dataSource={roadMapData[0]?.Roadmap}
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
              <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', margin: '10px' }} onClick={() => goBacktoNormal()}>Back</button>
              <div className="time-line-container">
  
                {
                            roadMapData?.length > 0 && roadMapData[0]?.GattDAta?.length > 0 ?

                                <TimeLine data={roadMapData[0]?.GattDAta} config={config} mode="year" />
                                :
                                ''
                        }
              </div>
  
              <div>
                {/* <div style={{ width: '100%', height: '500px', marginTop: '10px' }}>
                  <CanvasJSChart options={options} height="100%" width="100%" />
                </div> */}
              </div>
            </div>
        }
  
      </div>
    );
}


export default RoadmapPage;
