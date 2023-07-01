 {/* <table className=" table table-nowrap custom-table mb-0">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>S.No</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Project Id</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>Logo</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Name</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Amount in Escrow</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Investments Date</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>No of Proposals</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Amount Invested</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Released Amount</th>
                                            <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px', padding: '10px 0px !important' }}>Project Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((i) => (
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{i.sno}
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.projectID}</td>
                                                {/* <td style={{ textAlign: 'center' }}>{i.logo}</td> */}
                                                <td style={{ textAlign: 'center' }}><img src={designLogo2} alt="" width="20px" /></td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.Name}</td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.Amount}</td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.investmentDate}</td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.noofProposals}</td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.amountInvested}</td>
                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.releasedAmount}</td>
                                                {
                                                    i.status == 'Completed' ?
                                                        <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                            <div className=" bg-inverse-info" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Approved
                                                            </div></td>
                                                        : i.status == 'Rejected' ?
                                                            <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                                <div className=" bg-inverse-danger" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Rejected
                                                                </div></td>
                                                            : i.status == 'Ongoing' ?
                                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                                    <div className=" bg-inverse-warning" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Ongoing
                                                                    </div></td>
                                                                :
                                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.status}</td>



                                                }


                                            </tr>
                                        )
                                        )}


                                    </tbody>
                                </table> */}