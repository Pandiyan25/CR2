import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";


function SocialModal({
    show,
    handleClose,
    checkData,
    setcheckData,
    twitter,
    settwitter,
    Instagram,
    setInstagram,
    Medium,
    setMedium,
    facebook,
    setfacebook,
    LinkedIn,
    setLinkedIn,
    Discord,
    setDiscord,
    Reddit,
    setReddit,
    Telegram,
    setTelegram,
    updateSocialFunc,
    createSocialFunc,
    youTube,
    setyouTube,
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
                    <Modal.Title>Socials - Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Twitter:</label>
                                            <input type="text" className="form-control" defaultValue={twitter} onChange={(e) => settwitter(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Instagram:</label>
                                            <input type="text" className="form-control" defaultValue={Instagram} onChange={(e) => setInstagram(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Medium:</label>
                                            <input type="text" className="form-control" defaultValue={Medium} onChange={(e) => setMedium(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Facebook:</label>
                                            <input type="text" className="form-control" defaultValue={facebook} onChange={(e) => setfacebook(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>LinkedIn:</label>
                                            <input type="text" className="form-control" defaultValue={LinkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Discord:</label>
                                            <input type="text" className="form-control" defaultValue={Discord} onChange={(e) => setDiscord(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Telegram:</label>
                                            <input type="text" className="form-control" defaultValue={Telegram} onChange={(e) => setTelegram(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Reddit:</label>
                                            <input type="text" className="form-control" defaultValue={Reddit} onChange={(e) => setReddit(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Youtube:</label>
                                            <input type="text" className="form-control" defaultValue={youTube} onChange={(e) => setyouTube(e.target.value)} />
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
                        checkData != null && checkData != undefined && checkData != '' ?
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => updateSocialFunc()}>SAVE</button>
                            </div>
                            :
                            <div className="submit-section">
                                <button className="btn btn-primary submit-btn" onClick={() => createSocialFunc()}>SAVE</button>
                            </div>
                    }


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default SocialModal;