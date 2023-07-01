import { Table } from 'antd'
import React from 'react'
import { useState } from 'react';
import { Button } from 'reactstrap';
import { itemRender, onShowSizeChange } from '../../../paginationfunction'

const FundReqTable = ({showRoundFunc,setToPrivateFunc,setToPublicFunc,FundRaiseData}) => {
    
    var [searchvalue, setSearchValue] = useState([])
    const columns = [

        {
            title: 'Contract ID',
            dataIndex: 'contract_id',

            align: 'center',
            sorter: (a, b) => a?.contract_id.localeCompare(b?.contract_id),
        },


        {
            title: 'Round ',
            dataIndex: 'round',
            sorter: (a, b) => a?.round.localeCompare(b?.round),

            align: 'center',
        },


        {
            title: 'Price',
            // dataIndex: 'Price',
            render: (text, record) => (



                <div>{Number(text?.price_per_token).toLocaleString("en-US")}</div>


            ),
            align: 'center',
            sorter: (a, b) => a?.price_per_token - (b?.price_per_token),
        },


        {
            title: 'Target',
            // dataIndex: 'Target',
            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>

            ),
            align: 'center',
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),
        },


        {
            title: 'Tokens',
            // dataIndex: 'Tokens',
            render: (text, record) => (
                <div>{Number(text?.no_of_tokens).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.no_of_tokens - (b?.no_of_tokens),
            align: 'center',
        },


        {
            title: 'Valuation',
            // dataIndex: 'Valuation',
            render: (text, record) => (

                <div>{Number(text?.valuation).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.valuation - (b?.valuation),
            align: 'center',
        },


        {
            title: 'Backers',
            // dataIndex: 'Blockers',
            render: (text, record) => (

                <div>{Number(text?.blockers).toLocaleString("en-US")}</div>

            ),
            sorter: (a, b) => a?.blockers - (b?.blockers),
            align: 'center',
        },


        {
            title: 'Status',
            dataIndex: 'project_status',

            align: 'center',
            sorter: (a, b) => a?.project_status?.localeCompare(b?.project_status),
        },


        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>
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
                        onClick={() => showRoundFunc(text)}
                    >
                        View
                    </Button>
                    {/* onClick={() => deleteFunc(text._id)} */}
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
                            style={{ width: '300px', minHeight: "35px", borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px 0px' ,paddingLeft:"10px" }}
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
                                        total: searchvalue.length > 0 ? searchvalue.length : FundRaiseData.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    // bordered
                                    dataSource={searchvalue.length > 0 ? searchvalue: FundRaiseData}
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

export default FundReqTable