
import ProjectsMainPage from './ProjectMainPage';

import React from 'react';

import SidebarContent from '../../initialpage/Sidebar/sidebar';
import Header from '../../initialpage/Sidebar/header';


const ProjectsRoute = ({ match }) => (
    <>
    <Header />
     <ProjectsMainPage />
     <SidebarContent />
     </>
);

export default ProjectsRoute;