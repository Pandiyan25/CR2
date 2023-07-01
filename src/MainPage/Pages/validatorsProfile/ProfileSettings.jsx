import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { fetchValidatorProfile } from '../../../reducers/ValidatorProfileSlice';
import { apiURI } from '../../../config/config';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';

function ProfileSettings({
    imageData,
    show,
    handleClose,
    profileDetails,
    updateProfileDetails,
    firstName,
    setFirstName,
    LastName,
    setLastName,
    education,
    setEducation,
    experience,
    setexperience,
    industry,
    setindustry,
    expInBlockChain,
    setexpInBlockChain,
    nationality,
    setnationality,
    idProof,
    setidProof,
    selfDescc,
    setselfDescc,
    pasOrgTag,
    profilePic,
    setpasOrgTag,
    currOrgTag,
    setcurrOrgTag,
    currPosition,
    setcurrPosition,
    currLocation,
    setcurrLocation,
    currIncome,
    setcurrIncome,
    IdNumber,
    setIdNumber,
    WalletAddress,
    setWalletAddress,
    LinkedIn,
    setLinkedIn,
    setImageData,
}) {
    const [selfDescLength, setselfDescLength] = useState(0)
    const [showDescError, setShowDescError] = useState(false)
    const [LinkedInError, setLinkedInError] = useState(false)
    const [industryError, setindustryError] = useState(false)
    const [firstNameError, setfirstNameError] = useState(false)
    const [LastNameError, setLastNameError] = useState(false)
    const [experienceError, setexperienceError] = useState(false)
    const [educationError, seteducationError] = useState(false)
    const [expInBlockChainError, setexpInBlockChainError] = useState(false)
    const [nationalityError, setnationalityError] = useState(false)
    const [idProofError, setidProofError] = useState(false)
    const [currLocationError, setcurrLocationError] = useState(false)
    const [currIncomeError, setcurrIncomeError] = useState(false)
    const [IdNumberError, setIdNumberError] = useState(false)

    console.log(profilePic, "profilePic");
    // console.log(profileDetails.length > 0 && profileDetails[0].first_name,"profileDetails2");
    const dispatch = useDispatch();
    const loginId = useSelector((state) => state.constVar.loginId)


    const onFileChange = (e) => {
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {

            var file = e.target.files[0]
            console.log(file, 'file');
            // if(!file) return
            setImageData([{ file: file }])
            // uploadFile({ variables: { file } })
        } else {
            toast.warn('Please Upload file only jpg, png, jpeg format', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const changeDesc = (e) => {
        setselfDescc(e.target.value)
        setselfDescLength(e.target.value.split(' ').length)
        // setselfDescc(e)
        // setselfDescLength(e)
        if (e.target.value.split(' ').length > 0 && e.target.value.split(' ').length < 50) {

            setShowDescError(true)
        } else {

            setShowDescError(false)
        }
    }
    const checkdescLengthfunc = () => {
        var main = selfDescc.split(' ').length
        console.log(main,"main");
        if (main > 0 && main < 50) {
            setShowDescError(true)
            console.log("kii2");
            // alert("Please Enter atleast 50 words in Self Description")
        }
        else {
            if (firstName != '' && LastName != '' && education != ''
                && experience != '' && industry != '' && expInBlockChain != ''
                && nationality != '' && idProof != '' && currLocation != ''
                && currIncome != '' && IdNumber != '' && LinkedIn != '' && main > 50
            ) {
                console.log("kii");
                updateProfileDetails()
            }
            else {
                console.log("kii1");
                if (firstName == '') {
                    setfirstNameError(true)
                } else {
                    setfirstNameError(false)

                }
                if (LastName == '') {
                    setLastNameError(true)
                } else {
                    setLastNameError(false)

                }
                if (education == '') {
                    seteducationError(true)
                } else {
                    seteducationError(false)

                }
                if (experience == '') {
                    setexperienceError(true)
                } else {
                    setexperienceError(false)

                }
                if (industry == '') {
                    setindustryError(true)
                } else {
                    setindustryError(false)

                }
                if (expInBlockChain == '') {
                    setexpInBlockChainError(true)
                } else {
                    setexpInBlockChainError(false)

                }
                if (nationality == '') {
                    setnationalityError(true)
                } else {
                    setnationalityError(false)

                }
                if (idProof == '') {
                    setidProofError(true)
                } else {
                    setidProofError(false)

                }
                if (currLocation == '') {
                    setcurrLocationError(true)
                } else {
                    setcurrLocationError(false)

                }
                if (currIncome == '') {
                    setcurrIncomeError(true)
                } else {
                    setcurrIncomeError(false)

                }
                if (IdNumber == '') {
                    setIdNumberError(true)
                } else {
                    setIdNumberError(false)

                }
                if (LinkedIn == '') {
                    setLinkedInError(true)
                } else {
                    setLinkedInError(false)

                }
                if (main < 50) {
                    setShowDescError(true)
                } else {
                    setShowDescError(false)

                }
            }
        }
    }

    const closeMainPopup = () =>{
        setImageData([])
        handleClose()
    }

    console.log(selfDescLength, "selfDescLength");

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
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="profile-img-wrap edit-img">
                                    {imageData.length > 0 ?
                                        <img className="inline-block" src={URL.createObjectURL(imageData[0].file)} alt="" />
                                        :
                                        <img className="inline-block" src={profilePic} alt="" />

                                    }


                                    <div className="fileupload btn">
                                        <span className="btn-text">edit</span>
                                        {/* <input className="upload" type="file"  /> */}
                                        <input className="upload" type="file" onChange={onFileChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                            {firstNameError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter First Name</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={LastName} onChange={(e) => setLastName(e.target.value)} />
                                            {LastNameError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Last Name</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>{"LinkedIn(Profile Link)"}<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={LinkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                                            {LinkedInError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>{"Please Enter inkedIn(Profile)"}</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Education<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={education} onChange={(e) => setEducation(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value=''>Select Education</option>
                                                    <option style={{ fontSize: '13px' }} value="High School">High School</option>
                                                    <option style={{ fontSize: '13px' }} value="Graduate">Graduate</option>
                                                    <option style={{ fontSize: '13px' }} value="Post Graduate">Post Graduate </option>
                                                    <option style={{ fontSize: '13px' }} value="PHD">PHD </option>
                                                    <option style={{ fontSize: '13px' }} value="Professional">Professional </option>
                                                    <option style={{ fontSize: '13px' }} value="others">others </option>
                                                </select>
                                            </div>
                                            {educationError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Education</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" placeholder='In years' defaultValue={experience} onChange={(e) => setexperience(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value='' >Select Experience</option>
                                                    <option style={{ fontSize: '13px' }} value="1">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3">3 </option>
                                                    <option style={{ fontSize: '13px' }} value="4">4 </option>
                                                    <option style={{ fontSize: '13px' }} value="5">5 </option>
                                                    <option style={{ fontSize: '13px' }} value="6">6 </option>
                                                    <option style={{ fontSize: '13px' }} value="7">7 </option>
                                                    <option style={{ fontSize: '13px' }} value="8">8 </option>
                                                    <option style={{ fontSize: '13px' }} value="9">9 </option>
                                                    <option style={{ fontSize: '13px' }} value="10">10 </option>
                                                    <option style={{ fontSize: '13px' }} value="10+">10+ </option>
                                                </select>
                                            </div>
                                            {experienceError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Experience</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Industry<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={industry} onChange={(e) => setindustry(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value=''>Select Industry</option>
                                                    <option style={{ fontSize: '13px' }} value="IT">IT </option>
                                                    <option style={{ fontSize: '13px' }} value="Marketing">Marketing </option>
                                                    <option style={{ fontSize: '13px' }} value="Finance">Finance </option>
                                                    <option style={{ fontSize: '13px' }} value="Software">Software </option>
                                                    <option style={{ fontSize: '13px' }} value="Marketing">Marketing </option>
                                                    <option style={{ fontSize: '13px' }} value={"Research & Development"}>{"Research & Development"}</option>
                                                    <option style={{ fontSize: '13px' }} value="others">others </option>
                                                </select>
                                            </div>
                                            {industryError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Industry</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Experience in Blockchain Industry<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" placeholder='In years' defaultValue={expInBlockChain} onChange={(e) => setexpInBlockChain(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value=''>Select Experience in Years</option>
                                                    <option style={{ fontSize: '13px' }} value="1">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3">3 </option>
                                                    <option style={{ fontSize: '13px' }} value="4">4 </option>
                                                    <option style={{ fontSize: '13px' }} value="5">5 </option>
                                                    <option style={{ fontSize: '13px' }} value="5+">5+ </option>
                                                </select>
                                            </div>
                                            {expInBlockChainError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Experience in Blockchain Industry</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Position<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control"  />
                                        </div>
                                    </div> */}




                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Position</label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={currPosition} onChange={(e) => setcurrPosition(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value=''>Select your Role</option>
                                                    <option style={{ fontSize: '13px' }} value="C.E.O">C.E.O </option>
                                                    <option style={{ fontSize: '13px' }} value="C.F.O">C.F.O </option>
                                                    <option style={{ fontSize: '13px' }} value="C.O.O">C.O.O </option>
                                                    <option style={{ fontSize: '13px' }} value="C.T.O">C.T.O </option>
                                                    <option style={{ fontSize: '13px' }} value="Co Founder">Co Founder</option>
                                                    <option style={{ fontSize: '13px' }} value="Founder">Founder</option>
                                                    <option style={{ fontSize: '13px' }} value="Manager">Manager </option>
                                                    <option style={{ fontSize: '13px' }} value="Software Engineer">Software Engineer</option>
                                                    <option style={{ fontSize: '13px' }} value="others">others </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Organisation</label>
                                            <input type="text" className="form-control" defaultValue={currOrgTag} onChange={(e) => setcurrOrgTag(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Past Organisations Tags</label>
                                            <input type="text" className="form-control" defaultValue={pasOrgTag} onChange={(e) => setpasOrgTag(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Income<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={currIncome} onChange={(e) => setcurrIncome(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value='' >Select your Income in USD</option>
                                                    <option style={{ fontSize: '13px' }} value="0-10k">0-10k</option>
                                                    <option style={{ fontSize: '13px' }} value="10-25k">10-25k</option>
                                                    <option style={{ fontSize: '13px' }} value="25-75k">25-75k </option>
                                                    <option style={{ fontSize: '13px' }} value="75-150k">75-150k </option>
                                                    <option style={{ fontSize: '13px' }} value="Above 150K">Above 150K</option>
                                                </select>
                                            </div>
                                            {currIncomeError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Current Income</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>ERC-20 Wallet Address</label>
                                            <input type="text" className="form-control" defaultValue={WalletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Current Location<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={currLocation} onChange={(e) => setcurrLocation(e.target.value)} />
                                            {currLocationError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Current Location</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Nationality<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={nationality} onChange={(e) => setnationality(e.target.value)} />
                                            {nationalityError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Nationality</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Id Proof<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges" defaultValue={idProof} onChange={(e) => setidProof(e.target.value)}>
                                                    <option style={{ fontSize: '13px' }} value=''>Select Id</option>
                                                    <option style={{ fontSize: '13px' }} value="Aadhaar Card">Aadhaar Card</option>
                                                    <option style={{ fontSize: '13px' }} value="Driving Licence">Driving Licence</option>
                                                    <option style={{ fontSize: '13px' }} value="Pan Card">Pan Card</option>
                                                </select>
                                            </div>
                                            {idProofError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Id Proof</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Id Number<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={IdNumber} onChange={(e) => setIdNumber(e.target.value)} />
                                            {IdNumberError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Id Number</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Self Description</label>
                                            <textarea style={{ height: '180px' }}
                                                type="text"
                                                className="form-control"
                                                minLength={50}
                                                defaultValue={selfDescc}
                                                onChange={(e) => changeDesc(e)}
                                            // onInput={(e) => {
                                            //     e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12)
                                            // }} 
                                            />
                                            {showDescError == true ?
                                                <div style={{ color: 'red', fontSize: '12px' }}>Please Enter atleast 50 words in Self Description</div>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'center' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => closeMainPopup()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => checkdescLengthfunc()}>SAVE</button>
                    </div>

                </Modal.Footer>




                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />




            </Modal>
        </>
    );
}

export default ProfileSettings;