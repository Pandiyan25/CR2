


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../../config/config';


const KYCPage = () => {

    const [checkData, setcheckData] = useState('')

    
    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)
    const [Education, setEducation] = useState('')
    const [Experience, setExperience] = useState('')
    const [Industry, setIndustry] = useState('')
    const [expInBlockChain, setexpInBlockChain] = useState('')
    const [publicLaunchPrice, setpublicLaunchPrice] = useState('')

    const [totalTokenSupply, settotalTokenSupply] = useState('')
    const [exptTokenGen, setexptTokenGen] = useState('')
    const [totalTokenSupplyBreakUp, settotalTokenSupplyBreakUp] = useState('')
    const [youTube, setyouTube] = useState('')
    const [Telegram, setTelegram] = useState('')
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        setShow(false)
    }

    const getKycDataFunc = () => {
        try {
            var query = `
            query Query($project: ID) {
                allProjectKYCs(project: $project) {
                  _id
                  
                  education
                  experience
                  industry
                  experience_in_blockchain
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
                    if (data?.data?.allProjectKYCs != null && data?.data?.allProjectKYCs != undefined) {

                        setcheckData(data?.data?.allProjectKYCs[0]._id)
                        setEducation(data?.data?.allProjectKYCs[0].education)
                        setExperience(data?.data?.allProjectKYCs[0].experience)
                        setIndustry(data?.data?.allProjectKYCs[0].industry)
                        setexpInBlockChain(data?.data?.allProjectKYCs[0].experience_in_blockchain)
                        setpublicLaunchPrice(data?.data?.allProjectKYCs[0].public_launch_price)
                        setexptTokenGen(data?.data?.allProjectKYCs[0].expected_token_generation_event)
                        settotalTokenSupplyBreakUp(data?.data?.allProjectKYCs[0].token_supply_breakup)
                        settotalTokenSupply(data?.data?.allProjectKYCs[0]?.total_token_supply)
                    } else {
                        setcheckData(data?.data?.allProjectKYCs)
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }
   
  

    useEffect(() => {
        console.log(loginId, "funding Log1");
        if (loginId != '') {
            getKycDataFunc()
            console.log(loginId, "funding Log2");
        }

    }, [loginId])
    return (

        <div className="card card-table">

            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">KYC</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Education:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Education != null && Education != undefined && Education}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Experience != null && Experience != undefined && Experience}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Industry:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{Industry != null && Industry != undefined && Industry}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Experience in Blockchain Industry:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{expInBlockChain != null && expInBlockChain != undefined && expInBlockChain}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Public Launch Price:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{publicLaunchPrice != null && publicLaunchPrice != undefined && publicLaunchPrice}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Expected Token Generation Event :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{exptTokenGen != null && exptTokenGen != undefined && exptTokenGen}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Total Token Supply :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalTokenSupply != null && totalTokenSupply != undefined && totalTokenSupply}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Token Supply Breakup:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalTokenSupplyBreakUp != null && totalTokenSupplyBreakUp != undefined && totalTokenSupplyBreakUp}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Role:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Past Organization tags:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Income:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Current Location:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>

                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Nationality:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Id Proof:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Id Number:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Identity Picture:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Are you Incorporated ?:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Name of Legal Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Jurisdiction of legal Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Registered office of legal entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Certificate of Incorporation:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Memorandum/Articles/Bye laws of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Register of Members of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Register of Directors of the Entity:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} ></td>
                                    </tr>
                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pro-edit"><button className="edit-icon" onClick={() => handleShow()}><i className="fa fa-pencil" /></button></div>

                    </div>
                </div>
                {/* <div style={{ marginTop: '40px', textAlign: 'end' }}>
                    <button className="btn buttonInProposal1 submit-btn">SAVE</button>
                </div> */}

            </div>
            
        </div>


    );
}
export default KYCPage;
