
import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { itemRender, onShowSizeChange } from '../../../paginationfunction';

function RleaseTokenModal({ show, handleClose }) {

    const [tableData, settableData] = useState([
        {
            projectId: '1000',
            token: '06/06/2022',
            releaseToken: '100',
            lockedToken: '900',


        }

    ])

    const columns = [

       

        {
            title: 'Project ID',
            dataIndex: 'projectId',
            align: 'center',
        },

        {
            title: 'Token',
            dataIndex: 'token',
            align: 'center',
        }, {
            title: 'Released Tokens',
            dataIndex: 'releaseToken',
            align: 'center',
        },
        {
            title: 'Locked Tokens',
            dataIndex: 'lockedToken',
            align: 'center',
        }

    ]

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
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>

                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ width: '170px', background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RleaseTokenModal;