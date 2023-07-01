`query Query {
    allProposals {
      _id
      proposal_id
      name
      type
      funds_requested
      price_per_token
      number_of_tokens
      tokens_locked_in_escrow
      logo
      project {
        _id
        user {
          _id
          email
          password
          role
          contact
          first_name
          last_name
          role_in_organization
          fund_description
          minimum_investment_size
          project_invested
          type_of_fund
          preferred_sectors {
            value
          }
          fund_name
          asset_under_management
          projected_invested_till_date
          fund_head_quarters
          team_size
          linkedin
          linkedin_link
          website_link
          twitter_link
        }
        project_id
        name
        investments_date
        no_of_proposals
        amount_invested
        released_amount
        amount_in_escrow
        status
        description
        total_fund_raised
        fund_raised_till_now
      }
    }
  }
   `



   ////////////
   {/* <table className="table table-nowrap custom-table mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>S.No</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Project Id</th>
                                                <th style={{ textAlign: 'center', borderBottom: '0px', borderTop: '0px' }}>Logo</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Project Name</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Proposal Type</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Funds Released Till Date</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>No of Validators</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Status</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Funds Requested</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Relesed Amount</th>
                                                <th style={{ textAlign: 'center', padding: '10px 0px !important', borderBottom: '0px', borderTop: '0px' }}>Project Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((i) => (
                                                <tr>
                                                    <td style={{ textAlign: 'center' }}>{i.sno}
                                                    </td>
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }} onClick={() => showProposalsDataFun(i)}>{i.proposalNo}</td>
                                                    <td style={{ textAlign: 'center' }}><img src={ designLogo2} alt="" width="20px" /></td>
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.projectName}</td>
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.type}</td>

                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.fundReleasedTillDate}</td>
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.noofValidators}</td>
                                                    {
                                                        i.status == 'Approved' ?
                                                            <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                                <div className=" bg-inverse-info" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%',fontSize:'14px' }}>Approved
                                                                </div></td>
                                                            : (i.status == 'Rejected' ?
                                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                                    <div className=" bg-inverse-danger" style={{ width: '110px', borderRadius: '50px', padding: '5px', height: '100%',fontSize:'14px' }}>Rejected
                                                                    </div></td>
                                                                :
                                                                <td style={{ textAlign: 'center', padding: '10px 0px !important' ,fontSize:'14px'}}>{i.status}</td>
                                                            )

                                                    }
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.fundRequested} </td>
                                                    <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.releasedAmount} </td>
                                                    {
                                                        i.projectStatus == 'Ongoing' ?
                                                            <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>
                                                                <div className=" bg-inverse-warning" style={{ width: '100%', borderRadius: '50px', padding: '5px', height: '100%' }}>Ongoing
                                                                </div></td>
                                                            :
                                                            <td style={{ textAlign: 'center', padding: '10px 0px !important' }}>{i.projectStatus}</td>




                                                    } 
                                                    

                                                </tr>)
                                            )}


                                        </tbody>
                                    </table> */}


                                     {/* <ul className="nav user-menu">

                        <li className="nav-item dropdown has-arrow flag-nav">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">

                                <span style={{ wordSpacing: 'normal' }}>{"Connect Wallet  "}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a href="" className="dropdown-item">
                                    MetaMask
                                </a>
                                <a href="" className="dropdown-item">
                                    Coinbase
                                </a>
                                <a href="" className="dropdown-item">
                                    MetaMask
                                </a>
                                <a href="" className="dropdown-item">
                                    Coinbase
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className=" nav-link" data-toggle="dropdown">
                                <i className="fa fa-bell-o" />
                            </a>

                        </li>

                        <li className="nav-item dropdown has-arrow main-drop">
                            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">

                                <span>Admin</span>
                            </a>
                            <div className="dropdown-menu">
                                <Link className="dropdown-item" to="/profile" style={{ wordSpacing: 'normal' }}>My Profile</Link>
                                <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
                                <Link className="dropdown-item" to="/login">Logout</Link>
                            </div>

                        </li>
                    </ul> */}