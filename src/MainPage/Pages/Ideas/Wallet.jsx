import React, { useState, useEffect } from "react";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
// import SignClient from '@walletconnect/sign-client'
// import { Web3Modal } from '@web3modal/standalone'
import Web3 from "web3";
import Down from "./down.png";
import Metamask from "./metamask.png";
import Coinbase from "./coinbase.png";
import Walletconnect from "./walletconnect.png";
import { coinbase } from "../../../Entryfile/imagepath";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/c6e2c6a8dbd1496ea8f7c4fe288f98fe`;

const TermsOfServiceAgreementOptions = {
  version: "1.2.3",
  termsUrl: "https://crsquare.finance/terms-and-conditions/",
  privacyUrl: "https://crsquare.finance/privacy-and-policy/",
};

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimel
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
  ],

  appMetadata: {
    name: "Guardian CR-Square",
    icon: "https://api.crsquare.finance/upload-82731669022541678.png",
    logo: "https://guardian.crsquare.finance/static/img-guardian/logo-guardian.png",
    description: "Leading Financial Transparency to the WEB3 Community",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
    agreement: TermsOfServiceAgreementOptions,
  },
});

function Wallet() {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [provider, setProvider] = useState();
  const [DropDown, setDropDown] = useState(false);
  const [displayAddressWC, setdisplayAddressWC] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  // const web3Modal = new Web3Modal({ projectId:"26ff70750cc612381de7486006fdee91" })

  const connectWallet = () => {
    setDropDown(!DropDown);
    //   try {
    //     const wallets = await onboard.connectWallet();
    //     console.log("Wallets ", wallets)
    //     setAccount(wallets[0].accounts[0].address)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // const disconnect = async () => {
    //   const [primaryWallet] = await onboard.state.get().wallets;
    //   if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    //   refreshState();
    // };

    // const refreshState = () => {
    //   setAccount("");
    //   setChainId("");
    //   setProvider();
    // };

    // const web3 = new Web3(Web3.givenProvider || MAINNET_RPC_URL);

    // const signMessage = async () => {
    //   // const accounts = await web3.eth.getAccounts();
    //   const signedMessage = await web3.eth.personal.sign("Sample Text ", account);
    //   return signedMessage;
    // };
  };

  const coinBase = async () => {
    const APP_NAME = "My Awesome App";
    const APP_LOGO_URL = "https://example.com/logo.png";
    const DEFAULT_ETH_JSONRPC_URL =
      "https://mainnet.infura.io/v3/0a38c92df0ee41fba804cd70dfebb0a9";
    const DEFAULT_CHAIN_ID = 1;
    try {
      var coinbaseWallet = new CoinbaseWalletSDK({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        darkMode: false,
      });
      const ethereum = coinbaseWallet.makeWeb3Provider(
        DEFAULT_ETH_JSONRPC_URL,
        DEFAULT_CHAIN_ID
      );

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(`Users address is ${accounts[0]}`);

      setWalletAddress(accounts[0]);
      setdisplayAddressWC(true);
    } catch (err) {
      console.log(err);
    }
  };

  const walletConnect = async () => {
    setDropDown(false);
    console.log("Meta Mask Clicked");
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Accounts ", accounts[0]);
      setWalletAddress(accounts[0]);
    } else {
      alert("metamask not found");
    }
    setdisplayAddressWC(true);
  };

  const walletDisconnect = () => {
    setdisplayAddressWC(false);
    console.log("clicked");
  };

  return (
    <div
      className="wallet-bt"
      style={{ backGround: "none", textAlign: "left" }}
    >
      <div style={{ width: "135px" }}>
        <button
          style={{ display: "flex" }}
          className="routeButtoncsi"
          onClick={connectWallet}
        >
          {displayAddressWC == true ? (
            <>
              <div>{walletAddress}</div>
              <span>
                {DropDown ? (
                  <img
                    style={{
                      width: "12px",
                      marginLeft: "7px",
                      transform: "rotate(180deg)",
                    }}
                    src={Down}
                  ></img>
                ) : (
                  <img
                    style={{ width: "12px", marginLeft: "7px" }}
                    src={Down}
                  ></img>
                )}
              </span>
            </>
          ) : displayAddressWC == false ? (
            <>
              Connect Wallet
              <span>
                {DropDown ? (
                  <img
                    style={{
                      width: "12px",
                      marginLeft: "7px",
                      transform: "rotate(180deg)",
                    }}
                    src={Down}
                  ></img>
                ) : (
                  <img
                    style={{ width: "12px", marginLeft: "7px" }}
                    src={Down}
                  ></img>
                )}
              </span>
            </>
          ) : (
            ""
          )}
        </button>

        {displayAddressWC == true && DropDown == true ? (
          <div className="connectdrop">
            <div
              style={{ height: "30px", display: "flex" }}
              className="hoverdrop"
            >
              {/* <img src={Metamask} className="dpimg"></img> */}
              <p style={{ fontWeight: "400" }}>Copy Address</p>
            </div>

            <div
              style={{ height: "30px", display: "flex" }}
              className="hoverdrop"
            >
              {/* <img src={Walletconnect} className="dpimg"></img> */}
              <div
                onClick={() => {
                  walletDisconnect();
                }}
              >
                <p style={{ fontWeight: "400" }}>Disconnect</p>
              </div>
            </div>
          </div>
        ) : displayAddressWC == false && DropDown == true ? (
          <div className="connectdrop">
            <div
              style={{ height: "30px", display: "flex", cursor: "pointer" }}
              className="hoverdrop"
              onClick={walletConnect}
            >
              <img src={Metamask} className="dpimg"></img>
              <p style={{ fontWeight: "400" }}>MetaMask</p>
            </div>
            <div
              style={{ height: "30px", display: "flex", cursor: "pointer" }}
              className="hoverdrop"
              onClick={coinBase}
            >
              <img src={Coinbase} className="dpimg"></img>
              <p style={{ fontWeight: "400" }}>Coinbase</p>
            </div>
            <div
              style={{ height: "30px", display: "flex", cursor: "pointer" }}
              className="hoverdrop"
            >
              <img src={Walletconnect} className="dpimg"></img>
              <p style={{ fontWeight: "400" }}>WalletConnect</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* <button onClick={disconnect}>Disconnect</button> */}
      {/* <div>

          <button  style={{padding:"100px"}} onClick={signMessage}>Sign Message</button>
          </div> */}
    </div>
  );
}
export default Wallet;
