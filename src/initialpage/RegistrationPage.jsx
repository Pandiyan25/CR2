
import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { Applogo, guardLogo, LogoVertical, verifiedIcon, loginMainImg } from '../Entryfile/imagepath.jsx'
import './register.css'
// import { designLogo } from '../Entryfile/imagepath'
import Carousel from 'react-bootstrap/Carousel';
import { designLogo, defiImage } from '../Entryfile/imagepath';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { apiURI } from '../config/config.jsx';
import { loginId } from '../reducers/ConstantSlice.js';
import { ToastContainer, toast } from 'material-react-toastify';
import slide1 from "../assets/img/slider-1.png"
import slide2 from "../assets/img/slider-2.png"
import slide3 from "../assets/img/slider-3.png"
import guardian from "../assets/img/guardian.png"
import { IconEye, IconEyeOff } from '@tabler/icons';
import 'material-react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, } from "react-bootstrap";

const Registrationpage = ({ setInvestor, setValidator, setFounder, setsuperadmin }) => {

  const [show, setShow] = useState(true);
  const [founderChecked, setFounderChecked] = useState(false)
  const [ValidatorChecked, setValidatorChecked] = useState(false)
  const [investerChecked, setInvesterChecked] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [termsError, setTermsError] = useState(false)

  const [newsLetter, setNewsLetter] = useState(false)
  const [demo, setDemo] = useState(false)

  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confpassword, setconfpassword] = useState('')
  const [password1, setPassword1] = useState(false)
  const [role, setrole] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [emailID2, setEmailID2] = useState(false)
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [role1, setRole1] = useState(false)
  const [emailId1, setEmailID1] = useState("")
  const [help, sethelp] = useState(false)


  const [showFirstName, setShowFirstName] = useState(false)
  const [showLastName, setShowLastName] = useState(false)
  const [showCorrecPasssErr, setShowCorrecPasssErr] = useState(false)
  const [showEmailId, setShowEmailId] = useState(false)
  const [showConfirmPasswordErr, setShowConfirmPasswordErr] = useState(false)
  const [showConfirmPasswordSameErr, setShowConfirmPasswordSameErr] = useState(false)
  const [inviteId, setInviteId] = useState("")





  const dispatch = useDispatch();
  let history = useHistory()
  const onUserLogin = e => {
    e.preventDefault();

    if (this.state.email !== '' && this.state.password !== '') {
      //  this.props.signinUserInFirebase(this.state, this.props.history);


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

  const registerFunc = () => {
    console.log("============history============");
    console.log("============history============", founderChecked, ValidatorChecked, investerChecked);
    localStorage.setItem("firstload", "true")
    sessionStorage.setItem("lock", true)
    if (ValidatorChecked == true) {

      localStorage.setItem("founder", false)
      localStorage.setItem("validator", true)
      localStorage.setItem("investor", false)
      window.location.href = `/profile`
    } else if (investerChecked == true) {

      localStorage.setItem("founder", false)
      localStorage.setItem("validator", false)
      localStorage.setItem("investor", true)
      window.location.href = `/profile`
    } else if (founderChecked == true) {

      console.log("============history2============");
      localStorage.setItem("founder", true)
      localStorage.setItem("validator", false)
      localStorage.setItem("investor", false)
      localStorage.setItem("firstload", "true")
      sessionStorage.setItem("lock", true)
      window.location.href = `/dashboard`
    }

  }

  const authenticateRegisterUser = (i) => {
    console.log("Invite Id :");
    console.log(inviteId);
    console.log("News:", newsLetter, "demo:", demo);
    try {
      const query = `mutation CreateUser($input: UserInput) {
        createUser(input: $input) {
          User {
            _id
            email
            password
            role
            contact
            first_name
            last_name
            invited_code
            referral_code
          }
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
          variables: {
            input: {
              "email": Email,
              "password": password,
              "role": i,
              "first_name": firstName,
              "last_name": lastName,
              "invited_code": inviteId,
              "subscribe_newsletter": newsLetter,
              "demo": demo
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          console.log(json);
          return json;
        })
        .then(data => {
          sessionStorage.setItem("lock", true)
          console.log(data, "data from auth");
          // registerFunc()
          if (data?.data?.createUser?.status == "already_exist") {

            setEmailID2(true)

          } else {
            alert('Thanks for visiting CRSQUARE GUARDIAN. Kindly refer mail to verify the account.')
            // setShow("true")
            if (data?.data?.createUser?.User?.role == 'Investor') {
              setInvestor(true)

              setsuperadmin(false)
              setValidator(false)
              setFounder(false)
              history.push('/login')
              dispatch(loginId(data?.data?.createUser?.User?._id));
            } else if (data?.data?.createUser?.User?.role == "Founder") {
              setInvestor(false)

              setsuperadmin(false)
              setValidator(false)
              setFounder(true)
              history.push('/login')
              dispatch(loginId(data?.data?.createUser?.User?._id));
            } else if (data?.data?.createUser?.User?.role == "Validator") {

              setsuperadmin(false)
              setInvestor(false)
              setFounder(false)
              setValidator(true)
              history.push('/login')
              dispatch(loginId(data?.data?.createUser?.User?._id));
            }
          }

        })
    } catch (error) {
      console.log(error, "");
    }
  }



  // const { loading } = props;

  const founderfunc = () => {
    setRole1(false)
    setFounderChecked(!founderChecked)
    setValidatorChecked(false)
    setInvesterChecked(false)
  }

  const ValidatorFunc = () => {

    setRole1(false)
    setValidatorChecked(!ValidatorChecked)

    setInvesterChecked(false)
    setFounderChecked(false)
  }
  const InvestorFunc = () => {

    setRole1(false)
    setInvesterChecked(!investerChecked)
    setFounderChecked(false)
    setValidatorChecked(false)
  }
  const termsFunc = () => {
    setTermsChecked(!termsChecked)
  }
  const newsLetterFunc = () => {
    setNewsLetter(!newsLetter)
  }
  const demoFunc = () => {
    setDemo(!demo)
  }

  const registerConfirm = () => {
    // console.log();
    // var firstLetter = password[0].toUpperCase()
    var patternjjj = new RegExp(
      "^(?=.*[A-Z])"
    );
    var firstLetter = patternjjj.test(password)
    // console.log(,"sssjoijjnkjnjn");


    // && firstLetter === password[0]
    if (Email != '' && password != '' && password == confpassword && password.length >= 8 && firstLetter == true) {
      console.log(Email, password);
      let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = pattern.test(Email);


      var format = /^[a-zA-Z0-9!@#$%^&*]{6,50}$/;
      let main = format.test(password);
      console.log(main, "main");
      if (main == true && result == true) {


        if (investerChecked == true && founderChecked == false && ValidatorChecked == false) {
          authenticateRegisterUser('Investor')
        } else if (founderChecked == true && ValidatorChecked == false && investerChecked == false) {

          authenticateRegisterUser('Founder')
        } else if (ValidatorChecked == true && founderChecked == false && investerChecked == false) {

          authenticateRegisterUser('Validator')
        } else {
          alert("Please Select a role")
          setRole1(true)
        }
      } else {
        if (result == false) {

          // alert("Please Check your Email")
          setEmailID1(true)
        } else {
          setEmailID1(false)
        }
        if (main == false) {
          // && confpassword != password
          // alert("Password Should contain  atleast one special characters or one number")
          setPassword1(true)
        } else {
          setPassword1(false)
        }


        alert('please Check the details')
        // setPassword1(true)
        // setEmailID1(true)
      }
    } else if (password != confpassword || firstLetter != password[0] || password.length < 8) {
      // alert('Please Check Your Password')
      setPassword1(true)
    } else {
      // alert('please fill the details')
      setPassword1(false)
    }


    // registerFunc()
  }


  const emailIDfunc = (email) => {

    setShowEmailId(false)
    setEmailID2(false)
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = pattern.test(email);
    if (result == false) {

      // alert("Please Check your Email")
      setEmailID1(true)
    } else {
      setEmailID1(false)
    }

    setEmail(email)
  }

  const checkAllDetails = () => {
    if (termsChecked == true && Email != '' && password != '' && password == confpassword && firstName != '' && lastName != '' && (founderChecked != false || ValidatorChecked != false || investerChecked != false)) {

      registerConfirm()
    } else {
      if (termsChecked != true) {
        setTermsError(true)
      } else {
        setTermsError(false)

      }
      if (Email != '') {

        setShowEmailId(false)
      } else {
        setShowEmailId(true)

      }
      if (firstName != '') {

        setShowFirstName(false)
      } else {
        setShowFirstName(true)

      }
      if (founderChecked != false || ValidatorChecked != false || investerChecked != false) {

        setRole1(false)
      } else {
        setRole1(true)

      }
      if (lastName != '') {

        setShowLastName(false)
      } else {
        setShowLastName(true)

      }
      if (password != '') {

        setShowCorrecPasssErr(false)
      } else {
        setShowCorrecPasssErr(true)

      }
      if (confpassword != '' && password == confpassword) {

        setShowConfirmPasswordErr(false)
      } else if (password != confpassword) {
        setShowConfirmPasswordSameErr(true)

      } else {
        setShowConfirmPasswordErr(true)
        setShowConfirmPasswordSameErr(false)
      }

    }
  }


  const firstNameFunc = (e) => {
    setfirstName(e.target.value)
    setShowFirstName(false)
  }
  const lastNameFunc = (e) => {
    setlastName(e.target.value)
    setShowLastName(false)
  }
  const passwordFunc = (e) => {
    setpassword(e.target.value)
    setShowCorrecPasssErr(false)
  }
  const confpasswordFunc = (e) => {
    setconfpassword(e.target.value)
    setShowConfirmPasswordErr(false)
  }


  const opennewWindow = (i) => {
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }



  const onKeyDownSearch = (e) => {
    if (e.keyCode === 27) {
      console.log('Enter ers the data');
    }
    else if (e.keyCode === 13) {
      console.log('Enter the data');
      checkAllDetails()
    }

  }



  // referel code implementation 
  useEffect(() => {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    console.log(urlParams, "urlParams");

    const projIdData = urlParams.get('projIdData');
    console.log(projIdData, "projIdData");
    sessionStorage.setItem("projIdData", projIdData)
    sessionStorage.setItem("lock", true)
    const inviteCode = urlParams.get('id');
    if (null != inviteCode) {
      setInviteId(inviteCode);
    }

  }, []);



  return (

    <>

      <div className="d-md-flex half">
        <div className="contents">
          <div className="container" >
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="content-nav">
                  <div className="logo-wrapper">
                    <img id="logo_header" src={guardian} alt="logo-guardian" width="150" height="auto"></img>
                  </div>
                  <div className="content-right">
                    <span className="text-account-title">Already have an Account?</span>
                    <Link to="/login" style={{ color: "#6345ED", marginRight: '10px' }} className="signIn" >Sign In</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-block mx-auto mb-0 pb-0 pt-0">
                  <div className="text-center mb-3">
                    <h3 className="text">Sign Up</h3>
                    {/* <p className="para-content">Access to your dashboard</p> */}
                  </div>
                  <div>
                    <div className="form-group first">
                      <div className='row'>
                        <div className='col'>
                          <label style={{ wordSpacing: 'normal' }}>First Name</label>
                          <input className="form-control" type="text" onChange={(e) => firstNameFunc(e)} tabIndex="1" />
                          {showFirstName == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter First Name</div> : ''}
                        </div>
                        <div className='col'>

                          <label style={{ wordSpacing: 'normal' }}>Last Name</label>
                          <input className="form-control" type="text" onChange={(e) => lastNameFunc(e)} tabIndex="2" />
                          {showLastName == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Last Name</div> : ''}
                        </div>
                      </div></div>


                    <div className="form-group" onKeyDown={(e) => onKeyDownSearch(e)}>


                      <label style={{ wordSpacing: 'normal' }}>Email Id</label>
                      <input className="form-control" type="email" onChange={(e) => emailIDfunc(e.target.value)} tabIndex="3" />
                      {emailId1 == true ?
                        <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Email Id</div>
                        :
                        emailID2 == true ? <div style={{ color: 'red', fontSize: '12px' }}>Email ID already exist</div>
                          :
                          showEmailId == true ?
                            <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Email Id</div>
                            :
                            ''
                      }



                    </div>
                    <div className="form-group">
                      {/* maxLength={10} */}


                      <label style={{ wordSpacing: 'normal' }}>Password</label>
                      <div className="input-group" data-tip="Password must contain minimum of 8 characters, an uppercase(caps) letter, and a special character like( @ , $ , ! etc..)">
                        {/* my-4 mx-4 */}



                        <input className="form-control" type={passwordType} onChange={(e) => passwordFunc(e)} tabIndex="4" />
                        <ReactTooltip place="bottom" type="info" effect="solid" />
                        {/* {password1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Password</div>} */}
                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary" onClick={togglePassword} style={{ height: '100%', width: '50px', borderRadius: '0 4px 4px 0', padding: "6px" }}>
                            {passwordType === "password" ? <IconEyeOff /> : <IconEye />}
                          </button>
                        </div>
                      </div>
                      {showCorrecPasssErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Password</div> : ''}

                    </div>
                    <div className="form-group">
                      {/* maxLength={10} */}
                      <label style={{ wordSpacing: 'normal' }}>Confirm Password</label>
                      <div className="input-group" style={{ margin: '0px' }} data-tip="Password must contain minimum of 8 characters, an uppercase(caps) letter, and a special character like( @ , $ , ! etc..)">
                        {/* my-4 mx-4 */}



                        <input className="form-control" name="test" type={passwordType2} onChange={(e) => confpasswordFunc(e)} tabIndex="5" />
                        <ReactTooltip place="bottom" type="info" effect="solid" />
                        <div className="input-group-btn">
                          <button className="btn btn-outline-primary" onClick={togglePassword2} style={{ height: '100%', width: '50px', borderRadius: '0 4px 4px 0', padding: "6px" }}>
                            {passwordType2 === "password" ? <IconEyeOff /> : <IconEye />}
                          </button>
                        </div>
                      </div>
                    </div>
                    {password1 == true ? <div style={{ color: 'red', fontSize: '12px' }}>Password must contain minimum of 8 characters, an uppercase(caps) letter, and a special character like( @ , $ , ! etc..)</div> : ''}
                    {showConfirmPasswordErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Confirm Password</div> : ''}
                    {showConfirmPasswordSameErr == true ?
                      <div style={{ color: 'red', fontSize: '12px' }}>Please Check your Password and Confirm Password</div> : ''}

                    <div className="checkboxflex" style={{ marginBottom: '15px', fontWeight: "600" }}>
                      {/* form-group */}
                      {/* <label style={{wordSpacing:'normal'}}>Confirm Password</label> */}
                      <span className='registerCheckbox'>

                        <label forhtml="founder" style={{ fontSize: "14px" }}>
                          <input className="" name='founder' type="radio" style={{ marginRight: '7px' }} checked={founderChecked} onClick={() => founderfunc()} />
                          Founder</label>
                      </span>
                      <span className='registerCheckbox'>
                        <label forhtml="investor" style={{ fontSize: "14px" }}>
                          <input className="" name="investor" type="radio" style={{ marginRight: '7px' }} checked={investerChecked} onClick={() => InvestorFunc()} />
                          Investor</label>
                      </span>
                      {/* <span className='registerCheckbox'>

                    <input className="" type="checkbox" style={{ height: "15px", width: '15px' }} checked={ValidatorChecked} onClick={() => ValidatorFunc()} /><h7>Validator</h7>
                  </span> */}
                    </div>


                    {role1 == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Select one</div>}



                    <div className="checkboxflex" style={{ marginBottom: '10px' }}>
                      {/* form-group */}
                      {/* <label style={{wordSpacing:'normal'}}>Confirm Password</label> */}
                      {/* <span className='registerCheckbox__term'> */}

                        <input className="" type="checkbox" style={{ marginRight: '10px', borderRadius: "20px" }} checked={termsChecked} onClick={() => termsFunc()} />
                        <label  className='mb-0' style={{ fontWeight: "500", fontSize: "14px" }}>I accept the <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => opennewWindow(`https://crsquare.finance/privacy-and-policy/`)}> privacy policy</span> and the <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => opennewWindow(`https://crsquare.finance/terms-and-conditions/`)}> terms and conditions</span> of use</label>
                      {/* </span> */}
                    </div>

                    {termsError == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Select the terms and conditions</div>}



                    <div className="checkboxflex" style={{ marginBottom: '10px' }}>
                      {/* form-group */}
                      {/* <label style={{wordSpacing:'normal'}}>Confirm Password</label> */}
                      {/* <span className='registerCheckbox__term'> */}
                        <input name="checkbox-1" className=""  type="checkbox" style={{  marginRight: '10px', borderRadius: "20px" }} checked={newsLetter} onClick={() => newsLetterFunc()} />
                        <label  className='mb-0' forhtml="checkbox-1" style={{ fontWeight: "500", fontSize: "14px" }}>
                          Sign me up for the Newsletter.
                          </label>
                      {/* </span> */}
                    </div>
                    <div className="checkboxflex" style={{ marginBottom: '10px' }}>
                      {/* form-group */}
                      {/* <label style={{wordSpacing:'normal'}}>Confirm Password</label> */}
                      {/* <span className='registerCheckbox__term' style={{ marginBottom: "15px" }}> */}

                        
                        <input className="" name="checkbox-2" type="checkbox" style={{  marginRight: '10px', borderRadius: "20px" }} checked={demo} onClick={() => demoFunc()} />
                        <label forhtml="checkbox-2" style={{ fontWeight: "500", fontSize: "14px" }} className='mb-0'>
                          Schedule a Demo call, Complete the launch process.</label>
                      {/* </span> */}
                    </div>

                    <div>

                    </div>

                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" onClick={() => checkAllDetails()} type="submit" style={{ borderRadius: '2px', width: "100%", fontWeight: "800" }}>REGISTER</button>
                    </div>

                    <p className="ver-p">Ver 01.07 Dated : 24/03/2023</p>
                    <p className="link-a-t"><a href="https://crsquare.finance/">crsquare.finance </a> | <a href="https://crsquare.finance/terms-and-conditions/">Terms & Conditions</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>

        <div className="bg" style={{ backgroundColor: "#2c0051" }}>
          <div className="content-slider">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              {/* <ol className="carousel-indicators" style={{top:"350px"}}>
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



export default Registrationpage;
