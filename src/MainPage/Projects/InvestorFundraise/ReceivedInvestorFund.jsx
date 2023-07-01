import React, { useState, useEffect } from 'react';
import './InvestorPriateRound.css'
import RejectInvestorStatusModal from './RejectInvestorStatusModal';
import ReactSelect from "react-select";

import { useSelector, useDispatch } from 'react-redux';
import { MileStoneInvestorPrivateArray, projectId } from '../../../reducers/ConstantSlice';
import { apiURI } from '../../../config/config';

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
import { fetchRoadMapProjectDetails } from '../../../reducers/RoadMapSlice';
import { fetchBudgetProjectDetails } from '../../../reducers/BudgetSlice';
import { fetchProjectDetails } from '../../../reducers/ProjectDetailsSlice';
import { fetchFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import { fetchTeamSize } from '../../../reducers/TeamSizeSlice';
import { fetchTokenomicsDetails } from '../../../reducers/TokenomicsSlice';
import { fetchSocialTeam } from '../../../reducers/SocialPageSlice';
import { fetchBudgetBannerDetails } from '../../../reducers/BugetBannerSlice';
import { useHistory } from 'react-router-dom';
import { addFounder, isFounder } from '../../../config/web3Client3';
import { addInvestor,
    isInvestor,
    createPrivateRound,
    getContractAddress,
    getApprovedAllowance,
    approveByStableTokenContract,
    depositTokens
} from '../../../config/web3Round';
import { async } from 'regenerator-runtime';


const ReceivedInvestorPrivatePage = ({ indexCountforSlect, publicId, handleClose, getFundingRound }) => {

    let history = useHistory()
    const [ReqStatus, setReqStatus] = useState('')
    const [DepStatus, setDepStatus] = useState('')

    const [Count, setCount] = useState([])
    const [Currency, setCurrency] = useState('')
    const [NameValue, setNameValue] = useState('')
    const [ProjectName, setProjectName] = useState('')
    const [remarks, setRemarks] = useState('')
    const [FounderStatus, setFounderStatus] = useState('')

    const [ProjectIdState, setProjectIdState] = useState('')
    const [InitialRelease, setInitialRelease] = useState('')
    const [TokenomicsData, setTokenomicsData] = useState([])
    const [NoofTokens, setNoofTokens] = useState(0)
    const [ValuationValue, setValuationValue] = useState(0)
    const [MaxSupply, setMaxSupply] = useState(0)
    const [Stage, setStage] = useState('pre_seed_round')
    const [PricePerToken, setPricePerToken] = useState(0)
    const [TokenTicker, setTokenTicker] = useState(0)
    const [FundInvested, setFundInvested] = useState(0)
    const [FundRequested, setFundRequested] = useState('')
    const [FundingWalletAddress, setFundingWalletAddress] = useState('')
    const dispatch = useDispatch()
    const loginId = useSelector((state) => state.constVar.loginId)
    const [RejectPopup, setRejectPopup] = useState(false)

    const chooseMileStonedata = useSelector((state) => state.constVar.MileStoneInvestorPrivateArray)
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const addColumnMileStone = (i) => {
        var newData = {
            choose: "Choose_MileStone",
            ValueForChoose: `MileStone${i + 1}`,
            TargetDate: "",
            percentage: 0
        }
        setChooseMileStonedata(
            [
                ...chooseMileStonedata,
                newData
            ])


    }
    const dleteColumnMileStone = (i) => {
        if (chooseMileStonedata.length > 1) {

            const filteredPeople = chooseMileStonedata.filter((_, index) => index !== i);

            setChooseMileStonedata(filteredPeople)
        } else {
            alert("There should be atleast one MileStone")
        }
    }

    const setChooseMileStonedataFunc = (index1, evnt) => {
        // const setChooseMileStonedataFunc = (value, i) => {
        const { name, value } = evnt.target;
        // const setChooseMileStonedataFunc = (value, i) => {
        // console.log(value,i,"value")
        // var arrayObj = chooseMileStonedata
        // arrayObj[i].choose = value
        // console.log(arrayObj,"arrayObj")
        // setChooseMileStonedata(
        //     arrayObj
        // )

        const updatedData = chooseMileStonedata.map((x, index) => (index === index1 ?
            {
                ...x,
                choose: value
            } : x));

        console.log(updatedData, "updatedData");

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

    const changePercentageFunc = (index1, evnt) => {
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

    console.log(ReqStatus == 'Sent' && DepStatus == false && FounderStatus == 'Accepted', "chooseMileStonedatalplplplpl");

    const approvedStatusFunc = () => {



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
                        "investor_status": 'Accepted',
                        "founder_status": 'Accepted',
                        "initial_release_status": 'withdraw',
                        'deposited': true

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

                    getFundingRound()
                    handleClose()
                }

            })




    }

    const addFounderToContract = async (provider, founder) => { // save founder wallet address in web3
        let isExist = await isFounder(provider, founder);
        if (isExist) {
            console.log('Founder already exist');
        } else {
            return await addFounder(provider, founder);
        }
    }

    const addInvestorToContract = async (provider, investor) => {
        let isExist = await isInvestor(provider, investor);
        if (isExist) {
            console.log('Investor already exist');
        } else {
            return await addInvestor(provider, investor);
        }
    }

    const getPrivateRound = async () => {
        try {
            var query = `
                query GetFundraise($id: ID) {
                    getFundraise(_id: $id) {
                        _id
                        fundraise_blockchain_id
                        project {
                            user {
                                wallet_address
                            }
                        }
                        investor {
                            wallet_address
                            _id
                        }
                        currency
                        funds_requested
                        round
                        contract_id
                        initial_release_percentage
                        currency_contract_id
                    }
                }`;

            return fetch(apiURI.URL, {
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
                console.log('getPrivateRound', data?.data?.getFundraise)
                if (data?.data?.getFundraise != null && data?.data?.getFundraise != undefined) {
                    return data.data.getFundraise;
                } else return null;
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getRoundMilestones = async () => {
        try {
            var query = `
                query AllMilestone($fundraise: ID) {
                    allMilestone(fundraise: $fundraise) {
                        _id
                        milestone
                        target_date
                        percentage
                        milestone_blockchain_id
                    }
                }`;

            return fetch(apiURI.URL, {
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
                        "fundraise": publicId
                    }
                })
            })
            .then((response) => {
                const json = response.json();
                return json;
            })
            .then(data => {
                console.log('getRoundMilestones', data?.data?.allMilestone)
                if (data?.data?.allMilestone != null && data?.data?.allMilestone != undefined) {
                    return data.data.allMilestone;
                } else return null;
            })
        } catch (err) {
            console.log(err);
        }
    }

    const depositTokensIntoRound = async () => { // add founder, investor, create round, deposit tokens
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let roundRecord;
        if (userData) {
            try {
                Promise.all([
                    getPrivateRound(),
                    getRoundMilestones()
                ])
                .then(async ([round, milestones]) => {
                    console.log(round, milestones, wallet_address)
                    if (round && milestones && milestones.length && wallet_address) {
                        roundRecord = round;
                        let resp = await Promise.all([
                            addFounderToContract(userData.provider, round.project?.user?.wallet_address),
                            addInvestorToContract(userData.provider, wallet_address)
                        ]);
                        console.log("founder and investor save status: ", resp);
                        let milestonesData = [];
                        for (let i = 0; i < milestones.length; i++) {
                            let target_date = new Date(milestones[i].target_date).valueOf();
                            target_date = target_date.toString().substring(0, target_date.toString().length - 3);
                            let milestone = {
                                _num: parseInt(milestones[i].milestone_blockchain_id),
                                _date: parseInt(target_date),
                                _percent: parseInt(milestones[i].percentage)
                            }
                            milestonesData.push(milestone);
                        }
                        console.log('creating private round', userData.provider, wallet_address, round.project?.user?.wallet_address, parseInt(round.fundraise_blockchain_id), round.currency_contract_id, parseInt(round.funds_requested), parseInt(round.initial_release_percentage), milestonesData)
                        return createPrivateRound(userData.provider, wallet_address, round.project?.user?.wallet_address, parseInt(round.fundraise_blockchain_id), round.currency_contract_id, parseInt(round.funds_requested), parseInt(round.initial_release_percentage), milestonesData);
                    } else {
                        throw new Error('There is no data to deposit tokens');
                    }
                })
                .then(async (privateRound) => {
                    console.log('created private round: ', privateRound);
                    let approved_tokens = await getApprovedAllowance(userData.provider, wallet_address, roundRecord.currency_contract_id);
                    if (approved_tokens < parseInt(roundRecord.funds_requested)) {
                        console.log(approved_tokens, parseInt(roundRecord.funds_requested), 'approve tokens to deposit');
                        return approveByStableTokenContract(userData.provider, wallet_address, roundRecord.currency_contract_id, parseInt(roundRecord.funds_requested))
                    } else return Promise.resolve(1);
                })
                .then(() => {
                    console.log('calling deposit tokens', userData.provider, wallet_address, roundRecord.currency_contract_id, roundRecord.project?.user?.wallet_address, parseInt(roundRecord.funds_requested), parseInt(roundRecord.fundraise_blockchain_id));
                    return depositTokens(userData.provider, wallet_address, roundRecord.currency_contract_id, roundRecord.project?.user?.wallet_address, parseInt(roundRecord.funds_requested), parseInt(roundRecord.fundraise_blockchain_id));
                })
                .then((resp) => {
                    console.log('called deposit tokens: ', resp);
                    console.log('get the contract address', userData.provider, parseInt(roundRecord.fundraise_blockchain_id));
                    return getContractAddress(userData.provider, parseInt(roundRecord.fundraise_blockchain_id));
                })
                .then((contractAddress) => {
                    console.log('updating private round with contract id', contractAddress);
                    return updateRoundWithContract(contractAddress);
                })
                .then((data) => {
                    console.log('updated round: ', data);
                    return approvedStatusFunc();
                })
                .catch(err => {
                    console.log(err);
                    alert(err.message);
                })
            } catch (err) {
                console.log(err);
                alert(err.message);
            }

        } else {
            alert("Please connect to Metamask or Coinbase wallet");
        }  
    }

    const updateRoundWithContract = (contractId) => {
        var query = `
            mutation Mutation($id: ID, $input: FundraiseInput) {
                updateFundraise(_id: $id, input: $input) {
                    _id
                }
            }`;

        return fetch(apiURI.URL, {
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
                        "contract_id": contractId
                    }
                }

            })
        })
        .then((response) => {
            const json = response.json();
            return json;
        })
        .then(data => {
            console.log('Updated round with contract address: ', contractId);
            return data;
        })
    }




    const rejectPrivate = () => {
        setRejectPopup(true)
    }

    const rejectClosePrivate = () => {
        setRejectPopup(false)
        getFundingRound()
        handleClose()
    }



    const countries = [
        { value: "USD", label: "USD", image: usdimage },
        { value: "USDC", label: "USDC", image: USDCimage },
        { value: "DAI", label: "DAI", image: DAIimage },
        { value: "BUSD", label: "BUSD", image: BUSDimage },
        { value: "RUBLE", label: "RUBLE", image: RUBLEimage },
        { value: "CAD", label: "CAD", image: CADimage },
        { value: "CNY", label: "CNY", image: CNYimage },
        { value: "EURO", label: "EURO", image: EUROimage },
        { value: "POUND", label: "POUND", image: POUNDimage },
        { value: "YUAN", label: "YUAN", image: YUANimage },
        { value: "INR", label: "INR", image: INRimage },
        { value: "YEN", label: "YEN", image: YENimage },
        { value: "SGD", label: "SGD", image: SGDimage },
        { value: "AUD", label: "AUD", image: AUDimage },
        { value: "USDT", label: "USDT", image: USDTimage },

    ];

    useEffect(() => {
        if (loginId != '') {
            getCountofHundFunc()
        }

    }, [loginId])



    const getCountofHundFunc = () => {
        var arr = Array(100).fill().map((_, index) => 1 + index);

        console.log(arr, "aeee");
        setCount(arr)
        getValueFunc()
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
                  
                  investor {
                    _id
                  }
                  project {
                    _id
                    project_name
                  }
                  creator
                  project_status
                  investor_status
                  remarks
                  deposited
                  founder_status
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

                        getMilestoneFunc(data?.data?.getFundraise?._id)
                        setFundingWalletAddress(data?.data?.getFundraise?.primary_funding_wallet)
                        // setIvestor(data?.data?.investor?._id)
                        setReqStatus(data?.data?.getFundraise?.investor_status)
                        setDepStatus(data?.data?.getFundraise?.deposited)
                        // var indexCount = countries.findIndex((element) => element.value == data?.data?.getFundraise?.currency)
                        setCurrency(data?.data?.getFundraise?.currency)
                        setFounderStatus(data?.data?.getFundraise?.founder_status)

                        setFundRequested(data?.data?.getFundraise?.funds_requested)
                        setTokenTicker(data?.data?.getFundraise?.token_ticker)
                        setPricePerToken(data?.data?.getFundraise?.price_per_token)
                        setStage(data?.data?.getFundraise?.stage)
                        setMaxSupply(data?.data?.getFundraise?.max_supply)
                        setValuationValue(data?.data?.getFundraise?.valuation)
                        setNoofTokens(data?.data?.getFundraise?.no_of_tokens)
                        setInitialRelease(data?.data?.getFundraise?.initial_release_percentage)
                        setProjectIdState(data?.data?.getFundraise?.project?._id)
                        setProjectName(data?.data?.getFundraise?.project?.project_name)
                        setNameValue(data?.data?.getFundraise?.creator)
                        setRemarks(data?.data?.getFundraise?.remarks)


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
                  target_date
                  percentage
                  validation_status
                  milestone_status
                  funds
                  estimated_target_date
                  remarks
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
                            if (data?.data?.allMilestone[i].target_date != '' && data?.data?.allMilestone[i].target_date != undefined) {

                                // if(data?.data?.allMilestone[i].target_date )
                                var mileStoneDate = data?.data?.allMilestone[i].target_date
                                mileStoneDate = mileStoneDate.split('T')[0]
                                console.log(mileStoneDate, "mileStoneDate");
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "TargetDate": mileStoneDate,
                                    "ValueForChoose": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,

                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    // ...data?.data?.allMilestone[i]
                                })

                            } else {
                                mainMileStone.push({

                                    "choose": "set_MileStone",
                                    "TargetDate": '',
                                    "ValueForChoose": data?.data?.allMilestone[i].milestone,
                                    "percentage": data?.data?.allMilestone[i].percentage,
                                    validation_status: data?.data?.allMilestone[i].validation_status,
                                    milestone_status: data?.data?.allMilestone[i].milestone_status,
                                    id: data?.data?.allMilestone[i]._id,
                                    // ...data?.data?.allMilestone?.milestones[i]
                                })
                            }




                            console.log(mainMileStone, "mainMileStone");

                        }



                        (dispatch(MileStoneInvestorPrivateArray((mainMileStone))))
                    } else {


                        (dispatch(MileStoneInvestorPrivateArray(([{
                            choose: "set_MileStone",
                            milestone: 'Complete 50% of the Target Fund Raise`',
                            target_date: "2022-08-23",
                            percentage: 1,

                            validation_status: '',
                            milestone_status: '',
                            funds: '',
                            remarks: '',
                            estimated_target_date: ''
                        }]))))
                    }

                })


        } catch (err) {
            console.log(err);
        }

    }

    const testingWeb2Function= () => {
        console.log("Testing")
        updateRoundWithContract("0x12345678910");
        approvedStatusFunc();
    }



    const gotoProjectFunc = (i) => {
        dispatch(fetchRoadMapProjectDetails(i))
        dispatch(fetchBudgetProjectDetails(i))
        dispatch(fetchProjectDetails(i))
        dispatch(projectId(i))
        dispatch(fetchFundingProjectDetails(i))
        dispatch(fetchTeamSize(i))
        dispatch(fetchTokenomicsDetails(i))
        dispatch(fetchSocialTeam(i))
        dispatch(fetchBudgetBannerDetails(i))
        history.push('/detail-projects')
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
                                <label style={{ width: '310px' }}>Project<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }} onClick={() => gotoProjectFunc(ProjectIdState)}>
                                    {/* onChange={(e) => setExpFreq(e.target.value)} onWheel={(e) => e.target.blur()} */}
                                    <div className='projectIdColor'>
                                        {ProjectName}
                                    </div>
                                    {/* <input type="text" className="form-control" style={{ width: '300px' }} value={ProjectName} readOnly='true' /> */}


                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px', marginBottom: '0px' }}>Primary Funding Wallet</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {FundingWalletAddress}

                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Choose Currency<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {Currency == "BUSD" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img>BUSD

                                        </div> : ""}
                                    {Currency == "CAD" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={CADimage}></img>CAD
                                        </div> : ""}
                                    {Currency == "AUD" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img>AUD
                                        </div> : ""}
                                    {Currency == "CNY" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={CNYimage}></img>CNY
                                        </div> : ""}
                                    {Currency == "DAI" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img>DAI
                                        </div> : ""}
                                    {Currency == "EURO" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={EUROimage}></img>EURO
                                        </div> : ""}
                                    {Currency == "INR" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={INRimage}></img>INR
                                        </div> : ""}
                                    {Currency == "RUBLE" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img>RUBLE
                                        </div> : ""}
                                    {Currency == "SGD" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img>SGD
                                        </div> : ""}
                                    {Currency == "USDC" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img>USDC
                                        </div> : ""}
                                    {Currency == "USDT" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img>USDT
                                        </div> : ""}
                                    {Currency == "USD" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={usdimage}></img>USD
                                        </div> : ""}
                                    {Currency == "POUND" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img>POUND
                                        </div> : ""}
                                    {Currency == "YUAN" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img>YUAN
                                        </div> : ""}
                                    {Currency == "YEN" ?
                                        <div>
                                            <img style={{ width: "30px", height: "30px" }} src={YENimage}></img>YEN
                                        </div> : ""}

                                    {/* <ReactSelect
                                        style={{ padding: '0px' }}
                                        className="form-control btn-block-height square-edges"
                                        // isDisabled='true'
                                        value={countries[indexCountforSlect]}
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
                                    /> */}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Funds Requested<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {FundRequested}

                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Token Ticker</label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {TokenTicker}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}> Price Per Token<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {PricePerToken}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Stage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {/* {Stage} */}
                                    {Stage ===  "pre_seed_round" ? "Pre Seed Round "
                                    : Stage === "seed_round" ? "Seed Round" 
                                    : Stage === "strategic_round" ? "Strategic Round" 
                                    : Stage === "pre_sale" ? "Pre Sale" 
                                    : Stage === "public_round" ? "Public Round" 
                                    : Stage === "kol_round" ? "KOL Round" 
                                    : Stage === "early_stage" ? "Early Stage" 
                                    : Stage === "seriesA" ? "Series A" 
                                    : Stage === "seriesB" ? "Series B" 
                                    : Stage === "otc" ? "OTC" 
                                    : "Stage"
                                    } 
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Max Supply<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {MaxSupply}
                                </div>
                            </div>

                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Valuation<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {ValuationValue}
                                </div>
                            </div>


                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>No. Of Tokens<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {NoofTokens}
                                </div>
                            </div>
                            <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <label style={{ width: '310px' }}>Initial Release Percentage<span className="text-danger">*</span></label>
                                {/* <input type="text" className="form-control"  */}
                                <div style={{ width: '300px' }}>
                                    {`${InitialRelease}%`}
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
                                                {/* <th style={{ textAlign: 'center' }}>Choose/Set Milestones</th> */}
                                                <th style={{ textAlign: 'center' }}>Milestones</th>
                                                <th style={{ textAlign: 'center' }}>Target Date </th>
                                                <th style={{ textAlign: 'center' }}>Percentage</th>
                                            </tr>
                                            {chooseMileStonedata.map((i, index) => (
                                                <tr key={index}>
                                                    {/* <td style={{ width: '20%', padding: '10px' }}>
                                                    <input className="form-control" value={"Set Own Milestone"} readOnly='true' /> */}
                                                    {/* <div>
                                                            <select className="form-control btn-block-height square-edges" readOnly='true' value={i?.choose} onChange={(e) => setChooseMileStonedataFunc(e.target.value, index)} >
                                                                <option style={{ fontSize: '13px' }} value="Choose_MileStone" >Choose Milestone</option>
                                                                <option style={{ fontSize: '13px' }} value="set_MileStone" >Set Own Milestone</option>
                                                            </select>
                                                        </div> */}
                                                    {/* </td> */}
                                                    <td style={{ width: '35%', padding: '10px' }}>
                                                        {
                                                            i.choose == 'Choose_MileStone' ?

                                                                <div>
                                                                    <select className="form-control btn-block-height square-edges" value={i?.ValueForChoose} readOnly='true' >
                                                                        <option style={{ fontSize: '13px' }} value={`Choose MileStone${index + 1}`} >Choose MileStone{index + 1}</option>
                                                                    </select>
                                                                </div>
                                                                :
                                                                <input className="form-control" value={i?.ValueForChoose} readOnly='true' />
                                                        }
                                                    </td>
                                                    <td style={{ width: '17%', padding: '10px' }}>
                                                        <input type='date' className="form-control" value={i?.TargetDate} readOnly='true' />
                                                    </td>
                                                    <td style={{ width: '12%', padding: '10px' }}>
                                                        <input className="form-control" value={`${i?.percentage}%`} readOnly='true' />

                                                        {/* <div>
                                                            <select className="form-control btn-block-height square-edges" value={i?.percentage} readOnly='true' >
                                                                <option style={{ fontSize: '13px' }} value={`20`} >20%</option>
                                                                <option style={{ fontSize: '13px' }} value={`30`} >30%</option>
                                                            </select>
                                                        </div> */}
                                                    </td>
                                                    {/* <td style={{ width: '15%', padding: '10px' }}>

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
                                                    </td> */}
                                                </tr>

                                            ))}
                                        </table>

                                    </div>
                                </div>
                            </div>

                            {
                                remarks != '' && remarks != undefined && remarks != null ?

                                    <div className="col-md-12" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <label style={{ width: '310px' }}>Remarks<span className="text-danger">*</span></label>
                                        {/* <input type="text" className="form-control"  */}
                                        <div style={{ width: '300px' }}>
                                            {remarks}
                                        </div>
                                    </div>
                                    :
                                    ""
                            }


                            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} >
                                {/* submit-section
                        submit-section */}
                                <div className="" style={{ textAlign: 'center' }}>
                                    <button className="btn  submit-btn" onClick={() => handleClose()} style={{ background: 'white', border:"1px solid rgb(41, 122, 255)", color:"rgb(41, 122, 255)" }}>CANCEL</button>
                                </div>
                                {
                                    ReqStatus == 'Sent' && DepStatus == false && FounderStatus == 'Accepted' ?

                                        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            {/* {DepStatus == false : } */}
                                            <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                                <button className="btn btn-primary submit-btn" onClick={() => 
                                                    // depositTokensIntoRound()
                                                    testingWeb2Function()
                                                    }>{"Accept & Deposit"}</button>
                                            </div>

                                        </div>
                                        :

                                        ReqStatus == 'Received' && DepStatus == false ?

                                            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                {/* {DepStatus == false : } */}
                                                <div className="" style={{ textAlign: 'center', marginRight: '15px' }}>
                                                    <button className="btn btn-primary submit-btn" onClick={() => 
                                                        // depositTokensIntoRound()
                                                        testingWeb2Function()
                                                        }>{"Accept & Deposit"}</button>
                                                </div>

                                                <div className="" style={{ textAlign: 'center' }}>
                                                    <button className="btn btn-primary submit-btn" onClick={() => rejectPrivate()}>Reject</button>
                                                </div>
                                            </div>
                                            :
                                            <></>

                                }

                            </div>
                        </div>
                    </div>
                    <RejectInvestorStatusModal show={RejectPopup} publicId={publicId} handleClose={rejectClosePrivate} />
                </div>
            </div>
        </div >
    )
}
export default ReceivedInvestorPrivatePage;
