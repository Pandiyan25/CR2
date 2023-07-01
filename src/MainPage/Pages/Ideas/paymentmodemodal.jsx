
import "./subscription.css"
import { Route, withRouter } from 'react-router-dom';

import React, { useState,useMemo  } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Ideas from "./idea copy.png"
import Select from 'react-select'
import countryList from 'react-select-country-list'
const Paymentmodemodal = ({ showpayment, handleCloseShowPayment,value,setValue,makePayment, setShow }) => {
    const [countrySelect, setcountrySelect] = useState(false)
    
  const options = useMemo(() => countryList().getData(), [])

const handleClose= ()=>{
    handleCloseShowPayment();
    setcountrySelect(false)
}
const changeHandler = value => {
    setValue(value)
  }

    return (
        <div>


            <Modal


                show={showpayment}
                onHide={handleCloseShowPayment}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body closeButton>
                    <div>

                        {!countrySelect ?
                            <>
                                <div className='home-header' style={{ marginTop: "20px" }}>
                                    <h3 className='mb-4 home-heading'>Choose your mode of payment</h3>
                                </div>
                                <div className='row mt-2'>
                                    <div className=' col-xl-6  col-lg-6 col-md-12 col-sm-12  d-flex justify-content-center text-center'>
                                        <div className="box mb-2" style={{ width: "200px" }}>
                                            <div style={{ textAlign: "center", padding: "25px" }}>
                                                <img src={Ideas} style={{ width: "100px", marginBottom: "20px" }}></img>
                                                <h2 className='dh mb-3'>Crypto</h2>
                                                <button className='routeButtoncs' onClick={() =>{ makePayment("CRYPTO"), setShow(false)}} >Pay now</button>
                                                {/* <button className='routeButtoncs' >Pitch Ideas</button> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-6  col-lg-6  col-md-12 col-sm-12  d-flex justify-content-center text-center'>
                                        <div className="box" style={{ width: "200px" }}>
                                            <div style={{ textAlign: "center", padding: "25px" }}>
                                                <img src={Ideas} style={{ width: "100px", marginBottom: "20px" }}></img>
                                                <h2 className='dh mb-3'>Fiat</h2>
                                                <button className='routeButtoncs' onClick={() => alert("Coming soon!")}>Pay now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : ""}

                        {countrySelect ?
                            <>
                                <div className='home-header' style={{ marginTop: "20px" }}>
                                    <h3 className='mb-4 home-heading'>Choose your country</h3>
                                </div>
                                <div className='row mt-2 d-flex justify-content-center text-center'>
                                    <div className=' col-xl-12  col-lg-12 col-md-12 col-sm-12  d-flex justify-content-center text-center'>
                                
                                            <div style={{ width:"80%",textAlign: "center", padding: "25px" }}>
                                            
                                            <Select  options={options} value={value} onChange={changeHandler} />
                                            </div>
                                            
                                    </div>
                                    <Button style={{width:"auto"}} onClick={() => makePayment("FIAT")}>Proceed</Button>
                                </div>
                            </>
                            : ""
                        }





                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { handleClose() }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default withRouter(Paymentmodemodal);