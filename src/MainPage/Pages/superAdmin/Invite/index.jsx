

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../../initialpage/Sidebar/header';
import SidebarContent from '../../../../initialpage/Sidebar/sidebar3';
import SuperAdminHeader from '../../../../initialpage/Sidebar/superAdminHeader';
import InviteNewpage from './InviteNewpage';

const InviteSuperAdminRoute = ({ match }) => (
    <>
    
    <SuperAdminHeader />
     <InviteNewpage />
     <SidebarContent />
     </>
);

export default InviteSuperAdminRoute;
