import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-summernote/dist/react-summernote.css';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16, designLogo2 } from '../../../Entryfile/imagepath';
import "../../index.css";
// import "./index.css";
import { Button } from 'react-bootstrap';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import RoundReqPage from './RoundsRequest';


const ValidatorsRequests = () => {

    const [statusPrpShow, setStatusPrpShow] = useState(false)
    const [showProposalsList, setShowProposalsList] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [projectCycles, setProjectCycle] = useState(0)
    const [tableData, settableData] = useState([
    //     {
    //     "contract_id": '091axxx8727',
    //     "round": 'Public',
    //     "price_per_token": '0.04',
    //     "Target": '500000',
    //     "no_of_tokens": '12500000',
    //     "valuation": '$ 10 Million',
    //     "blockers": '1243',
    //     "project_status": '100%',

    // },
    // {
    //     "contract_id": '091axxx11211',
    //     "round": 'Private',
    //     "price_per_token": '0.06',
    //     "Target": '100000',
    //     "no_of_tokens": '2500000',
    //     "valuation": '15 Million',
    //     "blockers": '1',
    //     "project_status": '100%',

    // }
    ])
   
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

                <div>{Number(text?.Target).toLocaleString("en-US")}</div>

            ),
            align: 'center',
            sorter: (a, b) => a?.Target - (b?.Target),
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

    
    const showRoundFunc = () =>{
        setShowProposalsList(false)
    }
    const [remarks, setRemarks] = useState('')

    const [aLLValidatedProposal, setALLValidatedProposal] = useState([])
    const [projectDetailsData, setProjectDetalsData] = useState([])
   

    const close = () =>{
        setShowProposalsList(true)
    }

    const loginId = useSelector((state) => state.constVar.loginId)
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const [perticularProposals, setPerticularProposals] = useState([])

    return (
        <div className="page-wrapper" style={{paddingTop:'60px'}}>

            <div className="content container-fluid">

                <div className="page-header">

                    <div className="header-left">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title" style={{ wordSpacing: 'normal' }}>Requests</h3>

                            </div>
                        </div>

                    </div>


                </div>
                {/* /Search Filter */}
                {showProposalsList == true ?
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ padding: '20px', background: 'white', border: '2px solid #E3E9EF', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                <div className="table-responsive" style={{ border: '2px solid #E3E9EF', borderRadius: '10px', background: 'white' }}>

                                    <Table
                                        pagination={{
                                            total: tableData.length,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }
                                        }
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        bordered
                                        dataSource={tableData}
                                        rowKey={record => record.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>

                        <div className="card mb-0">
                           


                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
                                {/* <div className="submit-section">
                                    <button className="btn buttonInProposal submit-btn" onClick={() => close()}>BACK</button>
                                </div> */}
                               
                               <RoundReqPage handleClose={close} />



                            </div>

                        </div>
                    </div>
                }

            </div>


        </div>
    )
}


export default withRouter(ValidatorsRequests);
