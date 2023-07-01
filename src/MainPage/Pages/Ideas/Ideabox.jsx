
import "./idealist.css"
import React, { useState, useEffect, useMemo } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import idea from "./idea.png"
import Editicon from "./edit-id.png"
import Delete from "./delete-id.png"
import View from "./view.png"
import Creative from "./creative.png"
import overalrating from "./overall-rating.png"
import reviewreceived from "./reviews-received.png"


import { useSelector, useDispatch } from 'react-redux';
import { currentIdeaId } from "../../../reducers/ConstantSlice"
import { useHistory, useNavigate } from "react-router-dom";


const Ideabox = ({ i,
    index,
    handleOpenIdeaDisplay,
    getCurrentIdea,
    setdraftstatus,
    handleShow,
    edit,
    setedit,
    deleteIdea,
    updateIdea,
    setmakelivepopup
}) => {

    let history = useHistory()
    const dispatch = useDispatch();

    const makeLive =() =>{
        getCurrentIdea(i?._id);
        
        setmakelivepopup(true)
    
        // updateIdea(true,i?._id);
    }

    const viewIdea = () => {

        console.log("clicked", i?._id)
        getCurrentIdea(i?._id);
        handleOpenIdeaDisplay();
        setdraftstatus(false);
        
    }
    const editIdea = async () => {
if(i?.draft_status===true)
{
    setdraftstatus(true)
}
else{
    setdraftstatus(false)
}
        setedit(true);

        console.log("clicked", i?._id)
        await getCurrentIdea(i?._id);
        // setdraftstatus(true);
        handleShow();


    }
    const viewReview = () => {

        console.log("clicked", i?._id)
        dispatch(currentIdeaId(i?._id));
        history.push("/Ideareview")


    }
    const deleteCurrent = () => {
        deleteIdea(i?._id);
    }

    return (

        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
            <div className="slider-item mb-4" >
                <div className="sc-product-item">
                    <div className="row">
                        <div className="col-12">
                            <div>
                                {/* <button className="sc-button style-2" style={{float:"right",fontSize:"12px",cursor:"pointer"}} onClick={() => viewIdea()}>View</button> */}
                                {i.draft_status == true ? <img src={Delete} style={{ float: "right", width: "30px", marginRight: "5px", cursor: "pointer" }} onClick={() => deleteCurrent()} /> : <></>}
                                {i.draft_status == true ? <img src={Editicon} style={{ float: "right", width: "30px", marginRight: "5px", cursor: "pointer" }} onClick={() => editIdea()} /> : <img src={Editicon} style={{ float: "right", width: "30px", marginRight: "5px", cursor: "pointer" }} onClick={() => editIdea()} />}

                                <div onClick={() => viewReview()}>
                                    <img src={View} style={{ width: '32px', float: "right", cursor: "pointer", marginRight: "5px" }} ></img>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="product-content" >
                        <div className="product-author flex">
                            <div className="ideaicon">
                                {i?.idea_logo == "" ?
                                    <img src={Creative} /> :
                                    <img src={i?.idea_logo} />
                                }
                            </div>
                        </div>
                        <div className="product-price">
                            <div className="title" style={{ cursor: "pointer", height: "40px" }} >
                                <h5 className="title-idea">{i?.idea_name}</h5>
                            </div>
                            <p className="para-guardian cs mb-2">{i?.one_line_desc}...</p>
                            {/* <div className="price" style={{overflowX:"hidden"}}>
                                <span className="span-hashtags cs">#Web3 </span>
                                <span className="span-hashtags cs">#BlockChain</span>
                            </div> */}
                            <div className="label-project-nature cs">
                                {i?.category.map((i) => (
                                    <label className="project-nature cs">{i?.value}</label>))}
                            </div>
                            <div style={{ background: "linear-gradient(270deg,#6345ED, #DC39FC)", height: "60px", borderRadius: "5px", marginBottom: '8px', padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <p className="mb-2" style={{ color: "white", fontSize: "11px", fontWeight: "500" }}>Overall Rating</p>
                                    {i.average_score != null ?
                                        <p style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>{(i.average_score / 2).toFixed(1)}</p>
                                        : <p style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>0</p>}

                                </div>
                                <div style={{ width: "40px", float: "right", margin: "0px 0px 0px 0px" }}>
                                    <img src={overalrating} style={{ width: "100%" }}></img>
                                </div>
                            </div>
                            <div style={{ background: "linear-gradient(90deg,#6345ED, #DC39FC)", height: "60px", borderRadius: "5px", marginBottom: '8px', padding: "10px 14px", display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <p className="mb-2" style={{ color: "white", fontSize: "11px", fontWeight: "500" }}>Reviews Received</p>
                                    {i.total_reviews != null ?
                                        <p style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>{i?.total_reviews}</p> : <p style={{ color: "white", fontSize: "16px", fontWeight: "500" }}>0</p>}
                                </div>
                                <div style={{ width: "40px", float: "right", margin: "0px 0px 0px 0px" }}>
                                    <img src={reviewreceived} style={{ width: "100%" }}></img>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    {i.draft_status == true ?
                                        <p className="stat">Draft</p> : <p className="stat" style={{ color: "green" }}>Live</p>}
                                </div>
                                <div className="col-6">
                                {i.draft_status == true ?
                                <button style={{width:"auto",padding:"8px 20px",background:"#2ac000",color:"white",fontSize:"13px",border:"0px solid",borderRadius:"5px",margin:"10px 0px 0px 0px"}} onClick={()=>{makeLive()}}>Make Live</button>:""}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Ideabox;