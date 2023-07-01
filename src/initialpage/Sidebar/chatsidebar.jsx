/**
 * App Header
 */
import React, { Component, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User, Avatar_02, Avatar_05, Avatar_09, Avatar_10 } from "../../Entryfile/imagepath"
import { selectAllConnectRequest } from '../../reducers/ConnectReqSlice';
import { userLoginLinForChat } from '../../reducers/ConstantSlice';
import ConnectRequestPage from './ConnectRequestPage';

const Chatsidebar = (props) => {
  const [showSentReqPopup, setShowSentReqPopup] = useState(false)
  let pathname = props.location.pathname
  let pathnameWithWindow = window.location.href
  const showSentRequest = () => {
    setShowSentReqPopup(true)
  }
  const handleCloseRequest = () => {
    setShowSentReqPopup(false)
  }


  const dispatch = useDispatch()
  console.log(pathname, pathnameWithWindow, pathname.includes('634d267dfc08fdedcfa168b4'), "pathname.includes");
  const getAllConnectRequest = useSelector(selectAllConnectRequest)

  return (
    <div className="sidebar" id="sidebar" style={{ borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
      <div className="sidebar-inner slimscroll">

        <div id="sidebar-menu" className="sidebar-menu">
          {/* style={{marginBottom:'10px'}} */}
          <div className="header-left" >
            <Link to="/" className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div className='mainPageImg' id='mainPageImg'>

              </div>
              {/* <img src={headerlogo} width="80%" alt="" style={{borderBottom:'2px solid #E3E9EF' ,padding:'10px'}} /><span className='nameFEt' style={{ wordSpacing: 'normal'}}>CR SQUARE</span> */}
              {/* height={60} */}
            </Link>
          </div>
          <ul className='headerLeftUl22'>
            <li>
              <Link to="/"><i className="la la-home" /> <span>Back to Home</span></Link>
            </li>
            {/* <a href="#" data-toggle="modal" data-target="#add_chat_user"><i className="fa fa-plus" /></a> */}

            <li className={pathname.includes('ConnectRequest') ? "active" : "notactive"}>
              <Link to="/ConnectRequest" >
                <span className="chat-avatar-sm user-img" >
                  <i className="fa fa-plus" style={{ color: '#1890ff' }} />
                </span>
                <span className="chat-user">Connect Request</span>
                <span className="badge badge2 badge-pill bg-success2">{getAllConnectRequest?.length > 0 ? getAllConnectRequest[0].receivedRequest?.length : 0}</span>
              </Link>
            </li>
            <li className={pathname.includes('SentRequest') ? "active" : "notactive"}>
              <Link to="/SentRequest">
                <span className="chat-avatar-sm user-img">
                  <i className="fa fa-plus" style={{ color: '#1890ff' }} />
                </span>
                <span className="chat-user">Sent Request</span>
                <span className="badge badge2 badge-pill bg-success2">{getAllConnectRequest?.length > 0 ? getAllConnectRequest[0].sendRequest?.length : 0}</span>
              </Link>
            </li>
            <li className="direct_style menu-title">Direct Chats </li>
            {/* <li>
              <Link to="/conversation">
                <span className="chat-avatar-sm user-img">
                  <img className="rounded-circle" alt="" src={Avatar_02} /><span className="status online" />
                </span>
                <span className="chat-user">Test Subject</span> <span className="badge badge2 badge-pill bg-success2">1</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/conversation">
                <span className="chat-avatar-sm user-img">
                  <img className="rounded-circle" alt="" src={Avatar_09} /><span className="status offline" />
                </span>
                <span className="chat-user">Richard Miles</span> <span className="badge badge2 badge-pill bg-success2">7</span>
              </Link>
            </li>
            <li>
              <Link to="/conversation">
                <span className="chat-avatar-sm user-img">
                  <img className="rounded-circle" alt="" src={Avatar_10} /><span className="status away" />
                </span>
                <span className="chat-user">John Smith</span>
              </Link>
            </li> */}
            {getAllConnectRequest?.length > 0 && getAllConnectRequest[0]?.chatData?.length > 0 ?
              getAllConnectRequest[0]?.chatData?.map((i) => (
                <li className={pathnameWithWindow.includes(`#${i?.user?._id}`) ? "active" : "notactive"} onClick={() => dispatch(userLoginLinForChat(i?.user?._id))}>
                  <Link to={`/conversation#${i?.user?._id}`} >
                    <span className="chat-avatar-sm user-img">

                      {
                        i?.user?.role == 'Investor' ?
                          <img className="rounded-circle" alt="" src={i?.user?.fund_logo} />
                          :
                          <img className="rounded-circle" alt="" src={i?.user?.profile_pic} />
                      }
                      <span className="status online" />
                    </span>
                    {
                      i?.user?.role == 'Investor' ?
                      
                      <span className="chat-user">{i?.user?.fund_name}</span>
                      :

                        <span className="chat-user">{i?.user?.first_name} {i?.user?.last_name}</span>
                        
                    }
                    {/* <span className="badge badge2 badge-pill bg-success2">2</span> */}
                  </Link>
                </li>

              ))

              :
              <li className={pathname.includes('conversation') ? "active" : "notactive"}>
                <Link to="/conversation">
                  {/* <span className="chat-avatar-sm user-img">
                  <img className="rounded-circle" alt="" src={Avatar_05} /><span className="status online" />
                </span> */}
                  <span className="chat-user">Loading...</span>
                  {/* <span className="badge badge2 badge-pill bg-success2">2</span> */}
                </Link>
              </li>
            }

          </ul>
        </div>
      </div>
      <ConnectRequestPage handleClose={handleCloseRequest} show={showSentReqPopup} />
    </div>

  );

}

export default withRouter(Chatsidebar);
