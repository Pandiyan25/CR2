import React from 'react'
import "./onboarding.css"
import { useState } from 'react'
import { apiURI } from '../../../config/config';
import { gql, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useNavigate } from "react-router-dom";
import { Button, Modal, } from "react-bootstrap";
import MySelect from './MySelect';
import { components } from "react-select";
import BulletPointsInput from "./BulletInput";
import { toast } from 'material-react-toastify';
import sc from "./sc.gif"
import { isMobile } from 'react-device-detect';

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

const Onboarding = ({setfirstlogin}) => {
    const [show, setShow] = useState(false);
    const [projectName, setprojectName] = useState("")
    const [onelineDescription, setonelineDescription] = useState("")
    const [productType, setproductType] = useState("")
    const [productStage, setproductStage] = useState("")
    const [imageData, setImageData] = useState("")
    const [category, setcategory] = useState([])
    const [problemStatement, setProblemStatement] = useState([""])
    const [solution, setSolution] = useState([""]);
    const [targetCustomers, setTargetCustomers] = useState([""]);
    const [whitePaper, setWhitepaper] = useState("");
    const [whitePaperLink, setWhitePaperLink] = useState("");
    const [pitchDeck, setpitchDeck] = useState("");
    const [pitchDeckLink, setPitchDeckLink] = useState("");
    const [uploadLink, setUploadLink] = useState(false);
    const [uploadLinkPitch, setUploadLinkPitch] = useState(false);
    const [liveProductLink, setLiveProductLink] = useState("")
    const [revenueModelData, setRevenueModelData] = useState("")
    const [competitionLinks, setCompetitionLinks] = useState([""]);
    const [competitionReason, setCompetitionReason] = useState([""]);
    const [twitterLink, settwitterLink] = useState("")
    const [linkedinLink, setlinkedinLink] = useState("")
    const [discordLink, setdiscordLink] = useState("")
    const [roastDeck, setroastDeck] = useState()
    const loginId = useSelector((state) => state.constVar.loginId)
    const emaildt = useSelector((state) => state.constVar.emailid)
    let history = useHistory()
    const hiddenLogoInput = React.useRef(null);
    const hiddenWhitePaperInput = React.useRef(null);
    const hiddenPitchDeckInput = React.useRef(null);



    const [uploadDocumentAsync] = useMutation(UPLOAD_FILE, { onCompleted: async () => { } })
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
    const MultiValue = props => (
        <components.MultiValue {...props}>
            <span>{props.data.label}</span>
        </components.MultiValue>
    );
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
    const handleChange = selected => {

        setcategory(selected)

    };

    const onbaord = () => {
        setfirstlogin(false)
        history.push("/Idealist")
        
    }

    const saveDetails = async () => {
        console.log("linkedin", linkedinLink, "discord", discordLink, "twitter", twitterLink, "roastDeck", roastDeck, "imagedata:", imageData)
        if (
            (projectName != "" && projectName != null && projectName != undefined) &&
            (onelineDescription != "" && onelineDescription != null && onelineDescription != undefined) &&
            (productType != "" && productType != null && productType != undefined) &&
            (category != "" && category != null && category != undefined) &&
            (pitchDeckLink != "" && pitchDeckLink != null && pitchDeckLink != undefined)
        ) {
            let str = onelineDescription.trim();
            var words = str.split(/\s+/);
            let len = words.length;
            if (len < 11 && len > 4) {

                if ((liveProductLink == undefined || liveProductLink == "") &&
                    (competitionLinks == undefined || competitionLinks == "") &&
                    (twitterLink == undefined || twitterLink == "") &&
                    (linkedinLink == undefined || linkedinLink == "") &&
                    (discordLink == undefined || discordLink == "")
                ) {
                    IdeaCreate();
                    ProjectCreate();
                    setShow(true);
                    // setfirstlogin(false);
                }
                else {
                    var pattern = /^https:\/\//i;
                    let liveproduct = pattern.test(liveProductLink);
                    let competition = pattern.test(competitionLinks);
                    let twitter = pattern.test(twitterLink);
                    let discord = pattern.test(discordLink);
                    let ld = pattern.test(linkedinLink);

                    if ((liveproduct || liveProductLink == undefined || liveProductLink == "") &&
                        (competition || competitionLinks == undefined || competitionLinks == "") &&
                        (twitter || twitterLink == undefined || twitterLink == "") &&
                        (ld || linkedinLink == undefined || linkedinLink == "") &&
                        (discord || discordLink == undefined || discordLink == "")) {
                        IdeaCreate();
                        ProjectCreate();
                        setShow(true);
                        // setfirstlogin(false);
                    }
                    else {
                        alert("Please enter a valid url.(for product link,website,socials)")
                    }

                }
            }
            else {
                alert("Please Enter oneline description bewtween 5 to 10 words!")
            }

        }
        else {

            if ((projectName != "" && projectName != null && projectName != undefined) &&
                (onelineDescription != "" && onelineDescription != null && onelineDescription != undefined) &&
                (productType != "" && productType != null && productType != undefined) &&
                (category != "" && category != null && category != undefined)) {

                alert("Please upload pitchDeck to proceed !")
            }
            else {
                alert("please fill mandatory fields to proceed !")
            }

        }


    }

    const handleLogo = (event) => {
        hiddenLogoInput.current.click();
    };
    const handleWhitePaper = event => {
        hiddenWhitePaperInput.current.click();
    };
    const handlePitchDeck = event => {
        hiddenPitchDeckInput.current.click();
    };
    const handleCloseInputFunc = () => {
        setUploadLink(false)
    }
    const handleSHowInputfuncPitch = () => {
        setUploadLinkPitch(true)
    }
    const handleSHowInputfunc = () => {
        setUploadLink(true)
    }
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
    const IdeaCreate = async () => {
        console.log("details", projectName, onelineDescription, productType, productStage)
        var arrtype = [];

        for (var i = 0; i < category.length; i++) {
            arrtype.push({
                value: category[i].value,

            })
        }


        try {
            var query = `
            mutation Mutation($input: IdeaInput) {
                createIdea(input: $input) {
                _id
                email_id
                idea_name
                idea_logo
                one_line_desc
                product_type
                category{
                    value
                }
                twitter_link
                roast_deck
                linkedin_link
                discord_link
                isWhitepaper
                whitepaper_link
                isPitchdeck
                pitchdeck_link
                isProductLive
                liveProduct_link
                isRevenueModel
                website_link
                revenueModel_type
                isCompetition
                draft_status
                competition_links 
                problem_statement 
                problem_solution 
                target_customers 
                competition_reason 
                user {
                _id
                first_name
                last_name
                }
                }
                }
                `;
            await fetch(apiURI.URL, {
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
                    variables:
                    {
                        "input": {
                            "user": loginId,
                            "email_id": emaildt,
                            "idea_name": projectName,
                            "product_type": productType,
                            "idea_logo": imageData == "" || imageData == undefined ? "https://dev.guardian.crsquare.finance/734932fdd019201798dcc23a17eecc5b.png" : imageData,
                            "one_line_desc": onelineDescription,
                            "category": arrtype,
                            "problem_statement": problemStatement,
                            "problem_solution": solution,
                            "target_customers": targetCustomers,
                            "whitepaper_link": whitePaperLink,
                            "pitchdeck_link": pitchDeckLink,
                            "liveProduct_link": liveProductLink,
                            "revenueModel_type": revenueModelData,
                            "competition_links": competitionLinks,
                            "competition_reason": competitionReason,
                            "twitter_link": twitterLink,
                            "roast_deck": roastDeck,
                            "linkedin_link": linkedinLink,
                            "website_link": discordLink,
                            "draft_status": false,
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    console.log("current idea ID:", data?.data?.createIdea?._id)

                })

        } catch (error) {
        }
    }


    const ProjectCreate = async () => {
        var arrtype = [];

        for (var i = 0; i < category.length; i++) {
            arrtype.push({
                value: category[i].value,

            })
        }

        try {
            var query = `
            mutation Mutation($input: ProjectInput) {
                createProject(input: $input) {
                  _id
                  logo
                  email_id
                  first_name
                  last_name
                  linkedin_profile_link
                  project_name
                  project_description
                  nature_of_project
                  project_start_date
                  project_end_date
                  project_tags
                  project_stage
                  website_link
                  github_repository
                  whitepaper
                  one_pager_document
                  pitch_deck
                  number_of_founders
                  team_size
                  project_blockchain_id
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
                            "user": loginId,
                            "email_id": emaildt,
                            "project_name": projectName,
                            "logo": imageData == "" || imageData == undefined ? "https://dev.guardian.crsquare.finance/734932fdd019201798dcc23a17eecc5b.png" : imageData,
                            "one_line_description": onelineDescription,
                            "project_stage": productStage,
                            "whitepaper": whitePaperLink,
                            "pitch_deck": pitchDeckLink,

                        },
                    }
                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(async (data) => {
                    console.log(data?.data?.createProject);
                })
        } catch (error) {
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form submission
        // handle form data
    };

    console.log(emaildt, "eeemaaaill")
    console.log(isMobile,"ismobile")


    return (
        <div className='main-onboarding'>
            <div className='formonboard'>

                <div className="conter">

                    <form onSubmit={handleSubmit}>
                        <h1 style={{ margin: "auto", textAlign: "center" }}>Time to onboard your web3 startup to guardian !</h1>
                        <div className='row'>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div className="" >
                                    <label className="label" style={{ marginTop: "15px" }}>Name of your product <span style={{ color: "red" }}>*</span>&nbsp;</label><span style={{ color: "grey" }} className='labelText'>(Name of your Web3 startup)</span>
                                    <input type="text" className='textInput' required onChange={(e) => { setprojectName(e.target.value) }} value={projectName}></input>

                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div>
                                    <label className="label" style={{ marginTop: "15px" }}>Logo</label><span style={{ color: "grey" }} className='labelText'> Recommended Size - 512 x 512px</span>
                                    {imageData != null && imageData.length > 1 ?
                                        <div>
                                            <img src={imageData} style={{ width: "75px", height: "75px" }} alt="LOGO" />
                                            <i className="fa fa-pencil icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={handleLogo} />
                                            <i className="fa fa-trash icons" style={{ cursor: "pointer", paddingLeft: "15px" }} onClick={() => { handleDeleteDocs("Logo") }} />
                                        </div>
                                        :
                                        <>
                                            <button style={{
                                                borderRadius: '5px',
                                                fontSize: '13px',
                                                height: "44px",
                                                background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                                                border: "0px",
                                                color: 'white'

                                            }} className="form-control cs mt-2" onClick={handleLogo}>Upload a file</button>
                                        </>
                                    }
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

                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div className="">

                                    <label className="label" style={{ marginTop: "15px" }}>Describe your product in one line<span style={{ color: "red" }}>*</span></label><span style={{ color: "grey" }} className='labelText'>(Keep it simple and precise so that a layman can understand it)</span>
                                    <input type="text" className='textInput' required onChange={(e) => { setonelineDescription(e.target.value) }} defaultValue={onelineDescription}></input>
                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div style={{ margin: "13px 0px" }}>

                                    <label className="label" style={{ color: "#343434", fontSize: "14px", marginTop: "15px" }}>Product Type<span style={{ color: "red" }}>*</span></label>
                                    <select className="form-control btn-block-height square-edges cs minimal mb-4" value={productType} onChange={(e) => setproductType(e.target.value)}>
                                        <option style={{ fontSize: '13px' }} value="" >Select</option>
                                        <option style={{ fontSize: '13px' }} value="B2B">B2B </option>
                                        <option style={{ fontSize: '13px' }} value="B2C">B2C </option>
                                        <option style={{ fontSize: '13px' }} value="B2B2C">B2B2C </option>

                                    </select>
                                </div>
                            </div>

                            {/* <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div style={{ margin: "13px 0px" }}>
                                    <label className="css-1hb7zxy-IndicatorsContainer" style={{ color: "rgb(52, 52, 52)" }}>Product Stage<span style={{ color: "red" }}>*</span></label>
                                    <select className="form-control btn-block-height square-edges cs minimal" defaultValue={productStage} onChange={(e) => setproductStage(e.target.value)}>
                                        <option style={{ fontSize: '13px' }} value="" >Select</option>
                                        <option style={{ fontSize: '13px' }} value="Ideation">Ideation</option>
                                        <option style={{ fontSize: '13px' }} value="Proof of concept">Proof of concept</option>
                                        <option style={{ fontSize: '13px' }} value="Minimum Viable Product">Minimum Viable Product</option>
                                        <option style={{ fontSize: '13px' }} value="Growth Stage ">Growth Stage </option>
                                    </select>
                                    <span></span>

                                </div>
                            </div> */}

                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div style={{ margin: "13px 0px" }}>
                                    <label className='' style={{ color: "rgb(52, 52, 52)" }}>Category<span style={{ color: "red" }}>*</span></label>
                                    <MySelect
                                        options={colourOptions}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        components={{ Option, MultiValue }}
                                        onChange={handleChange}
                                        allowSelectAll={true}
                                        value={category}
                                        className="minimal"
                                    />
                                    <span></span>

                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "8px 0px" }}>
                                    <label style={{ color: "#343434", fontSize: "14px" }} className="label">Describe your problem statement?</label><span style={{ color: "grey" }} className='labelText'>
                                        (In bullet points, describe the major problems you're tackling)
                                    </span>
                                    <BulletPointsInput style={{ height: "38px" }}
                                        parentState={problemStatement}
                                        setParentState={setProblemStatement}

                                    />


                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "8px 0px" }}>
                                    <label style={{ color: "#343434", fontSize: "14px" }} className="label">Describe your solution?</label>
                                    <span style={{ color: "grey" }} className='labelText'>
                                        (In bullet points, describe the solutions you are proposing)
                                    </span>
                                    <BulletPointsInput style={{ height: "38px" }}
                                        parentState={solution}
                                        setParentState={setSolution}
                                    />


                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "8px 0px" }}>
                                    <label style={{ color: "#343434", fontSize: "14px" }} className="label">Who are your target customers?</label>
                                    <span style={{ color: "grey" }} className='labelText'>
                                        (Make a list of your specific target customers. For Example:- Financial Institutions, Hospitals, Freelancers, Etc.)
                                    </span>

                                    <BulletPointsInput style={{ height: "38px" }}
                                        parentState={targetCustomers}
                                        setParentState={setTargetCustomers}
                                    />


                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "10px 0px" }}>

                                    <label style={{ color: "#343434", fontSize: "14px" }} className="label">Do you have Whitepaper?</label><span style={{ color: "grey" }} className='labelText'  >
                                        (Upload your whitePaper)
                                    </span>
                                    {whitePaperLink != null && whitePaperLink.length > 1 && uploadLink == false ?
                                        <div>
                                            <a href={whitePaperLink} target="_blank">Whitepaper</a>
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
                                                        marginTop: '10px',
                                                        borderRadius: '5px',
                                                        fontSize: '13px',
                                                        height: "44px",

                                                    }} className="btn add-btn-search ts" onClick={handleWhitePaper}>Upload a file</button>


                                                    <button style={{
                                                        marginTop: '10px',
                                                        borderRadius: '5px',
                                                        fontSize: '13px',
                                                        height: "44px",

                                                    }} className="btn add-btn-search ts" onClick={handleSHowInputfunc}>Enter Link</button>
                                                </div>
                                    }
                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <div style={{ margin: "15px 0px 24px" }}>
                                    <div>
                                        <label className='label' style={{ color: "#343434", fontSize: "14px" }}>Do you have a pitch deck? </label><span style={{ color: "red" }} className='labelText'>* (File format- PDF only)</span>
                                        <br></br>
                                        <div style={{width:'100%'}} className='m-0'>
                                            <input  type="checkbox" value="" checked={roastDeck} name="gender" onChange={(e) => setroastDeck(!roastDeck)} />
                                            <label className='checkboxlabel' style={{ color: "black", fontWeight :'bolder' }}>Roast My Pitchdeck </label>
                                        </div>
                                    </div>
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
                                                        borderRadius: '5px',
                                                        fontSize: '13px',
                                                        height: "44px",
                                                        width: "100%"

                                                    }} className="btn add-btn-search ts" onClick={handlePitchDeck}>Upload a file</button>


                                                    {/* <button style={{
                                                        borderRadius: '0px 5px 5px 0px',
                                                        fontSize: '13px',
                                                        height: "44px",

                                                    }} className="btn add-btn-search ts" onClick={handleSHowInputfuncPitch}>Upload Link</button> */}
                                                </div>}

                                </div>

                            </div>



                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "0px 0px" }}>
                                    <label style={{ color: "#343434", fontSize: "14px" }}>Do you have revenue model yet?</label>
                                    <select className="form-control btn-block-height square-edges minimal mb-4" value={revenueModelData} onChange={(e) => setRevenueModelData(e.target.value)}>
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


                                </div>
                            </div>



                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "0px 0px" }}>
                                    <label className='label' style={{ color: "#343434", fontSize: "14px" }}>Why is you solution better than your competition? </label><span style={{ color: "grey" }} className='labelText'>
                                        (Tell us what makes you different from the competition in bullet points)

                                    </span>

                                    <BulletPointsInput style={{ height: "38px" }}
                                        parentState={competitionReason}
                                        setParentState={setCompetitionReason}
                                    />


                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div style={{ margin: "0px 0px" }}>
                                    <label className='label' style={{ color: "#343434", fontSize: "14px" }}>Do You have competitors </label><span style={{ color: "grey" }} className='labelText'>
                                        (Update your competitors' website link)
                                    </span>

                                    <BulletPointsInput style={{ height: "38px" }}
                                        parentState={competitionLinks}
                                        setParentState={setCompetitionLinks}
                                    />


                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div >


                                    <label className='label' style={{ color: "#343434", fontSize: "14px" }}>Do you have a live product or working prototype? </label><span style={{ color: "grey" }} className='labelText'>
                                        (If Yes,please provide the link to your product or prototype)

                                    </span>
                                    <input className="textInput" type="text" onChange={(e) => { setLiveProductLink(e.target.value) }} value={liveProductLink} required></input>
                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div className="txt_field">
                                    <input type="text" required onChange={(e) => { settwitterLink(e.target.value) }} defaultValue={twitterLink}></input>
                                    <span></span>
                                    <label >Twitter</label>
                                </div>
                            </div>


                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div className="txt_field">
                                    <input type="text" required onChange={(e) => { setlinkedinLink(e.target.value) }} defaultValue={linkedinLink}></input>
                                    <span></span>
                                    <label >LinkedIn</label>
                                </div>
                            </div>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12' style={{display:isMobile?"none":"block"}}>
                                <div className="txt_field">
                                    <input type="text" required onChange={(e) => { setdiscordLink(e.target.value) }} defaultValue={discordLink}></input>
                                    <span></span>
                                    <label >Website</label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary submit-btn mt-4" onClick={() => { saveDetails() }} style={{
                            borderRadius: '0px 5px 5px 0px',
                            fontSize: '13px',
                            height: "44px",
                            background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                            border: "0px"

                        }}>Submit</button>
                    </form>
                </div>
            </div>
            <Modal
                show={show}
                dialogClassName="my-modal"
                size='sm'
                centered={true}
            >
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
                            <img src={sc} style={{ width: "200px", alignSelf:"center" }}></img><br></br>
                            <p style={{ fontSize: "16px", color: 'purple' }}>Onboarded Successfully !!</p>
                            <p style={{display:isMobile?"block":"none", fontSize: "16px", color: 'red'}}>Please switch to the desktop version to efficiently fill out the remaining product details</p>
                            <button className="btn add-btn-search ts" onClick={onbaord}>Proceed</button>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Onboarding