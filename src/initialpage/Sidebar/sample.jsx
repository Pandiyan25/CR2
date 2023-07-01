/**
 * App Header
 */
 import React, { Component } from 'react';
 import { withRouter } from 'react-router-dom';
 import { Link } from 'react-router-dom';
 import { connect } from "react-redux"
 import { useSelector, useDispatch } from 'react-redux';
 import {
   headerlogo, lnEnglish, lnFrench, lnSpanish, lnGerman, Avatar_02, Avatar_03, Avatar_05,
   Avatar_06, Avatar_08, Avatar_09, Avatar_13, Avatar_17, Avatar_21
 } from '../../Entryfile/imagepath'
 import { showSettings } from '../../reducers/ConstantSlice';
 import { useHistory, useNavigate } from "react-router-dom";
 
 // class Header extends Component {
   // const 
   const Header = (props) => {
   // constructor(props) {
   //   super(props);
 
   //   // this.state = {
   //   //   showSettings: false
   //   // };
 
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
     console.log(props,"props");
     const location  = props.location
     let pathname = location.pathname
 
    console.log(pathname,"pathname");
 
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
           {/* <li className="nav-item">
             <div className="top-nav-search">
               <a href="" className="responsive-search">
                 <i className="fa fa-search" />
               </a>
               <form>
                 <input className="form-control" type="text" placeholder="Search here" />
                 <button className="btn" type="submit"><i className="fa fa-search" /></button>
               </form>
             </div>
           </li> */}
           {/* /Search */}
           {/* Flag has-arrow */}
           <li className="nav-item dropdown flag-nav">
             <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
 
               <span className='connectbutton' style={{ wordSpacing: 'normal', background: '#299B00', color: 'white', padding: '10px 15px 10px 15px', borderRadius: '50px', fontSize: '12px' }}>{"Connect Wallet  "}</span>
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
           {/* /Flag */}
           {/* Notifications */}
           {/* <div> */}
           <li className="nav-item dropdown">
             {/* <div> */}
               <a href="#" className="dropdown-toggle nav-link notific" data-toggle="dropdown">
                 <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
               </a>
             {/* </div> */}
 
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
               <span className="user-img"><img src={Avatar_21} alt="" />
                 <span className="status online" /></span>
               <span className="admin-name">Admin</span>
             </a>
             <div className="dropdown-menu dropdown-menu-right" >
               <Link className="dropdown-item" to="/profile">User Id:122123</Link>
               <Link className="dropdown-item" to="/profile">Name:Admin</Link>
               <Link className="dropdown-item" to="/profile">Email:admin@gmail.com</Link>
               <Link className="dropdown-item"  onClick={()=>changePagetoSettings()}   to="/profile">Settings</Link>
               <Link className="dropdown-item" to="/profile">getSupport</Link>
               <Link className="dropdown-item" to="/profile">Set Calender</Link>
               <Link className="dropdown-item" to="/login">Logout</Link>
             </div>
           </li>
         </ul>
         {/* /Header Menu */}
         {/* Mobile Menu */}
         <div className="dropdown mobile-user-menu">
           <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
           <div className="dropdown-menu dropdown-menu-right">
               <Link className="dropdown-item" to="/profile">User Id:122123</Link>
               <Link className="dropdown-item" to="/profile">Name:Admin</Link>
               <Link className="dropdown-item" to="/profile">Email:admin@gmail.com</Link>
               <Link className="dropdown-item" to="/profile">getSupport</Link>
               <Link className="dropdown-item" to="/profile">Set Calender</Link>
               <Link className="dropdown-item" to="/login">Logout</Link>
           </div>
         </div>
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
 export default withRouter((Header));
 // export default connect(mapDispatchToProps) (withRouter(Header))
 
 

 

 <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={Avatar_29} /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Delta Infotech</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Tressa Wexler</Link></h5>
                            <div className="small text-muted">Manager</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img src={Avatar_07} alt="" /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Cream Inc</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Ruby Bartlett</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img src={Avatar_06} alt="" /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Wellware Company</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Misty Tison</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={Avatar_14} /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Mustang Technologies</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Daniel Deacon</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={Avatar_18} /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">International Software Inc</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Walter Weaver</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={Avatar_28} /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Mercury Software Inc</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Amanda Warren</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
                        <div className="profile-widget">
                            <div className="profile-img" style={{ minHeight: '120px', minWidth: '120px' }}>
                                <Link to="/ConnectRequest" className="avatar" style={{ minHeight: '120px', minWidth: '120px' }}><img alt="" src={Avatar_13} /></Link>
                            </div>
                            <div className="dropdown profile-action">
                                {/* <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a> */}
                                {/* <div className="dropdown-menu dropdown-menu-right">
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client"><i className="fa fa-pencil m-r-5" /> Edit</a>
                     <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                   </div> */}
                            </div>
                            <h4 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Carlson Tech</Link></h4>
                            <h5 className="user-name m-t-10 mb-0 text-ellipsis"><Link to="/ConnectRequest">Betty Carlson</Link></h5>
                            <div className="small text-muted">CEO</div>
                            <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10 mr-1" style={{ minWidth: '85px' }} onClick={() => successfulladdedfunc()}>Accept</Link>
                            
                             <Link to="/ConnectRequest" className="btn btn-ourwhite btn-sm m-t-10" style={{ minWidth: '85px' }} onClick={() => successfullRejectedfunc()}>Reject </Link>
                        </div>
                    </div>





<div className="" style={{ display: 'flex', alignItems: 'center', height: '60px', paddingLeft: '10px', paddingRight: '10px' }}>
{/* <div className="" style={{ fontSize: '12px' }}>
  <span>{userInfo.account}</span>
</div>
<div className="" style={{ fontSize: '12px' }}>
  <span>{userIn
    // style={{ margin: '15px 15px 0px 0px' }}fo.balance}</span>
</div> */}
<div >
  <button className="" onClick={onDisconnect} style={{ wordSpacing: 'normal', borderColor: '#299B00', padding: '5px 15px 5px 15px', borderRadius: '2px', fontSize: '14px', height: '40px' }}>
    Disconnect
  </button>
</div>
</div>