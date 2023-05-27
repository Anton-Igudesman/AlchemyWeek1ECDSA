import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";

function App() {

  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [transactionAlert, setTransactionAlert] = useState(false);
  console.log('transaction Alert from app: ', transactionAlert)

  useEffect(() => {
    setTimeout(() => {
      setTransactionAlert(false)
    }, 3000)
  }, [balance])

  useEffect(() => {}, [transactionAlert])
  
  const [formData, setFormData] = useState({
    sendAmount: "",
    recipient: "",
    privateKey: "",
  })

  function handleChange( event ) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name] : event.target.value
      }
    })
  }

  return (
    <div className="app">
      <Wallet
        privateKey={privateKey}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        transactionAlert={transactionAlert}
        setTransactionAlert={setTransactionAlert}
        formData={formData}
      />
      <Transfer 
        address={address}
        privateKey={privateKey}
        balance={balance} 
        setBalance={setBalance} 
        formData={formData}
        setFormData={setFormData}
        transactionAlert={transactionAlert}
        setTransactionAlert={setTransactionAlert}
        handleChange={handleChange}
        
      />
    </div>
  );
}

export default App;
