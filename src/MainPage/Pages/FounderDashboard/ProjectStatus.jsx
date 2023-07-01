

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


const ProjectStatus = () => {

    return (

        <div>

            <div className="row">

                <div className="col-md-12">
                    <div className="card mb-0">
                <div className="col-md-12">
                    <h3 className="card-title" style={{marginBottom:'0px',marginTop:'10px'}}>Project Score</h3>
                </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="profile-view">

                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="" style={{ textAlign: 'center' }}>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Validator Score:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Investor Score:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Data Score:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Profile:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Roadmap:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Funding:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Budget:</div>
                                                        <div></div>
                                                    </div>
                                                    {/* <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Current Income:</div>
                                                        <div></div>
                                                    </div> */}
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Tokenomics:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >KYC:</div>
                                                        <div></div>
                                                    </div>
                                                    <div className="paddingProposal" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div >Socials:</div>
                                                        <div></div>
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
        </div>
    )
}
export default ProjectStatus;