import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import { MileStoneArray, MileStoneInvestorPrivateArray, MileStonePrivateArray } from '../../../../reducers/ConstantSlice';
import './PrivateRound.css'
import ReactSelect from "react-select";
import { ToastContainer, toast } from 'material-react-toastify';

import 'material-react-toastify/dist/ReactToastify.css';


import BUSDimage  from '../Funding/assets/images/BUSD.png';
import DAIimage  from '../Funding/assets/images/DAI.png';
import USDCimage  from '../Funding/assets/images/USDC.png';
import USDTimage from '../Funding/assets/images/USDT.png';


const EditPrivateRound = ({ indexCountforSlect,handleClose ,publicId,getFundingRound}) => {

    const projectIdData = useSelector((state) => state.constVar.projectId)
    const dispatch = useDispatch()
    const [Count, setCount] = useState([])
    
    const loginId = useSelector((state) => state.constVar.loginId)
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [initialRelease, setInitialRelease] = useState('')
    const [NoofTokens, setNoofTokens] = useState('')
    const [Valuation, setValuation] = useState('')
    const [MaxSupply, setMaxSupply] = useState('')
    const [Stage, setStage] = useState('')
    const [PricePerToken, setPricePerToken] = useState('')
    const [TokenTicker, setTokenTicker] = useState('')
    const [FundRequested, setFundRequested] = useState('')
    const [Currency, setCurrency] = useState('')
    const [PrimaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const [Ivestor, setIvestor] = useState('')
    const [deletedMilestone, setDeletedMilestone] = useState([]);

    const [tokenStd1, setTokenStd1] = useState([])
    

    const projectNumber = useSelector((state) => state.constVar.projectId)
    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)
    console.log(chooseMileStonedata,"chooseMileStonedata12345");
    // const [chooseMileStonedata, setChooseMileStonedata] = useState([
    // {
    //     choose: "Choose_MileStone",
    //     ValueForChoose: 'MileStone1',
    //     TargetDate: "",
    //     percentage: 0
    // }
    // ])

    const addColumnMileStone = (i) => {
        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item,ind )=> {
                 

                    sum += parseFloat(item.percentage)
                 }
            )
        }

        var mainperc = parseFloat(initialRelease) + sum 

        if(mainperc < 100){
            var newData = {
                choose: "Choose_MileStone",
                milestone: `Complete 50% of the Target Fund Raise`,
                target_date: "",
                percentage: 1
            }
            var mainData = [...chooseMileStonedata]
            mainData.push(newData)
            console.log(mainData, "mainData");
            (dispatch(MileStoneInvestorPrivateArray(
                [
                    ...chooseMileStonedata,
                    newData
                ])))
            // setChooseMileStonedata(
            //     [
            //         ...chooseMileStonedata,
            //         newData
            //     ])
    
        }else{
            alert('Milestone Percentage should be 100')
        }
       



    }
    const dleteColumnMileStone = (i) => {
        if (chooseMileStonedata.length > 1) {
            

            if(chooseMileStonedata[i]?.id != undefined){
            setDeletedMilestone( (prev)=>  [...prev,chooseMileStonedata[i]?.id] )
            }

            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);
            (dispatch(MileStoneInvestorPrivateArray(
                
                    filteredPeople
                )))
            // setChooseMileStonedata(filteredP/eople)
        } else {
            alert("There should be atleast one MileStone")
        }
    }

    const setChooseMileStonedataFunc = (index1, evnt) => {
        const { name, value } = evnt.target;

        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                choose: value,
                milestone: value === "set_MileStone" ? "" : x.milestone
            } : x));


        (dispatch(MileStoneInvestorPrivateArray((updatedData))))
    }
    // console.log(chooseMileStonedata, "chooseMileStonedata");


    useEffect(() => {
        getCountofHundFunc()
    }, [])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        // console.log(arr, "aeee");
        setCount(arr)
        getFundingDataFunc()
        getValueFunc()
    }


    const getFundingDataFunc = () => {
        try {
            var query = `
            query AllUsers($role: String, $user: ID, $connected: Boolean) {
                allUsers(role: $role, user: $user, connected: $connected) {
                    wallet_address
                    fund_name
                    first_name
                    last_name
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
                        "role": 'Investor',
                        "user": loginId,
                        "connected": true
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    // if (data?.data?.allProjectFundingData != null && data?.data?.allProjectFundingData != undefined && data?.data?.allProjectFundingData.length > 0) {
                    //     setTokenStd1(data?.data?.allProjectFundingData)

                    // } else {
                    //     setTokenStd1([])
                    // }
                    if (data?.data?.allUsers != null && data?.data?.allUsers != undefined && data?.data?.allUsers.length > 0) {
                        setTokenStd1(data?.data?.allUsers)

                    } else {
                        setTokenStd1([])
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }

    
    const changePercentageFunc = (index1, evnt) => {
        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item,ind )=> {
                 index1 != ind ?

                    sum += parseFloat(item.percentage) : 
                    sum = sum
                // console.log(ind,item,"momo");
                 }
            )
        }
        // console.log(sumofValueofArray, sum, "addperc");

        var mainperc = parseFloat(initialRelease) + sum + parseInt(evnt.target.value)
        if (mainperc > 100) {
            alert('Percentage should not exceed 100')



        } else {

        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                percentage: value
            } : x));
            
        // console.log(updatedData.map(x =>x.percentage) , "local Index    updatedData")

        // console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))
        }
    }

    const changeValueForChoose  = (index1, evnt) => {
        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                milestone: value
            } : x));

        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))

    }


    const changeTargetDate = (index1, evnt) => {
        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                target_date: value
            } : x));

        console.log(updatedData, "updatedData")

        console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))

    }


    
    const getValueFunc = () => {
        try {

            var query = `
            query GetFundraise($id: ID) {
                getFundraise(_id: $id) {
                  _id
                  primary_funding_wallet
                  currency
                  funds_requested
                  token_ticker
                  price_per_token
                  stage
                  max_supply
                  valuation
                  no_of_tokens
                  initial_release_percentage
                  end_target_date
                  milestones {
                    milestone
                    target_date
                    percentage
                  }
                  investor {
                    _id
                    fund_name
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
                    variables: {
                        "id": publicId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.getFundraise != null && data?.data?.getFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        // setFundRaiseData(data?.data?.getFundraise)
                        
                        setPrimaryFundingWallet(data?.data?.getFundraise?.primary_funding_wallet)
                        setIvestor(data?.data?.getFundraise?.investor?._id)

                        getMilestoneFunc(data?.data?.getFundraise?._id)
                        setCurrency(data?.data?.getFundraise?.currency)
                        setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        setValuation(data?.data?.getFundraise?.valuation)
                        setNoofTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        if (data?.data?.getFundraise?.end_target_date != '' && data?.data?.getFundraise?.end_target_date != undefined
                            && data?.data?.getFundraise?.end_target_date != null
                        ) {
                            var dateType = data?.data?.getFundraise?.end_target_date.split('T')[0]
                            setEndtargetDate(dateType)
                        } else {
                            setEndtargetDate('')
                        }

                        // var mainMileStone = []
                        // for (var i = 0; i < data?.data?.getFundraise?.milestones.length; i++) {
                        //     if (data?.data?.getFundraise?.milestones[i].target_date != '' && data?.data?.getFundraise?.milestones[i].target_date != undefined) {

                        //         // if(data?.data?.getFundraise?.milestones[i].target_date )
                        //         var mileStoneDate = data?.data?.getFundraise?.milestones[i].target_date
                        //         mileStoneDate = mileStoneDate.split('T')[0]
                        //         console.log(mileStoneDate,"mileStoneDate");
                        //         mainMileStone = [{

                        //             "choose": "set_MileStone",
                        //             "target_date": mileStoneDate,
                        //             "milestone":data?.data?.getFundraise?.milestones[i].milestone,
                        //             "percentage":data?.data?.getFundraise?.milestones[i].percentage
                        //             // ...data?.data?.getFundraise?.milestones[i]
                        //         }
                        //         ]
                        //     }





                        // }
                        // (dispatch(MileStoneInvestorPrivateArray((mainMileStone))))

                    }

                })


        } catch (err) {
            console.log(err);
        }
    }


    const getMilestoneFunc = (fundraise) => {
        try {

            var query = `
            query AllMilestone($fundraise: ID) {
                allMilestone(fundraise: $fundraise) {
                  _id
                  milestone
                  milestone_type
                  target_date
                  percentage
                  validation_status
                  milestone_status
                  funds
                  estimated_target_date
                  remarks
                  withdrawn_status
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
                        "fundraise": fundraise
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                        var mainMileStone = []
                        for (var i = 0; i < data?.data?.allMilestone.length; i++) {

                            if(data?.data?.allMilestone[i]._id != null && data?.data?.allMilestone[i]._id != undefined){
                                
                                mainMileStone.push({
                                    id: data?.data?.allMilestone[i]._id,
                                    "choose":data?.data?.allMilestone[i]?.milestone_type === null ? "set_MileStone": data.data.allMilestone[i].milestone_type,
                                    "milestone": data?.data?.allMilestone[i].milestone,
                                    "target_date": data?.data?.allMilestone[i].target_date != null ? data?.data?.allMilestone[i].target_date.split('T')[0] : null,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                }) 
                            }
                            
                        }
                        // console.log("Milestone Data 123",mainMileStone);
                        dispatch(MileStoneInvestorPrivateArray((mainMileStone)))
                    }
                })
                            // if (data?.data?.allMilestone[i].target_date != '' && data?.data?.allMilestone[i].target_date != undefined) {

                            //     // if(data?.data?.allMilestone[i].target_date )
                            //     var mileStoneDate = data?.data?.allMilestone[i].target_date
                            //     mileStoneDate = mileStoneDate.split('T')[0]
                            //     console.log(mileStoneDate, "mileStoneDate");
                            //     mainMileStone.push({
                            //         "choose": "set_MileStone",
                            //         "target_date": mileStoneDate,
                            //         "milestone": data?.data?.allMilestone[i].milestone,
                            //         "percentage": data?.data?.allMilestone[i].percentage,
                            //         "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                            //         validation_status: data?.data?.allMilestone[i].validation_status,
                            //         milestone_status: data?.data?.allMilestone[i].milestone_status,
                            //         id: data?.data?.allMilestone[i]._id,
                            //         // ...data?.data?.allMilestone[i]
                            //     })

                            // } else {
                            //     mainMileStone.push({

                            //         "choose": "set_MileStone",
                            //         "target_date": '',
                            //         "milestone": data?.data?.allMilestone[i].milestone,
                            //         "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                            //         "percentage": data?.data?.allMilestone[i].percentage,
                            //         validation_status: data?.data?.allMilestone[i].validation_status,
                            //         milestone_status: data?.data?.allMilestone[i].milestone_status,
                            //         id: data?.data?.allMilestone[i]._id,

                            //         // ...data?.data?.allMilestone?.milestones[i]
                            //     })
                            // }




                            // console.log(mainMileStone, "mainMileStone");

                       
                    // } else {


                    //    var  mainMileStone = [{

                    //         "choose": "Choose_MileStone",
                    //         "target_date": "",
                    //         "milestone":`Complete 50% of the Target Fund Raise`,
                    //         "percentage":1
                            
                    //     }
                    //     ]
                    //     (dispatch(MileStoneInvestorPrivateArray((mainMileStone))))
                    // }

                


        } catch (err) {
            console.log(err);
        }

    }

    const saveDraftFunc = () => {
        try {
            var mileStoneArray = []
            if (chooseMileStonedata.length > 0) {

                for (var i = 0; i < chooseMileStonedata.length; i++) {
                    mileStoneArray.push({
                        "milestone_id":chooseMileStonedata[i].id === undefined ? null : chooseMileStonedata[i].id  ,
                        "milestone": chooseMileStonedata[i].milestone,
                        "milestone_type":chooseMileStonedata[i].choose,
                        "target_date": chooseMileStonedata[i].target_date,
                        "percentage": parseFloat(chooseMileStonedata[i].percentage),
                        validation_status: 'Unrequested',
                        milestone_status: 'Yet_to_start',
                        funds: ((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundRequested)) / 100),
                        estimated_target_date: '',
                        remarks: '',
                    })
                }
            } else {
                mileStoneArray = []
            }

            if (
                Ivestor != null && Ivestor != undefined && Ivestor != '' ) {

                    // console.log("chooseMileStonedata input",
                    //                     "round", "Private",
                    //                     "project", projectIdData,
                    //                     "primary_funding_wallet", PrimaryFundingWallet,
                    //                     "funds_requested", parseFloat(FundRequested),
                    //                     "currency", Currency,
                    //                     "token_ticker", TokenTicker,
                    //                     "price_per_token", parseFloat(PricePerToken),
                    //                     "stage", Stage,
                    //                     "max_supply", parseFloat(MaxSupply),
                    //                     "valuation", parseFloat(Valuation),
                    //                     "no_of_tokens", parseFloat(NoofTokens),
                    //                     "initial_release_percentage", parseFloat(initialRelease),
                    //                     "milestones", mileStoneArray,
                    //                     "deletedMilestone",deletedMilestone,                    
                    //                     "investor", Ivestor,
                    //                     "founder_status", 'Draft',
                    //                     "investor_status", 'Received',
                    // );
                var query = `
                    mutation Mutation($id: ID, $input: FundraiseInput) {
                        updateFundraise(_id: $id, input: $input) {
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
                            "id": publicId,
                            "input": {
                                "round": "Private",
                                "project": projectIdData,
                                "primary_funding_wallet": PrimaryFundingWallet,
                                "funds_requested": parseFloat(FundRequested),
                                "currency": Currency,
                                "token_ticker": TokenTicker,
                                "price_per_token": parseFloat(PricePerToken),
                                "stage": Stage,
                                "max_supply": parseFloat(MaxSupply),
                                "valuation": parseFloat(Valuation),
                                "no_of_tokens": parseFloat(NoofTokens),
                                "initial_release_percentage": parseFloat(initialRelease),
                                "milestones": mileStoneArray,
                                "deletedMilestone":deletedMilestone,                    
                                "investor": Ivestor,
                                "founder_status": 'Draft',
                                "investor_status": 'Received',
                            }
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {

                        if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
   

                            toast.success("Successfully Saved as Draft", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            getFundingRound()
                            handleClose()



                        }

                    })


            }
            else{
                alert("Please Select Investor")
            }
  

        } catch (err) {
            console.log(err);
        }
    }

    const savePrivateRoundFunc = (statusValue) => {
        try {

            var mileStoneArray = []
            if ( chooseMileStonedata.length > 0){

            
                const choosefiliter = chooseMileStonedata.findIndex((index) => index.target_date == '' || index.target_date == null || index.target_date == undefined)
                // console.log(chooseMileStonedata, "choosefiliter");
                // console.log(choosefiliter, "choosefiliter");
                if(choosefiliter < 0){
                for(var i = 0;i<chooseMileStonedata.length;i++){
                    mileStoneArray.push({
                        "milestone_id":chooseMileStonedata[i].id === undefined ? null : chooseMileStonedata[i].id ,
                        "milestone":chooseMileStonedata[i].milestone,
                        "milestone_type":chooseMileStonedata[i].choose,
                        "target_date":chooseMileStonedata[i].target_date != null ? chooseMileStonedata[i].target_date.split('T')[0] : null,
                        "percentage":parseFloat(chooseMileStonedata[i].percentage),
                        
                        validation_status: 'Unrequested',
                        milestone_status: 'Yet_to_start',
                        funds:((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundRequested))/100),
                        estimated_target_date:'',
                        remarks:''
                    })
                }

    
                var sum = 0
                if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
                    var sumofValueofArray = chooseMileStonedata.forEach(item => {
                        sum += parseFloat(item.percentage);
                    });
                } else {
                    sum = 0
                }
                var mainSum = 0
                mainSum = sum + parseFloat(initialRelease)
                
                // console.log("alert checking ","Ivestor Currency  FundRequested PricePerToken Stage MaxSupply Valuation NoofTokens initialRelease statusValue mainSum",
                // initialRelease,statusValue,mainSum);

                if (
                    Ivestor != null && Ivestor != undefined && Ivestor != '' &&
                    // Currency != null && Currency != undefined && Currency != '' &&
                    // FundRequested != null && FundRequested != undefined && FundRequested != '' &&
                    // PricePerToken != null && PricePerToken != undefined && PricePerToken != '' &&
                    // Stage != null && Stage != undefined && Stage != '' &&
                    // MaxSupply != null && MaxSupply != undefined && MaxSupply != '' &&
                    // Valuation != null && Valuation != undefined && Valuation != '' &&
                    // NoofTokens != null && NoofTokens != undefined && NoofTokens != '' &&
                    // initialRelease != null && initialRelease != undefined && initialRelease != '' &&
                    statusValue == 'Draft'
                ) {
    
                    var query = `
                    mutation Mutation($id: ID, $input: FundraiseInput) {
                        updateFundraise(_id: $id, input: $input) {
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
    
                                "id": publicId,
                                "input": {
                                    "round":"Private",
                                    "project": projectIdData,
                                    "primary_funding_wallet": PrimaryFundingWallet,
                                    "funds_requested": parseFloat(FundRequested),
                                    "currency": Currency,
                                    "token_ticker": TokenTicker,
                                    "price_per_token": parseFloat(PricePerToken),
                                    "stage": Stage,
                                    "max_supply": parseFloat(MaxSupply),
                                    "valuation": parseFloat(Valuation),
                                    "no_of_tokens": parseFloat(NoofTokens),
                                    "initial_release_percentage": parseFloat(initialRelease),
                                    "milestones": mileStoneArray,
                                    "deletedMilestone":deletedMilestone,
                                    "investor":Ivestor,
                                    "founder_status":statusValue,
                                    "investor_status":'Received',
                                    // "founder_status":'Sent'
                                    // "end_target_date": EndtargetDate
                                }
                            }
    
                        })
                    })
                        .then((response) => {
    
                            const json = response.json();
                            return json;
                        })
                        .then(data => {
                            console.log('getFounderUserDetails', data?.data?.allProjects);
                            if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
                                // dispatch(projectId(data?.data?.allProjects[0]._id))
                                toast.success("Successfully Updated", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                                getFundingRound()
                                handleClose()
                            }
    
                        })
    
    
                }else if (
                    Ivestor != null && Ivestor != undefined && Ivestor != '' &&
                    Currency != null && Currency != undefined && Currency != '' &&
                    FundRequested != null && FundRequested != undefined && FundRequested != '' &&
                    PricePerToken != null && PricePerToken != undefined && PricePerToken != '' &&
                    Stage != null && Stage != undefined && Stage != '' &&
                    MaxSupply != null && MaxSupply != undefined && MaxSupply != '' &&
                    Valuation != null && Valuation != undefined && Valuation != '' &&
                    NoofTokens != null && NoofTokens != undefined && NoofTokens != '' &&
                    initialRelease != null && initialRelease != undefined && initialRelease != '' &&
                    mainSum == 100
                ) {
    
                    var query = `
                    mutation Mutation($id: ID, $input: FundraiseInput) {
                        updateFundraise(_id: $id, input: $input) {
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
    
                                "id": publicId,
                                "input": {
                                    "round":"Private",
                                    "project": projectIdData,
                                    "primary_funding_wallet": PrimaryFundingWallet,
                                    "funds_requested": parseFloat(FundRequested),
                                    "currency": Currency,
                                    "token_ticker": TokenTicker,
                                    "price_per_token": parseFloat(PricePerToken),
                                    "stage": Stage,
                                    "max_supply": parseFloat(MaxSupply),
                                    "valuation": parseFloat(Valuation),
                                    "no_of_tokens": parseFloat(NoofTokens),
                                    "initial_release_percentage": parseFloat(initialRelease),
                                    "milestones": mileStoneArray,
                                    "deletedMilestone":deletedMilestone,
                                    "investor":Ivestor,
                                    "founder_status":statusValue,
                                    "investor_status":'Received',
                                    // "founder_status":'Sent'
                                    // "end_target_date": EndtargetDate
                                }
                            }
    
                        })
                    })
                        .then((response) => {
    
                            const json = response.json();
                            return json;
                        })
                        .then(data => {
                            console.log('getFounderUserDetails', data?.data?.allProjects);
                            if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
                                // dispatch(projectId(data?.data?.allProjects[0]._id))
                                toast.success("Successfully Updated", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                                getFundingRound()
                                handleClose()
                            }
    
                        })
    
    
                } else if (mainSum > 100 || mainSum < 100) {
    
                    alert('Please Fill all the required fields')
                }  else {
                    alert("Please Fill all the required fields")
                }
            }else{
                mileStoneArray = []
                alert("Please Fill all the required fields")
            }
        }
            // console.log(
            //     Ivestor,
            //     Currency,
            //     FundRequested,
            //     PricePerToken,
            //     Stage,
            //     MaxSupply,
            //     Valuation,
            //     NoofTokens,
            //     initialRelease,
            //     "initialRelease"
            // );

         

        } catch (err) {
            console.log(err);
        }
    }


    
    const countries = [
        // { value: "USD", label: "USD", image: usdimage }, 
        // { value: "SDT", label: "SDT", image: AEDimage},
        // { value: "INR", label: "INR", image:  INRimage },
        // { value: "RUBLE", label: "RUBLE", image: RUBLEimage},
        // { value: "CAD", label: "CAD", image:  CADimage},
        // { value: "GBP", label: "GBP", image:  GBPimage},
        // { value: "AED", label: "AED", image: AEDimage },
        // { value: "CNY", label: "CNY", image: CNYimage},
        // { value: "VMD", label: "VMD", image:  VMDimage},
        // { value: "EURO", label: "EURO", image:  EUROimage},
        // { value: "POUND", label: "POUND", image:  POUNDimage},
        // { value: "YUAN", label: "YUAN", image:  YUANimage},
        // { value: "INR", label: "INR", image:  INRimage},
        // { value: "YEN", label: "YEN", image:  YENimage},
        // { value: "SGD", label: "SGD", image:  SGDimage},
        // { value: "AUD", label: "AUD", image:  AUDimage},
        // { value: "YEN", label: "YEN", image:  JPYImage},
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage},
        { value: "USDT", label: "USDT", image:  USDTimage},

    ];




    var todayMite = new Date();
    var ddMite = todayMite.getDate();
    var mmMite = todayMite.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyyMite = todayMite.getFullYear();
    if (ddMite < 10) {
        ddMite = '0' + ddMite
    }
    if (mmMite < 10) {
        mmMite = '0' + mmMite
    }

    todayMite = yyyyMite + '-' + mmMite + '-' + ddMite;



    const ValuationFunc = (e) => {
        
        if (e.target.checkValidity()) {
            // Input is valid,
            setPricePerToken(e.target.value)
            let main = 0;
            // console.log("Setting price per token 1234:",i,"fundsReqs",MaxSupply);
            if (MaxSupply > 0) main = e.target.value * parseInt(MaxSupply)
            setValuation(main)
            let noToken = 0;
            if (FundRequested) noToken = parseFloat(FundRequested) / e.target.value;
            // console.log("noToken:1234 ",noToken);
            setNoofTokens(isFinite(noToken) ? noToken : 0);
          } else {
            // Input is invalid, display an error message
            alert("Please enter a valid number");
          }
    }

    const setInitialReleasefunc = (i) => {
        var sum = 0;
        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach(item => {
                sum += parseFloat(item.percentage);
            });
        }
        console.log(sumofValueofArray, sum, "addperc");

        var mainperc = parseFloat(i) + sum
        if (mainperc > 100) {
            alert('Percentage should be 100')
        } else {
            setInitialRelease(i)
        }

    }

    const fundReqFunc = (e) =>{
        
        if (e.target.checkValidity()) {

            setFundRequested(e.target.value);
            let noToken = 0;

            if (PricePerToken) noToken = e.target.value / parseFloat(PricePerToken);
            setNoofTokens(isFinite(noToken) ? noToken : 0);

          } else {
              alert("Please enter a valid number");
          } 
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row" style={{ padding: '10px' }}>
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Investor<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}

                            <select className="form-control btn-block-height square-edges" value={Ivestor} onChange={(e) => setIvestor(e.target.value)} >
                                {
                                    tokenStd1.map((i) => (

                                        <option style={{ fontSize: '13px' }} value={i?._id}  >{`${i?.fund_name} `} </option>
                                    ))

                                }
                            </select>
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => setIvestor(e.target.value)} /> */}


                        </div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Primary Funding Wallet</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" readOnly='true' type="text" className="form-control" style={{ width: '300px' }} value={PrimaryFundingWallet} onChange={(e) => setPrimaryFundingWallet(e.target.value)} />


                        </div>
                    </div>
                    {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Choose Currency<span className="text-danger">*</span></label> */}
                        {/* <input type="text" className="form-control"  */}
                        {/* <div style={{ width: '300px' }}> */}
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} />

                            <div> */}
                            {/* <select className="form-control btn-block-height square-edges" value={Currency} onChange={(e) => setCurrency(e.target.value)} >
                                <option style={{ fontSize: '13px' }} value="" >Choose Currency</option>
                                <option style={{ fontSize: '13px' }} value="USD" >USD</option>
                            </select> */}
                            {/* </div> */}
                        {/* </div>
                    </div> */}


                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <label style={{ width: '310px' }}>Currency</label>
                        <div style={{ width: '300px' }}>
                                            {/* {Currency != '' && Currency != null && Currency != undefined ? */}

                                                <ReactSelect
                                                    // value={Currency}
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
                                                {/* :
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
                                            } */}



                                        </div>
                                        {/* <select>
                                            <option value="volvo" style={`background-image:url(${usdticon});`}>Volvo</option>
                                            <option value="saab" style={`background-image:url(${usdticon});`}>Saab</option>
                                            <option value="honda" style={`background-image:url(${usdticon});`}>Honda</option>
                                            <option value="audi" style={`background-image:url(${usdticon});`}>Audi</option>
                                        </select> */}

                                        {/* <div className="dropdown">
                                                <button className="dropbtn">
                                                    Country Flags
                                                </button>

                                                <div className="dropdown-content">
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132503/iflag.jpg"
                                                            width="20" height="15"/> India</a>

                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132504/uflag.jpg"
                                                            width="20" height="15"/> USA</a>
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132502/eflag.jpg"
                                                            width="20" height="15"/> England</a>
                                                    <a href="#">
                                                        <img src=
                                                            "https://media.geeksforgeeks.org/wp-content/uploads/20200630132500/bflag.jpg"
                                                            width="20" height="15"/> Brazil</a>
                                                </div>
                                            </div> */}

                                    </div>
                                
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Funds Requested<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} value={FundRequested} onChange={(e) => fundReqFunc(e.target.value)}  /> */}
                            <input 
                            style={{ width: '300px' }} type="text" 
                            className="form-control" 
                            pattern="[0-9]*([.][0-9]*)?"
                            value={FundRequested} onChange={fundReqFunc} />

                        </div>
                    </div>

                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Token Ticker</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={TokenTicker} onChange={(e) => setTokenTicker(e.target.value)} />


                        </div>
                    </div>

                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}> Price Per Token<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} value={PricePerToken} onChange={(e) => ValuationFunc(e.target.value)} /> */}
                            <input  
                            style={{ width: '300px' }} type="text" 
                            className="form-control" pattern="[0-9]*([.][0-9]*)?"
                            value={PricePerToken} onChange={ValuationFunc} />

                        </div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Stage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                            <select className="form-control btn-block-height square-edges" value={Stage} onChange={(e) => setStage(e.target.value)} >
                            <option style={{ fontSize: '13px' }} value="pre_seed_round" >Pre Seed Round</option>
                                <option style={{ fontSize: '13px' }} value="seed_round" >Seed Round</option>
                                <option style={{ fontSize: '13px' }} value="strategic_round" > Strategic Round</option>
                                <option style={{ fontSize: '13px' }} value="pre_sale" >Pre Sale</option>
                                <option style={{ fontSize: '13px' }} value="public_round" >Public Round</option>
                                <option style={{ fontSize: '13px' }} value="kol_round" >KOL Round</option>
                                <option style={{ fontSize: '13px' }} value="early_stage" >Early Stage</option>
                                <option style={{ fontSize: '13px' }} value="seriesA" >Series A</option>
                                <option style={{ fontSize: '13px' }} value="seriesB" >Series B</option>
                                <option style={{ fontSize: '13px' }} value="otc" >OTC</option>
                                {/* <option style={{ fontSize: '13px' }} value="set_MileStone" >USD</option> */}
                            </select>

                        </div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Max Supply<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} value={MaxSupply} onChange={(e) => setMaxSupply(e.target.value)} readOnly='true' />


                        </div>
                    </div>

                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Valuation<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} value={Valuation} onChange={(e) => setValuation(e.target.value)} readOnly='true' />


                        </div>
                    </div>


                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={NoofTokens} onChange={(e) => setNoofTokens(e.target.value)} />


                        </div>
                    </div>
                    <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                            <select className="form-control btn-block-height square-edges" value={initialRelease} onChange={(e) => setInitialReleasefunc(e.target.value)} >
                                {Count.map((_, i) => (
                                    <option style={{ fontSize: '13px' }} value={i + 1} >{`${i + 1}%`}</option>

                                ))}{/* <option style={{ fontSize: '13px' }} value="set_MileStone" >USD</option> */}
                            </select>

                        </div>
                    </div>
                   {/* <div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}> */}
                        {/* <label style={{ width: '100%' }}>Set/Choose Milestones<span className="text-danger">*</span></label> */}
                        {/* <input type="text" className="form-control"  */}
                    {/* </div> */}
                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ width: '100%', marginTop: '20px' }}>
                            <div>
                                <table style={{ border: 'none' }}>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Choose/Set Milestones</th>
                                        <th style={{ textAlign: 'center' }}>Milestones</th>
                                        <th style={{ textAlign: 'center' }}>Target Date </th>
                                        <th style={{ textAlign: 'center' }}>Percentage</th>
                                    </tr>
                                    {chooseMileStonedata.map((i, index) => (
                                        <tr key={index}>
                                            <td style={{ width: '20%', padding: '10px' }}>
                                                <div>
                                                    <select className="form-control btn-block-height square-edges" value={i?.choose} onChange={(evnt) => setChooseMileStonedataFunc(index, evnt)} >
                                                        <option style={{ fontSize: '13px' }} value="Choose_MileStone" >Choose Milestone</option>
                                                        <option style={{ fontSize: '13px' }} value="set_MileStone" >Set Own Milestone</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td style={{ width: '25%', padding: '10px' }}>
                                                {
                                                    i.choose == 'Choose_MileStone' ?

                                                        <div>
                                                            <select className="form-control btn-block-height square-edges" value={i?.milestone} placeholder={`Choose MileStone${index + 1}`} onChange={(evnt) => changeValueForChoose(index, evnt)}>
                                                                <option style={{ fontSize: '13px' }} value={`Complete 50% of the Target Fund Raise`} >Complete 50% of the Target Fund Raise</option>
                                                                <option style={{ fontSize: '13px' }} value={`Lock the Tokens in Vesting Contracts`} >Lock the Tokens in Vesting Contracts</option>
                                                                <option style={{ fontSize: '13px' }} value={`Launch Minimum Viable Product`} >Launch Minimum Viable Product</option>
                                                                <option style={{ fontSize: '13px' }} value={`Complete & Publish Smart Contract Audit Report`} >{'Complete & Publish Smart Contract Audit Report'}</option>
                                                                <option style={{ fontSize: '13px' }} value={`List the Token in Decentralised Exchange`} >List the Token in Decentralised Exchange</option>
                                                                <option style={{ fontSize: '13px' }} value={`List the Token in Centralised Exchange`} >List the Token in Centralised Exchange</option>
                                                                <option style={{ fontSize: '13px' }} value={`Launch Testnet of the Product`} >Launch Testnet of the Product</option>
                                                                <option style={{ fontSize: '13px' }} value={`Launch Mainnet of the Product`} >Launch Mainnet of the Product</option>
                                                                <option style={{ fontSize: '13px' }} value={`Secure a lead investor`}>Secure a lead investor</option>
                                                                <option style={{ fontSize: '13px' }} value={`Secure a guardian score of 7+`}>Secure a guardian score of 7+</option>
                                                                <option style={{ fontSize: '13px' }} value={`Achieve an organic community of 5000+ across social channels`}>Achieve an organic community of 5000+ across social channels</option>
                                                                <option style={{ fontSize: '13px' }} value={`Secure a grant from leading blockchain network`}>Secure a grant from leading blockchain network</option>
                                                                <option style={{ fontSize: '13px' }} value={`Set up or incorporate a legal entity`}>Set up or incorporate a legal entity</option>
                                                                <option style={{ fontSize: '13px' }} value={`Achieve a 500+ daily active users (DAU)`}>Achieve a 500+ daily active users (DAU)</option>
                                                                
                                                            </select>

                                                        </div>
                                                        :
                                                        <input className="form-control" value={i?.milestone} onChange={(evnt) => changeValueForChoose(index, evnt)} />
                                                }
                                            </td>
                                            <td style={{ width: '17%', padding: '10px' }}>
                                                <input type='date' min={todayMite} className="form-control" value={i?.target_date} onChange={(evnt) => changeTargetDate(index, evnt)} />
                                            </td>
                                            <td style={{ width: '12%', padding: '10px' }}>

                                                <div>
                                                    <select className="form-control btn-block-height square-edges" value={i?.percentage} onChange={(evnt) => changePercentageFunc(index, evnt)} >
                                                        {Count.map((_, i) => (
                                                            <option style={{ fontSize: '13px' }} value={i + 1}  >{`${i + 1}%`}</option>

                                                        ))}
                                                        {/* <option style={{ fontSize: '13px' }} value={`20`} >20%</option>
                                                        <option style={{ fontSize: '13px' }} value={`30`} >30%</option> */}
                                                    </select>
                                                </div>
                                            </td>
                                            <td style={{ width: '15%', padding: '10px' }}>

                                                <div >
                                                    <div className="" style={{ textAlign: 'center', justifyContent: 'flex-start', display: 'flex' }}>
                                                        <button className="btn btn-primary submit-btn"
                                                            style={{
                                                                minWidth: '44px',
                                                                fontSize: '30px',
                                                                padding: '5px',
                                                                height: '35px',
                                                                display: index === 0 ? "none": "flex",
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontWeight: 'bolder',
                                                                marginRight: '10px'
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
                                            </td>
                                        </tr>

                                    ))}
                                </table>

                            </div>
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                        {/* submit-section
                        submit-section */}
                        <div className="" style={{ textAlign: 'center' }}>
                            <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>
                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                <button className="btn btn-primary submit-btn" onClick={() => saveDraftFunc()} >SAVE DRAFT</button>
                                {/*  savePrivateRoundFunc('Draft') */}
                            
                            </div>

                            <div className="" style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary submit-btn" onClick={() => savePrivateRoundFunc("Sent")}>SEND REQUEST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
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
        </div>

    )
}
export default EditPrivateRound;
