



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../paginationfunction';

const ProposalMainPage = () => {
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
            proposalNo: '0002',
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
            title: 'Proposal No',
            dataIndex: 'proposalNo',
            align: 'center',
            key: 'proposalNo',

        },

        {
            title: 'Proposal Type',
            dataIndex: 'proposalType',
            align: 'center',
        },

        {
            title: 'Funds Requested',
            dataIndex: 'FundsRequested',
            align: 'center',
        }, {
            title: 'Funds Receipt Status',
            dataIndex: 'fundsStatus',
            align: 'center',
        },
        , {
            title: 'Token Released',
            dataIndex: 'tokenReleased',
            align: 'center',
        }, {
            title: 'No of Validations',
            dataIndex: 'noofValidators',
            align: 'center',
        }, {
            title: 'Validation Status',
            dataIndex: 'validatorsStatus',
            align: 'center',
        }

    ]


    const createinitialfunc = () =>{
        setcreateInitialProp(true)
    }
    const createSubseqPropfunc = () =>{
        setcreateSubseqPropProp(true)
    }
    const handleClose = () =>{
        setcreateInitialProp(false)
    }
    
    const handleCloseSubSequent = () =>{
        setcreateSubseqPropProp(false)
    }
    return (
      
        <div className="card card-table flex-fill" style={{ border: '0px',margin: '0px', }}>

            <div className="card-body">
                <div className="content container-fluid" style={{padding:'0px'}}>
                        <div >
                            <div className="table-responsive" style={{ background: 'white' }}>

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

    );

}
export default ProposalMainPage;
