

import React, { useState, useEffect } from 'react';
import { designLogo2 } from '../../../Entryfile/imagepath';
import { Table } from 'antd';
import "../../antdstyle.css";
import 'antd/dist/antd.css';
import './index.css'
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { useSelector } from 'react-redux';
import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { apiURI } from '../../../config/config';



const barchartdata = [
    { y: '2006', "Total Income": 100, 'Total Outcome': 90 },
    { y: '2007', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2008', "Total Income": 50, 'Total Outcome': 40 },
    { y: '2009', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2010', "Total Income": 50, 'Total Outcome': 40 },
    { y: '2011', "Total Income": 75, 'Total Outcome': 65 },
    { y: '2012', "Total Income": 100, 'Total Outcome': 90 }
];
const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]
const GeneralStatus = () => {
    
    const [budgetStatus, setBudgetStatus] = useState([])
    const [roadMapStatus, setRoadMapStatus] = useState([])
    const [generalStatusData, setGeneralStatusData] = useState([])

    const projectId = useSelector((state) => state.constVar.projectId)
    const [tableData, settableData] = useState([
        {
            mainDesc: 'Funding',
            subDesc: 'Initial CEX Launch',
            startDate: '07/05/2022',

            endDate: '07/05/2022'
        }
    ])

    const columns = [

        {
            title: 'Main Description',
            //   dataIndex: 'proposalNo',
            dataIndex: 'main_description',

            align: 'center',
        },

        {
            title: 'Sub Description',
            dataIndex: 'sub_description',
            align: 'center',
        },

        {
            title: 'Start Date',
            dataIndex: 'start_date',
            align: 'center',
        }, {
            title: 'End Date',
            dataIndex: 'end_date',
            align: 'center',
        }


    ]

    const getUserDashboardFunc = () => {

        try {


            var query = `
            query GetFounderGraphs($project: ID) {
                getFounderGraphs(project: $project) {
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
                        if (data?.data?.getFounderGraphs?.roadmap_status.length > 0) {
                            var arr = [];
                            for (var i = 0; i < data?.data?.getFounderGraphs?.roadmap_status?.length; i++) {

                                var  date1 = new Date(data?.data?.getFounderGraphs?.roadmap_status[i]?.end_date);
                                var date2 = new Date(data?.data?.getFounderGraphs?.roadmap_status[i]?.start_date);
                                var Difference_In_Time = date1?.getTime() - date2?.getTime();

                                // To calculate the no. of days between two dates
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                                console.log(Difference_In_Days, "Difference_In_Days");
                                arr.push({

                                    "name": data?.data?.getFounderGraphs?.roadmap_status[i].main_description,
                                    "uv": Difference_In_Days,
                                    "pv": data?.data?.getFounderGraphs?.roadmap_status[i].no_of_working_days,


                                })
                                console.log(arr, "arr");

                            }
                            setRoadMapStatus(arr)
                        }else{
                           
                            setRoadMapStatus([]) 
                        }

                        if (data?.data?.getFounderGraphs?.budgetvsactual.length > 0) {
                            var arr2 = [];
                            for (var i = 0; i < data?.data?.getFounderGraphs?.budgetvsactual?.length; i++) {


                                arr2.push({

                                    "name": data?.data?.getFounderGraphs?.budgetvsactual[i].sub_expense_head,
                                    "uv": data?.data?.getFounderGraphs?.budgetvsactual[i].life_time_budget,
                                    "pv": data?.data?.getFounderGraphs?.budgetvsactual[i].actual_expense_till_date,


                                })
                                console.log(arr2, "arr");

                            }
                            setBudgetStatus(arr2)
                        }else{
                           
                            setBudgetStatus([]) 
                        }
                        
                    } else {
                        setGeneralStatusData([])
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

    console.log(generalStatusData, 'generalStatusData');
    return (
        <>

            <div className="row">

                <div className="col-md-12">
                    <h3 className="card-title">Critical Pending Tasks</h3>
                    {/* <DonutChart
                        data={[
                            {
                                label: 'Give you up',
                                value: 25,
                            },
                            {
                                label: '',
                                value: 75,
                                isEmpty: true,
                            },
                        ]}
                    />; */}
                    <div className="card card-table flex-fill">

                        <div className="card-body">
                            <div className="table-responsive">
                                {generalStatusData.length > 0 ?
                                    < Table
                                        pagination={{
                                            total: generalStatusData[0]?.tasks.length,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }
                                        }
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        bordered
                                        dataSource={generalStatusData[0]?.tasks}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />
                                    :
                                    ""
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="row">

                <div className="col-md-12">
                    <h3 className="card-title">Roadmap Status</h3>
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
                                        <LineChart width={100} height={100} data={roadMapStatus} margin={{
                                                top: 5, right: 5, left: 5, bottom: 5,
                                            }}>
                                                
                                            <Tooltip />
                                            <Legend />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                            <Line
                                                type="monotone"
                                                dataKey="uv"
                                                stroke="#8884d8"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="pv"
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

                <div className="col-md-12">
                    <h3 className="card-title">Budget vs Actuals</h3>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="card">
                                {/* <div className="card-body"> */}
                                {/* <h3 className="card-title">Total Revenue</h3> */}
                                {/* <div id="bar-charts" /> */}
                                {/* <ResponsiveContainer width='100%' height={300}>
                                        <BarChart

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
                                        </BarChart>
                                    </ResponsiveContainer> */}
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
                                        <LineChart width={100} height={100} data={budgetStatus}margin={{
                                                top: 5, right: 5, left: 5, bottom: 5,
                                            }}>
                                                
                                            <Tooltip />
                                            <Legend />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                            <Line
                                                type="monotone"
                                                dataKey="uv"
                                                stroke="#8884d8"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="pv"
                                                stroke="#82ca9d"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
export default GeneralStatus;