/**
 * App Header
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { headerlogo, HeadsetLogo } from '../../Entryfile/imagepath';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import './backgroundSidebar.css';
import { IconDashboard, IconUserCircle, IconStack2, IconTrendingUp, IconSettings, IconRocket, IconDotsVertical, IconReport, IconHierarchy, IconReportMoney, IconHeartHandshake, IconHeadset } from '@tabler/icons';
import ReactTooltip from 'react-tooltip';

const Sidebar = (props) => {

  const [displayState, setDisplayState] = useState('none')
  let pathname = props.location.pathname

  const displayFunc = () => {
    if (displayState == 'block') {
      setDisplayState('none')
    } else {

      setDisplayState('block')
    }
  }
  const opennewWindow = (i) => {
    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }
  return (
    // '0px 0px 5px 5px gray'
    <div className="sidebar" id="sidebar" style={{ borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>
      <div className="sidebar-inner slimscroll">

        <div id="sidebar-menu" className="sidebar-menu">
          <div className="header-left headerLeftIcon" style={{backgroundColor:"rgb(245 248 )",borderRadius:"5px",margin:"15px 0px 15px 0px"}}>
            <Link to="/" className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
              <div className='mainPageImg' id='mainPageImg'>

              </div>
              {/* <img src={headerlogo} width="80%" alt="" style={{borderBottom:'2px solid #E3E9EF' ,padding:'10px'}} /> */}
              {/* <span className='nameFEt' style={{ wordSpacing: 'normal'}}>CR SQUARE</span> */}
              {/* height={60} */}
            </Link>
          </div>
          <ul className='headerLeftUl'>
            {/* #D0DBE5 */}

            <li className={pathname.includes('dashboard') ? "active" : "notactive"}>
              <Link to="/dashboard">
                <IconDashboard className='sidebaricon' />
                {/* <i className="la la-dashboard makeit" /> */}
                <span>Dashboard</span>
              </Link>
            </li>

            <li className={pathname.includes('Profile') ? "active" : "notactive"}>
              <Link to="/Profile">
                <IconUserCircle className='sidebaricon' />
                {/* <FontAwesomeIcon icon={faHandshake} style={{fontSize:'20px'}}/> */}
                <span>My Profile</span>
              </Link>
            </li>
            <li className={pathname.includes('Project') ? "active" : "notactive"}>
              <Link to="/Project">
                {/* <i className="fa fa-gift" /> */}
                <IconStack2 className='sidebaricon' /> <span>My Project</span>
              </Link>
            </li>

            <li className={pathname.includes('FundRaise') ? "active" : "notactive"}>
              <Link to="/FundRaise">
                {/* <i className="fa fa-gift" /> */}
                <IconTrendingUp className='sidebaricon' /> <span>Fund Raise</span>
              </Link>
            </li>

            <li className={pathname.includes('Vesting') ? "active" : "notactive"}>
              <Link to="/Vesting">
                {/* <i className="fa fa-gift" /> */}
                <IconHierarchy className='sidebaricon' /> <span>Vesting</span>
              </Link>
            </li>
            {/* <li className={pathname.includes('expenseManagement') ? "active" : "notactive"}>
               <Link to="/expenseManagement">
                   <i className="fa fa-gift" />
                   <IconReportMoney className='sidebaricon' /> <span>Expense Management</span> 
                   </Link>
             </li> */}
            {/* <li className={pathname.includes('proposals') ? "active" : "notactive"}>
               <Link to="/proposals">
                   <i className="fa fa-gift" />
                   <IconHeartHandshake className='sidebaricon' /> <span>Proposals</span> 
                   </Link>
             </li> */}
            {/* <li className={pathname.includes('settings') ? "active" : "notactive"}>
              <Link to="/settings">
                <i className="fa fa-gift" />
                <IconSettings className='sidebaricon' /><span>Settings</span>
              </Link>
            </li> */}
            {/* <li className={pathname.includes('mile-stone') ? "active" : "notactive"}>
               <Link to="/mile-stone">
                   <i className="fa fa-gift" />
                   <IconRocket className='sidebaricon' /> <span style={{fontSize:'14px'}}>Mile Stone Management</span> 
                   </Link>
             </li> */}
            {/* <li className={pathname.includes('tasks') ? "active" : "notactive"}>
               <Link to="/tasks">
                   <i className="fa fa-gift" />
                   <IconReport className='sidebaricon' /> <span>Tasks</span> 
                   </Link>
             </li> */}
            {/* <li className={pathname.includes('Support') ? "active" : "notactive"}>
               <Link to="/Support">
                   <i className="fa fa-gift" />
                   <IconHeadset className='sidebaricon' /> <span>Support</span> 
                   </Link>
             </li> */}

            <li className={pathname.includes('More') ? "active" : "notactive"}>

              {/* <Link to="/More" > */}
              <a href="#" onClick={() => displayFunc()}>
                {/* <i className="fa fa-gift" /> */}
                <IconDotsVertical className='sidebaricon' /> <span >More</span>
              </a>
              {/* </Link> */}
              <ul style={{ display: displayState }}>
                {/* <li className={pathname.includes('expenseManagement') ? "active" : "notactive"}>
                  <Link to="/expenseManagement"> */}
                    {/* <i className="fa fa-gift" /> */}
                    {/* <IconReportMoney className='sidebaricon' /> <span className='mainsidebardropdown'>Expense Management</span>
                  </Link>
                </li>
                <li className={pathname.includes('proposals') ? "active" : "notactive"}>
                  <Link to="/proposals"> */}
                    {/* <i className="fa fa-gift" /> */}
                    {/* <IconHeartHandshake className='sidebaricon' /> <span className='mainsidebardropdown'>Proposals</span>
                  </Link>
                </li> */}
                <li className={pathname.includes('tasks') ? "active" : "notactive"}>
                  <Link to="/tasks">
                    {/* <i className="fa fa-gift" /> */}
                    <IconReport className='sidebaricon' /> <span className='mainsidebardropdown'>Tasks</span>
                  </Link>
                </li>
                {/* <li className={pathname.includes('Support') ? "active" : "notactive"}>
                  <Link to="/Support"> */}
                    {/* <i className="fa fa-gift" /> */}
                    {/* <IconHeadset className='sidebaricon' /> <span className='mainsidebardropdown'>Support</span>
                  </Link>
                </li> */}

                {/* <li><Link className={pathname.includes('More') ? "active" : ""}
                  to="More">Employee Dashboard</Link></li> */}
              </ul>
            </li>
            {/* <li className="submenu">
              <a href="#"> <span> More</span></a>
              
            </li> */}

          </ul>
          {/* <span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" /> */}
        </div>
      </div>
      <div className='sidebarsupport' data-tip="Support">
        <img src={HeadsetLogo} style={{width:'37px'}} onClick={()=>opennewWindow("https://t.me/crsquare")} />
        <ReactTooltip place="right" type="info" effect="solid" />
      </div>
    </div>

  );

}

export default withRouter(Sidebar);











