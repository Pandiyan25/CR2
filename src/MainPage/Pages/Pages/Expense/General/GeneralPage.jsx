

import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { useSelector } from 'react-redux';

import CountUp from 'react-countup';
import { apiURI } from '../../../../../config/config';


const barchartdata = [
    { y: '2006', "Total Income": 100, 'Total Outcome': 90 },
    { y: '2007', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2008', "Total Income": 50, 'Total Outcome': 40 },
    { y: '2009', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2010', "Total Income": 50, 'Total Outcome': 40 },
    { y: '2011', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2012', "Total Income": 100, 'Total Outcome': 90 }
];
const linechartdata = [
    { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
    { y: '2007', "Total Sales": 75, 'Total Revenue': 65 },
    { y: '2008', "Total Sales": 50, 'Total Revenue': 40 },
    { y: '2009', "Total Sales": 75, 'Total Revenue': 65 },
    { y: '2010', "Total Sales": 50, 'Total Revenue': 40 },
    { y: '2011', "Total Sales": 75, 'Total Revenue': 65 },
    { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];
const GeneralStatus = () => {

    
    const [bannersData, setBannersData] = useState(0)
    const [expenseTotal, setExpenseTotal] = useState(0)
    
    const [budgetStatus, setBudgetStatus] = useState([])
    const [roadMapStatus, setRoadMapStatus] = useState([])
    const [generalStatusData, setGeneralStatusData] = useState([])
    const projectId = useSelector((state) => state.constVar.projectId)
    const getUserDashboardFunc = () => {

        try {


            var query = `
            query GetFounderGraphs($project: ID) {
                getFounderGraphs: getFounderGraphs(project: $project) {
                  tasks {
                    main_description
                    sub_description
                    end_date
                    start_date
                  }
                  roadmap_status {
                    main_description
                    end_date
                    start_date
                    no_of_working_days
                  }
                  budgetvsactual {
                    sub_expense_head
                    life_time_budget
                    actual_expense_till_date
                  }
                }
                allProjectExpenses: allProjectExpenses(project: $project) {
                  _id
                  date
                  expense_sub_head
                  enter_amount
              
                  add_link
                  bank_account_number
                  attach_receipt
                  expense_main_head
                  expense_type
                  paid_through
                  comments
                  wallet_address
                },
                getBudgetBanner: 
                    getBudgetBanner(project: $project) {
                    project_start_date
                    project_end_date
                    allocated_budget
                    funds_raised_till_date
                    total_budget
                    unallocated_budget
                    unspent_budget
                    no_of_reporting_cycles
                    spent_budget_till_date
                    }
                    
              }
              
              
          `;

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
                        "project": projectId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderGraphs', data?.data?.getFounderGraphs);
                    if (data?.data?.getFounderGraphs != null && data?.data?.getFounderGraphs != undefined) {
                        setGeneralStatusData([data?.data?.getFounderGraphs])
                        

                        if (data?.data?.getFounderGraphs?.budgetvsactual.length > 0) {
                            var arr2 = [];
                            for (var i = 0; i < data?.data?.getFounderGraphs?.budgetvsactual?.length; i++) {


                                arr2.push({

                                    "name": data?.data?.getFounderGraphs?.budgetvsactual[i].sub_expense_head,
                                    "life_time_budget": data?.data?.getFounderGraphs?.budgetvsactual[i].life_time_budget,
                                    "actual_expense_till_date": data?.data?.getFounderGraphs?.budgetvsactual[i].actual_expense_till_date,


                                })
                                console.log(arr2, "arr");

                            }
                            setBudgetStatus(arr2)
                        }else{
                           
                            setBudgetStatus([]) 
                        }
                        
                    }else{
                        
                        setGeneralStatusData([])
                    }
                    if (data?.data?.getBudgetBanner != null && data?.data?.getBudgetBanner != undefined ) {
                        setBannersData(data?.data?.getBudgetBanner.total_budget)
                    }else{
                        
                        setBannersData(0)
                    }
                    if (data?.data?.allProjectExpenses != null && data?.data?.allProjectExpenses != undefined && data?.data?.allProjectExpenses.length > 0 ) {
                        var main = 0;
                        for(var i = 0; i < data?.data?.allProjectExpenses.length ;i++ ){
                            main = main + data?.data?.allProjectExpenses[i].enter_amount
                        }
                        setExpenseTotal(main)
                    }
                    else {
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    console.log(budgetStatus,"budgetStatus");

    useEffect(() => {
        if (projectId != '') {
            getUserDashboardFunc()
        }

    }, [projectId])

    return (
        <>

            <div className="row">

                <div className="col-md-12" style={{marginTop:'0px'}}>
                    <h3 className="card-title" style={{padding:'0px'}}>Critical Pending Tasks</h3>
                    <div className="row" >
                    <div className="col-md-6 col-sm-6 col-lg-6">
                        <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                                <div className="dash-widget-info">
                                    {/* <h3>40000000 USD</h3> */}
                      <h3> <CountUp end={expenseTotal}
                                separator=","
                        duration={2.5} /> USD</h3>
                                    <span style={{fontSize:'15px',fontWeight:'500'}}>Total Expense</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" >
                        <div className="card dash-widget" style={{ borderRadius: '15px' }}>
                            <div className="card-body">
                                <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                                <div className="dash-widget-info">
                                    {/* <h3></h3> */}
                      <h3> <CountUp end={bannersData}
                        duration={2.5}
                        separator="," /> USD</h3>
                                    <span style={{fontSize:'15px',fontWeight:'500'}}>Total Budget</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </div>

               
            </div>

            <div className="row">

                <div className="col-md-12">
                    <h3 className="card-title" style={{padding:'0px',marginTop:'20px'}}>Budget vs Actuals</h3>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="card">
                                <div className="card-body">
                                    {/* <h3 className="card-title">Total Revenue</h3> */}
                                    {/* <div id="bar-charts" /> */}
                                    <ResponsiveContainer width='100%' height={300}>
                                        {/* <BarChart

                                            data={barchartdata}
                                            margin={{
                                                top: 5, right: 5, left: 5, bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid />
                                            <XAxis dataKey="y" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Total Income" fill="#f43b48" />
                                            <Bar dataKey="Total Outcome" fill="#453a94" />
                                        </BarChart> */}
                                        <LineChart width={100} height={100} data={budgetStatus} margin={{
                                                top: 5, right: 5, left: 5, bottom: 5,
                                            }}>
                                            {/* <CartesianGrid  />
                                            <XAxis dataKey="y" />
                                            <YAxis /> */}
                                            <Tooltip />
                                            <Legend />
                                            {/* stroke="#eee" strokeDasharray="3 3" */}
                                            {/* <Line
                                                type="monotone"
                                                dataKey="Total Income"
                                                stroke="#8884d8"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="Total Outcome"
                                                stroke="#82ca9d"
                                            /> */}
                                            
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                            <Line
                                                type="monotone"
                                                dataKey="life_time_budget"
                                                stroke="#8884d8"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="actual_expense_till_date"
                                                stroke="#82ca9d"
                                            />
                                        </LineChart>

                                    </ResponsiveContainer>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row">

            </div>
        </>
    );
}
export default GeneralStatus;