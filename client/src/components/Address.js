import React from 'react'
import "./Address.css";
import {useState, useEffect} from "react";
import {useContext} from 'react'
import { ContractContext } from '../App'

export default function Address(props) {
    const [state, setState] = useState([]);
    const context = useContext(ContractContext);
    const getAccounts = async () => {
      const account = await context.ContractVar.accounts;
      setState(account);
    }
    useEffect(() => {
      getAccounts();
    }, [])
  return (
    
    <div id="address">
        <p id='addTxt'>{props.txt}</p>
        <img src={state[0] == props.txt ? 'correct.png' : 'verifie.png'} alt="validé"/>
    </div>
  )
}
