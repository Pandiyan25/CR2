
import React, { useState, useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import {
    setInitialProposalId
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
  }`;

function InitialProposal({ show, handleClose, getUserDetailsFunc }) {


    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const loginId = useSelector((state) => state.constVar.loginId)
    const projectId = useSelector((state) => state.constVar.projectId)
    const [requestedAmt, setRequestedAmt] = useState('')
    const [currency, setCurrency] = useState('')
    const [investorName, setInvestorName] = useState('')
    const [projectTokenMinted, setProjectTokenMinted] = useState('')
    const [noOfTokens, setNoOfTokens] = useState('0')
    const [nochecked, setnoChecked] = useState(false)
    const [onePagerDoc, setonePagerDoc] = useState([])
    const [getIvestData, setgetIvestData] = useState([])
    const [checked, setChecked] = useState(true)
    const changeToNotCheckedFunc = () => {
        setnoChecked(true)
        setChecked(false)
    }
    console.log(projectId,"projectId");
    const changeToCheckedFunc = () => {
        setnoChecked(false)
        setChecked(true)
    }

    console.log(walletAddress, "walletAddress in initialProposal");

    const onFileChange1 = e => {
        // Update the state 

        var file = e.target.files[0]
        console.log(file, 'file');
        setonePagerDoc([{ file: file }])
        // setonePagerDoc({ variables: { file: attachedFile[0].file } })
        // setonePagerDoc(event.target.files[0])
    };

    const close = () => {
        setNoOfTokens('0')
        handleClose()
    }
    async function deleteInitialPropFunc(id) {

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

                    getUserDetailsFunc()
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

    const createInitialFunc = (file) => {
        try {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            if (userData) {

                // } else if (walletAddress != null && walletAddress != undefined) {
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
                          project {
                            _id
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
                            fund_raised_target
                            public_launch_price
                            project_blockchain_id
                          }
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
                            dummy
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
                                "type": 'Initial',
                                "funds_requested": requestedAmt,
                                "price_per_token": checked,
                                "number_of_tokens": `${noOfTokens}`,
                                "project": projectId,
                                "investor": investorName,
                                "receiving_address": walletAddress,
                                "project_token_minted": projectTokenMinted,
                                "currency": currency,
                                "timeline_update":file
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
                            // let noOfTokens = data?.data?.createProposal?.funds_requested / data?.data?.createProposal?.project_token_minted;
                            // console.log('noOfTokens', noOfTokens)
                            let { _id, proposal_blockchain_id, funds_requested, project: { project_blockchain_id }, investor } = data?.data?.createProposal
                            console.log("data?.data?.createProposal", data?.data?.createProposal)
                            console.log(data?.data?.createProposal.investor)
                            web3InegrationsFunc(_id, walletAddress, investor.wallet_address, proposal_blockchain_id, project_blockchain_id, funds_requested)
                        }
                    })

            } else {
                alert("Please Connect You Wallet only then you can perform this action")
            }
        } catch (error) {
            console.log(error, "error in InitalProposal Create");
        }
    }

    const createInitialPropFunc = () => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));

        if (investorName != null && investorName != undefined && investorName != ''  &&
        requestedAmt != null &&  requestedAmt != undefined && requestedAmt != ''  &&
        onePagerDoc.length > 0 && userData) {

            uploadFile({ variables: { file: onePagerDoc[0].file ,
                "input": {
                    "project_id": ""
                }
            } })
        } else 
        if (investorName != null && investorName != undefined && investorName != ''  &&
        requestedAmt != null &&  requestedAmt != undefined && requestedAmt != ''  && userData) {
            createInitialFunc()
        } else if (investorName != null && investorName != undefined && investorName != ''  &&
        requestedAmt != null &&  requestedAmt != undefined && requestedAmt != ''  ){
            if(investorName != null && investorName != undefined && investorName != ''  &&
            requestedAmt != null &&  requestedAmt != undefined && requestedAmt != '' ){
                // setInvestorError(true)
                alert("Please Fill Investor Name and Requested Amount Details")
            }else if(investorName != null && investorName != undefined && investorName != ''){

                alert("Please Select Investor Name")
            } else{
                alert("Please Enter Requested Amount Details")
                // setInvestorError(false)
            }
        }
        else{
            alert("Please Connect You Wallet only then you can perform this action")
        }
    }

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            if(data?.singleUpload?.filepath){

                createInitialFunc(data?.singleUpload?.filepath)
            }

            console.log("Completed uploadFile", data);
        }
    })

    async function web3InegrationsFunc(_id, address, i_address, init_prop_id, proj_id, requested_fund) {
        console.log("request params are ", _id, address, i_address, init_prop_id, proj_id, requested_fund);
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('calling setInitialProposalId', _id, address, i_address, init_prop_id, proj_id, requested_fund)
            setInitialProposalId(userData.provider, address, i_address, init_prop_id, proj_id, requested_fund)
            .then((resp) => {
                console.log('called setInitialProposalId', resp);
                close()
            })
            .catch(async (err) => {
                console.log(err)
                // delete proposal
                console.log('calling deleteInitialPropFunc');
                await deleteInitialPropFunc(_id)
            })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }


    const getInvestorDetails = () => {
        try {
            var query = `
            query Query($role: String, $user: ID) {
                allUsers(role: $role, user: $user) {
                  email
                  _id
                  role
                  first_name
                  last_name
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



    useEffect(() => {
        if (loginId != '') {
            getInvestorDetails()
        }

    }, [loginId])


    const reqAmtFunc = (i) => {
        if (i.target.validity.valid) {
            setRequestedAmt(i.target.value)
            console.log(i.target.value, "typeofpricepertoken");
            if (projectTokenMinted != '') {

                var main = 0
                main = parseFloat(i.target.value) / parseFloat(projectTokenMinted)
                console.log("aaaaa", main);
                setNoOfTokens(main.toString())
            }
        }

    }

    const pricePerTokenFunc = (i) => {

        if (i.target.validity.valid) {
            setProjectTokenMinted(i.target.value)
            console.log(i.target.value, "typeofpricepertoken");
            if (requestedAmt != '') {

                var main = 0
                main = parseFloat(requestedAmt) / parseFloat(i.target.value)
                console.log("aaaaa", main);
                // onChange={(e) =>
                setNoOfTokens(main.toString())
                // }
            } else {
                setNoOfTokens('0')
            }
        }

    }


    return (
        <>


            <Modal
                show={show}
                onHide={close}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Initial Proposal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Investor :</label>
                                            <div style={{ width: '50%' }}>
                                                <select className="form-control btn-block-height square-edges" onChange={(e) => setInvestorName(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    {getIvestData.length > 0 && getIvestData.map((i) => (

                                                        <option style={{ fontSize: '13px' }} value={i?._id} >{i?.first_name} {i?.last_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}> Currency :</label>
                                            <div style={{ width: '50%' }}>
                                                <select className="form-control btn-block-height square-edges" onChange={(e) => setCurrency(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="USDT">USDT</option>
                                                    <option style={{ fontSize: '13px' }} value="USD">USD</option>
                                                    <option style={{ fontSize: '13px' }} value="EUR">EUR</option>
                                                    <option style={{ fontSize: '13px' }} value="SDT">SDT</option>
                                                    <option style={{ fontSize: '13px' }} value="INR">INR</option>
                                                    <option style={{ fontSize: '13px' }} value="USDC">USDC</option>
                                                    <option style={{ fontSize: '13px' }} value="DAI">DAI</option>
                                                    <option style={{ fontSize: '13px' }} value="BUSD">BUSD</option>
                                                    <option style={{ fontSize: '13px' }} value="RUB">RUB</option>
                                                    <option style={{ fontSize: '13px' }} value="CAD">CAD</option>
                                                    <option style={{ fontSize: '13px' }} value="GBP">GBP</option>
                                                    <option style={{ fontSize: '13px' }} value="AED">AED</option>
                                                    <option style={{ fontSize: '13px' }} value="CNY">CNY</option>
                                                    <option style={{ fontSize: '13px' }} value="VMD">VMD</option>
                                                </select>
                                            </div>


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

                                            <label style={{ width: '25%' }}> Requested Amount :</label>

                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                className="form-control"
                                                style={{ width: '50%' }}
                                                // onChange={(e) =>
                                                //     reqAmtFunc((v) => (e.target.validity.valid ? e.target.value : v))
                                                //   }
                                                value={requestedAmt}
                                                onChange={(e) => reqAmtFunc(e)}
                                            />
                                            {/* () setRequestedAmt */}


                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}> Receiving Address :</label>

                                            <input type="text" className="form-control" defaultValue={walletAddress} style={{ width: '50%' }} readOnly='true' />
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}>Price per Token : </label>


                                            <input
                                                type="text"
                                                pattern="[0-9]*"
                                                className="form-control"
                                                style={{ width: '50%' }}
                                                onChange={(e) => pricePerTokenFunc(e)}
                                                // onChange={(e) =>
                                                //     pricePerTokenFunc((v) => (e.target.validity.valid ? e.target.value : v))
                                                // }
                                                value={projectTokenMinted}
                                            />
                                            {/* // setProjectTokenMinted(e.target.value)} */}

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}>Project Tokens Minted :  </label>
                                            <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                                <input type="radio" className="form-control" checked={checked} onChange={() => changeToCheckedFunc()} style={{ width: '20px ' }} /><h5 style={{ marginBottom: '0px' }}>Yes</h5>
                                                <input type="radio" className="form-control" checked={nochecked} onChange={() => changeToNotCheckedFunc()} style={{ width: '20px ' }} /><h5 style={{ marginBottom: '0px' }}>No</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}> No of Token :</label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder='(Auto Populate) Requested Amount of Token'
                                                style={{ width: '50%' }}
                                                value={noOfTokens}
                                                readOnly='true'

                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Validator Score :</label>
                                            <input type="text" className="form-control"    style={{width:'50%'}} />
                                            

                                            
                                        </div>
                                    </div>

                                    <div className="col-md-12"> 
                                    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
                                       
                                            <label style={{width:'25%'}}> Investor Score : </label>
                                            <input type="text" className="form-control"   style={{width:'50%'}} />
                                            
                                            
                                        </div>
                                    </div> */}
                                    {checked == true ?
                                        ''
                                        :
                                        <div className="col-md-12">
                                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                                <label style={{ width: '25%' }}>Upload Saft :</label>
                                                {/* <input type="text" className="form-control"   style={{width:'50%'}} /> */}
                                                <input type="file" className="form-control" onChange={onFileChange1} />


                                            </div>
                                        </div>
                                    }


                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                {checked == true ?
                    <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                        <div className="submit-section">
                            <button className="btn  submit-btn" onClick={() => close()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>
                        {/* <div className="submit-section">
                            <button className="btn add-btn2 submit-btn" onClick={() => handleClose()}>Lock Tokens</button>
                        </div> */}
                        <div className="submit-section">
                            <button className="btn add-btn2 submit-btn" style={{ width: '170px' }} onClick={() => createInitialPropFunc()}>Request Funds</button>
                        </div>

                    </Modal.Footer>
                    : nochecked == true ?
                        <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                            <div className="submit-section">
                                <button className="btn  submit-btn" onClick={() => close()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                            </div>
                            {/* <div className="submit-section">
                                <button className="btn add-btn2 submit-btn" onClick={() => handleClose()} >Sign Saft</button>
                            </div> */}
                            <div className="submit-section">
                                <button className="btn add-btn2 submit-btn" style={{ width: '170px' }} onClick={() => createInitialPropFunc()}>Request Funds</button>
                            </div>

                        </Modal.Footer>
                        :
                        <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                            <div className="submit-section">
                                <button className="btn  submit-btn" onClick={() => close()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                            </div>



                        </Modal.Footer>


                }









            </Modal>
        </>
    );
}

export default InitialProposal;