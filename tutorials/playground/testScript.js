//import mvs-blockchain-js
let blockchain = require('../../mvs-blockchain-js')({
    url: "https://explorer-testnet.mvs.org/api/"
});


//import metaversjs
let Metaverse = require('metaversejs');

//make sure the libraries have been successfully imported

console.log(blockchain)
console.log("mvs-blockchain-js has been successfully imported!")
console.log(Metaverse)
console.log("Metaversjs has been successfully imported!")
