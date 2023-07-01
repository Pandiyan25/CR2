/**
 * Tables Routes
 */
 import React from 'react';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
 import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../../initialpage/Sidebar/header';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';
import ProjectDataInventor from '../../ProjectDetails/ProjectDataInvestor';
 
 
 const FounderSearchProjectRoute = ({ match }) => (
     <>
     <Header />
      <ProjectDataInventor  role={"Founder"}  />
      <SidebarContent />
      </>
 );
 
 export default withOneTabEnforcer()(FounderSearchProjectRoute);
 