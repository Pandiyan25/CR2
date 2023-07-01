
import React, { useEffect, useState } from 'react';
import ProfileEditModal from './ProfileEditModal';

import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import ProfileSaveModal from './ProfileSaveModal';

const ProfilePage = () => {
    const [checkPage, setCheckPage] = useState('')
    const [emailId, setEmailId] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [education, seteducation] = useState('')
    const [Experience, setExperience] = useState('')
    const [expInBlockChain, setexpInBlockChain] = useState('')
    const [Industry, setIndustry] = useState('')
    const [selfDesc, setselfDesc] = useState('')
    const [allData, setAllData] = useState([])

    
    const [currentRole, setcurrentRole] = useState('')
    const [onePitchDoc, setonePitchDoc] = useState('')
    const [onePagerDoc, setonePagerDoc] = useState('')
    const [noofFounders, setnoofFounders] = useState('')

    const [teamSize, setteamSize] = useState('')
    const [projectTags, setprojectTags] = useState('')
    const [projectStage, setprojectStage] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [githubRepo, setgithubRepo] = useState('')
    const [showSave, setShowSave] = useState(false)
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        getUserDetailsFunc()
        setShow(false)
    }

    const handleShowSave = () =>{
        setShowSave(true)
    }

    const handleCloseShowSave = () => {
        getUserDetailsFunc()
        setShowSave(false)
    }
    const loginId = useSelector((state) => state.constVar.loginId)
    const getUserDetailsFunc = () => {

        try {


            var query = `
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
                  id_number
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
                    variables: 
                    {
                        "id": loginId
                      }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.getUser);
                    if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
                        // setCheckPage(data?.data?.getUser[0]._id)
                        setAllData([data?.data?.getUser])
                        setEmailId(data?.data?.getUser?.email)
                        setfirstName(data?.data?.getUser?.first_name)
                        setlastName(data?.data?.getUser?.last_name)
                        seteducation(data?.data?.getUser?.education)
                        setExperience(data?.data?.getUser?.experience)
                        setexpInBlockChain(data?.data?.getUser?.experience_in_blockchain)
                        setIndustry(data?.data?.getUser?.industry)
                        setcurrentRole(data?.data?.getUser?.current_position)
                    } else {
                        setAllData([])
                        setEmailId('')
                        setfirstName('')
                        setlastName('')
                        seteducation('')
                        setExperience('')
                        setexpInBlockChain('')
                        setIndustry('')
                        setcurrentRole('')
                        setCheckPage(data?.data?.getUser)
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    useEffect(() => {
        if (loginId != '') {
            getUserDetailsFunc()
        }

    }, [loginId])

    const editAndSaveData = () => {
        
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = pattern.test(emailId);
        if(result == true){
        try {
            var query = `
            
        mutation Mutation($input: UserInput, $id: ID) {
  
            updateUser(input: $input, _id: $id) {
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
              id_number
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
                        "id": loginId,
                        "input": {
                            "email": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "education": education,
                            "experience": Experience,
                            "experience_in_blockchain": expInBlockChain,
                            "industry": Industry,
                            "self_description": selfDesc,
                            "current_position": currentRole,
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getUserDetailsFunc()
                    handleCloseShow()
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }
    }else{
        alert("Please enter Valid Email")
    }
        console.log("editAndSaveData");
    }
    const saveNewPojectData = () => {
        console.log("saveNewPojectData");
        
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = pattern.test(emailId);
        if(result == true){

        
        try {
            var query = `
            mutation CreateUser($input: UserInput) {
                createUser(input: $input) {
                  User {
                    _id
                  }
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
                            "email": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "education": education,
                            "experience": Experience,
                            "experience_in_blockchain": expInBlockChain,
                            "industry": Industry,
                            "self_description": selfDesc,
                            "current_position": currentRole,
                        },

                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getUserDetailsFunc()
                    handleCloseShowSave()
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }
    }else{
        alert("Please enter Valid Email")
    }

    }
    return (


        <div className="card-body" style={{ padding: '10px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '10px' }}>


                    <h3 className="card-title">Profile</h3>
                    <div className="">
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>First Name:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{firstName != null && firstName != undefined && firstName}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Last Name:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{lastName != null && lastName != undefined && lastName}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Email ID:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{emailId != null && emailId != undefined && emailId}</td>
                                </tr>
                                {/* <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Password:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr> */}
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Education:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{education != null && education != undefined && education}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Experience != null && Experience != undefined && Experience}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Industry:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Industry != null && Industry != undefined && Industry}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience in blockchain Industry:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{expInBlockChain != null && expInBlockChain != undefined && expInBlockChain}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Self Description:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{selfDesc != null && selfDesc != undefined && selfDesc}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Role:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                        {currentRole != null && currentRole != undefined && currentRole}
                                    </td>
                                </tr>


                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {allData.length > 0 ?
                    <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>
                    :
                    <div className="pro-edit"><button className="edit-icon" onClick={() => handleShowSave()}><i className="fa fa-pencil" /></button></div>

                    }
                    
                </div>
            </div>
            {/* <div style={{ marginTop: '40px' }}>
                <button className="btn buttonInProposal submit-btn" style={{ marginRight: "15px" }}  onClick={() => handleShow()}>EDIT</button>
                <button className="btn buttonInProposal submit-btn"  onClick={() => handleShowSave()}>SAVE</button>
            </div> */}
            <ProfileEditModal
                emailId={emailId}
                setEmailId={setEmailId}
                firstName={firstName}
                setfirstName={setfirstName}
                lastName={lastName}
                setlastName={setlastName}
                education={education}
                seteducation={seteducation}
                Experience={Experience}
                setExperience={setExperience}
                expInBlockChain={expInBlockChain}
                setexpInBlockChain={setexpInBlockChain}
                Industry={Industry}
                setIndustry={setIndustry}
                selfDesc={selfDesc}
                setselfDesc={setselfDesc}
                currentRole={currentRole}
                setcurrentRole={setcurrentRole}

                show={show}
                handleClose={handleCloseShow}
                checkPage={checkPage}
                saveNewPojectData={saveNewPojectData}
                editAndSaveData={editAndSaveData} />

                <ProfileSaveModal emailId={emailId}
                setEmailId={setEmailId}
                firstName={firstName}
                setfirstName={setfirstName}
                lastName={lastName}
                setlastName={setlastName}
                education={education}
                seteducation={seteducation}
                Experience={Experience}
                setExperience={setExperience}
                expInBlockChain={expInBlockChain}
                setexpInBlockChain={setexpInBlockChain}
                Industry={Industry}
                setIndustry={setIndustry}
                selfDesc={selfDesc}
                setselfDesc={setselfDesc}
                currentRole={currentRole}
                setcurrentRole={setcurrentRole}

                show={showSave}
                handleClose={handleCloseShowSave}
                checkPage={checkPage}
                saveNewPojectData={saveNewPojectData}
                editAndSaveData={editAndSaveData} />
        </div>


    );
}
export default ProfilePage;
