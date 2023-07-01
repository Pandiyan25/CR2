/**
 * Tables Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 import SidebarContent from '../../../initialpage/Sidebar/sidebar';
 import Header from '../../../initialpage/Sidebar/header';
import ProjectDataInventor from './ProjectDataInvestor';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
 
 
 const DetailsProjectRoute = ({ match }) => (
     <>
     <Header />
      <ProjectDataInventor role={"Investor"} />
      <SidebarContent />
      </>
 );
 
 export default withOneTabEnforcer()(DetailsProjectRoute);
 