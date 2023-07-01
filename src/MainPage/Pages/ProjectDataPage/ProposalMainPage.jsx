

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import 'react-summernote/dist/react-summernote.css'; // import styles
import { proposalsData } from '../../../reducers/ConstantSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_05, Avatar_09, Avatar_10, Avatar_16, designLogo2 } from '../../../Entryfile/imagepath';
// import "../index.css";
import { Table } from 'antd';
import 'antd/dist/antd.css';
// import "../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { apiURI } from '../../../config/config';
import {
    approveByStableContract,
    depositTokens,
    tenPecentOfFounderToken,
    Withdraw10PercentOfFounderToken,
    whoApproved,
    totalDepositedFounderTokenInPot,
    withdrawAllFounderTokenFromThePool,
    whoRejected,
    totalDepositedStableCoinsInThePot,
    withdrawTokens
} from '../../../config/web3Client2';

const ProposalMainPage = () => {

    const loginId = useSelector((state) => state.constVar.loginId)
    const [proposalsData, setProposalData] = useState([])
    const [showProposalsList, setShowProposalsList] = useState(true)
    const [showPopup, setShowPopup] = useState(false)

    const projectId = useSelector((state) => state.constVar.projectId)
    const [aLLValidatedProposal, setALLValidatedProposal] = useState([])
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const [remarks, setRemarks] = useState('')

    const columns = [



        {
            title: 'Proposal Id',
            //   dataIndex: 'proposal_id',
            align: 'center',

            render: (text, record) => (
                // className="mainLinkText" style={{ cursor: 'pointer' }} onClick={() => showProposalsDataFun(text)}
                <div >{text?.proposal_id}</div>

            ),
            sorter: (a, b) => a.proposal_id.length - b.proposal_id.length,
        },

        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (text, record) => (
                <img src={designLogo2} alt="" width="20px" />
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
            sorter: (a, b) => a?.project?.project_name?.length - b?.project?.project_name?.length,
        }, {
            title: 'Proposal Type',
            dataIndex: 'type',
            align: 'center',
            sorter: (a, b) => a?.type?.length - b?.type?.length,
        },
        {
            title: 'Validation Status',
            render: (text, record) => (


                text?.validator_status == 'Approved' ?
                    <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Approved
                    </div>
                    : (text?.validator_status == 'Rejected' ?
                        <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%', fontSize: '14px' }}>Rejected
                        </div>
                        : <div>
                            {text?.validator_status}
                        </div>
                    )


            ),
            align: 'center',
        },
        {
            // Funds Released till Date
            title: 'Funds Released Date',
            align: 'center',
            render: (text, record) => (


                
                <div>{text?.project?.fund_raised_till_now}</div>
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
            // dataIndex: 'no_of_validators',
             render: (text, record) => (


                
                <div>{Number(text?.no_of_validators).toLocaleString("en-US")}</div>
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
            align: 'center',
            sorter: (a, b) => a?.no_of_validators?.length - b?.no_of_validators?.length,
            //   sorter: (a, b) => a?.age?.length - b?.age?.length,
        },
        {
            title: 'Funds Requested',
            // dataIndex: 'funds_requested',
            render: (text, record) => (


                
                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
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
            align: 'center',
            sorter: (a, b) => a?.funds_requested?.length - b?.funds_requested?.length,
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

    const dispatch = useDispatch();

    const showProposalsDataFun = (i) => {
        setShowProposalsList(false)
        // setPerticularProposals(i)
        getSingleproposalFunc(i._id)
        // dispatch(proposalsData(a, b))
    }

    const getSingleproposalFunc = (i) => {
        try {

            var query =
                `
                query GetProposal($id: ID) {
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

    const getUserDetailsFunc = () => {

        try {


            var query = `
            query GetValidatorToken($project: ID, $user: ID) {
                allProposals(project: $project, user: $user) {
                  
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
                  project {
                    user {
                      wallet_address
                    }
                    project_name
                  }
                  currency
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
                        "project": projectId,
                        "user": loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allProposals);
                    if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
                        setProposalData(data?.data?.allProposals)
                    } else {
                        setProposalData([])
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
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

    const depositStableTokenFunc = (number_of_tokens, pId, _id) => {
        console.log(number_of_tokens, pId)
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('calling approveByStableContract');
            approveByStableContract(walletAddress, number_of_tokens)
                .then((resp) => {
                    console.log('called approveByStableContract', resp);
                    console.log('calling depositTokens');
                    return depositTokens(walletAddress, number_of_tokens, pId);
                })
                .then(async (resp) => {
                    console.log('called depositTokens', resp);
                    await updateValidatorProposal("Deposited", _id)
                })
                .catch((err) => {
                    console.log('failed to deposit stable coins', err);
                })
        } else {
            alert("Please Connect to metamask wallet and then you can perform this action")
        }
    }

    const withdrawtenperFounderTokenFunc = async (pId) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('check available 10 percent balance')
            let balance = await tenPecentOfFounderToken(pId)
            console.log('available 10 percent bal: ', balance)
            if (balance && parseFloat(balance) >= 0) {
                console.log('calling Withdraw10PercentOfFounderToken');
                Withdraw10PercentOfFounderToken(walletAddress, pId)
                    .then((resp) => {
                        console.log('called Withdraw10PercentOfFounderToken', resp);
                    })
                    .catch((err) => {
                        console.log('10 percent of founder tokens withdrawal failed', err);
                    })
            } else {
                alert('Tokens are not deposited yet or already withdrawn');
            }
        } else {
            alert("Please Connect to metamask wallet and then you can perform this action")
        }
    }

    const withdrawAllFounderTokenFromPoolFunc = async (pId, funds_requested, price_per_token) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let approvals = await whoApproved(pId);
            if (approvals && approvals.length) approvals = [...new Set(approvals)];
            if (approvals && approvals.length && approvals.length >= 3) {
                let balance = await totalDepositedFounderTokenInPot(pId);
                console.log('available founder tokens are ', balance);
                let withdraw_bal = parseFloat(funds_requested) / parseFloat(price_per_token);
                console.log('requested founder tokens ', withdraw_bal)
                if (balance && parseFloat(balance) >= 0 && parseFloat(balance) >= withdraw_bal) {
                    console.log('calling withdrawAllFounderTokenFromThePoolV1');
                    withdrawAllFounderTokenFromThePool(walletAddress, withdraw_bal, pId)
                        .then((resp) => {
                            console.log('called withdrawAllFounderTokenFromThePoolV1', resp);
                        })
                        .catch((err) => {
                            console.log('failed withdraw all founder tokens from pool action', err);
                        })
                } else {
                    alert('Tokens are not deposited yet or already withdrawn');
                }
            } else {
                alert('Proposal is not validated to withdraw tokens');
            }
        } else {
            alert("Please Connect to metamask wallet and then you can perform this action")
        }
    }

    const withdrawStableTokenBackFunc = async (pId) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let rejections = await whoRejected(pId);
            if (rejections && rejections.length) rejections = [...new Set(rejections)];
            if (rejections && rejections.length && rejections.length >= 3) {
                let balance = await totalDepositedStableCoinsInThePot(pId);
                console.log('available stable tokens are ', balance);
                if (balance && parseFloat(balance) >= 0) {
                    console.log('calling withdrawTokensV1');
                    withdrawTokens(walletAddress, balance, pId)
                        .then((resp) => {
                            console.log('called withdrawTokensV1', resp);
                        })
                        .catch((err) => {
                            console.log('failed withdraw all stable coins back from pool action', err);
                        })
                } else {
                    alert('There are no tokens to withdraw');
                }
            } else {
                alert('Proposal is not rejected to withdraw tokens');
            }
        } else {
            alert("Please Connect to metamask wallet and then you can perform this action")
        }
    }

    useEffect(() => {
        getUserDetailsFunc()
    }, [])

    console.log(perticularProposals, "perticularProposals  in proposal in investors");
    console.log(proposalsData, "proposalsData  in proposal in investors");
    return (


        <div className="card card-table flex-fill" style={{ border: '0px',margin: '0px', }}>

            <div className="card-body">
                <div className="content container-fluid" style={{padding:'0px'}}>
                        <div >
                            <div className="table-responsive" style={{ background: 'white' }}>

                                <Table
                                    pagination={{
                                        total: proposalsData.length,
                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                    }
                                    }
                                    style={{ overflowX: 'auto' }}
                                    columns={columns}
                                    bordered
                                    dataSource={proposalsData}
                                    rowKey={record => record.id}
                                />

                            </div>

                        </div>
                       
                    
                </div>
            </div>
           
        </div>


    )
}


export default withRouter(ProposalMainPage);
