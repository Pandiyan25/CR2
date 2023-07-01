import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function ProfileEditModal({ 
    emailId,
    setEmailId,
    firstName,
    setfirstName,
    lastName,
    setlastName,
    education,
    seteducation,
    Experience,
    setExperience,
    expInBlockChain,
    setexpInBlockChain,
    Industry,
    setIndustry,
    selfDesc,
    setselfDesc,
    currentRole,
    setcurrentRole,

    show,
    handleClose,
    checkPage,
    saveNewPojectData,
    editAndSaveData }) {

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
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                
                                <div className="row">
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" className="form-control"   defaultValue={firstName} onChange={(e) => setfirstName(e.target.value)} />
                                        </div>
                                    </div>
                                <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" className="form-control"   defaultValue={lastName} onChange={(e) => setlastName(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email Id:</label>
                                            <input type="email" className="form-control"   defaultValue={emailId} onChange={(e) => setEmailId(e.target.value)} />
                                        </div>
                                    </div>
                                     
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Education</label>
                                            <input type="text" className="form-control"   defaultValue={education} onChange={(e) => seteducation(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience</label>
                                            <input type="text" className="form-control"   defaultValue={Experience} onChange={(e) => setExperience(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Industry</label>
                                            <input type="text" className="form-control"   defaultValue={Industry} onChange={(e) => setIndustry(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience in Blockchain Industry:</label>
                                            <input type="text" className="form-control"   defaultValue={expInBlockChain} onChange={(e) => setexpInBlockChain(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Self Description</label>
                                            <input type="text" className="form-control"   defaultValue={selfDesc} onChange={(e) => setselfDesc(e.target.value)} />
                                        </div>
                                    </div>
                                    
{/*                                   
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Project</label>
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
                                            <label>Current Role:</label>
                                            <input type="text" className="form-control"   defaultValue={currentRole} onChange={(e) => setcurrentRole(e.target.value)} />
                                        </div>
                                    </div>
                                    
                                  
                                    

                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{borderTop:'0px',justifyContent:'center'}}>
                <div className="submit-section">
                  <button className="btn  submit-btn" onClick={()=>handleClose()} style={{background: 'white',border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)"}}>CANCEL</button>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" onClick={()=>editAndSaveData()} >SAVE</button>
                </div>
                   
                </Modal.Footer>








            </Modal>
        </>
    );
}

export default ProfileEditModal;