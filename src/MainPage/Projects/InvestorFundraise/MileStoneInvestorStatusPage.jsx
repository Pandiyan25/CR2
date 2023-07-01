import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { apiURI } from '../../../config/config';
import './InvestorPriateRound.css'
import { validateMilestone } from '../../../config/web3Round';
import { async } from 'regenerator-runtime';


const MileStoneInvestorStatusPage = ({ mileStoneId, handleClose, getFundingRound }) => {

    const loginId = useSelector((state) => state.constVar.loginId)
    const [MileStone, setMileStone] = useState('')
    const [TargetDate, setTargetDate] = useState('')
    const [Percentage, setPercentage] = useState('')
    const [ValidationStatus, setValidationStatus] = useState('')
    const [MileStoneStatus, setMileStoneStatus] = useState('')
    const [Fund, setFund] = useState('')
    const [EstTargetDate, setEstTargetDate] = useState('')
    const [Remarks, setRemarks] = useState('')
    const [InvestorRemarks, setInvestorRemarks] = useState('')
    const [Docs, setDocs] = useState([])
    const [UpdateLink, setUpdateLink] = useState([])

    const [chooseMileStonedata, setChooseMileStonedata] = useState([{
        inputValue: ''
    }])
    const [RoundId, setRoundId] = useState(0)
    const [MilestoneNum, setMilestoneNum] = useState(0)
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const changeInputValueFunc = (value, i) => {

        var arrayObj = chooseMileStonedata
        arrayObj[i].inputValue = value
        setChooseMileStonedata(
            arrayObj
        )
    }
    const dleteColumnMileStone = (i) => {
        if (chooseMileStonedata.length > 1) {

            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);

            setChooseMileStonedata(filteredPeople)
        } else {
            alert("There should be atleast one MileStone")
        }
    }


    const addColumnMileStone = (i) => {
        var newData = {
            "inputValue": "",

        }
        setChooseMileStonedata(
            [
                ...chooseMileStonedata,
                newData
            ])


    }

    const getMileStoneData = () => {
        try {

            var query = `
            query GetMilestone($id: ID) {
                getMilestone(_id: $id) {
                _id
                milestone_blockchain_id
                fundraise {
                    fundraise_blockchain_id
                    _id
                }
                milestone
                target_date
                percentage
                validation_status
                milestone_status
                blocked_status
                funds
                estimated_target_date
                remarks
                  withdrawn_status
                  update_link {
                    value
                  }
                  investor_remarks
                  update_doc {
                    filename
                    filepath
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
                        "id": mileStoneId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.getMilestone != null && data?.data?.getMilestone != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        setMileStone(data?.data?.getMilestone.milestone)
                        if (data?.data?.getMilestone.target_date) {
                            var tar = data?.data?.getMilestone.target_date.split('T')[0]
                            setTargetDate(tar)
                        } else {

                            setTargetDate(data?.data?.getMilestone.target_date)
                        }
                        setInvestorRemarks(data?.data?.getMilestone.investor_remarks)
                        setPercentage(data?.data?.getMilestone.percentage)
                        setValidationStatus(data?.data?.getMilestone.validation_status)
                        setMileStoneStatus(data?.data?.getMilestone.milestone_status)
                        setFund(data?.data?.getMilestone.funds)
                        if (data?.data?.getMilestone.estimated_target_date) {
                            var tarw = data?.data?.getMilestone.estimated_target_date.split('T')[0]
                            setEstTargetDate(tarw)
                        } else {

                            setEstTargetDate(data?.data?.getMilestone.estimated_target_date)
                        }
                        setUpdateLink(data?.data?.getMilestone.update_link)
                        setRemarks(data?.data?.getMilestone.remarks)
                        setDocs(data?.data?.getMilestone.update_doc)
                        setRoundId(data?.data?.getMilestone?.fundraise?.fundraise_blockchain_id)
                        setMilestoneNum(data?.data?.getMilestone?.milestone_blockchain_id)
                    } else {
                        setMileStone('')
                        setTargetDate('')
                        setPercentage('')
                        setValidationStatus('')
                        setMileStoneStatus('')
                        setFund('')
                        setEstTargetDate('')
                        setRemarks('')


                    }

                })


        } catch (err) {
            console.log(err);
        }

    }



    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }


    useEffect(() => {
        if (loginId != '') {
            getMileStoneData()
        }
        console.log(loginId);

    }, [loginId])



    const rejectMileStone = () => {



        var query = `
        mutation UpdateMilestone($id: ID, $input: MilestoneInput) {
            updateMilestone(_id: $id, input: $input) {
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
                    "id": mileStoneId,
                    "input": {
                        "validation_status": 'Rejected',
                        "investor_remarks": InvestorRemarks
                        // "milestone_status": 'Accepted',
                    }
                }

            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(data => {
                // console.log('getFounderUserDetails', data?.data?.allProjects);
                if (data?.data?.updateMilestone != null && data?.data?.updateMilestone != undefined) {
                    // dispatch(projectId(data?.data?.allProjects[0]._id))

                    getFundingRound()
                    handleClose()
                }

            })




    }

    const approvedStatusFunc = () => {



        var query = `
        mutation UpdateMilestone($id: ID, $input: MilestoneInput) {
            updateMilestone(_id: $id, input: $input) {
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
                    "id": mileStoneId,
                    "input": {
                        "validation_status": 'Approved',
                        "investor_remarks": InvestorRemarks,
                        "withdrawn_status": "withdraw"
                        // "milestone_status": 'Accepted',
                    }
                }

            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(data => {
                // console.log('getFounderUserDetails', data?.data?.allProjects);
                if (data?.data?.updateMilestone != null && data?.data?.updateMilestone != undefined) {
                    // dispatch(projectId(data?.data?.allProjects[0]._id))

                    getFundingRound()
                    handleClose()
                }

            })




    }
    const updateWeb2ValidationStatus = async (status) => {
        if (status) {
            return approvedStatusFunc()
        } else {
            return rejectMileStone()
        }
    }

    const updateMilestoneValidationStatus = async (status) => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('calling validateMilestone: ', userData.provider, wallet_address, MilestoneNum, RoundId, status);
            validateMilestone(userData.provider, wallet_address, MilestoneNum, RoundId, status)
            .then((resp) => {
                console.log('called validateMilestone: ', resp);
                console.log('updating milestone record with status: ', status);
                if (status) {
                    return approvedStatusFunc()
                } else {
                    return rejectMileStone()
                }
            })
            .then((resp) => {
                console.log('updated milestone record', resp);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            })
        } else {
            alert("Please connect to Metamask or Coinbase wallet");
        }
    }

    return (
        <div className="col-md-12">

            <div className="row">
                <div className="row">

                    <div className="col-md-12" style={{ padding: '0px' }}>


                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                            <div className="col" style={{ padding: '0px' }}>
                                {/* mt-4 */}
                                <div className="search mb-2">

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Milestone Status Update</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">

                    <div className="col-md-12">
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {MileStone}


                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Target Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                    {TargetDate}

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* <select className="form-control btn-block-height square-edges" >
                                        <option style={{ fontSize: '13px' }}  >Completed</option>
                                    </select> */}
                                    {/* {MileStoneStatus} */}

                                    {MileStoneStatus == 'Completed' ?
                                        // border: '2px solid green',
                                        <div style={{ color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                            {/* Validated */}
                                            {MileStoneStatus}
                                        </div>
                                        :
                                        MileStoneStatus == 'Ongoing' ?
                                            // border: '2px solid red', 
                                            <div style={{ color: '#ffe510', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                {/* Validated */}
                                                {MileStoneStatus}
                                            </div>

                                            :

                                            MileStoneStatus == 'Overdue' ?
                                                // border: '2px solid red', 
                                                <div style={{ color: 'red', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                    {/* Validated */}
                                                    {MileStoneStatus}
                                                </div>

                                                :
                                                // border: '2px solid  #ffe510', 
                                                <div style={{ color: ' #1890ff', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                    {/* Validated */}
                                                    {MileStoneStatus}
                                                </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Estimated Target/Completion Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="date" className="form-control" style={{ width: '300px' }} /> */}

                                    {EstTargetDate}
                                </div>
                            </div>


                            <div className="col-md-12 form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Founder's Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* <textarea className="form-control" style={{ height: '200px', width: "620px" }} /> */}
                                    {Remarks}

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Links</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '500px' }}>

                                    {UpdateLink.map((i, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', textDecoration: 'underline', color: '#6345ED', cursor: 'pointer' }} onClick={() => opennewWindow(i?.value)}>
                                            {i?.value}
                                        </div>
                                    ))

                                    }



                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Docs</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {Docs.length > 0 ?
                                        Docs.map((i) => (
                                            <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'underline', color: '#6345ED', cursor: 'pointer' }} onClick={() => opennewWindow(i?.filepath)}>
                                                {i?.filename}
                                            </div>
                                        ))
                                        :
                                        ''
                                    }
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}


                                    {/* <Button
                                        style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}

                                    >Upload</Button> */}

                                </div>
                            </div>



                            <div className="col-md-12  form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {ValidationStatus == 'Approved' || ValidationStatus == 'Rejected' ?
                                        InvestorRemarks
                                        :
                                        <textarea className="form-control" style={{ height: '150px', width: "620px" }} value={InvestorRemarks} onChange={(e) => setInvestorRemarks(e.target.value)} />

                                    }


                                </div>
                            </div>


                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                                {(  (ValidationStatus == 'Approved' || ValidationStatus == 'Rejected')) ?
                                    ''
                                    :
                                    MileStoneStatus  == 'Completed' ? 

                                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                            <button className="btn btn-primary submit-btn" onClick={() => 
                                                // updateMilestoneValidationStatus(false)
                                                updateWeb2ValidationStatus(false)
                                                }>Reject</button>
                                        </div>
                                        <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                            <button className="btn btn-primary submit-btn" onClick={() => 
                                            // updateMilestoneValidationStatus(true)
                                                updateWeb2ValidationStatus(true)
                                            }>Approve</button>
                                        </div>
                                    </div>
                                    :
                                    ''

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MileStoneInvestorStatusPage;
