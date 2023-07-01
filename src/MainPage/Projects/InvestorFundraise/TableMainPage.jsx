import { Table } from 'antd'
import { Button } from 'reactstrap'
import React from 'react'
import { apiURI } from '../../../config/config'

import { ToastContainer, toast } from 'material-react-toastify';
import { itemRender, onShowSizeChange } from '../../paginationfunction'
import { useState } from 'react'
import TablePage from './TablePage'

const TableMainPage = ({ setToPrivateFunc,FundingReqFunc, 
    showPrivateRoundReceived, showPrivateRoundRejected, 
    showPrivateRoundAccept, showEditDraftRound,  
    DraftFundRaiseData, FundRaisePrivateData, tokenStd4, 
    FundRaiseData, showRoundFunc ,getFundingRound }) => {
    const [changeTab, setChangeTab] = useState('InvestmentsReq')

    const changeToInvestmentsReqfunc = () => {
        setChangeTab('InvestmentsReq')
    }
    const changeToDraftfunc = () => {
        setChangeTab('DraftReq')
    }
    const changeToFundingRequfunc = () => {
        setChangeTab('FundingRequ')
    }
    const changeToValidationReqfunc = () => {
        setChangeTab('ValidationReq')
    }
    
    const deleteFundraise = (i) => {
        
        // console.log("Fundraise Data",i)
        try{
            var query = `
            mutation DeleteFundraise($id: ID) {
                deleteFundraise(_id: $id) {
                  _id
                }
              }                
            `;
            fetch(apiURI.URL,{
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
                        "id": i._id,

                    }
                })
            })
            .then((response) => {
                const json = response.json();
                return json;
            })
            .then(data => {
                if (data?.data?.deleteFundraise != null && data?.data?.deleteFundraise != undefined) {

                    toast.success("Successfully Deleted", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    getFundingRound()
                }
            })
        }
        catch(e){
            console.log(e)
        }

    }

    const columns = [

        {
            title: 'Contract ID',
            dataIndex: 'contract_id',

            align: 'center',
        },
        {
            title: 'Round ',
            dataIndex: 'round',

            align: 'center',
        },
        {
            title: 'Project',
            // dataIndex: 'Project',
            render: (text, record) => (
                text?.project?.project_name != null && text?.project?.project_name != undefined && text?.project?.project_name != '' ?

                    <div> {text?.project?.project_name} </div>
                    :
                    <div></div>),

            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price_per_token',

            align: 'center',
        },


        {
            title: 'Target',
            // dataIndex: 'Target',

            // render: (text, record) => (
            //     text?.Target != null && text?.Target != undefined && text?.Target != '' ?

            //         <div> {Number(text?.Target).toLocaleString("en-US")} </div>
            //         :
            //         <div></div>),

            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),
            align: 'center',
        },


        {
            title: 'Tokens',
            // dataIndex: 'Tokens',

            align: 'center',
            render: (text, record) => (
                text?.no_of_tokens != null && text?.no_of_tokens != undefined && text?.no_of_tokens != '' ?

                    <div> {Number(text?.no_of_tokens).toLocaleString("en-US")} </div>
                    :
                    <div></div>)
        },


        {
            title: 'Valuation',
            dataIndex: 'valuation',

            align: 'center',
        },


        {
            title: 'Stage',
            // dataIndex: 'stage',
            render:(text,record) => (
                <div >
                                    {/* {Stage} */}
                                    {text?.stage === "pre_seed_round" ? "Pre Seed Round "
                                    :text?.stage === "seed_round" ? "Seed Round" 
                                    :text?.stage === "strategic_round" ? "Strategic Round" 
                                    :text?.stage === "pre_sale" ? "Pre Sale" 
                                    :text?.stage === "public_round" ? "Public Round" 
                                    :text?.stage === "kol_round" ? "KOL Round" 
                                    :text?.stage === "early_stage" ? "Early Stage" 
                                    :text?.stage === "seriesA" ? "Series A" 
                                    :text?.stage === "seriesB" ? "Series B" 
                                    :text?.stage === "otc" ? "OTC" 
                                    : "Stage"
                                } 
                                </div>

                            ),
            sorter: (a, b) => a?.stage.localeCompare(b?.stage),
            align: 'center',
        },


        {
            title: 'Status',
            dataIndex: 'project_status',

            align: 'center',
        },


        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                    <Button style={{ padding: '0px ', border: '2px solid #1890ff', maxWidth: '95px', fontSize: '12px', lineHeight: '24px', minHeight: '26px', textAlign: 'center', height: '30px', borderRadius: '2px ', width: '100%', marginLeft: '10px', background: '#1890ff' }} onClick={() => showRoundFunc(text)}>View</Button>
                    {/* onClick={() => deleteFunc(text._id)} */}
                </div>
            ),


            align: 'center',
        },


    ]
    const columns2 = [

        {
            title: 'Round',
            dataIndex: 'round',

            align: 'center',
        },

        {
            title: 'Price',
            dataIndex: 'price_per_token',

            align: 'center',
        },

        {
            title: 'Target',
            // dataIndex: 'Target',

            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),

            align: 'center',
        },

        {
            title: 'Tokens',
            // dataIndex: 'Tokens',

            align: 'center',
            render: (text, record) => (
                text?.no_of_tokens != null && text?.no_of_tokens != undefined && text?.no_of_tokens != '' ?

                    <div> {Number(text?.no_of_tokens).toLocaleString("en-US")} </div>
                    :
                    <div></div>)
        },

        {
            title: 'Valuation',
            dataIndex: 'valuation',

            align: 'center',
        },

        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                    <Button
                        style={{
                            padding: '0px ',
                            border: '2px solid #1890ff',
                            maxWidth: '95px',
                            fontSize: '12px',
                            lineHeight: '24px',
                            minHeight: '26px',
                            textAlign: 'center',
                            height: '30px',
                            borderRadius: '2px ',
                            width: '100%',
                            marginLeft: '10px',
                            background: '#1890ff'
                        }}
                        onClick={() => showEditDraftRound(text)}
                    ><i className="fa fa-pencil" /></Button>
                    <Button
                        style={{
                            padding: '0px ',
                            border: '2px solid #1890ff',
                            maxWidth: '95px',
                            fontSize: '12px',
                            lineHeight: '24px',
                            minHeight: '26px',
                            textAlign: 'center',
                            height: '30px',
                            borderRadius: '2px ',
                            width: '100%',
                            marginLeft: '10px',
                            background: '#1890ff'
                        }}
                        onClick={() => deleteFundraise(text)}
                    ><i className="fa fa-trash" /></Button>
                </div>
            ),
            align: 'center',
        },

    ]

    const columns3 = [
        {
            title: 'Creator',
            dataIndex: 'creator',

            align: 'center',
        },

        {
            title: 'Project',
            // dataIndex: 'Project',
            render: (text, record) => (
                text?.project?.project_name != null && text?.project?.project_name != undefined && text?.project?.project_name != '' ?

                    <div> {text?.project?.project_name} </div>
                    :
                    <div></div>),

            align: 'center',
        },
        {
            title: 'Round',
            dataIndex: 'round',

            align: 'center',
        },

        {
            title: 'Price',
            dataIndex: 'price_per_token',

            align: 'center',
        },

        {
            title: 'Fund',
            // dataIndex: 'Fund',

            render: (text, record) => (

                <div>{Number(text?.funds_requested).toLocaleString("en-US")}</div>
            ),
            sorter: (a, b) => a?.funds_requested - (b?.funds_requested),

            align: 'center',
        },

        {
            title: 'Tokens',
            // dataIndex: 'Tokens',

            align: 'center',
            render: (text, record) => (
                text?.no_of_tokens != null && text?.no_of_tokens != undefined && text?.no_of_tokens != '' ?

                    <div> {Number(text?.no_of_tokens).toLocaleString("en-US")} </div>
                    :
                    <div></div>)
        },

        {
            title: 'Valuation',
            dataIndex: 'valuation',

            align: 'center',
        },
        {
            title: 'Status',
            // dataIndex: 'Status',

            render: (text, record) => (
                text?.founder_status == "Accepted" ? 
                    <div style={{ border: '2px solid green', color: 'white', backgroundColor: 'green', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Accepted
                    </div>
                    :
                text?.investor_status == 'Sent' ?
                        // border: '2px solid green', 
                        <div style=
                        // {{ color: 'green', width: '100%', padding: '2px', fontWeight: '700' }}
                        {{ border: '2px solid green', color: 'white', backgroundColor: 'green', width: '100%', padding: '2px', fontWeight: '700' }}
                        >  
                        
                        {/* // <div style={{ border: '2px solid green', color: 'white', backgroundColor: 'green', width: '100%', padding: '2px', fontWeight: '700' }}> */}
                        Sent

                    </div>
                    :   
                text?.investor_status == 'Rejected' ?
                        // border: '2px solid red',
                        <div 
                        // style={{ color: 'red', width: '100%', padding: '2px', fontWeight: '700' }}
                        style={{ border: '2px solid red', color: 'white', backgroundColor: 'red', width: '100%', padding: '2px', fontWeight: '700' }}
                        >
                            {/* <div style={{ border: '2px solid red', color: 'white', backgroundColor: 'red', width: '100%', padding: '2px', fontWeight: '700' }}> */}
                            Rejected 
                        </div>
                    :
                        // border: '2px solid #8c04b3',
                    
                        <div style={{ border: '2px solid white',backgroundColor: '#8c04b3', color: 'white', width: '100%', padding: '2px', fontWeight: '700' }}>

                            {/* <div style={{ border: '2px solid #8c04b3', backgroundColor: '#8c04b3', color: 'white', width: '100%', padding: '2px', fontWeight: '700' }}> */}
                            {text?.investor_status}
                        </div>


            ),

            align: 'center',
        },
        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>

                text?.investor_status == 'Sent' ?
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                        <Button
                            style={{
                                padding: '0px ',
                                border: '2px solid #1890ff',
                                maxWidth: '95px',
                                fontSize: '12px',
                                lineHeight: '24px',
                                minHeight: '26px',
                                textAlign: 'center',
                                height: '30px',
                                borderRadius: '2px ',
                                width: '100%',
                                marginLeft: '10px',
                                background: '#1890ff'
                            }}
                            onClick={() => showPrivateRoundAccept(text)}
                        >View</Button>
                    </div>
                    :

                    text?.investor_status == 'Rejected' ?
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                            <Button
                                style={{
                                    padding: '0px ',
                                    border: '2px solid #1890ff',
                                    maxWidth: '95px',
                                    fontSize: '12px',
                                    lineHeight: '24px',
                                    minHeight: '26px',
                                    textAlign: 'center',
                                    height: '30px',
                                    borderRadius: '2px ',
                                    width: '100%',
                                    marginLeft: '10px',
                                    background: '#1890ff'
                                }}
                                onClick={() => showPrivateRoundRejected(text)}
                            // onClick={() => deleteFunc(text._id)}
                            >View</Button>
                        </div>
                        :

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                            <Button
                                style={{
                                    padding: '0px ',
                                    border: '2px solid #1890ff',
                                    maxWidth: '95px',
                                    fontSize: '12px',
                                    lineHeight: '24px',
                                    minHeight: '26px',
                                    textAlign: 'center',
                                    height: '30px',
                                    borderRadius: '2px ',
                                    width: '100%',
                                    marginLeft: '10px',
                                    background: '#1890ff'
                                }}
                                onClick={() => showPrivateRoundReceived(text)}
                            >View</Button>
                        </div>

            ),

            align: 'center',
        },
    ]


    const columns4 = [
        {
            title: 'Project',
            // dataIndex: 'Project',

            render: (text, record) => (
                <div 
                // className='mainClassColm4' 
                // onClick={() => sendDatatoProjectPage(text?.fundraise?.project?._id)}
                >
                    {text?.fundraise?.project?.project_name}

                </div>
            ),
            align: 'center',
        },

        // {
        //     title: 'Contract ID',
        // dataIndex: 'Contract',

        //     align: 'center',
        // },
        {
            title: 'Request ID',
            // dataIndex: 'Request_ID',

            align: 'center',
        },

        {
            title: 'Target Date',
            dataIndex: 'targetdate',

            align: 'center',
        },

        {
            title: 'Completion Date',
            dataIndex: 'estDate',

            align: 'center',
        },


        {
            title: 'Status',
            // dataIndex: 'Status',

            render: (text, record) => (
                text?.validation_status == 'Approved' ?
                    <div style={{ color: 'green', width: '100%', padding: '2px', fontWeight: '700' }}>
                        Approved

                    </div>
                    :

                    text?.validation_status == 'Rejected' ?
                        <div style={{ color: 'red', width: '100%', padding: '2px', fontWeight: '700' }}>
                            Rejected
                        </div>
                        :
                        text?.validation_status == 'Unrequested' ?
                            <div style={{ color: 'red', width: '100%', padding: '2px', fontWeight: '700' }}>
                                Unrequested
                            </div>
                            :

                            <div style={{ color: 'rgb(255, 196, 32)', width: '100%', padding: '2px', fontWeight: '700' }}>
                                {/*                             
                        </div>
                        <div style={{ border: '2px solid #8c04b3', backgroundColor: '#8c04b3', color: 'white', width: '100%', padding: '2px', fontWeight: '700' }}> */}
                                Pending
                            </div>


            ),

            align: 'center',
        },
        {
            title: 'Options',
            render: (text, record) => (
                // <strong>{text}</strong>
                text?.validation_status == 'Unrequested' ?
                    ''
                    :
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>

                        <Button
                            style={{
                                padding: '0px ',
                                border: '2px solid #1890ff',
                                maxWidth: '95px',
                                fontSize: '12px',
                                lineHeight: '24px',
                                minHeight: '26px',
                                textAlign: 'center',
                                height: '30px',
                                borderRadius: '2px ',
                                width: '100%',
                                marginLeft: '10px',
                                background: '#1890ff'
                            }}
                            onClick={() => FundingReqFunc(text?._id)}
                        >View</Button>
                    </div>


            ),

            align: 'center',
        },
    ]

    return (
        <div className="row">

            <div className=" col-md-12 col-sm-12 col-lg-12 col-xl-12" style={{ marginTop: '15px', marginBottom: '15px', display: "flex", padding: '0px', paddingLeft: "5px" }} >
                <button className={changeTab == 'InvestmentsReq' ? "newbtt2" : "newbtt"} onClick={() => changeToInvestmentsReqfunc()}>Investments</button>
                <button className={changeTab == 'DraftReq' ? "newbtt2" : "newbtt"} onClick={() => changeToDraftfunc()}>Drafts</button>
                <button className={changeTab == 'FundingRequ' ? "newbtt2" : "newbtt"} onClick={() => changeToFundingRequfunc()}>Funding Requests</button>
                <button className={changeTab == 'ValidationReq' ? "newbtt2" : "newbtt"} onClick={() => changeToValidationReqfunc()}>Validation Requests</button>
            </div>
            <div className=" col-md-12 col-sm-12 col-lg-12 col-xl-12" style={{  display: "flex", padding: '0px 5px 0px 5px' }} >
           
            <div className="row align-items-center" style={{ width: '100%', margin: '0px' }}>
                <div className="col" style={{ padding: '0px' }}>
                    <div className="search mt-2 mb-2">
                        <input
                            placeholder="Search"
                            style={{ width: '300px', height:'35px',borderRadius: '2px', border: '2px solid #e1dfdf', boxShadow: 'rgb(196, 200, 208) 0px 0px 0px' }}
                        //   value={value}
                        //   onChange={e => setValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-auto float-right ml-auto mb-2" style={{ padding: '0px' }}>
                    <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPrivateFunc()} >+ PRIVATE ROUND</button>
                    {/* <button className="btn add-btn2" style={{ margin: '10px', borderRadius: '2px', marginBottom: '0px', marginRight: '0px' }} onClick={() => setToPublicFunc()} >+ CREATE PUBLIC ROUND</button> */}
                </div>
            </div>
            </div>

            {changeTab == 'InvestmentsReq' ?

                <TablePage tableData={FundRaiseData} columns={columns} />
                :
                changeTab == 'DraftReq' ?
                    <TablePage tableData={DraftFundRaiseData} columns={columns2} />
                    :
                    changeTab == 'FundingRequ' ?
                        <TablePage tableData={FundRaisePrivateData} columns={columns3} />
                        :

                        <TablePage tableData={tokenStd4} columns={columns4} />

            }


        </div>



    )
}

export default TableMainPage