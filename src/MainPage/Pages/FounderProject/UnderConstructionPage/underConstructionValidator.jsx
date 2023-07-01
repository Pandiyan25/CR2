import React from 'react';
import Header from '../../../../initialpage/Sidebar/header';
 
// import Header from '../../../../initialpage/Sidebar/header';
import SidebarContent from '../../../../initialpage/Sidebar/sidebar1';
import UnderContruction from './UnderContruction';

// import VestingPage from './VestingPage';



const UnderConstructionValidatorRoute = ({ match }) => (
    <>
    <Header />
    <UnderContruction />

     <SidebarContent />
     </>
);

export default UnderConstructionValidatorRoute;
