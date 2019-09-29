let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var wallet
var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"
var addresses
var balance1

let symbol = "TESTT"
let max_supply = 100
let precision = 3
let issuer = "testguy"
let description = "test MST"
issue()
async function issue() {
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')


  let address =  wallet.getAddress(1)
  let change_address = wallet.getAddress(1)
  console.log(address)
  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs([address])
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [address]) //Get all utxo for the avatar address
  console.log(blockchain)
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000)
  let tx = await  Metaverse.transaction_builder.issueAsset(result.utxo, address, symbol, max_supply, precision, issuer, description, change_address, result.change)
  tx = await wallet.sign(tx)
  tx = await tx.encode()
  console.log(tx.toString('hex'));

}















// let blockchain = require('..')({
//     url: "https://explorer.mvs.org/api/"
// });
// let Metaverse = require('metaversejs');
//
// const symbol = 'test4',
//     max_supply = 10,
//     precision = 2,
//     issuer = 'testguy',
//     description = 'some boring asset';
//
// var recipient_address;
// var change_address;
//
// mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"
// run()
// async function run(){
// await issue2()
// }
//
// async function issue(){
// let wallet = await Metaverse.wallet.fromMnemonic(mnemonic,"testnet")
// let address = wallet.getAddress(1)
// console.log(address)
//
// let height = await blockchain.height()
// let txs = await blockchain.addresses.txs([address])
// let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [address]) //Get all utxo for the avatar address
// let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000) //Collect utxo to pay for the fee of 1 ETP
// console.log(result)
//
// }
//
// async function issue2(){
//   console.log("issue2")
//   let wallet = await Metaverse.wallet.fromMnemonic(mnemonic,"testnet")
//   console.log("wallet")
//   let avatar_address = wallet.getAddress(1)
//   let change_address = avatar_address
//   let height = await blockchain.height()
//   console.log(height)
//   let txs = await blockchain.addresses.txs([avatar_address])
//   console.log(txs)
//
//   let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [avatar_address]) //Get all utxo for the avatar address
//   let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000)
// }
