


import React, { useEffect, useState } from 'react';
import ProfileModal from './ProfileModal';


const ProfilePage = () => {
    const [show,setShow] = useState(false)
    const handleShow =  () =>{
        setShow(true)
    }
    const handleCloseShow =  () =>{
        setShow(false)
    }
    return (

        <div className="card card-table">
            
            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">Profile</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Project Description:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Start Date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project End Date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Fund Raise target:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Budget:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Score :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Validator Score:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Investor Score:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                    </div>
                </div>
                <div style={{marginTop:'40px',textAlign:'end'}}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div>

            </div>
            <ProfileModal show={show} handleClose={handleCloseShow}/>
        </div>


    );
}
export default ProfilePage;
