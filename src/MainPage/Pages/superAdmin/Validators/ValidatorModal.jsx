import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';


import { Table } from 'antd';
import 'antd/dist/antd.css';

import "../../../antdstyle.css";
import { useSelector } from 'react-redux';
import "../../../index.css"
function ValidatorModal({ rewardData, projectDropdownData, show, handleClose }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const TodayDate = new Date();
    const todatMainDate = () => {
        if(TodayDate.getDate().length > 0 && TodayDate.getMonth().length > 0){
            return TodayDate.getFullYear()  +"-" +(TodayDate.getMonth() + 1) +"-" +  TodayDate.getDate();
        }else if(TodayDate.getDate().length > 0 ){
            
            return TodayDate.getFullYear()  +"-" +(TodayDate.getMonth() + 1) +"-" +  `0${TodayDate.getDate()}`;
        }else{ 
            return TodayDate.getFullYear()  +"-" +`0${(TodayDate.getMonth() + 1)}` +"-" +  TodayDate.getDate();
        }

    }
    const [typeOfRewards, setTypeOfRewards] = useState("")
    const [proposalId, setProposalId] = useState("")
    const [dateValue, setDateValue] = useState("")
    const [cr2Tokens, setCr2Tokens] = useState(0)
    const [projectDetalsData, setProjectDetalsData] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)
    var date = TodayDate.toISOString().substr(0, 10);
    const [tableData, settableData] = useState([
        {
            sno: 1,
            date: '21/2/2022 ',
            ProjectID: '001',
            TokensAllocated: '10000',
            Status: 'Claimed',


        },
        {

            sno: 2,
            date: '21/2/2022 ',
            ProjectID: '001',
            TokensAllocated: '10000',
            Status: 'UnClaimed',

        },

    ])

    const columns = [
        // {
        //   title: 'S.No',
        //   dataIndex: 'sno',
        //   align: 'center',
        //   sorter: (a, b) => a.sno.length - b.sno.length,
        // },

        {
            title: 'Date',
            dataIndex: 'reward_date',
            align: 'center',

            sorter: (a, b) => a.reward_date.length - b.reward_date.length,

        },
        // {
        //     title: 'Profile ID',
        //     dataIndex: 'ProjectID',
        //     align: 'center',

        //     sorter: (a, b) => a.ProjectID.length - b.ProjectID.length,

        // },

        {
            title: 'Proposal ID',
            dataIndex: 'ProjectID',
            align: 'center',

            // sorter: (a, b) => a.ProjectID.length - b.ProjectID.length,

        },
        {
            title: 'Tokens Allocated ',
            dataIndex: 'no_of_cr2_tokens',

            align: 'center',
            sorter: (a, b) => a.no_of_cr2_tokens.length - b.no_of_cr2_tokens.length,
        },

        {
            title: 'Status',
            dataIndex: 'Status',

            align: 'center',
            // sorter: (a, b) => a.Status.length - b.Status.length,
        },
    ]

    console.log(dateValue, "dateValue");

    const getProjectDetailsFunc = () => {
        try {

            var query =
                `
            query GetValidatorToken($user: ID) {
                allValidatorToken(user: $user) {
                  _id
                  reward_id
                  no_of_cr2_tokens
                  project
                  status
                  validator
                  value_in_usd
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
                        "user": loginId
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.allValidatorToken != null && data?.data?.allValidatorToken != undefined) {
                        setProjectDetalsData(data?.data?.allValidatorToken)

                        //  console.log();
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const allocateValueFunc = () => {
        try {

            var query =
                `
            mutation CreateReward($input: RewardInput) {
                createReward(input: $input) {
                  _id
                  reward_date
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
                        "input": {
                            "reward_date": dateValue,
                            "type_of_reward": "Proposal",
                            "validator": projectDropdownData[0].user._id,
                            "no_of_cr2_tokens": cr2Tokens
                        }
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.allValidatorToken != null && data?.data?.allValidatorToken != undefined) {
                        setProjectDetalsData(data?.data?.allValidatorToken)

                        //  console.log();
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Rewards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <form> */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Date : </label>
                                <input type="date" min={todatMainDate} defaultValue={date} className="form-control" onChange={(e) => setDateValue(e.target.value)} />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>No. Of CR2 Tokens :</label>
                                <input type="number" className="form-control" onChange={(e) => setCr2Tokens(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Proposal ID :</label>

                                {/* <input type="text" className="form-control" /> */}
                                <div>
                                    <select className="form-control btn-block-height square-edges" onChange={(e) => setProposalId(e.target.value)}>
                                        <option style={{ fontSize: '13px' }}>Select Project</option>
                                        {projectDropdownData.length > 0 &&
                                            projectDropdownData.map((i) => (

                                                <option style={{ fontSize: '13px' }} value={i?.proposal?._id}>{i?.proposal?.proposal_id}</option>
                                            ))}
                                        {/* <option style={{ fontSize: '13px' }} value="BCOM">BCOM</option>
                                            <option style={{ fontSize: '13px' }} value="MTECH">MTECH</option> */}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label></label>
                                <div>
                                    <button className="form-control" style={{ background: '#6345ED', color: 'white', border: '2px solid #6345ED', width: '105px', fontSize: '15px', borderRadius: '50px' }}
                                        onClick={() => allocateValueFunc()}
                                    >Allocate</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-table flex-fill">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: rewardData.length,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }
                                            }
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            bordered
                                            dataSource={rewardData}
                                            rowKey={record => record.id}
                                        // onChange={this.handleTableChange}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    <div className="submit-section" style={{ margin: '0px' }}>
                        <button className="btn  submit-btn" onClick={() => handleClose()}>Back</button>
                    </div>

                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save</Button> */}
                </Modal.Footer>








            </Modal>
        </>
    );
}

export default ValidatorModal;