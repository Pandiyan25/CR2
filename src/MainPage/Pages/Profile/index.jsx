/**
 * Tables Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import EmployeeProfile from "./employeeprofile"
import ClientProfile from "./clientprofile"
import SidebarContent from '../../../initialpage/Sidebar/sidebar';
import Header from '../../../initialpage/Sidebar/header';
// import ProfileSettings from './ProfileSettings';
import ProfileNewEdits from './newprofile';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const subscriptionroute = ({ match }) => (
    <>
    <Header />
    <ProfileNewEdits />
     {/* <EmployeeProfile /> */}
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(subscriptionroute);
