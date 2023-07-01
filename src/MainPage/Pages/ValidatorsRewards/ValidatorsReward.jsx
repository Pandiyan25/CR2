

 import React, {useState, useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import { withRouter } from 'react-router-dom';
 
 import Rating from 'react-rating'
 
 import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, } from 'recharts';
 import "../../index.css"
 import { Button } from 'react-bootstrap';
 import { Table } from 'antd';
 import 'antd/dist/antd.css';
 import "../../antdstyle.css";
 import '../../Main/Dashboard/index.css'
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import CountUp from 'react-countup';


 const ValidaterReward = () => {
 
 
   const COLORS = ["orange", "gray"];
   
  const [rewardData, setRewardData] = useState([])
   const loginId = useSelector((state) => state.constVar.loginId)
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
      projectId: '#001',
      
      dateofReward:'04/02/2022',
      cr2Rewards:'1000',
      valueinUSD:'5000',
      TypeofReward:'Proposals',

    },
    {
      sno: 2,
      projectId: '#001',
      
      dateofReward:'04/02/2022',
      cr2Rewards:'1000',
      valueinUSD:'5000',
      TypeofReward:'Rating',

    },
    {
      sno: 3,
      projectId: '#001',
      
      dateofReward:'04/02/2022',
      cr2Rewards:'1000',
      valueinUSD:'5000',
      TypeofReward:'LeaderShip',

    },
    {
      sno: 4,
      projectId: '#001',
      dateofReward:'04/02/2022',
      TypeofReward:'Others',
      valueinUSD:'5000',
      cr2Rewards:'1000',

    },
   
  ])

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
            "validator": loginId
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
        });

    } catch (error) {
      console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
    }
    
  }

  const columns = [
    
    {
      title: 'Reward Id',
      //   dataIndex: 'proposalNo',
      align: 'center',

      
    },

    {
      title: 'Type of Reward',
        dataIndex: 'type_of_reward',
        align: 'center',
      },

    {
      title: 'Date of Reward',
      dataIndex: 'reward_date',
      align: 'center',
    }, {
      title: 'CR2 Reward',
      dataIndex: 'no_of_cr2_tokens',
      align: 'center',
    },
    , {
      title: ' Value in USD',
      dataIndex: 'valueinUSD',
      align: 'center',
    },
    , {
      title: ' Claim CR2',
      // dataIndex: 'valueinUSD',
      align: 'center',
      
      render: (text, record) => (
        // {text.projectId}
        <div><button style={{background:'#6345ED',color:'white',border:'2px solid #6345ED',width:'60px',fontSize:'13px',borderRadius:'50px'}}>Claim</button></div>
      ),
    },


  ]

   return (
 
     <div className="page-wrapper" style={{paddingTop:'60px'}}>
 
       {/* Page Content */}
       <div className="content container-fluid">
         {/* Page Header style={{paddingTop:'20px'}}*/}
         <div >
         <div className="page-header">
           <div className="header-left">
             <div className="row">
               <div className="col-sm-12">
                 <h3 className="page-title">Rewards</h3>
 
               </div>
             </div>
           </div>
           
         </div>
         <div style={{background:'white',padding:'20px',borderRadius:'15px',boxShadow:'0px 10px 20px #C4C8D0'}}>
 
           {/* /Page Header */}
           <div className="row">
            <div className=" col ">
              <div className="cardHEight card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-cubes" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>500 CR2</h3> */}
                      <h3> <CountUp end={500}
                        duration={2.5} 
                        separator=','/>
                        {/* CR2 */}
                        </h3>
                    <span>CR2 Rewards Earned till Date</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col ">
              <div className="cardHEight card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-usd" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>100 CR2</h3> */}
                      <h3> <CountUp end={100}
                        duration={2.5} 
                        separator=','/>
                        {/* CR2 */}
                        </h3>
                    <span>CR2 Rewards Unclaimed</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col ">
              <div className="cardHEight card dash-widget">
                <div className="card-body">
                  <span className="dash-widget-icon"><i className="fa fa-diamond" /></span>
                  <div className="dash-widget-info">
                    {/* <h3>12</h3> */}
                      <h3> <CountUp end={12}
                        duration={2.5} 
                        separator=','/>
                        {/* CR2 */}
                        </h3>
                    <span>Leadership Rank</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
 
           <div className="row">
             <div className="col-md-12 d-flex">
               <div className="card card-table flex-fill" style={{borderRadius:'5px'}}>
                 {/* <div className="card-header"> */}
                 {/* <h3 className="card-title mb-0">Live Pr</h3> */}
                 {/* </div> */}
                 <div className="card-body">
                   <div className="table-responsive">
                   <Table
                        pagination={{
                          total: rewardData.length,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }
                        }
                        style={{ overflowX: 'auto' }}
                        columns={columns}
                        bordered
                        dataSource={rewardData}
                        rowKey={record => record.id}
                      // onChange={this.handleTableChange}
                      />
                     
                   </div>
                 </div>
                 {/* <div className="card-footer">
                   <Link to = "/app/sales/invoices">View all invoices</Link>
                 </div> */}
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
 
 export default withRouter(ValidaterReward);
 