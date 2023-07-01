import React, { useState } from 'react';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


function EditTokenomicsAddTable({ show, DataforPopup, MainDatainToken, getTokenDetailFunc, handleClose,
    percentage, setPercentage,
    noOfTokens, setnoOfTokens,
    TokenPrice, setTokenPrice,
    Valuation, setValuation,
    TgeRel, setTgeRel,
    CliffMonths, setCliffMonths,
    Vesting, setVesting,
    Descrp, setDescrp

}) {

    const createTokenomics = () => {

        try {
            var query = `
            mutation DeleteTokenomicsData($id: ID, $input: TokenomicsDataInput) {
                updateTokenomicsData(_id: $id, input: $input) {
                  _id
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

                        "id": MainDatainToken[0]._id,
                        "input": {
                            "tokenomics": DataforPopup[0]._id,
                            "description": Descrp,
                            "percentage": parseFloat(percentage),
                            "no_of_tokens": parseFloat(noOfTokens),
                            "token_price": parseFloat(TokenPrice),
                            "valuation": parseFloat(Valuation),
                            "tge_release": parseFloat(TgeRel),
                            "cliff": parseFloat(CliffMonths),
                            "vesting": parseFloat(Vesting)
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.updateTokenomicsData != null && data?.data?.updateTokenomicsData != undefined) {
                        

                        toast.success('Successfully saved your Details', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        getTokenDetailFunc()
                        setPercentage(0)
                        setnoOfTokens(0)
                        setTokenPrice(0)
                        setValuation(0)
                        setTgeRel(0)
                        setCliffMonths(0)
                        setVesting(0)
                        setDescrp('')
                        handleClose()
                    } else {
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }

    const NoofTokenFunc = (i) => {
        var main = 0;
        if (DataforPopup.length > 0) {

            main = ((i * parseInt(DataforPopup[0].total_token_supply))/100)
        }
        setPercentage(i)
        setnoOfTokens(main)
    }
    const ValuationFunc = (i) => {
        var main = 0;
        if (DataforPopup.length > 0) {

            main = i * parseInt(DataforPopup[0].total_token_supply)
        }
        setTokenPrice(i)
        setValuation(main)
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
                    <Modal.Title>Token Supply Break Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Percentage <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" value={percentage} onChange={(e) => NoofTokenFunc(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Number of Tokens <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" readOnly="true" value={noOfTokens} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Price </label>
                                            <input type="number" className="form-control" value={TokenPrice} onChange={(e) => ValuationFunc(e.target.value)} />
                                            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ width: '35%' }} >
                                                    <select className="form-control btn-block-height square-edges" >
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                        <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                        <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                    </select>
                                                </div>

                                                <input type="text" className="form-control" style={{ width: '60%' }} />
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Valuation <span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" readOnly="true" value={Valuation} />

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>TGE Release </label>
                                            <input type="number" className="form-control" value={TgeRel} onChange={(e) => setTgeRel(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Cliff Months </label>
                                            <input type="number" className="form-control" value={CliffMonths} onChange={(e) => setCliffMonths(e.target.value)} />
                                            {/* <div >
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Vesting Months</label>
                                            <input type="number" className="form-control" value={Vesting} onChange={(e) => setVesting(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Description <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={Descrp} onChange={(e) => setDescrp(e.target.value)} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }} onClick={() => handleClose()}>CANCEL</button>
                    </div>
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => createTokenomics()} >SAVE</button>
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

export default EditTokenomicsAddTable;