import { Table } from 'antd'
import React from 'react'
import { useState } from 'react';
import { Button } from 'reactstrap';
import { itemRender, onShowSizeChange } from '../../../paginationfunction'

const DraftTable = ({setToPrivateFunc,setToPublicFunc,DraftFundRaiseData,editDraftData,deleteFunding}) => {

    var [searchvalue, setSearchValue] = useState([])
    const columns2 = [

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
            sorter: (a, b) => a?.price_per_token - (b?.price_per_token),
            align: 'center',
        },

        {
            title: 'Target',
            // dataIndex: 'Target',
            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),
            align: 'center',
        },

        {
            title: 'Tokens',
            // dataIndex: 'Tokens',
            render: (text, record) => (



                <div>{Number(text?.no_of_tokens).toLocaleString("en-US")}</div>
                //  == 'Approved' ?
                //     <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
                //     </div>
                //     : (text.proposal_status == 'Rejected' ?
                //         <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
                //         </div>
                //         : <div>
                //             {text.proposal_status}
                //         </div>
                //     )


            ),
            sorter: (a, b) => a?.no_of_tokens - (b?.no_of_tokens),
            align: 'center',
        },

        {
            title: 'Valuation',
            // dataIndex: 'valuation',
            render: (text, record) => (

                <div>{Number(text?.valuation).toLocaleString("en-US")}</div>
            ),
            align: 'center',
            sorter: (a, b) => a?.valuation - (b?.valuation),
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
                            maxWidth: '56px',
                            fontSize: '12px',
                            lineHeight: '24px',
                            minHeight: '26px',
                            textAlign: 'center',
                            height: '30px',
                            borderRadius: '2px ',
                            width: '56px',
                            marginLeft: '10px',
                            background: '#1890ff'
                        }}
                        onClick={() => editDraftData(text)}
                    ><i className="fa fa-pencil" /></Button>
                    <Button

                        style={{
                            padding: '0px ',
                            border: '2px solid #1890ff',
                            maxWidth: '56px',
                            fontSize: '12px',
                            lineHeight: '24px',
                            minHeight: '26px',
                            textAlign: 'center',
                            height: '30px',
                            borderRadius: '2px ',
                            width: '56px',
                            marginLeft: '10px',
                            background: '#1890ff'
                        }}
                        onClick={() => deleteFunding(text)}
                    ><i className="fa fa-trash" /></Button>
                    {/* onClick={() => deleteFunc(text._id)} */}
                </div>
            ),
            align: 'center',
            width: '120px'
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
                            style={{ width: '300px', minHeight: "35px", borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px 0px',paddingLeft:"10px" }}
                            onChange={(e)=>searchValueinTablefunc(e.target.value)}
                        />
                    </div>
                    <div className="col-auto float-right" style={{ padding: '0px' }}>
                        <button className="btn add-btn2" style={{ margin: '0px 0px 0px 10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPrivateFunc()} >+ CREATE PRIVATE ROUND</button>
                        <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPublicFunc()} >+ CREATE PUBLIC ROUND</button>
                    </div>
                </div>
            </div>
            {/* <div className="row">

                <div className="col-md-12" style={{ padding: '0px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                            
                            <div className="search mb-2">

                                <h3 className="card-title mb-0" style={{ padding: '5px', paddingBottom: '0px' }}>Drafts</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}


            <div className="row">
                <div className="col-md-12" style={{ padding: '5px' }} >
                    <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                        <div className="card-body" style={{ height: "800px !important" }} >
                            <div className="table-responsive">
                                <Table className="table-striped"
                                    pagination={{
                                        total: searchvalue.length > 0 ? searchvalue.length : DraftFundRaiseData.length,
                                        showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }}
                                    style={{ overflowX: 'auto' }}
                                    columns={columns2}
                                    // bordered
                                    dataSource={ searchvalue.length > 0 ? searchvalue : DraftFundRaiseData}
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

export default DraftTable