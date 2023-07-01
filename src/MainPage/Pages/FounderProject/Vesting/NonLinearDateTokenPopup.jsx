
import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { apiURI } from '../../../../config/config';
import {
    isFounder,
    addFounder,
    approveByFounderCoinContract,
    depositFounderNonLinearTokens,
    setNonLinearInstallments,
    currentEscrowBalanceOfInvestor,
    investorWithdrawnFund,
    investorUnlockedFund,
    getApprovedAllowance
} from '../../../../config/web3Client3';



function NonLinearDateTokenPopup({
    uploadMainData,
    releaseTge, vestingDetails,
    invesWalletAddress,
    setInvestorName,
    setTgeDate,
    setVestingStartDate,
    setVestingEndDate,
    setReleaseTge,
    setCliffMonths,
    setVestingMonths,
    setTotalTokens,
    cliffMonths, vestingMonths, totalTokens, projectId,
    vestingStartDate, vestingEndDate, tgeMainDate, investorName, show, handleClose, getUserDetailsFunc, vestingData, tokenTicker, tokenContactAddress }) {

    console.log(uploadMainData, "uploadMainData");
    const [tgefunc, setTgefunc] = useState('');
    const [noofTokens, setNoofTokens] = useState(0);
    const [approvedTokens, setApprovedTokens] = useState(0);
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    console.log(tokenContactAddress,"NonLinearDateTokenPopup tokenContactAddress");

    const getApprovedTokens = async () => {
        if (walletAddress && tokenContactAddress) {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            console.log("userData?.provider, walletAddress, tokenContactAddress", userData?.provider, walletAddress, tokenContactAddress)
            let balance = await getApprovedAllowance(userData?.provider, walletAddress, tokenContactAddress);
            setApprovedTokens(balance);
            console.log('approved tokens are: ', balance, approvedTokens);
        }
    }

    useEffect(() => {
        if (tokenContactAddress != '') {
            getApprovedTokens()
        }

    }, [tokenContactAddress])

    const submitFunc = () => {
        // if(investorName != '' && tgeMainDate != '' &&
        // vestingStartDate != '' && vestingEndDate != '' && 
        // releaseTge != '' && cliffMonths != '' &&  vestingMonths != '' && totalTokens != '' &&   noofTokens != '' && tgefunc != ''
        // ){
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData && projectId) {
            try {

                var query =
                    `
                        mutation Mutation($input: VestingInput) {
                            createVesting(input: $input) {
                            _id
                            investor {
                                _id
                                first_name
                                wallet_address
                            }
                            project {
                                _id,
                                project_blockchain_id
                            }
                            non_linear {
                                tokens
                                date
                            }
                            tge_date
                            vesting_date
                            vesting_end_date
                            release_mode
                            release_percentage
                            cliff_months
                            vesting_months
                            total_tokens
                            vesting_blockchain_id
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
                            "investor": investorName,
                            "project": projectId,
                            "tge_date": tgeMainDate,
                            "vesting_date": vestingStartDate,
                            "vesting_end_date": vestingEndDate,
                            "release_mode": "Non-Linear",
                            "release_percentage": parseFloat(releaseTge),
                            "cliff_months": parseInt(cliffMonths),
                            "vesting_months": parseFloat(vestingMonths),
                            "total_tokens": parseFloat(totalTokens),
                            "non_linear": uploadMainData,
                            "token_ticker":tokenTicker,
                            "vesting_contract": process.env.VESTING_CONTRACT_ADDRESS,
                            "token_contract":tokenContactAddress,
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
                        //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                        console.log("non-linear vesting", data?.data?.createVesting);
                        if (data?.data?.createVesting != null && data?.data?.createVesting != undefined) {
                            await depositToSingleNonLinear(data?.data?.createVesting);
                            vestingDetails()
                            handleClose()
                            // setVestingDetailsData(data?.data?.allVesting)

                            setInvestorName("")
                            setTgeDate("")
                            setVestingStartDate("")
                            setVestingEndDate("")
                            setReleaseTge("")
                            setCliffMonths("")
                            setVestingMonths("")
                            setTotalTokens(0)

                        }
                    });

            } catch (error) {
                console.log(error);
            }
        } else {
            if (projectId) alert("Please connect to Metamask or Coinbase wallet")
            else alert("Please create a project first");
        }
        // }else {
        //     alert("Please fill all the details")
        // }
    }


    const columns = [



        // {
        //     title: 'Total Tokens',
        //     dataIndex: 'totalToken',
        //     align: 'center',
        // },

        {
            title: 'Date',
            dataIndex: 'date',
            align: 'center',
        }, {
            title: 'Number of Tokens',
            dataIndex: 'tokens',
            align: 'center',
        }

    ]

    const depositToSingleNonLinear = async (data) => {
        let {
            _id,
            investor,
            project,
            tge_date,
            vesting_date,
            vesting_end_date,
            release_mode,
            release_percentage,
            cliff_months,
            vesting_months,
            total_tokens,
            vesting_blockchain_id,
            non_linear
        } = data;
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('check founder or not');
            return isFounder(userData.provider, walletAddress)
            .then((status) => {
                if (status) {
                    console.log('founder already exist');
                    return Promise.resolve()
                } else {
                    console.log('creating new founder');
                    return addFounder(userData.provider, walletAddress);
                }
            })
            .then(async (founder) => {
                await getApprovedTokens();
                if (founder) console.log('added new founder');
                if (approvedTokens >= total_tokens) {
                    return Promise.resolve('approved tokens are already exist');
                } else {
                    console.log('calling approveByFounderCoinContract', userData.provider, walletAddress, total_tokens, tokenContactAddress);
                    return approveByFounderCoinContract(userData.provider, walletAddress, total_tokens, tokenContactAddress)
                }
            })
            .then(async (resp) => {
                await getApprovedTokens();
                console.log('called approveByFounderCoinContract', resp);
                console.log('calling depositFounderNonLinearTokens');
                return depositFounderNonLinearTokens(userData.provider, walletAddress, tokenContactAddress, tokenTicker.toUpperCase(), vesting_blockchain_id, total_tokens, investor.wallet_address, tge_date, release_percentage)
            })
            .then(async(resp) => {
                await getApprovedTokens();
                console.log('called depositFounderNonLinearTokens', resp);
                console.log('calling setNonLinearInstallments');
                return setNonLinearInstallments(userData.provider, walletAddress, vesting_blockchain_id, investor.wallet_address, non_linear);
            })
            .then(async (resp) => {
                console.log('called setNonLinearInstallments', resp);
                let escrow_bal = await currentEscrowBalanceOfInvestor(userData.provider, walletAddress, vesting_blockchain_id, investor.wallet_address);
                let withdrawn_fund = await investorWithdrawnFund(userData.provider, vesting_blockchain_id, investor.wallet_address);
                let unlocked_fund = await investorUnlockedFund(userData.provider, walletAddress, investor.wallet_address, vesting_blockchain_id);
                console.log('update vesting record funds');
                return updateVestingRecordFund(_id, escrow_bal, withdrawn_fund, unlocked_fund);
            })
            .then((resp) => {
                console.log('updated vesting record fund');
            })
            .catch(err => {
                console.log(err);
                return deleteVestingRecord(_id);
            })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const updateVestingRecordFund = (_id, escrow_bal, withdrawn_fund, unlocked_fund) => {
        console.log('updating db vesting record', _id, escrow_bal, withdrawn_fund, unlocked_fund)
        try {
            var query = `mutation UpdateVesting($input: VestingInput, $id: ID) {
                updateVesting(input: $input, _id: $id) {
                    _id
                    tokens_in_escrow
                    tokens_released_till_date
                    unlocked_tokens_till_date
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
                        "id": _id,
                        "input": {
                            "tokens_in_escrow": parseFloat(escrow_bal),
                            "tokens_released_till_date": parseFloat(withdrawn_fund),
                            "unlocked_tokens_till_date": parseFloat(unlocked_fund)
                        }
                    }

                })
            })
            .then((response) => {
                const json = response.json();
                return json;
            })
            .then(data => {
                console.log('UpdateVesting', data?.data?.updateVesting);
                if (data?.data?.updateVesting != null && data?.data?.updateVesting != undefined) {
                    console.log('vesting record updated')
                } else {
                    console.log('vesting record not updated')
                }
            });
        } catch (error) {
            console.log(error, "updateVesting error");
        }
    }

    const deleteVestingRecord = (_id) => {
        try {
            var query = `
            mutation DeleteVesting($_id: ID) {
                deleteVesting(_id: $_id) {
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
                    variables: {
                        "_id": _id,
                    }
                })
            })
            .then((response) => {
                const json = response.json();
                return json;
            })
            .then(data => {
                console.log('deleteVesting', data?.data?.deleteVesting);
                vestingDetails();
                if (data?.data?.deleteVesting != null && data?.data?.deleteVesting != undefined) {
                    console.log('vesting deleted')
                } else {
                    console.log('vesting not deleted')
                }
            })
        }
        catch (error) {
            console.log(error, "error in Founder Vesting");
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
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 d-flex">

                            <div className="card card-table flex-fill">

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table
                                            pagination={{
                                                total: uploadMainData.length,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }
                                            }
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            bordered
                                            dataSource={uploadMainData}
                                            rowKey={record => record.id}
                                        // onChange={this.handleTableChange}
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" style={{ padding: '0px', marginTop: '40px', paddingLeft: '130px' }} >
                        <span style={{ color: '#008000'}}>{approvedTokens} approved</span>
                    </div>
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" style={{ width: '170px', background: '#6345ED', color: 'white', border: '2px solid #6345ED' }}
                            onClick={() => submitFunc()}

                        >
                            Approve
                        </button> </div> */}
                    <div className="submit-section">
                        {/* height: '35px', margin: '10px', borderRadius: '50px', */}
                        {/* height: '35px', margin: '10px', borderRadius: '50px', */}
                        <button className="btn  submit-btn" style={{ width: '170px', border: '2px solid #6345ED', background: 'white', color: '#6345ED' }}
                            onClick={() => submitFunc()}
                        >
                            Deposit

                            {/* Start Vesting */}
                        </button> </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NonLinearDateTokenPopup;