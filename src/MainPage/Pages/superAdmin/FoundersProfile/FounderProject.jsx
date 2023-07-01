



import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BudgetPage from './Budget/BudgetPage';
import FounderFunding from './Funding/FounderFunding';
import KYCPage from './Kyc/Kyc';
import ProjectPage from './projectPage';
import RoadMapPage from './RoadMapPage';
import SocialPage from './Social/Social';
import Tokenomics from './Tokenomics/Tokenomics';



const FounderProject = () => {
    const [showProject, setShowProject] = useState(true)
    const [showRoadmap, setshowRoadmap] = useState(false)
    const [showFunding, setshowFunding] = useState(false)
    const [showBudget, setshowBudget] = useState(false)
    const [showKYC, setshowKYC] = useState(false)
    const [showTokenomics, setshowTokenomics] = useState(false)
    const [showSocial, setshowSocial] = useState(false)


    const changeToProjectfunc = () => {
        setShowProject(true)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)

    }
    const changeToRoadMapfunc = () => {

        setShowProject(false)
        setshowRoadmap(true)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
    }
    const changeToFundingfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(true)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
    }
    const changeToBudgetfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(true)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(false)
    }
    const changeToTokenomicsfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(true)
        setshowSocial(false)
    }
    const changeToKYcfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(true)
        setshowTokenomics(false)
        setshowSocial(false)
    }
    const changeToSocialfunc = () => {

        setShowProject(false)
        setshowRoadmap(false)
        setshowFunding(false)
        setshowBudget(false)
        setshowKYC(false)
        setshowTokenomics(false)
        setshowSocial(true)
    }

    return (
        <>

            <div className="page-wrapper" style={{paddingTop:'60px'}}>

                <div className="content container-fluid">
                    <div >
                        <div className="page-header">
                            <div className="header-left">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h3 className="page-title">Profile</h3>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-sm-12">
                                    {showProject == true ?
                                        <div style={{ marginBottom: '12px' }}>
                                            <Button className="buttonTopColor" onClick={() => changeToProjectfunc()}>Profile</Button>
                                            <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                            <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                            <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                            <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                            <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                            <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                        </div>

                                        :
                                        showRoadmap == true ?
                                            <div style={{ marginBottom: '12px' }}>
                                                <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                <Button className="buttonTopColor" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                            </div>
                                            :
                                            showFunding == true ?
                                                <div style={{ marginBottom: '12px' }}>
                                                    <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                    <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                    <Button className="buttonTopColor" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                    <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                    <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                    <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                    <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                                </div>
                                                :
                                                showBudget == true ?
                                                    <div style={{ marginBottom: '12px' }}>
                                                        <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                        <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                        <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                        <Button className="buttonTopColor" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                        <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                        <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                        <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                                    </div>
                                                    :
                                                    showTokenomics == true ?
                                                        <div style={{ marginBottom: '12px' }}>
                                                            <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                            <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                            <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                            <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                            <Button className="buttonTopColor" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                            <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                            <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                                        </div>
                                                        :
                                                        showKYC == true ?
                                                            <div style={{ marginBottom: '12px' }}>
                                                                <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                                <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                <Button className="buttonTopColor" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                                <Button className="buttonTop" onClick={() => changeToSocialfunc()}>Social</Button>
                                                            </div>
                                                            :
                                                            <div style={{ marginBottom: '12px' }}>
                                                                <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Profile</Button>
                                                                <Button className="buttonTop" onClick={() => changeToRoadMapfunc()}>Roadmap</Button>
                                                                <Button className="buttonTop" onClick={() => changeToFundingfunc()}>Funding</Button>
                                                                <Button className="buttonTop" onClick={() => changeToBudgetfunc()}>Budget</Button>
                                                                <Button className="buttonTop" onClick={() => changeToTokenomicsfunc()}>Tokenomics</Button>
                                                                <Button className="buttonTop" onClick={() => changeToKYcfunc()}>KYC</Button>
                                                                <Button className="buttonTopColor" onClick={() => changeToSocialfunc()}>Social</Button>
                                                            </div>

                                    }

                                    {showProject == true ?
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

                                                        :
                                                        showBudget == true ?
                                                            <BudgetPage />
                                                            :
                                                            <SocialPage />
                                    }

                                </div>


                            </div>
                        </div>

                    </div>
                    {/* /Page Content */}
                </div>
            </div>
        </>
    );

}
export default FounderProject;
