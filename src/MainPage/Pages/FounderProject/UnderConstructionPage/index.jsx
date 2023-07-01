import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import Header from '../../../../initialpage/Sidebar/header';
 
// import Header from '../../../../initialpage/Sidebar/header';
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';
import UnderContruction from './UnderContruction';

// import VestingPage from './VestingPage';



const UnderConstructionRoute = ({ match }) => (
    <>
    <Header />
    <UnderContruction />

     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(UnderConstructionRoute);
