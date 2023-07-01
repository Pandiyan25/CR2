/**
 * TermsCondition Page
 */
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiURI } from '../../../config/config';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16 } from '../../../Entryfile/imagepath'
import Header from '../../../initialpage/Sidebar/header';
import { fetchProfileDetails, selectAllProfile } from '../../../reducers/profileSlice';
import ProfileSettings from './ProfileSettings';

const EmployeeProfile = () => {


  const [roleInOrg, setRoleInOrg] = useState('')
  const [fundName, setfundName] = useState('')
  const [fundDesc, setfundDesc] = useState('')
  const [assestmang, setassestmang] = useState('')
  const [minInvSize, setminInvSize] = useState('')
  const [projInvestedtilldate, setprojInvestedtilldate] = useState('')
  const [projInvested, setprojInvested] = useState('')
  const [fundHeadQuarter, setfundHeadQuarter] = useState('')
  const [typeofFund, settypeofFund] = useState('')
  const [teamSize, setteamSize] = useState('')
  const [proffredSector, setproffredSector] = useState('')
  const [linkeIn, setlinkeIn] = useState('')
  const [websiteLink, setwebsiteLink] = useState('')
  const [twitterLink, settwitterLink] = useState('')
  const [LinkedInLink, setLinkedInLink] = useState('')
  const dispatch = useDispatch();
  const loginId = useSelector((state) => state.constVar.loginId)
  const [profileDetails, setProfileDetails] = useState([])
  // const profileDetails = useSelector(selectAllProfile)
  console.log(loginId, profileDetails, "loginId");
  const [projectDetailsData, setProjectDetalsData] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getMyOwnProjectDetailsFunc = () => {
    try {

      var query =
        `
     query AllProposals($id: ID) {
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
            setProfileDetails([data?.data?.getUser])
            setRoleInOrg(data?.data?.getUser.role_in_organization)

            setfundName(data?.data?.getUser.fund_name)
            setfundDesc(data?.data?.getUser.fund_description)
            setassestmang(data?.data?.getUser.asset_under_management)
            setminInvSize(data?.data?.getUser.minimum_investment_size)
            setprojInvested(data?.data?.getUser.project_invested)
            setprojInvestedtilldate(data?.data?.getUser.projected_invested_till_date)
            setfundHeadQuarter(data?.data?.getUser.fund_head_quarters)
            settypeofFund(data?.data?.getUser.type_of_fund)
            setteamSize(data?.data?.getUser.team_size)
            setproffredSector(data?.data?.getUser.preferred_sectors)
            setlinkeIn(data?.data?.getUser.linkedin)
            setwebsiteLink(data?.data?.getUser.website_link)
            settwitterLink(data?.data?.getUser.twitter_link)
            setLinkedInLink(data?.data?.getUser.linkedin_link)

            //    setLastName(data?.data?.getUser.last_name)
            //   setEducation(data?.data?.getUser.education)
            //    setexperience(data?.data?.getUser.experience)
            //   setindustry(data?.data?.getUser.industry)
            //   setexpInBlockChain(data?.data?.getUser.experience_in_blockchain)
            //    setnationality(data?.data?.getUser.nationality)
            //    setidProof(data?.data?.getUser.id_proof)
            //   setselfDescc(data?.data?.getUser.self_description)
            //  setpasOrgTag(data?.data?.getUser.past_organisation_tags)
            //   setcurrOrgTag(data?.data?.getUser.current_organisation)
            //    setcurrPosition(data?.data?.getUser.current_position)
            //   setcurrLocation(data?.data?.getUser.current_location)
            //   setcurrIncome(data?.data?.getUser.current_income)
            //   setIdNumber(data?.data?.getUser.id_number)
            //   setWalletAddress(data?.data?.getUser.wallet_address)
            //   setLinkedIn(data?.data?.getUser.linkedin)
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

  useEffect(() => {
    if (loginId != '') {
      getMyOwnProjectDetailsFunc()
    }

  }, [loginId])

  console.log(projectDetailsData, projectDetailsData.length, "projectDetailsData  in profile in investors ");
  const updateProfileDetails = () => {
    try {
      var query = `
        mutation Mutation($id: ID, $input: UserInput) {
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
                "role_in_organization": roleInOrg,
                "fund_description": fundDesc,
                "fund_name": fundName,
                "asset_under_management": assestmang,
                "minimum_investment_size": minInvSize,
                "project_invested": projInvested,
                "type_of_fund": typeofFund,
                "projected_invested_till_date": projInvested,
                "fund_head_quarters": fundHeadQuarter,
                "team_size": parseInt(teamSize),
                "preferred_sectors": proffredSector,
                "linkedin": linkeIn,
                "linkedin_link": LinkedInLink,
                "website_link": websiteLink,
                "twitter_link": twitterLink
              }
           
           

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

  }


  return (
    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        {/* <Header/>   */}
        <div className="page-header" style={{ margin: '0px' }}>

          <div className="header-left">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title" style={{ wordSpacing: 'normal' }}>My Profile</h3>

              </div>
            </div>

          </div>


        </div>
        {/* /Page Header */}

        <div className="tab-content" style={{ padding: '0px' }}>
          {/* Profile Info Tab */}
          <div id="emp_profile" className="pro-overview tab-pane fade show active">
            <div className="row2">
              <div className="profilediv7 d-flex">

                <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                  <div className="card-body" style={{ padding: '10px' }}>
                    <div className="col-md-12" style={{ padding: '0px' }}>
                      <div className="profile-view" style={{ margin: '0px' }}>
                        <div className="profile-img-wrap">
                          <div className="profile-img" >
                            <a href="#"><img alt="" src={Avatar_02} /></a>
                          </div>

                        </div>
                        <div className="profile-basic">
                          <table className="borderSpacing" style={{ width: '100%', wordBreak: 'break-word' }}>

                            <tbody>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Role in the Organisation:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].role_in_organization}
                                </td>

                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Fund Name:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_name}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Fund Description:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_description}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}> Assets Under Management:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].asset_under_management}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Minimum Investment Size:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].minimum_investment_size}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Projects Invested till date:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].projected_invested_till_date}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Project Invested:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].project_invested}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Fund Head Quarters:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_head_quarters}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Type of Fund:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].type_of_fund}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Team Size:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].team_size}
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Preffered Sectors:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].preferred_sectors.length > 0 && profileDetails[0].preferred_sectors.map((i)=>i?.value)}
                                </td>
                              </tr>
                              {/* <tr>
                                <td style={{ width: '50%',  color: '#4f4f4f' }}>Password:</td>
                                <td className="text-center">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].password}
                                </td>
                              </tr> */}
                            </tbody>
                          </table>
                          {/* <ul className="personal-info">
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Role in the Organisation:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }} >{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].role_in_organization}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Fund Name:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_name}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Fund Description</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_description}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}> Assets Under Management:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}><a href="">{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].asset_under_management}100 Million USD</a></div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Minimum Investment Size:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].minimum_investment_size} USD</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Projects Invested till date:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].projected_invested_till_date}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Project Invested:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].project_invested}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Fund Head Quarters:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_head_quarters}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Type of Fund:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].type_of_fund}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Team Size:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].team_size}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Preffered Sectors:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].preferred_sectors}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Password:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].password}</div>
                            </li>
                          </ul> */}
                        </div>
                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="profilediv5 d-flex">
                <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                  <div className="card-body" style={{ padding: '10px' }}>
                    <div className="col-md-12" style={{ padding: '0px' }}>
                      <div className="profile-view" style={{ margin: '10px' }}>

                        <h3 className="card-title">Social Media</h3>
                        <div className="">

                          <table className="boxSpacing2" style={{ width: '100%', wordBreak: 'break-word' }}>

                            <tbody>
                              <tr>
                                <td className="fontSize" style={{ width: '50%',  color: '#4f4f4f' }}>LinkedIn(SPOC Profile Link):</td>
                                <td className="text-center fontSize">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].linkedin}
                                </td>

                              </tr>
                              <tr>
                                <td className="fontSize" style={{ width: '50%',  color: '#4f4f4f' }}>Website Link:</td>
                                <td className="text-center fontSize">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].website_link}
                                </td>

                              </tr>
                              <tr>
                                <td className="fontSize" style={{ width: '50%',  color: '#4f4f4f' }}>Twitter Link:</td>
                                <td className="text-center fontSize">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].twitter_link}
                                </td>

                              </tr>
                              <tr>
                                <td className="fontSize" style={{ width: '50%',  color: '#4f4f4f' }}>LinkedIn Link(Fund Link):</td>
                                <td className="text-center fontSize">
                                  {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].linkedin_link}
                                </td>

                              </tr>
                            </tbody>
                          </table>
                          {/* <ul className="personal-info">


                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>LinkedIn(SPOC Profile Link):</div>
                              <div className="text" style={{ wordSpacing: 'normal' }} >{projectDetailsData.length > 0 && projectDetailsData[0].role_in_organization}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Website Link:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{projectDetailsData.length > 0 && projectDetailsData[0].role_in_organization}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>Twitter Link:</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{projectDetailsData.length > 0 && projectDetailsData[0].role_in_organization}</div>
                            </li>
                            <li>
                              <div className="title" style={{ wordSpacing: 'normal' }}>LinkedIn Link(Fund Link):</div>
                              <div className="text" style={{ wordSpacing: 'normal' }}>{projectDetailsData.length > 0 && projectDetailsData[0].role_in_organization}</div>
                            </li>

                          </ul> */}

                          <h3 className="card-title" style={{ marginTop: '10px', marginBottom: '15px' }}>Profile Rating</h3>
                          <Rating
                            style={{ color: '#ff9800', fontSize: '25px' }}
                            emptySymbol="fa fa-star-o fa-mx"
                            fullSymbol="fa fa-star fa-mx"
                            // readonly={true}
                            initialRating={2}
                          />
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
        profileDetails={profileDetails}
        show={show}
        updateProfileDetails={updateProfileDetails}
        handleClose={handleClose}
        count={setProjectDetalsData.length}
        roleInOrg={roleInOrg}
        fundName={fundName}
        fundDesc={fundDesc}
        assestmang={assestmang}
        minInvSize={minInvSize}
        projInvested={projInvested}
        projInvestedtilldate={projInvestedtilldate}
        fundHeadQuarter={fundHeadQuarter}
        typeofFund={typeofFund}
        teamSize={teamSize}
        proffredSector={proffredSector}
        linkeIn={linkeIn}
        websiteLink={websiteLink}
        twitterLink={twitterLink}
        LinkedInLink={LinkedInLink}
        setRoleInOrg={setRoleInOrg}
        setfundName={setfundName}
        setfundDesc={setfundDesc}
        setassestmang={setassestmang}
        setminInvSize={setminInvSize}
        setprojInvested={setprojInvested}
        setprojInvestedtilldate={setprojInvestedtilldate}
        setfundHeadQuarter={setfundHeadQuarter}
        settypeofFund={settypeofFund}
        setteamSize={setteamSize}
        setproffredSector={setproffredSector}
        setlinkeIn={setlinkeIn}
        setwebsiteLink={setwebsiteLink}
        settwitterLink={settwitterLink}
        setLinkedInLink={setLinkedInLink}

      />
    </div>

  );
}
export default EmployeeProfile;
