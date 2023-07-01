import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-summernote/dist/react-summernote.css'; // import styles
import { projectId, proposalsData } from '../../reducers/ConstantSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16, designLogo2 } from '../../Entryfile/imagepath';
import "../index.css";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../antdstyle.css";
import ProposalPopup from './ProposalPopup';
import { itemRender, onShowSizeChange } from '../paginationfunction';
import { apiURI } from '../../config/config';
import {
    // approveByStableContract,
    // depositTokens,
    // tenPecentOfFounderToken,
    // Withdraw10PercentOfFounderToken,
    // whoApproved,
    // totalDepositedFounderTokenInPot,
    // withdrawAllFounderTokenFromThePool,
    // whoRejected,
    // totalDepositedStableCoinsInThePot,
    // withdrawTokens,
    investorDepositStatus,
    approveByStableContract,
    depositTokens,
    getProjectStatus,
    getInvestorCurrentBalance,
    withdrawTokens,
    getProjectCurrentEscrowBalance,
    getProjectCycles,
    getProjectCurrentCycle
} from '../../config/web3Client3';
import ProposalStatusPopup from '../Pages/ValidatorsProposal/ProposalStatusPopup';
import { fetchProjectDetails } from '../../reducers/ProjectDetailsSlice';
import { fetchFundingProjectDetails } from '../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../reducers/SocialPageSlice';
import { fetchRoadMapProjectDetails } from '../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../reducers/BudgetSlice';
import { fetchBudgetBannerDetails } from '../../reducers/BugetBannerSlice';

const ProposalRoute = () => {

    let history = useHistory()
    const [statusPrpShow, setStatusPrpShow] = useState(false)
    const loginId = useSelector((state) => state.constVar.loginId)
    const [proposalsData, setProposalData] = useState([])
    const [showProposalsList, setShowProposalsList] = useState(true)
    const [showPopup, setShowPopup] = useState(false)

    const [aLLValidatedProposal, setALLValidatedProposal] = useState([])
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const [remarks, setRemarks] = useState('')

    const columns = [



        {
            title: 'Proposal Id',
            //   dataIndex: 'proposal_id',
            align: 'center',

            render: (text, record) => (

                <div className="mainLinkText" style={{ cursor: 'pointer' }} onClick={() => showProposalsDataFun(text)}>{text?.proposal_id}</div>

            ),
            sorter: (a, b) => a?.proposal_id?.localeCompare(b?.proposal_id) ,
            // sorter: (a, b) => a.proposal_id.length - b.proposal_id.length,
        },

        {
            title: 'Logo',
            // dataIndex: 'logo',
            render: (text, record) => (
                <img src={text?.project?.logo} alt="" width="20px" style={{borderRadius:'50px'}} />
            ),
           
            align: 'center',
        },

        {
            title: 'Project Name',
            // dataIndex: 'name',
            render: (text, record) => (

                <div  >{text?.project?.project_name}</div>

            ),
            align: 'center',
            sorter: (a, b) => a?.project?.project_name?.localeCompare(b?.project?.project_name) ,
            // sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'Proposal Type',
            dataIndex: 'type',
            align: 'center',
            sorter: (a, b) => a?.type?.localeCompare(b?.type) ,
            // sorter: (a, b) => a.type.length - b.type.length,
        },
        {
            title: 'Validation Status',
            render: (text, record) => (


                text.validator_status == 'Approved' ?
                    <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
                    </div>
                    : (text.validator_status == 'Rejected' ?
                        <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
                        </div>
                        : <div>
                            {text.validator_status}
                        </div>
                    )


            ),
            align: 'center',
        },
        {
            title: 'Funds Released till Date',
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
        },
        , {
            title: 'No. Of Validations',
            dataIndex: 'no_of_validators',
            align: 'center',
            sorter: (a, b) => a?.no_of_validators?.localeCompare(b?.no_of_validators) ,
            // sorter: (a, b) => a.no_of_validators.length - b.no_of_validators.length,
            //   sorter: (a, b) => a.age.length - b.age.length,
        },
        {
            title: 'Funds Requested',
            dataIndex: 'funds_requested',
            align: 'center',
            sorter: (a, b) => a?.funds_requested?.localeCompare(b?.funds_requested) ,
            // sorter: (a, b) => a.funds_requested.length - b.funds_requested.length,
            //   sorter: (a, b) => a.age.funds_requested - b.age.length,
        }
        // , {
        // title: 'Options',
        // dataIndex: 'status',
        // align: 'center',
        // render: (text, record) => (

        //     <button className="btn buttonInProposal1 submit-btn2-proposal" >View</button>




        // ),
        //   sorter: (a, b) => a.age.length - b.age.length,
        // },



    ]

    const getAllProposalsforPopupfunc = (id) => {
        try {

            var query = `
            query Query($proposal: ID) {
                allValidatorProposal(proposal: $proposal) {
                  _id
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
                  
                    proposal {
                        proposal_id
                    }
                  status
                  remarks
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



    const handleClose = () => {
        setShowPopup(false)

    }

    const [perticularProposals, setPerticularProposals] = useState([])
    const [projectCycles, setProjectCycle] = useState(0)

    const dispatch = useDispatch();

    const showProposalsDataFun = (i) => {
        setShowProposalsList(false)
        // setPerticularProposals(i)
        getSingleproposalFunc(i._id)
        // dispatch(proposalsData(a, b))
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

    const getSingleproposalFunc = (i) => {
        try {

            var query =
                `query GetProposal($id: ID) {
                    getProposal(_id: $id) {
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
                        project_blockchain_id
                        project_status
                        funds_released_till_date
                        investment_date
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
                      }
                      currency
                      validator_status
                      fund_raised_till_now
                      previous_reporting_cycle
                      tokens_locked_in_escrow
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
                        "id": i,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('getProposal', data?.data?.getProposal);
                    if (data?.data?.getProposal != null && data?.data?.getProposal != undefined) {

                        setPerticularProposals(data?.data?.getProposal)
                        projectCyclesInfo(data?.data?.getProposal)
                    }
                });

        } catch (error) {
            console.log(error, "getSingleproposalFunc in proposal in investors error");
        }

    }



    const close = () => {

        setShowProposalsList(true)
    }
    // console.log(perticularProposals,perticularProposals.length,"perticularProposals");
    const getProposalDetailsFunc = () => {
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
                    variables: {
                        user: loginId
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

                        setProposalData(data?.data?.allProposals)
                    }
                });

        } catch (error) {
            console.log(error, "getProposalsDatafun in proposal in investors error");
        }
    }

    const updateValidatorProposal = (status, id) => {
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
                            "proposal_status": status
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

    const depositStableTokenFunc = (f_address, number_of_tokens, in_prop_id, proj_id, _id, p_id) => {
        console.log("request params are ", f_address, number_of_tokens, in_prop_id, proj_id, _id);
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('calling investorDepositStatus');
            investorDepositStatus(userData.provider, proj_id, walletAddress)
                .then(status => {
                    console.log('called investorDepositStatus ', status);
                    if (status == true) {
                        throw new Error('Tokens are already deposited');
                    } else {
                        console.log('calling approveByStableContract');
                        return approveByStableContract(userData.provider, walletAddress, number_of_tokens)
                    }
                })
                .then((resp) => {
                    console.log('called approveByStableContract', resp);
                    console.log('calling depositTokens');
                    return depositTokens(userData.provider, walletAddress, f_address, number_of_tokens, in_prop_id, proj_id);
                })
                .then(async (resp) => {
                    console.log('called depositTokens', resp);
                    await updateValidatorProposal("Deposited", _id)
                    let bal = await getProjectCurrentEscrowBalance(userData.provider, proj_id);
                    console.log('updating web2 escrow balance ', bal);
                    return updateProjectFund(bal, p_id)
                })
                .then((status) => {
                    console.log('updated web2 bal ', status);
                })
                .catch((err) => {
                    console.log('failed to deposit stable coins', err);
                    alert(err.message);
                })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const withdrawtenperFounderTokenFunc = async (pId) => {
        console.log("no withdraw 10% action for now");
        // const userData = JSON.parse(localStorage.getItem('userAccount'));
        // if (userData) {
        //     console.log('check available 10 percent balance')
        //     let balance = await tenPecentOfFounderToken(pId)
        //     console.log('available 10 percent bal: ', balance)
        //     if (balance && parseFloat(balance) >= 0) {
        //         console.log('calling Withdraw10PercentOfFounderToken');
        //         Withdraw10PercentOfFounderToken(walletAddress, pId)
        //             .then((resp) => {
        //                 console.log('called Withdraw10PercentOfFounderToken', resp);
        //             })
        //             .catch((err) => {
        //                 console.log('10 percent of founder tokens withdrawal failed', err);
        //             })
        //     } else {
        //         alert('Tokens are not deposited yet or already withdrawn');
        //     }
        // } else {
        //     alert("Please Connect to metamask wallet and then you can perform this action")
        // }
    }

    const withdrawAllFounderTokenFromPoolFunc = async (pId, funds_requested, price_per_token) => {
        console.log("no withdraw founder tokens action for now");
        // const userData = JSON.parse(localStorage.getItem('userAccount'));
        // if (userData) {
        //     let approvals = await whoApproved(pId);
        //     if (approvals && approvals.length) approvals = [...new Set(approvals)];
        //     if (approvals && approvals.length && approvals.length >= 3) {
        //         let balance = await totalDepositedFounderTokenInPot(pId);
        //         console.log('available founder tokens are ', balance);
        //         let withdraw_bal = parseFloat(funds_requested) / parseFloat(price_per_token);
        //         console.log('requested founder tokens ', withdraw_bal)
        //         if (balance && parseFloat(balance) >= 0 && parseFloat(balance) >= withdraw_bal) {
        //             console.log('calling withdrawAllFounderTokenFromThePoolV1');
        //             withdrawAllFounderTokenFromThePool(walletAddress, withdraw_bal, pId)
        //                 .then((resp) => {
        //                     console.log('called withdrawAllFounderTokenFromThePoolV1', resp);
        //                 })
        //                 .catch((err) => {
        //                     console.log('failed withdraw all founder tokens from pool action', err);
        //                 })
        //         } else {
        //             alert('Tokens are not deposited yet or already withdrawn');
        //         }
        //     } else {
        //         alert('Proposal is not validated to withdraw tokens');
        //     }
        // } else {
        //     alert("Please Connect to metamask wallet and then you can perform this action")
        // }
    }

    const withdrawStableTokenBackFunc = async (f_address, proj_id, p_id) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let project_status = await getProjectStatus(userData.provider, proj_id)
            if (project_status && project_status == 'Rejected') {
                let balance = await getInvestorCurrentBalance(userData.provider, proj_id, walletAddress)
                console.log('available stable tokens are ', balance);
                if (balance && parseFloat(balance) > 0) {
                    console.log('calling withdrawTokens');
                    withdrawTokens(userData.provider, f_address, walletAddress, proj_id)
                        .then(async (resp) => {
                            console.log('called withdrawTokens', resp);
                            let bal = await getProjectCurrentEscrowBalance(userData.provider, proj_id);
                            // project blockchain id, founder wallet addres
                            // let amt_inv = await getProjectEscrowBalance()
                            console.log('updating web2 escrow balance ', bal);
                            return updateProjectFund(bal, p_id)
                        })
                        .then((status) => {
                            console.log('updated web2 bal ', status);
                        })
                        .catch((err) => {
                            console.log('failed withdraw all stable coins back from pool action', err);
                        })
                } else {
                    alert('There are no tokens to withdraw or already withdrawn');
                }
            } else {
                alert('Project is not rejected to withdraw tokens');
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const updateProjectFund = (amnt, id) => { // update project status based subsequest rejections or web3 status
        console.log('updating project fund', amnt, id)
        var date = new Date()
        try {
            var query = `mutation Mutation($input: ProjectInput, $id: ID) {
                updateProject(input: $input, _id: $id) {
                  _id
                  amount_in_escrow
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
                          "amount_in_escrow": amnt.toString(),
                          "investment_date": date,

                        },
                        "id": id
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
                    getProposalDetailsFunc()
                    close()
                } else {
                    // alert('You have already Validated')
                }
            });
        } catch (error) {
            console.log(error, "UpdateProject project fund update error");
        }
    }

    useEffect(() => {
        getProposalDetailsFunc()
    }, [])

    const showPRoposalFunc = () => {
        setStatusPrpShow(true)
    }
    const showPRoposalCloseFunc = () => {
        setStatusPrpShow(false)
    }
    // const sendDatatoProjectPage = (i) => {
    //     console.log(i,"sendDatatoProjectPage");
    //     dispatch(fetchProjectDetails(i))
    //     dispatch(projectId(i))
    //     dispatch(fetchFundingProjectDetails(i))
    //     dispatch(fetchTeamSize(i))
    //     dispatch(fetchTokenomicsDetails(i))
    //     dispatch(fetchSocialTeam(i))
    //     history.push('/detail-projects')
    // }

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

    console.log(perticularProposals, "perticularProposals  in proposal in investors");
    console.log(proposalsData, "proposalsData  in proposal in investors");
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
                <div className="row">
                    <div className="col-md-12">
                        {showProposalsList == true ?
                            <div style={{ padding: '20px', background: 'white', border: '2px solid #E3E9EF', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
                                <div className="table-responsive" style={{ border: '2px solid #E3E9EF', borderRadius: '2px', background: 'white' }}>

                                    <Table
                                        pagination={{
                                            total: proposalsData.length,
                                            // showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }
                                        }
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        bordered
                                        dataSource={proposalsData}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />

                                </div>

                            </div>
                            :

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
                                                        <div className="col-md-6">
                                                            <div className="" >
                                                                <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <div >Proposal Id :</div>
                                                                    <div>{perticularProposals?.proposal_id}</div>
                                                                </div>
                                                                <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <div >Project Name :</div>
                                                                    <div>{perticularProposals?.project?.project_name}</div>
                                                                </div>
                                                                <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <div >Proposal Type :</div>
                                                                    <div>{perticularProposals?.type}</div>
                                                                </div>
                                                                {perticularProposals?.type == 'Initial' ?

                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Project Token :</div>
                                                                        <div>{perticularProposals?.project?.project_token_minted} USDC</div>
                                                                    </div>
                                                                    :
                                                                    ""
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Proposal Number :</div>
                                                                        <div>{perticularProposals?.current_proposal_cycle}/{projectCycles} </div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Funds Requested :</div>
                                                                        <div>{perticularProposals?.funds_requested}</div>
                                                                    </div>
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Funds Requested :</div>
                                                                        <div>{perticularProposals?.funds_requested}</div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Token Locked in Escrow Pool :</div>
                                                                        <div>{perticularProposals?.tokens_locked_in_escrow}</div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Funds Released till Date :</div>
                                                                        <div>{perticularProposals?.project?.funds_released_till_date}</div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Reported Expenditure for previous Cycle :</div>
                                                                        <div>{perticularProposals?.reported_expenditure_previous_cycle}</div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Reported Expenditure till date :</div>
                                                                        <div>{perticularProposals?.reported_expenditure_till_date}</div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?

                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Price Per Token(In USDC) :</div>
                                                                        <div>{perticularProposals?.project_token_minted} </div>
                                                                    </div>
                                                                    :
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Price Per Token(In USDC) :</div>
                                                                        <div>{perticularProposals?.project_token_minted} </div>
                                                                    </div>
                                                                }
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Number of Token :</div>
                                                                        <div>{perticularProposals?.number_of_tokens } </div>
                                                                    </div>
                                                                    :
                                                                    ""

                                                                }
                                                                
                                                                {perticularProposals?.type == 'Initial' ?
                                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div >Tokens Locked in Escrow :</div>
                                                                        <div>{perticularProposals?.price_per_token== true ? 
                                                                        "Yes" : "No"
                                                                    } </div>
                                                                    </div>
                                                                    :
                                                                    ""

                                                                }
                                                                <div className="paddingProposal">
                                                                    <div >Remarks by Founder:</div>
                                                                    <input style={{
                                                                        padding: '10px',
                                                                        width: '100%',
                                                                        border: '2px solid #E3E9EF',
                                                                        borderRadius: '10px',
                                                                        // height: '70px'
                                                                    }}
                                                                        placeholder="Remarks"
                                                                        onChange={(e) => setRemarks(e.target.value)}
                                                                    />
                                                                    {/* <div style={{
                                                                        padding: '10px',
                                                                        width: '100%',
                                                                        border: '2px solid #E3E9EF',
                                                                        borderRadius: '10px',
                                                                        // height: '70px'
                                                                    }}>Remarks</div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            {perticularProposals?.proposal_status == '' ?
                                                                ''
                                                                :
                                                                perticularProposals?.type == 'Initial' ?
                                                                    ""
                                                                    :
                                                                    <ul className="personal-info">

                                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                            <div >No of Validations:</div>
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

                                                                    </ul>

                                                            }
                                                            
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                            <Button className=' buttonInProposal1' style={{ borderRadius: '50px', fontSize: '12px' }} onClick={() => showPRoposalFunc(perticularProposals?._id)} >View Proposals</Button>
                                                                            <Button className=' buttonInProposal1 marginRight' style={{ borderRadius: '50px', fontSize: '12px' }} onClick={() => sendDatatoProjectPage(perticularProposals?.project?._id)}>View Project</Button>
                                                                        </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* tokens_locked_in_escrow */}

                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '20px' }}>
                                    <div className="submit-section">
                                        <button className="btn buttonInProposal submit-btn" onClick={() => close()}>CLOSE</button>
                                    </div>
                                    {/* {perticularProposals?.proposal_status == 'Approved' ?
                                        "" :
                                        (

                                            perticularProposals?.status == 'Rejected' ?
                                                <div className="submit-section">
                                                    {perticularProposals?.type == 'Initial' ?

                                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '30px' }}>REJECT</button>
                                                        :

                                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '30px' }}>REFUND</button>
                                                    }
                                                    <button className="btn buttonInProposal1 submit-btn">DEPOSIT</button>
                                                </div>
                                                :
                                                <div className="submit-section">
                                                    {perticularProposals?.type == 'Initial' ?

                                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '30px' }}>REJECT</button>
                                                        :

                                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '30px' }}>REFUND</button>
                                                    }
                                                    <button className="btn buttonInProposal1 submit-btn">DEPOSIT</button>
                                                </div>
                                        )
                                    } */}
                                    {perticularProposals?.type == 'Initial' ?
                                        <div className="submit-section">
                                            {perticularProposals?.proposal_status == 'Deposited' ?
                                                ""
                                                :
                                                <button className="btn buttonInProposal1 submit-btn" onClick={() => depositStableTokenFunc(perticularProposals?.project?.user?.wallet_address, perticularProposals?.funds_requested, perticularProposals?.proposal_blockchain_id, perticularProposals?.project?.project_blockchain_id, perticularProposals?._id, perticularProposals?.project?._id)}>DEPOSIT</button>
                                            }
                                        </div>
                                        :
                                        <div className="submit-section">
                                            {perticularProposals?.proposal_status == 'Approved' ?
                                                ""
                                                :
                                                <div>
                                                    {perticularProposals?.project?.project_status == 'Rejected' ?
                                                        <button className="btn buttonInProposal submit-btn" style={{ marginRight: '30px' }} onClick={() => withdrawStableTokenBackFunc(perticularProposals?.project?.user?.wallet_address, perticularProposals?.project?.project_blockchain_id, perticularProposals?.project?._id)}>REFUND</button>
                                                        : ""
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }

                                </div>

                            </div>

                        }
                    </div>
                </div>
            </div>
            <ProposalStatusPopup show={statusPrpShow} handleClose={showPRoposalCloseFunc} proposalPartType={perticularProposals} />

            <ProposalPopup show={showPopup} handleClose={handleClose} aLLValidatedProposal={aLLValidatedProposal} />

        </div>
    )
}


export default withRouter(ProposalRoute);
