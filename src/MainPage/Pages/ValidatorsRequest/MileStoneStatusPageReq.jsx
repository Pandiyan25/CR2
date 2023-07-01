import React, { useState } from 'react';
import { Button } from 'reactstrap';


const MileStoneStatusPageReq = ({data, handleClose }) => {
    

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
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {data.length > 0 && data[0]?.milestone}


                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Target Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                    {data.length > 0 && data[0]?.target_date}

                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                {data.length > 0 && data[0]?.milestone_status}
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Estimated Target/Completion Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    
                                {data.length > 0 && data[0]?.estgd}

                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Validation Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                      <Button
                                      style={{ padding: '0px ', border: '2px solid red', maxWidth: '125px', fontSize: '12px', lineHeight: '24px', minHeight: '30px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: 'red' }}
                                      >Invalidate</Button>
                                      <Button
                                      style={{ padding: '0px ', border: '2px solid green', maxWidth: '125px', fontSize: '12px', lineHeight: '24px', minHeight: '30px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: 'green' }}
                                      >Validate</Button>


                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Founder's Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    <textarea className="form-control" style={{ height: '200px', width: "620px" }} 
                                    defaultValue={data.length > 0 && data[0]?.remarks} readOnly='true' />


                                </div>
                            </div>

<div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
    <label style={{ width: '310px', marginBottom: '0px' }}>Validator's Remarks</label>
    {/* <input type="text" className="form-control"  */}
    <div style={{ width: '300px' }}>
        <textarea className="form-control" style={{ height: '200px', width: "620px" }} 
         />


    </div>
</div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Links</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '500px' }}>




                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Docs</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}


                                    {/* <Button
                                        style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }}

                                    >Upload</Button> */}

                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MileStoneStatusPageReq;
