/**
 * Signin Firebase
 */

import { faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { wrap } from 'regenerator-runtime';
import { apiURI } from '../../../config/config';
import { PlaceHolder, Attachment, Avatar_05, Avatar_02, Avatar_13, Avatar_16 } from '../../../Entryfile/imagepath'
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice';
import { fetchConnectReq, selectAllConnectRequest } from '../../../reducers/ConnectReqSlice';
import { InvestorsLoginId, projectId } from '../../../reducers/ConstantSlice';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice';
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice';


const ChatPage = () => {
  const dispatch = useDispatch()

  let history = useHistory()
  const [allProjectDetails, setAllProjectDetails] = useState([])
  const [messageText, setMessageText] = useState('')
  const userLoginLinForChat = useSelector((state) => state.constVar.userLoginLinForChat)
  const loginId = useSelector((state) => state.constVar.loginId)
  let pathnameWithWindow = window.location.href
  const getAllConnectRequest = useSelector(selectAllConnectRequest)

  // useEffect(() => {
  //   let firstload = localStorage.getItem("minheight")
  //   if (firstload === "true") {
  //     setTimeout(function () {
  //       window.location.reload(1)
  //       localStorage.removeItem("minheight")
  //     }, 1000)
  //   }
  // });
  useEffect(() => {
    if (userLoginLinForChat != '') {
      getProjectIdFunc()
    }
    console.log(userLoginLinForChat, "userLoginLinForChat");

  }, [userLoginLinForChat])

  const goToProjectPage = (id) => {

    dispatch(fetchRoadMapProjectDetails(id))
    dispatch(fetchBudgetProjectDetails(id))
    dispatch(fetchProjectDetails(id))
    dispatch(projectId(id))
    dispatch(fetchFundingProjectDetails(id))
    dispatch(fetchTeamSize(id))
    dispatch(fetchTokenomicsDetails(id))
    dispatch(fetchSocialTeam(id))
    dispatch(fetchBudgetBannerDetails(id))
    history.push('/detail-projects')
  }

  const goToInvestorsPage = (id) =>{
    dispatch(InvestorsLoginId(id))
    history.push('/InvestorDetails')
  }

  const getProjectIdFunc = () => {
    try {

      var query =
        `
        query AllProjects($founder: ID) {
          allProjects(founder: $founder) {
            _id
            project_name
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
            founder: userLoginLinForChat
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log(data, "exist");
          if (data?.data?.allProjects?.length > 0) {
            setAllProjectDetails(data?.data?.allProjects)
          }
        });

    } catch (err) {
      alert(`${err} in createchat`)
    }
  }
  const createMesgfunc = (receiver_id) => {
    try {

      var query =
        `
          mutation CreateMessage($input: MessageInput) {
            createMessage(input: $input) {
              body
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
            "input": {
              "sender": loginId,
              "receiver": receiver_id,
              "body": messageText
            }
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.createMessage != null && data?.data?.createMessage != undefined) {
            setMessageText('')

            dispatch(fetchConnectReq(loginId))
          }
        });

    } catch (err) {
      alert(`${err} in createchat`)
    }
  }

  const deleteMesg = (delete_id) => {
    try {

      var query =
        `
          mutation DeleteMessage($id: ID) {
            deleteMessage(_id: $id) {
              sender {
                _id
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
            id: delete_id
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.deleteMessage != null && data?.data?.deleteMessage != undefined) {
            dispatch(fetchConnectReq(loginId))
          }
        });

    } catch (err) {
      alert(`${err} in createchat`)
    }
  }
  console.log(getAllConnectRequest, "getAllConnectRequest");


  const opennewWindow = (i) => {
    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }


  return (
    <div  >
      {/* className="page-wrapper" */}
      {/* className="content container-fluid" */}
      <div >


        {getAllConnectRequest?.length > 0 && getAllConnectRequest[0]?.chatData?.length > 0 ?
          getAllConnectRequest[0]?.chatData?.map((i) => (
            pathnameWithWindow.includes(`#${i?.user?._id}`) ?

              <div className="chat-main-row">

                <div className="chat-main-wrapper">
                  
                  <div className="col-lg-11 message-view task-view">
                    <div className="chat-window">
                      <div className="fixed-header">
                        <div className="navbar">
                          <div className="user-details mr-auto">
                            <div className="float-left user-img">
                              {/* app/profile/employee-profile */}
                              {/* to="/conversation" title="Mike Litorus" */}
                              <div className="avatar" >
                                
                              {
                                        i?.user?.role == 'Investor' ? 
                                <img src={i?.user?.fund_logo} alt="" className="rounded-circle" style={{ width: '38px', height: '38px' }} />
                                :
                                <img src={i?.user?.profile_pic} alt="" className="rounded-circle" style={{ width: '38px', height: '38px' }} />
                              }
                                <span className="status online" />
                              </div>
                            </div>
                            <div className="user-info float-left">
                              {/* to="/conversation" title="Mike Litorus" */}
                              {/* <i className="typing-text">Typing...</i> */}
                              {
                                        i?.user?.role == 'Investor' ? 
                              <div ><span>{i?.user?.fund_name}</span></div>
                               :
                               <div ><span>{i?.user?.first_name} {i?.user?.last_name}</span></div>
                            }
                              {/* <span className="last-seen">Last seen today at 7:50 AM</span> */}
                            </div>
                          </div>
                          {/* <div className="search-box">
                        <div className="input-group input-group-sm">
                          <input type="text" placeholder="Search" className="form-control" />
                          <span className="input-group-append">
                            <button type="button" className="btn"><i className="fa fa-search" /></button>
                          </span>
                        </div>
                      </div> */}
                          {/* <ul className="nav custom-menu">
                          <li className="nav-item">
                            <a className="nav-link task-chat profile-rightbar float-right" id="task_chat" href="#task_window"><i className="fa fa-user" /></a>
                          </li> */}
                          {/* <li className="nav-item">
                          <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/voice-call" className="nav-link"><i className="fa fa-phone" /></Link>
                        </li> */}
                          {/* <li className="nav-item">
                          <Link to="/conversation/video-call" className="nav-link"><i className="fa fa-video-camera" /></Link>
                        </li> */}
                          {/* <li className="nav-item dropdown dropdown-action">
                            <a aria-expanded="false" data-toggle="dropdown" className="nav-link dropdown-toggle" href=""><i className="fa fa-cog" /></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">Delete Conversations</a>
                              <a href="#" className="dropdown-item">Settings</a>
                            </div>
                          </li> */}
                          {/* </ul> */}
                        </div>
                      </div>

                      <div className="chat-contents">
                        <div className="chat-content-wrap">
                          <div className="chat-wrap-inner">
                            <div className="chat-box">

                              {i?.messages.length > 0 ?
                                i?.messages?.map((mesg) => (
                                  <div className="chats">
                                    <div className="chat-line">
                                      <span className="chat-date">{mesg?.date}</span>
                                    </div>
                                    {mesg?.current?.map((insideCurrent) => (
                                      insideCurrent?.sender?._id == loginId ?
                                        <div className="chat chat-right">
                                          <div className="chat-body">
                                            <div className="chat-bubble">
                                              <div className="chat-content">
                                                <p>{insideCurrent?.body}</p>
                                                <span className="chat-time">{insideCurrent?.time}</span>
                                              </div>
                                              <div className="chat-action-btns">
                                                <ul>
                                                  {/* <li><a href="#" className="share-msg" title="Share"><i className="fa fa-share-alt" /></a></li>
                                     <li><a href="#" className="edit-msg"><i className="fa fa-pencil" /></a></li> */}
                                                  <li><div className="del-msg" onClick={() => deleteMesg(insideCurrent?._id)}> <i className="fa fa-trash-o" /></div></li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        :
                                        insideCurrent?.receiver?._id == loginId ?


                                          <div className="chat chat-left">
                                            {/* <div className="chat-avatar">
                                            <div className="avatar">
                                              <img alt="" src={i?.user?.profile_pic} />
                                            </div>
                                          </div> */}
                                            <div className="chat-body">
                                              <div className="chat-bubble">
                                                <div className="chat-content">
                                                  <p>{insideCurrent?.body}</p>
                                                  <span className="chat-time">{insideCurrent?.time}</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          :
                                          <></>
                                    ))}






                                  </div>
                                ))

                                :
                                <></>
                              }
                            </div>


                          </div>
                        </div>
                      </div>

                      <div className="chat-footer">
                        <div className="message-bar">
                          <div className="message-inner">
                            {/* <a className="link attach-icon" href="#" data-toggle="modal" data-target="#drag_files"><img src={Attachment} alt="" /></a> */}
                            <div className="message-area">
                              <div className="input-group">
                                <textarea className="form-control" placeholder="Type message..." defaultValue={""} value={messageText} onChange={((e) => setMessageText(e.target.value))} />
                                <span className="input-group-append">
                                  <button className="btn btn-custom" type="button" onClick={() => createMesgfunc(i?.user?._id)}><i className="fa fa-send" /></button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Chats View */}
                  {/* Chat Right Sidebar */}
                  <div className="col-lg-1 message-view chat-profile-view chat-sidebar" id="task_window">
                    <div className="chat-window video-window">
                      <div className="fixed-header">
                        <ul className="nav nav-tabs nav-tabs-bottom">
                          {/* <li className="nav-item"><a className="nav-link" href="#calls_tab" data-toggle="tab">Calls</a></li> */}
                          <li className="nav-item"><a className="nav-link active" href="#profile_tab" data-toggle="tab">Profile</a></li>
                        </ul>
                      </div>
                      <div className="tab-content chat-contents">

                        <div className="content-full tab-pane show active" id="profile_tab">
                          <div className="display-table">
                            <div className="table-row">
                              <div className="table-body">
                                <div className="table-content">
                                  <div className="chat-profile-img">
                                    <div className="edit-profile-img">
                                      {
                                        i?.user?.role == 'Investor' ? 
                                        <img src={i?.user?.fund_logo} alt="" style={{ height: '155px', width: '155px', border: '1px solid #eaeaea' }} />
                                     :
                                     <img src={i?.user?.profile_pic} alt="" style={{ height: '155px', width: '155px', border: '1px solid #eaeaea' }} />
                                     
                                      }
                                      {/* <span className="change-img">Change Image</span> */}
                                    </div>
                                    <h4 className="user-name m-t-10 mb-0" style={{fontWeight:"600"}}>{i?.user?.first_name} {i?.user?.last_name}</h4>
                                    <p className="text-muted" style={{fontWeight:"600"}}>{i?.user?.role_in_organization}</p>
                                    {/* <a href="" className="btn btn-primary edit-btn"><i className="fa fa-pencil" /></a> */}
                                  </div>
                                  <div className="chat-profile-info">
                                    <ul className="user-det-list">

                                      {
                                        i?.user?.role == 'Investor' ? 
                                        <li>
                                        <span style={{fontWeight:"600"}}>Fund Name:</span>
                                        {/* onClick={() => goToInvestorsPage(i?.user?._id)} */}
                                        {/* text-muted-fundName */}
                                        <span style={{fontWeight:"500"}} className="float-right" >{i?.user?.fund_name}</span>
                                      </li>
                                        :

                                        allProjectDetails?.length > 0 ?

                                          <li>
                                            <span style={{fontWeight:"600"}}>Project Name:</span>
                                            <span className="float-right text-muted-fundName" onClick={() => goToProjectPage(allProjectDetails[0]?._id)}>{allProjectDetails[0]?.project_name}</span>
                                          </li>
                                          :
                                          <></>
                                      }
                                      {

                                      }

                                      {/* <li>
                                    <span>DOB:</span>
                                    <span className="float-right text-muted">24 July</span>
                                  </li> */}
                                      <li style={{marginBottom:'20px'}}>
                                        <span style={{fontWeight:"600"}}>Email:</span>
                                        <span style={{fontWeight:"500",overflowWrap:"anywhere",maxWidth:"65%"}} className="float-right text-muted">{i?.user?.email}</span>
                                      </li>
                                      <li>

                                        <div className='gridBox3'>
                                          {
                                            i?.user?.twitter_link != null && i?.user?.twitter_link != undefined && i?.user?.twitter_link != '' ?
                                              <div className="gridBox3IconDiv">
                                                {/* onClick={() => opennewWindow(Twitter)}  */}
                                                <FontAwesomeIcon icon={faTwitter} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.twitter_link)} />

                                              </div>
                                              :
                                              <></>
                                          }

                                          {
                                            i?.user?.linkedin != null && i?.user?.linkedin != undefined && i?.user?.linkedin != '' ?

                                              <div className="gridBox3IconDiv">

                                                {/* onClick={() => opennewWindow(LinkedIn)}  */}
                                                <FontAwesomeIcon icon={faLinkedinIn} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.linkedin)} />


                                              </div>
                                              :
                                              <></>
                                          }


                                          {
                                            i?.user?.telegram_link != null && i?.user?.telegram_link != undefined && i?.user?.telegram_link != '' ?

                                              <div className="gridBox3IconDiv">
                                                {/* onClick={() => opennewWindow(Telegram)}  */}
                                                <FontAwesomeIcon icon={faPaperPlane} className='gridBox3Icons' onClick={() => opennewWindow(i?.user?.telegram_link)} />

                                              </div>
                                              :
                                              <></>
                                          }

                                        </div>
                                        {/* <span>Phone:</span>
                                    <span className="float-right text-muted">9876543210</span> */}
                                      </li>
                                    </ul>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Chat Right Sidebar */}
                </div>





                {/* /Chat Main Wrapper */}
              </div>
              :
              <></>
          ))
          :
          <></>
        }

      </div>

    </div>
  );

}

export default ChatPage;
