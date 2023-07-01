<>
{/* <div >
   

    <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0px 10px 20px #C4C8D0' }}> */}

        <div className="row" style={{ marginBottom: '20px' }}>
            
            <div className="col-sm-12">




                <div className="content container-fluid">
                    <div >
                        <div>

                            <div className="page-header">
                                <div className="row align-items-center" style={{ width: '100%' }}>
                                    <div className="col">
                                        <h3 className="page-title" style={{ fontSize: '25px' }}>Proposal</h3>
                                    </div>
                                    {/* <div className="col-auto float-right ml-auto">
                                        <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createSubseqPropfunc()}> Create Subsequent Proposal</button>

                                        <button className="btn add-btn2" style={{ margin: '10px' }} onClick={() => createinitialfunc()}> Create Initial Proposal</button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex">

                                    <div className="card card-table flex-fill" style={{margin:'0px'}}>

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

                        </div>
                    </div>
                    {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                    <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                    {/* <RecordExpenseModal show={recordExpense} handleClose={handleClose} />
                    <AddVendorModal show={addVendor} handleClose={handleCloseaddVendor} /> */}
                </div>

            </div>


        </div>
    {/* </div>

</div> */}

</>