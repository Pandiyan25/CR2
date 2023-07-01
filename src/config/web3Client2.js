import projANdPropAbi from './projectAndProposalABI2.json';
import founderAbi from './founderABI2.json';
import factoryAbi from './factoryABI2.json';
import stableCoinAbi from './stableCoinABI2.json';
import founderCoinAbi from './founderCoinABI2.json';
import Web3 from 'web3';
import regeneratorRuntime from "regenerator-runtime";

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

// internal: detect the wallet provider
const detectCurrentProvider = (conn_provider = 'metamask') => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  }
  if (provider &&
    provider.providers &&
    provider.providers.length &&
    conn_provider === 'metamask') {
    provider = window.ethereum.providers.find((x) => x.isMetaMask);
  } else if (provider &&
    provider.providers &&
    provider.providers.length &&
    conn_provider === 'coinbase') {
    provider = window.ethereum.providers.find((x) => x.isCoinbaseWallet);
  }
  console.log("provider", provider)
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
      const account = userAccount[0];
      let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
      ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei
      if (userAccount.length === 0) {
        return new Error('Please connect to meta mask');
      } else {
        return {ethBalance, account, chainId, networkId};
      }
    } else return new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
  } catch (err) {
    console.log(err);
    return new Error(
      'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
    );
  }
}

// common: initiate project and proposal contract
export const initiateProjAndPropContract = async () => {
  let provider = detectCurrentProvider()

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
export const initiateFactoryContract = async () => {
  let provider = detectCurrentProvider()

  if (provider) {
    const web3 = new Web3(provider);

    factoryContract = new web3.eth.Contract(
      factoryAbi,
      process.env.FACTORY_CONTRACT_ADDRESS
    );

    isFactoryInitialized = true;
  }
}

// common: initiater the founder contract
export const initiateFounderContract = async () => {
  let provider = detectCurrentProvider()

  if (provider) {
    const web3 = new Web3(provider);

    founderContract = new web3.eth.Contract(
      founderAbi,
      process.env.FOUNDER_CONTRACT_ADDRESS
    );

    isFounderInitialized = true;
  }
}

// common: approve founder contract to deposit founder tokens - F 04
export const approveByFounderCoinContract = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (provider) {
    const web3 = new Web3(provider);

    founderCoinContract = new web3.eth.Contract(
      founderCoinAbi,
      process.env.FOUNDER_COIN_ADDRESS
    );
    value = parseFloat(value)*15;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isFounderCoinInitialzed = true;
    return await founderCoinContract.methods.approve(process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// common: approve stable contract to do deposit or withdraw
export const approveByStableContract = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (provider) {
    const web3 = new Web3(provider);

    stableCoinContract = new web3.eth.Contract(
      stableCoinAbi,
      process.env.STABLE_COIN_ADDRESS
    );
    value = parseFloat(value)*15;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isStableCoinInitialized = true;
    return await stableCoinContract.methods.approve(process.env.PROJECT_AND_PROPOSAL_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// founder: add founder
export const addFounder = async (w_address) => {
  if (!isFounderInitialized) {
    await initiateFounderContract()
  }

  return await founderContract.methods.addFounder(w_address).send({
    from: w_address
  })
}

// founder: set founder and project value
export const setFounderAndTotalValueForProject = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.setFounderAndTotalValueForProject(process.env.FOUNDER_CONTRACT_ADDRESS, w_address, balance).send({
      from: w_address
    })
  }
}

// founder: set initial proposal id
export const setInitialProposalId = async (w_address, pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.setInitialId(pId).send({
    from: w_address
  })
}

// founder: set subsequent proposal id
export const setSubsequentProposalId = async (w_address, pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.setSubsequentId(pId).send({
    from: w_address
  })
}

// founder: deposit founder tokens to the intial proposal NOTE: before this, call approveByFounderCoinContract
export const depositFoundersToken = async (w_address, value, pId) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.depositFoundersToken(balance, process.env.FOUNDER_SYMBOL, process.env.FOUNDER_COIN_ADDRESS, pId).send({
      from: w_address
    })
  }
}

// investor: deposit stable coins to the initial proposal NOTE: before this, call approveByStableContract
export const depositTokens = async (w_address, value, pId) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    console.log(balance, process.env.STABLE_COIN_SYMBOL, process.env.STABLE_COIN_ADDRESS, pId)
    return await projAndPropContract.methods.depositTokens(balance, process.env.STABLE_COIN_SYMBOL, process.env.STABLE_COIN_ADDRESS, pId).send({
      from: w_address
    })
  }
}

// investor: withdraw 10% of founder tokens
export const Withdraw10PercentOfFounderToken = async (w_address, pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.Withdraw10PercentOfFounderToken(process.env.FOUNDER_SYMBOL, pId).send({
    from: w_address
  })
}

// founder: withdraw 10% of stable tokens
export const Withdraw10PercentOfStableCoin = async (w_address, pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.Withdraw10PercentOfStableCoin(process.env.STABLE_COIN_SYMBOL, pId).send({
    from: w_address
  })
}

// validator: add validator
export const addValidator = async (w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract()
  }
  return await factoryContract.methods.addValidators(w_address).send({
    from: w_address
  })
}

// validator: validate subsequent proposal
export const validateProposal = async (w_address, choice, pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.Validate(choice, w_address, process.env.FACTORY_CONTRACT_ADDRESS, pId).send({
    from: w_address
  })
}

// invenstor: withdraw all founder tokens
export const withdrawAllFounderTokenFromThePool = async (w_address, value, pId) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.withdrawAllFounderTokenFromThePool(balance, process.env.FOUNDER_COIN_ADDRESS, pId).send({
      from: w_address
    })
  }
}

// founder: withdraw all stable tokens
export const withdrawAllStableCoinFromThePool = async (w_address, value, pId) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.withdrawAllStableCoinFromThePool(balance, process.env.STABLE_COIN_SYMBOL, pId).send({
      from: w_address
    })
  }
}

// investor: withdraw all stable tokens
export const withdrawTokens = async (w_address, value, pId) => {
  let provider = detectCurrentProvider();
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await projAndPropContract.methods.withdrawTokens(balance, process.env.STABLE_COIN_SYMBOL, pId).send({
      from: w_address
    })
  }
}

// read actions ***************************

export const checkValidatorIsRegistered = async (w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract()
  }

  return await factoryContract.methods.returnArray()
  .call()
  .then((validators) => {
    return validators.includes(w_address);
  });
}

export const whoApproved = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  console.log(pId)
  return await projAndPropContract.methods.whoApprovedSubsequentProposalBasedOnId(pId)
  .call()
  .then((approvals) => {
    console.log(approvals, "approvals")
    return approvals
  })
}

export const whoRejected = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.whoRejectedSubsequentProposalBasedOnId(pId).call()
}

export const getFounder = async () => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.founder().call()
}

export const tenPecentOfFounderToken = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.getTenPercentBalanceOfFounderToken(pId)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const tenPecentOfStableToken = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.getTenPercentBalanceOfStableCoin(pId)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const totalDepositedFounderTokenInPot = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.gettotalDepositedFounderTokenInPot(pId)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

export const totalDepositedStableCoinsInThePot = async (pId) => {
  if (!isProjAndPropInitialized) {
    await initiateProjAndPropContract()
  }
  return await projAndPropContract.methods.gettotalDepositedStableCoinsInThePot(pId)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}