

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Rating from 'react-rating'

import "./index.css"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../../../../antdstyle.css";
import { itemRender, onShowSizeChange } from '../../../../paginationfunction';
import RecordExpenseModal from './RecordExpenseModal';
import AddVendorModal from './AddVendorModal';
import { apiURI } from '../../../../../config/config';

const ExpensePage = () => {
  const [addVendor, showAddVendor] = useState(false)
  const [recordExpense, showRecordExpense] = useState(false)

  const projectNumber = useSelector((state) => state.constVar.projectId)
  const loginId = useSelector((state) => state.constVar.loginId)
  const [checkData, setcheckData] = useState([])

  const COLORS = ["orange", "gray"];

  const data = [
    { name: 'Supporters', students: 400, color: 'green' },
    { name: 'Opposer', students: 400, color: 'red' },
    // {name: 'Opposers', students: 700},
    // {name: 'Geek-i-knack', students: 200},
    // {name: 'Geek-o-mania', students: 1000}
  ];

  const opennewWindow = (i) => {
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
  }

  const [tableData, settableData] = useState([
    {
      Date: '11/05/2022',
      Type: 'Initial',
      FundsRequested: "10000 USD",
      FundsReceiptStatus: '-',
      tokenRelased: '500',
      noOfValidators: '-',
      validationStatus: '-'

    },
    {
      Date: '11/05/2022',
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
      title: 'Date',
      dataIndex: 'date',
      align: 'center',
      key: 'date',

    },

    {
      title: 'Expense Main head',
      dataIndex: 'expense_main_head',
      align: 'center',
    },

    {
      title: 'Expense Sub head',
      dataIndex: 'expense_sub_head',
      align: 'center',
    }, {
      title: 'Expense Type',
      dataIndex: 'expense_type',
      align: 'center',
    },
    , {
      title: 'Enter Amount',
      // dataIndex: 'enter_amount',

      render: (text, record) => (
        <div>
          {Number(text?.enter_amount).toLocaleString("en-US")}
        </div>
      ),
      align: 'center',
    }, {
      title: 'Paid Through',
      dataIndex: 'paid_through',
      align: 'center',
    }, {
      title: 'Bank Account Number',
      dataIndex: 'bank_account_number',
      align: 'center',
    }, {
      title: 'Wallet Address',
      dataIndex: 'wallet_address',
      align: 'center',
    },
    {
      title: 'Attach Receipt',
      // dataIndex: 'wallet_address',
      render: (text, record) => (

        text?.attach_receipt != null && text?.attach_receipt != undefined && text?.attach_receipt != '' ?
          <div style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => opennewWindow(text.attach_receipt)}>Attach Receipt</div>
          :
          ''

      ),
      align: 'center',
    },
  ]

  const recordExpenseShowfunc = () => {
    showRecordExpense(true)
  }

  const handleClose = () => {
    showRecordExpense(false)

  }

  const addVendorShowfunc = () => {
    showAddVendor(true)
  }
  const handleCloseaddVendor = () => {
    showAddVendor(false)

  }
  const getSocialMediaDataFunc = () => {
    try {
      var query = `
      query Query($project: ID) {
        allProjectExpenses(project: $project) {
          _id
          date
          expense_sub_head
          enter_amount
         
          add_link
          bank_account_number
          attach_receipt
          expense_main_head
          expense_type
          paid_through
          comments
          wallet_address
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

            "project": projectNumber,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.allProjectExpenses != null && data?.data?.allProjectExpenses != undefined) {

            setcheckData(data?.data?.allProjectExpenses)
          } else {
            setcheckData()
          }
        })

    } catch (error) {
      console.log(error, "funding in Project");
    }
  }

  useEffect(() => {
    console.log(loginId, "funding Log1");
    if (loginId != '') {
      getSocialMediaDataFunc()
      console.log(loginId, "funding Log2");
    }

  }, [loginId])





  return (


    <div className="content container-fluid">
      <div >
        <div>

          <div className="page-header">
            <div className="row align-items-center" style={{ width: '100%' }}>
              <div className="col">
                <h3 className="page-title" style={{ fontSize: '25px' ,margin:'0px'}}>Expense</h3>
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
                        total: checkData?.length,
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
        show={recordExpense}
        handleClose={handleClose}
        getSocialMediaDataFunc={getSocialMediaDataFunc}
      />
      <AddVendorModal getSocialMediaDataFunc={getSocialMediaDataFunc} show={addVendor} handleClose={handleCloseaddVendor} />
    </div>
  );
}

export default ExpensePage;
