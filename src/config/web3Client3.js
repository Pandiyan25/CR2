import projANdPropAbi from './projectAndProposalABI2.json';
import founderAbi from './founderABI2.json';
import factoryAbi from './factoryABI2.json';
import stableCoinAbi from './stableCoinABI2.json';
import founderCoinAbi from './founderCoinABI2.json';
import vestingAbi from './vestingABI2.json';
import Web3 from 'web3';
import regeneratorRuntime from "regenerator-runtime";
import { symbol } from 'prop-types';

let isProjAndPropInitialized = false;
let projAndPropContract;

let isFounderInitialized = false;
let founderContract;

let isFactoryInitialized = false;
let factoryContract;

let isStableCoinInitialized = false;
let stableCoinContract;

let isFounderCoinInitialzed = false;
let founderCoinContract;

let isVestingInitialized = false;
let vestingContract;

// internal: detect the wallet provider
export const detectCurrentProvider = (conn_provider = 'metamask') => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  }
  if (provider &&
    provider.providers &&
    provider.providers.length &&
    conn_provider === 'metamask') {
    let m_provider = window.ethereum.providers.find((x) => x.isMetaMask);
    if (m_provider) provider = m_provider;
  } else if (provider &&
    provider.providers &&
    provider.providers.length &&
    conn_provider === 'coinbase') {
    provider = window.ethereum.providers.find((x) => x.isCoinbaseWallet);
  }
  // console.log("provider", provider)
  return provider;
};

// main: initiate the metamask wallet (used it in header part)
export const initiateNetwork = async (provider) => {
  try {
    const currentProvider = detectCurrentProvider(provider);
    if (currentProvider) {
      await currentProvider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      const networkId = await web3.eth.net.getId();

      if (userAccount.length === 0) {
        return new Error('Please connect to Metamask or Coinbase wallet');
      } else {
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei

        return {ethBalance, account, chainId, networkId};
      }
    } else return new Error('Non-Ethereum browser detected. You should consider trying Metamask or Coinbase wallet')
  } catch (err) {
    console.log(err);
    return new Error(
      'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
    );
  }
}

// common: initiate project and proposal contract
export const initiateProjAndPropContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);
    projAndPropContract = new web3.eth.Contract(
      projANdPropAbi,
      process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS
    );

    isProjAndPropInitialized = true;
  }
}

// common: initiate the factory contract to do actions on it
export const initiateFactoryContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);

    factoryContract = new web3.eth.Contract(
      factoryAbi,
      process.env.FACTORY_CONTRACT_ADDRESS
    );

    isFactoryInitialized = true;
  }
}

// common: initiate the founder contract
export const initiateFounderContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);

    founderContract = new web3.eth.Contract(
      founderAbi,
      process.env.FOUNDER_CONTRACT_ADDRESS
    );

    isFounderInitialized = true;
  }
}

// common: initiate the vesting contract
export const initiateVestingContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);

    vestingContract = new web3.eth.Contract(
      vestingAbi,
      process.env.VESTING_CONTRACT_ADDRESS
    );

    isVestingInitialized = true;
  }
}

// common: approve stable contract to do deposit or withdraw
export const approveByStableContract = async (conn_provider, w_address, value) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);

    stableCoinContract = new web3.eth.Contract(
      stableCoinAbi,
      process.env.STABLE_COIN_ADDRESS
    );
    // value = parseFloat(value)*15;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isStableCoinInitialized = true;
    return await stableCoinContract.methods.approve(process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// founder: add founder
export const addFounder = async (conn_provider, w_address) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isFounderInitialized) {
    await initiateFounderContract(conn_provider)
  }

  if (provider) {
    const gasFee = await founderContract.methods.addFounder(w_address).estimateGas({from: w_address});
    const web3 = new Web3(provider);
    const gasPrice = await web3.eth.getGasPrice();
    console.log(gasFee, 'gasFee', gasPrice, 'gasPrice');
    return await founderContract.methods.addFounder(w_address).send({
      from: w_address,
      gas: gasFee,
      gasPrice: parseInt(gasPrice) * 2
    })
  }
}

// founder: set founder and project cycle
export const setFounderAndCycleForProject = async (conn_provider, w_address, proj_id, cycles) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  if (provider) {
    // const web3 = new Web3(provider);
    // let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.setFounderAndCycleForTheProject(process.env.FOUNDER_CONTRACT_ADDRESS, w_address, proj_id, cycles).send({
      from: w_address
    })
  }
}

// founder: set initial proposal id
export const setInitialProposalId = async (conn_provider, w_address, i_address, in_prop_id, proj_id, total_val) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(total_val.toString(), 'ether');
    return await projAndPropContract.methods.setInitialId(w_address, i_address, in_prop_id, proj_id, balance).send({
      from: w_address
    })
  }
}

// founder: set subsequent proposal id
export const setSubsequentProposalId = async (conn_provider, w_address, sub_prop_id, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods.setSubsequentId(w_address, sub_prop_id, proj_id).send({
    from: w_address
  })
}

// investor: deposit stable coins to the initial proposal NOTE: before this, call approveByStableContract
export const depositTokens = async (conn_provider, w_address, f_address, value, in_prop_id, proj_id) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.depositStableTokens(w_address, f_address, balance, process.env.STABLE_COIN_SYMBOL, process.env.STABLE_COIN_ADDRESS, in_prop_id, proj_id).send({
      from: w_address
    })
  }
}

// founder: withdraw 10% of stable tokens
export const Withdraw10PercentOfStableCoin = async (conn_provider, w_address, i_address, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods.Withdraw10PercentOfStableCoin(process.env.FOUNDER_CONTRACT_ADDRESS, w_address, i_address, process.env.STABLE_COIN_SYMBOL, proj_id).send({
    from: w_address
  })
}

// validator: add validator
export const addValidator = async (conn_provider, w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract(conn_provider)
  }
  return await factoryContract.methods.addValidators(w_address).send({
    from: w_address
  })
}

// validator: validate subsequent proposal
export const validateProposal = async (conn_provider, w_address, choice, sub_prop_id, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods.Validate(choice, w_address, process.env.FACTORY_CONTRACT_ADDRESS, sub_prop_id, proj_id).send({
    from: w_address
  })
}

// founder: withdraw all stable tokens
export const withdrawAllStableCoinFromThePool = async (conn_provider, w_address, sub_prop_id, proj_id) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  if (provider) {
    // const web3 = new Web3(provider);
    // let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.withdrawSubsequentStableCoins(sub_prop_id, w_address, process.env.STABLE_COIN_SYMBOL, proj_id).send({
      from: w_address
    })
  }
}

// investor: withdraw all stable tokens
export const withdrawTokens = async (conn_provider, f_address, w_address, proj_id) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  if (provider) {
    // const web3 = new Web3(provider);
    // let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.withdrawTokensByInvestor(f_address, w_address, process.env.STABLE_COIN_SYMBOL, proj_id).send({
      from: w_address
    })
  }
}

// investor: deposit directly to the project
export const directDepositTokens = async (conn_provider, w_address, sub_prop_id, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods.DirectDepositTokens(w_address, process.env.STABLE_COIN_SYMBOL, sub_prop_id, proj_id).send({
    from: w_address
  })
}

// founder: whitelist founder coin address
export const whitelistFounderCoinAddress = async (conn_provider, w_address, symbol, coinAddress) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  return await vestingContract.methods.whitelistToken(symbol, coinAddress).send({
    from: w_address
  })
}

// common: approve founder contract to deposit founder tokens - F 04
export const approveByFounderCoinContract = async (conn_provider, w_address, value, coinAddress) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);

    founderCoinContract = new web3.eth.Contract(
      founderCoinAbi,
      coinAddress
    );
    // value = parseFloat(value)*15;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isFounderCoinInitialzed = true;
    return await founderCoinContract.methods.approve(process.env.VESTING_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// founder: deposit founder tokens in linear
export const depositFounderLinearTokens = async (conn_provider, w_address, coinAddress, symbol, vest_id, value, i_address, tge_date, tge_pct, v_start, v_months, v_mode) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  let tge_d = new Date(tge_date).valueOf();
  tge_d = tge_d.toString().substring(0, tge_d.toString().length - 3);
  let v_s_date = new Date(v_start).valueOf();
  v_s_date = v_s_date.toString().substring(0, v_s_date.toString().length - 3);
  
  if (provider) {
    const web3 = new Web3(provider);
    let tge_pct_val = value * tge_pct/100;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    let tge_fund = web3.utils.toWei(tge_pct_val.toString(), 'ether');
    return await vestingContract.methods.depositFounderLinearTokens(tge_fund, {founder: w_address, founderSMAddress: process.env.FOUNDER_CONTRACT_ADDRESS, founderCoinAddress: coinAddress}, symbol, vest_id, balance, i_address, parseInt(tge_d), parseInt(v_s_date), v_months, v_mode).send({
      from: w_address
    })
  }
}

const chunk = function (arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

// founder: deposit founder tokens to list of investors LINEAR
export const depositFounderLinearTokensToInvestors = async (conn_provider, w_address, coinAddress, symbol, vest_id, tge_date, tge_pct, v_start, v_months, investors, vesting_mode) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  if (provider) {
    let investorData = [];
    for (let i = 0; i < investors.length; i++) {
      investorData.push({
        _tokens: parseFloat(investors[i].tokens).toFixed(4)*10000,
        _investor: investors[i].wallet_address,
        _tgeFund: (investors[i].tokens * tge_pct/100).toFixed(4)*10000
      })
    }
    const web3 = new Web3(provider);
    let tge_d = new Date(tge_date).valueOf();
    tge_d = tge_d.toString().substring(0, tge_d.toString().length - 3);
    let v_s_date = new Date(v_start).valueOf();
    v_s_date = v_s_date.toString().substring(0, v_s_date.toString().length - 3);

    let chunks = chunk(investorData, 90);
    const batch = new web3.BatchRequest();
    // for (let i = 0; i < chunks.length; i++) {
    //   console.log("multi investors params: ", {_founder: w_address, _founSM: process.env.FOUNDER_CONTRACT_ADDRESS, _founderCoinAddress: coinAddress}, symbol, vest_id, parseInt(tge_d), parseInt(v_s_date), v_months, chunks[i], vesting_mode)
    //   batch.add(vestingContract.methods.depositFounderLinearTokensToInvestors({_founder: w_address, _founSM: process.env.FOUNDER_CONTRACT_ADDRESS, _founderCoinAddress: coinAddress}, symbol, vest_id, parseInt(tge_d), parseInt(v_s_date), v_months, chunks[i], vesting_mode).send.request({
    //     from: w_address
    //   }, (err, result) => {
    //     console.log('err:', err);
    //     console.log('result:', result);
    //   }));
    // }

    // return await batch.execute();
    let promises = chunks.map(chunk_data => {
      return new Promise((resolve, reject) => {
        console.log("multi investors params: ", {_founder: w_address, _founSM: process.env.FOUNDER_CONTRACT_ADDRESS, _founderCoinAddress: coinAddress}, symbol, vest_id, parseInt(tge_d), parseInt(v_s_date), v_months, chunk_data, vesting_mode)
        let request = vestingContract.methods.depositFounderLinearTokensToInvestors({_founder: w_address, _founSM: process.env.FOUNDER_CONTRACT_ADDRESS, _founderCoinAddress: coinAddress}, symbol, vest_id, parseInt(tge_d), parseInt(v_s_date), v_months, chunk_data, vesting_mode).send.request({from: w_address}, (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
        batch.add(request);
      });
    });

    batch.execute();

    return Promise.all(promises)
    // return await vestingContract.methods.depositFounderLinearTokensToInvestors({_founder: w_address, _founSM: process.env.FOUNDER_CONTRACT_ADDRESS, _founderCoinAddress: coinAddress}, symbol, vest_id, parseInt(tge_d), tge_fund, parseInt(v_s_date), v_months, investorData, vesting_mode).send({
    //   from: w_address
    // })
  }
}

// founder: deposit founder tokens in non-linear
export const depositFounderNonLinearTokens = async (conn_provider, w_address, coinAddress, symbol, vest_id, value, i_address, tge_date, tge_pct) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  let tge_d = new Date(tge_date).valueOf();
  tge_d = tge_d.toString().substring(0, tge_d.toString().length - 3);

  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    let tge_pct_val = value * tge_pct/100;
    let tge_fund = web3.utils.toWei(tge_pct_val.toString(), 'ether');
    console.log('non-linear request data: ', w_address, coinAddress, process.env.FOUNDER_CONTRACT_ADDRESS, symbol, vest_id, balance, i_address, tge_d, tge_fund);
    return await vestingContract.methods.depositFounderNonLinearTokens(w_address, coinAddress, process.env.FOUNDER_CONTRACT_ADDRESS, symbol, vest_id, balance, i_address, tge_d, tge_fund).send({
      from: w_address
    })
  }
}

// founder: set non-linear installments
export const setNonLinearInstallments = async (conn_provider, w_address, vest_id, i_address, dues) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  let duesData = [];
  for (let i = 0; i < dues.length; i++) {
    let tge_d = new Date(dues[i].date).valueOf();
    tge_d = tge_d.toString().substring(0, tge_d.toString().length - 3);
    let due = {
      _dateDue: parseInt(tge_d),
      _fundDue: parseFloat(dues[i].tokens).toFixed(4)*10000
    }
    duesData.push(due);
  }

  console.log('non-linear installments data: ', w_address, process.env.FOUNDER_CONTRACT_ADDRESS, vest_id, i_address, duesData);
  return await vestingContract.methods.setNonLinearInstallments(w_address, process.env.FOUNDER_CONTRACT_ADDRESS, vest_id, i_address, duesData).send({
    from: w_address
  })
}

// investor: withdraw TGE fund
export const withdrawTGEFund = async (conn_provider, w_address, f_address, vest_id, symbol) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  return await vestingContract.methods.withdrawTGEFund(w_address, f_address, vest_id, symbol).send({
    from: w_address
  })
}

// investor: withdraw installment amount
export const withdrawInstallmentAmount = async (conn_provider, w_address, f_address, vest_id, due_no, symbol) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  return await vestingContract.methods.withdrawInstallmentAmount(w_address, f_address, vest_id, due_no, symbol).send({
    from: w_address
  })
}

// investor: withdraw unlocked fund
export const withdrawBatch = async (conn_provider, f_address, w_address, vest_id, symbol) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  symbol = await getSymbol(conn_provider, symbol);
  return await vestingContract.methods.withdrawBatch(f_address, w_address, vest_id, symbol).send({
    from: w_address
  })
}


// read actions ***************************

export const isFounder = async (conn_provider, w_address) => {
  if (!isFounderInitialized) {
    await initiateFounderContract(conn_provider)
  }

  return await founderContract.methods.verifyFounder(w_address).call()
}

export const checkValidatorIsRegistered = async (conn_provider, w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract(conn_provider)
  }

  return await factoryContract.methods.returnArray()
  .call()
  .then((validators) => {
    return validators.includes(w_address);
  });
}

export const whoApproved = async (conn_provider, proj_id, sub_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._approvedValidators(proj_id, sub_prop_id)
  .call()
  .then((approvals) => {
    console.log(approvals, "approvals")
    return approvals
  })
}

export const whoRejected = async (conn_provider, proj_id, sub_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._rejectedValidators(proj_id, sub_prop_id).call()
}

export const getInitialProposalRequestedFund = async (conn_provider, proj_id, in_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getInitialProposalRequestedFund(proj_id, in_prop_id)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getInvestorCurrentBalance = async (conn_provider, proj_id, investor) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getInvestorCurrentBalance(proj_id, investor)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getInvestorInvestedBalance = async (conn_provider, proj_id, investor) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getInvestorInvestedBalance(proj_id, investor)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getProjectCurrentCycle = async (conn_provider, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getProjectCurrentCycle(proj_id).call()
}

export const getProjectCycles = async (conn_provider, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getProjectCycles(proj_id).call()
}

export const getProjectEscrowBalance = async (conn_provider, proj_id, founder) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getProjectEscrowBalance(proj_id, founder)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getProjectStatus = async (conn_provider, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getProjectStatus(proj_id).call()
}

export const getRejectedSubsequentProposalsCount = async (conn_provider, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getRejectedSubsequentProposalsCount(proj_id).call()
}

export const getSubsequentProposalFund = async (conn_provider, proj_id, sub_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getSubsequentProposalFund(proj_id, sub_prop_id)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getSubsequentProposalStatus = async (conn_provider, proj_id, sub_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getSubsequentProposalStatus(proj_id, sub_prop_id)
  .call()
}

export const getTheSubsequentProposalWithdrawalStatus = async (conn_provider, proj_id, sub_prop_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getTheSubsequentProposalWithdrawalStatus(proj_id, sub_prop_id)
  .call()
}

export const getTheTenpercentWithdrawalStatus = async (conn_provider, proj_id, investor) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getTheTenpercentWithdrawalStatus(proj_id, investor)
  .call()
}

export const getProjectCurrentEscrowBalance = async (conn_provider, proj_id) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getProjectCurrentEscrowBalance(proj_id)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getTotalReleasedFundsToFounderFromEscrow = async (conn_provider, proj_id, founder) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._getTotalReleasedFundsToFounderFromEscrow(proj_id, founder)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const checkTenPercentOfStableToken = async (conn_provider, proj_id, investor) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._checkTenPecentOfStableToken(proj_id, investor)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const investorDepositStatus = async (conn_provider, proj_id, investor) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract(conn_provider)
  }
  return await projAndPropContract.methods._depositStatus(proj_id, investor).call();
}

export const currentEscrowBalanceOfInvestor = async (conn_provider, founder, vest_id, investor) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  return await vestingContract.methods.currentEscrowBalanceOfInvestor(founder, vest_id, investor)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const investorInstallmentFund = async (conn_provider, vest_id, due_no, investor) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  return await vestingContract.methods.investorInstallmentFund(vest_id, due_no, investor)
  .call()
  .then((balance, date) => {
    return [Web3.utils.fromWei(balance), date];
  });
}

export const investorTGEFund = async (conn_provider, founder, vest_id, investor) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  return await vestingContract.methods.investorTGEFund(founder, vest_id, investor)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const investorWithdrawnFund = async (conn_provider, vest_id, investor) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  return await vestingContract.methods.investorWithdrawnFund(investor, vest_id)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const investorUnlockedFund = async (conn_provider, founder, investor, vest_id) => {
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }
  return await vestingContract.methods.investorUnlockedFund(founder, investor, vest_id)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const getSymbol = async (conn_provider, symbol) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);
    return web3.utils.fromAscii(symbol)
  }
}

export const isValidAddress = (conn_provider, address) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);
    return web3.utils.isAddress(address)
  }
}

export const getInvestorsEscrowFundDetails = async (conn_provider, records) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }

  if (provider) {
    const batch = new web3.BatchRequest();
    let promises = records.map(record => {
      return new Promise((resolve, reject) => {
        let request = vestingContract.methods.currentEscrowBalanceOfInvestor(record.founder, record.vest_id, record.investor)
        .call.request({from: '0x0000000000000000000000000000000000000000'}, (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
        batch.add(request);
      });
    });

    batch.execute();

    return Promise.all(promises)
  }
}

export const getInvestorsUnlockedFundDetails = async (conn_provider, records) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }

  if (provider) {
    const batch = new web3.BatchRequest();
    let promises = records.map(record => {
      return new Promise((resolve, reject) => {
        let request = vestingContract.methods.investorUnlockedFund(record.founder, record.investor, record.vest_id)
        .call.request({from: '0x0000000000000000000000000000000000000000'}, (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
        batch.add(request);
      });
    });

    batch.execute();

    return Promise.all(promises)
  }
}

export const getInvestorsWithdrawnFundDetails = async (conn_provider, records) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isVestingInitialized) {
    await initiateVestingContract(conn_provider)
  }

  if (provider) {
    const batch = new web3.BatchRequest();
    let promises = records.map(record => {
      return new Promise((resolve, reject) => {
        let request = vestingContract.methods.investorWithdrawnFund(record.investor, record.vest_id)
        .call.request({from: '0x0000000000000000000000000000000000000000'}, (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
        batch.add(request);
      });
    });

    batch.execute();

    return Promise.all(promises)
  }
}

export const getApprovedAllowance = async (conn_provider, founder, token_contract_address) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);

    founderCoinContract = new web3.eth.Contract(
      founderCoinAbi,
      token_contract_address
    );
    return await founderCoinContract.methods.allowance(founder, process.env.VESTING_CONTRACT_ADDRESS)
    .call()
    .then((balance) => {
      return Web3.utils.fromWei(balance);
    });
  }
}

export const getFee = async (effectiveGasPrice, gasUsed) => {
  return Web3.utils.fromWei((effectiveGasPrice * gasUsed).toString());
}