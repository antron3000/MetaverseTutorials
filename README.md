# MetaverseTutorials
Step by step tutorials for the Metaverse Blockchain

This is a Metaverse Tutorial series

This is a series of Metaverse tutorials. To begin clone this repository

```
git clone https://github.com/antron3000/MetaverseTutorials.git

```

navigate to the tutorial directory

```
cd MetaverseTutorials
```

update your repo to the latest version of mvs-blockchain-js
```
git submodule update --init --recursive
```

Install the metaverse npm package

```
npm install metaversejs --save
```

Install the mvs-blockchain-js npm package
```
cd mvs-blockchain-js && npm install
```


Each tutorial builds on the previous ones, so it is recommended to do them in order

To begin a tutorial navigate to the tutorials folder and follow instructions.

Tutorial Information:

These tutorials are designed
* to be simple, no fluff
* hands on
* explain inner workings and give broad understanding of Metaverse blockchain
* Show you step by step how to create dApp on Metaverse. Can also be used to integrate into your existing app.
* provide working examples of what you should have built.
* each tutorial comes with complete solutions to show you how its done in the end. Don't look till you're done!


1. [Integrate Metaverse wallet into your dapp with your DID](tutorials/1-Metaverse-Wallet)
2. [Issue and transfer MST’s](tutorials/2-Avatars-and-MSTs)
3. [Issue and transfer MIT’s](tutorials/3-MITs)

For more information refer to the [Metaverse Documentation](https://docs.mvs.org/docs/)

Please follow the Environment setup instructions below before starting.

# Environment Setup

Start by entering the "playground" directory. This is where you can build ALL your Metaverse apps during the tutorial.

```
cd tutorials/playground
```

**Interact with metaverse libraries via nodejs**

create a testScript
```
touch testScript.js
```

To interact with Metaverse using javascript you can interact with mvs-blockchain-js and metaversejs

For use in nodejs scripts, import mvs-blockchain from the mvs-blockchain folder, and require metaversjs.

Inside the testscript, add:

```
//import mvs-blockchain-js
let blockchain = require('../../mvs-blockchain-js')({
    url: "https://explorer-testnet.mvs.org/api/"
});


//import metaversjs
let Metaverse = require('metaversejs');

//make sure the libraries have been successfully imported

console.log(blockchain)
console.log("mvs-blockchain-js has been successfully imported!")
console.log(Metaverse)
console.log("Metaversjs has been successfully imported!")
```

now run

```
node testScript.js
```

**Interact with metaverse via webapp**

First create an html file
```
touch index.html
```

and add

```
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>

```


To interact with webapps you must generate "index.js" from mvs-blockchain-js and "metaverse.min.js" from metaversejs. To generate these files you must clone each repository and simply run

```
grunt
```

This will generate javascript files into the /dist folder that you can import into your app.  You don't have to worry about this for now. We have generated these files and placed them in the playground folder. To include them in your webapp just add these script tags into your html page.

```
<script src = "metaverse.min.js"></script>
<script src = "index.min.js"></script>
```

Serve your webpage
```
python -m SimpleHTTPServer 4444
```

To test that the libraries have been successfully imported into your webpage, open the web console and enter

```
blockchain = await Blockchain({url: "https://explorer-testnet.mvs.org/api/"})

blockchain

Metaverse
```

You should see the "blockchain" (from mvs-blockchain-js) and Metaverse (from metaversjs) objects show up in the console.

You should now be fully set up and ready to begin [tutorial 1](tutorials/1-Metaverse-Wallet).
