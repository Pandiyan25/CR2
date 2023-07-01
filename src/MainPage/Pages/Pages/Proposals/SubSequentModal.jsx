
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import TimeLinePageRoute from './TimeLinePageRoute';
import {
    setSubsequentProposalId,
    getSubsequentProposalFund,
    getProjectCycles,
    getProjectCurrentCycle
} from '../../../../config/web3Client3';


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

function SubSequentModal({ show, handleClose, getUserDetailsFunc, setcreateSubseqPropProp }) {
    const [timeLinePage, showTimeLinePage] = useState(false)
    const [timelineUpdate, setTimelineUpdate] = useState('')
    const [fundReqForCurrentCycle, setFundReqForCurrentCycle] = useState('')
    const [budgetforCurrentProposalCycle, setBudgetforCurrentProposalCycle] = useState('')
    const [previosRepCycle, setPreviosRepCycle] = useState('')
    const [reportedExp, setReportedExp] = useState('')
    const [reportedBudg, setReportedBudg] = useState('')
    const [getIvestData, setgetIvestData] = useState([])
    const [variance, setVariance] = useState('')
    const [currentProposalCycle, setCurrentProposalCycle] = useState('')
    const [additionalInformation, setAdditionalInformation] = useState('')
    const [additionalAttachments, setAdditionalAttachments] = useState('')
    const [tokenRelease, setTokenRelease] = useState('')
    const [investorData, setInvestorData] = useState('')
    const [latestProposalData, setLatestProposalData] = useState([])
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const loginId = useSelector((state) => state.constVar.loginId)
    const [proposalMainData, setProposalMainData] = useState([])
    const [addFiles, setAddFiles] = useState([])
    const [selectPrevProposal, setSelectPrevProposal] = useState('')
    const [checkData, setcheckData] = useState([])
    const projectId = useSelector((state) => state.constVar.projectId)
    console.log(walletAddress, "walletAddress");
    const createSubProp = (file) => {
        if (walletAddress != null && walletAddress != undefined) {
            try {
                var query = `
                mutation CreateProposal($input: ProposalInput) {
                  createProposal(input: $input) {
                    _id
                    proposal_id
                    name
                    type
                    funds_requested
                    price_per_token
                    number_of_tokens
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
                    proposal_blockchain_id
                    project {
                        project_blockchain_id
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
                                "reported_expenditure": reportedExp,
                                "reported_budget": reportedBudg,
                                "variants": variance,
                                "type": 'Subsequent',
                                //   "current_proposal_cycle": currentProposalCycle,
                                "budget_for_currenct_proposal_cycle": budgetforCurrentProposalCycle,
                                "funds_requested": latestProposalData[0]?.funds_requested,
                                // "timeline_update": timelineUpdate,
                                "receiving_address": walletAddress,
                                "additional_information": additionalInformation,
                                "additional_attachment": file,
                                // additionalAttachments
                                "token_release": tokenRelease,
                                "investor": latestProposalData[0]?.investor?._id,
                                "previous_reporting_cycle": currentProposalCycle,
                                // "reported_expenditure_previous_cycle": previosRepCycle,
                                "project_token_minted": latestProposalData[0].project_token_minted,
                                "price_per_token": latestProposalData[0].price_per_token,
                                "project": projectId,
                                // "proposal_blockchain_id": latestProposalData[0].proposal_blockchain_id
                            }
                        }


                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.createProposal != null && data?.data?.createProposal != undefined) {
                            getUserDetailsFunc()
                            let { _id, proposal_blockchain_id, project: { project_blockchain_id } } = data?.data?.createProposal;
                            web3InegrationsFunc(_id, walletAddress, proposal_blockchain_id, project_blockchain_id)
                            //                   
                        }
                    })

            } catch (error) {
                console.log(error, "error in InitalProposal Create");
            }
        }
    }

    const createInitialPropFunc = () => {
        if (addFiles.length > 0 && walletAddress != null && walletAddress != undefined) {


            uploadFile({ variables: { file: addFiles[0].file ,
                "input": {
                    "project_id": ''
                }
            } })
        } else if (walletAddress != null && walletAddress != undefined) {
            createSubProp()
        } else {
            alert("Please Connect Wallet Address")
        }
    }

    const onFileChange1 = event => {
        // Update the state 

        var file = e.target.files[0]
        console.log(file, 'file');
        setAddFiles([{ file: file }])
        // setonePagerDoc({ variables: { file: attachedFile[0].file } })
        // setonePagerDoc(event.target.files[0])
    };

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            // createSubProp(data)
            if (data?.singleUpload?.filename) {

                createSubProp(data?.singleUpload?.filename)
            }
            console.log("Completed uploadFile", data);
        }


    })


    const handleChangeUpper = event => {
        const result = event.target.value.toUpperCase();

        setAdditionalInformation(result);
    };


    async function deleteSubsequentPropFunc(id) {

        try {

            var query = `
            mutation($id: ID) {
                deleteProposal(id: $id)
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
                        "id": id,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('deleteProposal', data?.data?.deleteProposal);
                    if (data?.data?.deleteProposal != null && data?.data?.deleteProposal != undefined && data?.data?.deleteProposal.length > 0) {
                        console.log('proposal deleted')
                    } else {
                        console.log('proposal not deleted')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    // const createInitialPropFunc = () => {
    //     try {
    //         const userData = JSON.parse(localStorage.getItem('userAccount'));
    //         if (userData && walletAddress != null && walletAddress != undefined) {
    //             var query = `
    //         mutation CreateProposal($input: ProposalInput) {
    //           createProposal(input: $input) {
    //             _id
    //             proposal_id
    //             name
    //             type
    //             funds_requested
    //             price_per_token
    //             number_of_tokens
    //             logo

    //             no_of_validators
    //             proposal_status
    //             reported_expenditure_previous_cycle
    //             reported_expenditure_till_date
    //             token_release
    //             additional_attachment
    //             additional_information
    //             receiving_address
    //             timeline_update
    //             fund_requested_for_current_cycle
    //             budget_for_currenct_proposal_cycle
    //             current_proposal_cycle
    //             variants
    //             reported_expenditure
    //             reported_budget
    //             proposal_blockchain_id
    //           }
    //         }
    //         `;

    //             fetch(apiURI.URL, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                      'Accept': 'application/json',
        //   'x-power': process.env.POWER_KEY,
        //   'x-domain-agent': process.env.DOMAIN_AGENT,
        //   'x-strict-origin-name': process.env.ORIGIN_NAME,
        //   'x-range-name': process.env.RANGE_NAME

    //                 },
    //                 body: JSON.stringify({
    //                     query,
    //                     variables: {
    //                         "input": {
    //                             "reported_expenditure": reportedExp,
    //                             "reported_budget": reportedBudg,
    //                             "variants": variance,
    //                             "type": 'Subsequent',
    //                             "current_proposal_cycle": currentProposalCycle,
    //                             "budget_for_currenct_proposal_cycle": budgetforCurrentProposalCycle,
    //                             "funds_requested": fundReqForCurrentCycle,
    //                             "timeline_update": timelineUpdate,
    //                             //   "receiving_address": null,
    //                             "additional_information": additionalInformation,
    //                             "additional_attachment": additionalAttachments,
    //                             "token_release": tokenRelease,
    //                             "investor": investorData,
    //                             "reported_expenditure_previous_cycle": previosRepCycle,

    //                             "project": projectId,
    //                         }
    //                     }


    //                 })
    //             })
    //                 .then((response) => {

    //                     const json = response.json();
    //                     return json;
    //                 })
    //                 .then(data => {
    //                     if (data?.data?.createProposal != null && data?.data?.createProposal != undefined) {

    //                         getUserDetailsFunc()
    //                         web3InegrationsFunc(walletAddress, data?.data?.createProposal?.proposal_id, data?.data?.createProposal?._id, data?.data?.createProposal?.proposal_blockchain_id, data?.data?.createProposal?.token_release)
    // //                     }
    //                 })
    //         } else {
    //             alert("Please Connect You Wallet only then you can perform this action")
    //         }
    //     } catch (error) {
    //         console.log(error, "error in InitalProposal Create");
    //     }

    // }

    async function web3InegrationsFunc(_id, address, sub_prop_id, proj_id) {
        console.log("request params are ", _id, address, sub_prop_id, proj_id);
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('calling setSubsequentProposalId', _id, address, sub_prop_id, proj_id);
            setSubsequentProposalId(userData.provider, address, sub_prop_id, proj_id)
                .then(async (resp) => {
                    console.log('called setSubsequentProposalId', resp);
                    let subsequent_fund = await getSubsequentProposalFund(userData.provider, proj_id, sub_prop_id);
                    let [proj_cycle, current_cycle] = await Promise.all([
                        getProjectCycles(userData?.provider, proj_id),
                        getProjectCurrentCycle(userData?.provider, proj_id)
                    ])
                    console.log('proj_cycle, current_cycle', proj_cycle, current_cycle);
                    let proposal_cycle = (proj_cycle - current_cycle) + 1
                    return updateProposalFund(_id, subsequent_fund, proposal_cycle);
                })
                .then((status) => {
                    console.log('updated subsequent fund', status);
                    handleClose();
                })
                .catch(async (err) => {
                    console.log(err)
                    // delete proposal
                    console.log('calling deleteSubsequentPropFunc');
                    await deleteSubsequentPropFunc(_id)
                })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const updateProposalFund = (_id, subsequent_fund, proposal_cycle) => {
        console.log('updating subsequent proposal fund', _id, subsequent_fund);
        try {
            var query = `mutation UpdateProposal($input: ProposalInput, $id: ID) {
                updateProposal(input: $input, _id: $id) {
                    fund_requested_for_current_cycle
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
                            "fund_requested_for_current_cycle": subsequent_fund.toString(),
                            "current_proposal_cycle": proposal_cycle.toString()
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

    const showSubseqTimeline = () => {
        setcreateSubseqPropProp(false)
        // setProposalId()
        showTimeLinePage(true)
    }

    const handleCloseTimeline = () => {

        setcreateSubseqPropProp(true)
        showTimeLinePage(false)
    }
    const getInvestorDetails = () => {
        try {
            var query = `
            query Query($role: String, $user: ID) {
                allUsers(role: $role, user: $user) {
                  email
                  _id
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
                        "role": "Investor",
                        "user": loginId
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getUserDetailsFunc()
                    setgetIvestData(data?.data?.allUsers)
                })

        } catch (error) {
            console.log(error, "error in InitalProposal Create");
        }
    }

    const getProposalDatafunc = () => {

        try {


            var query = `
            query GetValidatorToken($project: ID, $user: ID) {
                allProposals(project: $project, user: $user) {
                  
                  _id
                  proposal_id
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
                        setcheckData(data?.data?.allProposals)
                    } else {
                        setcheckData([])
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    useEffect(() => {
        if (loginId != '') {
            getInvestorDetails()
            getProposalDatafunc()
        }

    }, [loginId])

    const getDetailsfunc = () => {

        if (selectPrevProposal != null && selectPrevProposal != undefined && selectPrevProposal != '') {


            try {


                var query = `
            query Query($id: ID) {
                getProposal(_id: $id) {
                  _id
                  proposal_id
                  name
                  type
                  funds_requested
                  price_per_token
                  number_of_tokens
                  project_token_minted
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
                  currency
                  validator_status
                  fund_raised_till_now
                  proposal_blockchain_id
                  previous_reporting_cycle
                  investor {
                    _id
                    email
                    first_name
                  }
                  project {
                    _id
                    project_name
                    project_description
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
                            "id": selectPrevProposal,
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        console.log('getFounderUserDetails', data?.data?.getProposal);
                        if (data?.data?.getProposal != null && data?.data?.getProposal != undefined) {
                            // setcheckData(data?.data?.getProposal)
                            // setProposalMainData([data?.data?.getProposal])
                            setPreviosRepCycle(data?.data?.getProposal?.previous_reporting_cycle)
                            setReportedExp(data?.data?.getProposal?.reported_expenditure)
                            setReportedBudg(data?.data?.getProposal?.reported_budget)
                            setVariance(data?.data?.getProposal?.variants)
                            setCurrentProposalCycle(data?.data?.getProposal?.current_proposal_cycle)
                            setBudgetforCurrentProposalCycle(data?.data?.getProposal?.budget_for_currenct_proposal_cycle)
                            setFundReqForCurrentCycle(data?.data?.getProposal?.fund_requested_for_current_cycle)
                            setTokenRelease(data?.data?.getProposal?.number_of_tokens)
                            setLatestProposalData([data?.data?.getProposal])
                        } else {

                            setPreviosRepCycle('')
                            setReportedExp('')
                            setReportedBudg('')
                            setVariance('')
                            setCurrentProposalCycle('')
                            setBudgetforCurrentProposalCycle('')
                            setFundReqForCurrentCycle('')
                            setTokenRelease('')
                            setLatestProposalData([])
                            // setProposalMainData([])
                            // setcheckData([])
                        }

                    })
            }

            catch (error) {
                console.log(error, "error in Founder Project");
            }
        } else {
            alert('Please Select a Proposal')
        }
    }


    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Subsequent Proposal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>

                        <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <div className="col-md-6" style={{ padding: '0px' }}>
                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <label style={{ width: '35%' }}>Select Proposals :</label>
                                    <div style={{ width: '60%', marginLeft: '10px' }}>
                                        <select className="form-control btn-block-height square-edges" onChange={(e) => setSelectPrevProposal(e.target.value)} >
                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                            {checkData.length > 0 && checkData.map((i) => (

                                                <option style={{ fontSize: '13px' }} value={i?._id} >{i?.proposal_id} </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4" style={{ padding: '0px', marginBottom: '1rem', height: '100%', display: 'flex', alignItems: 'center' }}>
                                <button style={{ height: '40px', width: '100px', background: 'white', border: '1px solid rgb(41, 122, 255)', color: 'rgb(0, 197, 251)', borderRadius: '5px' }} onClick={() => getDetailsfunc()}>
                                    Get Details
                                </button>
                            </div>

                        </div>

                        <form>

                            <div className="row">
                                <div className="col-md-12">

                                    <div className="row">
                                        <div className="col-md-12">
                                            {latestProposalData.length > 0 ?

                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                    <label style={{ width: '25%', color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' }} onClick={() => showSubseqTimeline()}>Timeline Update</label>

                                                    {/* <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setPreviosRepCycle(e.target.value)} /> */}
                                                </div>
                                                : ''
                                            }

                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                                <label style={{ width: '30%' }}>Previous Reporting Cycle :</label>

                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={previosRepCycle != null && previosRepCycle != undefined && previosRepCycle != '' ? previosRepCycle : 0} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Reported Expenditure :</label>

                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={reportedExp != null && reportedExp != undefined && reportedExp != '' ? reportedExp : 0} />


                                            </div>
                                        </div>
                                        {/* <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Token Type:</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}> Reported Budget :</label>

                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={reportedBudg != null && reportedBudg != undefined && reportedBudg != '' ? reportedBudg : 0} />


                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Variance :</label>

                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={variance != null && variance != undefined && variance != '' ? variance : 0} />
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Current Proposal Cycle :</label>


                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={currentProposalCycle != null && currentProposalCycle != undefined && currentProposalCycle != '' ? currentProposalCycle : 0} />

                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Budget for Current Proposal Cycle :</label>


                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={budgetforCurrentProposalCycle != null && budgetforCurrentProposalCycle != undefined && budgetforCurrentProposalCycle != '' ? budgetforCurrentProposalCycle : 0} /> </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Fund Request for Current Cycle :</label>


                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={fundReqForCurrentCycle != null && fundReqForCurrentCycle != undefined && fundReqForCurrentCycle != '' ? fundReqForCurrentCycle : 0} /> </div>
                                        </div>
                                        {/* <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '30%' }}>Timeline Update:</label>


                                            <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setTimelineUpdate(e.target.value)} /> 
                                            </div>
                                    </div> */}
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Receiving Address :</label>


                                                <input type="text" className="form-control" readOnly='true' style={{ width: '50%' }} defaultValue={walletAddress} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Additional Attachments :</label>

                                                {/* onChange={(e) => setAdditionalAttachments(e.target.value)} */}
                                                <input type="file" className="form-control" style={{ width: '50%' }} onChange={onFileChange1} />
                                            </div>
                                        </div>
                                        {latestProposalData.length > 0 && latestProposalData[0].price_per_token == true ?

                                            <div className="col-md-12">
                                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                    <label style={{ width: '30%' }}>Token Release :</label>


                                                    <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' onChange={(e) => setTokenRelease(e.target.value)} value={tokenRelease != null && tokenRelease != undefined && tokenRelease != '' ? tokenRelease : 0} /> </div>
                                            </div>
                                            :
                                            ''
                                        }
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Investor :</label>
                                                {/* onChange={(e) => setTokenRelease(e.target.value)} */}
                                                <input type="text" className="form-control" style={{ width: '50%' }} readOnly='true' value={latestProposalData.length > 0 ? latestProposalData[0].investor?.first_name : ""} />
                                                {/* <div style={{ width: '50%' }}>
                                                <select className="form-control btn-block-height square-edges" onChange={(e) => setInvestorData(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    {getIvestData.length > 0 && getIvestData.map((i) => (

                                                        <option style={{ fontSize: '13px' }} value={i?._id} >{i?.email} </option>
                                                    ))}
                                                </select>
                                            </div> */}

                                                {/* <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setInvestorData(e.target.value)} /> */}
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                                                <label style={{ width: '30%' }}>Additional Information :</label>


                                                <textarea type="text" className="form-control" style={{ width: '50%', height: '110px' }} value={additionalInformation} onChange={handleChangeUpper} /> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>

                    <div className="submit-section">
                        <button className="btn add-btn2 submit-btn" style={{ width: '170px' }}  onClick={() => createInitialPropFunc()}>Request Funds</button>
                    </div>

                </Modal.Footer>










            </Modal>

            <TimeLinePageRoute selectPrevProposal={selectPrevProposal} show={timeLinePage} handleClose={handleCloseTimeline} />
        </>
    );
}

export default SubSequentModal;