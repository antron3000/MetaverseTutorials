let blockchain
let wallet //faucet wallet
let addresses //faucet address
mnemonic = "butter vacuum breeze glow virtual mutual veteran argue want pipe elite blast judge write sand toilet file joy exotic reflect truck topic receive wait" //Faucet Mnemonic

async function createWallet() {
  blockchain = await Blockchain({url: "https://explorer-testnet.mvs.org/api/"})

  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')

  addresses = await wallet.getAddresses()

  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(addresses)
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, addresses)

  let balance = await getBalances();
  console.log(balance)
  let ETPBalanceFormatted = parseFloat(balance.ETP.available/10**8)
  console.log("Balance is " + ETPBalanceFormatted + " ETP")

}

async function getBalances(){


  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(wallet.getAddresses())
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses())
  let balances = await blockchain.balance.all(utxo, wallet.getAddresses(), height)

  return balances

}

async function withdraw(){

  let recipient_address = document.getElementById("sendTo").value
  let balance = await getBalances();
  console.log(balance.ETP.available)

  send(parseInt(balance.ETP.available/10),recipient_address)

}

async function send(amount,recipient_address) {
  var target = {
      ETP: amount
  };

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
