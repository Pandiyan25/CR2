
import { Button, Modal, Overlay } from "react-bootstrap";
import { fetchProfileDetails } from '../../../reducers/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showSettings } from '../../../reducers/ConstantSlice';
import MySelect from './MySelect';
import { message } from "antd";
import Select from 'react-select'
import { Tooltip } from 'reactstrap';
import countryList from 'react-select-country-list'
import { components } from "react-select";
import ReactSelect from "react-select";
import CNYimage from '../FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../FounderProject/Funding/assets/images/USD.png'
import EURimage from '../FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../FounderProject/Funding/assets/images/RUBBLE.png'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { colourOptions, colourOptionsStage } from './profileDataMain';
import { ToastContainer, toast } from 'material-react-toastify';
import  { designLogo } from '../../../Entryfile/imagepath'
import defprofilePic from './assets/profilePic.png';
import 'material-react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip";

function ProfileSettingsFunding({
    currencyValue,
    setCurrency,
    fundLogo,
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
    indexCountforSlect,
    proffredSector,
    linkeIn,
    websiteLink,
    twitterLinkFunding,
    settwitterLinkFunding,
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
    setLinkedInLink,
    firstName,
    lastName,
    setFirstName,
    setlastName,
    setTelegramLink,
    telegramLink,
    setproffredStage,
    proffredStage,
    isAngel,
    setisAngel
}) {


    const [indexValue, setIndexValue] = useState('');
    const [Count, setCount] = useState([])
    const [showoverlay, setShowoverlay] = useState(false);
    const [firstNameErr, setFirstnameErr] = useState(false)
    const [LastNameErr, setLastNameErr] = useState(false)
    const [SelfDescErr, setSelfDescErr] = useState(false)
    const [roleOrgErr, setroleOrgErr] = useState(false)
    const [LinkedInErr, setLinkedInErr] = useState(false)
    const [ProfilePicErr, setProfilePicErr] = useState(false)
    const [value, setValue] = useState('')

    const targetRef = useRef(null);

    const options = useMemo(() => countryList().getData(), [])


    const dispatch = useDispatch();

    const loginId = useSelector((state) => state.constVar.loginId)

    const handleClosePopup = () => {
        dispatch(showSettings(false))
        handleClose()
    }

    const changeHandler = value => {
        console.log(value, "country");
        setfundHeadQuarter(value?.label)
        setValue(value)
    }


    const toggle = () => {
        setShowoverlay(!showoverlay)
    }


    const beforeUpload = (e) => {
        console.log(e.target.files[0].type, "file.type");
        if (e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/jpg') {

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
    const clearDetailsofNormalInvestor = () => {
      //Clearing Data Before Switching 
      settypeofFund("Angel Investor");
      setfundName('Angel Investor')
      setfundDesc('');
      setLinkedInLink();
      setwebsiteLink();
      settwitterLinkFunding();
    }

    const getUpdateConfirm = () => {

        if (typeofFund === "Angel Investor")
        {  
         if (

            fundHeadQuarter != null && fundHeadQuarter != undefined && fundHeadQuarter != ''
            && assestmang != null && assestmang != undefined && assestmang != ''
            && minInvSize != null && minInvSize != undefined && minInvSize != ''
            && typeofFund != null && typeofFund != undefined && typeofFund != ''
            && proffredSector.length > 0
            && proffredStage.length > 0
            &&   currencyValue != null && currencyValue != undefined && currencyValue != ''
          ) {
            updateProfileDetails()
        
        } else {
            console.log(fundDesc != null && fundDesc != undefined && fundDesc != ''
                , fundHeadQuarter != null && fundHeadQuarter != undefined && fundHeadQuarter != ''
                , assestmang != null && assestmang != undefined && assestmang != ''
                , minInvSize != null && minInvSize != undefined && minInvSize != ''
                , typeofFund != null && typeofFund != undefined && typeofFund != ''
                , websiteLink != null && websiteLink != undefined && websiteLink != ''
                , proffredSector.length > 0
                , proffredStage.length > 0
                ,currencyValue
                , (imageData.length > 0 || (profileDetails.length > 0 && profileDetails[0]?.fund_logo != null && profileDetails[0]?.fund_logo != undefined && profileDetails[0]?.fund_logo != '',"for angel "))
            );
            alert("Please Fill all the mandatory fields ")
        }
        }
else{
    if (fundDesc != null && fundDesc != undefined && fundDesc != ''
    && fundHeadQuarter != null && fundHeadQuarter != undefined && fundHeadQuarter != ''
    && assestmang != null && assestmang != undefined && assestmang != ''
    && minInvSize != null && minInvSize != undefined && minInvSize != ''
    && typeofFund != null && typeofFund != undefined && typeofFund != ''
    && websiteLink != null && websiteLink != undefined && websiteLink != ''
    && proffredSector.length > 0
    && proffredStage.length > 0
    &&   currencyValue != null && currencyValue != undefined && currencyValue != ''
    && fundName != null && fundName != undefined && fundName != ''
    && (imageData.length > 0 || (profileDetails.length > 0 && profileDetails[0]?.fund_logo != null && profileDetails[0]?.fund_logo != undefined && profileDetails[0]?.fund_logo != ''))
) {
    updateProfileDetails()

} else {
    console.log(fundDesc != null && fundDesc != undefined && fundDesc != ''
        , fundHeadQuarter != null && fundHeadQuarter != undefined && fundHeadQuarter != ''
        , assestmang != null && assestmang != undefined && assestmang != ''
        , minInvSize != null && minInvSize != undefined && minInvSize != ''
        , typeofFund != null && typeofFund != undefined && typeofFund != ''
        , websiteLink != null && websiteLink != undefined && websiteLink != ''
        , proffredSector.length > 0
        , proffredStage.length > 0
        ,currencyValue
        , (imageData.length > 0 || (profileDetails.length > 0 && profileDetails[0]?.fund_logo != null && profileDetails[0]?.fund_logo != undefined && profileDetails[0]?.fund_logo != '',"jdnn "))
    );
    alert("Please Fill all the mandatory fields 1")
}
}

     
    }

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
        console.log(selected, "selected");
        setproffredSector(selected)
        // for(var i = 0;i<)
        //  settokenType()
        // setoptionSelected()
        //   optionSelected: selected
        // });
    };
    const handleChangeStage = selected => {
        console.log(selected, "selected");
        setproffredStage(selected)
        // for(var i = 0;i<)
        //  settokenType()
        // setoptionSelected()
        //   optionSelected: selected
        // });
    };

    const countries = [
        // { value: "USD", label: "USD", image: usdimage },
        // { value: "SDT", label: "SDT", image: AEDimage},
        // { value: "INR", label: "INR", image:  INRimage },
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        // { value: "RUBLE", label: "RUBLE", image: RUBLEimage },
        // { value: "CAD", label: "CAD", image: CADimage },
        // { value: "GBP", label: "GBP", image:  GBPimage},
        // { value: "AED", label: "AED", image: AEDimage },
        // { value: "CNY", label: "CNY", image: CNYimage },
        // { value: "VMD", label: "VMD", image:  VMDimage},
        // { value: "EURO", label: "EURO", image: EURimage },
        // { value: "POUND", label: "POUND", image: POUNDimage },
        // { value: "YUAN", label: "YUAN", image: YUANimage },
        // { value: "INR", label: "INR", image: INRimage },
        // { value: "YEN", label: "YEN", image: YENimage },
        // { value: "SGD", label: "SGD", image: SGDimage },
        // { value: "AUD", label: "AUD", image: AUDimage },
        { value: "USDT", label: "USDT", image: USDTimage },
        // { value: "YEN", label: "YEN", image:  JPYImage},

    ];

    console.log(indexCountforSlect,"indexCountforSlect");
    useEffect(() => {
        getCountofHundFunc()
    }, [fundHeadQuarter])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)


        const isFound = options.findIndex(i => {

            return i.label == fundHeadQuarter;
        });

        console.log(isFound, fundHeadQuarter, "fundHeadQuarter");

        setIndexValue(isFound)

    }
    const handleAngel = (e) => {

      console.log("angel value ",e)
      if (e === "true") {
         setisAngel("true");
         settypeofFund("")
      }
      else {
         setisAngel("false");
         settypeofFund("")
         setfundName("")
      }

   }

    return (
        <>

            <Modal
                show={show || showSettingsProfile}
                onHide={handleClosePopup}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton style={{ borderBottom: '0px' }}>
                    <Modal.Title>Edit Fund Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
  
   <label>Are you Angel Investor</label>&nbsp;
   <form style={{textAlign: "center",display: "inline-block",margin: "20px",
    paddingLeft:"20px",fontWeight: "800"}} 
    onChange={(e) => handleAngel(e.target.value)} value={isAngel}>
      
      {typeofFund === null ? setisAngel() :<div></div>}

      {/* <label>Are you Angel Investor</label>&nbsp; */}
         <input type="radio" value="true"  checked={isAngel === "true" }/> Yes &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
         <input type="radio" value="false" checked={isAngel === "false"}/> No
   </form>


   <form>
      <div className="row">
         <div className="col-md-12">

            {
            isAngel === null ? <div></div> :
            isAngel === "false" ? 
            /* if not true display everything */
            <div>
            <div className="profile-img-wrap edit-img">
               {imageData.length > 0 ?
               <img className="inline-block" src={URL.createObjectURL(imageData[0].file)} alt="" />
               :
               profileDetails.length > 0 && profileDetails[0]?.fund_logo != null && profileDetails[0]?.fund_logo != undefined && profileDetails[0]?.fund_logo != '' ?
               <img className="inline-block" src={profileDetails[0]?.fund_logo} alt="" />
               :
            //    <img className="inline-block" src={designLogo} alt="Upload Fund Logo" />
               <img className="inline-block" src={defprofilePic} alt="Upload Fund Logo" />
               }
               <div className="fileupload btn">
                  <span className="btn-text">edit<span className="text-danger">*</span></span>
                  <input className="upload" type="file" data-tip="Please Upload Fund Logo" beforeUpload={beforeUpload} onChange={beforeUpload} />
                  <ReactTooltip place="top" type="info" effect="solid" />
               </div>
            </div>
            {ProfilePicErr == true ? <div style={{ color: 'red', fontSize: '12px' }}>Please Upload Fund Image
         </div>
         : ''}
         <div className="row">
            <div className="col-md-6">
               <div className="form-group">
                  <label>Fund Name<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Please provide fund name" defaultValue={fundName} onChange={(e) => setfundName(e.target.value)} />
               </div>
            </div>
            <div className="col-md-12">
               <div className="form-group">
                  <label>Fund Description<span className="text-danger">*</span></label>
                  <div>
                     <textarea type="text" className="form-control" placeholder="Please provide a brief introduction about the fund" data-tip="Please provide a brief introduction about the fund" style={{ height: '220px' }} defaultValue={fundDesc} onChange={(e) => setfundDesc(e.target.value)} />
                  </div>
               </div>
            </div>
            <div className="row" style={{padding:"0px 10px 0px 10px"}}>
            <div className="col-md-6">
               <div className="form-group">
                  <label>Country of Origin<span className="text-danger">*</span></label>
                  <div>
                     <Select options={options} onChange={changeHandler} defaultValue={options[indexValue]} />
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
                  <label>Assets Under Management(AUM)<span className="text-danger">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                  <input type="number" className="form-control" defaultValue={assestmang} onChange={(e) => setassestmang(e.target.value)} onWheel={(e) => e.target.blur()} />
                  {/* <label style={{ margin: '10px' }}>USD</label> */}
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
               <label>Minimum Investment Size<span className="text-danger">*</span></label>
               <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
               <input  type="number" className="form-control" defaultValue={minInvSize} onChange={(e) => setminInvSize(e.target.value)} onWheel={(e) => e.target.blur()} />
               {/* <label style={{ margin: '10px' }}>USD</label> */}
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
               <label>Number of Investments</label>
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
               {/* <Button id="TooltipExample" style={{ width: '20px', height: '20px', fontSize: '15px', borderRadius: '50px', padding: '0px', marginLeft: '5px' }} ref={targetRef} onClick={() => setShowoverlay(!showoverlay)}>
               ?
               </Button> */}
               {/* 
               <Overlay show={showoverlay} placement="right">
                  {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                     My Tooltip
                  </Tooltip>
                  )}
               </Overlay>
               */}
               {/* 
               <Tooltip placement="top" isOpen={showoverlay} target="TooltipExample" >
                  #MATIC #HNT #ETH #CR2
               </Tooltip>
               */}
               {/* 
               <Tooltip title="Person">Hello</Tooltip>
               */}
               </label>
               <div>
                  <input type="text" className="form-control" placeholder={"#MATIC #HNT #ETH #CR2"} data-tip={"#MATIC #HNT #ETH #CR2 "} defaultValue={projInvestedtilldate} onChange={(e) => setprojInvestedtilldate(e.target.value)} />
                  <ReactTooltip place="top" type="info" effect="solid" />
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Type of Fund <span className="text-danger">*</span></label>
               <div>
                  <select className="form-control btn-block-height square-edges" defaultValue={typeofFund} onChange={(e) => settypeofFund(e.target.value)}>
                  <option style={{ fontSize: '13px' }} value="">Select Fund Type</option>
                  {/* <option style={{ fontSize: '13px' }} value="High Networth Individual">High Networth Individual</option>
                  <option style={{ fontSize: '13px' }} value="Private Equity Firm">Private Equity Firm</option>
                  <option style={{ fontSize: '13px' }} value="Mirco VC">Mirco VC</option>
                  <option style={{ fontSize: '13px' }} value="Hedge Fund">Hedge Fund</option>
                  <option style={{ fontSize: '13px' }} value="Web3 Startup">Web3 Startup</option>
                  <option style={{ fontSize: '13px' }} value="Decentralised VC">Decentralised VC</option>
                  <option style={{ fontSize: '13px' }} value="Family Office">Family Office</option> */}
                  <option style={{ fontSize: '13px' }} value="CEX">CEX</option>
                  <option style={{ fontSize: '13px' }} value="Venture Capital">Venture Capital</option>
                  <option style={{ fontSize: '13px' }} value="Family Office">Family Office</option>
                  <option style={{ fontSize: '13px' }} value="Grants">Grants</option>
                  <option style={{ fontSize: '13px' }} value="Incubator">Incubator</option>
                  <option style={{ fontSize: '13px' }} value="Corporate Investors">Corporate Investors</option>
                  <option style={{ fontSize: '13px' }} value="Investment DAO">Investment DAO</option>
                  <option style={{ fontSize: '13px' }} value="Decentralised VC">Decentralised VC</option>
                  <option style={{ fontSize: '13px' }} value="Syndicate">Syndicate</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Team Size</label>
               <div> <select className="form-control btn-block-height square-edges" defaultValue={teamSize} onChange={(e) => setteamSize(e.target.value)} >
                  {Count.map((_, i) => (
                  <option style={{ fontSize: '13px' }} value={i + 1} >{i + 1}</option>
                  ))}
                  <option style={{ fontSize: '13px' }} value="101">100 +</option>
                  </select>
                  {/* <input type="number" className="form-control" onWheel={(e) => e.target.blur()} /> */}
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label> Preferred Sectors<span className="text-danger">*</span></label>
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
               {/* 
               <div>
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
               </div>
               */}
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Preferred Stage<span className="text-danger">*</span></label>
               <MySelect
               options={colourOptionsStage}
               isMulti
               closeMenuOnSelect={false}
               hideSelectedOptions={false}
               components={{ Option, MultiValue }}
               onChange={handleChangeStage}
               allowSelectAll={true}
               value={proffredStage}
               />
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Choice of Currency <span className="text-danger">*</span></label>
               <div>
                  {/* 
                  <select className="form-control btn-block-height square-edges" defaultValue={currency} onChange={(e) =>
                     setCurrency(e.target.value)}> */}
                     {indexCountforSlect >= 0 ?
                     <ReactSelect
                     // value={CurrencyType}
                     style={{ padding: '0px' }}
                     className="form-control btn-block-height square-edges"
                     defaultValue={countries[indexCountforSlect]}
                     // value={}
                     onChange={(e) => setCurrency(e.value)}
                     // value={passenger.nationality}
                     options={countries}
                     formatOptionLabel={(country) => (
                     <div className="country-option">
                        <img className='ml-2 mr-2'
                        style={{ width: '20px', height: '20px' }}
                        src={country.image}
                        alt={country.value}
                        />
                        <span style={{ fontSize: '13px' }}>
                        {country.value}
                        </span>
                     </div>
                     )}
                     />
                     :
                     <ReactSelect
                     style={{ padding: '0px' }}
                     className="form-control btn-block-height square-edges"
                     // defaultValue={countries[0]}
                     // value={}
                     onChange={(e) => setCurrency(e.value)}
                     // value={passenger.nationality}
                     options={countries}
                     formatOptionLabel={(country) => (
                     <div className="country-option">
                        <img
                        style={{ width: '20px', height: '20px' }}
                        src={country.image}
                        alt={country.value}
                        />
                        <span style={{ fontSize: '13px' }}>
                        {country.value}
                        </span>
                     </div>
                     )}
                     />
                     }
                     {/* 
                  </select>
                  */}
               </div>
            </div>
         </div>
         </div>
         <div className="col-md-12">
            <h3 className="card-title">Social Media</h3>
         </div>
         <div className="col-md-12">
            <div className="form-group">
               <label>Website<span className="text-danger">*</span></label>
               <div>
                  <input type="text" placeholder="Fund Website" data-tip="Fund Website" className="form-control" defaultValue={websiteLink} onChange={(e) => setwebsiteLink(e.target.value)} />
               </div>
            </div>
         </div>
         <div className="col-md-12">
            <div className="form-group">
               <label>LinkedIn</label>
               <div>
                  <input type="text" placeholder="Fund LinkedIn Page" className="form-control" data-tip="Fund LinkedIn Page" defaultValue={LinkedInLink} onChange={(e) => setLinkedInLink(e.target.value)} />
               </div>
            </div>
         </div>
         <div className="col-md-12">
            <div className="form-group">
               <label>Twitter</label>
               <div>
                  <input type="text" placeholder="Fund Twitter Link" data-tip="Fund Twitter Link" className="form-control" defaultValue={twitterLinkFunding} onChange={(e) => settwitterLinkFunding(e.target.value)} />
                  <ReactTooltip place="top" type="info" effect="solid" />
               </div>
            </div>
         </div>
         </div>
         </div>
         :
         isAngel === "true" ?  
         /* if angel investor true display only few fields*/
         <div className="row" style={{padding:"0px 10px 0px 10px"}}>
         <div className="col-md-6">
            <div className="form-group">
               <label>Country of Origin<span className="text-danger">*</span></label>
               <div>
                  <Select options={options} onChange={changeHandler} defaultValue={options[indexValue]} />
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
               <label>Assets Under Management(AUM)<span className="text-danger">*</span></label>
               <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
               <input type="number" className="form-control" defaultValue={assestmang} onChange={(e) => setassestmang(e.target.value)} onWheel={(e) => e.target.blur()} />
               {/* <label style={{ margin: '10px' }}>USD</label> */}
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
               <label>Minimum Investment Size<span className="text-danger">*</span></label>
               <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
               <input  type="number" className="form-control" defaultValue={minInvSize} onChange={(e) => setminInvSize(e.target.value)} onWheel={(e) => e.target.blur()} />
               {/* <label style={{ margin: '10px' }}>USD</label> */}
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
               <label>Number of Investments</label>
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
               {/* <Button id="TooltipExample" style={{ width: '20px', height: '20px', fontSize: '15px', borderRadius: '50px', padding: '0px', marginLeft: '5px' }} ref={targetRef} onClick={() => setShowoverlay(!showoverlay)}>
               ?
               </Button> */}
               {/* 
               <Overlay show={showoverlay} placement="right">
                  {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                     My Tooltip
                  </Tooltip>
                  )}
               </Overlay>
               */}
               {/* 
               <Tooltip placement="top" isOpen={showoverlay} target="TooltipExample" >
                  #MATIC #HNT #ETH #CR2
               </Tooltip>
               */}
               {/* 
               <Tooltip title="Person">Hello</Tooltip>
               */}
               </label>
               <div>
                  <input type="text" className="form-control" placeholder={"#MATIC #HNT #ETH #CR2"} data-tip={"#MATIC #HNT #ETH #CR2 "} defaultValue={projInvestedtilldate} onChange={(e) => setprojInvestedtilldate(e.target.value)} />
                  <ReactTooltip place="top" type="info" effect="solid" />
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Type of Fund<span className="text-danger">*</span></label>
               <div>
                  <select disabled={true} className="form-control btn-block-height square-edges" defaultValue={typeofFund} >
                     {clearDetailsofNormalInvestor()}
                     
                  <option style={{ fontSize: '13px' }} value="Angel Investor">Angel Investor</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Team Size</label>
               <div> <select className="form-control btn-block-height square-edges" defaultValue={teamSize} onChange={(e) => setteamSize(e.target.value)} >
                  {Count.map((_, i) => (
                  <option style={{ fontSize: '13px' }} value={i + 1} >{i + 1}</option>
                  ))}
                  <option style={{ fontSize: '13px' }} value="101">100 +</option>
                  </select>
                  {/* <input type="number" className="form-control" onWheel={(e) => e.target.blur()} /> */}
               </div>
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label> Preferred Sectors<span className="text-danger">*</span></label>
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
               {/* 
               <div>
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
               </div>
               */}
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Preferred Stage<span className="text-danger">*</span></label>
               <MySelect
               options={colourOptionsStage}
               isMulti
               closeMenuOnSelect={false}
               hideSelectedOptions={false}
               components={{ Option, MultiValue }}
               onChange={handleChangeStage}
               allowSelectAll={true}
               value={proffredStage}
               />
            </div>
         </div>
         <div className="col-md-6">
            <div className="form-group">
               <label>Choice of Currency<span className="text-danger">*</span></label>
               <div>
                  {/* 
                  <select className="form-control btn-block-height square-edges" defaultValue={currency} onChange={(e) =>
                     setCurrency(e.target.value)}> */}
                     {indexCountforSlect >= 0 ?
                     <ReactSelect
                     // value={CurrencyType}
                     style={{ padding: '0px' }}
                     className="form-control btn-block-height square-edges"
                     defaultValue={countries[indexCountforSlect]}
                     // value={}
                     onChange={(e) => setCurrency(e.value)}
                     // value={passenger.nationality}
                     options={countries}
                     formatOptionLabel={(country) => (
                     <div className="country-option">
                        <img className='ml-2 mr-2'
                        style={{ width: '20px', height: '20px' }}
                        src={country.image}
                        alt={country.value}
                        />
                        <span style={{ fontSize: '13px' }}>
                        {country.value}
                        </span>
                     </div>
                     )}
                     />
                     :
                     <ReactSelect
                     style={{ padding: '0px' }}
                     className="form-control btn-block-height square-edges"
                     // defaultValue={countries[0]}
                     // value={}
                     onChange={(e) => setCurrency(e.value)}
                     // value={passenger.nationality}
                     options={countries}
                     formatOptionLabel={(country) => (
                     <div className="country-option">
                        <img
                        style={{ width: '20px', height: '20px' }}
                        src={country.image}
                        alt={country.value}
                        />
                        <span style={{ fontSize: '13px' }}>
                        {country.value}
                        </span>
                     </div>
                     )}
                     />
                     }
                     {/* 
                  </select>
                  */}
               </div>
            </div>
         </div>
         </div> 
         : <div></div>
         
         }
</div>
</div>
</form>
</div>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0px' }}>
                    <div className="submit-section">
                        <button className="btn  submit-btn cl" onClick={() => closeFunc()}>CLOSE</button>
                    </div>
                    <div className="submit-section">
                        <button className="btn btn-primary submit-btn" onClick={() => getUpdateConfirm()}>SUBMIT</button>
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
    )
}

export default ProfileSettingsFunding;