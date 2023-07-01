



import React from 'react';
 
import SidebarContent from '../../../initialpage/Sidebar/sidebar2';
import Header from '../../../initialpage/Sidebar/header';
import ProjectData from './ProjectData';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const ProjectDataRoute = ({ match }) => (
    <>
    <Header />
     <ProjectData />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ProjectDataRoute);
