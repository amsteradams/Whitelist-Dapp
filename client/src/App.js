import React, { useState, useEffect } from "react";

import WhitelistContract from "./contracts/Whitelist.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import { createContext } from "react";
import MembersDisplay from "./components/MembersDisplay";
import AddMember from "./components/AddMember";

export const ContractContext = createContext();
const App = () => {

  const [ContractVar, setContractVar] = useState({
    storageValue: [],
    web3: null,
    accounts: null,
    contract: null
  });
  console.log(ContractVar);
  useEffect(() => {
    getContractVar();
    if(window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    
  }}, []);

  const getContractVar = async () => {

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = WhitelistContract.networks[networkId];
      const instance = new web3.eth.Contract(
        WhitelistContract.abi,
        deployedNetwork && deployedNetwork.address,
        );
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        setContractVar({web3, accounts, contract: instance });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
  };

  console.log(ContractVar);

  if(ContractVar.web3){
    return (
      <div className="body-container">
        <ContractContext.Provider value={{ ContractVar, setContractVar }}>
          <MembersDisplay></MembersDisplay>
          <AddMember />
        </ContractContext.Provider>
      </div>
      
    );
  }
  else{
    return (<>Loading Web3...</>)
  }
  
}

export default App;