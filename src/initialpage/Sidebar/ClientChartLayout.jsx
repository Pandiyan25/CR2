/**
 * App Routes
 */
 import React, { Component } from 'react';
 import { Route, withRouter } from 'react-router-dom';
 
 import Header from './header';
 import Chatsidebar from './chatsidebar';
import ClientsMain from './ClientMain';
 
 const ClientChartLayout = (props) => {
         const { match } = props;
         return (
             <>
                 <Header/>
                     <ClientsMain />
                     {/* {chatService && chatService.map((route,key)=>
                         <Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
                     )} */}		
                 <Chatsidebar/>
             </>
         );
     
 }
 export default withRouter(ClientChartLayout);