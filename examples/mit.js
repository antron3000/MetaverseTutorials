let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var target = {
};

var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"

let symbol = "testar"
let avatar = "testguy"
let content = "some test content"
issueMIT()
async function issueMIT(){

let wallet = await Metaverse.wallet.fromMnemonic(mnemonic, 'testnet')
wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')

let address = wallet.getAddress(1)
let address2 = wallet.getAddress(0)
console.log(address)
console.log(address2)
let recipient_address =  wallet.getAddress(1)
let change_address = wallet.getAddress(1)

let height = await blockchain.height()
let txs = await blockchain.addresses.txs([address])
let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [address]) //Get all utxo
let result = await Metaverse.output.findUtxo(utxos, target, height) //Collect utxo for given target
let tx = await Metaverse.transaction_builder.registerMIT(result.utxo, recipient_address, description, symbol, content, change_address, result.change)
tx = await wallet.sign(tx)
tx = await tx.encode()
tx = await blockchain.transaction.broadcast(tx.toString('hex'))
              // .then(tx=>tx.toString('hex'))
console.log(tx)


}
