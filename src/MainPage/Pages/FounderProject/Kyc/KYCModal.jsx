import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function KYCModal({
    show,

    checkData,
    setcheckData,
    Education,
    setEducation,
    Experience,
    setExperience,
    Industry,
    setIndustry,
    expInBlockChain, Chain,
    setexpInBlockChain,
    publicLaunchPrice,
    setpublicLaunchPrice,
    exptTokenGen,
    setexptTokenGen,
    totalTokenSupplyBreakUp,
    settotalTokenSupplyBreakUp,
    settotalTokenSupply,
    totalTokenSupply,
    Telegram,
    createKycDataFunc,
    updateKycDataFunc,
    setTelegram,

    youTube,
    setyouTube,
    handleClose,
    currentRole,
    setCurrentRole,
    pastOrgTags,
    setpastOrgTags,
    currentIncome,
    setcurrentIncome,
    CurrLoc,
    setCurrLoc,
    natonality,
    setnatonality,
    idProof,
    setidProof,
    idNum,
    setidNum,
    incorporated,
    setincorporated,
    legalEnty,
    setlegalEnty,
    judLegalEnty,
    setjudLegalEnty,
    regOfficeEnt,
    setregOfficeEnt,
    incorp,
    setincorp,
    lawsEnty,
    setlawsEnty,
    membEnty,
    setmembEnty,
    diroEnty,
    setdiroEnty,

    CurIncomeErr,
    CurrLocErr,
    natonalityErr,
    idProofErr,
    idNumErr,
    regOfficeEntErr,

    judLegalEntyErr,

    legalEntyErr,
    incorpErr,
    ncorporatedErr,
    educationErr,
    lawsEntyErr,
    membEntyErr,
}) {

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
                    <Modal.Title>KYC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Education:<span className="text-danger">*</span></label>
                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={Education} onChange={(e) => setEducation(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="High School">High School</option>
                                                    <option style={{ fontSize: '13px' }} value="Graduate">Graduate</option>
                                                    <option style={{ fontSize: '13px' }} value="Post Graduate">Post Graduate </option>
                                                    <option style={{ fontSize: '13px' }} value="PHD">PHD </option>
                                                    <option style={{ fontSize: '13px' }} value="Professional">Professional </option>
                                                    <option style={{ fontSize: '13px' }} value="others">others </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience</label>
                                            <input type="text" className="form-control" defaultValue={Experience} onChange={(e) => setExperience(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Industry:</label>
                                            <input type="text" className="form-control" defaultValue={Industry} onChange={(e) => setIndustry(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience in Blockchain Industry:</label>
                                            <input type="text" className="form-control" defaultValue={expInBlockChain} onChange={(e) => setexpInBlockChain(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Public Launch Price :</label>
                                            <input type="text" className="form-control" defaultValue={publicLaunchPrice} onChange={(e) => setpublicLaunchPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expected Token Generation Event :</label>
                                            <input type="text" className="form-control" defaultValue={exptTokenGen} onChange={(e) => setexptTokenGen(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Total Token  Supply :</label>
                                            <input type="text" className="form-control" defaultValue={totalTokenSupply} onChange={(e) => settotalTokenSupply(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Total Supply Breakup:</label>
                                            <input type="text" className="form-control" defaultValue={totalTokenSupplyBreakUp} onChange={(e) => settotalTokenSupplyBreakUp(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Role :</label>
                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={currentRole} onChange={(e) => setCurrentRole(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Founder">Founder</option>
                                                    <option style={{ fontSize: '13px' }} value="Co Founder">Co Founder</option>
                                                    <option style={{ fontSize: '13px' }} value="C.E.O">C.E.O </option>
                                                    <option style={{ fontSize: '13px' }} value="C.O.O">C.O.O </option>
                                                    <option style={{ fontSize: '13px' }} value="C.T.O">C.T.O </option>
                                                    <option style={{ fontSize: '13px' }} value="Manager">Manager </option>
                                                    <option style={{ fontSize: '13px' }} value="C.F.O">C.F.O </option>
                                                    <option style={{ fontSize: '13px' }} value="others">others </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Past Organisation Tags :</label>
                                            <input type="text" className="form-control" defaultValue={pastOrgTags} onChange={(e) => setpastOrgTags(e.target.value)} />

                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Income :<span className="text-danger">*</span></label>

                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={currentIncome} onChange={(e) => setcurrentIncome(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="0-10k">0-10k</option>
                                                    <option style={{ fontSize: '13px' }} value="10-25k">10-25k</option>
                                                    <option style={{ fontSize: '13px' }} value="25-75k">25-75k </option>
                                                    <option style={{ fontSize: '13px' }} value="75-150k">75-150k </option>
                                                    <option style={{ fontSize: '13px' }} value="above">above </option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                    {CurIncomeErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Select Income Details</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Location :<span className="text-danger">*</span></label>

                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={CurrLoc} onChange={(e) => setCurrLoc(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="India">India</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {CurrLocErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Select Current Location</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Nationality:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={natonality} onChange={(e) => setnatonality(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {natonalityErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Nationality Details</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>ID Proof :<span className="text-danger">*</span></label>

                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={idProof} onChange={(e) => setidProof(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Pan Card">Pan Card</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {idProofErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Select ID Proof</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Id Number:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={idNum} onChange={(e) => setidNum(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {idNumErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Select ID Number</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Are you Incorporated :<span className="text-danger">*</span></label>

                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={incorporated} onChange={(e) => setincorporated(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Yes">Yes</option>
                                                    <option style={{ fontSize: '13px' }} value="No">No</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {incorpErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Select Are you Incorporated</div>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Legal Entity:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={legalEnty} onChange={(e) => setlegalEnty(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {legalEntyErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Name of Legal Entity</div>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Jurisdiction of legal Entity:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={judLegalEnty} onChange={(e) => setjudLegalEnty(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {judLegalEntyErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Jurisdiction of legal Entity</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Registered office of legal entity:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={regOfficeEnt} onChange={(e) => setregOfficeEnt(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {regOfficeEntErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Registered office of legal entity</div>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Certificate of Incorporation:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={incorp} onChange={(e) => setincorp(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {incorpErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Certificate of Incorporation</div>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Memorandum/Articles/Bye laws of the Entity:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={lawsEnty} onChange={(e) => setlawsEnty(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {lawsEntyErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Memorandum/Articles/Bye laws of the Entity</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Register of Members of the Entity:<span className="text-danger">*</span></label>

                                            <input type="text" className="form-control" defaultValue={membEnty} onChange={(e) => setmembEnty(e.target.value)} />

                                        </div>
                                    </div>
                                    <div className="form-group">
                                    {membEntyErr == true ?
                                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Register of Members of the Entity</div>
                                        :
                                        ''
                                    }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Register of Directors of the Entity:</label>

                                            <input type="text" className="form-control" defaultValue={diroEnty} onChange={(e) => setdiroEnty(e.target.value)} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    {
                        checkData != null && checkData != undefined && checkData.length > 0 ?
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => updateKycDataFunc()}>SAVE</button>
                            </div>
                            :
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => createKycDataFunc()}>SAVE</button>
                            </div>
                    }


                </Modal.Footer>







            </Modal>
        </>
    );
}

export default KYCModal;