import React from 'react' 
import "./MembersDisplay.css";
import {useState, useEffect} from "react";
import {useContext} from 'react'
import { ContractContext } from '../App'
import Address from './Address';

export default function MembersDisplay() {

    const [state, setState] = useState([]);
    const context = useContext(ContractContext);
    const Members = async () => {
        const result = await context.ContractVar.contract.methods.getMembers().call();
        setState(result);
    }

    useEffect(() => {
      Members();
    }, [])

   return (
      <>
      <h1>Whitelist : </h1>
      <div id="MembersDisplay">
       {state.map((value) => {
         if(value == "0x0000000000000000000000000000000000000000"){
           return "";
         }
         return <Address txt={value}></Address>
       })}
      </div>
      </>
      )
    
  
}
