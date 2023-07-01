

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Rating from 'react-rating'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
import "./index.css"
import { Button } from 'react-bootstrap';
import { designLogo2 } from '../../../Entryfile/imagepath';
import CountUp from 'react-countup';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { apiURI } from '../../../config/config';
const ProposalStatus = () => {


  const [proposalDashboardData, setProposalDashboardData] = useState([])
  const projectId = useSelector((state) => state.constVar.projectId)
  const [checkPage, setCheckPage] = useState([])
  const loginId = useSelector((state) => state.constVar.loginId)
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
      proposalNo: '0001',
      Type: 'Initial',
      FundsRequested: "10000 USD",
      FundsReceiptStatus: '-',
      tokenRelased: '500',
      noOfValidators: '-',
      validationStatus: '-'

    },
    {
      proposalNo: '0002',
      Type: 'Subsequent',
      FundsRequested: "10000 USD",
      FundsReceiptStatus: '-',
      tokenRelased: '300',
      noOfValidators: '4',
      validationStatus: 'Approved'

    },

  ])

  const columns = [

    {
      title: 'Proposal No',
      // dataIndex: 'proposal_id',
      align: 'center',

      render: (text, record) => (
        <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => perproposalFunc(text)}>{text.proposal_id}</span>
      ),
      // sorter: (a, b) => a.salary.length - b.salary.length,
      // key: 'proposal_id',

    },

    {
      title: 'Proposal Type',
      dataIndex: 'type',
      align: 'center',
    },

    {
      title: 'Funds Requested',
      dataIndex: 'funds_requested',
      align: 'center',
    }, {
      title: 'Funds Receipt Status',
      dataIndex: 'proposal_status',
      align: 'center',
    },
    , {
      title: ' Tokens Released',
      dataIndex: 'token_release',
      align: 'center',
    }, {
      title: 'Number of Validations',
      dataIndex: 'no_of_validators',
      align: 'center',
    }, {
      title: 'Validation Status',
      // dataIndex: 'validatorsStatus',
      align: 'center',
    }

  ]



  const getUserDetailsFunc = () => {

    try {


      var query = `
        query GetValidatorToken($project: ID, $user: ID) {
            allProposals(project: $project, user: $user) {
            _id
            proposal_id
            name
            type
            funds_requested
            price_per_token
            number_of_tokens
            project_token_minted
            logo
            no_of_validators
            proposal_status
            reported_expenditure_previous_cycle
            reported_expenditure_till_date
            token_release
            additional_attachment
            additional_information
            receiving_address
            timeline_update
            fund_requested_for_current_cycle
            budget_for_currenct_proposal_cycle
            current_proposal_cycle
            variants
            reported_expenditure
            reported_budget
            currency
            validator_status
            fund_raised_till_now
            proposal_blockchain_id
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
            "project": projectId,
            "user": loginId
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.allProposals);
          if (data?.data?.allProposals != null && data?.data?.allProposals != undefined) {
            setCheckPage(data?.data?.allProposals)
          } else {
            setCheckPage([])
          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }

  const getUserDashboardFunc = () => {

    try {


      var query = `
      
        query GetFounderProposalDashboard($project: ID) {
          getFounderProposalDashboard(project: $project) {
            initial_proposals
            Subsequent_proposal
            approved_proposal
            rejected_proposal
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
            "project": projectId
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.getFounderProposalDashboard);
          if (data?.data?.getFounderProposalDashboard != null && data?.data?.getFounderProposalDashboard != undefined) {
            setProposalDashboardData([data?.data?.getFounderProposalDashboard])
          } else {
            setProposalDashboardData([])
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
      getUserDashboardFunc()
    }

  }, [loginId])

  console.log(proposalDashboardData, "proposalDashboardData");
  return (


    <div className="content container-fluid">
      <div >
        <div>

          <div className="row">
            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="cardHEight2 card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                  <div className="dash-widget-info">
                    {/* 112 */}
                    <h3 className="mainFontH3">
                      {
                        proposalDashboardData.length > 0 ?
                          <CountUp end={proposalDashboardData[0].initial_proposals}
                            duration={2.5} />
                          :
                          <CountUp end={0}
                            duration={2.5} />
                      }
                    </h3>
                    <span className="mainFontSpan">Initial Proposals</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="respcard col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="cardHEight2 card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>44</h3> */}
                    <h3 className="mainFontH3"> 
                    {
                        proposalDashboardData.length > 0 ?
                          <CountUp end={proposalDashboardData[0].Subsequent_proposal}
                            duration={2.5} />
                          :
                          <CountUp end={0}
                            duration={2.5} />
                      }
                     {/* USD */}
                     </h3>
                    <span className="mainFontSpan">Subsequent Proposals</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="respcard2 col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="cardHEight2 card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>37</h3> */}
                    <h3 className="mainFontH3"> 
                    {
                        proposalDashboardData.length > 0 ?
                          <CountUp end={proposalDashboardData[0].approved_proposal}
                            duration={2.5} />
                          :
                          <CountUp end={0}
                            duration={2.5} />
                      }
                    {/* <CountUp end={1000}
                      duration={2.5} /> */}
                       {/* USD */}
                       </h3>
                    <span className="mainFontSpan">Approved Subsequent Proposals</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="cardHEight2 card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-user" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>218</h3> */}
                    <h3 className="mainFontH3">
                    {
                        proposalDashboardData.length > 0 ?
                          <CountUp end={proposalDashboardData[0].rejected_proposal}
                            duration={2.5} />
                          :
                          <CountUp end={0}
                            duration={2.5} />
                      }
                       {/* <CountUp end={100}
                      duration={2.5} /> */}
                      {/* CR2 */}
                      </h3>
                    <span className="mainFontSpan"> Rejected Subsequent Proposals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-md-12 d-flex">

              <div className="card card-table flex-fill">

                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: checkPage?.length,
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
  );
}

export default ProposalStatus;
