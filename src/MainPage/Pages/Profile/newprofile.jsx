/**
 * Signin Firebase
 */
import { gql, useMutation } from '@apollo/client';

import React, { useEffect, useState } from 'react';
import { apiURI } from '../../../config/config';
import { Helmet } from "react-helmet";
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
import { mainProfile } from '../../../Entryfile/imagepath';
import ProfileSettings from './ProfileSettings';
import discord from './assets/discord.png'
import ld from './assets/ld.png'
import facebook from './assets/facebook.png'
import instagram from './assets/instagram.png'
import medium from './assets/medium.png'
import twitter from './assets/twitter.png'
import telegram from './assets/telegram.png'
import WebsiteIcon from './assets/website-icon.png'

import "./assets/profile.css"
import './myProfile.css'


import CNYimage from '../FounderProject/Funding/assets/images/CNY.png'
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


import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import ProfileSettingsFunding from './ProfileSettingsFunding';


const UPLOAD_FILE = gql`
mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
    singleUpload(file: $file, input: $input) {
      filename
      mimetype
      encoding
      url
      filepath
      ext
    }
  } `;



const ProfileNewEdits = () => {
    const [indexCountforSlect, setindexCountforSlect] = useState(0)

    const [proffredStage, setproffredStage] = useState([])
    const [twitterLinkFunding, settwitterLinkFunding] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const [fundLogo, setFundLogo] = useState('')

    const [FundimageData, setFundImageData] = useState('')
    const [imageData, setImageData] = useState('')
    const showSettings = useSelector((state) => state.constVar.showSettings)
    const [firstName, setFirstName] = useState('')
    const [currencyValue, setCurrency] = useState('USDC')

    const [lastName, setlastName] = useState('')
    const [roleInOrg, setRoleInOrg] = useState('')
    const [fundName, setfundName] = useState('')
    const [profileDesc, setProfileDesc] = useState('')
    const [fundDesc, setfundDesc] = useState('')
    const [assestmang, setassestmang] = useState('')
    const [minInvSize, setminInvSize] = useState('')
    const [projInvestedtilldate, setprojInvestedtilldate] = useState('')
    const [projInvested, setprojInvested] = useState('')
    const [fundHeadQuarter, setfundHeadQuarter] = useState('')
    const [typeofFund, settypeofFund] = useState('')
    const [teamSize, setteamSize] = useState('')
    const [proffredSector, setproffredSector] = useState([])
    const [linkeIn, setlinkeIn] = useState('')
    const [websiteLink, setwebsiteLink] = useState('')
    const [twitterLink, settwitterLink] = useState('')
    const [telegramLink, setTelegramLink] = useState('')
    const [LinkedInLink, setLinkedInLink] = useState('')
    const loginId = useSelector((state) => state.constVar.loginId)
    const [profileDetails, setProfileDetails] = useState([])
    const [profileFundDetails, setprofileFundDetails] = useState([])
    // const profileDetails = useSelector(selectAllProfile)
    console.log(fundHeadQuarter, "fundHeadQuarter");
    const [projectDetailsData, setProjectDetalsData] = useState([])
    const [show, setShow] = useState(false);
    const [showFunding, setShowFunding] = useState(false);
    const [isAngel, setisAngel] = useState();


    const handleClose = () => {
        getMyOwnProjectDetailsFunc()
        setShow(false)
        setShowFunding(false)
    };
    const handleCloseFunding = () => {
        getMyOwnProjectDetailsFunc()
        setShowFunding(false)
    };
    const handleShow = () => setShow(true);

    const handleShowFunding = () => {
        const countries = [
            { value: "USD", label: "USD" },
            // { value: "SDT", label: "SDT"
            // { value: "INR", label: "INR"},
            { value: "USDC", label: "USDC" },
            { value: "DAI", label: "DAI" },
            { value: "BUSD", label: "BUSD" },
            { value: "RUBLE", label: "RUBLE" },
            { value: "CAD", label: "CAD" },
            // { value: "GBP", label: "GBP",
            // { value: "AED", label: "AED",
            { value: "CNY", label: "CNY" },
            // { value: "VMD", label: "VMD",
            { value: "EURO", label: "EURO" },
            { value: "POUND", label: "POUND" },
            { value: "YUAN", label: "YUAN" },
            { value: "INR", label: "INR" },
            { value: "YEN", label: "YEN" },
            { value: "SGD", label: "SGD" },
            { value: "AUD", label: "AUD" },
            { value: "USDT", label: "USDT" },
            // { value: "YEN", label: "YEN",

        ]
        if (currencyValue != '' && currencyValue != null && currencyValue != undefined) {
            var indexCount = countries.findIndex((element) => element.value == currencyValue)
            console.log(indexCount, "indexCount");
            setindexCountforSlect(indexCount)
        } else {

            setindexCountforSlect(0)
        }
        setShowFunding(true)
    }


    useEffect(() => {
        if (loginId != '') {
            getMyOwnProjectDetailsFunc()
        }

    }, [loginId])
    console.log(proffredSector, "proffredSector");
    const getMyOwnProjectDetailsFunc = () => {
        try {

            var query =
                `
                query AllProposals($id: ID) {
                    getUser(_id: $id) {
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
                      profile_pic
                      telegram_link
                      aum
                      dummy
                      profile_rating {
                        value
                        user_role
                      }
                      proof_number
                      fund_logo
                      currency
                      preferred_stage_of_investment {
                        value
                      }
                      twitter_funding
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
                    console.log('ProjectGetFunctiondata', data);
                    if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
                        setProfileDetails([data?.data?.getUser])
                        setRoleInOrg(data?.data?.getUser.role_in_organization)
                        setFirstName(data?.data?.getUser.first_name)
                        
                        setlastName(data?.data?.getUser.last_name)
                        setfundName(data?.data?.getUser.fund_name)
                        setfundDesc(data?.data?.getUser.fund_description)
                        setassestmang(data?.data?.getUser.asset_under_management)
                        setminInvSize(data?.data?.getUser.minimum_investment_size)
                        setprojInvested(data?.data?.getUser.projected_invested_till_date)
                        setprojInvestedtilldate(data?.data?.getUser.project_invested)
                        setfundHeadQuarter(data?.data?.getUser.fund_head_quarters)
                        settypeofFund(data?.data?.getUser.type_of_fund)
                        setisAngel(data?.data?.getUser.type_of_fund === "Angel Investor" ? "true" : "false" )
                        setteamSize(data?.data?.getUser.team_size)
                        setlinkeIn(data?.data?.getUser.linkedin)
                        setwebsiteLink(data?.data?.getUser.website_link)
                        settwitterLink(data?.data?.getUser.twitter_link)
                        setTelegramLink(data?.data?.getUser.telegram_link)
                        setLinkedInLink(data?.data?.getUser.linkedin_link)
                        setProfilePic(data?.data?.getUser?.profile_pic)
                        setFundLogo(data?.data?.getUser?.fund_logo)
                        setProfileDesc(data?.data?.getUser?.self_description)
                        settwitterLinkFunding(data?.data?.getUser?.twitter_funding)
                        var arr = [];
                        for (var i = 0; i < data?.data?.getUser.preferred_sectors.length; i++) {
                            arr.push({
                                value: data?.data?.getUser.preferred_sectors[i].value,
                                label: data?.data?.getUser.preferred_sectors[i].value,
                                color: "#00B8D9"
                            })
                        }
                        var arr2 = [];
                        for (var i = 0; i < data?.data?.getUser.preferred_stage_of_investment.length; i++) {
                            arr2.push({
                                value: data?.data?.getUser.preferred_stage_of_investment[i].value,
                                label: data?.data?.getUser.preferred_stage_of_investment[i].value,
                                color: "#00B8D9"
                            })
                        }
                        setproffredStage(arr2)
                        setproffredSector(arr)
                        if(data?.data?.getUser.currency != null && data?.data?.getUser.currency != undefined && data?.data?.getUser.currency != ''){

                            setCurrency(data?.data?.getUser.currency)
                        }
                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            // updatePic()
            if (data?.singleUpload?.filepath != '' && data?.singleUpload?.filepath != null) {

                updatePic(data?.singleUpload?.filepath)
            } else {
                alert("Please Check The Image")
            }
            console.log("Completed uploadOnePitchDecFile", data);
        }
    })
    const [uploadFileFunding] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            // updatePic()
            if (data?.singleUpload?.filepath != '' && data?.singleUpload?.filepath != null) {

                updatePicFunding(data?.singleUpload?.filepath)
            } else {
                alert("Please Check The Image")
            }
            console.log("Completed uploadOnePitchDecFile", data);
        }
    })

    const updateProfileDetails = () => {

        if (imageData != '' && imageData != null && imageData != undefined) {
            uploadFile({ variables: { file: imageData[0].file ,
                "input": {
                    "project_id": ''
                }
            }})
        } else {
            updatePic()
            // alert("Please fill all the mandatory fields")
        }
    }



    const updateProfileFundDetails = () => {

        if (FundimageData != '' && FundimageData != null && FundimageData != undefined) {
            uploadFileFunding({ variables: { file: FundimageData[0].file ,
                "input": {
                    "project_id": ''
                }
            } })
        } else {
            updatePicFunding()
            // alert("Please fill all the mandatory fields")
        }
    }
    const updatePicFunding = (i) => {
        console.log(i, "mainUpload");
        if (i != null && i != undefined) {
            console.log(i, "mainUpload1");
            mainPicFundFunc(i)
        } else {
            console.log(i, "mainUpload2");
            mainPicFundFunc(fundLogo)
        }
    }


    const mainPicFundFunc = (pic) => {
        // if()
        var arr = []
        var arr2 = []

        for (var i = 0; i < proffredSector.length; i++) {
            arr.push({
                value: proffredSector[i].value
            })
        }

        for (var i = 0; i < proffredStage.length; i++) {
            arr2.push({
                value: proffredStage[i].value
            })
        }
        if(isAngel === "true")
        {
        settypeofFund("Angel Investor");
        }

        try {
            var query = `
                mutation Mutation($id: ID, $input: UserInput) {
                    updateUser(_id: $id, input: $input) {
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


                        "id": loginId,
                        "input": {
                            // "profile_pic": pic,
                            // "role_in_organization": roleInOrg,
                            "fund_description": fundDesc,
                            "fund_name": fundName,
                            "asset_under_management": assestmang,
                            "minimum_investment_size": minInvSize,
                            "project_invested": projInvestedtilldate,
                            "type_of_fund": typeofFund,
                            "projected_invested_till_date": projInvested,
                            "fund_head_quarters": fundHeadQuarter,
                            "team_size": parseInt(teamSize),
                            "preferred_sectors": arr,
                            // "linkedin": linkeIn,
                            "linkedin_link": LinkedInLink,
                            "website_link": websiteLink,
                            "fund_logo": pic,
                            "twitter_funding": twitterLinkFunding,
                            "preferred_stage_of_investment": arr2,

                            "currency": currencyValue,
                            // "twitter_link": twitterLink,
                            // "first_name": firstName,
                            // "last_name": lastName,
                            // "self_description": profileDesc,
                            // "telegram_link": telegramLink,


                        }



                        // "role_in_organization": roleinOrganization,
                        // "fund_description": fundDesc,
                        // "minimum_investment_size": minInvestSize,
                        // "project_invested": projectInvested,
                        // "type_of_fund": typeofFund,
                        // "preferred_sectors": preferredSectors,
                        // "fund_name": fundName,
                        // "asset_under_management": assetsUnderMang,
                        // "projected_invested_till_date": projInvestedtilldate,
                        // "fund_head_quarters": fundHeadQuater,
                        // "team_size": parseInt(teamSize)
                        ,

                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data, loginId, "ProfileSettings  data");
                    if (data?.data?.updateUser != null && data?.data?.updateUser != undefined) {
                        toast.success("Updated Successfully", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        getMyOwnProjectDetailsFunc()
                        handleClose()
                        console.log(data.data.updateUser, "ProfileSettings  Insidedata");
                    } else {
                    }
                });

        } catch (error) {
            console.log(error, "ProfileSettings  in profile in investors error");
        }



    }


    const updatePic = (i) => {
        console.log(i, "mainUpload");
        if (i != null && i != undefined) {
            console.log(i, "mainUpload1");
            mainPicFunc(i)
        } else {
            console.log(i, "mainUpload2");
            mainPicFunc(profilePic)
        }
    }

    const mainPicFunc = (pic) => {
        // if()
        var arr = []
        for (var i = 0; i < proffredSector.length; i++) {
            arr.push({
                value: proffredSector[i].value
            })
        }
        // if (minInvSize != '' && minInvSize != null && minInvSize != undefined) {
        try {
            // if(typeofFund === "Angel Investor")
            // {
            //     setfundDesc(' ');
            //     setfundName('');
            // }
            var query = `
                  mutation Mutation($id: ID, $input: UserInput) {
                    updateUser(_id: $id, input: $input) {
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


                        "id": loginId,
                        "input": {
                            "profile_pic": pic,
                            "role_in_organization": roleInOrg,
                            "fund_description": fundDesc,
                            "fund_name": fundName,
                            "asset_under_management": assestmang,
                            "minimum_investment_size": minInvSize,
                            "project_invested": projInvestedtilldate,
                            "type_of_fund": typeofFund,
                            "projected_invested_till_date": projInvested,
                            "fund_head_quarters": fundHeadQuarter,
                            "team_size": parseInt(teamSize),
                            "preferred_sectors": arr,
                            "linkedin": linkeIn,
                            "linkedin_link": LinkedInLink,
                            "website_link": websiteLink,
                            "twitter_link": twitterLink,
                            "first_name": firstName,
                            "last_name": lastName,
                            "self_description": profileDesc,
                            "telegram_link": telegramLink,
                            "currency": currencyValue,

                        }



                        // "role_in_organization": roleinOrganization,
                        // "fund_description": fundDesc,
                        // "minimum_investment_size": minInvestSize,
                        // "project_invested": projectInvested,
                        // "type_of_fund": typeofFund,
                        // "preferred_sectors": preferredSectors,
                        // "fund_name": fundName,
                        // "asset_under_management": assetsUnderMang,
                        // "projected_invested_till_date": projInvestedtilldate,
                        // "fund_head_quarters": fundHeadQuater,
                        // "team_size": parseInt(teamSize)
                        ,

                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data, loginId, "ProfileSettings  data");
                    if (data?.data?.updateUser != null && data?.data?.updateUser != undefined) {
                        toast.success("Updated Successfully", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        getMyOwnProjectDetailsFunc()
                        handleClose()
                        console.log(data.data.updateUser, "ProfileSettings  Insidedata");
                    } else {
                    }
                });

        } catch (error) {
            console.log(error, "ProfileSettings  in profile in investors error");
        }
        // } else {
        //     alert("Please fill all the mandatory fields")
        // }


    }

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }

    return (
        <div className="page-wrapper" style={{ paddingTop: '60px' }}>

            <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="page-title">My Profile</h3>
                        </div>
                    </div>
                </div>




                <div className="row">
                    <div className="col-12">
                        {/* <div className="profile-img" >
                            <a href="#"><img alt="" src={mainProfile} /></a>
                          </div> */}

                        <div className="col-md-12" style={{ padding: '0px' }}>
                            <div className="profile-view" style={{ margin: '0px' }}>
                                <div className="row">
                                    <div className="card profile-box flex-fill p-3 ml-2 mr-2" style={{ borderRadius: '15px !important', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>


                                        <div className=" row p-2 " style={{ height: "300px", borderRadius: "5px", border: "solid 2px  #e6e6e6", margin: '10px' }}>
                                            <div className="p-2 col-lg-3" >
                                                <img style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={profilePic}></img>
                                                <div className="mb-2 mt-3" style={{ width: "200px", display: "flex", justifyContent: "space-around" }}>
                                                    {twitterLink != null && twitterLink != undefined ?
                                                        <img src={twitter} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(twitterLink)}></img>
                                                        :
                                                        // <img src={twitter} style={{ width: "30px", margin: "auto" }} ></img>
                                                        <></>
                                                    }
                                                    {
                                                        LinkedInLink != null && LinkedInLink != undefined ?

                                                            <img src={ld} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(LinkedInLink)}></img>
                                                            :
                                                            <></>
                                                        // <img src={ld} style={{ width: "30px", margin: "auto" }}></img>

                                                    }

                                                    {
                                                        telegramLink != null && telegramLink != undefined ?

                                                            <img src={telegram} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(telegramLink)}></img>
                                                            :
                                                            <></>
                                                    }

                                                    {/* {twitterLink != null && twitterLink != undefined ?
                                                    <img src={telegram} style={{ width: "30px", margin: "auto" }} onClick={()=>opennewWindow(tele)}></img> 
                                                    :
                                                    <img src={telegram} style={{ width: "30px", margin: "auto" }}></img> 
                                                    
                                                 } */}
                                                </div>
                                            </div>
                                            <div className="p-2 col-lg-8">
                                                <h3>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].first_name} {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].last_name}</h3>
                                                {/* <h4>Partner</h4> */}
                                                <h4>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].email}</h4>

                                                <p>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].self_description}</p>
                                            </div>
                                            <div className="pro-edit" style={{ right: '32px', top: '32px' }}><button className="edit-icon" onClick={() => handleShow()} style={{ margin: '10px' }}><i className="fa fa-pencil" /></button></div>

                                        </div>

                                        <div className=" row p-2 " style={{ borderRadius: "5px", border: "solid 2px  #e6e6e6", display: "flex", flex: "wrap", margin: '10px' }}>
                                            <div className="pro-edit" style={{ right: '0px', top: '0px', position: 'relative', width: '100%',height:"0px" }}><button className="edit-icon" onClick={() => handleShowFunding()} style={{ margin: '10px' }}><i className="fa fa-pencil" /></button></div>


                                            <div className="p-2 col-xl-3 col-lg-3 col-md-12" >
                                                <div style={{ width: "400px" }}>
                                                    {/* Angel Investor Default Image */}
                                                    {isAngel === "true" ? 
                                                    <img style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={"https://dev.crsquare.finance/upload-86181670414001394.jpg"}></img>
                                                    :<img style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={fundLogo}></img>
                                                    }
                                                     {/* <img style={{ borderRadius: "50%", width: "200px", height: "200px" }} src={fundLogo}></img> */}
                                                    <div className="mb-2 mt-3" style={{ width: "200px", display: "flex", justifyContent: "space-around" }}>
                                                        {twitterLink != null && twitterLink != undefined ?
                                                            <img src={twitter} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(twitterLink)}></img>
                                                            :
                                                            <></>

                                                        }
                                                        {/* <img src={twitter} style={{ width: "30px", margin: "auto" }}></img> */}
                                                        {/* <img src={ld} style={{ width: "30px", margin: "auto" }}></img> */}
                                                        {
                                                            LinkedInLink != null && LinkedInLink != undefined ?

                                                                <img src={ld} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(LinkedInLink)}></img>
                                                                :
                                                                <></>

                                                        }
                                                        {

                                                            websiteLink != null && websiteLink != undefined ?

                                                                <img src={WebsiteIcon} style={{ width: "30px", margin: "auto" }} onClick={() => opennewWindow(websiteLink)}></img>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-2 col-xl-8 col-lg-8 col-md-12">

                                                <h3>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_name}
                                                    <span>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && `(${profileDetails[0].fund_head_quarters})`}
                                                    </span></h3>
                                                <p style={{ width: "700px" }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0]?.fund_description}</p>
                                                <p style={{ width: "700px" }}>
                                                    <div className="" style={{ textAlign: 'start' }}>
                                                        <div style={{ display: "flex" }}>

                                                            {currencyValue == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                            {currencyValue == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                            {currencyValue == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                            {currencyValue == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img> : ""}
                                                            {currencyValue == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                            {currencyValue == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                            {currencyValue == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                            {currencyValue == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                            {currencyValue == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                            {currencyValue == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                            {currencyValue == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                            {currencyValue == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                            {currencyValue == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                            {currencyValue == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                            {currencyValue == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                            <h3 className="mainFontH4 ml-2" style={{ textAlign: 'start', color: '#1890ff' }}>
                                                                {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined &&

                                                                    Number(profileDetails[0]?.asset_under_management).toLocaleString("en-US")
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    {/* {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && Number(profileDetails[0]?.asset_under_management).toLocaleString("en-US")} */}
                                                </p>
                                                <hr style={{ width: "100%" }}></hr>

                                                <div className="mb-4" style={{ display: "flex" }}>
                                                    <h3 style={{ width: "30%" }}>Preferred Stage</h3>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].preferred_stage_of_investment?.length > 0 ?

                                                        // , flexD 
                                                        <div className="gridClass" >

                                                            {profileDetails[0].preferred_stage_of_investment?.map(
                                                                (i) =>
                                                                (<div style={{ display: "flex", justifyContent: "space-around" }}>
                                                                    <button className="profile-bt" style={{ maxHeight: '45px' }}>
                                                                        {i.value}
                                                                    </button>
                                                                </div>
                                                                )

                                                            )}

                                                        </div>


                                                        : ''}
                                                </div>
                                                <div className="mb-4" style={{ display: "flex" }}>
                                                    <h3 style={{ width: "30%" }}>Preferred Sectors</h3>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].preferred_sectors?.length > 0 ?

                                                        // , flexD 
                                                        <div className="gridClass" >

                                                            {profileDetails[0].preferred_sectors?.map(
                                                                (i) =>
                                                                (<div style={{ display: "flex", justifyContent: "space-around" }}>
                                                                    <button className="profile-bt" style={{ maxHeight: '50px' }}>
                                                                        {i.value}
                                                                    </button>
                                                                </div>
                                                                )

                                                            )}

                                                        </div>


                                                        : ''}
                                                </div>
                                                <div className="mb-4" style={{ display: "flex" }}>
                                                    <h3 style={{ width: "300px" }}>Project Invested</h3>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <div style={{ display: "flex", justifyContent: "space-around", width: '100%' }}>
                                                        <button className="profile-bt" style={{ width: '100%', margin: '0px', background: 'none', color: 'black', textAlign: 'left' }}>{profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].project_invested}</button>
                                                        {/* <button className="profile-bt">Infrastructure</button>
                                                        <button className="profile-bt">Gamfi</button> */}
                                                    </div>
                                                </div>
                                                <hr style={{ width: "100%" }}></hr>
                                                <h3>Funding</h3>
                                                <div className="row">

                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                                <div className="widget-info-new mb-2" style={{  minHeight: "30px"}}>

                                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                                        {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].type_of_fund}
                                                                    </h3>

                                                                </div>
                                                                <span className="widget-box ft-weight">Type of Fund</span>
                                                            </div>

                                                            {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                                <div className="widget-info-new mb-2"  style={{  minHeight: "30px"}}>
                                                                    <div style={{ display: "flex" }}>

                                                                        {currencyValue == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                                        {currencyValue == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                                        {currencyValue == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                                        {currencyValue == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img> : ""}
                                                                        {currencyValue == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                                        {currencyValue == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                                        {currencyValue == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                                        {currencyValue == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                                        {currencyValue == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                                        {currencyValue == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                                        {currencyValue == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                                        {currencyValue == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                                        {currencyValue == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                                        {currencyValue == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                                        {currencyValue == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                                        <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && Number(profileDetails[0]?.asset_under_management).toLocaleString("en-US")}
                                                                        </h3>

                                                                    </div>
                                                                </div>
                                                                <span className="widget-box ft-weight">Assets Under Management</span>
                                                            </div>

                                                            {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                                <div className="widget-info-new mb-2"  style={{  minHeight: "30px"}}>
                                                                    <div style={{ display: "flex" }}>

                                                                        {currencyValue == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                                        {currencyValue == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                                        {currencyValue == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                                        {currencyValue == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img> : ""}
                                                                        {currencyValue == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                                        {currencyValue == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                                        {currencyValue == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                                        {currencyValue == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                                        {currencyValue == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                                        {currencyValue == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                                        {currencyValue == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                                        {currencyValue == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                                        {currencyValue == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                                        {currencyValue == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                                        {currencyValue == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                                        <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].minimum_investment_size}
                                                                        </h3>

                                                                    </div>
                                                                </div>
                                                                <span className="widget-box ft-weight">Minimum Investment Size</span>
                                                            </div>

                                                            {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                                <div className="widget-info-new mb-2"  style={{  minHeight: "30px"}}>

                                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                                        {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].projected_invested_till_date}
                                                                    </h3>

                                                                </div>
                                                                <span className="widget-box ft-weight">Number of Investments</span>
                                                            </div>

                                                            {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                                                        </div>

                                                    </div>

                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <p >
                                                            Primary Wallet address
                                                        </p>
                                                    </div>

                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <p >
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].wallet_address}
                                                        </p>
                                                    </div>


                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <p >
                                                            Primary Funding Wallet Network
                                                        </p>
                                                    </div>

                                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                                        <p >
                                                            Polygon
                                                        </p>
                                                    </div>



                                                </div>


                                            </div>





















                                        </div>



                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>



            </div>




            <ProfileSettingsFunding
                indexCountforSlect={indexCountforSlect}
                setproffredStage={setproffredStage}
                proffredStage={proffredStage}
                twitterLinkFunding={twitterLinkFunding}
                settwitterLinkFunding={settwitterLinkFunding}
                show={showFunding}
                handleClose={handleCloseFunding}
                imageData={FundimageData}
                profilePic={profilePic}
                fundLogo={fundLogo}
                setImageData={setFundImageData}
                showSettingsProfile={showSettings}
                profileDetails={profileDetails}
                updateProfileDetails={updateProfileFundDetails}
                count={setProjectDetalsData.length}
                roleInOrg={roleInOrg}
                fundName={fundName}
                fundDesc={fundDesc}
                assestmang={assestmang}
                minInvSize={minInvSize}
                projInvested={projInvested}
                projInvestedtilldate={projInvestedtilldate}
                fundHeadQuarter={fundHeadQuarter}
                typeofFund={typeofFund}
                teamSize={teamSize}
                proffredSector={proffredSector}
                linkeIn={linkeIn}
                websiteLink={websiteLink}
                twitterLink={twitterLink}
                LinkedInLink={LinkedInLink}
                setRoleInOrg={setRoleInOrg}
                setfundName={setfundName}
                profileDesc={profileDesc}
                setProfileDesc={setProfileDesc}
                setfundDesc={setfundDesc}
                setassestmang={setassestmang}
                setminInvSize={setminInvSize}
                setprojInvested={setprojInvested}
                setprojInvestedtilldate={setprojInvestedtilldate}
                setfundHeadQuarter={setfundHeadQuarter}
                settypeofFund={settypeofFund}
                setteamSize={setteamSize}
                setproffredSector={setproffredSector}
                setlinkeIn={setlinkeIn}
                setwebsiteLink={setwebsiteLink}
                settwitterLink={settwitterLink}
                setLinkedInLink={setLinkedInLink}
                firstName={firstName}
                lastName={lastName}
                setFirstName={setFirstName}
                setlastName={setlastName}
                setCurrency={setCurrency}
                currencyValue={currencyValue}
                setTelegramLink={setTelegramLink}
                telegramLink={telegramLink}
                isAngel={isAngel}
                setisAngel={setisAngel}


            />




            <ProfileSettings
                imageData={imageData}
                profilePic={profilePic}
                setImageData={setImageData}
                showSettingsProfile={showSettings}
                profileDetails={profileDetails}
                show={show}
                updateProfileDetails={updateProfileDetails}
                handleClose={handleClose}
                count={setProjectDetalsData.length}
                roleInOrg={roleInOrg}
                fundName={fundName}
                fundDesc={fundDesc}
                assestmang={assestmang}
                minInvSize={minInvSize}
                projInvested={projInvested}
                projInvestedtilldate={projInvestedtilldate}
                fundHeadQuarter={fundHeadQuarter}
                typeofFund={typeofFund}
                teamSize={teamSize}
                proffredSector={proffredSector}
                linkeIn={linkeIn}
                websiteLink={websiteLink}
                twitterLink={twitterLink}
                LinkedInLink={LinkedInLink}
                setRoleInOrg={setRoleInOrg}
                setfundName={setfundName}
                profileDesc={profileDesc}
                setProfileDesc={setProfileDesc}
                setfundDesc={setfundDesc}
                setassestmang={setassestmang}
                setminInvSize={setminInvSize}
                setprojInvested={setprojInvested}
                setprojInvestedtilldate={setprojInvestedtilldate}
                setfundHeadQuarter={setfundHeadQuarter}
                settypeofFund={settypeofFund}
                setteamSize={setteamSize}
                setproffredSector={setproffredSector}
                setlinkeIn={setlinkeIn}
                setwebsiteLink={setwebsiteLink}
                settwitterLink={settwitterLink}
                setLinkedInLink={setLinkedInLink}
                firstName={firstName}
                lastName={lastName}
                setFirstName={setFirstName}
                setlastName={setlastName}
                isAngel={isAngel}
                setTelegramLink={setTelegramLink}
                telegramLink={telegramLink}
            />
            {/* </div>
                </div> */}




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
        </div >

    );
}

export default ProfileNewEdits;
