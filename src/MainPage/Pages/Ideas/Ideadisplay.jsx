import "./ideadisplay.css"
import React, { useState, useEffect, useMemo } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Button, Modal, } from "react-bootstrap";
import idea from "./idea.png"
const IdeaDisplay = ({ showideaDisplay,
    handleCloseIdeaDisplay,
    currentIdeaData,
    updateIdea,
    setdraftstatus,
    setcurrentIdeaId,
    draftstatus,

}) => {


    console.log(currentIdeaData, "1234 inside display comp")

    const postReview = async () => {
        setdraftstatus(false);
        console.log("post review called", draftstatus)
        await updateIdea();
        alert("Idea submitted successfully")
        handleCloseIdeaDisplay();
    }


    return (

        <Modal
            show={showideaDisplay}
            onHide={handleCloseIdeaDisplay}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            <Modal.Body style={{ padding: "0px", height: "auto" }}>
                {/* <form> */}
                <div className="card" >
                    <div className="card-body" >
                        <div className="mb-0"><button type='button' className='close' onClick={() => { handleCloseIdeaDisplay() }}>x</button>
                        </div>
                        <div className='row'>

                            <div className='col-12'>
                                <h2 className='' style={{ textAlign: "center", fontSize: "20px", marginBottom: "40px" }}>Your Idea</h2>
                            </div>
                            <div className="col-2">
                                <div className="imgdividea">
                                    <img src={currentIdeaData?.data?.getIdea?.idea_logo} style={{ width: "100%",height:"100%", borderRadius: "50%" }}></img>
                                </div>
                            </div>
                            <div className="col-4">
                                <p className='mb-1 head '>Idea Name</p>
                                <p className='mb-2 detail name'>{currentIdeaData?.data?.getIdea?.idea_name}</p>
                                <p className='mb-1 head'>Your Idea in one line</p>
                                <p className='mb-3 detail'>{currentIdeaData?.data?.getIdea?.one_line_desc}</p>
                                <div className="row">
                                    <div className="col-6 mr-2">
                                        <p className='mb-1 head'>Category</p>
                                        <div style={{ display: "flex" }}>
                                        {currentIdeaData?.data?.getIdea?.category?.slice(0, 3).map((i) => (
  <p className='mb-4 mr-2 project-nature cs'>{i?.value}</p>
))}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <p className='mb-1 head'>Product type (B2B OR B2C)</p>
                                        <p className='mb-3 project-nature cs'>{currentIdeaData?.data?.getIdea?.product_type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <p className='mb-2 head'>White Paper </p>
                                        {currentIdeaData?.data?.getIdea?.isWhitepaper == true ?
                                        <a href={currentIdeaData?.data?.getIdea?.whitepaper_link} target="_blank" className='mb-2 detail'>Whitepaper</a>
                                        :
                                        <p className='mb-2 detail'>No</p>
                                        }
                                        
                                    </div>
                                    <div className="col-6 mb-2">
                                    <p className='mb-2 head'>Pitch Deck </p>
                                        {currentIdeaData?.data?.getIdea?.isPitchdeck == true ?
                                        <a href={currentIdeaData?.data?.getIdea?.pitchdeck_link} target="_blank" className='mb-2 detail'>Pitchdeck</a>
                                        :
                                        <p className='mb-2 detail'>No</p>
                                        }
                                    </div>
                                    <div className="col-6 mb-2">

                                        <p className='mb-2 head'>Revenue Model</p>
                                        {currentIdeaData?.data?.getIdea?.isRevenueModel?<p className='mb-2 detail'>Yes</p>:<p className='mb-2 detail'>No</p>}
                                        
                                    </div>
                                    <div className="col-6 mb-2">
                                        <p className='mb-2 head'>Product Live</p>
                                        {currentIdeaData?.data?.getIdea?.isProductLive?<p className='mb-2 detail'>Yes</p>:<p className='mb-2 detail'>No</p>}
                                    </div>
                                    <div className="col-6 mb-2">
                                        <p className='mb-2 head'>Competition</p>
                                        {currentIdeaData?.data?.getIdea?.competition_links?.map((i) => (
                                                 <p className='mb-2 detail'>{i}</p>))}
                                    </div>
                                    <div className="col-6 mb-2">
                                        <p className='mb-2 head'>Target Customers</p>
                                        {currentIdeaData?.data?.getIdea?.target_customers?.map((i) => (
                                                 <p className='mb-2 detail'>{i}</p>))}
                                    </div>
                                </div>
                            </div>
                            <hr style={{ height: "10px" }}></hr>
                        </div>
                        <div className='row ' style={{ marginTop: "50px" }}>
                            <div className='col-6'>
                                <p className='mb-2 head'>Your Problem Statement</p>
                                {currentIdeaData?.data?.getIdea?.problem_statement?.map((i) => (
                                                 <p className='mb-4 detail'>{i}</p>))}
                               
                                <p className='mb-2 head'>Your solution</p>
                                {currentIdeaData?.data?.getIdea?.problem_solution?.map((i) => (
                                                 <p className='mb-4 detail'>{i}</p>))}
                            </div>
                            <div className='col-6'>
                                <p className='mb-2 head'>Why better than other Competition</p>
                                {currentIdeaData?.data?.getIdea?.competition_reason?.map((i) => (
                                                 <p className='mb-4 detail'>{i}</p>))}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-12">
                                <div style={{ textAlign: "center" }}>
                                    {currentIdeaData?.data?.getIdea?.draft_status == true ?
                                        <button className="routeButton" onClick={() => { postReview() }} style={{
                                            borderRadius: '0px 5px 5px 0px',
                                            fontSize: '13px',
                                            height: "44px",
                                            background:"linear-gradient(90deg,#6345ED,#DC39FC)",
                                            border:"0px"

                                        }}>
                                            Submit
                                        </button> : ""}
                                </div></div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default IdeaDisplay;
