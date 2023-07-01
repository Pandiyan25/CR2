import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

function UpdateTimeLine({ show, handleClose }) {

    const [checked, setChecked] = useState(false)
    const [nochecked, setnoChecked] = useState(false)
    const [showAddTimeLine, setShowAddTimeLine] = useState(false)
    const [tableData, settableData] = useState([
        {
            mainDesc: 'Marketing',
            SubDesc: 'First Copy',
            endDate: '08/06/2022',
            Completed: 'yes',
            workLinks: 'ID Proof',
            remarks: 'Test',


        },


    ])

    const opennewWindow = (i) =>{
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
      }
    const columns = [

        {
            title: 'Main Description',
            dataIndex: 'mainDesc',
            align: 'center',
            // key: 'proposal_id',

        },

        {
            title: 'Sub description ',
            dataIndex: 'SubDesc',
            align: 'center',
        },

        {
            title: 'End date ',
            dataIndex: 'endDate',
            align: 'center',
        }, {
            title: 'Completed',
            dataIndex: 'Completed',
            align: 'center',
        },
        , {
            title: 'Work links',
            // dataIndex: 'workLinks',
            render: (text, record) => (
                <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED' ,cursor:'pointer'}} onClick={()=>opennewWindow(text.workLinks)}>{text.workLinks}</span>
            ),
            align: 'center',
        }, {
            title: 'Remarks',
            dataIndex: 'remarks',
            align: 'center',
        }, {
            title: 'Upload documents',
            // dataIndex: 'validatorsStatus',
            align: 'center',
        }

    ]

    const openAddTimeLinefunc = () => {
        setShowAddTimeLine(true)
    }



    const changeToNotCheckedFunc = () => {
        setnoChecked(true)
        setChecked(false)
    }
    const changeToCheckedFunc = () => {
        setnoChecked(false)
        setChecked(true)
    }

    const handleSaveSendfunc = () => {
        setShowAddTimeLine(false)
    }

    const closeAddTimeLinefunc = () => {
        setShowAddTimeLine(false)
    }

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
                        <Modal.Title>Subsequent Proposal</Modal.Title>
                        
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Main Description </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Sub Description </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>End Date </label>

                                            <input type="date" className="form-control" style={{ width: '50%' }} />
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

                                            <input type="text" className="form-control" style={{ width: '50%' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Remarks </label>

                                            <input type="text" className="form-control" style={{ width: '50%' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                            <label style={{ width: '25%' }}>Upload Documents </label>

                                            <input type="file" className="form-control" style={{ width: '50%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                        <div className="submit-section">
                            <button className="btn  submit-btn" onClick={() => closeAddTimeLinefunc()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" ,marginRight:'10px'}}>CANCEL</button>
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
                        <Modal.Title>Subsequent Proposal</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="submit-section" style={{textAlign:'end',marginTop:'5px',marginBottom:'20px'}} >
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

export default UpdateTimeLine;