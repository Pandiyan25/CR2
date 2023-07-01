/**
 * Tables Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../../../initialpage/Sidebar/header';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar1';
import ProjectDataInventor from '../../ProjectDetails/ProjectDataInvestor';
 
 
 const ValidatorProjectRoute = ({ match }) => (
     <>
     <Header />
      <ProjectDataInventor  role={"Validator"} />
      <SidebarContent />
      </>
 );
 
 export default ValidatorProjectRoute;
 