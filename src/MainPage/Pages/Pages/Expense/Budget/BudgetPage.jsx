
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import CountUp from 'react-countup';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../../paginationfunction"
import "../../../../antdstyle.css"

const BudgetPage = () => {
    const [showAddPage, setShowAddPage] = useState(false)
    const [showEditPage, setShowEditPage] = useState(false)
    const [data, setData] = useState([
        {
            id: 1,
            mainExpenseHead: "Incorporation Compilance",
            subExpenseHead: '50000', 
            ExpensePerCycle: '1',
             unit: "365", 
             frequency: "4",
             expcycle:'4',
             lifeTime:'20000',
             Expensetilldate:'-', 
             balance: '20000'
             },
        { 
            id: 2, 
            mainExpenseHead: "Incorporation Compilance", 
            subExpenseHead: "50000", 
            ExpensePerCycle: '1', 
            unit: "365", 
            frequency: "4",
            expcycle:'4',
            lifeTime:'20000',
            Expensetilldate:'-', 
            balance: '20000'
         },
    ]);


    const columns = [

        {
            title: 'Main Expense Head',
            dataIndex: 'mainExpenseHead',

            align: 'center',
            sorter: (a, b) => a.mainExpenseHead.length - b.mainExpenseHead.length,
        },
        {
            title: 'Sub Expense Head',
            dataIndex: 'subExpenseHead',
            sorter: (a, b) => a.subExpenseHead.length - b.subExpenseHead.length,
            align: 'center',
        },

        {
            title: 'Expense per Cycle',
            dataIndex: 'ExpensePerCycle',
            sorter: (a, b) => a.ExpensePerCycle.length - b.ExpensePerCycle.length,
            align: 'center',
        },
        {
            title: 'Unit/Quantity',
            dataIndex: 'unit',

            sorter: (a, b) => a.unit.length - b.unit.length,
            align: 'center',
        },
        {
            title: 'Expense Frequency in Days',
            dataIndex: 'frequency',
            sorter: (a, b) => a.frequency.length - b.frequency.length,
            align: 'center',
        },
        {
            title: 'No od Expense Cycle',
            dataIndex: 'expcycle',
            sorter: (a, b) => a.expcycle.length - b.expcycle.length,
            align: 'center',
        },
        
        {
            title: 'Life time Budget',
            dataIndex: 'lifeTime',
            sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
            align: 'center',
        },
        
        {
            title: 'Actual Expense Till Date',
            dataIndex: 'Expensetilldate',
            sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
            align: 'center',
        },
        
        {
            title: 'Balance',
            dataIndex: 'balance',
            sorter: (a, b) => a.balance.length - b.balance.length,
            align: 'center',
        }

    ]

    const onHandleClose = () => {
        setShowAddPage(false)
    }
    const onHandleEditClose = () => {
        setShowEditPage(false)
    }

    const openEditMapfunc = () => {
        setShowEditPage(true)
    }
    const openAddMapfunc = () => {
        setShowAddPage(true)
    }
    return (

        <div className="card card-table flex-fill">

        <div className="card-body">
        <div className="content container-fluid">
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
            </div>
            {/* /Page Header */}
            {/* Search Filter */}

            <div className="row filter-row">
                <div className="col-md-3" style={{padding:'0px'}}>
                    <div className="dateDiv">
                        <h5 style={{
                            fontWeight:'600',marginBottom:'0px'
                        }}>Current Date:</h5>
                        <h5 style={{marginBottom:'0px'}}>13/05/2022</h5>
                    </div>
                </div>
                <div className="col-md-7 dateMainDiv">
                    <div className="subMainDiv">
                        <h5 className="subMainDivH5"  style={{
                            fontWeight:'600',marginBottom:'0px'
                        }} >From Date:</h5>
                        <input className="form-control floating datetimepicker" type="date" style={{ height: '35px' }} />
                    </div>
                    <div className="subMainDiv">
                        <h5 className="subMainDivH5"  style={{
                            fontWeight:'600',marginBottom:'0px'
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
                    <div className="col-auto float-right ml-auto">
                        <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> Upload File</button>

                        <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => openAddMapfunc()}> Download Sample Format</button>
                    </div>
                </div>
            </div>

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

            <div className="col-md-12">

                <div className="row">
                    <div className="col-md-12" style={{padding:'0px'}}>
                        <div className="card card-table flex-fill">

                            <div className="card-body">
                                <div className="table-responsive">
                                    <Table className="table-striped"
                                        pagination={{
                                            total: data.length,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }}
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        // bordered
                                        dataSource={data}
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
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Total Budget :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={50000000}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Allocated Budget :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={4859350}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Info from budget page</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">UnAllocated Budget :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={140650}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Calculate</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Spend Budget till Date :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={705450}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Info from budget page</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Unspent Budget :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={4153900}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Info from budget page</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Fund Raised till Date :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={4000000}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Take info from fund raise tab of founders</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">Select Reporting Cycle Frequency :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h5 className="mainFontH5text" style={{marginBottom:'0px'}}> Month of Quater</h5>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">Select Option</h3>
                </div>
              </div>
              <div className="col-md-4 ">
                <div className=" card dash-widget" style={{height:'75px',padding:'5px'}}>
                  <div className="card-body" style={{textAlign:'center'}}>
                    <span className="dash-widget-text">No of Reporting Cycles :</span>
                    <div className="dash-widget-info">
                      {/* 112 */}
                      <h3 className="mainFontH5" style={{marginBottom:'0px'}}> <CountUp end={49}
                        duration={1.5} /></h3>
                        
                    </div>
                  </div>
                  
                  <h3 className="mainFontH4">calculate based on select option</h3>
                </div>
              </div>
              <div className="col-md-4 ">
               
              </div>
            </div>
            {/* <AddRoadMap show={showAddPage} handleClose={onHandleClose} />
            <EditRoadMap show={showEditPage} handleClose={onHandleEditClose} /> */}
        </div>
        </div>
        </div>
    );
}


export default BudgetPage;
