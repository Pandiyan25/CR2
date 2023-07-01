



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import Header from '../../../../initialpage/Sidebar/header';
import InvestorsPage from './InvestorsPage';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';


const SuperAdminInvestorsRoute = ({ match }) => (
    <>
    
    <SuperAdminHeader />
     <InvestorsPage />
     <SidebarContent />
     </>
);

export default SuperAdminInvestorsRoute;
