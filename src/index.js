import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import store from './config/store'
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
 
        <Provider store={store}>
               <Auth0Provider
        domain="dev-7c3aswe1siwjm8w8.us.auth0.com"
        clientId="2FQ96r3o3W3toHL860CEWX0KfS5IrFG8"
        authorizationParams={{
            redirect_uri: window.location.origin
            
        }}
    >
            <Main />
            </Auth0Provider>
        </Provider>


    , document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}