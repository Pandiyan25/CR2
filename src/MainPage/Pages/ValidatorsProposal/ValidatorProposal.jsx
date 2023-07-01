import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-summernote/dist/react-summernote.css';
import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16, designLogo2 } from '../../../Entryfile/imagepath';
import "../../index.css";
import "./index.css";
import { Button } from 'react-bootstrap';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { apiURI } from '../../../config/config';
import {
    checkValidatorIsRegistered,
    validateProposal,
    addValidator,
    whoApproved,
    whoRejected,
    getProjectStatus,
    getProjectCycles,
    getProjectCurrentCycle,
    getInvestorInvestedBalance,
    getInvestorCurrentBalance
 } from '../../../config/web3Client3';
import { arrayOf } from 'prop-types';
import ProposalPopup from './ProposalPopup';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice';
import { projectId } from '../../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice';

import { useHistory } from "react-router-dom";
import ProposalStatusPopup from './ProposalStatusPopup';
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice';


const ValidatorProposal = () => {

    const [statusPrpShow, setStatusPrpShow] = useState(false)
    const [showProposalsList, setShowProposalsList] = useState(true)
    const [showPopup, setShowPopup] = useState(false)
    const [projectCycles, setProjectCycle] = useState(0)
    const [projectCurrentCycle, setProjectCurrentCycle] = useState(0)
    const [releasedFund, setReleasedFund] = useState(0)
    const [tableData, settableData] = useState([
        {
            sno: 1,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Initial',
            status: '',
            fundReleasedTillDate: '',
            noofValidators: '',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 2,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Approved',
            fundReleasedTillDate: '1000 USDC',
            noofValidators: '4',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'

        },
        {
            sno: 3,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Rejected',
            fundReleasedTillDate: '500 USDC',
            noofValidators: '4',
            fundRequested: '10000 USD',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 4,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Initial',
            status: '',
            fundReleasedTillDate: '',
            noofValidators: '',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'

        },
        {
            sno: 5,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Approved',
            fundReleasedTillDate: '1000 USDC',
            noofValidators: '4',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 6,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Rejected',
            fundReleasedTillDate: '500 USDC',
            noofValidators: '4',
            fundRequested: '10000 USD',
            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'
        },
        {
            sno: 7,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Initial',
            status: '',
            fundReleasedTillDate: '',
            noofValidators: '',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 8,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Approved',
            fundReleasedTillDate: '1000 USDC',
            noofValidators: '4',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'

        },
        {
            sno: 9,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Rejected',
            fundReleasedTillDate: '500 USDC',
            noofValidators: '4',
            fundRequested: '10000 USD',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 10,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Initial',
            status: '',
            fundReleasedTillDate: '',
            noofValidators: '',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'

        },
        {
            sno: 11,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Approved',
            fundReleasedTillDate: '1000 USDC',
            noofValidators: '4',
            fundRequested: '10000 USDC',

            projectStatus: 'Ongoing',
            releasedAmount: '1000 USDC'

        },
        {
            sno: 12,
            proposalNo: '98129',
            logo: designLogo2,
            projectName: 'Crowd Fund',
            type: 'Subsequent',
            status: 'Rejected',
            fundReleasedTillDate: '500 USDC',
            noofValidators: '4',
            fundRequested: '10000 USD',
            projectStatus: 'Ongoing',
            releasedAmount: '1000 USD'
        }
    ])

    const dispatch = useDispatch()
    let history = useHistory()
    const columns = [
        // {
        //     title: 'S.No',
        //     dataIndex: 'sno',
        //     align: 'center',
        //     sorter: (a, b) => a.sno.length - b.sno.length,
        // },
        {
            title: 'Proposal Id',
            //   dataIndex: 'proposalNo',
            align: 'center',

            render: (text, record) => (

                <div style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => showProposalsDataFun(text)}>{text.proposal_id}</div>
                // onClick={() => showProposalsDataFun(i)}
            ),
            sorter: (a, b) => a?.proposal_id?.localeCompare(b?.proposal_id),
            //   sorter: (a, b) => a.position.length - b.position.length,
        },

        {
            title: 'Logo',
            // dataIndex: 'logo',

            render: (text, record) => (
                <img src={text?.project?.logo} alt="" width="20px" style={{ borderRadius: '50px' }} />
            ),
            align: 'center',
            //   sorter: (a, b) => a.salary.length - b.salary.length,
            // },
            //   sorter: (a, b) => a.office.length - b.office.length,
        },

        {
            title: 'Project Name',
            // dataIndex: 'projectName',
            align: 'center',
            render: (text, record) => (

                <div>{text?.project != null && text?.project?.project_name}</div>
                // onClick={() => showProposalsDataFun(i)}
            ),
            //   sorter: (a, b) => a.age.length - b.age.length,
        }, {
            title: 'Proposal Type',
            dataIndex: 'type',
            align: 'center',
            //   sorter: (a, b) => a.age.length - b.age.length,
        }, {
            title: 'Funds Raised till Date',
            // dataIndex: 'fund_raised_till_now',
            align: 'center',
            render: (text, record) => (


                <div>{Number(text?.project?.fund_raised_till_now).toLocaleString("en-US")}</div>
                //  == 'Approved' ?
                //     <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
                //     </div>
                //     : (text.proposal_status == 'Rejected' ?
                //         <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
                //         </div>
                //         : <div>
                //             {text.proposal_status}
                //         </div>
                //     )


            ),
            // render: (text, record) => (
            //     <div>{text?.project != null && text.fund_raised_till_now}</div>
            //   sorter: (a, b) => a.age.length - b.age.length,
            // )
            //   sorter: (a, b) => a.age.length - b.age.length,
        },
        , {
            title: 'No. of Validations',
            dataIndex: 'no_of_validators',
            align: 'center',
            render: (text, record) => (
                text?.no_of_validators != null && text?.no_of_validators != undefined && text?.no_of_validators != '' ?
                
                <div> {Number(text?.no_of_validators).toLocaleString("en-US")} </div>
                :
                <div></div>)
            //   sorter: (a, b) => a.age.length - b.age.length,
        },
        , {
            title: 'Status',
            dataIndex: 'proposal_status',
            align: 'center',
            render: (text, record) => (


                text == 'Approved' ?
                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                        <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
                        </div></td>
                    : (text == 'Rejected' ?
                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                            <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
                            </div></td>
                        :
                        <td style={{ textAlign: 'center', padding: '10px 0px !important', fontSize: '14px' }}>{text}</td>
                    )


            ),
            //   sorter: (a, b) => a.age.length - b.age.length,
        },
        , {
            title: 'Funds Requested',
            // dataIndex: 'funds_requested',
            align: 'center',
            render: (text, record) => (
                text?.funds_requested != null && text?.funds_requested != undefined && text?.funds_requested != '' ?
                
                <div> {Number(text?.funds_requested).toLocaleString("en-US")} </div>
                :
                <div></div>)
            //   sorter: (a, b) => a.age.length - b.age.length,
        },
        {
            title: 'Released Amount',
            // dataIndex: 'released_amount',
            align: 'center',

            render: (text, record) => (
                <div>{Number(text?.project != null && text?.project?.amount_released).toLocaleString("en-US")}</div>
                //   sorter: (a, b) => a.age.length - b.age.length,
            )
        }, {
            title: 'Project Status',
            // dataIndex: 'projectStatus',
            align: 'center',
            render: (text, record) => (
                text?.project?.project_status == 'Ongoing' ?
                    <div onClick={() => showProposalsDataFun(text)} className=" bg-inverse-warning" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Ongoing
                    </div>
                    :
                    <div onClick={() => showProposalsDataFun(text)} >{text?.project?.project_status}</div>




            ),
            //   sorter: (a, b) => a.age.length - b.age.length,
        },

        // {
        //   title: '',
        //   dataIndex: 'salary', 
        //   render: (text, record) => (            
        //   <span>$ {text}</span>
        //     ), 
        //   sorter: (a, b) => a.salary.length - b.salary.length,
        // },
    ]
    const [remarks, setRemarks] = useState('')
    const [validateStatus, setValidateStatus] = useState('')

    const [aLLValidatedProposal, setALLValidatedProposal] = useState([])
    const [projectDetailsData, setProjectDetalsData] = useState([])
    const showPopupfunc = () => {
    }

    const handleClose = () => {
        setShowPopup(false)

    }

    const getAllProposalsforPopupfunc = (id) => {
        try {

            var query = `
         

            
query AllValidatorProposal($proposal: ID) {
    allValidatorProposal(proposal: $proposal) {
      _id
      user {
        _id
        id_number
        email
        profile_rating {
          value
        }
      }
      
      remarks
      status
      proposal {
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
                    variables:
                    {
                        "proposal": id,

                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allValidatorProposal?.length > 0 && data?.data?.allValidatorProposal[0].status != null) {
                        
                        setALLValidatedProposal(data?.data?.allValidatorProposal)
                    }

                    setShowPopup(true)
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const loginId = useSelector((state) => state.constVar.loginId)
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const [perticularProposals, setPerticularProposals] = useState([])

    console.log(perticularProposals, "perticularProposals");


    const showProposalsDataFun = async (i) => {
        // log
        console.log(i, "showProposalsDataFun");
        setPerticularProposals(i)
        await projectCyclesInfo(i)
        setShowProposalsList(false)
        // dispatch(proposalsData(a, b))
    }

    const close = () => {

        setShowProposalsList(true)
    }
    // console.log(perticularProposals,perticularProposals.length,"perticularProposals");

    const getProjectDetailsFunc = () => {
        try {

            var query =
                `
                query AllProjects($user: ID) {
                    allProposals(user: $user) {
                      _id
                      proposal_id
                      name
                      type
                      funds_requested
                      price_per_token
                      number_of_tokens
                      project_token_minted
                      proposal_blockchain_id
                      logo
                      project {
                        _id
                        project_blockchain_id
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
                        logo
                      }
                      no_of_validators
                      proposal_status
                      reported_expenditure_previous_cycle
                      reported_expenditure_till_date
                      token_release
                      additional_attachment
                      additional_information
                      receiving_address
                      timeline_update
                      fund_requested_for_current_cycle
                      budget_for_currenct_proposal_cycle
                      current_proposal_cycle
                      variants
                      reported_expenditure
                      reported_budget
                      investor {
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
                      currency
                      validator_status
                      fund_raised_till_now
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
                        "user": loginId
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data?.data?.allProposals);
                    if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
                        var totalInvested = 0;
                        //  for(var i = 0; i <=data?.data?.allProposal.length;i++ ){
                        //      arr.push({
                        //         proposal_id:data?.data?.allProposals[i].proposal_id,
                        //         tokens_locked_in_escrow:
                        //      })
                        //  }
                        setProjectDetalsData(data?.data?.allProposals)

                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const validateProposalFunc = (status, prop_id, proj_id) => {
        let statusVal = status == 'Approved' ? true : false;
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('check whether this action is triggered by validator or not')
            return checkValidatorIsRegistered(userData.provider, walletAddress)
                .then(resp => {
                    if (resp == true) {
                        console.log('this action is triggered by validator');
                        return Promise.resolve('existing validator')
                    } else {
                        console.log('adding validator');
                        return addValidator(userData.provider, walletAddress)
                    }
                })
                .then(async (resp) => {
                    console.log('validator status: ', resp)
                    console.log('calling validateProposal')
                    let approvals = await whoApproved(userData?.provider, proj_id, prop_id);
                    let rejections = await whoRejected(userData?.provider, proj_id, prop_id);
                    if ((approvals && approvals.length && approvals.includes(walletAddress)) || (rejections && rejections.length && rejections.includes(walletAddress))) {
                        throw new Error("The Proposal has already been Validated");
                    } else return validateProposal(userData.provider, walletAddress, statusVal, prop_id, proj_id)
                })
                .then((resp) => {
                    console.log('called validateProposal', resp);
                    return true;
                })
                .catch(err => {
                    console.log(err)
                    alert(err.message);
                    return false;
                })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
            return false;
        }
    }

    const projectCyclesInfo = async (proposalInfo) => {
        let { project } = proposalInfo;
        console.log('project-----------', project);
        if (project?.project_blockchain_id) {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            let proj_cycle = await getProjectCycles(userData?.provider, project.project_blockchain_id);
            console.log('proj_cycle', proj_cycle);
            setProjectCycle(proj_cycle)
        }
    }

    useEffect(() => {
        getProjectDetailsFunc()
    }, [])

    const getAllProposalsfunc = (status, id, prop_id, proj_id, type, p_id) => {
        console.log(type, "type");
        try {

            var query = `
           query($user: ID, $proposal: ID) {
            allValidatorProposal(user: $user, proposal: $proposal)  {
            _id
            proposal {
            _id
            }
            user {
            _id
            }
              status
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
                        "input": {
                            "proposal": id,
                            "user": loginId,
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data?.data?.allValidatorProposal);
                    if (data?.data?.allValidatorProposal?.length > 0 && data?.data?.allValidatorProposal[0].status != null) {

                        alert('The Proposal has already been Validated')


                    } else {
                        if (type === 'Subsequent') {
                            let isValidated = await validateProposalFunc(status, prop_id, proj_id);
                            console.log('web3 validation status:', isValidated)
                            if (isValidated) {
                                const userData = JSON.parse(localStorage.getItem('userAccount'));
                                let approvals = await whoApproved(userData?.provider, proj_id, prop_id);
                                let rejections = await whoRejected(userData?.provider, proj_id, prop_id);
                                let propStatus = null;
                                console.log(approvals, rejections, "approvals, rejections")
                                if (approvals && approvals.length && [...new Set(approvals)].length >= 3) {
                                    propStatus = 'Approved';
                                } else if (rejections && rejections.length && [...new Set(rejections)].length >= 3) {
                                    propStatus = 'Rejected';
                                }
                                let validatorCount = approvals.length + rejections.length
                                await makeValidatorProposal(status, id, validatorCount)
                                if (propStatus) {
                                    await updateValidatorProposal(propStatus, id, validatorCount)
                                    let proj_status = await getProjectStatus(userData?.provider, proj_id)
                                    if (proj_status && (proj_status == 'Completed' || proj_status == 'Rejected')) {
                                        console.log('Updating web2 project status with ', proj_status)
                                        await updateProjectStatus(proj_status, p_id)
                                    }
                                }
                            }
                            // updateProposalApprovalStatus(id, status) // Approved, Rejected
                        } else {
                            alert('This is not a subsequent proposal to vote')
                        }
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const updateValidatorProposal = (status, id, count) => {
        console.log('updating db record status', id)
        try {

            var query = `mutation Mutation($id: ID, $input: ProposalInput) {
                updateProposal(_id: $id, input: $input) {
                  name
                  proposal_id
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
                    variables:
                    {

                        "id": id,
                        "input": {
                            "proposal_status": status,
                            "no_of_validators": count
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data?.data?.updateProposal);
                    if (data?.data?.updateProposal != null && data?.data?.updateProposal != undefined) {
                        // alert(`The Proposal has been ${status}`)

                    } else {
                        // alert('You have already Validated')
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const updateProjectStatus = (status, id) => { // update project status based subsequest rejections or web3 status
        console.log('updating db record status', id)
        try {

            var query = `mutation UpdateProject($input: ProjectInput, $id: ID) {
                updateProject(input: $input, _id: $id) {
                  project_status
                  _id
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
                    variables:
                    {

                        "id": id,
                        "input": {
                            "project_status": status
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data?.data?.updateProject);
                    if (data?.data?.updateProject != null && data?.data?.updateProject != undefined) {
                        // alert(`The Proposal has been ${status}`)

                    } else {
                        // alert('You have already Validated')
                    }
                });

        } catch (error) {
            console.log(error, "UpdateProject  in validatorDashboard in investors error");
        }
    }



    const makeValidatorProposal = (status, id, count) => {
        try {

            var query = `mutation Mutation($input: ValidatorProposalInput) {
            createValidatorProposal(input: $input) {
              _id
              remarks
              status
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
                    variables:
                    {
                        "input": {
                            "proposal": id,
                            "user": loginId,
                            "remarks": remarks,
                            "status": status,
                            "no_of_validators": count
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('ProjectGetFunctiondata', data?.data?.createValidatorProposal);
                    if (data?.data?.createValidatorProposal != null && data?.data?.createValidatorProposal != undefined) {
                        alert(`The Proposal has been ${status}`)

                    } else {
                        alert('The Proposal has already been validated successfully')
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }
    const sendDatatoProjectPage = (i) => {
        dispatch(fetchRoadMapProjectDetails(i))
        dispatch(fetchBudgetProjectDetails(i))
        dispatch(fetchProjectDetails(i))
        dispatch(projectId(i))
        dispatch(fetchFundingProjectDetails(i))
        dispatch(fetchTeamSize(i))
        dispatch(fetchTokenomicsDetails(i))
        dispatch(fetchSocialTeam(i))
        dispatch(fetchBudgetBannerDetails(i))
        history.push('/detail-projects')
    }

    const showPRoposalFunc = () => {
        setStatusPrpShow(true)
    }
    const showPRoposalCloseFunc = () => {
        setStatusPrpShow(false)
    }


    console.log(projectDetailsData, "projectDetailsData in validator in proposal");
    return (
        <div className="page-wrapper" style={{paddingTop:'60px'}}>

            <div className="content container-fluid">

                <div className="page-header">

                    <div className="header-left">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title" style={{ wordSpacing: 'normal' }}>Proposals</h3>

                            </div>
                        </div>

                    </div>


                </div>
                {/* /Search Filter */}
                {showProposalsList == true ?
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ padding: '20px', background: 'white', border: '2px solid #E3E9EF', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                <div className="table-responsive" style={{ border: '2px solid #E3E9EF', borderRadius: '10px', background: 'white' }}>

                                    <Table
                                        pagination={{
                                            total: projectDetailsData.length,
                                            // showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }
                                        }
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        bordered
                                        dataSource={projectDetailsData}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>

                        <div className="card mb-0">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="profile-view">

                                            <div className="profile-basic" style={{ margin: '0px', padding: '0px' }}>
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <div className="profile-img-wrap2" style={{ height: '100%', width: '100%' }}>
                                                            <div className="profile-img" >
                                                                <a href="#"><img alt="" src={Avatar_02} /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="" style={{ textAlign: 'center' }}>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Proposal Id:</div>
                                                                <div>{perticularProposals?.proposal_id}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Project Name:</div>
                                                                <div>{perticularProposals?.project?.project_name}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Proposal Type:</div>
                                                                <div>{perticularProposals.type}</div>
                                                            </div>
                                                            
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Project Token:</div>
                                                                {/* <div>{perticularProposals.type}</div> */}
                                                            </div>

                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Proposal Number:</div>
                                                                <div>{perticularProposals?.current_proposal_cycle}/{projectCycles}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Fund Requested:</div>
                                                                <div>{perticularProposals?.funds_requested}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Funds Released till Date:</div>
                                                                <div>{perticularProposals?.fundReleasedTillDate}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Reported Expenditure for previous Cycle:</div>
                                                                <div>{perticularProposals?.reported_expenditure_previous_cycle} USDC</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Reported Expenditure till date:</div>
                                                                <div>{perticularProposals?.reported_expenditure_till_date} USDC</div>
                                                            </div>
                                                            
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >No of Tokens :</div>
                                                                <div>{perticularProposals?.number_of_tokens}</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Price Per Token :</div>
                                                                <div>{perticularProposals?.project_token_minted}</div>
                                                            </div>
                                                            
                                                            <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <div >Amount in Escrow:</div>
                                                                <div>{perticularProposals?.project?.amount_in_escrow} USDC</div>
                                                            </div>
                                                            <div className="paddingProposal" style={{ textAlign: 'left' }}>
                                                                <div >Remarks:</div>
                                                                <input style={{
                                                                    padding: '10px',
                                                                    width: '100%',
                                                                    border: '2px solid #E3E9EF',
                                                                    borderRadius: '10px',
                                                                    // height: '70px'
                                                                }}
                                                                    onChange={(e) => setRemarks(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">

                                                        <ul className="personal-info">

                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                <div className="paddingProposal">No. of Validations:</div>
                                                                <div style={{ margin: '10px' }}>
                                                                    {perticularProposals?.no_of_validators}
                                                                    <button className=' buttonInProposal1' style={{
                                                                        width: '50px', height: '25px', borderRadius: '20px', margin: '10px', fontSize: '10px'
                                                                    }} onClick={() => getAllProposalsforPopupfunc(perticularProposals?._id)}>View</button></div>
                                                            </div>
                                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                <div className="paddingProposal">Validation Status:</div>
                                                                <div style={{ margin: '10px' }}>{perticularProposals?.proposal_status} </div>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Button className=' buttonInProposal1' style={{ borderRadius: '50px', fontSize: '12px' }} onClick={() => showPRoposalFunc(perticularProposals?._id)} >View Proposals</Button>
                                                                <Button className=' buttonInProposal1 marginRight' style={{ borderRadius: '50px', fontSize: '12px' }} onClick={() => sendDatatoProjectPage(perticularProposals?.project?._id)}>View Project</Button>
                                                            </div>

                                                        </ul>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
                                <div className="submit-section">
                                    <button className="btn buttonInProposal submit-btn" onClick={() => close()}>BACK</button>
                                </div>
                                {perticularProposals != null && perticularProposals != undefined && perticularProposals?.type == 'Initial' ?
                                    ""
                                    :
                                    <div className="submit-section">
                                        {/* onClick={()=>} */}
                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '10px' }} onClick={() => getAllProposalsfunc("Rejected", perticularProposals?._id, perticularProposals?.proposal_blockchain_id, perticularProposals?.project?.project_blockchain_id, perticularProposals?.type, perticularProposals?.project?._id)}>REJECT</button>
                                        <button className="btn buttonInProposal1 submit-btn" onClick={() => getAllProposalsfunc("Approved", perticularProposals?._id, perticularProposals?.proposal_blockchain_id, perticularProposals?.project?.project_blockchain_id, perticularProposals?.type, perticularProposals?.project?._id)}>APPROVE</button>
                                    </div>

                                }




                            </div>

                        </div>
                        <ProposalStatusPopup show={statusPrpShow} handleClose={showPRoposalCloseFunc} proposalPartType={perticularProposals} />

                        <ProposalPopup show={showPopup} handleClose={handleClose} aLLValidatedProposal={aLLValidatedProposal} />
                    </div>
                }

            </div>


        </div>
    )
}


export default withRouter(ValidatorProposal);
