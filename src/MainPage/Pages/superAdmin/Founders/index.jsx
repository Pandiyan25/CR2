



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import Header from '../../../../initialpage/Sidebar/header';
import FoundersPage from './FoundersPage';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';


const SuperAdminFounderRoute = ({ match }) => (
    <>
    
    <SuperAdminHeader />
     <FoundersPage />
     <SidebarContent />
     </>
);

export default SuperAdminFounderRoute;
