

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Rating from 'react-rating'

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { apiURI } from '../../../../config/config';
import RleaseTokenModal from './RelaseTokenModal';


import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data2 = [
    {
        "name": "06/06/2022",
        "uv": 400,
        "pv": 240,
        "amt": 240
    },
    {
        "name": "06/07/2022",
        "uv": 300,
        "pv": 139,
        "amt": 221
    },
    {
        "name": "06/08/2022",
        "uv": 200,
        "pv": 980,
        "amt": 229
    },
    {
        "name": "06/09/2022",
        "uv": 278,
        "pv": 390,
        "amt": 200
    },
    {
        "name": "06/10/2022",
        "uv": 189,
        "pv": 480,
        "amt": 218
    },
    {
        "name": "06/11/2022",
        "uv": 239,
        "pv": 380,
        "amt": 250
    },
    {
        "name": "06/12/2022",
        "uv": 349,
        "pv": 430,
        "amt": 210
    }
]


const ReleasedTokens = () => {
    const [addVendor, showAddVendor] = useState(false)
    const [recordExpense, showRecordExpense] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const [projectname, setProjectName] = useState('')
    const [projectDetailsData, setProjectDetalsData] = useState([])
    const projectNumber = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)

    const data = [
        {
            installNumber: '1',
            releaseDate: '06/06/2022',
            releaseToken: '100',
            widthDrawDate: '06/06/2022',
            transactionId: 'Blockchain tran ID',
        },
        {
            installNumber: '2',
            releaseDate: '06/06/2022',
            releaseToken: '200',
            widthDrawDate: '06/06/2022',
            transactionId: 'Blockchain tran ID',
        }
    ];


    const columns = [

        {
            title: 'Installment Number',
            dataIndex: 'installNumber',
            align: 'center',

        },

        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            align: 'center',
        },

        {
            title: 'Release Tokens',
            dataIndex: 'releaseToken',
            align: 'center',
        }, {
            title: 'Withdrawal Date',
            dataIndex: 'widthDrawDate',
            align: 'center',
        },
        , {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            align: 'center',
        },
    ]

    const getProjectDetailsFunc = () => {
        try {

            var query =
                `
                query AllProjects($user: ID) {
                   allProjects(user: $user) {
              _id
              project_name
              project_id
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
                        "user": loginId
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined) {
                        var totalInvested = 0;
                        setProjectDetalsData(data?.data?.allProjects)


                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    useEffect(() => {
        if (loginId != '') {
            getProjectDetailsFunc()
        }

    }, [loginId])

    const getPerticulaFuncData = (i) => {


        setProjectName(projectDetailsData[i]?.project_name)
        console.log(projectDetailsData[i], "getPerticulaFuncData");
    }

    const showReleaseTokenPopupfunc = () => {
        setShowPopup(true)
    }

    const closePopupfunc = () => {
        setShowPopup(false)
    }

    return (


        <div className="content container-fluid">
            <div >
                <div>

                    <div className="page-header">

                        <div className="col-md-12 d-flex">
                            <div className="row align-items-center" style={{ width: '100%' }}>
                                {/* <div className="col">
                <h3 className="page-title" style={{ fontSize: '25px' }}>Expense</h3>
              </div> */}
                                {/* <div className="col-auto float-right ml-auto">
                <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => addVendorShowfunc()}> Add Vendor</button>

                <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => recordExpenseShowfunc()}> Record Expense</button>
              </div> */}
                                <div className=" " style={{ padding: '0px', width: '20%' }}>

                                    <div className="" >
                                        <select className="form-control btn-block-height square-edges" onChange={(e) => getPerticulaFuncData(e.target.value)} >
                                            <option style={{ fontSize: '13px' }}>Select Project Id :</option>
                                            {projectDetailsData.length > 0 && projectDetailsData.map((i, index) => (

                                                <option style={{ fontSize: '13px' }} value={index} >{i?.project_id} </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="" style={{ width: '30%', display: 'flex', flexDiresction: 'row', alignItems: 'center', padding: '0px', overflow: 'hidden', wordBreak: 'break-all' }}>
                                    <h5 style={{ margin: '0px 10px 0px 15px', width: '45%' }}>Project Name :</h5>
                                    <h5 style={{ margin: '0px 10px 0px 0px', wordBreak: 'break-word', width: '55%' }}>{projectname != '' && projectname != undefined && projectname != null && projectname}</h5>
                                </div>
                                {/* ,wordBreak:'break-all' */}
                                <div className="" style={{ width: '12%', display: 'flex', flexDiresction: 'row', alignItems: 'center', padding: '0px' }}>
                                    <h5 style={{ margin: '0px 10px 0px 10px' }}>Token :</h5>
                                    <h5 style={{ margin: '0px 10px 0px 10px' }}>CR2</h5>
                                </div>
                                {/* ,wordBreak:'break-all' */}
                                <div className=" " style={{ width: '23%', display: 'flex', flexDiresction: 'row', alignItems: 'center', padding: '0px' }}>
                                    <h5 style={{ margin: '0px 10px 0px 10px' }}>Released Tokens :</h5>
                                    <h5 style={{ margin: '0px 10px 0px 10px' }}>1000</h5>
                                </div>
                                <div className=" " style={{ width: '15%', padding: '0px' }}>
                                    <button className="buttonTopColor3" style={{ width: '100%', height: '35px', border: '2px solid #1890ff' }}>
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-md-12 d-flex">

                            <div className="card card-table flex-fill">

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: data?.length,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }
                                            }
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            bordered
                                            dataSource={data}
                                            rowKey={record => record.id}
                                        // onChange={this.handleTableChange}
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>



                    <div className="row">

                        <div className="col-md-12">
                            {/* <h3 className="card-title">Roadmap Status</h3> */}
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="card">
                                        <div className="card-body">
                                            <ResponsiveContainer width='100%' height={300}>

                                                <LineChart width={100} height={100} data={data2}>
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


                    <div style={{ marginTop: '40px', textAlign: 'start' }}>
                        <button className="btn buttonInProposal1 submit-btn" onClick={() => showReleaseTokenPopupfunc()}>Summarize</button>
                    </div>
                </div>
            </div>
            <RleaseTokenModal show={showPopup} handleClose={closePopupfunc} />
        </div>
    );
}

export default ReleasedTokens;
