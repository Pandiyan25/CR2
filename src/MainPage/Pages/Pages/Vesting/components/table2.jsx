import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { allData } from "./constant";
import { itemRender, onShowSizeChange } from "../../../../paginationfunction";
import { apiURI } from "../../../../../config/config";
import { useSelector } from "react-redux";



const tableHead = {
  Sno: "SNO",
  Date: "Date",
  Token: "Token",
  Transaction_type: "Transactiontype",
  Nooftokens: "Number of Tokens",
  //  options: "Options",
};

const TablePage = () => {

  const loginId = useSelector((state) => state.constVar.loginId)
  const [projectDetailsData,setProjectDetailsData] = useState([])
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        allData
          .filter(item => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };



  const columns = [


    {
      title: 'Date',
      dataIndex: 'date',
      align: 'center',
      // sorter: (a, b) => a?.project_name?.length - b?.project_name?.length,
    }, {
      title: 'Token',
      dataIndex: 'token_ticker',
      align: 'center',
      // sorter: (a, b) => a?.amount_in_escrow?.localeCompare(b?.amount_in_escrow) ,
      // sorter: (a, b) => a?.amount_in_escrow?.length - b?.amount_in_escrow?.length,
    },
    , {
      title: ' Transaction Type',
      dataIndex: 'transaction_type',
      align: 'center',
      // sorter: (a, b) => a?.investment_date?.length - b?.investment_date?.length,
    }, {
      title: 'Number of Tokens',
      dataIndex: 'no_of_tokens',
      align: 'center',
      // sorter: (a, b) => a?.no_of_proposals?.length - b?.no_of_proposals?.length,
    },

  ]

  const getProjectDetailsFunc = () =>{
    try {
  
     var query = 
     `query AllVestingTransactions($investor: ID) {
      allVestingTransactions(investor: $investor) {
        _id
        transaction_date
        transaction_type
        no_of_tokens
        token_ticker
      }
    }
    
    
       `;
       fetch(apiURI.URL , {
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
             "investor": loginId
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
           if(data?.data?.allVestingTransactions != null && data?.data?.allVestingTransactions != undefined && data?.data?.allVestingTransactions.length > 0){
            //  var totalInvested = 0;
            var arritem = []
            for(var i = 0;i <data?.data?.allVestingTransactions.length ; i++ ){
              var date = data?.data?.allVestingTransactions[i].transaction_date.split("T")
              arritem.push({
                "date":date[0],
                ...data?.data?.allVestingTransactions[i]
              })
            }

             setProjectDetailsData(arritem)
  
           }else{
            setProjectDetailsData([])
           }
         });
  
    } catch(error){
        console.log(error,"ProjectGetFunctionError  in Dashboard in investors error");
    }
  }
   useEffect(() => {
    getProjectDetailsFunc()
   },[])




  return (

    <>

      <div style={{ height:'fit-content' }}>
        <div className="mt-2" >
        {/* mt-4 mb-2 */}
          <div className="search" style={{marginBottom:'15px'}}>
            <input className="search" style={{width:"300px",height:"35px",borderRadius:"2px",border:"2px solid rgb(225, 223, 223)",boxShadow:"rgb(196 200 208) 0px 0px 0px"}}
              placeholder="Search"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          {/* <table style={{ borderRadius: "20px !important" }}>
            <thead style={{ border: "solid 1px #e1e1e1", fontWeight: "600" }}>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover" style={{ height: "200px", overflowY: "scroll !important" }} >{tableData()}</tbody>
          </table>
          <Pagination
            pageSize={countPerPage}
            onChange={updatePage}
            current={currentPage}
            total={allData.length}
          /> */}
          {/* padding: '20px',, border: '2px solid #E3E9EF', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' */}

          <div style={{  background: 'white' ,height:'fit-content' }}>
          {/* style={{ border: '2px solid #E3E9EF', borderRadius: '10px', background: 'white' }} */}
            <div className="table-responsive" >

              <Table
                pagination={{
                  total: projectDetailsData.length,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }
                }
                style={{ overflowX: 'auto' }}
                columns={columns}
                bordered
                dataSource={projectDetailsData}
                rowKey={record => record.id}
              />


            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TablePage;