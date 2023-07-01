


import React, { useEffect, useState } from 'react';
import TokemomicsModal from './TokenomicsModal';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../config/config';
import { CanvasJSChart } from 'canvasjs-react-charts'
import './tokenomics.css'
import CountUp from 'react-countup';
import { Table } from 'antd';
import { Downloaddata } from './ExcelBudgetDownload';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { Button } from 'react-bootstrap';
import TokenomicsAddTable from './TokenomicsAddTable';
import EditTokenomicsAddTable from './EditTokenomicsAddTable';
import readXlsxFile from 'read-excel-file';
import writeXlsxFile from 'write-excel-file';

import CNYimaage from '../Funding/assets/images/CNY.png'
import usdimage from '../Funding/assets/images/USD.png'
import EURimage from '../Funding/assets/images/EUR.png'
import POUNDimage from '../Funding/assets/images/POUND.png'
import YUANimage from '../Funding/assets/images/YUAN.png'
import YENimage from '../Funding/assets/images/YEN.png'
import CADimage from '../Funding/assets/images/CAD.png'
import SGDimage from '../Funding/assets/images/SGD.png'
import AUDimage from '../Funding/assets/images/AUD.png'
import DAIimage from '../Funding/assets/images/DAI.png'
import BUSDimage from '../Funding/assets/images/BUSD.png'
import INRimage from '../Funding/assets/images/INR.png'
import USDCimage from '../Funding/assets/images/USDC.png'
import USDTimage from '../Funding/assets/images/USDT.png'
import RUBLEimage from '../Funding/assets/images/RUBBLE.png'

import { ToastContainer, toast } from 'material-react-toastify';
import { addFounder, isFounder } from '../../../../config/web3Client3';
import 'material-react-toastify/dist/ReactToastify.css';
const Tokenomics = () => {

    const hiddenFileInput2 = React.useRef(null);
    const [allTokenomicsDashboardData, setAllTokenomicsDashboardData] = useState([])
    const [checkData, setcheckData] = useState('')
    const [showPopupToken, setShowPopupToken] = useState(false)
    const [showEditPopupToken, setShowEditPopupToken] = useState(false)
    
    const [uSerRole, setUSerRole] = useState('')
    const [tokenContactLink, settokenContactLink] = useState('')
    const [EditPopuppercentage, setEditPopupPercentage] = useState(0)
    const [EditPopupnoOfTokens, setEditPopupnoOfTokens] = useState(0)
    const [EditPopupTokenPrice, setEditPopupTokenPrice] = useState(0)
    const [EditPopupValuation, setEditPopupValuation] = useState(0)
    const [EditPopupTgeRel, setEditPopupTgeRel] = useState(0)
    const [EditPopupCliffMonths, setEditPopupCliffMonths] = useState(0)
    const [EditPopupVesting, setEditPopupVesting] = useState(0)
    const [EditPopupDescrp, setEditPopupDescrp] = useState('')
    const [CurrencyType, setCurrencyType] = useState('')

    const [MainDatainToken, setMainDatainToken] = useState([])
    const [tokenStd1, settokenStd1] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)
    const [tokenTicker, settokenTicker] = useState('')
    const [tokenType, settokenType] = useState([])
    const [tokenTypeData, settokenTypeData] = useState(null)
    const [primaryNetwork, setprimaryNetwork] = useState('')
    const [tokenStd, settokenStd] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')
    const[ExternalPrimaryNetwork,setExternalPrimaryNetwork]=useState("")
    const [mydata, setMydata] = useState(
        []
    )

    const [mydata2, setMydata2] = useState([
        { name: "Unsatisfied", y: 5 },
    ])
    const projectNumber = useSelector((state) => state.constVar.projectId)
    const [expTokenGenerationj, setexpTokenGenerationj] = useState('')
    const [tokenSupply, settokenSupply] = useState('')
    const [tokenSupplyBreakup, settokenSupplyBreakup] = useState('')
    const [show, setShow] = useState(false)
    const [tokenContactAddress, settokenContactAddress] = useState('')
    const [TokenMinted, setTokenMinted] = useState('')
    const [primaryNet, setprimaryNet] = useState(true)
    const [DataforPopup, setDataforPopup] = useState([])
    const wallet_address = useSelector((state) => state.constVar.walletAddress)
    const inputArr = [
        {
            category: '',
            value: 0
        }
    ];

    const [arr, setArr] = useState(inputArr);

    const addInput = () => {
        setArr(s => {
            return [
                ...s,
                {
                    value: 0,

                    category: '',
                }
            ];
        });
    };
    const setTokenMintedFunc= (e) => {
            setTokenMinted(e === "true" ? true : (e === "" ? "" : false));
    }

    const handleChangeValue = e => {
        // e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            var num = e.target.value
            newArr[index].value = parseInt(num);

            return newArr;
        });
    };
    const handleChangeName = e => {
        // e.preventDefault();

        const index = e.target.id;
        setArr(s => {
            const newArr = s.slice();
            newArr[index].category = e.target.value;

            return newArr;
        });
    };


    const [piedata, setPieData] = useState([
        // { name: "Unsatisfied", y: 5 },
        // { name: "Very Unsatisfied", y: 31 },
        // { name: "Very Satisfied", y: 40 },
        // { name: "Satisfied", y: 17 },
        // { name: "Neutral", y: 7 }
    ])


    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        getTokenDetailFunc()
        setShow(false)
    }

    const showUpToken = () => {
        setShowPopupToken(true)
    }


    const closePopupToken = () => {
        setShowPopupToken(false)
    }
    const closeEditPopupToken = () => {
        setShowEditPopupToken(false)
    }
   
    

    const getTokenDetailFunc = () => {
        try {
            var query = `
            query AllProjectFundings($project: ID, $id: ID) {
                allTokenomics(project: $project) {
                  _id
                  token_ticker
                  token_type {
                    value
                  }
                  contract_link
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
                  token_minted
                }
                allProjectFunding(project: $project) {
                  currency
                }
                getUser(_id: $id) {
                  role
                  
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
                        "id":loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allTokenomics != null && data?.data?.allTokenomics != undefined && data?.data?.allTokenomics.length > 0) {
                        getTokenomicsDataFunc(data?.data?.allTokenomics[0]._id)
                        
                        setcheckData(data?.data?.allTokenomics[0]._id)
                        settokenTicker(data?.data?.allTokenomics[0].token_ticker)
                        if(data?.data?.allTokenomics[0]?.primary_network !="Ethereum" 
                        && data?.data?.allTokenomics[0]?.primary_network !="Polygon" 
                        && data?.data?.allTokenomics[0]?.primary_network !="Binance" 
                        && data?.data?.allTokenomics[0]?.primary_network !="Avalanche" 
                        && data?.data?.allTokenomics[0]?.primary_network !="AME" 
                        && data?.data?.allTokenomics[0]?.primary_network !="Fantom" 
                        )
                        {
                            // console.log("validation primary network :",ExternalPrimaryNetwork)
                            setprimaryNet(false);
                        }
                        setprimaryNetwork(data?.data?.allTokenomics[0].primary_network)
                        setExternalPrimaryNetwork(data?.data?.allTokenomics[0].primary_network)
                        settokenStd(data?.data?.allTokenomics[0].token_standard)
                        setpublicLaunchPrice(data?.data?.allTokenomics[0].public_launch_price)
                        setexpTokenGenerationj(data?.data?.allTokenomics[0].expected_token_generation_event)
                        settokenSupply(data?.data?.allTokenomics[0].total_token_supply)
                        settokenContactLink(data?.data?.allTokenomics[0].contract_link)
                        settokenContactAddress(data?.data?.allTokenomics[0].contract_address)
                        setTokenMinted(data?.data?.allTokenomics[0].token_minted)
                        setDataforPopup(data?.data?.allTokenomics)
                        setArr(data?.data?.allTokenomics[0].token_supply_breakup)

                        // setMapchart()

                        if (data?.data?.allTokenomics[0].token_type.length > 0) {

                            var arrtype = [];
                            for (var i = 0; i < data?.data?.allTokenomics[0].token_type.length; i++) {
                                // console.log(i, data?.data?.allTokenomics[0].token_type.length, data?.data?.allTokenomics[0].token_type[i].value);
                                arrtype.push({
                                    value: data?.data?.allTokenomics[0]?.token_type[i].value,
                                    label: data?.data?.allTokenomics[0]?.token_type[i].value,
                                    color: "#FFC400"
                                })

                            }

                            settokenType(arrtype)
                        }
                    } else {
                        setAllTokenomicsDashboardData([])
                        setcheckData('')
                        setDataforPopup([])
                    }

                    if (data?.data?.allProjectFunding != null && data?.data?.allProjectFunding != undefined && data?.data?.allProjectFunding.length > 0) {
                        setCurrencyType(data?.data?.allProjectFunding[0].currency)
                    } else {
                        setCurrencyType('')
                    }
                    if(data?.data?.getUser != null && data?.data?.getUser != undefined && data?.data?.getUser != ''){
                        setUSerRole(data?.data?.getUser?.role)
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    const getTokenomicsDataFunc = (i) => {
        try {
            var query = `
            query AllTokenomics($tokenomics: ID) {
                allTokenomicsData(tokenomics: $tokenomics) {
                  _id
                  description
                  percentage
                  no_of_tokens
                  token_price
                  valuation
                  tge_release
                  cliff
                  vesting
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

                        "tokenomics": i,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allTokenomicsData != null && data?.data?.allTokenomicsData != undefined && data?.data?.allTokenomicsData.length > 0) {

                        setAllTokenomicsDashboardData(data?.data?.allTokenomicsData)

                        if (data?.data?.allTokenomicsData.length > 0) {
                            var tokenarr = [];
                            for (var i = 0; i < data?.data?.allTokenomicsData.length; i++) {
                                tokenarr.push({
                                    id: i,
                                    name: data?.data?.allTokenomicsData[i].description,
                                    y: data?.data?.allTokenomicsData[i].percentage

                                })

                            }


                            setMydata(tokenarr)
                        } else {

                            setMydata([])
                        }
                    } else {
                        // setcheckData('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    useEffect(() => {
        // console.log(loginId, "funding Log1");
        if (loginId != '') {
            getTokenDetailFunc()

       
            // console.log(loginId, "funding Log2");
        }
 
        

    }, [loginId])

    const changeNewData = () =>{
        // console.log(DataforPopup,"DataforPopup");
        if(DataforPopup.length > 0 ){
            updateTokenFunc()
        }
        else{
             createTokenFunc()
        }
    }

    const updateTokenFunc = () => {
        // console.log(tokenType, "tokenTypeData");
        var arrtype = [];

        for (var i = 0; i < tokenType.length; i++) {
            arrtype.push({
                value: tokenType[i].value,

            })
        }

        // console.log("1234",TokenMinted !== "",TokenMinted,"TokenMinted cehck")
        // // if(tokenSupply != '' &&  tokenTicker != '' &&      projectNumber  != '' &&  primaryNetwork != '' &&   expTokenGenerationj != '' ){
        if(tokenSupply != '' && tokenTicker != '' && projectNumber  != '' 
            &&  primaryNetwork != '' && expTokenGenerationj != '' && TokenMinted !== ""){
    
            if(tokenSupply == 0) {
                alert("Token Supply cannot be Zero")
            }
            else{
        try {
            var query = `
            mutation Mutation($id: ID, $input: TokenomicsInput) {
                updateTokenomics(_id: $id, input: $input) {
                  _id
                  token_ticker
                  token_type {
                    value
                  }
                  primary_network
                  token_standard
                  public_launch_price
                  expected_token_generation_event
                  total_token_supply
                  token_minted
                  token_supply_breakup {
                    category
                    value
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

                        "id": checkData,
                        "input": {
                            "total_token_supply": parseFloat(tokenSupply),
                            "token_type": arrtype,
                            "token_supply_breakup": arr,
                            "token_ticker": tokenTicker,
                            "token_standard": tokenStd,
                            "public_launch_price": parseFloat(publicLaunchPrice),
                            "project": projectNumber,
                            "primary_network": primaryNetwork == null ? ExternalPrimaryNetwork : primaryNetwork,
                            "expected_token_generation_event": expTokenGenerationj,

                            "token_minted": TokenMinted,
                            "contract_address": tokenContactAddress,
                            "contract_link": tokenContactLink

                        },
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    getTokenDetailFunc()
                    handleCloseShow()
                })


        } catch (error) {
            console.log("adding new projectDetail error");
            }
        }
        }else
        {
        alert("Please Fill all the required fields")
        }
    }

    const addFounderFunc = async () => { // save founder wallet address in web3
        const userData = JSON.parse(localStorage.getItem('userAccount'));
        let isExist = await isFounder(userData.provider, wallet_address);
        if (isExist) {
            // console.log('Founder already exist');
            return Promise.resolve('Founder already exist');
        } else {
            return addFounder(userData.provider, wallet_address);
        }
    }

    const createTokenFunc = async () => {

        if(tokenSupply != '' && tokenTicker != '' && projectNumber  != '' 
        &&  primaryNetwork != '' && expTokenGenerationj != '' ){

            if(tokenSupply == 0) {
                alert("Token Supply cannot be Zero")
            }
            else{

        var arrtype = [];

        for (var i = 0; i < tokenType.length; i++) {
            arrtype.push({
                value: tokenType[i].value,
            })
        }


        var tokentrue = false
        var contadd = ''
        var contLink = ''
        if (TokenMinted) {
            tokentrue = true
            contadd = tokenContactAddress
            contLink = tokenContactLink
        } else {
            tokentrue = false
            contadd = ''
            contLink = ''
        }


        try {
            var query = `
                        mutation Mutation($input: TokenomicsInput) {
                            createTokenomics(input: $input) {
                            _id
                            token_ticker
                            token_type {
                                value
                            }
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
                            "total_token_supply": parseFloat(tokenSupply),
                            "token_type": arrtype,
                            "token_supply_breakup": arr,
                            "token_ticker": tokenTicker,
                            "token_standard": tokenStd,
                            "public_launch_price": publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice != '' ? parseFloat(publicLaunchPrice) : 0,
                            "project": projectNumber,
                            "primary_network": primaryNetwork == null ? ExternalPrimaryNetwork : primaryNetwork,
                            "expected_token_generation_event": expTokenGenerationj,
                            "contract_address": contadd,
                            "token_minted": tokentrue,
                            "contract_link": contLink
                        }

                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    getTokenDetailFunc()
                    handleCloseShow()
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }
        // })
        // .catch((err) => {
        //     console.log(err);
        //     alert(err.message);
        // })
        // } else {
        //     alert("Please connect to Metamask or Coinbase wallet")
        // }
            }
        }
        else{
            alert("Please Fill all the required fields")
        }
        
    }

    const options = {
        animationEnabled: true,
        background: '#f8fbff',
        theme: "light2",
        title: {
            text: "Token Supply Break Up",
            fontSize: 20,
            // verticalAlign: "bottom",
            dockInsidePlotArea: true
        },
        // subtitles: [{
        //     text: "71% Positive",
        //     verticalAlign: "center",
        //     fontSize: 24,
        //     dockInsidePlotArea: true
        // }],
        data: [{
            type: "doughnut",
            radius: "90%",  //change the radius here.
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: mydata,
        }]
    }





    const createTokenUploadFunc = (i) => {
        // console.log("Setttt");
        try {
            var query = `
          mutation CreateTokenomicsData($input: TokenomicsDataInput) {
            createTokenomicsData(input: $input) {
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
                            "tokenomics": DataforPopup[0]._id,
                            "description": i[0],
                            "percentage": i[1],
                            "no_of_tokens": i[2],
                            "token_price": i[3],
                            "valuation": i[4],
                            "tge_release": i[5],
                            "cliff": i[6],
                            "vesting": i[7],
                        }
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    // console.log("gettt", data);
                    getTokenDetailFunc()
                })


        } catch (error) {
            console.log("adding new projectDetail error");
        }


    }




    const columns = [

        {
            title: 'Description',
            dataIndex: 'description',

            sorter: (a, b) => a?.description.localeCompare(b?.description),
            align: 'center',
            // sorter: (a, b) => a.mainExpenseHead.length - b.mainExpenseHead.length,
        },
        {
            title: 'Percentage',


            render: (text, record) => (
                <div>
                    {`${text?.percentage}%`}
                </div>
            ),
            // dataIndex: 'percentage',
            sorter: (a, b) => a?.percentage - b?.percentage,
            align: 'center',
        },

        {
            title: 'Number of Tokens',
            // dataIndex: 'no_of_tokens',
            render: (text, record) => (
                <div>

                    {Number(text?.no_of_tokens).toLocaleString("en-US")}
                </div>
            ),
            sorter: (a, b) => a?.no_of_tokens - b?.no_of_tokens,
            // sorter: (a, b) => a.ExpensePerCycle.length - b.ExpensePerCycle.length,
            align: 'center',
        },
        {
            title: 'Token Price',
            // dataIndex: 'token_price',
            render: (text, record) => (
                <div>
                    {
                        Number(text?.token_price).toLocaleString("en-US")}
                </div>
            ),

            sorter: (a, b) => a?.token_price - b?.token_price,
            // sorter: (a, b) => a.unit.length - b.unit.length,
            align: 'center',
        },
        {
            title: 'Valuation',
            // dataIndex: 'valuation',
            render: (text, record) => (
                <div>
                    {/* {text?.valuation} */}
                    {
                        Number(text?.valuation).toLocaleString("en-US")}
                </div>
            ),
            sorter: (a, b) => a?.valuation - b?.valuation,
            // sorter: (a, b) => a.frequency.length - b.frequency.length,
            align: 'center',
        },
        {
            title: 'TGE Release',
            // dataIndex: 'tge_release',

            render: (text, record) => (
                // <div>
                //     {`${text?.tge_release}%`}
                // </div>
                <div>
                    {/* {text?.valuation} */}
                    {text?.tge_release != '' && text?.tge_release != null && text?.tge_release != undefined ?
                        `${Number(text?.tge_release).toLocaleString("en-US")}%`
                        :
                        <></>
                    }
                    {/* {  
                Number(text?.tge_release).toLocaleString("en-US")
                } */}
                </div>
            ),
            sorter: (a, b) => a?.tge_release - b?.tge_release,
            // sorter: (a, b) => a.expcycle.length - b.expcycle.length,
            align: 'center',
        },

        {
            title: 'Cliff',
            // dataIndex: 'cliff',
            render: (text, record) => (
                <div>
                    {text?.cliff != '' && text?.cliff != null && text?.cliff != undefined ?
                        Number(text?.cliff).toLocaleString("en-US")
                        :
                        <></>
                    }

                </div>
            ),
            sorter: (a, b) => a?.cliff - b?.cliff,
            // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
            align: 'center',
        },

        {
            title: 'Vesting',
            // dataIndex: 'vesting',
            render: (text, record) => (
                <div>
                    {text?.vesting != '' && text?.vesting != null && text?.vesting != undefined ?
                        Number(text?.vesting).toLocaleString("en-US")
                        :
                        <></>
                    }

                </div>
            ),
            sorter: (a, b) => a?.vesting - b?.vesting,
            // sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
            align: 'center',
        },

        {
            title: 'Options',
            //   dataIndex: 'balance',
            // sorter: (a, b) => a.balance.length - b.balance.length,
            align: 'center',

            render: (text, record) => (
                // <strong>{text}</strong>
                // style={{ padding: '0px ', fontSize: '17px', height: '30px', borderRadius: '15px ', width: '60px', marginRight: '10px' }} 
                // style={{ padding: '0px ', fontSize: '17px', height: '30px', borderRadius: '15px ', width: '60px', marginLeft: '10px' }}
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <Button style={{ padding: '0px ', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px' }} onClick={() => showMainDataPopup(text)}><i className="fa fa-pencil" /></Button>
                    <Button style={{ padding: '0px ', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '10px' }} onClick={() => deleteFunc(text._id)}><i className="fa fa-trash"></i></Button>

                </div>
            ),
        },


    ]


    const showMainDataPopup = (i) => {
        setShowEditPopupToken(true)
        // console.log(i);
        setEditPopupPercentage(i.percentage)
        setEditPopupnoOfTokens(i.no_of_tokens)
        setEditPopupTokenPrice(i.token_price)
        setEditPopupValuation(i.valuation)
        setEditPopupCliffMonths(i.cliff)
        setEditPopupTgeRel(i.tge_release)
        setEditPopupVesting(i.vesting)
        setEditPopupDescrp(i.description)
        setMainDatainToken([i])
    }


    const deleteFunc = (i) => {

        try {


            var query = `
            mutation DeleteTokenomicsData($id: ID) {
                deleteTokenomicsData(_id: $id) {
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
                        "id": i
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.deleteTokenomicsData != null && data?.data?.deleteTokenomicsData != undefined) {
                        getTokenDetailFunc()

                        toast.success('Successfully Deleted', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {
                        alert('please check the details')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const downloadBugetDatafunc = async () => {
        await writeXlsxFile(Downloaddata, {
            // (optional) column widths, etc.
            fileName: 'tokenomics.xlsx'
        })
    }

    const handleClickFile2 = event => {
        hiddenFileInput2.current.click();
    };


    const uploadExcelData = (event) => {
        // e.preventDefault();
        // console.log(e,"event");
        const item = event.target.files[0];
        if (item.type == 'application/vnd.xlsx' || item.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

            // console.log(item, "item");
            readXlsxFile(item).then((rows) => {
                // console.log("upload document data", rows);
                // var
                for (var i = 1; i < rows.length; i++) {
                    createTokenUploadFunc(rows[i])
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

    const opennewWindow = (i) => {
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }
  
   

    return (

        <div className="card card-table" style={{ margin: '0px', border: 'none', background: "none" }}>
            {/* padding: '10px'  */}
            <div className="card-body" style={{ padding: '0px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    {/* margin: '10px'  */}
                    <div className="profile-view" style={{ margin: '0px' }}>


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Tokenomics
                        {
                            uSerRole == 'Co-Founder' ?
                            <></>
                            :

                            <button className="edit-icon-2" onClick={() => handleShow()}><i className="fa fa-pencil" /></button>
                        }</h2>
                        <div className="" style={{ display: 'flex' }}>

                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" style={{ padding: '0px' }}>
                                <div className="row">

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5 mb-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {tokenTicker != null && tokenTicker != undefined && tokenTicker}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box ft-weight">Token Ticker </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>
                                                    {/* 112 */}
                                                    <div style={{ display: "flex" }}>


                                                        {/* {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                        {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                        {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                        {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                                                        {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                        {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                        {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                        {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                        {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                        {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                        {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                        {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                        {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                        {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                        {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}
                                                         */}

                                                        <h3 className="mainFontH5 ml-2 mb-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                            {tokenSupply != null && tokenSupply != undefined &&

                                                                Number(tokenSupply).toLocaleString("en-US")
                                                            }

                                                            {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                        </h3>  </div>


                                                </div>
                                                <span className="widget-box ft-weight">Total Token Supply </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>

                                                    <div style={{ display: "flex" }}>
                                                        {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> : ""}
                                                        {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> : ""}
                                                        {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> : ""}
                                                        {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> : ""}
                                                        {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> : ""}
                                                        {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> : ""}
                                                        {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> : ""}
                                                        {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> : ""}
                                                        {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> : ""}
                                                        {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> : ""}
                                                        {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> : ""}
                                                        {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> : ""}
                                                        {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> : ""}
                                                        {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> : ""}
                                                        {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""}

                                                        {/* 112 */}
                                                        <h3 className="mainFontH5 ml-2 mb-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                            {publicLaunchPrice != null && publicLaunchPrice != undefined &&

                                                                Number(publicLaunchPrice).toLocaleString("en-US")
                                                            }

                                                            {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                        </h3></div>


                                                </div>
                                                <span className="widget-box ft-weight">Public Launch Price </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5 mb-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {expTokenGenerationj != null && expTokenGenerationj != undefined && expTokenGenerationj}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box ft-weight">Expected Token Generation Event</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5 mb-2 " style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {tokenStd != null && tokenStd != undefined && tokenStd}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box ft-weight">Token Standard</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new" style={{minHeight:'23px'}}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5 mb-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {primaryNetwork != null && primaryNetwork != undefined && primaryNetwork}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box ft-weight">Primary Network</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    {/* ////////////////// */}




                                </div>

                                {/* <div className="col-xl-7 col-md-6 col-sm-12 pl-4" style={{ display: "flex", marginBottom: '40px' }}> */}
                                <div className="row">
                                    <div className="col">

                                        {/* <div className="row" > */}

                                        <div className="" style={{ width: '100%', padding: '5px' }}>
                                            <table style={{ width: '100%', border: 'none' }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }} className="ft-weight">Token Type</td>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                                            {tokenType != null && tokenType != undefined && tokenType?.length > 0 ?
                                                                <div style={{ display: 'flex' }}>

                                                                    {tokenType.map((i) =>
                                                                        <div style={{ color: '#1890ff' }}>
                                                                            {i?.value},
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                : ''
                                                            }</td>
                                                    </tr>
                                                    {
                                                        TokenMinted == true ?
                                                            <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }} className="ft-weight">Token Contract</td>
                                                                <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }} onClick={()=>opennewWindow(tokenContactLink)}>{tokenContactAddress != null && tokenContactAddress != undefined && tokenContactAddress}</td>

                                                            </tr>
                                                            :
                                                            <></>
                                                    }
                                                    
                                                    {/* {
                                                        TokenMinted == true ?
                                                        <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Contract Address</td>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff',cursor:'pointer' }} onClick={()=>opennewWindow(tokenContactLink)}>{tokenContactLink != null && tokenContactLink != undefined && tokenContactLink}</td>

                                                    </tr>
                                                    :
                                                    <></>
                                                     } */}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* </div> */}
                                </div>
                                {/* </div> */}
                            </div>

                            {mydata.length > 0 ?

                                <div style={{ width: '50%', height: '500px' }}>
                                    <CanvasJSChart options={options} height="100%" width="100%" />
                                </div>
                                :
                                ''
                            }
                        </div>
                        {/* <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div> */}

                    </div>

                </div>


                <div className="col-md-12" style={{ padding: '0px', marginBottom: '15px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                            <div className="search">
                                <input
                                    placeholder="Search"
                                    style={{ width: '300px', minHeight: '35px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px 0px' }}
                                // value={value}
                                // onChange={e => setValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-auto float-right ml-auto" style={{ padding: '0px' }} >
                            <button className="btn add-btn2" style={{ margin: '0px 0px 0px 10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => downloadBugetDatafunc()}> DOWNLOAD SAMPLE FORMAT</button>
                            <button className="btn add-btn2" style={{ margin: '0px 0px 0px 10px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => handleClickFile2()}>UPLOAD FILE</button>
                            <input
                                type="file"
                                ref={hiddenFileInput2}
                                onChange={uploadExcelData}
                                style={{ display: 'none' }}
                            />
                            <button className="btn add-btn2" style={{ borderRadius: '2px', marginBottom: '0px', width: '85px' }} onClick={() => showUpToken()}> ADD</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12" style={{ padding: '0px' }}>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-table flex-fill" style={{ margin: '0px', border: 'none' }}>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table className="table-striped"
                                            pagination={{
                                                total: allTokenomicsDashboardData.length,
                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }}
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            // bordered
                                            dataSource={allTokenomicsDashboardData}
                                            rowKey={record => record.id}
                                        // onChange={this.handleTableChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style={{marginTop:'40px',textAlign:'end'}}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
            <TokemomicsModal
                tokenContactLink={tokenContactLink}
                settokenContactLink={settokenContactLink}
                show={show}
                handleClose={handleCloseShow}
                checkData={checkData}
                setcheckData={setcheckData}
                tokenTicker={tokenTicker}
                settokenTicker={settokenTicker}
                tokenType={tokenType}
                settokenType={settokenType}
                primaryNetwork={primaryNetwork}
                setprimaryNetwork={setprimaryNetwork}
                tokenStd={tokenStd}
                settokenStd={settokenStd}
                publicLaunchPrice={publicLaunchPrice}
                setpublicLaunchPrice={setpublicLaunchPrice}
                expTokenGenerationj={expTokenGenerationj}
                setexpTokenGenerationj={setexpTokenGenerationj}
                tokenSupply={tokenSupply}
                settokenSupply={settokenSupply}
                tokenSupplyBreakup={tokenSupplyBreakup}
                settokenSupplyBreakup={settokenSupplyBreakup}
                updateTokenFunc={updateTokenFunc}
                createTokenFunc={createTokenFunc}
                changeNewData={changeNewData}
                tokenTypeData={tokenTypeData}
                settokenTypeData={settokenTypeData}
                handleChangeValue={handleChangeValue}
                handleChangeName={handleChangeName}
                addInput={addInput}
                arr={arr}
                tokenContactAddress={tokenContactAddress}
                settokenContactAddress={settokenContactAddress}
                TokenMinted={TokenMinted}
                setTokenMinted={setTokenMintedFunc}
primaryNet={primaryNet}
setprimaryNet={setprimaryNet}
setExternalPrimaryNetwork ={setExternalPrimaryNetwork}
ExternalPrimaryNetwork={ExternalPrimaryNetwork}

            />

            <EditTokenomicsAddTable




                setPercentage={setEditPopupPercentage}
                percentage={EditPopuppercentage}
                noOfTokens={EditPopupnoOfTokens}
                setnoOfTokens={setEditPopupnoOfTokens}
                TokenPrice={EditPopupTokenPrice}
                setTokenPrice={setEditPopupTokenPrice}
                Valuation={EditPopupValuation}
                setValuation={setEditPopupValuation}
                TgeRel={EditPopupTgeRel}
                setTgeRel={setEditPopupTgeRel}
                CliffMonths={EditPopupCliffMonths}
                setCliffMonths={setEditPopupCliffMonths}
                Vesting={EditPopupVesting}
                setVesting={setEditPopupVesting}
                Descrp={EditPopupDescrp}
                setDescrp={setEditPopupDescrp}

                handleClose={closeEditPopupToken} show={showEditPopupToken} DataforPopup={DataforPopup} MainDatainToken={MainDatainToken} getTokenDetailFunc={getTokenDetailFunc} />

            <TokenomicsAddTable handleClose={closePopupToken} show={showPopupToken} DataforPopup={DataforPopup} getTokenDetailFunc={getTokenDetailFunc} />



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


    );
}
export default Tokenomics;
