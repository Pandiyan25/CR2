



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FounderFunding from './FounderFunding';
import ProjectPage from './ProjectPage';
import RoadmapPage from './RoadMapPage';
import SocialPage from './SocialPage';
import Tokenomics from './Tokenomics';

import AuditTrailPage from './AuditTrailPage';
import ProposalMainPage from './ProposalMainPage';
import TeamPage from './TeamPage';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Rating from 'react-rating'
import BudgetPage from './BudgetPage';
import { fetchProjectDetails, searchAllProjectDataRemove, selectAllProjectDetails, updateTable } from '../../../reducers/ProjectDetailsSlice';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

import ReactTooltip from 'react-tooltip';
import "./pd.css"
import { useSelector, useDispatch } from 'react-redux';
import { apiURI } from '../../../config/config';
import { useEffect } from 'react';
import RatingProject from './RatingProject';
import { RatingIcon } from '../../../Entryfile/imagepath';
import UnderContruction from '../ProjectDataPage/UnderConstrutcion';
import Checklist from '../ProjectDataPage/Checklist/Checklist';



const ProjectDataInventor = ({ role }) => {
    const [rateProject,setRateProject] = useState(false)
    const [showRating, setShowRating] = useState(false)
    const [valueNum, setValueNum] = useState(0)
    const dispatch = useDispatch()
    const [showProject, setShowProject] = useState(true)
    const [showRoadmap, setshowRoadmap] = useState(false)
    const [showFunding, setshowFunding] = useState(false)
    const [showBudget, setshowBudget] = useState(false)
    const [showKYC, setshowKYC] = useState(false)
    const [showTokenomics, setshowTokenomics] = useState(false)
    const [showTeam, setshowTeam] = useState(false)
    const [showAudit, setshowAudit] = useState(false)
    const [showSocial, setshowSocial] = useState(false)
    const [checkList, setcheckList] = useState(false)
    const [ratingNum, setRatingNum] = useState(0)
    const projectDataDetails = useSelector(selectAllProjectDetails)
    let history = useHistory();

    const projectIdData = useSelector((state) => state.constVar.projectId)
    const loginId = useSelector((state) => state.constVar.loginId)
    const historyBackfunc = () => {
        history.goBack()
    }

    const changeToProjectfunc = () => {
        setShowProject(true)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToRoadMapfunc = () => {

        setShowProject(false)
        setshowRoadmap(true)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToFundingfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(true)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToCheckList = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(true)
    }
    const changeToBudgetfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(true)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToTokenomicsfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(true)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToKYcfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(true)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToSocialfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(true)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToKYCfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(true)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToAuditfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(true)
        setshowTeam(false)
        setcheckList(false)
    }
    const changeToTeamfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(true)
        setcheckList(false)
    }


    useEffect(() => {
        // if (projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].rating.length > 0) {

            getRatingDetailsFunc()
            //   }
        // }


    }, [projectDataDetails])

    const getRatingDetailsFunc = () => {
        try {

            var query =
                `
                query Query($id: ID) {
                    getProject(_id: $id) {
                      _id
                     
                      rating {
                        user_role
                        user_id
                        business_model
                        market_validation
                        team
                        tokenomics
                        remarks
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
                        "id": projectDataDetails[0]._id
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.getProject != null && data?.data?.getProject != undefined && data?.data?.getProject.rating.length > 0) {
                        numLogFunc(data?.data?.getProject.rating)

                        //  console.log();
                    } else {
                        setValueNum(0)
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    const showratingFunc = () => {
        console.log("dijbjnbjbnj");
        setShowRating(true)
    }

    const handleCloseRating = () => {

        setShowRating(false)
    }


    const ratingFunc = (i) => {
        // console.log(i,"ratingFunc");

        var rating = [];
        if (projectDataDetails.length > 0) {
            if (projectDataDetails[0].rating.length > 0) {

                var mainArrayRating = [];
                for (var main = 0; main < projectDataDetails[0].rating.length; main++) {
                    mainArrayRating.push({

                        "value": projectDataDetails[0].rating[main].value,
                        "user_role": projectDataDetails[0].rating[main].user_role,
                        "user_id": projectDataDetails[0].rating[main].user_id
                    })
                }


                const isFound = projectDataDetails[0].rating.some(element => {
                    if (element.user_id === loginId) {
                        return true;
                    }

                    return false;
                });

                console.log(isFound, "===========isFound==========");

                if (isFound == true) {
                    var mainarr = projectDataDetails[0].rating
                    console.log(mainarr, "mainarr");
                    var index = mainArrayRating.findIndex(i => {
                        return i.user_id === loginId;
                    });
                    console.log(index, "index");
                    //   var indexSplice =  mainarr.splice(index,1);
                    const indexSplice = mainArrayRating.filter((item) => item.user_id !== loginId);
                    // var indexData = projectDataDetails[0].rating.filter((i => i.user_id == loginId));
                    console.log(indexSplice, loginId, "indexData");
                    var arr4 = [{

                        "value": i,
                        "user_role": role,
                        "user_id": loginId
                    }]

                    // const filteredPeople = people.filter((item) => item.id !== idToRemove);

                    rating = indexSplice.concat(arr4);
                } else {
                    var arr = mainArrayRating

                    var arr2 = [{

                        "value": i,
                        "user_role": role,
                        "user_id": loginId
                    }]

                    rating = arr.concat(arr2);

                    // console.log(arr3, "arr3")
                }
            } else {
                rating.push({
                    "value": i,
                    "user_role": role,
                    "user_id": loginId
                })
            }




            // rating = projectDataDetails[0].rating
        } else {
            rating = []
        }
        console.log(projectDataDetails, "projectDataDetails?.rating");
        // rating.push({
        //     "value": i,
        //     "role": role,
        //     "user_id" :loginId
        // })
        console.log(rating, "rating");

        updateRatingDetails(rating)
        // variables: {
        //     "id": projectIdData,
        //         "input": {
        //         "rating": [
        //             {
        //                 "value": i,
        //                 "role": role
        //             }
        //         ]
        //     }
        // }
        setValueNum(i)

    }

    const updateRatingDetails = (i) => {
        try {

            var query =
                `
              mutation UpdateProject($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
                    _id
                  email_id
                  first_name
                  rating {
                    value
                    user_role
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
                        "id": projectIdData,
                        "input": {
                            "rating": i
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    console.log('updateProjectdata', data);
                    dispatch(fetchProjectDetails(''))
                    if (data?.data?.updateProject != null && data?.data?.updateProject != undefined) {
                        console.log(data?.data?.updateProject._id, "updateProject Id");
                        dispatch(searchAllProjectDataRemove())
                        dispatch(fetchProjectDetails(data?.data?.updateProject._id))

                        // numLogFunc()
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError ");
        }
    }


    const numLogFunc = (rate) => {
        console.log(rate, "rate");
        var arr = []
        // for (var i = 0; i < projectDataDetails[0].rating.length; i++) {
        var i = rate.findIndex(i => {
            return i.user_id === loginId;
        })
        const isFound = rate.some(element => {
            if (element.user_id === loginId) {
                return true;
            }

            return false;
        });
        if (isFound == true) {
            console.log(rate[i], "rate[i].value");
            setValueNum(rate[i].value)
        } else {
            setValueNum(0)
        }
    }

    console.log(valueNum, "valueNum ");
    return (
        <>

            <div className="page-wrapper" style={{paddingTop:'60px'}}>

                <div className="content container-fluid">
                    <div >
                        <div className="page-header">
                            <div className="header-left">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h3 className="page-title">Project</h3>





                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="mainct" style={{ background: 'white', padding: '20px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0', marginTop: '20px' }}>

                            <div className="page-header">
                                <div className="header-left">
                                    <div className="row">

                                        <div className="col-sm-12">
{/* 
                                            <button data-tip="Rate the Project" onClick={() => showratingFunc()} style={{ color: 'black', background: 'white', border: '2px solid #1890ff', padding: '3px', minWidth: '60px', height: '35px' }}>
                                                <img src={RatingIcon} style={{ height: '100%', width: '70%' }} />
                                            </button> */}

                                            <ReactTooltip place="top" type="info" effect="solid" />
                                        </div>
                                    </div>
                                </div>


                                <div className="header-right">
                                    <div className="row">
                                        <Button className="buttonTop3" style={{ margin: '0px 20px', padding: '0px', height: '35px', width: '70px' }} onClick={() => historyBackfunc()}>

                                            <HiOutlineArrowNarrowLeft style={{ fontSize: '32px', color: 'white', background: '#1890ff', width: '100%' }}
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-sm-12">
                                    {showProject == true ?
                                        <div style={{ marginBottom: '15px', display: "flex", flex: "wrap" }} >
                                            <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                            {/* <Button className="btn-main-get btt" onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                            {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                        </div>

                                        :
                                        showRoadmap == true ?

                                            <div style={{ marginBottom: '15px', display: "flex" }} >
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                            </div>
                                            :
                                            showFunding == true ?

                                                <div style={{ marginBottom: '15px', display: "flex" }} >

                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                    <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                    {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                    {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}


                                                </div>
                                                :
                                                showBudget == true ?

                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                        <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                        {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                        {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}

                                                    </div>
                                                    :
                                                    showTokenomics == true ?

                                                        <div style={{ marginBottom: '15px', display: "flex" }} >
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                            <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                            {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                            <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                            {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                                        </div>
                                                        :
                                                        showKYC == true ?

                                                            <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                {/* <Button className="btn-main-get btt2" onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                                <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                                {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                                            </div>
                                                            :
                                                            showTeam == true ?

                                                                <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                    {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                                    <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                                    <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                                    {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                                                </div>
                                                                :
                                                                showAudit == true ?

                                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                        {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                                        <Button className="btn-main-get btt2" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                                        {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToSocialfunc()}>Social</Button> */}
                                                                    </div>
                                                                    :

                                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToProjectfunc()}>Project</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToCheckList()}>Checklist</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                        {/* <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToKYCfunc()}>Proposal</Button> */}
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToTeamfunc()}>Team</Button>
                                                                        <Button className="btn-main-get btt" style={{fontWeight:'600'}} onClick={() => changeToAuditfunc()}>Audit Trails</Button>
                                                                        {/* <Button className="buttonTopColor3" onClick={() => changeToSocialfunc()}>Social</Button> */}
                                                                    </div>


                                    }
                                    {
                                        showProject == true ?
                                            <div>
                                                <ProjectPage rateProject={rateProject} showratingFunc={showratingFunc} setRateProject={setRateProject}/>
                                            </div>
                                            :
                                            showFunding == true ?
                                                <div>
                                                    <FounderFunding />
                                                </div>
                                                 :
                                                 checkList == true ?
                                                     <div>
                                                         <Checklist invdata={false}/>
                                                     </div>
                                                :
                                                showTeam == true ?
                                                    <TeamPage />
                                                    :
                                                    showTokenomics == true ?
                                                        <div>
                                                            <Tokenomics />
                                                        </div>
                                                        :
                                                        showRoadmap == true ?
                                                            <div>
                                                                <RoadmapPage />
                                                            </div>
                                                            :
                                                            showKYC == true ?
                                                                <ProposalMainPage />
                                                                // <></>
                                                                :
                                                                showBudget == true ?
                                                                    <>
                                                                        <BudgetPage />
                                                                        {/* treasury */}
                                                                    </>

                                                                    :

                                                                    showAudit == true ?
                                                                        // <AuditTrailPage />
                                                                        <UnderContruction />
                                                                        :
                                                                        <SocialPage />

                                    }




                                    {/* {showProject == true ?
                                        <div>
                                            <ProjectPage />
                                        </div>
                                        :
                                        showRoadmap == true ?
                                            <div>
                                                <RoadMapPage />
                                            </div>

                                            :
                                            showFunding == true ?
                                                <div>
                                                    <FounderFunding />
                                                </div>

                                                :
                                                showTokenomics == true ?
                                                    <div>
                                                        <Tokenomics />
                                                    </div>
                                                    :
                                                    showKYC == true ?
                                                        <div>
                                                            <KYCPage />
                                                        </div>
                                                        : <SocialPage />
                                    } */}

                                </div>


                            </div>
                        </div>

                    </div>
                </div>
                <RatingProject setRateProject={setRateProject} handleClose={handleCloseRating} show={showRating} role={role}  />
            </div>
        </>
    );

}
export default ProjectDataInventor;
