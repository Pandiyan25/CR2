

import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../initialpage/Sidebar/header';

import SidebarContent from '../../initialpage/Sidebar/sidebar';
import ProposalMainPage from './ProposalMainPage';

const ProposalRoute = ({ match }) => (
    <>
    <Header/>
     <ProposalMainPage />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ProposalRoute);
