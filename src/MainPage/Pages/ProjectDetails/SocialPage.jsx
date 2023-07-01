

import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { selectAllSocialDetails } from '../../../reducers/SocialPageSlice';


const SocialPage = () => {
    const projectDataDetails = useSelector(selectAllSocialDetails)
    
    return (

        <div className="card card-table" style={{margin:'0px'}}>
            
            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">Socials</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                            <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Twitter:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.twitter}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Instagram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.instagram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Medium:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.medium}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>FaceBook:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.facebook}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.linkedin}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Discord:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.discord}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Telegram:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.telegram}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Reddit:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.reddit}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Youtube:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.youtube}</td>
                                    </tr>

                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       
                    </div>
                </div>
                {/* <div style={{marginTop:'40px',textAlign:'end'}}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
        </div>


    );
}
export default SocialPage;
