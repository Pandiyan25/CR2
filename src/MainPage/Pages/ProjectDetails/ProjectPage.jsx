import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';
import { discord, facebookIcon, instagram, ld, medium, shareIcon, telegram, twitterIcon, website, youtube } from '../../../Entryfile/imagepath';
import { projectId } from '../../../reducers/ConstantSlice';
import { selectAllFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { selectAllProjectDetails } from '../../../reducers/ProjectDetailsSlice';

import CNYimaage from '../FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../FounderProject/Funding/assets/images/USD.png'
import EURimage from '../FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../FounderProject/Funding/assets/images/RUBBLE.png'
import RatingProject from './RatingProject';
import { RatingIcon } from '../../../Entryfile/imagepath';

const ProjectPage = ({ showratingFunc, rateProject, setRateProject }) => {

    const dispatch = useDispatch();
    const [checkPage, setCheckPage] = useState('')
    const [emailId, setEmailId] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [linkedInLink, setlinkedInLink] = useState('')
    const [projectName, setprojectName] = useState('')
    const [projectDesc, setprojectDesc] = useState('')
    const [natureofProject, setnatureofProject] = useState('')
    const [projectStartDate, setprojectStartDate] = useState('')

    const [WalledtAddress, setWalledtAddress] = useState('')

    const [whitePaper, setwhitePaper] = useState('')
    const [onePitchDoc, setonePitchDoc] = useState('')
    const [onePagerDoc, setonePagerDoc] = useState('')
    const [noofFounders, setnoofFounders] = useState('')

    const [teamSize, setteamSize] = useState('')
    const [projectTags, setprojectTags] = useState('')
    const [projectStage, setprojectStage] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [githubRepo, setgithubRepo] = useState('')
    const [show, setShow] = useState(false)
    // const [rateProject, setrateProject] = useState(false)


    const projectIdData = useSelector((state) => state.constVar.projectId)
    const projectDataDetails = useSelector(selectAllProjectDetails)
    const projectFundingProjecDetails = useSelector(selectAllFundingProjectDetails)
    const loginId = useSelector((state) => state.constVar.loginId)





    console.log(projectFundingProjecDetails, "projectFundingProjecDetails");


    const opennewWindowForDoc = (i) => {
        console.log(i, "iiii");

        window.open(i, '_blank').focus();
        // window.open(i)
    }


    //rate the project implmeentation


    return (
        // height: "210vh",
        <div className="card card-table container-fluid" style={{ overflowY: 'auto', border: '0px', padding: '0px' }}>


            <div className="card-body" style={{ padding: '0px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '0px' }}>


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '22px', marginBottom: '15px' }}>Project Summary</h2>

                        <div className="wrap p2">
                            <div style={{ minHeight: '300px' }}>
                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].logo != null && projectDataDetails[0].logo != undefined ?
                                    <img src={projectDataDetails[0].logo} className='borderValueAll' style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', boxShadow: '0px 7px 14px #ababab66' }}></img>
                                    //   <img src={projectDataDetails[0].logo} style={{ boxShadow: 'rgb(196, 200, 208) 0px 10px 20px', borderRadius: '50%', position: "absolute", marginLeft: "60%", marginTop: "140px", width: "10%", minWidth: '150px', minHeight: '150px' }}></img>
                                    :

                                    <img src={""} className='borderValueAll' style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', boxShadow: '0px 7px 14px #ababab66' }}></img>


                                }

                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].cover_page != null && projectDataDetails[0].cover_page != undefined ?
                                    <img src={projectDataDetails[0].cover_page} className='borderValueAll' style={{ width: "100%", height: '300px', borderRadius: '5px' }}></img>

                                    // <img src={/projectDataDetails[0].cover_page} style={{ width: "100%", height: '220px' }}></img>
                                    :

                                    <img src={''} className='borderValueAll' style={{ width: "100%", height: '300px', borderRadius: '5px' }}></img>

                                }

                            </div>

                            <div className="mt-3" style={{ marginBottom: '25px' }}>
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="col-6">

                                        <div style={{ float: "right" }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].website_link != null && projectDataDetails[0].website_link != undefined ?

                                                <img className="sociallogo" src={website} onClick={() => { opennewWindow(projectDataDetails[0].website_link) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={website} >
                                                </img>

                                            }
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].twitter != null && projectDataDetails[0].twitter != undefined ?

                                                <img className="sociallogo" src={twitterIcon} onClick={() => { opennewWindow(projectDataDetails[0].twitter) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={twitterIcon}>
                                                </img>
                                            }

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].youtube != null && projectDataDetails[0].youtube != undefined ?

                                                <img className="sociallogo" src={youtube} onClick={() => { opennewWindow(projectDataDetails[0].youtube) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={youtube}>
                                                </img>
                                            }

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].medium != null && projectDataDetails[0].medium != undefined ?

                                                <img className="sociallogo" src={medium} onClick={() => { opennewWindow(projectDataDetails[0].medium) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={medium}>
                                                </img>
                                            }

                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].instagram != null && projectDataDetails[0].instagram != undefined ?

                                                <img className="sociallogo" src={instagram} onClick={() => { opennewWindow(projectDataDetails[0].instagram) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={instagram}>
                                                </img>
                                            }
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].discord != null && projectDataDetails[0].discord != undefined ?

                                                <img className="sociallogo" src={discord} onClick={() => { opennewWindow(projectDataDetails[0].discord) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={discord}>
                                                </img>
                                            }
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].telegram != null && projectDataDetails[0].telegram != undefined ?

                                                <img className="sociallogo" src={telegram} onClick={() => { opennewWindow(projectDataDetails[0].telegram) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={telegram}>
                                                </img>
                                            }
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].facebook != null && projectDataDetails[0].facebook != undefined ?

                                                <img className="sociallogo" src={facebookIcon} onClick={() => { opennewWindow(projectDataDetails[0].facebook) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={facebookIcon}>
                                                </img>
                                            }
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].linkedin != null && projectDataDetails[0].linkedin != undefined ?

                                                <img className="sociallogo" src={ld} onClick={() => { opennewWindow(projectDataDetails[0].linkedin) }}>
                                                </img>
                                                :
                                                <img className="sociallogo" src={ld}>
                                                </img>

                                            }

                                            {/* <img className="sociallogo" src={shareIcon} >
                            </img> */}


                                        </div>
                                    </div></div>


                            </div>
                            <div>



                                <div className="row " style={{ marginTop: '40px', width: '100%' }}>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "600" }}>
                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_name}</h2>
                                        <h4 style={{ marginBottom: '15px' }}> {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].one_line_description}</h4>
                                        <div className="row">
                                            <div className="col-3">
                                                <p className='mainParaFontWeight' style={{ fontWeight:"600", fontSize: "18px" }}>Nature</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"600", fontSize: "18px" }}>Tags</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"600", fontSize: "18px" }}>Stage</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"600", fontSize: "18px" }}>About</p>
                                            </div>
                                            <div className="col-9">
                                                <p className='mainParaFontWeight'> {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].nature_of_project != null && projectDataDetails[0].nature_of_project != undefined && projectDataDetails[0].nature_of_project}</p>
                                                <p className='mainParaFontWeight'>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_tags != null && projectDataDetails[0].project_tags != undefined && projectDataDetails[0].project_tags
                                                }</p>
                                                <p className='mainParaFontWeight'>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_stage != null && projectDataDetails[0].project_stage != undefined && projectDataDetails[0].project_stage
                                                }</p>
                                                {/* <p className='mainParaFontWeight'>Project Description</p> */}
                                                <p className='mainParaFontWeight'>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].project_description != null && projectDataDetails[0].project_description != undefined && projectDataDetails[0].project_description
                                                }</p>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-3">
                                                <div style={{ height: "100px" }}>
                                                    <p style={{ fontWeight:"600", fontSize: "18px" }}>Team</p></div>
                                            </div>
                                            <div className="col-9">
                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2 " >
                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].number_of_founders != null && projectDataDetails[0].number_of_founders != undefined ?
                                                                projectDataDetails[0].number_of_founders : 0}</h2>
                                                        <p className='marginForPar'>Founder</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2"> {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].team_size != null && projectDataDetails[0].team_size != undefined ?
                                                            projectDataDetails[0].team_size : 0}</h2>
                                                        <p className='marginForPar'>Team</p>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                <div style={{ height: "100px" }}>
                                                    <p style={{ fontWeight:"600", fontSize: "18px" }}>Funding</p></div>
                                            </div>
                                            <div className="col-9">


                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        {/* <<<<<<< HEAD */}
                                                        <div style={{ display: "flex", marginBottom: '5px' }}>
                                                            {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0
                                                                ?

                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""

                                                                :
                                                                ""
                                                            }
                                                            <h2 className="bcolor ml-2 founderFontSizeh2 founderFontSizeh2"> {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.total_fund_raise_target}</h2>
                                                        </div>
                                                        <p className="marginForPar">Total Fund Raise</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        {/* <<<<<<< HEAD */}
                                                        <div style={{ display: "flex", marginBottom: '5px' }}>
                                                            {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0
                                                                ?


                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""


                                                                :
                                                                ""
                                                            }
                                                            <h2 className="bcolor ml-2 founderFontSizeh2"> {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.fund_raised}
                                                            </h2></div>
                                                        <p className="marginForPar">Fund Raised</p>
                                                    </div>

                                                </div>
                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2"> {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.number_of_investors}</h2>
                                                        <p className="marginForPar">No of Investors</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%", minminHeight: "80px" }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ lineHeight: '1' }}> {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.lead_investor?.first_name}</h2>
                                                        <p className="marginForPar">Lead Investor</p>
                                                    </div>

                                                </div>
                                                {/* <div className="row" style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                <div className=" p-2 m-2 borderValueAll" style={{

                                                    position: 'relative',
                                                    width: '100%',
                                                    flexBasis: '0',
                                                    flexGrow: '1',
                                                    maxWidth: '100%'
                                                }}>
                                                    <h2 className="bcolor founderFontSizeh2"> {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.stage_of_funding}</h2>
                                                    <p className="marginForPar">Stage of Funding</p>
                                                </div>
                                            </div> */}

                                                <div className="row" style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{

                                                        position: 'relative',
                                                        width: '100%',
                                                        flexBasis: '0',
                                                        flexGrow: '1',
                                                        maxWidth: '100%'
                                                    }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ minHeight: '29px' }}>
                                                            {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0 && projectFundingProjecDetails[0]?.allProjectFunding[0]?.stage_of_funding}
                                                        </h2>
                                                        <p className="marginForPar">Stage of Funding</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ lineHeight: '1', minHeight: '29px' }}>
                                                            {projectFundingProjecDetails?.length > 0 &&
                                                                projectFundingProjecDetails[0]?.FundRaiseValuation != null &&
                                                                projectFundingProjecDetails[0]?.FundRaiseValuation != undefined
                                                                && projectFundingProjecDetails[0]?.FundRaiseValuation != '' ?
                                                                projectFundingProjecDetails[0]?.FundRaiseValuation
                                                                :
                                                                0
                                                            }
                                                        </h2>
                                                        <p className="marginForPar">FDV Valuation</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">



                                        <div style={{ marginBottom: '20px', marginTop: "55px" }}>

                                            <div className='mainDivPie' style={{ padding: "5px" }}>

                                                {rateProject == false ?
                                                    <div style={{ position: "absolute", width: "92%", height: "170px", backgroundColor: "linear-gradient(90deg,#6345ED,#DC39FC)", zIndex: "1001" }}>
                                                        <button style={{ float: "right",borderColor:"rgb(24, 144, 255)",color:"rgb(24, 144, 255)" }} onClick={() => setRateProject(!rateProject)} > X</button>

                                                        <button type="button" className="linkbt " onClick={() => showratingFunc()} style={{ width: "400px", position: "absolute", width: "40%", zIndex: "1002", margin: "auto", marginLeft: "26%", marginTop: "14%" }}>Rate the project</button>
                                                    </div>
                                                    :
                                                    ""
                                                }





                                                <div className="col mainPieCircle">
                                                    <div style={{ height: '120px', width: '115px' }}>


                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideOverall != null && projectDataDetails[0].divideOverall != undefined ?
                                                            <PieChart

                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                // labelStyle={{
                                                                //     fontSize: "5px",
                                                                //     fill: "#000"
                                                                // }}
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: 10 - projectDataDetails[0].divideOverall, value: 10 - projectDataDetails[0].divideOverall, color: '#94B3E8' },
                                                                    { title: projectDataDetails[0].divideOverall, value: projectDataDetails[0].divideOverall, color: '#6345ED' },
                                                                ]}
                                                            // radius={30}

                                                            />
                                                            :
                                                            <PieChart
                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: "10", value: 10, color: '#94B3E8' },
                                                                    { title: '0', value: 0, color: '#6345ED' },
                                                                ]}

                                                            />
                                                        }
                                                    </div>

                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideOverall != null && projectDataDetails[0].divideOverall != undefined ?
                                                        <div className='marginTopCircleTxt' >{projectDataDetails[0].divideOverall}</div>
                                                        :
                                                        <div className='marginTopCircleTxt'  >{0}</div>
                                                    }

                                                    <div>

                                                        <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Overall Score</h3>
                                                    </div>
                                                    {/* <div style={{ marginTop: '-85px',  fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                                                </div>
                                                <div className="col mainPieCircle">
                                                    <div style={{ height: '120px', width: '115px' }}>
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideInvestor != null && projectDataDetails[0].divideInvestor != undefined ?
                                                            <PieChart
                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: 10 - projectDataDetails[0].divideInvestor, value: 10 - projectDataDetails[0].divideInvestor, color: '#94B3E8' },
                                                                    { title: projectDataDetails[0].divideInvestor, value: projectDataDetails[0].divideInvestor, color: '#6345ED' },
                                                                ]}

                                                            />
                                                            :
                                                            <PieChart
                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: '10', value: 10, color: '#94B3E8' },
                                                                    { title: '0', value: 0, color: '#6345ED' },
                                                                ]}

                                                            />
                                                        }

                                                    </div>

                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideInvestor != null && projectDataDetails[0].divideInvestor != undefined ?
                                                        <div className='marginTopCircleTxt' >{projectDataDetails[0].divideInvestor}</div>
                                                        :
                                                        <div className='marginTopCircleTxt' >{0}</div>
                                                    }

                                                    <div>

                                                        <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Investor Score</h3>
                                                    </div>
                                                </div>
                                                <div className="col mainPieCircle">
                                                    <div style={{ height: '120px', width: '115px' }}>
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideValidator != null && projectDataDetails[0].divideValidator != undefined ?

                                                            <PieChart
                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: 10 - projectDataDetails[0].divideValidator, value: 10 - projectDataDetails[0].divideValidator, color: '#94B3E8' },
                                                                    { title: projectDataDetails[0].divideValidator, value: projectDataDetails[0].divideValidator, color: '#6345ED' },
                                                                ]}
                                                            />
                                                            :
                                                            <PieChart
                                                                animate
                                                                animationDuration={500}
                                                                animationEasing="ease-out"
                                                                labelPosition={45}
                                                                lineWidth={40}
                                                                data={[
                                                                    { title: '10', value: 10, color: '#94B3E8' },
                                                                    { title: '0', value: 0, color: '#6345ED' },
                                                                ]}
                                                            />
                                                        }


                                                    </div>

                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].divideValidator != null && projectDataDetails[0].divideValidator != undefined ?
                                                        <div className='marginTopCircleTxt' >{projectDataDetails[0].divideValidator}</div>
                                                        :
                                                        <div className='marginTopCircleTxt' >{0}</div>
                                                    }

                                                    <div>

                                                        <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Validator Score</h3>
                                                    </div>
                                                </div>
                                                <button data-tip="Rate the Project" onClick={() => showratingFunc()} style={{ color: 'black', background: 'white', border: '2px solid #1890ff', padding: '3px', minWidth: '45px', height: '35px', float: "left" }}>
                                                    <img src={RatingIcon} style={{ height: '100%', width: '80%' }} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row text-align-center" style={{ marginLeft: '-8px', marginRight: '-8px' }}>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].one_pager_document != null && projectDataDetails[0].one_pager_document != undefined ?
                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].one_pager_document) }}>One pager</button>
                                                    :
                                                    <button type="button" className="linkbt ">One pager</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].whitepaper != null && projectDataDetails[0].whitepaper != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].whitepaper) }}>Whitepaper</button>
                                                    :
                                                    <button type="button" className="linkbt " >Whitepaper</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].pitch_deck != null && projectDataDetails[0].pitch_deck != undefined ?


                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].pitch_deck) }}>Pitch Deck</button>
                                                    :
                                                    <button type="button" className="linkbt ">Pitch Deck</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>


                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].github_repository != null && projectDataDetails[0].github_repository != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].github_repository) }}>Git Hub</button>
                                                    :
                                                    <button type="button" className="linkbt ">Git Hub</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>

                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].product_demo != null && projectDataDetails[0].product_demo != undefined ?
                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].product_demo) }}>Product Demo</button>
                                                    :
                                                    <button type="button" className="linkbt ">Product Demo</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>


                                                {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].video_pitch != null && projectDataDetails[0].video_pitch != undefined ?
                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(projectDataDetails[0].video_pitch) }}> Video Pitch</button>
                                                    :
                                                    <button type="button" className="linkbt ">Video Pitch</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>

            </div>
            {/* <RatingProject handleClose={handleCloseRating} show={showRating} role={role}  /> */}
        </div >


    );
}
export default ProjectPage;
