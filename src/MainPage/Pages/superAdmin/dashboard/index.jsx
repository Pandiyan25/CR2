



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import Header from '../../../../initialpage/Sidebar/header';
import SuperAdminDashboard from './superAdminDashboard';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';


const SuperAdminDashboardRoute = ({ match }) => (
    <>
    <SuperAdminHeader />
     <SuperAdminDashboard />
     <SidebarContent />
     </>
);

export default SuperAdminDashboardRoute;
