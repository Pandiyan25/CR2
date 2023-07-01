import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';
import { projectId } from '../../../reducers/ConstantSlice';
import ProjectModal from './ProjectModal';
import { addFounder, isFounder, setFounderAndCycleForProject } from '../../../config/web3Client3';
import { ToastContainer, toast } from 'material-react-toastify';
import { CanvasJSChart } from 'canvasjs-react-charts'
import "./assets/fp.css"
import profile from "./assets/profile.png"
import cover from "./assets/cover.jpg"
import discord from "./assets/discord.png"
import facebookIcon from "./assets/facebook.png"
import instagram from "./assets/instagram.png"
import ld from "./assets/ld.png"
import medium from "./assets/medium.png"
import telegram from "./assets/telegram.png"
import twitterIcon from "./assets/twitter.png"
import youtube from "./assets/youtube.png"
import { shareIcon, website } from "../../../Entryfile/imagepath"
import { PieChart } from 'react-minimal-pie-chart';

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


import 'material-react-toastify/dist/ReactToastify.css';
import { async } from 'regenerator-runtime';
import SocialMediaSharePage from './SocialMediaSharePage';

const UPLOAD_FILE = gql`
mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
    singleUpload(file: $file, input: $input) {
        filename
        mimetype
        encoding
        url
        filepath
        project_id
        ext
      }
  } `;


const ProjectPage = () => {
    const [userRole, setUserRole] = useState('')
    const [fundRaiseValuation, setFundRaiseValuation] = useState(0)
    const [draftStatus, setDraftStatus] = useState(true)
    const [onelinedescription, setOnelinedescription] = useState('')
    const [twitter, settwitter] = useState('')
    const [Instagram, setInstagram] = useState('')
    const [Medium, setMedium] = useState('')
    const [facebook, setfacebook] = useState('')
    const [Discord, setDiscord] = useState('')
    const [Reddit, setReddit] = useState('')
    const [youTube, setyouTube] = useState('')
    const [Telegram, setTelegram] = useState('')
    const [LinkedIn, setLinkedIn] = useState('')
    const [CurrencyType, setCurrencyType] = useState('')
    const [CoverImage, setCoverImage] = useState('')
    const [profilePicCover, setProfilePicCover] = useState('')
    const [imageData, setImageData] = useState([])
    const [profilePic, setProfilePic] = useState('')
    const dispatch = useDispatch();
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const projectIdData = useSelector((state) => state.constVar.projectId)
    const [checkPage, setCheckPage] = useState('')
    const [emailId, setEmailId] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [linkedInLink, setlinkedInLink] = useState('')
    const [projectName, setprojectName] = useState('')
    const [projectDesc, setprojectDesc] = useState('')
    const [natureofProject, setnatureofProject] = useState('')
    const [projectStartDate, setprojectStartDate] = useState('')
    const [projectIdget, setProjectIdget] = useState('')
    const [WhitePaperLink, setWhitePaperLink] = useState('')
    const [OnePageDocLink, setOnePageDocLink] = useState('')
    const [PitchDeckLink, setPitchDeckLink] = useState('')
    const [WalledtAddress, setWalledtAddress] = useState('')


    const [productDemo, setproductDemo] = useState('')
    const [VideoPitch, setVideoPitch] = useState('')
    console.log(projectIdData, "projectIdData in project");
    const [imageCoverData, setImageCoverData] = useState('')

    const [WhitePaperMainLink, setWhitePaperMainLink] = useState('')
    const [OnePageDocMainLink, setOnePageDocMainLink] = useState('')
    const [PitchDeckMainLink, setPitchDeckMainLink] = useState('')
    const [whitePaper, setwhitePaper] = useState([])
    const [onePitchDoc, setonePitchDoc] = useState([])
    const [onePagerDoc, setonePagerDoc] = useState([])
    const [noofFounders, setnoofFounders] = useState('')
    const [allProjectFundingData, setAllProjectFundingData] = useState('')

    const [oneLengthpageDoc, setOneLengthpageDoc] = useState([])


    const [teamSize, setteamSize] = useState('')
    const [projectTags, setprojectTags] = useState('')
    const [projectStage, setprojectStage] = useState('')
    const [websiteLink, setWebsiteLink] = useState('')
    const [githubRepo, setgithubRepo] = useState('')
    // const [projectEndDate, setProjectEndDate] = useState('')
    const [totalFundRaiseTarget, settotalFundRaiseTarget] = useState('')
    const [totalBudget, settotalBudget] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')

    const [showSocialIcon, setShowSocialIcon] = useState(false)
    const [OverallScoreOpp, setOverallScoreOpp] = useState(0)
    const [OverallScore, setOverallScore] = useState(0)
    const [validatorScore, setvalidatorScore] = useState(0)
    const [validatorScoreOpp, setvalidatorScoreOpp] = useState(0)
    const [InvestorScoreOpp, setInvestorScoreOpp] = useState(0)
    const [InvestorScore, setInvestorScore] = useState(0)
    console.log(InvestorScore, InvestorScoreOpp, "InvestorScore");
    console.log(OverallScore, OverallScoreOpp, "OverallScoreOpp");
    console.log(projectStartDate, "projectStartDate");

    const [fundRaisedTillNow, setFundRaisedTillNow] = useState('')
    const [IncubatorName, setIncubatorName] = useState('')
    const [ModeOfFunding, setModeOfFunding] = useState('')
    const [GrantsName, setGrantsName] = useState('')

        //Rating Values
    const [overallRatingScore, setOverallRatingScore] = useState();
    const [investorRatingScore, setInvestorRatingScore] = useState();
    const [validatorRatingScore, setValidatorRatingScore] = useState();

    const [show, setShow] = useState(false)
    const handleShow = () => {

        // if (wallet_address != null && wallet_address != undefined && wallet_address != "") {

            setShow(true)
        // } else {
        //     toast.warn('Please Connect Your Wallet Address to perform this action', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }
    }
    const handleCloseShow = () => {
        setShow(false)
        getUserDetailsFunc(projectIdData)
    }





    const loginId = useSelector((state) => state.constVar.loginId)
    const getUserDetailsFunc = async (projectIdDatasub) => {

        try {


            var query = `
            query AllProjects($founder: ID, $project: ID) {
                allProjectFunding(project: $project) {
                  _id
                  total_fund_raise_target
                  fund_raised
                  number_of_investors
                  stage_of_funding
                  primary_funding_wallet_address_network
                  primary_funding_wallet_address
                  lead_investor {
                    first_name
                    last_name
                    fund_name
                  }
                  external_lead_investor
                  mode_of_funding
                  incubator_name
                  isIncubated
                  grants_name
                  isGrants
                  currency
                }
              
                allProjects(founder: $founder) {
                  _id
                  cover_page
                  fund_raised_target
                  public_launch_price
                  user {
                    _id
                    email
                    password
                    role
                    contact
                    first_name
                    last_name
                    role_in_organization
                    fund_description
                    minimum_investment_size
                    project_invested
                    type_of_fund
                    preferred_sectors {
                      value
                    }
                    fund_name
                    asset_under_management
                    projected_invested_till_date
                    fund_head_quarters
                    team_size
                    linkedin
                    linkedin_link
                    website_link
                    twitter_link
                    education
                    experience
                    industry
                    experience_in_blockchain
                    current_position
                    past_organisation_tags
                    current_organisation
                    current_income
                    wallet_address
                    current_location
                    nationality
                    id_proof
                    self_description
                    id_number
                    aum
                  }
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
                  project_id
                  project_status
                  amount_released
                  amount_invested
                  amount_in_escrow
                  project_end_date
                  total_budget
                  validator_score
                  investor_score
                  fund_raised_till_now
                  total_fund_raised
                  investment_date
                  no_of_proposals
                  logo
                  rating {
                    user_role
                    user_id
                    tokenomics
                    team
                    business_model
                    market_validation
                  }
                  one_line_description
                  twitter
                  instagram
                  medium
                  facebook
                  linkedin
                  discord
                  telegram
                  reddit
                  youtube
                  product_demo
                  video_pitch
                  draft_status
                }
                allProjectFunding(project: $project) {
                  currency
                }
                allProjectFundingData(project: $project) {
                  _id
                }
                allFundraise(project: $project) {
                  valuation
                }
                ProjectOverAllRating(project: $project) {
                    overall_rating
                    validator_rating
                    investor_rating
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
                        "founder": loginId,
                        "project": projectIdDatasub
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allProjects);

                    if(data?.data?.ProjectOverAllRating != null && data?.data?.ProjectOverAllRating != undefined  ){

                        setOverallRatingScore(data.data.ProjectOverAllRating.overall_rating);
                        setInvestorRatingScore(data.data.ProjectOverAllRating.investor_rating);
                        setValidatorRatingScore(data.data.ProjectOverAllRating.validator_rating);
                    }

                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        var overallCount = 0;
                        // if(data?.data?.allProjects[i].)
                        var investorCount = 0;
                        var validatorCount = 0;
                        var investor = 0;
                        var validator = 0;
                        var overall = 0;
                        var main = 0;
                        var divideValidator = 0;
                        var divideOverall = 0;
                        var divideInvestor = 0;

                        for (var j = 0; j < data?.data?.allProjects?.length; j++) {
                            if (data?.data?.allProjects[j]?.rating?.length > 0) {

                                for (var i = 0; i < data?.data?.allProjects[j]?.rating?.length; i++) {
                                    overall = overall + data?.data?.allProjects[j]?.rating[i].business_model + data?.data?.allProjects[j]?.rating[i].market_validation
                                        + data?.data?.allProjects[j]?.rating[i].team + data?.data?.allProjects[j]?.rating[i].tokenomics
                                    if (data?.data?.allProjects[j]?.rating[i].user_role == 'Investor') {
                                        investor = investor + data?.data?.allProjects[j]?.rating[i].business_model + data?.data?.allProjects[j]?.rating[i].market_validation
                                            + data?.data?.allProjects[j]?.rating[i].team + data?.data?.allProjects[j]?.rating[i].tokenomics;
                                        investorCount++;
                                    } else if (data?.data?.allProjects[j]?.rating[i].user_role == 'Validator') {
                                        validator = validator + data?.data?.allProjects[j]?.rating[i].business_model + data?.data?.allProjects[j]?.rating[i].market_validation
                                            + data?.data?.allProjects[j]?.rating[i].team + data?.data?.allProjects[j]?.rating[i].tokenomics;
                                        validatorCount++;
                                    } else {
                                        validator = validator
                                        investor = investor
                                    }

                                }
                                if (investor == 0) {

                                    divideInvestor = 0;
                                } else {
                                    // / 2
                                    divideInvestor = ((investor / investorCount) / 4);
                                    divideInvestor = Number((divideInvestor).toFixed(1))
                                }

                                if (validator == 0) {

                                    divideValidator = 0;
                                } else {
                                    // / 2
                                    divideValidator = ((validator / validatorCount) / 4);
                                    divideValidator = Number((divideValidator).toFixed(1))

                                }
                                if (overall == 0) {
                                    divideOverall = 0;

                                } else {

                                    divideOverall = ((overall / data?.data?.allProjects[j]?.rating?.length) / 4);
                                    divideOverall = Number((divideOverall).toFixed(1))
                                }

                                console.log(divideInvestor, investor, investorCount, "divideInvestor");
                                console.log(divideValidator, validator, validatorCount, "divideValidator");
                            } else {
                                divideOverall = 0
                                divideValidator = 0;
                                divideInvestor = 0;
                                main = 0
                                // divide = 0
                            }

                            setInvestorScore(divideInvestor)
                            setInvestorScoreOpp(10 - divideInvestor)
                            setvalidatorScore(divideValidator)
                            setvalidatorScoreOpp(10 - divideValidator)
                            setOverallScore(divideOverall)

                            setOverallScoreOpp(10 - divideOverall)
                        }
                        var prjStartDate = '';
                        var walAddresss = '';
                        var prjEndDate = '';
                        if (data?.data?.allProjects[0].project_start_date != '' && data?.data?.allProjects[0].project_start_date != null && data?.data?.allProjects[0].project_start_date != undefined) {
                            prjStartDate = data?.data?.allProjects[0].project_start_date.split('T')[0]
                        } else {
                            prjStartDate = ''
                        }
                        if (data?.data?.allProjects[0].project_end_date != '' && data?.data?.allProjects[0].project_end_date != null && data?.data?.allProjects[0].project_end_date != undefined) {
                            prjEndDate = data?.data?.allProjects[0].project_end_date.split('T')[0]
                        } else {
                            prjEndDate = ''
                        }
                        console.log("///////wal1///////////");
                        if ((data?.data?.allProjects[0]?.user?.wallet_address != null && data?.data?.allProjects[0]?.user?.wallet_address != undefined && data?.data?.allProjects[0]?.user?.wallet_address != "") || (wallet_address != null && wallet_address != undefined && wallet_address != "")) {

                            console.log("///////wal2///////////");
                            if (data?.data?.allProjects[0]?.user?.wallet_address != null && data?.data?.allProjects[0]?.user?.wallet_address != undefined && data?.data?.allProjects[0]?.user?.wallet_address != "") {

                                console.log("///////wal3///////////");
                                walAddresss = data?.data?.allProjects[0]?.user?.wallet_address
                            } else {

                                console.log("///////wal4///////////");
                                walAddresss = wallet_address
                            }
                        } else {

                            console.log("///////wal5///////////");
                            walAddresss = ''
                        }


                        console.log("///////wal6///////////", walAddresss);

                        setCheckPage(data?.data?.allProjects[0]._id)
                        setOnelinedescription(data?.data?.allProjects[0].one_line_description)
                        // setProjectEndDate(prjEndDate)
                        settotalFundRaiseTarget(data?.data?.allProjects[0].fund_raised_target)
                        settotalBudget(data?.data?.allProjects[0].total_budget)
                        setpublicLaunchPrice(data?.data?.allProjects[0].public_launch_price)
                        // setvalidatorScore(data?.data?.allProjects[0].validator_score)
                        setFundRaisedTillNow(data?.data?.allProjects[0].fund_raised_till_now)



                        setIncubatorName(data?.data?.allProjects[0].incubator_name)
                        setModeOfFunding(data?.data?.allProjects[0].mode_of_funding)
                        setGrantsName(data?.data?.allProjects[0].grants_name)



                        // setInvestorScore(data?.data?.allProjects[0].investor_score)
                        setWalledtAddress(walAddresss)
                        dispatch(projectId(data?.data?.allProjects[0]._id))
                        setProjectIdget(data?.data?.allProjects[0].project_id)
                        setfirstName(data?.data?.allProjects[0].first_name)
                        setlastName(data?.data?.allProjects[0].last_name)
                        setlinkedInLink(data?.data?.allProjects[0].linkedin_profile_link)
                        setprojectName(data?.data?.allProjects[0].project_name)
                        setprojectDesc(data?.data?.allProjects[0].project_description)
                        setnatureofProject(data?.data?.allProjects[0].nature_of_project)
                        setprojectStage(data?.data?.allProjects[0].project_stage)
                        setWhitePaperMainLink(data?.data?.allProjects[0].whitepaper)
                        setWhitePaperLink(data?.data?.allProjects[0].whitepaper)
                        setPitchDeckMainLink(data?.data?.allProjects[0].pitch_deck)
                        setOnePageDocMainLink(data?.data?.allProjects[0].one_pager_document)
                        setOnePageDocLink(data?.data?.allProjects[0].one_pager_document)
                        setnoofFounders(data?.data?.allProjects[0].number_of_founders)
                        setteamSize(data?.data?.allProjects[0].team_size)
                        setprojectTags(data?.data?.allProjects[0].project_tags)
                        setprojectStage(data?.data?.allProjects[0].project_stage)
                        setWebsiteLink(data?.data?.allProjects[0].website_link)
                        setgithubRepo(data?.data?.allProjects[0].github_repository)
                        setprojectStartDate(prjStartDate)
                        setProfilePic(data?.data?.allProjects[0].logo)
                        setProfilePicCover(data?.data?.allProjects[0].cover_page)
                        setPitchDeckLink(data?.data?.allProjects[0].pitch_deck)
                        settwitter(data?.data?.allProjects[0].twitter)
                        setInstagram(data?.data?.allProjects[0].instagram)
                        setMedium(data?.data?.allProjects[0].medium)
                        setfacebook(data?.data?.allProjects[0].facebook)
                        setDiscord(data?.data?.allProjects[0].discord)
                        setReddit(data?.data?.allProjects[0].reddit)
                        setyouTube(data?.data?.allProjects[0].youtube)

                        setproductDemo(data?.data?.allProjects[0].product_demo)
                        setVideoPitch(data?.data?.allProjects[0].video_pitch)

                        setTelegram(data?.data?.allProjects[0].telegram)
                    } else {
                        if (wallet_address != null && wallet_address != undefined && wallet_address != "") {

                            setWalledtAddress(wallet_address)
                        } else {

                            setWalledtAddress('')
                        }
                        settwitter("")
                        setInstagram("")

                        setMedium("")
                        setfacebook("")
                        setDiscord("")
                        setReddit("")
                        setyouTube("")
                        setTelegram("")
                        setCheckPage('')

                        setOnelinedescription('')
                        setInvestorScore(0)
                        setInvestorScoreOpp(10 - 0)
                        setvalidatorScore(0)
                        setvalidatorScoreOpp(10 - 0)
                        setOverallScore(0)

                        setOverallScoreOpp(0)

                        setProfilePicCover('')
                        setProfilePic('')
                    }

                    if (data?.data?.allProjectFunding != null && data?.data?.allProjectFunding != undefined && data?.data?.allProjectFunding.length > 0) {
                        setAllProjectFundingData(data?.data?.allProjectFunding)
                    }



                    if (data?.data?.allProjectFunding != null && data?.data?.allProjectFunding != undefined && data?.data?.allProjectFunding.length > 0) {
                        setCurrencyType(data?.data?.allProjectFunding[0].currency)
                    } else {

                        setCurrencyType('')
                    }

                    if (data?.data?.allProjectFundingData != null && data?.data?.allProjectFundingData != undefined && data?.data?.allProjectFundingData.length > 0) {
                        setOneLengthpageDoc(data?.data?.allProjectFundingData)
                    } else {
                        setOneLengthpageDoc([])
                    }

                    if (data?.data?.allFundraise?.length > 0) {
                        if (data?.data?.allFundraise?.length > 1) {
                            var valuationData = data?.data?.allFundraise.sort((a, b) => a.valuation > b.valuation ? -1 : 1)
                            setFundRaiseValuation(valuationData[0]?.valuation)
                        } else {
                            setFundRaiseValuation(data?.data?.allFundraise[0]?.valuation)
                        }

                    } else {
                        setFundRaiseValuation(0)
                    }

                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        setDraftStatus(data?.data?.allProjects[0]?.draft_status)
                    }
                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const getUserDetails = () => {
        try {

            var query =
                `
                query getUser($id: ID) {
                    getUser(_id: $id) {
                      _id
                      email
                      role
                     
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

                        "id": loginId

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
                    if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
                        setEmailId(data?.data?.getUser?.email)
                        setUserRole(data?.data?.getUser?.role)
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }

    }

    useEffect(() => {
        if (loginId != '' || (wallet_address != null && wallet_address != undefined && wallet_address != "")) {
            getUserDetailsFunc(projectIdData)
            getUserDetails()
        }

        // console.log(wallet_address, loginId != '' || (wallet_address != null && wallet_address != undefined && wallet_address != ""), "wallet_address");

    }, [loginId, wallet_address])


    const [uploadFileCreate] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            console.log(data, "dubmainsavedradtupload");
            setWhitePaperLink(data?.singleUpload?.filepath)
            uploadEditPageDocFileCreate({
                variables: {
                    file: onePagerDoc[0].file,
                    "input": {
                        "project_id": data?.singleUpload?.project_id
                    }
                }
            })
            // console.log("Completed uploadFile", data);
        }
    })
    const [uploadEditPageDocFileCreate] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {

            setOnePageDocLink(data?.singleUpload?.filepath)
            uploadOnePitchDecFileCreate
                ({
                    variables: {
                        file: onePitchDoc[0].file,
                        "input": {
                            "project_id": data?.singleUpload?.project_id
                        }
                    }
                })
            // ({ variables: { file: onePitchDoc[0].file } })


            console.log("Completed uploadEditPageDocFile", data);
        }
    })




    const [uploadOnePitchDecFileCreate] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            setPitchDeckLink(data?.singleUpload?.filepath)
            createFileImageCover({
                variables: {
                    file: imageCoverData[0].file,
                    "input": {
                        "project_id": data?.singleUpload?.project_id
                    }
                }
            })

            // ({ variables: { file: imageCoverData[0].file } })

            console.log("Completed uploadOnePitchDecFile", data);
        }
    })
    const [createFileImageCover] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            setCoverImage(data?.singleUpload?.filepath)
            createFileImage({
                variables: {
                    file: imageData[0].file,
                    "input": {
                        "project_id": data?.singleUpload?.project_id
                    }
                }
            })
            // ({ variables: { file: imageData[0].file } })

            console.log("Completed uploadOnePitchDecFile", data);
        }
    })
    const [createFileImage] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            // const userData = JSON.parse(localStorage.getItem('userAccount'));
            // if (userData) {
            setProfilePic(data?.singleUpload?.filepath)
            saveFIleDataFunc(data?.singleUpload?.filepath, data?.singleUpload?.project_id)
            // saveNewData(data?.singleUpload?.filepath)
            console.log("Completed uploadOnePitchDecFile", data);
            // } else alert("Connect to wallet");
        }
    })

    const saveFIleDataFunc = (tr, projId) => {

        try {
            var query = `
                mutation Mutation($id: ID, $input: ProjectInput) {
                    updateProject(_id: $id, input: $input) {
                      _id
                      logo
                      cover_page
                      pitch_deck
                      one_pager_document
                      whitepaper
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

                        "id": projId,
                        "input": {
                            'logo': tr,
                            'cover_page': CoverImage,
                            'pitch_deck': PitchDeckLink,
                            'one_pager_document': OnePageDocLink,
                            'whitepaper': WhitePaperLink
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // if()
                    console.log(data?.data?.updateProject);

                    if (data?.data?.updateProject) {


                        toast.success('Your Data Has been Saved Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                })


        } catch (error) {
            console.log("adding new projectDetail9 error");
        }


    }




    const safeDraftFunc = () => {




        // if (userData) {
        saveDraftasyncFunc()
        // uploadFileCreate({ variables: { file: whitePaper[0].file } })
        // alert("Please Connect Your Wallet")
        // } else if (!userData) {
        //     toast.warn("Please Connect Your Wallet", {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }
    }

    const saveNewPojectData = () => {



        const userData = JSON.parse(localStorage.getItem('userAccount'));


console.log(userData,"userData dmknjnjn");

        if (userData) {
            saveasyncFunc()
            // uploadFileCreate({ variables: { file: whitePaper[0].file } })
        } else if (!userData) {
            // alert("Please Connect Your Wallet")
            toast.warn("Please Connect Your Wallet", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        //   else {
        //     alert("Please fill all the mandatory fields")


        // }

    }

    const saveDraftasyncFunc = async () => {

        await subMainSaveDraftFunc()

    }

    const saveasyncFunc = async () => {

        await subMainSaveFunc()

    }
    const editSaveDraftFunc = async () => {
        await subMainEditSaveDraftFunc()

    }

    const editasyncFunc = async () => {
        await subMainEditFunc()

    }

    const subMainEditSaveDraftFunc = () => {
        try {
            var query = `
            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
                  _id
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
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

                            // "input": {
                            "user": loginId,
                            "email_id": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "linkedin_profile_link": linkedInLink,
                            "project_name": projectName,
                            "project_description": projectDesc,
                            "nature_of_project": natureofProject,
                            "project_start_date": projectStartDate,
                            "project_tags": projectTags,
                            "project_stage": projectStage,
                            "website_link": websiteLink,
                            "github_repository": githubRepo,
                            "fund_raised_till_now": fundRaisedTillNow,
                            // "whitepaper": whitePaper,
                            // "one_pager_document": onePagerDoc,
                            // "pitch_deck": pitch,

                            // "draft_status":false,
                            "one_line_description": onelinedescription,
                            // "cover_page": CoverImage,
                            // "pitch_deck": PitchDeckLink,
                            // "logo": profilePic,
                            // "whitepaper": WhitePaperLink,
                            // "one_pager_document": OnePageDocLink,
                            // "pitch_deck": pitch,PitchDeckLink,

                            "number_of_founders": noofFounders,
                            "team_size": parseInt(teamSize),
                            "total_budget": totalBudget,
                            // "project_end_date": projectEndDate,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                            "fund_raised_target": totalFundRaiseTarget,
                            "public_launch_price": publicLaunchPrice,
                            // "project_status": "Ongoing",
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            // "project": projectIdData,
                            "linkedin": linkedInLink,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium,

                            "product_demo": productDemo,
                            "video_pitch": VideoPitch,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // if()
                    console.log(data?.data?.updateProject);

                    if (data?.data?.updateProject) {

                        // let founder_status = await addFounderFunc()
                        // console.log('called addFounderFunc', founder_status)
                        // console.log('calling setFounderAndTotalValueForProjectFunc')
                        // let { project_blockchain_id, project_start_date, project_end_date } = data?.data?.updateProject;
                        // console.log("data?.data?.updateProject", data?.data?.updateProject)
                        // let value_status = await setFounderAndTotalValueForProjectFunc(project_blockchain_id, project_start_date, project_end_date)
                        // console.log('called setFounderAndTotalValueForProjectFunc', value_status)
                        // saveUserWalletAddress() NOTE: DON'T UPDATE USER WALLET
                        // getUserDetailsFunc()
                        await dispatch(projectId(data?.data?.updateProject?._id))
                        // console.log('calling addFounderFunc')
                        await mainSaveFunc(data?.data?.updateProject?._id)
                        // handleCloseShow()

                        toast.success('Your Data Has been Saved Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                })


        } catch (error) {

            alert(`${error} in Project Update Page`)
            console.log("adding new projectDetail9 error");
        }

    }

    const subMainEditFunc = async () => {

        try {
            var query = `
            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
                  _id
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
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

                            // "input": {
                            "user": loginId,
                            "email_id": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "linkedin_profile_link": linkedInLink,
                            "project_name": projectName,
                            "project_description": projectDesc,
                            "nature_of_project": natureofProject,
                            "project_start_date": projectStartDate,
                            "project_tags": projectTags,
                            "project_stage": projectStage,
                            "website_link": websiteLink,
                            "github_repository": githubRepo,
                            "fund_raised_till_now": fundRaisedTillNow,
                            // "whitepaper": whitePaper,
                            // "one_pager_document": onePagerDoc,
                            // "pitch_deck": pitch,

                            "draft_status": false,
                            "one_line_description": onelinedescription,
                            // "cover_page": CoverImage,
                            // "pitch_deck": PitchDeckLink,
                            // "logo": profilePic,
                            // "whitepaper": WhitePaperLink,
                            // "one_pager_document": OnePageDocLink,
                            // "pitch_deck": pitch,PitchDeckLink,

                            "number_of_founders": noofFounders,
                            "team_size": parseInt(teamSize),
                            "total_budget": totalBudget,
                            // "project_end_date": projectEndDate,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                            "fund_raised_target": totalFundRaiseTarget,
                            "public_launch_price": publicLaunchPrice,
                            // "project_status": "Ongoing",
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            // "project": projectIdData,
                            "linkedin": linkedInLink,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium,

                            "product_demo": productDemo,
                            "video_pitch": VideoPitch,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // if()
                    console.log(data?.data?.updateProject);

                    if (data?.data?.updateProject) {

                        // let founder_status = await addFounderFunc()
                        // console.log('called addFounderFunc', founder_status)
                        // console.log('calling setFounderAndTotalValueForProjectFunc')
                        // let { project_blockchain_id, project_start_date, project_end_date } = data?.data?.updateProject;
                        // console.log("data?.data?.updateProject", data?.data?.updateProject)
                        // let value_status = await setFounderAndTotalValueForProjectFunc(project_blockchain_id, project_start_date, project_end_date)
                        // console.log('called setFounderAndTotalValueForProjectFunc', value_status)
                        // saveUserWalletAddress() NOTE: DON'T UPDATE USER WALLET
                        // getUserDetailsFunc()
                        await dispatch(projectId(data?.data?.updateProject._id))
                        // console.log('calling addFounderFunc')
                        await mainSaveFunc(data?.data?.updateProject._id)
                        handleCloseShow()

                        toast.success('Your data has been updated successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                })


        } catch (error) {

            alert(`${error} in Project Update Page`)
            console.log("adding new projectDetail9 error");
        }

    }


    const [uploadWhitePaperAsync] = useMutation(UPLOAD_FILE, {
        onCompleted: async (data) => {
            setWhitePaperLink(data?.singleUpload?.filepath)
            await updateWhitePaperData(data?.singleUpload?.filepath, data?.singleUpload?.project_id)
            console.log("Complete 11", (data?.singleUpload?.filepath));
        }
    })
    const [uploadOnePagerDocAsync] = useMutation(UPLOAD_FILE, {
        onCompleted: async (data) => {
            // setWhitePaperLink(data?.singleUpload?.filepath)
            await setOnePageDocLink(data?.singleUpload?.filepath)
            await updateOnePagergraphFunc(data?.singleUpload?.filepath, data?.singleUpload?.project_id)

            console.log("Complete 11", (data?.singleUpload?.filepath));
        }
    })
    const [uploadImageCoverDataAsync] = useMutation(UPLOAD_FILE, {
        onCompleted: async (data) => {
            await updateImageCovergraphqlFunc(data?.singleUpload?.filepath, data?.singleUpload?.project_id)
            await setCoverImage(data?.singleUpload?.filepath)
            console.log("Complete 11", (data?.singleUpload?.filepath), data?.singleUpload?.filepath);
        }
    })
    const [uploadImageDataAsync] = useMutation(UPLOAD_FILE, {
        onCompleted: async (data) => {
            await updateImagegraphqlFunc(data?.singleUpload?.filepath, data?.singleUpload?.project_id)
            await setProfilePic(data?.singleUpload?.filepath)
            console.log("Complete 11", (data?.singleUpload?.filepath));
        }
    })
    const [uploadOnePitchDocAsync] = useMutation(UPLOAD_FILE, {
        onCompleted: async (data) => {
            await updateOnePitchDocFunc(data?.singleUpload?.filepath, data?.singleUpload?.project_id)
            await setPitchDeckLink(data?.singleUpload?.filepath)
            console.log("Complete 11", (data?.singleUpload?.filepath));
        }
    })

    const subMainSaveDraftFunc = async () => {
        try {
            var query = `
            mutation Mutation($input: ProjectInput) {
                createProject(input: $input) {
                  _id
                 
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_end_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
                  project_blockchain_id
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
                            "user": loginId,
                            "email_id": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "linkedin_profile_link": linkedInLink,
                            "project_name": projectName,
                            "project_description": projectDesc,
                            "nature_of_project": natureofProject,
                            "project_start_date": projectStartDate,
                            "project_tags": projectTags,
                            "project_stage": projectStage,
                            "website_link": websiteLink,
                            "github_repository": githubRepo,
                            "fund_raised_till_now": fundRaisedTillNow,

                            // "whitepaper": whitePaper,
                            // "one_pager_document": onePagerDoc,
                            // "pitch_deck": pitch,

                            "one_line_description": onelinedescription,
                            // "cover_page": CoverImage,
                            // "pitch_deck": PitchDeckLink,
                            // "logo": profilePic,
                            // "whitepaper": WhitePaperLink,
                            // "one_pager_document": OnePageDocLink,
                            // "pitch_deck": pitch,PitchDeckLink,

                            "number_of_founders": noofFounders,
                            "team_size": parseInt(teamSize),
                            "total_budget": totalBudget,
                            // "project_end_date": projectEndDate,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                            "fund_raised_target": totalFundRaiseTarget,
                            "public_launch_price": publicLaunchPrice,
                            "project_status": "Ongoing",
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            // "project": projectIdData,
                            "linkedin": linkedInLink,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium,


                            "product_demo": productDemo,
                            "video_pitch": VideoPitch,
                            // "draft_status":false
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // if()
                    console.log(data?.data?.createProject);

                    if (data?.data?.createProject) {
                        // saveUserWalletAddress() NOTE: DON'T UPDATE USER WALLET
                        await getUserDetailsFunc(data?.data?.createProject?._id)
                        await dispatch(projectId(data?.data?.createProject?._id))
                        // console.log('calling addFounderFunc')
                        await mainSaveFunc(data?.data?.createProject?._id)
                        // let founder_status = await addFounderFunc()
                        // console.log('called addFounderFunc', founder_status)
                        // console.log('calling setFounderAndTotalValueForProjectFunc')
                        // let { project_blockchain_id, project_start_date, project_end_date } = data?.data?.createProject;
                        // console.log("data?.data?.createProject", data?.data?.createProject)
                        // let value_status = await setFounderAndTotalValueForProjectFunc(project_blockchain_id, project_start_date, project_end_date)
                        // console.log('called setFounderAndTotalValueForProjectFunc', value_status)
                        // handleCloseShow()

                        toast.success('Your Data Has been Saved Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                })


        } catch (error) {
            alert(`${error} in Project Create Page`)
            console.log("adding new projectDetail9 error");
        }

    }

    const subMainSaveFunc = async () => {


        try {
            var query = `
            mutation Mutation($input: ProjectInput) {
                createProject(input: $input) {
                  _id
                 
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_end_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
                  project_blockchain_id
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
                            "user": loginId,
                            "email_id": emailId,
                            "last_name": lastName,
                            "first_name": firstName,
                            "linkedin_profile_link": linkedInLink,
                            "project_name": projectName,
                            "project_description": projectDesc,
                            "nature_of_project": natureofProject,
                            "project_start_date": projectStartDate,
                            "project_tags": projectTags,
                            "project_stage": projectStage,
                            "website_link": websiteLink,
                            "github_repository": githubRepo,
                            "fund_raised_till_now": fundRaisedTillNow,

                            // "whitepaper": whitePaper,
                            // "one_pager_document": onePagerDoc,
                            // "pitch_deck": pitch,

                            "one_line_description": onelinedescription,
                            // "cover_page": CoverImage,
                            // "pitch_deck": PitchDeckLink,
                            // "logo": profilePic,
                            // "whitepaper": WhitePaperLink,
                            // "one_pager_document": OnePageDocLink,
                            // "pitch_deck": pitch,PitchDeckLink,

                            "number_of_founders": noofFounders,
                            "team_size": parseInt(teamSize),
                            "total_budget": totalBudget,
                            // "project_end_date": projectEndDate,
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                            "fund_raised_target": totalFundRaiseTarget,
                            "public_launch_price": publicLaunchPrice,
                            "project_status": "Ongoing",
                            "youtube": youTube,
                            "twitter": twitter,
                            "telegram": Telegram,
                            "reddit": Reddit,
                            // "project": projectIdData,
                            "linkedin": linkedInLink,
                            "instagram": Instagram,
                            "facebook": facebook,
                            "discord": Discord,
                            "medium": Medium,


                            "product_demo": productDemo,
                            "video_pitch": VideoPitch,
                            "draft_status": false
                            // "validator_score": validatorScore,
                            // "investor_score": InvestorScore,
                        },


                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    // if()
                    console.log(data?.data?.createProject);

                    if (data?.data?.createProject) {
                        // saveUserWalletAddress() NOTE: DON'T UPDATE USER WALLET
                        // getUserDetailsFunc()
                        await dispatch(projectId(data?.data?.createProject?._id))
                        // console.log('calling addFounderFunc')
                        await mainSaveFunc(data?.data?.createProject?._id)
                        // let founder_status = await addFounderFunc()
                        // console.log('called addFounderFunc', founder_status)
                        // console.log('calling setFounderAndTotalValueForProjectFunc')
                        // let { project_blockchain_id, project_start_date, project_end_date } = data?.data?.createProject;
                        // console.log("data?.data?.createProject", data?.data?.createProject)
                        // let value_status = await setFounderAndTotalValueForProjectFunc(project_blockchain_id, project_start_date, project_end_date)
                        // console.log('called setFounderAndTotalValueForProjectFunc', value_status)
                        handleCloseShow()

                        toast.success('Your Data Has been Saved Successfully', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {

                        toast.error('Your changes cannot be saved', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                })


        } catch (error) {
            alert(`${error} in Project Create Page`)
            console.log("adding new projectDetail9 error");
        }


    }

    const updateWhitePaperData = async (i, id) => {

        try {
            var query = `

            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
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

                        "id": id,
                        "input": {
                            "whitepaper": i,
                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {

                    getUserDetailsFunc(id)
                })


        } catch (error) {
            console.log("adding new projectDetail1 error");
        }


    }

    const updateOnePagergraphFunc = async (i, id) => {




        try {
            var query = `

            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
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

                        "id": id,
                        "input": {
                            "one_pager_document": i,
                            // "one_pager_document": onePagerDoc,
                            // "pitch_deck": pitch,
                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {

                    getUserDetailsFunc(id)
                })


        } catch (error) {
            console.log("adding new projectDetail1 error");
        }


    }

    const updateImageCovergraphqlFunc = async (i, id) => {




        try {
            var query = `

            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
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

                        "id": id,
                        "input": {
                            "cover_page": i,
                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {

                    getUserDetailsFunc(id)
                })


        } catch (error) {
            console.log("adding new projectDetail1 error");
        }


    }
    const updateImagegraphqlFunc = async (i, id) => {




        try {
            var query = `

            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
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

                        "id": id,
                        "input": {
                            "logo": i,
                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {

                    getUserDetailsFunc(id)
                })


        } catch (error) {
            console.log("adding new projectDetail1 error");
        }


    }

    const updateOnePitchDocFunc = async (i, id) => {




        try {
            var query = `

            mutation Mutation($id: ID, $input: ProjectInput) {
                updateProject(_id: $id, input: $input) {
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

                        "id": id,
                        "input": {
                            "pitch_deck": i,
                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {

                    getUserDetailsFunc(id)
                })


        } catch (error) {
            console.log("adding new projectDetail1 error");
        }


    }



    const mainSaveFunc = async (projId) => {


        // if (whitePaper.length > 0 && onePagerDoc.length > 0 && onePitchDoc.length > 0 && imageCoverData.length > 0 && imageData.length > 0) {
        //     await uploadFileCreate({
        //         variables: {
        //             file: whitePaper[0].file,
        //             "input": {
        //                 "project_id": projId
        //             }
        //         }
        //     })
        //     console.log("Complete below1");


        // } else {
        if (whitePaper.length > 0) {
            await uploadWhitePaperAsync({
                variables: {
                    file: whitePaper[0].file,
                    "input": {
                        "project_id": projId
                    }
                }
            })
            console.log("Complete below2");
        } else {
            await updateWhitePaperData(WhitePaperLink, projId)
            // setWhitePaperLink(WhitePaperLink)
            console.log("Complete below3");
        }
        if (onePagerDoc.length > 0) {
            await uploadOnePagerDocAsync({
                variables: {
                    file: onePagerDoc[0].file,
                    "input": {
                        "project_id": projId
                    }
                }
            })
            console.log("Complete below4");
        } else {

            console.log("Complete below5");
            // setOnePageDocLink(data?.singleUpload?.filepath)
            await updateOnePagergraphFunc(OnePageDocLink, projId)
        }

        if (imageCoverData.length > 0) {
            await uploadImageCoverDataAsync({
                variables: {
                    file: imageCoverData[0].file,
                    "input": {
                        "project_id": projId
                    }
                }
            })
            console.log("Complete below4");
        } else {
            await updateImageCovergraphqlFunc(profilePicCover, projId)
            console.log("Complete below5");
            // setCoverImage(data?.singleUpload?.filepath)

        }
        if (imageData.length > 0) {
            await uploadImageDataAsync({
                variables: {
                    file: imageData[0].file,
                    "input": {
                        "project_id": projId
                    }
                }
            })
            console.log("Complete below4");
        } else {
            console.log("Complete below5");
            // setProfilePic(profilePic)
            await updateImagegraphqlFunc(profilePic, projId)
        }


        if (onePitchDoc.length > 0) {
            await uploadOnePitchDocAsync({
                variables: {
                    file: onePitchDoc[0].file,
                    "input": {
                        "project_id": projId
                    }
                }
            })
            console.log("Complete below6");
        } else {
            await updateOnePitchDocFunc(PitchDeckLink, projId)
            console.log("Complete below7");
            // setPitchDeckLink(PitchDeckLink)
        }
        // }

        // getUserDetailsFunc()

    }


    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }


    const opennewWindowForDoc = (i) => {
        console.log(i, "iiii");

        window.open(i, '_blank').focus();
        // window.open(i)
    }



    const socialLinkFunc = () => {
        setShowSocialIcon(true)
    }

    const socialMediaIconClose = () => {
        setShowSocialIcon(false)
    }


console.log(allProjectFundingData[0]?.grants_name,"data");
    return (

        <div>

            <div className="card-body" style={{ padding: '0px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '0px' }}>


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '22px', marginBottom: '15px' }}>Project Summary
                            {userRole == 'Co-Founder' ?
                                <></>
                                :
                                <button className="edit-icon-2" onClick={() => handleShow()}><i className="fa fa-pencil" /></button>

                            }</h2>
                        {/* "140px" boxShadow: 'rgb(196, 200, 208) 0px 10px 20px','50%' marginLeft: "60%"*/}
                        {/* New Design */}
                        <div className="wrap p2">
                            <div style={{ minHeight: '300px' }}>
                                {
                                    profilePic != '' && profilePic != undefined && profilePic != null ?
                                        <img src={profilePic} className='borderValueAll' style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', boxShadow: '0px 7px 14px #ababab66' }}></img>
                                        :

                                        <img src={""} className='borderValueAll' style={{ borderRadius: "2px", position: "absolute", marginLeft: "2%", marginTop: "220px", width: "10%", minWidth: '150px', minHeight: '150px', background: 'white', boxShadow: '0px 7px 14px #ababab66' }}></img>


                                }

                                {
                                    profilePicCover != '' && profilePicCover != undefined && profilePicCover != null ?

                                        <img src={profilePicCover} className='borderValueAll' style={{ width: "100%", height: '300px', borderRadius: '5px' }}></img>
                                        :
                                        <img src={''} className='borderValueAll' style={{ width: "100%", height: '300px', borderRadius: '5px' }}></img>


                                }


                            </div>
                            <div className="mt-3" style={{ display: "flex", marginBottom: '25px', justifyContent: 'end' }}>
                                {websiteLink != '' && websiteLink != null && websiteLink != undefined ?

                                    <img className="sociallogo" src={website} onClick={() => { opennewWindowForDoc(websiteLink) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={website} >
                                    // </img>

                                }
                                {twitter != '' && twitter != null && twitter != undefined ?

                                    <img className="sociallogo" src={twitterIcon} onClick={() => { opennewWindow(twitter) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={twitterIcon}>
                                    // </img>
                                }

                                {youTube != '' && youTube != null && youTube != undefined ?

                                    <img className="sociallogo" src={youtube} onClick={() => { opennewWindow(youTube) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={youtube}>
                                    // </img>
                                }

                                {Medium != '' && Medium != null && Medium != undefined ?

                                    <img className="sociallogo" src={medium} onClick={() => { opennewWindow(Medium) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={medium}>
                                    // </img>
                                }

                                {Instagram != '' && Instagram != null && Instagram != undefined ?

                                    <img className="sociallogo" src={instagram} onClick={() => { opennewWindow(Instagram) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={instagram}>
                                    // </img>
                                }
                                {Discord != '' && Discord != null && Discord != undefined ?

                                    <img className="sociallogo" src={discord} onClick={() => { opennewWindow(Discord) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={discord}>
                                    // </img>
                                }
                                {Telegram != '' && Telegram != null && Telegram != undefined ?

                                    <img className="sociallogo" src={telegram} onClick={() => { opennewWindow(Telegram) }}>
                                    </img>
                                    :

                                    ""
                                    // <img className="sociallogo" src={telegram}>
                                    // </img>
                                }
                                {facebook != '' && facebook != null && facebook != undefined ?

                                    <img className="sociallogo" src={facebookIcon} onClick={() => { opennewWindow(facebook) }}>
                                    </img>
                                    :
                                    ""
                                    // <img className="sociallogo" src={facebookIcon}>
                                    // </img>
                                }
                                {/* <img className="sociallogo" src={youtube}>
                                </img>
                                <img className="sociallogo" src={medium}>
                                </img>
                                <img className="sociallogo" src={instagram}>
                                </img>
                                <img className="sociallogo" src={discord}>
                                </img>
                                <img className="sociallogo" src={telegram}>
                                </img>
                                <img className="sociallogo" src={facebook}>
                                </img> */}
                                {linkedInLink != '' && linkedInLink != null && linkedInLink != undefined ?

                                    <img className="sociallogo" src={ld} onClick={() => { opennewWindow(linkedInLink) }}>
                                    </img>
                                    :
                                    // <img className="sociallogo" src={ld}>
                                    // </img>


                                    ""
                                }
                                {/* {linkedInLink != '' && linkedInLink != null && linkedInLink != undefined ? */}

                                <img className="sociallogo" src={shareIcon} onClick={() => socialLinkFunc()} >
                                </img>
                                {/* //     :
                                //     <img className="sociallogo" src={ld}>
                                //     </img>

                                // }
                                 */}
                            </div>
                            <div>



                                <div className="row " style={{ marginTop: '60px', padding: "0px 0px 0px 20px" }}>
                                    <div className="col-lg-6 col-md-6 col-sm-12" style={{background:"white",borderRadius:"5px",padding:"19px 10px 10px 19px",boxShadow:"0px 9px 13px 7px rgb(245 245 245)"}}>
                                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "500" }} className="mb-2">{projectName != null && projectName != undefined && projectName}</h2>
                                        <h4 style={{ marginBottom: '15px' }}>{onelinedescription != null && onelinedescription != undefined && onelinedescription}</h4>
                                        <div className="row">
                                            <div className="col-3">
                                                <p className='mainParaFontWeight' style={{ fontWeight:"500", fontSize: "16px" }} >Nature</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"500", fontSize: "16px" }} >Tags</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"500", fontSize: "16px" }} >Stage</p>
                                                <p className='mainParaFontWeight' style={{ fontWeight:"500", fontSize: "16px" }} >About</p>
                                            </div>
                                            <div className="col-9">
                                                <p className='mainParaFontWeight'>{natureofProject != null && natureofProject != undefined && natureofProject}</p>
                                                <p className='mainParaFontWeight' style={{overflowX:"hidden"}}>{projectTags != null && projectTags != undefined && projectTags}</p>
                                                <p className='mainParaFontWeight'>{projectStage != null && projectStage != undefined && projectStage}</p>
                                                {/* <p className='mainParaFontWeight'>Project Description</p> */}
                                                <p className='mainParaFontWeight' style={{ width: '100%', overflow: 'hidden', wordBreak: 'break-word' }}>{projectDesc != null && projectDesc != undefined && projectDesc}</p>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-3">
                                                <div style={{ height: "100px" }}>
                                                    <p style={{ fontWeight:"500", fontSize: "16px" }}>Team</p></div>
                                            </div>
                                            <div className="col-9">
                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2 " >{noofFounders != null && noofFounders != undefined && Number(noofFounders).toLocaleString("en-US")}</h2>
                                                        <p className='marginForPar'>Founder</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2">{teamSize != null && teamSize != undefined && Number(teamSize).toLocaleString("en-US")}</h2>
                                                        <p className='marginForPar' >Team</p>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-3">
                                                <div style={{ height: "100px" }}>
                                                    <p style={{ fontWeight:"600", fontSize: "16px" }}>Funding</p></div>
                                            </div>
                                            <div className="col-9">


                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        {/* <<<<<<< HEAD */}
                                                        <div style={{ display: "flex", marginBottom: '5px' }}>
                                                            {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                            {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                            {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                            {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                                                            {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                            {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                            {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                            {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                            {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                            {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                            {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                            {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                            {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                            {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                            {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                            <h2 className="bcolor ml-2 founderFontSizeh2 founderFontSizeh2" style={{ minHeight: '29px' }}>{allProjectFundingData.length > 0 ?

                                                                // =======
                                                                //                                                         <h2 className="bcolor">{allProjectFundingData.length > 0 ?

                                                                // >>>>>>> 19b31ff06d17a3e3dab1af83df73abcff16e3740
                                                                Number(allProjectFundingData[0]?.total_fund_raise_target).toLocaleString("en-US")
                                                                : ""}</h2>
                                                        </div>
                                                        <p className="marginForPar">Total Fund Raise</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        {/* <<<<<<< HEAD */}
                                                        <div style={{ display: "flex", marginBottom: '5px' }}>
                                                            {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                            {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                            {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                            {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                                                            {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                            {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                            {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                            {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                            {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                            {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                            {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                            {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                            {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                            {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                            {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                            <h2 className="bcolor ml-2 founderFontSizeh2" style={{ minHeight: '29px' }}>{allProjectFundingData.length > 0 ?


                                                                // =======
                                                                //                                                         <h2 className="bcolor">{allProjectFundingData.length > 0 ?


                                                                // >>>>>>> 19b31ff06d17a3e3dab1af83df73abcff16e3740
                                                                Number(allProjectFundingData[0]?.fund_raised).toLocaleString("en-US")
                                                                : ""}</h2></div>
                                                        <p className="marginForPar">Fund Raised</p>
                                                    </div>

                                                </div>
                                                <div className="row " style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2"> {
                                                            Number(oneLengthpageDoc.length).toLocaleString("en-US")}</h2>
                                                        <p className="marginForPar">No of Investors</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ lineHeight: '1', minHeight: '29px' }}>{allProjectFundingData.length > 0 ?

                                                            allProjectFundingData[0]?.external_lead_investor != null && allProjectFundingData[0]?.external_lead_investor != undefined && allProjectFundingData[0]?.external_lead_investor != '' ?
                                                                allProjectFundingData[0]?.external_lead_investor :
                                                                allProjectFundingData[0]?.lead_investor?.fund_name : ""}</h2>
                                                        <p className="marginForPar">Lead Investor</p>
                                                    </div>

                                                </div>
                                                <div className="row" style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    <div className="col p-2 m-2 borderValueAll" style={{

                                                        position: 'relative',
                                                        width: '100%',
                                                        flexBasis: '0',
                                                        flexGrow: '1',
                                                        maxWidth: '100%'
                                                    }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ minHeight: '29px' }}>{allProjectFundingData.length > 0 ?
                                                            allProjectFundingData[0]?.stage_of_funding : ""}</h2>
                                                        <p className="marginForPar">Stage of Funding</p>
                                                    </div>
                                                    <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ lineHeight: '1', minHeight: '29px' }}>{fundRaiseValuation}</h2>
                                                        <p className="marginForPar">FDV Valuation</p>
                                                    </div>
                                                </div>




                                                <div className="row" style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                    {allProjectFundingData[0]?.incubator_name !=undefined && allProjectFundingData[0]?.incubator_name !=null && allProjectFundingData[0]?.incubator_name !="" && allProjectFundingData[0]?.isIncubated ==true?                                              
                                                    <div className="col p-2 m-2 borderValueAll" style={{
                                                  position: 'relative',
                                                  width: '100%',
                                                  flexBasis: '0',
                                                  flexGrow: '1',
                                                  maxWidth: '100%'
                                                   }}>
                                                <h2 className="bcolor founderFontSizeh2" style={{ minHeight: '29px' }}>
                                                          {allProjectFundingData[0]?.incubator_name}</h2>
                                                 <p className="marginForPar">Incubator</p>
                                                 </div>:""}
                                                 {allProjectFundingData[0]?.grants_name!=null && allProjectFundingData[0]?.grants_name !="" && allProjectFundingData[0]?.grants_name!=undefined && allProjectFundingData[0]?.isGrants ==true?
                                                 <div className="col p-2 m-2 borderValueAll" style={{ minWidth: "45%" }}>
                                                        <h2 className="bcolor founderFontSizeh2" style={{ lineHeight: '1', minHeight: '29px' }}>
                                                            {allProjectFundingData[0]?.grants_name}</h2>
                                                        <p className="marginForPar">Grants</p>
                                                    </div> :""}
                                                    
                                                </div>



                                                <div className="row" style={{ display: "flex", margin: '0px', padding: '0px', width: '100%' }}>
                                                {allProjectFundingData[0]?.mode_of_funding !=undefined && allProjectFundingData[0]?.mode_of_funding !=null && allProjectFundingData[0]?.mode_of_funding !=""?           
                                                <div className="col p-2 m-2 borderValueAll" style={{

                                                 position: 'relative',
                                                 width: '100%',
                                                 flexBasis: '0',
                                                 flexGrow: '1',
                                                 maxWidth: '100%'
                                                 }}>
                                                 <h2 className="bcolor founderFontSizeh2" style={{ minHeight: '29px' }}>
                                                     {allProjectFundingData[0]?.mode_of_funding}</h2>
                                                 <p className="marginForPar">Mode of Fundiing</p>
                                                 </div>:"" }
                                    


                                                </div>

                                            </div>
                                        </div>



                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div style={{ marginBottom: '20px' }}>
                                            <div className='mainDivPie'>

                                                <div className="col mainPieCircle">
                                                    <div style={{ height: '120px', width: '115px' }}>
                                                        {
                                                            overallRatingScore != null && overallRatingScore != undefined ?
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
                                                                        { title: (10 - overallRatingScore), value: (10 - overallRatingScore), color: '#94B3E8' },
                                                                        { title: overallRatingScore, value: overallRatingScore, color: '#6345ED' },
                                                                        // { title: 'Three', value: 20, color: '#6A2135' },
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

                                                    {
                                                        overallRatingScore != null && overallRatingScore != undefined ?
                                                            <div className='marginTopCircleTxt' >{overallRatingScore}</div>
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
                                                        {
                                                            investorRatingScore != null && investorRatingScore != undefined ?
                                                                <PieChart
                                                                    animate
                                                                    animationDuration={500}
                                                                    animationEasing="ease-out"
                                                                    labelPosition={45}
                                                                    lineWidth={40}
                                                                    data={[
                                                                        { title: (10 - investorRatingScore), value: (10 - investorRatingScore), color: '#94B3E8' },
                                                                        { title: investorRatingScore, value: investorRatingScore, color: '#6345ED' },
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

                                                    {
                                                        investorRatingScore != null && investorRatingScore != undefined ?
                                                            <div className='marginTopCircleTxt' >{investorRatingScore}</div>
                                                            :
                                                            <div className='marginTopCircleTxt' >{0}</div>
                                                    }

                                                    <div>

                                                        <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Investor Score</h3>
                                                    </div>
                                                </div>
                                                <div className="col mainPieCircle">
                                                    <div style={{ height: '120px', width: '115px' }}>
                                                        {
                                                            validatorRatingScore != null && validatorRatingScore != undefined ?

                                                                <PieChart
                                                                    animate
                                                                    animationDuration={500}
                                                                    animationEasing="ease-out"
                                                                    labelPosition={45}
                                                                    lineWidth={40}
                                                                    data={[
                                                                        { title: validatorRatingScore, value:(10 -  validatorRatingScore), color: '#94B3E8' },
                                                                        { title: validatorRatingScore, value: validatorRatingScore, color: '#6345ED' },
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

                                                    {
                                                        validatorRatingScore != null && validatorRatingScore != undefined ?
                                                            <div className='marginTopCircleTxt' >{validatorRatingScore}</div>
                                                            :
                                                            <div className='marginTopCircleTxt' >{0}</div>
                                                    }

                                                    <div>

                                                        <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>Guardian Score</h3>
                                                    </div>
                                                    {/* <div style={{ marginTop: '-85px',  fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row text-align-center" style={{ marginLeft: '-8px', marginRight: '-8px' }}>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {OnePageDocMainLink != '' && OnePageDocMainLink != null && OnePageDocMainLink != undefined ?
                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(OnePageDocMainLink) }}>One pager</button>
                                                    :
                                                    <button type="button" className="linkbt ">One pager</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(WhitePaperMainLink) }}>Whitepaper</button>
                                                    :
                                                    <button type="button" className="linkbt " >Whitepaper</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {PitchDeckMainLink != '' && PitchDeckMainLink != null && PitchDeckMainLink != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(PitchDeckMainLink) }}>Pitch Deck</button>
                                                    :
                                                    <button type="button" className="linkbt ">Pitch Deck</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {/* <button type="button" className="linkbt mt-2"></button> */}

                                                {githubRepo != '' && githubRepo != null && githubRepo != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(githubRepo) }}>Git Hub</button>
                                                    :
                                                    <button type="button" className="linkbt ">Git Hub</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {/* <button type="button" className="linkbt mt-2"></button> */}

                                                {productDemo != '' && productDemo != null && productDemo != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(productDemo) }}>Product Demo</button>
                                                    :
                                                    <button type="button" className="linkbt ">Product Demo</button>
                                                }
                                            </div>
                                            <div className="col-6" style={{ textAlign: "center", padding: '0px 8px 15px 8px' }}>
                                                {/* <button type="button" className="linkbt mt-2"></button> */}

                                                {VideoPitch != '' && VideoPitch != null && VideoPitch != undefined ?

                                                    <button type="button" className="linkbt " onClick={() => { opennewWindowForDoc(VideoPitch) }}> Video Pitch</button>
                                                    :
                                                    <button type="button" className="linkbt ">Video Pitch</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                         
                                </div>
                            </div>

                        </div>



                        <div className="" style={{ display: "none" }}>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Project Id</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectIdget != null && projectIdget != undefined && projectIdget}</td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Project Address</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{WalledtAddress != null && WalledtAddress != undefined && WalledtAddress}</td>
                                    </tr> */}
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Email ID</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{emailId != null && emailId != undefined && emailId}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>First Name</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{firstName != null && firstName != undefined && firstName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Last Name</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{lastName != null && lastName != undefined && lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>LinkedIn Profile </td>

                                        {linkedInLink != '' && linkedInLink != null && linkedInLink != undefined ?
                                            <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '100%', cursor: 'pointer' }} onClick={() => { opennewWindow(linkedInLink) }} >{linkedInLink}</div>
                                            :
                                            ''

                                        }
                                        {/* <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{linkedInLink != null && linkedInLink != undefined && linkedInLink}</td> */}
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Name</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectName != null && projectName != undefined && projectName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Description</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectDesc != null && projectDesc != undefined && projectDesc}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Nature of Project</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{natureofProject != null && natureofProject != undefined && natureofProject}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Start Date</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectStartDate != null && projectStartDate != undefined && projectStartDate}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Tags</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectTags != null && projectTags != undefined && projectTags}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project Stage</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectStage != null && projectStage != undefined && projectStage}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Website </td>

                                        {websiteLink != '' && websiteLink != null && websiteLink != undefined ?
                                            <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '100%', cursor: 'pointer' }} onClick={() => { opennewWindow(websiteLink) }} >{websiteLink}</div>
                                            :
                                            ''

                                        }
                                        {/* <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{websiteLink != null && websiteLink != undefined && websiteLink}</td> */}
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>GitHub Repository</td>

                                        {githubRepo != '' && githubRepo != null && githubRepo != undefined ?
                                            <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '100%', cursor: 'pointer' }} onClick={() => { opennewWindow(githubRepo) }} >{githubRepo}</div>
                                            :
                                            ''

                                        }

                                        {/* <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{githubRepo != null && githubRepo != undefined && githubRepo}</td> */}
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Whitepaper</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                            {WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined ?
                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '120px', cursor: 'pointer' }} onClick={() => { opennewWindowForDoc(WhitePaperMainLink) }} >WhitePaper</div>
                                                :
                                                ''

                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>One Pager Document</td>

                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >

                                            {OnePageDocMainLink != '' && OnePageDocMainLink != null && OnePageDocMainLink != undefined ?
                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '150px', cursor: 'pointer' }} onClick={() => { opennewWindowForDoc(OnePageDocMainLink) }} >One Pager Document</div>
                                                :
                                                ''

                                            }
                                            {/* {onePagerDoc != null && onePagerDoc != undefined && onePagerDoc} */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Pitch Deck</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >

                                            {PitchDeckMainLink != '' && PitchDeckMainLink != null && PitchDeckMainLink != undefined ?
                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '150px', cursor: 'pointer' }} onClick={() => { opennewWindowForDoc(PitchDeckMainLink) }} >Pitch Deck</div>
                                                :
                                                ''

                                            }
                                            {/* {onePitchDoc != null && onePitchDoc != undefined && onePitchDoc} */}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Number of Founders</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{noofFounders != null && noofFounders != undefined && noofFounders}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Team Size</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{teamSize != null && teamSize != undefined && teamSize}</td>
                                    </tr>

                                    {/* <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Project End Date</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{projectEndDate != null && projectEndDate != undefined && projectEndDate}</td>

                                    </tr> */}
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Fund Raise Target</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalFundRaiseTarget != null && totalFundRaiseTarget != undefined && totalFundRaiseTarget}</td>

                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Budget</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalBudget != null && totalBudget != undefined && totalBudget}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Validator Score</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{validatorScore != null && validatorScore != undefined && validatorScore}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Investor Score</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{InvestorScore != null && InvestorScore != undefined && InvestorScore}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Fund Raised Till Date</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{fundRaisedTillNow != null && fundRaisedTillNow != undefined && fundRaisedTillNow}</td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>




                        <div className="pro-edit">
                            {/* <button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button> */}
                            {/* <div className="col-md-12" style={{ padding: '0px' }}> */}
                            {/* <div className="profile-view" style={{ margin: '10px' }}> */}
                            {/* <div className="profile-img-wrap-sub">
                                <div className="profile-img-sub" >
                                    <a href="#"><img alt="" src={profilePic} /></a> */}
                            {/* <h2>Logo</h2> */}
                            {/* </div>
                            </div> */}


                            {/* <div style={{ width: '35%', height: '500px' }}>
                                <CanvasJSChart options={options1} height="100%" width="100%" />
                            </div>


                            <div style={{ width: '35%', height: '500px' }}>
                                <CanvasJSChart options={options2} height="100%" width="100%" />
                            </div> */}
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
                {/* <div style={{ marginTop: '40px', textAlign: 'end' }}>
                    <button className="btn buttonInProposal1 submit-btn">CREATE PROJECT DATA PAGE</button>
                </div> */}

            </div>
            <ProjectModal
                onelinedescription={onelinedescription}
                setOnelinedescription={setOnelinedescription}
                // updateSocialFunc={updateSocialFunc}
                profilePicCover={profilePicCover}
                imageCoverData={imageCoverData}
                setImageCoverData={setImageCoverData}
                twitter={twitter}
                settwitter={settwitter}
                Instagram={Instagram}
                setInstagram={setInstagram}
                Medium={Medium}
                setMedium={setMedium}
                facebook={facebook}
                setfacebook={setfacebook}
                Discord={Discord}
                setDiscord={setDiscord}
                Reddit={Reddit}
                setReddit={setReddit}
                youTube={youTube}
                setyouTube={setyouTube}
                // createSocialFunc={createSocialFunc}
                Telegram={Telegram}
                setTelegram={setTelegram}
                imageData={imageData}
                setImageData={setImageData}
                profilePic={profilePic}
                setProfilePic={setProfilePic}
                setProfilePicCover={setProfilePicCover}
                PitchDeckMainLink={PitchDeckMainLink}
                OnePageDocMainLink={OnePageDocMainLink}
                WhitePaperMainLink={WhitePaperLink}
                setWhitePaperMainLink={setWhitePaperLink}

                InvestorScore={InvestorScore}
                setInvestorScore={setInvestorScore}
                validatorScore={validatorScore}
                setvalidatorScore={setvalidatorScore}
                publicLaunchPrice={publicLaunchPrice}
                setpublicLaunchPrice={setpublicLaunchPrice}
                settotalBudget={settotalBudget}
                totalBudget={totalBudget}
                settotalFundRaiseTarget={settotalFundRaiseTarget}
                totalFundRaiseTarget={totalFundRaiseTarget}
                // projectEndDate={projectEndDate}
                // setProjectEndDate={setProjectEndDate}
                WalledtAddress={WalledtAddress}
                setWalledtAddress={setWalledtAddress}
                emailId={emailId}
                setEmailId={setEmailId}
                firstName={firstName}
                setfirstName={setfirstName}
                lastName={lastName}
                setlastName={setlastName}
                linkedInLink={linkedInLink}
                setlinkedInLink={setlinkedInLink}
                LinkedIn={LinkedIn} setLinkedIn={setLinkedIn}
                projectName={projectName}
                setprojectName={setprojectName}
                projectDesc={projectDesc}
                setprojectDesc={setprojectDesc}
                natureofProject={natureofProject}
                setnatureofProject={setnatureofProject}
                projectStartDate={projectStartDate}
                setprojectStartDate={setprojectStartDate}
                whitePaper={whitePaper}
                setwhitePaper={setwhitePaper}
                onePitchDoc={onePitchDoc}
                setonePitchDoc={setonePitchDoc}
                onePagerDoc={onePagerDoc}
                setonePagerDoc={setonePagerDoc}
                noofFounders={noofFounders}
                setnoofFounders={setnoofFounders}
                teamSize={teamSize}
                setteamSize={setteamSize}
                projectTags={projectTags}
                setprojectTags={setprojectTags}
                projectStage={projectStage}
                setprojectStage={setprojectStage}
                websiteLink={websiteLink}
                setWebsiteLink={setWebsiteLink}
                githubRepo={githubRepo}
                setgithubRepo={setgithubRepo}
                show={show}
                handleClose={handleCloseShow}
                checkPage={checkPage}
                safeDraftFunc={safeDraftFunc}
                editSaveDraftFunc={editSaveDraftFunc}
                saveNewPojectData={saveNewPojectData}
                // editAndSaveData={editAndSaveData}
                editAndSaveData={editasyncFunc}

                fundRaisedTillNow={fundRaisedTillNow}
                setFundRaisedTillNow={setFundRaisedTillNow}

                PitchDeckLink={PitchDeckLink}
                setPitchDeckLink={setPitchDeckLink}
                setOnePageDocLink={setOnePageDocLink}
                OnePageDocLink={OnePageDocLink}

                VideoPitch={VideoPitch}
                setVideoPitch={setVideoPitch}
                productDemo={productDemo}
                setproductDemo={setproductDemo}
                draftStatus={draftStatus}

            />

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
            <SocialMediaSharePage show={showSocialIcon} handleClose={socialMediaIconClose} />
        </div>


    );
}
export default ProjectPage;
