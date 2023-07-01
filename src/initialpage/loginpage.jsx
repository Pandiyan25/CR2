
import Button from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { useHistory, useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { designLogo, defiImage, verifiedIcon, guardLogo, LogoVertical, loginMainImg } from '../Entryfile/imagepath';
// import { ToastContainer, toast } from 'react-toastify';
import { apiURI } from '../config/config';
import slide1 from "../assets/img/slider-1.png"
import slide2 from "../assets/img/slider-2.png"
import slide3 from "../assets/img/slider-3.png"
import guardian from "../assets/img/guardian.png"
import { useSelector, useDispatch } from 'react-redux';
import { loginId, projectId, walletAddress, emailid } from '../reducers/ConstantSlice';
import { ToastContainer, toast } from 'material-react-toastify';
import { IconEye, IconEyeOff } from '@tabler/icons';
import 'material-react-toastify/dist/ReactToastify.css';
// import './loginPage.css'
import "./loginasset/style.css"
import { fetchRoadMapProjectDetails } from '../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../reducers/BudgetSlice';
import { fetchProjectDetails } from '../reducers/ProjectDetailsSlice';
import { fetchFundingProjectDetails } from '../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../reducers/SocialPageSlice';
import { fetchBudgetBannerDetails } from '../reducers/BugetBannerSlice';
import { Component } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'js-cookie';
// import env from "../../.env"

const Loginpage = ({ setInvestor, setValidator, setFounder, setsuperadmin, setfirstlogin }) => {



  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [passwordType, setPasswordType] = useState("password");
  const [emailId, setEmailID] = useState("")
  const [password, setPassword] = useState("")
  const [password1, setPassword1] = useState(false)
  const [emailId1, setEmailID1] = useState("")
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState(false)
  let history = useHistory()
  // let navigate = useNavigate();;
  const loginFunc = () => {
    console.log("============history============");
    console.log(emailId, password, "passwordpasswordpassword");
    if (emailId != '' && password != '') {

      console.log("============history============");
      if (password == 'validator') {

        localStorage.setItem("superadmin", false)
        console.log("============history1============");
        localStorage.setItem("founder", false)
        localStorage.setItem("validator", true)
        localStorage.setItem("investor", false)
        localStorage.setItem("firstload", "true")
        sessionStorage.setItem("lock", true)
        window.location.href = `/profile`
      } else if (password == 'investor') {

        localStorage.setItem("superadmin", false)
        console.log("============history2============");
        localStorage.setItem("founder", false)
        localStorage.setItem("validator", false)
        localStorage.setItem("investor", true)
        localStorage.setItem("firstload", "true")
        sessionStorage.setItem("lock", true)
        window.location.href = `/profile`
      } else if (password == 'founder') {

        console.log("============history2============");
        localStorage.setItem("founder", true)
        localStorage.setItem("validator", false)
        localStorage.setItem("investor", false)
        localStorage.setItem("firstload", "true")
        sessionStorage.setItem("lock", true)
        localStorage.setItem("superadmin", false)

        window.location.href = `/profile`
      } else if (password == "superadmin") {

        console.log("============history2============");
        localStorage.setItem("founder", false)
        localStorage.setItem("validator", false)
        localStorage.setItem("investor", false)
        localStorage.setItem("firstload", "true")
        localStorage.setItem("superadmin", true)
        sessionStorage.setItem("lock", true)
        window.location.href = `/dashboard`
      }
      // localStorage.setItem("founder",false)
      // localStorage.setItem("validator",true)
      // localStorage.setItem("investor",false)
      // history.replace("/profile")
      // navigate(`/profile`);
    }
  }



  const authenticateUser = () => {
    try {
      const query = `mutation AuthenticateUser($input: AuthenticateUserInput) {
        authenticateUser(input: $input) {
          status
          role
          first_name
          email
          _id
          wallet_address
          user_status
          new_user
        }
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
          variables: {
            "input": {
              "email": emailId,
              "password": password
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          sessionStorage.setItem("lock", true)
          console.log(data, "data from auth");
          // setUserStatus()
          let projIdData = sessionStorage.getItem('projIdData')
          console.log(data?.data?.authenticateUser?._id, "data?.data?.authenticateUser?._id");

          /* login form validation */
          if (data?.data?.authenticateUser != null && data?.data?.authenticateUser != undefined && data?.data?.authenticateUser?.status == "Authenticated") {
            if (data?.data?.authenticateUser?.user_status === true) {
              // if(data?.data?.authenticateUser?.status == null ){

              if (data?.data?.authenticateUser?.status === 'wrong_password') {

                setPassword1(true)
                toast.warn('Please check your password', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              } else {
                setPassword1(false)
              }
              if (data?.data?.authenticateUser?.status === 'wrong_email') {

                setEmailID1(true)
                toast.warn('Check your email Id', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              } else {


                setEmailID1(false)

              }
            }



            if (data?.data?.authenticateUser?.user_status != true) {

              toast.warn('Please check  your E-mail Id is verified', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } else if (data?.data?.authenticateUser != null && data?.data?.authenticateUser != undefined && data?.data?.authenticateUser?.status == "wrong_email") {

              setEmailID1(true)
              toast.warn('Check your email Id', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } else {

              setEmailID1(false)
            }
            if (data?.data?.authenticateUser != null && data?.data?.authenticateUser != undefined && data?.data?.authenticateUser?.status == "wrong_password") {

              setPassword1(true)
              toast.warn('Please check your password', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } else {

              setPassword1(false)
            }


            /* setting role*/
            if (data?.data?.authenticateUser?.role == 'Investor' && data?.data?.authenticateUser?.user_status == true) {
              setInvestor(true)

              setsuperadmin(false)
              setValidator(false)

              setFounder(false)
              dispatch(loginId(data?.data?.authenticateUser?._id));
              Cookies.set('session', {
                userId: data?.data?.authenticateUser?._id
                , role: 'Investor'
              });
              dispatch(walletAddress(data?.data?.authenticateUser?.wallet_address));
              if (projIdData) {

                sendDatatoProjectPage(projIdData)

              } else {
                history.push('/')
              }


            }
            else if ((data?.data?.authenticateUser?.role == "Founder" || data?.data?.authenticateUser?.role == "Co-Founder") && data?.data?.authenticateUser?.user_status == true) {

              setInvestor(false)

              setsuperadmin(false)
              setValidator(false)

              setFounder(true)

              if (data?.data?.authenticateUser?.new_user == true) {
                setfirstlogin(true);
              }
              else{
                setfirstlogin(false);
              }

              dispatch(loginId(data?.data?.authenticateUser?._id));
              dispatch(emailid(data?.data?.authenticateUser?.email));
              Cookies.set('session', { userId: data?.data?.authenticateUser?._id, role: 'Founder' });
              dispatch(walletAddress(data?.data?.authenticateUser?.wallet_address));
              history.push("/home")

              // if (projIdData) {

              //   sendDatatoProjectPage(projIdData)

              // } else {
              //   history.push('/')
              // }

            }
            else if (data?.data?.authenticateUser?.role == "Validator" && data?.data?.authenticateUser?.user_status == true) {

              setsuperadmin(false)
              setInvestor(false)
              setFounder(false)

              setValidator(true)
              dispatch(loginId(data?.data?.authenticateUser?._id));
              dispatch(walletAddress(data?.data?.authenticateUser?.wallet_address));

              if (projIdData) {

                sendDatatoProjectPage(projIdData)

              } else {
                history.push('/')
              }
            }
            else if (data?.data?.authenticateUser?.role == "superadmin" && data?.data?.authenticateUser?.user_status == true) {
              setsuperadmin(true)
              setInvestor(false)
              setFounder(false)

              setValidator(false)
              dispatch(loginId(data?.data?.authenticateUser?._id));
              dispatch(walletAddress(data?.data?.authenticateUser?.wallet_address));

              if (projIdData) {

                sendDatatoProjectPage(projIdData)

              } else {
                history.push('/')
              }
            }

          }
          else if (data?.data?.authenticateUser?.user_status == true) {
            // if(data?.data?.authenticateUser?.status == null ){

            if (data?.data?.authenticateUser?.status == 'wrong_password') {

              setPassword1(true)
            } else if (data?.data?.authenticateUser?.status == 'wrong_email') {

              setEmailID1(true)
            } else {

              setPassword1(true)
              setEmailID1(true)

            }
            // }

            // alert("Please check your details")
            //   toast.error('Please check your details', {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            // });

          } else if (data?.data?.authenticateUser?.user_status != true) {
            if (data?.data?.authenticateUser?.status === "wrong_email") {

              toast.warn('You have entered an Incorrect Email or Password ', {
                // toast.warn('Please verify your mail ', {
                position: "top-right",

                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
            if (data?.data?.authenticateUser?.status === "wrong_password") {

              // alert("Please verify your mail ")
              // toast.warn('please check if password you entered is valid ', {
              toast.warn('You have entered an Incorrect Email or Password ', {
                position: "top-right",

                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              // alert("please check if password you entered is valid ")
            }
            else if (data?.data?.authenticateUser?.user_status === false) {
              // alert("please verify your mail id")
              toast.warn('Please Verify Your Email Id ', {
                position: "top-right",

                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }

          }



          // setInvestor()
        })
    } catch (error) {
      // console.log(error,"");

    }
  }


  const sendDatatoProjectPage = (i) => {

    console.log(i, "sent");
    dispatch(fetchRoadMapProjectDetails(i))
    dispatch(fetchBudgetProjectDetails(i))
    dispatch(fetchProjectDetails(i))
    dispatch(projectId(i))
    dispatch(fetchFundingProjectDetails(i))
    dispatch(fetchTeamSize(i))
    dispatch(fetchTokenomicsDetails(i))
    dispatch(fetchSocialTeam(i))
    dispatch(fetchBudgetBannerDetails(i))
    history.push('/dashboard')
    sessionStorage.removeItem("projIdData")
  }



  const checkUser = () => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = pattern.test(emailId);
    console.log((password), emailId, result, "password");
    if (emailId != undefined && emailId != null && typeof (password) == 'string' && emailId != '' && result == true && password != '' && password != undefined && password != null) {
      authenticateUser()
    } else {

      if (password == '' || password == undefined || password == null || typeof (password) != 'string') {
        setPassword1(true)
        //   toast.error('Please Enter Valid Password', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        // });
      } else {
        setPassword1(false)
      }
      if (emailId == undefined || emailId == null || emailId == '' || result == false) {
        setEmailID1(true)

      } else {
        setEmailID1(false)

      }

      //   toast.error('Please Fill all the details', {
      //     position: "top-right",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      // });
      // alert('Please Fill all the details')

    }
  }
  const gotoforgotPassword = () => {
    // if(emailId != ''){
    history.push("/forgotpassword")
    // }else{
    //   alert("Please Enter Valid Email")
    // }
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const onKeyDownSearch = (e) => {
    if (e.keyCode === 27) {
      console.log('Enter ers the data');
    }
    else if (e.keyCode === 13) {
      console.log('Enter the data');
      checkUser()
    }

  }
  useEffect(() => {
    console.log(user, "user-a0", isAuthenticated, "isauthenticated -a0", isLoading, "isloading")

  }, [isLoading, isAuthenticated])



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
                <span className="text-account">Don't have an Account?</span>
                <Link to="/register" style={{ color: "#6345ED", marginRight:'13px' }} className="signUp">Sign Up</Link>
              </div>
            </div>
            <div className="row align-items-center justify-content-center" style={{minHeight:"93vh",height:"auto"}}>

              <div className="col-md-12">
                <div className="form-block mx-auto mb-1 ">
                  <div className="text-center">
                    <h3 className="text">Login</h3>
                    {/* <p className="para-content">Access to your dashboard</p> */}
                  </div>
                  <div>
                    <div className="form-group first" >
                      <label className="label-text" for="username">Email Id</label>

                      <input className="form-control" type="email" onChange={(e) => setEmailID(e.target.value)} ></input>
                      {emailId1 == false ? '' : <div style={{ color: 'red', fontSize: '12px', marginTop: "2px" }}>Please Enter Valid Email Id</div>}
                    </div>
                    <div className="last mb-1">
                      <label className="label-text" for="password">Password</label>
                      <div className='input-group'>
                        <input className="form-control" type={passwordType} onChange={(e) => setPassword(e.target.value)}></input>

                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary" onClick={togglePassword} style={{ height: '100%', width: '50px', borderRadius: '0 4px 4px 0', padding: "6px" }}>
                            {passwordType === "password" ? <IconEyeOff /> : <IconEye />}
                          </button>
                        </div>
                      </div>
                      {password1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Password</div>}
                    </div>
                    <div className="d-sm-flex mb-3 align-items-center">
                      <span className=""><a href="#" className="forgot-pass" onClick={() => gotoforgotPassword()} >Forgot Password?</a></span>
                    </div>

                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" onClick={() => checkUser()} type="submit" style={{ borderRadius: '2px', width: "100%", fontWeight: "800" }}>LOG IN</button>
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
              {/* <ol className="carousel-indicators" style={{top:"400px"}}>
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol> */}
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


export default Loginpage;
