

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { Card } from 'react-bootstrap';
import './teamPage.css'
import { Button } from 'react-bootstrap';
import CreateTeamModal from './CreateTeamModal';
import { apiURI } from '../../../../config/config';
import EditTeamModal from './EditTeamModal';
import { gamingImg, founderImage } from '../../../../Entryfile/imagepath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import InviteMailModal from './InviteMailModal';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


const UPLOAD_FILE = gql`
mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
    singleUpload(file: $file, input: $input) {
    filename
    mimetype
    encoding
    filepath
    ext
    url
  }
} `;

const TeamPage = () => {

  const [profilePicUpload, setProfilePicUpload] = useState('')

  const [projectTeamId, setProjectTeamId] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [pastOrgTags, setPastOrgTags] = useState('')
  const [TelegramLink, setTelegramLink] = useState('')
  const [TwitterLink, setTwitterLink] = useState('')
  console.log(pastOrgTags, "pastOrgTags");
  const [checkData, setcheckData] = useState([])

  const [showMailPopup, setShowMailPopup] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const projectNumber = useSelector((state) => state.constVar.projectId)
  const [checkDataTeam, setcheckDataTeam] = useState('')
  const loginId = useSelector((state) => state.constVar.loginId)
  const [Name, setName] = useState('')
  const [Role, setRole] = useState('')
  const [ProfileLink, setProfileLink] = useState('')
  const [show, setShow] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [RoleError, setRoleError] = useState(false)
  const [pastOrgTagsError, setpastOrgTagsError] = useState(false)
  const [ProfileLinkError, setProfileLinkError] = useState(false)
  const [showEditTeam, setShowEditTeam] = useState(false)





  const handleShow = () => {
    setcheckDataTeam('ADD')
    setShow(true)
  }
  const handleCloseShow = () => {

    setProfileLink('')
    setName('')
    setRole('')
    setProjectTeamId('')
    setProfileImage('')
    setPastOrgTags('')
    setTelegramLink('')
    setTwitterLink('')
    setShow(false)
  }
  const getSocialMediaDataFunc = () => {
    try {
      var query = `
      query Query($project: ID) {
        allProjectTeams(project: $project) {
          _id
          name
          role
          linkedin_link
          image_url
          past_organization_tags
          telegram_link
          twitter_link
          kyc_status
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

            "project": projectNumber,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.allProjectTeams != null && data?.data?.allProjectTeams != undefined) {
            setcheckData(data?.data?.allProjectTeams)
            console.log(data?.data?.allProjectTeams, "ata?.data?.allProjectTeams");

          } else {
            setcheckData([])
          }
        })

    } catch (error) {
      console.log(error, "funding in Project");
    }
  }

  useEffect(() => {
    console.log(loginId, "funding Log1");
    if (loginId != '') {
      getSocialMediaDataFunc()
      console.log(loginId, "funding Log2");
    }

  }, [loginId])

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      mainCreateFunc(data?.singleUpload?.filepath)
      console.log("Completed uploadFile", data);
    }
  })

  const [uploadFileSocial] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      mainUpdateSocialFunc(data?.singleUpload?.filepath)
      console.log("Completed uploadFile", data);
    }
  })

  const createSocialFunc = () => {


    uploadFile({
      variables: {
        file: profilePic[0].file,
        "input": {
          "project_id": ''
        }
      }
    })
  }

  const updateSocialFunc = () => {
    if (profilePic.length > 0) {
      uploadFileSocial({
        variables: {
          file: profilePic[0].file,
          "input": {
            "project_id": ''
          }
        }
      })
    } else {
      mainUpdateSocialFunc(profileImage)
    }
  }

  const mainCreateFunc = (i) => {
    if (Name != '' && Name != null && Name != undefined
      && Role != '' && Role != null && Role != undefined
      && pastOrgTags != '' && pastOrgTags != null && pastOrgTags != undefined
      && ProfileLink != '' && ProfileLink != null && ProfileLink != undefined
    ) {

      try {
        var query = `
        mutation Mutation($input: ProjectTeamInput) {
          createProjectTeam(input: $input) {
            _id
            name
            role
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
                "role": Role,
                "project": projectNumber,
                "linkedin_link": ProfileLink,
                "name": Name,
                "image_url": i,
                "past_organization_tags": pastOrgTags,
                "telegram_link": TelegramLink,
                "twitter_link": TwitterLink,

              }
            }

          })
        })
          .then((response) => {

            const json = response.json();
            return json;
          })
          .then(data => {
            getSocialMediaDataFunc()
            handleCloseShow()
            toast.success('Successfully Added', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })


      } catch (error) {
        console.log("adding new projectDetail error");
      }
    } else {
      if (Name != '' && Name != null && Name != undefined) {
        setNameError(true)
      } else {
        setNameError(false)
      }
      if (Role != '' && Role != null && Role != undefined) {
        setRoleError(true)
      } else {
        setRoleError(false)
      }
      if (pastOrgTags != '' && pastOrgTags != null && pastOrgTags != undefined) {
        setpastOrgTagsError(true)
      } else {
        setpastOrgTagsError(false)
      }
      if (ProfileLink != '' && ProfileLink != null && ProfileLink != undefined) {
        setProfileLinkError(true)
      } else {
        setProfileLinkError(false)
      }
    }


  }

  const deleteTeamFunction = () => {
    // console.log("projectTeamId",projectTeamId)
    try {

      var query = `
      mutation Mutation($id: ID) {
        deleteProjectTeam(_id: $id)
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
            "id": projectTeamId,
          }
        })
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then(data => {
          getSocialMediaDataFunc()
          handleEditClose()
          toast.success('Successfully Deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
    } catch (error) {
      console.log("Delete Team error");
    }
  }

  const mainUpdateSocialFunc = (i) => {

    if (Name != '' && Name != null && Name != undefined
      && Role != '' && Role != null && Role != undefined
      && pastOrgTags != '' && pastOrgTags != null && pastOrgTags != undefined
      && ProfileLink != '' && ProfileLink != null && ProfileLink != undefined
      && Role != '' && Role != null && Role != undefined
    ) {

      try {
        var query = `
        mutation Mutation($id: ID, $input: ProjectTeamInput) {
          updateProjectTeam(_id: $id, input: $input) {
            _id
            name
            role
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
              "id": projectTeamId,
              "input": {
                "role": Role,
                "project": projectNumber,
                "linkedin_link": ProfileLink,
                "name": Name,
                "image_url": i,
                "past_organization_tags": pastOrgTags,
                "telegram_link": TelegramLink,
                "twitter_link": TwitterLink,

              }
            }

          })
        })
          .then((response) => {

            const json = response.json();
            return json;
          })
          .then(data => {
            getSocialMediaDataFunc()
            handleEditClose()
            toast.success('Successfully Added', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })


      } catch (error) {
        console.log("adding new projectDetail error");
      }
    } else {
      if (Name != '' && Name != null && Name != undefined) {
        setNameError(true)
      } else {
        setNameError(false)
      }
      if (Role != '' && Role != null && Role != undefined) {
        setRoleError(true)
      } else {
        setRoleError(false)
      }
      if (pastOrgTags != '' && pastOrgTags != null && pastOrgTags != undefined) {
        setpastOrgTagsError(true)
      } else {
        setpastOrgTagsError(false)
      }
      if (ProfileLink != '' && ProfileLink != null && ProfileLink != undefined) {
        setProfileLinkError(true)
      } else {
        setProfileLinkError(false)
      }
    }


  }

  const handleEditShow = (i) => {
    setProfileLink(i.linkedin_link)
    setName(i.name)
    setRole(i.role)
    setProjectTeamId(i._id)
    setProfileImage(i.image_url)
    setPastOrgTags(i.past_organization_tags)
    setTelegramLink(i.telegram_link)
    setTwitterLink(i.twitter_link)
    setShowEdit(true)
  }

  const handleEditClose = () => {

    setProfileLink('')
    setName('')
    setRole('')
    setProjectTeamId('')
    setProfileImage('')
    setPastOrgTags('')
    setTelegramLink('')
    setTwitterLink('')
    setShowEdit(false)
  }


  const opennewWindow = (i) => {
    // window.open(i)
    window.open(i, '_blank').focus();
  }

  const sendMailpopup = () => {
    setShowMailPopup(true)
  }

  const handleCloseMailPopup = () => {

    setShowMailPopup(false)
  }

  const underConsfunc = () => {
    toast.warn('This Field is under Construction', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const editTeamPageShow = () => {
    setShowEditTeam(true)
  }
  return (

    <div >


      <div className="content container-fluid" style={{ padding: '0px' }}>
        <div >
          <div>

            <div className="page-header" style={{ marginBottom: '15px' }}>
              <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                <div className="col">
                  <h3 className="page-title" style={{ fontSize: '25px' }}>Team</h3>
                </div>
                <div className="col-auto float-right ml-auto" style={{ padding: '0px' }}>
                  <button className="btn buttonInProposal1 submit-btn" style={{ marginRight: '10px', borderRadius: '2px' }} onClick={() => sendMailpopup()}>+ INVITE TEAM</button>

                  <button className="btn buttonInProposal1 submit-btn" style={{ marginRight: '10px', borderRadius: '2px' }} onClick={() => handleShow()}>+ ADD TEAM</button>

                  <button className="btn buttonInProposal1 submit-btn" style={{ borderRadius: '2px' }} onClick={() => underConsfunc()}>USER ROLE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>

        <div className="row">
          {checkData != null && checkData != undefined && checkData?.map((i) => (

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
            <div className='col-sm-3 col-md-3 col-lg-3 col-xl-3' style={{ marginBottom: '15px' }}>

              <div className="profile-view " style={{ minHeight: "350px" }} >
                <Card className="paddingcard" style={{ height: '100%', marginBottom: '0px', boxShadow: 'rgba(0, 0, 0, 0.2) 3px 5px 10px 0px', borderRadius: '2px' }}>

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
                    <Card.Title style={{ margin: '0px', textAlign: 'center', color: '#1890ff', wordBreak: 'break-word', marginTop: "10px" }}>{i?.name}</Card.Title>
                    <Card.Text style={{ marginTop: '0px', marginBottom: '10px', fontSize: '16px' }} >
                      <div className="cardText" style={{ justifyContent: 'center' }}>
                        {/* <h5 style={{ fontSize: '20px', fontWeight: 'normal' }}>Role :</h5> */}

                        <h5 style={{ fontSize: '20px', fontWeight: 'normal', marginBottom: "20px" }}>{i?.role}</h5>
                      </div>

                    </Card.Text >

                    <Card.Text style={{ marginBottom: '0px' }}>
                      <div className="cardText">

                        <div style={{ width: '200px' }} className="kyc">
                          KYC Status
                        </div>
                        
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
                        /* {i?.kyc_status == 'approved' ?

                          <div style={{ color: 'green', border: '1px solid green', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
                            {i?.kyc_status}
                          </div>
                          :
                          i?.kyc_status == 'rejected' ?
                            <div style={{ color: 'green', border: '1px solid green', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
                              {i?.kyc_status}
                            </div>


                            :
                            i?.kyc_status == 'Unverified' ?

                              <div style={{ color: 'orange', border: '1px solid orange', padding: '2px', borderRadius: '3px', fontSize: '10px' }} >
                                Unverified
                              </div>
                              :

                              <div style={{ color: 'orange', border: '1px solid orange', padding: '2px', borderRadius: '3px', fontSize: '12px' }} >
                                Pending
                              </div>
                        } */}
                      </div>
                      <div className="cardText">
                        <div style={{ width: '200px' }}>
                          {/* LinkedIn Profile */}

                        </div>
                        {/* onClick={() => { opennewWindow(i?.profile_link) }} */}
                        <div style={{ color: '#6345ED', textDecoration: 'underline' }} >
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

                            <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '25px', marginRight: '10px', color: '#1890ff' }}
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

                            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '25px', marginRight: '10px', color: '#1890ff' }}
                              onClick={() => { opennewWindow(i?.twitter_link) }} />
                            :
                            <></>
                          }

                          {/* <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '20px', marginRight: '10px', color: '#1890ff' }} 
                        onClick={() => { opennewWindow(i?.telegram_link) }}  /> /> */}
                        </div>
                        <div>
                          {i?.linkedin_link != '' && i?.linkedin_link != null && i?.linkedin_link != undefined ?

                            <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '25px', marginRight: '10px', color: '#1890ff' }}
                              onClick={() => { opennewWindow(i?.linkedin_link) }} />
                            :
                            <></>
                          }
                          {/* <FontAwesomeIcon icon={faTelegram} style={{ fontSize: '20px', color: '#1890ff' }}
                         onClick={() => { opennewWindow(i?.telegram_link) }}  /> /> */}
                        </div>
                      </div>
                    </Card.Text>

                  </Card.Body>
                </Card>
                {
                  i?.role == 'Co-Founder' ?
                    <></>
                    :
                    <div className="pro-edit" style={{ top: '10px', right: '10px' }}>
                      <button className="edit-icon" onClick={() => handleEditShow(i)}><i className="fa fa-pencil" /></button>

                    </div>
                }

              </div>

            </div>

          ))}


        </div>



      </div>
      <CreateTeamModal
        nameError={nameError}
        RoleError={RoleError}
        pastOrgTagsError={pastOrgTagsError}
        ProfileLinkError={ProfileLinkError}
        setTwitterLink={setTwitterLink}
        TwitterLink={TwitterLink}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        setPastOrgTags={setPastOrgTags}
        setTelegramLink={setTelegramLink}
        pastOrgTag={pastOrgTags}
        TelegramLink={TelegramLink}
        checkData={checkData}
        show={show} handleClose={handleCloseShow}
        Name={Name} setName={setName} Role={Role} setRole={setRole} ProfileLink={ProfileLink} setProfileLink={setProfileLink}
        createSocialFunc={createSocialFunc}
        updateSocialFunc={updateSocialFunc}
        checkDataTeam={checkDataTeam}
      />

      <EditTeamModal

        profileImage={profileImage}
        nameError={nameError}
        RoleError={RoleError}
        pastOrgTagsError={pastOrgTagsError}
        ProfileLinkError={ProfileLinkError}
        setTwitterLink={setTwitterLink}
        TwitterLink={TwitterLink}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        setPastOrgTags={setPastOrgTags}
        setTelegramLink={setTelegramLink}
        pastOrgTags={pastOrgTags}
        TelegramLink={TelegramLink}
        checkData={checkData}
        show={showEdit} handleClose={handleEditClose}
        Name={Name} setName={setName} Role={Role} setRole={setRole} ProfileLink={ProfileLink} setProfileLink={setProfileLink}
        createSocialFunc={createSocialFunc}
        updateSocialFunc={updateSocialFunc}
        checkDataTeam={checkDataTeam}
        deleteTeamFunction={deleteTeamFunction}
      />
      <InviteMailModal handleClose={handleCloseMailPopup} show={showMailPopup} />

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
    </div>

  );
}

export default TeamPage;
