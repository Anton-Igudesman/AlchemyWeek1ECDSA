import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { toHex } from "ethereum-cryptography/utils";
import { useState, useEffect} from 'react';

import server from "./server";

function Transfer(
  { address, 
    balance, 
    setBalance, 
    formData, 
    setTransactionAlert,
    transactionAlert,
    handleChange
  }
  ) {
 
    const [signature, setSignature] = useState({});
 
  useEffect(() => {}, [balance, signature])
  
  async function transfer(evt) {
    evt.preventDefault();
    
    try {
     
        const getPublicKey = secp256k1.getPublicKey(formData.privateKey);
        const publicKeyString = JSON.stringify(getPublicKey);
        
        const {data: {balance, transactionAlert}} = await server.post(`send`, {
        sender: address,
        amount: parseInt(formData.sendAmount),
        recipient: formData.recipient,
        publicKeyString,
      });
        setTransactionAlert(transactionAlert);
        setBalance(balance);
    } catch ({response}) {
      if (response.request.status === 400 || response.request.status === 401) window.alert(response.data.message);
    } 
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={formData.sendAmount}
          onChange={handleChange}
          name="sendAmount"
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={formData.recipient}
          onChange={handleChange}
          name="recipient"
        ></input>
      </label>

      <label>
        Private Key
        <input
          placeholder="Enter Your Private Key"
          value={formData.privateKey}
          onChange={handleChange}
          name="privateKey"
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
