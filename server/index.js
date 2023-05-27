const express = require("express");
const app = express();
const cors = require("cors");
const { sha256 } = require('ethereum-cryptography/sha256');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');

const {
  walletAddress1, 
  walletAddress2, 
  walletAddress3, 
//   PRIVATE_KEY1, 
//   PRIVATE_KEY2,
//   PRIVATE_KEY3,
//   PUBLIC_KEY1,
//   PUBLIC_KEY2,
//   PUBLIC_KEY3
} = require('./scripts/generate.jsx');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};
balances[walletAddress1] = 100;
balances[walletAddress2] = 50;
balances[walletAddress3] = 75;

let transactionAlert = false;
// console.log('wallet addresses', balances);

// const privateKeys = {};
// privateKeys[walletAddress1] = '906c363d3fd5618ed68cec14bf9eb15994a81c4ad1a99de88c7a400aec17f099';
// privateKeys[walletAddress2] = 'b4bb05d80937308b6767eb9c75e22e624fec222b48843163d87a0d74714057bb';
// privateKeys[walletAddress3] = 'a63a0fdbe0136806fc6458ed9bf861947960100cf50951cdf4a3225022ea6910';

// console.log('private keys: ', privateKeys);

// function hashMessage(message) {
//   const bytes = utf8ToBytes(message.toString());
//   const hash = keccak256(bytes);
//   return toHex(hash);
// }
function verifyAddress (keyArray, walletAddress) {
  const derivedAddress = `0x${toHex(keccak256(keyArray.slice(1))).slice(-20)}`;
  return derivedAddress === walletAddress ? true : false;
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const privateKey = privateKeys[address];

  res.send({ balance, privateKey });
});

app.post("/send", (req, res) => {
  const { 
    sender, 
    recipient, 
    amount, 
    publicKeyString } = req.body;

    
  
  const uint8Array = Uint8Array.from([...Object.values(JSON.parse(publicKeyString))]);
  const isValid = verifyAddress(uint8Array, sender)

    if (isValid) {
      setInitialBalance(sender);
      setInitialBalance(recipient);
        
        if (balances[sender] < amount) {
          res.status(400).send({ message: "Not enough funds!" });
        } else {
          transactionAlert = true;
          balances[sender] -= amount;
          balances[recipient] += amount;
          
          res.send({ balance: balances[sender], transactionAlert});
          transactionAlert = false;
        }
    } else {
      res.status(401).send({message: "You are not authorized! See your dealer!"});
    }

       

        
      
    


 
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
