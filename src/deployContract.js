// Ropsten Test Network Account Details [Current Balance: ~1 ETH]
// Public  Key: 0x64B15665779A8D85D79ac81ec71E4985D61dc606
// Private Key: 979AE75C5C10F836E001CAFB83EA306C3B758308FD140EAE45439606F8DB3621

const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
const SampleContract = require('../build/contracts/Sample.json');
const keythereum = require("keythereum");
const ethUtil = require('ethereumjs-util');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/1d6a7f1c8bed4cec8f6f05d0f83f481e"));
}

// need to specify a password and (optionally) a key derivation function.
// If unspecified, PBKDF2-SHA256 will be used to derive the AES secret key.
var password = "oyla-project";
var kdf = "pbkdf2";

let key = keythereum.create(); // Generate  private key
let privKey = key.privateKey.toString('hex');

console.log('Private Key:', privKey);

let pubKey = ethUtil.privateToPublic(Buffer.from(key.privateKey, 'hex')); // Generate public key from private key
let publicAddr = ethUtil.publicToAddress(pubKey).toString('hex');  // Transform public key to public address

console.log('Public Key: ', publicAddr);

web3.eth.getBalance('0x64B15665779A8D85D79ac81ec71E4985D61dc606', (error, result) => {
	if (error) {
		console.log('Error:', error);
		return;
	}
	console.log('Balance:', result.toString(), );
});

web3.eth.getTransactionCount('0x64B15665779A8D85D79ac81ec71E4985D61dc606', (err, txCount) => {
	if (err) {
		console.log('An error occured:', err.message);
		return;
	}
	
	var result = web3.eth.estimateGas({
		to: "0xc4abd0339eb8d57087278718986382264244252f", 
		data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
	 });

	result.then(r => {
		 console.log('Estimated gas', r) }
	);

    // Build the transaction
    const txObject = {
        // to: -> There is no need to specify an adress because we're broadcasting it to entire network not to the specific recipient.
        nonce: web3.utils.toHex(txCount), // nonce is basically that account's transaction count. It helps to prevent double-spending problem
        gasLimit: 4000000, // Deploying contract to the blockchain is usually costs much more than a normal TX.
        // gasLimit: web3.utils.toHex(1000000), // Deploying contract to the blockchain is usually costs much more than a normal TX.
        gasPrice: 400000000000,
        // gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
		data: SampleContract.bytecode,
		// EIP 155 chainId - ropsten: 3
		// chainId: 0x03,
    }
    // Sign
    const tx = new Tx(txObject);
    let bufferPK = Buffer.from('979AE75C5C10F836E001CAFB83EA306C3B758308FD140EAE45439606F8DB3621', 'hex');
    tx.sign(bufferPK);

    const serializeTx = tx.serialize();
    const raw = '0x' + serializeTx.toString('hex');

    // Broadcast
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) {
            console.log("SendSignedTransaction --> Error:", err.message)
        } else {
            console.log('[Succesful] txHash:', txHash);	
        }
    });
});



// accPublicKey  = '0x5b7EFc1ECe8429A71cE8c311a29799Ee5711269b';
// accPrivateKey = '96e72ad0493bf4dde3023188b08492042a72b59941029bf0e884dec02752b73a';

// web3.eth.getTransactionCount(accPublicKey, (err, txCount) => {
// 	if (err) {
// 		console.log('An error occured:', err.message);
// 		return;
//     }

//     // Build the transaction
//     const txObject = {        
//         // to: -> There is no need to specify an adress because we're broadcasting it to entire network not to the specific recipient.
//         nonce: txCount, // nonce is basically that account's transaction count. It helps to prevent double-spending problem
//         gasLimit: web3.utils.toHex(1000000), // Deploying contract to the blockchain is usually costs much more than a normal TX.
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//         data: SampleContract.bytecode
//     }
//     // Sign
//     const tx = new Tx(txObject);
//     let bufferPK = Buffer.from(accPrivateKey, 'hex');
//     tx.sign(bufferPK);

//     const serializeTx = tx.serialize();
//     const raw = '0x' + serializeTx.toString('hex');

//     // Broadcast
//     web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//         if (err) {
//             console.log("Error:", err.message)
//         } else {
//             console.log('txHash:', txHash);	
//         }
//     });
// });