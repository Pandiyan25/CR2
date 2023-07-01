
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14, designLogo2, mainProfile } from '../../../../Entryfile/imagepath.jsx'
import './index.css'

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
import ValidatorModal from './ValidatorModal.jsx';
import { apiURI } from '../../../../config/config.jsx';
import { useSelector } from 'react-redux';
// import 'Assets/plugins/morris/morris.min.js';
// import 'Assets/plugins/raphael/raphael.min.js';
// import 'Assets/js/chart.js';


const VaidatorsDataPage = () => {

  
  const [rewardData, setRewardData] = useState([])
  const [sort, setSort] = useState('ascend');
  const loginId = useSelector((state) => state.constVar.loginId)
  const [showValidatorperticular, setShowValidatorperticular] = useState(false)
  const [perticularUserData, setperticularUserData] = useState([])
  const [showValidatorsRewards, setShowValidatorsRewards] = useState(false)

  const [projectDropdownData, setProjectDropdownData] = useState([])
  const [projectDetalsData, setProjectDetalsData] = useState([])

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
      founderName: 'Rakesh',
      education: 'MBA',
      Industry: 'Finance',
      CurrentPosition: 'CTO',


    },

  ])

  const columns = [
    // {
    //   title: 'S.No',
    //   dataIndex: 'sno',
    //   align: 'center',
    //   sorter: (a, b) => a.sno.length - b.sno.length,
    // },
    {
      title: 'Profile Id',
      // dataIndex: 'id_number',
      align: 'center',

      // sorter: (a, b) => a?.id_number.length - b?.id_number.length,
      render: (text, record) => (

        <div  style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' , cursor: 'pointer'}} onClick={() => getMyOwnProjectDetailsFunc(text._id)}>{text.id_number}</div>
      ),
      
      sorter: (a, b) => a?.id_number?.localeCompare(b?.id_number),
      
      sortDirections: ['ascend', 'descend', 'ascend'],
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

        <div>{text?.first_name}{text?.last_name}</div>
      ),

      align: 'center',
      // sorter: (a, b) => a?.first_name?.length - b?.first_name?.length,
      
      sorter: (a, b) => a?.first_name?.localeCompare(b?.first_name),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },

    {
      title: 'Education',
      dataIndex: 'education',

      align: 'center',
      // sorter: (a, b) => a?.education.length - b?.education.length,
      
      sorter: (a, b) => a?.education?.localeCompare(b?.education),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      align: 'center',

      // sorter: (a, b) => a?.organization_name.length - b?.organization_name.length,
      
      sorter: (a, b) => a?.industry?.localeCompare(b?.industry),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    }, {
      title: 'Current Position',
      dataIndex: 'current_position',
      align: 'center',
      // sorter: (a, b) => a?.CurrentPosition.length - b?.CurrentPosition.length,
      
      sorter: (a, b) => a?.current_position?.localeCompare(b?.current_position),
      sortDirections: ['ascend', 'descend', 'ascend'],
      // sortOrder: sort,
      // onHeaderCell: () => ({
      //   onClick: () => setSort(sort === 'ascend' ? 'descend' : 
      // 'ascend'),       
      // sortDirections: ['ascend', 'descend', 'ascend'],
      // }),
    },
    , {
      title: 'Rewards',
      //   dataIndex: 'endDate',
      align: 'center',
      render: (text, record) => (
        // {text.projectId}
        <div><button style={{ background: '#6345ED', color: 'white', border: '2px solid #6345ED', width: '75px', fontSize: '11px', borderRadius: '50px' }} onClick={() => getProjectFunc(text._id)}>View All</button></div>
      ),

      //   sorter: (a, b) => a.endDate.length - b.endDate.length,
    },

  ]

  const showValidatorsRewardsfunc = (i) => {
    try {

      var query =
        `
        query AllRewards($validator: ID) {
          allRewards(validator: $validator) {
            _id
            reward_date
            type_of_reward
            validator {
              _id
              first_name
            }
            no_of_cr2_tokens
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
          variables:{
            "validator": i
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
          if (data?.data?.allRewards != null && data?.data?.allRewards != undefined) {
            setRewardData(data?.data?.allRewards)

            //  console.log();
          }else{
            setRewardData([])
          }
          setShowValidatorsRewards(true)
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
    
  }

  const handleClose = () => {

    setShowValidatorsRewards(false)
  }
  const getMyOwnProjectDetailsFunc = (i) => {
    try {

      var query =
        `
        query AllProposals($id: ID) {
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
            "id": i
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          // debugger;
          console.log('ProjectGetFunctiondata', data);
          if (data?.data?.getUser != null && data?.data?.getUser != undefined) {
            setperticularUserData([data?.data?.getUser])
            setShowValidatorperticular(true)
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }



  const getProjectDetailsFunc = () => {
    try {

      var query =
        `
        query GetValidatorToken($role: String, $user: ID) {
          allUsers(role: $role, user: $user) {
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
            "role": 'Validator',
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
          if (data?.data?.allUsers != null && data?.data?.allUsers != undefined) {
            setProjectDetalsData(data?.data?.allUsers)

            //  console.log();
          }
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
  useEffect(() => {
    getProjectDetailsFunc()
    // getProjectFunc()
  }, [])

  const getProjectFunc = (i) => {
    try {

      var query =
        `
        query AllValidatorProposal($user: ID) {
          allValidatorProposal(user: $user) {
            _id
            proposal {
              proposal_id
              _id
            }
            remarks
            status
            user {
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
          variables:{
            "user": i
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
          if (data?.data?.allValidatorProposal != null && data?.data?.allValidatorProposal != undefined) {
            setProjectDropdownData(data?.data?.allValidatorProposal)

            //  console.log();
          }
          showValidatorsRewardsfunc(i)
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
  const goBackfunc = () => {
    setShowValidatorperticular(false)
  }

  return (

    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
        <div >
          <div className="page-header">
            <div className="header-left">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Validators</h3>

                </div>
              </div>
            </div>

            <div>

              {
                showValidatorperticular == true ?

                  <div>
                    <button onClick={() => goBackfunc()}>
                      Back
                    </button>
                  </div>
                  : ''
              }
            </div>
          </div>
            {
              showValidatorperticular == true ?
                <div className="row">
                  <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    {/* <div className="profile-img" >
                            <a href="#"><img alt="" src={mainProfile} /></a>
                          </div> */}

                    <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                      <div className="card-body" style={{ padding: '10px' }}>

                        <div className="profile-view" style={{ margin: '0px', background: 'white' }}>
                          {/* profile-img-sub */}
                          <div className="profile-img-wrap-sub">
                          <div className="profile-img-sub" >
                              <a href="#"><img alt="" src={perticularUserData.length > 0 ? perticularUserData[0].profile_pic : ''} /></a>
                            </div>

                          </div>

                          <div className="">
                            <div style={{ borderBottom: '1px dotted #8a8989', padding: '10px' }}>


                              <div>

                                <h4 style={{ textAlign: 'center' }}>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].first_name} {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].last_name}</h4>
                              </div>
                              <div className='flexBox1'>
                                <h7>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_organisation}</h7>

                                {/* <h7>@ CRSquare</h7> */}
                              </div>
                              <div className='flexBox1'>
                                <h7>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_position}</h7>

                                {/* <h7>@ CRSquare</h7> */}
                              </div>
                              {/* <div className='flexBox1'>
                                <h7>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_income}</h7>

                                <h7>@ CRSquare</h7>
                              </div> */}
                              {/* <div className='flexBox1'>
                                <h7>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_location}</h7>

                                <h7>@ CRSquare</h7>
                              </div> */}
                              
                              {/* <div className='flexBox1'>
                                <h7>{perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].nationality}</h7>

                                <h7>@ CRSquare</h7>
                              </div> */}
                              
                              <div style={{ textAlign: 'center' }}>
                                <Rating
                                  style={{ color: '#ff9800', fontSize: '25px' }}
                                  emptySymbol="fa fa-star-o fa-mx"
                                  fullSymbol="fa fa-star fa-mx"
                                  // readonly={true}
                                  initialRating={2}
                                />
                              </div>
                            </div>
                            {/* <h3 className="card-title" style={{ marginTop: '20px', marginBottom: '20px' }}>Social Media</h3> */}

                            {/* <table className="boxSpacing2" style={{ width: '100%', wordBreak: 'break-word' }}> */}
                            <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Email ID:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].email}
                            </div>

                            <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>LinkedIn Link:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].linkedin}
                            </div>

                            <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Current Income:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_income}
                            </div>
                            
                            <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Current Location:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].current_location}
                            </div>

                            <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Nationality:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].nationality}
                            </div>
                            
                            {/* <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Website Link:</div> */}
                            {/* <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].website_link}
                            </div> */}



                            {/* <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>Twitter Link:</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].twitter_link}
                            </div> */}



                            {/* <div className="fontSize" style={{ color: '#4f4f4f', marginTop: '15px' }}>LinkedIn Link(Fund Link):</div>
                            <div className=" fontSize" style={{ marginTop: '15px' }}>
                              {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].linkedin_link}
                            </div> */}  

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
                        <div className="m-b-30"> */}
                  <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8">

                    <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                      <div className="card-body" style={{ padding: '10px' }}>
                        <div className="col-md-12" style={{ padding: '0px' }}>
                          <div className="profile-view" style={{ margin: '0px' }}>
                            {/* profile-basic */}
                            <div className="">
                              <table className="borderSpacing" style={{ padding: '20px', width: '100%', wordBreak: 'break-word' }}>

                                <tbody>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Industry:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].industry}
                                    </td>

                                  </tr>

                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}> Experience in Blockchain Industry:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].experience_in_blockchain}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Education:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].education}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Experience:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].experience}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Past Organisations Tags:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].past_organisation_tags}
                                    </td>
                                  </tr>


                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>ERC-20 Wallet Address:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].wallet_address}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Id Proof:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].id_proof}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Id Number:</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].id_number}
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td style={{ width: '50%', color: '#4f4f4f' }}>Self Description::</td>
                                    <td className="text-center">
                                      {perticularUserData.length > 0 && perticularUserData[0]._id != null && perticularUserData[0]._id != undefined && perticularUserData[0].self_description}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>
                            {/* <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div> */}

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                :
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
            }



        </div>

      </div>
      <ValidatorModal rewardData={rewardData} projectDropdownData={projectDropdownData} show={showValidatorsRewards} handleClose={handleClose} />
      {/* /Page Content */}
    </div>
  );
}

export default VaidatorsDataPage;
