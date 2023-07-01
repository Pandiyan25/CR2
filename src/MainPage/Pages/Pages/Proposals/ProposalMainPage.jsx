



import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import InitialProposal from './InitialProposal';
import SubSequentModal from './SubSequentModal';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import {
    checkTenPercentOfStableToken,
    getTheTenpercentWithdrawalStatus,
    Withdraw10PercentOfStableCoin,
    whoApproved,
    getSubsequentProposalStatus,
    getTheSubsequentProposalWithdrawalStatus,
    withdrawAllStableCoinFromThePool,
    getProjectCurrentEscrowBalance,
    getTotalReleasedFundsToFounderFromEscrow,
    getProjectStatus,
    getInvestorInvestedBalance,
    getInvestorCurrentBalance
} from '../../../../config/web3Client3';
import UpdateInitialProposal from './UpdateInitialProposal';
import UpdateTimeLine from './UpdateTimeLine';

const ProposalMainPage = () => {
    const [showPerticularProposal, setshowPerticularProposal] = useState(true)

    // const [latestProposalData, setLatestProposalData] = useState([])
    const [showBudget, setshowBudget] = useState(false)
    const [showExpense, setshowExpense] = useState(false)
    const [createInitialProp, setcreateInitialProp] = useState(false)
    const [createSubseqPropProp, setcreateSubseqPropProp] = useState(false)
    const [proposalPartType, setProposalPartType] = useState([])

    const [showUpdateProposal, setShowUpdateProposal] = useState(false)

    const [proposalInvestor, setProposalInvestor] = useState('')
    const [proposalInvestorId, setProposalInvestorId] = useState('')
    const [proposalCurrency, setProposalCurrency] = useState('')
    const [proposalReqAmt, setProposalReqAmt] = useState('')
    const [proposalRecAddress, setProposalRecAddress] = useState('')
    const [proposalPricePerToken, setProposalPricePerToken] = useState('')
    const [proposalTokenMinted, setProposalTokenMinted] = useState(false)
    const [proposalNumTokens, setProposalNumTokens] = useState('')
    const [proposalAttachment, setProposalAttachment] = useState('')
    const [proposalProjId, setProposalProjId] = useState('')
    const [proposalMainId, setProposalMainId] = useState('')
    const [notProposalPricePerToken, setNotProposalPricePerToken] = useState(true)
    const [showTimeLine, setShowTimeLine] = useState(false)


    const COLORS = ["orange", "gray"];

    const [checkPage, setCheckPage] = useState([])
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const projectId = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)
    const data = [
        { name: 'Supporters', students: 400, color: 'green' },
        { name: 'Opposer', students: 400, color: 'red' },
        // {name: 'Opposers', students: 700},
        // {name: 'Geek-i-knack', students: 200},
        // {name: 'Geek-o-mania', students: 1000}
    ];

    const [tableData, settableData] = useState([
        {
            proposalNo: '0002',
            proposalType: 'Initial',
            FundsRequested: '10000 USD',
            fundsStatus: '-',
            tokenReleased: '500',
            noofValidators: '-',
            validatorsStatus: '-'


        },
        {
            proposalNo: '0002',
            proposalType: 'Subsequent',
            FundsRequested: '10000 USD',
            fundsStatus: '-',
            tokenReleased: '300',
            noofValidators: '4',
            validatorsStatus: 'Approved'

        },

    ])

    const perproposalFunc = (i) => {
        // console.log(i,"");
        console.log("setProposalPartType", i);
        setProposalPartType([i])
        setshowPerticularProposal(false)
    }

    console.log("proposalPartType", proposalPartType);
    const columns = [

        {
            title: 'Proposal No',
            // dataIndex: 'proposal_id',
            align: 'center',

            render: (text, record) => (
                <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => perproposalFunc(text)}>{text.proposal_id}</span>
            ),
            // sorter: (a, b) => a.salary.length - b.salary.length,
            // key: 'proposal_id',

        },

        {
            title: 'Proposal Type',
            dataIndex: 'type',
            align: 'center',
        },

        {
            title: 'Funds Requested',
            // dataIndex: 'funds_requested',

            render: (text, record) => (
                <div>
                    {Number(text?.funds_requested).toLocaleString("en-US")}
                </div>
            ),
            align: 'center',
        }, {
            title: 'Funds Receipt Status',
            dataIndex: 'proposal_status',
            align: 'center',
        },
        , {
            title: ' Tokens Released',
            // dataIndex: 'token_release',
            render: (text, record) => (
                <div>
                    {Number(text?.token_release).toLocaleString("en-US")}
                </div>
            ),
            align: 'center',
        }, {
            title: 'Number of Validations',
            // dataIndex: 'no_of_validators',
            render: (text, record) => (
                <div>
                    {Number(text?.no_of_validators).toLocaleString("en-US")}
                </div>
            ),
            align: 'center',
        }, {
            title: 'Validation Status',
            dataIndex: 'proposal_status',
            // dataIndex: 'validatorsStatus',
            align: 'center',
        }
        , {
            title: 'Options',
            // dataIndex: 'validatorsStatus',
            align: 'center',
            render: (text, record) => (

                text?.type == 'Initial' ?
                    <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => updateProposal(text)}><i className="fa fa-pencil" /></span>
                    :
                    ''

            ),
        }

    ]

    const createinitialfunc = () => {
        setcreateInitialProp(true)
    }
    const createSubseqPropfunc = () => {
        // getLatestProposalDetailsFunc()
        // getLatestProposalDetailsFunc()
        setcreateSubseqPropProp(true)
    }
    const handleClose = () => {
        setcreateInitialProp(false)
    }

    const handleCloseSubSequent = () => {
        setcreateSubseqPropProp(false)
    }




    const getLatestProposalDetailsFunc = () => {

        try {


            var query = `
            query GetLatestProposal($project: ID) {
                getLatestProposal(project: $project) {
                  _id
                  proposal_id
                  name
                  type
                  funds_requested
                  price_per_token
                  number_of_tokens
                  project_token_minted
                  logo
                  project {
                    _id
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
                  }
                  currency
                  validator_status
                  fund_raised_till_now
                  proposal_blockchain_id
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
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.getLatestProposal);
                    // setLatestProposalData([data?.data?.getLatestProposal])
                    setcreateSubseqPropProp(true)
                    // if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
                    //     setCheckPage(data?.data?.allProposals)
                    // } else {
                    //     setCheckPage([])
                    // }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


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
                    _id
                    project_blockchain_id
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
                        setCheckPage(data?.data?.allProposals)
                    } else {
                        setCheckPage([])
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const goBacktoPrev = () => {

        setshowPerticularProposal(true)
    }

    const withdrawtenperFunc = async (proj_id, investor, p_id, pp_id) => {
        console.log("request params are ", proj_id, investor);
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('check available 10 percent balance')
            let balance = await checkTenPercentOfStableToken(userData.provider, proj_id, investor)
            let withdraw_status = await getTheTenpercentWithdrawalStatus(userData.provider, proj_id, investor)
            console.log('available 10 percent bal: ', balance)
            if (balance && parseFloat(balance) >= 0 && withdraw_status == false) {
                console.log('calling Withdraw10PercentOfStableCoin');
                Withdraw10PercentOfStableCoin(userData.provider, walletAddress, investor, proj_id)
                    .then(async (resp) => {
                        console.log('called Withdraw10PercentOfStableCoin', resp);
                        let bal = await getProjectCurrentEscrowBalance(userData.provider, proj_id);
                        let f_bal = await getTotalReleasedFundsToFounderFromEscrow(userData.provider, proj_id, walletAddress);
                        console.log('updating web2 balance ', bal, f_bal);
                        return updateProjectFund(bal, f_bal, p_id);
                    })
                    .then(async (status) => {
                        console.log('updated web2 project balance', status);
                        let released_fund = await getTheProposalReleaseFund(proj_id, investor);
                        return updateProposalFund(pp_id, released_fund);
                    })
                    .then(status => {
                        console.log('updated web2 proposal balance', status);
                    })
                    .catch((err) => {
                        console.log('10 percent of stable tokens withdrawal failed', err);
                    })
            } else {
                if (withdraw_status) alert('Tokens are already withdrawn');
                else alert('Tokens are not deposited yet');
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const withdrawTokenFromPoolFunc = async (proj_id, sub_prop_id, p_id, investor, pp_id) => {
        console.log("request params are ", proj_id, sub_prop_id);
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            let approvals = await whoApproved(userData.provider, proj_id, sub_prop_id);
            let sub_status = await getSubsequentProposalStatus(userData.provider, proj_id, sub_prop_id);
            console.log(approvals)
            if ((approvals && approvals.length && [...new Set(approvals)].length >= 3) || sub_status == 'Approved') {
                let withdraw_status = await getTheSubsequentProposalWithdrawalStatus(userData.provider, proj_id, sub_prop_id);
                if (withdraw_status == false) {
                    console.log('calling withdrawAllStableCoinFromThePool', userData.provider, walletAddress, sub_prop_id, proj_id);
                    withdrawAllStableCoinFromThePool(userData.provider, walletAddress, sub_prop_id, proj_id)
                        .then(async (resp) => {
                            console.log('called withdrawAllStableCoinFromThePool', resp);
                            let bal = await getProjectCurrentEscrowBalance(userData.provider, proj_id);
                            let f_bal = await getTotalReleasedFundsToFounderFromEscrow(userData.provider, proj_id, walletAddress);
                            console.log('updating web2 balance ', bal, f_bal);
                            let proj_status = await getProjectStatus(userData?.provider, proj_id)
                            if (proj_status != 'Completed' && proj_status != 'Rejected') proj_status = 'Ongoing';
                            return updateProjectFund(bal, f_bal, p_id, proj_status);
                        })
                        .then(async (status) => {
                            console.log('updated web2 project balance', status);
                            let released_fund = await getTheProposalReleaseFund(proj_id, investor);
                            return updateProposalFund(pp_id, released_fund);
                        })
                        .then(status => {
                            console.log('updated web2 proposal balance', status);
                        })
                        .catch((err) => {
                            console.log('failed withdraw all stable coins from pool action', err);
                        })
                } else {
                    alert('Tokens are already withdrawn');
                }
            } else {
                alert('Proposal is not validated to withdraw tokens');
            }
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const updateProjectFund = (es_amnt, f_amnt, id, proj_status = 'Ongoing') => { // update project status and fund
        console.log('updating project fund', es_amnt, f_amnt, id)
        try {
            var query = `mutation Mutation($input: ProjectInput, $id: ID) {
                updateProject(input: $input, _id: $id) {
                  _id
                  amount_in_escrow
                  funds_released_till_date
                  project_status
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
                            "amount_in_escrow": es_amnt.toString(),
                            "funds_released_till_date": parseFloat(f_amnt),
                            "amount_released": f_amnt.toString(),
                            "project_status": proj_status
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

                    } else {
                        // alert('You have already Validated')
                    }
                });
        } catch (error) {
            console.log(error, "UpdateProject project fund update error");
        }
    }

    const getTheProposalReleaseFund = async (proj_id, i_address) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let [invested_bal, current_bal] = await Promise.all([
            getInvestorInvestedBalance(userData?.provider, proj_id, i_address),
            getInvestorCurrentBalance(userData?.provider, proj_id, i_address)
        ])
        console.log('invested_bal, current_bal', invested_bal, current_bal);
        let released_fund = invested_bal - current_bal;
        return released_fund;
    }

    const updateProposalFund = (_id, released_fund) => {
        console.log('updating proposal fund', _id, released_fund);
        try {
            var query = `mutation UpdateProposal($input: ProposalInput, $id: ID) {
                updateProposal(input: $input, _id: $id) {
                    fund_raised_till_now
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
                            "fund_raised_till_now": released_fund.toString()
                        },
                        "id": _id
                    }
                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('updateProposalFunctiondata', data?.data?.updateProposal);
                });
        } catch (error) {
            console.log(error, "updateProposal proposal fund update error");
        }
    }

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }
    console.log(proposalPartType, "proposalData");

    useEffect(() => {
        if (loginId != '') {
            getUserDetailsFunc()
        }

    }, [loginId])

    const showTimeLineData = () => {
        setShowTimeLine(true)
    }

    const updateProposal = (i) => {
        console.log(i, "updateProposal");
        // if (i.length > 0) {
        setShowUpdateProposal(true)
        setProposalInvestor(i?.investor?.first_name)
        setProposalInvestorId(i?.investor?._id)
        setProposalCurrency(i?.currency)
        setProposalReqAmt(i?.funds_requested)
        setProposalRecAddress(i?.project?.user?.wallet_address)
        setProposalPricePerToken(i?.project_token_minted)
        // setProposalTokenMinted(i?.price_per_token)
        setProposalNumTokens(i?.number_of_tokens)
        setProposalAttachment(i?.timeline_update)
        setProposalProjId(i?.project?._id)
        setProposalMainId(i?._id)

        if (i?.price_per_token == true) {
            setProposalTokenMinted(true)
            setNotProposalPricePerToken(false)
        }
        // }

    }

    const closeUpdateProposal = () => {

        setShowUpdateProposal(false)
    }
    return (
        <>
            {showPerticularProposal == true ?

                <div className="page-wrapper" style={{paddingTop:'60px'}}>

                    <div className="content container-fluid">
                        <div >
                            <div className="page-header">
                                <div className="header-left">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h3 className="page-title">Proposals</h3>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                <div className="row" style={{ marginBottom: '0px' }}>

                                    <div className="col-sm-12" style={{padding:'0px'}}>




                                        <div className="content container-fluid">
                                            <div >
                                                <div>

                                                    <div className="page-header">
                                                        <div className="row align-items-center" style={{ width: '100%' ,margin:'0px'}}>
                                                            <div className="col" style={{padding:'0px'}}>
                                                                <h3 className="page-title" style={{ fontSize: '25px',margin:'0px' }}>Proposal</h3>
                                                            </div>
                                                            <div className="col-auto float-right ml-auto" style={{padding:'0px'}}>
                                                                <button className="btn add-btn2" style={{ margin: '0px',borderRadius:'2px',fontSize:"14px",fontWeight:"600" }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                                                <button className="btn add-btn2" style={{ marginRight: '10px',borderRadius:'2px',fontSize:"14px",fontWeight:"600" }} onClick={() => createinitialfunc()}> Create Initial Proposal</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 d-flex">

                                                            <div className="card card-table flex-fill" style={{border:'none'}}>

                                                                <div className="card-body">
                                                                    <div className="table-responsive">
                                                                        <Table
                                                                            pagination={{
                                                                                total: checkPage.length,
                                                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                                            }
                                                                            }
                                                                            style={{ overflowX: 'auto' }}
                                                                            columns={columns}
                                                                            bordered
                                                                            dataSource={checkPage}
                                                                            rowKey={record => record.id}
                                                                        // onChange={this.handleTableChange}
                                                                        />

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                                <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                showPerticularProposal == false && proposalPartType.length > 0 && proposalPartType[0].type == 'Initial' ?

                    <>

                        <div className="page-wrapper" style={{paddingTop:'60px'}}>

                            <div className="content container-fluid">
                                <div >
                                    <div className="page-header">
                                        <div className="header-left">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <h3 className="page-title">Proposals</h3>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                        <div className="row" style={{ marginBottom: '0px' }}>

                                            <div className="col-sm-12">




                                                <div className="content container-fluid">
                                                    <div >
                                                        <div>

                                                            <div className="page-header">
                                                                <div className="row align-items-center" style={{ width: '100%' }}>
                                                                    <div className="col">
                                                                        <h3 className="page-title" style={{ fontSize: '25px' }}>Initial Proposal</h3>
                                                                    </div>
                                                                    <div className="col-auto float-right ml-auto">
                                                                        {/* <button className="edit-icon" onClick={() => updateProposal(proposalPartType)}><i className="fa fa-pencil" /></button> */}
                                                                        {/* <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                                                        <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createinitialfunc()}> Create Initial Proposal</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">

                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                <label style={{ width: '25%' }}>Investor  :</label>
                                                                                <div style={{ width: '50%' }}>
                                                                                    <label >{proposalPartType.length > 0 && proposalPartType[0].investor?.first_name}</label>

                                                                                    {/* <select className="form-control btn-block-height square-edges"  >
                                                    <option style={{ fontSize: '13px' }}>Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}> Currency  :</label>
                                                                                <div style={{ width: '50%' }}>
                                                                                    <label > {proposalPartType.length > 0 && proposalPartType[0].currency}</label>

                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Token Type :</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}> Requested Amount  :</label>

                                                                                <label style={{ width: '50%' }}> {proposalPartType.length > 0 && 
                                                                                
                                                                                Number(proposalPartType[0]?.funds_requested).toLocaleString("en-US")
                                                                                }</label>
                                                                                {/* <input type="text" className="form-control"   style={{width:'50%'}}   /> */}


                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}> Receiving Address  :</label>

                                                                                <label style={{ width: '50%' }}> {proposalPartType.length > 0 && proposalPartType[0].project?.user?.wallet_address}</label>
                                                                                {/* <input type="text" className="form-control"   style={{width:'50%'}}  /> */}
                                                                            </div>
                                                                        </div>


                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}>Price per Token : </label>


                                                                                <label style={{ width: '50%' }}> {proposalPartType.length > 0 && 
                                                                                
                                                                                Number(proposalPartType[0]?.project_token_minted).toLocaleString("en-US")
                                                                                }</label>
                                                                                {/* <input type="text" className="form-control"   style={{width:'50%'}}  /> */}

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}> Project Tokens Minted : </label>
                                                                                <label style={{ width: '50%' }}> {proposalPartType.length > 0 && proposalPartType[0].price_per_token == true ? "Yes" : 'No'}</label>
                                                                                {/* <div style={{display:'flex',flexDirection:'row',width:'50%',justifyContent:'space-evenly',alignItems:'center'}}> */}

                                                                                {/* <input type="radio" className="form-control" checked={true}  style={{width:'20px '}}/><h5 style={{marginBottom:'0px'}}>Yes</h5> 
                                            <input type="radio" className="form-control"      style={{width:'20px '}} /><h5 style={{marginBottom:'0px'}}>No</h5>  */}
                                                                                {/* </div> */}
                                                                                {/* checked={nochecked} */}
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                <label style={{ width: '25%' }}> No of Token  :</label>

                                                                                <label style={{ width: '50%' }}> {proposalPartType.length > 0 &&
                                                                                
                                                                                Number(proposalPartType[0]?.number_of_tokens).toLocaleString("en-US")
                                                                                
                                                                                }</label>
                                                                                {/* <input type="number" className="form-control" placeholder='(Auto Populate) Requested Amount of Token'   style={{width:'50%'}} onChange={(e)=>setNoOfTokens(e.target.value)} /> */}
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Validator Score  :</label>
                                            <input type="text" className="form-control"    style={{width:'50%'}} />
                                            

                                            
                                        </div>
                                    </div>

                                    <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Investor Score : </label>
                                            <input type="text" className="form-control"   style={{width:'50%'}} />
                                            
                                            
                                        </div>
                                    </div> */}
                                                                        {proposalPartType.length > 0 && proposalPartType[0].price_per_token == false && proposalPartType[0].timeline_update != null ?

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                                    <label style={{ width: '25%' }}>Saft  :</label>

                                                                                    {/* <input type="text" className="form-control"   style={{width:'50%'}} /> */}
                                                                                    {/* <input type="file" className="form-control" /> */}
                                                                                    <div style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(proposalPartType[0].timeline_update) }} >{"SAFT"}</div>


                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            ""
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <button style={{ height: '35px', width: '85px', borderRadius: '50px', border: '2px solid #6345ED', marginLeft: '10px',borderRadius:'2px' }} onClick={() => goBacktoPrev()}>Back</button>
                                                                    {
                                                                        proposalPartType.length > 0 && proposalPartType[0].proposal_status == 'Deposited' ?
                                                                            <button style={{ height: '35px', width: '190px', borderRadius: '50px', border: '2px solid #6345ED', marginLeft: '10px',borderRadius:'2px' }} onClick={() => withdrawtenperFunc(proposalPartType.length > 0 && proposalPartType[0].project ? proposalPartType[0].project.project_blockchain_id : null, proposalPartType.length > 0 && proposalPartType[0].investor ? proposalPartType[0].investor.wallet_address : null, proposalPartType[0].project?._id, proposalPartType[0]._id)}>WithDraw 10% Tokens</button>
                                                                            : ""
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                                <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                                                </div>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </>

                    :
                    <>
                        <div className="page-wrapper" style={{paddingTop:'60px'}}>

                            <div className="content container-fluid">
                                <div >
                                    <div className="page-header">
                                        <div className="header-left">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <h3 className="page-title">Proposals</h3>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                                        <div className="row" style={{ marginBottom: '0px' }}>

                                            <div className="col-sm-12">




                                                <div className="content container-fluid">
                                                    <div >
                                                        <div>

                                                            <div className="page-header">
                                                                <div className="row align-items-center" style={{ width: '100%' }}>
                                                                    <div className="col">
                                                                        <h3 className="page-title" style={{ fontSize: '25px' }}>Proposal</h3>
                                                                    </div>
                                                                    <div className="col-auto float-right ml-auto">
                                                                        {/* <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                                                        <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createinitialfunc()}> Create Initial Proposal</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <form>

                                                                <div className="row">
                                                                    <div className="col-md-12">

                                                                        <div className="row">

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '25%', color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' }} onClick={() => showTimeLineData()}>Timeline Update</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        {/* <label >{proposalPartType.length > 0 && proposalPartType[0].timeline_update}</label> */}

                                                                                        {/* <select className="form-control btn-block-height square-edges"  >
                                                    <option style={{ fontSize: '13px' }}>Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Previous Reporting Cycle  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && proposalPartType[0].reported_expenditure_previous_cycle}</label>

                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Reported Expenditure :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && 
                                                                                        
                                                                                Number(proposalPartType[0]?.reported_expenditure).toLocaleString("en-US")
                                                                                        // proposalPartType[0].reported_expenditure
                                                                                        }</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Reported Budget  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && 
                                                                                         Number(proposalPartType[0]?.reported_budget).toLocaleString("en-US")
                                                                                        // proposalPartType[0].reported_budget
                                                                                        
                                                                                        }</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Variance  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && proposalPartType[0].variants}</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Current Proposal Cycle  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && proposalPartType[0].current_proposal_cycle}</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Budget for Current Proposal Cycle  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && 
                                                                                        // proposalPartType[0].budget_for_currenct_proposal_cycle
                                                                                        
                                                                                        Number(proposalPartType[0]?.budget_for_currenct_proposal_cycle).toLocaleString("en-US")
                                                                                        }</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Fund Request for Current Cycle  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && 
                                                                                        
                                                                                        // proposalPartType[0].funds_requested
                                                                                        
                                                                                        Number(proposalPartType[0]?.funds_requested).toLocaleString("en-US")
                                                                                        }</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* <div className="col-md-12">
                                                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                            <label style={{ width: '30%', }} >Timeline Update  :</label>
                                                                            <div style={{ width: '50%' }}>
                                                                                    <label >{proposalPartType.length > 0 && proposalPartType[0].timeline_update}</label>
                                                                                    
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>                                                         <div className="col-md-12"> */}

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Receiving Address :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && proposalPartType[0].receiving_address}</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                                    <label style={{ width: '30%', }} >Additional Information  :</label>
                                                                                    <div style={{ width: '50%' }}>
                                                                                        <label >{proposalPartType.length > 0 && proposalPartType[0].additional_information}</label>


                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                            <label style={{ width: '30%', }} >Additional Attachments :</label>
                                                                            <div style={{ width: '50%' }}>
                                                                                <label >{proposalPartType.length > 0 && proposalPartType[0].additional_attachment}</label>
                                                                                {proposalPartType.length > 0 && proposalPartType[0].additional_attachment != '' && proposalPartType[0].additional_attachment != null && proposalPartType[0].additional_attachment != undefined ?

                                                                                    <div style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#6345ED', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { opennewWindow(proposalPartType[0].additional_attachment) }} >{"Additional Attachments"}</div>

                                                                                    :
                                                                                    ''
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                            <label style={{ width: '30%', }} >Token Release :</label>
                                                                            <div style={{ width: '50%' }}>
                                                                                <label >{proposalPartType.length > 0 && 
                                                                                // proposalPartType[0].token_release
                                                                                
                                                                                
                                                                                Number(proposalPartType[0]?.token_release).toLocaleString("en-US")
                                                                                }</label>


                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="col-md-12">
                                                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                                            <label style={{ width: '30%', }} >Investor :</label>
                                                                            <div style={{ width: '50%' }}>
                                                                                <label >{proposalPartType.length > 0 && proposalPartType[0]?.investor?.email}</label>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div className="col-md-12">
                                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                                    <button style={{ height: '35px', width: '85px', borderRadius: '50px', border: '2px solid #6345ED', marginLeft: '10px' ,borderRadius:'2px'}} onClick={() => goBacktoPrev()}>Back</button>
                                                                    {proposalPartType.length > 0 && proposalPartType[0].proposal_status == 'Approved' ?
                                                                        <button style={{ height: '35px', width: '220px', borderRadius: '50px', border: '2px solid #6345ED', marginLeft: '10px' ,borderRadius:'2px'}} onClick={() => withdrawTokenFromPoolFunc(proposalPartType.length > 0 && proposalPartType[0].project ? proposalPartType[0].project.project_blockchain_id : null, proposalPartType.length > 0 && proposalPartType[0].proposal_blockchain_id ? proposalPartType[0].proposal_blockchain_id : null, proposalPartType[0].project?._id, proposalPartType[0]?.investor?.wallet_address, proposalPartType[0]._id)}>WithDraw Tokens From Pool</button>
                                                                        : ""
                                                                    }


                                                                    {/* <input type="text" className="form-control" style={{ width: '50%' }}   */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                        <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                                                </div>

                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </>

            }

            <InitialProposal getUserDetailsFunc={getUserDetailsFunc} show={createInitialProp} handleClose={handleClose} />
            <SubSequentModal getUserDetailsFunc={getUserDetailsFunc} show={createSubseqPropProp} setcreateSubseqPropProp={setcreateSubseqPropProp} handleClose={handleCloseSubSequent} />
            {/* latestProposalData={latestProposalData} */}
            <UpdateInitialProposal
                proposalMainId={proposalMainId}
                setShowUpdateProposal={setShowUpdateProposal}
                proposalProjId={proposalProjId}
                proposalInvestor={proposalInvestor}
                setProposalInvestor={setProposalInvestor}
                proposalInvestorId={proposalInvestorId}
                setProposalInvestorId={setProposalInvestorId}
                proposalCurrency={proposalCurrency}
                setProposalCurrency={setProposalCurrency}
                proposalReqAmt={proposalReqAmt}
                setProposalReqAmt={setProposalReqAmt}
                proposalRecAddress={proposalRecAddress}
                setProposalRecAddress={setProposalRecAddress}
                proposalPricePerToken={proposalPricePerToken}
                setProposalPricePerToken={setProposalPricePerToken}
                checked={proposalTokenMinted}
                setProposalTokenMinted={setProposalTokenMinted}
                proposalNumTokens={proposalNumTokens}
                setProposalNumTokens={setProposalNumTokens}
                proposalAttachment={proposalAttachment}
                setProposalAttachment={setProposalAttachment}
                data={proposalPartType}
                show={showUpdateProposal}
                nochecked={notProposalPricePerToken}
                setNotProposalPricePerToken={setNotProposalPricePerToken}
                getUserDetailsFunc={getUserDetailsFunc}
                handleClose={closeUpdateProposal}
                setProposalProjId={setProposalProjId}
                setProposalMainId={setProposalMainId}
            />
            {/* <UpdateTimeLine show={showTimeLine} /> */}
        </>
    );

}
export default ProposalMainPage;
