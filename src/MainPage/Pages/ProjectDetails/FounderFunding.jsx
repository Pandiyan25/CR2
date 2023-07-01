
import React, { useEffect, useState } from 'react';
import { selectAllFundingProjectDetails } from '../../../reducers/FundingProjectSlice';
import {website} from '../../../Entryfile/imagepath'

import { useSelector } from 'react-redux';
import { itemRender, onShowSizeChange } from '../../paginationfunction';
import { Table } from 'antd';
import { CanvasJSChart } from 'canvasjs-react-charts';
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

const FounderFunding = () => {
    const [dataMap, setDataMap] = useState([])

    const [tokenStd1, setTokenStd1] = useState([])
    const projectDataDetails = useSelector(selectAllFundingProjectDetails)
    // const projectDataData = useSelector(selectAllFundingDataArray)
    // const projectDataDataPieCahrt = useSelector(selectAllFundingPieChartData)
    console.log(projectDataDetails, "projectDataDetailsss")
    console.log(projectDataDetails, projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.primary_funding_wallet_address_network, "allProjectFundings in funding");

    const projectFundingProjecDetails = useSelector(selectAllFundingProjectDetails)
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
            dataPoints: dataMap
        }]
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
                        {text?.investor?.first_name}
                    </div>
            ),
            // render: (text, record) => (
            //     // <strong>{text}</strong>
            //     <div>
            //         {text?.investor?.first_name}{text?.investor?.last_name}
            //     </div>
            // ),
            sorter: (a, b) => a?.investor?.first_name.localeCompare(b?.investor?.first_name),

            align: 'center',
        },
        {
            title:"Category",
            dataIndex:'category',

            sorter: (a, b) => a?.category.localeCompare(b?.category),
            align: 'center',
        },
        {
            title: 'Price Per Tokens',
            dataIndex: 'price_per_token',
            sorter: (a, b) => a?.price_per_token - b?.price_per_token,

            align: 'center',
        },
        {
            title: 'Investment',
            dataIndex: 'investment',
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
            title: 'Token Alloted',
            dataIndex: 'tokens_alloted',
            sorter: (a, b) => a?.tokens_alloted - b?.tokens_alloted,

            // sorter: (a, b) => a.expcycle.length - b.expcycle.length,
            align: 'center',
        },

        {
            title: 'Percentage of Supply',
            dataIndex: 'percentage_of_supply',
            sorter: (a, b) => a?.percentage_of_supply - b?.percentage_of_supply,
            // sorter: (a, b) => a.lifeTime.length - b.lifeTime.length,
            align: 'center',
        },

        {
            title: 'Website',

            render: (text, record) => (
               
                
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>    {/* {text?.website} */}
                    {text?.website ?
                            <img className="sociallogo" src={website} onClick={() => { openwebsite(text?.website) }}>
                                    </img>
                                    
                        :
                        <>
                        </>
        }
                </div>
            ),
            // dataIndex: 'website',
            // sorter: (a, b) => a.Expensetilldate.length - b.Expensetilldate.length,
            align: 'center',
        },




    ]

    const openwebsite= (i) => {
        console.log(i, "iiii");
    
        window.open(i, '_blank').focus();
        // window.open(i)
    }
    const setDatatoPieChart = (e) => {
        
        var pieChartData = [];
        //[{name:"",y=""(value)}] format for piechart
        for (var map = 0; map < e.length; map++ ){
            
            var name = e[map].external_investor != "" ? e[map].external_investor : e[map].name
            pieChartData.push ({name:name,y:e[map].y});
        
        }
        // console.log("pieChartData",pieChartData);
        setDataMap(pieChartData);

    }

    



    useEffect(() => {
        if (projectDataDetails?.length > 0 && projectDataDetails[0].allProjectFundingData?.length > 0) {

            setDatatoPieChart(projectDataDetails[0].allProjectFundingData)
            // setDataMap(projectDataDetails[0].allProjectFundingData)
        } else {
            setDataMap([])
        }

    }, [projectDataDetails])
    return (


        <div className="card card-table" style={{ margin: '0px', border: 'none', background: 'transparent' }}>

            <div className="card-body" style={{ padding: '0px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '0px' }}>


                        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight:"600" }}>Funding</h2>
                        <div className="" style={{ display: 'flex' }}>

                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" style={{ padding: '0px' }}>

                                <div className="row" >

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.stage_of_funding}


                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Stage of Funding </span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    <div style={{ display: "flex", alignItems: 'center' }}>
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
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", marginRight: '5px' }}>

                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.total_fund_raise_target}
                                                        </h3></div>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Total Fund Raise</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    {/* 112 */}
                                                    {projectDataDetails[0]?.allProjectFunding[0]?.external_lead_investor != null && projectDataDetails[0]?.allProjectFunding[0]?.external_lead_investor != undefined && projectDataDetails[0]?.allProjectFunding[0]?.external_lead_investor != '' ?

                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>
                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.external_lead_investor}


                                                        </h3>
                                                        :
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.lead_investor?.first_name}


                                                        </h3>
                                                    }




                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Lead Investor</span>
                                            </div>

                                        </div>
                                    </div>







                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    <div style={{ display: "flex", alignItems: 'center' }}>
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
                                                        <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED", marginRight: '5px' }}>

                                                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.fund_raised}
                                                        </h3></div>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>Funds Raised</span>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ margin: '10px 0px' }} >
                                        <div className="dash-wid" style={{ height: '75px', padding: '5px' }}>
                                            <div className="card-body" style={{ textAlign: 'left', padding: "10px" }}>

                                                <div className="widget-info-new">
                                                    <h3 className="mainFontH5" style={{ marginBottom: '0px', fontFamily: "'Poppins', sans-serif ", fontSize: "25px", color: "#6345ED" }}>

                                                        {projectDataDetails?.length > 0 ? projectDataDetails[0]?.allProjectFundingData.length : 0}

                                                    </h3>


                                                </div>
                                                <span className="widget-box" style={{fontWeight:'600'}}>No of Investors</span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12" style={{ margin: '10px 0px' }}>
                                        <table style={{ width: '100%', border: 'none' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' ,fontWeight:'600'}}>Primary Funding Wallet Address Network</td>
                                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }} >
                                                        {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.primary_funding_wallet_address_network}</td>
                                                </tr>
                                                <tr><td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px',fontWeight:'600' }}>Primary Funding wallet Address</td>
                                                    <td style={{ wordSpacing: 'normal', padding: '10px 0px', color: '#1890ff' }}>{projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 && projectDataDetails[0]?.allProjectFunding[0]?.primary_funding_wallet_address}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>

                            {projectDataDetails != null && projectDataDetails != undefined && projectDataDetails.length > 0 && projectDataDetails[0].allProjectFunding != null && projectDataDetails[0].allProjectFunding != undefined && projectDataDetails[0].allProjectFunding.length > 0 ?
                                
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
                                    placeholder="Search"
                                    style={{ width: '300px', borderRadius: '2px', minHeight: '35px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 2px 11px' }}

                                />
                            </div>
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
                                                total: projectDataDetails?.length > 0 ? projectDataDetails[0]?.allProjectFundingData.length : 0,
                                                showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                                showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                                            }}
                                            style={{ overflowX: 'auto' }}
                                            columns={columns}
                                            // bordered
                                            dataSource={projectDataDetails?.length > 0 ? projectDataDetails[0]?.allProjectFundingData : 0}
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

        </div>

    );
}
export default FounderFunding;
