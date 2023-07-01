
 import React from 'react';
 
 import SidebarContent from '../../../initialpage/Sidebar/sidebar1';
 import Header from '../../../initialpage/Sidebar/header';
import ValidatorProfile from './validatorsProfile';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
 
 
 const ValidatorProfileMain = ({ match }) => (
     <>
     <Header />
      <ValidatorProfile />
      <SidebarContent />
      </>
 );
 
 export default withOneTabEnforcer()(ValidatorProfileMain);
 