let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var recipient_address = "tFhuyTYeNAttzvEN8FUM5h52GGAujkrKbs";
var recipient_avatar = "laurent";
var change_address = "tGBMcLr6dwfaMaoYiJgtZ3cYUbbGsbpb8t";

var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"



async function mitTransfer(){


let wallet = await Metaverse.wallet.fromMnemonic(mnemonic, 'testnet')
let address = wallet.getAddress(0)
let height = await blockchain.height()
let txs = await blockchain.addresses.txs(address)
let utxos Metaverse.output.calculateUtxo(txs.transactions, [address])) //Get all utxo
let results = await Promise.all([
                  Metaverse.output.findUtxo(utxos, {}, height),
                  Metaverse.output.filter(utxos, {
                      type: "mit"
                  })
              ])
let tx = await Metaverse.transaction_builder.transferMIT(results[0].utxo.concat(results[1]), "nova", recipient_address, recipient_avatar, "MIT_SUPERNOVA", change_address, results[0].change)
tx = await wallet.sign(tx))
tx = await tx.encode())
tx = await blockchain.transaction.broadcast(tx.toString('hex')))
              // .then(tx=>tx.toString('hex'))
console.log(tx)

}
