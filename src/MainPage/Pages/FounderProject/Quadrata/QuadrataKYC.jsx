import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiURI } from "../../../../config/config";
import { ethers } from "ethers";
import { id } from "ethers/lib/utils";
import { detectCurrentProvider } from "../../../../config/web3Client3";
import { Page, QuadrataIssuer } from "@quadrata/kyc-react";
import { StyledQuadrataKyc } from "./QuadrataKyc.styled";
// import quadratalogo from "./img/quadrata.png"
import logo from "./img/quad-logo.png"
import Lottie from "react-lottie-player";
import lottieJson from "../../../../assets/lottie/96673-success.json";
import {userConnectedWalletDetails} from "../../../../reducers/ConstantSlice";
import QUAD_READER_ABI from "@quadrata/contracts/abis/QuadReader.json";
import "./quadrata.css";
import Web3 from 'web3';
// Quadrata Passport
import QUAD_PASSPORT_ABI from "@quadrata/contracts/abis/QuadPassport.json";
const QUAD_PASSPORT_ADDRESS = process.env.QUADRATA_PASSPORT_ADDRESS;

// Issuers credentials
const quadrataIssuers = {
  // Contact SpringLabs.com to request a testnet API key and a backend URL.
  [QuadrataIssuer.SPRINGLABS]: {
    API_KEY: process.env.SPRINGLABS_APIKEY,
    API_URL: process.env.SPRINGLABS_BACKEND_URL,
  },
};

const ErrorType = {
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
  OTHER: "OTHER",
};

const generateErrorMessage = (error) => {
  if (error)
    return error === ErrorType.INSUFFICIENT_FUNDS
      ? "Insufficient funds"
      : "Something went wrong";
};

const QuadrataKYC = () => {
  // State
  const [errorType, setErrorType] = useState("");
  const [signer, setSigner] = useState({});
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [provider, setProvider] = useState({});
  const [signature, setSignature] = useState({});
  const [mintComplete, setMintComplete] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isVerified, setVerification] = useState(false);
  const [isBackendVerified, setBackendVerified] = useState(false);
  const loginId = useSelector((state) => state.constVar.loginId);
  const [isMinting, setIsMinting] = useState("");
  const walletAddress = useSelector((state) => state.constVar.walletAddress);
  const userConnectedWalletDetailsData = useSelector((state) => state.constVar.userConnectedWalletDetails);


  const [showPopup, setShowPopup] = useState(false);

  async function checkConnectedWallet() {

    const userData = JSON.parse(localStorage.getItem("userAccount"));
    // console.log("1234 UserData in Connect wallet func Local Storage",userData);

    if (userData != null && userData.account) {
      if(userData.connectionid === 80001){
        // Connecting ethereum injected provider (you may use any other provider)
        const provider = new ethers.providers.Web3Provider(
          detectCurrentProvider(userData.provider)
          );
        await checkAvailablePassportAttribute();
        setProvider(provider);
        setChainId(userData.connectionid);
        setUserInfo(userData);
        setAccount(userData.account);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        setSigner(signer);
        setIsConnected(true);
      }
      else{
        alert("Please Switch to Mumbai Testnet to Start KYC Verification Process");
      }
    }
  }


  
  const checkAvailablePassportAttribute = async () => {
    // validate quadrata passport
    // Wraps a standard Web3Provider, which is
    // what MetaMask injects as window.ethereum into each page
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    const currentProvider = detectCurrentProvider(userData.provider);
    const provider = new ethers.providers.Web3Provider(currentProvider);
    await provider.send("eth_requestAccounts", []);

    // The QuadReader address
    const readerContractAddress = process.env.QUADRATA_READER_CONTRACT_ADDRESS;
    const attributeType = id("AML");
    console.log('QUADRATA_READER_CONTRACT_ADDRESS', readerContractAddress);
    console.log('QUADRATA_PASSPORT_ADDRESS', QUAD_PASSPORT_ADDRESS);
    // The QuadReader Contract object
    const readerContract = new ethers.Contract(
      readerContractAddress,
      QUAD_READER_ABI,
      provider
    );

    // Checking if a wallet owns a passport with attributes being issued
    return readerContract
      .balanceOf(userData.account, attributeType)
      .then(async (balance) => {
        // balance returned is a BigNumber object, checking if it's greater than zero.
        if (balance.isZero()) {
          // address does not own a passport with this attribute.
          setVerification(false);
        } else {
          // address has a Quadrata Passport with attributes being attested to.
          await updateMintStatus();
          setVerification(true);
        }
      });
  };

  const createQuadrataPassport = async (signatures, params, signaturesIssuers) => {
    try {
      var query = `
        mutation CreateQuadrata($input: QuadrataInput) {
          createQuadrata(input: $input) {
            txHash
            status
          }
        }
      `;
      return fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            input: {
              sigAccounts: signatures,
              sigIssuers: signaturesIssuers,
              configs: params,
            },
          },
        }),
      })
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((data) => {
        console.log("createQuadrata", data?.data?.createQuadrata);
        return data;
      })
      .catch((err) => console.log("mint status err: ", err));
    } catch (error) {
      console.log(error, "minting quadrata passport");
    }
  };

  // Listening to provider changes

  useEffect(() => {
    // console.log("1234 main use effect called data");
    getKYCStatus();
    checkConnectedWallet();
    if (window?.ethereum?.on) {
    window.ethereum.on("accountsChanged", function (accounts) {
    setAccount(accounts[0]);
    // console.log("changed account to: ", accounts[0]);
    });
    window.ethereum.on("chainChanged", function (chainIdHex) {
    // converting hexadecimal chainId to decimal
    const chainId = parseInt(chainIdHex, 16);
    setChainId(chainId);
    // console.log("chain changed to: ", chainId);
    });
    }
    }, []);

    useEffect(() => {
      
      if(userConnectedWalletDetailsData.status === "Changed" ){
        checkConnectedWallet();
      }
    }, [userConnectedWalletDetailsData])
    


  const handleSign = async (message) => {
    // User clicked the initial sign button
    // Signing the message and updating state.
    // kyc form will automatically navigate to the next step upon signature update
    if (signer && account) {
      const signature = await signer.signMessage(message);
      setSignature(signature);
    }
  };

  const handlePageChange = (page) => {
    if (page === Page.INTRO && signature) {
      // Intro page navigation will get triggered when a different wallet is detected,
      // Resetting previous signature if present
      setSignature(undefined);
    }
  };

  const handleMintClick = async ({
    fee,
    params,
    signatures,
    signaturesIssuers,
  }) => {
    // User clicked Approve & Mint Passport button
    // the parameters that are being passed to this function is all you need to mint the passport on chain

    // Resetting errors in case it's a retry
    setErrorType(undefined);

    if (signer) {
      try {
        // Minting passport
        console.info(
          "1234",
          params,
          signaturesIssuers,
          signatures,
          { value: fee },
          signer
        );

        // Setting the transaction hash prop (required)
        // When defined, the from will automatically navigate to the "minting in progress" page
        // the tx hash will be added to the "View in Etherscan" link
        if(!isMinting){
          setIsMinting(true);

        const transaction = await createQuadrataPassport(signatures, params, signaturesIssuers)
        console.log("transaction.txHash", transaction?.data?.createQuadrata?.txHash);
        setTransactionHash(transaction?.data?.createQuadrata?.txHash);

        if (transaction?.data?.createQuadrata?.txHash) {
          return provider.waitForTransaction(transaction?.data?.createQuadrata?.txHash)
          .then((receipt) => {
            // Setting the mintComplete prop to true (required)
            // The form will automatically navigate to the last page.
            console.log("Passport minted successfully...", receipt);
            setErrorType(undefined);
            setMintComplete(true);
            return updateMintStatus();
          })
          .then(() => {
            console.log("Passport mint status updated...");
          })
          .catch((error) => {
            // Setting the mintComplete prop to false
            // You may handle errors here
            console.error("Passport minting failed, ", error);
          });
        } else {
          console.error("mint error: ", transaction);
          setErrorType(ErrorType.OTHER);
          setMintComplete(false);
        }
      }
      else{
        alert("Please wait for transaction to be completed")
      }
  

      } catch (e) {
        console.error("err", e);
        // Catching insufficient funds error
        if (e && e.code === ErrorType.INSUFFICIENT_FUNDS) {
          setErrorType(ErrorType.INSUFFICIENT_FUNDS);
        } else {
          // Caching any other errors here
          setErrorType(ErrorType.OTHER);
        }
      }
    } else {
      setErrorType(ErrorType.OTHER);
      console.error("Missing required params to mint: ", { signer });
    }
  };

  const getKYCStatus = async () => {
    console.log("GETTING QUADRATA KYC STATUS")
    try {
      var query = `
                query Query($id: ID) {
                    getQuadrataStatus(_id: $id) {
                      quadrata_kyc_verified
                    }
                  }
                  `;
      return fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            "id": loginId
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          console.log("getQuadrataStatus", data?.data?.getQuadrataStatus);
          setBackendVerified(data?.data?.getQuadrataStatus?.quadrata_kyc_verified);
          return data;
        })
        .catch((err) => console.log("get status update err: ", err));
    } catch (error) {
      console.log(error, "getting quadrata passport");
    }
  }

  const updateMintStatus = async () => {
    try {
      var query = `
                mutation UpdateQuadrataStatus($id: ID, $input: QuadrataStatusInput) {
                    updateQuadrataStatus(_id: $id, input: $input)
                }
              `;
      return fetch(apiURI.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
          'x-power': process.env.POWER_KEY,
          'x-domain-agent': process.env.DOMAIN_AGENT,
          'x-strict-origin-name': process.env.ORIGIN_NAME,
          'x-range-name': process.env.RANGE_NAME
        },
        body: JSON.stringify({
          query,
          variables: {
            id: loginId,
            input: {
              quadrata_kyc_status: true,
            },
          },
        }),
      })
        .then((response) => {
          const json = response.json();
          return json;
        })
        .then((data) => {
          console.log("updateQuadrataStatus", data?.data?.updateQuadrataStatus);
          getKYCStatus()
          return data;
        })
        .catch((err) => console.log("mint status update err: ", err));
    } catch (error) {
      console.log(error, "minting quadrata passport");
    }
  };

  const error = generateErrorMessage(errorType);
  // console.log(userData,"user data");

  return (
    <>
      {isBackendVerified ? (
        <div className="blockpass_status_approve">
          <div style={{ marginLeft: "5px", fontSize: "12px" }}>
            {" "}
            KYC Verified  by Quadrata
          </div>
          <div>
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: "15px", marginLeft: "2px" }}
            />
          </div>
        </div>
      ) : (
        <div>
          {isConnected ? (
            !isVerified ? (
              <StyledQuadrataKyc
                error={error}
                onSign={handleSign}
                issuers={quadrataIssuers}
                chainId={chainId}
                tokenId={8}
                account={account}
                signature={signature}
                onMintClick={handleMintClick}
                mintComplete={mintComplete}
                onPageChange={handlePageChange}
                transactionHash={transactionHash}
              >
                <div>Loading component here....</div>
              </StyledQuadrataKyc>
            ) : (
              <div>
                <h4>Quadrata Verified</h4>
              </div>
            )
          ) : (
            <div className="connectwalletcard">
              <div className="row mt-4">
                <div className="col-4">
                  <a href='https://quadrata.com/' target="_blank">
                        <img className="mb-2" style={{width:"50%",borderRadius:"2px"}}src={logo}>

                        </img>
                        </a>
                 
                   <a href="https://quadrata.com/" target="_blank">
                    <p style={{ fontSize: "18px" }}>
                      Universal Identity For Web3
                    </p>
                    </a> 
                </div>
                <div className="col-6" style={{ textAlign: "left" }}>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontSize: "18px",
                        textAlign: "left",
                        color: "#ff6262",
                      }}
                    >
                      Please connect your wallet to complete KYC
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        textAlign: "left",
                        color: "#ff6262",
                      }}
                    >
                      and proceed to launch your project
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default QuadrataKYC;
