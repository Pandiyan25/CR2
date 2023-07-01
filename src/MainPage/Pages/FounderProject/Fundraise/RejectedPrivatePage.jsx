import React, { useEffect, useState } from 'react';
import { MileStonePrivateArray,MileStoneInvestorPrivateArray } from '../../../../reducers/ConstantSlice';
import ReactSelect from "react-select";
import './PrivateRound.css'
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import { ToastContainer, toast } from 'material-react-toastify';


import DAIimage from '../Funding/assets/images/DAI.png';
import BUSDimage from '../Funding/assets/images/BUSD.png';
import USDCimage from '../Funding/assets/images/USDC.png';
import USDTimage from '../Funding/assets/images/USDT.png';



const RejectedPrivatePage = ({ indexCountforSlect,getFundingRound, handleClose, publicId }) => {

    const dispatch = useDispatch()
    const [Count, setCount] = useState([])
    const [PrimaryStatus, setPrimaryStatus] = useState('')
    const [fundRaiseData, setFundRaiseData] = useState([])
    const [primaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const [Currency, setCurrency] = useState('')
    const [currencyValue, setCurrencyValue] = useState(0)
    
    
    const [ValuationValue, setValuationValue] = useState(0)
    const [numOfTokens, setNumOfTokens] = useState(0)
    const [FundInvested, setFundInvested] = useState(0)
    const [FundRequested, setFundRequested] = useState('')
    const [deletedMilestone, setDeletedMilestone] = useState([]);

    const [TokenTicker, setTokenTicker] = useState('')
    const [PricePerToken, setPricePerToken] = useState('')
    const [Stage, setStage] = useState('')
    const [MaxSupply, setMaxSupply] = useState('')
    const [Valuation, setValuation] = useState('')
    const [NoofTokens, setNoOfTokens] = useState('')
    const [initialRelease, setInitialRelease] = useState('')
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [MileStoneArrayData, setMileStoneArrayData] = useState([])
    const [MilestoneEditData, setMilestoneEditData] = useState([])
    
    // const [indexCountforSlect, setindexCountforSlect] = useState()

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

    


    const [RejectPopup, setRejectPopup] = useState(false)

    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)

    // const addColumnMileStone = (i) => {
    //         var newData = {
    //             choose: "Choose_MileStone",
    //             milestone: `Complete 50% of the Target Fund Raise`,
    //             target_date: "",
    //             percentage: 1
    //         }
    //         var mainData = [...chooseMileStonedata]
    //         mainData.push(newData)
    //         // console.log(mainData, "mainData");
    //         (dispatch(MileStoneInvestorPrivateArray(
    //             [
    //                 ...chooseMileStonedata,
    //                 newData
    //             ])))

    
    //     }else{
    //         alert('Milestone Percentage should be 100')
    //     }

    const addColumnMileStone = (i) => {
        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item,ind )=> {
                 

                    sum += parseFloat(item.percentage)
                 }
            )
        }
        // console.log(initialRelease, sum, "addperc");

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
            // console.log(mainData, "mainData");
            (dispatch(MileStoneInvestorPrivateArray(
                [
                    ...chooseMileStonedata,
                    newData
                ])))
    
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
                choose: value
            } : x));


        (dispatch(MileStoneInvestorPrivateArray((updatedData))))
    }

    const ValuationFunc = (i) => {
        var main = 0;
        if (MaxSupply > 0) {
            main = i * parseInt(MaxSupply)
        }

        var noToken = 0;

        if(FundInvested != null && FundInvested != undefined && FundInvested != ''){
            noToken = parseFloat(FundInvested)/i
        }else{
            noToken = 0
        }
        setNumOfTokens(noToken)
        setPricePerToken(i)
        setValuationValue(main)
    }
    
    const fundReqFunc = (e) =>{
        if(e != null && e != undefined){

            setFundInvested(e)
            var noToken = 0;
            if(PricePerToken != null && PricePerToken != undefined && PricePerToken != ''){
                noToken = e/parseFloat(PricePerToken)
            }else{
                noToken = 0
            }
            setNumOfTokens(noToken)
        }else{ 
            setFundInvested(0)
        } 
    }

    const rejectPrivate = () => {
        setRejectPopup(true)
    }

    const rejectClosePrivate = () => {
        setRejectPopup(false)
    }

    useEffect(() => {
        // console.log(indexCountforSlect,"indexCount from Parent");
        getCountofHundFunc()
    }, [])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        // console.log(arr, "aeee");
        setCount(arr)
        getValueFunc()
    }

    const countries = [
        // { value: "USD", label: "USD", image: usdimage },
        // { value: "SDT", label: "SDT", image: AEDimage},
        // { value: "INR", label: "INR", image:  INRimage },
        // { value: "RUBLE", label: "RUBLE", image: RUBLEimage },
        // { value: "CAD", label: "CAD", image: CADimage },
        // // { value: "GBP", label: "GBP", image:  GBPimage},
        // // { value: "AED", label: "AED", image: AEDimage },
        // { value: "CNY", label: "CNY", image: CNYimage },
        // // { value: "VMD", label: "VMD", image:  VMDimage},
        // { value: "EURO", label: "EURO", image: EUROimage },
        // { value: "POUND", label: "POUND", image: POUNDimage },
        // { value: "YUAN", label: "YUAN", image: YUANimage },
        // { value: "INR", label: "INR", image: INRimage },
        // { value: "YEN", label: "YEN", image: YENimage },
        // { value: "SGD", label: "SGD", image: SGDimage },
        // { value: "AUD", label: "AUD", image: AUDimage },
        // { value: "YEN", label: "YEN", image:  JPYImage},
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        { value: "USDT", label: "USDT", image: USDTimage },
        { value: "CR2", label: "CR2", image: USDCimage },

    ];

    // const setDefaultValue = (e) => {
    //     let symbol = e;
    //     var indexCount = countries.findIndex((element) => element.value == symbol )
    //     console.log(indexCount,symbol, "getFounderUserDetails indexCount");
    //     return countries[indexCount];
    //     // return countries[1];
    // }

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
                    validation_status
                    milestone_status
                    funds
                    remarks
                    estimated_target_date
                  }
                  round
                  contract_id
                  
                  fund_raised
                  tokens_sold
                  fund_unlocked
                  fund_locked
                  fund_withdrawn
                  remarks
                  blockers
                  investor {
                    _id
                    fund_name
                  }
                  founder_status
                  project_status
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
                    // console.log('getFounderUserDetails', data?.data?.getFundraise);
                    if (data?.data?.getFundraise != null && data?.data?.getFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        
                        setPrimaryFundingWallet(data?.data?.getFundraise?.primary_funding_wallet)
                        setFundRaiseData([data?.data?.getFundraise])
                        setPrimaryStatus(data?.data?.getFundraise?.founder_status)
                        setFundInvested(data?.data?.getFundraise?.funds_requested)
                        setNumOfTokens(data?.data?.getFundraise?.no_of_tokens)
                        setCurrency(data?.data?.getFundraise?.currency)
                        setValuationValue(data?.data?.getFundraise?.valuation)
                        

                        if (data?.data?.getFundraise?.currency != '' && data?.data?.getFundraise?.currency != null && data?.data?.getFundraise?.currency != undefined) {
                            var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                            // console.log(indexCount, "indexCount");
                            setCurrencyValue(indexCount)
                        } else {

                            setCurrencyValue(0)
                        }


                        // setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        // setValuation(data?.data?.getFundraise?.valuation)
                        // setNumOfTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        if (data?.data?.getFundraise?.end_target_date != '' && data?.data?.getFundraise?.end_target_date != undefined
                            && data?.data?.getFundraise?.end_target_date != null
                        ) {
                            var dateType = data?.data?.getFundraise?.end_target_date.split('T')[0]
                            setEndtargetDate(dateType)
                        } else {
                            setEndtargetDate('')
                        }

                        getMilestoneFunc(data?.data?.getFundraise?._id)


                    }
                    else{
                        setFundingWalletAddress('')
                        setCurrency('')
                        setTokenTicker('')
                        setPricePerToken('')
                        setStage('')
                        setMaxSupply('')
                        setValuationValue('')
                        setNumOfTokens('')
                        setInitialRelease('')

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
                                    // "milestone_id":data?.data?.allMilestone[i]._id,
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
                        // console.log("getFounderUserDetails pushed array",mainMileStone);
                        dispatch(MileStoneInvestorPrivateArray((mainMileStone)))
                    }
                })
                
        } catch (err) {
            console.log(err);
        }

    }

                                // mainMileStone.push({

                                //     "choose": "set_MileStone",
                                //     "target_date": mileStoneDate,
                                //     "milestone": data?.data?.allMilestone[i].milestone,
                                //     "percentage": data?.data?.allMilestone[i].percentage,

                                //     validation_status: data?.data?.allMilestone[i].validation_status,
                                //     milestone_status: data?.data?.allMilestone[i].milestone_status,
                                //     id: data?.data?.allMilestone[i]._id,
                                //     // ...data?.data?.allMilestone[i]
                                // })

                            // } else {
                            //     mainMileStone.push({

                            //         "choose": "set_MileStone",
                            //         "target_date": '',
                            //         "milestone": data?.data?.allMilestone[i].milestone,
                            //         "percentage": data?.data?.allMilestone[i].percentage,
                            //         validation_status: data?.data?.allMilestone[i].validation_status,
                            //         milestone_status: data?.data?.allMilestone[i].milestone_status,
                            //         id: data?.data?.allMilestone[i]._id,
                            //         // ...data?.data?.allMilestone?.milestones[i]
                            //     })
                            // }




                            // console.log(mainMileStone, "mainMileStone");

                //         }



                //         (dispatch(MileStonePrivateArray((mainMileStone))))
                //     } else {


                //         (dispatch(MileStonePrivateArray(([]))))

                //     }

                // })




    const setInitialReleasefunc = (i) => {
        var sum = 0;
        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach(item => {
                sum += parseFloat(item.percentage);
            });
        }
        // console.log(sumofValueofArray, sum, "addperc");

        var mainperc = parseFloat(i) + sum
        if (mainperc > 100) {
            alert('Percentage should not exceed 100')
        } else {
            setInitialRelease(i)
        }

    }


    const changeValueForChoose = (index1, evnt) => {
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

        // console.log(updatedData, "updatedData")

        // console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))

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
    // const changePercentageFunc = (index1, evnt) => {

    //     var sum = 0

    //     if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
    //         var sumofValueofArray = chooseMileStonedata.forEach(item => {
    //             sum += parseFloat(item.percentage);
    //         });
    //     }
    //     console.log(sumofValueofArray, sum, "addperc");

    //     var mainperc = parseFloat(initialRelease) + sum + parseInt(evnt.target.value)
    //     if (mainperc > 100) {
    //         alert('Percentage should not exceed 100')



    //     } else {



    //         const { name, value } = evnt.target;
    //         console.log(typeof (value, "valuevalue"));
    //         const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
    //             {
    //                 ...x,
    //                 percentage: value
    //             } : x));

    //         console.log(updatedData, "updatedData")

    //         console.log(value, index1, "value")
    //         var arrayObj = []

    //         const rowsInput = [...chooseMileStonedata];

    //         (dispatch(MileStonePrivateArray((updatedData))))

    //     }


    // }


    // const dleteColumnMileStone = (i) => {
    //     if (chooseMileStonedata.length > 1) {
    //         console.log(i, chooseMileStonedata);
    //         const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);
    //         console.log(filteredPeople);
    //         (dispatch(MileStonePrivateArray(

    //             filteredPeople
    //         )))
    //         // setChooseMileStonedata(filteredP/eople)
    //     } else {
    //         alert("There should be atleast one MileStone")
    //     }
    // }


    const savePrivateRoundFunc = () => {
    try {
            var mileStoneArray = []
            if (chooseMileStonedata.length > 0) {
                const choosefiliter = chooseMileStonedata.findIndex((index) => index.target_date == '' || index.target_date == null || index.target_date == undefined)
                if(choosefiliter < 0){
                for (var i = 0; i < chooseMileStonedata.length; i++) {
                    mileStoneArray.push({
                        "milestone_id":chooseMileStonedata[i].id === undefined ? null : chooseMileStonedata[i].id  ,
                        "milestone":chooseMileStonedata[i].milestone,
                        "milestone_type":chooseMileStonedata[i].choose,
                        "target_date": chooseMileStonedata[i].target_date,
                        "percentage": parseFloat(chooseMileStonedata[i].percentage),
                        validation_status: 'Unrequested',
                        milestone_status: 'Ongoing',
                        funds: ((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundInvested))/100),
                        estimated_target_date: '',
                        remarks: ''
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
            
            
                if (Currency != null && Currency != undefined && Currency != '' &&
                    FundInvested != null && FundInvested != undefined && FundInvested != '' &&
                    PricePerToken != null && PricePerToken != undefined && PricePerToken != '' &&
                    Stage != null && Stage != undefined && Stage != '' &&
                    MaxSupply != null && MaxSupply != undefined && MaxSupply != '' &&
                    ValuationValue != null && ValuationValue != undefined && ValuationValue != '' &&
                    numOfTokens != null && numOfTokens != undefined && numOfTokens != '' &&
                    initialRelease != null && initialRelease != undefined && initialRelease != '' &&
                    mainSum == 100) 
                {
                    // alert("all values correct")

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
                            "funds_requested": parseFloat(FundInvested),
                            "currency": Currency,
                            "price_per_token": parseFloat(PricePerToken),
                            "stage": Stage,
                            "valuation": parseFloat(ValuationValue),
                            "no_of_tokens": parseFloat(numOfTokens),
                            "initial_release_percentage": parseFloat(initialRelease),
                            "milestones": mileStoneArray,
                            "deletedMilestone":deletedMilestone,
                            "founder_status": "Sent",
                            "investor_status": 'Received',
                            // "founder_status":'Sent
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
                    // console.log('getFounderUserDetails', data?.data?.allProjects);
                    if (data?.data?.updateFundraise != null && data?.data?.updateFundraise != undefined) {
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
            
                }
                else if (mainSum > 100 || mainSum < 100) {
    
                alert('Percentage should be 100')

                }  
                else {
                alert("Please Fill all the required fields")
                }
            }
            else{
            mileStoneArray = []
            alert("Select target date") 
            }

        }
    } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="col-md-12">
            <div className="row">
                <div className="row">

                    <div className="col-md-12" style={{ padding: '0px' }}>


                        <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                            <div className="col" style={{ padding: '0px' }}>
                                {/* mt-4 */}
                                <div className="search mb-2">

                                    <h3 className="card-title mb-0" style={{ padding: '10px' }}>Private Round Request</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row" style={{ padding: '10px' }}>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Investor<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} value={"Sharma"} readOnly='true' /> */}

                                    {fundRaiseData.length > 0 ?

                                        <input type="text" className="form-control" style={{ width: '300px' }} value={fundRaiseData[0].investor?.fund_name} readOnly='true' />
                                        :

                                        <input type="text" className="form-control" style={{ width: '300px' }} value={""} readOnly='true' />
                                    }
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {primaryFundingWallet}

                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {/* <div className="form-group"> */}
                                <label style={{ width: '310px' }}>Currency</label>
                                <div style={{ width: '300px' }}>


                                    <ReactSelect
                                        style={{ padding: '0px' }}
                                        className="form-control btn-block-height square-edges"
                                        
                                        defaultValue={countries[indexCountforSlect]}
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




                                </div>


                                {/* </div> */}
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Funds Requested<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>

                                    <input type="text" className="form-control" style={{ width: '300px' }} value={FundInvested} onChange={(e) => fundReqFunc(e.target.value)} />


                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Token Ticker</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {TokenTicker}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}> Price Per Token<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    <input type="text" className="form-control" style={{ width: '300px' }} defaultValue={PricePerToken} onChange={(e) => ValuationFunc(e.target.value)} />

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Stage<span className="text-danger">*</span></label>
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
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Max Supply<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {MaxSupply}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Valuation<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {ValuationValue}
                                </div>
                            </div>


                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {numOfTokens}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                                    <select className="form-control btn-block-height square-edges" value={initialRelease} onChange={(e) => setInitialReleasefunc(e.target.value)} >
                                        {Count.map((_, i) => (
                                            <option style={{ fontSize: '13px' }} value={i + 1}>{`${i + 1}%`}</option>

                                        ))}{/* <option style={{ fontSize: '13px' }} value="set_MileStone" >USD</option> */}
                                    </select>

                                </div>
                            </div>
                            {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <label style={{ width: '100%' }}>Set/Choose Milestones<span className="text-danger">*</span></label> */}
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
                                                            <select className="form-control btn-block-height square-edges" defaultValue={i?.choose} onChange={(evnt) => setChooseMileStonedataFunc(index, evnt)} >
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
                                                                    </select>

                                                                </div>
                                                                :
                                                                <input className="form-control" value={i?.milestone} onChange={(evnt) => changeValueForChoose(index, evnt)} />
                                                        }
                                                    </td>
                                                    <td style={{ width: '17%', padding: '10px' }}>
                                                        <input type="date" className="form-control" min={todayMite} value={i?.target_date} onChange={(evnt) => changeTargetDate(index, evnt)} />
                                                    </td>
                                                    <td style={{ width: '12%', padding: '10px' }}>

                                                        <div>
                                                            <select className="form-control btn-block-height square-edges" value={i?.percentage} onChange={(evnt) => changePercentageFunc(index, evnt)} >
                                                                {Count.map((_, i) => (
                                                                    <option style={{ fontSize: '13px' }} value={i + 1} >{`${i + 1}%`}</option>

                                                                ))}
                                                                {/* <option style={{ fontSize: '13px' }} value={`20`} >20%</option>
                                                            <option style={{ fontSize: '13px' }} value={`30`} >30%</option> */}
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td style={{ width: '15%', padding: '10px' }}>

                                                        <div >
                                                            <div className="" style={{ textAlign: 'center', justifyContent: 'space-evenly', display: 'flex' }}>
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

                            <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                                <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                                    <label style={{ width: '310px', marginBottom: '0px', width: '25%' }}>Rejected Remarks<span className="text-danger">*</span></label>
                                    {/* <input type="text" className="form-control"  */}
                                    <div style={{ width: '75%' }} >
                                        {fundRaiseData.length > 0 ? fundRaiseData[0].remarks : ''}
                                        {/* <textarea style={{ width: '100%', minHeight: '180px' }} va /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>


                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn btn-primary submit-btn" onClick={() => savePrivateRoundFunc()}>Send Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RejectedPrivatePage;
