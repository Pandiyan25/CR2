

import React, { useEffect } from 'react';

import SidebarContent from '../../../initialpage/Sidebar/sidebar1';
import Header from '../../../initialpage/Sidebar/header';
import ValidatorDashboard from './ValidatorDashboard';


import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import './index.css'
import { withOneTabEnforcer } from 'react-one-tab-enforcer';

const ValidatorDashboardRoute = ({ match }) => {

    useEffect(() => {

        toast.info('Please connect your wallet before updating your profile information', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });



    }, [])
    return (<>
        <Header />
        <ValidatorDashboard />
        <SidebarContent />
        <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </>
    );
}


export default withOneTabEnforcer()(ValidatorDashboardRoute);
