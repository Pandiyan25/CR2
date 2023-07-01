import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import RejectStatusModal from './RejectStatus';


function ValidationStatusModal({ show, handleClose }) {

    const [tokenStd, settokenStd] = useState([
        {
        role:'Validator 1',
        Remarks:`Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry`,
        status:'Approved'
    },
    {
        role:'Validator 2',
        Remarks:`Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry`,
        status:'Approved'
    },
    {
        role:'Validator 3',
        Remarks:`Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry`,
        status:'Rejected'
    },
    {
        role:'Investor 1',
        Remarks:`Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry Lorem Ipsum is simply dummy text of the printing 
        and typesetting industry`,
        status:'Approved'
    },

])

const [showReject,setShowReject] = useState(false)

    const columns = [



        {
            title: 'Validator/Investor',
            dataIndex: 'role',

            align: 'center',
        },


        {
            title: 'Remarks',
            dataIndex: 'Remarks',

            align: 'center',
        },


        {
            title: 'Validation',
            render: (text, record) => (
                text?.status == 'Approved' ?
                    <div>
                        <div style={{border:'2px solid green',padding:'2px',color:'green'}}>
                            {text?.status}
                        </div>
                    </div>
                    :

                    text?.status == 'Rejected' ?
                        <div>
                            <div style={{border:'2px solid red',padding:'2px',color:'red'}}>{text?.status}</div>
                        </div>
                        :
                        <div>
                        <div>{text?.status}</div>
                        </div>
            ),
            align: 'center',
        },





        // {
        //     title: 'Options',
        //     render: (text, record) => (
        //         <strong>{text}</strong>
        //         <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

        //             <Button style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '15px ', width: '100%', marginLeft: '10px', background: '#1890ff' }} onClick={()=>showRoundFunc()}>View</Button>
        //             onClick={() => deleteFunc(text._id)}
        //         </div>
        //     ),


        //     align: 'center',
        // },


    ]

    const handleCloseReject =() =>{
        setShowReject(false)
    }

    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Validation Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                    {/* <div>
                        <button onClick={()=>setShowReject(true)}>show</button>
                        <RejectStatusModal show={showReject} handleClose={handleCloseReject} />
                    </div> */}
                </Modal.Body>










            </Modal>
        </>
    );
}

export default ValidationStatusModal;