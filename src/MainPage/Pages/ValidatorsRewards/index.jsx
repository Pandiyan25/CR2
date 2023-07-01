
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SidebarContent from '../../../initialpage/Sidebar/sidebar1';
import Header from '../../../initialpage/Sidebar/header';
import ValidatorsReward from './ValidatorsReward';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const ValidatorsRewardRoute = ({ match }) => (
    <>
    <Header/>
     <ValidatorsReward />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ValidatorsRewardRoute);
