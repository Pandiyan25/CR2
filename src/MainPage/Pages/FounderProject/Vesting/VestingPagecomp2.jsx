
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, } from "react-bootstrap";
import { apiURI } from '../../../../config/config';
import {
    isFounder,
    addFounder,
    approveByFounderCoinContract,
    depositFounderLinearTokens,
    depositFounderLinearTokensToInvestors,
    currentEscrowBalanceOfInvestor,
    investorWithdrawnFund,
    investorUnlockedFund,
    isValidAddress,
    getApprovedAllowance
} from '../../../../config/web3Client3';
import { Toast, ToastBody, ToastHeader } from 'react-bootstrap';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import ReactLoading from "react-loading";
import VestingPopup from './VestingPopup';
import { async } from 'regenerator-runtime';
import writeXlsxFile from 'write-excel-file'
import { Downloaddata } from './ExcelDownload';
import NonLinearDateTokenPopup from './NonLinearDateTokenPopup';
import { DownloadInvestorsData } from './DownloadInvestor';
import readXlsxFile from 'read-excel-file'
import { ToastContainer, toast } from 'material-react-toastify';

import { IconArrowBarToDown } from '@tabler/icons';
import 'material-react-toastify/dist/ReactToastify.css';
import InvestorPopUp from './InvestorPopUp';
import CongPopupLaunch from '../../ProjectDataPage/CongPopupLaunch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';


const VestingPage = ({ match }) => {
const [ToastPart,setToastPart] = useState(true)
    const [showPopupLaunch, setShowPopupLaunch] = useState(false)
    const [investorNotExcData, setInvestorNotExcData] = useState([])
    const [showPopupModal, setShowPopupModal] = useState(false)
    const [showPopUpData, setShowPopUpData] = useState(false)
    const [existingPart, setExistingPart] = useState("Existing_Investors")
    const [loading, setLoading] = useState(false)
    const [approvedTokens, setApprovedTokens] = useState(0);
    const [nonLinearTotalToken, setNonLinearTotalToken] = useState(0)
    const [uploadMainData, setUploadMainData] = useState([])
    const [dataForVestingPopup, setDataForVestingPopup] = useState([])
    const [invesWalletAddress, setInvesWalletAddress] = useState('')
    const [totalTokens, setTotalTokens] = useState(0)
    const [vestingDetailsData, setVestingDetailsData] = useState([])
    const [projectIdDetails, setProjectIdDetails] = useState('')
    const [investorName, setInvestorName] = useState('')
    const [releaseMode, setReleaseMode] = useState('')
    const [releaseTge, setReleaseTge] = useState('')
    const [cliffMonths, setCliffMonths] = useState(0)
    const [vestingMonths, setVestingMonths] = useState('')
    const [vestingEndDate, setVestingEndDate] = useState('')
    const [vestingStartDate, setVestingStartDate] = useState('')
    const [vestingLinearStartDate, setVestingLinearStartDate] = useState('')
    const [vestingLinearStartDate1, setVestingLinearStartDate1] = useState('')
    const [vestingNonLinearStartDate, setVestingNonLinearStartDate] = useState('')
    const [vestingNonLinearEndDate, setVestingNonLinearEndDate] = useState('')
    const [tokenTicker, settokenTicker] = useState('')
    const [tokenContactAddress, settokenContactAddress] = useState('')
    console.log(tokenContactAddress, "tokenContactAddress");
    const [vestingLinearEndDate, setVestingLinearEndDate] = useState('')
    const [tgeDate, setTgeDate] = useState('')
    const [vestingData, setVestingData] = useState([])

    const [projectDetailsData, setProjectDetalsData] = useState([])
    const walletAddress = useSelector((state) => state.constVar.walletAddress)
    const loginId = useSelector((state) => state.constVar.loginId)
    const projectId = useSelector((state) => state.constVar.projectId)
    const [getIvestData, setgetIvestData] = useState([])
    const [showInvestorPopup, setShowInvestorPopup] = useState(false)
    const [vestingMode, setVestingMode] = useState("")
    const hiddenFileInput = React.useRef(null);
    const hiddenFileInput2 = React.useRef(null);

    const closeToastpart = () =>{
        setToastPart(false)
    }

    const handleClickFile = event => {
        hiddenFileInput.current.click();
    };
    const handleClickFile2 = event => {
        hiddenFileInput2.current.click();
    };

    const handleChangeFile = event => {
        const fileUploaded = event.target.files[0];
        uploadData(fileUploaded)
        console.log(fileUploaded, "fileUploaded");
    };

    const handleChangeFile2 = event => {
        const fileUploaded = event.target.files[0];
        uploadExcelInvestor(fileUploaded)
        console.log(fileUploaded, "fileUploaded");
    };


    const getInvestorDetails = () => {
        try {
            var query = `
            query Query($role: String, $user: ID) {
                allUsers(role: $role, user: $user) {
                  email
                  _id
                  role
                  first_name
                  wallet_address
                  last_name
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
                        "role": "Investor",
                        "user": loginId
                    }


                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    setgetIvestData(data?.data?.allUsers)
                })

        } catch (error) {
            console.log(error, "error in InitalProposal Create");
        }
    }


    const getProjectDetailsFunc = () => {
        try {

            var query =
                `
         query AllProjects($user: ID) {
            allProjects(user: $user) {
              _id
              
              project_id
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
                        "user": loginId
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allProjects != null && data?.data?.allProjects != undefined) {
                        var totalInvested = 0;
                        setProjectDetalsData(data?.data?.allProjects)


                    }
                });

        } catch (error) {
            console.log(error, "ProjectGetFunctionError  in Dashboard in investors error");
        }
    }


    const columns = [

        {
            title: 'Investor',
            align: 'center',

            render: (text, record) => (
                <span style={{ color: '#6345ED', textDecoration: 'underline', textDecorationColor: '#6345ED', cursor: 'pointer' }} onClick={() => showPopupFunc(text)}>{text?.investor?.first_name}</span>
            ),

            sorter: (a, b) => a?.investor?.first_name.localeCompare(b?.investor?.first_name),
        },

        {
            title: 'Start Date',
            dataIndex: 'vesting_startmain_date',
            align: 'center',
            sorter: (a, b) => new Date(a?.vesting_startmain_date) - new Date(b?.vesting_startmain_date)
        },

        {
            title: 'End Date',
            dataIndex: 'vesting_endmain_date',
            align: 'center',
            sorter: (a, b) => new Date(a?.vesting_endmain_date) - new Date(b?.vesting_endmain_date)
        }, {
            title: 'Cliff Months',
            dataIndex: 'cliff_months',
            align: 'center',
            sorter: (a, b) => a?.cliff_months - b?.cliff_months
        },
        , {
            title: 'Release Mode',
            dataIndex: 'release_mode',
            align: 'center',
            sorter: (a, b) => a?.release_mode.localeCompare(b?.release_mode),
        }, {
            title: 'Total Tokens',
            // dataIndex: 'total_tokens',
            render: (text, record) => (
                <div>

                    {Number(text?.total_tokens).toLocaleString("en-US")}
                </div>
            ),

            align: 'center',
            sorter: (a, b) => a?.total_tokens - b?.total_tokens
        }

    ]

    const showPopupFunc = (i) => {
        console.log("ididi", i);

        if (i.release_mode == "Linear") {
            var date1 = new Date(i.vesting_date);
            var date2 = new Date(i.vesting_end_date);
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            var dateDif = Math.round(Difference_In_Days / i.cliff_months);
            var balance = 0;
            var noofTokens = i.total_tokens / i.cliff_months;
            var arrpopup = []
            var token = 0;
            var maindate = '';
            balance = i.total_tokens;
            for (var loop = 0; loop < i.cliff_months; loop++) {
                var date3 = '';
                if (maindate == '') {

                    date3 = new Date(i.vesting_date);
                } else {
                    date3 = new Date(maindate);
                }
                var result = addDays(date3, dateDif)
                maindate = `${result.getFullYear()}-${result.getMonth()}-${result.getDate()}`;

                balance = balance - noofTokens;
                token = i.total_tokens - balance;
                arrpopup.push({

                    "unlockDate": maindate,
                    "noOfTokens": noofTokens,
                    "balance": balance,
                    "name": maindate,
                    "uv": token,
                })
            }
        }

        setDataForVestingPopup(arrpopup)

        setShowPopupModal(true)
        setVestingData([i])
    }

    const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    const closePopupFunc = () => {

        setShowPopupModal(false)
    }

    const getApprovedTokens = async () => {
        if (walletAddress && tokenContactAddress) {
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            console.log("userData?.provider, walletAddress, tokenContactAddress", userData?.provider, walletAddress, tokenContactAddress)
            let balance = await getApprovedAllowance(userData?.provider, walletAddress, tokenContactAddress);
            setApprovedTokens(balance);
            console.log('approved tokens are: ', balance, approvedTokens);
        }
    }

    useEffect(() => {
        if (loginId != '') {
            getInvestorDetails()
            getProjectDetailsFunc()
            vestingDetails()
        }

    }, [loginId])

    useEffect(() => {
        if (tokenContactAddress && tokenContactAddress != '') {
            getApprovedTokens();
        }
    }, [tokenContactAddress]);

    const depositFunc = () => {
        try {

            var query =
                `
                mutation Mutation($input: VestingInput) {
                    createVesting(input: $input) {
                      _id
                      tge_date
                      vesting_date
                      vesting_end_date
                      select_release_mode
                      select_release_percentage
                      select_cliff_months
                      select_vesting_months
                      project {
                        user {
                          wallet_address
                        }
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
                        "input": {
                            "investor": investorName,
                            "project": projectIdDetails,
                            "tge_date": tgeDate,
                            "vesting_date": vestingStartDate,
                            "vesting_end_date": vestingEndDate,
                            "select_release_mode": releaseMode,
                            "select_release_percentage": releaseTge,
                            "select_cliff_months": cliffMonths,
                            "select_vesting_months": vestingMonths
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.createVesting != null && data?.data?.createVesting != undefined) {
                        var totalInvested = 0;
                        setProjectDetalsData(data?.data?.createVesting)


                    }
                });

        } catch (error) {
            console.log(error);
        }
    }

    const vestingDetails = () => {
        try {

            var query =
                `
                query Query($project: ID) {
                    allVesting: allVesting(project: $project) {
                      _id
                      tge_date
                      vesting_date
                      vesting_end_date
                  
                      investor {
                        _id
                        first_name
                      }
                      release_mode
                      release_percentage
                      cliff_months
                      vesting_months
                      total_tokens
                      vesting_blockchain_id
                    }
                    tokenticker: allTokenomics(project: $project) {
                      _id
                      token_ticker
                      contract_address
                      token_minted
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
                        "project": projectId
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allVesting != null && data?.data?.allVesting != undefined && data?.data?.allVesting.length > 0) {

                        // for (var i = 0; i < data?.data?.allVesting.length; i++) {
                        //     var tge_date = 
                        // }


                        var tokenArr = [];
                        for (var j = 0; j < data?.data?.allVesting.length; j++) {
                            var projectCurrentDate = ''
                            var dashboardDate = ''

                            if (data?.data?.allVesting[j]?.vesting_date != '' && data?.data?.allVesting[j]?.vesting_date != null && data?.data?.allVesting[j]?.vesting_date != undefined) {
                                projectCurrentDate = data?.data?.allVesting[j]?.vesting_date

                                projectCurrentDate = projectCurrentDate?.split('T')[0];
                            } else {
                                projectCurrentDate = ''
                            }


                            if (data?.data?.allVesting[j]?.vesting_end_date != '' && data?.data?.allVesting[j]?.vesting_end_date != null && data?.data?.allVesting[j]?.vesting_end_date != undefined) {
                                dashboardDate = data?.data?.allVesting[j]?.vesting_end_date

                                dashboardDate = dashboardDate?.split('T')[0];
                            } else {
                                dashboardDate = ''
                            }


                            console.log(dashboardDate, 'dashboardDatevestingDetailsData');
                            console.log(projectCurrentDate, 'projectCurrentDatevestingDetailsData');

                            // var dashboardDate = data?.data?.allVesting[j]?.vesting_end_date
                            // dashboardDate = dashboardDate?.split('T')[0];

                            tokenArr.push({
                                "_id": data?.data?.allVesting[j]?._id,
                                "vesting_startmain_date": projectCurrentDate,
                                "vesting_endmain_date": dashboardDate,
                                ...data?.data?.allVesting[j]

                            })
                        }

                        console.log(tokenArr, 'tokenArrvestingDetailsData');



                        setVestingDetailsData(tokenArr)


                    }
                    if (data?.data?.tokenticker != null && data?.data?.tokenticker != undefined && data?.data?.tokenticker.length > 0) {

                        settokenTicker(data?.data?.tokenticker[0].token_ticker)
                        settokenContactAddress(data?.data?.tokenticker[0].contract_address)
                        // if(((data?.data?.tokenticker[0].contract_address != null && data?.data?.tokenticker[0].contract_address != undefined
                        //     && data?.data?.tokenticker[0].contract_address != "") || data?.data?.tokenticker[0].token_minted == false) &&
                        //     data?.data?.tokenticker[0].token_ticker != null && data?.data?.tokenticker[0].token_ticker != undefined
                        //     && data?.data?.tokenticker[0].token_ticker != "" 
                        //     ){
                        //         closeToastpart()
                        //     }else{
                        //         setToastPart(true)
                        //     }
                    }
                });

        } catch (error) {
            console.log(error);
        }
    }

    const setCliffMonthsFunc = (e) => {
        setCliffMonths(parseInt(e))
        console.log(e, typeof (e), "setCliffMonths");
        var date = new Date(tgeDate);
        console.log(date, "setCliffdate");

        var maindate1 = ""
        var maindate = ""

        // console.log(monthlength, dayLength, "dayLength");
        if (tgeDate != '') {


            if (e != '') {
                date.setMonth(date.getMonth() + 1 + parseInt(e));
                // var maindate = ""
                var monthlength = date.getMonth().toString().length
                var dayLength = date.getDate().toString().length
                var dateMonth1 = date.getMonth()
                var dateYear1 = date.getFullYear()

                console.log(monthlength.toString().length, typeof (monthlength), "ssss");
                if (dayLength > 1 && monthlength > 1 && dateMonth1 != 0) {

                    maindate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
                    maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                } else if (dateMonth1 != 0) {
                    var mainMonth = ''
                    var mainDay = ''
                    console.log(date.getMonth().length, date.getDate().length, "ssss");
                    if (monthlength > 1) {
                        mainMonth = date.getMonth()
                    } else {
                        mainMonth = `0${date.getMonth()}`
                    }

                    if (dayLength > 1) {
                        mainDay = date.getDate()
                    } else {
                        mainDay = `0${date.getDate()}`
                    }
                    maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

                    maindate = `${mainMonth}-${mainDay}-${date.getFullYear()}`;
                } else {
                    if (dayLength > 1) {

                        maindate1 = `${dateYear1 - 1}-${date.getMonth() + 1}-${12}`;
                        maindate = `12-${date.getDate()}-${dateYear1 - 1}`;
                    } else {

                        maindate1 = `${dateYear1 - 1}-${date.getMonth() + 1}-${12}`;
                        maindate = `12-0${date.getDate()}-${dateYear1 - 1}`;
                    }

                }
            } else {
                date.setMonth(date.getMonth() + 1 + parseInt(0));
                var monthlength1 = date.getMonth().toString().length
                var dayLength1 = date.getDate().toString().length
                var dateMonth2 = date.getMonth()
                var dateYear2 = date.getFullYear()
                console.log(dayLength1.length, monthlength1.toString().length, typeof (monthlength1), "ssss");
                if (dayLength1 > 1 && monthlength1 > 1 && dateMonth2 != 0) {

                    maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    maindate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
                } else if (dateMonth2 != 0) {
                    var mainMonth1 = ''
                    var mainDay1 = ''
                    console.log(date.getMonth().length, date.getDate().length, "ssss");
                    if (monthlength1 > 1) {
                        mainMonth1 = date.getMonth()
                    } else {
                        mainMonth1 = `0${date.getMonth()}`
                    }

                    if (dayLength1 > 1) {
                        mainDay1 = date.getDate()
                    } else {
                        mainDay1 = `0${date.getDate()}`
                    }

                    maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    maindate = `${mainMonth1}-${mainDay1}-${date.getFullYear()}`;
                } else {
                    if (dayLength > 1) {

                        maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                        maindate = `12-${date.getDate()}-${dateYear2 - 1}`;
                    } else {

                        maindate1 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                        maindate = `12-0${date.getDate()}-${dateYear2 - 1}`;
                    }

                }
            }

            console.log(maindate, "maindate setTge");
            setVestingLinearStartDate(maindate)
            setVestingLinearStartDate1(maindate1)
            setVestingLinearEndDate(maindate)
            setVestingMonths(0)
        } else {

            console.log(maindate, "maindate setTge");
            setVestingLinearStartDate('')
            setVestingLinearEndDate('')
        }

    }

    const setTgefunc = (i) => {
        console.log(i, cliffMonths, "setTge");
        setTgeDate(i)
        var date = new Date(i);
        console.log(date.getMonth(), cliffMonths, date.getMonth() + cliffMonths, "setTge add month");

        date.setMonth(date.getMonth() + 1 + cliffMonths);
        //    var result2 = date.addMonths(1);
        var maindate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;

        var maindate1 = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        console.log(maindate, "maindate setTge");
        setVestingLinearStartDate(maindate)
        setVestingLinearStartDate1(maindate1)

        setVestingLinearEndDate(maindate)
        setVestingMonths(0)

        setCliffMonths(0)
    }


    const setEndVestingDateFunc = (i) => {
        // endDate = vestingLinearStartDate + i
        // result. setDate(result. getDate() + days);
        console.log(vestingLinearStartDate1, "d2 vestingLinearStartDate");
        var maindate = ''
        if (vestingMode == 'Daily' && vestingLinearStartDate1 != '' && i != '') {
            // let changeVestingDate = `${vestingLinearStartDate.getFullYear()}-${vestingLinearStartDate.getMonth()}-${vestingLinearStartDate.getDate()}`;
            let d2 = new Date(vestingLinearStartDate1);
            console.log(d2, "d2");
            var changeDate = addDaysOrMonthly(d2, parseInt(i))
            // console.log(vestingLinearStartDate, changeDate.getFullYear(), changeDate.getMonth(), changeDate.getDate(), "changeDate");
            // maindate = `${changeDate.getFullYear()}-${changeDate.getMonth()+1}-${changeDate.getDate()}`;
            // console.log(typeof(changeDate.getMonth()),changeDate.getMonth(),"changeDatechangeDat");
            var monthlength1 = changeDate.getMonth().toString().length
            var daylength1 = changeDate.getDate().toString().length
            var dateMonth1 = changeDate.getMonth()
            var dateYear1 = changeDate.getFullYear()
            // console.log(date.getMonth(), "date");
            if (daylength1 > 1 && monthlength1 > 1 && dateMonth1 != 0) {

                maindate = `${changeDate.getMonth()}-${changeDate.getDate()}-${changeDate.getFullYear()}`;
            } else if (dateMonth != 0) {
                var dayValue = ''
                var monthValue = ''
                if (daylength1 > 1) {
                    dayValue = `${changeDate.getDate()}`
                } else {
                    dayValue = `0${changeDate.getDate()}`

                }
                if (monthlength1 > 1) {
                    monthValue = `${changeDate.getMonth()}`
                } else {
                    monthValue = `0${changeDate.getMonth()}`

                }
                maindate = `${monthValue}-${dayValue}-${changeDate.getFullYear()}`;
            } else {
                if (daylength1 > 1) {

                    maindate = `12-${changeDate.getDate()}-${dateYear1 - 1}`;
                } else {

                    maindate = `12-0${changeDate.getDate()}-${dateYear1 - 1}`;
                }

            }
        } else if (vestingMode == 'Monthly' && vestingLinearStartDate1 != '' && i != '') {
            // let changeVestingDate = `${vestingLinearStartDate.getFullYear()}-${vestingLinearStartDate.getMonth()}-${vestingLinearStartDate.getDate()}`;

            var date = new Date(vestingLinearStartDate1);
            date.setMonth(date.getMonth() + parseInt(i));
            var daylength2 = date.getDate().toString().length
            var monthlength2 = date.getMonth().toString().length
            var dateYear = date.getFullYear()
            console.log(dateYear, "changeDatechangeDat");
            var dateMonth = date.getMonth()
            console.log(date.getMonth(), "date");
            if (daylength2 > 1 && monthlength2 > 1 && dateMonth != 0) {

                maindate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
            } else if (dateMonth != 0) {
                var dayValue = ''
                var monthValue = ''
                if (daylength2 > 1) {
                    dayValue = `${date.getDate()}`
                } else {
                    dayValue = `0${date.getDate()}`

                }
                if (monthlength2 > 1) {
                    monthValue = `${date.getMonth()}`
                } else {
                    monthValue = `0${date.getMonth()}`

                }
                maindate = `${monthValue}-${dayValue}-${date.getFullYear()}`;
            } else {
                if (daylength2 > 1) {

                    maindate = `12-${date.getDate()}-${dateYear - 1}`;
                } else {

                    maindate = `12-0${date.getDate()}-${dateYear - 1}`;
                }

            }


            // maindate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
            // maindate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        } else {
            // let changeVestingDate = `${vestingLinearStartDate.getFullYear()}-${vestingLinearStartDate.getMonth()}-${vestingLinearStartDate.getDate()}`;
            let d2 = new Date(vestingLinearStartDate1);
            var changeDate = addDaysOrMonthly(d2, 0)

            var dateMonth2 = changeDate.getMonth()
            var dateYear2 = changeDate.getFullYear()
            var daylength3 = changeDate.getDate().toString().length
            var monthlength3 = changeDate.getMonth().toString().length
            if (daylength3 > 1 && monthlength3 > 1 && dateMonth2 != 0) {

                maindate = `${changeDate.getMonth()}-${changeDate.getDate()}-${changeDate.getFullYear()}`;
            } else if (dateMonth != 0) {
                var dayValue3 = ''
                var monthValue3 = ''
                if (daylength3 > 1) {
                    dayValue3 = `${changeDate.getDate()}`
                } else {
                    dayValue3 = `0${changeDate.getDate()}`

                }
                if (monthlength3 > 1) {
                    monthValue3 = `${changeDate.getMonth()}`
                } else {
                    monthValue3 = `0${changeDate.getMonth()}`

                }
                maindate = `${monthValue3}-${dayValue3}-${changeDate.getFullYear()}`;
            } else {
                if (daylength1 > 1) {

                    maindate = `12-${changeDate.getDate()}-${dateYear2 - 1}`;
                } else {

                    maindate = `12-0${changeDate.getDate()}-${dateYear2 - 1}`;
                }

            }

            // var date3 = new Date(changeVestingDate);
            // maindate = date3
            // alert("Please Select Vesting Mode")
            // maindate = `${changeDate.getMonth()}-${changeDate.getDate()}-${changeDate.getFullYear()}`;

        }
        console.log(maindate, "maindate");
        // var changeDate = d2.setDate(d2.getDate() + parseInt(i));
        setVestingLinearEndDate(maindate)
        setVestingMonths(i)
    }

    const addDaysOrMonthly = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    console.log(vestingLinearStartDate, "setTge");
    const downloadSampleInvestor = async () => {

        await writeXlsxFile(DownloadInvestorsData, {
            // (optional) column widths, etc.
            fileName: 'InvestorToken.xlsx'
        })
    }


    const downloadSampleData = async () => {

        await writeXlsxFile(Downloaddata, {
            fileName: 'vestingToken.xlsx'
        })
    }

    const showPopupClosefunc = () => {
        vestingDetails()
        setShowPopUpData(false)

    }
    const showPopupNonLinear = () => {

        setShowPopUpData(true)
    }

    const depositLinearFunc = () => {
        var maindata = false
        var investorid = false
        if (investorNotExcData.length > 0) {
            maindata = true
        } else {
            maindata = false
        }

        console.log(investorName.length, "vinvestorName.length");
        if (investorName != '' && investorName.length > 0) {
            investorid = investorName
        } else {
            investorid = null
        }

        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData && projectId) {
            try {

                var query =
                    `
                    mutation CreateVesting($input: VestingInput) {
                        createVesting(input: $input) {
                          _id
                      
                          project {
                            _id
                            project_blockchain_id
                          }
                          tge_date
                          vesting_date
                          vesting_end_date
                          release_mode
                          release_percentage
                          cliff_months
                          vesting_months
                          total_tokens
                          vesting_blockchain_id
                          multiple_investors
                          multiple_investors_data {
                            tokens
                            wallet_address
                          }
                          vesting_mode
                          investor {
                            wallet_address
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
                                "investor": investorid,
                                "project": projectId,
                                "tge_date": tgeDate,
                                "vesting_date": vestingLinearStartDate,
                                "vesting_end_date": vestingLinearEndDate,
                                "release_mode": releaseMode,
                                "release_percentage": parseFloat(releaseTge),
                                "cliff_months": cliffMonths,
                                "vesting_months": parseFloat(vestingMonths),
                                "total_tokens": parseFloat(totalTokens),
                                "multiple_investors": maindata,
                                "multiple_investors_data": investorNotExcData,
                                "vesting_mode": vestingMode,
                                "token_ticker": tokenTicker,
                                "token_contract": tokenContactAddress,
                                "vesting_contract": process.env.VESTING_CONTRACT_ADDRESS

                            }
                        }


                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(async (data) => {
                        console.log("linear ", data?.data?.createVesting?.multiple_investors ? "multiple " : "single ", data?.data?.createVesting);

                        if (data?.data?.createVesting != null && data?.data?.createVesting != undefined) {
                            setExistingPart("Existing_Investors")


                            if (data?.data?.createVesting?.multiple_investors) {
                                return await depositToMultiLinear(data?.data?.createVesting);
                            } else {
                                return await depositToSingleLinear(data?.data?.createVesting);
                            }
                            vestingDetails()
                            setInvestorNotExcData([])
                            setVestingMode('')
                            setInvestorName('')
                            setTgeDate('')
                            setVestingLinearStartDate('')
                            setVestingEndDate('')
                            setReleaseMode('')
                            setReleaseTge(0)
                            setCliffMonths("")
                            setVestingMonths(0)
                            setTotalTokens(0)
                            investorid = ''
                            // vestingDetails()
                            // setInvestorNotExcData([])
                            // setVestingMode('')
                            // setInvestorName('')
                            // setTgeDate('')
                            // setVestingLinearStartDate('')
                            // setVestingEndDate('')
                            // setReleaseMode('')
                            // setReleaseTge(0)
                            // setCliffMonths("")
                            // setVestingMonths(0)
                            // setTotalTokens(0)
                            // investorid = ''

                        } else return Promise.resolve(null);
                    })
                    .then((status) => {
                        if (status != null) {
                            vestingDetails()
                            setInvestorNotExcData([])
                            setVestingMode('')
                            setInvestorName('')
                            setTgeDate('')
                            setVestingLinearStartDate('')
                            setVestingEndDate('')
                            setReleaseMode('')
                            setReleaseTge(0)
                            setCliffMonths("")
                            setVestingMonths(0)
                            setTotalTokens(0)
                            investorid = ''
                        }
                    })

            } catch (error) {
                console.log(error);
            }
        } else {
            if (projectId) alert("Please connect to Metamask or Coinbase wallet")
            else alert("Please create a project first");
        }
    }


    const showLaunch = () => {
        setShowPopupLaunch(true)
    }
    const handleCloseShowPopup = () => {
        setShowPopupLaunch(false)
    }



    console.log(investorName, projectId, tgeDate, vestingLinearStartDate, vestingLinearEndDate, releaseMode, vestingMonths
        , totalTokens, investorNotExcData, vestingMode, "allvesting"

    );
    const investordatafunc = (i) => {
        console.log(getIvestData[i], "investordatafunc");
        setInvestorName(getIvestData[i]._id)
        setInvesWalletAddress(getIvestData[i].wallet_address)
    }

    const uploadData = async (e) => {
        console.log(e.type, "application/vnd.xlsx");
        if (e.type == 'application/vnd.xlsx' || e.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

            await readXlsxFile(e).then((rows) => {
                console.log("upload document data", rows);

                console.log(rows[i], "sssss");
                var arrmain = [];
                var totTokn = 0;
                for (var i = 1; i < rows.length; i++) {

                    totTokn = totTokn + rows[i][1]

                    var dateField = ''
                    if (rows[i][0] != null && rows[i][0] != undefined && rows[i][0] != '') {
                        // dateField = rows[i][0]
                        var datedata = new Date(rows[i][0])
                        dateField =

                            (datedata.getMonth() + 1)
                            +
                            "-" + datedata.getDate() +
                            "-" + datedata.getFullYear();

                    } else {
                        dateField = ''
                    }


                    arrmain.push({
                        "date": dateField,
                        "tokens": rows[i][1],
                    })
                }

                setUploadMainData(arrmain)
                setNonLinearTotalToken(totTokn)
                console.log(arrmain[1][0], arrmain[arrmain.length - 1][0], "rows[1][0]");
                setVestingNonLinearStartDate(arrmain[0].date)

                setVestingNonLinearEndDate(arrmain[arrmain.length - 1].date)

            })
            setShowPopUpData(true)
        } else {
            toast.warn('Please Upload file only xlsx format', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }


    const uploadExcelInvestor = async (e) => {
        console.log(e, "eeeeee==========");
        var arr = [];
        setLoading(true)
        if (e.type == 'application/vnd.xlsx' || e.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

            await readXlsxFile(e).then((rows) => {
                console.log(rows, "rows[0]");
                for (var i = 1; i < rows.length; i++) {
                    arr.push({
                        "wallet_address": rows[i][0],
                        "tokens": rows[i][1]
                    })


                }

            })


            console.log(arr, "arrrr============");
            setInvestorNotExcData(arr)

            setShowInvestorPopup(true)
            setLoading(false)
        } else {

            toast.warn('Please Upload file only xlsx format', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }

    const handleClosePopup = () => {
        setShowInvestorPopup(false)

    }

    const showPopupInvestor = () => {

        setShowInvestorPopup(true)

    }

    const uploadExcelData = async (e) => {
        if (investorName != '' && tgeDate != '' &&
            vestingStartDate != '' && vestingEndDate != '' &&
            releaseTge != '' && cliffMonths != '' && vestingMonths != '' && totalTokens != ''
        ) {
            await readXlsxFile(e).then((rows) => {
                console.log("upload document data", rows);
                // var
                for (var i = 1; i < rows.length; i++) {
                    console.log(rows[i], "sssss");
                    submitFunc(rows[i])
                }


                // getUserDetailsFunc()
            }
            )
            toast.success('Successfully Added', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setInvestorName("")
            setTgeDate("")
            setVestingStartDate("")
            setVestingEndDate("")
            setReleaseTge("")
            setCliffMonths("")
            setVestingMonths("")
            setTotalTokens(0)


        } else {
            alert("Please fill all the details")
        }

    }

    const submitFunc = (i) => {


        try {

            var query =
                `
                    mutation Mutation($input: VestingInput) {
                        createVesting(input: $input) {
                          _id
                          tge_date
                          vesting_date
                          vesting_end_date
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
                            "investor": investorName,
                            "project": projectId,
                            "tge_date": tgeDate,
                            "vesting_date": vestingStartDate,
                            "vesting_end_date": vestingEndDate,
                            "release_mode": "Monthly ",
                            "release_percentage": parseFloat(releaseTge),
                            "cliff_months": parseInt(cliffMonths),
                            "vesting_months": parseFloat(vestingMonths),
                            "total_tokens": parseFloat(totalTokens),
                            "non_linear_no_of_tokens": i[1],
                            "non_linear_date": i[0],
                            "token_ticker": tokenTicker,
                            "token_contract": tokenContactAddress,
                        }
                    }
                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // debugger;
                    //   console.log('ProjectGetFunctiondata', data?.data?.allProjects);
                    if (data?.data?.createVesting != null && data?.data?.createVesting != undefined) {
                        vestingDetails()
                        console.log('ProjectGetFunctiondata', data?.data?.createVesting);
                        // setVestingDetailsData(data?.data?.allVesting)


                    }
                });

        } catch (error) {
            console.log(error);
        }

    }
    const setExcMulFunc = (e) => {
        if (e == "Existing_Investors") {

            setExistingPart(e)
        } else {

            setExistingPart(e)
            setReleaseMode("Linear")
        }
    }

    const depositToSingleLinear = async (data) => {
        let {
            _id,
            investor,
            project,
            tge_date,
            vesting_date,
            vesting_end_date,
            release_mode,
            release_percentage,
            cliff_months,
            vesting_months,
            total_tokens,
            vesting_blockchain_id,
            vesting_mode
        } = data;
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        if (userData) {
            console.log('check founder or not');
            return isFounder(userData.provider, walletAddress)
                .then((status) => {
                    if (status) {
                        console.log('founder already exist');
                        return Promise.resolve()
                    } else {
                        console.log('creating new founder');
                        return addFounder(userData.provider, walletAddress);
                    }
                })
                .then(async (founder) => {
                    await getApprovedTokens();
                    if (founder) console.log('added new founder');
                    if (approvedTokens >= total_tokens) {
                        return Promise.resolve('approved tokens are already exist');
                    } else {
                        console.log('calling approveByFounderCoinContract');
                        return approveByFounderCoinContract(userData.provider, walletAddress, total_tokens, tokenContactAddress)
                    }
                })
                .then(async (resp) => {
                    await getApprovedTokens();
                    console.log('called approveByFounderCoinContract', resp);
                    console.log('calling depositFounderLinearTokens');
                    let mode = vesting_mode === "Daily" ? 1 : 30;
                    return depositFounderLinearTokens(userData.provider, walletAddress, tokenContactAddress, tokenTicker.toUpperCase(), vesting_blockchain_id, total_tokens, investor.wallet_address, tge_date, release_percentage, vesting_date, vesting_months, mode);
                })
                .then(async (resp) => {
                    await getApprovedTokens();
                    console.log('called depositFounderLinearTokens', resp);
                    let escrow_bal = await currentEscrowBalanceOfInvestor(userData.provider, walletAddress, vesting_blockchain_id, investor.wallet_address);
                    let withdrawn_fund = await investorWithdrawnFund(userData.provider, vesting_blockchain_id, investor.wallet_address);
                    let unlocked_fund = await investorUnlockedFund(userData.provider, walletAddress, investor.wallet_address, vesting_blockchain_id);
                    console.log('update vesting record funds');
                    return updateVestingRecordFund(_id, escrow_bal, withdrawn_fund, unlocked_fund);
                })
                .then((resp) => {
                    console.log('updated vesting record fund');
                    showLaunch();
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return deleteVestingRecord(_id);
                })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const depositToMultiLinear = async (data) => {
        let {
            _id,
            investor,
            project,
            tge_date,
            vesting_date,
            vesting_end_date,
            release_mode,
            release_percentage,
            cliff_months,
            vesting_months,
            total_tokens,
            vesting_blockchain_id,
            vesting_mode,
            multiple_investors_data
        } = data;
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let invalid_rec = multiple_investors_data.filter(inv => isValidAddress(userData?.provider, inv.wallet_address) === false);
        if (invalid_rec && invalid_rec.length) {
            console.log('Invalid addresses: ', invalid_rec);
            await deleteVestingRecord(_id);
            alert('It contains invalid address, please try again with valid addresses.');
        } else if (userData) {
            let tokens_no = 0;
            for (let i = 0; i < multiple_investors_data.length; i++) {
                tokens_no += parseFloat(multiple_investors_data[i].tokens);
            }
            console.log('check founder or not');
            return isFounder(userData.provider, walletAddress)
                .then((status) => {
                    if (status) {
                        console.log('founder already exist');
                        return Promise.resolve()
                    } else {
                        console.log('creating new founder');
                        return addFounder(userData.provider, walletAddress);
                    }
                })
                .then(async (founder) => {
                    await getApprovedTokens();
                    if (founder) console.log('added new founder');
                    if (approvedTokens >= tokens_no) {
                        return Promise.resolve('approved tokens are already exist');
                    } else {
                        console.log('calling approveByFounderCoinContract', tokens_no);
                        return approveByFounderCoinContract(userData.provider, walletAddress, tokens_no, tokenContactAddress)
                    }
                })
                .then(async (resp) => {
                    await getApprovedTokens();
                    console.log('called approveByFounderCoinContract', resp);
                    console.log('calling depositFounderLinearTokensToInvestors');
                    let mode = vesting_mode === "Daily" ? 1 : 30;
                    return depositFounderLinearTokensToInvestors(userData.provider, walletAddress, tokenContactAddress, tokenTicker.toUpperCase(), vesting_blockchain_id, tge_date, release_percentage, vesting_date, vesting_months, multiple_investors_data, mode);
                })
                .then(async (resp) => {
                    await getApprovedTokens();
                    showLaunch()
                    console.log('called depositFounderLinearTokensToInvestors', resp);
                    // let escrow_bal = await currentEscrowBalanceOfInvestor(userData.provider, walletAddress, vesting_blockchain_id, investor.wallet_address);
                    // let withdrawn_fund = await investorWithdrawnFund(userData.provider, vesting_blockchain_id, investor.wallet_address);
                    // let unlocked_fund = await investorUnlockedFund(userData.provider, walletAddress, investor.wallet_address, vesting_blockchain_id);
                    // console.log('update vesting record funds');
                    // return updateVestingRecordFund(_id, escrow_bal, withdrawn_fund, unlocked_fund);
                    return true;
                })
                // .then((resp) => {
                //     console.log('updated vesting record fund');
                //     return true;
                // })
                .catch(err => {
                    console.log(err);
                    return deleteVestingRecord(_id);
                })
        } else {
            alert("Please connect to Metamask or Coinbase wallet")
        }
    }

    const updateVestingRecordFund = (_id, escrow_bal, withdrawn_fund, unlocked_fund) => {
        console.log('updating db vesting record', _id, escrow_bal, withdrawn_fund, unlocked_fund)
        try {
            var query = `mutation UpdateVesting($input: VestingInput, $id: ID) {
                updateVesting(input: $input, _id: $id) {
                    _id
                    tokens_in_escrow
                    tokens_released_till_date
                    unlocked_tokens_till_date
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
                        "id": _id,
                        "input": {
                            "tokens_in_escrow": parseFloat(escrow_bal),
                            "tokens_released_till_date": parseFloat(withdrawn_fund),
                            "unlocked_tokens_till_date": parseFloat(unlocked_fund)
                        }
                    }

                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('UpdateVesting', data?.data?.updateVesting);
                    if (data?.data?.updateVesting != null && data?.data?.updateVesting != undefined) {
                        console.log('vesting record updated')
                    } else {
                        console.log('vesting record not updated')
                    }
                });
        } catch (error) {
            console.log(error, "updateVesting error");
        }
    }

    const deleteVestingRecord = (_id) => {
        try {
            var query = `
            mutation DeleteVesting($_id: ID) {
                deleteVesting(_id: $_id) {
                  _id
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
                    variables: {
                        "_id": _id,
                    }
                })
            })
                .then((response) => {
                    const json = response.json();
                    return json;
                })
                .then(data => {
                    console.log('deleteVesting', data?.data?.deleteVesting);
                    vestingDetails();
                    if (data?.data?.deleteVesting != null && data?.data?.deleteVesting != undefined) {
                        console.log('vesting deleted')
                    } else {
                        console.log('vesting not deleted')
                    }
                })
        }
        catch (error) {
            console.log(error, "error in Founder Vesting");
        }
    }

    console.log(vestingDetailsData, "vestingDetailsData");

    return (

        <div className="page-wrapper" style={{ paddingTop: '60px' }}>
    
            <div className="content container-fluid">
                <div >
                    <div className="page-header">
                        <div className="header-left">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Vesting</h3>

                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                   
               
                    </div>

                    </div>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 10px 20px #C4C8D0' }}>

                        <div className="row" >

                            <div className="col-sm-12" >
                                <div className="row" >
                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ padding: '0px' }} >
                                        <div className="col-sm-12">
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard ft-weight" >
                                                    Select Investor
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard">
                                                    <select className="form-control btn-block-height square-edges" onChange={(e) => setExcMulFunc(e.target.value)} >
                                                        <option style={{ fontSize: '13px' }} value="Existing_Investors">Existing Investors</option>
                                                        <option style={{ fontSize: '13px' }} value="Multiple_Investors">Multiple Investors</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* {
                                                existingPart == "Existing_Investors" ? */}

                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>


                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard ft-weight" >
                                                    Number of Tokens
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" >

                                                    {releaseMode == 'Linear' ?

                                                        <input type="number" className="form-control" onChange={(e) => setTotalTokens(e.target.value)} onWheel={(e) => e.target.blur()} />
                                                        :
                                                        // value={nonLinearTotalToken}
                                                        <input type="number" className="form-control" onChange={(e) => setTotalTokens(e.target.value)} onWheel={(e) => e.target.blur()} />


                                                    }

                                                </div>
                                            </div>
                                            {/* :
                                                    ''
                                            } */}
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard ft-weight" >
                                                    TGE Date
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" >
                                                    {/* {releaseMode == 'Linear' ?

                                                        <input type="date" className="form-control" onChange={(e) => setTgefunc(e.target.value)} />
                                                        :
                                                        <input type="date" className="form-control" onChange={(e) => setTgeDate(e.target.value)} />


                                                    } */}

<input
type="date"
id="newTGE"
value={newTGE ? newTGE.toISOString().substring(0, 10) : ""}
onChange={(e) => setTgeDate(new Date(e.target.value))}
/>
                                                </div>
                                            </div>
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ display: 'flex', alignItems: 'center' }}>

                                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard ft-weight" style={{ padding: '0px' }}>
                                                        Vesting Date
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ padding: '0px' }}>
                                                        {releaseMode == 'Linear' ?
                                                            <input type="text" readOnly='true' className="form-control" value={vestingLinearStartDate} />

                                                            :
                                                            <input type="text" readOnly='true' className="form-control" value={vestingNonLinearStartDate} />


                                                        }

                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard ft-weight" style={{ padding: '0px' }}>
                                                        Vesting End Date
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ padding: '0px' }}>
                                                        {releaseMode == 'Linear' ?
                                                            <input type="text" readOnly='true' className="form-control" value={vestingLinearEndDate} />

                                                            :
                                                            <input type="text" readOnly='true' className="form-control" value={vestingNonLinearEndDate} />


                                                        }
                                                    </div>
                                                </div>

                                            </div>

                                            {
                                                releaseMode == "Linear" ?

                                                    <div className="row" style={{ margin: '10px 15px 10px 0px' }}>
                                                        <select className="form-control btn-block-height square-edges" onChange={(e) => setVestingMode(e.target.value)}>
                                                            <option style={{ fontSize: '13px' }} value={""}>Select Vesting Mode</option>
                                                            <option style={{ fontSize: '13px' }} value={"Daily"} >{"Daily"} </option>

                                                            <option style={{ fontSize: '13px' }} value={"Monthly"} >{"Monthly"}  </option>


                                                        </select>
                                                    </div>
                                                    :
                                                    ''

                                            }


                                            <div className="row" style={{ margin: '10px 15px 10px 0px' }}>
                                                <input type="text" placeholder='Token Contract Address' readOnly='true' className="form-control" value={tokenContactAddress} />
                                            </div>



                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-6 col-lg-6 paddingDashboard" style={{ padding: '0px' }} >
                                        <div className="col-sm-12">


                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                {
                                                    existingPart == "Existing_Investors" ?
                                                        <select className="form-control btn-block-height square-edges" onChange={(e) => investordatafunc(e.target.value)} >
                                                            <option style={{ fontSize: '13px' }} value="">Select</option>
                                                            {getIvestData.length > 0 && getIvestData.map((i, index) => (
                                                                // value={i} 
                                                                <option style={{ fontSize: '13px' }} value={index} >{i?.first_name}{i?.last_name} </option>
                                                            ))}
                                                        </select>
                                                        :
                                                        <div style={{
                                                            display: 'flex', flexDirection: 'row',
                                                            alignItems: 'center', width: '100%', justifyContent: 'space-between'
                                                        }}>


                                                            <div>

                                                                <button style={{
                                                                    borderRadius: '0px ',
                                                                    fontSize: '13px',
                                                                    height: "44px",

                                                                }} className="btn add-btn-search" onClick={handleClickFile2}>Upload a file</button>
                                                                <input
                                                                    type="file"
                                                                    ref={hiddenFileInput2}
                                                                    onChange={handleChangeFile2}
                                                                    style={{ display: 'none' }}
                                                                />



                                                                <button style={{
                                                                    borderRadius: '0px',
                                                                    border: '1px solid #6345ED',
                                                                    height: "44px",
                                                                    minWidth: "20px",
                                                                    background: "#1890ff",
                                                                    color: "white",
                                                                    fontSize: '13px',
                                                                    float: 'right',
                                                                    fontWeight: '500'
                                                                }}
                                                                    onClick={() => downloadSampleInvestor()}> <IconArrowBarToDown /></button>

                                                            </div>
                                                            {
                                                                loading == false ?

                                                                    <button className="btn add-btn-search" style={{
                                                                        height: "44px",
                                                                        borderRadius: '0px'
                                                                    }} onClick={() => showPopupInvestor()}> View</button>
                                                                    :

                                                                    // <button className="btn add-btn-search" style={{
                                                                    //     height: "44px",
                                                                    //     borderRadius: '5px'
                                                                    // }}> Loading</button>
                                                                    <ReactLoading type={"spinningBubbles"} style={{ height: "44px", fill: "#da4e1d" }} />

                                                            }

                                                        </div>
                                                }
                                            </div>


                                            {
                                                existingPart == "Existing_Investors" ?
                                                    <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                        <select className="form-control btn-block-height square-edges" onChange={(e) => setReleaseMode(e.target.value)} >
                                                            <option style={{ fontSize: '13px' }}>Select Release Mode</option>
                                                            <option style={{ fontSize: '13px' }} value={"Linear"} >{"Linear"} </option>


                                                            <option style={{ fontSize: '13px' }} value={"Non-Linear"} >{"Non-Linear"}  </option>


                                                        </select>
                                                    </div>
                                                    :
                                                    <input type="text" readOnly='true' placeholder='Enter Release % at TGE' className="form-control" value="Linear" />


                                            }
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                <input type="number" placeholder='Enter Release % at TGE' className="form-control" onChange={(e) => setReleaseTge(e.target.value)} onWheel={(e) => e.target.blur()} />

                                            </div>
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                {releaseMode == 'Linear' ?
                                                    <input type="number" placeholder='Enter Cliff Months' className="form-control" value={cliffMonths} onChange={(e) => setCliffMonthsFunc(e.target.value)} onWheel={(e) => e.target.blur()} />

                                                    :
                                                    <input type="number" placeholder='Enter Cliff Months' className="form-control" onChange={(e) => setCliffMonths(e.target.value)} onWheel={(e) => e.target.blur()} />


                                                }
                                            </div>
                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                {releaseMode == 'Linear' ?
                                                    <input type="number" placeholder='Enter Vesting Period' className="form-control" value={vestingMonths} onChange={(e) => setEndVestingDateFunc(e.target.value)} onWheel={(e) => e.target.blur()} />


                                                    :

                                                    <input type="number" placeholder='Enter Vesting Months' className="form-control" onChange={(e) => setVestingMonths(e.target.value)} onWheel={(e) => e.target.blur()} />

                                                }
                                            </div>

                                            <div className="row" style={{ margin: '10px 0px 10px 0px' }}>

                                                <input type="text" placeholder='Token Ticker' className="form-control" readOnly='true' defaultValue={tokenTicker} value={tokenTicker} />
                                            </div>

                                            {
                                                existingPart == "Existing_Investors" ?


                                                    <div className="row" style={{ margin: '10px 0px 10px 0px' }}>
                                                        <div className="col-sm-12 ft-weight" style={{ padding: '0px' }}>
                                                            Wallet Address :  {invesWalletAddress}

                                                        </div>

                                                    </div>
                                                    :
                                                    ''

                                            }




                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row" >

                                </div>
                            </div>
                            <div className="col-sm-12">


                                {
                                    releaseMode == 'Linear' ?

                                        <div className="row" >
                                            <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" style={{ padding: '0px', marginTop: '20px', paddingLeft: '200px' }} >
                                                <span style={{ color: '#008000' }}>{approvedTokens} approved</span>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-lg-4 paddingDashboard" >
                                                {/* <button style={{ width: '120px', height: '45px', margin: '10px', marginBottom: '30px', borderRadius: '5px', background: '#6345ED', color: 'white', border: '2px solid #6345ED' }}
                                                    onClick={() => depositLinearFunc()}
                                                >
                                                    Approve
                                                </button> */}
                                                <button style={{ width: '120px', height: '45px', margin: '10px', marginBottom: '30px', borderRadius: '0px', border: '2px solid #6345ED', color: '#6345ED' }} onClick={() => depositLinearFunc()}>
                                                    Deposit
                                                </button>
                                            </div>


                                        </div>
                                        :
                                        <div className="row" >


                                            <div className="col-md-12 col-sm-12 col-lg-12 " style={{ marginBottom: '30px' }} >
                                                <div>
                                                    <div>

                                                        <button style={{
                                                            borderRadius: '0px',
                                                            fontSize: '13px',
                                                            height: "40px",

                                                        }} className="btn add-btn-search" onClick={handleClickFile}>Upload a file</button>
                                                        <input
                                                            type="file"
                                                            ref={hiddenFileInput}
                                                            onChange={handleChangeFile}
                                                            style={{ display: 'none' }}
                                                        />



                                                        <button style={{
                                                            borderRadius: '0px',
                                                            border: '1px solid #6345ED',
                                                            //   border-radius: 5px 0px 0px 5px;
                                                            // border: 1px solid white;
                                                            // font-size: 13px;
                                                            height: "40px",
                                                            minWidth: "20px",
                                                            background: "#1890ff",
                                                            color: "white",
                                                            fontSize: '13px',
                                                            float: 'right',
                                                            fontWeight: '500'
                                                        }}
                                                            // className="btn add-btn-search"
                                                            onClick={() => downloadSampleData()}> <IconArrowBarToDown /></button>

                                                    </div>
                                                </div>
                                                <button style={{
                                                    width: '120px', height: '40px',
                                                    fontWeight: '500',
                                                    borderRadius: '0px',
                                                    height: "40px",
                                                   
                                                    background: "linear-gradient(90deg,#6345ED,#DC39FC)",
                                                    color: 'white',
                                                    border: '2px solid #6345ED'
                                                }}
                                                    onClick={() => showPopupNonLinear()}
                                                >
                                                    Add Token
                                                </button>
                                            </div>

                                        </div>

                                }


                            </div >

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-md-12 d-flex">

                                        <div className="card card-table flex-fill" style={{ border: 'none', margin: '0px' }}>

                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <Table
                                                        pagination={{
                                                            total: vestingDetailsData.length,
                                                            showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                                        }
                                                        }
                                                        style={{ overflowX: 'auto' }}
                                                        columns={columns}
                                                        bordered
                                                        dataSource={vestingDetailsData}
                                                        rowKey={record => record.id}
                                                    />

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            <Toast show={ToastPart} className="toast__open2">
                <ToastHeader closeButton={false}>
                    <div className='header__div'>

                        <FontAwesomeIcon icon={faLightbulb} className='stylessvg' />
                    </div>
                    {/*  */}
                </ToastHeader>
                <ToastBody>
                    <h4 className='h2div'>
                    Recommendations for using vesting contracts.
                    </h4>
       
                    <ul className='ul__toast'>
                        <li className='toast__li'>Please fill token contract details in tokenomics tab under my project to create a vesting contract.</li>
                        <li className='toast__li'> Please double check the investors address when using multiple investors option.</li>
                        <li className='toast__li'>Before using existing investors option please check with investor if their displayed wallet address is still valid.</li>
                        <li className='toast__li'>Before creating vesting contract, re-check all the vesting parameters.</li>
                        {/* <li className='toast__li'>
                            Update your startup profile before for any changes before creating private round.
                        </li>
                        <li className='toast__li'>Make sure to double-check the details of your offer such as price, funding required and stage.</li>
                        <li className='toast__li'>Lock the Tokens in Vesting Contracts is most recommended milestone.</li>
                        <li className='toast__li'>Choose target dates for milestones strategically.</li> */}
                    </ul>
                    <div style={{ width: '100%', textAlign: 'center' }}>

                        <button className='dismiss__btn' onClick={() => closeToastpart()}>Dismiss</button>
                    </div>
                </ToastBody>
            </Toast>
            </div>

            <VestingPopup dataForVestingPopup={dataForVestingPopup} vestingData={vestingData} show={showPopupModal} handleClose={closePopupFunc} />

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
            <NonLinearDateTokenPopup
                invesWalletAddress={invesWalletAddress}
                investorName={investorName}
                vestingStartDate={vestingNonLinearStartDate}
                vestingEndDate={vestingNonLinearEndDate}
                projectId={projectId}
                show={showPopUpData}
                tgeMainDate={tgeDate}
                releaseTge={releaseTge}
                cliffMonths={cliffMonths}
                vestingMonths={vestingMonths}
                vestingDetails={vestingDetails}
                // totalTokens={nonLinearTotalToken}

                totalTokens={totalTokens}
                uploadMainData={uploadMainData}
                setInvestorName={setInvestorName}
                setTgeDate={setTgeDate}
                setVestingStartDate={setVestingNonLinearStartDate}
                setVestingEndDate={setVestingNonLinearEndDate}
                setReleaseTge={setReleaseTge}
                setCliffMonths={setCliffMonths}
                setVestingMonths={setVestingMonths}
                setTotalTokens={setTotalTokens}
                tokenTicker={tokenTicker}
                tokenContactAddress={tokenContactAddress}
                handleClose={showPopupClosefunc} />

            <CongPopupLaunch value="You Have Successfully Created the Vesting Schedule" show={showPopupLaunch} handleClose={handleCloseShowPopup} />
            <InvestorPopUp show={showInvestorPopup} investorNotExcData={investorNotExcData} handleClose={handleClosePopup} />
        </div >

    );
}


export default VestingPage;
