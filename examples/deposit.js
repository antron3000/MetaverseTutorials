let blockchain = require('..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

var quantity = 100;
var duration = 20;

var recipient_address = "MDyq6w7RqXPF9F5SSrKpTrharr8wF1D4gX";
var change_address = "MDc9rsRr5Ukgro4mu89G2Spdts5aACRJdb";

deposit()
async function deposit() {
  let wallet = await Metaverse.wallet.fromMnemonic("lunar there win define minor shadow damage lounge bitter abstract sail alcohol yellow left lift vapor tourist rent gloom sustain gym dry congress zero",'testnet')
  let txs = await blockchain.addresses.txs(wallet.getAddresses())
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())
  console.log(utxos)

  let result = await Metaverse.output.findUtxo(utxos, {
      'ETP': quantity
  }, Metaverse.constants.FEE.DEFAULT)

  let tx = await Metaverse.transaction_builder.deposit(result.utxo, recipient_address, quantity, duration, change_address, result.change, undefined, 'testnet')
  tx = await tx.encode()
  tx = await blockchain.transaction.broadcast(tx.toString('hex'))
  console.log(tx)

}
