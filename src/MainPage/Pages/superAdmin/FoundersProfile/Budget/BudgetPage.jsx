
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import './budget.css';
// import {
//   ColumnDirective, ColumnsDirective, GanttComponent
// } from 'react-gantt-timeline';
import TimeLine from "react-gantt-timeline";
import CountUp from 'react-countup';
import { Table } from 'antd';
import { itemRender, onShowSizeChange } from "../../../../paginationfunction"
import { apiURI } from '../../../../../config/config';
import writeXlsxFile from 'write-excel-file'
import { async } from 'regenerator-runtime';
import readXlsxFile from 'read-excel-file'

import { Upload, Icon, message } from 'antd';

const BudgetPage = () => {

  const [checkPage, setCheckPage] = useState('')
  const [tokenStd, settokenStd] = useState([])
  
  const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

  const loginId = useSelector((state) => state.constVar.profileIdValidator)
  const [showGatthChart, setShowGatthChart] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [gattDAta, setGattDAta] = useState([])

  var date = new Date();

 

  const datetime =

    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" + date.getFullYear();


 

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
      sorter: (a, b) => a.mainExpenseHead.length - b.mainExpenseHead.length,
    },
    {
      title: 'Sub Expense Head',
      dataIndex: 'sub_expense_head',
      sorter: (a, b) => a.subExpenseHead.length - b.subExpenseHead.length,
      align: 'center',
    },

    {
      title: 'Expense per Cycle',
      dataIndex: 'expense_per_cycle',
      sorter: (a, b) => a.ExpensePerCycle.length - b.ExpensePerCycle.length,
      align: 'center',
    },
    {
      title: 'Units/Quantity',
      dataIndex: 'unit',

      sorter: (a, b) => a.unit.length - b.unit.length,
      align: 'center',
    },
    {
      title: 'Expense Frequency in Days',
      dataIndex: 'expense_frequency',
      sorter: (a, b) => a.frequency.length - b.frequency.length,
      align: 'center',
    },
    {
      title: 'No. Of Expense Cycle',
      dataIndex: 'no_of_expense_cycle',
      sorter: (a, b) => a.expcycle.length - b.expcycle.length,
      align: 'center',
    },

    {
      title: 'Life time Budget',
      dataIndex: 'life_time_budget',
      sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
      align: 'center',
    },

    {
      title: 'Actual Expense Till Date',
      dataIndex: 'actual_expense_till_date',
      sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
      align: 'center',
    },

    {
      title: 'Balance Budget',
      dataIndex: 'balance',
      sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    {
      title: 'Start Date',
      dataIndex: 'start_date',
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    {
      title: 'End Date',
      dataIndex: 'end_date',
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    {
      title: 'Time Task',
      dataIndex: 'time_task',
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    }

  ]

 

  const openEditMapfunc = () => {
    setShowGatthChart(true)
  }
  const openAddMapfunc = () => {
    setShowAddPage(true)
  }







  const getUserDetailsFunc = () => {

    try {


      var query = `query Query($project: ID) {
        allProjectBudgets(project: $project) {
          _id
          main_expense_head
          sub_expense_head
          expense_per_cycle
          unit
          expense_frequency
          no_of_expense_cycle
          life_time_budget
          actual_expense_till_date
          balance
          start_date
          end_date
          status
          time_task
        }
      }`;

      fetch(apiURI.URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME

        },
        body: JSON.stringify({
          query,
          variables: {
            "project": projectNumber
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.allProjectBudgets);
          if (data?.data?.allProjectBudgets != null && data?.data?.allProjectBudgets != undefined && data?.data?.allProjectBudgets.length > 0) {
            setCheckPage(data?.data?.allProjectBudgets[0]._id)
            settokenStd(data?.data?.allProjectBudgets)
            var arr = []
            for(var i = 0; i < data?.data?.allProjectBudgets.length ; i++){
              arr.push({
                name:data?.data?.allProjectBudgets[i].main_expense_head,
                start:data?.data?.allProjectBudgets[i].start_date,
                end:data?.data?.allProjectBudgets[i].end_date,
                id:i+1,
                color: "orange"
              })
              setGattDAta(arr)
            }
          } else {
            setCheckPage('')
          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }

  useEffect(() => {
    if (projectNumber != '') {
      getUserDetailsFunc()
    }

  }, [projectNumber])

  const goBacktoNormal = () =>{
    setShowGatthChart(false)
  }

  return (

    <div className="card card-table flex-fill" style={{ border: '0px', margin: '0px' }}>
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
              {/* /Page Header */}
              {/* Search Filter */}

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
                    <input className="form-control floating datetimepicker" type="date" style={{ height: '35px' }} />
                  </div>
                  <div className="subMainDiv">
                    <h5 className="subMainDivH5" style={{
                      fontWeight: '600', marginBottom: '0px'
                    }}>To Date:</h5>
                    <input className="form-control floating datetimepicker" type="date" style={{ height: '35px' }} />
                  </div>
                </div>
                <div className="col-md-2" style={{ padding: '0px' }}>
                  <div className="">
                    <button className="btn2 add-btn3"> Search</button>
                  </div>
                </div>

              </div>
              <div className="page-header">
                <div className="row align-items-center" style={{ width: '100%' }}>
                  <div className="col">
                    {/* <h3 className="page-title" style={{ fontSize: '25px' }}>Roadmap</h3> */}
                  </div>
                  
                </div>
              </div>

              

              <div className="col-md-12">

                <div className="row">
                  <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="card card-table flex-fill">

                      <div className="card-body">
                        <div className="table-responsive">
                          <Table className="table-striped"
                            pagination={{
                              total: tokenStd.length,
                              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                            }}
                            style={{ overflowX: 'auto' }}
                            columns={columns}
                            // bordered
                            dataSource={tokenStd}
                            rowKey={record => record.id}
                          // onChange={this.handleTableChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Total Budget :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={50000000}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Allocated Budget :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4859350}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text"> Unallocated Budget :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={140650}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Calculate</h3> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Spent Budget till Date :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={705450}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Unspent Budget :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={4153900}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Funds Raised till Date :</span>
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
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Select Reporting Cycle Frequency :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>Month or Quarter</h5>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">Select Option</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">No of Reporting Cycles :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={49}
                          duration={1.5} /></h3>

                      </div>
                    </div>

                    {/* <h3 className="mainFontH4">calculate based on select option</h3> */}
                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Shortfall/ Excess Cash Flow :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h3 className="mainFontH5" style={{ marginBottom: '0px' }}> <CountUp end={859350}
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
                      <span className="dash-widget-text">Budget Start Date :</span>
                      <div className="dash-widget-info">
                        {/* 112 */}
                        <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>12/09/2022</h5>

                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-4 ">
                  <div className=" card dash-widget" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center' }}>
                      <span className="dash-widget-text">Budget End Date :</span>
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
          <div className="app-container">
            <button style={{border:'1px solid #6345ED',borderRadius:'15px',padding:'5px',height:'35px',width:'75px',marginBottom:'15px'}} onClick={()=>goBacktoNormal()}>Back</button>
             <div className="time-line-container">
              
              <TimeLine data={gattDAta} />
        
            </div>
          </div>
      }
    </div>
  );
}


export default BudgetPage;
