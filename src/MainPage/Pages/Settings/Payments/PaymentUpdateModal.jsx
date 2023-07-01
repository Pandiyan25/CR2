import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';


function PaymentUpdateModal({ 
    
    show, 
    address,
    setaddress,
    network,
    setnetwork,
    location,
    setlocation,
    bankAccountnum,
    setbankAccountnum,
    bankName,
    setbankName,
    primaryCurrency,
    setprimaryCurrency,
    setCoin,
    Coin,
    checkData, 
     handleClose, 
     updatePaymentDetailsFunc
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
                    {/* <Modal.Title>Project</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group"></div>
                                        <h3 className="card-title">Edit Payments:</h3>
                                    </div>

                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Primary Currency:</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Primary Currency:</label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" value={primaryCurrency} onChange={(e) => setprimaryCurrency(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="USDT">USDT</option>
                                                    <option style={{ fontSize: '13px' }} value="USD">USD</option>
                                                    <option style={{ fontSize: '13px' }} value="EUR">EUR</option>
                                                    <option style={{ fontSize: '13px' }} value="SDT">SDT</option>
                                                    <option style={{ fontSize: '13px' }} value="INR">INR</option>
                                                    <option style={{ fontSize: '13px' }} value="USDC">USDC</option>
                                                    <option style={{ fontSize: '13px' }} value="DAI">DAI</option>
                                                    <option style={{ fontSize: '13px' }} value="BUSD">BUSD</option>
                                                    <option style={{ fontSize: '13px' }} value="RUB">RUB</option>
                                                    <option style={{ fontSize: '13px' }} value="CAD">CAD</option>
                                                    <option style={{ fontSize: '13px' }} value="GBP">GBP</option>
                                                    <option style={{ fontSize: '13px' }} value="AED">AED</option>
                                                    <option style={{ fontSize: '13px' }} value="CNY">CNY</option>
                                                    <option style={{ fontSize: '13px' }} value="VMD">VMD</option>
                                                </select>
                                            </div>
                                            {/* <input type="text" className="form-control" /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Coin:</label>
                                            <select className="form-control btn-block-height square-edges" value={Coin}  onChange={(e) => setCoin(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="USDT">USDT</option>
                                                <option style={{ fontSize: '13px' }} value="USDC">USDC</option>
                                                <option style={{ fontSize: '13px' }} value="BUSD">BUSD</option>
                                                <option style={{ fontSize: '13px' }} value="DAI">DAI</option>
                                                <option style={{ fontSize: '13px' }} value="AME">AME</option>
                                            </select>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group"></div>
                                        <h3 className="card-title">Bank Details:</h3>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Bank Name:</label>
                                            <input type="text" className="form-control" value={bankName}  onChange={(e) => setbankName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Account Number:</label>
                                            <input type="text" className="form-control" value={bankAccountnum}  onChange={(e) => setbankAccountnum(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input type="text" className="form-control" value={location}  onChange={(e) => setlocation(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group"></div>
                                        <h3 className="card-title">Wallet Address:</h3>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Select Network:</label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" value={network}  onChange={(e) => setnetwork(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Polygon">Polygon</option>
                                                </select>
                                            </div>
                                            {/* <input type="text" className="form-control" /> */}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Wallet Address:</label>
                                            {/* onChange={(e) => setaddress(e.target.value)} */}
                                            <input type="text" className="form-control" value={address}  />
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
                            <button className="btn btn-primary submit-btn" onClick={()=>updatePaymentDetailsFunc()}>SAVE</button>
                        </div>
                        


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default PaymentUpdateModal;