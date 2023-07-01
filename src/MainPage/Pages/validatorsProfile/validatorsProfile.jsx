
import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 ,blockPass} from '../../../Entryfile/imagepath'
import { showSettings } from '../../../reducers/ConstantSlice';
import ProfileSettings from './ProfileSettings';
import { useSelector, useDispatch } from 'react-redux';
import { fetchValidatorProfile, selectAllValidatorProfile } from '../../../reducers/ValidatorProfileSlice';
import { apiURI } from '../../../config/config';
import { async } from 'regenerator-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faGlobe, faRetweet, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faLinkedinIn, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';

const UPLOAD_FILE = gql`
mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
    singleUpload(file: $file, input: $input) {
      filename
      mimetype
      encoding
      url
      filepath
      ext
    }
  } `;


const ValidatorProfile = () => {

  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState('')

  const [profilePicNew, setProfilePicNew] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [imageData, setImageData] = useState('')
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [education, setEducation] = useState('')
  const [experience, setexperience] = useState('')
  const [industry, setindustry] = useState('')
  const [expInBlockChain, setexpInBlockChain] = useState('')
  const [nationality, setnationality] = useState('')
  const [idProof, setidProof] = useState('')
  const [selfDescc, setselfDescc] = useState('')
  const [pasOrgTag, setpasOrgTag] = useState('')
  const [currOrgTag, setcurrOrgTag] = useState('')
  const [currPosition, setcurrPosition] = useState('')
  const [currLocation, setcurrLocation] = useState('')
  const [currIncome, setcurrIncome] = useState('')
  const [IdNumber, setIdNumber] = useState('')
  const [WalletAddress, setWalletAddress] = useState('')
  const [LinkedIn, setLinkedIn] = useState('')

  const loginId = useSelector((state) => state.constVar.loginId)
  const show = useSelector((state) => state.constVar.showSettings)
  // const [show, setShow] = useState(false);
  const [validatorProfileDetails, setvalidatorProfileDetails] = useState([])
  // const validatorProfileDetails = useSelector(selectAllValidatorProfile)
  console.log("==================show==================");


  const handleClose = () => {
    dispatch(showSettings(false));
    getMyOwnProjectDetailsFunc()
  }
  const handleShow = () => {
    dispatch(showSettings(true));
  }
  const getMyOwnProjectDetailsFunc = () => {
    try {

      var query =
        `
     query Query($id: ID) {
         getUser(_id: $id) {
           _id
           email
           password
           role
           contact
           first_name
           last_name
           role_in_organization
           fund_description
           minimum_investment_size
           project_invested
           type_of_fund
           preferred_sectors {
            value
          }
           fund_name
           asset_under_management
           projected_invested_till_date
           fund_head_quarters
           team_size
           linkedin
           linkedin_link
           website_link
           twitter_link
           education
           experience
           industry
           experience_in_blockchain
           current_position
           past_organisation_tags
           current_organisation
           current_income
           wallet_address
           current_location
           nationality
           id_proof
           self_description
           proof_number
           profile_pic
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
            "id": loginId
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          console.log('ProjectGetFunctiondata', data);
          if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
            setvalidatorProfileDetails([data?.data?.getUser])
            setFirstName(data?.data?.getUser.first_name)
            setLastName(data?.data?.getUser.last_name)
            setEducation(data?.data?.getUser.education)
            setexperience(data?.data?.getUser.experience)
            setindustry(data?.data?.getUser.industry)
            setexpInBlockChain(data?.data?.getUser.experience_in_blockchain)
            setnationality(data?.data?.getUser.nationality)
            setidProof(data?.data?.getUser.id_proof)
            setselfDescc(data?.data?.getUser.self_description)
            setpasOrgTag(data?.data?.getUser.past_organisation_tags)
            setcurrOrgTag(data?.data?.getUser.current_organisation)
            setcurrPosition(data?.data?.getUser.current_position)
            setcurrLocation(data?.data?.getUser.current_location)
            setcurrIncome(data?.data?.getUser.current_income)
            setIdNumber(data?.data?.getUser.proof_number)
            setWalletAddress(data?.data?.getUser.wallet_address)
            setLinkedIn(data?.data?.getUser.linkedin)
            setEmailId(data?.data?.getUser.email)
            setProfilePic(data?.data?.getUser?.profile_pic)
            //  var totalInvested = 0;
            //  setProjectPerticularDetalsData(data?.data?.getUser)

            //  for(let i= 0 ;i< data?.data?.getUser.length ; i++){
            //   totalInvested = data?.data?.getUser[i].amount_invested + totalInvested
            //  }
            //  console.log(totalInvested,"totalInvested");
            //  setTotalInvestedbyUser(totalInvested)
            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: async (data) => {

      await setProfilePicNew(data?.singleUpload?.filepath)
      console.log("Completed uploadOnePitchDecFile", data);
      if (data?.singleUpload?.filepath != '' && data?.singleUpload?.filepath != null) {

        updatePic(data?.singleUpload?.filepath)
      }
    }
  })


  const updateProfileDetails = () => {

    if (imageData != '' && imageData != null && imageData != undefined && imageData.length > 0) {
      uploadFile({ variables: { file: imageData[0].file,
        "input": {
            "project_id": ''
        }
    } })
    } else {
      updatePic()
      // alert("Please fill all the mandatory fields")
    }
  }


  useEffect(() => {
    if (loginId != '') {
      // dispatch(fetchValidatorProfile(loginId))
      getMyOwnProjectDetailsFunc()
    }

  }, [loginId])

  const updatePic = (i) => {
    console.log(i, "mainUpload");
    if (i != null && i != undefined) {
      console.log(i, "mainUpload1");
      mainPicFunc(i)
    } else {
      console.log(i, "mainUpload2");
      mainPicFunc(profilePic)
    }

    toast.success('Successfully saved your Details', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  const mainPicFunc = (i) => {
    if (firstName != '' && LastName != '' && education != ''
      && experience != '' && industry != '' && expInBlockChain != ''
      && nationality != '' && idProof != '' && currLocation != ''
      && currIncome != '' && IdNumber != '' && LinkedIn != ''
    ) {


      try {
        var query = `


        mutation UpdateUser($id: ID, $input: UserInput) {
          updateUser(_id: $id, input: $input) {
            _id
            email
            password
            role
            contact
            first_name
            last_name
            role_in_organization
            fund_description
            minimum_investment_size
            project_invested
            type_of_fund
            profile_pic
            preferred_sectors {
              value
            }
            fund_name
            asset_under_management
            projected_invested_till_date
            fund_head_quarters
            team_size
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
                "profile_pic": i,
                "wallet_address": WalletAddress,
                "self_description": selfDescc,
                "past_organisation_tags": pasOrgTag,
                "nationality": nationality,
                "linkedin": LinkedIn,
                "last_name": LastName,
                "industry": industry,
                "id_proof": idProof,
                "proof_number": IdNumber,
                "first_name": firstName,
                "experience_in_blockchain": expInBlockChain,
                "experience": experience,
                "current_position": currPosition,
                "education": education,
                "current_organisation": currOrgTag,
                "current_location": currLocation,
                "current_income": currIncome,
              },
              "id": loginId

              // "role_in_organization": roleinOrganization,
              // "fund_description": fundDesc,
              // "minimum_investment_size": minInvestSize,
              // "project_invested": projectInvested,
              // "type_of_fund": typeofFund,
              // "preferred_sectors": preferredSectors,
              // "fund_name": fundName,
              // "asset_under_management": assetsUnderMang,
              // "projected_invested_till_date": projInvestedtilldate,
              // "fund_head_quarters": fundHeadQuater,
              // "team_size": parseInt(teamSize)
              ,

            }
          })
        })
          .then((response) => {

            const json = response.json();
            return json;
          })
          .then(data => {
            console.log(data, loginId, "ProfileSettings  data");
            getMyOwnProjectDetailsFunc()
            handleClose()
            if (data?.data?.UpdateUser != null && data?.data?.UpdateUser != undefined) {

              console.log(data.data.UpdateUser, "ProfileSettings  Insidedata");
            } else {
            }
          });

      } catch (error) {
        console.log(error, "ProfileSettings  in profile in investors error");
      }
    } else {
      // alert("Please fill all the mandatory fields")
    }

  }
  const opennewWindow = (i) => {
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }

  const underProcess = () =>{
    

    window.open(`https://verify-with.blockpass.org/?clientId=CR2&serviceName=CR SQUARE FINANCE&env=prod`, '_blank').focus();
    // toast.warn('Under Process', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // });
  }
  
  // console.log(validatorProfileDetails, "show");
  return (
    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
        <div className="page-header" style={{ margin: '0px' }}>

          <div className="header-left">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title" style={{ wordSpacing: 'normal' }}>My Profile</h3>

              </div>
            </div>

          </div>


        </div>

        <div className="tab-content" style={{ padding: '0px' }}>
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            <div className="row2">
              <div className="col-md-12 d-flex">

                <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                  <div className="card-body" style={{ padding: '10px' }}>
                    <div className="col-md-12" style={{ padding: '0px' }}>
                      <div className="profile-view" style={{ margin: '10px' }}>
                        <div className="profile-img-wrap-vald">
                          <div className="profile-img" >
                            <a href="#"><img alt="" src={profilePic} /></a>
                          </div>
                          <div style={{marginTop:'20px'}}>
                            <div>
                              
                   <div className='gridBox3'>

                   <div className="gridBox3IconDiv">
                         <FontAwesomeIcon icon={faGlobe} className='gridBox3Icons'    />
                       </div>
                       
                       <div className="gridBox3IconDiv">
                         <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(validatorProfileDetails[0].linkedin)}  />
                       </div>
                       
                       <div className="gridBox3IconDiv">
                         <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons'   />
                       </div>
                   </div>
                            </div>
                          </div>

                          {/* <Rating
                            style={{ color: 'red', fontSize: '30px' }}
                            emptySymbol="fa fa-star-o "
                            fullSymbol="fa fa-star "
                            readonly={true}
                            initialRating={2}
                          /> */}
                        </div>

                        <div className="profile-basic-vald">
                          <div style={{ width: '100%', border: 'none' }}>
                            <div style={{ borderBottom: '1px solid' }}>

                              <div style={{ fontWeight: '700', fontSize: '25px' }}>
                                {validatorProfileDetails.length > 0 && validatorProfileDetails[0].first_name}
                              </div>
                              <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '10px' }}>
                                {validatorProfileDetails.length > 0 && validatorProfileDetails[0].email}
                              </div>
                              <div style={{ fontWeight: '500', marginBottom: '10px' }}>
                                {validatorProfileDetails.length > 0 && validatorProfileDetails[0].self_description}</div>
                            </div>

                            <div style={{ borderBottom: '1px solid' }}>
                              <div style={{ fontWeight: '700', fontSize: '25px' }}>
                                {"Education & Experience"}
                              </div>
                              <div>

                                <table style={{ width: '100%', border: 'none' }}>
                                  <tbody>

                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Education</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >
                                        {validatorProfileDetails.length > 0 && validatorProfileDetails[0].education}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Industry</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].industry}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Experience</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].experience}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Experience in Blockchain Industry</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].experience_in_blockchain}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Current Position</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].current_position}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Current Organisation</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].current_organisation}
                                        {/* <textarea style={{width:'100%',border:'1px solid #E3E9EF',borderRadius:'10px',height:'90px'}}/> */}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Past Organisations Tags</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >{validatorProfileDetails.length > 0 && validatorProfileDetails[0].past_organisation_tags}
                                        {/* <textarea style={{width:'100%',border:'1px solid #E3E9EF',borderRadius:'10px',height:'90px'}}/> */}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div style={{ borderBottom: '1px solid' }}>
                              <div style={{ fontWeight: '700', fontSize: '25px' }}>
                                {"Wallet"}
                              </div>

                              <div>

                                <table style={{ width: '100%', border: 'none' }}>
                                  <tbody>

                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>ERC-20 Wallet Address</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >
                                        {validatorProfileDetails.length > 0 && validatorProfileDetails[0].wallet_address}</td>
                                    </tr>
                                    <tr>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px', width: '40%' }}>Primary Funding Wallet Address</td>
                                      <td style={{ wordSpacing: 'normal', fontWeight: '500', padding: '10px 0px' }} >Polygon</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div style={{ borderBottom: '1px solid' }}>
                              <div style={{ fontWeight: '700', fontSize: '25px' }}>
                                {"Validator's KYC"}
                              </div>

                              <div style={{marginBottom:'50px'}}>
                                <button style={{padding:'0px',border:'0px',marginBottom:'15px'}} onClick={()=>underProcess()}>
                                  <img src={blockPass} style={{width:'140px',height:'40px'}}/>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <ProfileSettings

        // profileDetails={validatorProfileDetails}
        profilePic={profilePic}
        show={show}
        handleClose={handleClose}
        updateProfileDetails={updateProfileDetails}
        imageData={imageData}
        setImageData={setImageData}
        firstName={firstName}
        setFirstName={setFirstName}
        LastName={LastName}
        setLastName={setLastName}
        education={education}
        setEducation={setEducation}
        experience={experience}
        setexperience={setexperience}
        industry={industry}
        setindustry={setindustry}
        expInBlockChain={expInBlockChain}
        setexpInBlockChain={setexpInBlockChain}
        nationality={nationality}
        setnationality={setnationality}
        idProof={idProof}
        setidProof={setidProof}
        selfDescc={selfDescc}
        setselfDescc={setselfDescc}
        pasOrgTag={pasOrgTag}
        setpasOrgTag={setpasOrgTag}
        currOrgTag={currOrgTag}
        setcurrOrgTag={setcurrOrgTag}
        currPosition={currPosition}
        setcurrPosition={setcurrPosition}
        currLocation={currLocation}
        setcurrLocation={setcurrLocation}
        currIncome={currIncome}
        setcurrIncome={setcurrIncome}
        IdNumber={IdNumber}
        setIdNumber={setIdNumber}
        WalletAddress={WalletAddress}
        setWalletAddress={setWalletAddress}
        LinkedIn={LinkedIn}
        setLinkedIn={setLinkedIn}
      />

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
export default ValidatorProfile;
