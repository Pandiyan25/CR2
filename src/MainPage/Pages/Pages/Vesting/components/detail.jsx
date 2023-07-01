import { array } from "prop-types";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { apiURI } from "../../../../../config/config";
import {
    getInvestorsEscrowFundDetails,
    getInvestorsUnlockedFundDetails,
    getInvestorsWithdrawnFundDetails,
    withdrawBatch,
    investorWithdrawnFund,
    investorUnlockedFund,
    currentEscrowBalanceOfInvestor
} from '../../../../../config/web3Client3';
import '../App.css';

import Card from "./card"

function Portfolio({depositFunc,projectData}) {

    const [NewDateFormat, setNewDateFormat] = useState([])
    const loginId = useSelector((state) => state.constVar.loginId)
    const [ProjectFundingData, setProjectFundingData] = useState([])

    const getUserDetailsFunc = () => {

        try {


            var query = `
            query( $user: ID) {
                allVesting( investor: $user) {
                  _id
                  cliff_months
                  vesting_blockchain_id
                  vesting_months
                  vesting_end_date
                  investor {
                    _id
                    email
                    wallet_address
                  }
                  project {
                    _id
              
                    logo
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
                    project_blockchain_id
                    one_pager_document
                    pitch_deck
                    number_of_founders
                    team_size
                    project_id
                    project_status
                    amount_released
                    amount_invested
                    amount_in_escrow
                    project_end_date
                    total_budget
                    validator_score
                    investor_score
                    fund_raised_till_now
                    total_fund_raised
              
                    investment_date
                    no_of_proposals
                    fund_raised_target
                    public_launch_price
                    funds_released_till_date
                    cover_page
                    twitter
                    instagram
                    medium
                    facebook
                    linkedin
                    discord
                    telegram
                    reddit
                    youtube
                    
                    user {
                        wallet_address
                    }
                  }
                  contract_address
                  tge_date
                  vesting_date
                  tokens_alloted
                  tokens_locked
                  tokens_unlocked
                  tokens_withdrawn
                  token_contract
                  vesting_contract
                  token_ticker
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
                .then(async (data) => {
                    console.log('getFounderUserDetails', data?.data?.allVesting);
                    const userData = JSON.parse(localStorage.getItem('userAccount'));
                    if (data?.data?.allVesting != null && data?.data?.allVesting != undefined && data?.data?.allVesting.length > 0) {
                        var array = [];
                        var arr2 = [];
                        var projectStartDate = ''
                        var TgeDate = ''
                        var VestingDate = ''
                        var VestingEndDate = ''
                        var projectEndDate = ''
                        for (var i = 0; i < data?.data?.allVesting.length; i++) {
                            if (data?.data?.allVesting.length > 0 && data?.data?.allVesting[i].project != null) {
                                let [es_fund, unlocked_fund, withdrawn_fund] = await Promise.all([
                                    currentEscrowBalanceOfInvestor(userData?.provider, data?.data?.allVesting[i].project.user.wallet_address, data?.data?.allVesting[i].vesting_blockchain_id, data?.data?.allVesting[i].investor.wallet_address),
                                    investorUnlockedFund(userData?.provider, data?.data?.allVesting[i].project.user.wallet_address, data?.data?.allVesting[i].investor.wallet_address, data?.data?.allVesting[i].vesting_blockchain_id),
                                    investorWithdrawnFund(userData?.provider, data?.data?.allVesting[i].vesting_blockchain_id, data?.data?.allVesting[i].investor.wallet_address)
                                ])
                                console.log('es_fund, unlocked_fund, withdrawn_fund', es_fund, unlocked_fund, withdrawn_fund)
                                data.data.allVesting[i].tokens_locked = parseFloat(es_fund) - parseFloat(unlocked_fund);
                                data.data.allVesting[i].tokens_unlocked = parseFloat(unlocked_fund);
                                data.data.allVesting[i].tokens_withdrawn = parseFloat(withdrawn_fund);
                                projectStartDate = data?.data?.allVesting[i].project?.project_start_date?.split("T"),
                                    projectEndDate = data?.data?.allVesting[i].project?.project_end_date?.split("T"),
                                    TgeDate = data?.data?.allVesting[i].tge_date?.split("T"),
                                    VestingDate = data?.data?.allVesting[i].vesting_date?.split("T"),
                                    VestingEndDate = data?.data?.allVesting[i].vesting_end_date?.split("T"),
                                    array.push({
                                        "projectStartDate": projectStartDate && projectStartDate.length ? projectStartDate[0] : '',
                                        "projectEndDate": projectEndDate && projectEndDate.length ? projectEndDate[0] : '',
                                        "TgeDate": TgeDate && TgeDate.length ? TgeDate[0] : '',
                                        "VestingDate": VestingDate && VestingDate.length ? VestingDate[0] : '',
                                        "VestingEndDate": VestingEndDate && VestingEndDate.length ? VestingEndDate[0] : '',

                                    })

                                arr2.push({

                                    array,
                                    ...data?.data?.allVesting[i],
                                })
                            }

                            console.log(projectStartDate, "projectStartDate")


                        }
                        console.log(arr2, array, "arr2");

                        setProjectFundingData(arr2)

                    } else {
                    }


                })
        }
        catch (error) {
            console.log(error, "error in Founder Project");
        }
    }


    useEffect(() => {
        if (loginId != '') {

            getUserDetailsFunc()
        }
    }, [loginId])


    console.log(ProjectFundingData, "ProjectFundingData");
    return (




        <div className="mt-2" >




            <div className="row" style={{margin:"0px"}}>
                {projectData.length > 0 ?
                    projectData.map((main) => (

                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" style={{ width: "360px  !important" ,maxWidth:'430px'}}>
                        {/* <div className="" style={{ width: "360px ", maxWidth: '400px' }}> */}
                            {/* paddingLeft: "70px" */}
                            <div style={{ marginTop: "20px", }}>
                                <Card value={main} key={main.i} depositFunc={depositFunc}></Card>
                                
                            </div>
                        </div>
                    ))



                    :

                    <div className="" style={{ width: "360px", maxWidth: '400px' }}>
                        {/* paddingLeft: "70px" */}
                        <div style={{ marginTop: "20px", }}>
                            {/* <Card></Card> */}
                            No Vesting Data
                        </div>
                    </div>
                }


            </div>
        </div>





    );
};

export default Portfolio;
