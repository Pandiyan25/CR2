



import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { apiURI } from '../../../../config/config';
// import InitialProposal from './InitialProposal';
// import SubSequentModal from './SubSequentModal';


const AuditTrailPage = () => {
    const [auditTrailData, setAuditTrailData] = useState([])
    const [ShowGeneral, setShowGeneral] = useState(true)
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [createInitialProp, setcreateInitialProp] = useState(false)
    const [createSubseqPropProp, setcreateSubseqPropProp] = useState(false)


    const projectId = useSelector((state) => state.constVar.projectId)
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
            dataIndex: 'trail_id',
            align: 'center',
            sorter: (a, b) => a?.trail_id.localeCompare(b?.trail_id),
            // key: 'proposalNo',

        },

        {
            title: 'Date',
            // dataIndex: 'date',
            render: (text, record) => (

                <div >{text?.date}</div>


            ),
            align: 'center',
            sorter: (a, b) => new Date(a?.date) - new Date(b?.date),
        },

        {
            title: 'Module',
            dataIndex: 'module',
            align: 'center',
            sorter: (a, b) => a?.module.localeCompare(b?.module),
        }, {
            title: 'Tabs',
            dataIndex: 'tabs',
            align: 'center',
            sorter: (a, b) => a?.tabs.localeCompare(b?.tabs),
        },
        , {
            title: 'Field',
            dataIndex: 'field',
            align: 'center',
            sorter: (a, b) => a?.field.localeCompare(b?.field),
        }, {
            title: 'New',
            dataIndex: 'new_record',
            align: 'center',
            // sorter: (a, b) => a?.new_record.localeCompare(b?.new_record),
        }, {
            title: 'Old',
            dataIndex: 'old_record',
            align: 'center',
            // sorter: (a, b) => a?.old_record.localeCompare(b?.old_record),
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

    const getUserDashboardFunc = () => {

        try {


            var query = `
            query Query($project: ID) {
                allAuditTrails(project: $project) {
                  _id
                  trail_id
                  date
                  module
                  tabs
                  field
                  new_record
                  old_record
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
                        "project": projectId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderGraphs', data?.data?.allAuditTrails);
                    if (data?.data?.allAuditTrails != null && data?.data?.allAuditTrails != undefined) {
                        var arr = [];
                        if (data?.data?.allAuditTrails.length > 0) {
                            for (var i = 0; i < data?.data?.allAuditTrails.length > 0; i++) {

                                // var date1 = new Date(data?.data?.allAuditTrails[i]?.date);
                                console.log(data?.data?.allAuditTrails[i]?.date, "date1");
                                var date =data?.data?.allAuditTrails[i]?.date
                                date = date.split('T')[0];

                                arr.push({

                                    trail_id: data?.data?.allAuditTrails[i]?.trail_id,
                                    module: data?.data?.allAuditTrails[i]?.module,
                                    tabs: data?.data?.allAuditTrails[i]?.tabs,
                                    field: data?.data?.allAuditTrails[i]?.field,
                                    new_record: data?.data?.allAuditTrails[i]?.new_record,
                                    old_record: data?.data?.allAuditTrails[i]?.old_record,
                                    date: date,
                                })
                            }
                        }



                        setAuditTrailData(arr)

                    } else {
                        setAuditTrailData([])
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    console.log(auditTrailData,":auditTrailData");

    useEffect(() => {
        if (projectId != '') {
            getUserDashboardFunc()
        }

    }, [projectId])

    return (
        <>
            {/* <div >
                       

                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}> */}

            <div className="row" style={{ marginBottom: '0px' }}>

                <div className="col-sm-12">




                    <div className="content container-fluid" style={{padding:'0px'}}>
                        <div >
                            <div>

                                <div className="page-header">
                                    <div className="row align-items-center" style={{ width: '100%' }}>
                                        <div className="col">
                                            <h3 className="page-title" style={{ fontSize: '25px' }}>Audit Trail</h3>
                                        </div>
                                        {/* <div className="col-auto float-right ml-auto">
                                                            <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                                            <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createinitialfunc()}> Create Initial Proposal</button>
                                                        </div> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex">

                                        <div className="card card-table flex-fill" style={{margin:'0px',border:'0px'}}>

                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Table
                                                        pagination={{
                                                            total: auditTrailData.length,
                                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                        }
                                                        }
                                                        style={{ overflowX: 'auto' }}
                                                        columns={columns}
                                                        bordered
                                                        dataSource={auditTrailData}
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
                        {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                                        <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                    </div>

                </div>


            </div>
            {/* </div>

                    </div> */}

        </>
    );

}
export default AuditTrailPage;
