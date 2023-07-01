import React from 'react';
 
import SidebarContent from '../../../initialpage/Sidebar/sidebar2';
import Header from '../../../initialpage/Sidebar/header';
import SettingsMainPage from './SettingsMainPage';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const SettingsRoute = ({ match }) => (
    <>
    <Header />
     <SettingsMainPage />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(SettingsRoute);
