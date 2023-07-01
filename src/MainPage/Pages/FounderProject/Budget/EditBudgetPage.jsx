import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


function EditBudgetPage({ getUserDetailsFunc, show, handleClose,
    projectNumber,
    expPerCycle,
    setexpPerCycle,
    unit,
    setunit,
    MainDesc,
    setMainDesc,
    SubDes,
    setSubDes,
    ExpFreq,
    setExpFreq,
    expCycle,
    setexpCycle,
    balance, setbalance,
    lifeTimeBudg,
    setlifeTimeBudg,
    expTillDate,
    setExptillDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    timetask,
    editId


}) {


    const createTokenFunc = () => {
        console.log("Setttt",projectNumber,expPerCycle,parseInt(expPerCycle),unit,parseInt(unit),MainDesc,SubDes,ExpFreq,parseInt(ExpFreq),expCycle,parseInt(expCycle),balance,parseInt(balance),lifeTimeBudg,parseInt(lifeTimeBudg),expTillDate,parseInt(expTillDate),startDate,endDate,timetask,status,);
        if (
            expPerCycle != '' &&
            // unit != '' &&
            MainDesc != '' && MainDesc != null &&
            SubDes != '' && SubDes != null &&
            ExpFreq != '' &&
            // expCycle != '' &&
            // balance != '' &&
            lifeTimeBudg != '' &&
            expTillDate != '' &&

            startDate != '' && startDate != null &&
            endDate != '' && endDate != null &&
            status != '' && status != null 
            // timetask != '' && timetask != null

        ) {

            try {
                var query = `
                mutation UpdateProjectBudget($id: ID, $input: BudgetInput) {
                    updateProjectBudget(_id: $id, input: $input) {
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
                            "id": editId,

                            "input": {
                                "project": projectNumber,
                                "main_expense_head": MainDesc,
                                "expense_per_cycle": parseInt(expPerCycle),
                                "sub_expense_head": SubDes,
                                "unit": parseInt(unit),
                                "expense_frequency": parseInt(ExpFreq),
                                "no_of_expense_cycle": parseInt(expCycle),
                                "life_time_budget": parseInt(lifeTimeBudg),
                                "balance": parseInt(balance),
                                "actual_expense_till_date": parseInt(expTillDate),
                                "status": status,
                                "time_task": timetask,
                                "end_date": endDate,
                                "start_date": startDate
                            }
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        console.log("gettt");

                        toast.success('Updated Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });

                        getUserDetailsFunc()
                        handleClose()
                    })


            } catch (error) {
                console.log("adding new projectDetail error",error);
            }
        } else {
            alert("Please fill all the Details")
        }


    }
    const disablePastDate = () => {
        const today = new Date(startDate);
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };



    const setStartDateFunc = (e) => {

        setStartDate(e.target.value)

        const date1 = new Date(e.target.value);
        const date2 = new Date();

        console.log(e.target.value + " e.target.value");
        console.log(date1 + " date1");
        console.log(date2 + " date2");
        const diffTime = (date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        var dateFrom = e.target.value;
        var dateTo = endDate;
        var dateCheck = new Date();
        var todayDate = dateCheck.toISOString()
        todayDate = todayDate.split('T')[0]
        console.log(dateFrom + " dateFrom");
        console.log(dateTo + " dateTo");
        console.log(todayDate + " todayDate");

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = todayDate.split("-");
        console.log(d1 + " d1");
        console.log(d2 + " d2");
        console.log(c + " c");
        // 02/05/2013
        // 2022-09-03
        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
        console.log(from + " from");
        console.log(to + " to");
        console.log(check + " check");

        console.log(check > from && check < to,"Fional")
        if(check > from && check < to){
            
            setStatus("Ongoing")
        }else if (check < from && check <= to ) {
            setStatus("Yet to Start")
        }else if(check > from && check > to){

            setStatus("Completed")
        }
    }

     
    const setEndDateFunc = (e) => {

        setEndDate(e.target.value)

        const date1 = new Date(e.target.value);
        const date2 = new Date();

        console.log(e.target.value + " e.target.value");
        console.log(date1 + " date1");
        console.log(date2 + " date2");
        const diffTime = (date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        var dateTo = e.target.value;
        var  dateFrom = startDate;
        var dateCheck = new Date();
        var todayDate = dateCheck.toISOString()
        todayDate = todayDate.split('T')[0]
        console.log(dateFrom + " dateFrom");
        console.log(dateTo + " dateTo");
        console.log(todayDate + " todayDate");

        var d1 = dateFrom.split("-");
        var d2 = dateTo.split("-");
        var c = todayDate.split("-");
        console.log(d1 + " d1");
        console.log(d2 + " d2");
        console.log(c + " c");
        // 02/05/2013
        // 2022-09-03
        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
        console.log(from + " from");
        console.log(to + " to");
        console.log(check + " check");

        console.log(check > from && check < to,"Fional")
        if(check > from && check < to){
            
            setStatus("Ongoing")
        }else if (check < from && check <= to ) {
            setStatus("Yet to Start")
        }else if(check > from && check > to){

            setStatus("Completed")
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
                    <Modal.Title>Add Budget</Modal.Title>
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
                                        <label style={{ width: '310px' }}>Main Expense Head</label>
                                        {/* <input type="text" className="form-control"  */}
                                        <div style={{ width: '300px' }}>

                                            <select className="form-control btn-block-height square-edges" value={MainDesc} onChange={(e) => setMainDesc(e.target.value)} >
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


                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Sub Expense Head</label>






                                        <div style={{ width: '300px' }} >


                                            {/* <input type="text" className="form-control" onChange={(e) => setSubDes(e.target.value)} /> */}
                                            {MainDesc == 'Administration' ?
                                                <select className="form-control btn-block-height square-edges"  value={SubDes} onChange={(e) => setSubDes(e.target.value)}  >
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

                                                MainDesc == 'Development & Listing' ?
                                                    <select className="form-control btn-block-height square-edges"  value={SubDes} onChange={(e) => setSubDes(e.target.value)}  >
                                                        <option style={{ fontSize: '13px' }} value="">Select</option>
                                                        <option style={{ fontSize: '13px' }} value="Smart Contract Audit">Smart Contract Audit </option>
                                                        <option style={{ fontSize: '13px' }} value={"Legal Fees"}>{"Legal Fees"} </option>
                                                        <option style={{ fontSize: '13px' }} value="Launchpad Fees">Launchpad Fees</option>
                                                        <option style={{ fontSize: '13px' }} value="Centralised Exchange Listing Fees">Centralised Exchange Listing Fees</option>
                                                        <option style={{ fontSize: '13px' }} value="Third Party Consultants">Third Party Consultants</option>
                                                        <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                    </select>
                                                    :

                                                    MainDesc == 'Salaries' ?
                                                        <select className="form-control btn-block-height square-edges"  value={SubDes} onChange={(e) => setSubDes(e.target.value)}  >
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
                                                        MainDesc == 'Liquidity' ?
                                                            <select className="form-control btn-block-height square-edges"  value={SubDes} onChange={(e) => setSubDes(e.target.value)}  >
                                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                                <option style={{ fontSize: '13px' }} value="Listing Liquidity- Dex">Listing Liquidity- Dex </option>
                                                                <option style={{ fontSize: '13px' }} value={"Listing Liquidity- Cex"}>{"Listing Liquidity- Cex"} </option>
                                                                <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                            </select>
                                                            :


                                                            MainDesc == 'Marketing' ?
                                                                <select className="form-control btn-block-height square-edges"   value={SubDes} onChange={(e) => setSubDes(e.target.value)}  >
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
                                                                <input type="text" className="form-control"  value={SubDes} onChange={(e) => setSubDes(e.target.value)} />
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Expense Frequency in Days </label>
                                        <input type="number" className="form-control" style={{ width: '300px' }}  value={ExpFreq} onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Expense per Cycle</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control"  value={expPerCycle} onChange={(e) => setexpPerCycle(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Life time Budget</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control"  value={lifeTimeBudg} onChange={(e) => setlifeTimeBudg(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Actual Expense till date</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control"  value={expTillDate} onChange={(e) => setExptillDate(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>No of Expense Cycle</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control"  value={expCycle} onChange={(e) => setexpCycle(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div> */}

                                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Balance Budget</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control" value={balance} onChange={(e) => setbalance(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div> */}

                                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Units/Quantity</label>
                                        <input style={{ width: '300px' }} type="number" className="form-control"  value={unit} onChange={(e) => setunit(e.target.value)} onWheel={(e) => e.target.blur()} />
                                    </div> */}

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Start Date</label>
                                        <input style={{ width: '300px' }} type="date" className="form-control" max={endDate}  value={startDate} onChange={(e) => setStartDateFunc(e)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>End Date</label>
                                        <input style={{ width: '300px' }} type="date" className="form-control" min={startDate}  value={endDate} onChange={(e) => setEndDateFunc(e)} />
                                    </div>

                                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Status</label>
                                        <input style={{ width: '300px' }} type="text" className="form-control" readOnly='true'  value={status} onChange={(e) => setStatus(e.target.value)} />
                                    </div>
                                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Time Task</label>
                                        <input style={{ width: '300px' }} type="text" className="form-control"  value={timetask} onChange={(e) => setTimetask(e.target.value)} />
                                    </div> */}
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

export default EditBudgetPage;