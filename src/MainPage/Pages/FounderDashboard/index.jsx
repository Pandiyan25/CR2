



import React, { useEffect, useState } from 'react';

import SidebarContent from '../../../initialpage/Sidebar/sidebar2';
import Header from '../../../initialpage/Sidebar/header';
import FounderDashboard from './FounderDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { projectId } from '../../../reducers/ConstantSlice';
import { apiURI } from '../../../config/config';
import FounderNewDashboard from './FounderNewDashboard';

import { isys } from '../../../Entryfile/imagepath'
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import './index.css'
import { withOneTabEnforcer } from 'react-one-tab-enforcer';

const FounderDashboardRoute = ({ match,PopUp,setPopUp }) => {
    const dispatch = useDispatch();
    const [num, setNum] = useState(0)
 
    const WalletAddress = useSelector((state) => state.constVar.walletAddress)
    const loginId = useSelector((state) => state.constVar.loginId)
    const getUserDetailsFunc = () => {

        try {


            var query = `
        query Query($founder: ID) {
            allProjects(founder: $founder) {
              _id
              email_id
              first_name
              last_name
            }
          }
        `;

            fetch(apiURI.URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME

                },
                body: JSON.stringify({
                    query,
                    variables: {
                        "founder": loginId,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        dispatch(projectId(data?.data?.allProjects[0]._id))
                    }
                    console.log(WalletAddress,"WalletAddressinaddproj");
                    if(WalletAddress != null && WalletAddress != undefined && WalletAddress != ''){
                        
                    }else{
                        
                    toast.info(`Please connect your wallet before updating your profile or project information`, {
                        //     position: "top-right",
                        //     autoClose: true,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: true,
                        //     draggable: true,
                        // });
                        position: "top-right",
                        autoClose: false,
                        // hideProgressBar: false,
                        closeOnClick: true,
                        // pauseOnHover: true,
                        draggable: true,
                        // progress: 2000,
                        // autoClose: 5000,
                    });
                    }

                    console.log('iiini+!!!1');

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    useEffect(() => {
        if (loginId != '') {
            getUserDetailsFunc()

        }

        // <img src={isys} style={{height:'100px',width:'100px'}} />



    }, [loginId])
    return (
        <>
            <Header />
            <FounderNewDashboard 
              setIsPopupOpen={setPopUp}
              isPopupOpen={PopUp}/>
            {/* <FounderDashboard /> */}
            <SidebarContent />


            {/* <ToastContainer
                position="top-right"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}

            <ToastContainer
                position="top-right"
                autoClose={false}
                // newestOnTop
                closeOnClick
                rtl={false}
                limit={1}
                // pauseOnFocusLo/ss
                // draggable
            />

        </>
    );
}

export default withOneTabEnforcer()(FounderDashboardRoute);
