



import React, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import RecordExpenseModal from '../../Pages/Expense/Expense/RecordExpenseModal';
import AddVendorModal from '../../Pages/Expense/Expense/AddVendorModal';
import { apiURI } from '../../../../config/config';
// import InitialProposal from './InitialProposal';
// import SubSequentModal from './SubSequentModal';


const ProposalMainPage = () => {
    const [ShowGeneral, setShowGeneral] = useState(true)
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [createInitialProp, setcreateInitialProp] = useState(false)
    const [createSubseqPropProp, setcreateSubseqPropProp] = useState(false)

    const loginId = useSelector((state) => state.constVar.loginId)
    const [checkPage,setCheckPage] = useState([])

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
            dataIndex: 'proposal_id',
            align: 'center',
            key: 'proposal_id',

        },

        {
            title: 'Proposal Type',
            dataIndex: 'type',
            align: 'center',
        },

        {
            title: 'Funds Requested',
            dataIndex: 'funds_requested',
            align: 'center',
        }, {
            title: 'Funds Receipt Status',
            // dataIndex: 'fundsStatus',
            align: 'center',
        },
        , {
            title: 'Token Released',
            // dataIndex: 'tokenReleased',
            align: 'center',
        }, {
            title: 'No of Validations',
            // dataIndex: 'no_of_validators',
            align: 'center',
        }, {
            title: 'Validation Status',
            // dataIndex: 'validatorsStatus',
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


    const getUserDetailsFunc = () => {

        try {
    
    
            var query = `
            query GetProposal($id: ID) {
                getProposal(_id: $id) {
                  _id
                  proposal_id
                  name
                  type
                  funds_requested
                  price_per_token
                  number_of_tokens
                  tokens_locked_in_escrow
                  logo
                  
                  no_of_validators
                  proposal_status
                  reported_expenditure_previous_cycle
                  reported_expenditure_till_date
                  project {
                    _id
                    email_id
                    first_name
                    last_name
                    linkedin_profile_link
                    project_name
                    project_description
                    nature_of_project
                    project_start_date
                    project_tags
                    project_stage
                    website_link
                    github_repository
                    whitepaper
                    one_pager_document
                    pitch_deck
                    number_of_founders
                    team_size
                  }
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
                        "founder": loginId,
                    }
    
                })
            })
                .then((response) => {
    
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.getProposal);
                    if (data?.data?.getProposal != null && data?.data?.getProposal != undefined) {
                        setCheckPage([data?.data?.getProposal])
                    } else {
                        setCheckPage(data?.data?.getProposal)
                    }
    
                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    useEffect(() => {
        if (loginId != '') {
            getUserDetailsFunc()
        }

    }, [loginId])


    return (
        <>
                    {/* <div >
                       

                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}> */}

                            <div className="row" style={{ marginBottom: '20px' }}>
                                
                                <div className="col-sm-12">




                                    <div className="content container-fluid">
                                        <div >
                                            <div>

                                                <div className="page-header">
                                                    <div className="row align-items-center" style={{ width: '100%' }}>
                                                        <div className="col">
                                                            <h3 className="page-title" style={{ fontSize: '25px' }}>Proposals</h3>
                                                        </div>
                                                        <div className="col-auto float-right ml-auto">
                                                            <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                                            <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createinitialfunc()}> Create Initial Proposal</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 d-flex">

                                                        <div className="card card-table flex-fill">

                                                            <div className="card-body">
                                                                <div className="table-responsive">
                                                                    <Table
                                                                        pagination={{
                                                                            total: checkPage.length,
                                                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                                        }
                                                                        }
                                                                        style={{ overflowX: 'auto' }}
                                                                        columns={columns}
                                                                        bordered
                                                                        dataSource={checkPage}
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
export default ProposalMainPage;
