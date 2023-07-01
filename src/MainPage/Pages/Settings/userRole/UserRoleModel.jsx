
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';


function UserRoleModalPage({ show, handleClose, 
    nameEdit,
    emailIdEdit,
    RoleDataEdit,
    mainId,
    setNameEdit,
    setEmailIDEdit,
    setRoleDataEdit,
    getUserDetailsFunc
 }) {


    const loginId = useSelector((state) => state.constVar.loginId)



    const updateMainFunc = () =>{

        try {


            var query = `
            mutation DeleteUserRole($id: ID, $input: UserRoleInput) {
                updateUserRole(_id: $id, input: $input) {
                  _id
                  name
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
                        "id":mainId,
                        "input": {
                          "name": nameEdit,
                          "email_id": emailIdEdit,
                          "role": RoleDataEdit,
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
                    if (data?.data?.updateUserRole != null && data?.data?.updateUserRole != undefined) {
                        getUserDetailsFunc()
                    }else{
                        alert('please check the details')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
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
                    <Modal.Title>Initial Proposal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>


                        <div className="row">


                            <div className="col-md-12">
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%' }}> Name :</label>

                                    <input type="text" className="form-control" style={{ width: '50%' }} defaultValue={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />


                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%' }}> Email :</label>

                                    <input type="email" className="form-control" style={{ width: '50%' }} defaultValue={emailIdEdit} onChange={(e) => setEmailIDEdit(e.target.value)} />


                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <label style={{ width: '25%' }}> Role :</label>

                                    <div >
                                        <select className="form-control btn-block-height square-edges"  defaultValue={RoleDataEdit}  onChange={(e)=>setRoleDataEdit(e.target.value)}>
                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                            <option style={{ fontSize: '13px' }} value="SuperUser ">SuperUser </option>
                                            <option style={{ fontSize: '13px' }} value="Admin">Admin</option>
                                            <option style={{ fontSize: '13px' }} value="Operations">Operations</option>
                                            <option style={{ fontSize: '13px' }} value="Finance">Finance</option>
                                            <option style={{ fontSize: '13px' }} value="User">User</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>

                    <div className="submit-section">
                        <button className="btn add-btn2 submit-btn" style={{ width: '170px' }} onClick={() => updateMainFunc()}>Update</button>
                    </div>

                </Modal.Footer>













            </Modal>
        </>
    );
}

export default UserRoleModalPage;