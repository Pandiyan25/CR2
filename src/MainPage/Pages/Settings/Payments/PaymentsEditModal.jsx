import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';


function PaymentEditModal({ checkData, show, handleClose, getUserDetailsFunc }) {

    const loginId = useSelector((state) => state.constVar.loginId)
    const [primaryCurrency, setprimaryCurrency] = useState('')
    const [Coin, setCoin] = useState('')
    const [bankName, setbankName] = useState('')
    const [bankAccountnum, setbankAccountnum] = useState('')
    const [location, setlocation] = useState('')
    const [network, setnetwork] = useState('')
    const [address, setaddress] = useState('')

    const savePaymentDetailsFunc = () => {
        try {
            var query = `
            mutation Mutation($input: PaymentInput) {
                createPayment(input: $input) {
                    _id
                    primary_currency
                    bank_name
                    account_number
                    wallet_network
                    wallet_address
                    coin
                  }
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
                              "primary_currency": primaryCurrency,
                              "bank_name": bankName,
                              "wallet_address": address,
                              "user": loginId,
                              "account_number": bankAccountnum,
                              "wallet_network": network,
                              "coin": Coin,
                              "location":location
                            }
                          


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // if()
                    console.log(data?.data?.getpayment);
                    getUserDetailsFunc()
                    // dispatch(projectId(data?.data?.createProject[0]._id))
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }

    }

    const updatePaymentDetailsFunc = () => {
        try {
            var query = `
            mutation UpdatePayment($input: PaymentInput, $id: ID) {
                updatePayment(input: $input, _id: $id) {
                  _id
                  primary_currency
                  bank_name
                  account_number
                  wallet_network
                  wallet_address
                  coin
                }
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
                              "primary_currency": primaryCurrency,
                              "bank_name": bankName,
                              "wallet_address": address,
                              "user": loginId,
                              "account_number": bankAccountnum,
                              "wallet_network": network,
                              "coin": Coin,
                              "location":location
                            },
                            "id": checkData
                          


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // if()
                    console.log(data?.data?.updatePayment);
                    getUserDetailsFunc()
                    // dispatch(projectId(data?.data?.createProject[0]._id))
                })


        } catch (error) {
            console.log("adding new projectDetail error");
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
                                                <select className="css-1s2u09g-control" onChange={(e) => setprimaryCurrency(e.target.value)}>
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
                                            <select className="css-1s2u09g-control" onChange={(e) => setCoin(e.target.value)}>
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
                                            <input type="text" className="form-control" onChange={(e) => setbankName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Account Number:</label>
                                            <input type="text" className="form-control" onChange={(e) => setbankAccountnum(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input type="text" className="form-control" onChange={(e) => setlocation(e.target.value)} />
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
                                                <select className="css-1s2u09g-control" onChange={(e) => setnetwork(e.target.value)}>
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
                                            <input type="text" className="form-control" onChange={(e) => setaddress(e.target.value)} />
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
                    {checkData != null && checkData != undefined && checkData != '' ?
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={()=>updatePaymentDetailsFunc()}>SAVE</button>
                        </div>
                        :
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={()=>savePaymentDetailsFunc()}>SAVE</button>
                        </div>
                    }


                </Modal.Footer>








            </Modal>
        </>
    );
}

export default PaymentEditModal;