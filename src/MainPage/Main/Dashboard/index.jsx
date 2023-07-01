
import Admindashboard from './admindashboard';

import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import SidebarContent from '../../../initialpage/Sidebar/sidebar';
import Header from '../../../initialpage/Sidebar/header';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import './index.css'
import { withOneTabEnforcer } from 'react-one-tab-enforcer';
import { useSelector } from 'react-redux';



const DashboardRoute = ({ match }) => {

    // useEffect(() => {

    //     toast.info('Please connect your wallet before updating your profile information', {
    //         position: "top-right",
    //         autoClose: false,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //     });



    // }, [])






    const WalletAddress = useSelector((state) => state.constVar.walletAddress)
    const loginId = useSelector((state) => state.constVar.loginId)
    const getUserDetailsFunc = () => {

        // try {
        console.log(WalletAddress, "WalletAddress in investor");

        if (WalletAddress != null && WalletAddress != undefined && WalletAddress != '') {

        } else {

            toast.info('Please connect your wallet before updating your profile information', {

                position: "top-right",
                autoClose: false,
                closeOnClick: true,
                draggable: true,
            });
        }

    }

    // catch (error) {
    //     console.log(error, "error in Founder Project");
    // }
// }


useEffect(() => {
    if (loginId != '') {
        getUserDetailsFunc()

    }

    // <img src={isys} style={{height:'100px',width:'100px'}} />



}, [loginId])










return (
    <>
        <Header />
        <Admindashboard />
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

export default withOneTabEnforcer()(DashboardRoute);
