import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";

import Rating from 'react-rating'

function ProposalPopup({ show, handleClose,aLLValidatedProposal }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [tableData, settableData] = useState([
        {
            sno: 1,
            ValidatorId: 'v001',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Approved',
            rateValidator: '2',


        },
        {
            sno: 2,
            ValidatorId: 'v002',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Approved',
            rateValidator: '3',


        },
        {
            sno: 3,
            ValidatorId: 'v003',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Approved',
            rateValidator: '4',


        },
        {
            sno: 4,
            ValidatorId: 'v004',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Approved',
            rateValidator: '5',


        },
        {
            sno: 5,
            ValidatorId: 'v005',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Approved',
            rateValidator: '2',


        },
        {
            sno: 6,
            ValidatorId: 'v006',
            remarks: 'Futuristic',
            type: 'Initial',
            status: 'Rejected',
            rateValidator: '1',


        }
    ])

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
                                    <div className="table-responsive" style={{border:'2px solid #E3E9EF',borderRadius:'15px'}}>
                                        <table className="table table-nowrap custom-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Validator Id</th>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>Conclusion Remarks</th>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Status</th>
                                                    <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Rate Validator</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {aLLValidatedProposal.length > 0 && aLLValidatedProposal.map((i) => (
                                                    <tr>
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i?.user?.id_number}</td>
                                                        <td style={{ textAlign: 'center' }}>{i?.remarks}</td>
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i?.status}</td>
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                            <Rating
                                                                style={{ color: 'red' }}
                                                                emptySymbol="fa fa-star-o fa-mx"
                                                                fullSymbol="fa fa-star fa-mx"
                                                                // readonly={true}
                                                                // initialRating={i.rateValidator}
                                                                spacing={10}
                                                            />
                                                        </td>
                                                    </tr>)
                                                )}


                                            </tbody>
                                        </table>
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