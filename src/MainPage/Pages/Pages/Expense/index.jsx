



import React from 'react';
 
import SidebarContent from '../../../../initialpage/Sidebar/sidebar2';
import Header from '../../../../initialpage/Sidebar/header';
import ExpenseManagement from './ExpenseManagement';
import { withOneTabEnforcer } from 'react-one-tab-enforcer';


const ExpenseDataRoute = ({ match }) => (
    <>
    <Header />
     <ExpenseManagement />
     <SidebarContent />
     </>
);

export default withOneTabEnforcer()(ExpenseDataRoute);
