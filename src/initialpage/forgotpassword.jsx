

import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
// import { designLogo } from '../Entryfile/imagepath'
import { designLogo,defiImage, verifiedIcon, guardLogo, LogoVertical,loginMainImg } from '../Entryfile/imagepath';
import { useHistory, useNavigate } from "react-router-dom";
import { async } from 'regenerator-runtime';
import slide1 from "../assets/img/1st.png"
import slide2 from "../assets/img/2nd.png"
import slide3 from "../assets/img/3rd.png"
import Carousel from 'react-bootstrap/Carousel';
import guardian from "../assets/img/guardian.png"
import { apiURI } from '../config/config';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  const [sendEmail, setSendEmail] = useState('')
  const [emailId1, setEmailID1] = useState("")

  let history = useHistory()
  const sendForget = () => {

  }
  const gotorest = () => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = pattern.test(sendEmail);
    var sliceemail = sendEmail.split('@')
    console.log(sliceemail,sliceemail[0].length,"sliceemail");
    
    if(result == true && sliceemail.length > 0 && sliceemail[0].length < 64){

      getUserDetailsFunc()
    }else{
      setEmailID1(true)
    }
  }

  const getUserDetailsFunc = () => {

    try {


      var query = `
      mutation ResetPassword($input: ResetPasswordInput) {
        resetPassword(input: $input) {
          email
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
            "input": {
              "email": sendEmail
            }
          }
          // {
          //   "email": sendEmail
          // }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // alert("New password has been sent to your Mail")
          toast.success(data?.data?.resetPassword?.status, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        // setInterval(function(){history.push('/login')},3000);
        setTimeout(() => {
          history.push('/login')
       }, 3000);

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }

  

  const onKeyDownSearch = (e) => {
    if (e.keyCode === 27) {
      console.log('Enter ers the data');
    }
    else if (e.keyCode === 13) {
      console.log('Enter the data');
      gotorest()
    }

  }




  return (
    <>
            <div className="d-md-flex half">
        <div className="contents">
          <div className="container" >
            <div className="content-nav">
              <div className="logo-wrapper">
                <img id="logo_header" src={guardian} alt="logo-guardian" width="150" height="auto"></img>
              </div>
              <div className="content-right">
                <span className="text-account mr-2">Don't have an Account?</span>
                <Link to="/register" style={{ color: "#6345ED" , marginRight:'13px' }} className="signUp">Sign Up</Link>
              </div>
            </div>
            <div className="row align-items-center justify-content-center">





              <div className="col-md-12" onKeyDown={(e) => onKeyDownSearch(e)}>
                <div className="form-block mx-auto">
                  <div className="text-center mb-3">
                    <h3 className="text">Reset password</h3>
                    {/* <p className="para-content">Access to your dashboard</p> */}
                  </div>
                  <div>





                    <div className="form-group first" >
                      <label className="label-text" for="username">Email Id</label>

                      <input className="form-control" type="text" onChange={(e) => setSendEmail(e.target.value)} ></input>
                      {emailId1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Email Id</div>}
                    </div>



           

                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" onClick={() => gotorest()} type="submit" style={{ borderRadius: '2px', width: "100%", fontWeight: "800" }}>RESET PASSWORD</button>
                    </div>

                    {/* <span className="text-center my-2 d-block">or</span> */}
                    {/* <div className="">
                <a href="#" className="btn btn-block py-2 btn-google"><span className="mr-2"><img className="g-icon" src="images/g-icon.png" alt="g-icon"></img></span> Login with Google</a>
                </div> */}
                    <p className="ver-p">Ver 01.07 Dated : 24/03/2023</p>
                    <p className="link-a-t"><a href="https://crsquare.finance/">crsquarefinance </a> | <a href="https://crsquare.finance/terms-and-conditions/">Terms & Conditions</a></p>
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



export default ForgotPassword;
