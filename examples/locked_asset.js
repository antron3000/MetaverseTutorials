let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('../../metaversejs');

locked_asset()
async function locked_asset(){
  let txs = await blockchain.addresses.txs(["t82k8SzgW7rwW3SRPKj4KqbXoaixSRo74U"])
    let utxo = await Metaverse.output.calculateUtxo(txs.transactions,["t82k8SzgW7rwW3SRPKj4KqbXoaixSRo74U"]) //Get all utxo
    utxo = await blockchain.balance.addressesFromUtxo(utxo, ["t82k8SzgW7rwW3SRPKj4KqbXoaixSRo74U"], 452650)
  //    .then((outputs)=>Metaverse.output.filter(outputs, {type:"asset-cert"}))
    utxo = await JSON.stringify(utxo)
    console.log(utxo)
}
