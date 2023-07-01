/**
 * Tables Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 import SidebarContent from '../../../initialpage/Sidebar/sidebar3';
 import Header from '../../../initialpage/Sidebar/header';
import ProjectDataInventor from './ProjectDataInvestor';
import SuperAdminHeader from '../../../initialpage/Sidebar/superAdminHeader';
 
 
 const SuperAdminProjectDetails = ({ match }) => (
     <>
     <SuperAdminHeader />
      <ProjectDataInventor  role={"SuperAdmin"}  />
      <SidebarContent />
      </>
 );
 
 export default SuperAdminProjectDetails;
 