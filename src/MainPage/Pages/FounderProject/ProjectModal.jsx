import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import { Button, Modal, } from "react-bootstrap";


function ProjectModal({

    VideoPitch,
    setVideoPitch,
    productDemo,
    setproductDemo,
    LinkedIn, setLinkedIn,
    onelinedescription,
    setOnelinedescription,
    setProfilePicCover,
    twitter,
    settwitter,
    Instagram,
    setInstagram,
    Medium,
    setMedium,
    facebook,
    setfacebook,
    Discord,
    setDiscord,
    Reddit,
    setReddit,
    youTube,
    setyouTube,

    PitchDeckMainLink,
    OnePageDocMainLink,
    WhitePaperMainLink,
    fundRaisedTillNow,
    setFundRaisedTillNow,
    InvestorScore,
    setInvestorScore,
    validatorScore,
    setvalidatorScore,
    publicLaunchPrice,
    setpublicLaunchPrice,
    settotalBudget,
    totalBudget,
    settotalFundRaiseTarget,
    totalFundRaiseTarget,
    // projectEndDate,
    // setProjectEndDate,


    WalledtAddress,
    setWalledtAddress,
    checkPage,
    show,
    handleClose,
    draftStatus,
    Telegram,
    setTelegram,
    emailId,
    setEmailId,
    firstName,
    setfirstName,
    lastName,
    setlastName,

    linkedInLink,
    setlinkedInLink,
    projectName,
    setprojectName,
    projectDesc,
    setprojectDesc,
    natureofProject,
    setnatureofProject,
    projectStartDate,
    setprojectStartDate,
    whitePaper,
    setwhitePaper,
    onePitchDoc,
    setonePitchDoc,
    onePagerDoc,
    setonePagerDoc,
    noofFounders,
    setnoofFounders,
    teamSize,
    setteamSize,
    projectTags,
    setprojectTags,
    projectStage,
    setprojectStage,
    websiteLink,
    setWebsiteLink,
    githubRepo,
    setgithubRepo,
    saveNewPojectData,
    editAndSaveData,
    // updateSocialFunc,
    imageData,
    setImageData,
    profilePic,
    profilePicCover,
    setProfilePic,
    // createSocialFunc,
    imageCoverData,
    setWhitePaperMainLink,
    setImageCoverData,
    safeDraftFunc,
    editSaveDraftFunc,
    PitchDeckLink,
    setPitchDeckLink,
    setOnePageDocLink,
    OnePageDocLink
}) {

    const [onePagerUploadLink, setOnePagerUploadLink] = useState(false)
    const [pitchDeckUploadLink, setPitchDeckUploadLink] = useState(false)
    const [uploadLink, setUploadLink] = useState(false)
    const hiddenFileInput3 = React.useRef(null);
    const hiddenFileInput = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);
    const [step, setstep] = useState(1);
    const [alertwordcount, setalertwordcount] = useState(false)
    const [alertmsg,setalertmsg]=useState(false);
    
    const onFileChange = (e) => {
        var file = e.target.files[0]
        console.log(file, 'file');
        // if(!file) return
        setwhitePaper([{ file: file }])
        if (e.target.files.length>0){
          
            toast.success('White paper updated successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        // uploadFile({ variables: { file } })
    };

    const onFileChange1 = (e) => {
        // Update the state 
        var file = e.target.files[0]
        console.log(file, 'file');
        setonePagerDoc([{ file: file }])
        if (e.target.files.length>0){
        
            toast.success('One Pager  updated successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        // setonePagerDoc(event.target.files[0])
    };

    const onFileChange2 = (e) => {
        // Update the state 
        // var file = e.target.files[0]
        // console.log(file,'file');
        // setwhitePaper([{file:file}])
        // setonePitchDoc(event.target.files[0])
        var file = e.target.files[0]
        console.log(file, 'file');
        setonePitchDoc([{ file: file }])
        if (e.target.files.length>0){
       
            toast.success('Pitch Deck updated successfully', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }

    const handleClickFile3 = event => {
        hiddenFileInput3.current.click();
    };
    const handleClickFile = event => {
        hiddenFileInput.current.click();

    };

    const handleClickFile2 = event => {
        hiddenFileInput2.current.click();
    };

    const saveNewPojectData2 = () => {
        console.log("")
        if (
            // (
            // imageCoverData.length > 0 || 
            // profilePicCover != '' && profilePicCover != null && profilePicCover != undefined) &&
            (imageData.length > 0 || profilePic != '' && profilePic != null && profilePic != undefined) &&
            // (whitePaper.length > 0 || WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined) &&
            // (onePagerDoc.length > 0 || OnePageDocLink != '' && OnePageDocLink != null && OnePageDocLink != undefined)
         (onePitchDoc.length > 0 || PitchDeckLink != '' && PitchDeckLink != null && PitchDeckLink != undefined) &&
            // && WalledtAddress != null && WalledtAddress != ''//
            // && linkedInLink != null && linkedInLink != '' &&
            projectName != null && projectName != '' &&
            onelinedescription != null && onelinedescription != '' &&
            projectDesc != null && projectDesc != '' &&
            natureofProject != null && natureofProject != '' &&
            projectStartDate != null && projectStartDate != '' &&
            // projectTags != null && projectTags != '' &&
            projectStage != null && projectStage != '' &&
            websiteLink != null && websiteLink != '' &&
            noofFounders != null && noofFounders != '' &&
            teamSize != null && teamSize != '' 
            // projectEndDate != null && projectEndDate != '' &&
            // totalFundRaiseTarget != null && totalFundRaiseTarget != '' &&
            // totalBudget != null && totalBudget != '' &&
            // publicLaunchPrice != null && publicLaunchPrice != ''
            // && fundRaisedTillNow != null && fundRaisedTillNow != ''
            // twitter != null && twitter != ''

        ) {

            saveNewPojectData()
        } else {
            // console.log((imageCoverData.length > 0 || profilePicCover != '' && profilePicCover != null && profilePicCover != undefined) ,
            // (imageData.length > 0 || profilePic != '' && profilePic != null && profilePic != undefined) ,
            // (whitePaper.length > 0 || WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined) ,
            // (onePagerDoc.length > 0 || OnePageDocLink != '' && OnePageDocLink != null && OnePageDocLink != undefined)
            // ,(onePitchDoc.length > 0 || PitchDeckLink != '' && PitchDeckLink != null && PitchDeckLink != undefined)
            // , WalledtAddress != null && WalledtAddress != ''
            // , linkedInLink != null && linkedInLink != '' ,
            // projectName != null && projectName != '' ,
            // onelinedescription != null && onelinedescription != '' ,
            // projectDesc != null && projectDesc != '' ,
            // natureofProject != null && natureofProject != '' ,
            // projectStartDate != null && projectStartDate != '' ,
            // projectTags != null && projectTags != '' ,
            // projectStage != null && projectStage != '' ,
            // websiteLink != null && websiteLink != '' ,
            // noofFounders != null && noofFounders != '' ,
            // teamSize != null && teamSize != '' ,
            // // projectEndDate != null && projectEndDate != '' ,
            // totalFundRaiseTarget != null && totalFundRaiseTarget != '' ,
            // totalBudget != null && totalBudget != '' ,
            // publicLaunchPrice != null && publicLaunchPrice != ''
            // , fundRaisedTillNow != null && fundRaisedTillNow != ''
            // , twitter != null && twitter != '',"dmknjnjn");

            toast.warn('Make sure all required fields are filled sv', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        // createSocialFunc()
    }

    const editAndSaveData2 = () => {
        if (
            // (
            // imageCoverData.length > 0 ||
            //  profilePicCover != '' && profilePicCover != null && profilePicCover != undefined)
            //  &&
            (imageData.length > 0 || profilePic != '' && profilePic != null && profilePic != undefined)
            // (whitePaper.length > 0 || WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined)
            // &&(onePagerDoc.length > 0 || OnePageDocLink != '' && OnePageDocLink != null && OnePageDocLink != undefined)
            && (onePitchDoc.length > 0 || PitchDeckLink != '' && PitchDeckLink != null && PitchDeckLink != undefined) &&
            // && WalledtAddress != null && WalledtAddress != ''
            // && linkedInLink != null && linkedInLink != '' &&
            projectName != null && projectName != '' &&
            onelinedescription != null && onelinedescription != '' &&
            projectDesc != null && projectDesc != '' &&
            natureofProject != null && natureofProject != '' &&
            projectStartDate != null && projectStartDate != '' &&
            // projectTags != null && projectTags != '' &&
            projectStage != null && projectStage != '' &&
            websiteLink != null && websiteLink != '' &&
            noofFounders != null && noofFounders != '' &&
            teamSize != null && teamSize != '' 
            // projectEndDate != null && projectEndDate != '' &&
            // totalFundRaiseTarget != null && totalFundRaiseTarget != '' &&
            // totalBudget != null && totalBudget != '' &&
            // publicLaunchPrice != null && publicLaunchPrice != ''
            // && fundRaisedTillNow != null && fundRaisedTillNow != ''
            // twitter != null && twitter != ''

        ) {

            editAndSaveData()
        } else {


            toast.warn('Make sure all required fields are filled ed', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        // updateSocialFunc()
    }

    const changeData = () => {
        setImageCoverData([])
        setImageData([])
        handleClose()
    }





    const onImageChange = (e) => {
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

    const onImageCoverChange = (e) => {
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {

            var file = e.target.files[0]
            console.log(file, 'file');
            // if(!file) return
            setImageCoverData([{ file: file }])
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



    const teamSizeFunc = (i) => {

        if (i.target.validity.valid) {
            setteamSize(i.target.value)

        }

    }

    const handleSHowInputfunc = () => {
        setUploadLink(true)
    }

    const handleCloseInputFunc = () => {
        setUploadLink(false)
    }
    const handleSHowPagerUploadInputfunc = () => {
        setOnePagerUploadLink(true)
    }

    const handleClosePagerUploadInputFunc = () => {
        setOnePagerUploadLink(false)
    }

    const handlePitchDeckSHowInputfunc = () => {
        setPitchDeckUploadLink(true)
    }

    const handlePitchDeckCloseInputFunc = () => {
        setPitchDeckUploadLink(false)
    }

    const incrementStep = () => {
        console.log("step ,",draftStatus,checkPage);
console.log(onelinedescription.length,"desclength")

        if(onelinedescription.length > 50)
        {
            alert("please fill one line description with less than 50 characters")

        } 
        else if(alertwordcount)
        {
            alert("please fill Project description with less than 50 Words")

        } 
        else{
        setstep(step+1);

    if (draftStatus == true && checkPage != null && checkPage != undefined && checkPage != '')
    {
       console.log("save draft"); 
       editSaveDraftFunc();
     
    }
    else if(draftStatus == true){
       console.log("save draft");
       safeDraftFunc();
     
    }
}
    
    }
    const decrementStep = () => {
        console.log("step");
     setstep(step-1);
     
    }
    const saveDetails = () => {
        if (checkPage != null && checkPage != undefined && checkPage != '')
        {
            editAndSaveData2();
         }
         else{
    
            saveNewPojectData2();
         }
        }
        const OneLineDesc = (e) => {
            console.log(e,"desc")
 
            if(e.length >50)
            {
             setalertmsg(true);
             setOnelinedescription(e);
            }
            else{
                setalertmsg(false);
                setOnelinedescription(e);
            }

         
        }

        const setprojectDescription = (e) => {
        let str1=e; 
            str1 = str1.replace(/(^\s*)|(\s*$)/gi,"");
//convert 2 or more spaces to 1  
str1 = str1.replace(/[ ]{2,}/gi," ");
// exclude newline with a start spacing  
str1 = str1.replace(/\n /,"\n");
let desclength=str1.split(' ').length;
console.log(desclength);
if(desclength > 50)
{
    setalertwordcount(true)

}
else{
    setalertwordcount(false)
    setprojectDesc(e);
}
         
}

    


    return (
        <>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                
                <Modal.Body style={{padding:"0px"}}>
                    {/* <form> */}
                    <div className="row">
                     

                        


                    <div className="col-md-12">
                    
                    <div className="card" >
                      
   <div className="card-body" >
   <div ><button type='button' className='close' onClick={() => { handleClose()}}>x</button></div>
    {step==1 ? 
      <ul className="nav nav-tabs nav-tabs-bottom nav-justified" style={{width:"80%",margin:"auto"}}>
         <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 1</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link " href="#bottom-justified-tab1" >step 2</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link" href="#bottom-justified-tab1" >step 3</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link" href="#bottom-justified-tab1" >step  4</a>
            </li>
      </ul>:""}

      {step==2 ? 
      <ul className="nav nav-tabs nav-tabs-bottom nav-justified" style={{width:"80%",margin:"auto"}}>
           <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 1</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 2</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link " href="#bottom-justified-tab1" >step 3</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link" href="#bottom-justified-tab1" >step 4</a>
            </li>
      </ul>:""}
      {step==3 ? 
      <ul className="nav nav-tabs nav-tabs-bottom nav-justified" style={{width:"80%",margin:"auto"}}>
       <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 1</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 2</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 3</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link " href="#bottom-justified-tab1" >step 4</a>
            </li>
      </ul>:""}
      {step==4 ? 
      <ul className="nav nav-tabs nav-tabs-bottom nav-justified" style={{width:"80%",margin:"auto"}}>
             <li className="nav-item cent " >
            <div className='circle'></div>
            <a className="nav-link active" href="#bottom-justified-tab1" >step 1</a>
            </li>

            <li className="nav-item cent " >
            <div className='circle'></div>
            <a className="nav-link active"  href="#bottom-justified-tab1" >step 2</a>
            </li>

            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active"  href="#bottom-justified-tab1" >step 3</a>
            </li>
            <li className="nav-item cent" >
            <div className='circle'></div>
            <a className="nav-link active"  href="#bottom-justified-tab1" >step 4</a>
            </li>
      </ul>:""}


      <div className="tab-content">


      {step==1?
         <div className="tab-pane show active" id="bottom-justified-tab1">
            <div style={{ width: '100%' }}>
            <div className="profile-img-wrap edit-img" style={{ margin: '0 auto 2px', height: '220px', width: '100%', borderRadius: '0px' }}>
            {imageCoverData?.length > 0 ?
            <img className="inline-block" src={URL.createObjectURL(imageCoverData[0].file)} alt="Upload a image with minimum size 1280 x 720" style={{ height: '220px', width: '100%', borderRadius: '0px', display: 'block', textAlign: 'center' }} />
            :
            <img className="inline-block" src={profilePicCover} alt="Upload a image with minimum size 1280 x 720" style={{ height: '220px', width: '100%', borderRadius: '0px', display: 'block', textAlign: 'center' }} />
            }
            <div className="fileupload btn" >
               <span className="btn-text" style={{ alignSelf: "center", fontWeight: "600" }}>Edit cover Page<span className="text-danger"></span></span>
               <input className="upload" type="file" onChange={onImageCoverChange} style={{ width: '100%' }} />
            </div>
         </div>
      </div>
      <div className="col-md-12">
         <div className="profile-img-wrap edit-img" style={{ float: "right", marginTop: "-110px" }}>
         {imageData?.length > 0 ?
         <img className="inline-block" alt="min size 150 x 150" src={URL.createObjectURL(imageData[0].file)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
         :
         <img className="inline-block" alt="min size 150 x 150" src={profilePic} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
         }
         {/* <img className="inline-block" src={""} alt="" /> */}
         <div className="fileupload btn" >
            <span className="btn-text" style={{ fontWeight: "600" }}>Edit<span className="text-danger">*</span></span>
            <input className="upload" type="file" onChange={onImageChange} style={{ width: '300px',height:"100px" }}/>
         </div>
      </div>
      {/* <label style={{ width: '100%', textAlign: 'center' }}>Logo<span className="text-danger">*</span></label> */}
   </div>
   <div className="col-md-12">
                                    <div className="form-group">
                                        <label className='ft-weight'>Project Name<span className="text-danger ft-weight">*</span></label>
                                        <input type="text" className="form-control" defaultValue={projectName} onChange={(e) => setprojectName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>OneLine Description<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" defaultValue={onelinedescription} onChange={(e) => OneLineDesc(e.target.value)} />
                                        {alertmsg ==true ?
                                         <p style={{color:"red",fontWeight:"400",marginTop:"10px"}}> Please enter a one line description with less than 50 characters</p> : ""
                                        }
                                       
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Project Description<span className="text-danger">*</span></label>
                                        <textarea type="text" className="form-control" defaultValue={projectDesc} onChange={(e) => setprojectDescription(e.target.value)} style={{ height: '140px' }} />
                                       
                                    </div>
                                    {alertwordcount ? <p>please enter description less than 50 words</p>:<p></p>}
                                </div>

                                <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Nature of Project<span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control"  /> */}
                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={natureofProject} onChange={(e) => setnatureofProject(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="" >Select</option>
                                                <option style={{ fontSize: '13px' }} value="DEFI ">DEFI </option>
                                                <option style={{ fontSize: '13px' }} value="gamify">gamify</option>
                                                <option style={{ fontSize: '13px' }} value="P2E">P2E</option>
                                                <option style={{ fontSize: '13px' }} value="Metaverse">Metaverse</option>
                                                <option style={{ fontSize: '13px' }} value="exchange">exchange</option>
                                                <option style={{ fontSize: '13px' }} value="infrastructure">infrastructure</option>
                                                <option style={{ fontSize: '13px' }} value="layer 1">layer 1</option>
                                                <option style={{ fontSize: '13px' }} value="layer 2">layer 2</option>
                                                <option style={{ fontSize: '13px' }} value="NFT">NFT</option>
                                                <option style={{ fontSize: '13px' }} value="others">others</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Project Start Date<span className="text-danger">*</span></label>
                                        {/* max={projectEndDate} */}
                                        <input type="date" className="form-control" value={projectStartDate} onChange={(e) => setprojectStartDate(e.target.value)} />
                                    </div>
                                </div>
                                </div>
                      
                                <button className="btn btn-primary submit-btn" style={{float:"right"}} onClick={() => { incrementStep()}} >Next</button>
</div>
:""}


{step==2? 
<div className="" id="bottom-justified-tab2 ">
<div className=" row" >

<div className="col-6">
                                    <div className="form-group">
                                        <label>Project Tags<span className="text-danger"></span></label>
                                        <input type="text" className="form-control" defaultValue={projectTags} onChange={(e) => setprojectTags(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Project Stage<span className="text-danger">*</span></label>
                                        <div>
                                            <select className="form-control btn-block-height square-edges" defaultValue={projectStage} onChange={(e) => setprojectStage(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="" >Select</option>
                                                <option style={{ fontSize: '13px' }} value="Ideation">Ideation</option>
                                                <option style={{ fontSize: '13px' }} value="Proof of concept">Proof of concept</option>
                                                <option style={{ fontSize: '13px' }} value="Minimum Viable Product">Minimum Viable Product</option>
                                                <option style={{ fontSize: '13px' }} value="Growth Stage ">Growth Stage </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>No of Founders<span className="text-danger">*</span></label>
                                        <div>
                                            <select className="css-1s2u09g-control" defaultValue={noofFounders} onChange={(e) => setnoofFounders(e.target.value)}>
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                                                <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                <option style={{ fontSize: '13px' }} value="4 ">4 </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Team Size<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" defaultValue={teamSize} onChange={(e) => teamSizeFunc(e)} onWheel={(e) => e.target.blur()} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Website<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" defaultValue={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
                                    </div>
                                </div><div className="col-md-6">
                                    <div className="form-group">
                                        <label>Github Repository</label>
                                        <input type="text" className="form-control" defaultValue={githubRepo} onChange={(e) => setgithubRepo(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Total Fund Raise Target<span className="text-danger"></span></label>
                                        <input type="number" className="form-control" defaultValue={totalFundRaiseTarget} onWheel={(e) => e.target.blur()} onChange={(e) => settotalFundRaiseTarget(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Total Budget<span className="text-danger"></span></label>
                                        <input type="number" className="form-control" defaultValue={totalBudget} onWheel={(e) => e.target.blur()} onChange={(e) => settotalBudget(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Public Launch Price<span className="text-danger"></span></label>
                                        <input type="number" className="form-control" defaultValue={publicLaunchPrice} onWheel={(e) => e.target.blur()} onChange={(e) => setpublicLaunchPrice(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Funds Raised Till Date<span className="text-danger"></span></label>
                                        <input type="number" className="form-control" defaultValue={fundRaisedTillNow} onWheel={(e) => e.target.blur()} onChange={(e) => setFundRaisedTillNow(e.target.value)} />
                                    </div>
                                </div></div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                <button className="btn btn-primary submit-btn" onClick={() => { decrementStep()}}>Previous</button>
                                <button className="btn btn-primary submit-btn" onClick={() => { incrementStep()}} >Next</button>
                                </div>
</div>:""}



{step==3 ? <div className="" id="bottom-justified-tab3">
<div className="col-md-12">
                                    <div className="form-group">
                                        <label>Whitepaper<span className="text-danger"></span></label>
                                        {/* defaultValue={whitePaper}  onChange={onFileChange}*/}
                                        {WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined && uploadLink == false ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '30%', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(WhitePaperMainLink) }} >WhitePaper</div>
                                                {/* <input type="file" className="form-control" onChange={onFileChange} style={{ width: '65%' }} /> */}

                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handleClickFile}>Upload a file</button>


                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handleSHowInputfunc}>Upload Link</button>
                                            </div>
                                            :
                                            WhitePaperMainLink != '' && WhitePaperMainLink != null && WhitePaperMainLink != undefined && uploadLink == true ?
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {/*  */}
                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={WhitePaperMainLink} onChange={(e) => setWhitePaperMainLink(e.target.value)} />
                                                    <button style={{
                                                        borderRadius: '0px 5px 5px 0px',
                                                        fontSize: '22px',
                                                        height: "44px", minWidth: '65px', fontWeight: '600'

                                                    }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                </div>

                                                :
                                                uploadLink == true ?
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        {/*  */}
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={WhitePaperMainLink} onChange={(e) => setWhitePaperMainLink(e.target.value)} />
                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '22px',
                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                        }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                    </div>
                                                    :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handleClickFile}>Upload a file</button>


                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handleSHowInputfunc}>Upload Link</button>
                                                    </div>
                                        }
                                        <input
                                            type="file"
                                            ref={hiddenFileInput}
                                            onChange={onFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        {/* <input type="text" className="form-control" defaultValue={whitePaper} onChange={(e) => setwhitePaper(e.target.value)} /> */}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>OnePage Document<span className="text-danger"></span></label>
                                        {/* defaultValue={onePagerDoc} onChange={onFileChange1} */}



                                        {OnePageDocLink != '' && OnePageDocLink != null && OnePageDocLink != undefined && onePagerUploadLink == false ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '30%', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(OnePageDocLink) }} >OnePage Document</div>

                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handleClickFile2}>Upload a file</button>

                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handleSHowPagerUploadInputfunc}>Upload Link</button>

                                                {/* <input type="file" className="form-control" onChange={onFileChange1} style={{ width: '65%' }} /> */}
                                            </div>
                                            :
                                            OnePageDocLink != '' && OnePageDocLink != null && OnePageDocLink != undefined && onePagerUploadLink == true ?
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {/*  */}
                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={OnePageDocLink} onChange={(e) => setOnePageDocLink(e.target.value)} />
                                                    <button style={{
                                                        borderRadius: '0px 5px 5px 0px',
                                                        fontSize: '22px',
                                                        height: "44px", minWidth: '65px', fontWeight: '600'

                                                    }} className="btn add-btn-search" onClick={handleClosePagerUploadInputFunc}>X</button>
                                                </div>

                                                :
                                                // <input type="file" className="form-control" onChange={onFileChange1} />

                                                onePagerUploadLink == true ?
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        {/*  */}
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={OnePageDocLink} onChange={(e) => setOnePageDocLink(e.target.value)} />
                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '22px',
                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                        }} className="btn add-btn-search" onClick={handleClosePagerUploadInputFunc}>X</button>
                                                    </div>
                                                    :

                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handleClickFile2}>Upload a file</button>

                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handleSHowPagerUploadInputfunc}>Upload Link</button>
                                                    </div>
                                        }
                                        <input
                                            type="file"
                                            ref={hiddenFileInput2}
                                            onChange={onFileChange1}
                                            style={{ display: 'none' }}
                                        />

                                        {/* <input type="text" className="form-control" defaultValue={onePagerDoc} onChange={(e) => setonePagerDoc(e.target.value)} /> */}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Pitch Deck<span className="text-danger"></span></label>
                                        {/* defaultValue={onePitchDoc} onChange={onFileChange2} */}

                                        {PitchDeckLink != '' && PitchDeckLink != null && PitchDeckLink != undefined && pitchDeckUploadLink == false ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '30%', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(PitchDeckLink) }} >Pitch Deck</div>
                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handleClickFile3}>Upload a file</button>


                                                <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} className="btn add-btn-search" onClick={handlePitchDeckSHowInputfunc}>Upload Link</button>

                                                {/* <input type="file" className="form-control" onChange={onFileChange2} style={{ width: '65%' }} /> */}
                                            </div>
                                            :
                                            PitchDeckLink != '' && PitchDeckLink != null && PitchDeckLink != undefined && pitchDeckUploadLink == true ?
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {/*  */}
                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={PitchDeckLink} onChange={(e) => setPitchDeckLink(e.target.value)} />
                                                    <button style={{
                                                        borderRadius: '0px 5px 5px 0px',
                                                        fontSize: '22px',
                                                        height: "44px", minWidth: '65px', fontWeight: '600'

                                                    }} className="btn add-btn-search" onClick={handlePitchDeckCloseInputFunc}>X</button>
                                                </div>

                                                :

                                                pitchDeckUploadLink == true ?
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        {/*  */}
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={PitchDeckLink} onChange={(e) => setPitchDeckLink(e.target.value)} />
                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '22px',
                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                        }} className="btn add-btn-search" onClick={handlePitchDeckCloseInputFunc}>X</button>
                                                    </div>
                                                    :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handleClickFile3}>Upload a file</button>

                                                        <button style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",

                                                        }} className="btn add-btn-search" onClick={handlePitchDeckSHowInputfunc}>Upload Link</button>
                                                    </div>
                                            // <input type="file" className="form-control" onChange={onFileChange2} />

                                        }
                                        <input
                                            type="file"
                                            ref={hiddenFileInput3}
                                            onChange={onFileChange2}
                                            style={{ display: 'none' }}
                                        />
                                        {/* <input type="text" className="form-control" defaultValue={onePitchDoc} onChange={(e) => setonePitchDoc(e.target.value)} /> */}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label> Product Demo </label>
                                        {/* <span className="text-danger">*</span>  */}
                                        {/* <span className="text-danger">*</span>  */}
                                        <input type="text" className="form-control" defaultValue={productDemo} onChange={(e) => setproductDemo(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label> Video Pitch</label>
                                        <input type="text" className="form-control" defaultValue={VideoPitch} onChange={(e) => setVideoPitch(e.target.value)} />
                                    </div>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                <button className="btn btn-primary submit-btn" onClick={() => { decrementStep()}}>Previous</button>
                                <button className="btn btn-primary submit-btn" onClick={() => { incrementStep()}}>Next</button>
                                </div>

</div>:""}

{step==4 ? <div className="" id="bottom-justified-tab4">
    <div className='row'>
<div className="col-md-6">
                                    <div className="form-group">
                                        <label>Twitter <span className="text-danger"></span> </label>
                                        <input type="text" className="form-control" defaultValue={twitter} onChange={(e) => settwitter(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Instagram </label>
                                        <input type="text" className="form-control" defaultValue={Instagram} onChange={(e) => setInstagram(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Medium </label>
                                        <input type="text" className="form-control" defaultValue={Medium} onChange={(e) => setMedium(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Facebook </label>
                                        <input type="text" className="form-control" defaultValue={facebook} onChange={(e) => setfacebook(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>LinkedIn <span className="text-danger"></span></label>
                                        <input type="text" className="form-control" defaultValue={linkedInLink} onChange={(e) => setlinkedInLink(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Discord </label>
                                        <input type="text" className="form-control" defaultValue={Discord} onChange={(e) => setDiscord(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Telegram </label>
                                        <input type="text" className="form-control" defaultValue={Telegram} onChange={(e) => setTelegram(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Reddit </label>
                                        <input type="text" className="form-control" defaultValue={Reddit} onChange={(e) => setReddit(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>YouTube </label>
                                        <input type="text" className="form-control" defaultValue={youTube} onChange={(e) => setyouTube(e.target.value)} />
                                    </div>
                                </div>
                                </div>

                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                <button className="btn btn-primary submit-btn" onClick={() => { decrementStep()}}>Previous</button>
                                <button className="btn btn-primary submit-btn" onClick={() => { saveDetails()}}>Finish</button>
                                </div>
</div>:""}
</div>
</div>
</div>

                  



                        

                           


                                {/* 
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Project End Date<span className="text-danger">*</span></label>
                                        <input type="date" className="form-control" min={projectStartDate} defaultValue={projectEndDate} onChange={(e) => setProjectEndDate(e.target.value)} />
                                    </div>
                                </div> */}

                   
                        


                                {/* /////////////////////// */}






                                {/*                                   
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name of Project<span className="text-danger">*</span></label>
                                            <div>
                                                <select className="form-control btn-block-height square-edges">
                                                    <option style={{ fontSize: '13px' }} value="" value="">Select</option>
                                                    <option style={{ fontSize: '13px' }} value="1 ">1 </option>
                                                    <option style={{ fontSize: '13px' }} value="2 ">2 </option>
                                                    <option style={{ fontSize: '13px' }} value="3 ">3 </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}


                                {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Project Address<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" defaultValue={WalledtAddress} onChange={(e) => setWalledtAddress(e.target.value)} />
                                        </div>
                                    </div> */}




                   

     





                           
                    
                        </div>
                       
                    </div>

                    {/* </form> */}
           
                </Modal.Body>


                
                {/* <Modal.Footer style={{ borderTop: '0px', justifyContent: 'end' }}> */}
                    {/* <div className="submit-section">
                        <button className="btn  submit-btn" onClick={() => changeData()} style={{ background: 'white', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }}>CANCEL</button>
                    </div>

                    {
                        draftStatus == true ?
                            checkPage != null && checkPage != undefined && checkPage != '' ?
                                <div className="submit-section">
                                    <button className="btn  submit-btn" style={{ background: 'white', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }} onClick={() => editSaveDraftFunc()}>Save Draft</button>
                                </div>
                                :
                                <div className="submit-section">
                                    <button className="btn  submit-btn" style={{ background: 'white', border: "1px solid rgb(41, 122, 255)", color: "rgb(41, 122, 255)" }} onClick={() => safeDraftFunc()}>Save Draft</button>
                                </div>
                            :
                            <></>
                    }
                    {checkPage != null && checkPage != undefined && checkPage != '' ?

                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={() => editAndSaveData2()}>SAVE</button>
                        </div>
                        :
                        <div className="submit-section">
                            <button className="btn btn-primary submit-btn" onClick={() => saveNewPojectData2()}>ADD</button>
                        </div>
                    } */}

{/* 
                </Modal.Footer> */}






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

export default ProjectModal;