
import { Button, Modal, Overlay } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';
import { showSettings } from '../../../reducers/ConstantSlice';
import { fetchProfileDetails } from '../../../reducers/profileSlice';
import MySelect from './MySelect';
import { colourOptions } from './profileDataMain';
import React, { useState, useMemo, useRef } from 'react'
import Select from 'react-select'
import { Tooltip } from 'reactstrap';
import countryList from 'react-select-country-list'

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import { components } from "react-select";
import { message } from "antd";
import ReactTooltip from "react-tooltip";

function ProfileSettings({

    profileDesc,
    setProfileDesc,
    imageData,
    profilePic,
    setImageData,
    showSettingsProfile,
    profileDetails,
    show,
    updateProfileDetails,
    handleClose,
    count,
    roleInOrg,
    fundName,
    fundDesc,
    assestmang,
    minInvSize,
    projInvested,
    projInvestedtilldate,
    fundHeadQuarter,
    typeofFund,
    teamSize,
    proffredSector,
    linkeIn,
    websiteLink,
    twitterLink,
    LinkedInLink,
    setRoleInOrg,
    setfundName,
    setfundDesc,
    setassestmang,
    setminInvSize,
    setprojInvested,
    setprojInvestedtilldate,
    setfundHeadQuarter,
    settypeofFund,
    setteamSize,
    setproffredSector,
    setlinkeIn,
    setwebsiteLink,
    settwitterLink,
    setLinkedInLink,
    firstName,
    lastName,
    setFirstName,
    setlastName,
    setTelegramLink,
    telegramLink,
    isAngel
}) {


    const [firstNameErr,setFirstnameErr]= useState(false)
    const [LastNameErr,setLastNameErr]= useState(false)
    const [SelfDescErr,setSelfDescErr]= useState(false)
    const [roleOrgErr,setroleOrgErr]= useState(false)
    const [LinkedInErr,setLinkedInErr]= useState(false)
    const [ProfilePicErr,setProfilePicErr]= useState(false)

    const [showoverlay, setShowoverlay] = useState(false);
    console.log(showoverlay, "showoverlay");
    const targetRef = useRef(null);
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])


    const changeHandler = value => {
        console.log(value, "country");
        setfundHeadQuarter(value?.label)
        setValue(value)
    }

    const dispatch = useDispatch();
    // const [imageData, setImageData] = useState();
    // const [fundDesc, setFundDesc] = useState('')
    // const [projectDetailsData, setProjectDetalsData] = useState([])
    // const [roleinOrganization, setRoleinOrganization] = useState('')

    // const [preferredSectors, setPreferredSectors] = useState('')
    // const [typeofFund, setTypeofFund] = useState('')
    // const [fundHeadQuater, setFundHeadQuater] = useState('')
    // const [minInvestSize, setMinInvestSize] = useState('')
    // const [assetsUnderMang, setAssetsUnderMang] = useState('')
    // const [fundName, setFundName] = useState('')
    // const [projInvestedtilldate, setprojInvestedtilldate] = useState('')
    // const [projectInvested, setprojectInvested] = useState('')
    // const [teamSize, setTeamSize] = useState(0)
    // const [password, setpassword] = useState('')
    // const [linkedin, setlinkedin] = useState('')
    // const [websiteLink, setwebsiteLink] = useState('')
    // const [twitterLink, setTwitterLink] = useState('')
    // const [linkedInLink, setLinkedInLink] = useState('')
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const loginId = useSelector((state) => state.constVar.loginId)
    console.log(loginId, "loginId");
    const submitDetails = () => {
        updateProfileDetails()

    }
    const handleClosePopup = () => {
        dispatch(showSettings(false))
        handleClose()
    }
    const addProfileDetails = () => {
        try {


            var query = `

            mutation CreateUserDetail($input: UserConfigInput) {
              createUserDetail(input: $input) {
                _id
                user {
                  _id
                  email
                  password
                  role
                  contact
                  first_name
                  last_name
                }
                role
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
              }
            }
            `;
            fetch(apiURI.URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
                },
                body: JSON.stringify({
                    query,
                    variables: {

                        "input": {
                            "fund_description": fundDesc,
                            "role": roleinOrganization,
                            "minimum_investment_size": minInvestSize,
                            "project_invested": projectInvested,
                            "type_of_fund": typeofFund,
                            "preferred_sectors": preferredSectors,
                            "fund_name": fundName,
                            "asset_under_management": assetsUnderMang,
                            "projected_invested_till_date": projInvestedtilldate,
                            "fund_head_quarters": fundHeadQuater,
                            "team_size": teamSize
                        }



                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.createUserDetail != null && data?.data?.createUserDetail != undefined) {

                        setProjectDetalsData(data?.data?.createUserDetail)
                    }
                });

        } catch (error) {
            console.log(error, "ProfileSettings  in profile in investors error");
        }
    }

    const toggle = () => {
        setShowoverlay(!showoverlay)
    }

    // const updateProfileDetails = () => {




    //     try {


    //         var query = `


    //         mutation UpdateUser($id: ID, $input: UserInput) {
    //           updateUser(_id: $id, input: $input) {
    //             _id
    //             email
    //             password
    //             role
    //             contact
    //             first_name
    //             last_name
    //             role_in_organization
    //             fund_description
    //             minimum_investment_size
    //             project_invested
    //             type_of_fund
    //             preferred_sectors
    //             fund_name
    //             asset_under_management
    //             projected_invested_till_date
    //             fund_head_quarters
    //             team_size
    //           }
    //         }
    //     `;
    //         fetch(apiURI.URL, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                  'Accept': 'application/json',
        //   'x-power': process.env.POWER_KEY,
        //   'x-domain-agent': process.env.DOMAIN_AGENT,
        //   'x-strict-origin-name': process.env.ORIGIN_NAME,
        //   'x-range-name': process.env.RANGE_NAME
    //             },
    //             body: JSON.stringify({
    //                 query,
    //                 variables: {

    //                     "id": loginId,
    //                     "input": {
    //                         "role_in_organization": roleinOrganization,
    //                         "fund_description": fundDesc,
    //                         "minimum_investment_size": minInvestSize,
    //                         "project_invested": projectInvested,
    //                         "type_of_fund": typeofFund,
    //                         "preferred_sectors": preferredSectors,
    //                         "fund_name": fundName,
    //                         "asset_under_management": assetsUnderMang,
    //                         "projected_invested_till_date": projInvestedtilldate,
    //                         "fund_head_quarters": fundHeadQuater,
    //                         "team_size": parseInt(teamSize)
    //                     },

    //                 }
    //             })
    //         })
    //             .then((response) => {

    //                 const json = response.json();
    //                 return json;
    //             })
    //             .then(data => {
    //                 console.log(data, loginId, "ProfileSettings  data");
    //                 // dispatch(fetchProfileDetails(loginId))
    //                 if (data?.data?.UpdateUser != null && data?.data?.UpdateUser != undefined) {

    //                     console.log(data.data.UpdateUser, "ProfileSettings  Insidedata");
    //                     setProjectDetalsData(data?.data?.UpdateUser)
    //                 } else {
    //                     setProjectDetalsData([])
    //                 }
    //             });

    //     } catch (error) {
    //         console.log(error, "ProfileSettings  in profile in investors error");
    //     }

    // }
    // console.log(projectDetailsData,"projectDetailsData");
    const Option = props => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };


    const MultiValue = props => (
        <components.MultiValue {...props}>
            <span>{props.data.label}</span>
        </components.MultiValue>
    );

    const handleChange = selected => {
        console.log(selected, "selected");
        setproffredSector(selected)
        // for(var i = 0;i<)
        //  settokenType()
        // setoptionSelected()
        //   optionSelected: selected
        // });
    };

    const beforeUpload = (e) => {
        console.log(e.target.files[0].type, "file.type");
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {
            // toast.success('Please check your details', {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            // });
            onFileChange(e)
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
        // const isXls = file.type === 'application/vnd.xlsx';
        // if (!isXls) {
        //   message.error('You can only upload XLS file!');
        // }

        // return isXls;
    }

    const onFileChange = (e) => {
        var file = e.target.files[0]
        console.log(file, 'file');
        // if(!file) return
        setImageData([{ file: file }])
        // uploadFile({ variables: { file } })
    };

    const closeFunc = () => {

        setImageData([])
        handleClosePopup()
    }

    const getUpdateConfirm = () => {
        if (firstName != null && firstName != undefined && firstName != ''
            && lastName != null && lastName != undefined && lastName != ''
            && profileDesc != null && profileDesc != undefined && profileDesc != ''
            // && roleInOrg != null && roleInOrg != undefined && roleInOrg != ''
            && linkeIn != null && linkeIn != undefined && linkeIn != ''
            // && (imageData.length > 0 || (profileDetails.length > 0 && profileDetails[0]?.profile_pic != null && profileDetails[0]?.profile_pic != undefined && profileDetails[0]?.profile_pic != ''))
        ) {
            updateProfileDetails()

        } else {
            if(firstName != null && firstName != undefined && firstName != ''){
                setFirstnameErr(false)
            }else{
                setFirstnameErr(true)
            }
            if(lastName != null && lastName != undefined && lastName != ''){
                setLastNameErr(false)
            }else{
                setLastNameErr(true)
            }
            if(profileDesc != null && profileDesc != undefined && profileDesc != ''){
                setSelfDescErr(false)
            }else{
                setSelfDescErr(true)
            }
            // if(roleInOrg != null && roleInOrg != undefined && roleInOrg != ''){
            //     setroleOrgErr(false)
            // }else{
            //     setroleOrgErr(true)
            // }
            if(linkeIn != null && linkeIn != undefined && linkeIn != ''){
                setLinkedInErr(false)
            }else{
                setLinkedInErr(true)
            }
            // if(imageData.length > 0 || (profileDetails.length > 0 && profileDetails[0]?.profile_pic != null && profileDetails[0]?.profile_pic != undefined && profileDetails[0]?.profile_pic != '')){
            //     setProfilePicErr(false)
            // }else{
            //     setProfilePicErr(true)
            // }
        }
    }

    console.log(profileDetails, "profileDetails?.profile_pic");
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={show || showSettingsProfile}
                onHide={handleClosePopup}
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
                                        profileDetails.length > 0 ?

                                            <img className="inline-block" src={profileDetails[0]?.profile_pic} alt="" />
                                            :

                                            <img className="inline-block" src={""} alt="" />
                                    }
                                    {/* <img className="inline-block" src={""} alt="" /> */}
                                    <div className="fileupload btn">
                                    {/* <span className="text-danger">*</span> */}
                                        <span className="btn-text">edit</span>
                                        <input className="upload" type="file" beforeUpload={beforeUpload} onChange={beforeUpload} />
                                    </div>
                                </div>
                                {ProfilePicErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Upload Image</div> : ''}

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        {firstNameErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter First Name</div> : ''}

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={lastName} onChange={(e) => setlastName(e.target.value)} />
                                        </div>
                                        {LastNameErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Last Name</div> : ''}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Self Description<span className="text-danger">*</span></label>
                                            {/* <Button id="TooltipExample" style={{ width: '20px', height: '20px', fontSize: '15px', borderRadius: '50px', padding: '0px', marginLeft: '5px' }} ref={targetRef} onClick={() => setShowoverlay(!showoverlay)}>
                                                ?
                                            </Button> */}
                                            {/* <Tooltip placement="right" isOpen={showoverlay} target="TooltipExample" >
                                            Please provide a brief introduction about yourself
                                            </Tooltip> */}
                                            <div>

                                                <textarea type="text" data-tip="Please provide a brief introduction about yourself" className="form-control" style={{ height: '220px' }} defaultValue={profileDesc} onChange={(e) => setProfileDesc(e.target.value)} />
                                                <ReactTooltip place="top" type="info" effect="solid" />
                                            </div>
                                            {SelfDescErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Self Description</div> : ''}
                                        </div>
                                    </div>
                                    {/* {isAngel?       ""  : <div className="row"><div className="col-md-6">
                                        <div className="form-group">
                                            <label>Fund Name</label>
                                            <input type="text" className="form-control" defaultValue={fundName} onChange={(e) => setfundName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Role in the Organisation<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={roleInOrg} onChange={(e) => setRoleInOrg(e.target.value)} />
                                        </div>
                                        {roleOrgErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter Role in the Organisation</div> : ''}

                                    </div></div>

                                    } */}
                         



                                    <div className="col-md-12">
                                        {/* <div className="form-group"></div> */}
                                        <h3 className="card-title">Social Media</h3>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>LinkedIn<span className="text-danger">*</span></label>
                                            <div>
                                                <input type="text" data-tip="Link to your Linkedin profile" className="form-control" defaultValue={linkeIn} onChange={(e) => setlinkeIn(e.target.value)} />
                                                <ReactTooltip place="top" type="info" effect="solid" />
                                            </div>
                                            {LinkedInErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Enter LinkedIn</div> : ''}

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Twitter</label>
                                            <div>
                                                <input type="text" data-tip="Link to your Twitter profile" className="form-control" defaultValue={twitterLink} onChange={(e) => settwitterLink(e.target.value)} />
                                                <ReactTooltip place="top" type="info" effect="solid" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Telegram</label>
                                            <div>
                                                <input type="text" data-tip="Link Your Telegram ID" className="form-control" defaultValue={telegramLink} onChange={(e) => setTelegramLink(e.target.value)} />
                                                <ReactTooltip place="top" type="info" effect="solid" />
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn cl" onClick={() => closeFunc()}>CLOSE</button>
                    </div>
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() =>getUpdateConfirm()}>SUBMIT</button>
                    </div>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Save</Button> */}
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