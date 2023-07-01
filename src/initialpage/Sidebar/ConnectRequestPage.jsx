import React, { useEffect, useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function ConnectRequestPage({
    handleClose,
    show
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
                    <Modal.Title>Connect Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>CANCEL</button>
                    </div> */}
                    

                </Modal.Footer>







            </Modal>
        </>
    );
}

export default ConnectRequestPage;