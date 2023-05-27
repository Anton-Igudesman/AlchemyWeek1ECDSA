const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const SHA256 = require('crypto-js/sha256');


const PRIVATE_KEY1 = '906c363d3fd5618ed68cec14bf9eb15994a81c4ad1a99de88c7a400aec17f099'
const PUBLIC_KEY1 = secp256k1.getPublicKey(PRIVATE_KEY1);
console.log(PUBLIC_KEY1)
const walletAddress1 = `0x${toHex(keccak256(PUBLIC_KEY1.slice(1))).slice(-20)}`;

const PRIVATE_KEY2 = 'b4bb05d80937308b6767eb9c75e22e624fec222b48843163d87a0d74714057bb'
const PUBLIC_KEY2 = secp256k1.getPublicKey(PRIVATE_KEY2);
const walletAddress2 = `0x${toHex(keccak256(PUBLIC_KEY2.slice(1))).slice(-20)}`;

const PRIVATE_KEY3 = 'a63a0fdbe0136806fc6458ed9bf861947960100cf50951cdf4a3225022ea6910'
const PUBLIC_KEY3 = secp256k1.getPublicKey(PRIVATE_KEY3);
const walletAddress3 = `0x${toHex(keccak256(PUBLIC_KEY3.slice(1))).slice(-20)}`;

const message = 'Hey Johnny, how the hell are you? Everything good?';
const messageHash = hashMessage(message);

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return toHex(hash);
}

module.exports = {
    walletAddress1, 
    walletAddress2, 
    walletAddress3, 
    
}


// 906c363d3fd5618ed68cec14bf9eb15994a81c4ad1a99de88c7a400aec17f099 0x4754f70845b419d545ce
// b4bb05d80937308b6767eb9c75e22e624fec222b48843163d87a0d74714057bb 0x1c9cff87f74f13e9f748
// a63a0fdbe0136806fc6458ed9bf861947960100cf50951cdf4a3225022ea6910 0xe570e1e37d8ae0a7eb75