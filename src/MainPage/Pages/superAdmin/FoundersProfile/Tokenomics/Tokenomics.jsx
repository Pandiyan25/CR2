


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../../config/config';


const Tokenomics = () => {

    const [checkData, setcheckData] = useState('')

    const [tokenTicker, settokenTicker] = useState('')
    const [tokenType, settokenType] = useState('')
    const [tokenTypeData, settokenTypeData] = useState(null)
    const [primaryNetwork, setprimaryNetwork] = useState('')
    const [tokenStd, settokenStd] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')

    const [expTokenGenerationj, setexpTokenGenerationj] = useState('')
    const [tokenSupply, settokenSupply] = useState('')
    const [tokenSupplyBreakup, settokenSupplyBreakup] = useState('')
   
    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)

    const getTokenDetailFunc = () => {
        try {
            var query = `
            query AllProjectFundings($project: ID) {
                allTokenomics(project: $project) {
                 
                  _id
                  token_ticker
                  token_type
                  primary_network
                  token_standard
                  public_launch_price
                  expected_token_generation_event
                  total_token_supply
                  token_supply_breakup
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

                        "project": projectNumber,
                    }

                })
            })
                .then((response) => {

                    const json = response.json();
                    return json;
                })
                .then(data => {
                    if (data?.data?.allTokenomics != null && data?.data?.allTokenomics != undefined) {

                        setcheckData(data?.data?.allTokenomics[0]._id)
                        settokenTicker(data?.data?.allTokenomics[0].token_ticker)
                        settokenType(data?.data?.allTokenomics[0].token_type)
                        setprimaryNetwork(data?.data?.allTokenomics[0].primary_network)
                        settokenStd(data?.data?.allTokenomics[0].token_standard)
                        setpublicLaunchPrice(data?.data?.allTokenomics[0].public_launch_price)
                        setexpTokenGenerationj(data?.data?.allTokenomics[0].expected_token_generation_event)
                        settokenSupply(data?.data?.allTokenomics[0].total_token_supply)
                        settokenSupplyBreakup(data?.data?.allTokenomics[0].token_supply_breakup)
                    } else {
                        setcheckData('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getTokenDetailFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])

  

    return (

        <div className="card card-table">

            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">Tokenomics</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Token Ticker:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenTicker != null && tokenTicker != undefined && tokenTicker}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Token Type:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenType != null && tokenType != undefined && tokenType}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Primary Network:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{primaryNetwork != null && primaryNetwork != undefined && primaryNetwork}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Token Standard:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenStd != null && tokenStd != undefined && tokenStd}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Expected Token Generation Event :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{expTokenGenerationj != null && expTokenGenerationj != undefined && expTokenGenerationj}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Token Supply :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenSupply != null && tokenSupply != undefined && tokenSupply}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Token Supply Breakup:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{tokenSupplyBreakup != null && tokenSupplyBreakup != undefined && tokenSupplyBreakup}</td>
                                    </tr>


                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
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
