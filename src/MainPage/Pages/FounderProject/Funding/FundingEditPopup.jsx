import React, { useState, useEffect } from 'react';

import { Button, Modal, } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';

import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

function FundingEditPopup({
    FundingId,
    investor, setInvestor,
    pricePerToken, setpricePerToken,
    Investment, setInvestment,
    round, setRound,
    leadIEdit,
    setleadIEdit,

    extenalInvesName,
    setExtenalInvesName,
    tokenAlloted, setTokenAlloted,
    perOfSupply, setperOfSupply,
    website, setWebsite,
    category, setCategory,
    show,
    handleClose,
    getFundingDataFunc
}) {

    const loginId = useSelector((state) => state.constVar.loginId)
    const [getIvestData, setgetIvestData] = useState([])
    const projectNumber = useSelector((state) => state.constVar.projectId)
    const [tokenSupply, settokenSupply] = useState('')

    const saveData = () => {
        try {
            var query = `
            mutation UpdateProjectFundingData($id: ID, $input: FundingDataInput) {
                updateProjectFundingData(_id: $id, input: $input) {
                  _id
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
                        "id": FundingId,
                        "input": {
                            "investor": investor,
                            "investment_round": round,
                            "price_per_token": parseFloat(pricePerToken),
                            "investment": Investment.toString(),
                            "tokens_alloted": parseFloat(tokenAlloted),
                            "percentage_of_supply": parseFloat(perOfSupply),
                            "website": website,
                            "category":category,
                            "project": projectNumber,
                            "external_investor":extenalInvesName
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.updateProjectFundingData != null && data?.data?.updateProjectFundingData != undefined) {
                        getFundingDataFunc()

                        toast.success('Updated Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        handleClose()
                        setRound(0)
                        setInvestment(0)
                        setTokenAlloted(0)
                        setperOfSupply(0)
                        setWebsite('')
                        setCategory('')
                        setpricePerToken(0)
                        setInvestor('')


                    } else {
                        getFundingDataFunc()
                        setRound(0)
                        setInvestment(0)
                        setTokenAlloted(0)
                        setperOfSupply(0)
                        setWebsite('')
                        setCategory('')
                        setpricePerToken(0)
                        setInvestor('')
                        handleClose()
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }


    const getInvestorDetails = () => {
        try {
            var query = `
            query Query($role: String, $user: ID, $project: ID) {
                allUsers(role: $role, user: $user) {
                  email
                  _id
                  role
                  first_name
                  last_name
                  fund_name
                }
                 allTokenomics :allTokenomics(project: $project) {
                    _id
                    
                   total_token_supply
                    
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
                        "user": loginId,
                        
                        "project": projectNumber
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    setgetIvestData(data?.data?.allUsers)
                    if (data?.data?.allTokenomics != null && data?.data?.allTokenomics != undefined && data?.data?.allTokenomics.length > 0) {
                        settokenSupply(data?.data?.allTokenomics[0].total_token_supply)
                    }
                })

        } catch (error) {
            console.log(error, "error in InitalProposal Create");
        }
    }



    useEffect(() => {
        if (projectNumber != '') {
            getInvestorDetails()
        }

    }, [projectNumber])

    const setExternalFunc = (i) =>{
        setInvestor(null)
        setExtenalInvesName(i)
    }
    const setInvestorfunc = (e) =>{
        if(e == 'other'){
            setleadIEdit(false)
        }else{
        setInvestor(e)
        setExtenalInvesName('')
        setleadIEdit(true)
        }
    }

    const handleCloseInputFunc = () =>{
        setleadIEdit(true)
    }


    
    const setInvestmentFunc = (value) => {
        var mainValue = 0
        if (value != null && value != undefined) {

            mainValue = parseFloat(value)
        } else {

            mainValue = 0
        }
        console.log(value, typeof (value), mainValue, pricePerToken, typeof (pricePerToken), "value");
        setInvestment(mainValue)
        var perValue = 0

        if (pricePerToken > 0 && mainValue != null && mainValue != undefined) {
            // if(pricePerToken > 0){
            perValue = mainValue / pricePerToken
        } else {
            perValue = 0
        }

        setTokenAlloted(perValue)

        var tknSupply = 0;
        var tokenSupplyData =parseFloat(tokenSupply)
        

        if (tokenSupplyData != null && tokenSupplyData != undefined && tokenSupplyData > 0) {
            tknSupply = ((perValue / tokenSupplyData)*100)
        }else{
            tknSupply = 0
        }

        setperOfSupply(tknSupply)
    }

    const setPricePerTokenFunc = (value) => {
        var mainValue = 0
        if (value != null && value != undefined) {

            mainValue = parseFloat(value)
        } else {

            mainValue = 0
        }
        // mainValue = parseFloat(value)
        console.log(mainValue, typeof (mainValue), Investment, typeof (Investment), "value");
        setpricePerToken(mainValue)
        var perValue = 0

        if (Investment > 0 && mainValue != null && mainValue != undefined) {
            perValue = Investment / mainValue
        } else {
            perValue = 0
        }

        setTokenAlloted(perValue)

        
        console.log(tokenSupply,typeof(tokenSupply),"tokenSupply");
        var tknSupply = 0;
        var tokenSupplyData =parseFloat(tokenSupply)
        

        if (tokenSupplyData != null && tokenSupplyData != undefined && tokenSupplyData > 0) {
            // tknSupply = perValue/tokenSupplyData
            tknSupply = ((perValue / tokenSupplyData)*100)
        }else{
            tknSupply = 0
        }

        setperOfSupply(tknSupply)


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
                    <Modal.Title>Funding</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Investor</label><div>

                                                {leadIEdit == true ?
                                                    <select className="css-1s2u09g-control" defaultValue={investor} onChange={(e) => setInvestorfunc(e.target.value)}>
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        
                                                        {getIvestData?.length > 0 && getIvestData.filter(i => i.fund_name != null).map((i) => (

                                                            <option style={{ fontSize: '13px' }} value={i?._id} >{i?.fund_name}</option>
                                                        ))}
                                                        <option style={{ fontSize: '13px' }} value={'other'} >other</option>
                                                    </select>

                                                    :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        {/*  */}
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={extenalInvesName} onChange={(e) => setExternalFunc(e.target.value)} />
                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '22px',
                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                        }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                    </div>
                                                }



                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Price Per Token</label>
                                            <input type="number" className="form-control" defaultValue={pricePerToken} onChange={(e) => setPricePerTokenFunc(e.target.value)} onWheel={(e) => e.target.blur()} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Investment</label>
                                            <input type="number" className="form-control" defaultValue={Investment} onChange={(e) => setInvestmentFunc(e.target.value)} onWheel={(e) => e.target.blur()} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Round</label>
                                            
                                            <div>
                                                <select className="css-1s2u09g-control" defaultValue={round} onChange={(e) => setRound(e.target.value)}  >
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="Preseed">Preseed</option>
                                                    <option style={{ fontSize: '13px' }} value="Seed">Seed</option>
                                                    <option style={{ fontSize: '13px' }} value="Strategic Round">Strategic Round</option>
                                                    <option style={{ fontSize: '13px' }} value="Private Round">Private Round</option>
                                                    <option style={{ fontSize: '13px' }} value="Series A">Series A</option>
                                                    <option style={{ fontSize: '13px' }} value="Series B">Series B</option>
                                                    <option style={{ fontSize: '13px' }} value="others">others</option>
                                                </select>
                                            </div>
                                            {/* <input type="number" className="form-control" defaultValue={round} onChange={(e) => setRound(e.target.value)} onWheel={(e) => e.target.blur()} /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Token Alloted </label>
                                            {/* <input type="text" className="form-control" /> */}

                                            <input type="number" readOnly='true' className="form-control" defaultValue={tokenAlloted} onChange={(e) => setTokenAlloted(e.target.value)} onWheel={(e) => e.target.blur()} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Percentage of Supply </label>
                                            <input type="number" readOnly='true' className="form-control" value={perOfSupply}
                                                onChange={(e) => setperOfSupply(e.target.value)}
                                                onWheel={(e) => e.target.blur()}
                                            />
                                        </div>
                                    </div>

                                    {/*                                   
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Project</label>
                                            <div>
                                                <select className="css-1s2u09g-control">
                                                    <option style={{ fontSize: '13px' }} value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Website </label>
                                            <input type="text" className="form-control" value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                            />
                                            {/* <input type="text" className="form-control" /> */}
                                        </div>
                                    </div>
                                                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Category </label>
                                            <select className="css-1s2u09g-control" defaultValue={category}
                                                onChange={(e) => setCategory(e.target.value)}>                                         
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Angel Investor">Angel Investor</option>
                                                <option style={{ fontSize: '13px' }} value="CEX">CEX</option>   
                                                <option style={{ fontSize: '13px' }} value="Venture Capital">Venture Capital</option>
                                                <option style={{ fontSize: '13px' }} value="Family Office">Family Office</option>
                                                <option style={{ fontSize: '13px' }} value="Grants">Grants</option>   
                                                <option style={{ fontSize: '13px' }} value="Incubator">Incubator</option>
                                                <option style={{ fontSize: '13px' }} value="Corporate Investors">Corporate Investors</option>
                                                <option style={{ fontSize: '13px' }} value="Investment DAO">Investment DAO</option>   
                                                <option style={{ fontSize: '13px' }} value="Decentralised VC">Decentralised VC</option>
                                                <option style={{ fontSize: '13px' }} value="Syndicate">Syndicate</option>
                                            </select>
                                            {/* <input type="text" className="form-control" value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            /> */}
                                            {/* <input type="text" className="form-control" /> */}
                                        </div>
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

                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => saveData()}>SAVE</button>
                    </div>



                </Modal.Footer>





                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />



            </Modal>
        </>
    );
}

export default FundingEditPopup;