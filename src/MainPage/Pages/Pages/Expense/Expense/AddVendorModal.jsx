import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../../config/config';


function AddVendorModal({ show, handleClose ,getSocialMediaDataFunc}) {
    const [website,setWebsite] = useState('')
    const [VendorMail,setVendorMail] = useState('')
    const [projectId,setprojectId] = useState('')
    const [payment,setpayment] = useState('')
    const [OrgName,setOrgName] = useState('')
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [VendorMailError,setVendorMailError] = useState(false)
    const [paymentError,setpaymentError] = useState(false)
    const [NameError,setNameError] = useState(false)

    const projectNumber = useSelector((state) => state.constVar.projectId)

    const createVendorDatafunc = () =>{
        if(name != ''  && VendorMail != '' && payment != '' ){
            try{
                var query = `
                mutation CreateVendor($input: VendorInput) {
                  createVendor(input: $input) {
                    _id
                    name
                    vendor_mail
                    website
                    organization_name
                    email_id
                    payment
                  }
                }`;
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
                          "website": website,
                          "vendor_mail": VendorMail,
                          "project":projectNumber,
                          "payment": payment,
                          "organization_name": OrgName,
                          "name": name,
                          "email_id": email
                        }
                    }
          
                  })
                })
                  .then((response) => {
          
                    const json = response.json();
                    return json;
                  })
                  .then(data => {
                    if (data?.data?.createVendor != null && data?.data?.createVendor != undefined) {
          
                      getSocialMediaDataFunc()
                      handleClose()
                    } 
                  })
              }catch(error){
                console.log(error,"error in expense create vendor");
              }
        }else{
            // alert('Please Fill Details')
            if(name != ''){
                setNameError(true)
            }else{
                
                setNameError(false)
            }
            if(VendorMail != ''){
                setVendorMailError(true)
            }else{
                
                setVendorMailError(false)
            }
            if(payment != ''){
                setpaymentError(true)
            }else{
                
                setpaymentError(false)
            }
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
                    <Modal.Title>Add Vendor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name:<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" onChange={(e)=>setname(e.target.value)} />
                                            
                                            {NameError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>{"Please Enter Valid Name"}</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Organization Name:</label>
                                            <input type="text" className="form-control"  onChange={(e)=>setOrgName(e.target.value)} />
                                        
                                            
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Type:</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Vendor Mail:<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" onChange={(e)=>setVendorMail(e.target.value)} />
                                        
                                            
                                            {VendorMailError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>{"Please Enter Valid Email"}</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email Id:</label>
                                            <input type="text" className="form-control"  onChange={(e)=>setemail(e.target.value)} />
                                        
                                        </div>
                                    </div> */}


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Website:</label>
                                            <input type="text" className="form-control"  onChange={(e)=>setWebsite(e.target.value)} />
                                        
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Payment:<span className="text-danger">*</span></label>
                                            <select className="form-control btn-block-height square-edges"  onChange={(e)=>setpayment(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="fiat  ">fiat </option>
                                                    <option style={{ fontSize: '13px' }} value="cash ">cash </option>
                                                    <option style={{ fontSize: '13px' }} value="crypto ">crypto </option>
                                                </select>
                                            </div>
                                            
                                            {paymentError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>{"Please Select Any one Payment Type"}</div>
                                                :
                                                ''
                                            }
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
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>DRAFT</button>
                    </div> */}
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={()=>createVendorDatafunc()}>SAVE</button>
                    </div>

                </Modal.Footer>








            </Modal>
        </>
    );
}

export default AddVendorModal;