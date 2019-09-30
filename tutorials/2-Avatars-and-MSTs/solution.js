async function registerAvatar(avatar_name,avatar_address) {

    let change_address = avatar_address
    console.log(avatar_address)
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

async function issueMST(issuer,symbol,max_supply,decimalPrecision,issuer,description){
  var recipient_address = issuer;
  var change_address = issuer;

  let wallet = await Metaverse.wallet.fromMnemonic("lunar there win define minor shadow damage lounge bitter abstract sail alcohol yellow left lift vapor tourist rent gloom sustain gym dry congress zero")
  let txs = await blockchain.addresses.txs(wallet.getAddresses())
  let utxos = await Metaverse.transaction_builder.calculateUtxo(txs.transactions, wallet.getAddresses()) //Get all utxo
  let result = await Metaverse.transaction_builder.findUtxo(utxos, {}, Metaverse.transaction.ASSET_ISSUE_DEFAULT_FEE) //Collect utxo for given target
  let tx = await Metaverse.transaction_builder.issue(result.utxo, recipient_address, symbol, max_supply, precision, issuer, description, change_address, result.change)
  tx = await wallet.sign(tx)
  tx = await tx.encode()
  console.log(tx.toString('hex'));
}

async function transferMST() {
  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(["tDZ5YMLJ3z6VbvAsX1c8oe9hJ2nND4jszz", "t85Hm2nYwQXrry2cVmEHPq8krRdJ7KYjmq"])
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, ["tDZ5YMLJ3z6VbvAsX1c8oe9hJ2nND4jszz", "t85Hm2nYwQXrry2cVmEHPq8krRdJ7KYjmq"])) //Get all utxo
  let result = await Metaverse.output.findUtxo(utxos, target, height)) //Collect utxo for given target
  let tx = await Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, change_address, result.change))
  tx = await wallet.sign(tx))
  tx = await tx.encode())
  tx = await blockchain.transaction.broadcast(tx.toString('hex')))
}
