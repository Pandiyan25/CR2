
                <div className="row">
                <div className="col-md-12">
                    <div style={{ padding: '20px', background: 'white', border: '2px solid #E3E9EF', borderRadius: '2px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                        <div className="table-responsive" style={{ border: '0px solid #E3E9EF', borderRadius: '2px', background: 'white' }}>
                            
                            <Table
                                pagination={{
                                    total: projectDetailsData.length,
                                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                }
                                }
                                style={{ overflowX: 'auto' }}
                                columns={columns}
                                bordered
                                dataSource={projectDetailsData}
                                rowKey={record => record.id}
                            />

                           
                        </div>
                    </div>

                </div>
            </div>