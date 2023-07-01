import React, { Component, useState, useEffect } from 'react';
import Web3 from 'web3';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import {
  headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
  Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21
} from '../../Entryfile/imagepath'
import { projectId, showSettings, walletAddress } from '../../reducers/ConstantSlice';
import { initiateNetwork } from '../../config/web3Client3';
import { useHistory, useNavigate } from "react-router-dom";
import { apiURI } from '../../config/config';
import './header.css'
import { fetchProjectDetails } from '../../reducers/ProjectDetailsSlice';
import { fetchFundingProjectDetails } from '../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../reducers/SocialPageSlice';
import { fetchNotificationDetails, selectAllNotificationsData } from '../../reducers/NotificationsSlice';

// class Header extends Component {
// const 
const SuperAdminHeader = (props) => {
  // constructor(props) {
  //   super(props);

  //   // this.state = {
  //   //   showSettings: false
  //   // };

  const [searchValue, setSearchValue] = useState('')

  const notificationData = useSelector(selectAllNotificationsData)
  const [projectDetalsData, setProjectDetalsData] = useState([])

  const loginId = useSelector((state) => state.constVar.loginId)
  const WalletAddress = useSelector((state) => state.constVar.walletAddress)
  console.log(process.env.DB_HOST, "console.log(process.env.DB_HOST);");
  let history = useHistory()

  // }
  const dispatch = useDispatch();
  const changePagetoSettings = () => {
    // console.log("actionking");
    dispatch(showSettings(true));
    history.push('/profile')

    // this.props.history.push({
    //   pathname: '/profile'
    // })

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
        query AllProjects($id: ID) {
          getUser(_id: $id) {
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

            "id": loginId

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
          if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
            setProjectDetalsData([data?.data?.getUser])

            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }

  const saveUserWalletAddress = (ethBalance, account, chainId, networkId, provider) => {
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
          dispatch(walletAddress(data?.data?.updateUser?.wallet_address));

          saveUserInfo(ethBalance, account, chainId, networkId, provider)
          // getUserDetailsFunc()

          // dispatch(projectId(data?.data?.createProject[0]._id))
        })


    } catch (error) {
      console.log("adding new projectDetail error", error);
    }

  }
  useEffect(() => {

    if (loginId != '') {
      getProjectDetailsFunc()
      dispatch(fetchNotificationDetails(loginId))
    }
  }, [loginId])

  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);

      }
    }
    checkConnectedWallet();

    if (window.ethereum) { // this is for metamask installation detection
      window.ethereum.on('chainChanged', () => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) connectNetwork(userData.provider) // TODO: reuse the isConnected variable instead local storage
      });
      window.ethereum.on('accountsChanged', () => {
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) connectNetwork(userData.provider) // TODO: reuse the isConnected variable instead local storage
      });
    }
  }, []);

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
        80001: 'Polygon test newtork'
      }
    }
    return networks[process.env.NODE_ENV][networkId]
  }

  // internal: validate the connected metamask account
  const validateAccount = (account) => {
    return WalletAddress === account;
  }
  const connectNetwork = async (provider) => {
    try {
      const info = await initiateNetwork(provider);
      if (info instanceof Error) {
        alert(info.message)
        disconnectNetwork();
      } else if (info) {
        const { ethBalance, account, chainId, networkId } = info;
        if (WalletAddress) {
          if (validateAccount(account) && validateNetwork(networkId)) {
            saveUserInfo(ethBalance, account, chainId, networkId, provider);
          } else {
            alert('Please check the Network or Account');
            disconnectNetwork();
          }
        } else {
          await saveUserWalletAddress(ethBalance, account, chainId, networkId, provider)
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
    setIsConnected(false);
  }

  const saveUserInfo = (ethBalance, account, chainId, networkId, provider) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
      networkId: networkId,
      provider: provider
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };



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


  const getProjectData = (e) => {

    // e.preventDefault();
    // var mysearchValue = e.target.value;
    console.log(searchValue, "mysearchValue");
    if (searchValue != null && searchValue != undefined && searchValue != '') {
      getProjectSearchValue(searchValue)

    }


  }
  const changePasswordSettings = () => {
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
  // ** Metamask connection handlers end

  return (
    <div className="header" style={{ right: "0px", background: 'transparent', border: '0px', boxShadow: 'none' }} >
      {/* Logo */}
      <div className="header-left">
        <Link id="toggle_btn" href="" style={{ display: pathname.includes('tasks') ? "none" : pathname.includes('compose') ? "none" : "" }}>
          <span className="bar-icon" style={{ color: '#6345ED' }}><span />
            <span />
            <span />
          </span>
        </Link>
        {/* <Link to="/app/main/dashboard" className="logo" style={{display:'none'}}>
            <img src={headerlogo} width={40} height={40} alt="" />
          </Link> */}
      </div>

      {/* float: left;
    height: 60px;
    padding: 0 0rem 0 0;
    position: relative;
    text-align: center;
    width: 576px;
    z-index: 1;
    transition: all 0.2s ease-in-out; */}
      {/* /Logo */}

      {/* Header Title */}
      <div className="page-title-box">
        <h3 style={{ display: 'none' }}>Dreamguy's Technologies</h3>
      </div>
      {/* /Header Title */}
      <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
      {/* Header Menu */}
      <ul className="nav user-menu">
        {/* Search */}
        <li className="nav-item">
          <div className="top-nav-search">
            <a href="" className="responsive-search">
              <i className="fa fa-search" />
            </a>
            <div>
              <input className="form-control" type="text" placeholder="Search here" style={{ color: 'black' }} onChange={(e) => setSearchValue(e.target.value)} />
              <button className="btn" onClick={(e) => getProjectData(e)} style={{background:'#1890ff',borderRadius:'0px 0px 0px 0px'}}>
                <i className="fa fa-search" />
              </button>
            </div>

          </div>
        </li>
        {/* /Search */}
        {/* Flag has-arrow */}
        {!isConnected &&
          <li className="nav-item dropdown flag-nav">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">

              <span className='connectbutton' style={{ wordSpacing: 'normal', background: '#299B00', color: 'white', padding: '10px 15px 10px 15px', borderRadius: '2px', fontSize: '12px' }}>{"Connect Wallet  "}</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a onClick={() => onConnect("metamask")} className="dropdown-item">
                MetaMask
              </a>
              <a onClick={() => onConnect("coinbase")} className="dropdown-item">
                Coinbase
              </a>
            </div>
          </li>
        }
        {isConnected &&
          <div className="">
            {/* <div className="" style={{ fontSize: '12px' }}>
              <span>{userInfo.account}</span>
            </div>
            <div className="" style={{ fontSize: '12px' }}>
              <span>{userInfo.balance}</span>
            </div> */}
            <div style={{ margin: '15px 15px 0px 0px' }}>
              <button className="" onClick={onDisconnect} style={{ wordSpacing: 'normal', borderColor: '#299B00', padding: '5px 15px 5px 15px', borderRadius: '2px', fontSize: '12px' }}>
                Disconnect
              </button>
            </div>
          </div>
        }
        {/* /Flag */}
        {/* Notifications */}
        {/* <div> */}
        {/* <li className="nav-item dropdown"> */}
        {/* <div> */}
        {/* <a href="#" className="dropdown-toggle nav-link notific" data-toggle="dropdown">
            <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
          </a> */}
        {/* </div> */}
        <li className="nav-item dropdown">
          {/* <div> */}
          <a href="#" className="dropdown-toggle nav-link notific" data-toggle="dropdown">
            <i className="fa fa-bell-o" /> <span className="badge badge-pill">{notificationData.length}</span>
          </a>
          {/* </div> */}

          <div className="dropdown-menu notifications" style={{ width: '220px', left: '-75px' }}>
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <button href="" className="clear-noti" style={{ background: 'transparent', height: '100%', border: 'none' }}> Clear All </button>
            </div>
            <div className="noti-content" style={{ width: '100%' }}>
              <ul className="notification-list">

                {notificationData.length > 0 && notificationData.map((i) => (
                  <li className="notification-message">
                    <div className="media">

                      <div className="media-body">
                        <p className="noti-details" style={{ wordBreak: 'break-all' }}> {">"} {i?.message}</p>
                        {/* <p className="noti-details" style={{ wordBreak: 'break-all' }}>You have received an initial proposal from Gethin</p> */}
                      </div>
                    </div>
                  </li>

                ))}
              </ul>
            </div>

          </div>
          {/* </li> */}
          {/* <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="" className="clear-noti"> Clear All </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                      <div className="media">
                       
                        <div className="media-body">
                          <p className="noti-details">You have received an initial proposal from Gethin</p>
                        </div>
                      </div>
                  </li>
                  
                </ul>
              </div>
              
            </div> */}
        </li>
        <li className="nav-item dropdown has-arrow main-drop">
          <a href="#" className="dropdown-toggle nav-link admin-name-map" data-toggle="dropdown">
            <span className="user-img"><img  src={projectDetalsData.length > 0 ? projectDetalsData[0]?.profile_pic :Avatar_02} alt="" />
              {/* <span className="status online" /> */}
              </span>
            <span className="admin-name">{projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right" >
            <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>User Id : {projectDetalsData.length > 0 && projectDetalsData[0]?.id_number}</p>
            <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>Name : {projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</p>
            <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>Email : {projectDetalsData.length > 0 && projectDetalsData[0]?.email}</p>
            <Link className="dropdown-item" style={{ margin: '5px' }} onClick={() => changePasswordSettings()} >Reset Password</Link>
            {/* <Link className="dropdown-item" onClick={() => changePagetoSettings()} to="/profile">Settings</Link>
            <Link className="dropdown-item" to="/profile">Get support</Link>
            <Link className="dropdown-item" to="/profile">Set Calender</Link> */}
            <Link className="dropdown-item" to="/login" style={{ margin: '5px' }}>Logout</Link>
          </div>
        </li>
      </ul>
      {/* /Header Menu */}
      {/* Mobile Menu */}
      <div className="dropdown mobile-user-menu">
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
        <div className="dropdown-menu dropdown-menu-right">
          <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>User Id : {projectDetalsData.length > 0 && projectDetalsData[0]?.id_number}</p>
          <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>Name : {projectDetalsData.length > 0 && projectDetalsData[0]?.first_name}</p>
          <p className="dropdown-item-name" style={{ margin: '5px' ,cursor:'default'}}>Email : {projectDetalsData.length > 0 && projectDetalsData[0]?.email}</p>
          {/* <Link className="dropdown-item" to="/profile">Get support</Link>
          <Link className="dropdown-item" to="/profile">Set Calender</Link> */}
          <Link className="dropdown-item" to="/login" style={{ margin: '5px' }}>Logout</Link>
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
export default withRouter((SuperAdminHeader));
// export default connect(mapDispatchToProps) (withRouter(Header))
