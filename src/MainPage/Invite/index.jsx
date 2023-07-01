

import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../initialpage/Sidebar/header';

import SidebarContent from '../../initialpage/Sidebar/sidebar';
import  InviteAnewFounder  from './invite';

const InviteRoute = ({ match }) => (
    <>
    <Header />
     <InviteAnewFounder />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(InviteRoute);
