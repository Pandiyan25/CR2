
import React, { useEffect, useState } from 'react';
import { apiURI } from '../../../../../config/config';
import { useSelector } from 'react-redux';


const FounderFunding = () => {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(true)
    }
    const handleCloseShow = () => {
        setShow(false)
    }
    const [depositToken, setDepositToken] = useState(false)
    
    const [checkData, setcheckData] = useState('')
    const [totalFundRaise, setTotalFundRaise] = useState('')
    const [fundRaiseTillDate, setfundRaiseTillDate] = useState('')
    const [noofInvestorstilldate, setnoofInvestorstilldate] = useState('')
    const [leadInvestor, setleadInvestor] = useState('')

    const [stateOfFunding, setstateOfFunding] = useState('')

    const [walletAddress, setwalletAddress] = useState('')
    const [WalletNetwork, setWalletNetwork] = useState('')
    
    const projectNumber = useSelector((state) => state.constVar.projectIdSuperAdmin)

    const loginId = useSelector((state) => state.constVar.profileIdValidator)


    const getFundingDataFunc = () => {
        try {
            var query = `
            query AllProjectFundings($project: ID) {
                allProjectFundings(project: $project) {
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
                    if (data?.data?.allProjectFundings != null && data?.data?.allProjectFundings != undefined && data?.data?.allProjectFundings.length > 0 ) {
                        setcheckData(data?.data?.allProjectFundings[0]._id)
                        setTotalFundRaise(data?.data?.allProjectFundings[0].total_fund_raise_target)
                        setfundRaiseTillDate(data?.data?.allProjectFundings[0].fund_raised)
                        setnoofInvestorstilldate(data?.data?.allProjectFundings[0].number_of_investors)
                        setleadInvestor(data?.data?.allProjectFundings[0].lead_investor)
                        setstateOfFunding(data?.data?.allProjectFundings[0].stage_of_funding)
                        setwalletAddress(data?.data?.allProjectFundings[0].primary_funding_wallet_address)
                        setWalletNetwork(data?.data?.allProjectFundings[0].primary_funding_wallet_address_network)
                    } else {
                        setcheckData('')
                    }
                })

        } catch (error) {
            console.log(error, "funding in Project");
        }
    }



  

    

    useEffect(() => {
        console.log(loginId,"funding Log1");
        if (loginId != '') {
            getFundingDataFunc()
            console.log(loginId,"funding Log2");
        }

    }, [loginId])

    return (

        <div className="card card-table">

            <div className="card-body" style={{ padding: '10px' }}>

                <div className="col-md-12" style={{ padding: '0px' }}>
                    <div className="profile-view" style={{ margin: '10px' }}>


                        <h3 className="card-title">Funding</h3>
                        <div className="">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%', padding: '10px 0px' }}>Total Fund Raise Target:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{totalFundRaise != null && totalFundRaise != undefined && totalFundRaise}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Funds Raised till Date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{fundRaiseTillDate != null && fundRaiseTillDate != undefined && fundRaiseTillDate}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Number of Investors till date:</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{noofInvestorstilldate != null && noofInvestorstilldate != undefined && noofInvestorstilldate}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Lead Investor :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{leadInvestor != null && leadInvestor != undefined && leadInvestor}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Stage of Funding :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{stateOfFunding != null && stateOfFunding != undefined && stateOfFunding}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Primary Funding wallet Address :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{walletAddress != null && walletAddress != undefined && walletAddress}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px', width: '40%' }}>Primary Funding Wallet Address Network :</td>
                                        <td style={{ wordSpacing: 'normal', padding: '10px 0px' }} >{WalletNetwork != null && WalletNetwork != undefined && WalletNetwork}</td>
                                    </tr>

                                    <tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
           
        </div>


    );
}
export default FounderFunding;
