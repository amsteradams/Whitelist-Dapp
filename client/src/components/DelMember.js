import React from 'react';
import "./DelMember.css";
import {useState, useEffect} from "react";
import {useContext} from 'react'
import { ContractContext } from '../App'
export default function DelMember() {
    const [state, setState] = useState();
    const [verif, setVerif] = useState();
    const context = useContext(ContractContext);
    useEffect(async () => {
      setVerif(await context.ContractVar.contract.methods.getMembers().call())
    }, [])
    console.log(verif);
    const memberExist = (address) => {
        let bool = false;
        verif.forEach(element => {
            if(element == address){
                bool = true;
            }
        });
        return bool;
    }
    const delMember = async (address) => {
        if(memberExist()){
            await context.ContractVar.contract.methods.delMember(address).send({from:context.ContractVar.accounts[0]});
        }
        else{alert("Member doesn't exist")}
    }
    const linkedInput = (e) => {
        setState(e);
    }
    
    const deleteMember = () => {
        delMember(state);
    }
  return (
    <form id="delMember">
        <input onInput={e => linkedInput(e.target.value)} type="text" placeholder='address'/>
        <button onClick={deleteMember} type="submit">Supprimer</button>
    </form>
  )
}
