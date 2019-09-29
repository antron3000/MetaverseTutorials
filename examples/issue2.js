let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var wallet
var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"
var addresses
var balances

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
  console.log(result)
}
