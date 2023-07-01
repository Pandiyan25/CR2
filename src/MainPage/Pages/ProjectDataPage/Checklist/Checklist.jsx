

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { Card } from 'react-bootstrap';
import "./checklist.css"
import { Button } from 'react-bootstrap';

import { apiURI } from '../../../../config/config';

import { gamingImg, founderImage } from '../../../../Entryfile/imagepath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';


import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';
import { stringify } from 'rc-field-form/es/useWatch';
import { async } from 'regenerator-runtime';





const Checklist = ({invdata}) => {
   const projectNumber = useSelector((state) => state.constVar.projectId)
   const loginId = useSelector((state) => state.constVar.loginId)
   const [latestPitchDeck, setlatestPitchDeck] = useState("");
   const [checkData, setcheckData] = useState("");
   const [PitchDeckaddressing, setPitchDeckaddressing] = useState({});

   const [TeamKYC, setTeamKYC] = useState("");
   const [Technicalfounders, setTechnicalfounders] = useState("");
   const [SmartContractPublished, setSmartContractPublished] = useState("");
   const [auditReportLink, setauditReportLink] = useState("")
   const [BlockChain, setBlockChain] = useState("")
   const [ReasonBlockChain, setReasonBlockChain] = useState("")
   const [ScientificValuation, setScientificValuation] = useState("");
   const [ValuationLink, setValuationLink] = useState("")
   const [isProblem, setisProblem] = useState()
   const [isSolution, setisSolution] = useState()
   const [marketStrategy, setmarketStrategy] = useState()
   const [marketSize, setmarketSize] = useState()
   const [completionAnalysis, setcompletionAnalysis] = useState()
   const [traction, setTraction] = useState()
   const [team, setTeam] = useState()
   const [tokeNomicsUtility, setTokeNomicsUtility] = useState()
   const [fundRaise, setFundRaise] = useState()
   const [fundUtility, setfundUtility] = useState()
   const [exitStrategy, setexitStrategy] = useState()
   const [AdvisorsInvestors, setAdvisorsInvestors] = useState()
   const [calltoAction, setCalltoAction] = useState()
   const[valuationDocument,setvaluationDocument]=useState()
   const[valuationDocumentLink,setvaluationDocumentLink]=useState("")
   const[valuationDocumentMainLink,setvaluationDocumentMainLink]=useState("")
   const [disabled, setDisabled] = useState()
const [uploadLink,setUploadLink]=useState(false);
const[filename,setfilename]=useState("Valuation Document");

   const hiddenFileInput = React.useRef(null);

   const UPLOAD_FILE = gql`
   mutation SingleUpload($file: Upload!, $input: ProjectIdInput) {
       singleUpload(file: $file, input: $input) {
           filename
           mimetype
           encoding
           url
           filepath
           project_id
           ext
         }
     } `;

     
   const [uploadvaluationDocumentAsync] = useMutation(UPLOAD_FILE, {onCompleted: async (data) => {} })



   const onFileChange = async (e) => {
      console.log("Upload Document 2 on file change")
      var file = e.target.files[0]
      console.log(file, 'Upload Document 3 File Uploaded');
      if (e.target.files.length>0){
        
          toast.success('Valuation document updated successfully', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
      }

      if (file) {
         let filelink = await uploadvaluationDocumentAsync({
             variables: {
                 file: file,
                 "input": {
                     "project_id": checkData
                 }
             }
         })    
         // console.log(filelink.data.singleUpload,"Test 123");
         setfilename(filelink.data.singleUpload.filename)
         setvaluationDocumentMainLink(filelink.data.singleUpload.filepath);    
   }
      else{
         alert("Invalid File Format");
      }
  };


  const opennewWindow = (i) => {
   // window.open(`https://${i}`)
   window.open(i, '_blank').focus();
}

   /* handling checklist input on change */

   const handleSHowInputfunc = () => {
      setUploadLink(true)
  }
  const handleCloseInputFunc = () => {
   setUploadLink(false)
}
   const handlePitchDeck = (e) => {
      console.log(e)
      if (e === "true") {
         setlatestPitchDeck("true");
      }
      else {
         setlatestPitchDeck("false");
      }



   }
   const handleTeamKYC = (e) => {
      console.log(e)

      if (e === "true") {
         setTeamKYC("true");
      }
      else {
         setTeamKYC("false");
      }

   }
   const handleTechnicalfounders = (e) => {
      console.log(e)

      if (e === "true") {
         setTechnicalfounders("true");
      }
      else {
         setTechnicalfounders("false");
      }



   }
   const handleSmartContract = (e) => {
      console.log(e)

      if (e === "true") {
         setSmartContractPublished("true");
      }
      else {
         setSmartContractPublished("false");
      }


   }
   const handleAuditLink = (e) => {
      console.log(e)
      setauditReportLink(e);


   }
   const handleBlockChain = (e) => {
      console.log(e)
      setBlockChain(e);


   }

   const handleBlockChainReason = (e) => {
      console.log(e)
      setReasonBlockChain(e);
   }
   const handleScientificValuation = (e) => {
      console.log(e)
      if (e === "true") {
         setScientificValuation("true");
      }
      else {
         setScientificValuation("false");
      }

   }
   const handleValuationLink = (e) => {
      console.log(e)
      setValuationLink(e);
   }
   const handleClickFile = event => {
  console.log("Upload Document 1 !!")
  hiddenFileInput.current.click();
  };













   const getCheckListData = () => {
      try {
          var query = `
          query AllProjectCheckList($id: ID, $project: ID) {
            allProjectCheckList(_id: $id, project: $project) {
            _id
            project {
            email_id
            _id
            }
            isPitchDeck
            pitchDeskOptions {
            option
            value
            }
            isTeamInvited
            isTeamCore
            isContract
            blockchain_name
            blockchain_text
            isValuation
            valuation_link
            audit_link
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
                  variables: 
                     {
                        "id":loginId ,
                        "project": projectNumber,
                        }

                 

              })
          })
              .then((response) => {

                  const json = response.json();
                  return json;
              })
              .then(data => {

                  if (data?.data?.allProjectCheckList != null && data?.data?.allProjectCheckList != undefined && data?.data?.allProjectCheckList?.length > 0) 
                  
                  
                  {
                      
                     console.log(data?.data?.allProjectCheckList[0]._id,"id");
                     console.log(data?.data?.allProjectCheckList[0],"actual")
                     setcheckData(data?.data?.allProjectCheckList[0]._id,)
                     setlatestPitchDeck(data?.data?.allProjectCheckList[0].isPitchDeck ? "true" : "false")
                     setTeamKYC(data?.data?.allProjectCheckList[0].isTeamInvited ? "true" : "false" );
                     setTechnicalfounders(data?.data?.allProjectCheckList[0].isTeamCore ? "true" : "false");
                     setSmartContractPublished(data?.data?.allProjectCheckList[0].isContract ? "true" : "false");
                     setBlockChain(data?.data?.allProjectCheckList[0].blockchain_name);
                     setReasonBlockChain(data?.data?.allProjectCheckList[0].blockchain_text);
                     setScientificValuation(data?.data?.allProjectCheckList[0].isValuation ? "true" : "false");
                     // setValuationLink(data?.data?.allProjectCheckList[0].valuation_link)
                     // setvaluationDocumentLink(data?.data?.allProjectCheckList[0].valuation_link)
                     setvaluationDocumentMainLink(data?.data?.allProjectCheckList[0].valuation_link)
                     setauditReportLink(data?.data?.allProjectCheckList[0].audit_link)
                     //options setting 
                     setisProblem(data?.data?.allProjectCheckList[0].pitchDeskOptions[0].value);
                     setisSolution(data?.data?.allProjectCheckList[0].pitchDeskOptions[1].value);

                     setmarketSize(data?.data?.allProjectCheckList[0].pitchDeskOptions[2].value);
                     setmarketStrategy(data?.data?.allProjectCheckList[0].pitchDeskOptions[3].value);
                     setcompletionAnalysis(data?.data?.allProjectCheckList[0].pitchDeskOptions[4].value);
                     setTraction(data?.data?.allProjectCheckList[0].pitchDeskOptions[5].value);
                     setTeam(data?.data?.allProjectCheckList[0].pitchDeskOptions[6].value);
                     setTokeNomicsUtility(data?.data?.allProjectCheckList[0].pitchDeskOptions[7].value);
                     setFundRaise(data?.data?.allProjectCheckList[0].pitchDeskOptions[8].value);
                     setfundUtility(data?.data?.allProjectCheckList[0].pitchDeskOptions[9].value);
                     setexitStrategy(data?.data?.allProjectCheckList[0].pitchDeskOptions[10].value);
                     setAdvisorsInvestors(data?.data?.allProjectCheckList[0].pitchDeskOptions[11].value);
                     setCalltoAction(data?.data?.allProjectCheckList[0].pitchDeskOptions[12].value);

                     console.log(checkData,"checkdata for edit")
                     if(data?.data?.allProjectCheckList[0]._id != null && data?.data?.allProjectCheckList[0]._id != undefined && data?.data?.allProjectCheckList[0]._id != '')
                     {
                        console.log("true is set")
                        setDisabled(true)
                     }
                     else{
                        console.log("false is set")
                        setDisabled(false)
                     }
                     

                
                  } 
                  else 
                  {
                   
                     setlatestPitchDeck("");
                     setTeamKYC("");
                     setTechnicalfounders("");
                     setSmartContractPublished("");
                     setBlockChain("");
                     setReasonBlockChain("");
                     setScientificValuation("");
                     setValuationLink("");
                  }


       

     
         
              })

      } catch (error) {
          console.log(error, "error");
      }

      

     

  }
   const createChecklistDetails = () => {

      // mainSaveFunc();
   
          console.log("create function triggered")

      if ((latestPitchDeck != undefined && latestPitchDeck != null && latestPitchDeck != "") &&
         ( TeamKYC != undefined && TeamKYC != null && TeamKYC != null)&&
         (Technicalfounders != null && Technicalfounders != undefined && Technicalfounders != "") &&
         (BlockChain != '' && BlockChain != undefined && BlockChain != "") &&
         (ScientificValuation != null && ScientificValuation != undefined && ScientificValuation != "")
         ) 
         {
         try {
            var query = `mutation Mutation($input: CheckListInput) {
            createProjectCheckList(input: $input) {
            _id
            isPitchDeck
            isTeamInvited
            isTeamCore
            isContract
            blockchain_name
            blockchain_text
            isValuation
            valuation_link
            audit_link
            pitchDeskOptions {
            value
            option
            }
            project {
            email_id
            }
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
                  variables:

                  {
                     "input": {
                        "valuation_link": valuationDocumentMainLink,
                        "audit_link":auditReportLink,
                        "project": projectNumber,
                        "pitchDeskOptions": [
                           { 
                              "option": "isProblem",
                              "value": isSolution == undefined || isSolution == false  ? false : true,
                           },
                           {
                              "option": "isSolution",
                              "value": isSolution == undefined || isSolution == false  ? false : true,
                           },
                           {
                              "option": "market",
                              "value": marketSize == undefined || marketSize == false  ? false : true,
                           },
                           {
                              "option": "MarketStrategy",
                              "value": marketStrategy == undefined || marketStrategy == false ? false : true,
                           },
                           {
                              "option": "CompletionAnalysis",
                              "value": completionAnalysis == undefined || completionAnalysis == false ? false : true,
                           },
                           {
                              "option": "Traction",
                              "value": traction == undefined || traction == false? false : true,
                           },
                           {
                              "option": "Team",
                              "value": team == undefined || team == false ? false : true,
                           },
                           {
                              "option": "TokeNomicsUtility",
                              "value": tokeNomicsUtility == undefined || tokeNomicsUtility == false? false : true,
                           },
                           {
                              "option": "FundRaise",
                              "value": fundRaise == undefined || fundRaise == false ? false : true,
                           },
                           {
                              "option": "FundUtility",
                              "value": fundUtility == undefined || fundUtility == false ? false : true,
                           },
                           {
                              "option": "ExitStrategy",
                              "value": exitStrategy == undefined || exitStrategy == false  ? false : true,
                           },
                           {
                              "option": "AdvisorInvestor",
                              "value": AdvisorsInvestors == undefined || AdvisorsInvestors == false ? false : true,
                           },
                           {
                              "option": "CalltoAction",
                              "value": calltoAction == undefined || calltoAction == false ? false : true,
                           },

                        ],
                        "isValuation": ScientificValuation === "true" ? true:false,
                        "isTeamInvited": TeamKYC === "true" ? true:false,
                        "isTeamCore": Technicalfounders === "true" ? true:false,
                        "isPitchDeck": latestPitchDeck === "true" ? true:false,
                        "blockchain_text": ReasonBlockChain,
                        "isContract": SmartContractPublished === "true" ? true:false,
                        "blockchain_name": BlockChain
                     }

                  }

               })
            })
               .then((response) => {

                  const json = response.json();
                  return json;
               })
               .then(data => {
                  if (data?.data?.createProjectCheckList) {

                     toast.success('Created Successfully', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                     });
            

                     getCheckListData();
                     
                     // await mainSaveFunc(data?.data?.updateProject?._id)
                     /* need to dispatch data to redux and get data from redux */

                  }

               })
         } catch (error) {
            console.log("create checklist error");
         }
      } else {
         alert("Please fill all the mandatory fields")
      }
 
   }

   




const updateChecklistDetails = () => {


       try {
           var query = `mutation Mutation($id: ID, $input: CheckListInput) {
            updateProjectCheckList(_id: $id, input: $input) {
            _id
            project {
            email_id
            }
            isPitchDeck
            isTeamInvited
            isTeamCore
            isContract
            blockchain_name
            blockchain_text
            isValuation
            valuation_link
            audit_link
            pitchDeskOptions {
            option
            value
            }
            }
            }`;
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
                   variables:

                  {
                     "input": {
                     "valuation_link": valuationDocumentMainLink,
                     "audit_link":auditReportLink,
                     "project": projectNumber,
                     "pitchDeskOptions": [
                        {
                           "option": "isProblem",
                           "value": isProblem
                        },
                        {
                           "option": "isSolution",
                           "value": isSolution
                        },
                        {
                           "option": "market",
                           "value": marketSize
                        },
                        {
                           "option": "MarketStrategy",
                           "value": marketStrategy
                        },
                        {
                           "option": "CompletionAnalysis",
                           "value": completionAnalysis
                        },
                        {
                           "option": "Traction",
                           "value": traction
                        },
                        {
                           "option": "Team",
                           "value": team
                        },
                        {
                           "option": "TokeNomicsUtility",
                           "value": tokeNomicsUtility
                        },
                        {
                           "option": "FundRaise",
                           "value": fundRaise
                        },
                        {
                           "option": "FundUtility",
                           "value": fundUtility
                        },
                        {
                           "option": "ExitStrategy",
                           "value": exitStrategy
                        },
                        {
                           "option": "AdvisorInvestor",
                           "value": AdvisorsInvestors
                        },
                        {
                           "option": "CalltoAction",
                           "value": calltoAction
                        },
                     ],
                     "isValuation": ScientificValuation === "true" ? true:false,
                     "isTeamInvited": TeamKYC === "true" ? true:false,
                     "isTeamCore": Technicalfounders === "true" ? true:false,
                     "isPitchDeck": latestPitchDeck === "true" ? true:false,
                     "blockchain_text": ReasonBlockChain,
                     "isContract": SmartContractPublished === "true" ? true:false,
                     "blockchain_name": BlockChain,
                     },
                     "id": checkData,
                     }

               })
           })
               .then((response) => {

                   const json = response.json();
                   return json;
               })
               .then(data => {
                   if (data?.data?.updateProjectCheckList) {

                       toast.success('Updated Successfully', {
                           position: "top-right",
                           autoClose: 3000,
                           hideProgressBar: false,
                           closeOnClick: true,
                           pauseOnHover: true,
                           draggable: true,
                       });
                       getCheckListData()
                       
              
                   }
               })
       } catch (error) {
           console.log("update checklist error");
       }


}


useEffect(() => {
   console.log(loginId, "funding Log1");
   if (loginId != '') {
      getCheckListData()



   }
  

}, [loginId])






console.log("get",latestPitchDeck,TeamKYC,Technicalfounders,SmartContractPublished,ScientificValuation,isProblem)


   return (
      <div >
         <div className="content container-fluid mt-5" style={{ padding: '0px' }}>
            <div className="page-header" style={{ marginBottom: '15px', height: "auto" }}>
               <div className="row align-items-center " style={{ width: '100%', margin: '0px' }}>
                  <div className="col">
                     <h3 style={{ fontWeight: '600', fontSize: '16px', marginBottom: '15px' }}>Using this checklist, you can determine whether guardians or investors have all the information they need for due diligence.</h3>
                     <div style={{ padding: "15px", borderRadius: "4px",backgroundColor:"rgb(255, 255, 255)",boxShadow: "2px 1px 8px 3px #e4e4e4"}}>
                        <div className='row'>
                           <div className='col-12'>
                              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '18px' }}>PITCH DECK</h3>
                           </div>
                           <div className='col-6'>
                              <p className='' style={{marginBottom:"0px"}}>Have you uploaded the latest pitch deck ? <span style={{fontSize:"20px",color:"red"}}>*</span></p>
                              <p style={{fontWeight:"400"}}>(Refresh your pitchdeck as often as you like)</p>
                           </div>
                           <div className='col-3' >
                              {/* 
            <form onChange={(e) => handleIncubated(e.target.value)} value={isIncubated}> */}
                              <form onChange={(e) => handlePitchDeck(e.target.value)} Value={latestPitchDeck} >
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="true" checked={latestPitchDeck === "true" }  disabled={disabled}/> <span style={{fontWeight:"600"}} >Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="false" checked={latestPitchDeck === "false"} disabled={disabled}/> <span style={{fontWeight:"600"}} >No</span>
                              </form>
                           </div>
                        </div>
                        <div className='row'>
                           <div className='col-12'>
                              <p className='mt-2' style={{marginBottom:"0px"}}>Does yor pitch deck address the following ? <span style={{fontSize:"20px",color:"red"}}>*</span> </p>
                              <p style={{fontWeight:"400",marginTop:"0px"}}>(Don't worry pitchdeck never remains the same, you can address these issues Now)</p>
                           </div>
                           <div className='col-12' >
                              {/* 
            <form onChange={(e) => handleIncubated(e.target.value)} value={isIncubated}> */}
                              <form >
                                 <div className='row'>
                                    <div className='col-4'>
                                    <input className="mb-2" type="checkbox" value="" checked={isProblem} name="gender" onChange={(e) => setisProblem(!isProblem)}disabled={disabled} /> <span style={{fontWeight:"600"}}>Problem </span>&nbsp; &nbsp; &nbsp;

                                    </div>
                                    <div className='col-4'>
                                    <input className="mb-2" type="checkbox" value="" checked={isSolution} name="gender" onChange={(e) => setisSolution(!isSolution)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Solution </span>&nbsp; &nbsp; &nbsp;
                                    </div>

                                    <div className='col-4'>
                                    <input className="mb-2" type="checkbox" value="" checked={marketStrategy} name="gender" onChange={(e) => setmarketStrategy(!marketStrategy)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Market size (TAM, SAM & SOM) </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={marketSize} name="gender" onChange={(e) => setmarketSize(!marketSize)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Go to market strategy </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={completionAnalysis} name="gender" onChange={(e) => setcompletionAnalysis(!completionAnalysis)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Competition analysis </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       
                                 <input className="mb-2" type="checkbox" value="" checked={traction} name="gender" onChange={(e) => setTraction(!traction)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Traction </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={team} name="gender" onChange={(e) => setTeam(!team)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Team </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                 
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={fundRaise} name="gender" onChange={(e) => setFundRaise(!fundRaise)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Fund raise ask & mode </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={fundUtility} name="gender" onChange={(e) => setfundUtility(!fundUtility)}disabled={disabled} /> <span style={{fontWeight:"600"}}>Fund raise utility </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={exitStrategy} name="gender" onChange={(e) => setexitStrategy(!exitStrategy)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Exit strategy </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                 <input className="mb-2" type="checkbox" value="" checked={AdvisorsInvestors} name="gender" onChange={(e) => setAdvisorsInvestors(!AdvisorsInvestors)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Advisors & investors </span>&nbsp; &nbsp; &nbsp;
                                       </div>
                                       <div className='col-4'>
                                 <input className="mb-2" type="checkbox" value="" checked={calltoAction} name="gender" onChange={(e) => setCalltoAction(!calltoAction)} disabled={disabled} /> <span style={{fontWeight:"600"}}>Call to action </span>(how to reach out to you)
                                       </div>
                                       <div className='col-4'>
                                       <input className="mb-2" type="checkbox" value="" checked={tokeNomicsUtility} name="gender" onChange={(e) => setTokeNomicsUtility(!tokeNomicsUtility)} disabled={disabled} /> <span style={{fontWeight:"600"}}>TokeNomics & token utility</span> (if token utility is determined) &nbsp; &nbsp; &nbsp;
                                       </div>

                                 </div>
                              </form>
                              <hr>
                              </hr>
                           </div>
                        </div>
                        <div className='row'>
                           <div className='col-12' >
                              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '18px' }}>TEAM</h3>
                           </div>
                           <div className='col-6'>
                              <p className=''>Have you invited your core team members to complete their KYC?<span style={{fontSize:"20px",color:"red"}}>*</span>


                              <p style={{fontWeight:"400"}}>(Core team members completing KYC can help you score more points
                                 in due diligence)</p>
                              </p>
                           </div>
                           <div className='col-3'>
                              <form onChange={(e) => handleTeamKYC(e.target.value)} value={TeamKYC}>
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="true" name="gender" checked={TeamKYC === "true" }disabled={disabled} /> <span style={{fontWeight:"600"}}>Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="false" name="gender" checked={TeamKYC === "false"}disabled={disabled} /> <span style={{fontWeight:"600"}}>No</span>
                              </form>
                           </div>
                           <hr>
                           </hr>
                        </div>
                        <div className='row'>
                           <div className='col-6'>
                              <p className=''>Is the core team composed of technical founders or co-founders?<span style={{fontSize:"20px",color:"red"}}>* </span></p>
                           </div>
                           <div className='col-3'>


                              <form onChange={(e) => handleTechnicalfounders(e.target.value)} value={Technicalfounders}>
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="true" name="gender" checked={Technicalfounders === "true"} disabled={disabled} /> <span style={{fontWeight:"600"}}>Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="false" name="gender"  checked={Technicalfounders === "false"} disabled={disabled} /><span style={{fontWeight:"600"}}> No</span>
                              </form>


                           </div>
                        </div>
                        <hr>
                        </hr>
                        <div className='row'>
                           <div className='col-12' >
                              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '18px',marginBottom:"20px" }}>PRODUCT</h3>
                           </div>
                           <div className='col-6'>
                              <p className=''>Is the Smart Contract published and audited?<span style={{fontSize:"20px",color:"red"}}>*</span>  </p>
                           </div>
                           <div className='col-3'>
                              <form onChange={(e) => handleSmartContract(e.target.value)} value={SmartContractPublished}>
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="true" name="gender" checked={SmartContractPublished === "true"} disabled={disabled} /> <span style={{fontWeight:"600"}}>Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="false" name="gender" checked={SmartContractPublished === "false"} disabled={disabled} /> <span style={{fontWeight:"600"}}>No</span>
                              </form>
                           </div>
                           <hr>
                           </hr>
                        </div>
                        <div className='row'>
                           <div className='col-12'>
{SmartContractPublished ==="true" ? <div className='row mb-2'>
                           <div className='col-6'>
                              <p className='mt-2'>If <span style={{fontWeight:"600"}}>Yes</span>, please provide the link of the audit report</p>
                           </div>
                           <div className='col-3'>
                              <input type="text" className="form-control" name="gender" placeholder='Paste your audit link report here' onChange={(e) => handleAuditLink(e.target.value)} value={auditReportLink} disabled={disabled} />
                           </div>
                           </div>:""}
                           

                           <div className='row mb-2'>
                              
                           <div className='col-6'>
                              <p className='mt-2'>On which blockchain are you building your project?<span style={{fontSize:"20px",color:"red"}}>*</span></p>
                           </div>
                           <div className='col-3'>


                              <select className="form-control btn-block-height square-edges" onChange={(e) => handleBlockChain(e.target.value)} value={BlockChain}disabled={disabled} >
                                                <option style={{ fontSize: '13px' }} value="">Select</option>
                        

                                                    <option style={{ fontSize: '13px' }}> Ethereum </option>
                                                    <option style={{ fontSize: '13px' }}> Binance Smart Chain </option>
                                                    <option style={{ fontSize: '13px' }}> Polygon </option>
                                                    <option style={{ fontSize: '13px' }}> Avalanche </option>
                                                    <option style={{ fontSize: '13px' }}> Solana  </option>
                                                    <option style={{ fontSize: '13px' }}> Polkadot  </option>
                                                    <option style={{ fontSize: '13px' }}> AME Chain </option>
                                                    <option style={{ fontSize: '13px' }}> Cardano </option>
                                                    <option style={{ fontSize: '13px' }}> Alogrand </option>
                                                    <option style={{ fontSize: '13px' }}> Cosmos </option>
                                                    <option style={{ fontSize: '13px' }}> Near </option>
                                                   
                                              
                                                <option style={{ fontSize: '13px' }} value="other">Other</option>
                                                {/* <option style={{ fontSize: '13px' }} value="others">others</option> */}
                                            </select>
                           </div>
                           </div>
                           <div className='row mb-2'>
                           <div className='col-6'>
                              <p className='mt-2'>Please specify the reason for choosing the blockchain?</p>
                           </div>
                           <div className='col-3'>
                              <textarea type="text" rows="4" cols="50" className="form-control" name="gender" placeholder='Reason for blockchain' onChange={(e) => handleBlockChainReason(e.target.value)} value={ReasonBlockChain} readOnly={disabled} />
                           </div>

                           </div>

                           </div>
                        </div>
                        <hr>
                        </hr>
                        <div className='row'>
                           <div className='col-12' >
                              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600", fontSize: '18px',marginBottom:"20px" }}>VALUATION</h3>
                           </div>
                           <div className='col-6'>
                              <p className=''>Did you follow any scientific method in valuating your project? <span style={{fontSize:"20px",color:"red"}}>*</span></p>
                           </div>
                           <div className='col-3'>
                              <form onChange={(e) => handleScientificValuation(e.target.value)} value={ScientificValuation}>
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="true" name="gender" checked={ScientificValuation==="true"} disabled={disabled} /> <span style={{fontWeight:"600"}}>Yes</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                                 <input type="radio" className="mt-1" style={{fontWeight:"600"}} value="false" name="gender" checked={ScientificValuation==="false"} disabled={disabled} /> <span style={{fontWeight:"600"}}>No</span>
                              </form>
                           </div>
                           {ScientificValuation==="true"?<div > <div className='col-12'>
                              <p className='mt-2'>If <span style={{fontWeight:"600"}}>Yes</span>, Please provide the link or upload a document for determining the valuation</p>
                           </div>
                           <div className='col-12 mb-2'>
                              
                              {/* <label className="mt-3 mr-2">Link</label>
                              <input type="text" style={{width:"800px"}} className="form-control" name="gender" placeholder='Copy the workings link here' onChange={(e) => handleValuationLink(e.target.value)} value="" />
                              
                              <button style={{
                                                    borderRadius: '0px 5px 5px 0px',
                                                    fontSize: '13px',
                                                    height: "44px",

                                                }} onClick={handleClickFile} className="btn add-btn-search ml-4">Upload Document</button>
                                                {valuationDocumentMainLink =="null" || valuationDocumentMainLink ==undefined || valuationDocumentMainLink =="" ? 
                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: 'red', textDecoration: 'underline', width: '50%', cursor: 'pointer', marginLeft: '10px' }} >Doc not Uploaded</div>: <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '30%', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(valuationDocumentMainLink) }} >{valuationDocumentMainLink}</div> } */}


{valuationDocumentMainLink != '' && valuationDocumentMainLink != null && valuationDocumentMainLink != undefined && uploadLink == false ?
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                <div style={{ wordSpacing: 'normal', padding: '0px', color: '#6345ED', textDecoration: 'underline', width: '30%', cursor: 'pointer', marginLeft: '10px' }} onClick={() => { opennewWindow(valuationDocumentMainLink) }} >{filename}</div>
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
                                            valuationDocumentMainLink != '' && valuationDocumentMainLink != null && valuationDocumentMainLink != undefined && uploadLink == true ?
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {/*  */}
                                                    <input type="text" className="form-control" style={{ width: '80%' }} value={valuationDocumentMainLink} onChange={(e) => setvaluationDocumentMainLink(e.target.value)} readOnly={disabled} />
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
                                                        <input type="text" className="form-control" style={{ width: '80%' }} value={valuationDocumentMainLink} onChange={(e) => setvaluationDocumentMainLink(e.target.value)} readOnly={disabled} />
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
                                        readOnly={disabled} />
                              </div>
                             
                           
                              
                              </div>
                           :"" }
                          


                        </div>
                        <div className='row'>
                          
                           <div className='col-12'>
                              <div style={{float:"right"}}>
                                 {
                                    
                                 }
                              { 
                              checkData != null && checkData != undefined && checkData != '' && disabled == true && invdata == true?

                          <button className='btn btn-primary submit-btn' onClick={() => setDisabled(false)}>EDIT</button>
                          : checkData != null && checkData != undefined && checkData != '' && disabled == false  && invdata == true ?
                        <button className='btn btn-primary submit-btn' onClick={() => updateChecklistDetails()}>UPDATE</button>
                        : invdata == true ?
                        <button className='btn btn-success submit-btn' onClick={() => createChecklistDetails()}>SAVE</button>
                                 :""}
                              </div>
                   

                           </div>
                  

                      
                           
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Checklist;
