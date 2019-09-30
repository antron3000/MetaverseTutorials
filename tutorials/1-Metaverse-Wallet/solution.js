let blockchain = require('../../mvs-blockchain-js')({

    url: "https://explorer-testnet.mvs.org/api/"
});

let Metaverse = require('metaversejs');

var wallet
var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"
var addresses
var balances

run()

async function run(){
  await createWallet()

  let balance = await getETPBalance()
  console.log("Wallet balance: " + balance + " ETP")

  await sendETP()
}

async function generateMnemonic(){
  mnemonic = await Metaverse.wallet.generateMnemonic()
}

async function createWallet() {
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')
  addresses = await wallet.getAddresses()
}

async function getETPBalance(){

  //Get the lastest Blockchain Length
  let height = await blockchain.height()

  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(addresses)

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, addresses)

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addresses, height)

  let ETPBalance = balances.ETP.available
  ETPBalance = parseFloat(ETPBalance/100000000)
  return ETPBalance

}

async function sendETP(amount){

  var target = {
      ETP: amount
  };

  var recipient_address = "MVbtobP4m44AKsx5PqBbtrBUdycNHxM3eQ";

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
