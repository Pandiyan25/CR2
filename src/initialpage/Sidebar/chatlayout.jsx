/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

// router service
import chatService from "../../router_service/chatservice";

import Header from './header';
import Chatsidebar from './chatsidebar';
import ChatPage from '../../MainPage/Main/Apps/chat'; 
import UnderContruction from '../../MainPage/Pages/FounderProject/UnderConstructionPage/UnderContruction';

const chatlayout = (props) => {
		const { match } = props;
		return (
			<>
				<Header/>
				
				{/* <UnderContruction /> */}
					<ChatPage />
					{/* {chatService && chatService.map((route,key)=>
						<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
					)} */}		
				<Chatsidebar/>
			</>
		);
	
}
export default withRouter(chatlayout);