import stableTokenAbi from './stableCoinABI2.json'
import founderLoginAbi from './founderLoginABI.json';
import investorLoginAbi from './investorLoginABI.json';
import roundAbi from './roundABI.json';
import Web3 from 'web3';
import regeneratorRuntime, { async } from "regenerator-runtime";

let isRoundContractInitialized = false;
let roundContract;

let isInvestorInitialized = false;
let investorContract;

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

// common: approve stable contract to do deposit or withdraw
export const approveByStableTokenContract = async (conn_provider, w_address, stableTokenAddress, value) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);

    let stableTokenContract = new web3.eth.Contract(
      stableTokenAbi,
      stableTokenAddress
    );
    let balance = web3.utils.toWei(value.toString(), 'ether');
    return await stableTokenContract.methods.approve(process.env.ROUND_CONTRACT_ADDRESS, balance).send({
        from: w_address
    })
  } else return false;
}

// common: get approved tokens number
export const getApprovedAllowance = async (conn_provider, w_address, stableTokenAddress) => {
  let provider = detectCurrentProvider(conn_provider);
  if (provider) {
    const web3 = new Web3(provider);

    let stableTokenContract = new web3.eth.Contract(
      stableTokenAbi,
      stableTokenAddress
    );
    return await stableTokenContract.methods.allowance(w_address, process.env.ROUND_CONTRACT_ADDRESS)
    .call()
    .then((balance) => {
      return Web3.utils.fromWei(balance);
    });
  }
}

// common: initiate project and proposal contract
export const initiateRoundContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);
    roundContract = new web3.eth.Contract(
      roundAbi,
      process.env.ROUND_CONTRACT_ADDRESS
    );

    isRoundContractInitialized = true;
  }
}

// common: initiate the investor contract
export const initiateInvestorContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);

    investorContract = new web3.eth.Contract(
      investorLoginAbi,
      process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS
    );

    isInvestorInitialized = true;
  }
}

// investor: create a private round
export const createPrivateRound = async (conn_provider, w_address, founder, roundId, tokenContract, requestedFund, initialPct, milestones) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  if (provider) {
    return await roundContract.methods.createPrivateRound(roundId, process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS, initialPct, milestones).send({
      from: w_address
    })
  }
}

// investor: get contract id
export const getContractAddress = async (conn_provider, roundId) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.getContractAddress(roundId)
    .call()
    .then((c_address) => {
      console.log(c_address, "c_address")
      return c_address.toString();
    })
}

// investor: deposit tokens
export const depositTokens = async (conn_provider, w_address, tokenContract, founder, requestedFund, roundId) => {
  let provider = detectCurrentProvider(conn_provider);
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  if (provider) {
    const web3 = new Web3(provider);
    let balance = web3.utils.toWei(requestedFund.toString(), 'ether');
    return await roundContract.methods.depositTokens(tokenContract, process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS, founder, balance, roundId).send({
      from: w_address
    })
  }
}

// founder: withdraw initial fund
export const withdrawInitialPct = async (conn_provider, w_address, tokenContract, roundId) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.withdrawInitialPercentage(tokenContract, process.env.FOUNDER_CONTRACT_ADDRESS, roundId).send({
    from: w_address
  })
}

// founder: send milestone validation request
export const milestoneValidationRequest = async (conn_provider, w_address, milestoneId, roundId) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.milestoneValidationRequest(process.env.FOUNDER_CONTRACT_ADDRESS, milestoneId, roundId).send({
    from: w_address
  })
}

// investor: validate milestone
export const validateMilestone = async (conn_provider, w_address, milestoneId, roundId, status) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.validateMilestone(process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS, milestoneId, roundId, status).send({
    from: w_address
  })
}

// founder: withdraw individual milestone tokens
export const withdrawIndividualMilestoneByFounder = async (conn_provider, w_address, investor, roundId, milestoneId, pct, tokenContract) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.withdrawIndividualMilestoneByFounder(process.env.FOUNDER_CONTRACT_ADDRESS, investor, roundId, milestoneId, pct, tokenContract).send({
    from: w_address
  })
}

// investor: withdraw locked invididual milestone tokens
export const withdrawIndividualMilestoneByInvestor = async (conn_provider, w_address, roundId, milestoneId, pct, founder, tokenContract) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.withdrawIndividualMilestoneByInvestor(process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS, roundId, founder, milestoneId, pct, tokenContract).send({
    from: w_address
  })
}

// investor: withdraw locked tokens once the round is rejected
export const batchWithdrawByInvestors = async (conn_provider, w_address, roundId, founder, tokenContract) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.batchWithdrawByInvestors(process.env.INVESTOR_LOGIN_CONTRACT_ADDRESS, roundId, founder, tokenContract).send({
    from: w_address
  })
}

// admin: change admin wallet address
export const changeAdminAddress = async (conn_provider, w_address, new_address) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.changeAdminAddress(new_address).send({
    from: w_address
  })
}

// investor: add investor
export const addInvestor = async (conn_provider, w_address) => {
  if (!isInvestorInitialized) {
    await initiateInvestorContract(conn_provider)
  }

  return await investorContract.methods.addInvestor(w_address).send({
    from: w_address
  })
}


// ++++++++++ read actions +++++++++++

export const isInvestor = async (conn_provider, investor) => {
  if (!isInvestorInitialized) {
    await initiateInvestorContract(conn_provider)
  }

  return await investorContract.methods.verifyInvestor(investor).call()
}

export const initialWithdrawStatus = async (conn_provider, roundId, founder) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.initialWithdrawStatus(roundId, founder).call()
}

export const milestoneWithdrawStatus = async (conn_provider, roundId, milestoneId) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.milestoneWithdrawStatus(roundId, milestoneId).call()
}

export const roundStatus = async (conn_provider, roundId) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.projectStatus(roundId).call()
}

export const remainingTokensOfInvestor = async (conn_provider, roundId, investor) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.remainingTokensOfInvestor(roundId, investor).call()
}

export const tokenStatus = async (conn_provider, roundId, founder, investor) => {
  if (!isRoundContractInitialized) await initiateRoundContract(conn_provider)
  return await roundContract.methods.tokenStatus(roundId, founder, investor)
  .call()
  .then((tokens) => {
    console.log("tokens", tokens);
    return {
      unlockedAmount: Web3.utils.fromWei(tokens.unlockedAmount),
      lockedAmount: Web3.utils.fromWei(tokens.lockedAmount),
      withdrawnTokensByFounder: Web3.utils.fromWei(tokens.withdrawnTokensByFounder)
    }
  })
}
