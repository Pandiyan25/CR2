import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "material-react-toastify";

import "material-react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { apiURI } from "../../config/config";
import { useCopyToClipboard } from "usehooks-ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BiCopy,BiLink } from 'react-icons/bi';


const InviteAnewFounder = () => {
  const [Name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showProjectNameError, setShowProjectNameError] = useState(false);

  const referralCode = useSelector((state) => state.constVar.referralCode);
  const loginId = useSelector((state) => state.constVar.loginId);

  const [value, copy] = useCopyToClipboard();

  const sendReqFunc = () => {
    let pattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = pattern.test(emailId);
    // && projectName != undefined && projectName != null && projectName != ''
    if (
      Name != undefined &&
      Name != null &&
      Name != "" &&
      emailId != undefined &&
      emailId != null &&
      emailId != "" &&
      result == true
    ) {
      sendReq();
    } else {
      if (Name == undefined || Name == null || Name == "") {
        setShowNameError(true);
      } else {
        setShowNameError(false);
      }
      if (
        emailId == undefined ||
        emailId == null ||
        emailId == "" ||
        result == false
      ) {
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }
      // if (projectName == undefined || projectName == null || projectName == '') {
      //     setShowProjectNameError(true)
      // } else {
      //     setShowProjectNameError(false)
      // }
      // alert("Please Fill All the Details")
    }
  };

  const sendReq = () => {
    // && projectName != ''
    if (Name != "" && emailId != "") {
      try {
        var query = `
            mutation InviteFounder($input: InviteMailInput) {
                inviteFounder(input: $input)
              }
            `;
        fetch(apiURI.URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
                name: Name,
                email: emailId,
                // "project": projectName,
                role: "Co-Founder",
                user: loginId,
              },
            },
          }),
        })
          .then((response) => {
            const json = response.json();
            return json;
          })
          .then((data) => {
            console.log(data, "data in Team");
            if (
              data?.data?.inviteFounder != null &&
              data?.data?.inviteFounder != undefined &&
              data?.data?.inviteFounder != "" &&
              data?.data?.inviteFounder == "Success"
            ) {
              setName("");
              setEmailId("");
              setProjectName("");
              setShowNameError(false);
              setShowEmailError(false);
              setShowProjectNameError(false);
              toast.success("Successfully Send Mail", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              // } else {
              //     alert(data?.data?.inviteFounder)

              //     setShowEmailError(true)
              // }
            } else if (
              data?.data?.inviteFounder != null &&
              data?.data?.inviteFounder != undefined &&
              data?.data?.inviteFounder != "" &&
              data?.data?.inviteFounder == "Email_already_exists"
            ) {
              alert("User Already exist");
              setShowEmailError(true);
            } else if (
              data?.data?.inviteFounder != null &&
              data?.data?.inviteFounder != undefined &&
              data?.data?.inviteFounder != "" &&
              data?.data?.inviteFounder == "Email_has_already_sent"
            ) {
              alert("Mail has already sent to this account");
              //
            } else {
              setShowEmailError(true);
            }
            // getSocialMediaDataFunc()
          });
      } catch (error) {
        console.log("adding new Team member error");
      }
    } else {
      if (Name == undefined || Name == null || Name == "") {
        setShowNameError(true);
      } else {
        setShowNameError(false);
      }
      if (
        emailId == undefined ||
        emailId == null ||
        emailId == "" ||
        result == false
      ) {
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }
      if (
        projectName == undefined ||
        projectName == null ||
        projectName == ""
      ) {
        setShowProjectNameError(true);
      } else {
        setShowProjectNameError(false);
      }
    }
  };

  const emailChangeFunc = (e) => {
    setShowNameError(false);
    setEmailId(e.target.value);
  };

  const changeNameFunc = (e) => {
    setShowEmailError(false);
    setName(e.target.value);
  };
  const changeProjectFunc = (e) => {
    setShowProjectNameError(false);
    setProjectName(e.target.value);
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: "60px" }}>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-left">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Invite a Founder</h3>
              </div>
            </div>
          </div>
          {/* <ul className="nav user-menu">

                        <li className="nav-item dropdown has-arrow flag-nav">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">

                                <span style={{ wordSpacing: 'normal' }}>{"Connect Wallet  "}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="" className="dropdown-item">
                                    MetaMask
                                </a>
                                <a href="" className="dropdown-item">
                                    Coinbase
                                </a>
                                <a href="" className="dropdown-item">
                                    MetaMask
                                </a>
                                <a href="" className="dropdown-item">
                                    Coinbase
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className=" nav-link" data-toggle="dropdown">
                                <i className="fa fa-bell-o" />
                            </a>

                        </li>

                        <li className="nav-item dropdown has-arrow main-drop">
                            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">

                                <span>Admin</span>
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/profile" style={{ wordSpacing: 'normal' }}>My Profile</Link>
                                <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
                                <Link className="dropdown-item" to="/login">Logout</Link>
                            </div>

                        </li>
                    </ul> */}
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "rgb(196 200 208) 0px 10px 20px",
            margin: "10px",
          }}
        >
          <div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Name<span className="text-danger">*</span>
                      </label>
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          value={Name}
                          onChange={(e) => changeNameFunc(e)}
                        />
                        {showNameError == false ? (
                          ""
                        ) : (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter Name
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      {/* <label>Email</label> */}
                      <label>
                        Email Id<span className="text-danger">*</span>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={emailId}
                          onChange={(e) => emailChangeFunc(e)}
                        />
                        {showEmailError == false ? (
                          ""
                        ) : (
                          <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter Valid Email
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Project Id<span className="text-danger">*</span></label>
                                        <div>
                                            <input type="text" className="form-control"  value={projectName}  onChange={(e) => changeProjectFunc(e)} />
                                            {showProjectNameError == false ? '' : <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Project Id</div>}
                                        </div>
                                    </div>
                                </div> */}
                </div>
              </div>
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="submit-section">
                </div>
                <div className="submit-section">
                  <button
                    className="btn buttonInProposal1 submit-btn"
                    onClick={() => sendReqFunc()}
                  >
                    SEND REQUEST
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "rgb(196 200 208) 0px 10px 20px",
            margin: "10px",
          }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">

                    <label>Referral Code</label>
<div className="row">
                  <div className="form-group col-5">
                    <div  onClick={() => copy( "https://dev.guardian.crsquare.finance/register?id=" + referralCode )} style={{ 
                      display:"flex",border : "2px solid #e3e3e3", width : "100%",margin : "0", padding:"5px", cursor:"pointer"}}>
                    <BiLink/>&nbsp;&nbsp;

                    <p style={{margin:"0",width:"100%",overflowY:"hidden"}}>https://dev.guardian.crsquare.finance/register?id={referralCode}
                    &nbsp;<div style={{float:"right"}}><BiCopy  /></div>  
                    {/* <button onClick={() => copy( referralCode )}><BiCopy/></button> */}
                      </p> 
                    </div>
                      

                    
                  </div> 
                  <div className="col-4">

                  <p> {value === null ? "Click here to copy to clipboard" : "Your Referral code is copied successfully"}</p>
                  </div>
                  </div>

                </div>  
              </div>
            </div>
            <div
              className="col-md-12"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></div>
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
  );
};

export default withRouter(InviteAnewFounder);
