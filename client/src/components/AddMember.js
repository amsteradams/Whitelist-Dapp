import React from 'react'
import {useState, useEffect} from "react";
import {useContext} from 'react'
import { ContractContext } from '../App'
import "./AddMember.css";
export default function AddMember() {
    const [state, setState] = useState();
    const context = useContext(ContractContext);
    const setMember = async (address) => {
        await context.ContractVar.contract.methods.addMember(address).send({from:context.ContractVar.accounts[0]});
    }
    const linkedInput = (e) => {
        setState(e);
    }
    
    const register = () => {
        setMember(state);
    }
    
  return (
    <form id="addMember">
        <input onInput={e => linkedInput(e.target.value)} type="text" placeholder='new address'/>
        <button onClick={register} type="submit">Enregistrer</button>
    </form>
  )
}
