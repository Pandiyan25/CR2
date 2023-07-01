import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiURI } from '../../../config/config';
import { MileStoneInvestorPrivateArray } from '../../../reducers/ConstantSlice';
import ReactSelect from "react-select";
// import { ToastContainer, toast } from 'material-react-toastify';
import './InvestorPriateRound.css'

import { ToastContainer, toast } from 'material-react-toastify';

import DAIimage from '../../Pages/FounderProject/Funding/assets/images/DAI.png';
import BUSDimage from '../../Pages/FounderProject/Funding/assets/images/BUSD.png';
import USDCimage from '../../Pages/FounderProject/Funding/assets/images/USDC.png';
import USDTimage from '../../Pages/FounderProject/Funding/assets/images/USDT.png';


const RejectedEditInvestor = ({ indexCountforSlect,publicId, getFundingRound, handleClose }) => {
    
    const [Count, setCount] = useState([])
    const [NameValue, setNameValue] = useState('')
    const [ProjectId, setProjectId] = useState('')
    const [InitialRelease, setInitialRelease] = useState('')
    const [TokenomicsData, setTokenomicsData] = useState([])
    const [NoofTokens, setNoofTokens] = useState(0)
    const [ValuationValue, setValuationValue] = useState(0)
    const [MaxSupply, setMaxSupply] = useState(0)
    const [Stage, setStage] = useState('pre_seed_round')
    const [PricePerToken, setPricePerToken] = useState(0)
    const [TokenTicker, setTokenTicker] = useState(0)
    const [FundInvested, setFundInvested] = useState(0)
    const [remarks,setRemarks] = useState('')
    const [PrimaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const loginId = useSelector((state) => state.constVar.loginId)
    const [tokenStd1, setTokenStd1] = useState([])
    const dispatch = useDispatch()
    const [FundingWalletAddress, setFundingWalletAddress] = useState('')
    const [Currency, setCurrency] = useState('')
    
    const [deletedMilestone, setDeletedMilestone] = useState([]);
    const [numOfTokens, setNumOfTokens] = useState(0)
    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)


    const countries = [
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        { value: "USDT", label: "USDT", image: USDTimage },
        { value: "CR2", label: "CR2", image: USDCimage },

    ];

    const addColumnMileStone = (i) => {
        var sum = 0

        if (chooseMileStonedata.length > 0 && chooseMileStonedata[0].percentage != null && chooseMileStonedata[0].percentage != undefined) {
            var sumofValueofArray = chooseMileStonedata.forEach((item,ind )=> {
                    sum += parseFloat(item.percentage)
                 }
            )
        }

        var mainperc = parseFloat(InitialRelease) + sum 
        if(mainperc < 100){
            var newData = {
                choose: "Choose_MileStone",
                milestone: `Complete 50% of the Target Fund Raise`,
                target_date: "",
                percentage: 1
            }

            var mainData = [...chooseMileStonedata]
            mainData.push(newData)
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

        // console.log(updatedData, "updatedData")

        // console.log(value, index1, "value")
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
            }
            )
        }
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
            (dispatch(MileStoneInvestorPrivateArray((updatedData))))

        }
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
                  milestones {
                    milestone
                    target_date
                    percentage
                    validation_status
                    milestone_status
                    funds
                    estimated_target_date
                    remarks
                  }
                  end_target_date
                  round
                  contract_id
                  founder_status
                  investor_status
                  project_status
                  fund_raised
                  tokens_sold
                  fund_unlocked
                  fund_locked
                  fund_withdrawn
                  remarks
                  blockers
                  creator
                  creator_role
                  project {
                    _id
                    project_name
                  }
                  investor {
                    _id
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
                        if (data?.data?.getFundraise?.project?.project_name != null && data?.data?.getFundraise?.project?.project_name != undefined && data?.data?.getFundraise?.project?.project_name.length > 0) {
                                setTokenStd1(data.data.getFundraise.project.project_name)
                            } else {
                                setTokenStd1([])
                            }
                            setFundingWalletAddress(data?.data?.getFundraise?.primary_funding_wallet)
                            // setIvestor(data?.data?.investor?._id)
                            setFundInvested(data?.data?.getFundraise?.funds_requested)
                            // var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                            setCurrency(data?.data?.getFundraise?.currency)
                            setRemarks(data?.data?.getFundraise?.remarks)
                            // setFundRequested(data?.data?.getFundraise?.funds_requested)
                            setTokenTicker(data?.data?.getFundraise?.token_ticker)
                            setPricePerToken(data?.data?.getFundraise?.price_per_token)
                            setStage(data?.data?.getFundraise?.stage)
                            setMaxSupply(data?.data?.getFundraise?.max_supply)
                            setValuationValue(data?.data?.getFundraise?.valuation)
                            setNumOfTokens(data?.data?.getFundraise?.no_of_tokens)
                            setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                            setProjectId(data?.data?.getFundraise?.project?._id)
                            setProjectFunc(data?.data?.getFundraise?.project?._id)
                            setNameValue(data?.data?.getFundraise?.creator)
                            getMilestoneFunc(data?.data?.getFundraise?._id)
                       
                    } else {
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




    const getFundingDataFunc = () => {
        try {
            var query = `

            
            query GetFundraise($user: ID, $id: ID,$investor: ID) {
                allProjects(user: $user) {
                  first_name
                  last_name
                  project_name
                  project_description
                  _id
                }  
                connectedProjects(investor: $investor) {
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
                        
                        "investor": loginId,
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
                    // if (data?.data?.allProjects != null && data?.data?.allProjects != undefined && data?.data?.allProjects.length > 0) {
                    //     setTokenStd1(data?.data?.allProjects)
                        
                    //     // 
                    // } else {
                    //     setTokenStd1([])
                    // }

                    // if (data?.data?.getUser != null && data?.data?.getUser != undefined ) {
                    //     setFundingWalletAddress(data?.data?.getUser?.wallet_address)
                    // }else{

                    // }

                })

        } catch (error) {
            console.log(error, "funding in Project");
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
            } catch (err) {
                console.log(err);
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



    const saveDraftFunc = (statusValue) => {
        try {
            const choosefiliter = chooseMileStonedata.findIndex((index) => index.TargetDate == '' || index.TargetDate == null || index.TargetDate == undefined)

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
                        // funds: ((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundInvested)) / 100),
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
                mainSum = sum + parseFloat(InitialRelease)

                if ( (statusValue === 'Draft' && ProjectId != null && ProjectId != undefined && ProjectId != '') ||
                (ProjectId != null && ProjectId != undefined && ProjectId != '' &&
                Currency != null && Currency != undefined && Currency != '' &&
                FundInvested != null && FundInvested != undefined && FundInvested != '' && 
                FundInvested != 0 && PricePerToken != 0 &&
                PricePerToken != null && PricePerToken != undefined && PricePerToken != '' &&
                Stage != null && Stage != undefined && Stage != '' &&
                MaxSupply != null && MaxSupply != undefined && MaxSupply != '' &&
                ValuationValue != null && ValuationValue != undefined && ValuationValue != '' &&
                // NoofTokens != null && NoofTokens != undefined && NoofTokens != '' &&
                numOfTokens != null && numOfTokens != undefined && numOfTokens != '' &&
                
                InitialRelease != null && InitialRelease != undefined && InitialRelease != ''
                && statusValue == 'Sent' && mainSum == 100) ){   

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
                                "no_of_tokens": parseFloat(numOfTokens),
                                "initial_release_percentage": parseFloat(InitialRelease),
                                "milestones": mileStoneArray,
                                "deletedMilestone":deletedMilestone,
                                "creator":NameValue,
                                "investor_status": statusValue,
                                "founder_status":'Received'
                                // "end_target_date": EndtargetDate
                                // "investor": loginId,
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
                        {tokenStd1}
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        
                        <label style={{ width: '310px' }}>Primary Funding Wallet</label>
                        <div style={{ width: '300px' }}>
                        {FundingWalletAddress}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={FundingWalletAddress} /> */}
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
                            <input type="text" className="form-control" style={{ width: '300px' }} value={FundInvested} onChange={(e) => fundReqFunc(e.target.value)} />


                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Token Ticker</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={TokenTicker} onChange={(e) => setTokenTicker(e.target.value)} />


                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}> Price Per Token<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} value={PricePerToken} onChange={(e) => ValuationFunc(e.target.value)} />


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
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={MaxSupply} onChange={(e) => setMaxSupply(e.target.value)} />


                        </div>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Valuation<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={ValuationValue} onChange={(e) => setValuationValue(e.target.value)} />


                        </div>
                    </div>


                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={numOfTokens} onChange={(e) => setNumOfTokens(e.target.value)} />


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
                                            {console.log("chooseMileStonedata",chooseMileStonedata)}
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
                                                            <select className="form-control btn-block-height square-edges" value={i?.ValueForChoose} placeholder={`Choose MileStone${index + 1}`} onChange={(evnt) => changeValueForChoose(index, evnt)}>
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

                    
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Remarks</label>
                        {/* <input type="text" className="form-control"  */}
                        <div>
                           {remarks}

                        </div>
                    </div>


                    <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                        {/* submit-section
                        submit-section */}
                        <div className="" style={{ textAlign: 'center' }}>
                            <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>
                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           

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
export default RejectedEditInvestor;
