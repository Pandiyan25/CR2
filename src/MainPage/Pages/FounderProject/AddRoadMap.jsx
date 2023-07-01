import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../config/config';


function AddRoadMap({ getUserDetailsFunc, show, handleClose }) {

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const [startDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [MainDesc, setMainDesc] = useState('')
    const [SubDes, setSubDes] = useState('')
    const [NoofworkingDays, setNoofworkingDays] = useState(0)
    const [status, setstatus] = useState('')
    const [NoofworkingDaysError, setNoofworkingDaysError] = useState(false)
    const [endDateError, setEndDateError] = useState(false)
    const [mainDescError, setMainDescError] = useState(false)
    const [subDesError, setSubDesError] = useState(false)
    const [startDateError, setstartDateError] = useState(false)

    const [statusError, setstatusError] = useState(false)
    var date = new Date();
    const datetime =

        date.getDate() +
        "-" +
        (date.getMonth() + 1) +
        "-" + date.getFullYear();


    const createTokenFunc = () => {
        if (EndDate != '' && MainDesc != '' && SubDes != '' && NoofworkingDays != '' && status != '' && startDate != '') {
            //    var date = newDate(datetime)

            try {
                var query = `
            mutation Mutation($input: RoadmapInput) {
                createProjectRoadmap(input: $input) {
                  _id
                  current_date
                  start_date
                  end_date
                  main_description
                  sub_description
                  no_of_working_days
                  status
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
                                "project": projectNumber,
                                "current_date": date,
                                "start_date": startDate,
                                "end_date": EndDate,
                                "main_description": MainDesc,
                                "sub_description": SubDes,
                                "no_of_working_days": parseInt(NoofworkingDays),
                                "status": status
                            }


                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        getUserDetailsFunc()
                        handleClose()
                    })


            } catch (error) {
                console.log("adding new projectDetail error");
            }
        } else {
            if (EndDate == '') {
                setEndDateError(true)
            } else {

                setEndDateError(false)
            }

            if (MainDesc == '') {
                setMainDescError(true)
            } else {

                setMainDescError(false)
            }
            if (SubDes == '') {
                setSubDesError(true)
            } else {

                setSubDesError(false)
            }
            if (NoofworkingDays == '') {
                setNoofworkingDaysError(true)
            } else {

                setNoofworkingDaysError(false)
            }
            if (status == '') {
                setstatusError(true)
            } else {

                setstatusError(false)
            }
            if (startDate == '') {
                setstartDateError(true)
            } else {

                setstartDateError(false)
            }
            // alert("Please fill all the mandatory fields")
        }

    }

    const noofWorkingFunc = (i) => {
        setNoofworkingDays(i)
        console.log(i, typeof (i), "noofworkibng");
        // console.log(dateth,"dateth");


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
        if (NoofworkingDays > 0) {

            dateth = addDays(i, NoofworkingDays)

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
            // datety = `${dateth.getMonth()}/${dateth.getDate()}/${dateth.getFullYear()}`
        } else {
            dateth = ''
            datety = ''
        }
        console.log(datety, dateth.getDate(), dateth.getDate().toString().length, typeof (dateth.getMonth()), "datety");
        setEndDate(datety)
    }
    const addDays = (date, days) => {
        // var result = new Date(date);
        // console.log(result.getDate(),"result. getDate()");
        // result.setDate(result.getDate() + days);
        var mainDate = new Date(date);
        var newDate = new Date(mainDate.setTime(mainDate.getTime() + days * 86400000));
        console.log(newDate, "newDate");
        return newDate;
    }

    // const  onChange={(e) => setEndDate(e.target.value)} 
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
                    <Modal.Title>Add Milestone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="row" style={{ padding: '10px' }}>
                                    {/* <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                            <label style={{width:'200px'}}>Current Date:</label>
                                            <label >03/05/2022</label>
                                        </div> */}

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Main Description  <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => setMainDesc(e.target.value)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {mainDescError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Main Description</div>
                                            : ''
                                        }
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Sub Description <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" onChange={(e) => setSubDes(e.target.value)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {subDesError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Sub Description</div>
                                            : ''
                                        }

                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Start Date<span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" onChange={(e) => startDateFunc(e.target.value)} />


                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                        {startDateError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Start Date</div>
                                            : ''
                                        }
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>No of Working Days <span className="text-danger">*</span></label>
                                        <input type="number" className="form-control" onChange={(e) => noofWorkingFunc(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {NoofworkingDaysError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter No of Working Days</div>
                                            : ''
                                        }
                                    </div>


                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>End Date</label>
                                        <input type="text" className="form-control" value={EndDate} readOnly='true' />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {endDateError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter End Date</div>
                                            : ''
                                        }
                                    </div>


                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Status  <span className="text-danger">*</span></label>

                                        {/* <div> */}
                                        <select className="form-control btn-block-height square-edges" onChange={(e) => setstatus(e.target.value)}>
                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                            <option style={{ fontSize: '13px' }} value="Completed">Completed</option>
                                            <option style={{ fontSize: '13px' }} value="Ongoing">Ongoing</option>
                                            <option style={{ fontSize: '13px' }} value="Yet_to_Start">Yet to Start</option>

                                        </select>
                                        {/* </div> */}

                                        {/* <input type="text" className="form-control" /> */}
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {statusError == true ?
                                            <div style={{ color: 'red', fontSize: '12px' }}>Please Select Status</div>
                                            : ''
                                        }
                                    </div>


                                    {/* ////////// */}



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
                        <button className="btn btn-primary submit-btn" onClick={() => createTokenFunc()}>SAVE</button>
                    </div>

                </Modal.Footer>








            </Modal>
        </>
    );
}

export default AddRoadMap;