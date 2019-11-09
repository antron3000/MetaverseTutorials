let mnemonic = "butter vacuum breeze glow virtual mutual veteran argue want pipe elite blast judge write sand toilet file joy exotic reflect truck topic receive wait"
let wallet
let addresses
let blockchain
let avatars

let superfucks = "aaaa"

let MITsymbols
let MITData

async function initialize(){
  blockchain = await Blockchain({url: "https://explorer-testnet.mvs.org/api/"})
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')
  addresses = await wallet.getAddresses()
  avatars = new Array()
  await getAvatars()
  await populateAvatarSelect()
  await showMITBalances()
  await populateMITSelect()
}


async function issueMIT(){

  let symbol = document.getElementById("MITSymbol").value
  let content = document.getElementById("MITContent").value
  var target = {
    ETP: 10000
  };

  let issuer_avatar = avatarSelect[avatarSelect.selectedIndex].value
  console.log(issuer_avatar)
  let issuingAddress = await getAvatar(issuer_avatar)
  issuingAddress = issuingAddress.toString()
  let recipient_address = issuingAddress;
  let change_address = issuingAddress;



  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(wallet.getAddresses())
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [recipient_address]) //Get all utxo
  let result = await Metaverse.output.findUtxo(utxos, {}, height,10000) //Collect utxo to pay fee of 0.0001 ETP
  let tx = await Metaverse.transaction_builder.registerMIT(result.utxo, recipient_address, issuer_avatar, symbol, content, change_address, result.change)
  tx = await wallet.sign(tx)
  tx = await tx.encode()
  tx = await blockchain.transaction.broadcast(tx.toString('hex'))
                // .then(tx=>tx.toString('hex'))
  console.log(tx)

}

async function sendMIT(){

  let MITIndex = MITSelect[MITSelect.selectedIndex].value
  console.log(MITIndex)

  let symbol = MITData[MITIndex].symbol

  let recipient_avatar = document.getElementById("sendTo").value

  let recipient_address = await getAvatar(recipient_avatar)



  let sender_avatar = MITData[MITIndex].owner
  let sender_address = await getAvatar(sender_avatar)
  let change_address = sender_address;

  console.log(recipient_address)
  console.log(symbol)
  console.log(sender_address)
  let height = await blockchain.height()
  let txs = await blockchain.addresses.txs(addresses)
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, [sender_address]) //Get all utxo
  //console.log(utxos)

  let results = await Promise.all([
                    Metaverse.output.findUtxo(utxos, {}, height),
                    Metaverse.output.filter(utxos, {
                        symbol: symbol
                    })
                ])

  let tx = await Metaverse.transaction_builder.transferMIT(results[0].utxo.concat(results[1]), sender_avatar, recipient_address, recipient_avatar, symbol, change_address, results[0].change)

  tx = await wallet.sign(tx)

  tx = await tx.encode()

  tx = await blockchain.transaction.broadcast(tx.toString('hex'))

  console.log(tx)
}


async function showMITBalances() {
  var MITTable = document.getElementById("MITTable");
  console.log(MITTable)
  let balanceData = await getBalanceData(addresses)
  MITData = balanceData.MIT
  console.log(MITData)

  for (i = 0; i < MITData.length; ++i) {
    var row = MITTable.insertRow(i+1);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    // Add some text to the new cells:
    cell1.innerHTML = MITData[i].symbol;
    cell2.innerHTML = MITData[i].content;
    cell3.innerHTML = MITData[i].owner;
    cell4.innerHTML = MITData[i].address;
    cell5.innerHTML = MITData[i].status;
  }
}

async function populateMITSelect() {
  let MITselect = document.getElementById('MITSelect');
  for (i = 0; i < MITData.length; ++i) {
   var opt = document.createElement("option");
   opt.value= i;
   opt.innerHTML = MITData[i].symbol;

   MITselect.appendChild(opt);
 }
}

async function getBalanceData(addressArray){
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

async function populateAvatarSelect() {
  let avatarSelect = document.getElementById('avatarSelect');
  for (i = 0; i < avatars.length; ++i) {
   var opt = document.createElement("option");
   opt.value= avatars[i].symbol;
   opt.innerHTML = avatars[i].symbol;

   avatarSelect.appendChild(opt);
 }
}

async function getAvatars() {
  for (i = 0; i < addresses.length; ++i) {
    console.log(i)
   let avatarInfo = await blockchain.avatar.get(addresses[i])
   if(avatarInfo!=null){
     avatars.push(avatarInfo)
   }
 }
}

async function getAvatar(avatar) {

  let avatarInfo = await blockchain.avatar.get(avatar)
  return avatarInfo.address

}
