import escrowAbi from './escrowABI.json';
import founderAbi from './founderABI.json';
import stableCoinAbi from './stableCoinABI.json';
import projectAbi from './projectABI.json';
import factoryAbi from './factoryABI.json';
import Web3 from 'web3';
import regeneratorRuntime from "regenerator-runtime";

let selectedAcAddress;
let isInitialized = false;
let escrowContract;
let isFounderInitialized = false;
let founderContract;
let isStableInitialized = false;
let stableContract;
let isProjectInitialized = false;
let projectContract;
let isFactoryInitialized = false;
let factoryContract;

// internal: detect the wallet provider
const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  }
  return provider;
};

// main: initiate the metamask wallet (used it in header part)
export const initiateNetwork = async () => {
  try {
    const currentProvider = detectCurrentProvider();
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
        selectedAcAddress = account;
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

// common: initiate the escrow contract to do actions on it
export const initiateContract = async () => {
  let provider = detectCurrentProvider()

  if (provider) {
    const web3 = new Web3(provider);

    escrowContract = new web3.eth.Contract(
      escrowAbi,
      process.env.ESCROW_CONTRACT_ADDRESS
    );

    isInitialized = true;
    // console.log("escrowContract", escrowContract)
  }
};

// common initiate the factory contract to do actions on it
export const initiateFactoryContract = async () => {
  let provider = detectCurrentProvider()

  if (provider) {
    const web3 = new Web3(provider);

    factoryContract = new web3.eth.Contract(
      factoryAbi,
      process.env.FACTORY_CONTRACT_ADDRESS
    );

    isFactoryInitialized = true;
    // console.log("escrowContract", escrowContract)
  }
}

// common: initiate project contract
export const initiateProjectContract = async () => {
  let provider = detectCurrentProvider()

  if (provider) {
    const web3 = new Web3(provider);
    projectContract = new web3.eth.Contract(
      projectAbi,
      process.env.PROJECT_CONTRACT_ADDRESS
    );

    isProjectInitialized = true;
  }
}

// common: approve founder contract to deposit founder tokens - F 04
export const approveByFounderContract = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (provider) {
    const web3 = new Web3(provider);

    founderContract = new web3.eth.Contract(
      founderAbi,
      process.env.FOUNDER_CONTRACT_ADDRESS
    );
    value = parseFloat(value)*5;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isFounderInitialized = true;
    return await founderContract.methods.approve(process.env.ESCROW_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// common: approve stable contract to do deposit or withdraw
export const approveByStableContract = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (provider) {
    const web3 = new Web3(provider);

    stableContract = new web3.eth.Contract(
      stableCoinAbi,
      process.env.STABLE_COIN_ADDRESS
    );
    value = parseFloat(value)*5;
    let balance = web3.utils.toWei(value.toString(), 'ether');
    isStableInitialized = true;
    return await stableContract.methods.approve(process.env.ESCROW_CONTRACT_ADDRESS, balance).send({
       from: w_address
    })
  } else return false;
}

// founder action: add proposal - F 01
export const addFounderAndProposal = async (w_address, name, proposal, proposalId) => { // founder address
  if (!isProjectInitialized) {
    await initiateProjectContract()
  }
  if (!isProjectInitialized) await initiateProjectContract();
  return await projectContract.methods.addFounderAndProposal(w_address, name, proposal, proposalId).send({
    from: w_address
  })
}

// founder or anyone: verify proposal - F 02
export const verifyProposalId = async (w_address, pId) => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.verifyProposalId(process.env.PROJECT_CONTRACT_ADDRESS, pId ).send({
    from: w_address
  })
}

// founder action: set founder and super admin - F 03 NEED TO REMOVE THE SUPER ADMIN INVOLVEMENT
export const setFounderAndSuperAdmin = async (w_address, saAddress, value) => { // founder address, super admin address
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.setFounderAndSuperAdmin(w_address, saAddress, balance).send({
      from: w_address
    })
  }
}

// founder action: deposite founder tokens - F 05
export const depositeFounderTokens = async (w_address, amount) => { // escrow smart contract address
  let provider = detectCurrentProvider();

  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isFounderInitialized) {
    status = await approveByFounderContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = founderContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.depositFoundersToken(balance, symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// founder action: withdraw 10 percent of single token deposit - THIS DEPENDS ON depositTokens, this as that feature to support 10%
export const withdraw10pecentTokens = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    return await escrowContract.methods.Withdraw10PercentOfSingleTokenDeposit(symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// founder action: withdraw all tokens from the pool based on validators approval
export const withdrawTokensFromPool = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.withdrawAllTokenFromThePool(balance, symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// founder action: transfer founder token to inventor 
export const transferFounderTokenToInvenstor = async (w_address, amount, address) => { // investor address
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isFounderInitialized) {
    status = await approveByFounderContract(w_address, amount)
  }

  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = founderContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.transferFounderTokenToInvestors(balance, address, symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// investor action: deposit tokens based on validations - I 02
export const depositTokens = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.depositTokens(balance, symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// investor action: direct deposit without validations - NEGLECTING THIS FEATURE AS PER THE REQUIREMENT CHANGE
/*export const directDepositTokens = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.DirectDepositTokens(balance, symbol_byte).send({
      from: w_address
    })
  } else return null;
}*/

// investor action: withdraw stable tokens
export const withdrawTokens = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    let balance = web3.utils.toWei(amount, 'ether');
    return await escrowContract.methods.withdrawTokens(balance, symbol_byte).send({
      from: w_address
    })
  } else return null;
}

// admin action: add validators - REMOVED THIS ACTION FROM THE REQUIREMENT validators are not needed any approval to act like a validator
/*export const addValidators = async (address, name) => { // validator wallet address
  if (!isInitialized) {
    await initiateContract()
  }

  return await escrowContract.methods.addValidators(address, name).send({
    from: selectedAcAddress
  })
}*/

// admin action: whitelist token - THIS ACTION NEED TO BE HANDLED FROM BLOCKCHAIN not from the user
/*export const whitelistToken = async (w_address, amount) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(w_address, amount)
  }

  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    return await escrowContract.methods.whitelistToken(symbol_byte, process.env.STABLE_COIN_ADDRESS).send({
      from: w_address
    })
  } else return null;
}*/

// admin action: update validators decision - REMOVED THIS ACTION FROM THE REQUIREMENT
/*export const updateValidatorsDecision = async (i, address, status) => { // validator address
  if (!isInitialized) {
    await initiateContract()
  }

  return await escrowContract.methods.SuperAdminDecision(i, address, status).send({
    from: selectedAcAddress
  })
}*/

// validator action: validate proposal
export const validate = async (status) => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.Validate(status).send({
    from: selectedAcAddress
  })
}

// 28-MAY *******************

// founder action: add initial proposal
export const addFounderAndProposalV1 = async (w_address, name, proposal, proposalId) => {
  if (!isProjectInitialized) {
    await initiateProjectContract()
  }
  
  return await projectContract.methods.addFounderAndProposal(w_address, name, proposal, proposalId).send({
    from: w_address
  })
}

// founder action: add subsequent proposal
export const addSubsequentProposalV1 = async (w_address, name) => {
  if (!isProjectInitialized) {
    await initiateProjectContract()
  }
  
  return await projectContract.methods.addSubsequentProposal(w_address, name).send({
    from: w_address
  })
}

// founder action: verify created proposal
export const verifyProposalV1 = async (w_address, proposalId) => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.verifyProjectContractAndProposalContract(process.env.PROJECT_CONTRACT_ADDRESS, proposalId ).send({
    from: w_address
  })
}

// founder action: set founder and value
export const setFounderAndValueV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.setFounderAndTotalValueForProject(w_address, balance).send({
      from: w_address
    })
  }
}

// founder action: deposit founder tokens
export const depositeFounderTokensV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();

  if (!isInitialized) {
    await initiateContract()
  }

  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    console.log(value, ' founder token getting to deposit as ', balance);
    return await escrowContract.methods.depositFoundersToken(balance, process.env.FOUNDER_SYMBOL, process.env.FOUNDER_CONTRACT_ADDRESS).send({
      from: w_address
    })
  } else return null;
}

// founder action: withdraw 10% of stable tokens
export const withdraw10percentStableTokensV1 = async (w_address) => {
  if (!isInitialized) {
    await initiateContract()
  }

  return await escrowContract.methods.Withdraw10PercentOfStableCoin(process.env.STABLE_COIN_SYMBOL).send({
    from: w_address
  })
}

// founder action: withdraw all stable coins from pool
export const withdrawAllTokenFromThePoolV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.withdrawAllStableCoinFromThePool(balance, process.env.STABLE_COIN_SYMBOL).send({
      from: w_address
    })
  } else return null;
}

// investor action: deposit stable tokens
export const depositStableTokensV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }
  
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.depositTokens(balance, process.env.STABLE_COIN_SYMBOL, process.env.STABLE_COIN_ADDRESS).send({
      from: w_address
    })
  } else return null;
}

// investor action: withdraw 10% of founder tokens
export const withdraw10percentFounderTokensV1 = async (w_address) => {
  if (!isInitialized) {
    await initiateContract()
  }

  return await escrowContract.methods.Withdraw10PercentOfFounderToken(process.env.FOUNDER_SYMBOL).send({
    from: w_address
  })
}

// investor action: withdraw all founder tokens from pool
export const withdrawAllFounderTokenFromThePoolV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.withdrawAllFounderTokenFromThePool(balance, process.env.FOUNDER_SYMBOL).send({
      from: w_address
    })
  } else return null;
}

// investor action: withdraw all stable coins back
export const withdrawTokensV1 = async (w_address, value) => {
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }
  
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(value, 'ether');
    return await escrowContract.methods.withdrawTokens(balance, process.env.STABLE_COIN_SYMBOL).send({
      from: w_address
    })
  } else return null;
}

// validator action: add validator
export const addValidator = async (w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract()
  }

  return await factoryContract.methods.addValidators(w_address).send({
    from: w_address
  })
}

// validator action: add validation
export const validateProposal = async (w_address, status) => {
  if (!isInitialized) {
    await initiateContract()
  }

  return await escrowContract.methods.Validate(status, w_address, process.env.FACTORY_CONTRACT_ADDRESS).send({
    from: w_address
  })
}

// 28-MAY work end ***************

// ********** read actions ********** //

// get the proposal founder address
export const proposalFounder = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.Founder().call()
}

// get the proposal super admin address
export const superAdminAddress = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.SuperAdmin().call()
}

// total value allocated to the proposal contract
export const allocatedValueOfProposalContract = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.TotalValueAllocatedForTheProposalContract()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// get investors balance
export const investorBalances = async (address) => { // investor address
  let provider = detectCurrentProvider();
  if (!isInitialized) {
    await initiateContract()
  }

  let status = false;
  if (!isStableInitialized) {
    status = await approveByStableContract(address, amount)
  }
  if (status && provider) {
    const web3 = new Web3(provider);
    const symbol = stableContract.methods.symbol().call();
    const symbol_byte = web3.utils.toAscii(symbol);
    return escrowContract.methods.accountBalances(address, symbol_byte)
    .call()
    .then((balance) => {
      return Web3.utils.fromWei(balance);
    });
  } else return null;
}

// get the contract deployer address
export const contractDeployer = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.contractDeployer().call()
}

// get huge deposit of single founder
export const singleUserFounderWithdraw = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.singleUserFounderWithdraw()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// get huge deposit of single investor
export const singleUserHugeDeposit = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.singleUserHugeDeposit()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// total deposited founder token in the pot. deposit done by founder
export const totalDepositedFounderTokens = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.totalDepositedFounderTokenInPot()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// total deposited stable coins of investor
export const totalDepostedStableCoins = async (address) => { // investor address
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.totalDepositedStableCoins(address)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// total deposited stable coins of all investors
export const totalDepositedStableCoinsInThePot = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.totalDepositedStableCoinsInThePot()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// total founder tokens
export const totalFounderTokens = async (address) => { // founder address
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.totalFoundersToken(address)
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// total value for project or expected value
export const totalProjectValue = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return escrowContract.methods.totalValueForProject()
  .call()
  .then((balance) => {
    return Web3.utils.fromWei(balance);
  });
}

// check the validator vote status
export const validatorVoteStatus = async (address) => { // validator address
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.voterRegister(address).call()
}

// read all investors
export const readAllInvestors = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.readAllInvestors().call()
}

// read all validators
export const readAllValidators = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.readAllValidators().call()
}

export const readValidatorWhoApproved = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.readValidatorWhoApproved().call()
}

export const readValidatorWhoRejected = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.readValidatorWhoRejected().call()
}

export const totalValidators = async () => {
  if (!isInitialized) {
    await initiateContract()
  }
  return await escrowContract.methods.totalValidators().call()
}

export const isThisValidator = async (w_address) => {
  if (!isFactoryInitialized) {
    await initiateFactoryContract()
  }

  return await factoryContract.methods.isValidatorOrNot(w_address).call()
}