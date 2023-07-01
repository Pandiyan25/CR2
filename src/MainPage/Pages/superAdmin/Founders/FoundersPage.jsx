
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14, designLogo2 } from '../../../../Entryfile/imagepath.jsx'
import './index.css'

// import {
//   BarChart, Bar, Cell, ResponsiveContainer,
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
import Rating from 'react-rating'

import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
import "../../../index.css"
import { Button } from 'react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../../paginationfunction.jsx';
import FounderModal from './foundersModal.jsx';
import { apiURI } from '../../../../config/config.jsx';
import { profileIdValidator, projectIdSuperAdmin } from '../../../../reducers/ConstantSlice.js';
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';


const FoundersPage = () => {

  
  const [sort, setSort] = useState('ascend');
  
  const dispatch = useDispatch()
  let history = useHistory()

  const loginId = useSelector((state) => state.constVar.loginId)
  const [projectDetalsData, setProjectDetalsData] = useState([])
    const [showValidatorsRewards, setShowValidatorsRewards] = useState(false)
    

  const COLORS = ["orange", "gray"];

  const data = [
    { name: 'Supporters', students: 400, color: 'green' },
    { name: 'Opposer', students: 400, color: 'red' },
    // {name: 'Opposers', students: 700},
    // {name: 'Geek-i-knack', students: 200},
    // {name: 'Geek-o-mania', students: 1000}
  ];



  const [tableData, settableData] = useState([
    {
      sno: 1,
      projectId: 'V001',
      founderName:'Rakesh',
      education:'MBA',
      Industry:'Finance',
      CurrentPosition:'CTO',


    },
    
  ])

  const getMyOwnProjectDetailsFunc = (i) =>{

    dispatch(projectIdSuperAdmin(i?._id)) 
    dispatch(profileIdValidator(i?.user?._id)) 
    
    history.push('/founderDetails')
}
 
  const columns = [
    // {
    //   title: 'S.No',
    //   dataIndex: 'sno',
    //   align: 'center',
    //   sorter: (a, b) => a.sno.length - b.sno.length,
    // },
    {
      title: 'Profile ID',
        // dataIndex: 'project_id',
      align: 'center',

      sorter: (a, b) =>a?.project_id?.localeCompare(b?.project_id),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sorter: (a, b) => a?.project_id?.length - b?.project_id?.length,
      render: (text, record) => (

        <div  style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => getMyOwnProjectDetailsFunc(text)}>{text?.project_id}</div>
      ),
      
      
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },

    {
      title: 'Name',
      render: (text, record) => (

        <div>{text?.user?.first_name}{text?.user?.last_name}</div>
      ),
      
      align: 'center',
      // sorter: (a, b) =>a?.user?.first_name?.localeCompare(b?.user?.first_name),
      
      sortDirections: ['ascend', 'descend', 'ascend'],
    // sortOrder: sort,
    // onHeaderCell: () => ({
    //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
    // 'ascend'),       
    // sortDirections: ['ascend', 'descend', 'ascend'],
    // }),
      // sorter: (a, b) => a?.user?.first_name?.length - b?.user?.first_name?.length,
    },
    
      

    {
        title: 'Education',
        // dataIndex: 'education',
        
      render: (text, record) => (

        <div>{text?.user?.education}</div>
      ),
        align: 'center',
        sortDirections: ['ascend', 'descend', 'ascend'],
        // sortOrder: sort,
        // onHeaderCell: () => ({
        //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
        // 'ascend'),       
        // sortDirections: ['ascend', 'descend', 'ascend'],
        // }),
        // sorter: (a, b) =>a?.user?.education?.localeCompare(b?.user?.education)
        // sorter: (a, b) => a?.user?.education?.length - b?.user?.education?.length,
      },
    {
      title: 'Industry',
      // dataIndex: 'industry',
      
      render: (text, record) => (

        <div>{text?.user?.industry}</div>
      ),
      align: 'center',
      
      sorter: (a, b) =>a?.user?.industry?.localeCompare(b?.user?.industry),
      // sorter: (a, b) => a?.user?.industry?.length - b?.user?.industry?.length,
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    }, {
      title: 'Current Position',
      // dataIndex: 'current_position',
      
      render: (text, record) => (

        <div>{text?.user?.current_position}</div>
      ),
      align: 'center',
      // sorter: (a, b) => a?.user?.current_position?.length - b?.user?.current_position?.length,
      sorter: (a, b) =>a?.user?.current_position?.localeCompare(b?.user?.current_position),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },
    // , {
    //   title: 'Rewards',
    //   dataIndex: 'endDate',
    //   align: 'center',
    //   render: (text, record) => (
    //     {text.projectId}
    //     <div><button style={{background:'#6345ED',color:'white',border:'2px solid #6345ED',width:'75px',fontSize:'11px',borderRadius:'50px'}} onClick={()=>showValidatorsRewardsfunc()}>View All</button></div>
    //   ),
    //   sorter: (a, b) => a.endDate.length - b.endDate.length,
    // },

  ]

  const showValidatorsRewardsfunc = () =>{
    setShowValidatorsRewards(true)
  }

  const handleClose = () =>{
      
    setShowValidatorsRewards(false)
  }


  
  

  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query AllProjects( $user: ID) {
          allProjects( user: $user) {
            _id
            user {
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
            }
            email_id
            first_name
            last_name
            linkedin_profile_link
            project_name
            project_description
            nature_of_project
            project_start_date
            project_tags
            project_stage
            website_link
            github_repository
            whitepaper
            one_pager_document
            pitch_deck
            number_of_founders
            team_size
            project_id
            project_status
            amount_released
            amount_invested
            amount_in_escrow
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
            "user": loginId
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
          if (data?.data?.allProjects != null && data?.data?.allProjects != undefined) {
            setProjectDetalsData(data?.data?.allProjects)

            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
  useEffect(() => {
    getProjectDetailsFunc()
  }, [])
  return (

    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Founders</h3>

                </div>
              </div>
            </div>
            
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}>

            

            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="card card-table flex-fill">
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table
                        pagination={{
                          total: projectDetalsData.length,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }
                        }
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        bordered
                        dataSource={projectDetalsData}
                        rowKey={record => record.id}
                      // onChange={this.handleTableChange}
                      />

                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
      <FounderModal show={showValidatorsRewards} handleClose={handleClose} />
      {/* /Page Content */}
    </div>
  );
}

export default FoundersPage;
