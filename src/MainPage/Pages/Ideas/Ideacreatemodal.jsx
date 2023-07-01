
import "./idealist.css"
import React, { useState, useEffect, useMemo } from 'react';
import BulletPointsInput from "./BulletInput";
import { Route, withRouter } from 'react-router-dom';
import { Button, Modal, } from "react-bootstrap";
import { ToastContainer, toast } from 'material-react-toastify';
import { gql, useMutation } from '@apollo/client';
import { apiURI } from '../../../config/config';
import MySelect from './MySelect';
import { components } from "react-select";

const UPLOAD_FILE = gql`
        mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
            singleUpload(file: $file, input: $input) {
              filename
              mimetype
              encoding
              url
              filepath
              ext
            }
          } `;


const IdeaCreateModal =
    ({
        handleClose,
        show,
        projectName,
        setprojectName,
        imageData,
        getAllIdeas,
        whitePaper,
        setWhitepaper,
        whitePaperLink,
        setWhitePaperLink,
        pitchDeck,
        setpitchDeck,
        pitchDeckLink,
        setPitchDeckLink,
        // Revenue Model
        revenueModel,
        setrevenueModel,
        setRevenueModelData,
        revenueModelData,
        // Live Product
        liveProduct,
        setliveProduct,
        liveProductLink,
        setLiveProductLink,

        competition,
        setcompetition,
        createIdea,
        onelineDescription,
        setonelineDescription,
        draftstatus,
        setdraftstatus,
        updateIdea,
        productType,
        setproductType,
        category,
        setcategory,
        problemStatement,
        setProblemStatement,
        solution,
        setSolution,
        targetCustomers,
        setTargetCustomers,
        competitionLinks,
        setCompetitionLinks,
        competitionReason,
        setCompetitionReason,
        solutionReason,
        setsolutionReason,
        handleOpenIdeaDisplay,
        edit,
        setedit,
        setImageData,
        settwitterlink,
        setLinkedinLink,
        setwebsiteLink,
        twitterlink,
        linkedinLink,
        websiteLink,
        currentIdeaData
    }) => {

        const [step, setstep] = useState(1);
        const [uploadLink, setUploadLink] = useState(false);
        const [uploadLinkPitch, setUploadLinkPitch] = useState(false);

        const [filename, setfilename] = useState("Whitepaper Link");
        const hiddenLogoInput = React.useRef(null);
        const hiddenWhitePaperInput = React.useRef(null);
        const hiddenPitchDeckInput = React.useRef(null);

        const [uploadDocumentAsync] = useMutation(UPLOAD_FILE, { onCompleted: async () => { } })

        /* query area */


        function handleDeleteDocs(location) {
            if (location == "Logo") {
                setImageData([])
            }
            else if (location == "WhitePaper") {
                setWhitePaperLink([])
            }
            else if (location == "PitchDeck") {
                setPitchDeckLink([])
            }
        }


        const onFileChange = async (e, location) => {

            // console.log("E Data",e.target.files[0].length,"'\n' Location:",location);
            if (e.target.files[0] != undefined || e.target.files[0] != null) {
                if (
                    (location == "Logo" && (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg'))
                    || location == "WhitePaper" && (e.target.files[0].type == 'application/pdf' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg')
                    || location == "PitchDeck" && (e.target.files[0].type == 'application/pdf' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg')
                ) {
                    var file = e.target.files[0]
                    if (file) {
                        let fileLink = await uploadDocumentAsync({
                            variables: {
                                file: file,
                                "input": {
                                    "project_id": ''
                                }
                            }
                        })
                        if (location == "Logo") {
                            setImageData(fileLink.data.singleUpload.filepath)
                        }
                        else if (location == "WhitePaper") {
                            setWhitePaperLink(fileLink.data.singleUpload.filepath)
                        }
                        else if (location == "PitchDeck") {
                            setPitchDeckLink(fileLink.data.singleUpload.filepath)
                        }
                    }
                }
                else {
                    toast.warn('Please Upload file only required format', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            }
        }

        const colourOptions = [
            // { value: "EXCHANGE", label: "EXCHANGE", color: "#FF8B00" },
            // { value: "NFT", label: "NFT", color: "#FFC400" },
            { value: "AMM", label: "AMM" },
            { value: "ADVERTISING", label: "ADVERTISING" },
            { value: "BLOCKCHAIN INFRASTRUCTURE", label: "BLOCKCHAIN INFRASTRUCTURE" },
            { value: "BLOCKCHAIN SERVICE", label: "BLOCKCHAIN SERVICE" },
            { value: "CEFI", label: "CEFI" },
            { value: "CEX", label: "CEX" },
            { value: "CROSS-CHAIN", label: "CROSS-CHAIN" },
            { value: "DATA SERVICE", label: "DATA SERVICE" },
            { value: "DEFI", label: "DEFI" },
            { value: "DEX", label: "DEX" },
            { value: "DIGITAL IDENTITY", label: "DIGITAL IDENTITY" },
            { value: "EXCHANGE", label: "EXCHANGE" },
            { value: "GAMEFI", label: "GAMEFI" },
            { value: "GAMING GUILD", label: "GAMING GUILD" },
            { value: "GOVERNANCE", label: "GOVERNANCE" },
            { value: "INSURANCE", label: "INSURANCE" },
            { value: "LAUNCHPAD", label: "LAUNCHPAD" },
            { value: "MEME", label: "MEME" },
            { value: "METAVERSE", label: "METAVERSE" },
            { value: "MOVE TO EARN(M2E)", label: "MOVE TO EARN(M2E)" },
            { value: "MOVE2EARN", label: "MOVE2EARN" },
            { value: "NFT", label: "NFT" },
            { value: "NFT MARKETPLACE", label: "NFT MARKETPLACE" },
            { value: "PAYMENTS", label: "PAYMENTS" },
            { value: "PLAY TO EARN(P2E)", label: "PLAY TO EARN(P2E)" },
            { value: "SOCIAL", label: "SOCIAL" },
            { value: "YIELD FARMING", label: "YIELD FARMING" },
            { value: "ASSET BACKED", label: "ASSET BACKED" },
            { value: "CLOUD SERVICES", label: "CLOUD SERVICES" },
            { value: "EDUCATION", label: "EDUCATION" },
            { value: "GAMBLING", label: "GAMBLING" },
            { value: "HEALTHCARE", label: "HEALTHCARE" },
            { value: "LAYER-1", label: "LAYER-1" },
            { value: "LAYER-2", label: "LAYER-2" },
            { value: "KYC/AML", label: "KYC/AML" },
            { value: "OTHERS", label: "OTHERS" },

        ];

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
            //  console.log(selected,"selected");s
            setcategory(selected)
            console.log(selected, "selected")
            //  settokenType()
            // setoptionSelected()
            //   optionSelected: selected
            // });
        };

        const handleLogo = (event) => {
            hiddenLogoInput.current.click();
        };

        const handleWhitePaper = event => {
            hiddenWhitePaperInput.current.click();
        };
        const handlePitchDeck = event => {
            hiddenPitchDeckInput.current.click();
        };






        /*function area steps increment*/

        const incrementStep = () => {


            console.log(problemStatement, "bullet")

            setstep(step + 1);

        }
        const decrementStep = () => {
            setstep(step - 1);
        }


        const saveDetails = async () => {

            if (
                (projectName != "" && projectName != null && projectName != undefined) &&
                (onelineDescription != "" && onelineDescription != null && onelineDescription != undefined) &&
                (productType != "" && productType != null && productType != undefined) &&
                (category != "" && category != null && category != undefined)
                    // (pitchDeckLink != "" && pitchDeckLink != null && pitchDeckLink != undefined)
            ) {

                if ((liveProductLink == undefined || liveProductLink == "") &&
                    (competitionLinks == undefined || competitionLinks == "") &&
                    (twitterlink == undefined || twitterlink == "") &&
                    (linkedinLink == undefined || linkedinLink == "") &&
                    (websiteLink == undefined || websiteLink == "")
                ) {

                    createIdea();
                    console.log(problemStatement, solution, targetCustomers, competitionLinks, competitionReason, "parent state creation");
                    handleClose();
                    setstep(1);
                    handleOpenIdeaDisplay();
                }
                else {
                    var pattern = /^https:\/\//i;
                    let liveproduct = pattern.test(liveProductLink);
                    let competition = pattern.test(competitionLinks);
                    let twitter = pattern.test(twitterlink);
                    let web = pattern.test(websiteLink);
                    let ld = pattern.test(linkedinLink);

                    if ((liveproduct || liveProductLink == undefined || liveProductLink == "") &&
                        (competition || competitionLinks == undefined || competitionLinks == "") &&
                        (twitter || twitterlink == undefined || twitterlink == "") &&
                        (ld || linkedinLink == undefined || linkedinLink == "") &&
                        (web || websiteLink == undefined || websiteLink == "")) {

                        createIdea();
                        console.log(problemStatement, solution, targetCustomers, competitionLinks, competitionReason, "parent state creation");
                        handleClose();
                        setstep(1);
                        handleOpenIdeaDisplay();
                    }
                    else {
                        alert("Please enter a valid url.(for product link,website,socials)")
                    }

                }


            }
            else {
                alert("please fill the mandatory details")
            }
        }

        const updateDetails = async () => {

            updateIdea();
            handleClose();
            setstep(1);
        }


        const submitDetails = async () => {
            await updateIdea();


        }
        /*image upload*/

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
        const isWhitepaper = (e) => {
            console.log(e)

            if (e === "true") {
                setWhitepaper("true");
            }
            else if (e === "false") {
                setWhitepaper("false");
            }


        }
        const isrevenueModel = (e) => {
            console.log(e)

            if (e === "true") {
                setrevenueModel("true");
            }
            else if (e === "false") {
                setrevenueModel("false");
            }


        }
        const isliveProduct = (e) => {
            console.log(e)

            if (e === "true") {
                setliveProduct("true");
            }
            else if (e === "false") {
                setliveProduct("false");
            }


        }
        const iscompetition = (e) => {
            console.log("is comp", e)

            if (e === "true") {
                setcompetition("true");
            }
            else if (e === "false") {
                setcompetition("false");
            }


        }
        const ispitchDeck = (e) => {
            console.log(e)

            if (e === "true") {
                setpitchDeck("true");
            }
            else if (e === "false") {
                setpitchDeck("false");
            }


        }
        const handleProductLink = (e) => {
            console.log("product link", e)

        }
        const handleRevenueModel = (e) => {
            console.log("revenue model", e)

        }
        const handleSHowInputfunc = () => {
            setUploadLink(true)
        }
        const handleCloseInputFunc = () => {
            setUploadLink(false)
        }
        const handleSHowInputfuncPitch = () => {
            setUploadLinkPitch(true)
        }
        const handleCloseInputFuncPitch = () => {
            setUploadLinkPitch(false)
        }
        const opennewWindow = (i) => {
            // window.open(`https://${i}`)
            window.open(i, '_blank').focus();
        }


        console.log("create modal", category)

        return (

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >

                <Modal.Body style={{ padding: "20px", borderRadius: "20px" }}>

                    {/* <form> */}
                    <div className='formonboard' style={{ width: "100%" }}>

                        <div className="conter">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card" >
                                        <div className="card-body " >
                                            <div className="mb-2"><button type='button' className='close' onClick={() => { handleClose() }}>x</button></div>
                                            <div className="tab-content">

                                                <div className="tab-pane show active" id="bottom-justified-tab1">
                                                    <p className="mb-2">1. Name <span style={{ color: "red" }}>*</span>
                                                        <span className="ft"> &nbsp;&nbsp;(If you don't have a name yet, just drop one in randomly, Example – Project 56)</span>
                                                    </p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { setprojectName(e.target.value) }} value={projectName} disabled={draftstatus ? false : true} />
                                                    <p className="mb-2">2. Logo
                                                        <span className="ft ">&nbsp;&nbsp;(Optional) Size - 512x512px</span></p>
                                                    {imageData != null && imageData.length > 1 ?
                                                        <div>
                                                            <img src={imageData} style={{ width: "75px", height: "75px" }} alt="LOGO" />
                                                            <i className="fa fa-pencil icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={handleLogo} />
                                                            <i className="fa fa-trash icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={() => { handleDeleteDocs("Logo") }} />
                                                        </div>
                                                        :
                                                        <>
                                                            <Button style={{
                                                                borderRadius: '0px 5px 5px 0px',
                                                                fontSize: '13px',
                                                                height: "44px",
                                                                background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                                                                border: "0px"

                                                            }} className="form-control mb-2 mt-2" onClick={handleLogo}>Upload a file</Button>
                                                        </>
                                                    }
                                                </div>
                                                <div className="" id="bottom-justified-tab2 ">
                                                    <p className="mb-2">3.Describe your idea in one line <span style={{ color: "red" }}>*</span>&nbsp;&nbsp;
                                                        <span className="ft">(Keep it simple and precise so that a layman can understand it)</span></p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { setonelineDescription(e.target.value) }} defaultValue={onelineDescription} disabled={draftstatus ? false : true} />
                                                    <div className="mb-2">
                                                        <p className="mb-2">4.Product Type <span style={{ color: "red" }}>*</span></p>

                                                        <select className="form-control btn-block-height square-edges mb-2" value={productType} onChange={(e) => setproductType(e.target.value)} disabled={draftstatus ? false : true}>
                                                            <option style={{ fontSize: '13px' }} value="" >Select</option>
                                                            <option style={{ fontSize: '13px' }} value="B2B">B2B </option>
                                                            <option style={{ fontSize: '13px' }} value="B2C">B2C </option>
                                                            <option style={{ fontSize: '13px' }} value="B2B2C">B2B2C </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="" id="bottom-justified-tab3">
                                                    <p className="mb-2">5. Category <span style={{ color: "red" }}>*</span></p>
                                                    <MySelect
                                                        options={colourOptions}
                                                        isMulti
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        components={{ Option, MultiValue }}
                                                        onChange={handleChange}
                                                        allowSelectAll={true}
                                                        value={category}
                                                        isDisabled={draftstatus ? false : true}
                                                    />
                                                    <p className="mb-2 mt-4">6. Describe your problem statement?
                                                        &nbsp;&nbsp;<span className="ft">(In bullet points, describe the major problems you're tackling)</span></p>
                                                    <BulletPointsInput
                                                        parentState={problemStatement}
                                                        setParentState={setProblemStatement}
                                                    />
                                                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                    </div>
                                                </div>

                                                <div className="" id="bottom-justified-tab4">
                                                    <p className="mb-2">7. Describe your solution?&nbsp;&nbsp;
                                                        <span className="ft">(In bullet points, describe the solutions you are proposing)</span></p>

                                                    <BulletPointsInput
                                                        parentState={solution}
                                                        setParentState={setSolution}
                                                    />

                                                    <p className="mb-2 mt-4">8. Who are your target customers? &nbsp;&nbsp;
                                                        <span className="ft mt-2">(Make a list of your specific target customers. For Example:- Financial Institutions, Hospitals, Freelancers, Etc.)</span></p>
                                                    <BulletPointsInput
                                                        parentState={targetCustomers}
                                                        setParentState={setTargetCustomers}
                                                    />

                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                    </div>
                                                </div>

                                                <div className="" id="bottom-justified-tab4">


                                                    <p>9. Do you have Whitepaper?  &nbsp;&nbsp;<span className="ft">(If yes, please upload document or provide link)</span></p>


                                                    <>
                                                        {whitePaperLink != null && whitePaperLink.length > 1 && uploadLink == false ?
                                                            <div>
                                                                <a href={pitchDeckLink} target="_blank">Whitepaper</a>
                                                                <i className="fa fa-pencil icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={handleWhitePaper} />
                                                                <i className="fa fa-trash icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={() => { handleDeleteDocs("WhitePaper") }} />
                                                            </div>
                                                            : whitePaperLink != null && whitePaperLink.length > 1 && uploadLink == true ?
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                    {/*  */}
                                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={whitePaperLink} onChange={(e) => setWhitePaperLink(e.target.value)} />
                                                                    <button style={{
                                                                        borderRadius: '0px 5px 5px 0px',
                                                                        fontSize: '22px',
                                                                        height: "44px", minWidth: '65px', fontWeight: '600'

                                                                    }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                                </div> : uploadLink == true ?
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                        {/*  */}
                                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={whitePaperLink} onChange={(e) => setWhitePaperLink(e.target.value)} />
                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '22px',
                                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                                        }} className="btn add-btn-search" onClick={handleCloseInputFunc}>X</button>
                                                                    </div>
                                                                    :
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '13px',
                                                                            height: "44px",

                                                                        }} className="btn add-btn-search ts" onClick={handleWhitePaper}>Upload a file</button>


                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '13px',
                                                                            height: "44px",

                                                                        }} className="btn add-btn-search ts" onClick={handleSHowInputfunc}>Upload Link</button>
                                                                    </div>
                                                        }
                                                    </>


                                                    <p>10. Do you have a pitch deck? &nbsp;&nbsp;<span className="ft">(If yes, please upload document or provide link)</span></p>

                                                    <>
                                                        {pitchDeckLink != null && pitchDeckLink.length > 1 && uploadLinkPitch == false ?
                                                            <div>
                                                                <a href={pitchDeckLink} target="_blank">Pitch Deck</a>
                                                                <i className="fa fa-pencil icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={handlePitchDeck} />
                                                                <i className="fa fa-trash icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={() => { handleDeleteDocs("PitchDeck") }} />
                                                            </div>
                                                            :
                                                            pitchDeckLink != null && pitchDeckLink.length > 1 && uploadLinkPitch == true ?
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                    {/*  */}
                                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={pitchDeckLink} onChange={(e) => setPitchDeckLink(e.target.value)} />
                                                                    <button style={{
                                                                        borderRadius: '0px 5px 5px 0px',
                                                                        fontSize: '22px',
                                                                        height: "44px", minWidth: '65px', fontWeight: '600'

                                                                    }} className="btn add-btn-search " onClick={handleCloseInputFuncPitch}>X</button>
                                                                </div>
                                                                : uploadLinkPitch == true ?
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                        {/*  */}
                                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={pitchDeckLink} onChange={(e) => setPitchDeckLink(e.target.value)} />
                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '22px',
                                                                            height: "44px", minWidth: '65px', fontWeight: '600'

                                                                        }} className="btn add-btn-search" onClick={handleCloseInputFuncPitch}>X</button>
                                                                    </div>
                                                                    :
                                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "10px" }}>

                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '13px',
                                                                            height: "44px",

                                                                        }} className="btn add-btn-search ts" onClick={handlePitchDeck}>Upload a file</button>


                                                                        <button style={{
                                                                            borderRadius: '0px 5px 5px 0px',
                                                                            fontSize: '13px',
                                                                            height: "44px",

                                                                        }} className="btn add-btn-search ts" onClick={handleSHowInputfuncPitch}>Upload Link</button>
                                                                    </div>}
                                                    </>


                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        {/* <button className="btn btn-primary submit-btn" onClick={() => { decrementStep() }}  style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",
                                                            background:"linear-gradient(90deg,#6345ED,#DC39FC)",
                                                            border:"0px"

                                                        }}>Previous</button>
                                                <button className="btn btn-primary submit-btn" onClick={() => { incrementStep() }} style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",
                                                            background:"linear-gradient(90deg,#6345ED,#DC39FC)",
                                                            border:"0px"

                                                        }}>Next</button> */}
                                                    </div>
                                                </div>
                                                {/* : ""}
                                        {step == 6 ?  */}

                                                <div className="" id="bottom-justified-tab4">
                                                    {/* <p>11. Do you have a live product or working prototype? &nbsp;&nbsp;<span className="ft">(If yes, please provide link)</span></p> */}
                                                    {/* <form onChange={(e) => isliveProduct(e.target.value)} value={liveProduct} className="mb-2">
                                                        <input type="radio" className="mt-1" style={{ fontWeight: "600" }} value="true" name="gender" checked={liveProduct === "true"} /> <span style={{ fontWeight: "600" }}>Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                                        <input type="radio" className="mt-1" style={{ fontWeight: "600" }} value="false" name="gender" checked={liveProduct === "false"} /> <span style={{ fontWeight: "600" }}>No</span>
                                                    </form> */}
                                                    <p className="mb-2">11. Do you have a live product or working prototype?  <span style={{ color: "red" }}></span>&nbsp;&nbsp;
                                                        <span className="ft"></span></p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { setLiveProductLink(e.target.value) }} defaultValue={liveProductLink} />

                                                    {/* {
                                                        liveProduct == "true" ?
                                                            <>
                                                                <p>Enter you product or prototype link below:</p>
                                                                <input type="text" className="form-control" onChange={(e) => { setLiveProductLink(e.target.value) }} value={liveProductLink} />
                                                            </>
                                                            : ""
                                                    } */}
                                                    <p>12. Do you have revenue model yet?  &nbsp;&nbsp;<span className="ft">(If yes, drop down list)</span></p>


                                                    <>

                                                        <select className="form-control btn-block-height square-edges " value={revenueModelData} onChange={(e) => setRevenueModelData(e.target.value)}>
                                                            <option style={{ fontSize: '13px' }} value="" >Select</option>
                                                            <option style={{ fontSize: '13px' }} value="One Time Sale">One Time Sale</option>
                                                            <option style={{ fontSize: '13px' }} value="Subscription Based">Subscription Based</option>
                                                            <option style={{ fontSize: '13px' }} value="Usage Based">Usage Based</option>
                                                            <option style={{ fontSize: '13px' }} value="Advertising">Advertising</option>
                                                            <option style={{ fontSize: '13px' }} value="Freemium">Freemium</option>
                                                            <option style={{ fontSize: '13px' }} value="Licensing">Licensing</option>
                                                            <option style={{ fontSize: '13px' }} value="Service based">Service based</option>
                                                            <option style={{ fontSize: '13px' }} value="Others">Others</option>
                                                        </select>
                                                    </>


                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        {/* <button className="btn btn-primary submit-btn" onClick={() => { decrementStep() }} style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",
                                                            background:"linear-gradient(90deg,#6345ED,#DC39FC)",
                                                            border:"0px"

                                                        }}>Previous</button>
                                                <button className="btn btn-primary submit-btn" onClick={() => { incrementStep() }} style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",
                                                            background:"linear-gradient(90deg,#6345ED,#DC39FC)",
                                                            border:"0px"

                                                        }}>Next</button> */}
                                                    </div>
                                                </div>

                                                {/* : ""}
                                        {step == 7 ?  */}

                                                <div className="" id="bottom-justified-tab4">
                                                    <p>13. Do you have competition?  &nbsp;&nbsp;<span className="ft">(Drop your competitors' links if you have any)</span></p>



                                                    <BulletPointsInput
                                                        parentState={competitionLinks}
                                                        setParentState={setCompetitionLinks}
                                                    />

                                                    <p>14. Why is your solution better than competition? &nbsp;&nbsp;<span className="ft">(Tell us what makes you different from the competition in bullet points)</span></p>
                                                    {/* <input type="text" className="form-control mb-2" defaultValue={solutionReason} onChange={(e) => setsolutionReason(e.target.value)}/> */}
                                                    <BulletPointsInput
                                                        parentState={competitionReason}
                                                        setParentState={setCompetitionReason}
                                                    />
                                                    <p className="mb-2">Twitter Link  <span style={{ color: "red" }}></span>&nbsp;&nbsp;
                                                        <span className="ft"></span></p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { settwitterlink(e.target.value) }} defaultValue={twitterlink} />


                                                    <p className="mb-2">Linkedin Link  <span style={{ color: "red" }}></span>&nbsp;&nbsp;
                                                        <span className="ft"></span></p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { setLinkedinLink(e.target.value) }} defaultValue={linkedinLink} />

                                                    <p className="mb-2">Website Link  <span style={{ color: "red" }}></span>&nbsp;&nbsp;
                                                        <span className="ft"></span></p>
                                                    <input type="text" className="form-control mb-2" onChange={(e) => { setwebsiteLink(e.target.value) }} defaultValue={websiteLink} />

                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                        {edit ? <button className="btn btn-primary submit-btn" style={{
                                                            borderRadius: '0px 5px 5px 0px',
                                                            fontSize: '13px',
                                                            height: "44px",
                                                            background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                                                            border: "0px"

                                                        }} onClick={() => { updateDetails() }}>Update</button> :
                                                            <button className="btn btn-primary submit-btn" onClick={() => { saveDetails() }} style={{
                                                                borderRadius: '0px 5px 5px 0px',
                                                                fontSize: '13px',
                                                                height: "44px",
                                                                background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                                                                border: "0px"

                                                            }}>Finish</button>
                                                        }

                                                        {/* <button className="btn btn-primary submit-btn" onClick={() => { submitDetails() }}>Submit</button> */}
                                                        {/* } */}

                                                    </div>
                                                </div>
                                                {/* : ""} */}
                                                <input
                                                    type="file"
                                                    ref={hiddenLogoInput}
                                                    onChange={(e) => onFileChange(e, "Logo")}
                                                    style={{ display: 'none' }}
                                                />
                                                <input
                                                    type="file"
                                                    ref={hiddenWhitePaperInput}
                                                    onChange={(e) => onFileChange(e, "WhitePaper")}
                                                    style={{ display: 'none' }}
                                                />
                                                <input
                                                    type="file"
                                                    ref={hiddenPitchDeckInput}
                                                    onChange={(e) => onFileChange(e, "PitchDeck")}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>










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
        );
    }

export default withRouter(IdeaCreateModal);