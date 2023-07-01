import React, { useEffect, useState } from 'react';

import { Button, Modal, } from "react-bootstrap";

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import "../../index.css";
import "./index.css";
import Rating from 'react-rating'
import { apiURI } from '../../../config/config';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import './proposalPopup.css'

function ProposalPopup({ show, handleClose, proposalid, aLLValidatedProposal }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
   

    const columns = [

        {
            title: 'Validator Id',
            //   dataIndex: 'proposalNo',
            align: 'center',

            width: 40,
            render: (text, record) => (

                <div style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => showProposalsDataFun(text)}>{text?.user?.id_number}</div>
                // onClick={() => showProposalsDataFun(i)}
            ),
            sorter: (a, b) => a?.user?.id_number?.length - b?.user?.id_number?.length,
        },


        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',

            width: 40,
            sorter: (a, b) => a?.status?.length - b?.status?.length,
        },
        {
            title: 'Rate a Validator',
            // dataIndex: 'rating',
            align: 'center',
            // sorter: (a, b) => a.rateProject.length - b.rateProject.length,
            render: (text, record) => (
              <Rating
                style={{ color: 'red' }}
                emptySymbol="fa fa-star-o fa-mx"
                fullSymbol="fa fa-star fa-mx"
                initialRating={text?.user?.profile_rating.length > 0 ? text?.user?.profile_rating[0].value :0}
                // onChange={(e)=>rateValidatorFunc(text,e.target.value)}
                onChange={(rate) => rateValidatorFunc(text,rate)}
                // readonly={true}
                // initialRating={text}
              />
            ),
            // align: 'center',
            width: 40,
          }, 
        {
            title: 'Conclusion Remarks',
            dataIndex: 'remarks',
            align: 'center',
            width: 120,
            //   sorter: (a, b) => a.age.length - b.age.length,
        }, 


    ]

    const rateValidatorFunc  = (i,value) =>{
        console.log(i,value,"LOLO");
        try {

            var query = `
            mutation Mutation($input: UserInput, $id: ID) {
                updateUser(input: $input, _id: $id) {
                  profile_rating {
                    value
                    user_role
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
                    variables:
                    {
                        "input": {
                          "profile_rating": [
                            {
                              "value": value,
                              "user_role": "Validator"
                            }
                          ]
                        },
                        "id": i?.user?._id
                      }
                    // {
                    //     "proposal": id,

                    // }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data);
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
                    <Modal.Title>Rate a Validator</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-body">
                                    {/* <div className="table-responsive" style={{ border: '2px solid #E3E9EF', borderRadius: '15px' }}>
                                        <table className="table table-nowrap custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Validator Id</th>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>Conclusion Remarks</th>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {aLLValidatedProposal.length > 0 && aLLValidatedProposal.map((i) => (
                                                    <tr>
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i?.user?.id_number}</td>
                                                        <td style={{ textAlign: 'center' }}>{i?.remarks}</td>
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i?.status}</td>

                                                    </tr>)
                                                )}


                                            </tbody>
                                        </table>
                                    </div> */}

                                    {/* <div style={{ padding: '20px', background: 'white', border: '2px solid #E3E9EF', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}> */}
                                        <div className="table-responsive" style={{ border: '2px solid #E3E9EF', borderRadius: '10px', background: 'white' }}>

                                            <Table
                                                pagination={{
                                                    total: aLLValidatedProposal?.length,
                                                    // showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                }}
                                                style={{ overflowX: 'auto', whiteSpace: 'pre' }}
                                                columns={columns}
                                                bordered
                                                dataSource={aLLValidatedProposal}
                                                rowKey={record => record.id}
                                            // onChange={this.handleTableChange}
                                            />
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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

export default ProposalPopup;