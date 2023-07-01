import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../../../initialpage/Sidebar/header';
 
// import Header from '../../../../initialpage/Sidebar/header';
import SidebarContent from '../../../../initialpage/Sidebar/sidebar';
import UnderContruction from './UnderContruction';

// import VestingPage from './VestingPage';



const UnderConstructionInvestorRoute = ({ match }) => (
    <>
    <Header />
    <UnderContruction />

     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(UnderConstructionInvestorRoute);
