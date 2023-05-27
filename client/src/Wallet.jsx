import server from "./server";

function Wallet(
  { address, 
    setAddress, 
    balance, 
    setBalance, 
    transactionAlert, 
    formData,
  }
  ) {
  
    async function onChange(event) {
      const address = event.target.value;
      setAddress(address);
      
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }
  
  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet
        <input placeholder="Type an address, for example: 0x1" 
        value={address} 
        onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      {transactionAlert && <div className="transactionAlert">
        Transferred {formData?.sendAmount} coin{formData?.sendAmount > 1 && <span>s</span>} to {formData?.recipient}
      </div>}
      
    </div>
  );
}

export default Wallet;
