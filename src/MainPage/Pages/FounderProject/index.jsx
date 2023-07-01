



import React from 'react';
 
import SidebarContent from '../../../initialpage/Sidebar/sidebar2';
import Header from '../../../initialpage/Sidebar/header';
import FounderProject from './FounderProjectRoute';
import ProjectPage from './projectPage';
import FounderProjectMain from './FounderProfileMain';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const FounderProjectRoute = ({ match }) => (
    <>
    <Header />
     {/* <FounderProject /> */}
     {/* <ProjectPage /> */}
     <FounderProjectMain />
     
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(FounderProjectRoute);
