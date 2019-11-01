In this tutorial you will learn how to

* Create a Metaverse wallet
* Import an Existing wallet
* Check your ETP balance
* Send transactions programatically
* Integrate wallet into your dApp

### Introduction

Metaverse is a UTXO based blockchain

ETP is the native currency of the Metaverse blockchain. To send and receive ETP you need a Metaverse wallet.

ETP uses a UTXO based model. This means it is very close to the way Bitcoin works.

Every time you receive a transaction, it becomes a UTXO.
Every time you send a transaction, you collect UTXO's into a transaction input,
which becomes a UTXO on the receivers end, and the change left over becomes a UTXO on your end.

If this sounds complicated don't worry. Metaverse's library manages UTXO's for you

For more information on UTXO's look here https://komodoplatform.com/whats-utxo/

In Metaverse, as with Bitcoin, you can generate deterministic wallets using by memnonic code words. This gives you multiple addresses you can send and recieve transactions from.

### Hands on Tutorial

Note: Explicit detailed instructions are given to work with Metaverse, but not always so with HTML elements. If you get stuck with coding HTML elements, you can always refer to w3schools.com

Start by setting up a directory to work in

```bash
cd MetaverseTutorials/tutorials/playground
touch tut1.html
touch tut1.js
```

Create front end

Open tut1.html and use this HTML front end as the base of your app.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <script ></script>
  <body>

    <h3> Create new Wallet </h3>

    <button>Create New Wallet</button> <br>
    <input placeholder = "mnemonic"></input> <button>Import Wallet</button>


    <h3> Wallet Details</h3>
    <label>mnemonic</label> <br>
    <li> Addresses: </li>

    <h3> Check ETP Balance </h3>

    <select></select> <label>Balance: </label><br>
    <label>Total Balance</label>

    <h3> Send ETP </h3>

    <label>send From </label><select></select><br>
    <input placeholder ="sendTo"></input><br>
    <input placeholder = "amount"></input><br>

  <button>Send</button>

  </body>
</html>
```

You should now be set up to use the Metaverse javascript libraries. We are using the async/await syntax. The await keyword can only be used in async functions so we will create async functions to perform all actions.

First lets define some key variables

```javascript
var wallet        //An object representing your Metaverse Wallet
var mnemonic      //A mnemonic code word used to generate your Wallet
var addresses     //An array containing addresses belonging to the wallet
var balances      //A JSON object containing Wallet balances

```

Start by creating a function to generate a new mnemonic

```javascript
async function generateMnemonic(){
  mnemonic = await Metaverse.wallet.generateMnemonic()
}

```

And a function to create a Wallet from the mnemonic, using the testnet keyword since we're on the testnet.


```javascript
async function createWallet(){
  wallet  = await Metaverse.wallet.fromMnemonic(mnemonic,'testnet')

  addresses = await wallet.getAddresses()  // get list of addresses
}
```
Once you've created a wallet you must get some testnet ETP from the testnet faucet.

A function to get Wallet balances

```javascript
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
  return ETPBalance

}

```

And Finally a function to send ETP

```javascript

async function sendETP(amount){

//Define the amount of ETP you want to send
//Measured in ETP units. There are 100 million units per ETP.
  var target = {
      ETP: 100000000 //100 million units = 1 ETP
  };

  //Define recipient
  var recipient_address = "MVbtobP4m44AKsx5PqBbtrBUdycNHxM3eQ";

  //Get latest blockchain length
  let height = await blockchain.height()
  //Get a list of wallet transactions
  let txs = await blockchain.addresses.txs(addresses)

  //Get all utxo
  let utxos = await Metaverse.output.calculateUtxo(txs.transactions, addresses)

  //Collect enough utxos to pay for the transfer
  let result = await Metaverse.output.findUtxo(utxos, target, height)

  //Build the transaction object
  let tx = await Metaverse.transaction_builder.send(result.utxo, recipient_address, undefined, target, result.utxo[0].address, result.change)


  //Sign the transaction with your wallet
  tx = await wallet.sign(tx)

  //Encode the transaction into bytecode
  tx = await tx.encode()

  //Broadcast the transaction to the metaverse network.
  tx = await blockchain.transaction.broadcast(tx.toString('hex'))

  console.log("tx hash: ")

  //log amount ETP sent to WHO
  console.log(tx)
}

```
### Test NodeJS

To test your nodejs code, Create a function called run() and make sure it gets executed in the script.

For now, since the metaverse faucet is not operational, use this mnemonic:

```
var mnemonic = "van juice oak general lyrics gravity hammer shield over eager crew volume survey join lonely purchase kitten artwork mass cousin process mixture add knife"

```

```javascript
run()

async function run(){
  await createWallet()

  let balance = await getETPBalance()
  console.log("Wallet balance: " + balance + " ETP")

  await sendETP()
}
```

now in your terminal run

```
node tut1.js
```

You should see an ETP balance, and a transaction hash in your terminal. You can take the transaction hash and view the transaction in the [Metaverse Testnet Blockchain Explorer](https://explorer-testnet.mvs.org/).


### Connect to Dapp

To interact with metaversejs in your webapp, you need to reference metaversejs in your HTML.

```html
<script type="text/javascript" src="/dist/metaverse.min.js"></script>
```

Also reference your tut1.js file.

```html
<script type="text/javascript" src="tut1.js"></script>
```

Next serve the webpage with


```python
python -m SimpleHTTPServer 3333
```

or however you prefer

Verify that you have connected metaverse to the webapp by opening the browser console and typing "Metaverse". You should see the Metaverse object come up and look something like

_TODO: Expand upon once metaversjs referencing is completed_
Now connect elements to the js functions and youre done!
