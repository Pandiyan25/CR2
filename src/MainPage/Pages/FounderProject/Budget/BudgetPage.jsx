
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { CanvasJSChart } from 'canvasjs-react-charts'
import './budget.css';
import randomColor from "randomcolor";
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import TimeLine from "react-gantt-timeline";
import CountUp from 'react-countup';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../paginationfunction"
import "../../../antdstyle.css"
import { apiURI } from '../../../../config/config';
import { PieChart } from 'react-minimal-pie-chart';
import AddBudgetPage from './AddBudgetPage';
import writeXlsxFile from 'write-excel-file'
import { Downloaddata } from './ExcelBudgetDownload';
import { async } from 'regenerator-runtime';
import readXlsxFile from 'read-excel-file'
import chart from "./assets/chart.png"
import { Upload, Icon, message } from 'antd';
import EditBudgetPage from './EditBudgetPage';
import { Button } from 'reactstrap';
import CNYimaage from '../Funding/assets/images/CNY.png'
import usdimage from '../Funding/assets/images/USD.png'
import EURimage from '../Funding/assets/images/EUR.png'
import POUNDimage from '../Funding/assets/images/POUND.png'
import YUANimage from '../Funding/assets/images/YUAN.png'
import YENimage from '../Funding/assets/images/YEN.png'
import CADimage from '../Funding/assets/images/CAD.png'
import SGDimage from '../Funding/assets/images/SGD.png'
import AUDimage from '../Funding/assets/images/AUD.png'
import DAIimage from '../Funding/assets/images/DAI.png'
import BUSDimage from '../Funding/assets/images/BUSD.png'
import INRimage from '../Funding/assets/images/INR.png'
import USDCimage from '../Funding/assets/images/USDC.png'
import USDTimage from '../Funding/assets/images/USDT.png'
import RUBLEimage from '../Funding/assets/images/RUBBLE.png'

const BudgetPage = () => {
  const [mydata, setMydata] = useState()
  const [editId, setEditId] = useState('')
  const [CurrencyType, setCurrencyType] = useState('')

  const [expPerCycle, setexpPerCycle] = useState(0)
  const [unit, setunit] = useState(0)
  const [MainDesc, setMainDesc] = useState('')
  const [SubDes, setSubDes] = useState('')
  const [ExpFreq, setExpFreq] = useState(0)
  const [expCycle, setexpCycle] = useState(0)
  const [balance, setbalance] = useState(0)
  const [lifeTimeBudg, setlifeTimeBudg] = useState(0)
  const [expTillDate, setExptillDate] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('')
  const [timetask, setTimetask] = useState('')
  const [expenseWisePieChartData, setExpenseWisePieChartData] = useState([])



  const [showEditBudgetPage, setShowEditBudgetPage] = useState(false)
  const [bannersData, setBannersData] = useState([])
  const [checkPage, setCheckPage] = useState('')
  const [tokenStd, settokenStd] = useState([])
  const projectNumber = useSelector((state) => state.constVar.projectId)
  const [showGatthChart, setShowGatthChart] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [gattDAta, setGattDAta] = useState([])

  const hiddenFileInput2 = React.useRef(null);
  const [toDate, setToDate] = useState('')
  const [fromDateSearch, setFromDateSearch] = useState('')
  var date = new Date();



  const datetime =

    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" + date.getFullYear();

  const downloadBugetDatafunc = async () => {
    await writeXlsxFile(Downloaddata, {
      fileName: 'budget.xlsx'
    })
  }

  const uploadExcelData = (event) => {
    const item = event.target.files[0];
    if (item.type == 'application/vnd.xlsx' || item.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

      console.log(item, "item");
      readXlsxFile(item).then((rows) => {
        console.log("upload document data", rows);
        // var
        for (var i = 1; i < rows.length; i++) {
          createTokenFunc(rows[i])
        }


        // getUserDetailsFunc()
      }
      )
      toast.success('Successfully Added', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } else {
      toast.warn('Please Upload file only xlsx format', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  const beforeUpload = (file) => {
    console.log(file.type, "file.type");
    const isXls = file.type === 'application/vnd.xlsx';
    if (!isXls) {
      message.error('You can only upload XLS file!');
    }
    return isXls;
  }
  const createTokenFunc = (i) => {
    
    var dateCheck = new Date();
    var todayDate = dateCheck.toISOString()
    var fromDate = i[6].toISOString()
    var toDate = i[7].toISOString()
    todayDate = todayDate.split('T')[0]
    var dateFrom = fromDate.split('T')[0]
    var dateTo = toDate.split('T')[0]
    console.log(dateFrom + " dateFrom");
    console.log(dateTo + " dateTo");
    console.log(todayDate + " todayDate");

    var d1 = dateFrom.split("-");
    var d2 = dateTo.split("-");
    var c = todayDate.split("-");

var status= ''
    var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
    var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
    var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
    console.log(from + " from");
    console.log(to + " to");
    console.log(check + " check");

    console.log(check > from && check < to,"Fional")
    if(check >= from && check <= to){
        
      status = "Ongoing"
    }else if (check < from && check <= to ) {
      status = "Yet to Start"
    }else if(check > from && check > to){

      status =  "Completed"
    }

    console.log("Setttt");
    try {
      var query = `
          mutation Mutation($input: BudgetInput) {
              createProjectBudget(input: $input) {
                _id
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

            "input": {
              "project": projectNumber,
              "main_expense_head": i[0],
              "expense_per_cycle": i[3],
              "sub_expense_head": i[1],
              // "unit": i[3],
              "expense_frequency": i[2],
              // "no_of_expense_cycle": i[5],
              "life_time_budget": i[4],
              // "balance": i[8],
              "actual_expense_till_date": i[5],

              "status": status,
              // "time_task": i[12],
              "end_date": i[7],
              "start_date": i[6],
            }
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log("gettt", data);
          getUserDetailsFunc()
        })


    } catch (error) {
      console.log("adding new projectDetail error");
    }


  }


  const disablePastDate = () => {
    const today = new Date(fromDateSearch);
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };



  const disableFutureDate = () => {
    const today = new Date(toDate);
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };


  const changeFunc = () => {

  }

  const [data, setData] = useState([
    {
      id: 1,
      mainExpenseHead: "Incorporation Compilance",
      subExpenseHead: '50000',
      ExpensePerCycle: '1',
      unit: "365",
      frequency: "4",
      expcycle: '4',
      lifeTime: '20000',
      Expensetilldate: '-',
      balance: '20000'
    },
    {
      id: 2,
      mainExpenseHead: "Incorporation Compilance",
      subExpenseHead: "50000",
      ExpensePerCycle: '1',
      unit: "365",
      frequency: "4",
      expcycle: '4',
      lifeTime: '20000',
      Expensetilldate: '-',
      balance: '20000'
    },
  ]);

  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);


  const columns = [

    {
      title: 'Main Expense Head',
      dataIndex: 'main_expense_head',

      align: 'center',
      sorter: (a, b) => a.main_expense_head.localeCompare(b.main_expense_head),
    },
    {
      title: 'Sub Expense Head',
      dataIndex: 'sub_expense_head',
      sorter: (a, b) => a.main_expense_head.localeCompare(b.main_expense_head),
      // sorter: (a, b) => a.subExpenseHead.length - b.subExpenseHead.length,
      align: 'center',
    },
    {
      title: 'Expense Frequency in Days',
      // dataIndex: 'expense_frequency',

      render: (text, record) => (
        <div>

          {Number(text?.expense_frequency).toLocaleString("en-US")}
        </div>
      ),
      // {Number(text?.no_of_tokens).toLocaleString("en-US")}}

      sorter: (a, b) => a.expense_frequency - b.expense_frequency,
      align: 'center',
    },
    {
      title: 'Expense per Cycle',
      // dataIndex: 'expense_per_cycle',

      render: (text, record) => (
        <div>

          {Number(text?.expense_per_cycle).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.expense_per_cycle - b.expense_per_cycle,
      // sorter: (a, b) => a.ExpensePerCycle.length - b.ExpensePerCycle.length,
      align: 'center',
    },
    {
      title: 'Life time Budget',
      // dataIndex: 'life_time_budget',

      render: (text, record) => (
        <div>

          {Number(text?.life_time_budget).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.life_time_budget - b.life_time_budget,
      // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
      align: 'center',
    },

    {
      title: 'Actual Expense Till Date',
      // dataIndex: 'actual_expense_till_date',

      render: (text, record) => (
        <div>

          {Number(text?.actual_expense_till_date).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a.actual_expense_till_date - b.actual_expense_till_date,
      // sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
      align: 'center',
    },
    // {
    //   title: 'Units/Quantity',
    //   dataIndex: 'unit',

    //   sorter: (a, b) => a.unit.length - b.unit.length,
    //   align: 'center',
    // },

    // {
    //   title: 'No. Of Expense Cycle',
    //   dataIndex: 'no_of_expense_cycle',
    //   sorter: (a, b) => a.expcycle.length - b.expcycle.length,
    //   align: 'center',
    // },




    // {
    //   title: 'Balance Budget',
    //   dataIndex: 'balance',
    //   sorter: (a, b) => a.balance.length - b.balance.length,
    //   align: 'center',
    // },

    {
      title: 'Start Date',
      dataIndex: 'start_date',
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      align: 'center',
    },

    {
      title: 'End Date',
      dataIndex: 'end_date',
      sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
      align: 'center',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      // sorter: (a, b) => a.balance.length - b.balance.length,
      align: 'center',
    },

    // {
    //   title: 'Time Task',
    //   dataIndex: 'time_task',
    //   sorter: (a, b) => a.balance.length - b.balance.length,
    //   align: 'center',
    // },
    {


      title: 'Options',
      //   dataIndex: 'balance',
      // sorter: (a, b) => a.balance - b.balance,
      align: 'center',
      render: (text, record) => (
        // <strong>{text}</strong>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>

          <Button style={{ padding: '0px ', border: '2px solid #1890ff', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px', background: '#1890ff' }} onClick={() => showEditBudgetPageFunc(text)}><i className="fa fa-pencil" /></Button>
          <Button style={{ padding: '0px ', border: '2px solid #1890ff', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px', background: '#1890ff' }} onClick={() => deleteBudgetPage(text)}><i className="fa fa-trash"></i></Button>
          {/* onClick={() => deleteFunc(text._id)} */}
        </div>
      ),




    }

  ]

  const deleteBudgetPage = (text) => {
    try {


      var query = `mutation Mutation($id: ID) {
        deleteProjectBudget(_id: $id) {
         _id
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
            "id": text?._id
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {

          getUserDetailsFunc()
          getUserBannerDetailsFunc()
        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }



  const showEditBudgetPageFunc = (text) => {

    console.log(text, "textmaindesc");

    setexpPerCycle(text?.expense_per_cycle),
      setunit(text?.unit),
      setMainDesc(text?.main_expense_head),
      setSubDes(text?.sub_expense_head),
      setExpFreq(text?.expense_frequency),
      setexpCycle(text?.no_of_expense_cycle),
      // setexpPerCycle(text?.expense_per_cycle),
      setbalance(text?.balance),
      setlifeTimeBudg(text?.life_time_budget),
      setExptillDate(text?.actual_expense_till_date),
      setStartDate(text?.start_date),
      setEndDate(text?.end_date),
      setStatus(text?.status),
      setTimetask(text?.time_task),
      setEditId(text?._id)
    setShowEditBudgetPage(true)
  }


  const handleClickFile2 = event => {
    hiddenFileInput2.current.click();
  };

  const onHandleClose = () => {
    setShowAddPage(false)
    getUserDetailsFunc()
  }

  const onHandleCloseEdit = () => {
    setShowEditBudgetPage(false)
    getUserDetailsFunc()
  }
  const onHandleEditClose = () => {
    setShowEditPage(false)
  }

  const openEditMapfunc = () => {
    setShowGatthChart(true)
  }
  const openAddMapfunc = () => {
    setShowAddPage(true)
  }


  const config = {

    taskList: {
      title: {
        label: "Task Todo",
        style: {
          background: "linear-gradient( grey, black)"
        }
      },
      task: {
        style: {
          height: '40px',
        }
      }
    },
    dataViewPort: {//The are where we display the task
      rows: {//the row constainting a task
        style: { backgroundColor: "#fbf9f9", borderBottom: 'solid 0.5px #cfcfcd', height: '40px' }
      },
      task: {
        showLabel: true,//If the task display the a lable
        style: {
          position: 'absolute', borderRadius: 14, color: 'white',
          textAlign: 'left', height: '35px'
        },
        selectedStyle: {}//the style tp be applied  when selected
      }
    },
  }


  const dataTask = [
    {
      TaskID: 1,
      TaskName: 'Project Initiation',
      StartDate: new Date('04/02/2019'),
      EndDate: new Date('04/21/2019'),
      // Progress:70,
      // subtasks: [
      //     { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
      //     { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
      //     { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
      // ]
    },
    {
      TaskID: 5,
      TaskName: 'Project Estimation',
      StartDate: new Date('04/22/2019'),
      EndDate: new Date('04/25/2019'),
      // Progress:50,
      // subtasks: [
      //     { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
      //     { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
      //     // , Predecessor: '7SS'
      //     { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
      // ]
    },
  ];


  const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };


  const getUserDetailsFunc = (i, date) => {
    var todate = ''
    var fromdate = ''
    if (i == "todate") {
      todate = date
      fromdate = fromDateSearch
    } else if (i == "fromdate") {

      todate = toDate
      fromdate = date
    } else {
      fromdate = ''
      todate = ''
    }

    try {


      var query = `query AllProjectBudgets($project: ID, $from: Date, $to: Date) {
        allProjectBudgets(project: $project, from: $from, to: $to) {
          _id
          main_expense_head
          sub_expense_head
          expense_per_cycle
          unit
          expense_frequency
          no_of_expense_cycle
          life_time_budget
          actual_expense_till_date
          balance
          start_date
          end_date
          status
          time_task
        }
        allProjectFunding(project: $project) {
                    
          currency
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
            "project": projectNumber,
            "from": fromdate,
            "to": todate,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.allProjectBudgets);
          if (data?.data?.allProjectBudgets != null && data?.data?.allProjectBudgets != undefined && data?.data?.allProjectBudgets.length > 0) {
            setCheckPage(data?.data?.allProjectBudgets[0]._id)
            // settokenStd(data?.data?.allProjectBudgets)


            var tokenArr = [];
            for (var j = 0; j < data?.data?.allProjectBudgets.length; j++) {

              var projectCurrentDate = data?.data?.allProjectBudgets[j]?.start_date

              projectCurrentDate = projectCurrentDate?.split('T')[0];

              var dashboardDate = data?.data?.allProjectBudgets[j]?.end_date
              dashboardDate = dashboardDate?.split('T')[0];

              tokenArr.push({
                "_id": data?.data?.allProjectBudgets[j]?._id,
                "start_date": projectCurrentDate,
                "end_date": dashboardDate,
                "status": data?.data?.allProjectBudgets[j]?.status,

                "main_expense_head": data?.data?.allProjectBudgets[j]?.main_expense_head,
                "sub_expense_head": data?.data?.allProjectBudgets[j]?.sub_expense_head,
                "expense_per_cycle": data?.data?.allProjectBudgets[j]?.expense_per_cycle,
                "unit": data?.data?.allProjectBudgets[j]?.unit,
                "expense_frequency": data?.data?.allProjectBudgets[j]?.expense_frequency,
                "no_of_expense_cycle": data?.data?.allProjectBudgets[j]?.no_of_expense_cycle,
                "life_time_budget": data?.data?.allProjectBudgets[j]?.life_time_budget,
                "actual_expense_till_date": data?.data?.allProjectBudgets[j]?.actual_expense_till_date,
                "balance": data?.data?.allProjectBudgets[j]?.balance,
                "time_task": data?.data?.allProjectBudgets[j]?.time_task,

              })
            }
            settokenStd(tokenArr)

            var arr = []
            for (var i = 0; i < data?.data?.allProjectBudgets.length; i++) {
              arr.push({
                name: data?.data?.allProjectBudgets[i].main_expense_head,
                start: data?.data?.allProjectBudgets[i].start_date,
                end: data?.data?.allProjectBudgets[i].end_date,
                id: i + 1,
                color: "orange"
              })
              setGattDAta(arr)
            }
            var tokenarr = [];
            for (var i = 0; i < data?.data?.allProjectBudgets.length; i++) {
              console.log(parseInt(data?.data?.allProjectBudgets[i].unit), "getFounderUserDetailsBudgets");
              tokenarr.push({
                id: i,
                name: data?.data?.allProjectBudgets[i].main_expense_head,
                y: parseInt(data?.data?.allProjectBudgets[i].unit)

              })


              console.log(tokenarr, "tokenarr");

              setMydata(tokenarr)
            }

            var expenseChart = [];
            if (data?.data?.allProjectBudgets.length > 0) {

              const ids = data?.data?.allProjectBudgets.map(o => o.main_expense_head)
              console.log(ids, "ids");


              var mini  = ids.filter((item,index) => ids.indexOf(item) === index);
              console.log(mini,"minimini");
              var sepSum = []
              var mainaee = []
              for (var i = 0; i < mini.length; i++) {
                let color = randomColor();
                var sepMainSum = 0
                sepSum = data?.data?.allProjectBudgets?.forEach(element => {
                  console.log(element, "element");
                  element?.main_expense_head == mini[i] ?
                  
                    sepMainSum = sepMainSum + element.life_time_budget
                    :
                    sepMainSum
                });
                mainaee.push({
                  y:sepMainSum,
                  name:mini[i],
                  id: i,
                  color: color,
                })
                console.log(sepMainSum,mainaee,sepSum,"sepMainSum");
              }
              setExpenseWisePieChartData(mainaee)
              // const mainids = ids.filter((main_expense_head, index) => main_expense_head)
              // const filtered = data?.data?.allProjectBudgets.filter(({ main_expense_head }, index) => !ids.includes(main_expense_head))
              // console.log(filtered, "filtered");
              //   const result = ids.filter((thing, index, self) =>
              //   index === self.findIndex((t) => (
              //     t.main_expense_head === thing.main_expense_head
              //   ))
              // )
              // console.log(result,"result");

              var dataforeach = []
              for (var i = 0; i < data?.data?.allProjectBudgets.length; i++) {

                var sum = 0
                let color = randomColor();
                expenseChart.push({

                  // title: `${data?.data?.allProjectBudgets[i]?.main_expense_head}-${data?.data?.allProjectBudgets[i]?.life_time_budget}`,
                  // value: parseInt(data?.data?.allProjectBudgets[i].life_time_budget),
                  // -${data?.data?.allProjectBudgets[i]?.life_time_budget}
                  name: `${data?.data?.allProjectBudgets[i]?.main_expense_head}`,
                  y: parseInt(data?.data?.allProjectBudgets[i].life_time_budget),
                  color: color,
                  id: i
                })

                dataforeach = data?.data?.allProjectBudgets?.forEach(element => {
                  console.log(element, "element");
                  element?.main_expense_head == data?.data?.allProjectBudgets[i]?.main_expense_head ?
                    sum = sum + element.life_time_budget
                    :
                    sum
                });


                console.log(dataforeach, sum, "dataforeach");
              }


            } else {
              expenseChart = [];
            }
            


          } else {
            setCheckPage('')
            settokenStd([])
            setGattDAta([])
            setMydata([])
          }


          if (data?.data?.allProjectFunding != null && data?.data?.allProjectFunding != undefined && data?.data?.allProjectFunding.length > 0) {
            setCurrencyType(data?.data?.allProjectFunding[0].currency)
          } else {

            setCurrencyType('')
          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }


  const getUserBannerDetailsFunc = () => {

    try {
      // query Query($project: ID) {
      //   getBudgetBanner(project: $project) {
      //     lifetime_budget
      //     actual_expense_till_date
      //     balance_budget
      //     total_budget
      //     allocated_budget
      //     unallocated_budget
      //     spent_budget_till_date
      //     unspent_budget
      //     funds_raised_till_date
      //   }
      // }

      var query = `
      
      query($project: ID) {
        getBudgetBanner(project: $project) {
        project_start_date
        project_end_date
        allocated_budget
        funds_raised_till_date
        total_budget
        unallocated_budget
        unspent_budget
        no_of_reporting_cycles
        spent_budget_till_date
          excess_cash_flow
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
            "project": projectNumber
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getBudgetBanner', data?.data?.getBudgetBanner);
          if (data?.data?.getBudgetBanner != null && data?.data?.getBudgetBanner != undefined) {
            setBannersData([data?.data?.getBudgetBanner])


          } else {
            setBannersData([])
          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }

  console.log(mydata, "mydata");

  useEffect(() => {
    if (projectNumber != '') {
      getUserDetailsFunc()
      getUserBannerDetailsFunc()
    }

  }, [projectNumber])

  const goBacktoNormal = () => {
    setShowGatthChart(false)
  }



  const options = {
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    title: {
      text: "Expense Wise",
      fontSize: 20,
      // verticalAlign: "bottom",
      dockInsidePlotArea: true
    },
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###''",
      dataPoints: expenseWisePieChartData,
    }]
  }



  const config2 = {
    header: {
      top: {
        style: {
          background: "linear-gradient( grey, black)",
          textShadow: "0.5px 0.5px black",
          fontSize: 12
        }
      },
      middle: {
        style: {
          background: "linear-gradient( orange, grey)",
          fontSize: 9
        }
      },
      bottom: {
        style: {
          background: "linear-gradient( grey, black)",
          fontSize: 9,
          color: "orange"
        },
        selectedStyle: {
          background: "linear-gradient( #d011dd ,#d011dd)",
          fontWeight: "bold",
          color: "white"
        }
      }
    },
    taskList: {
      title: {
        label: "Main Description",
        style: {
          background: "linear-gradient( grey, black)"
        }
      },
      task: {
        style: {
          backgroundColor: "green",
          color: "white"
        }
      },
      verticalSeparator: {
        style: {
          backgroundColor: "#fbf9f9"
        },
        grip: {
          style: {
            backgroundColor: "red"
          }
        }
      }
    },
    dataViewPort: {
      rows: {
        style: {
          backgroundColor: "white",
          borderBottom: "solid 0.5px silver"
        }
      },
      task: {
        showLabel: true,
        style: {
          borderRadius: 1,
          boxShadow: "2px 2px 8px #888888"
        }
      }
    }
  };

  const changeDateFunc = (e) => {
    setToDate(e.target.value)

    getUserDetailsFunc("todate", e.target.value)

  }
  const changeFromDateFunc = (e) => {
    setFromDateSearch(e.target.value)

    getUserDetailsFunc("fromdate", e.target.value)

  }

  console.log(expenseWisePieChartData, "expenseWisePieChartData");

  return (

    <div className="card card-table flex-fill" style={{ border: '0px', margin: '0px' }}>
      {
        showGatthChart == false ?
          <div className="card-body">


            <div className="content container-fluid" style={{padding:'0px'}}>

              {/* budget detail */}
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Budget</h2>
              <div className="row mb-2" >


                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              {/* 112 */}
                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>



                                {bannersData?.length > 0 && bannersData[0]?.spent_budget_till_date != null && bannersData[0]?.spent_budget_till_date != undefined && bannersData[0]?.spent_budget_till_date != 0 ?
                                  <CountUp end={parseInt(bannersData[0].spent_budget_till_date)}

                                    separator=","
                                    // prefix="EUR "
                                    // suffix=" left"
                                    // {Number(text?.no_of_tokens).toLocaleString("en-US")}}
                                    // decimals={4}
                                    // decimal=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={705450}
                              duration={1.5} /> */}

                              </h3></div>


                          </div>
                          <span className="widget-box ft-weight">Spent Budget till Date </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 " style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {bannersData?.length > 0 && bannersData[0]?.unspent_budget != null && bannersData[0]?.unspent_budget != undefined && bannersData[0]?.unspent_budget != 0 ?
                                  <CountUp end={parseInt(bannersData[0].unspent_budget)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4153900}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box ft-weight">Unspent Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {bannersData?.length > 0 && bannersData[0]?.funds_raised_till_date != null && bannersData[0]?.funds_raised_till_date != undefined && bannersData[0]?.funds_raised_till_date != 0 ?
                                  <CountUp end={parseInt(bannersData[0].funds_raised_till_date)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4000000}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box ft-weight">Funds Raised till Date </span>
                        </div>

                        {/* <h3 className="mainFontH4">Take info from fund raise tab of founders</h3> */}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              {/* 112 */}
                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {bannersData?.length > 0 && bannersData[0]?.total_budget != null && bannersData[0]?.total_budget != undefined && bannersData[0]?.total_budget != 0 ?
                                  <CountUp end={parseInt(bannersData[0].total_budget)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={50000000}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box ft-weight">Total Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                {bannersData?.length > 0 && bannersData[0]?.allocated_budget != null && bannersData[0]?.allocated_budget != undefined && bannersData[0]?.allocated_budget != 0 ?
                                  <CountUp end={parseInt(bannersData[0].allocated_budget)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={4859350}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box ft-weight">Allocated Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                              {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                              {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                              {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                              {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                              {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                              {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                              {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                              {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                              {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                              {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                              {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                              {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                              {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                              {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                              <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                {bannersData?.length > 0 && bannersData[0]?.unallocated_budget != null && bannersData[0]?.unallocated_budget != undefined && bannersData[0]?.unallocated_budget != 0 ?
                                  <CountUp end={parseInt(bannersData[0].unallocated_budget)}

                                    separator=","
                                    duration={1.5} />
                                  :
                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                                {/* <CountUp end={140650}
                              duration={1.5} /> */}
                              </h3></div>

                          </div>
                          <span className="widget-box ft-weight"> Unallocated Budget </span>
                        </div>

                        {/* <h3 className="mainFontH4">Calculate</h3> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6 col-md-6 col-sm-12 pl-4" style={{ display: "flex", marginBottom: '40px' }}> */}
                {/* <div className=""> */}
                {/* row */}
                {/* <div className="col" style={{ textAlign: "center" }}> */}
                {expenseWisePieChartData.length > 0 ?
                  // <PieChart
                  //   animate
                  //   animationDuration={500}
                  //   animationEasing="ease-out"
                  //   labelPosition={45}
                  //   lineWidth={20}
                  //   data={expenseWisePieChartData}
                  // />
                  // :
                  // <PieChart
                  //   animate
                  //   animationDuration={500}
                  //   animationEasing="ease-out"
                  //   labelPosition={45}
                  //   lineWidth={20}
                  //   data={[
                  //     { title: 10, value: 10, color: '#94B3E8' },
                  //     { title: 0, value: 0, color: '#6345ED' },
                  //   ]}
                  // />
                  <div style={{ width: '50%', height: '500px' }}>
                    <CanvasJSChart options={options} height="100%" width="100%" />
                  </div>
                  :
                  ''
                }

                {/* <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Expense Wise</h4> */}
                {/* </div> */}
                {/* </div> */}
                {/* <div className="profile"></div>
                    <div className="profile"></div> */}
                {/* </div> */}


              </div>


              <div className="col-md-12 " style={{ padding: '0px', display: 'flex', flexDirection: 'row', marginTop: '40px' }}>


              </div>




              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center mb-3" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px' }}>

                    <div className="search " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                      <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 className="" style={{
                          fontWeight: '600', marginBottom: '0px', width: '40%'
                        }} >From Date:</h5>
                        <input className="form-control floating datetimepicker" type="date" max={disableFutureDate()} onChange={(e) => changeFromDateFunc(e)} style={{ height: '35px', width: '155px' }} />
                      </div>
                      <div className="" style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                        <h5 className="" style={{
                          fontWeight: '600', marginBottom: '0px', width: '40%'
                        }}>To Date:</h5>
                        <input className="form-control floating datetimepicker" type="date" min={disablePastDate()} style={{ height: '35px', width: '155px' }} onChange={(e) => changeDateFunc(e)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto " style={{ padding: '0px' }}>
                    <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => downloadBugetDatafunc()}> DOWNLOAD SAMPLE FORMAT</button>
                    <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginRight: '10px' }} onClick={handleClickFile2}>UPLOAD FILE</button>
                    <input
                      type="file"
                      ref={hiddenFileInput2}
                      onChange={uploadExcelData}
                      style={{ display: 'none' }}
                    />
                    <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginRight: '10px' }} onClick={() => openAddMapfunc()}> ADD</button>
                    <button className="btn add-btn2" style={{ height: "35px", borderRadius: '2px', marginRight: '10px' }} onClick={() => openEditMapfunc()}> View</button>
                  </div>
                </div>
              </div>





              <div className="col-md-12">

                <div className="row">
                  <div className="col-md-12" style={{ padding: '0px' }} >
                    <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                      <div className="card-body" style={{ height: "800px !important" }} >
                        <div className="table-responsive">
                          <Table className="table-striped"
                            pagination={{
                              total: tokenStd.length,
                              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                            }}
                            style={{ overflowX: 'auto' }}
                            columns={columns}
                            // bordered
                            dataSource={tokenStd}
                            rowKey={record => record.id}
                          // onChange={this.handleTableChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {tokenStd?.length > 0 ?
                <div className="col-md-12">
                  <div className="row">

                  </div>











                </div>
                :
                ''
              }
            </div>





          </div>
          :
          <div className="app-container">
            <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', marginBottom: '15px' }} onClick={() => goBacktoNormal()}>Back</button>
            <div className="time-line-container">

              <TimeLine data={gattDAta} config={config2} mode="year" />

            </div>
            <div>

            </div>
          </div>
      }
      <AddBudgetPage getUserDetailsFunc={getUserDetailsFunc} show={showAddPage} handleClose={onHandleClose} />
      <EditBudgetPage
        projectNumber={projectNumber}
        editId={editId}
        getUserDetailsFunc={getUserDetailsFunc}
        show={showEditBudgetPage}
        handleClose={onHandleCloseEdit}
        expPerCycle={expPerCycle}
        setexpPerCycle={setexpPerCycle}
        unit={unit}
        setunit={setunit}
        MainDesc={MainDesc}
        setMainDesc={setMainDesc}
        SubDes={SubDes}
        setSubDes={setSubDes}
        ExpFreq={ExpFreq}
        setExpFreq={setExpFreq}
        expCycle={expCycle}
        setexpCycle={setexpCycle}
        balance={balance} setbalance={setbalance}
        lifeTimeBudg={lifeTimeBudg}
        setlifeTimeBudg={setlifeTimeBudg}
        expTillDate={expTillDate}
        setExptillDate={setExptillDate}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        status={status}
        setStatus={setStatus}
        timetask={timetask}
        setTimetask={setTimetask}
      />


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}


export default BudgetPage;
