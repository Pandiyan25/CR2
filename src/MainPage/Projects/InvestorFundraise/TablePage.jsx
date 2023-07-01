import { Table } from 'antd'
import React from 'react'
import { Button } from 'react-bootstrap'
import { itemRender, onShowSizeChange } from '../../paginationfunction'

const TablePage = ({tableData,columns}) => {

    
  return (
    <div className="col-md-12">

                <div className="row">
                    <div className="col-md-12" style={{ padding: '0px 5px 0px 5px' }} >
                        <div className=" card-table flex-fill" style={{ height: "800px !important" }}>

                            <div className="card-body" style={{ height: "800px !important" }} >
                                <div className="table-responsive">
                                    <Table className="table-striped"
                                        pagination={{
                                            total: tableData.length,
                                            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                        }}
                                        style={{ overflowX: 'auto' }}
                                        columns={columns}
                                        // bordered
                                        dataSource={tableData}
                                        rowKey={record => record.id}
                                    // onChange={this.handleTableChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default TablePage