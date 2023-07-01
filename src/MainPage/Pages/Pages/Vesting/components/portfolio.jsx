import { useEffect, useState } from 'react';
import '../App.css';
import React from "react"

// import Table from './table';
import TablePage from './table2'
import Detail from './detail'
import { useSelector } from 'react-redux';
import { apiURI } from '../../../../../config/config';
import {
  investorWithdrawnFund,
  investorUnlockedFund,
  currentEscrowBalanceOfInvestor
} from '../../../../../config/web3Client3';

function Portfolio() {

  const [projectData, setProjectData] = useState([])
  const [projectHistoryData, setProjectHistoryData] = useState([])

  const [portfolio, setPortfolio] = useState(true)

  const loginId = useSelector((state) => state.constVar.loginId)
  const portfoliofunc = () => {
    setPortfolio(true)
    depositFunc()
  }
  const historyfunc = () => {
    depositFunc()
    setPortfolio(false)
  }

  const depositFunc = () => {


    try {

      var query =
        `query($investor: ID) {
          allVesting(investor: $investor) {
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
            total_tokens
          }
          allVestingTransactions(investor: $investor) {
            _id
            project {
              _id
              logo
              email_id
              first_name
            }
            transaction_date
            transaction_type
            no_of_tokens
            token_ticker
            wallet_address
          }
        }
        `
        ;
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
            "investor": loginId
          }
        })
      })
        .then((response) => {

          const json = response.json();
          return json;
        })
        .then( async (data) => {
          if (data?.data?.allVesting != null && data?.data?.allVesting != undefined && data?.data?.allVesting?.length > 0) {




            var array = [];
            const userData = JSON.parse(localStorage.getItem('userAccount'));
            for (var i = 0; i < data?.data?.allVesting.length; i++) {
              console.log(data?.data?.allVesting[i], "data?.data?.Main");
              let [es_fund, unlocked_fund, withdrawn_fund] = await Promise.all([
                currentEscrowBalanceOfInvestor(userData?.provider, data?.data?.allVesting[i].project.user.wallet_address, data?.data?.allVesting[i].vesting_blockchain_id, data?.data?.allVesting[i].investor.wallet_address),
                investorUnlockedFund(userData?.provider, data?.data?.allVesting[i].project.user.wallet_address, data?.data?.allVesting[i].investor.wallet_address, data?.data?.allVesting[i].vesting_blockchain_id),
                investorWithdrawnFund(userData?.provider, data?.data?.allVesting[i].vesting_blockchain_id, data?.data?.allVesting[i].investor.wallet_address)
              ])
              console.log('es_fund, unlocked_fund, withdrawn_fund', es_fund, unlocked_fund, withdrawn_fund)
              data.data.allVesting[i].tokens_locked = parseFloat(es_fund) - parseFloat(unlocked_fund);
              data.data.allVesting[i].tokens_unlocked = parseFloat(unlocked_fund);
              data.data.allVesting[i].tokens_withdrawn = parseFloat(withdrawn_fund);
              var tgeDate = '';
              var vestingStartDate = '';
              var vestingEndDate = '';
              if (data?.data?.allVesting[i].tge_date != null && data?.data?.allVesting[i].tge_date != undefined && data?.data?.allVesting[i].tge_date != '') {

                tgeDate = data?.data?.allVesting[i].tge_date.split("T")[0]
              } else {
                tgeDate = ''
              }
              if (data?.data?.allVesting[i].vesting_date != null && data?.data?.allVesting[i].vesting_date != undefined && data?.data?.allVesting[i].vesting_date != '') {

                vestingStartDate = data?.data?.allVesting[i].vesting_date.split("T")[0]
              } else {
                vestingStartDate = ''
              }

              if (data?.data?.allVesting[i].vesting_end_date != null && data?.data?.allVesting[i].vesting_end_date != undefined && data?.data?.allVesting[i].vesting_end_date != '') {

                vestingEndDate = data?.data?.allVesting[i].vesting_end_date.split("T")[0]
              } else {
                vestingEndDate = ''
              }

              console.log(tgeDate, "tgeDate");
              console.log(vestingStartDate, "vestingStartDate");
              console.log(vestingEndDate, "vestingEndDate");



              array.push({
                ...data?.data?.allVesting[i],

                tgeDate,
                vestingStartDate,
                vestingEndDate,
                i,
              })
              console.log(array, "mainData1 vestingEndDate");
            }

            console.log(array, "array");

            setProjectData(array)





          } else {

            setProjectData([])
          }

          if (data?.data?.allVestingTransactions != null && data?.data?.allVestingTransactions != undefined && data?.data?.allVestingTransactions?.length > 0) {

            setProjectHistoryData(data?.data?.allVestingTransactions)
          } else {
            setProjectHistoryData([])
          }

        });

    } catch (error) {
      console.log(error);
    }

  }



  useEffect(()=>{
    depositFunc()
  },[])


  

  return (
    <div className="page-wrapper" style={{paddingTop:'60px'}}>

      <div className="content container-fluid">
      <div className="page-header">
                        <div className="header-left">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h3 className="page-title">Vesting</h3>

                                </div>
                            </div>
                        </div>

                    </div>
        <div className="round">
          {/* <h1 className="m-2 text-left  " style={{fontFamily:"'Poppins', sans-serif",fontSize:"2rem"}}>Welcome, (Wallet Address/ENS) to CR Finance Tokens Vesting platform </h1> */}

          {portfolio === true ?

            <div className=" bt-div text-left ">
              <button type="button" className="btn btn-outline-primary act" onClick={() => portfoliofunc()}>Portfolio</button>
              <button type="button" className="btn btn-outline-primary cs" onClick={() => historyfunc()}>History</button>
            </div>
            :
            <div className=" bt-div text-left ">
              <button type="button" className="btn btn-outline-primary cs" onClick={() => portfoliofunc()}>Portfolio</button>
              <button type="button" className="btn btn-outline-primary act" onClick={() => historyfunc()}>History</button>
            </div>

          }
          {/* <button type="button" className="btn btn-outline-primary cs" onClick={() => portfoliofunc()}>Portfolio</button>
          <button type="button" className="btn btn-outline-primary cs" onClick={() => historyfunc()}>History</button> */}
          {portfolio === true ?
            <Detail  projectData={projectData} depositFunc={depositFunc}></Detail>
            : <TablePage projectHistoryData={projectHistoryData}></TablePage>}

        </div>

      </div>
      
      
      </div>




  );
};

export default Portfolio;
