

import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../../../initialpage/Sidebar/header';

import SidebarContent from '../../../../initialpage/Sidebar/sidebar';
import Portfolio from '../Vesting/components/portfolio';
// import VestingInvestorpage from './VestingInvestorPage';

const VestingInvestorRoute = ({ match }) => (
    <>
    <Header/>
    <Portfolio/>
     {/* <VestingInvestorpage /> */}
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(VestingInvestorRoute);
