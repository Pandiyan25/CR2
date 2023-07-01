import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import {IoIosWarning }from 'react-icons/io'


function RejectStatusModal({ remarks,setRemarks,rejPrivate,show, handleClose }) {


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
                                <textarea style={{width:'100%',minHeight:'180px'}} defaultValue={remarks} onChange={(e)=>setRemarks(e.target.value)} />
                            </div>
                        </div>
                      
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" style={{ background: '#1890ff', border: '1px solid #1890ff', color: 'white' }} onClick={()=>rejPrivate()}>Submit</button>
                    </div>

                </Modal.Footer>










            </Modal>
        </>
    );
}

export default RejectStatusModal;