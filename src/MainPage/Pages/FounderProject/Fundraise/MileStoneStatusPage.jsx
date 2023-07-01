
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { async } from 'regenerator-runtime';
import { apiURI } from '../../../../config/config';
import CongPopupLaunch from './CongPopupLaunch';
import './PrivateRound.css'
import ValidationStatusModal from './ValidationStatus';
import { milestoneValidationRequest } from '../../../../config/web3Round';


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

  
  const MileStoneStatusPage = ({ data, mId, rId, handleClose, getFundingRound }) => {
      const [uploadDocs, setUploadDocs] = useState([])
      const hiddenFileInput2 = useRef(null);
      const [MileStone, setMileStone] = useState('')
      const [TargetDate, setTargetDate] = useState('')
      const [Percentage, setPercentage] = useState('')
      const [ValidationStatus, setValidationStatus] = useState('')
      const [MileStoneStatus, setMileStoneStatus] = useState('')
      const [Fund, setFund] = useState('')
      const [EstTargetDate, setEstTargetDate] = useState('')
      const [Remarks, setRemarks] = useState('')
      const [InvestorRemarks, setInvestorRemarks] = useState('')
      const [Mile, setMile] = useState('')
      const [DocsArray, setDocsArray] = useState([])
      const [uploadDocModal, setUploadDocModal] = useState([])

      const [showPopupLaunch, setShowPopupLaunch] = useState(false)
      const [showValidationStatus, setShowValidationStatus] = useState(false)
      const [chooseMileStonedata, setChooseMileStonedata] = useState([{
          value: ''
        }])
    const [uploadFiles, setUploadFiles] = useState([{
        filename:"",
        filepath:""
    }])
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
        
    const [uploadDocumentAsync] = useMutation(UPLOAD_FILE, {onCompleted: async () => {} })

    const changeInputValueFunc = (value, i) => {

        var arrayObj = chooseMileStonedata
        arrayObj[i].value = value
        setChooseMileStonedata(
            arrayObj
        )
    }
    const dleteColumnMileStone = (i) => {
        // console.log("Milestone data ", chooseMileStonedata)
        if (chooseMileStonedata.length > 1) {
            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);
            setChooseMileStonedata(filteredPeople)
        } else {
            setChooseMileStonedata([{
                value: ''
              }])
        }
    }


    const addColumnMileStone = (i) => {
        var newData = {
            "value": "",

        }
        setChooseMileStonedata(
            [
                ...chooseMileStonedata,
                newData
            ])


    }

    const requestValidateMileStone = (data2) => {

        var today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var query = `
        mutation UpdateMilestone($id: ID, $input: MilestoneInput) {
            updateMilestone(_id: $id, input: $input) {
              _id
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
                    "id": data,
                    "input": {
                        "validation_status": 'Pending',
                        "milestone_status": 'Completed',
                        "estimated_target_date": date,
                        "remarks": Remarks,
                        "update_link": chooseMileStonedata,
                        "update_doc": uploadFiles
                    }
                }

            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(async (data) => {
                // console.log('getFounderUserDetails', data?.data?.allProjects);
                if (data?.data?.updateMilestone != null && data?.data?.updateMilestone != undefined) {
                    // dispatch(projectId(data?.data?.allProjects[0]._id))
                    // raise validation request to save in web3
                    // const userData = JSON.parse(localStorage.getItem('userAccount'));
                    // console.log('calling milestoneValidationRequest', wallet_address, mId, rId)
                    // let status = await milestoneValidationRequest(userData.provider, wallet_address, mId, rId)
                    // console.log('called milestoneValidationRequest: ', status);
                    showPopup()
                    getFundingRound()
                    // handleClose("request")
                }

            })




    }
    const updateValidateMileStone = (data2) => {



        var query = `
        mutation UpdateMilestone($id: ID, $input: MilestoneInput) {
            updateMilestone(_id: $id, input: $input) {
              _id
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
                    "id": data,
                    "input": {
                        "milestone_status": MileStoneStatus,
                        "estimated_target_date": EstTargetDate,
                        "remarks": Remarks,
                        "update_link": chooseMileStonedata,
                        // "update_doc": data2
                        "update_doc":uploadFiles

                    }
                }

            })
        })
            .then((response) => {

                const json = response.json();
                return json;
            })
            .then(data => {
                // console.log('getFounderUserDetails', data?.data?.allProjects);
                if (data?.data?.updateMilestone != null && data?.data?.updateMilestone != undefined) {
                    // dispatch(projectId(data?.data?.allProjects[0]._id))
                    // showPopup()
                    getFundingRound()
                    handleClose()
                }

            })




    }


    const showPopup = () => {

        setShowPopupLaunch(true)
    }

    const handleCloseShowPopup = () => {
        setShowPopupLaunch(false)
        handleClose()
    }

    const handleCloseValidationStatusFunc = () => {
        setShowValidationStatus(false)
    }

    const handleShowValidationStatusFunc = () => {
        setShowValidationStatus(true)
    }


    useEffect(() => {
        getMilestoneFunc()
    }, [])

    const getMilestoneFunc = () => {
        try {

            var query = `
            query GetMilestone($id: ID) {
                getMilestone(_id: $id) {
                  _id
                  milestone
                  target_date
                  percentage
                  validation_status
                  milestone_status
                  funds
                  estimated_target_date
                  remarks
                  blocked_status
                  update_link {
                    value
                  }
                  withdrawn_status
                  update_doc {
                    filename
                    filepath
                  }
                  investor_remarks
                  rejected_count
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
                        "id": data
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.getMilestone != null && data?.data?.getMilestone != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        setMileStone(data?.data?.getMilestone.milestone)
                        setMile(data?.data?.getMilestone)
                        if (data?.data?.getMilestone.update_link.length > 0) {

                            setChooseMileStonedata(data?.data?.getMilestone.update_link)
                        } else {

                            setChooseMileStonedata([{
                                value: ''
                            }])
                        }
                        if (data?.data?.getMilestone.target_date) {
                            var tar = data?.data?.getMilestone.target_date.split('T')[0]
                            setTargetDate(tar)
                        } else {

                            setTargetDate(data?.data?.getMilestone.target_date)
                        }
                        setPercentage(data?.data?.getMilestone.percentage)
                        setValidationStatus(data?.data?.getMilestone.validation_status)
                        setMileStoneStatus(data?.data?.getMilestone.milestone_status)
                        if (data?.data?.getMilestone.estimated_target_date) {
                            var tar2 = data?.data?.getMilestone.estimated_target_date.split('T')[0]
                            setEstTargetDate(tar2)
                        } else {

                            setEstTargetDate(data?.data?.getMilestone.estimated_target_date)
                        }
                        // setEstTargetDate(data?.data?.getMilestone.estimated_target_date)
                        setRemarks(data?.data?.getMilestone.remarks)
                        setFund(data?.data?.getMilestone.funds)

                        if (data?.data?.getMilestone.update_doc.length > 0) {
                            // setUploadDocModal(data?.data?.getMilestone?.update_doc)
                            setUploadFiles(data?.data?.getMilestone?.update_doc)
                        } else {
                            // setUploadDocModal(data?.data?.getMilestone?.update_doc)
                            setUploadFiles(data?.data?.getMilestone?.update_doc)
                        }


                    } else {
                        setMileStone('')
                        setTargetDate('')
                        setPercentage('')
                        setValidationStatus('')
                        setMileStoneStatus('')
                        setFund('')
                        setEstTargetDate('')
                        setRemarks('')


                        setChooseMileStonedata([{
                            value: ''
                        }])
                    }

                })


        } catch (err) {
            console.log(err);
        }

    }

    const handleClickFile2 = event => {
        hiddenFileInput2.current.click();
    };
    const onFileChange = async (e) => {

        var file = e.target.files;
        console.log("uploaded Files",file)
        var arrayFileLinks = [];
        var arrayFileNames = [];
        for(var i = 0; i < file.length ; i++ )
        {
            if(file[i]) {
                let filelink = await uploadDocumentAsync({
                variables:{
                    file:file[i],
                    "input": {
                        "project_id": ''
                    }
                }})
                setUploadFiles((prev) => [...prev,{
                    filename:filelink.data.singleUpload.filename,
                    filepath:filelink.data.singleUpload.filepath
                }])
                arrayFileLinks.push(filelink.data.singleUpload.filepath);
                arrayFileNames.push(filelink.data.singleUpload.filename)
            }
        }
    };

    
    const removeFile = (index1) => {

        const filteredPeople = uploadFiles.filter((_, index) => index !== index1);

        setUploadFiles(filteredPeople)
    }
        // // setUploadFiles();
        // console.log("uploaded Files array",arrayFileLinks,arrayFileNames);
        // console.log("uploaded Files array",uploadFiles)

        // if (file.length > 0){
        //     toast.success('Valuation document updated successfully', {
        //         position: "top-right",
        //         autoClose: 1000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }
        // if(file){
        //     let filelink = await uploadDocumentAsync({
        //         variables:{
        //             file:file,
        //             "input":{

        //             }
        //         }
        //     })
        // }
        // var maindoc = DocsArray
        // console.log(maindoc, "maindoc");
        // console.log(DocsArray, "DocsArray");

        // maindoc.push({
        //     file :file
        // })
        // console.log(maindoc, "maindoc");
        // // setDocsArray(maindoc)
        // const chosenFiles = Array.prototype.slice.call(e.target.files)
        // handleUploadedFile(chosenFiles)



    const handleUploadedFile = (file) => {
        const uploaded = [...DocsArray];
        file.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file)

            }
        })
        console.log(uploaded[0], "eeeqeq");
        setDocsArray(uploaded)

    }
    // try{
    //     if(DocsArray.length > 0 )  console.log(DocsArray[0]?.file.name,"DocsArray[0]?.file.name");
    //     console.log(DocsArray)
    // }catch(error){
    //     console.log(error);
    // }
    
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            if (data?.singleUpload?.filepath != null && data?.singleUpload?.filepath != undefined) {

                var arr = uploadDocModal
                arr.push({
                    filename: data?.singleUpload?.filename,
                    filepath: data?.singleUpload?.filepath
                })
                setUploadDocModal(arr)
                console.log(uploadDocModal);
            }
            return arr

        }
    },
    )

    const [uploadFileLaunch] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => {
            if (data?.singleUpload?.filepath != null && data?.singleUpload?.filepath != undefined) {

                // var data = [{
                //     filename: data?.singleUpload?.filename,
                //     filepath: data?.singleUpload?.filepath
                // }]
                var arr = uploadDocModal
                arr.push({
                    filename: data?.singleUpload?.filename,
                    filepath: data?.singleUpload?.filepath
                })
                setUploadDocModal(arr)

                // requestValidateMileStone(data)
            }

        }
    },
    )
    // console.log(data?.singleUpload?.filepath);
    // updateValidateMileStone()

    function getNumberOfDays(start) {
        const date1 = new Date(start);
        const date2 = new Date();

        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;

        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();

        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    const updateMilestoneData = async (main) => {
        console.log(MileStoneStatus,main,"Milestone1234567"     );
        if (main == 'Draft') {
            updateValidateMileStone(uploadDocModal)
        } else if (main == 'Launch') {
            if(MileStoneStatus != "Completed"){
                alert("Please Complete your Milestone before Requesting for Validation")
            }else{
                requestValidateMileStone(uploadDocModal)
            }
        } else {
            alert('Please Fill Details')
        }
    }

    const uploadDocsData = async (main) => {
        // var datetoday = new Date()
        // const userData = JSON.parse(localStorage.getItem('userAccount'));
        // if (userData) {
            // var maindate = getNumberOfDays(EstTargetDate)
            // console.log(maindate, "EstTargetDate");
            // if ((maindate != 0 && MileStoneStatus == 'Completed')) {
                // alert("Please check the Completion date")
            // } else {
                if (DocsArray.length > 0 && main == 'Draft') {
                    var litemainDatauploadFile = []
                    var mainDocArray = await DocsArray.map(async (file) => {

                        await uploadFile({ variables: { file: file,
                            "input": {
                                "project_id": ''
                            } } })
                            .then(async (MainIII) => {
                            var data = await MainIII?.data?.singleUpload
                            litemainDatauploadFile.push({
                                filename: data?.singleUpload?.filename,
                                filepath: data?.singleUpload?.filepath
                            })
                            return data
                        })
                        // console.log(litemainDatauploadFile,"mainDatauploadFile[0].file");\
                        
                        // return litemainDatauploadFile
                        // return uploadFile({ variables: { file:c } })
                        //  uploadFile({ variables: { file: } })
                    })
                    console.log(mainDocArray, mainDocArray, uploadDocModal, 'main');
                    // if(mainDocArray.length > 0) {
                    //     updateValidateMileStone(mainDocArray)
                    // }

                } else if (DocsArray.length > 0 && main == 'Launch') {

                    await uploadFileLaunch({ variables: { file: DocsArray[0].file ,
                        "input": {
                            "project_id": ''
                        } } })
                } else if (main == 'Draft') {
                    updateValidateMileStone(uploadDocModal)
                } else if (main == 'Launch') {
                    requestValidateMileStone(uploadDocModal)
                } else {
                    alert('Please Fill Details')
                }
            // }
        // } else {
        //     alert("Please connect to Metamask or Coinbase wallet");
        // }

    }


    const removeObj = (index1) => {

        const filteredPeople = DocsArray.filter((_, index) => index !== index1);
        console.log(filteredPeople, "filteredPeople");
        setDocsArray(filteredPeople)
    }

    const removeObj2 = (index1) => {

        const filteredPeople = uploadDocModal.filter((_, index) => index !== index1);
        console.log(filteredPeople, "filteredPeople");
        setUploadDocModal(filteredPeople)
    }



    const opennewWindowForDoc = (i) => {
        // console.log(i, "iiii");
        console.log("on Click ",i)
        window.open(i, '_blank').focus();
        // window.open(i)
    }
    // console.log((Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested'),Mile?.validation_status,'validationStatus');
    // console.log((Mile?.milestone_status == 'Completed'  || (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) && Mile?.validation_status == 'Approved',"kokko");

    // console.log(DocsArray,DocsArray.length ,"DocsArrayDocsArray");


    return (
        <div className="col-md-12">

            <div className="row">
                <div className="row">

                    <div className="col-md-12" style={{ padding: '0px' }}>


                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                            <div className="col" style={{ padding: '0px' }}>
                                {/* mt-4 */}
                                <div className="search mb-2">

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Milestone Status Update </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">

                    <div className="col-md-12">
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {MileStone}


                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Target Date</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                    {TargetDate}

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Milestone Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* || Mile?.validation_status == 'Rejected' */}
                                    {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                                        MileStoneStatus
                                        :

                                        Mile?.blocked_status == true ?
                                            MileStoneStatus
                                            :

                                            <select className="form-control btn-block-height square-edges" value={MileStoneStatus} onChange={(e) => setMileStoneStatus(e.target.value)}  >
                                                <option style={{ fontSize: '13px' }} value='Yet_to_start' >Yet to Start</option>
                                                <option style={{ fontSize: '13px' }} value='Ongoing' >Ongoing</option>
                                                <option style={{ fontSize: '13px' }} value='Completed' >Completed</option>
                                                {/* <option style={{ fontSize: '13px' }} value='Overdue' >Overdue</option> */}
                                            </select>
                                    }
                                </div>
                            </div>


                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            
                                {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                            
                                // <div>
                                <>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Completion Date</label>
                                        <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between'}}>
                                        {EstTargetDate}
                                        </div>
                                </>
                               
                                :
                                ""}
                                    {/* {
                                        // || ValidationStatus != 'Rejected'
                                        ValidationStatus != 'Approved' ?


                                            Mile?.blocked_status == true ?
                                                EstTargetDate
                                                :
                                                // <input type="date" disabled="true"  className="form-control" style={{ width: '300px' }} value=
                                                EstTargetDate
                                                // onChange={(e) => setEstTargetDate(e.target.value)} />
                                            :
                                            EstTargetDate
                                    }*/}
                                
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Validation Status</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                    {/* <div style={{ border: '2px solid green', color: 'green', backgroundColor: 'white', width: '140px', padding: '2px', fontWeight: '700', textAlign: 'center' }}>
                                        {ValidationStatus}
                                    </div> */}

                                    {ValidationStatus == 'Approved' ?
                                        // border: '2px solid green',
                                        <div style={{ color: 'green', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                            {/* Validated */}
                                            {ValidationStatus}
                                        </div>
                                        :
                                        // border: '2px solid red',
                                        ValidationStatus == 'Rejected' ?
                                            <div style={{ color: 'red', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                {/* Validated */}
                                                {ValidationStatus}
                                            </div>
                                            :
                                            ValidationStatus == 'Pending' ?

                                                // border: '2px solid  #ffe510',
                                                <div style={{ color: '#ffe510', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                    {/* Validated */}
                                                    {ValidationStatus}
                                                </div>
                                                :

                                                <div style={{ color: '#1890ff', backgroundColor: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>
                                                    {/* Validated */}
                                                    {ValidationStatus}
                                                </div>

                                    }
                                    {/* <div style={{ display: 'flex', flexDirection: 'row', width: '100px', justifyContent: 'center' }}>

                                        <Button
                                            style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff', margin: '0px' }}
                                            onClick={() => handleShowValidationStatusFunc()}
                                        >View</Button>

                                    </div> */}

                                </div>
                            </div>
                            {Mile?.rejected_count != '' && Mile?.rejected_count != undefined 
                            && Mile?.rejected_count != null &&  Mile?.rejected_count != 0 ?

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Rejected Count</label>
                                <div style={{ width: '300px' }}>
                                    {Mile?.rejected_count}
                                </div>
                            </div>
                            :  '' }
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row' }}>

                                {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}> */}
                                <label style={{ width: '310px', marginBottom: '0px' }}>Founder's Remarks</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                                        Remarks
                                        :

                                        Mile?.blocked_status == true ?
                                            Remarks
                                            :
                                            <textarea className="form-control" style={{ height: '100px', width: "600px" }} value={Remarks} onChange={(e) => setRemarks(e.target.value)} />
                                    }

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Update Links</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '500px' }}>

                                    {chooseMileStonedata.map((i, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                                            {/* <input className="form-control" style={{ width: '300px' }} placeholder='Link Name' /> */}

                                            {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                                            <div>
                                                <a href={i?.value} target="_blank">{i?.value}</a>
                                            </div> 
                                            :    
                                            <>
                                            <input className="form-control" style={{ width: '300px' }} placeholder='Paste your link here' defaultValue={i?.value} onChange={(e) => changeInputValueFunc(e.target.value, index)} />
                                            <div style={{ height: '100%' }}>
                                                <div className="" style={{ textAlign: 'center', justifyContent: 'space-evenly', display: 'flex', alignItems: 'center' }}>
                                                    <button className="btn btn-primary submit-btn"
                                                        style={{
                                                            minWidth: '44px',
                                                            fontSize: '30px',
                                                            padding: '5px',
                                                            height: '35px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 'bolder',
                                                            marginRight: '10px',
                                                            marginLeft: '20px'
                                                        }} onClick={() => dleteColumnMileStone(index)}>-</button>
                                                    {/* </div>
                                                    <div className="" style={{ textAlign: 'center', marginRight: '15px' }}> */}
                                                    <button className="btn btn-primary submit-btn" style={{
                                                        minWidth: '44px',
                                                        fontSize: '30px',
                                                        padding: '5px',
                                                        height: '35px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bolder'
                                                    }} onClick={() => addColumnMileStone(index)}>+</button>
                                                </div>
                                            </div>
                                            </>
                                                }
                                        </div>
                                    ))

                                    }



                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Update Docs</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                                    {/* // <div onClick={() => opennewWindowForDoc(uploadDocModal[0]?.filepath)}> */}
                                    {/* {uploadDocModal[0]?.filename} */}

                                    
                                    <div className='docsmain'>
                                        {uploadFiles.length > 0 ? 
                                            uploadFiles.map((main,index) => (
                                                <div className='docsSubmain'>
                                                    <div className='docsSub1' onClick={() => opennewWindowForDoc(main.filepath)}>
                                                        {main.filename}
                                                    </div>
                                        {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                                            "" 
                                            : 
                                            <div className='docsSub2' onClick={() => 
                                                // console.log("Delete item Pressed")
                                                removeFile(index)
                                                }>x
                                            </div>
                                            }

                                                    
                                                </div>
                                            ))
                                            :
                                            ""
                                        }
                                        
                                        {/* </div> */}
                                        {/* {DocsArray.length > 0 ? */}
                                            {/* DocsArray.map((main, index) => ( */}

                                                {/* <div className='docsSubmain'> */}
                                                    {/* {main}   {uploadDocModal[0]?.filename}{main?.file.name} */}
                                                    {/* {(URL.createObjectURL( */}

                                                    {/* <div className='docsSub1' onClick={() => opennewWindowForDoc(URL.createObjectURL(main))}> */}
                                                        {/* {main.name} */}
                                                    {/* </div> */}
                                                    {/* <div className='docsSub2' onClick={() => removeObj(index)}>x</div> */}
                                                    {/* {main.file.name} */}
                                                    {/* // ))} */}
                                                    {/* {main?.file.name} */}
                                                {/* </div> */}
                                            {/* )) */}
                                            {/* :/ */}
                                            {/* '' */}
                                        {/* } */}
                                        {/* {uploadDocModal.length > 0 ?
                                            uploadDocModal.map((main, index) => (
                                                <div className='docsSubmain'>
                                                    <div className='docsSub1' onClick={() => opennewWindowForDoc(main.filepath)}> */}
                                                        {/* {main.filename}
                                                    </div>
                                                    <div className='docsSub2' onClick={() => removeObj2(index)}>x</div>
                                                </div> */}
                                            {/* /* ))}
                                            :
                                            '' */}
                                        
                                        {/* { */
                                            // uploadDocs.length > 0 ?
                                            //     uploadDocs.map((i) => (
                                            //         <div className='docsSub1' onClick={() => opennewWindowForDoc(i.filepath)}>
                                            //         {i.filename}</div>
                                            //     ))
                                            //     :
                                        //             ''
                                            
                                     //     } */}
                                    }


                                    </div>
                            
                            
                            {(Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved' ?
                                
                            // <div>
                            ""
                           
                            :
                            <>
                                <Button
                                        style={{
                                            padding: '0px ',
                                            border: '2px solid #1890ff',
                                            maxWidth: '95px',
                                            fontSize: '12px',
                                            lineHeight: '24px',
                                            minHeight: '26px',
                                            textAlign: 'center',
                                            height: '30px',
                                            borderRadius: '2px ',
                                            width: '100%',
                                            marginLeft: '10px',
                                            background: '#1890ff',

                                        }}
                                        onClick={() => handleClickFile2()}
                                    >Upload</Button>
                                    <input
                                        type="file"
                                        multiple
                                        ref={hiddenFileInput2}
                                        onChange={onFileChange}
                                        style={{ display: 'none' }}
                                    />
                            </>
                            }         
                                    

                                </div>
                            </div>

                            {Mile?.investor_remarks != '' && Mile?.investor_remarks != undefined && Mile?.investor_remarks != null ?

                                <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <label style={{ width: '310px', marginBottom: '0px' }}>Investor Remarks</label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '300px' }}>
                                        {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                        {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                                        {Mile?.investor_remarks}

                                    </div>
                                </div>
                                :
                                ''
                            }


                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                            submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={(e) => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                                {/* || Mile?.validation_status == 'Rejected' */}
                                {/* || Mile?.validation_status == 'Rejected' */}
                                {/* {Mile?.milestone_status == 'Completed' || Mile?.validation_status == 'Approved'  ? */}
                                {((Mile?.milestone_status == 'Completed' && (Mile?.validation_status != 'Rejected' && Mile?.validation_status != 'Unrequested')) || Mile?.validation_status == 'Approved') ?

                                    ""
                                    :
                                    Mile?.blocked_status == true ?

                                        ''
                                        :

                                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                                {/* updateValidateMileStone */}
                                                <button className="btn btn-primary submit-btn" onClick={() => 
                                                    // uploadDocsData('Draft')
                                                    updateMilestoneData('Draft')
                                                    }>Update Milestone</button>
                                            </div>
                                            <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                                {/* requestValidateMileStone */}
                                                <button className="btn btn-primary submit-btn" onClick={() => 
                                                    // uploadDocsData('Launch')
                                                    updateMilestoneData('Launch')
                                                    }>Request Validation</button>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ValidationStatusModal
                    show={showValidationStatus}
                    handleClose={handleCloseValidationStatusFunc}
                /> */}

                <CongPopupLaunch PublicRound='You Request has been Placed Successfully' show={showPopupLaunch} handleClose={handleCloseShowPopup} />

            </div>

        </div>
    )
}
export default MileStoneStatusPage;
