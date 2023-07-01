
import '../App.css';
import React from "react"
import { apiURI } from '../../../../../config/config';
import { useSelector } from 'react-redux';
import {
  withdrawBatch,
  getFee
} from '../../../../../config/web3Client3';


function Card({ value }) {

  const loginId = useSelector((state) => state.constVar.loginId)
  const walletAddress = useSelector((state) => state.constVar.walletAddress)
  const createVestingTransaction = (blockNumber, transactionHash, fee) => {
    try {

      var query =
        `mutation Mutation($input: VestingTransactionInput) {
            createVestingTransaction(input: $input) {
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
          variables:

               {
                "input": {
                  "investor": loginId,
                  "project": value?.project?._id,
                  "transaction_date": new Date(),
                  "transaction_type": "Withdraw",
                  "no_of_tokens": value?.tokens_unlocked,
                  "token_ticker": value?.token_ticker,
                  "block_number": blockNumber.toString(),
                  // "transaction_id": transactionHash,
                  // "transaction_fee": fee
                }
              }


             })
           })
           .then((response) => {
      
             const json = response.json();
             return json;
           })
           
             .then(data => {
               // debugger;
               console.log('createVestingTransaction', data?.data?.createVestingTransaction);
               if(data?.data?.createVestingTransaction != null && data?.data?.createVestingTransaction != undefined){
                //  var totalInvested = 0;
                return data;
               }else{
                    console.log('vesting transaction creation failed');
               }
             });
      
        } catch(error){
            console.log(error,"ProjectGetFunctionError  in Dashboard in investors error");
        }
      }

    // const withdrawTransaction = async () => {
    //     const userData = JSON.parse(localStorage.getItem('userAccount'));
    //     if (userData) {
    //         let { project: {user}, vesting_blockchain_id, token_ticker, tokens_unlocked } = value || {};
    //         console.log('tokens_unlocked', tokens_unlocked)
    //         if (tokens_unlocked > 0) {
    //             console.log('calling withdrawBatch ', userData?.provider, user.wallet_address, walletAddress, vesting_blockchain_id, token_ticker);
    //             withdrawBatch(userData?.provider, user.wallet_address, walletAddress, vesting_blockchain_id, token_ticker.toUpperCase())
    //             .then((resp) => {
    //                 console.log('called withdrawBatch ', resp);
    //                 console.log('calling createVestingTransaction');
    //                 return createVestingTransaction();
    //             })
    //             .then((resp) => {
    //                 console.log('called createVestingTransaction', resp);
    //             })
    //         } else {
    //             alert("There are no unlocked tokens to withdraw")
    //         }
    //       }


    //     }
      
    
  

  const withdrawTransaction = async () => {
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    if (userData) {
      let { project: { user }, vesting_blockchain_id, token_ticker, tokens_unlocked } = value || {};
      console.log('tokens_unlocked', tokens_unlocked)
      if (tokens_unlocked > 0) {
        console.log('calling withdrawBatch ', userData?.provider, user.wallet_address, walletAddress, vesting_blockchain_id, token_ticker);
        withdrawBatch(userData?.provider, user.wallet_address, walletAddress, vesting_blockchain_id, token_ticker.toUpperCase())
          .then(async (resp) => {
            console.log('called withdrawBatch ', resp);
            console.log('calling createVestingTransaction');
            let fee = await getFee(resp?.effectiveGasPrice, resp?.gasUsed);
            console.log('fee details', fee);
            return createVestingTransaction(resp?.blockNumber, resp?.transactionHash, fee);
          })
          .then((resp) => {
            console.log('called createVestingTransaction', resp);
          })
      } else {
        alert("The Unlocked Tokens have already been withdrawn")
      }
    } else {
      alert("Please connect to Metamask or Coinbase wallet")
    }
  }

  return (
    <div className=" cardInDashboard portfolio">
      <div className="pspace">
        <img src={value?.project?.cover_page} style={{ height: '100%', width: '100%',border:"0px" }} />

      </div>
      <div className="dspace p-3">
        <div className="square"><img src={value?.project?.logo} style={{ height: '100%', width: '100%',zIndex:"200" }} /></div>
        <h3 className="projectheading mt-2" >{value?.project?.project_name}</h3>
        <div>
          <label className="plabel">Token</label>
          <h5 className="pdata">{value?.token_ticker}</h5>
        </div>
        <div>
          <label className="plabel">Token Contract</label>
          <h5 className="pdata">{value?.token_contract}</h5>
        </div>
        <div>
          <label className="plabel">Vesting Contract</label>
          <h5 className="pdata">{value?.vesting_contract}</h5>
        </div>
        {/* <div>
        <label className="plabel">TFG Date</label>
        <h5 className="pdata">{value?.array.length > 0 && value?.array[0].TgeDate}</h5>
        </div> */}
        <div className="row">
          <div className="col text-align-left">
            <label className="plabel">TGE Date</label>
            <label className="plabel">Vesting Start date </label>

            <h5 className="pdata" style={{ textAlign: 'start' }}>{value?.vestingStartDate}</h5>
            <label className="plabel">Token Alloted </label>
            <label className="plabel">Token Locked</label>
            <label className="plabel">Token Unlocked</label>
            <label className="plabel">Token Withdrawn </label>

          </div>
          <div className="col text-align-right" style={{ textAlign: 'right' }}>
            <label className="pdata2" style={{ textAlign: 'right' }}>{value?.tgeDate} </label>
            <label className="plabel" style={{ textAlign: 'right' }}>Vesting End date </label>
            <h5 className="pdata" style={{ textAlign: 'right' }}>{value?.vestingEndDate}</h5>
            <h5 className="pdata" style={{ textAlign: 'right' }}>{value?.tokens_alloted || value?.tokens_locked + value?.tokens_unlocked + value?.tokens_withdrawn}</h5>
            <h5 className="pdata" style={{ textAlign: 'right' }}>{value?.tokens_locked}</h5>
            <h5 className="pdata" style={{ textAlign: 'right' }}>{value?.tokens_unlocked}</h5>
            <h5 className="pdata" style={{ textAlign: 'right' }}>{value?.tokens_withdrawn}</h5>
          </div>
        </div>

        <div className="row mt-4" style={{ justifyContent: 'space-between', paddingRight: '15px', paddingLeft: '15px' }}>
          <button className="bth-card">Chart </button>
          <button className="bth-card" onClick={() => withdrawTransaction()}>Withdraw </button>
        </div>

      </div>
    </div>

  );
};

export default Card;
