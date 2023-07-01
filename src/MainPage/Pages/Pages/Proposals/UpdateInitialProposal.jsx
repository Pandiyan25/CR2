
import React, { useState, useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import {
    setInitialProposalId,
    approveByFounderCoinContract,
    depositFoundersToken,
    totalDepositedFounderTokenInPot
} from '../../../../config/web3Client2';

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

function UpdateInitialProposal({
    getUserDetailsFunc,
    proposalMainId,
    proposalProjId,
    show,
    handleClose,
    setShowUpdateProposal={setShowUpdateProposal},
    setProposalProjId,
    setProposalMainId,
    data,
    proposalInvestor, setProposalInvestor,
    proposalInvestorId, setProposalInvestorId,
    proposalCurrency, setProposalCurrency,
    proposalReqAmt, setProposalReqAmt,
    proposalRecAddress, setProposalRecAddress,
    checked, proposalPricePerToken, setProposalPricePerToken,
    setProposalTokenMinted,
    proposalNumTokens, setProposalNumTokens,
    proposalAttachment, setProposalAttachment,
    nochecked,
    setNotProposalPricePerToken
}) {


    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            if (data?.singleUpload?.filepath) {

                createInitialFunc(data?.singleUpload?.filepath)
            }

            console.log("Completed uploadFile", data);
        }
    })


    const [proposalMainonePagerDoc, setProposalMainonePagerDoc] = useState([])

    const changeToNotCheckedFunc = () => {
        setNotProposalPricePerToken(true)
        setProposalTokenMinted(false)
    }
    const changeToCheckedFunc = () => {
        setNotProposalPricePerToken(false)
        setProposalTokenMinted(true)
    }

    console.log(data, "data");

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }

    const onFileChange1 = e => {
        // Update the state 

        var file = e.target.files[0]
        console.log(file, 'file');
        setProposalMainonePagerDoc([{ file: file }])
        // setonePagerDoc({ variables: { file: attachedFile[0].file } })
        // setonePagerDoc(event.target.files[0])
    };

    const createInitialPropFunc = () => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));

        console.log(proposalMainonePagerDoc, 'proposalMainonePagerDoc');
        if (proposalMainonePagerDoc.length > 0 && userData) {

            uploadFile({ variables: { file: proposalMainonePagerDoc[0].file ,
                "input": {
                    "project_id": ''
                }
            } })
        } else if (userData) {
            createInitialFunc()
        } else {
            alert("Please Connect You Wallet only then you can perform this action")
        }
    }


    console.log(proposalAttachment, "proposalAttachment");

    const createInitialFunc = (file) => {
        console.log(file);
        try {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            if (userData && file != '') {

                // } else if (walletAddress != null && walletAddress != undefined) {
                var query = `mutation Mutation($id: ID, $input: ProposalInput) {
                    updateProposal(_id: $id, input: $input) {
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
                            "input": {
                                "type": 'Initial',
                                "funds_requested": proposalReqAmt,
                                "price_per_token": checked,
                                "number_of_tokens": `${proposalNumTokens}`,
                                "project": proposalProjId,
                                "investor": proposalInvestorId,
                                "receiving_address": proposalRecAddress,
                                "project_token_minted": proposalPricePerToken,
                                "currency": proposalCurrency,
                                "timeline_update": file
                            },
                            "id": proposalMainId
                        }



                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.updateProposal != null && data?.data?.updateProposal != undefined) {

                            getUserDetailsFunc()
                            setShowUpdateProposal(false)

                            setProposalInvestor('')
                            setProposalInvestorId('')
                            setProposalCurrency('')
                            setProposalReqAmt('')
                            setProposalRecAddress('')
                            setProposalPricePerToken('')
                            // setProposalTokenMinted(i?.price_per_token)
                            setProposalNumTokens('')
                            setProposalAttachment('')
                            setProposalProjId('')
                            setProposalMainId('')
                        }
                    })

            }
            else if (userData && proposalAttachment != '') {

                // } else if (walletAddress != null && walletAddress != undefined) {
                var query = `mutation Mutation($id: ID, $input: ProposalInput) {
                        updateProposal(_id: $id, input: $input) {
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
                            "input": {
                                "type": 'Initial',
                                "funds_requested": proposalReqAmt,
                                "price_per_token": checked,
                                "number_of_tokens": `${proposalNumTokens}`,
                                "project": proposalProjId,
                                "investor": proposalInvestorId,
                                "receiving_address": proposalRecAddress,
                                "project_token_minted": proposalPricePerToken,
                                "currency": proposalCurrency,
                                "timeline_update": proposalAttachment
                            },
                            "id": proposalMainId
                        }



                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.updateProposal != null && data?.data?.updateProposal != undefined) {

                            getUserDetailsFunc()
                            setShowUpdateProposal(false)

                            setProposalInvestor('')
                            setProposalInvestorId('')
                            setProposalCurrency('')
                            setProposalReqAmt('')
                            setProposalRecAddress('')
                            setProposalPricePerToken('')
                            // setProposalTokenMinted(i?.price_per_token)
                            setProposalNumTokens('')
                            setProposalAttachment('')
                            setProposalProjId('')
                            setProposalMainId('')
                        }
                    })

            }
            else {
                alert("Please Connect You Wallet only then you can perform this action")
            }
        } catch (error) {
            console.log(error, "error in InitalProposal Create");
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

                                                <input type="text" className="form-control" defaultValue={proposalInvestor} style={{ width: '50%' }} readOnly='true' />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}> Currency :</label>
                                            <div style={{ width: '50%' }}>

                                                <input type="text" className="form-control" defaultValue={proposalCurrency} style={{ width: '50%' }} readOnly='true' />
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

                                            <input type="text" className="form-control" defaultValue={proposalReqAmt} style={{ width: '50%' }} readOnly='true' />


                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}> Receiving Address :</label>

                                            <input type="text" className="form-control" defaultValue={proposalRecAddress} style={{ width: '50%' }} readOnly='true' />
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                            <label style={{ width: '25%' }}>Price per Token : </label>
                                            <input type="text" className="form-control" defaultValue={proposalPricePerToken} style={{ width: '50%' }} readOnly='true' />




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
                                            <input type="text" className="form-control" defaultValue={proposalNumTokens} style={{ width: '50%' }} readOnly='true' />


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


                                                {proposalAttachment != '' && proposalAttachment != null && proposalAttachment != undefined ?
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '120px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(proposalAttachment) }} >Saft</div>


                                                    </div>
                                                    :
                                                    ""


                                                }
                                                {proposalMainonePagerDoc.length > 0 && proposalMainonePagerDoc != null && proposalMainonePagerDoc != undefined ?
                                                    <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '120px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(URL.createObjectURL(imageData[0].file)) }} >Saft</div>


                                                    :
                                                    ''
                                                }

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
                            <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>
                        {/* <div className="submit-section">
                            <button className="btn add-btn2 submit-btn" onClick={() => handlehandleClose()}>Lock Tokens</button>
                        </div> */}
                        <div className="submit-section">
                            <button className="btn add-btn2 submit-btn" style={{ width: '170px' }} onClick={() => createInitialPropFunc()}>Request Funds</button>
                        </div>

                    </Modal.Footer>
                    : nochecked == true ?
                        <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                            <div className="submit-section">
                                <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                            </div>
                            {/* <div className="submit-section">
                                <button className="btn add-btn2 submit-btn" onClick={() => handlehandleClose()} >Sign Saft</button>
                            </div> */}
                            <div className="submit-section">
                                <button className="btn add-btn2 submit-btn" style={{ width: '170px' }} onClick={() => createInitialPropFunc()}>Request Funds</button>
                            </div>

                        </Modal.Footer>
                        :
                        <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                            <div className="submit-section">
                                <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                            </div>



                        </Modal.Footer>


                }









            </Modal>
        </>
    );
}

export default UpdateInitialProposal;