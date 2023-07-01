



import React from 'react';
// ../../../initialpage/Sidebar/sidebar2
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';
import Header from '../../../../initialpage/Sidebar/header';
import FundRaisePage from './FundRaisePage';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const FounderFundRaiseRoute = ({ match }) => (
    <>
    <Header />
     <FundRaisePage />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(FounderFundRaiseRoute);
