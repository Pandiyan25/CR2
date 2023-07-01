import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";

import { gql, useMutation } from '@apollo/client';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { apiURI } from '../../../../config/config';


const UPLOAD_FILE = gql`
mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
    singleUpload(file: $file, input: $input) {
      filename
      mimetype
      encoding
      url
      filepath
      ext
    }
  }`;

function TimeLinePageRoute({ selectPrevProposal, show, handleClose }) {
    
    const [WorkLink, setWorkLink] = useState('')
    const [EndDate, setEndDate] = useState('')
    const [MainDesc, setMainDesc] = useState('')
    const [subDesc, setSubDesc] = useState('')
    const [Remarks, setRemarks] = useState('')
    const [checked, setChecked] = useState(true)
    const [uploadDoc, setUploadDoc] = useState([])
    const [nochecked, setnoChecked] = useState(false)
    const [showAddTimeLine, setShowAddTimeLine] = useState(false)
    // {
    //     mainDesc: 'Marketing',
    //     SubDesc: 'First Copy',
    //     endDate: '08/06/2022',
    //     Completed: 'yes',
    //     workLinks: 'ID Proof',
    //     remarks: 'Test',


    // },
    const [tableData, settableData] = useState([
        


    ])


    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }

    const columns = [

        {
            title: 'Main Description',
            dataIndex: 'main_description',
            align: 'center',
            // key: 'proposal_id',

        },

        {
            title: 'Sub description ',
            dataIndex: 'sub_description',
            align: 'center',
        },

        {
            title: 'End date ',
            dataIndex: 'end_date',
            align: 'center',
        }, {
            title: 'Completed',
            dataIndex: 'completed',
            align: 'center',
        },
        , {
            title: 'Work links',
            // dataIndex: 'workLinks',
            render: (text, record) => (
                <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => opennewWindow(text.work_links)}>{text.work_links}</span>
            ),
            align: 'center',
        }, {
            title: 'Remarks',
            dataIndex: 'remarks',
            align: 'center',
        }, {
            title: 'Documents',
            render: (text, record) => (
                <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => opennewWindow(text.upload_documents)}>{text.upload_documents}</span>
            ),
            // dataIndex: '',
            align: 'center',
        }

    ]

    const openAddTimeLinefunc = () => {
        setShowAddTimeLine(true)
    }

    const onFileChange1 = (e) => {
        // Update the state 

        var file = e.target.files[0]
        console.log(file, 'file');
        setUploadDoc([{ file: file }])
        // setonePagerDoc({ variables: { file: attachedFile[0].file } })
        // setonePagerDoc(event.target.files[0])
    };

    const changeToNotCheckedFunc = () => {
        setnoChecked(true)
        setChecked(false)
    }
    const changeToCheckedFunc = () => {
        setnoChecked(false)
        setChecked(true)
    }

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            if (data?.singleUpload?.filepath) {

                saveChangesfunc(data?.singleUpload?.filepath)
            }

            console.log("Completed uploadFile", data);
        }
    })


    const handleSaveSendfunc = () => {

        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (uploadDoc.length > 0 && userData ) {

            uploadFile({ variables: { file: uploadDoc[0].file ,
                "input": {
                    "project_id": ''
                }
            } })
        }
         else if (userData) {
            saveChangesfunc()
        }
         else {
            alert("Please Connect You Wallet only then you can perform this action")
        }
    }

    const saveChangesfunc = (i) => {
        if(checked == true){

            try {


                var query = `
                mutation CreateTimeline($input: TimelineInput) {
                    createTimeline(input: $input) {
                      _id
                      main_description
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
                                "proposal": selectPrevProposal,
                                "main_description": MainDesc,
                                "sub_description": subDesc,
                                "end_date": EndDate,
                                "completed": "Yes",
                                "work_links": WorkLink,
                                "upload_documents": i,
                                "remarks": Remarks
                            }
                        }
    
                    })
                })
                    .then((response) => {
    
                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        console.log('getFounderUserDetails', data?.data?.createTimeline);
                        if (data?.data?.createTimeline != null && data?.data?.createTimeline != undefined) {
                            getTimeLineDetailsfunc()
                            setShowAddTimeLine(false)
                        } else {
                            alert("Something Went Wrong Please Check the details")
                        }
    
                    })
            }
    
            catch (error) {
                console.log(error, "error in Founder Project");
            }
        }else{
            
        try {


            var query = `
            mutation CreateTimeline($input: TimelineInput) {
                createTimeline(input: $input) {
                  _id
                  main_description
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
                            "proposal": selectPrevProposal,
                            "main_description": MainDesc,
                            "sub_description": subDesc,
                            "end_date": EndDate,
                            "completed": 'No',
                            "work_links": WorkLink,
                            "upload_documents": i,
                            "remarks": Remarks
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.createTimeline);
                    if (data?.data?.createTimeline != null && data?.data?.createTimeline != undefined) {
                        getTimeLineDetailsfunc()
                        setShowAddTimeLine(false)
                    } else {
                        alert("Something Went Wrong Please Check the details")
                    }

                })
        }

        catch (error) {
            console.log(error, "error in Founder Project");
        }
        }

    }


    const getTimeLineDetailsfunc = () => {
        try {


            var query = `
            query Query($proposal: ID) {
                allTimelines(proposal: $proposal) {
                  _id
                  main_description
                  sub_description
                  end_date
                  completed
                  work_links
                  remarks
                  upload_documents
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
                            "proposal": selectPrevProposal
                        

                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('getFounderUserDetails', data?.data?.allTimelines);
                    if (data?.data?.allTimelines != null && data?.data?.allTimelines != undefined) {
                        
                        settableData(data?.data?.allTimelines)
                    } else {
                        alert("Something Went Wrong Please Check the details")
                    }

                })
        }

        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const closeAddTimeLinefunc = () => {
        setShowAddTimeLine(false)
    }

    console.log(tableData,"tableData");
    return (
        <>
            {showAddTimeLine == true ?
                <Modal
                    show={show}
                    onHide={closeAddTimeLinefunc}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                        <Modal.Title>{"Subsequent Proposal  >  TimeLinePage"}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Main Description </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setMainDesc(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Sub Description </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setSubDesc(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>End Date </label>

                                            <input type="date" className="form-control" style={{ width: '50%' }} onChange={(e) => setEndDate(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Completed </label>

                                            <div style={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                                <input type="radio" className="form-control" checked={checked} onChange={() => changeToCheckedFunc()} style={{ width: '20px ' }} /><h5 style={{ marginBottom: '0px' }}>Yes</h5>
                                                <input type="radio" className="form-control" checked={nochecked} onChange={() => changeToNotCheckedFunc()} style={{ width: '20px ' }} /><h5 style={{ marginBottom: '0px' }}>No</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Work Link </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setWorkLink(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Remarks </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} onChange={(e) => setRemarks(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Upload Documents </label>

                                            <input type="file" className="form-control" style={{ width: '50%' }} onChange={onFileChange1} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                        <div className="submit-section">
                            <button className="btn  submit-btn" onClick={(e) => closeAddTimeLinefunc()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)", marginRight: '10px' }}>CANCEL</button>
                            {/* style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }} */}
                            <button className="btn  submit-btn" onClick={() => handleSaveSendfunc()} >SAVE</button>

                        </div>

                        {/* <div className="submit-section">
                   <button className="btn add-btn2 submit-btn">Request Funds</button>
               </div> */}

                    </Modal.Footer>










                </Modal>
                :
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                        <Modal.Title>{"Subsequent Proposal  >  TimeLinePage"}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="submit-section" style={{ textAlign: 'end', marginTop: '5px', marginBottom: '20px' }} >
                            <button className="btn  submit-btn" onClick={() => openAddTimeLinefunc()} style={{ background: 'white', border: '1px solid #00c5fb', color: '#00c5fb' }}>ADD TIMELINE </button>
                        </div>
                        <form>

                            <div className="row">
                                <div className="col-md-12 d-flex">

                                    <div className="card card-table flex-fill">

                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <Table
                                                    pagination={{
                                                        total: tableData.length,
                                                        showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                    }
                                                    }
                                                    style={{ overflowX: 'auto' }}
                                                    columns={columns}
                                                    bordered
                                                    dataSource={tableData}
                                                    rowKey={record => record.id}
                                                // onChange={this.handleTableChange}
                                                />

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                        <div className="submit-section">
                            <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>

                        {/* <div className="submit-section">
               <button className="btn add-btn2 submit-btn">Request Funds</button>
           </div> */}

                    </Modal.Footer>










                </Modal>
            }




        </>
    );
}

export default TimeLinePageRoute;