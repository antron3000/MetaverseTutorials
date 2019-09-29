let blockchain = require('../..')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');

let wallet //faucet wallet
let addresses //faucet address
mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife" //Faucet Mnemonic

createWallet()
async function createWallet() {
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')

  addresses = await wallet.getAddresses()

  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(addresses)
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, addresses)
  let balances = await blockchain.balance.all(utxo, addresses, height)

  let ETPBalance = balances.ETP.available;
  let ETPBalanceFormatted = parseFloat(balances.ETP.available/10**8)
  console.log("Balance is " + ETPBalance + " ETP")
  console.log(balances)
  console.log(JSON.stringify(balances))

  send(ETPBalance/100)
}

async function send(amount) {
  var target = {
      ETP: amount
  };

  let recipient_address = "tDj67uNY94gmYizcuKeNVD9RfxFYrkJ1QB"//document.getElementById("sendTo")
  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(addresses)

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())

  //Collect utxo for given target
  let result = await Metaverse.output.findUtxo(utxos, target, height)

  let tx = await  Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, result.utxo[0].address, result.change)

  tx = await wallet.sign(tx)
  tx = await tx.encode()
  tx = await blockchain.transaction.broadcast(tx.toString('hex'))

  console.log("tx hash: ")

  //log amount ETP sent to WHO
  console.log(tx)
}
