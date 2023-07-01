



import React from 'react';
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';

import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';
import FounderProject from './FounderProject';

const FounderSuperAdminRoute = ({ match }) => (
    <>
    <SuperAdminHeader />
     <FounderProject />
     <SidebarContent />
     </>
);

export default FounderSuperAdminRoute;
