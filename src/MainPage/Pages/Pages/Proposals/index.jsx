



import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../../../initialpage/Sidebar/header';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';
import ProposalMainPage from './ProposalMainPage';


const ProposalMainRoute = ({ match }) => (
    <>
    <Header />
     <ProposalMainPage />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ProposalMainRoute);
