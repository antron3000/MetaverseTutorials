let mnemonic = "winter practice diagram kitten source man risk verify protect ship quick pistol brick runway penalty chest head purse device menu balance eight cube release"
let wallet
let addresses
let blockchain
let avatars

async function initialize(){
  blockchain = await Blockchain({url: "https://explorer-testnet.mvs.org/api/"})
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')
  addresses = await wallet.getAddresses()
  let addressSelect = document.getElementById("addressSelect");
  avatars = new Array()
  await getAvatars()
  await populateAddressSelect()
  await showAvatars()
  await populateAvatarSelect()

}

async function registerAvatar() {

    let avatar_name = document.getElementById("avatarName").value

    var addressSelect = document.getElementById('addressSelect');
    let avatar_address = addressSelect[addressSelect.selectedIndex].value
    console.log(avatar_name)
    console.log(avatar_address)

    let change_address = avatar_address
    let height = await blockchain.height()
    let txs = await blockchain.addresses.txs(addresses)
    let utxos = await Metaverse.output.calculateUtxo(txs.transactions, addresses) //Get all utxo for the avatar address
    let result = await Metaverse.output.findUtxo(utxos, {}, height, 100000000) //Collect utxo to pay for the fee of 1 ETP
    let tx = await Metaverse.transaction_builder.issueDid(result.utxo, avatar_address, avatar_name, change_address, result.change, 80000000, 'testnet')
    tx= await wallet.sign(tx)
    tx = await tx.encode()
    tx = await tx.toString('hex')
    tx = await blockchain.transaction.broadcast(tx)
    console.log(tx)
}

async function issueMST(){

  var symbol = document.getElementById("MSTSymbol").value
  var max_supply = document.getElementById("MSTSupply").value
  var precision = document.getElementById("MSTDecimals").value
  var description = document.getElementById("MSTDescription").value
  var avatarSelect = document.getElementById('avatarSelect');

  let issuer = avatarSelect[avatarSelect.selectedIndex].value
  console.log(issuer)
  let issuingAddress = await getAvatar(issuer)
  issuingAddress = issuingAddress.toString()
  var recipient_address = issuingAddress;
  var change_address = issuingAddress;

  console.log(issuingAddress)
  console.log("symbol " + symbol)
  console.log("max_supply " + max_supply)
  console.log("precision " + precision)

  console.log("issuer " + issuer)
  console.log("description " + description)

  var recipient_address = issuingAddress;
  var change_address = issuingAddress;

  let height = await blockchain.height()
  console.log(issuingAddress)

  let txs = await blockchain.addresses.txs(wallet.getAddresses())
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, wallet.getAddresses()) //Get all utxo
  let result = await Metaverse.output.findUtxo(utxos, {}, height, 1000000000) //Collect utxo to pay for the fee of 10 ETP
  console.log(result.utxo)

  let tx = await Metaverse.transaction_builder.issueAsset(result.utxo, recipient_address, symbol, max_supply, precision, issuer, description, 0,false, change_address, result.change,false,0,'testnet')
  console.log(tx);
   tx = await wallet.sign(tx)
   console.log(tx);

  tx = await tx.encode()
  console.log(tx);

  tx = await tx.toString('hex')
  console.log(tx);

  tx = await blockchain.transaction.broadcast(tx)

  console.log(tx);
}

async function transferMST() {
  // let height = await blockchain.height()
  // let txs = await blockchain.addresses.txs(["tDZ5YMLJ3z6VbvAsX1c8oe9hJ2nND4jszz", "t85Hm2nYwQXrry2cVmEHPq8krRdJ7KYjmq"])
  // let utxos = await Metaverse.output.calculateUtxo(txs.transactions, ["tDZ5YMLJ3z6VbvAsX1c8oe9hJ2nND4jszz", "t85Hm2nYwQXrry2cVmEHPq8krRdJ7KYjmq"])) //Get all utxo
  // let result = await Metaverse.output.findUtxo(utxos, target, height)) //Collect utxo for given target
  // let tx = await Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, change_address, result.change))
  // tx = await wallet.sign(tx))
  // tx = await tx.encode())
  // tx = await blockchain.transaction.broadcast(tx.toString('hex')))
}



async function showAvatar() {
  let avatar = document.getElementById("getAvatarInput").value
  console.log(avatar)
  let avatarAddress = await getAvatar(avatar)
  document.getElementById("avatarAddressLabel").innerHTML = avatarAddress
}

async function getAvatar(avatar) {

  let avatarInfo = await blockchain.avatar.get(avatar)
  return avatarInfo.address

}

async function populateAddressSelect() {
  let addressSelect = document.getElementById('addressSelect');
  for (i = 0; i < addresses.length; ++i) {
   var opt = document.createElement("option");
   opt.value= [addresses[i]];
   opt.innerHTML = addresses[i];

   addressSelect.appendChild(opt);
 }
}

async function getAvatars() {
  for (i = 0; i < addresses.length; ++i) {
   let avatarInfo = await blockchain.avatar.get(addresses[i])
   if(avatarInfo!=null){
     avatars.push(avatarInfo)
   }
 }
}

async function showAvatars() {

  var avatarTable = document.getElementById("avatarsTable");
  for (let i = 0; i < avatars.length; ++i) {
     let avatarAddress = avatars[i].address
     let avatarSymbol = avatars[i].symbol
     //let issue_tx = avatarInfo.issue_tx
     //let issue_tx_link = document.createElement("div")
     //issue_tx_link.innerText = "Issuance tx"
     //issue_tx_link.setAttribute("href", "https://explorer-testnet.mvs.org/tx/" + issue_tx)
     var row = avatarTable.insertRow(i+1);

     // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
     var cell1 = row.insertCell(0);
     var cell2 = row.insertCell(1);

     // Add some text to the new cells:
     cell1.innerHTML = avatarSymbol;
     cell2.innerHTML = avatarAddress;
     //cell3.inner = issue_tx_link;
   }
}

async function populateAvatarSelect() {
  let avatarSelect = document.getElementById('avatarSelect');
  for (i = 0; i < avatars.length; ++i) {
   var opt = document.createElement("option");
   opt.value= avatars[i].symbol;
   opt.innerHTML = avatars[i].symbol;

   avatarSelect.appendChild(opt);
 }
}

async function showMSTBalances() {
  var balancesTable = document.getElementById("balancesTable");
  let balances = await getMSTBalances(addresses)

  for (i = 0; i < balances.length; ++i) {

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

async function getMSTBalances(addressArray){
  //Get the lastest Blockchain Length
  let height = await blockchain.height()

  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(addressArray)

  //Get a list of unspent transaction outputs amongst your transactions
  let utxo = await Metaverse.output.calculateUtxo(txs.transactions, addressArray)

  //Calculate your balances based on the utxos
  let balances = await blockchain.balance.all(utxo, addressArray, height)

  return balances
}
