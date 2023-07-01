
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { ToastContainer, toast } from 'material-react-toastify';
import chart from "./Budget/assets/chart.png"
import 'material-react-toastify/dist/ReactToastify.css';
import { CanvasJSChart } from 'canvasjs-react-charts'
import { Upload, Icon, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import "../../antdstyle.css"
import AddRoadMap from './AddRoadMap';
import EditRoadMap from './EditRoadMap';
import { apiURI } from '../../../config/config';
import readXlsxFile from 'read-excel-file'
import { Downloaddata2 } from './ExcelBudgetDownload';
import writeXlsxFile from 'write-excel-file'
import './roadMap.css'
import TimeLine from "react-gantt-timeline";
import { PieChart } from 'react-minimal-pie-chart';

import { Button } from 'reactstrap';
import { async } from 'regenerator-runtime';


const RoadmapPage = () => {
  const [RoadMapDashboard, setRoadMapDashboard] = useState([])
  const [gattDAta, setGattDAta] = useState([])
  const [bannersData, setBannersData] = useState([])
  const [endDateErr, setEndDateErr] = useState(false)
  const [MainDesceErr, setMainDesceErr] = useState(false)
  const [NoofWorkingErr, setNoofWorkingErr] = useState(false)
  const [SubDesceErr, setSubDesceErr] = useState(false)
  const [StatusErr, setStatusErr] = useState(false)
  const [startDateErr, setstartDateErr] = useState(false)

  // const [toDate, setToDate] = useState('')
  // const [fromDateSearch, setFromDateSearch] = useState('')


  const [MileStoneData, setMileStoneData] = useState([])
  const hiddenFileInput2 = React.useRef(null);
  const [toDate, setToDate] = useState('')
  const [mydata, setMydata] = useState()
  const [fromDateSearch, setFromDateSearch] = useState('')
  const [showGatthChart, setShowGatthChart] = useState(false)
  const [saveId, setsaveId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [MainDesc, setMainDesc] = useState('')
  const [SubDesc, setSubDesc] = useState('')
  const [NoofWorking, setNoofWorking] = useState(0)
  const [Status, setStatus] = useState('')
  const [editNew, setEditNew] = useState(false)
  const [tokenStd, settokenStd] = useState([])
  const [tokenStdPer, settokenStdPer] = useState([])
  const [checkData, setCheckPage] = useState('')
  const projectNumber = useSelector((state) => state.constVar.projectId)
  const [showAddPage, setShowAddPage] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)

  const [statusError, setstatusError] = useState(false)

  const [endDateError, setEndDateError] = useState(false)
  const [mainDescError, setMainDescError] = useState(false)
  const [subDesError, setSubDesError] = useState(false)
  const [startDateError, setstartDateError] = useState(false)

  const [data, setData] = useState([
    { id: 1, mainDesc: "Funding", subDesc: 'Seed Sale', noofworkingDays: '30', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Completed' },
    { id: 2, mainDesc: "Funding", subDesc: "Stragetic & Presale", noofworkingDays: '60', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Ongoing' },
  ]);

  const onHandleClose = () => {
    setShowAddPage(false)
    getUserDetailsFunc()

  }
  function beforeUpload(file) {
    console.log(file.type);
    const isXls = file.type === 'application/vnd.xlsx';
    if (!isXls) {
      message.error('You can only upload XLS file!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return isXls && isLt2M;
  }

  const disablePastDate = () => {
    const today = new Date(fromDateSearch);
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };


  const loginId = useSelector((state) => state.constVar.loginId)
  var date = new Date();

  const datetime =

    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" + date.getFullYear();

  const config = {
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



  const downloadBugetDatafunc = async () => {
    console.log("downloadBugetDatafunc", "downloadBugetDatafunc");
    await writeXlsxFile(Downloaddata2, {
      // (optional) column widths, etc.
      fileName: 'roadmap.xlsx'
    })
  }

  const uploadExcelData = async (event) => {
    const e = event.target.files[0];
    console.log(e.type, "application/vnd.xlsx");
    if (e.type == 'application/vnd.xlsx' || e.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

      await readXlsxFile(e).then((rows) => {
        console.log("upload document data", rows);
        // var
        for (var i = 1; i < rows.length; i++) {
          console.log(rows[i], "sssss");
          createTokenFuncforExcel(rows[i])
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
  const createTokenFuncforExcel = (i) => {
    // if(endDate != ''  &&  MainDesc != '' && SubDesc != '' && NoofWorking!= '' && Status != '' && startDate != '' ){
    var statusType = ''
    if (i[5] == 'Ongoing' || i[5] == 'On going' || i[5] == 'On Going') {
      statusType = "Ongoing"
    } else if (i[5] == 'Yet to Start' || i[5] == 'Yet_to_Start') {
      statusType = "Yet_to_Start"
    } else if (i[5] == 'Completed') {
      statusType = "Completed"
    } else {
      statusType = "Ongoing"
    }
    try {
      var query = `
            mutation Mutation($input: RoadmapInput) {
                createProjectRoadmap(input: $input) {
                  _id
                  current_date
                  start_date
                  end_date
                  main_description
                  sub_description
                  no_of_working_days
                  status
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
              "current_date": date,
              "start_date": i[2],
              "end_date": i[4],
              "main_description": i[0],
              "sub_description": i[1],
              "no_of_working_days": i[3],
              "status": statusType,
            }


          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          getUserDetailsFunc()
          // handleClose()
        })


    } catch (error) {
      console.log("adding new projectDetail error");
    }

    // }else{
    //     alert("Please fill all the mandatory fields")
    // }

  }


  const columns = [

    {
      title: 'Main Description',
      dataIndex: 'main_description',
      sorter: (a, b) => a?.main_description.localeCompare(b?.main_description),

      align: 'center',
      // sorter: (a, b) => a.main_description.length - b.main_description.length,
    },
    {
      title: 'Sub Description',
      dataIndex: 'sub_description',
      sorter: (a, b) => a?.sub_description.localeCompare(b?.sub_description),
      // sorter: (a, b) => a.sub_description.length - b.sub_description.length,
      align: 'center',
    },

    {
      title: 'Start Date',
      dataIndex: 'start_date',
      sorter: (a, b) => new Date(a?.start_date) - new Date(b?.start_date),
      
      // sorter: (a, b) => a.start_date.length - b.start_date.length,
      align: 'center',
    },
    {
      title: 'Number of Working Days',
      // dataIndex: 'no_of_working_days',

      render: (text, record) => (
        <div>

          {Number(text?.no_of_working_days).toLocaleString("en-US")}
        </div>
      ),

      sorter: (a, b) => a?.no_of_working_days - b?.no_of_working_days,
      // sorter: (a, b) => a.no_of_working_days.length - b.no_of_working_days.length,
      align: 'center',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      sorter: (a, b) => new Date(a?.end_date) - new Date(b?.end_date),
      // sorter: (a, b) => a.end_date.length - b.end_date.length,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a?.status.localeCompare(b?.status),
      // sorter: (a, b) => a.status.length - b.status.length,
      align: 'center',
    },
    {
      title: 'Option',
      // dataIndex: 'duedate',
      render: (text, record) => (
        // <div className="col-auto float-right ml-auto">
        //   <button className="btn add-btn2" >Edit</button>
        // </div>

        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>

          <Button style={{ padding: '0px ', border: '2px solid #1890ff', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px', background: '#1890ff' }} onClick={() => editFuncon1(text)}><i className="fa fa-pencil" /></Button>
          <Button style={{ padding: '0px ', border: '2px solid #1890ff', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px', background: '#1890ff' }} onClick={() => deleteBudgetPage(text._id)}><i className="fa fa-trash"></i></Button>
          {/* onClick={() => deleteFunc(text._id)} */}
        </div>
      ),
      align: 'center',
    },

  ]

  const deleteBudgetPage = (i) => {
    console.log(i, "i.daata");

    try {


      var query = `
          mutation($id: ID){
            deleteProjectRoadmap(_id: $id) {
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
            "id": i
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          if (data?.data?.deleteProjectRoadmap != null && data?.data?.deleteProjectRoadmap != undefined) {

            getUserDetailsFunc()
          } else {
            alert('please check the details')
          }

        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }

  const handleCloseEditPopup = () => {
    setEditNew(false)
    setShowEditPage(false)
  }

  const editFuncon = (i) => {
    setEditNew(true)
    settokenStdPer([i])
  }
  const editFuncon1 = (i) => {
    console.log(i, "i.data");
    setEditNew(true)
    setsaveId(i._id)
    setStartDate(i.start_date)
    setEndDate(i.end_date)
    setMainDesc(i.main_description)
    setSubDesc(i.sub_description)
    setNoofWorking(i.no_of_working_days)
    setStatus(i.status)
    settokenStdPer([i])
    setShowEditPage(true)
  }
  // const onHandleClose = () => {
  //     setShowAddPage(false)
  // }
  const onHandleEditClose = () => {
    setShowEditPage(false)
    getUserDetailsFunc()
  }

  const openEditMapfunc = () => {

    setShowGatthChart(true)
  }
  const openAddMapfunc = () => {
    setShowAddPage(true)
  }
  const TodayDate = new Date();


  const handleClickFile2 = event => {
    hiddenFileInput2.current.click();
  };


  var date = TodayDate.toISOString().substr(0, 10);
  //   console.log(TodayDate, "TodayDate");
  // const futureDate = date.getDate() + 3;
  // date.setDate(futureDate);
  // const defaultValue = date.toLocaleDateString('en-US');
  const getUserDetailsFunc = (i, date) => {
    var todateMain = ''
    var fromdateMain = ''
    if (i == "todate") {
      todateMain = date
      fromdateMain = fromDateSearch
    } else if (i == "fromdate") {

      todateMain = toDate
      fromdateMain = date
    } else {
      fromdateMain = ''
      todateMain = ''
    }
    try {


      var query = `query AllProjectRoadmap($from: Date, $to: Date, $project: ID) {
                allProjectRoadmap(from: $from, to: $to, project: $project) {
                  _id
               
                  current_date
                  start_date
                  end_date
                  main_description
                  sub_description
                  no_of_working_days
                  status
                }
                getRoadmapDashboard(project: $project) {
                  no_of_milesones
                  milestone_completed
                  yet_to_start
                  milestone_in_progress
                  milestone_overdue
                  reporting_cycles
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

            "from": fromdateMain,
            "to": todateMain,
          }

        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then(data => {
          console.log('getFounderUserDetails', data?.data?.allProjectRoadmap);
          if (data?.data?.allProjectRoadmap != null && data?.data?.allProjectRoadmap != undefined && data?.data?.allProjectRoadmap.length > 0) {
            setCheckPage(data?.data?.allProjectRoadmap[0]._id)


            var tokenArr = [];
            for (var j = 0; j < data?.data?.allProjectRoadmap.length; j++) {

              var projectCurrentDate = data?.data?.allProjectRoadmap[j]?.start_date

              projectCurrentDate = projectCurrentDate?.split('T')[0];

              var dashboardDate = data?.data?.allProjectRoadmap[j]?.end_date
              dashboardDate = dashboardDate?.split('T')[0];

              tokenArr.push({
                "_id": data?.data?.allProjectRoadmap[j]?._id,
                "current_date": data?.data?.allProjectRoadmap[j]?.current_date,
                "start_date": projectCurrentDate,
                "end_date": dashboardDate,
                "main_description": data?.data?.allProjectRoadmap[j]?.main_description,
                "sub_description": data?.data?.allProjectRoadmap[j]?.sub_description,
                "no_of_working_days": data?.data?.allProjectRoadmap[j]?.no_of_working_days,
                "status": data?.data?.allProjectRoadmap[j]?.status
              })
            }
            settokenStd(tokenArr)


            var arr = []
            for (var i = 0; i < data?.data?.allProjectRoadmap.length; i++) {
              arr.push({
                // main_expense_head 
                name: data?.data?.allProjectRoadmap[i].main_description,
                start: data?.data?.allProjectRoadmap[i].start_date,
                end: data?.data?.allProjectRoadmap[i].end_date,
                id: i + 1,
                color: "orange"
              })
              setGattDAta(arr)
            }

            var tokenarr = [];
            for (var i = 0; i < data?.data?.allProjectRoadmap.length; i++) {
              console.log(parseInt(data?.data?.allProjectRoadmap[i].unit), "getFounderUserDetailsBudgets");
              tokenarr.push({
                id: i,
                name: data?.data?.allProjectRoadmap[i].main_expense_head,
                y: parseInt(data?.data?.allProjectRoadmap[i].no_of_working_days)

              })


              console.log(tokenarr, "tokenarr");

              setMydata(tokenarr)
            }

          } else {
            setCheckPage('')
            settokenStd([])
            setGattDAta([])
            setMydata([])
          }

          if (data?.data?.getRoadmapDashboard != null && data?.data?.getRoadmapDashboard != undefined) {
            setRoadMapDashboard([data?.data?.getRoadmapDashboard])


            var milestonechart = [];
            if (data?.data?.getRoadmapDashboard?.milestone_completed != null && data?.data?.getRoadmapDashboard?.milestone_completed != undefined && data?.data?.getRoadmapDashboard?.milestone_completed != 0) {
              milestonechart.push({
                name: 'Milestone Completed',
                y: parseInt(data?.data?.getRoadmapDashboard.milestone_completed),
                color: '#026a0ddb'
              })
            } else {
              milestonechart.push({
                name: 'Milestone Completed',
                y: 0,
                color: '#026a0ddb'
              })
            }

            if (data?.data?.getRoadmapDashboard?.milestone_in_progress != null && data?.data?.getRoadmapDashboard?.milestone_in_progress != undefined && data?.data?.getRoadmapDashboard?.milestone_in_progress != 0) {
              milestonechart.push({
                name: 'Milestone In Progress',
                y: parseInt(data?.data?.getRoadmapDashboard.milestone_in_progress),
                color: '#6345ED'
              })
            } else {
              milestonechart.push({
                name: 'Milestone In Progress',
                y: 0,
                color: '#6345ED'
              })
            }

            if (data?.data?.getRoadmapDashboard?.yet_to_start != null && data?.data?.getRoadmapDashboard?.yet_to_start != undefined && data?.data?.getRoadmapDashboard?.yet_to_start != 0) {
              milestonechart.push({
                name: 'Yet to Start',
                y: parseInt(data?.data?.getRoadmapDashboard.yet_to_start),
                color: '#94B3E8'
              })
            } else {
              milestonechart.push({
                name: 'Yet to Start',
                y: 0,
                color: '#94B3E8'
              })
            }

            console.log(milestonechart, "arrmilestonechart");
            // ,
            // {
            //   title:'Milestone Completed',
            //   value:parseInt(data?.data?.getRoadmapDashboard.milestone_completed),
            //   color:'#6345ED'
            // }
            // {
            //   title:'Milestone Completed',
            //   value:parseInt(data?.data?.getRoadmapDashboard.milestone_completed),
            //   color:'#6345ED'
            // }

            // )



            setMileStoneData(milestonechart)



          } else {
            setRoadMapDashboard([])
          }


        })
    }
    catch (error) {
      console.log(error, "error in Founder Project");
    }
  }
  const updateTokenFunc = () => {
    if (endDate != '' && endDate != null && MainDesc != '' && MainDesc != null && SubDesc != '' && SubDesc != null && NoofWorking != '' && NoofWorking != null && Status != '' && Status != null && startDate != '' && startDate != null) {
      try {
        var query = `
                mutation Mutation($id: ID, $input: RoadmapInput) {
                    updateProjectRoadmap(_id: $id, input: $input) {
                      _id
                     
                      current_date
                      start_date
                      end_date
                      main_description
                      sub_description
                      no_of_working_days
                      status
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
              "id": saveId,
              "input": {
                "project": projectNumber,
                "end_date": endDate,
                "main_description": MainDesc,
                "sub_description": SubDesc,
                "no_of_working_days": parseInt(NoofWorking),
                "status": Status,
                "start_date": startDate
              }
            }

          })
        })
          .then((response) => {

            const json = response.json();
            return json;
          })
          .then(data => {
            getUserDetailsFunc()

            handleCloseEditPopup()
          })


      } catch (error) {
        console.log("adding new projectDetail error");
      }
    } else {
      if (endDate != '' && endDate != null) {
        setEndDateErr(false)
      } else {
        setEndDateErr(true)
      }
      if (MainDesc != '' && MainDesc != null) {
        setMainDesceErr(false)
      } else {
        setMainDesceErr(true)
      }
      if (SubDesc != '' && SubDesc != null) {
        setSubDesceErr(false)
      } else {
        setSubDesceErr(true)
      }
      if (NoofWorking != '' && NoofWorking != null) {
        setNoofWorkingErr(false)
      } else {
        setNoofWorkingErr(true)
      }
      if (Status != '' && Status != null) {
        setStatusErr(false)
      } else {
        setStatusErr(true)
      }
      if (startDate != '' && startDate != null) {
        setstartDateErr(false)
      } else {
        setstartDateErr(true)
      }

      // alert("Please fill all the mandatory fields")
    }



  }

  useEffect(() => {
    if (projectNumber != '') {
      getUserDetailsFunc()
    }

  }, [projectNumber])
  console.log(tokenStd, "tokenStd");
  const goBacktoNormal = () => {
    setShowGatthChart(!showGatthChart)
  }


  const options = {
    animationEnabled: true,
    title: {
      text: ""
    },
    // subtitles: [{
    //     text: "71% Positive",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###'%'",
      dataPoints: mydata,
    }]
  }


  const changeDateFunc = (e) => {
    setToDate(e.target.value)

    getUserDetailsFunc("todate", e.target.value)

  }

  const changeFromDateFunc = (e) => {
    setFromDateSearch(e.target.value)

    getUserDetailsFunc("fromdate", e.target.value)

  }

  const optionsss = {
    animationEnabled: true,
    background: '#f8fbff',
    theme: "light2",
    title: {
      text: "Milestone",
      fontSize: 20,
      // verticalAlign: "bottom",
      dockInsidePlotArea: true
    },
    // subtitles: [{
    //     text: "71% Positive",
    //     verticalAlign: "center",
    //     fontSize: 24,
    //     dockInsidePlotArea: true
    // }],
    data: [{
      type: "doughnut",
      radius: "90%",  //change the radius here.
      showInLegend: true,
      indexLabel: "{name}: {y}",
      yValueFormatString: "#,###",
      dataPoints: MileStoneData,
    }]
  }
  return (

    <div className="card card-table flex-fill" style={{ border: 'none' ,margin:'0px' }}>

      {
        showGatthChart == false ?
          <div className="card-body">

            <div className="content container-fluid" style={{ padding: "0px" }}>

              {/* budget detail */}
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Roadmap</h2>
              <div className="row mb-2" >


                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.no_of_milesones != null && RoadMapDashboard[0]?.no_of_milesones != undefined && RoadMapDashboard[0]?.no_of_milesones != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].no_of_milesones)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={705450}
                              duration={1.5} /> */}






                            </h3>


                          </div>
                          <span className="widget-box ft-weight">Number of Milestones</span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 " style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.milestone_completed != null && RoadMapDashboard[0]?.milestone_completed != undefined && RoadMapDashboard[0]?.milestone_completed != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].milestone_completed)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={4153900}
                              duration={1.5} /> */}
                            </h3>

                          </div>
                          <span className="widget-box ft-weight">Milestone completed</span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.milestone_in_progress != null && RoadMapDashboard[0]?.milestone_in_progress != undefined && RoadMapDashboard[0]?.milestone_in_progress != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].milestone_in_progress)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={4000000}
                              duration={1.5} /> */}
                            </h3>

                          </div>
                          <span className="widget-box ft-weight">Milestone in progress </span>
                        </div>

                        {/* <h3 className="mainFontH4">Take info from fund raise tab of founders</h3> */}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.yet_to_start != null && RoadMapDashboard[0]?.yet_to_start != undefined && RoadMapDashboard[0]?.yet_to_start != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].yet_to_start)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={50000000}
                              duration={1.5} /> */}
                            </h3>

                          </div>
                          <span className="widget-box ft-weight">Yet to start</span>
                        </div>

                        {/* <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.milestone_overdue != null && RoadMapDashboard[0]?.milestone_overdue != undefined && RoadMapDashboard[0]?.milestone_overdue != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].milestone_overdue)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={4859350}
                              duration={1.5} /> */}
                            </h3>

                          </div>
                          <span className="widget-box ft-weight">Milestone Overdue</span>
                        </div>

                        {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-12 col-sm-12" style={{margin:'10px 0px'}}>
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                          <div className="widget-info-new mb-2">
                            {/* 112 */}
                            <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                              {RoadMapDashboard?.length > 0 && RoadMapDashboard[0]?.reporting_cycles != null && RoadMapDashboard[0]?.reporting_cycles != undefined && RoadMapDashboard[0]?.reporting_cycles != 0 ?
                                <CountUp end={parseInt(RoadMapDashboard[0].reporting_cycles)}
                                  separator=","
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                              {/* <CountUp end={140650}
                              duration={1.5} /> */}
                            </h3>

                          </div>
                          <span className="widget-box ft-weight">Reporting Cycles</span>
                        </div>

                        {/* <h3 className="mainFontH4">Calculate</h3> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3 pl-4" style={{ display: "flex", justifyContent: 'center', height: '500px' }}>
                  {/* <div className="row">
                    <div className="col" style={{ textAlign: "center" }}> */}
                  <div style={{ height: '200px', width: '100%' }}>
                    {MileStoneData.length > 0
                      ?
                      // <PieChart
                      //   animate
                      //   animationDuration={500}
                      //   animationEasing="ease-out"
                      //   labelPosition={45}
                      //   lineWidth={20}
                      //   data={MileStoneData}
                      // />

                      <div style={{ width: '100%', height: '270px' }}>
                        <CanvasJSChart options={optionsss} height="100%" width="100%" />
                      </div>
                      :
                      <PieChart
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        labelPosition={45}
                        lineWidth={20}
                        data={[
                          { title: 10, value: 10, color: '#94B3E8' },
                          { title: 0, value: 0, color: '#6345ED' },
                        ]}
                      />

                    }

                  </div>
                  {/* <img className="chart" src={chart}></img> */}
                  {MileStoneData.length > 0
                    ?
                    <>
                    </>
                    :
                    <h4 style={{ fontFamily: "'Poppins', sans-serif" }}>Milestone</h4>
                  }

                  {/* </div>
                  </div> */}
                  {/* <div className="profile"></div>
                    <div className="profile"></div> */}
                </div>


              </div>
              {/* budget details end */}












              {/* old design */}
              {/* 
              <div className="page-header">
                <div className="row align-items-center" style={{ width: '100%' }}>
                  <div className="col">
                    <h3 className="page-title" style={{ fontSize: '25px' }}>Budget</h3>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => openAddMapfunc()}> ADD</button>
                    <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> VIEW</button>
                  </div>
                </div>
              </div> */}
              {/* /Page Header */}
              {/* Search Filter */}

              {/* <div className="row filter-row">
                <div className="col-md-3" style={{ padding: '0px' }}>
                  <div className="dateDiv">
                    <h5 style={{
                      fontWeight: '600', marginBottom: '0px'
                    }}>Current Date:</h5>
                    <h5 style={{ marginBottom: '0px' }}>{datetime}</h5>
                  </div>
                </div>
                <div className="col-md-7 dateMainDiv">
                  <div className="subMainDiv">
                    <h5 className="subMainDivH5" style={{
                      fontWeight: '600', marginBottom: '0px'
                    }} >From Date:</h5>
                    <input className="form-control floating datetimepicker" type="date" onChange={(e) => setFromDateSearch(e.target.value)} style={{ height: '35px' }} />
                  </div>
                  <div className="subMainDiv">
                    <h5 className="subMainDivH5" style={{
                      fontWeight: '600', marginBottom: '0px'
                    }}>To Date:</h5>
                    <input className="form-control floating datetimepicker" type="date" min={disablePastDate()} style={{ height: '35px' }} onChange={(e) => setToDate(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-2" style={{ padding: '0px' }}>
                  <div className="">
                    <button className="btn2 add-btn3" onClick={() => getUserDetailsFunc()}> Search</button>
                  </div>
                </div> */}

              {/* </div>
              <div className="page-header">
                <div className="row align-items-center" style={{ width: '100%' }}>
                  <div className="col"> */}
              {/* <h3 className="page-title" style={{ fontSize: '25px' }}>Roadmap</h3> */}
              {/* </div>
                  <div className="col-auto float-right ml-auto">
                    <input className="btn add-btn-search" type="file" placeholder='Upload File' style={{ margin: '10px' }} onChange={(e) => uploadExcelData(e.target.files[0])} /> */}
              {/* <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => openEditMapfunc()}> Upload File</button> */}
              {/* <Upload
                      accept="application/vnd.xlsx"
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={(e) => {uploadExcelData(e.target.files[0]);
                      }
                    >
                      <div className="ant-upload-text">Upload</div>

                    </Upload> */}
              {/* <button className="btn add-btn-search" style={{ margin: '10px' }} onClick={() => downloadBugetDatafunc()}> Download Sample Format</button>
                  </div>
                </div>
              </div> */}

              {/* <div className="row filter-row">
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <div>
                                <input className="form-control floating datetimepicker" type="date" />
                            </div>
                            <label className="focus-label">From</label>
                        </div>
                        
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <div className="form-group form-focus select-focus">
                            <div>
                                <input className="form-control floating datetimepicker" type="date" />
                            </div>
                            <label className="focus-label">To</label>
                        </div>
                    </div>
                   
                    <div className="col-sm-6 col-md-3">
                        <a href="#" className="btn btn-success btn-block"> Search </a>
                    </div>
                </div> */}
              {/* /Search Filter */}
              {/* old design end */}





























              <div className="col-md-12 " style={{ padding: '0px', display: 'flex', flexDirection: 'row' }}>

              </div>



              <div className="col-md-12" style={{ padding: '0px' }}>


                <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                  <div className="col" style={{ padding: '0px' }}>
                    <div className="search " style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      {/* <input
                        placeholder="Search"
                        style={{ width: '300px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      /> */}


                      <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 className="" style={{
                          fontWeight: '600', marginBottom: '0px', width: '40%'
                        }} >From Date:</h5>
                        <input className="form-control floating datetimepicker" type="date" max={toDate} onChange={(e) => changeFromDateFunc(e)} style={{ height: '35px', width: '155px' }} />
                      </div>
                      <div className="" style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                        <h5 className="" style={{
                          fontWeight: '600', marginBottom: '0px', width: '40%'
                        }}>To Date:</h5>
                        <input className="form-control floating datetimepicker" type="date" min={fromDateSearch} style={{ height: '35px', width: '155px' }} onChange={(e) => changeDateFunc(e)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-auto float-right ml-auto" style={{ padding: '0px' }}>
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









              <div className="col-md-12" style={{ marginTop: '15px' }}>

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
                    {/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box">Life Time Budget </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}>
                              {bannersData?.length > 0 && bannersData[0]?.lifetime_budget != 0 ?
                                <CountUp end={parseInt(bannersData[0].lifetime_budget)}
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }

                            </h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Take Info from fundraise tab of founders</h3>
                      </div>
                    </div> */}
                    {/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box">Actual Expense Till Date </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> 
                            {bannersData?.length > 0 && bannersData[0]?.actual_expense_till_date != 0 ?
                                <CountUp end={parseInt(bannersData[0].actual_expense_till_date)}
                                  duration={1.5} />
                                :
                                <CountUp end={0}
                                  duration={1.5} />
                              }
                            <CountUp end={4859350}
                              duration={1.5} />
                              </h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Info from budget page</h3>
                      </div>
                    </div> */}
                    {/* <div className="col-md-4 ">
                      <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                        <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                          <span className="widget-box"> Balance Budget </span>
                          <div className="widget-info-new">
                            112
                            <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> 
                            <CountUp end={140650}
                              duration={1.5} /></h3>

                          </div>
                        </div>

                        <h3 className="mainFontH4">Calculate</h3>
                      </div>
                    </div> */}
                  </div>









                  {/* <div className="row">

                    <div className="col-md-12 " style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <label style={{ marginRight: '15px', color: 'black', fontWeight: '500' }}>Select Reporting Cycle Frequency <span className="text-danger">*</span></label>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '190px' }}>
                            <div style={{ width: '100%' }} >
                              <select className="form-control btn-block-height square-edges" > */}
                  {/* <option style={{ fontSize: '13px' }} value="Monthly">Monthly</option> */}
                  {/* <option style={{ fontSize: '13px' }} value="Quarter ">Quarter </option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </div> */}

                  {/* <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="form-group">
                          <button style={{ border: '2px solid #6345ED', color: '#6345ED', borderRadius: '50px', width: '100px', height: '40px' }} onClick={() => changeFunc()}>
                            Change
                          </button>
                        </div>
                      </div> */}
                  {/* </div>
                  </div> */}
                  {/* <div className="row"> */}
                  {/* <div className="col-md-4 ">
                  <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                      <span className="widget-box">Select Reporting Cycle Frequency :</span>
                      <div className="widget-info-new">
                        112
                        <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>Month or Quarter</h5>

                      </div>
                    </div>

                    <h3 className="mainFontH4">Select Option</h3>
                  </div>
                </div> */}
                  {/* <div className="col-md-12 ">

                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">No of Reporting Cycles </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}> */}
                  {/* {bannersData?.length > 0 && bannersData[0]?.no_of_reporting_cycles != null && bannersData[0]?.no_of_reporting_cycles != undefined && bannersData[0]?.no_of_reporting_cycles != 0 ?

                                  <CountUp end={bannersData[0]?.no_of_reporting_cycles}
                                    duration={1.5} />
                                  :

                                  <CountUp end={0}
                                    duration={1.5} />
                                }
                              </h3> */}
                  {/* 
                            </div>
                          </div>
                        </div> */}

                  {/* <h3 className="mainFontH4">calculate based on select option</h3> */}
                  {/* </div>
                    </div>
                    <div className="col-md-12 ">

                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Shortfall/ Excess Cash Flow </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h3 className="mainFontH5" style={{ marginBottom: '0px',fontFamily:"'Poppins', sans-serif ",fontSize:"25px",color:"#6345ED" }}>
                                <CountUp end={859350}
                                  duration={1.5} /></h3> */}

                  {/* </div>
                          </div> */}

                  {/* <h3 className="mainFontH4">calculate based on select option</h3> */}
                  {/* </div>
                      </div>
                    </div> */}
                  {/* </div> */}
                  {/* <div className="row">
                    <div className="col-md-12 "> */}

                  {/* <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Budget Start Date </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* 
                              <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>{bannersData?.length > 0 && bannersData[0]?.project_start_date}</h5>

                            </div>
                          </div> */}

                  {/* <h3 className="mainFontH4">Select Option</h3> */}
                  {/* </div>
                      </div>
                    </div>
                    <div className="col-md-12 "> */}
                  {/* 
                      <div className="col-md-6" style={{ padding: '0px' }}>
                        <div className="dash-wid" style={{ height: '45px', padding: '0px', border: '0px' }}>
                          <div className="card-body" style={{ textAlign: 'left',padding:"10px" }}>
                            <span className="widget-box">Budget End Date </span>
                            <div className="widget-info-new"> */}
                  {/* 112 */}
                  {/* <h5 className="mainFontH5text" style={{ marginBottom: '0px' }}>{bannersData?.length > 0 && bannersData[0]?.project_end_date}</h5>

                            </div>
                          </div>
                        </div> */}

                  {/* <h3 className="mainFontH4">Select Option</h3> */}
                  {/* </div>
                    </div>
                  </div> */}

                </div>
                :
                ''
              }
              <AddRoadMap show={showAddPage} handleClose={onHandleClose} getUserDetailsFunc={getUserDetailsFunc} />
              <EditRoadMap
                // show={showEditPage} handleClose={onHandleEditClose}

                MainDesc={MainDesc}
                SubDesc={SubDesc}
                NoofWorking={NoofWorking}
                Status={Status}
                startDate={startDate}
                endDate={endDate}
                settokenStdPer={settokenStdPer}
                getUserDetailsFunc={getUserDetailsFunc}
                show={showEditPage}
                handleClose={onHandleEditClose}

                setStartDate={setStartDate}
                setEndDate={setEndDate}
                setMainDesc={setMainDesc}
                setSubDesc={setSubDesc}
                setNoofWorking={setNoofWorking}
                updateTokenFunc={updateTokenFunc}
                setStatus={setStatus}
                NoofworkingDaysError={NoofWorkingErr}
                endDateError={endDateErr}
                mainDescError={MainDesceErr}
                subDesError={SubDesceErr}
                startDateError={startDateErr}
                statusError={StatusErr}
                setEndDateError={setEndDateError}
                setMainDescError={setMainDescError}
                setSubDesError={setSubDesError}
                setstartDateError={setstartDateError}
                setstatusError={setstatusError}
              />
            </div>










          </div>
          :
          <div className="app-container">
            <button style={{ border: '1px solid #6345ED', borderRadius: '15px', padding: '5px', height: '35px', width: '75px', margin: '10px' }} onClick={() => goBacktoNormal()}>Back</button>
            <div className="time-line-container">

              <TimeLine data={gattDAta} config={config} mode="year" />

            </div>

            <div>
              <div style={{ width: '100%', height: '500px', marginTop: '10px' }}>
                <CanvasJSChart options={options} height="100%" width="100%" />
              </div>
            </div>
          </div>
      }

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


export default RoadmapPage;
