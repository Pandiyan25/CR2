
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from "../../../paginationfunction"

import { async } from 'regenerator-runtime';

const RoadmapPage = () => {

    const [saveId, setsaveId] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [MainDesc, setMainDesc] = useState('')
    const [SubDesc, setSubDesc] = useState('')
    const [NoofWorking, setNoofWorking] = useState('')
    const [Status, setStatus] = useState('')
    const [editNew, setEditNew] = useState(false)
    const [tokenStd, settokenStd] = useState([])
    const [tokenStdPer, settokenStdPer] = useState([])
    const [checkData, setCheckPage] = useState('')
    const [showAddPage, setShowAddPage] = useState(false)
    const [showEditPage, setShowEditPage] = useState(false)
    const [data, setData] = useState([
        { id: 1, mainDesc: "Funding", subDesc: 'Seed Sale', noofworkingDays: '30', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Completed' },
        { id: 2, mainDesc: "Funding", subDesc: "Stragetic & Presale", noofworkingDays: '60', createddate: "11 Mar 2019", duedate: "11 Mar 2019", status: 'Ongoing' },
    ]);

    const getUserDetailsFunc = () => {

        try {


            var query = `query AllProjectRoadmap($project: ID) {
                allProjectRoadmap(project: $project) {
                  _id
               
                  current_date
                  start_date
                  end_date
                  main_description
                  sub_description
                  no_of_working_days
                  status
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
                    console.log('getFounderUserDetails', data?.data?.allProjectRoadmap);
                    if (data?.data?.allProjectRoadmap != null && data?.data?.allProjectRoadmap != undefined && data?.data?.allProjectRoadmap.length > 0) {
                        setCheckPage(data?.data?.allProjectRoadmap[0]._id)
                        settokenStd(data?.data?.allProjectRoadmap)
                    } else {
                        setCheckPage('')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)
    var date = new Date();

    const datetime =

        date.getDate() +
        "-" +
        (date.getMonth() + 1) +
        "-" + date.getFullYear();


    

    const columns = [

        {
            title: 'Main Description',
            dataIndex: 'main_description',

            align: 'center',
            sorter: (a, b) => a.main_description.length - b.main_description.length,
        },
        {
            title: 'Sub Description',
            dataIndex: 'sub_description',
            sorter: (a, b) => a.sub_description.length - b.sub_description.length,
            align: 'center',
        },

        {
            title: 'Start Date',
            dataIndex: 'start_date',
            sorter: (a, b) => a.start_date.length - b.start_date.length,
            align: 'center',
        },
        {
            title: 'Number of Working Days',
            dataIndex: 'no_of_working_days',

            sorter: (a, b) => a.no_of_working_days.length - b.no_of_working_days.length,
            align: 'center',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            sorter: (a, b) => a.end_date.length - b.end_date.length,
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            align: 'center',
        },

    ]
  
    
    
    const TodayDate = new Date();



    var date = TodayDate.toISOString().substr(0, 10);
    //   console.log(TodayDate, "TodayDate");
    // const futureDate = date.getDate() + 3;
    // date.setDate(futureDate);
    // const defaultValue = date.toLocaleDateString('en-US');
   
    
    useEffect(() => {
        if (projectNumber != '') {
            getUserDetailsFunc()
        }

    }, [projectNumber])


    console.log(tokenStd, "tokenStd");
    return (

        <div className="card card-table flex-fill">

            <div className="card-body">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row align-items-center" style={{ width: '100%' }}>
                            <div className="col">
                                <h3 className="page-title" style={{ fontSize: '25px' }}>Roadmap</h3>
                            </div>
                            <div className="col-auto float-right ml-auto">
                                <button className="btn add-btn2" style={{ margin: '10px' }}> VIEW</button>
                                {/* onClick={() => openEditMapfunc()} */}
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    {/* Search Filter */}

                    <div className="row filter-row">
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
                                <input className="form-control floating datetimepicker" defaultValue={date} type="date" style={{ height: '35px' }} />
                            </div>
                            <div className="subMainDiv">
                                <h5 className="subMainDivH5" style={{
                                    fontWeight: '600', marginBottom: '0px'
                                }}>To Date:</h5>
                                <input className="form-control floating datetimepicker" defaultValue={date} type="date" style={{ height: '35px' }} />
                            </div>
                        </div>
                        <div className="col-md-2" style={{ padding: '0px' }}>
                            <div className="">
                                <button className="btn2 add-btn3"> Search</button>
                            </div>
                        </div>

                    </div>
                    

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

                    <div className="col-md-12">

                        <div className="row">
                            <div className="col-md-12" style={{ padding: '0px' }}>
                                <div className="card card-table flex-fill">

                                    <div className="card-body">
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
                   
                </div>
            </div>
        </div>
    );
}


export default RoadmapPage;
