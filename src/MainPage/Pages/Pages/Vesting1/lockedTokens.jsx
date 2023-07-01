

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Rating from 'react-rating'

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

const LockedTokens = () => {
    const [addVendor, showAddVendor] = useState(false)
    const [recordExpense, showRecordExpense] = useState(false)

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)

    const data = [
        {
            projectId:'Gua0041',
            projectname:'Cr2Founder',
            token:'CR2',
            tgeDate:'06/06/2022',
            tokenAlloted:'100',
            releaseTge:'10',
            cliff:'24',
            vestingStartDate:'06/06/2022',
            vestingMonth:'10',
            vestingEndDate:'06/06/2022'
        },
        {
            projectId:'Gua0041',
            projectname:'Cr2Founder',
            token:'CR2',
            tgeDate:'06/06/2022',
            tokenAlloted:'100',
            releaseTge:'10',
            cliff:'24',
            vestingStartDate:'06/06/2022',
            vestingMonth:'10',
            vestingEndDate:'06/06/2022'
        }
    ];


    const columns = [

        {
            title: 'Project ID',
            dataIndex: 'projectId',
            align: 'center',

        },

        {
            title: 'Project Name',
            dataIndex: 'projectname',
            align: 'center',
        },

        {
            title: 'Token',
            dataIndex: 'token',
            align: 'center',
        }, {
            title: 'TGE Date',
            dataIndex: 'tgeDate',
            align: 'center',
        },
        , {
            title: 'Tokens Alloted',
            dataIndex: 'tokenAlloted',
            align: 'center',
        }, {
            title: 'Release Percentage at TGE',
            dataIndex: 'releaseTge',
            align: 'center',
        }, {
            title: 'Cliff Months',
            dataIndex: 'cliff',
            align: 'center',
        }, {
            title: 'Vesting Start Date',
            dataIndex: 'vestingStartDate',
            align: 'center',
        }, {
            title: 'Vesting Months',
            dataIndex: 'vestingMonth',
            align: 'center',
        }, {
            title: 'Vesting End Date',
            dataIndex: 'vestingEndDate',
            align: 'center',
        },

    ]





    return (


        <div className="content container-fluid">
            <div >
                <div>

                    <div className="page-header">
                        <div className="row align-items-center" style={{ width: '100%' }}>
                            {/* <div className="col">
                <h3 className="page-title" style={{ fontSize: '25px' }}>Expense</h3>
              </div> */}
                            {/* <div className="col-auto float-right ml-auto">
                <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => addVendorShowfunc()}> Add Vendor</button>

                <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => recordExpenseShowfunc()}> Record Expense</button>
              </div> */}
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

                </div>
            </div>
        </div>
    );
}

export default LockedTokens;
