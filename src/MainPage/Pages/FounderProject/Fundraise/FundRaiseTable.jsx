import { Table } from 'antd';
import React from 'react'
import { useState } from 'react';
import { Button } from 'reactstrap';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

const FundRaiseTable = ({ FundRaisePrivateData, setToPrivateFunc, setToPublicFunc, showPrivateRoundReceived, showPrivateRoundRejected }) => {

    var [searchvalue, setSearchValue] = useState([])
    const columns3 = [
        {
            title: 'Creator',
            dataIndex: 'creator',

            align: 'center',
            sorter: (a, b) => a?.creator.localeCompare(b?.creator),
        },

        {
            title: 'Investor',
            render: (text, record) => (
                <div>
                    {text?.investor?.fund_name}
                </div>
            ),

            align: 'center',
            // sorter: (a, b) => a?.Investor.localeCompare(b?.Investor),
        },
        {
            title: 'Round',
            dataIndex: 'round',

            align: 'center',
            sorter: (a, b) => a?.round.localeCompare(b?.round),
        },

        {
            title: 'Price',
            // dataIndex: 'Price',
            render: (text, record) => (


                <div>{Number(text?.price_per_token).toLocaleString("en-US")}</div>



            ),
            align: 'center',
            sorter: (a, b) => a?.price_per_token - b?.price_per_token,
        },

        {
            title: 'Fund',


            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),
            align: 'center',
        },

        {
            title: 'Tokens',
            render: (text, record) => (



                <div>{Number(text?.no_of_tokens).toLocaleString("en-US")}</div>



            ),
            sorter: (a, b) => a?.no_of_tokens - b?.no_of_tokens,
            align: 'center',
        },

        {
            title: 'Valuation',
            render: (text, record) => (

                <div>{Number(text?.valuation).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.valuation - b?.valuation,
        },
        {
            title: 'Status',

            render: (text, record) => (
                text?.founder_status == 'Sent' ?
                    <div style={{ border: '2px solid green', color: 'white', backgroundColor: 'green', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Sent
                    </div>
                    :
                text?.founder_status == "Accepted" ? 
                    <div style={{ border: '2px solid green', color: 'white', backgroundColor: 'green', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Accepted
                    </div>
                    :
                text?.founder_status == 'Rejected' ?
                    <div style={{ border: '2px solid red', color: 'white', backgroundColor: 'red', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Rejected
                    </div>
                    :
                    <div style={{ border: '2px solid #8c04b3', backgroundColor: '#8c04b3', color: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Received
                    </div>


            ),
            sorter: (a, b) => a?.founder_status?.localeCompare(b?.founder_status),

            align: 'center',
        },
        {
            title: 'Options',
            render: (text, record) => (

                text?.founder_status == 'Sent' ?
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
                            onClick={() => showPrivateRoundReceived(text?._id)}
                        >View</Button>
                    </div>
                    :

                    text?.founder_status == 'Rejected' ?
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
                                onClick={() => showPrivateRoundRejected(text)}
                            >View</Button>
                        </div>
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
                                onClick={() => showPrivateRoundReceived(text?._id)}
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


            <div className="row"  >
                <div className="col-md-12" style={{ padding: '0px 5px', display: 'flex', justifyContent: 'space-between' }} >
                    <div className="search ">
                        <input
                            placeholder="Search"
                            style={{ width: '300px', minHeight: "35px", borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px 0px' ,paddingLeft :"10px" }}
                            onChange={(e) => searchValueinTablefunc(e.target.value)}
                        />
                    </div>
                    <div className="col-auto float-right" style={{ padding: '0px' }}>
                        <button className="btn add-btn2" style={{ margin: '0px 0px 0px 10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPrivateFunc()} >+ CREATE PRIVATE ROUND</button>
                        <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPublicFunc()} >+ CREATE PUBLIC ROUND</button>
                    </div>
                </div>
            </div>

            {/* <div className="col-md-12"> */}

            <div className="row">
                <div className="col-md-12" style={{ padding: '5px' }} >
                    <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                        <div className="card-body" style={{ height: "800px !important" }} >
                            <div className="table-responsive">
                                <Table className="table-striped"
                                    pagination={{
                                        total: searchvalue.length > 0 ? searchvalue.length : FundRaisePrivateData.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns3}
                                    // bordered
                                    dataSource={searchvalue.length > 0 ? searchvalue : FundRaisePrivateData}
                                    rowKey={record => record.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundRaiseTable