

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './teamPage.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faFacebook, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Card } from 'react-bootstrap';
import { gamingImg } from '../../../Entryfile/imagepath';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { selectAllTeamDetails } from '../../../reducers/TeamSizeSlice';
const TeamPage = () => {


  const projectDataDetails = useSelector(selectAllTeamDetails)



  const opennewWindow = (i) => {
    // window.open(i)
    window.open(i, '_blank').focus();
  }

  console.log(projectDataDetails, "projectDataDetailsteam");

  return (


    <div >


      <div className="content container-fluid">
        <div >
          <div>

            <div className="page-header" style={{ marginBottom: '15px' }}>
              <div className="row align-items-center" style={{ width: '100%' }}>
                <div className="col">
                  <h3 className="page-title" style={{ fontSize: '25px' }}>Team</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>

        <div className="row">
          {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].map((i) => (

            // <div className=" col-md-4 col-sm-4 col-lg-4 col-xl-4">
            //   <div className="cardHEight card dash-widget">
            //     <div className="card-body">
            //       <div className="mainTeamDiv">
            //         <h5>Name :</h5>
            //         <h5>{i?.name}</h5>
            //       </div>
            //       <div className="mainTeamDiv">
            //         <h5>Role :</h5>
            //         <h5>{i?.role}</h5>
            //       </div>
            //       <div className="mainTeamDiv">
            //         <h5>Profile Link :</h5>
            //         <h5>{i?.profile_link}</h5>
            //       </div>
            //     </div>
            //     <div className="team-edit-position"><button className="edit-funding" onClick={()=>handleEditShow(i)}><i className="fa fa-pencil" /></button></div>

            //   </div>
            // </div>
            <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3' style={{ marginBottom: '15px' }} key={i?._id}>
              <Card style={{ height: '100%', marginBottom: '0px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 5px 10px 0px', borderRadius: '2px' }}>

                <div className="profile-view" style={{ margin: '10px 10px 0px', height: '130px' }}>
                  <div className="profile-img-wrap-vald" style={{ width: '100%' }}>
                    <div className="profile-img" >
                      <a href="#"><img alt="" src={i?.image_url} /></a>
                    </div>
                  </div>
                </div>
                {/* <Card.Img variant="top" src={gamingImg} style={{
            height: '165px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }} /> */}
                <Card.Body style={{ padding: '0px 15px 15px 15px' }}>
                  <Card.Title style={{ margin: '0px', textAlign: 'center', color: '#1890ff', wordBreak: 'break-word' }}>{i?.name}</Card.Title>
                  <Card.Text style={{ marginTop: '0px', marginBottom: '10px', fontSize: '16px' }} >
                    <div className="cardText" style={{ justifyContent: 'center' }}>
                      {/* <h5 style={{ fontSize: '20px', fontWeight: 'normal' }}>Role :</h5> */}

                      <h5 style={{ fontSize: '20px', fontWeight: 'normal' }}>{i?.role}</h5>
                    </div>

                  </Card.Text >

                  <Card.Text style={{ marginBottom: '0px' }}>
                    <div className="cardText">

                      <div style={{ width: '200px' }}>
                        KYC Status
                      </div>
                      {/* {i?.kyc_status == 'Completed' ?

<div style={{ color: 'green', border: '1px solid green', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
  {i?.kyc_status}
</div>
:
i?.kyc_status == 'Rejected' ?
  <div style={{ color: 'green', border: '1px solid green', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
    {i?.kyc_status}
  </div>

  :

  <div style={{ color: 'orange', border: '1px solid orange', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
    Onging
  </div>
} */}
                      {i?.kyc_status == "true" ?
                        <div>
                          <div style={{ color: 'green', border: '1px solid green', padding: '2px', borderRadius: '3px', fontSize: '11px', width: "70px", textAlign: "center", fontWeight: "900" }} >
                            KYC Verified
                          </div>
                        </div>
                        :
                        <div>
                          <div style={{ color: 'red', border: '1px solid red', padding: '2px', borderRadius: '3px', fontSize: '11px', width: "70px", textAlign: "center", fontWeight: "900" }} >
                            Un Verified
                          </div>
                        </div>
                      }
                    </div>
                    <div className="cardText">
                      <div style={{ width: '200px' }}>
                        {/* LinkedIn Profile */}

                      </div>
                      <div style={{ color: '#6345ED', textDecoration: 'underline' }} onClick={() => { opennewWindow(i?.profile_link) }}>
                        {/* {i?.profile_link} */}
                      </div>
                    </div>
                  </Card.Text>
                  <Card.Text style={{ marginTop: '5px', marginBottom: '10px', fontSize: '16px' }} >

                    {/* <div className="cardText"> */}

                    <div style={{ color: '#6345ED', fontWeight: '600' }}>
                      Past Organisation tags
                    </div>
                    {/* </div> */}
                    <div className="cardText2">
                      {/* color: '#6345ED', textDecoration: 'underline', */}
                      <div style={{ textDecorationColor: '#6345ED', marginRight: '10px' }}>
                        {i?.past_organization_tags}
                      </div>
                      {/* color: '#6345ED', textDecoration: 'underline', */}
                      {/* <div style={{ textDecorationColor: '#6345ED' }}>
                        #CRYPTO
                      </div> */}
                    </div>

                  </Card.Text >

                  <Card.Text>
                    <div className="cardText" style={{ justifyContent: 'center' }}>
                      <div>
                        {i?.telegram_link != '' && i?.telegram_link != null && i?.telegram_link != undefined ?

                          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }}
                            onClick={() => { opennewWindow(i?.telegram_link) }} />
                          :
                          <></>
                        }
                      </div>
                      {/* <div>
                  <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }} />
                </div> */}
                      <div>

                        {i?.twitter_link != '' && i?.twitter_link != null && i?.twitter_link != undefined ?

                          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }}
                            onClick={() => { opennewWindow(i?.twitter_link) }} />
                          :
                          <></>
                        }
                      </div>
                      <div>
                        {i?.linkedin_link != '' && i?.linkedin_link != null && i?.linkedin_link != undefined ?

                          <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }}
                            onClick={() => { opennewWindow(i?.linkedin_link) }} />
                          :
                          <></>
                        }

                        {/* <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '20px', color: '#1890ff' }} /> */}
                      </div>
                    </div>
                  </Card.Text>

                </Card.Body>
              </Card>
            </div>

          ))}


        </div>



      </div>
    </div>
  );
}

export default TeamPage;
