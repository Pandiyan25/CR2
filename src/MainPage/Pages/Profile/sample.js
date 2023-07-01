 {/* /Page Content */}
      {/* Profile Modal */}
      <div id="profile_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile Information</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-img-wrap edit-img">
                      <img className="inline-block" src={Avatar_02} alt="user" />
                      <div className="fileupload btn">
                        <span className="btn-text">edit</span>
                        <input className="upload" type="file" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input type="text" className="form-control" defaultValue="John" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input type="text" className="form-control" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Birth Date</label>
                          <div>
                            <input className="form-control datetimepicker" type="date" defaultValue="05/06/1985" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select className="select form-control">
                            <option value="male selected">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" className="form-control" defaultValue="4487 Snowbird Lane" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" className="form-control" defaultValue="New York" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" className="form-control" defaultValue="United States" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Pin Code</label>
                      <input type="text" className="form-control" defaultValue={10523} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="text" className="form-control" defaultValue="631-889-3206" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Department <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>Select Department</option>
                        <option>Web Development</option>
                        <option>IT Management</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>Select Designation</option>
                        <option>Web Designer</option>
                        <option>Web Developer</option>
                        <option>Android Developer</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Reports To <span className="text-danger">*</span></label>
                      <select className="select">
                        <option>-</option>
                        <option>Wilmer Deluna</option>
                        <option>Lesley Grauer</option>
                        <option>Jeffery Lalor</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Profile Modal */}
      {/* Personal Info Modal */}
      <div id="personal_info_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport No</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Passport Expiry Date</label>
                      <div>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tel</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nationality <span className="text-danger">*</span></label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Religion</label>
                      <div>
                        <input className="form-control" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Marital status <span className="text-danger">*</span></label>
                      <select className="select form-control">
                        <option>-</option>
                        <option>Single</option>
                        <option>Married</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Employment of spouse</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>No. of children </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Personal Info Modal */}
      {/* Family Info Modal */}
      <div id="family_info_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Family Informations</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Family Member <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Relationship <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date of birth <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Name <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Relationship <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Date of birth <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone <span className="text-danger">*</span></label>
                            <input className="form-control" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Family Info Modal */}
      {/* Emergency Contact Modal */}
      <div id="emergency_contact_modal" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Personal Information</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Relationship <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">Primary Contact</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Name <span className="text-danger">*</span></label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Relationship <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone <span className="text-danger">*</span></label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone 2</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Emergency Contact Modal */}
      {/* Education Modal */}
      <div id="education_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Education Informations</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Education Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Oxford University" className="form-control floating" />
                            <label className="focus-label">Institution</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Computer Science" className="form-control floating" />
                            <label className="focus-label">Subject</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="01/06/2002" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Starting Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <div>
                              <input type="date" defaultValue="31/05/2006" className="form-control floating datetimepicker" />
                            </div>
                            <label className="focus-label">Complete Date</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="BE Computer Science" className="form-control floating" />
                            <label className="focus-label">Degree</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus focused">
                            <input type="text" defaultValue="Grade A" className="form-control floating" />
                            <label className="focus-label">Grade</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Education Modal */}
      {/* Experience Modal */}
      <div id="experience_info" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Experience Informations</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-scroll">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Experience Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Digital Devlopment Inc" />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="United States" />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Web Developer" />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="01/07/2007" />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="08/06/2018" />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Experience Informations <a href="" className="delete-icon"><i className="fa fa-trash-o" /></a></h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Digital Devlopment Inc" />
                            <label className="focus-label">Company Name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="United States" />
                            <label className="focus-label">Location</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <input type="text" className="form-control floating" defaultValue="Web Developer" />
                            <label className="focus-label">Job Position</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="01/07/2007" />
                            </div>
                            <label className="focus-label">Period From</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group form-focus">
                            <div>
                              <input type="date" className="form-control floating datetimepicker" defaultValue="08/06/2018" />
                            </div>
                            <label className="focus-label">Period To</label>
                          </div>
                        </div>
                      </div>
                      <div className="add-more">
                        <a href=""><i className="fa fa-plus-circle" /> Add More</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Experience Modal */}


      
          {/* /Profile Info Tab */}
          {/* Projects Tab */}
          <div className="tab-pane fade" id="emp_projects">
            <div className="row">
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Office Management</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">9</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Project Management</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">5</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Video Calling App</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">3</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                <div className="card">
                  <div className="card-body">
                    <div className="dropdown profile-action">
                      <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
                    </div>
                    <h4 className="project-title"><Link to="/app/projects/projects-view">Hospital Administration</Link></h4>
                    <small className="block text-ellipsis m-b-15">
                      <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                      <span className="text-xs">4</span> <span className="text-muted">tasks completed</span>
                    </small>
                    <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. When an unknown printer took a galley of type and
                      scrambled it...
                    </p>
                    <div className="pro-deadline m-b-15">
                      <div className="sub-title">
                        Deadline:
                      </div>
                      <div className="text-muted">
                        17 Apr 2019
                      </div>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Project Leader :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                        </li>
                      </ul>
                    </div>
                    <div className="project-members m-b-15">
                      <div>Team :</div>
                      <ul className="team-members">
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                        </li>
                        <li>
                          <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                        </li>
                        <li>
                          <a href="#" className="all-users">+15</a>
                        </li>
                      </ul>
                    </div>
                    <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                    <div className="progress progress-xs mb-0">
                      <div style={{ width: '40%' }} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Projects Tab */}
          {/* Bank Statutory Tab */}

          <div className="row">
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Bank information</h3>
                    <ul className="personal-info">
                      <li>
                        <div className="title">Bank name</div>
                        <div className="text">ICICI Bank</div>
                      </li>
                      <li>
                        <div className="title">Bank account No.</div>
                        <div className="text">159843014641</div>
                      </li>
                      <li>
                        <div className="title">IFSC Code</div>
                        <div className="text">ICI24504</div>
                      </li>
                      <li>
                        <div className="title">PAN No</div>
                        <div className="text">TC000Y56</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Family Informations <a href="#" className="edit-icon" data-toggle="modal" data-target="#family_info_modal"><i className="fa fa-pencil" /></a></h3>
                    <div className="table-responsive">
                      <table className="table table-nowrap">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Relationship</th>
                            <th>Date of Birth</th>
                            <th>Phone</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Leo</td>
                            <td>Brother</td>
                            <td>Feb 16th, 2019</td>
                            <td>9876543210</td>
                            <td className="text-right">
                              <div className="dropdown dropdown-action">
                                <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                  <a href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Education Informations <a href="#" className="edit-icon" data-toggle="modal" data-target="#education_info"><i className="fa fa-pencil" /></a></h3>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">International College of Arts and Science (UG)</a>
                              <div>Bsc Computer Science</div>
                              <span className="time">2000 - 2003</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">International College of Arts and Science (PG)</a>
                              <div>Msc Computer Science</div>
                              <span className="time">2000 - 2003</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex">
                <div className="card profile-box flex-fill">
                  <div className="card-body">
                    <h3 className="card-title">Experience <a href="#" className="edit-icon" data-toggle="modal" data-target="#experience_info"><i className="fa fa-pencil" /></a></h3>
                    <div className="experience-box">
                      <ul className="experience-list">
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Zen Corporation</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Ron-tech</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-user">
                            <div className="before-circle" />
                          </div>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <a href="/" className="name">Web Designer at Dalt Technology</a>
                              <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          <div className="tab-pane fade" id="bank_statutory">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title"> Basic Salary Information</h3>
                <form>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Salary basis <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select salary basis type</option>
                          <option>Hourly</option>
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Salary amount <small className="text-muted">per month</small></label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                          </div>
                          <input type="text" className="form-control" placeholder="Type your salary amount" defaultValue={0.00} />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Payment type</label>
                        <select className="select">
                          <option>Select payment type</option>
                          <option>Bank transfer</option>
                          <option>Check</option>
                          <option>Cash</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h3 className="card-title"> PF Information</h3>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">PF contribution</label>
                        <select className="select">
                          <option>Select PF contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">PF No. <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select PF contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Employee PF rate</label>
                        <select className="select">
                          <option>Select PF contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select additional rate</option>
                          <option>0%</option>
                          <option>1%</option>
                          <option>2%</option>
                          <option>3%</option>
                          <option>4%</option>
                          <option>5%</option>
                          <option>6%</option>
                          <option>7%</option>
                          <option>8%</option>
                          <option>9%</option>
                          <option>10%</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Total rate</label>
                        <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Employee PF rate</label>
                        <select className="select">
                          <option>Select PF contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select additional rate</option>
                          <option>0%</option>
                          <option>1%</option>
                          <option>2%</option>
                          <option>3%</option>
                          <option>4%</option>
                          <option>5%</option>
                          <option>6%</option>
                          <option>7%</option>
                          <option>8%</option>
                          <option>9%</option>
                          <option>10%</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Total rate</label>
                        <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h3 className="card-title"> ESI Information</h3>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">ESI contribution</label>
                        <select className="select">
                          <option>Select ESI contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">ESI No. <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select ESI contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Employee ESI rate</label>
                        <select className="select">
                          <option>Select ESI contribution</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Additional rate <span className="text-danger">*</span></label>
                        <select className="select">
                          <option>Select additional rate</option>
                          <option>0%</option>
                          <option>1%</option>
                          <option>2%</option>
                          <option>3%</option>
                          <option>4%</option>
                          <option>5%</option>
                          <option>6%</option>
                          <option>7%</option>
                          <option>8%</option>
                          <option>9%</option>
                          <option>10%</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label className="col-form-label">Total rate</label>
                        <input type="text" className="form-control" placeholder="N/A" defaultValue="11%" />
                      </div>
                    </div>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" type="submit">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* /Bank Statutory Tab */}


          ///////////////new myprofilesettings




          <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Fund Description</label>
                                            <div>
                                                <input type="text" className="form-control" defaultValue={fundDesc} onChange={(e) => setfundDesc(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label> Assets Under Management(AUM)</label>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                <input style={{ width: '80%' }} type="number" className="form-control" defaultValue={assestmang} onChange={(e) => setassestmang(e.target.value)} onWheel={(e) => e.target.blur()} />

                                                <label style={{ margin: '10px' }}>USD</label>
                                                {/* <select className="form-control btn-block-height square-edges" >
                                                    <option style={{ fontSize: '13px' }} value="">Select in USD Millions</option>
                                                    <option style={{ fontSize: '13px' }} value="1000">1000</option>
                                                    <option style={{ fontSize: '13px' }} value="5000">5000</option>
                                                    <option style={{ fontSize: '13px' }} value="6000">6000</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Minimum Investement Size<span className="text-danger">*</span></label>

                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>

                                                <input style={{ width: '80%' }} type="number" className="form-control" defaultValue={minInvSize} onChange={(e) => setminInvSize(e.target.value)} onWheel={(e) => e.target.blur()} />

                                                <label style={{ margin: '10px' }}>USD</label>
                                                {/* <select className="form-control btn-block-height square-edges" defaultValue={minInvSize} onChange={(e) => setminInvSize(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select in USD </option>
                                                    <option style={{ fontSize: '13px' }} value="1000">1000</option>
                                                    <option style={{ fontSize: '13px' }} value="5000">5000</option>
                                                    <option style={{ fontSize: '13px' }} value="6000">6000</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Projects Invested till date</label>
                                            <div>
                                                <input type="text" className="form-control" defaultValue={projInvested} onChange={(e) => setprojInvested(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <h7>Projects Invested</h7>
                                                {/* ref={target} */}
                                                <Button id="TooltipExample" style={{ width: '20px', height: '20px', fontSize: '15px', borderRadius: '50px', padding: '0px', marginLeft: '5px' }} ref={targetRef} onClick={() => setShowoverlay(!showoverlay)}>
                                                    ?
                                                </Button>
                                                {/* <Overlay show={showoverlay} placement="right">
                                                    {(props) => (
                                                        <Tooltip id="overlay-example" {...props}>
                                                            My Tooltip
                                                        </Tooltip>
                                                    )}
                                                </Overlay> */}
                                                <Tooltip placement="right" isOpen={showoverlay} target="TooltipExample" >
                                                    Projects Invested
                                                </Tooltip>
                                                {/* <Tooltip title="Person">Hello</Tooltip> */}
                                            </label>
                                            <div>
                                                <input type="text" className="form-control" defaultValue={projInvestedtilldate} onChange={(e) => setprojInvestedtilldate(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Fund Head Quarters</label>
                                            <div>
                                                <Select options={options} onChange={changeHandler} />
                                                {/* <select   className="form-control btn-block-height square-edges" defaultValue={fundHeadQuarter}
                                                    <option style={{ fontSize: '13px' }}>Select Country</option>  onChange={(e) => setfundHeadQuarter(e.target.value)}
                                                    <option style={{ fontSize: '13px' }} value="USA">USA</option>
                                                    <option style={{ fontSize: '13px' }} value="INDIA">INDIA</option>
                                                    <option style={{ fontSize: '13px' }} value="SINGAPORE">SINGAPORE</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Type of Fund</label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={typeofFund} onChange={(e) => settypeofFund(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value="">Select Fund Type</option>
                                                    <option style={{ fontSize: '13px' }} value="High Networth Individual">High Networth Individual</option>
                                                    <option style={{ fontSize: '13px' }} value="Private Equity Firm">Private Equity Firm</option>
                                                    <option style={{ fontSize: '13px' }} value="Mirco VC">Mirco VC</option>
                                                    <option style={{ fontSize: '13px' }} value="Hedge Fund">Hedge Fund</option>
                                                    <option style={{ fontSize: '13px' }} value="Web3 Startup">Web3 Startup</option>
                                                    <option style={{ fontSize: '13px' }} value="Decentralised VC">Decentralised VC</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Team Size</label>
                                            <div>
                                                <input type="number" className="form-control" defaultValue={teamSize} onChange={(e) => setteamSize(e.target.value)} onWheel={(e) => e.target.blur()} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label> Preferred Sectors</label>
                                            <MySelect
                                                options={colourOptions}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                components={{ Option, MultiValue }}
                                                onChange={handleChange}
                                                allowSelectAll={true}
                                                value={proffredSector}
                                            />
                                            {/* <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={proffredSector} onChange={(e) => setproffredSector(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }}>Select Sectors</option>
                                                    <option style={{ fontSize: '13px' }} value="DEFI">DEFI</option>
                                                    <option style={{ fontSize: '13px' }} value="DAO">DAO</option>
                                                    <option style={{ fontSize: '13px' }} value="Gaming">Gaming</option>
                                                    <option style={{ fontSize: '13px' }} value="Exchange">Exchange</option>
                                                    <option style={{ fontSize: '13px' }} value="NFT">NFT</option>
                                                    <option style={{ fontSize: '13px' }} value={"Layer 1&2"}>{'Layer 1&2'}</option>
                                                    <option style={{ fontSize: '13px' }} value="Oracles">Oracles</option>
                                                    <option style={{ fontSize: '13px' }} value="Deep Tech">Deep Tech</option>
                                                    <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                </select>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div>
                                                <input type="text" className="form-control"   onChange={(e)=>setpassword(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div> */}


                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Website Link</label>
                                            <div>
                                                <input type="text" className="form-control" defaultValue={websiteLink} onChange={(e) => setwebsiteLink(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    
<div className="col-md-12">
<div className="form-group">
    <label>LinkedIn link(Fund Link)</label>
    <div>
        <input type="text" className="form-control" defaultValue={LinkedInLink} onChange={(e) => setLinkedInLink(e.target.value)} />
    </div>
</div>
</div>

















     {/* <div className="col-sm-8 col-md-8 col-lg-8 col-xl-9">
                        <div className="m-b-30"> */}
                {/* <div className="col-sm-8 col-md-8 col-lg-8 col-xl-8">

                        <div className="card profile-box flex-fill" style={{ borderRadius: '15px', boxShadow: 'rgb(196 200 208) 0px 10px 20px' }}>
                            <div className="card-body" style={{ padding: '10px' }}>
                                <div className="col-md-12" style={{ padding: '0px' }}>
                                    <div className="profile-view" style={{ margin: '0px' }}> */}
                {/* profile-basic */}
                {/* <div className="">
                                            <table className="borderSpacing" style={{ padding: '20px', width: '100%', wordBreak: 'break-word' }}>

                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}> Role in the Organisation:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].role_in_organization}
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Fund Name:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_name}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Fund Description:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_description}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}> Assets Under Management:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && Number(profileDetails[0]?.asset_under_management).toLocaleString("en-US")}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Minimum Investment Size:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && Number(profileDetails[0].minimum_investment_size).toLocaleString("en-US") }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Projects Invested till date:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].projected_invested_till_date}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Projects Invested :</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].project_invested}
                                                        </td>
                                                    </tr>


                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Fund Head Quarters:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].fund_head_quarters}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Type of Fund:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].type_of_fund}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Team Size:</td>
                                                        <td className="text-center">
                                                            {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].team_size}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '50%', color: '#4f4f4f' }}>Preferred Sectors</td>
                                                        <td className="text-center"> */}
                {/* {profileDetails.length > 0 && profileDetails[0]._id != null && profileDetails[0]._id != undefined && profileDetails[0].preferred_sectors?.length > 0 ? */}

                {/* // , flexD  */}
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>

                                                                    {profileDetails[0].preferred_sectors?.map(
                                                                        (i) =>
                                                                        // <span >
                                                                               {
                                                                                return i.value +","
                                                                             } 
                                                                            // </span>
                                                                                )}

                                                                </div>


                                                                : ''}
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

 */}
