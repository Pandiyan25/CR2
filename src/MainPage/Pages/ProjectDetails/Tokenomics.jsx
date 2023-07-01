
import { useDispatch, useSelector } from 'react-redux';


import { CanvasJSChart } from 'canvasjs-react-charts'
import React, { useEffect, useState } from 'react';
import { selectAllTokenomicsDetails } from '../../../reducers/TokenomicsSlice';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { Table } from 'antd';
import { apiURI } from '../../../config/config';
import { selectAllFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import CNYimaage from '../FounderProject/Funding/assets/images/CNY.png'
import usdimage from '../FounderProject/Funding/assets/images/USD.png'
import EURimage from '../FounderProject/Funding/assets/images/EUR.png'
import POUNDimage from '../FounderProject/Funding/assets/images/POUND.png'
import YUANimage from '../FounderProject/Funding/assets/images/YUAN.png'
import YENimage from '../FounderProject/Funding/assets/images/YEN.png'
import CADimage from '../FounderProject/Funding/assets/images/CAD.png'
import SGDimage from '../FounderProject/Funding/assets/images/SGD.png'
import AUDimage from '../FounderProject/Funding/assets/images/AUD.png'
import DAIimage from '../FounderProject/Funding/assets/images/DAI.png'
import BUSDimage from '../FounderProject/Funding/assets/images/BUSD.png'
import INRimage from '../FounderProject/Funding/assets/images/INR.png'
import USDCimage from '../FounderProject/Funding/assets/images/USDC.png'
import USDTimage from '../FounderProject/Funding/assets/images/USDT.png'
import RUBLEimage from '../FounderProject/Funding/assets/images/RUBBLE.png'

// import { useSelector } from 'react-redux';

const Tokenomics = () => {
    const [mydata, setMydata] = useState([])

    const projectFundingProjecDetails = useSelector(selectAllFundingProjectDetails)
    const [allTokenomicsDashboardData, setAllTokenomicsDashboardData] = useState([])
    const [tokenType, settokenType] = useState([])
    const projectDataDetails = useSelector(selectAllTokenomicsDetails)

    useEffect(() => {

        if (projectDataDetails[0]?.token_type.length > 0) {

            var arrtype = [];
            for (var i = 0; i < projectDataDetails[0]?.token_type.length; i++) {
                console.log(i, projectDataDetails[0]?.token_type.length, projectDataDetails[0]?.token_type[i].value);
                arrtype.push({
                    value: projectDataDetails[0]?.token_type[i].value,
                    label: projectDataDetails[0]?.token_type[i].value,
                    color: "#FFC400"
                })

            }

            settokenType(arrtype)
        }

        if (projectDataDetails.length > 0) {
            getTokenomicsDataFunc(projectDataDetails[0]._id)
        }
    }, [])

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
                        }
                    } else {
                        setcheckData('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
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
            sorter: (a, b) => a?.percentage - b?.percentage,
            // sorter: (a, b) => a.subExpenseHead.length - b.subExpenseHead.length,
            align: 'center',
        },

        {
            title: 'Number of Tokens',
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

            render: (text, record) => (
                <div>
                    {`${text?.tge_release}%`}
                </div>
            ),
            sorter: (a, b) => a?.tge_release - b?.tge_release,
            // sorter: (a, b) => a.expcycle.length - b.expcycle.length,
            align: 'center',
        },

        {
            title: 'Cliff',
            dataIndex: 'cliff',

            sorter: (a, b) => a?.cliff - b?.cliff,
            // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
            align: 'center',
        },

        {
            title: 'Vesting',
            dataIndex: 'vesting',
            sorter: (a, b) => a?.vesting - b?.vesting,
            // sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
            align: 'center',
        },




    ]


    const options = {
        animationEnabled: true,
        title: {
            text: "Token Suply Break Up"
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
    console.log(projectDataDetails, "projectDataDetails");

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


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Tokenomics</h2>
                        <div className="" style={{ display: 'flex' }}>

                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" style={{ padding: '0px' }}>
                                <div className="row">

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_ticker}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Token Ticker </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
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

                                                        <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.total_token_supply}

                                                            {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                        </h3>  </div>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Total Token Supply </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">

                                                    <div style={{ display: "flex" }}>
                                                        {projectFundingProjecDetails != null && projectFundingProjecDetails != undefined && projectFundingProjecDetails.length > 0 && projectFundingProjecDetails[0].allProjectFunding != null && projectFundingProjecDetails[0].allProjectFunding != undefined && projectFundingProjecDetails[0].allProjectFunding.length > 0
                                                            ?


                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "BUSD" ? <img style={{ width: "30px", height: "30px" }} src={BUSDimage}></img> :
                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CAD" ? <img style={{ width: "30px", height: "30px" }} src={CADimage}></img> :
                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "AUD" ? <img style={{ width: "30px", height: "30px" }} src={AUDimage}></img> :
                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "CNY" ? <img style={{ width: "30px", height: "30px" }} src={CNYimaage}></img> :
                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "DAI" ? <img style={{ width: "30px", height: "30px" }} src={DAIimage}></img> :
                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "EURO" ? <img style={{ width: "30px", height: "30px" }} src={EURimage}></img> :
                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "INR" ? <img style={{ width: "30px", height: "30px" }} src={INRimage}></img> :
                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "RUBLE" ? <img style={{ width: "30px", height: "30px" }} src={RUBLEimage}></img> :
                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "SGD" ? <img style={{ width: "30px", height: "30px" }} src={SGDimage}></img> :
                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDC" ? <img style={{ width: "30px", height: "30px" }} src={USDCimage}></img> :
                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USDT" ? <img style={{ width: "30px", height: "30px" }} src={USDTimage}></img> :
                                                                                                        projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "USD" ? <img style={{ width: "30px", height: "30px" }} src={usdimage}></img> :
                                                                                                            projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "POUND" ? <img style={{ width: "30px", height: "30px" }} src={POUNDimage}></img> :
                                                                                                                projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YUAN" ? <img style={{ width: "30px", height: "30px" }} src={YUANimage}></img> :
                                                                                                                    projectFundingProjecDetails[0]?.allProjectFunding[0]?.currency == "YEN" ? <img style={{ width: "30px", height: "30px" }} src={YENimage}></img> : ""

                                                            :
                                                            ""
                                                        }
                                                        {/* 112 */}
                                                        <h3 className="mainFontH5 ml-2" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.public_launch_price}

                                                            {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                        </h3></div>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Public Launch Price </span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.expected_token_generation_event}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Expected Token Generation Event</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_standard}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Token Standard</span>
                                            </div>

                                            {/* <h3 className="mainFontH4">Info from budget page</h3> */}
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.primary_network}

                                                        {/* <CountUp end={705450}
                              duration={1.5} /> */}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Primary Network</span>
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
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' ,fontWeight:'600'}}>Token Type</td>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >
                                                            {tokenType != null && tokenType != undefined && tokenType?.length > 0 ?
                                                                <div style={{ display: 'flex' }}>

                                                                    {tokenType.map((i) =>
                                                                        <div>
                                                                            {i?.value},
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                : ''
                                                            }</td>
                                                    </tr>
                                                    {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_minted == true ?
                                                    
                                                    <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px',fontWeight:'600' }} >Token Contract</td>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }} onClick={()=>opennewWindow(projectDataDetails.length > 0 && projectDataDetails[0]?.contract_link)}>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.contract_address}</td>

                                                    </tr>
                                                    :
                                                    <></>}
{/* 
{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.token_minted == true ?
                                                    
                                                        <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Contract Address</td>
                                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff',cursor:'pointer' }} onClick={()=>opennewWindow(projectDataDetails.length > 0 && projectDataDetails[0]?.contract_link)}>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0]?.contract_link}</td>

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

                    </div>

                </div>


                <div className="col-md-12" style={{ padding: '0px', marginBottom: '15px' }}>


                    <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                        <div className="col" style={{ padding: '0px' }}>
                            <div className="search">
                                <input
                                    placeholder="Search"
                                    style={{ width: '300px', minHeight: '35px', borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}
                                // value={value}
                                // onChange={e => setValue(e.target.value)}
                                />
                            </div>
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

        </div>



    );
}
export default Tokenomics;
