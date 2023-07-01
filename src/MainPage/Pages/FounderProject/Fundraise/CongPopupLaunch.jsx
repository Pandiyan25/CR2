import React, { useEffect, useState } from 'react';
import { Button, Modal, } from "react-bootstrap";

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../assets/lottie/96673-success.json'


function CongPopupLaunch({ handleClose, show,PublicRound }) {
    setTimeout(()=>{
        if(show == true){
            handleClose()
        }
    },3000)

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xs"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                </Modal.Header>
                <Modal.Body>
                    {/* <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_lk80fpsm.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop controls autoplay></lottie-player> */}
                    <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        style={{ width: '100%', height: '150px',textAlign:'center',marginBottom:'20px' }}
                    />
                    <h5 style={{ textAlign: 'center', fontSize: '20px', color: '#1890ff', fontWeight: 'bold' }}>
                    Congratulations !
                    </h5>
                    <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#333' }} >
                        {PublicRound}
                    </p>


                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>




                </Modal.Footer>







            </Modal>
        </>
    );
}

export default CongPopupLaunch;