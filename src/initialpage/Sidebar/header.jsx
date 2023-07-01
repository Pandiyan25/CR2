import React, { Component, useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/js/bootstrap.bundle';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'material-react-toastify';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import 'material-react-toastify/dist/ReactToastify.css';
import {
  headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21, metamask, coinbase,
  disconnectImg
} from '../../Entryfile/imagepath'

import { JsonValueUserAccount, projectId, showSettings, walletAddress,referralCode,userConnectedWalletDetails } from '../../reducers/ConstantSlice';
import { initiateNetwork } from '../../config/web3Client3';
import { useHistory, useNavigate } from "react-router-dom";
import { apiURI } from '../../config/config';
import { fetchProjectDetails } from '../../reducers/ProjectDetailsSlice';
import { fetchFundingProjectDetails } from '../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../reducers/SocialPageSlice';
import { fetchRoadMapProjectDetails } from '../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../reducers/BudgetSlice';
import { fetchNotificationDetails, selectAllNotificationsData } from '../../reducers/NotificationsSlice';
import { fetchConnectReq, selectAllConnectRequest } from '../../reducers/ConnectReqSlice';
import ReactLoading from "react-loading";
import Cookies from 'js-cookie';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
// import { createNotifFunc } from './Notification';

// class Header extends Component {
// const 
const Header = (props) => {
  // constructor(props) {
  //   super(props);

  //   // this.state = {
  //   //   showSettings: false
  //   // };

  // let history = useHistory()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  const [count, setCount] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [notificationsCount, setNotificationsCount] = useState(0)
  const [projectDetalsData, setProjectDetalsData] = useState([])
  const notificationData = useSelector(selectAllNotificationsData)
  const loginId = useSelector((state) => state.constVar.loginId)
  const WalletAddress = useSelector((state) => state.constVar.walletAddress)
  const JsonValueUserAccountData = useSelector((state) => state.constVar.JsonValueUserAccount)

  console.log(process.env.DB_HOST, "console.log(process.env.DB_HOST);");
  let history = useHistory()

  const [wlaFirstArray, setWlaFirstArray] = useState('');
  const [wlaEndArray, setWlaEndArray] = useState('');
  const [help, sethelp] = useState(false)
  console.log(wlaFirstArray, wlaEndArray, "wlaEndArray");
  const getAllConnectRequest = useSelector(selectAllConnectRequest)
  const [newWalletAddress, setNewWalletAddress] = useState('')
  const [launchStatus, setLaunchStatus] = useState(false)

  // }
  console.log(notificationData, "notificationData")
  const dispatch = useDispatch();
  const changePagetoSettings = () => {
    // console.log("actionking");
    // dispatch(showSettings(true));
    // history.push('/resetPassword')
    authenticateRegisterUser()
    // this.props.history.push({
    //   pathname: '/profile'
    // })

  }



  const authenticateRegisterUser = () => {
    var mail = projectDetalsData.length > 0 && projectDetalsData[0]?.email
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
              "email": mail
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


  // render() {
  console.log(props, "props");
  const location = props.location
  let pathname = location.pathname

  console.log(pathname, "pathname");

  // ** Metamask connection handlers

  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});



  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query getUser($id: ID) {
          User :getUser(_id: $id) {
            _id
            email
            password
            role
            contact
            first_name
            last_name
            role_in_organization
            fund_description
            minimum_investment_size
            project_invested
            type_of_fund
            preferred_sectors {
              value
            }
            fund_name
            asset_under_management
            projected_invested_till_date
            fund_head_quarters
            team_size
            linkedin
            linkedin_link
            website_link
            twitter_link
            education
            experience
            industry
            experience_in_blockchain
            current_position
            past_organisation_tags
            current_organisation
            current_income
            wallet_address
            current_location
            nationality
            id_proof
            self_description
            id_number
            aum
            profile_pic
            referral_code
          },
          
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

            "id": loginId,


          }
          // allNotification:allNotification(user: $id){
          //   message

          // }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          console.log('ProjectGetFunctiondata', data?.data);
          if (data?.data?.User != null && data?.data?.User != undefined) {
            setProjectDetalsData([data?.data?.User])
            console.log('project user wallet address ', data?.data?.User?.wallet_address)
            // console.log('project user Referral Code ', data?.data?.User?.referral_code)
            dispatch(referralCode(data?.data?.User?.referral_code))
            setNewWalletAddress(data?.data?.User?.wallet_address)
            dispatch(walletAddress(data?.data?.User?.wallet_address));
            
            // var wla = data?.data?.User?.wallet_address?.split("")
            // var min  = []
            // var max  = []
            // if(wla?.length > 10){
            //   for(var i = 0;i<=3;i++ ){
            //     max.push(wla[i])
            //   }
            //   for(var j = wla.length-1;j>wla.length - 5;j--){
            //     min.push(wla[j])
            //   }
            // }else{
            //   min = []
            //   max = []
            //   setWlaFirstArray([])
            //   setWlaEndArray([])
            // }
            // var minval = min.join("")
            // console.log(minval,"minval");
            // var maxval =  max.join("")
            // console.log(maxval,"maxval")
            // setWlaFirstArray(minval)

            var lite = truncate(data?.data?.User?.wallet_address, 20)
            console.log(lite, "liteing");

            setWlaEndArray(lite)

          }

          // else if (data?.data?.allNotification != null && data?.data?.allNotification != undefined && data?.data?.allNotification.length > 0) {
          //   setNotificationsCount(data?.data?.allNotification.length)

          // }
          else {
            setNotificationsCount(0)
            setNewWalletAddress('')
            setProjectDetalsData([])
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const getProjectList = () => {
    try {
        var query = `
        query AllProjects($founder: ID) {
            allProjects(founder: $founder) {
              _id
              launch_status {
                launched
                percentage
              }
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
                if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                    setLaunchStatus(data?.data?.allProjects[0]?.launch_status.launched)
                } else {
                    setLaunchStatus(false)
                }
            })
    } catch (error) {
        console.log(error, "funding in Project");
    }
  }


  const saveUserWalletAddress = (ethBalance, account, chainId, networkId, provider) => {
    // if (newWalletAddress == '' || newWalletAddress == undefined ) {
    try {
      var query = `
        mutation UpdateUser($id: ID, $input: UserInput) {
            updateUser(_id: $id, input: $input) {
              wallet_address
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
            "id": loginId,
            "input": {
              "wallet_address": account
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // if()
          console.log(data?.data?.updateUser);
          getProjectDetailsFunc()
          getProjectList()
          if (data?.data?.updateUser?.wallet_address) dispatch(walletAddress(data?.data?.updateUser?.wallet_address));

          saveUserInfo(ethBalance, account, chainId, networkId, provider, "api")
          // getUserDetailsFunc()

          // dispatch(projectId(data?.data?.createProject[0]._id))
        })


    } catch (error) {
      console.log("adding new projectDetail error", error);
    }
  }

  const clearAllNotiffunc = () => {
    try {
      var query = `
          mutation Mutation($id: ID, $input: NotificationInput) {
            updateNotification(_id: $id, input: $input) {
              message
              _id
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
            "id": loginId,
            "input": {
              "status": "Read",
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          dispatch(fetchNotificationDetails(loginId))
        })

    } catch (error) {
      console.log("Notifications Error");
    }
  }
  function checkConnectedWallet() {
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    if (userData != null && (userData?.account == newWalletAddress || userData?.account == WalletAddress)) {
      setUserInfo(userData);
      setIsConnected(true);
    } else {
      disconnectNetwork()
    }
  }

  useEffect(() => {
    if (loginId != '') {
      getProjectDetailsFunc()
      getProjectList()
      checkConnectedWallet();
      dispatch(fetchNotificationDetails(loginId))
      if (window.ethereum) { // this is for metamask installation detection
        window.ethereum.on('chainChanged', () => {
          const userData = JSON.parse(localStorage.getItem('userAccount'));
          if (userData) connectNetwork(userData.provider) // TODO: reuse the isConnected variable instead local storage
        });
        window.ethereum.on('accountsChanged', () => {
          const userData = JSON.parse(localStorage.getItem('userAccount'));
          if (userData) connectNetwork(userData.provider) // TODO: reuse the isConnected variable instead local storage
          console.log("Wal", WalletAddress);
        });
      }
    }
  }, [loginId])

  const onConnect = async (provider) => {
    console.log('connection provider: ', provider);
    connectNetwork(provider);
  };

  const onDisconnect = () => {
    disconnectNetwork();
  };

  // internal: validate the connected network in the metamask
  const validateNetwork = (networkId) => {
    const networks = {
      production: {
        1: "Ethereum Mainnet",
        137: "Polygon Mainnet"
      },
      development: {
        3: 'Ropsten test network',
        4: 'Rinkeby test network',
        5: 'Goerli test network',
        80001: 'Polygon test newtork',
        137: "Polygon Mainnet"
      }
    }
    
    console.log("network validation ", networkId, networks[process.env.APP_ENV][networkId])
    return networks[process.env.APP_ENV][networkId]
  }

  // internal: validate the connected metamask account
  const validateAccount = (account) => {
    console.log("wallet validation ", newWalletAddress, account, newWalletAddress === account)
    return newWalletAddress === account;
  }
  const connectNetwork = async (provider) => {
    try {
      const info = await initiateNetwork(provider);
      if (info instanceof Error) {
        alert(info.message)
        disconnectNetwork();
      } else if (info) {
        const { ethBalance, account, chainId, networkId } = info;
        console.log(info, "info");
        // dispatch(walletAddress(newWalletAddress));
        console.log(newWalletAddress, "WalletAddress in connectNetwork");
        if (validateNetwork(networkId)) {
          if (newWalletAddress != null && newWalletAddress != '') {
            console.log(newWalletAddress, "WalletAddress inside connectNetwork");
            if ((projectDetalsData[0]?.role === 'Founder' && !launchStatus) || validateAccount(account)) {
              saveUserInfo(ethBalance, account, chainId, networkId, provider, "change");
            } else {
              alert('Please check the connected wallet address');
              disconnectNetwork();
            }
          } else {
            saveUserWalletAddress(ethBalance, account, chainId, networkId, provider)
          }
        } else {
          alert('Please check the Network');
          disconnectNetwork();
        }
      } else {
        alert('Please check the Network or Account');
        disconnectNetwork();
      }
    } catch (err) {
      console.log(err)
      alert(err.message);
    }
  }

  const disconnectNetwork = async () => {
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    dispatch(userConnectedWalletDetails({status:''}));
    setIsConnected(false);
  }

  const saveUserInfo = (ethBalance, account, chainId, networkId, provider, location) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
      networkId: networkId,
      provider: provider
    };
    // console.log("1234 Data Change og: ",JSON.parse(localStorage.getItem('userAccount')),"New",userAccount)
    if (location === "api" && JSON.parse(localStorage.getItem('userAccount')) != userAccount){
      dispatch(userConnectedWalletDetails({
        status: "Changed"}));
    }
    // console.log("1234 Data Changed",chainId)
    console.log(process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS, "PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS")
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };

  // ** Metamask connection handlers end

  const getProjectData = (e) => {

    // e.preventDefault();
    // var mysearchValue = e.target.value;
    console.log(searchValue, "mysearchValue");
    if (searchValue != null && searchValue != undefined && searchValue != '') {
      getProjectSearchValue(searchValue)

    }


  }
  const getProjectSearchValue = (i) => {
    try {

      var query =
        `
          query AllProjects($projectId: String) {
            allProjects(project_id: $projectId) {
              _id
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

            "projectId": i

          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
          if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
            // setProjectDetalsData([data?.data?.getUser])

            dispatch(fetchRoadMapProjectDetails(data?.data?.allProjects[0]._id))
            dispatch(fetchBudgetProjectDetails(data?.data?.allProjects[0]._id))
            dispatch(fetchProjectDetails(data?.data?.allProjects[0]._id))
            dispatch(projectId(data?.data?.allProjects[0]._id))
            dispatch(fetchFundingProjectDetails(data?.data?.allProjects[0]._id))
            dispatch(fetchTeamSize(data?.data?.allProjects[0]._id))
            dispatch(fetchTokenomicsDetails(data?.data?.allProjects[0]._id))
            dispatch(fetchSocialTeam(data?.data?.allProjects[0]._id))
            history.push('/detail-projects')
            setSearchValue('')
            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const logoutFunc = () => {
    dispatch(projectId(''))
    Cookies.set('session', { userId: "",role:""});
    history.push('/login')
    window.location.reload()
  }
  const sendtoChat = () => {

    history.push('/conversation')
  }


  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(count + 1);
      dispatch(fetchConnectReq(loginId))
      var lite = localStorage.getItem('userAccount')
      if (lite != null && lite != undefined && lite != '') {

        dispatch(JsonValueUserAccount([JSON.parse(localStorage.getItem('userAccount'))]))
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [fetchConnectReq, count, dispatch]);


  function truncate(str, max, sep) {

    // Default to 10 characters
    max = max || 12;

    var len = str.length;
    if (len > max && len > 10) {

      // Default to elipsis
      sep = sep || "......";

      var seplen = sep.length;

      // If seperator is larger than character limit,
      // well then we don't want to just show the seperator,
      // so just show right hand side of the string.
      if (seplen > max) {
        return str.substr(len - max);
      }

      // Half the difference between max and string length.
      // Multiply negative because small minus big.
      // Must account for length of separator too.
      var n = -0.5 * (max - len - seplen);

      // This gives us the centerline.
      var center = len / 2;

      var front = str.substr(0, 4);
      var back = str.substr(len - 4); // without second arg, will automatically go to end of line.

      return front + sep + back;

    }

    return str;
  }

  console.log(JsonValueUserAccountData, "JsonValueUserAccount");

  return (
    <div>
  
      
    <div className="header" style={{ right: "0px", background: '#f8fbff', border: '0px', boxShadow: 'none', position: 'fixed' }} >
          

          
 
    {/* Logo */}
    <div className="header-left">
      <div id="toggle_btn" href="" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }}>
        <span className="bar-icon" style={{ color: '#6345ED' }}><span />
          <span />
          <span />
        </span>
      </div>

    </div>





    <div className="page-title-box">
      {/* <h3 style={{ display: 'none' }}>Dreamguy's Technologies</h3> */}
    </div>
    {/* /Header Title */}
    <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
    {/* Header Menu */}
    <ul className="nav user-menu">
      {/* Search */}
      
      <li className="nav-item">
        <Link to="/Idealist">
          <button className='btn add-btn2' style={{marginTop:"13px",height:"36px"}}>Switch to validation</button>
          </Link>     
          </li>   
       
      <li className="nav-item" style={{width:"100px",textAlign:"center",marginTop:"13px"}}><p onClick={() => sethelp(!help)}><button style={{width:"80px",border:"0px",borderRadius:"2px", background:"linear-gradient(90deg,#6345ED,#DC39FC)",fontWeight:"500",color:"white",fontSize:"11px",height:"36px"}}>Help</button></p>
      <div   style={{display: help && projectDetalsData[0]?.role === 'Founder'? 'block' : 'none',zIndex:"1001"}}>
          <Toast  className="toast__open21" style={{textAlign:"left"}}>
                <ToastHeader closeButton={false}>
                    <div className='header__div'>

                        <FontAwesomeIcon icon={faLightbulb} className='stylessvg' />
                    </div>
                    {/*  */}
                </ToastHeader>
                <ToastBody>
                  <div >
                    <h4 className='h2div mb-2'>
                    Steps for Founder project creation
                    </h4>
       
                    <ul className='ul__toast mb-2' style={{fontSize:"12px"}}>
                        <li className='toast__li'>Step 1. Register</li>
                        <li className='toast__li'> Step 2. Update Profile & KYC</li>
                        <li className='toast__li'>Step 3. Update Project Data & Launch</li>
                        <li className='toast__li'>Step 4. Get Validated</li>
                        <li className='toast__li'>Step 5. Connect with investor</li>
                        <li className='toast__li'>Step 6. Create Private or Public Round</li>
                        <li className='toast__li'>Step 7. Complete  Milestones & unlock Funds</li>
                        <li className='toast__li'>Step 7. Issue Tokens through Vesting Contracts</li>

                        {/* <li className='toast__li'>
                            Update your startup profile before for any changes before creating private round.
                        </li>
                        <li className='toast__li'>Make sure to double-check the details of your offer such as price, funding required and stage.</li>
                        <li className='toast__li'>Lock the Tokens in Vesting Contracts is most recommended milestone.</li>
                        <li className='toast__li'>Choose target dates for milestones strategically.</li> */}
                    </ul>
                    <div style={{ width: '100%', textAlign: 'center' }}>


                    <p style={{position:"absolute",left:"80%",cursor:"pointer"}} onClick={() => sethelp(!help)}>close</p>
                    </div>
                    </div>
                </ToastBody>
            </Toast>

     


          </div>

   

          <div   style={{display: help && projectDetalsData[0]?.role === 'Investor'? 'block' : 'none',zIndex:"1001"}}>
          <Toast  className="toast__open21" style={{textAlign:"left"}}>
                <ToastHeader closeButton={false}>
                    <div className='header__div'>

                        <FontAwesomeIcon icon={faLightbulb} className='stylessvg' />
                    </div>
                    {/*  */}
                </ToastHeader>
                <ToastBody>
                    <h4 className='h2div mb-2'>
                    Steps for Investor project creation
                    </h4>
       
                    <ul className='ul__toast'>
                        {/* <li className='toast__li'>Step 1. Register</li>
                        <li className='toast__li'> Step 2. Update Profile & KYC</li>
                        <li className='toast__li'>Step 3. Update Project Data & Launch</li>
                        <li className='toast__li'>Step 4. Get Validated</li>
                        <li className='toast__li'>Step 5. Connect with investor</li>
                        <li className='toast__li'>Step 6. Create Private or Public Round</li>
                        <li className='toast__li'>Step 7. Complete  Milestones & unlock Funds</li>
                        <li className='toast__li'>Step 7. Issue Tokens through Vesting Contracts</li> */}

                        {/* <li className='toast__li'>
                            Update your startup profile before for any changes before creating private round.
                        </li>
                        <li className='toast__li'>Make sure to double-check the details of your offer such as price, funding required and stage.</li>
                        <li className='toast__li'>Lock the Tokens in Vesting Contracts is most recommended milestone.</li>
                        <li className='toast__li'>Choose target dates for milestones strategically.</li> */}
                    </ul>
                    <div style={{ width: '100%', textAlign: 'center' }}>


                    <p style={{position:"absolute",left:"80%"}} onClick={() => sethelp(!help)}>close</p>
                    </div>
                </ToastBody>
            </Toast>

     


          </div>
      
      </li>

      <li className="nav-item">
        <div className="top-nav-search">
          <a href="" className="responsive-search">
            <i className="fa fa-search" />
          </a>
          <div>
            <input className="form-control" type="text" placeholder="Search here" style={{ color: 'black' }} onChange={(e) => setSearchValue(e.target.value)} />
            <button className="btn" onClick={(e) => getProjectData(e)} style={{ background: 'linear-gradient(90deg,#6345ED,#DC39FC)', borderRadius: '0px 2px 2px 0px' }}>
              <i className="fa fa-search" style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      </li>

      {!isConnected &&
        <li className="nav-item dropdown flag-nav">
          <a className="nav-link dropdown-toggle" data-toggle="dropdown"  datahref="#" role="button">

            <span className='connectbutton' style={{ wordSpacing: 'normal', background: '#299B00', color: 'white', padding: '10px 15px 10px 15px', borderRadius: '2px', fontSize: '13px',fontWeight:"500" }}>{"Connect Wallet  "}</span>
          </a>


          <div className="dropdown-menu dropdown-menu-right">
            <a onClick={() => onConnect("metamask")} className="dropdown-meta" style={{ borderBottom: '1px solid #E3E9EF' }}>
              <img src={metamask} style={{ width: '60px', height: '45px' }} />
              <h4 style={{ marginRight: '15px' }}>
                MetaMask
              </h4>
            </a>
            {/* <a onClick={() => onConnect("coinbase")} className="dropdown-meta">

              <img src={coinbase} style={{ width: '45px', height: '40px', marginLeft: '8px' }} />
              <h4 style={{ marginRight: '15px' }}>Coinbase</h4>

            </a> */}
          </div>


          
        </li>
      }

      {/* .user-menu.nav > li > a */}
      {isConnected ?
        JsonValueUserAccountData.length > 0 ?
          <li className="nav-item dropdown flag-nav">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
              <div className='connectButtonSuperHead'>


                <div className='connectButtonHead '>
                  <span className='connectbuttonMain' >
                    {/* {JSON.parse(localStorage.getItem('userAccount')?.networkId)} */}
                    {JsonValueUserAccountData.length > 0 ?
                      JsonValueUserAccountData[0]?.networkId == 1 ? "Ethereum"
                        :
                        JsonValueUserAccountData[0]?.networkId == 137 ? "Polygon"
                          :
                          JsonValueUserAccountData[0]?.networkId == 3 ? "Ropsten"
                            :
                            JsonValueUserAccountData[0]?.networkId == 4 ? "Rinkeby"
                              :
                              JsonValueUserAccountData[0]?.networkId == 5 ? "Goerli"
                                :
                                JsonValueUserAccountData[0]?.networkId == 80001 ? "Polygon"
                                  :
                                  ''
                      : ''
                    }
                    {/* {"Polygon"} */}
                  </span>
                  <span className='connectbuttonMain firstGridHeader' ><span className='connectbuttonMain descSpan letterspac'>{JsonValueUserAccountData[0]?.account}</span></span>
                </div >
              </div>
            </a>
            <div className="transformstyle dropdown-menu dropdown-menu-right " >
              <a onClick={onDisconnect} className="dropdown-meta-style dropdown-meta" style={{ height: '100%' }}>
                <img src={disconnectImg} style={{ width: '20px', height: '20px' }} />
                <h4 style={{ marginRight: '5px', fontSize: '16px' }}>
                  Disconnect
                </h4>
              </a>
            </div>
          </li>
          :


          <li className="nav-item dropdown flag-nav">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
              <div className='connectButtonSuperHead'>


                <div className='connectButtonHead '>
                  <span className='connectbuttonMain mainspinspan' >

                    <ReactLoading type={"spinningBubbles"} style={{ height: "40px", fill: "green", width: '38px' }} />
                  </span>
                </div>
              </div>
            </a>
          </li>
        :
        ''

      }


      {/* /Flag */}
      {/* Notifications */}
      {/* <div> */}
      <li className="nav-item dropdown">
        {/* <div> */}
        <a href="#" className="dropdown-toggle nav-link notific" data-toggle="dropdown">
          <i className="fa fa-bell-o" /> <span className="badge badge-pill">{notificationData.length}</span>
        </a>
        {/* </div> */}

        <div className="dropdown-menu notifications" style={{ width: '220px', left: '-75px' }}>
          <div className="topnav-dropdown-header">
            <span className="notification-title">Notifications</span>
            <button href="" className="clear-noti" style={{ background: 'transparent', height: '100%', border: 'none' }} onClick={() => clearAllNotiffunc()}> Clear All </button>
          </div>
          <div className="noti-content" style={{ width: '100%' }}>
            <ul className="notification-list">
              {notificationData.length > 0 && notificationData.map((i,index) => (


                <li className="notification-message" key={index}>
                  <div className="media">
                    <div className="media-body">
                      <p className="noti-details" style={{ wordBreak: 'break-all' }}> {">"} {i?.message}</p>
                    </div>
                  </div>
                </li>

              ))}


            </ul>
          </div>

        </div>
      </li>

      <li className="nav-item dropdown" onClick={() => sendtoChat()}>
        {/* <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown " > */}
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          <i className="fa fa-comment-o" /> <span className="badge badge-pill">{getAllConnectRequest?.length > 0 ? getAllConnectRequest[0].sendRequest?.length + getAllConnectRequest[0].receivedRequest?.length : 0}</span>
        </a>


      </li>

      <li className="nav-item dropdown has-arrow main-drop">
        <a href="#" className="dropdown-toggle nav-link admin-name-map" data-toggle="dropdown">
          <span className="user-img"><img src={projectDetalsData.length > 0 ? projectDetalsData[0]?.profile_pic : Avatar_02} alt="" />
            {/* <span className="status online" /> */}
          </span>
          <span className="admin-name">{projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</span>
        </a>
        <div className="dropdown-menu dropdown-menu-right" >
          <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>User Id : {projectDetalsData.length > 0 && projectDetalsData[0]?.id_number}</div>
          <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>Name : {projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</div>
          <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>Email : {projectDetalsData.length > 0 && projectDetalsData[0]?.email}</div>
          <div className="dropdown-item-hi" style={{ margin: '5px' }} onClick={() => changePagetoSettings()} >Reset Password</div>
          {/* <Link className="dropdown-item" to="/profile">Get Support</Link>
          <Link className="dropdown-item" to="/profile">Set Calender</Link> */}
          <div className="dropdown-item-hi" style={{ margin: '5px' }} onClick={() => logoutFunc()}>Logout</div>
        </div>
      </li>
    </ul>
    {/* /Header Menu */}
    {/* Mobile Menu */}
    <div className="dropdown mobile-user-menu">
      <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
      <div className="dropdown-menu dropdown-menu-right">
        <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>User Id : {projectDetalsData.length > 0 && projectDetalsData[0]?.id_number}</div>
        <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>Name : {projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</div>
        <div className="dropdown-item-name" style={{ margin: '5px', cursor: 'default' }}>Email : {projectDetalsData.length > 0 && projectDetalsData[0]?.email}</div>
        {/* <div className="dropdown-item" to="/profile">Get Support</div>
        <div className="dropdown-item" to="/profile">Set Calender</div> */}
        <div className="dropdown-item" style={{ margin: '5px' }}>Logout</div>
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
    {/* /Mobile Menu */}
  </div>
  </div>
  );
}
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setActivePage: (ActivePage) => dispatch(setActivePage(ActivePage)),
//     showSettings: () => dispatch(showSettings(true)),

//     showSettings: () => dispatch({ type: "showSettings", payload: true }),
//   }
// }
// connect( mapDispatchToProps)
export default withRouter((Header));
// export default connect(mapDispatchToProps) (withRouter(Header))