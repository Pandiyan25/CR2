import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, } from "react-bootstrap";
import {IoIosWarning }from 'react-icons/io'
import { apiURI } from '../../../config/config';


function RejectInvestorStatusModal({ show, handleClose,publicId }) {

    const [Reason,setReason] = useState('')

    const RejectedStatusFunc = () => {



        var query = `
                mutation Mutation($id: ID, $input: FundraiseInput) {
                    updateFundraise(_id: $id, input: $input) {
                      _id
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
                    "id": publicId,
                    "input": {
                        "investor_status": 'Rejected',
                        "founder_status": 'Rejected',
                        // "investor_status": 'Rejected',
                        "remarks":Reason
                    }
                }

            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(data => {
                // console.log('getFounderUserDetails', data?.data?.allProjects);
                if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
                    // dispatch(projectId(data?.data?.allProjects[0]._id))
                   
                    // getFundingRound()
                    handleClose()
                }

            })




    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Reject</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <div className="col-md-12">
                    <div className="row">
                        <div style={{width:'100%'}}>
                            <IoIosWarning style={{fontSize:'90px',textAlign:'center',width:'100%',color:'red'}} />
                            <div style={{fontWeight:'bolder',textAlign:'center'}}>
                            You have rejected the request. Please provide reason
                            </div>
                            <div>
                                <div style={{fontWeight:'bolder',marginTop:'20px',marginBottom:'20px'}}>Reason</div>
                                <textarea style={{width:'100%',minHeight:'180px'}} onChange={(e)=>setReason(e.target.value)} />
                            </div>
                        </div>
                      
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" style={{ background: '#1890ff', border: '1px solid #1890ff', color: 'white' }} onClick={()=>RejectedStatusFunc()}>Submit</button>
                    </div>

                </Modal.Footer>










            </Modal>
        </>
    );
}

export default RejectInvestorStatusModal;