



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import VaidatorsDataPage from './ValidatorsPage';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';


const SuperAdminValidatorsRoute = ({ match }) => (
    <>
    
    <SuperAdminHeader />
     <VaidatorsDataPage />
     <SidebarContent />
     </>
);

export default SuperAdminValidatorsRoute;
