let blockchain = require('../mvs-blockchain-js')({
    url: "https://explorer-testnet.mvs.org/api/"
});
let Metaverse = require('metaversejs');
generate()
async function generate() {
  let mnemonic = await Metaverse.wallet.generateMnemonic()
  let wallet = await Metaverse.wallet.fromMnemonic(mnemonic, 'testnet')

  console.log(mnemonic)
  let address1 = wallet.getAddress(1)
  console.log(address1)
  let address2 = wallet.getAddress(2)
  console.log(address2)
}
