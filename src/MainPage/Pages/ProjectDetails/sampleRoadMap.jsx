

        <div className="card card-table flex-fill" style={{ margin: '0px', border: '0px' }}>

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
                            <h5 style={{ marginBottom: '0px' }}>13/05/2022</h5>
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
                <div className="page-header">
                    <div className="row align-items-center" style={{ width: '100%' }}>
                        <div className="col">
                            {/* <h3 className="page-title" style={{ fontSize: '25px' }}>Roadmap</h3> */}
                        </div>
                        <div className="col-auto float-right ml-auto">
                            {/* onClick={() => openEditMapfunc()} */}
                            {/* <button className="btn add-btn-search" style={{ margin: '10px' }}> Upload File</button> */}
                            {/* onClick={() => openAddMapfunc()} */}
                            {/* <button className="btn add-btn-search" style={{ margin: '10px' }}> Download Sample Format</button> */}
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
                                {roadMapData != null && roadMapData != undefined && roadMapData.length > 0 && roadMapData[0].length > 0 ?

                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table className="table-striped"
                                                pagination={{
                                                    total: roadMapData[0].length,
                                                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                }}
                                                style={{ overflowX: 'auto' }}
                                                columns={columns}
                                                // bordered
                                                dataSource={roadMapData[0]}
                                                rowKey={record => record.id}
                                            // onChange={this.handleTableChange}
                                            />
                                        </div>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>