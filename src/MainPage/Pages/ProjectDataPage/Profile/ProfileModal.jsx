import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function ProfileModal({ show, handleClose }) {

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
                    <Modal.Title>Funding</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                   
                        <div className="row">
                            <div className="col-md-12">
                                
                                <div className="row">
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Total Fund Raise Target:<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Fund Raised till Date<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                     
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>No of Investor till Date<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Lead Investor:<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Stage of Funding :<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Primary Funding wallet Address :<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    
{/*                                   
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Project<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }}>Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Primary Funding Wallet Address Network :<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div>
                                    
                                  
                                    

                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{borderTop:'0px',justifyContent:'end'}}>
                <div className="submit-section">
                  <button className="btn  submit-btn" onClick={()=>handleClose()} style={{background: 'white',border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)"}}>CANCEL</button>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">SAVE</button>
                </div>
                   
                </Modal.Footer>








            </Modal>
        </>
    );
}

export default ProfileModal;