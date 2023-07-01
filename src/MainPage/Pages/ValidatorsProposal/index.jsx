
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SidebarContent from '../../../initialpage/Sidebar/sidebar1';
import Header from '../../../initialpage/Sidebar/header';
import ValidatorProposal from './ValidatorProposal';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const ValidatorsProposalRoute = ({ match }) => (
    <>
    <Header/>
     <ValidatorProposal />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ValidatorsProposalRoute);
