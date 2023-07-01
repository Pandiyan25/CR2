/**
 * App Routes
 */
 import React, { Component } from 'react';
 import { Route, withRouter } from 'react-router-dom';
 
 import Header from './header';
 import Chatsidebar from './chatsidebar';
import RequestListPage from './RequestListPage';
 
 const SendRequestLayout = (props) => {
         const { match } = props;
         return (
             <>
                 <Header/>
                     <RequestListPage />
                     {/* {chatService && chatService.map((route,key)=>
                         <Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
                     )} */}		
                 <Chatsidebar/>
             </>
         );
     
 }
 export default withRouter(SendRequestLayout);