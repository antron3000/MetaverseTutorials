let blockchain = require('../mvs-blockchain-js')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

getBalances()
async function getBalances(){

let wallet = await Metaverse.wallet.fromMnemonic("butter vacuum breeze glow virtual mutual veteran argue want pipe elite blast judge write sand toilet file joy exotic reflect truck topic receive wait", 'testnet')
let height = await blockchain.height()
let txs = await blockchain.addresses.txs(wallet.getAddresses())
let utxo = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())
let balances = await blockchain.balance.addresses(utxo, wallet.getAddresses(), height)
console.log(JSON.stringify(balances))


}
