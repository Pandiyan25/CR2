import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ReactSelect from "react-select";
import { apiURI } from '../../../../config/config';
import { MileStoneArray } from '../../../../reducers/ConstantSlice';
import './PrivateRound.css'
import { ToastContainer, toast } from 'material-react-toastify';


import usdimage from '../Funding/assets/images/USD.png';
import EUROimage from '../Funding/assets/images/EUR.png';
import POUNDimage from '../Funding/assets/images/POUND.png';
import YUANimage from '../Funding/assets/images/YUAN.png';
import YENimage from '../Funding/assets/images/YEN.png';
import CADimage from '../Funding/assets/images/CAD.png';
import SGDimage from '../Funding/assets/images/SGD.png';
import AUDimage from '../Funding/assets/images/AUD.png';
import DAIimage from '../Funding/assets/images/DAI.png';
import BUSDimage from '../Funding/assets/images/BUSD.png';
import INRimage from '../Funding/assets/images/INR.png';
import USDCimage from '../Funding/assets/images/USDC.png';
import USDTimage from '../Funding/assets/images/USDT.png';
import RUBLEimage from '../Funding/assets/images/RUBBLE.png';
import CNYimage from '../Funding/assets/images/CNY.png';

import 'material-react-toastify/dist/ReactToastify.css';
import CongPopupLaunch from './CongPopupLaunch';


const CreatePublicRound = ({ handleClose, getFundingRound }) => {
    const [Count, setCount] = useState([])
    const [primaryFundingWallet, setPrimaryFundingWallet] = useState('')
    const [Currency, setCurrency] = useState('USDC')
    const [FundRequested, setFundRequested] = useState(0)
    const [TokenTicker, setTokenTicker] = useState('')
    const [showPopupLaunch, setShowPopupLaunch] = useState(false)
    const [PricePerToken, setPricePerToken] = useState('')
    const [Stage, setStage] = useState('pre_seed_round')
    const [MaxSupply, setMaxSupply] = useState('')
    const [Valuation, setValuation] = useState('')
    const [NoOfTokens, setNoOfTokens] = useState('')
    const [InitialRelease, setInitialRelease] = useState('1')
    const [EndtargetDate, setEndtargetDate] = useState('')
    const [TokenomicsData, setTokenomicsData] = useState([])

    const [tokenStd1, setTokenStd1] = useState([])


    const countries = [
        // { value: "USDT", label: "USDT", image: usdimage },
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
        // { value: "EURO", label: "EURO", image: EUROimage },
        // { value: "POUND", label: "POUND", image: POUNDimage },
        // { value: "YUAN", label: "YUAN", image: YUANimage },
        // { value: "INR", label: "INR", image: INRimage },
        // { value: "YEN", label: "YEN", image: YENimage },
        // { value: "SGD", label: "SGD", image: SGDimage },
        // { value: "AUD", label: "AUD", image: AUDimage },
        { value: "USDT", label: "USDT", image: USDTimage },
        // { value: "YEN", label: "YEN", image:  JPYImage},

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





    const projectIdData = useSelector((state) => state.constVar.projectId)

    const dispatch = useDispatch()
    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneArray)

    // const [chooseMileStonedata, setChooseMileStonedata] = useState([
    // {
    //     choose: "Choose_MileStone",
    //     ValueForChoose: 'MileStone1',
    //     TargetDate: "",
    //     percentage: 0
    // }
    // ])

    const addColumnMileStone = (i) => {
        var newData = {
            choose: "Choose_MileStone",
            milestone: `Complete 50% of the Target Fund Raise`,
            target_date: "",
            percentage: 0
        }
        var mainData = [...chooseMileStonedata]
        mainData.push(newData)
        console.log(mainData, "mainData");
        (dispatch(MileStoneArray(
            [
                ...chooseMileStonedata,
                newData
            ])))


    }
    const dleteColumnMileStone = (i) => {
        if (chooseMileStonedata.length > 1) {

            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);


            (dispatch(MileStoneArray((filteredPeople))))
        } else {
            alert("There should be atleast one MileStone")
        }
    }

    const setChooseMileStonedataFunc = (index1, evnt) => {
        const { name, value } = evnt.target;
        // console.log(value, i, "value")
        // var arrayObj = []
        // arrayObj = chooseMileStonedata
        // console.log(chooseMileStonedata, arrayObj[i].choose, "chooseMileStonedata");
        // arrayObj[i].choose = value
        // console.log(arrayObj, "arrayObj")
        //     (dispatch(MileStoneArray((arrayObj))))
        // console.log(chooseMileStonedata, "chooseMileStonedata");



        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                choose: value
            } : x));


        (dispatch(MileStoneArray((updatedData))))
    }

    const changePercentageFunc = (index1, evnt) => {
        const { name, value } = evnt.target;

        // console.log(value,typeof(value),"valueuuu");
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                percentage: parseFloat(value)
            } : x));

        console.log(updatedData, "updatedData")

        console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneArray((updatedData))))

        if (rowsInput.length > 0) {
            // console.log(rowsInput, rowsInput[index1][name], "rowsInput");

            // rowsInput[index1].name = value;
            // console.log(rowsInput, "rowsInput");
            console.log(chooseMileStonedata, "chooseMileStonedata");
        }

        // arrayObj = chooseMileStonedata
        // console.log(arrayObj,chooseMileStonedata, "chooseMileStonedata");
        // if()

        // arrayObj[i].percentage = value
        // console.log(arrayObj,"arrayObj")
    }


    console.log(chooseMileStonedata, "chooseMileStonedata");

    useEffect(() => {
        getCountofHundFunc()
    }, [])

    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)

        getFundingDataFunc()
    }



    const changeValueForChoose = (index1, evnt) => {
        const { name, value } = evnt.target;
        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                milestone: value
            } : x));

        console.log(updatedData, "updatedData")

        console.log(value, index1, "value")
        var arrayObj = []

        const rowsInput = [...chooseMileStonedata];

        (dispatch(MileStoneArray((updatedData))))

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

        (dispatch(MileStoneArray((updatedData))))

    }


    const submitDataFunc = () => {
        try {

            var mileStoneArray = []
            if (chooseMileStonedata.length > 0) {
                for (var i = 0; i < chooseMileStonedata.length; i++) {
                    mileStoneArray.push({
                        "milestone": chooseMileStonedata[i].milestone,
                        "target_date": chooseMileStonedata[i].target_date,
                        "percentage": chooseMileStonedata[i].percentage,
                        validation_status: 'Unrequested',
                        milestone_status: 'Yet to Start',
                        funds: ((parseFloat(chooseMileStonedata[i].percentage) * parseFloat(FundRequested))/100),
                        estimated_target_date: '',
                        remarks: '',
                    })
                }
            } else {
                mileStoneArray = []
            }

            if (
                Currency != '' && Currency != null && Currency != undefined &&
                FundRequested != '' && FundRequested != null && FundRequested != undefined &&
                PricePerToken != '' && PricePerToken != null && PricePerToken != undefined &&
                Stage != '' && Stage != null && Stage != undefined &&
                MaxSupply != '' && MaxSupply != null && MaxSupply != undefined &&
                Valuation != '' && Valuation != null && Valuation != undefined &&
                chooseMileStonedata.length > 0 &&
                NoOfTokens != '' && NoOfTokens != null && NoOfTokens != undefined &&
                InitialRelease != '' && InitialRelease != null && InitialRelease != undefined &&
                EndtargetDate != '' && EndtargetDate != null && EndtargetDate != undefined) {

                var query = `
                    mutation Mutation($input: FundraiseInput) {
                        createFundraise(input: $input) {
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
                            "input": {

                                "round": "Public",
                                "project": projectIdData,
                                "primary_funding_wallet": primaryFundingWallet,
                                "funds_requested": parseFloat(FundRequested),
                                "currency": Currency,
                                "token_ticker": TokenTicker,
                                "price_per_token": parseFloat(PricePerToken),
                                "stage": Stage,
                                "max_supply": parseFloat(MaxSupply),
                                "valuation": parseFloat(Valuation),
                                "no_of_tokens": parseFloat(NoOfTokens),
                                "initial_release_percentage": parseFloat(InitialRelease),
                                "milestones": mileStoneArray,
                                "end_target_date": EndtargetDate,
                                "founder_status": 'Sent',
                                "investor_status": 'Received',
                                "creator": NameValue,
                                'creator_role': 'founder'
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
                        if (data?.data?.createFundraise != null && data?.data?.createFundraise != undefined) {
                            // dispatch(projectId(data?.data?.allProjects[0]._id))
                            // toast.success("Successfully Created", {
                            //     position: "top-right",
                            //     autoClose: 3000,
                            //     hideProgressBar: false,
                            //     closeOnClick: true,
                            //     pauseOnHover: true,
                            //     draggable: true,
                            // });
                            setShowPopupLaunch(true)
                        }

                    })

            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveDraftFunc = () => {
        try {

            var mileStoneArray = []
            if (chooseMileStonedata.length > 0) {
                for (var i = 0; i < chooseMileStonedata.length; i++) {
                    mileStoneArray.push({
                        "milestone": chooseMileStonedata[i].milestone,
                        "target_date": chooseMileStonedata[i].target_date,
                        "percentage": chooseMileStonedata[i].percentage
                    })
                }
            } else {
                mileStoneArray = []
            }

            if (
                Currency != '' && Currency != null && Currency != undefined &&
                FundRequested != '' && FundRequested != null && FundRequested != undefined &&
                PricePerToken != '' && PricePerToken != null && PricePerToken != undefined &&
                Stage != '' && Stage != null && Stage != undefined &&
                MaxSupply != '' && MaxSupply != null && MaxSupply != undefined &&
                Valuation != '' && Valuation != null && Valuation != undefined &&
                chooseMileStonedata.length > 0 &&
                NoOfTokens != '' && NoOfTokens != null && NoOfTokens != undefined &&
                InitialRelease != '' && InitialRelease != null && InitialRelease != undefined &&
                EndtargetDate != '' && EndtargetDate != null && EndtargetDate != undefined) {

                var query = `
                    mutation Mutation($input: FundraiseInput) {
                        createFundraise(input: $input) {
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
                            "input": {

                                "round": "Public",
                                "project": projectIdData,
                                "primary_funding_wallet": primaryFundingWallet,
                                "funds_requested": parseFloat(FundRequested),
                                "currency": Currency,
                                "token_ticker": TokenTicker,
                                "price_per_token": parseFloat(PricePerToken),
                                "stage": Stage,
                                "max_supply": parseFloat(MaxSupply),
                                "valuation": parseFloat(Valuation),
                                "no_of_tokens": parseFloat(NoOfTokens),
                                "initial_release_percentage": parseFloat(InitialRelease),
                                "milestones": mileStoneArray,
                                "end_target_date": EndtargetDate,
                                "founder_status": 'Draft',
                                'creator_role': 'founder'
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
                        if (data?.data?.createFundraise != null && data?.data?.createFundraise != undefined) {
                            // dispatch(projectId(data?.data?.allProjects[0]._id))
                            toast.success("Successfully Created", {
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

            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }


    const getFundingDataFunc = () => {
        try {
            var query = `

            

            query AllProjectFundings($project: ID) {
                
                allProjectFundingData(project: $project)  {
                  _id
                 
                  investor_round
                  price_per_token
                  investment
                  investment_round
                  tokens_alloted
                  percentage_of_supply
                  website
                  investor {
                    _id
                    first_name
                    last_name
                    fund_name
                  }
                  project {
                    _id
                  }
                }
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

                        "project": projectIdData,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    if (data?.data?.allProjectFundingData != null && data?.data?.allProjectFundingData != undefined && data?.data?.allProjectFundingData.length > 0) {
                        setTokenStd1(data?.data?.allProjectFundingData)

                    } else {
                        setTokenStd1([])
                    }

                    if (data?.data?.allTokenomics != null && data?.data?.allTokenomics != undefined && data?.data?.allTokenomics.length > 0) {
                        setTokenTicker(data?.data?.allTokenomics[0].token_ticker)
                        setTokenomicsData(data?.data?.allTokenomics)
                        setMaxSupply(data?.data?.allTokenomics[0].total_token_supply)
                        setPrimaryFundingWallet(data?.data?.allTokenomics[0].contract_address)
                    } else {
                        setTokenomicsData([])
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }

    const setInitialFunc = (e) => {
        const { name, value } = e.target;
        if (value != undefined) {
            setInitialRelease(parseFloat(value))
        }
        // console.log(i,typeof(parseFloat(i)),"kokok");



    }

    const ValuationFunc = (i) => {
        var main = 0;
        if (TokenomicsData.length > 0) {

            main = i * parseInt(TokenomicsData[0].total_token_supply)
        }

        var noToken = 0;

        if (FundRequested != null && FundRequested != undefined && FundRequested != '') {
            noToken = parseFloat(FundRequested) / i
        } else {
            noToken = 0
        }
        setNoOfTokens(noToken)
        setPricePerToken(i)
        setValuation(main)
    }

    const fundReqFunc = (e) => {
        if (e != null && e != undefined) {

            setFundRequested(e)
            var noToken = 0;
            if (PricePerToken != null && PricePerToken != undefined && PricePerToken != '') {
                noToken = e / parseFloat(PricePerToken)
            } else {
                noToken = 0
            }
            setNoOfTokens(noToken)
        } else {

            setFundRequested('')
        }

    }


    const handleCloseShowPopup = () => {
        setShowPopupLaunch(false)
        getFundingRound()
        handleClose()
    }
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="row" style={{ padding: '10px' }}>
                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Primary Funding Wallet</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => setPrimaryFundingWallet(e.target.value)} /> */}

                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={primaryFundingWallet} onChange={(e) => setPrimaryFundingWallet(e.target.value)} />

                        </div>
                    </div>
                    {/*<div className="col-md-12" style={{marginBottom:'1rem',display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <label style={{ width: '310px' }}>Choose Currency<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" 
                        <div style={{ width: '300px' }}>
                            onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()}
                            <input type="text" className="form-control" style={{ width: '300px' }} />

                            <div>
                            <select className="form-control btn-block-height square-edges" onChange={(e) => setCurrency(e.target.value)}>
                                <option style={{ fontSize: '13px' }} value="Choose_MileStone" >Choose Currency</option>
                                <option style={{ fontSize: '13px' }} value="set_MileStone" >USD</option>
                            </select>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {/* <div className="form-group"> */}
                        <label style={{ width: '310px' }}>Currency</label>
                        <div style={{ width: '300px' }}>


                            <ReactSelect
                                style={{ padding: '0px' }}
                                className="form-control btn-block-height square-edges"

                                defaultValue={countries[0]}
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
                        <label style={{ width: '310px' }}>Funds Requested<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => fundReqFunc(e.target.value)} />


                        </div>
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Token Ticker</label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={TokenTicker} onChange={(e) => setTokenTicker(e.target.value)} />


                        </div>
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}> Price Per Token<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => setPricePerToken(e.target.value)} /> */}
                            <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => ValuationFunc(e.target.value)} />


                        </div>
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Stage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}
                            {/* , , , , "", "seriesB", "otc", "kol_round" */}
                            <select className="form-control btn-block-height square-edges" onChange={(e) => setStage(e.target.value)} >
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
                        <label style={{ width: '310px' }}>Max Supply<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => setMaxSupply(e.target.value)} /> */}
                            <input type="text" className="form-control" style={{ width: '300px' }} value={TokenomicsData.length > 0 ? TokenomicsData[0]?.total_token_supply : ''} readOnly='true' />


                        </div>
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Valuation<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} onChange={(e) => setValuation(e.target.value)} /> */}

                            <input type="text" className="form-control" style={{ width: '300px' }} value={Valuation} readOnly='true' />

                        </div>
                    </div>


                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            <input type="text" className="form-control" style={{ width: '300px' }} readOnly='true' value={NoOfTokens} onChange={(e) => setNoOfTokens(e.target.value)} />


                        </div>
                    </div>
                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}

                            <select className="form-control btn-block-height square-edges" onChange={(e) => setInitialFunc(e)} >
                                {Count.map((_, i) => (
                                    <option style={{ fontSize: '13px' }} value={i + 1} >{`${i + 1}%`}</option>

                                ))}
                                {/* <option style={{ fontSize: '13px' }} value="Choose_MileStone" >20%</option> */}
                                {/* <option style={{ fontSize: '13px' }} value="set_MileStone" >USD</option> */}
                            </select>

                        </div>
                    </div>
                    {/* <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '100%' }}>Set/Choose Milestones<span className="text-danger">*</span></label> */}
                        {/* <input type="text" className="form-control"  */}
                    {/* </div> */}
                    <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ width: '100%', marginTop: '20px' }}>
                            <div>
                                <table style={{ border: 'none', marginBottom: '20px' }}>
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
                                                    {/* onChange={(e) => setChooseMileStonedataFunc(e.target.value, index)} */}
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
                                                            </select>
                                                        </div>
                                                        :
                                                        <input className="form-control" value={i?.milestone} onChange={(evnt) => changeValueForChoose(index, evnt)} />
                                                }
                                            </td>
                                            <td style={{ width: '17%', padding: '10px' }}>
                                                <input type='date' className="form-control" min={todayMite} value={i?.target_date} onChange={(evnt) => changeTargetDate(index, evnt)} />
                                            </td>
                                            <td style={{ width: '12%', padding: '10px' }}>

                                                <div>
                                                    <select className="form-control btn-block-height square-edges" name="percentage" value={i?.percentage} onChange={(evnt) => changePercentageFunc(index, evnt)} >
                                                        {/* <option style={{ fontSize: '13px' }} value={`20`} >20%</option> */}

                                                        {Count.map((_, i) => (
                                                            <option style={{ fontSize: '13px' }} value={i + 1}  >{`${i + 1}%`}</option>

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


                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label style={{ width: '310px' }}>End Target Date<span className="text-danger">*</span></label>
                        {/* <input type="text" className="form-control"  */}
                        <div style={{ width: '300px' }}>
                            {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                            {/* <input type="text" className="form-control" style={{ width: '300px' }} /> */}


                            <input type="date" className="form-control" min={todayMite} style={{ width: '300px' }} onChange={(e) => setEndtargetDate(e.target.value)} />

                        </div>
                    </div>


                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        {/* <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} > */}
                        {/* submit-section
                        submit-section */}
                        <div className="" style={{ textAlign: 'center' }}>
                            <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                        </div>
                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                <button className="btn btn-primary submit-btn" onClick={() => saveDraftFunc()}>SAVE DRAFT</button>
                            </div>

                            <div className="" style={{ textAlign: 'center' }}>
                                <button className="btn btn-primary submit-btn" onClick={() => submitDataFunc()}>LAUNCH PUBLIC ROUND</button>
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
            <CongPopupLaunch PublicRound='You have Successfully Created a Public Round' show={showPopupLaunch} handleClose={handleCloseShowPopup} />
        </div>

    )
}
export default CreatePublicRound;
