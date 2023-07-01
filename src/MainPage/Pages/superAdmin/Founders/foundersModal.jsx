import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';


import { Table } from 'antd';
import 'antd/dist/antd.css';

import "../../../antdstyle.css";
import "../../../index.css"
function FounderModal({ show, handleClose }) {
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    
    const TodayDate = new Date();
    
  var date = TodayDate.toISOString().substr(0, 10);
    const [tableData, settableData] = useState([
        {
            sno: 1,
            date: '21/2/2022 ',
            ProjectID: '001',
            TokensAllocated: '10000',
            Status: 'Claimed',


        },
        {

            sno: 2,
            date: '21/2/2022 ',
            ProjectID: '001',
            TokensAllocated: '10000',
            Status: 'UnClaimed',

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
            title: 'Date',
            dataIndex: 'date',
            align: 'center',

            sorter: (a, b) => a.date.length - b.date.length,

        },
        {
            title: 'Project ID',
            dataIndex: 'ProjectID',
            align: 'center',

            sorter: (a, b) => a.ProjectID.length - b.ProjectID.length,

        },

        {
            title: 'Tokens Allocated ',
            dataIndex: 'TokensAllocated',

            align: 'center',
            sorter: (a, b) => a.TokensAllocated.length - b.TokensAllocated.length,
        },

        {
            title: 'Status',
            dataIndex: 'Status',

            align: 'center',
            sorter: (a, b) => a.Status.length - b.Status.length,
        },
    ]

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Rewards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Date : </label>
                                    <input type="date" defaultValue={date}  className="form-control" />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>No of CR Tokens :</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Project ID :</label>
                                    
                                    <input type="text" className="form-control" />
                                    {/* <div>
                                        <select className="form-control btn-block-height square-edges">
                                            <option style={{ fontSize: '13px' }}>Select Education</option>
                                            <option style={{ fontSize: '13px' }} value="BTECH">BTECH</option>
                                            <option style={{ fontSize: '13px' }} value="BCOM">BCOM</option>
                                            <option style={{ fontSize: '13px' }} value="MTECH">MTECH</option>
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label></label>
                                    <div>
                                        <button  className="form-control" style={{background:'#6345ED',color:'white',border:'2px solid #6345ED',width:'105px',fontSize:'15px',borderRadius:'50px'}} >Allocate</button>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-12">
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
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    <div className="submit-section" style={{ margin: '0px' }}>
                        <button className="btn  submit-btn" onClick={() => handleClose()}>Back</button>
                    </div>

                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save</Button> */}
                </Modal.Footer>








            </Modal>
        </>
    );
}

export default FounderModal;