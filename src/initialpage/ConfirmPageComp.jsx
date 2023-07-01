

import React, { Component, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import { designLogo } from '../Entryfile/imagepath'
import { designLogo, defiImage, verifiedIcon, guardLogo, LogoVertical,loginMainImg } from '../Entryfile/imagepath';
import { useHistory, useNavigate } from "react-router-dom";
import { async } from 'regenerator-runtime';
import './register.css'
import { ToastContainer, toast } from 'material-react-toastify';
import '../assets/lottie/96673-success.json'
import ReactLoading from "react-loading";
import lottieJson from '../assets/lottie/96673-success.json';
import Lottie from 'react-lottie-player';
import { apiURI } from '../config/config';
import slide1 from "../assets/img/slider-1.png"
import slide2 from "../assets/img/slider-2.png"
import slide3 from "../assets/img/slider-3.png"
import guardian from "../assets/img/guardian.png"
import Carousel from 'react-bootstrap/Carousel';

const ConfirmPageComp = () => {

  let history = useHistory()
  const [showConfirmNextPage, setShowConfirmNextPage] = useState(false)


  const pathname = window.location.href


  useEffect(() => {
    // var pathname1 =window.URLSearchParams(id) pathname.slice(45)
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    console.log(urlParams,"urlParams");

    const pathname1 =  urlParams.get('id');

    console.log(pathname1,pathname,"pathname1 in confirm");
    if (pathname1 != null && pathname1 != undefined && pathname1 != '') {

      setTimeout(() => {
        // history.push('/login')
        checkVerificationFunc(pathname1)
      }, 3000);
    }
  },[])

  const checkVerificationFunc = (pathname1) => {
    try {


      const query = `mutation Mutation($id: ID) {
        verifyUser(_id: $id)
      }`;
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
            "id": pathname1,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // 
          console.log(data, "data");
          if (data?.data?.verifyUser != null && data?.data?.verifyUser != undefined &&  data?.data?.verifyUser == "success" ) {
            setShowConfirmNextPage(true)
            setTimeout(() => {
              history.push('/login')
            }, 3000);
          }else{

          }
        })


    } catch (error) {
      alert(`${error} in Confirm Page`)
    }
  }

  return (
    <>
  

      <div className="d-md-flex half" >
        <div className="contents">
          <div className="container" >
            <div className="content-nav">
              <div className="logo-wrapper">
                <img id="logo_header" src={guardian} alt="logo-guardian" width="150" height="auto"></img>
              </div>
              <div className="content-right">
                <span className="text-account">Don't have an Account? &nbsp;&nbsp;&nbsp;</span>
                <Link to="/register" style={{ color: "#6345ED", marginRight:'13px' }} className="signUp">Sign Up</Link>
              </div>
            </div>
            <div className="row align-items-center justify-content-center" >

              <div className="col-md-12">
                <div className="form-block mx-auto">
           
                  <div>
               
                    <div className="last mb-1">
                    
                    {
                showConfirmNextPage == true ?
                  <div>
                    <div className='loader_div_flex'>
                      <Lottie
                        loop
                        animationData={lottieJson}
                        play
                        style={{ width: '23px', marginRight: '6px' }}
                      />
                      <h3 className="account-title_203">Your Account has been Successfully verified</h3>
                    </div>

                    <p style={{ wordSpacing: 'normal', textAlign: 'center' }}>Click Here for <Link to="/login">Login</Link></p>
                  </div>
                  :
                  <div className='loader_confirm'>


                    <ReactLoading type={"spinningBubbles"} style={{ height: "100%", fill: "#2c0051", width: '35%' }} />
                  </div>
              }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg" style={{ backgroundColor: "#2c0051" }}>
          <div className="content-slider">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src={slide1} alt="First slide"></img>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={slide2} alt="Second slide"></img>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src={slide3} alt="Third slide"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </div>
    </>
  );
}



export default ConfirmPageComp;
