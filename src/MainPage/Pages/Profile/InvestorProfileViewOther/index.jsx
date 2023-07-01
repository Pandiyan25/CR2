
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 import SidebarContent from '../../../../initialpage/Sidebar/sidebar';
 import Header from '../../../../initialpage/Sidebar/header';
import InvestorsOthersView from './InvestorsOthersView';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
 
 
 const InvestorProfileViewRoute = ({ match }) => (
     <>
     <Header />
     <InvestorsOthersView />
      <SidebarContent />
      </>
 );
 
 export default withOneTabEnforcer()(InvestorProfileViewRoute);
 