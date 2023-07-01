



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import Header from '../../../../initialpage/Sidebar/header';
import ProjectDatapage from './ProjectDatapage';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';


const projectDataPageRoute = ({ match }) => (
    <>
    
    <SuperAdminHeader />
     <ProjectDatapage />
     <SidebarContent />
     </>
);

export default projectDataPageRoute;
