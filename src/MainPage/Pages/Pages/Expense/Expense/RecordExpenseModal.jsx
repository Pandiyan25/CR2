import React, { useState, useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../../config/config';

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

function RecordExpenseModal({
    getSocialMediaDataFunc,
    show,
    handleClose,
}) {

    const loginId = useSelector((state) => state.constVar.loginId)
    const [tokenStd, settokenStd] = useState([])
    const [checkPage, setCheckPage] = useState('')
    const [date, setdate] = useState('')
    const [expMainhead, setexpMainhead] = useState('')
    const [expSubHead, setexpSubHead] = useState('')
    const [EnterAmt, setEnterAmt] = useState('')
    const [addLink, setaddLink] = useState('')
    const [bankAccountNo, setbankAccountNo] = useState('')
    const [attachedFile, setattachedFile] = useState('')
    const [expType, setexpType] = useState('')
    const [paidThrough, setpaidThrough] = useState('')
    const [comments, setcomments] = useState('')
    const [VendorId, setVendorId] = useState('')
    const [WalletAddress, setWalletAddress] = useState('')
    const [allVendordData, setAllVendordData] = useState([])
    const [amountValue, setAmountValue] = useState(0)
    const [currencyType, setCurrencyType] = useState('')

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const submitExpensefunc = (file) => {
        if (paidThrough != '' && expType != '' && expSubHead != '' && expMainhead != '') {

            try {
                var query = `
              mutation Mutation($input: ProjectExpenseInput) {
                createProjectExpense(input: $input) {
                  _id
                  
                  date
                  expense_sub_head
                  enter_amount
                  
                  add_link
                  bank_account_number
                  attach_receipt
                  expense_main_head
                  expense_type
                  paid_through
                  comments
                  wallet_address
                  
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



                            "input": {
                                "vendor": VendorId,
                                "wallet_address": WalletAddress,
                                "project": projectNumber,
                                "paid_through": paidThrough,
                                "expense_type": expType,
                                "expense_sub_head": expSubHead,
                                "expense_main_head": expMainhead,
                                "date": date,
                                // ${currencyType}
                                "enter_amount": parseFloat(amountValue),
                                "comments": comments,
                                "bank_account_number": parseFloat(bankAccountNo),
                                "attach_receipt": file,
                                "add_link": addLink

                            }
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.createProjectExpense != null && data?.data?.createProjectExpense != undefined) {

                            getSocialMediaDataFunc()
                            handleClose()
                        }
                    })

            } catch (error) {
                console.log(error, "funding in Project");
            }
        } else {
            alert("Please Fill All the Details")
        }

    }



    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            submitExpensefunc(data?.singleUpload?.filepath)

            console.log("Completed uploadFile", data);
        }
    })

    const saveExpenseDatafunc = () => {
        if (attachedFile.length > 0 && VendorId != '' && VendorId != null && VendorId != undefined) {

            uploadFile({ variables: { file: attachedFile[0].file ,
                "input": {
                    "project_id": ''
                }
            } })
        } else if (VendorId != '' && VendorId != null && VendorId != undefined) {
            submitExpensefunc()
        } else {
            alert("Please Select A Vendor")
        }
    }


    const onFileChange = e => {
        // Update the state 

        var file = e.target.files[0]
        console.log(file, 'file');
        setattachedFile([{ file: file }])
    };

    const getVendorDetailsFunc = () => {
        try {
            var query = `query Query($project: ID) {
            allVendors(project: $project) {
              _id
              name
              vendor_mail
              website
              organization_name
              email_id
              payment
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
                        "project": projectNumber
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    console.log(data, "funding projectNumberdata");
                    if (data?.data?.allVendors != null && data?.data?.allVendors != undefined) {

                        setAllVendordData(data?.data?.allVendors)
                    } else {
                        setAllVendordData([])
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }

    const getUserDetailsFunc = () => {

        try {


            var query = `query Query($project: ID) {
            allProjectBudgets(project: $project) {
              _id
              main_expense_head
              sub_expense_head
              expense_per_cycle
              unit
              expense_frequency
              no_of_expense_cycle
              life_time_budget
              actual_expense_till_date
              balance
              start_date
              end_date
              status
              time_task
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
                        "project": projectNumber
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allProjectBudgets);
                    if (data?.data?.allProjectBudgets != null && data?.data?.allProjectBudgets != undefined && data?.data?.allProjectBudgets.length > 0) {
                        setCheckPage(data?.data?.allProjectBudgets[0]._id)
                        settokenStd(data?.data?.allProjectBudgets)
                        var arr = []

                    } else {
                        setCheckPage('')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }
    const getUserPaymentFunc = () => {
        try {
            var query = `
            query Getpayment($user: ID) {
                getpayment(user: $user) {
                  _id
                  primary_currency
                  bank_name
                  account_number
                  wallet_network
                  wallet_address
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

                        "user": loginId,



                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // if()
                    console.log(data?.data?.getpayment);
                    if (data?.data?.getpayment != null && data?.data?.getpayment != undefined) {
                        setbankAccountNo(data?.data?.getpayment?.account_number)
                        setWalletAddress(data?.data?.getpayment?.wallet_address)
                    }
                    // dispatch(projectId(data?.data?.createProject[0]._id))
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }

    }

    useEffect(() => {
        console.log(projectNumber, "funding projectNumber");
        if (projectNumber != '') {
            getUserDetailsFunc()
            getUserPaymentFunc()
            getVendorDetailsFunc()
            console.log(projectNumber, "funding projectNumber");
        }

    }, [projectNumber])

    console.log(allVendordData, allVendordData.length, "allVendordData");
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
                    <Modal.Title>Record Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Date :</label>
                                            <input type="date" className="form-control" defaultValue={date} onChange={(e) => setdate(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expense Main head:</label>
                                            {/* <div >

                                                <select className="form-control btn-block-height square-edges" defaultValue={expMainhead} onChange={(e) => setexpMainhead(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    {tokenStd.length > 0 && tokenStd.map((i) => (
                                                    
                                                    <option style={{ fontSize: '13px' }} value={i?.main_expense_head}>{i?.main_expense_head} </option>
                                                ))}
                                                </select>
                                            </div> */}
                                            <div style={{ width: '300px' }}>

                                                <select className="form-control btn-block-height square-edges" defaultValue={expMainhead} onChange={(e) => setexpMainhead(e.target.value)} >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Administration">Administration</option>
                                                    <option style={{ fontSize: '13px' }} value={"Development & Listing"}>{"Development & Listing"}</option>
                                                    <option style={{ fontSize: '13px' }} value="Salaries">Salaries</option>
                                                    <option style={{ fontSize: '13px' }} value="Infrastructure">Infrastructure</option>
                                                    <option style={{ fontSize: '13px' }} value="Liquidity">Liquidity</option>
                                                    <option style={{ fontSize: '13px' }} value="Marketing">Marketing</option>
                                                    <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Type:</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expense Sub Head:</label>
                                            {/* <div  >
                                                <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    {tokenStd.length > 0 && tokenStd.map((i) => (

                                                        <option style={{ fontSize: '13px' }} value={i?.sub_expense_head}>{i?.sub_expense_head} </option>
                                                    ))}
                                                </select>
                                            </div> */}



                                            <div style={{ width: '300px' }} >


                                                {/* <input type="text" className="form-control" onChange={(e) => setSubDes(e.target.value)} /> */}
                                                {expMainhead == 'Administration' ?
                                                    <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}  >
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        <option style={{ fontSize: '13px' }} value="Incorporation Compliance">Incorporation Compliance</option>
                                                        <option style={{ fontSize: '13px' }} value={"Organisation Compliance"}>{"Organisation Compliance"} </option>
                                                        <option style={{ fontSize: '13px' }} value="Office Advance">Office Advance</option>
                                                        <option style={{ fontSize: '13px' }} value="Office Rent">Office Rent </option>
                                                        <option style={{ fontSize: '13px' }} value="Financial Audit">Financial Audit</option>
                                                        <option style={{ fontSize: '13px' }} value="Misc. Costs">Misc. Costs</option>
                                                        <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                    </select>
                                                    :

                                                    expMainhead == 'Development & Listing' ?
                                                        <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}  >
                                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                                            <option style={{ fontSize: '13px' }} value="Smart Contract Audit">Smart Contract Audit </option>
                                                            <option style={{ fontSize: '13px' }} value={"Legal Fees"}>{"Legal Fees"} </option>
                                                            <option style={{ fontSize: '13px' }} value="Launchpad Fees">Launchpad Fees</option>
                                                            <option style={{ fontSize: '13px' }} value="Centralised Exchange Listing Fees">Centralised Exchange Listing Fees</option>
                                                            <option style={{ fontSize: '13px' }} value="Third Party Consultants">Third Party Consultants</option>
                                                            <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                        </select>
                                                        :

                                                        expMainhead == 'Salaries' ?
                                                            <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}  >
                                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                                <option style={{ fontSize: '13px' }} value="Blockchain Technical Lead">Blockchain Technical Lead </option>
                                                                <option style={{ fontSize: '13px' }} value={"Blockchain Engineers"}>{"Blockchain Engineers"} </option>
                                                                <option style={{ fontSize: '13px' }} value="Business Analyst">Business Analyst</option>
                                                                <option style={{ fontSize: '13px' }} value="Backend Developer">Backend Developer</option>
                                                                <option style={{ fontSize: '13px' }} value="ReactJS">ReactJS</option>
                                                                <option style={{ fontSize: '13px' }} value="ReactJS">React Native</option>
                                                                <option style={{ fontSize: '13px' }} value="Testing">Testing</option>
                                                                <option style={{ fontSize: '13px' }} value="Graphics Designer">Graphics Designer</option>
                                                                <option style={{ fontSize: '13px' }} value="Devops Engineer">Devops Engineer</option>
                                                                <option style={{ fontSize: '13px' }} value="SEO Specialist">SEO Specialist</option>
                                                                <option style={{ fontSize: '13px' }} value="HR and Office Admin">HR and Office Admin</option>
                                                                <option style={{ fontSize: '13px' }} value="Staff Welfare">Staff Welfare</option>
                                                                <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                            </select>
                                                            :
                                                            expMainhead == 'Liquidity' ?
                                                                <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}  >
                                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                                    <option style={{ fontSize: '13px' }} value="Listing Liquidity- Dex">Listing Liquidity- Dex </option>
                                                                    <option style={{ fontSize: '13px' }} value={"Listing Liquidity- Cex"}>{"Listing Liquidity- Cex"} </option>
                                                                    <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                                </select>
                                                                :


                                                                expMainhead == 'Marketing' ?
                                                                    <select className="form-control btn-block-height square-edges" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)}  >
                                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                                        <option style={{ fontSize: '13px' }} value="AMA Sessions">AMA Sessions</option>
                                                                        <option style={{ fontSize: '13px' }} value={"Blockchain Expos"}>{"Blockchain Expos"} </option>
                                                                        <option style={{ fontSize: '13px' }} value="Influencer and KOL Fees">Influencer and KOL Fees</option>
                                                                        <option style={{ fontSize: '13px' }} value="Press and Publications">Press and Publications</option>
                                                                        <option style={{ fontSize: '13px' }} value="Travel Costs">Travel Costs</option>
                                                                        <option style={{ fontSize: '13px' }} value="Marketing Consultant Fees">Marketing Consultant Fees</option>
                                                                        <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                                    </select>
                                                                    :
                                                                    <input type="text" className="form-control" defaultValue={expSubHead} onChange={(e) => setexpSubHead(e.target.value)} />
                                                }
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Expense Type :</label>
                                            <div >
                                                <select className="form-control btn-block-height square-edges" defaultValue={expType} onChange={(e) => setexpType(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option >
                                                    <option style={{ fontSize: '13px' }} value="Goods">Goods</option>
                                                    <option style={{ fontSize: '13px' }} value="Service">Service</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Enter Amount : </label>
                                            <div >
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                    <input type="number" className="form-control" style={{ width: '30%' }} onChange={(e) => setAmountValue(e.target.value)}  onWheel={(e) => e.target.blur()} />

                                                    <div style={{ width: '35%' }} >
                                                        <select className="form-control btn-block-height square-edges" onChange={(e) => setCurrencyType(e.target.value)}>
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

                                                    <input type="text" className="form-control" style={{ width: '30%' }} value={`${amountValue}  ${currencyType}`} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Paid Through :</label>
                                            <select className="form-control btn-block-height square-edges" defaultValue={paidThrough} onChange={(e) => setpaidThrough(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Bank">Bank</option>
                                                <option style={{ fontSize: '13px' }} value="Cash">Cash</option>
                                                <option style={{ fontSize: '13px' }} value="Wallet">Wallet</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Vendor Name:</label>
                                            <div  >


                                                <select className="form-control btn-block-height square-edges" onChange={(e) => setVendorId(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    {allVendordData.length > 0 && allVendordData.map((i) =>
                                                    (
                                                        <option style={{ fontSize: '13px' }} value={i?._id}>{i?.name} </option>
                                                    )
                                                    )}
                                                    {/* <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option> */}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Attach File:</label>
                                            <input type="text" className="form-control" defaultValue={attachedFile} onChange={(e)=>setattachedFile(e.target.value)} />

                                            <input type="file" className="form-control" onChange={onFileChange} /> 

                                        </div>
                                    </div> */}

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Add Link : </label>
                                            <input type="text" className="form-control" defaultValue={addLink} onChange={(e) => setaddLink(e.target.value)} />


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Comments :</label>
                                            <input type="text" className="form-control" defaultValue={comments} onChange={(e) => setcomments(e.target.value)} />


                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Bank Account Number : </label>
                                            <input readOnly='true' className="form-control" value={bankAccountNo} />


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Wallet Address :</label>
                                            <input readOnly='true' type="text" className="form-control" value={WalletAddress} />


                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>{"Attach Receipt (Upload File) :"}</label>
                                            {/* <input type="text" className="form-control" defaultValue={attachedFile} onChange={(e)=>setattachedFile(e.target.value)} /> */}
                                            {/* <input type="file" className="form-control" onChange={onFileChangeReceipt} />  */}

                                            <input type="file" className="form-control" onChange={onFileChange} />

                                        </div>
                                    </div>
                                    <div className="col-md-6">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>DRAFT</button>
                    </div> */}
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => saveExpenseDatafunc()}>SAVE</button>
                    </div>

                </Modal.Footer>








            </Modal>
        </>
    );
}

export default RecordExpenseModal;