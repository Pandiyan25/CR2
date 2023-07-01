import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


function InviteMailModal({

    show,
    handleClose,
}) {

    const loginId = useSelector((state) => state.constVar.loginId)
    const projectNumber = useSelector((state) => state.constVar.projectId)
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailId1, setEmailId1] = useState('')

    const sendReqMail = () => {
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = pattern.test(email);
        if (result == true) {
            sendhandleMailfunc()
            setEmailId1(false)
        } else {
            setEmailId1(true)

        }
    }

    const sendhandleMailfunc = () => {
        try {
            var query = `
            mutation InviteFounder($input: InviteMailInput) {
                inviteFounder(input: $input)
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
                        "input": {
                            "name": Name,
                            "email": email,
                            "project": projectNumber,
                            "role": "Co-Founder",
                            "user": loginId
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data, "data in Team");
                    if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Success') {
                        setName('')
                        setEmail('')

                        toast.success('Successfully Send Mail', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        handleClose()
                    } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_already_exists') {

                        alert('User Already exist')
                        setEmailId1(true)
                    } else if (data?.data?.inviteFounder != null && data?.data?.inviteFounder != undefined && data?.data?.inviteFounder != '' && data?.data?.inviteFounder == 'Email_has_already_sent') {
                        alert('Mail has already sent to this account')
                        // 
                    } else {
                        setEmailId1(true)
                    }

                    // getSocialMediaDataFunc()
                })


        } catch (error) {
            console.log("adding new Team member error");
        }
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
                    <Modal.Title>INVITE TEAM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name :</label>
                                            <input type="text" className="form-control" defaultValue={Name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email :</label>
                                            <input type="email" className="form-control" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                                            {emailId1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Email Id</div>}

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>

                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => sendReqMail()}>SEND</button>
                    </div>



                </Modal.Footer>




                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />




            </Modal>
        </>
    );
}

export default InviteMailModal;