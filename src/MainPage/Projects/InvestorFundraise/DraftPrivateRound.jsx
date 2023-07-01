import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';
import { MileStoneInvestorPrivateArray } from '../../../reducers/ConstantSlice';
import ReactSelect from "react-select";
import './InvestorPriateRound.css'

import { ToastContainer, toast } from 'material-react-toastify';

import usdimage from '../../Pages/FounderProject/Funding/assets/images/USD.png';
import EUROimage from '../../Pages/FounderProject/Funding/assets/images/EUR.png';
import POUNDimage from '../../Pages/FounderProject/Funding/assets/images/POUND.png';
import YUANimage from '../../Pages/FounderProject/Funding/assets/images/YUAN.png';
import YENimage from '../../Pages/FounderProject/Funding/assets/images/YEN.png';
import CADimage from '../../Pages/FounderProject/Funding/assets/images/CAD.png';
import SGDimage from '../../Pages/FounderProject/Funding/assets/images/SGD.png';
import AUDimage from '../../Pages/FounderProject/Funding/assets/images/AUD.png';
import DAIimage from '../../Pages/FounderProject/Funding/assets/images/DAI.png';
import BUSDimage from '../../Pages/FounderProject/Funding/assets/images/BUSD.png';
import INRimage from '../../Pages/FounderProject/Funding/assets/images/INR.png';
import USDCimage from '../../Pages/FounderProject/Funding/assets/images/USDC.png';
import USDTimage from '../../Pages/FounderProject/Funding/assets/images/USDT.png';
import RUBLEimage from '../../Pages/FounderProject/Funding/assets/images/RUBBLE.png';
import CNYimage from '../../Pages/FounderProject/Funding/assets/images/CNY.png';


const DraftPrivateRound = ({ indexCountforSlect,publicId, getFundingRound, handleClose }) => {
    
    const [NameValue, setNameValue] = useState('')
    const [ProjectId, setProjectId] = useState('')
    const [InitialRelease, setInitialRelease] = useState('')
    const [TokenomicsData, setTokenomicsData] = useState([])
    const [NoofTokens, setNoofTokens] = useState()
    const [ValuationValue, setValuationValue] = useState()
    const [MaxSupply, setMaxSupply] = useState()
    const [Stage, setStage] = useState('pre_seed_round')
    const [PricePerToken, setPricePerToken] = useState()
    const [TokenTicker, setTokenTicker] = useState()
    const [FundInvested, setFundInvested] = useState()
    const [deletedMilestone, setDeletedMilestone] = useState([]);


    const [PrimaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const loginId = useSelector((state) => state.constVar.loginId)
    const [tokenStd1, setTokenStd1] = useState([])
    const [Count, setCount] = useState([])
    const dispatch = useDispatch()
    const [FundingWalletAddress, setFundingWalletAddress] = useState('')
    const [Currency, setCurrency] = useState('')

    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)


    const countries = [
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        { value: "USDT", label: "USDT", image: USDTimage },
        { value: "CR2", label: "CR2", image: USDCimage },
        // { value: "USD", label: "USD", image: usdimage },
        // { value: "RUBLE", label: "RUBLE", image: RUBLEimage },
        // { value: "CAD", label: "CAD", image: CADimage },
        // { value: "CNY", label: "CNY", image: CNYimage },
        // { value: "EURO", label: "EURO", image: EUROimage },
        // { value: "POUND", label: "POUND", image: POUNDimage },
        // { value: "YUAN", label: "YUAN", image: YUANimage },
        // { value: "INR", label: "INR", image: INRimage },
        // { value: "YEN", label: "YEN", image: YENimage },
        // { value: "SGD", label: "SGD", image: SGDimage },
        // { value: "AUD", label: "AUD", image: AUDimage },

    ];

    const addColumnMileStone = (i) => {


        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item, ind) => {


                sum += parseFloat(item.percentage)
            }
            )
        }
        console.log(InitialRelease, sum, "addperc");

        var mainperc = parseFloat(InitialRelease) + sum

        if (mainperc < 100) {
            var newData = {
                choose: "Choose_MileStone",
                ValueForChoose: `Complete 50% of the Target Fund Raise`,
                TargetDate: "",
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
        } else {
            alert("Milestone percentage should be 100")
        }




    }
    const dleteColumnMileStone = (i) => {
        if (chooseMileStonedata.length > 1) {

            if(chooseMileStonedata[i]?.id != undefined){
                setDeletedMilestone( (prev)=>  [...prev,chooseMileStonedata[i]?.id] )
                }

            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);

            // setChooseMileStonedata(filteredPeople)
            (dispatch(MileStoneInvestorPrivateArray((filteredPeople))))
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
                ValueForChoose: value === "set_MileStone" ? "" : x.milestone
            } : x));

        // console.log(updatedData, "updatedData");

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))
    }
    // console.log(chooseMileStonedata, "chooseMileStonedata");



    useEffect(() => {
        getCountofHundFunc()
        getFundingDataFunc()
    }, [])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)
        getValueFunc()
    }


    const changeValueForChoose = (index1, evnt) => {
        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                ValueForChoose: value
            } : x));

        console.log(updatedData, "updatedData")

        console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))

    }


    const changeTargetDate = (index1, evnt) => {
        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                TargetDate: value
            } : x));

        console.log(updatedData, "updatedData")

        console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneInvestorPrivateArray((updatedData))))

    }

    const changePercentageFunc = (index1, evnt) => {

        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item, ind) => {
                index1 != ind ?

                    sum += parseFloat(item.percentage) :
                    sum = sum
                // console.log(ind,item,"momo");
            }
            )
        }
        console.log(sumofValueofArray, sum, "addperc");

        var mainperc = parseFloat(InitialRelease) + sum + parseInt(evnt.target.value)
        if (mainperc > 100) {
            alert('Percentage should not exceed 100')
        } else {




            const { name, value } = evnt.target;
            const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
                {
                    ...x,
                    percentage: value
                } : x));

            console.log(updatedData, "updatedData")

            console.log(value, index1, "value")
            var arrayObj = []

            const rowsInput = [...chooseMileStonedata];

            (dispatch(MileStoneInvestorPrivateArray((updatedData))))

        }
    }
    const getValueFunc = () => {
        try {

            var query = `
            query GetFundraise($id: ID,$investor: ID) {
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
                  funds_requested
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
                  }
                  project {
                    _id
                  }
                  creator
                }
                connectedProjects(investor: $investor) {
                    first_name
                    last_name
                    project_name
                    project_description
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
                        "investor": loginId,
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
                    
                    // console.log('getFounderUserDetails', data?.data?.getFundraise);
                    
                    if (data?.data?.connectedProjects != null && data?.data?.connectedProjects != undefined && data?.data?.connectedProjects.length > 0) {
                        setTokenStd1(data?.data?.connectedProjects)
                        // 
                    } else {
                        setTokenStd1([])
                    }

                    if (data?.data?.getFundraise != null && data?.data?.getFundraise != undefined) {
                        // dispatch(projectId(data?.data?.allProjects[0]._id))
                        // setFundRaiseData(data?.data?.getFundraise)
                        setFundingWalletAddress(data?.data?.getFundraise?.primary_funding_wallet)
                        // setIvestor(data?.data?.investor?._id)
                        setFundInvested(data?.data?.getFundraise?.funds_requested)
                        
                        // var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                        setCurrency(data?.data?.getFundraise?.currency)
                        getMilestoneFunc(data?.data?.getFundraise?._id)
                        // setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        setValuationValue(data?.data?.getFundraise?.valuation)
                        setNoofTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        setProjectId(data?.data?.getFundraise?.project?._id)
                        setProjectFunc(data?.data?.getFundraise?.project?._id)
                        setNameValue(data?.data?.getFundraise?.creator)
                       

                    } else {
                        setFundingWalletAddress('')
                        // setIvestor(data?.data?.investor?._id)

                        setCurrency('')
                        // setFundRequested(_requested)
                        setTokenTicker('')
                        setPricePerToken('')
                        setStage('')
                        setMaxSupply('')
                        setValuationValue('')
                        setNoofTokens('')
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
                    // console.log('getFounderUserDetails', data?.data?.allMilestone);

                    if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                        var mainMileStone = []
                        for (var i = 0; i < data?.data?.allMilestone.length; i++) {

                            if(data?.data?.allMilestone[i]._id != null && data?.data?.allMilestone[i]._id != undefined){
                                
                                mainMileStone.push({
                                    id: data?.data?.allMilestone[i]._id,
                                    // "milestone_id":data?.data?.allMilestone[i]._id,
                                    "choose":data?.data?.allMilestone[i]?.milestone_type === null ? "set_MileStone": data.data.allMilestone[i].milestone_type,
                                    "ValueForChoose": data?.data?.allMilestone[i].milestone,
                                    "TargetDate": data?.data?.allMilestone[i].target_date != null ? data?.data?.allMilestone[i].target_date.split('T')[0] : null,
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
                
                    
                    
                    // if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                    //     var mainMileStone = []
                    //     for (var i = 0; i < data?.data?.allMilestone.length; i++) {
                    //         if (data?.data?.allMilestone[i].target_date != '' && data?.data?.allMilestone[i].target_date != undefined) {

                    //             // if(data?.data?.allMilestone[i].target_date )
                    //             var mileStoneDate = data?.data?.allMilestone[i].target_date
                    //             mileStoneDate = mileStoneDate.split('T')[0]
                    //             console.log(mileStoneDate, "mileStoneDate");
                    //             mainMileStone.push({

                    //                 "choose":data?.data?.allMilestone[i]?.milestone_type === null ? "set_MileStone": data.data.allMilestone[i].milestone_type,
                    //                 "TargetDate": mileStoneDate,
                    //                 "ValueForChoose": data?.data?.allMilestone[i].milestone,
                    //                 "percentage": data?.data?.allMilestone[i].percentage,
                    //                 "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                    //                 validation_status: data?.data?.allMilestone[i].validation_status,
                    //                 milestone_status: data?.data?.allMilestone[i].milestone_status,
                    //                 id: data?.data?.allMilestone[i]._id,
                    //                 // ...data?.data?.allMilestone[i]
                    //             })

                    //         } else {
                    //             mainMileStone.push({

                    //                 "choose": "set_MileStone",
                    //                 "TargetDate": '',
                    //                 "ValueForChoose": data?.data?.allMilestone[i].milestone,
                    //                 "withdrawn_status": data?.data?.allMilestone[i].withdrawn_status,
                    //                 "percentage": data?.data?.allMilestone[i].percentage,
                    //                 validation_status: data?.data?.allMilestone[i].validation_status,
                    //                 milestone_status: data?.data?.allMilestone[i].milestone_status,
                    //                 id: data?.data?.allMilestone[i]._id,

                    //                 // ...data?.data?.allMilestone?.milestones[i]
                    //             })
                    //         }




                    //         console.log(mainMileStone, "mainMileStone");

                    //     }

                       

                //         // (dispatch(MileStoneInvestorPrivateArray((mainMileStone))))
                //     } else {


                //        var  mainMileStone2 = [{

                //             "choose": "set_MileStone",
                //             "TargetDate": new Date(),
                //             "ValueForChoose":`Complete 50% of the Target Fund Raise`,
                //             "percentage":0
                //             // ...data?.data?.getFundraise?.milestones[i]
                //         }
                //         ]
                //         (dispatch(MileStoneInvestorPrivateArray((mainMileStone2))))
                //     }

                // })


        } catch (err) {
            console.log(err);
        }

    }


    const getFundingDataFunc = () => {
        try {
            var query = `

            
            query GetFundraise($user: ID, $id: ID) {
                allProjects(user: $user) {
                  first_name
                  last_name
                  project_name
                  project_description
                  _id
                }
                getUser(_id: $id) {
                  wallet_address
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

                        "user": loginId,
                        "id": loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                        setTokenStd1(data?.data?.allProjects)
                        
                        // 
                    } else {
                        setTokenStd1([])
                    }

                    // if (data?.data?.getUser != null && data?.data?.getUser != undefined ) {
                    //     setFundingWalletAddress(data?.data?.getUser?.wallet_address)
                    // }else{

                    // }

                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }


    const getTokenmoicsFunc = (projectNumber) => {
        try {
            var query = `

            

            query AllProjectFundings($project: ID) {
             
                allTokenomics(project: $project) {
                 
                    _id
                    token_ticker
                    token_type {
                      value
                    }
                    contract_address
                    primary_network
                    token_standard
                    public_launch_price
                    expected_token_generation_event
                    total_token_supply
                    token_supply_breakup {
                      category
                      value
                    }
                  }
                  allProjectFunding(project: $project) {
                      
                      currency
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

                        "project": projectNumber,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {



                    if (data?.data?.allTokenomics != null && data?.data?.allTokenomics != undefined && data?.data?.allTokenomics.length > 0) {
                        setTokenTicker(data?.data?.allTokenomics[0].token_ticker)
                        setTokenomicsData(data?.data?.allTokenomics)
                        setMaxSupply(data?.data?.allTokenomics[0].total_token_supply)
                        setFundingWalletAddress(data?.data?.allTokenomics[0].contract_address)
                        // setPrimaryFundingWallet(data?.data?.allTokenomics[0].contract_address)
                    } else {
                        setTokenomicsData([])
                        setTokenTicker('')
                        setTokenomicsData('')
                        setMaxSupply('')
                        setFundingWalletAddress('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }


    const setProjectFunc = (e) => {
        setProjectId(e)
        getTokenmoicsFunc(e)
    }



   


    
  
    const ValuationFunc = (e) => {

        if (e.target.checkValidity()) {
            // Input is valid,
            setPricePerToken(e.target.value)
            let main = 0;
            // console.log("Setting price per token 1234:",i,"fundsReqs",MaxSupply);
            if (MaxSupply > 0) main = e.target.value * parseInt(MaxSupply)
            setValuationValue(main)
            let noToken = 0;
            if (FundInvested) noToken = parseFloat(FundInvested) / e.target.value;
            // console.log("noToken:1234 ",noToken);
            setNoofTokens(isFinite(noToken) ? noToken : 0);
          } else {
            // Input is invalid, display an error message
            alert("Please enter a valid number");
          }
    }

    const fundReqFunc = (e) =>{

        if (e.target.checkValidity()) {

            setFundInvested(e.target.value);
            let noToken = 0;

            if (PricePerToken) noToken = e.target.value / parseFloat(PricePerToken);
            setNoofTokens(isFinite(noToken) ? noToken : 0);

          } else {
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



    const saveDraftFunc = (statusValue) => {
        try {

            const choosefiliter = chooseMileStonedata.findIndex((index) => index.TargetDate == '' || index.TargetDate == null || index.TargetDate == undefined)
            // console.log(choosefiliter, "choosefiliter");

            
            // console.log("Milestone Data 123 choose",chooseMileStonedata)
            var mileStoneArray = []
            if ((chooseMileStonedata.length > 0 && choosefiliter == -1) || statusValue == 'Draft') {
                for (var i = 0; i < chooseMileStonedata.length; i++) {
                    mileStoneArray.push({
                        "milestone_id":chooseMileStonedata[i].id === undefined ? null : chooseMileStonedata[i].id  ,
                        "milestone": chooseMileStonedata[i].ValueForChoose,
                        "milestone_type":chooseMileStonedata[i].choose,
                        "target_date": chooseMileStonedata[i].TargetDate,
                        "percentage": parseFloat(chooseMileStonedata[i].percentage),
                        validation_status: 'Unrequested',
                            milestone_status: 'Yet_to_start',
                        funds: ((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundInvested)) / 100),
                        estimated_target_date: '',
                        remarks: ''
                    })
                }
                // console.log("Milestone Data 123 milestone array",mileStoneArray)

                var sum = 0
                if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
                    var sumofValueofArray = chooseMileStonedata.forEach(item => {
                        sum += parseFloat(item.percentage);
                    });
                } else {
                    sum = 0
                }
                var mainSum = 0
                mainSum = sum + parseFloat(InitialRelease)
                
                // console.log(statusValue, mainSum, ProjectId,Currency,FundInvested,Stage,PricePerToken,MaxSupply,
                    // ValuationValue,NoofTokens,InitialRelease,"kiki");

                if ( (statusValue === 'Draft' && ProjectId != null && ProjectId != undefined && ProjectId != '') ||

                (ProjectId != null && ProjectId != undefined && ProjectId != '' &&
                Currency != null && Currency != undefined && Currency != '' &&
                FundInvested != null && FundInvested != undefined && FundInvested != '' && 
                FundInvested != 0 && PricePerToken != 0 &&
                PricePerToken != null && PricePerToken != undefined && PricePerToken != '' &&
                Stage != null && Stage != undefined && Stage != '' &&
                MaxSupply != null && MaxSupply != undefined && MaxSupply != '' &&
                ValuationValue != null && ValuationValue != undefined && ValuationValue != '' &&
                NoofTokens != null && NoofTokens != undefined && NoofTokens != '' &&
                InitialRelease != null && InitialRelease != undefined && InitialRelease != ''
                && statusValue == 'Sent' && mainSum == 100) )
            {   

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
                                    "project": ProjectId,
                                    "primary_funding_wallet": FundingWalletAddress,
                                    "funds_requested": parseFloat(FundInvested),
                                    "currency": Currency,
                                    "token_ticker": TokenTicker,
                                    "price_per_token": parseFloat(PricePerToken),
                                    "stage": Stage,
                                    "max_supply": parseFloat(MaxSupply),
                                    "valuation": parseFloat(ValuationValue),
                                    "no_of_tokens": parseFloat(NoofTokens),
                                    "initial_release_percentage": parseFloat(InitialRelease),
                                    "milestones": mileStoneArray,
                                    "deletedMilestone":deletedMilestone,   
                                    // "end_target_date": EndtargetDate
                                    // "creator": NameValue,
                                    "investor": loginId,
                                    "investor_status": statusValue,
                                    "founder_status": statusValue == 'Draft' ? statusValue : 'Received',
                                    'creator_role': 'investor'
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

                    alert("Total Percentage should be 100")
                } else {
                    alert("Please Fill all the required fields")
                }


            } else {
                mileStoneArray = []
                alert('Please fill details in milestones')
            }



        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row" style={{ padding: '10px' }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Project<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}

                            <select className="form-control btn-block-height square-edges" value={ProjectId} onChange={(e) => setProjectFunc(e.target.value)} >

                                {
                                    tokenStd1.map((i) => (

                                        <option style={{ fontSize: '13px' }} value={i?._id}  >{`${i?.project_name} `} </option>
                                    ))

                                }
                                {/* <option style={{ fontSize: '13px' }} value="Name1" >Name1</option>
                                <option style={{ fontSize: '13px' }} value="Name1" >Name1</option> */}
                            </select>


                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Primary Funding Wallet</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={FundingWalletAddress} />


                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Choose Currency<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} />

                            <div> */}

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
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Funds to be invested<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} value={FundInvested} onChange={(e) => fundReqFunc(e.target.value)} /> */}
                            <input 
                            style={{ width: '300px' }} type="text" 
                            className="form-control" 
                            pattern="[0-9]*([.][0-9]*)?"
                            value={FundInvested} onChange={fundReqFunc} />

                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Token Ticker</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={TokenTicker} onChange={(e) => setTokenTicker(e.target.value)} />


                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Stage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}


                            <select className="form-control btn-block-height square-edges" value={Stage} onChange={(e) => setStage(e.target.value)}>
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
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Max Supply<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={MaxSupply} onChange={(e) => setMaxSupply(e.target.value)} />


                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Valuation<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true" type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={ValuationValue} onChange={(e) => setValuationValue(e.target.value)} />


                        </div>
                    </div>


                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input disabled="true"  type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={NoofTokens} onChange={(e) => setNoofTokens(e.target.value)} />


                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                            <select className="form-control btn-block-height square-edges" value={InitialRelease} onChange={(e) => setInitialReleasefunc(e.target.value)}  >
                                {Count.map((_, i) => (
                                    <option style={{ fontSize: '13px' }} value={i + 1} >{`${i + 1}%`}</option>

                                ))}
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
                                                            {/* <select className="form-control btn-block-height square-edges" value={i?.ValueForChoose} >
                                                                <option style={{ fontSize: '13px' }} value={`Choose MileStone${index + 1}`} >Choose MileStone{index + 1}</option>
                                                            </select> */}

                                                            <select className="form-control btn-block-height square-edges" value={i?.ValueForChoose} placeholder={`Choose MileStone${index + 1}`} onChange={(evnt) => changeValueForChoose(index, evnt)}>
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
                                                        <input className="form-control" value={i?.ValueForChoose} onChange={(evnt) => changeValueForChoose(index, evnt)} />
                                                }
                                            </td>
                                            <td style={{ width: '17%', padding: '10px' }}>
                                                <input type='date' className="form-control" value={i?.TargetDate} onChange={(evnt) => changeTargetDate(index, evnt)} />
                                            </td>
                                            <td style={{ width: '12%', padding: '10px' }}>

                                                <div>
                                                    <select className="form-control btn-block-height square-edges" value={i?.percentage} onChange={(evnt) => changePercentageFunc(index, evnt)} >
                                                        {Count.map((_, i) => (
                                                            <option style={{ fontSize: '13px' }} value={i + 1} >{`${i + 1}%`}</option>

                                                        ))}
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
                                <button className="btn btn-primary submit-btn" onClick={() => saveDraftFunc('Draft')}>SAVE DRAFT</button>
                            </div>

                            <div className="" style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary submit-btn" onClick={() => saveDraftFunc('Sent')}>SEND REQUEST</button>
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
export default DraftPrivateRound;
