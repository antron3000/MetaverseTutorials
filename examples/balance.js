let blockchain = require('../mvs-blockchain-js')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');



getBalances()

async function getBalances(){
let wallet = await Metaverse.wallet.fromMnemonic("lunar there win define minor shadow damage lounge bitter abstract sail alcohol yellow left lift vapor tourist rent gloom sustain gym dry congress zero", 'testnet')
let height = await blockchain.height()
let addresses = wallet.getAddresses()
let txs = await blockchain.addresses.txs(addresses)

let utxo = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())
let balances = await blockchain.balance.all(utxo, wallet.getAddresses(), height)
console.log(balances.ETP)

}
