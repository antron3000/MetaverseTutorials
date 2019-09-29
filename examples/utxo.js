let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');


mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"


getUTXO()

async function getUTXO(){
  let wallet = await Metaverse.wallet.fromMnemonic(mnemonic,"testnet")
  let addresses = wallet.getAddresses()
  let txs = await blockchain.addresses.txs(addresses)
      let utxos = await Metaverse.output.calculateUtxo(txs.transactions,addresses) //Get all utxo
      utxos = await JSON.stringify(utxos)
      console.log(utxos)
}
