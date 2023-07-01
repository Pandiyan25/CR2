import React, { useEffect, useState } from 'react';

import { Button, Modal, } from "react-bootstrap";

import { Table } from 'antd';
import Rating from 'react-rating'
import { apiURI } from '../../../config/config';
import { itemRender, onShowSizeChange } from '../../paginationfunction';

function ProposalStatusPopup({ show, handleClose, proposalPartType }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


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
                    <Modal.Title>
                        { }
                        <h3 className="page-title" style={{ fontSize: '25px' }}>Proposal</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-body">


                                    <div className="col-sm-12">




                                        <div className="content container-fluid">
                                            {
                                                proposalPartType != null && proposalPartType != undefined && proposalPartType?.type == 'Initial' ?


                                                    <div className="row">
                                                        <div className="col-md-12">

                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                        <label style={{ width: '45%' }}>Investor </label>
                                                                        <div style={{ width: '50%' }}>
                                                                            <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.investor?.first_name}</label>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}> Currency </label>
                                                                        <div style={{ width: '50%' }}>
                                                                            <label > {proposalPartType != null && proposalPartType != undefined && proposalPartType?.currency}</label>

                                                                        </div>


                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}> Requested Amount </label>

                                                                        <label style={{ width: '50%' }}> {proposalPartType != null && proposalPartType != undefined && proposalPartType?.funds_requested}</label>


                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}> Receiving Address </label>

                                                                        <label style={{ width: '50%' }}> {proposalPartType != null && proposalPartType != undefined && proposalPartType?.receiving_address}</label>
                                                                    </div>
                                                                </div>


                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}>Price per Token </label>


                                                                        <label style={{ width: '50%' }}> {proposalPartType != null && proposalPartType != undefined && proposalPartType?.project_token_minted}</label>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}> Project Tokens Minted </label>
                                                                        <label style={{ width: '50%' }}> {proposalPartType != null && proposalPartType != undefined && proposalPartType?.price_per_token == true ? "Yes" : 'No'}</label>

                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                        <label style={{ width: '45%' }}> No of Token </label>

                                                                        <label style={{ width: '50%' }}> {proposalPartType != null && proposalPartType != undefined && proposalPartType?.number_of_tokens}</label>
                                                                    </div>
                                                                </div>

                                                                {proposalPartType != null && proposalPartType != undefined && proposalPartType?.price_per_token == true ?
                                                                    ''
                                                                    :
                                                                    <div className="col-md-12">
                                                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                            <label style={{ width: '45%' }}>Saft </label>


                                                                        </div>
                                                                    </div>

                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                    :

                                                    <>

                                                        <div className="row" >

                                                            <div className="col-sm-12">




                                                                <div className="content container-fluid">
                                                                    <div >
                                                                        <div>

                                                                            <form>

                                                                                <div className="row">
                                                                                    <div className="col-md-12">

                                                                                        <div className="row">


                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Previous Reporting Cycle </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.reported_expenditure_previous_cycle}</label>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Reported Expenditure</label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.reported_expenditure}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Reported Budget </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.reported_budget}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Variance </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.variants}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Current Proposal Cycle </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.current_proposal_cycle}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Budget for Current Proposal Cycle </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.budget_for_currenct_proposal_cycle}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Fund Request for Current Cycle </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.fund_requested_for_current_cycle}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Receiving Address</label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.receiving_address}</label>

                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Additional Information </label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.additional_information}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Additional Attachments</label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.additional_attachment}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Token Release</label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.token_release}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>


                                                                                            <div className="col-md-12">
                                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                                    <label style={{ width: '45%', }} >Investor</label>
                                                                                                    <div style={{ width: '50%' }}>
                                                                                                        <label >{proposalPartType != null && proposalPartType != undefined && proposalPartType?.investor?.email}</label>


                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                    {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                        <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                                                                </div>

                                                            </div>


                                                        </div>

                                                    </>
                                            }



                                        </div>

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

export default ProposalStatusPopup;