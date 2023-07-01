import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../config/config';


function EditRoadMap({
    MainDesc,
    SubDesc,
    NoofWorking,
    Status,
    startDate,
    endDate,
    settokenStdPer,
    getUserDetailsFunc,
    showEditPage,
    show,
    handleClose,

    setStartDate,
    setEndDate,
    setMainDesc,
    setSubDesc,
    setNoofWorking,
    updateTokenFunc,
    setStatus,
    NoofworkingDaysError,
    endDateError,
    mainDescError,
    subDesError,
    startDateError,
    statusError
}) {

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)



    console.log("adding new projectDetail error", endDate);


    const noofWorkingFunc = (i) => {
        setNoofWorking(i)
        console.log(i, typeof (i), "noofworkibng");


        var dateth = ''
        var datety = ''
        if (startDate != null && startDate != undefined && startDate != '') {

            dateth = addDays(startDate, i)
            var mon = ''
            var dat = ''
            if (dateth.getMonth().toString().length > 1) {
                mon = `${dateth.getMonth() + 1}`
            } else {
                mon = `0${dateth.getMonth() + 1}`

            }
            if (dateth.getDate().toString().length > 1) {
                dat = `${dateth.getDate()}`
            } else {
                dat = `0${dateth.getDate()}`

            }
            datety = `${mon}/${dat}/${dateth.getFullYear()}`
        } else {
            dateth = ''
            datety = ''
        }
        console.log(datety, dateth.getDate(), dateth.getDate().toString().length, typeof (dateth.getMonth()), "datety");
        setEndDate(datety)
    }


    const startDateFunc = (i) => {
        setStartDate(i)
        console.log(i, "startdate");
        var dateth = ''
        var datety = ''
        if (NoofWorking > 0) {

            dateth = addDays(i, NoofWorking)

            var mon = ''
            var dat = ''
            if (dateth.getMonth().toString().length > 1) {
                mon = `${dateth.getMonth() + 1}`
            } else {
                mon = `0${dateth.getMonth() + 1}`

            }
            if (dateth.getDate().toString().length > 1) {
                dat = `${dateth.getDate()}`
            } else {
                dat = `0${dateth.getDate()}`

            }

            datety = `${mon}/${dat}/${dateth.getFullYear()}`
        } else {
            dateth = ''
            datety = ''
        }
        console.log(datety, dateth.getDate(), dateth.getDate().toString().length, typeof (dateth.getMonth()), "datety");
        setEndDate(datety)
    }
    const addDays = (date, days) => {
        var mainDate = new Date(date);
        var newDate = new Date(mainDate.setTime(mainDate.getTime() + days * 86400000));
        console.log(newDate, "newDate");
        return newDate;
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
                    <Modal.Title>Edit Milestone</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="row" style={{ padding: '10px' }}>
                                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '200px' }}>Current Date:</label>
                                        <label >03/05/2022</label>
                                    </div> */}

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Main Description<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" defaultValue={MainDesc} onChange={(e) => setMainDesc(e.target.value)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {mainDescError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Main Description</div>
                                            : ''
                                        }
                                    </div>


                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Sub Description<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" defaultValue={SubDesc} onChange={(e) => setSubDesc(e.target.value)} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {subDesError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Sub Description</div>
                                            : ''
                                        }
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Start Date<span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" defaultValue={startDate} onChange={(e) => startDateFunc(e.target.value)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                        {startDateError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Start Date</div>
                                            : ''
                                        }
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>No of Working Days<span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" defaultValue={NoofWorking} onChange={(e) => noofWorkingFunc(e.target.value)} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {NoofworkingDaysError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter No of Working Days</div>
                                            : ''
                                        }
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>End Date<span className="text-danger">*</span></label>
                                        {/* onChange={(e) => setEndDate(e.target.value)} */}
                                        <input type="text" className="form-control" readOnly='true' value={endDate}  />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {endDateError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter End Date</div>
                                            : ''
                                        }
                                    </div>
                                    {/* ///////// */}

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Status<span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control" defaultValue={Status} onChange={(e)=>setStatus(e.target.value)} /> */}

                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={Status} onChange={(e) => setStatus(e.target.value)} >
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="Completed">Completed</option>
                                                <option style={{ fontSize: '13px' }} value="Ongoing">Ongoing</option>
                                                <option style={{ fontSize: '13px' }} value="Yet to Start">Yet to Start</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {statusError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Select Status</div>
                                            : ''
                                        }
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
                        <button className="btn btn-primary submit-btn" onClick={() => updateTokenFunc()}>SAVE</button>
                    </div>

                </Modal.Footer>








            </Modal>
        </>
    );
}

export default EditRoadMap;