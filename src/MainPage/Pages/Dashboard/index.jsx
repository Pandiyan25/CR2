/**
 * Tables Routes
 */
 import React from 'react';
 import { Redirect, Route, Switch } from 'react-router-dom';
 
 import SidebarContent from '../../../initialpage/Sidebar/sidebar';
import { DashboardMainPage } from './DashboardMainPage';
 
 
 const DashboardHomePage = ({ match }) => (
     <>
      <DashboardMainPage />
      <SidebarContent />
      </>
 );
 
 export default DashboardHomePage;
 