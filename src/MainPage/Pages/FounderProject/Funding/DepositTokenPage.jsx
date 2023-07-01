import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function DepositTokenPage({
    show,handleClose
})

{
const createFundingDetails = () =>{

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
                                            {/* <input type="text" className="form-control" defaultValue={totalFundRaise} onChange={(e) => setTotalFundRaise(e.target.value)} /> */}
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
                    
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={()=>createFundingDetails()}>Deposit</button>
                            </div>
                    


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default DepositTokenPage;