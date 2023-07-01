
import React, { useEffect, useState } from 'react';
import PaymentEditModal from './PaymentsEditModal';

import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import PaymentUpdateModal from './PaymentUpdateModal';

const PaymentPage = () => {
    const [show, setShow] = useState(false)
    const [checkData, setcheckData] = useState('')
    const [primaryCurrency, setprimaryCurrency] = useState('')
    const [Coin, setCoin] = useState('')
    const [bankName, setbankName] = useState('')
    const [bankAccountnum, setbankAccountnum] = useState('')
    const [location, setlocation] = useState('')
    const [network, setnetwork] = useState('')
    const [address, setaddress] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    
    const handleShow = () => {
        if(checkData != ''){
            setShowEdit(true)
        }else{
            
            setShow(true)
        }
    }
    
    const loginId = useSelector((state) => state.constVar.loginId)
    const handleCloseShow = () => {
        getUserDetailsFunc()
        setShow(false)
    }
    const handleCloseShowEdit = () => {
        getUserDetailsFunc()
        setShowEdit(false)
    }
    const getUserDetailsFunc = () => {
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
                    coin
                    location
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
                    if(data?.data?.getpayment != null && data?.data?.getpayment != undefined){
                        setcheckData(data?.data?.getpayment._id)
                        setprimaryCurrency(data?.data?.getpayment?.primary_currency)
                        setCoin(data?.data?.getpayment?.coin)
                        setbankName(data?.data?.getpayment?.bank_name)
                        setbankAccountnum(data?.data?.getpayment?.account_number)
                        setlocation(data?.data?.getpayment?.location)
                        setnetwork(data?.data?.getpayment?.wallet_network)
                        setaddress(data?.data?.getpayment?.wallet_address)
                    }else{
                        setcheckData('')
                    }
                    // dispatch(projectId(data?.data?.createProject[0]._id))
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }

    }

      
    const updatePaymentDetailsFunc = () => {
        try {
            var query = `
            mutation UpdatePayment($input: PaymentInput, $id: ID) {
                updatePayment(input: $input, _id: $id) {
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
                            "input": {
                              "primary_currency": primaryCurrency,
                              "bank_name": bankName,
                              "wallet_address": address,
                              "user": loginId,
                              "account_number": bankAccountnum,
                              "wallet_network": network,
                              "coin": Coin,
                              "location":location
                            },
                            "id": checkData
                          


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // if()
                    console.log(data?.data?.updatePayment);
                    getUserDetailsFunc()
                    // dispatch(projectId(data?.data?.createProject[0]._id))
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }

    }
    useEffect(() => {
        if (loginId != '') {
            getUserDetailsFunc()
        }

    }, [loginId])


    return (


        <div className="card-body" style={{ padding: '10px' }}>

            <div className="col-md-12" style={{ padding: '0px' }}>
                <div className="profile-view" style={{ margin: '10px' }}>


                    <h3 className="card-title">Payments</h3>
                    <div className="">
                        <table style={{ width: '100%',border:'none' ,marginBottom:'10px'}}>
                            <tbody>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Primary Currency:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{primaryCurrency != null && primaryCurrency != undefined && primaryCurrency}</td>
                                </tr>
                                <tr>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Coin:</td>
                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Coin != null && Coin != undefined && Coin}</td>
                                </tr>

                                <tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <h3 className="card-title">Bank Details:</h3>

                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' ,width:'65%'}}>

                            <div className="">
                                <table style={{ width: '100%',border:'none' ,marginBottom:'10px'}}>
                                    <tbody>
                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px',fontSize:'16px',fontWeight:'600',color:'#6345ED' }}>Bank Name:</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px',fontSize:'16px',fontWeight:'600'}}>{bankName != null && bankName != undefined && bankName}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' ,fontSize:'16px',fontWeight:'600',color:'#6345ED' }}>Account Number:</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px',fontSize:'16px',fontWeight:'600' }} >{bankAccountnum != null && bankAccountnum != undefined && bankAccountnum}</td>
                                        </tr>

                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%',fontSize:'16px',fontWeight:'600',color:'#6345ED'  }}>Location:</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px',fontSize:'16px',fontWeight:'600' }} >{location != null && location != undefined && location}</td>
                                        </tr>

                                        <tr>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>


                    <h3 className="card-title" style={{marginTop:'30px'}}>Wallet Address:</h3>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' ,width:'65%' }}>

                        {/* <div className="row" style={{ marginBottom: '20px' }}> */}
                            <div className="">
                                <table style={{ width: '100%',border:'none',marginBottom:'10px' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' ,fontSize:'16px',fontWeight:'600',color:'#6345ED' }}>Network:</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px',fontSize:'16px',fontWeight:'600' }} >{network != null && network != undefined && network}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%',fontSize:'16px',fontWeight:'600',color:'#6345ED'  }}>Wallet Address:</td>
                                            <td style={{ wordSpacing: 'normal', padding: '10px 0px' ,fontSize:'16px',fontWeight:'600'}} >{address != null && address != undefined && address}</td>
                                        </tr>

                                        <tr>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        {/* </div> */}

                    </div>
                    <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                </div>
            </div>
            <PaymentUpdateModal
             show={showEdit} 
            address={address} 
            setaddress={setaddress}
            network={network}
            setnetwork={setnetwork}
            location={location}
            setlocation={setlocation}
            bankAccountnum={bankAccountnum}
            setbankAccountnum={setbankAccountnum}
            bankName={bankName}
            setbankName={setbankName}
            primaryCurrency={primaryCurrency}
            setprimaryCurrency={setprimaryCurrency}
            setCoin={setCoin}
            Coin={Coin}
            handleClose={handleCloseShowEdit}
            updatePaymentDetailsFunc={updatePaymentDetailsFunc}
              />
            <PaymentEditModal checkData={checkData} show={show} handleClose={handleCloseShow} getUserDetailsFunc={getUserDetailsFunc}  />
        </div>


    );
}
export default PaymentPage;
