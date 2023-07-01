

import React, { useState, useEffect } from 'react';
import { designLogo2 } from '../../../Entryfile/imagepath';
import { Table } from 'antd';
import "../../antdstyle.css";
import 'antd/dist/antd.css';
import './index.css'
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import {
    BarChart, Bar, Cell, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import GeneralStatus from './generalStatus';
import { Button } from 'react-bootstrap';
import ProposalStatus from './proposalStatus';
import ProjectStatus from './ProjectStatus';


const FounderDashboard = () => {

    const [generalPage, setGeneralPage] = useState(true)
    const [propsalPage, setpropsalPage] = useState(false)
    const [projectPage, setprojectPage] = useState(false)
    const changeToGeneralfunc = () => {
        setGeneralPage(true)
        setpropsalPage(false)
        setprojectPage(false)
    }

    const changeToProposalfunc = () => {
        setGeneralPage(false)
        setpropsalPage(true)
        setprojectPage(false)

    }
    const changeToProjectfunc = () => {
        setGeneralPage(false)
        setpropsalPage(false)
        setprojectPage(true)

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
                                        <h3 className="page-title">Dashboard</h3>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                            <div className="row" style={{marginBottom: '20px'}}>
                                <div className="col-sm-12">
                                    {generalPage == true ?
                                        <div>
                                            <Button className="buttonTopColor" onClick={() => changeToGeneralfunc()}>General Status</Button>
                                            <Button className="buttonTop" onClick={() => changeToProposalfunc()}>Proposal Status</Button>
                                            <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Project Score</Button>
                                        </div>
                                        :
                                        propsalPage == true ?
                                            <div>
                                                <Button className="buttonTop" onClick={() => changeToGeneralfunc()}>General Status</Button>
                                                <Button className="buttonTopColor" onClick={() => changeToProposalfunc()}>Proposal Status</Button>
                                                <Button className="buttonTop" onClick={() => changeToProjectfunc()}>Project Score</Button>
                                            </div>
                                            :
                                            <div>
                                                <Button className="buttonTop" onClick={() => changeToGeneralfunc()}>General Status</Button>
                                                <Button className="buttonTop" onClick={() => changeToProposalfunc()}>Proposal Status</Button>
                                                <Button className="buttonTopColor" onClick={() => changeToProjectfunc()}>Project Score</Button>
                                            </div>
                                    }

                                </div>
                            </div>
                            {generalPage == true ?
                                <GeneralStatus />
                                :
                                propsalPage == true ?
                                    <ProposalStatus />
                                    :
                                    <ProjectStatus />
                            }

                        </div>
                    </div>

                </div>
                {/* /Page Content */}
            </div>
        </>
    );
}
export default FounderDashboard;
