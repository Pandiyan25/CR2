
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14, designLogo2 } from '../../../../Entryfile/imagepath.jsx'
import './index.css'

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import {
//   BarChart, Bar, Cell, ResponsiveContainer,
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
import Rating from 'react-rating'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
import "../../../index.css"
import { Button } from 'react-bootstrap';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../../paginationfunction.jsx';
import { apiURI } from '../../../../config/config.jsx';
import { fetchProjectDetails } from '../../../../reducers/ProjectDetailsSlice.js';
import { projectId } from '../../../../reducers/ConstantSlice.js';
import { fetchFundingProjectDetails } from '../../../../reducers/FundingProjectSlice.js';
import { fetchTeamSize } from '../../../../reducers/TeamSizeSlice.js';
import { fetchTokenomicsDetails } from '../../../../reducers/TokenomicsSlice.js';
import { fetchSocialTeam } from '../../../../reducers/SocialPageSlice.js';
import { fetchRoadMapProjectDetails } from '../../../../reducers/RoadMapSlice.js';
import { fetchBudgetProjectDetails } from '../../../../reducers/BudgetSlice.js';
import { fetchBudgetBannerDetails } from '../../../../reducers/BugetBannerSlice.js';
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';


const ProjectDatapage = () => {


  const [sort, setSort] = useState('ascend');
  const [Pricesort, setPriceSort] = useState('ascend');
  const [descsort, setDescSort] = useState('ascend');
  const dispatch = useDispatch()
  let history = useHistory()
  const loginId = useSelector((state) => state.constVar.loginId)

  const COLORS = ["orange", "gray"];

  const data = [
    { name: 'Supporters', students: 400, color: 'green' },
    { name: 'Opposer', students: 400, color: 'red' },
    // {name: 'Opposers', students: 700},
    // {name: 'Geek-i-knack', students: 200},
    // {name: 'Geek-o-mania', students: 1000}
  ];


  const [checkPage, setCheckPage] = useState([])


  const [tableData, settableData] = useState([
    {
      sno: 1,
      projectId: 'PR001',
      founderName: 'Rakesh',
      description: 'Crypto Magazine',
      OverallBudget: '-',
      startDate: '-',
      endDate: '-'

    },

  ])
  const sendDatatoProjectPage = (i) => {
    dispatch(fetchRoadMapProjectDetails(i))
    dispatch(fetchBudgetProjectDetails(i))
    dispatch(fetchProjectDetails(i))
    dispatch(projectId(i))
    dispatch(fetchFundingProjectDetails(i))
    dispatch(fetchTeamSize(i))
    dispatch(fetchTokenomicsDetails(i))
    dispatch(fetchSocialTeam(i))
    dispatch(fetchBudgetBannerDetails(i))
    history.push('/detail-projects')
  }

  const columns = [

    {
      title: 'Project Id',
      align: 'center',
      width: 40,
      render: (text, record) => (


        <div style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => sendDatatoProjectPage(text?._id)}>{text?.project_id}</div>
      ),

      sorter: (a, b) => a?.project_id?.localeCompare(b?.project_id),
      // console.log( a?.project_id?.localeCompare(b?.project_id),"logofsort")

      sortDirections: ['ascend', 'descend', 'ascend'],

      // sorter: (a, b) => a?.project_id?.localeCompare(b?.project_id),

      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' :'ascend'),
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
      // sorter: (a, b) => a?.project_id?.length - b?.project_id?.length,
    },

    {
      title: 'Founder',
      // dataIndex: 'founderName',
      // key: 'first_name',
      align: 'center',
      width: 40,
      render: (text, record) => (

        <div>{text?.user?.first_name}{text?.user?.last_name}</div>
      ),
      // sorter: (a, b) => a?.user?.first_name?.localeCompare(b?.user?.first_name),
      // sorter: (a, b) => a?.user?.first_name?.length - b?.user?.first_name?.length,

      sorter: (a, b) => a?.user?.first_name?.localeCompare(b?.user?.first_name),
      // console.log( a?.project_id?.localeCompare(b?.project_id),"logofsort")

      sortDirections: ['ascend', 'descend', 'ascend'],

    },

    {
      title: 'Overall Budget',
      // dataIndex: 'total_budget',
      align: 'center',
      width: 40,
      render: (text, record) => (

        <div>{Number(text?.total_budget).toLocaleString("en-US")}</div>
      ),
      // key: 'total_budget',
      // sorter: (a, b) => a?.total_budget?.localeCompare(b?.total_budget),
      sorter: (a, b) => parseInt(a?.total_budget) - parseInt(b?.total_budget),

      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: Pricesort,
      // onHeaderCell: () => ({
      //   onClick: () => setPriceSort(Pricesort == 'ascend' ? 'descend' : 'ascend'),
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },
    {
      title: 'Start Date',
      dataIndex: 'project_start_date',
      key: 'project_start_date',
      align: 'center',
      width: 40,
      sorter: (a, b) => a?.project_start_date?.localeCompare(b?.project_start_date),
      // sorter: (a, b) => a?.project_start_date?.length - b?.project_start_date?.length,

      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' :
      //     'ascend'),
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },
    , {
      title: ' End Date',
      dataIndex: 'project_end_date',
      key: 'project_end_date',
      align: 'center',

      width: 40,
      sorter: (a, b) => a?.project_end_date?.localeCompare(b?.project_end_date),
      // sorter: (a, b) => a?.project_end_date?.length - b?.project_end_date?.length,

      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: descsort,
      // onHeaderCell: () => ({
      //   onClick: () => setDescSort(descsort === 'ascend' ? 'descend' :
      //     'ascend'),
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },

    {
      title: 'Description',
      dataIndex: 'project_description',
      key: 'project_description',

      width: 40,
      align: 'center',
      // sorter: (a, b) => a.project_description?.length - b.project_description?.length,

      // sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: descsort,
      // onHeaderCell: () => ({
      //   onClick: () => setDescSort(descsort === 'ascend' ? 'descend' :
      //     'ascend'),
      //   sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
      ellipsis: true,
    },
  ]


  const getUserDetailsFunc = () => {

    try {


      var query = `
      query AllProjects($user: ID) {
        allProjects(user: $user) {
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
          project_end_date
          total_budget
          validator_score
          investor_score
          fund_raised_till_now
          total_fund_raised
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
            "user": loginId,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.allProjects);
          if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
            var arr = [];
            for(var i = 0; i< data?.data?.allProjects.length > 0;i++){
              var projectStartDate='';
              var projectEndDate='';
              if(data?.data?.allProjects[i].project_start_date != ''){

                projectStartDate=data?.data?.allProjects[i]?.project_start_date.split('T')[0];
              }else{
                projectStartDate=''
              }
              if(data?.data?.allProjects[i].project_end_date != ''){

                projectEndDate=data?.data?.allProjects[i]?.project_end_date.split('T')[0];
              }else{
                projectEndDate=''
              }

              arr.push({
                "_id":data?.data?.allProjects[i]?._id,
                "project_id":data?.data?.allProjects[i]?.project_id,
                "user":{
                  "_id":data?.data?.allProjects[i]?.user?._id,
                  "last_name":data?.data?.allProjects[i]?.user?.last_name,
                  "email":data?.data?.allProjects[i]?.user?.email,
                  "first_name":data?.data?.allProjects[i]?.user?.first_name,
                },
                "total_budget":data?.data?.allProjects[i]?.total_budget,
                "project_start_date":projectStartDate,
                "project_end_date":projectEndDate,
                "project_description":data?.data?.allProjects[i]?.project_description,
              })
            }
            // const myBest = fruits.split('T')[0];

            setCheckPage(arr)
          } else {
            // setCheckPage(')

          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }


  useEffect(() => {
    if (loginId != '') {
      getUserDetailsFunc()
    }

  }, [loginId])
  return (

    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Projects</h3>

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
                          total: checkPage.length,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }
                        }
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        bordered
                        dataSource={checkPage}
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
      {/* /Page Content */}
    </div>
  );
}

export default ProjectDatapage;
