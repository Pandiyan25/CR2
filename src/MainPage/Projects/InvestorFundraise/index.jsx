

import React from 'react';

import SidebarContent from '../../../initialpage/Sidebar/sidebar';
import Header from '../../../initialpage/Sidebar/header';
import InvestorFundRaise from './InvestorFundRaise';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const InestorFundRaiseRoute = ({ match }) => (
    <>
    <Header />
     <InvestorFundRaise />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(InestorFundRaiseRoute);