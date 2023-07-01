import { Table } from 'antd'
import { useState } from 'react';
import React from 'react'
import { itemRender, onShowSizeChange } from '../../../paginationfunction'
import { Button } from 'reactstrap';

const ValidationReqTable = ({ 
    tokenStd4,setToPrivateFunc,
    setToPublicFunc,FundingReqFunc,
    }) => {

    
    var [searchvalue, setSearchValue] = useState([])

    const columns4 = [
        {
            title: 'Investor',
            // dataIndex: 'Project',

            render: (text, record) => (
                // onClick={() => sendDatatoProjectPage(text?.fundraise?.project?._id)}
                <div 
                // className='mainClassColm4'
                >
                    {text?.fundraise?.investor?.fund_name}

                </div>
            ),
            align: 'center',
        },

        // {
        //     title: 'Contract ID',
        // dataIndex: 'Contract',

        //     align: 'center',
        // },
        {
            title: 'Request ID',
            // dataIndex: 'Request_ID',

            align: 'center',
        },

        {
            title: 'Target Date',
            dataIndex: 'targetdate',

            align: 'center',
        },

        {
            title: 'Completion Date',
            dataIndex: 'estDate',

            align: 'center',
        },


        {
            title: 'Status',
            // dataIndex: 'Status',

            render: (text, record) => (
                text?.validation_status == 'Approved' ?
                    <div style={{ color: 'green', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Approved

                    </div>
                    :

                    text?.validation_status == 'Rejected' ?
                        <div style={{ color: 'red', width: '100%', padding: '2px', fontWeight: '700' }}>
                            Rejected
                        </div>
                        :
                        text?.validation_status == 'Unrequested' ?
                            <div style={{ color: 'red', width: '100%', padding: '2px', fontWeight: '700' }}>
                                Unrequested
                            </div>
                            :

                            <div style={{ color: 'rgb(255, 196, 32)', width: '100%', padding: '2px', fontWeight: '700' }}>
                                {/*                             
                        </div>
                        <div style={{ border: '2px solid #8c04b3', backgroundColor: '#8c04b3', color: 'white', width: '100%', padding: '2px', fontWeight: '700' }}> */}
                                Pending
                            </div>


            ),

            align: 'center',
        },
        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>
                text?.validation_status == 'Unrequested' ?
                    ''
                    :                
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                        <Button
                            style={{
                                padding: '0px ',
                                border: '2px solid #1890ff',
                                maxWidth: '95px',
                                fontSize: '12px',
                                lineHeight: '24px',
                                minHeight: '26px',
                                textAlign: 'center',
                                height: '30px',
                                borderRadius: '2px ',
                                width: '100%',
                                marginLeft: '10px',
                                background: '#1890ff'
                            }}
                            onClick={() => FundingReqFunc(text?.fundraise?._id)}
                        >View</Button>
                    </div>


            ),

            align: 'center',
        },
    ]

    const searchValueinTablefunc = (e) => {
        var mainDatasearch = FundRaisePrivateData.map((i) => {

            if (i?.creator == e || i?.investor?.fund_name  == e ||i?.round  == e  || i?.founder_status == e ) {
                return i
            }
        })
        var data = mainDatasearch.filter(function (element) {
            return element !== undefined;
        });
        console.log(data, e, "mainDatasearch");
        setSearchValue(data)
    }

    return (

        <div className="">

            {/* <div className="row">

                <div className="col-md-12" style={{ padding: '0px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                          
                            <div className="search mb-2">

                                <h3 className="card-title mb-0" style={{ padding: '10px', paddingBottom: '0px' }}>Validation Requests</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}

            <div className="row"  >
                <div className="col-md-12" style={{ padding: '0px 5px', display: 'flex', justifyContent: 'space-between' }} >
                    <div className="search ">
                        <input
                            placeholder="Search"
                            style={{ width: '300px', minHeight: "35px", borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px  0px',paddingLeft:"10px" }}
                            onChange={(e)=>searchValueinTablefunc(e.target.value)}
                            />
                    </div>
                    <div className="col-auto float-right" style={{ padding: '0px' }}>
                        <button className="btn add-btn2" style={{ margin: '0px 0px 0px 10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPrivateFunc()} >+ CREATE PRIVATE ROUND</button>
                        <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPublicFunc()} >+ CREATE PUBLIC ROUND</button>
                    </div>
                </div>
            </div>

                <div className="row">
                <div className="col-md-12" style={{ padding: '5px' }} >
                        <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                            <div className="card-body" style={{ height: "800px !important" }} >
                                <div className="table-responsive">
                                    <Table className="table-striped"
                                        pagination={{
                                            total: searchvalue.length > 0 ? searchvalue.length : tokenStd4.length,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }}
                                        style={{ overflowX: 'auto' }}
                                        columns={columns4}
                                        // bordered
                                        dataSource={searchvalue.length > 0 ? searchvalue: tokenStd4}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ValidationReqTable