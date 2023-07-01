import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../../../initialpage/Sidebar/header';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';

import VestingPage from './VestingPage';



const VestingRoute = ({ match }) => (
    <>
    <Header />
     <VestingPage />

     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(VestingRoute);
