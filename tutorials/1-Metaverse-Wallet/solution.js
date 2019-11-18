// let blockchain = require('../../mvs-blockchain-js')({
//
//     url: "https://explorer-testnet.mvs.org/api/"
// });

var wallet
var mnemonic
var addresses
var balances

var hidden = true

async function initialize(){
  blockchain = await Blockchain({url: "https://explorer-testnet.mvs.org/api/"})
}

async function generateMnemonic(){
  let newMnemonic = await Metaverse.wallet.generateMnemonic()
  return (newMnemonic)
}

async function createNewWallet() {
  mnemonic = await generateMnemonic()
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')
  addresses = await wallet.getAddresses()
  alert("new Wallet created with mnemonic: " + mnemonic)
  await showBalances()
  await populateAddressSelect()
}

async function importWallet() {
  mnemonic = document.getElementById("mnemonicInput").value
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')
  addresses = await wallet.getAddresses()
  alert("new Wallet created with mnemonic: " + mnemonic)
  await showBalances()
  await populateAddressSelect()
}

async function showBalances(){

  var balancesTable = document.getElementById("balancesTable");

  for (i = 0; i < addresses.length; ++i) {

    var row = balancesTable.insertRow(i+1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = addresses[i];
    cell2.innerHTML = await getETPBalance([addresses[i]]);
  }

  document.getElementById('totalBalance').innerHTML = "Total ETP: " + await getETPBalance(addresses)
}

async function displayMnemonic() {
  document.getElementById('mnemonicLabel').innerHTML = mnemonic
}

async function getETPBalance(addressArray){

  //Get the lastest Blockchain Length
  let height = await blockchain.height()

  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(addressArray)

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, addressArray)

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addressArray, height)

  let ETPBalance = balances.ETP.available
  ETPBalance = parseFloat(ETPBalance/100000000)
  return ETPBalance

}

async function populateAddressSelect() {
  let addressSelect = document.getElementById('addressSelect');
  let anyOption = document.createElement("option");
  anyOption.value = addresses
  anyOption.innerHTML = "any"

  addressSelect.appendChild(anyOption)

  for (i = 0; i < addresses.length; ++i) {
   var opt = document.createElement("option");
   opt.value= [addresses[i]];
   opt.innerHTML = addresses[i];

   addressSelect.appendChild(opt);
 }
}

async function sendETP(){

  let amount = document.getElementById("sendAmount").value


  var recipient_address = document.getElementById("sendTo").value;
  recipient_address = recipient_address.toString()
  amount = parseInt(amount)
  console.log(amount)
  var target = {
      ETP: amount
  };
  console.log(recipient_address)
  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(addresses)

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, addresses)

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

async function showHide(){
  if(hidden){
    document.getElementById("mnemonicLabel").innerHTML = mnemonic
    document.getElementById("showHideMnemnonic").innerHTML = "Hide"

    hidden = false;
  } else{
    document.getElementById("mnemonicLabel").innerHTML = ""
    document.getElementById("showHideMnemnonic").innerHTML = "Show"

    hidden = true;
  }
}
