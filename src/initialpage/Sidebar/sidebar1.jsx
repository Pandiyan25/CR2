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
import { IconDashboard, IconUserCircle,IconTransitionBottom, IconStack2, IconSettings, IconRocket, IconReport, IconHierarchy, IconReportMoney, IconHeartHandshake, IconHeadset, IconAward, IconDotsVertical } from '@tabler/icons';


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
                {/* <i className="la la-dashboard makeit" />  */}
                <span>Dashboard</span> </Link>
            </li>

            <li className={pathname.includes('profile') ? "active" : "notactive"}>
              <Link to="/profile">

                <IconUserCircle className='sidebaricon' />
                {/* <i className="la la-user clr" /> className='nameFEt'*/}
                <span style={{ wordSpacing: 'normal' }}>My Profile</span> </Link>
            </li>

            <li className={pathname.includes('Project') ? "active" : "notactive"}>
              <Link to="/Project">
                {/* <i className="fa fa-gift" /> */}
                <FontAwesomeIcon className='sidebaricon' icon={faHandshake} style={{ fontSize: '20px' }} /> <span>Deals</span>
              </Link>
            </li>
            <li className={pathname.includes('Validations') ? "active" : "notactive"}>
              <Link to="/Validations">
                {/* <i className="fa fa-gift" /> */}
                <IconStack2 className='sidebaricon' /> <span>Validations</span>
              </Link>
            </li>

            {/* <li className={pathname.includes('proposal') ? "active" : "notactive"}>
               <Link to="/proposal"><FontAwesomeIcon  className='sidebaricon'   icon={faHandshake} style={{fontSize:'20px'}}/><span>Proposals</span> </Link>
             </li> */}
            <li className={pathname.includes('rewards') ? "active" : "notactive"}>
              <Link to="/rewards">
                <IconAward className='sidebaricon' />
                {/* <i className="fa fa-gift" /> */}
                <span>Rewards</span> </Link>
            </li>

            <li className={pathname.includes('Requests') ? "active" : "notactive"}>
              <Link to="/Requests">
                <IconTransitionBottom className='sidebaricon' />
                {/* <i className="fa fa-gift" /> */}
                <span>Requests</span> </Link>
            </li>
            <li className={pathname.includes('More') ? "active" : "notactive"}>
              {/* <Link to="/More">
                <i className="fa fa-gift" />
                <IconDotsVertical className='sidebaricon' /> <span>More</span>
              </Link> */}

              <a href="#" onClick={() => displayFunc()}>
                {/* <i className="fa fa-gift" /> */}
                <IconDotsVertical className='sidebaricon' /> <span>More</span>
              </a>

              <ul style={{ display: displayState }}>

                <li className={pathname.includes('proposal') ? "active" : "notactive"}>
                  <Link to="/proposal"><FontAwesomeIcon className='sidebaricon' icon={faHandshake} style={{ fontSize: '20px' }} /><span className='mainsidebardropdown'>Proposals</span> </Link>
                </li>
                {/* <li><Link className={pathname.includes('More') ? "active" : ""}
                  to="More">Employee Dashboard</Link></li> */}
              </ul>
            </li>
          </ul>
          {/* <span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" />
<span className="menu-arrow" /> */}
        </div>
      </div>
      
      <div className='sidebarsupport'>
        <img src={HeadsetLogo} style={{width:'37px'}} onClick={()=>opennewWindow("https://t.me/crsquare")} />
      </div>
    </div>

  );

}

export default withRouter(Sidebar);
