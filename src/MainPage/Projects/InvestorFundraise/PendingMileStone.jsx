import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './InvestorPriateRound.css'


const PendingMileStone = ({ handleClose }) => {

    const [chooseMileStonedata, setChooseMileStonedata] = useState([{
        inputValue: ''
    }])

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
                                    Milestone 1


                                </div>
                            </div>
                           <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <label style={{ width: '310px', marginBottom: '0px' }}>Target Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                    12/10/2022

                                </div>
                            </div>
                           <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <label style={{ width: '310px', marginBottom: '0px' }}>Milestone Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* <select className="form-control btn-block-height square-edges" >
                                        <option style={{ fontSize: '13px' }}  >Yet_to_start</option>
                                        <option style={{ fontSize: '13px' }}  >Ongoing</option>
                                        <option style={{ fontSize: '13px' }}  >Completed</option>
                                        <option style={{ fontSize: '13px' }}  >Overdue</option>
                                    </select> */}
                                </div>
                            </div>
                           <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <label style={{ width: '310px', marginBottom: '0px' }}>Estimated Target/Completion Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    <input type="date" className="form-control" style={{ width: '300px' }} />


                                </div>
                            </div>


                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Founder's Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    <textarea className="form-control" style={{ height: '200px', width: "620px" }} />


                                </div>
                            </div>
                           <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <label style={{ width: '310px', marginBottom: '0px' }}>Update Links</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '500px' }}>

                                    {chooseMileStonedata.map((i, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                            <input className="form-control" style={{ width: '300px' }} value={i?.inputValue} onChange={(e) => changeInputValueFunc(e.target.value, index)} />
                                            <div style={{ height: '100%' }}>
                                                <div className="" style={{ textAlign: 'center', justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
                                                    <button className="btn btn-primary submit-btn"
                                                        style={{
                                                            minWidth: '44px',
                                                            fontSize: '30px',
                                                            padding: '5px',
                                                            height: '35px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 'bolder',
                                                            marginRight: '10px',
                                                            marginLeft: '20px'
                                                        }} onClick={() => dleteColumnMileStone(index)}>-</button>
                                                    {/* </div>
                                                    <div className="" style={{ textAlign: 'center', marginRight: '15px' }}> */}
                                                    <button className="btn btn-primary submit-btn" style={{
                                                        minWidth: '44px',
                                                        fontSize: '30px',
                                                        padding: '5px',
                                                        height: '35px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bolder'
                                                    }} onClick={() => addColumnMileStone(index)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                    }



                                </div>
                            </div>

                           <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                         <label style={{ width: '310px', marginBottom: '0px' }}>Update Docs</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}


                                    <Button
                                        style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}

                                    >Upload</Button>

                                </div>
                            </div>



                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    <textarea className="form-control" style={{ height: '150px', width: "620px" }} />


                                </div>
                            </div>


                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                        <button className="btn btn-primary submit-btn" >Reject</button>
                                    </div>
                                    <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                        <button className="btn btn-primary submit-btn" >Approve</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PendingMileStone;
