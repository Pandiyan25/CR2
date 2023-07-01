

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Rating from 'react-rating'

import "./index.css"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../../../paginationfunction';
import RecordExpenseModal from '../Expense/RecordExpenseModal';
import AddVendorModal from '../Expense/AddVendorModal';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../../config/config';

const VendorsPage = () => {
  const [addVendor,showAddVendor] = useState(false)
  const [recordExpense,showRecordExpense] = useState(false)
  
  const projectNumber = useSelector((state) => state.constVar.projectId)
  const [checkData, setcheckData] = useState([])
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
      Date: '11/05/2022',
      name: 'Initial',
      FundsRequested: "10000 USD",
      FundsReceiptStatus: '-',
      tokenRelased: '500',
      noOfValidators: '-',
      validationStatus: '-'

    },
    {
      Date: '11/05/2022',
      name: 'Subsequent',
      FundsRequested: "10000 USD",
      FundsReceiptStatus: '-',
      tokenRelased: '300',
      noOfValidators: '4',
      validationStatus: 'Approved'

    },

  ])

  const columns = [

    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',

    },

    {
      title: 'Organization Name',
      dataIndex: 'organization_name',
      align: 'center',
    },

    {
      title: 'Vendor Mail',
      dataIndex: 'vendor_mail',
      align: 'center',
    }, {
      title: 'Email ID',
      dataIndex: 'email_id',
      align: 'center',
    },
    , {
      title: 'Website',
      dataIndex: 'website',
      align: 'center',
    }, {
      title: 'Payment',
      dataIndex: 'payment',
      align: 'center',
    }

  ]

  const recordExpenseShowfunc = () =>{
    showRecordExpense(true)
  }

  const handleClose = () =>{
    showRecordExpense(false)

  }

  const addVendorShowfunc = () => {
    showAddVendor(true)
  }
  const handleCloseaddVendor = () =>{
    showAddVendor(false)

  }

  useEffect(() => {
    console.log(loginId, "funding Log1");
    if (loginId != '') {
      getSocialMediaDataFunc()
      console.log(loginId, "funding Log2");
    }

  }, [loginId])



  const getSocialMediaDataFunc = () => {
    try {
      var query = `query Query($project: ID) {
        allVendors(project: $project) {
          _id
          name
          vendor_mail
          website
          organization_name
          email_id
          payment
        }
      }`;
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
            "project": projectNumber
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.allVendors != null && data?.data?.allVendors != undefined) {

            setcheckData(data?.data?.allVendors)
          } else {
            setcheckData([])
          }
        })

    } catch (error) {
      console.log(error, "funding in Project");
    }
  }

  return (


    <div className="content container-fluid">
      <div >
        <div>

          <div className="page-header">
            <div className="row align-items-center" style={{ width: '100%' }}>
              <div className="col">
                <h3 className="page-title" style={{ fontSize: '25px',margin:'0px' }}>Vendor</h3>
              </div>
              <div className="col-auto float-right ml-auto">
                <button className="btn add-btn2" style={{ margin: '10px',borderRadius:'2px' }} onClick={() => addVendorShowfunc()}> Add Vendor</button>

                <button className="btn add-btn2" style={{ margin: '10px',borderRadius:'2px' }} onClick={() => recordExpenseShowfunc()}> Record Expense</button>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-12 d-flex">

              <div className="card card-table flex-fill" style={{border:'none'}}>

                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: checkData.length,
                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                      }
                      }
                      style={{ overflowX: 'auto' }}
                      columns={columns}
                      bordered
                      dataSource={checkData}
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
      <RecordExpenseModal 
        getSocialMediaDataFunc={getSocialMediaDataFunc}
         show={recordExpense}
          handleClose={handleClose} 
          />
      <AddVendorModal getSocialMediaDataFunc={getSocialMediaDataFunc}  show={addVendor} handleClose={handleCloseaddVendor} />
    </div>
  );
}

export default VendorsPage;