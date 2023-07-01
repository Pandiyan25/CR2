



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
// import InitialProposal from './InitialProposal';
// import SubSequentModal from './SubSequentModal';


const AuditTrailPage = () => {
    const [ShowGeneral, setShowGeneral] = useState(true)
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [createInitialProp, setcreateInitialProp] = useState(false)
    const [createSubseqPropProp, setcreateSubseqPropProp] = useState(false)


    const COLORS = ["orange", "gray"];

    const data = [
        { name: 'Supporters', students: 400, color: 'green' },
        { name: 'Opposer', students: 400, color: 'red' },
        // {name: 'Opposers', students: 700},
        // {name: 'Geek-i-knack', students: 200},
        // {name: 'Geek-o-mania', students: 1000}
    ];

    const [tableData, settableData] = useState([
        {
            proposalNo: '0001',
            proposalType: 'Initial',
            FundsRequested: '10000 USD',
            fundsStatus: '-',
            tokenReleased: '500',
            noofValidators: '-',
            validatorsStatus: '-'


        },
        {
            proposalNo: '0002',
            proposalType: 'Subsequent',
            FundsRequested: '10000 USD',
            fundsStatus: '-',
            tokenReleased: '300',
            noofValidators: '4',
            validatorsStatus: 'Approved'

        },

    ])

    const columns = [

        {
            title: 'Trail ID',
            dataIndex: 'proposalNo',
            align: 'center',
            // key: 'proposalNo',

        },

        {
            title: 'Date',
            // dataIndex: 'proposalType',
            align: 'center',
        },

        {
            title: 'Module',
            // dataIndex: 'FundsRequested',
            align: 'center',
        }, {
            title: 'Tabs',
            // dataIndex: 'fundsStatus',
            align: 'center',
        },
        , {
            title: 'Field',
            // dataIndex: 'tokenReleased',
            align: 'center',
        }, {
            title: 'New',
            // dataIndex: 'noofValidators',
            align: 'center',
        }, {
            title: 'Old',
            // dataIndex: 'validatorsStatus',
            align: 'center',
        }

    ]


    const createinitialfunc = () => {
        setcreateInitialProp(true)
    }
    const createSubseqPropfunc = () => {
        setcreateSubseqPropProp(true)
    }
    const handleClose = () => {
        setcreateInitialProp(false)
    }

    const handleCloseSubSequent = () => {
        setcreateSubseqPropProp(false)
    }
    return (
        <>

            <div className="row" style={{ marginBottom: '0px' }}>

                <div className="col-sm-12">




                    <div className="content container-fluid" style={{ padding: '0px' }}>
                        <div >
                            <div>

                                <div className="page-header">
                                    <div className="row align-items-center" style={{ width: '100%' }}>
                                        <div className="col">
                                            <h3 className="page-title" style={{ fontSize: '25px' }}>Audit Trails</h3>
                                        </div>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex">

                                        <div className="card card-table flex-fill" style={{ margin: '0px', border: '0px' }}>

                                            <div className="card-body">
                                                <div className="table-responsive">
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

                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </>
    );

}
export default AuditTrailPage;
