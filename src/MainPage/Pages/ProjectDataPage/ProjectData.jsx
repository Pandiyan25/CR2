



import React, { useMemo, useState } from 'react';
import { button } from 'react-bootstrap';
import BudgetPage from '../FounderProject/Budget/BudgetPage';
import FounderFunding from '../FounderProject/Funding/FounderFunding';
import ProjectPage from '../FounderProject/projectPage';
import RoadmapPage from '../FounderProject/RoadMapPage';
import SocialPage from '../FounderProject/Social/SocialPage';
import Tokenomics from '../FounderProject/Tokenomics/Tokenomics';
import Checklist from './Checklist/Checklist';
import ProposalMainRoute from '../Pages/Proposals';
import AuditTrailPage from './AuditTrails/AuditTrail';
import ProposalMainPage from './ProposalMainPage';
import ReactLoading from "react-loading";
import TeamPage from './Team/TeamPage';
import "./pd.css"
import CongPopupLaunch from './CongPopupLaunch';
import { useEffect } from 'react';
import { apiURI } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import RatingsPage from './RatingsPage';
import { addFounder, isFounder, detectCurrentProvider } from '../../../config/web3Client3';
import { fetchLaunchReq, selectAllLaunchRequest } from '../../../reducers/LaunchSlice';
import { fetchFundingProjectDetails, selectAllFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { walletAddress } from '../../../reducers/ConstantSlice';
import { async } from 'regenerator-runtime';
// import ProgressBarLine from 'react-progressbar-line'
import { showTokenomicsData } from '../../../reducers/ConstantSlice';
import { ethers } from "ethers";
import { id } from 'ethers/lib/utils';
import QUAD_READER_ABI from '@quadrata/contracts/abis/QuadReader.json';
import UnderConstructionRoute from '../FounderProject/UnderConstructionPage';
import UnderContruction from './UnderConstrutcion';

const ProjectData = () => {
    const [status, setStatus] = useState(true)
    const [Percentage, setPercentage] = useState('0')
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [disableTokenomics, setdisableTokenomics] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showProject, setShowProject] = useState(true)
    const [showRoadmap, setshowRoadmap] = useState(false)
    const [showFunding, setshowFunding] = useState(false)
    const [showBudget, setshowBudget] = useState(false)
    const [showKYC, setshowKYC] = useState(false)
    const [showTokenomics, setshowTokenomics] = useState(false)
    const [showChecklist, setshowChecklist] = useState(false)
    const percentageData = useSelector(selectAllLaunchRequest)
    const fundmode = useSelector(selectAllFundingProjectDetails)
    const tokenomicsBoolean = useSelector((state) => state.constVar.showTokenomicsData)
    const [showTeam, setshowTeam] = useState(false)
    const [showAudit, setshowAudit] = useState(false)
    const [showSocial, setshowSocial] = useState(false)
    const [showPopupLaunch, setShowPopupLaunch] = useState(false)
    const wallet_address = useSelector((state) => state.constVar.walletAddress)

    const calculation = useMemo(() => getFundingDataFunc, [Percentage]);

    // console.log(Percentage,calculation,"calculation value");

    const projectIdData = useSelector((state) => state.constVar.projectId)

    const loginId = useSelector((state) => state.constVar.loginId)
    const projectNumber = useSelector((state) => state.constVar.projectId)

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
        setshowChecklist(false)
    }

    const changeToChecklistfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
        setshowAudit(false)
        setshowTeam(false)
        setshowChecklist(true)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
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
        setshowChecklist(false)
    }



    useEffect(() => {
        const timeout = setTimeout(() => {
            setCount(count + 1);
            dispatch(fetchLaunchReq(loginId))

        }, 8000);
        return () => clearTimeout(timeout);
    }, [fetchLaunchReq, count, dispatch]);


useEffect(() => {
console.log("data inside dispatch action",projectNumber,loginId)
dispatch(fetchFundingProjectDetails(projectNumber,loginId))
console.log(fundmode[0]?.allProjectFunding[0]?.mode_of_funding,"percentage");
if(fundmode[0]?.allProjectFunding[0]?.mode_of_funding == "Equity")
{
    setdisableTokenomics(true);
}
else{
    setdisableTokenomics(false);
}
    if(tokenomicsBoolean){
        changeToTokenomicsfunc()
    }
}, [fetchFundingProjectDetails,dispatch]);



    const getFundingDataFunc = () => {
        try {
            var query = `
            query AllProjects($founder: ID) {
                allProjects(founder: $founder) {
                  _id
                  launch_status {
                    launched
                    percentage
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

                        "founder": loginId,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        // setTokenStd1(data?.data?.allProjects)
                        setStatus(data?.data?.allProjects[0]?.launch_status.launched)
                        setPercentage(data?.data?.allProjects[0]?.launch_status.percentage)
                        // 
                    } else {
                        // setTokenStd1([])
                        setStatus(false)
                        setPercentage('0')
                    }



                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    // className="btt"

    const showLaunch = () => {
        try {
            var query = `
                mutation($input: LaunchProjectInput){
                    LaunchProject(input: $input) {
                    message
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
                            "project": projectIdData
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    if (data?.data?.LaunchProject?.status != null && data?.data?.LaunchProject?.status != undefined && data?.data?.LaunchProject?.status.length > 0) {
                        if (data?.data?.LaunchProject?.status == 'success') {
                            setShowPopupLaunch(true)
                            getFundingDataFunc()
                        } else {
                            setShowPopupLaunch(false)
                            alert(data?.data?.LaunchProject?.message)
                        }
                        setLoading(false)

                        // 
                    } else {


                    }



                })

        } catch (error) {
            console.log(error, "funding in Project");
        }

        // 
    }
    const handleCloseShowPopup = () => {
        setShowPopupLaunch(false)
    }

    const getUserDetails = async () => {
        try {
            var query =
                `
            query getUser($id: ID) {
              User :getUser(_id: $id) {
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
                profile_pic
              },
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
                    console.log('user details: ', data?.data?.User);
                    if (data?.data?.User != null && data?.data?.User != undefined) {
                        console.log('user wallet address ', data?.data?.User?.wallet_address)
                    }
                    return data?.data?.User;
                });
        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }

    const saveUserWalletAddress = async (account) => {
        try {
            var query = `
            mutation UpdateUser($id: ID, $input: UserInput) {
                updateUser(_id: $id, input: $input) {
                    wallet_address
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
                            "wallet_address": account
                        }
                    }
                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('updated user record with connected wallet address', data?.data?.updateUser);
                    if (data?.data?.updateUser?.wallet_address) dispatch(walletAddress(data?.data?.updateUser?.wallet_address));
                    return data?.data?.updateUser;
                })
                .catch(err => {
                    return err;
                })
        } catch (error) {
            console.log("adding new projectDetail error", error);
        }
    }

    const addFounderFunc = async () => { // save founder wallet address in web3
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let isExist = await isFounder(userData.provider, userData.account);
        if (isExist) {
            console.log('Founder already exist');
            return Promise.resolve('Founder already exist');
        } else {
            return addFounder(userData.provider, userData.account);
        }
    }

    const checkAvailablePassportAttribute = async () => { // validate quadrata passport
        // Wraps a standard Web3Provider, which is
        // what MetaMask injects as window.ethereum into each page
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        const currentProvider = detectCurrentProvider(userData.provider);
        const provider = new ethers.providers.Web3Provider(currentProvider);
        await provider.send("eth_requestAccounts", []);

        // The QuadReader address
        const readerContractAddress = process.env.QUADRATA_READER_CONTRACT_ADDRESS;
        const attributeType = id("AML");

        // The QuadReader Contract object
        const readerContract = new ethers.Contract(
          readerContractAddress,
          QUAD_READER_ABI,
          provider
        );

        // Checking if a wallet owns a passport with attributes being issued
        return readerContract.balanceOf(userData.account, attributeType).then((balance) => {
          // balance returned is a BigNumber object, checking if it's greater than zero.
          if (balance.isZero()) {
            // address does not own a passport with this attribute.
            alert("address does not own a passport with this attribute.")
            return false;
          } else {
            // address has a Quadrata Passport with attributes being attested to.
            return true;
          }
        });
    };

    const createTokenFunc = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            if (userData) {
                setLoading(true)
                const passportStatus = await checkAvailablePassportAttribute()
                if (!passportStatus) {
                    alert("It\'s not allowed to launch the project, please claim the Quadrata passport from your profile");
                } else {
                    await getUserDetails()
                    .then((user) => {
                        if (user?.wallet_address === '' && user?.wallet_address === null && user?.wallet_address === undefined) {
                            return saveUserWalletAddress(userData.account)
                        } else {
                            return Promise.resolve()
                        }
                    })
                    .then(() => {
                        return addFounderFunc()
                    })
                    .then((founderStatus) => {
                        console.log(founderStatus, "founderStatus");
                        var arrtype = [];
                        showLaunch()
                    })
                    .catch((err) => {
                        console.log(err);
                        alert(err.message);
                    })
                }
            } else {
                alert("Please connect to Metamask or Coinbase wallet")
            }
        } catch (error) {
            console.log(error, "error founderStatus");
        }
    }
    return (
        <>

            <div className="page-wrapper" style={{ paddingTop: '60px' }}>
      
                <div className="content container-fluid">
                    <div >
                        <div className="page-header">
                            <div className="header-left">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h3 className="page-title">My Project</h3>

                                    </div>
                                </div>
                            </div>

                            <div className="header-right">
     
               
                    </div>

                        </div>
                        {/* ,height:"90vh",overflowY:"scroll"  */}
                        <div className="mainct" style={{ background: 'white', padding: '15px', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{ marginBottom: '0px' }}>
                                <div className="col-sm-12" >
                                    <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <div className="progress progress-md progress-striped" data-toggle="tooltip" title={`${percentageData[0]?.launch_status?.percentage ? percentageData[0]?.launch_status?.percentage : 0}%`} style={{ width: '100%', cursor: 'pointer', marginRight: '10px' }}>

                                            <div className="progress-bar" role="progressbar" data-toggle="tooltip" title={`${percentageData[0]?.launch_status?.percentage ? percentageData[0]?.launch_status?.percentage : 0}%`} style={{ width: `${percentageData[0]?.launch_status?.percentage ? percentageData[0]?.launch_status?.percentage : 0}%` }} />
                                        </div>
                                        {percentageData?.length > 0 && percentageData[0]?.launch_status?.launched == false && percentageData[0]?.launch_status?.percentage == '100' ?



                                            // <div className="progress progress-md progress-striped" data-toggle="tooltip" title={`${Percentage}%`} style={{ width: '100%', cursor: 'pointer', marginRight: '10px' }}>

                                            //     <div className="progress-bar" role="progressbar" data-toggle="tooltip" title={`${Percentage}%`} style={{ width: `${Percentage}%` }} />
                                            // </div>
                                            // {status == false && Percentage == '100' ?

                                            <div>
                                                <button className="btn btn-primary submit-btn" style={{ borderRadius: '2px', border: "solid 1px #6345ED", color: "white" }} onClick={() => createTokenFunc()}>Launch</button>
                                            </div>
                                            :
                                            loading == true ?
                                                <div>

                                                    <button className="btn btn-primary submit-btn" style={{ borderRadius: '2px', border: "1px rgb(41, 155, 0)", background: "#6345ED" }}>
                                                        <ReactLoading type={"spinningBubbles"} style={{ width: "20px", height: "20px", fill: "white", margin: "auto" }} />


                                                    </button>

                                                </div>
                                                :
                                                percentageData?.length > 0 && percentageData[0]?.launch_status?.launched == true ?


                                                    <div>
                                                        <button className="btn  submit-btn" style={{ borderRadius: '2px', background: '#6345ED', color: "white" }}>You're Live</button>
                                                    </div>
                                                    :

                                                    <div>
                                                        <button className="btn  submit-btn" style={{ borderRadius: '2px', border: "solid 1px #6345ED", color: "#6345ED" }} onClick={() => alert(`Please fill all the details`)}>Launch</button>
                                                    </div>
                                        }

                                        {/* <ProgressBarLine
                                            value={25}
                                            min={0}
                                            max={100}
                                            strokeWidth={5}
                                            trailWidth={5}
                                            styles={{
                                                path: {
                                                    stroke: '#17b978'
                                                },
                                                trail: {
                                                    stroke: '#a7ff83'
                                                },
                                                text: {
                                                    fill: '#404040',
                                                    textAlign: 'center',
                                                    fontSize: '32px'
                                                }
                                            }}
                                        /> */}
                                    </div>
                                    {showProject == true ?
                                        <div style={{ marginBottom: '15px', display: "flex", flex: "wrap" }} >
                                            <button className="btt2" onClick={() => changeToProjectfunc()}>Project</button>
                                            <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                            <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                            {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                            {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                            <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                            <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                            <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                            <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                            <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                            {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                        </div>

                                        :
                                        showRoadmap == true ?
                                            <div style={{ marginBottom: '15px', display: "flex" }} >
                                                <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                                {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                <button className="btt2" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                            </div>
                                            :
                                            showFunding == true ?
                                                <div style={{ marginBottom: '15px', display: "flex" }} >

                                                    <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                    <button className="btt2" onClick={() => changeToFundingfunc()}>Funding</button>
                                                    <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                    {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                                    {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                    <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                    <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                    <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                    <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                    <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                    {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}


                                                </div>
                                                :
                                                showBudget == true ?
                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                        <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                        <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                        <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                        {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

                                                        }
                                                        
                                                        {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                        <button className="btt2" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                        <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                        <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                        <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                        <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                        {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}

                                                    </div>
                                                    :
                                                    showTokenomics == true ?
                                                        <div style={{ marginBottom: '15px', display: "flex" }} >
                                                            <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                            <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                            <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                            <button className="btt2" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>
                                                            {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                            <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                            <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                            <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                            <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                            <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                            {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                        </div>
                                                        :
                                                        showKYC == true ?
                                                            <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                                <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                                <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                                {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                                                {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                                <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                                <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                                <button className="btt2" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                                <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                                <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                                {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                            </div>
                                                            :
                                                            showTeam == true ?
                                                                <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                    <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                                    <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                                    <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                                    {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                                                    {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                                    <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                                    <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                                    <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                                    <button className="btt2" onClick={() => changeToTeamfunc()}>Team</button>
                                                                    <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                                    {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                                </div>
                                                                :
                                                                showAudit == true ?
                                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                        <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                                        <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                                        <button className="btt" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                                        {disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>

}
                                                                        {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                                        <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                                        <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                                        <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                                        <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                                        <button className="btt2" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                                        {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                                    </div>
                                                                    :
                                                                    showChecklist == true ? 
                                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                        <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                                        <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                                        <button className="btt2" onClick={() => changeToChecklistfunc()}>Checklist</button>
                                                                        {
                                                                        disableTokenomics == true ? "":<button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>}
                                                                        {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                                        <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                                        <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                                        <button className="btt" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                                        <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                                        <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                                        {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                                    </div>
                                                                    :
                                                                    <div style={{ marginBottom: '15px', display: "flex" }} >
                                                                    <button className="btt" onClick={() => changeToProjectfunc()}>Project</button>
                                                                    <button className="btt" onClick={() => changeToFundingfunc()}>Funding</button>
                                                                    <button className="btt" onClick={() => changeToTokenomicsfunc()}>Tokenomics</button>
                                                                    {/* <button className="btt" onClick={() => changeToBudgetfunc()}>Tresuary</button> */}
                                                                    <button className="btt" onClick={() => changeToBudgetfunc()}>Budget</button>
                                                                    <button className="btt" onClick={() => changeToRoadMapfunc()}>Roadmap</button>
                                                                    <button className="btt2" onClick={() => changeToKYCfunc()}>Ratings</button>
                                                                    <button className="btt" onClick={() => changeToTeamfunc()}>Team</button>
                                                                    <button className="btt" onClick={() => changeToAuditfunc()}>Audit Trail</button>
                                                                    {/* <button className="btt" onClick={() => changeToSocialfunc()}>Socials</button> */}
                                                                </div>


                                    }
                                    {
                                        showProject == true ?
                                            <div>
                                                <ProjectPage />
                                            </div>
                                            :
                                            showFunding == true ?
                                                <div>
                                                    <FounderFunding 
                                                     disableTokenomics={disableTokenomics}
                                                     setdisableTokenomics={setdisableTokenomics}/>
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
                                                                <RatingsPage />
                                                                // <UnderContruction />
                                                                // <ProposalMainPage />
                                                                // <></>
                                                                :
                                                                // showBudget == true ?
                                                                //     <>
                                                                //         treasury
                                                                //     </>

                                                                //     :
                                                                showBudget == true ?
                                                                
                                                                    <BudgetPage />
                                                                    :
                                                                    showChecklist == true ?
                                                                    <div>
                                                                    <Checklist invdata={true}/></div>
                                                                    :

                                                                    // showAudit == true ?
                                                                    // <AuditTrailPage />
                                                                    <UnderContruction />
                                        // :
                                        // <SocialPage />

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
                <CongPopupLaunch value="Your Project has been launched Successfully" show={showPopupLaunch} handleClose={handleCloseShowPopup} />
            </div>
        </>
    );

}
export default ProjectData;
