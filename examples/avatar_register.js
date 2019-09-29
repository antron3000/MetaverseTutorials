let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var avatar_name = "testAvatar2";
var mnemonic = "alley machine mind first state prepare holiday wild humor thunder write laugh grunt dog answer gossip autumn satisfy sell almost payment orchard flush kiwi"
//registerAvatar()
registerAvatar()
async function registerAvatar() {
    let wallet = await Metaverse.wallet.fromMnemonic(mnemonic, 'testnet')

    let avatar_address = wallet.getAddress(1)
    let change_address = wallet.getAddress(2)

    let height = await blockchain.height()
    let txs = await blockchain.addresses.txs([avatar_address])
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [avatar_address]) //Get all utxo for the avatar address
    let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000) //Collect utxo to pay for the fee of 1 ETP
    let tx = await Metaverse.transaction_builder.issueDid(result.utxo, avatar_address, avatar_name, change_address, result.change, 80000000, 'testnet')
    tx= await wallet.sign(tx)
    tx = await tx.encode()
    tx = await tx.toString('hex')
    tx = await blockchain.transaction.broadcast(tx)
    console.log(tx)
}
