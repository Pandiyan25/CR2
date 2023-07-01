
import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import slide1 from "../../assets/img/1st.png"
import slide2 from "../../assets/img/2nd.png"
import slide3 from "../../assets/img/3rd.png"
import Carousel from 'react-bootstrap/Carousel';
import '../register.css'
import guardian from "../../assets/img/guardian.png"
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginId } from '../../reducers/ConstantSlice';
import ReactTooltip from 'react-tooltip';
import { IconEye, IconEyeOff } from '@tabler/icons';
import { apiURI } from '../../config/config';
import { ToastContainer, toast } from 'material-react-toastify';
import { designLogo, defiImage, verifiedIcon, guardLogo, LogoVertical, loginMainImg } from '../../Entryfile/imagepath';


const ResetPassword = (props) => {
  const [showCorrecPasssErr, setShowCorrecPasssErr] = useState(false)

  const [password1, setPassword1] = useState(false)
  const [showConfirmPasswordErr, setShowConfirmPasswordErr] = useState(false)

  const pathname = window.location.href
  console.log(pathname.length, "pathname");

  const dispatch = useDispatch();
  let history = useHistory()
  const [founderChecked, setFounderChecked] = useState(false)
  const [ValidatorChecked, setValidatorChecked] = useState(false)
  const [investerChecked, setInvesterChecked] = useState(false)
  const [newPassword, setnewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [varification, setVarification] = useState("")
  const [email, setEmail] = useState('')

  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");

  const registerFunc = () => {
    var firstLetter = newPassword[0].toUpperCase()
    if (newPassword == confirmPassword && firstLetter == newPassword[0] && newPassword.length > 8) {
      var pathname1 = pathname.slice(58)
      console.log("============history============", pathname1);
      authenticateRegisterUser(pathname1)
    } else if (newPassword != confirmPassword || firstLetter != newPassword[0] || newPassword.length < 8) {
      // alert('Please Check Your Password')
      setPassword1(true)
    } else {
      // alert('please fill the details')
      setPassword1(false)
    }
    // window.location.href = `/profile`
  }


  const authenticateRegisterUser = (pathname1) => {

    try {
      const query = ` mutation ResetPassword($input: ForgotPasswordInput) {
          changePassword(input: $input)
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
          //   {
          //     input: {
          //       "email": Email,
          //       "password": password,
          //       "role": i,
          //       "first_name": firstName,
          //       "last_name": lastName
          //     }
          //  }
          // {
          //   "id": "6285f6ef91d024b3e1a41cdb",
          //   "input": {
          //     "password": newPassword
          //   }
          // }
          {
            "input": {
              "password": newPassword,
              "token": pathname1
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {

          console.log(data, "data");
          if (data?.data?.changePassword == 'Success') {
            toast.success('Password is changed Successfully', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              history.push('/login')
            }, 3000);
          }
        })
    } catch (error) {
      console.log(error, "");
    }

  }

  const togglePassword2 = () => {
    if (passwordType2 === "password") {
      setPasswordType2("text")
      return;
    }
    setPasswordType2("password")
  }



  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  const passwordFunc = (e) => {
    setnewPassword(e.target.value)
    setShowCorrecPasssErr(false)
  }
  const confpasswordFunc = (e) => {
    setConfirmPassword(e.target.value)
    setShowConfirmPasswordErr(false)
  }


  const onKeyDownSearch = (e) => {
    if (e.keyCode === 27) {
      console.log('Enter ers the data');
    }
    else if (e.keyCode === 13) {
      console.log('Enter the data');
      registerFunc()
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
                <Link to="/register" style={{ color: "#6345ED" }}>Sign Up</Link>
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





                  <div className="form-group">
                  {/* maxLength={10} */}


                  <label style={{ wordSpacing: 'normal' }}>Password<span className="text-danger">*</span></label>
                  <div className="input-group" data-tip="Password must contain minimum of 8 characters, an uppercase letter, and a special character like( @ , $ , ! etc..)">
                    {/* my-4 mx-4 */}
                    <input className="form-control" type={passwordType} onChange={(e) => passwordFunc(e)} />
                    <ReactTooltip place="bottom" type="info" effect="solid" />
                    {/* {password1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Password</div>} */}
                    <div className="input-group-btn">
                      <button className="btn btn-outline-primary" onClick={togglePassword} style={{ height: '100%', width: '50px', borderRadius: '0px',padding:"0px" }}>
                        {passwordType === "password" ? <IconEyeOff /> : <IconEye />}
                      </button>
                    </div>
                  </div>
                  {showCorrecPasssErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Password</div> : ''}

                </div>

                <div className="form-group">
                  {/* maxLength={10} */}
                  <label style={{ wordSpacing: 'normal' }}>Confirm Password<span className="text-danger">*</span></label>
                  <div className="input-group" style={{ margin: '0px' }} data-tip="Password must contain minimum of 8 characters, an uppercase letter, and a special character like( @ , $ , ! etc..)">
                    {/* my-4 mx-4 */}
                    <input className="form-control" name="test" type={passwordType2} onChange={(e) => confpasswordFunc(e)} />
                    <ReactTooltip place="bottom" type="info" effect="solid" />
                    <div className="input-group-btn">
                      <button className="btn btn-outline-primary" onClick={togglePassword2} style={{ height: '100%', width: '50px', borderRadius: '0px',padding:"0px" }}>
                        {passwordType2 === "password" ? <IconEyeOff /> : <IconEye />}
                      </button>
                    </div>
                  </div>
                </div>
                {password1 == true ? <div style={{ color: 'red', fontSize: '12px' }}>Password must contain minimum of 8 characters, an uppercase letter, and a special character like( @ , $ , ! etc..)</div> : ''}
                {showConfirmPasswordErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Confirm Password</div> : ''}




                <div className="form-group text-center">
                  <button className="btn btn-primary account-btn" onClick={() => registerFunc()} type="submit" style={{ borderRadius: '2px' }}>Submit</button>
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



              <div>



 
        
              </div>




            
    </>
  );
}



export default ResetPassword;
