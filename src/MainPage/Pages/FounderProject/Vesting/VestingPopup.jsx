
import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { apiURI } from '../../../../config/config';

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


function VestingPopup({ dataForVestingPopup,show, handleClose, getUserDetailsFunc, vestingData }) {

    const [tableData, settableData] = useState([
        {
            totalToken: '1000',
            unlockDate: '06/06/2022',
            noOfTokens: '100',
            Balance: '900',


        },
        {
            totalToken: '1000',
            unlockDate: '06/06/2022',
            noOfTokens: '200',
            Balance: '700',
        },

    ])

    const columns = [



        // {
        //     title: 'Total Tokens',
        //     dataIndex: 'totalToken',
        //     align: 'center',
        // },

        {
            title: 'Unlock Date',
            dataIndex: 'unlockDate',
            align: 'center',
        }, {
            title: 'Number of Tokens',
            dataIndex: 'noOfTokens',
            align: 'center',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            align: 'center',
        }

    ]

   

    

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>{vestingData.length > 0 && vestingData[0].Investor}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 d-flex">

                            <div className="card card-table flex-fill">

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: dataForVestingPopup.length,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }
                                            }
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            bordered
                                            dataSource={dataForVestingPopup}
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

                                                <LineChart width={100} height={100} data={dataForVestingPopup}>
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="uv"
                                                        stroke="#8884d8"
                                                    />
                                                    {/* <Line
                                                        type="monotone"
                                                        dataKey="pv"
                                                        stroke="#82ca9d"
                                                    /> */}
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default VestingPopup;