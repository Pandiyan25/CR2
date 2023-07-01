
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SidebarContent from '../../../initialpage/Sidebar/sidebar1';
import Header from '../../../initialpage/Sidebar/header';
import ValidatorsRequests from './ValidatorsRequests';


const ValidatorsRequestsRoute = ({ match }) => (
    <>
    <Header/>
     <ValidatorsRequests />
     <SidebarContent />
     </>
);

export default ValidatorsRequestsRoute;
