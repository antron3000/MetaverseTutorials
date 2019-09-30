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


async function transferMIT(){

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
  let tx = await Metaverse.transaction_builder.transferMIT(results[0].utxo.concat(results[1]), "nova", recipient_address, recipient_avatar, "MIT_SUPERNOVA", change_address, results[0].change))
  tx = await wallet.sign(tx))
  tx = await tx.encode())
  tx = await blockchain.transaction.broadcast(tx.toString('hex')))
                // .then(tx=>tx.toString('hex'))
  console.log(tx)


}
