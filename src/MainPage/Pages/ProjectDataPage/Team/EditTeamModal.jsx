import React, { useState } from 'react';

import { Button, Modal, } from "react-bootstrap";
import { ToastContainer, toast } from 'material-react-toastify';
import { gamingImg, founderImage } from '../../../../Entryfile/imagepath';

import 'material-react-toastify/dist/ReactToastify.css';


function EditTeamModal({
    profileImage,
    nameError,
    RoleError,
    pastOrgTagsError,
    ProfileLinkError,
    profilePic,
    setProfilePic,
    setPastOrgTags,
    setTelegramLink,
    pastOrgTags,
    TelegramLink,
    checkDataTeam,
    checkData,
    show,
    handleClose,
    Name,
    setName,
    Role,
    setRole,
    ProfileLink,
    setProfileLink,
    createSocialFunc,
    updateSocialFunc,
    deleteTeamFunction,
    setTwitterLink,
    TwitterLink
}) 
{

    const onImageChange = (e) => {
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {

            var file = e.target.files[0]
            console.log(file, 'file');
            // if(!file) return
            setProfilePic([{ file: file }])
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


    // defaultValue={profilePic} onChange={(e) => setProfilePic(e.target.value)}

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
                    <Modal.Title>Team Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        {/* <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Profile Picture <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={profilePic} onChange={(e) => setProfilePic(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={Name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Role <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={Role} onChange={(e) => setRole(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Past Organisations Tags <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={pastOrgTags} onChange={(e) => setPastOrgTags(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Linkedin <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={ProfileLink} onChange={(e) => setProfileLink(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Telegram :</label>
                                            <input type="text" className="form-control" defaultValue={TelegramLink} onChange={(e) => setTelegramLink(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Twitter </label>
                                            <input type="text" className="form-control" defaultValue={TwitterLink} onChange={(e) => setTwitterLink(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-12">


                                        <div className="form-group">
                                            <div className="profile-img-wrap edit-img" style={{ margin: '0 auto 2px' }}>


                                                {profilePic.length > 0 ?
                                                    <img className="inline-block" src={URL.createObjectURL(profilePic[0].file)} alt="" />
                                                    :
                                                    profileImage != null && profileImage != undefined && profileImage != '' ?

                                                        <img className="inline-block" src={profileImage} alt="" />
                                                        :

                                                        <img className="inline-block" src={""} alt="" />
                                                }


                                                {/* {profilePic?.length > 0 ?
                                                    <img className="inline-block" src={URL.createObjectURL(profilePic[0].file)} alt="" />
                                                    :
                                                    <img className="inline-block" src={founderImage} alt="" />

                                                } */}
                                                {/* <img className="inline-block" src={founderImage} alt="" /> */}
                                                <div className="fileupload btn">
                                                    <span className="btn-text">edit</span>
                                                    <input className="upload" type="file" onChange={onImageChange} />
                                                </div>
                                                {/* <label>Profile Picture <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={founderImage} onChange={(e) => setProfilePic(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={Name} onChange={(e) => setName(e.target.value)} />
                                        </div>

                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Role <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={Role} onChange={(e) => setRole(e.target.value)} />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Past Organisations Tags <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={pastOrgTags} onChange={(e) => setPastOrgTags(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Linkedin <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={ProfileLink} onChange={(e) => setProfileLink(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Telegram </label>
                                            <input type="text" className="form-control" defaultValue={TelegramLink} onChange={(e) => setTelegramLink(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Twitter </label>
                                            <input type="text" className="form-control" defaultValue={TwitterLink} onChange={(e) => setTwitterLink(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>

                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)"}}>CANCEL</button>
                    </div>
                    <div className="submit-section">
                        <button className="btn btn-danger submit-btn" onClick={() => deleteTeamFunction()}>DELETE</button>
                    </div>

                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => updateSocialFunc()}>SAVE</button>
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

export default EditTeamModal;