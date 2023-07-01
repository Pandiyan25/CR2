/**
 * App Header
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { headerlogo, HeadsetLogo } from '../../Entryfile/imagepath';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import './backgroundSidebar.css';
import {IconArrowBarUp, IconDashboard, IconStack2, IconUser, IconUserCheck, IconUsers }from '@tabler/icons';
const Sidebar = (props) => {
  let pathname = props.location.pathname
  
  const opennewWindow = (i) => {
    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }
  return (
    // '0px 0px 5px 5px gray'
    <div className="sidebar" id="sidebar" style={{ borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0', }}>
      <div className="sidebar-inner slimscroll">

        <div id="sidebar-menu" className="sidebar-menu">
          <div className="header-left" >
            <Link to="/" className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div className='mainPageImg' id='mainPageImg'>

              </div>
              {/* <img src={headerlogo} width="80%" alt="" style={{borderBottom:'2px solid #E3E9EF' ,padding:'10px'}} /><span className='nameFEt' style={{ wordSpacing: 'normal'}}>CR SQUARE</span> */}
              {/* height={60} */}
            </Link>
          </div>
          <ul>
            {/* #D0DBE5 */}

            <li className={pathname.includes('dashboard') ? "active" : "notactive"}>
              <Link to="/dashboard">
                
               <IconDashboard className='sidebaricon' />
               {/* <i className="la la-dashboard makeit" /> */}
                <span>Dashboard</span> <span className="menu-arrow" />
              </Link>
            </li>

            <li className={pathname.includes('Project') ? "active" : "notactive"}>
              <Link to="/Project">
                   <IconStack2 className='sidebaricon' /><span>Project </span> <span className="menu-arrow" />
              </Link>
            </li>
            <li className={pathname.includes('Validators') ? "active" : "notactive"}>
              <Link to="/Validators">
                <IconUserCheck className='sidebaricon' />
                {/* <i className="fa fa-gift" /> */}
                   {/* <IconStack2 className='sidebaricon' /> */}
                 <span> Validators</span> <span className="menu-arrow" />
              </Link>
            </li>
            <li className={pathname.includes('Founders') ? "active" : "notactive"}>
              <Link to="/Founders">
                <IconUser className='sidebaricon' />
                {/* <i className="fa fa-gift" /> */}
                 <span>Founders</span> <span className="menu-arrow" />
              </Link>
            </li>
            <li className={pathname.includes('Investors') ? "active" : "notactive"}>
              <Link to="/Investors">
                <IconUsers className='sidebaricon' />
                {/* <i className="fa fa-gift" /> */}
                 <span>Investors</span> <span className="menu-arrow" />
              </Link>
            </li>
            <li className={pathname.includes('invite') ? "active" : "notactive"}>
              <Link to="/invite">
                {/* <i className="fa fa-gift" /> */}
                <IconArrowBarUp className='sidebaricon' />
                 <span>Invite</span> <span className="menu-arrow" />
              </Link>
            </li>

          </ul>
        </div>
      </div>
      
      <div className='sidebarsupport'>
        <img src={HeadsetLogo} style={{width:'37px'}} onClick={()=>opennewWindow("https://t.me/crsquare")} />
      </div>
    </div>

  );

}

export default withRouter(Sidebar);
