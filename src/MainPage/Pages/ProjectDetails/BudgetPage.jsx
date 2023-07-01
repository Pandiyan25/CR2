
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { CanvasJSChart } from 'canvasjs-react-charts'
// import {
//   ColumnDirective, ColumnsDirective, GanttComponent
// } from 'react-gantt-timeline';
import { Button } from 'reactstrap';
import TimeLine from "react-gantt-timeline";
import CountUp from 'react-countup';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import { apiURI } from '../../../config/config';
import writeXlsxFile from 'write-excel-file'
import { async } from 'regenerator-runtime';
import readXlsxFile from 'read-excel-file'

import CNYimaage from '../FounderProject/Funding/assets/images/CNY.png' 
import usdimage from '../FounderProject/Funding/assets/images/USD.png' 
import EURimage from '../FounderProject/Funding/assets/images/EUR.png' 
import POUNDimage  from '../FounderProject/Funding/assets/images/POUND.png'
import YUANimage  from '../FounderProject/Funding/assets/images/YUAN.png'
import YENimage  from '../FounderProject/Funding/assets/images/YEN.png'
import CADimage  from '../FounderProject/Funding/assets/images/CAD.png'
import SGDimage  from '../FounderProject/Funding/assets/images/SGD.png'
import AUDimage  from '../FounderProject/Funding/assets/images/AUD.png'
import DAIimage  from '../FounderProject/Funding/assets/images/DAI.png'
import BUSDimage  from '../FounderProject/Funding/assets/images/BUSD.png'
import INRimage  from '../FounderProject/Funding/assets/images/INR.png'
import USDCimage  from '../FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../FounderProject/Funding/assets/images/RUBBLE.png' 
import { Upload, Icon, message } from 'antd';
import { selectAllBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { selectAllBudgetBanner } from '../../../reducers/BugetBannerSlice';
import { PieChart } from 'react-minimal-pie-chart';
import { selectAllFundingProjectDetails } from '../../../reducers/FundingProjectSlice';

const BudgetPage = () => {
  // 
  const getBudgetDataMain = useSelector(selectAllBudgetProjectDetails)
  
  const projectFundingProjecDetails = useSelector(selectAllFundingProjectDetails)
  const getBudgetBannerData = useSelector(selectAllBudgetBanner)
  const [checkPage, setCheckPage] = useState('')
  const [tokenStd, settokenStd] = useState([])
  const projectNumber = useSelector((state) => state.constVar.projectId)
  const [showGatthChart, setShowGatthChart] = useState(false)
  const [gattDAta, setGattDAta] = useState([])

  const [fromDateSearch, setFromDateSearch] = useState('')
  var date = new Date();


  const expenseWisePieChartData = useSelector(selectAllBudgetProjectDetails)
  console.log(expenseWisePieChartData,"expenseWisePieChartData");


  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);


  const columns = [

    {
      title: 'Main Expense Head',
      dataIndex: 'main_expense_head',

      align: 'center',
      sorter: (a, b) => a.main_expense_head.localeCompare(b.main_expense_head),
    },
    {
      title: 'Sub Expense Head',
      dataIndex: 'sub_expense_head',
      sorter: (a, b) => a.main_expense_head.localeCompare(b.main_expense_head),
      // sorter: (a, b) => a.subExpenseHead.length - b.subExpenseHead.length,
      align: 'center',
    },
    {
      title: 'Expense Frequency in Days',
      // dataIndex: 'expense_frequency',

      render: (text, record) => (
        <div>

          {Number(text?.expense_frequency).toLocaleString("en-US")}
        </div>
      ),
      // {Number(text?.no_of_tokens).toLocaleString("en-US")}}

      sorter: (a, b) => a.expense_frequency - b.expense_frequency,
      align: 'center',
    },
    {
      title: 'Expense per Cycle',
      // dataIndex: 'expense_per_cycle',

      // sorter: (a, b) => a?.expense_per_cycle.localeCompare(b?.expense_per_cycle),
      render: (text, record) => (
        <div>

          {Number(text?.expense_per_cycle).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.expense_per_cycle - b.expense_per_cycle,
      // sorter: (a, b) => a.ExpensePerCycle.length - b.ExpensePerCycle.length,
      align: 'center',
    },
    {
      title: 'Life time Budget',
      // dataIndex: 'life_time_budget',

      render: (text, record) => (
        <div>

          {Number(text?.life_time_budget).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.life_time_budget - b.life_time_budget,
      // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
      align: 'center',
    },

    {
      title: 'Actual Expense Till Date',
      // dataIndex: 'actual_expense_till_date',

      render: (text, record) => (
        <div>

          {Number(text?.actual_expense_till_date).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.actual_expense_till_date - b.actual_expense_till_date,
      // sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
      align: 'center',
    },
    // {
    //   title: 'Units/Quantity',
    //   dataIndex: 'unit',

    //   sorter: (a, b) => a.unit.length - b.unit.length,
    //   align: 'center',
    // },

    // {
    //   title: 'No. Of Expense Cycle',
    //   dataIndex: 'no_of_expense_cycle',
    //   sorter: (a, b) => a.expcycle.length - b.expcycle.length,
    //   align: 'center',
    // },




    // {
    //   title: 'Balance Budget',
    //   dataIndex: 'balance',
    //   sorter: (a, b) => a.balance.length - b.balance.length,
    //   align: 'center',
    // },

    {
      title: 'Start Date',
      dataIndex: 'start_date',
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      align: 'center',
    },

    {
      title: 'End Date',
      dataIndex: 'end_date',
      sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
      align: 'center',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    // {
    //   title: 'Time Task',
    //   dataIndex: 'time_task',
    //   sorter: (a, b) => a.balance.length - b.balance.length,
    //   align: 'center',
    // },
    

  ]


  


  const config2 = {
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

  

  const openEditMapfunc = () => {
    setShowGatthChart(true)
  }

  const goBacktoNormal = () => {
    setShowGatthChart(false)
  }

  // useEffect(()=>{
  //   if(getBudgetData != null && getBudgetData != undefined && getBudgetData.length > 0 ){
  //       var arr = []
  //       for (var i = 0; i < getBudgetData[0].length; i++) {
  //           arr.push({
  //             name: getBudgetData[0][i].main_expense_head,
  //             start: getBudgetData[0][i].start_date,
  //             end: getBudgetData[0][i].end_date,
  //             id: i + 1,
  //             color: "orange"
  //           })
  //           setGattDAta(arr)
  //         }
  //   }
    
  // },[getBudgetData])

 

  const options = {
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    title: {
      text: "Expense Wise",
      fontSize: 20,
      // verticalAlign: "bottom",
      dockInsidePlotArea: true
    },
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###''",
      dataPoints: expenseWisePieChartData[0].mainaee,
    }]
  }


  console.log(getBudgetDataMain, "getBudgetDataMainData");
  return (

   
    <div className="card card-table flex-fill" style={{ border: '0px', margin: '0px' }}>
      {
        showGatthChart == false ?
          <div className="card-body">


            <div className="content container-fluid" style={{padding:'0px'}}>

              {/* budget detail */}
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Budget</h2>
              <div className="row mb-2" >


                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            <div style={{ display: "flex", alignItems: "center" }}>
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
                              {/* 112 */}
                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>



                              {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.spent_budget_till_date != null && getBudgetBannerData[0]?.spent_budget_till_date != undefined && getBudgetBannerData[0]?.spent_budget_till_date != 0 ?
                            <CountUp end={parseInt(getBudgetBannerData[0].spent_budget_till_date)}

                                    separator=","
                                    // prefix="EUR "
                                    // suffix=" left"
                                    // {Number(text?.no_of_tokens).toLocaleString("en-US")}}
                                    // decimals={4}
                                    // decimal=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={705450}
                              duration={1.5} /> */}

                              </h3></div>


                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}>Spent Budget till Date </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 " style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
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

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4153900}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}>Unspent Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
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

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4000000}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}>Funds Raised till Date </span>
                        </div>

                        {/* <h3 className="mainFontH4">Take info from fund raise tab of founders</h3> */}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            <div style={{ display: "flex", alignItems: "center" }}>
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
                              {/* 112 */}
                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {getBudgetBannerData?.length > 0 && getBudgetBannerData[0]?.total_budget != null && getBudgetBannerData[0]?.total_budget != undefined && getBudgetBannerData[0]?.total_budget != 0 ?
                          <CountUp end={parseInt(getBudgetBannerData[0].total_budget)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={50000000}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}>Total Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
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

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4859350}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}>Allocated Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
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

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={140650}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box" style={{fontWeight:'600'}}> Unallocated Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Calculate</h3> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12 pl-4" style={{ display: "flex", marginBottom: '40px' }}> */}
                {/* <div className=""> */}
                {/* row */}
                {/* <div className="col" style={{ textAlign: "center" }}> */}
                {expenseWisePieChartData.length > 0 && expenseWisePieChartData[0].mainaee.length  ?
                  // <PieChart
                  //   animate
                  //   animationDuration={500}
                  //   animationEasing="ease-out"
                  //   labelPosition={45}
                  //   lineWidth={20}
                  //   data={expenseWisePieChartData}
                  // />
                  // :
                  // <PieChart
                  //   animate
                  //   animationDuration={500}
                  //   animationEasing="ease-out"
                  //   labelPosition={45}
                  //   lineWidth={20}
                  //   data={[
                  //     { title: 10, value: 10, color: '#94B3E8' },
                  //     { title: 0, value: 0, color: '#6345ED' },
                  //   ]}
                  // />
                  <div style={{ width: '50%', height: '500px' }}>
                    <CanvasJSChart options={options} height="100%" width="100%" />
                  </div>
                  :
                  ''
                }


              </div>


              <div className="col-md-12 " style={{ padding: '0px', display: 'flex', flexDirection: 'row', marginTop: '40px' }}>


              </div>




              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center mb-3" style={{ width: '100%', margin: '0px' }}>
                  
                  <div className="col-auto float-right ml-auto " style={{ padding: '0px' }}>
                   
                    <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginRight: '10px' }} onClick={() => openEditMapfunc()}> View</button>
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
  );
}


export default BudgetPage;
