

import React, { useState, useEffect } from 'react';

import "../../antdstyle.css";
import 'antd/dist/antd.css';
import './index.css'
import './home.css'
import { useHistory } from "react-router-dom"
import { loginId, subscriptionData } from "../../../reducers/ConstantSlice";
import project from "./../../../assets/img/projects.png"
import Ideas from "./../../../assets/img/idea.png"
import { gql, useMutation } from '@apollo/client';
import { apiURI } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionDetails } from '../../../reducers/subscriptionSlice';
import Cookies from 'js-cookie';

const Home = () => {
    const loginId = useSelector((state) => state.constVar.loginId)
    const [show, setShow] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const navIdeas = () => {
        history.push('/Idealist')
        console.log("ideas")
    }
    const navProject = () => {
        history.push('/dashboard')
        console.log("projects")
    }

    const getSubscriptionDetails = () => {
        console.log("subscription called")
        try {
            var query = `
            query Query($userId: ID) {
                getSubscriptionDetails(user_id: $userId) {
                user_id
                plan_name
                plan_type
                start_date
                end_date
                status
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
                    variables:
                    {
                        "userId": loginId,
                    }
                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log(data?.data?.getSubscriptionDetails?.plan_name, "sub")
                    dispatch(subscriptionData(data?.data?.getSubscriptionDetails))
                    
                    localStorage.setItem("subscriptiondata",data?.data?.getSubscriptionDetails?.plan_name)
                })
        } catch (error) {
            console.log(error, "error");
        }
    }

    useEffect(() => {
        getSubscriptionDetails()
        dispatch(fetchSubscriptionDetails(loginId));
        console.log("login Id", loginId)
    }, [loginId])


    return (
        <>
            <div className='main-home'>
                <div>
                    <div className="home-wrapper">
                        <div className='home-header'>
                            <h1 className='mb-3 home-heading'>Hello Founder, Welcome to Guardian</h1>
                            <p className='mb-5 home-para'>Join the Community of Innovative Web3 Startups and Unleash Your Startups Fundraising Potential</p>
                        </div>
                        <div className='row mt-2'>
                            <div className=' col-xl-6  col-lg-6 col-md-12 col-sm-12'>
                                <div className="box mb-2" >

                                    <div className="box-body" onClick={() => navIdeas()}>
                                        {/* <div className="box-body" style={{backgroundColor:"grey"}}> */}
                                        <div className="box-wrap">
                                            {/* <p style={{color:"white",fontSize:"14px"}}>##Launch forthcoming shortly##</p> */}
                                            <img src={Ideas} style={{ width: "100px", marginBottom: "20px" }}></img>
                                            <h2 className='dh mb-3'>Product Validation</h2>
                                            <p className='mb-4'>Check out how our community reacts to your Dapp.Find out what web3 early adopters think of your product</p>

                                            <button className='routeButtoncs' onClick={() => navIdeas()}>Check Now</button>
                                            {/* <button className='routeButtoncs' >Pitch Ideas</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xl-6  col-lg-6  col-md-12 col-sm-12'>
                                <div className="box">

                                    <div className="box-body" onClick={() => navProject()}>
                                        <div className="box-wrap">
                                            <img src={project} style={{ width: "100px", marginBottom: "20px" }}></img>
                                            <h2 className='dh mb-3'>Fundraising</h2>
                                            <p className='mb-4'>Launch your web3 startup on our platform now, and get connected to global web3 investors.</p>
                                            <button className='routeButtoncs' onClick={() => navProject()}>Launch Startup</button>
                                        </div>
                                    </div></div>
                            </div>

                        </div>
                    </div>






                </div>
            </div>
        </>
    );
}
export default Home;
