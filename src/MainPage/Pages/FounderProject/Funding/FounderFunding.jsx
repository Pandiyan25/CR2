
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../../../config/config';
import FundingModal from './FundingModal';
import { useSelector,useDispatch } from 'react-redux';

import DepositTokenPage from './DepositTokenPage';
import { CanvasJSChart } from 'canvasjs-react-charts'
import writeXlsxFile from 'write-excel-file'
import { Downloaddata } from './ExcelBudgetDownload';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import { website } from "../../../../Entryfile/imagepath"

import readXlsxFile from 'read-excel-file'
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { itemRender, onShowSizeChange } from '../../../paginationfunction';
import { Button } from 'react-bootstrap';
import FundingTablePopup from './FundingTablePopup';
import FundingEditPopup from './FundingEditPopup';



import CNYimaage from './assets/images/CNY.png'
import usdimage from './assets/images/USD.png'
import EURimage from './assets/images/EUR.png'
import POUNDimage from './assets/images/POUND.png'
import YUANimage from './assets/images/YUAN.png'
import YENimage from './assets/images/YEN.png'
import CADimage from './assets/images/CAD.png'
import SGDimage from './assets/images/SGD.png'
import AUDimage from './assets/images/AUD.png'
import DAIimage from './assets/images/DAI.png'
import BUSDimage from './assets/images/BUSD.png'
import INRimage from './assets/images/INR.png'
import USDCimage from './assets/images/USDC.png'
import USDTimage from './assets/images/USDT.png'
import RUBLEimage from './assets/images/RUBBLE.png'

const FounderFunding = ({disableTokenomics,setdisableTokenomics}) => {
    const path = "/src/MainPage/Pages/FounderProject/Funding/assets/images/";
    const [mydata, setMydata] = useState(
        []
    )
    const dispatch = useDispatch();
    const [FundingId, setFundingId] = useState('')
    const [leadI, setleadI] = useState(true)
    const [ExternalLeadName, setExternalLeadName] = useState('')
    const [leadIEdit, setleadIEdit] = useState(true)
    const [userRole, setUserRole] = useState('')

    const [indexCountforSlect, setindexCountforSlect] = useState(0)
    const hiddenFileInput2 = React.useRef(null);
    const [investorEdit, setInvestorEdit] = useState('')
    const [pricePerTokenEdit, setpricePerTokenEdit] = useState(0)
    const [InvestmentEdit, setInvestmentEdit] = useState(0)
    const [roundEdit, setRoundEdit] = useState(0)
    const [tokenAllotedEdit, setTokenAllotedEdit] = useState(0)
    const [perOfSupplyEdit, setperOfSupplyEdit] = useState(0)
    const [websiteEdit, setWebsiteEdit] = useState('')
    const [categoryEdit, setCategoryEdit] = useState('')
    const [CurrencyType, setCurrencyType] = useState('')
    const [extenalInvesName, setExtenalInvesName] = useState('')


    console.log(CurrencyType, "CurrencyType");
    const [showEditPage, setShowEditPage] = useState(false)
    const [showFundingTable, setshowFundingTable] = useState(false)
    const [show, setShow] = useState(false)
    const [currencyImage, setcurrencyImage] = useState();



    const handleShow = () => {
        const countries = [
            // { value: "USD", label: "USD" },
            // { value: "SDT", label: "SDT"
            // { value: "INR", label: "INR"},
            { value: "USDC", label: "USDC" },
            { value: "DAI", label: "DAI" },
            { value: "BUSD", label: "BUSD" },
            // { value: "RUBLE", label: "RUBLE" },
            // { value: "CAD", label: "CAD" },
            // { value: "GBP", label: "GBP",
            // { value: "AED", label: "AED",
            // { value: "CNY", label: "CNY" },
            // { value: "VMD", label: "VMD",
            // { value: "EURO", label: "EURO" },
            // { value: "POUND", label: "POUND" },
            // { value: "YUAN", label: "YUAN" },
            // { value: "INR", label: "INR" },
            // { value: "YEN", label: "YEN" },
            // { value: "SGD", label: "SGD" },
            // { value: "AUD", label: "AUD" },
            { value: "USDT", label: "USDT" },
            // { value: "YEN", label: "YEN",

        ]
        if (CurrencyType != '' && CurrencyType != null && CurrencyType != undefined) {
            var indexCount = countries.findIndex((element) => element.value == CurrencyType)
            console.log(indexCount, "indexCount");
            setindexCountforSlect(indexCount)
            setShow(true)
        } else {

            setindexCountforSlect(0)
            setShow(true)
        }
    }
    const handleCloseShow = () => {
        setShow(false)
        getFundingDataFunc()
    }
    const [depositToken, setDepositToken] = useState(false)

    const [checkData, setcheckData] = useState('')
    const [totalFundRaise, setTotalFundRaise] = useState(0)


    const [fundRaiseTillDate, setfundRaiseTillDate] = useState(0)
  const [modeOfFunding, setModeOfFunding] = useState("");
  const [isIncubated, setisIncubated] = useState(false)
  const [receivedGrants, setReceivedGrants] = useState(false)
  const [IncubatorName, setIncubatorName] = useState("")
  const [IncubatorWebsite, setIncubatorWebsite] = useState("")
  const [GrantsName, setGrantsName] = useState("")
  const [GrantsLink, setGrantsLink] = useState("")

    const [noofInvestorstilldate, setnoofInvestorstilldate] = useState(0)
    const [leadInvestor, setleadInvestor] = useState(null)
    const [showLeadInvestor, setShowLeadInvestor] = useState('')

    console.log(totalFundRaise, "totalFundRaise");
    const [tokenStd1, setTokenStd1] = useState([])
    const [stateOfFunding, setstateOfFunding] = useState('')

    const walletAddress = useSelector((state) => state.constVar.walletAddress)
  
    // const [walletAddress, setwalletAddress] = useState('')
    const [WalletNetwork, setWalletNetwork] = useState('')
    const loginId = useSelector((state) => state.constVar.loginId)
    const projectNumber = useSelector((state) => state.constVar.projectId)



    const handleCloseFundingTable = () => {
        setshowFundingTable(false)
    }
    const handleCloseEditFunding = () => {

        setShowEditPage(false)
    }

    const showFundingTablefunc = () => {
        setshowFundingTable(true)
    }

    const getFundingDataFunc = () => {
        try {
            var query = `
            query AllProjectFundings($project: ID, $id: ID) {
                allProjectFunding(project: $project) {
                  _id
                  total_fund_raise_target
                  fund_raised
                  number_of_investors
                  stage_of_funding
                  primary_funding_wallet_address_network
                  primary_funding_wallet_address
                  isGrants
                  grants_name
                  grants_proof
                  incubator_website
                  incubator_name
                  isIncubated
                  mode_of_funding
                  lead_investor {
                    _id
                    first_name
                    last_name
                    fund_name
                  }
                  project {
                    _id
                  }
                  currency
                  external_lead_investor
                }
              
                allProjectFundingData(project: $project) {
                  _id
              
                  investor_round
                  price_per_token
                  investment
                  investment_round
                  tokens_alloted
                  percentage_of_supply
                  website
                  category
              
                  investor {
                    _id
                    first_name
                    last_name
                    fund_name
                  }
                  project {
                    _id
                  }
                  external_investor
                }
                getUser(_id: $id) {
                  _id
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
                        "id": loginId
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {

                    if (data?.data?.allProjectFunding != null && data?.data?.allProjectFunding != undefined && data?.data?.allProjectFunding?.length > 0) {
                        console.log(data?.data?.allProjectFunding[0]._id,"data fetch")
                        setcheckData(data?.data?.allProjectFunding[0]._id)
                        setTotalFundRaise(data?.data?.allProjectFunding[0].total_fund_raise_target)
                        setfundRaiseTillDate(data?.data?.allProjectFunding[0].fund_raised)
                        setnoofInvestorstilldate(data?.data?.allProjectFunding[0].number_of_investors)
                        setleadInvestor(data?.data?.allProjectFunding[0].lead_investor?._id)

                        
                        if (data?.data?.allProjectFunding[0].external_lead_investor != null && data?.data?.allProjectFunding[0].external_lead_investor != undefined && data?.data?.allProjectFunding[0].external_lead_investor != '') {
                            setleadI(false)
                        } else {
                            setleadI(true)
                        }
                        setExternalLeadName(data?.data?.allProjectFunding[0].external_lead_investor)

                        setstateOfFunding(data?.data?.allProjectFunding[0].stage_of_funding)
                        setShowLeadInvestor(data?.data?.allProjectFunding[0].lead_investor)
                        // setwalletAddress(data?.data?.allProjectFunding[0].primary_funding_wallet_address)
                        setWalletNetwork(data?.data?.allProjectFunding[0].primary_funding_wallet_address_network)
                        setModeOfFunding(data?.data?.allProjectFunding[0].mode_of_funding)
                        setisIncubated(data?.data?.allProjectFunding[0].isIncubated)
                        setReceivedGrants(data?.data?.allProjectFunding[0].isGrants)
                        setIncubatorName(data?.data?.allProjectFunding[0].incubator_name)
                        setIncubatorWebsite(data?.data?.allProjectFunding[0].incubator_website)
                        setGrantsName(data?.data?.allProjectFunding[0].grants_name)
                        setGrantsLink(data?.data?.allProjectFunding[0].grants_proof)
                        setCurrencyType(data?.data?.allProjectFunding[0].currency)
                        


                    } else {
                        setcheckData('')
                        setTotalFundRaise('')
                        setfundRaiseTillDate('')
                        setnoofInvestorstilldate('')
                        setleadInvestor(null)
                        setstateOfFunding('')
                        setExternalLeadName('')
                        // setwalletAddress(''ding_wallet_address)
                        setWalletNetwork('')
                        setCurrencyType('')
                    }
                    if (data?.data?.allProjectFundingData != null && data?.data?.allProjectFundingData != undefined && data?.data?.allProjectFundingData?.length > 0) {
                        setTokenStd1(data?.data?.allProjectFundingData)
                        var arr = [];
                        const initialValue = 0;
                        const sumWithInitial = data?.data?.allProjectFundingData.reduce(
                            (previousValue, currentValue) =>

                                previousValue + parseFloat(currentValue?.investment),
                            initialValue,

                        );
                        console.log(sumWithInitial, "sumWithInitial");

                        for (var map = 0; map < data?.data?.allProjectFundingData?.length; map++) {
                            if (data?.data?.allProjectFundingData[map].external_investor != null && data?.data?.allProjectFundingData[map].external_investor != undefined && data?.data?.allProjectFundingData[map].external_investor != '') {
                                arr.push({
                                    id: map,
                                    name: data?.data?.allProjectFundingData[map].external_investor,
                                    y: ((parseFloat(data?.data?.allProjectFundingData[map].investment) / sumWithInitial) * 100)
                                })
                            } else {
                                arr.push({
                                    id: map,
                                    name: data?.data?.allProjectFundingData[map].investor?.fund_name,
                                    y: ((parseFloat(data?.data?.allProjectFundingData[map].investment) / sumWithInitial) * 100)
                                })
                            }

                        }

                        console.log("sumWithInitialarr", arr);
                        setMydata(arr)
                    } else {
                        setTokenStd1([])
                    }

                    if (data?.data?.getUser != null && data?.data?.getUser != undefined && data?.data?.getUser != "") {
                        setUserRole(data?.data?.getUser?.role)
                    } else {

                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }


    const createFundingDetails = () => {
        if (totalFundRaise != '' && stateOfFunding != '' && walletAddress != '' && WalletNetwork != '') {

            try {
                var query = `mutation Mutation($input: FundingInput) {
                    createProjectFunding(input: $input) {
                      _id
                      project {
                        _id
                        user {
                          _id
                          email
                          password
                          role
                          contact
                          first_name
                          last_name
                          role_in_organization
                          fund_description
                          minimum_investment_size
                          project_invested
                          type_of_fund
                          preferred_sectors {
                            value
                          }
                          fund_name
                          asset_under_management
                          projected_invested_till_date
                          fund_head_quarters
                          team_size
                          linkedin
                          linkedin_link
                          website_link
                          twitter_link
                          education
                          experience
                          industry
                          experience_in_blockchain
                          current_position
                          past_organisation_tags
                          current_organisation
                          current_income
                          wallet_address
                          current_location
                          nationality
                          id_proof
                          self_description
                          id_number
                        }
                        email_id
                        first_name
                        last_name
                        linkedin_profile_link
                        project_name
                        project_description
                        nature_of_project
                        project_start_date
                        project_tags
                        project_stage
                        website_link
                        github_repository
                        whitepaper
                        one_pager_document
                        pitch_deck
                        number_of_founders
                        team_size
                      }
                      total_fund_raise_target
                      fund_raised
                      number_of_investors
                      
                      
                      stage_of_funding
                      primary_funding_wallet_address
                      primary_funding_wallet_address_network
                      lead_investor {
                        _id
                        email
                        first_name
                        last_name
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
                                "project": projectNumber,
                                "total_fund_raise_target": parseInt(totalFundRaise),
                                "fund_raised": parseInt(fundRaiseTillDate),
                                // "number_of_investors": parseInt(noofInvestorstilldate),
                                "lead_investor": leadInvestor,
                                "stage_of_funding": stateOfFunding,
                                "primary_funding_wallet_address_network": WalletNetwork,
                                "primary_funding_wallet_address": walletAddress,
                                "external_lead_investor": ExternalLeadName,
                                "currency": CurrencyType,
                            }

                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.createProjectFunding) {

                            toast.success('Created Successfully', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            getFundingDataFunc()
                            handleCloseShow()
                        }

                    })
            } catch (error) {
                console.log("create Funding Error");
            }
        } else {
            alert("Please fill all the mandatory fields")
        }
    }

    const updateFundingDetails = () => {
        if (totalFundRaise != '' && stateOfFunding != '' && walletAddress != '' && WalletNetwork != '') {
            try {
                var query = `mutation Mutation($id: ID, $input: FundingInput) {
                    updateProjectFunding(_id: $id, input: $input) {
                      _id
                      project {
                        _id
                        user {
                          _id
                          email
                          password
                          role
                          contact
                          first_name
                          last_name
                          role_in_organization
                          fund_description
                          minimum_investment_size
                          project_invested
                          type_of_fund
                          preferred_sectors {
                            value
                          }
                          fund_name
                          asset_under_management
                          projected_invested_till_date
                          fund_head_quarters
                          team_size
                          linkedin
                          linkedin_link
                          website_link
                          twitter_link
                          education
                          experience
                          industry
                          experience_in_blockchain
                          current_position
                          past_organisation_tags
                          current_organisation
                          current_income
                          wallet_address
                          current_location
                          nationality
                          id_proof
                          self_description
                          id_number
                        }
                        email_id
                        first_name
                        last_name
                        linkedin_profile_link
                        project_name
                        project_description
                        nature_of_project
                        project_start_date
                        project_tags
                        project_stage
                        website_link
                        github_repository
                        whitepaper
                        one_pager_document
                        pitch_deck
                        number_of_founders
                        team_size
                      }
                      total_fund_raise_target
                      fund_raised
                      number_of_investors
                      mode_of_funding
                      isGrants
                      isIncubated
                      grants_name
                      grants_proof
                      incubator_website
                     incubator_name
                      stage_of_funding
                      primary_funding_wallet_address
                      primary_funding_wallet_address_network
                      
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
                            "id": checkData,
                            "input": {
                                "currency": CurrencyType,
                                "project": projectNumber,
                                "total_fund_raise_target": parseInt(totalFundRaise),
                                // "total_fund_raise_target": totalFundRaise,
                                "fund_raised": parseFloat(fundRaiseTillDate),
                                // "number_of_investors": parseFloat(noofInvestorstilldate),
                                "lead_investor": leadInvestor,
                                "stage_of_funding": stateOfFunding,
                                "external_lead_investor": ExternalLeadName,
                                "primary_funding_wallet_address_network": WalletNetwork,
                                "primary_funding_wallet_address": walletAddress,
                                "mode_of_funding":modeOfFunding,
                                "isGrants":receivedGrants,
                                "isIncubated":isIncubated,
                                "grants_name":GrantsName,
                                "grants_proof":GrantsLink,
                                "incubator_website":IncubatorWebsite,
                                "incubator_name":IncubatorName
                                
                                
                            }
                        }

                    })
                })
                    .then((response) => {

                        const json = response.json();
                        return json;
                    })
                    .then(data => {
                        if (data?.data?.updateProjectFunding) {

                            toast.success('Updated Successfully', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                            getFundingDataFunc()
                            handleCloseShow()
                        }
                    })
            } catch (error) {
                console.log("create Funding Error");
            }
        } else {
            alert("Please fill all the mandatory fields")
        }

    }



    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getFundingDataFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])

    const depositWlletTokenfunc = () => {
        setDepositToken(true)
    }

    const handleCloseDepositfunc = () => {

        setDepositToken(false)
    }




    const columns = [

        {
            title: 'Investor',
            render: (text, record) => (
                // <strong>{text}</strong>
                text?.external_investor != null && text?.external_investor != undefined && text?.external_investor != '' ?

                    <div>
                        {text?.external_investor}
                    </div>
                    :
                    <div>
                        {text?.investor?.fund_name}
                    </div>
            ),
            sorter: (a, b) => a?.investor?.fund_name.localeCompare(b?.investor?.fund_name),
            align: 'center',
        },
        {
            title: 'Category',
            // dataIndex: 'investment',
            render: (text, record) => (
                <div>
                    {text?.category != '' && text?.category != null && text?.category != undefined ?
                        <div>{text?.category}</div>
                        :
                        <></>
                    }

                </div>
            ),

            sorter: (a, b) => a?.category.localeCompare(b?.category),

            align: 'center',
        },
        {
            title: 'Price Per Token',
            // dataIndex: 'price_per_token',
            render: (text, record) => (
                <div>
                    {text?.price_per_token != '' && text?.price_per_token != null && text?.price_per_token != undefined ?
                        Number(text?.price_per_token).toLocaleString("en-US")
                        :
                        <></>
                    }

                </div>
            ),

            sorter: (a, b) => a?.price_per_token - b?.price_per_token,
            align: 'center',
        },
        {
            title: 'Investment',
            // dataIndex: 'investment',
            render: (text, record) => (
                <div>
                    {text?.investment != '' && text?.investment != null && text?.investment != undefined ?
                        Number(text?.investment).toLocaleString("en-US")
                        :
                        <></>
                    }

                </div>
            ),

            sorter: (a, b) => a?.investment - b?.investment,

            align: 'center',
        },
        {
            title: 'Round',
            dataIndex: 'investment_round',
            sorter: (a, b) => a?.investment_round.localeCompare(b?.investment_round),
            align: 'center',
        },
        {
            title: 'Tokens Allotted',
            // dataIndex: 'tokens_alloted',
            render: (text, record) => (
                <div>
                    {text?.tokens_alloted != '' && text?.tokens_alloted != null && text?.tokens_alloted != undefined ?
                        Number(text?.tokens_alloted).toLocaleString("en-US")
                        :
                        <></>
                    }

                </div>
            ),
            sorter: (a, b) => a?.tokens_alloted - b?.tokens_alloted,
            // sorter: (a, b) => a.expcycle.length - b.expcycle.length,
            align: 'center',
        },

        {
            title: 'Percentage of Supply',
            // dataIndex: 'percentage_of_supply',
            render: (text, record) => (
                <div>
                    {text?.percentage_of_supply != '' && text?.percentage_of_supply != null && text?.percentage_of_supply != undefined ?
                        `${Number(text?.percentage_of_supply).toLocaleString("en-US")}%`
                        :
                        <></>
                    }

                </div>
            ),
            sorter: (a, b) => a?.percentage_of_supply - b?.percentage_of_supply,
            // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
            align: 'center',
        },

        // {
        //     title: 'Website',

        //     render: (text, record) => (

        //         <div className="mt-3" style={{ display: "flex", marginBottom: '25px', justifyContent: 'center' }}>
        //             {text?.website ?

        //                 <img className="sociallogo" src={website} onClick={() => { opennewWindowForDoc(text?.website) }}>
        //                 </img>
        //                 : ''
        //             }

        //         </div>
        //     ),
        //     align: 'center',
        // },

        {
            title: 'Options',
            //   dataIndex: 'balance',
            // sorter: (a, b) => a.balance.length - b.balance.length,
            align: 'center',
            width: '120px',
            render: (text, record) => (
                // <strong>{text}</strong>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>

                    {text?.website ?
                        <Button style={{ padding: '0px ', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px' }} onClick={() => { opennewWindowForDoc(text?.website) }}>
                            <i className="fa fa-globe" /></Button>

                        :
                        <>
                        </>
                    }
                    <Button style={{ padding: '0px ', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '5px' }} onClick={() => showMainDataPopup(text)}><i className="fa fa-pencil" /></Button>
                    <Button style={{ padding: '0px ', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '26px', marginLeft: '5px' }} onClick={() => deleteFunc(text._id)}><i className="fa fa-trash"></i></Button>

                </div>
            ),
        },


    ]

    const opennewWindowForDoc = (i) =>{
        
    console.log(i, "data for login");
    // window.open(`https://${i}`)
    window.open(i, '_blank').focus();
    }

    const showMainDataPopup = (i) => {
        setFundingId(i?._id)
        setInvestorEdit(i?.investor?._id)
        setpricePerTokenEdit(i?.price_per_token)
        setInvestmentEdit(i?.investment)
        setRoundEdit(i?.investment_round)
        setTokenAllotedEdit(i?.tokens_alloted)
        setperOfSupplyEdit(i?.percentage_of_supply)
        setWebsiteEdit(i?.website)
        setCategoryEdit(i?.category)
        setShowEditPage(true)
        if (i?.external_investor != null && i?.external_investor != undefined && i?.external_investor != '') {
            setleadIEdit(false)
        } else {
            setleadIEdit(true)
        }
        setExtenalInvesName(i?.external_investor)
    }


    const openwebsite = (i) => {
        console.log(i, "sss");
        // window.open(`https://${i}`)
        window.open(i, '_blank').focus();
    }


    const deleteFunc = (i) => {

        try {


            var query = `
            mutation Mutation($id: ID) {
                deleteProjectFundingData(_id: $id) {
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
                    if (data?.data?.deleteProjectFundingData != null && data?.data?.deleteProjectFundingData != undefined) {
                        getFundingDataFunc()
                    } else {
                        alert('please check the details')
                    }

                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }

    const downloadFunc = async () => {
        await writeXlsxFile(Downloaddata, {
            // (optional) column widths, etc.
            fileName: 'funding.xlsx'
        })
    }


    const options = {
        animationEnabled: true,
        background: '#f8fbff',
        theme: "light2",
        title: {
            text: "Investors",
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

    const handleClickFile2 = event => {
        hiddenFileInput2.current.click();
    };


    const uploadExcelData = (event) => {
        // e.preventDefault();
        // console.log(e,"event");
        const item = event.target.files[0];
        if (item.type == 'application/vnd.xlsx' || item.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

            console.log(item, "item");
            readXlsxFile(item).then((rows) => {
                console.log("upload document data", rows);
                // var
                for (var i = 1; i < rows?.length; i++) {
                    // createTokenUploadFunc(rows[i])
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

    if( modeOfFunding =="Equity"){
        console.log("equity");
        setdisableTokenomics(true);
    }else{
        setdisableTokenomics(false);
    }

    return (

        <div className="card card-table" style={{ margin: '0px', border: 'none', background: 'transparent' }}>

            <div className="card-body" style={{ padding: '0px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '0px' }}>


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Funding
                            {userRole == 'Co-Founder' ?
                                <></>

                                :
                                <button className="edit-icon-2" onClick={() => handleShow()}><i className="fa fa-pencil" /></button>

                            }</h2>
                        <div className="" style={{ display: 'flex' }}>

                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" style={{ padding: '0px' }}>

                                {/* </div>
                            <div style={{ width: '65%', height: '500px' }}> */}
                                {/* style={{ margin: '0px', marginBottom: '15px' }} */}
                                <div className="row" >

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", fontWeight: "500" }}>

                                                        {stateOfFunding != null && stateOfFunding != undefined && stateOfFunding}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box mb-2" className='ft-weight'>Stage of Funding </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2">
                                                    <div style={{ display: "flex", alignItems: 'center' }}>

                                                        {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={BUSDimage}></img> : ""}
                                                        {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CADimage}></img> : ""}
                                                        {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={AUDimage}></img> : ""}
                                                        {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CNYimaage}></img> : ""}
                                                        {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={DAIimage}></img> : ""}
                                                        {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={EURimage}></img> : ""}
                                                        {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={INRimage}></img> : ""}
                                                        {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={RUBLEimage}></img> : ""}
                                                        {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={SGDimage}></img> : ""}
                                                        {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDCimage}></img> : ""}
                                                        {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDTimage}></img> : ""}
                                                        {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={usdimage}></img> : ""}
                                                        {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={POUNDimage}></img> : ""}
                                                        {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YUANimage}></img> : ""}
                                                        {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YENimage}></img> : ""}
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", marginRight: '5px' }}>

                                                            {totalFundRaise != null && totalFundRaise != undefined &&

                                                                Number(totalFundRaise).toLocaleString("en-US")
                                                            }
                                                        </h3></div>


                                                </div>
                                                <span className="widget-box" className='ft-weight'>Total Fund Raise</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    {/* style={{ width: '32%', maxWidth: '32%', padding: '5px' }} */}

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}

                                                    {leadI == true ?
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>


                                                            {showLeadInvestor != null && showLeadInvestor != undefined && showLeadInvestor.fund_name}
                                                        </h3>
                                                        :
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>


                                                            {ExternalLeadName != null && ExternalLeadName != undefined && ExternalLeadName}
                                                        </h3>
                                                    }




                                                </div>
                                                <span className="widget-box" className='ft-weight'>Lead Investor</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>







                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    <div style={{ display: "flex", alignItems: 'center' }}>

                                                        {CurrencyType == "BUSD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={BUSDimage}></img> : ""}
                                                        {CurrencyType == "CAD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CADimage}></img> : ""}
                                                        {CurrencyType == "AUD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={AUDimage}></img> : ""}
                                                        {CurrencyType == "CNY" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={CNYimaage}></img> : ""}
                                                        {CurrencyType == "DAI" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={DAIimage}></img> : ""}
                                                        {CurrencyType == "EURO" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={EURimage}></img> : ""}
                                                        {CurrencyType == "INR" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={INRimage}></img> : ""}
                                                        {CurrencyType == "RUBLE" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={RUBLEimage}></img> : ""}
                                                        {CurrencyType == "SGD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={SGDimage}></img> : ""}
                                                        {CurrencyType == "USDC" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDCimage}></img> : ""}
                                                        {CurrencyType == "USDT" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={USDTimage}></img> : ""}
                                                        {CurrencyType == "USD" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={usdimage}></img> : ""}
                                                        {CurrencyType == "POUND" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={POUNDimage}></img> : ""}
                                                        {CurrencyType == "YUAN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YUANimage}></img> : ""}
                                                        {CurrencyType == "YEN" ? <img style={{ width: "30px", height: "30px", marginRight: '5px' }} src={YENimage}></img> : ""}
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", marginRight: '5px' }}>

                                                            {fundRaiseTillDate != null && fundRaiseTillDate != undefined &&


                                                                Number(fundRaiseTillDate).toLocaleString("en-US")
                                                            }
                                                        </h3></div>


                                                </div>
                                                <span className="widget-box" className='ft-weight'>Funds Raised</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    {/* <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                        <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                            <div className="widget-info-new">
                                               
                                                <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                {Number(tokenStd1.length).toLocaleString("en-US")}
                                                </h3>
                                                
                                                <span className="widget-box">No of Investors</span>
                                            </div>
                                        </div>
                                    </div> */}


                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {Number(tokenStd1?.length).toLocaleString("en-US")}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" className='ft-weight'>No of Investors</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    {IncubatorName != null && IncubatorName != undefined && IncubatorName !="" && isIncubated == true ?              
                                     <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", fontWeight: "500" }}>

                                                        {IncubatorName}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box mb-2" className='ft-weight'>Incubator </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>:""}
                     
                                    {GrantsName != null && GrantsName != undefined && GrantsName !="" && receivedGrants == true ?                       
                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", fontWeight: "500" }}>

                                                        {GrantsName}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box mb-2" className='ft-weight'>Grants </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>:""

                                    }
         {modeOfFunding != null && modeOfFunding != undefined && modeOfFunding !="" ?  
         <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new mb-2" style={{ minHeight: '23px' }}>
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", fontWeight: "500" }}>

                                                        {modeOfFunding}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box mb-2" className='ft-weight'>Mode of Funding</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>:""}
                                   

                                    {/* </div> */}

                                    {/* <div className="row" style={{ margin: '0px', marginBottom: '15px' }}> */}
                                    {/* style={{ width: '100%', padding: '5px' }} */}
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                        <table style={{ width: '100%', border: 'none' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px', fontWeight:"600" }}> Primary Funding Wallet Address Network</td>
                                                    <td className="ft-weight" style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }} >
                                                        {WalletNetwork != null && WalletNetwork != undefined && WalletNetwork}</td>
                                                </tr>
                                                <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px', fontWeight:"600" }}>Primary Funding wallet Address</td>
                                                    <td className="ft-weight" style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }}>{walletAddress != null && walletAddress != undefined && walletAddress}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>

                            {mydata?.length > 0 ?

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

                <div className="col-md-12" style={{ padding: '0px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                            <div className="search">
                                <input
                                    placeholder="&nbsp; Search"
                                    style={{ width: '300px', borderRadius: '2px', minHeight: '35px', border: '2px solid #e1dfdf' }}
                                // value={value}
                                // onChange={e => setValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-auto float-right ml-auto" style={{ padding: '0px' }}>
                            {/* <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => downloadFunc()}> DOWNLOAD SAMPLE FORMAT</button>
                            <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => handleClickFile2()}>UPLOAD FILE</button>
                            <input
                                type="file"
                                ref={hiddenFileInput2}
                                onChange={uploadExcelData}
                                style={{ display: 'none' }}
                            /> */}
                            <button className="btn add-btn2" style={{ margin: '0px', width: '90px', borderRadius: '2px', marginBottom: '0px' }} onClick={() => showFundingTablefunc()}> ADD</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-12" style={{ padding: '0px', marginTop: '15px' }}>

                    <div className="row">
                        <div className="col-md-12" >
                            <div className="card card-table flex-fill" style={{ margin: '0px', border: 'none' }}>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <Table className="table-striped"
                                            pagination={{
                                                total: tokenStd1?.length,
                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }}
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            // bordered
                                            dataSource={tokenStd1}
                                            rowKey={record => record.id}
                                        // onChange={this.handleTableChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div style={{ marginTop: '40px', textAlign: 'end' }}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
            <FundingModal
                indexCountforSlect={indexCountforSlect}
                createFundingDetails={createFundingDetails}
                updateFundingDetails={updateFundingDetails}
                checkData={checkData}
                totalFundRaise={totalFundRaise}
                modeOfFunding={modeOfFunding}
                setModeOfFunding={setModeOfFunding}
                isIncubated={isIncubated}
                setisIncubated={setisIncubated}
                receivedGrants={receivedGrants}
                setReceivedGrants={setReceivedGrants}
                setIncubatorName={setIncubatorName}
                setIncubatorWebsite={setIncubatorWebsite}
                setGrantsName={setGrantsName}
                setGrantsLink={setGrantsLink}
                IncubatorName={IncubatorName}
                IncubatorWebsite={IncubatorWebsite}
                GrantsName={GrantsName}
                GrantsLink={GrantsLink}
                setTotalFundRaise={setTotalFundRaise}
                fundRaiseTillDate={fundRaiseTillDate}
                setfundRaiseTillDate={setfundRaiseTillDate}
                noofInvestorstilldate={noofInvestorstilldate}
                setnoofInvestorstilldate={setnoofInvestorstilldate}
                leadInvestor={leadInvestor}
                setleadInvestor={setleadInvestor}
                stateOfFunding={stateOfFunding}
                setstateOfFunding={setstateOfFunding}
                walletAddress={walletAddress}
                // setwalletAddress={setwalletAddress}
                WalletNetwork={WalletNetwork}
                setWalletNetwork={setWalletNetwork}
                show={show}
                CurrencyType={CurrencyType}
                setCurrencyType={setCurrencyType}
                handleClose={handleCloseShow}
                leadI={leadI}
                setleadI={setleadI}
                ExternalLeadName={ExternalLeadName} setExternalLeadName={setExternalLeadName}
            />

            <DepositTokenPage show={depositToken} handleClose={handleCloseDepositfunc} />
            <FundingTablePopup

                show={showFundingTable}
                handleClose={handleCloseFundingTable}

                getFundingDataFunc={getFundingDataFunc} />

            <FundingEditPopup
                extenalInvesName={extenalInvesName}
                setExtenalInvesName={setExtenalInvesName}
                leadIEdit={leadIEdit}
                setleadIEdit={setleadIEdit}
                FundingId={FundingId}
                investor={investorEdit}
                setInvestor={setInvestorEdit}
                getFundingDataFunc={getFundingDataFunc}


                pricePerToken={pricePerTokenEdit} setpricePerToken={setpricePerTokenEdit}
                Investment={InvestmentEdit} setInvestment={setInvestmentEdit}
                round={roundEdit} setRound={setRoundEdit}

                tokenAlloted={tokenAllotedEdit} setTokenAlloted={setTokenAllotedEdit}
                perOfSupply={perOfSupplyEdit} setperOfSupply={setperOfSupplyEdit}
                website={websiteEdit} setWebsite={setWebsiteEdit}
                category={categoryEdit} setCategory={setCategoryEdit}
                show={showEditPage}
                handleClose={handleCloseEditFunding}
            />

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
export default FounderFunding;
