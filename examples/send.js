let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var target = {
    ETP: 10000000
};

sendETP()
async function sendETP(){

var recipient_address = "MVbtobP4m44AKsx5PqBbtrBUdycNHxM3eQ";

let wallet = await Metaverse.wallet.fromMnemonic("lunar there win define minor shadow damage lounge bitter abstract sail alcohol yellow left lift vapor tourist rent gloom sustain gym dry congress zero",'testnet')

let height = await blockchain.height()
let addresses = wallet.getAddresses()
console.log("ereradsfas")
console.log(addresses)
let txs = await blockchain.addresses.txs(addresses)

//Get all utxo
let utxos = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())

//Collect utxo for given target
let result = await Metaverse.output.findUtxo(utxos, target, height)

let tx = await  Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, result.utxo[0].address, result.change)

tx = await wallet.sign(tx)
tx = await tx.encode()
tx = await blockchain.transaction.broadcast(tx.toString('hex'))

console.log(tx)

}
