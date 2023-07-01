import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import { projectId } from '../../../../reducers/ConstantSlice';


const ProjectPage = () => {

    const dispatch = useDispatch();
    const [checkPage, setCheckPage] = useState('')
    const [emailId, setEmailId] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [linkedInLink, setlinkedInLink] = useState('')
    const [projectName, setprojectName] = useState('')
    const [projectDesc, setprojectDesc] = useState('')
    const [natureofProject, setnatureofProject] = useState('')
    const [projectStartDate, setprojectStartDate] = useState('')

    const [WalledtAddress, setWalledtAddress] = useState('')

    const [whitePaper, setwhitePaper] = useState('')
    const [onePitchDoc, setonePitchDoc] = useState('')
    const [onePagerDoc, setonePagerDoc] = useState('')
    const [noofFounders, setnoofFounders] = useState('')

    const [teamSize, setteamSize] = useState('')
    const [projectTags, setprojectTags] = useState('')
    const [projectStage, setprojectStage] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [githubRepo, setgithubRepo] = useState('')
    const [projectEndDate, setProjectEndDate] = useState('')
    const [totalFundRaiseTarget, settotalFundRaiseTarget] = useState('')
    const [totalBudget, settotalBudget] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')
    const [validatorScore, setvalidatorScore] = useState('')
    const [InvestorScore, setInvestorScore] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        setShow(false)
    }
    
    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)
    
    const getUserDetailsFunc = () => {

        try {


            var query = `
            query AllProjects($founder: ID) {
                allProjects(founder: $founder) {
                  _id
                    fund_raised_target
                    public_launch_price
                  user {
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
                    aum
                  }
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
                  project_id
                  project_status
                  amount_released
                  amount_invested
                  amount_in_escrow
                  project_end_date
                  total_budget
                  validator_score
                  investor_score
                  fund_raised_till_now
                  total_fund_raised
                  investment_date
                  no_of_proposals
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
                        "founder": loginId,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        setCheckPage(data?.data?.allProjects[0]._id)
                        setProjectEndDate(data?.data?.allProjects[0].project_end_date)
                        settotalFundRaiseTarget(data?.data?.allProjects[0].fund_raised_target)
                        settotalBudget(data?.data?.allProjects[0].total_budget)
                        setpublicLaunchPrice(data?.data?.allProjects[0].public_launch_price)
                        setvalidatorScore(data?.data?.allProjects[0].validator_score)
                        setInvestorScore(data?.data?.allProjects[0].investor_score)
                        setWalledtAddress(data?.data?.allProjects[0]?.user?.wallet_address)
                        dispatch(projectId(data?.data?.allProjects[0]._id))
                        setEmailId(data?.data?.allProjects[0].email_id)
                        setfirstName(data?.data?.allProjects[0].first_name)
                        setlastName(data?.data?.allProjects[0].last_name)
                        setlinkedInLink(data?.data?.allProjects[0].linkedin_profile_link)
                        setprojectName(data?.data?.allProjects[0].project_name)
                        setprojectDesc(data?.data?.allProjects[0].project_description)
                        setnatureofProject(data?.data?.allProjects[0].nature_of_project)
                        setprojectStage(data?.data?.allProjects[0].project_stage)
                        setwhitePaper(data?.data?.allProjects[0].whitepaper)
                        setonePitchDoc(data?.data?.allProjects[0].pitch_deck)
                        setonePagerDoc(data?.data?.allProjects[0].one_pager_document)
                        setnoofFounders(data?.data?.allProjects[0].number_of_founders)
                        setteamSize(data?.data?.allProjects[0].team_size)
                        setprojectTags(data?.data?.allProjects[0].project_tags)
                        setprojectStage(data?.data?.allProjects[0].project_stage)
                        setWebsiteLink(data?.data?.allProjects[0].website_link)
                        setgithubRepo(data?.data?.allProjects[0].github_repository)
                        setprojectStartDate(data?.data?.allProjects[0].project_start_date)
                    } else {
                        setCheckPage('')
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
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Project Address:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{WalledtAddress != null && WalledtAddress != undefined && WalledtAddress}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Email ID:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{emailId != null && emailId != undefined && emailId}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>First Name:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{firstName != null && firstName != undefined && firstName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Last Name:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{lastName != null && lastName != undefined && lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn Profile Link:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{linkedInLink != null && linkedInLink != undefined && linkedInLink}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Name:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectName != null && projectName != undefined && projectName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Description:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDesc != null && projectDesc != undefined && projectDesc}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Nature of Project:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{natureofProject != null && natureofProject != undefined && natureofProject}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Start Date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectStartDate != null && projectStartDate != undefined && projectStartDate}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Tags:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectTags != null && projectTags != undefined && projectTags}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Stage:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectStage != null && projectStage != undefined && projectStage}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Website Link:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{websiteLink != null && websiteLink != undefined && websiteLink}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>GitHub Repository:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{githubRepo != null && githubRepo != undefined && githubRepo}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Whitepaper:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{whitePaper != null && whitePaper != undefined && whitePaper}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>One Pager Document:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{onePagerDoc != null && onePagerDoc != undefined && onePagerDoc}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Pitch Deck:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{onePitchDoc != null && onePitchDoc != undefined && onePitchDoc}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Number of Founders:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{noofFounders != null && noofFounders != undefined && noofFounders}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Team Size:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{teamSize != null && teamSize != undefined && teamSize}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project End Date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectEndDate != null && projectEndDate != undefined && projectEndDate}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Fund Raise Target:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalFundRaiseTarget != null && totalFundRaiseTarget != undefined && totalFundRaiseTarget}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Budget:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalBudget != null && totalBudget != undefined && totalBudget}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Validator Score:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{validatorScore != null && validatorScore != undefined && validatorScore}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Investor Score:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{InvestorScore != null && InvestorScore != undefined && InvestorScore}</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      
                    </div>
                </div>
                {/* <div style={{ marginTop: '40px', textAlign: 'end' }}>
                    <button className="btn buttonInProposal1 submit-btn">CREATE PROJECT DATA PAGE</button>
                </div> */}

            </div>
            
        </div>


    );
}
export default ProjectPage;
