// const express = require('express');
// const app = express();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
const SampleContract = require('../build/contracts/Sample.json');
const DenemelerContract = require('../build/contracts/Denemeler.json');
const keythereum = require("keythereum");
const ethUtil = require('ethereumjs-util');
const moment = require('moment');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/1d6a7f1c8bed4cec8f6f05d0f83f481e"));
	// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/* TODO: GETTING VALUE FROM CONTRACT */

// // `truffle compile` dan sonra `build` klasörünün içinde contractların ABI bilgilerini içeren JSON dosyaları oluşturulur
// // Bu oluşturulan dosyayı import ettikten sonra contract'ın ABI bilgisini çektim
// let contractABI = SampleContract.abi;

// // // Parameters ---> web3.eth.Contract(jsonInterface, address (optional), options (optional))
// let sampleContract = new web3.eth.Contract(contractABI, '0x2Acc0026f0d2f1fF04B96917D0Dda98558C030D4');

// // // Buradaki `get` contract içerisindeki fonksiyonun ismi
// sampleContract.methods.get().call()
// 	.then(result => console.log('Sonuç1: ' + result))
// 	.catch(error => console.log('XXX An error occured! --> ' + error));
// FIXME:

moment.locale('en-gb');
console.log('Tarih: ' + moment("12-25-1995 17:50", "MM-DD-YYYY HH:mm").unix());
console.log('Tarih2: ' + moment('1557422695', 'X').format('LLLL'));

let DenemelerABI = DenemelerContract.abi;

web3.eth.getAccounts((error, accounts) => {
	if (error) {
		console.log('Cant get accounts.');
	} else {
		console.log("ACCOUNTS >", accounts);		
	}
});

let testAcc = web3.eth.accounts.create(web3.utils.randomHex(32));
console.log('Account details --->', testAcc.privateKey, '\n');

// // Parameters ---> web3.eth.Contract(jsonInterface, address (optional), options (optional))
let denemelerContract = new web3.eth.Contract(DenemelerABI, '0x6986F0d1e491De5Cfa94B9c7B8ADdA1f03c13fc0');

// // Buradaki `get` contract içerisindeki fonksiyonun ismi
denemelerContract.methods.birSeyler().call()
	.then(result => console.log('Sonuç1: ' + result))
	.catch(error => console.log('XXX An error occured! --> ' + error));
/* TODO: <<< END >>>*/
// --------------------------------------------------------------------------------

accPublicKey = '0xEe0b0ADFE4EfB63a73D3e10fE76C3A9865cb58Ed';
accPrivateKey = '3066d2f55969763a7d855cc30e553eebd82cae8c6dd5f9b7fb3d23b07c34fa18';

// need to specify a password and (optionally) a key derivation function.
// If unspecified, PBKDF2-SHA256 will be used to derive the AES secret key.
var password = "oyla-project";
var kdf = "pbkdf2";

let key = keythereum.create(); // Generate  private key
let privKey = key.privateKey.toString('hex');

console.log('Private Key:', privKey);

let pubKey = ethUtil.privateToPublic(Buffer.from(key.privateKey, 'hex')); // Generate public key from private key
let publicAddr = '0x' + ethUtil.publicToAddress(pubKey).toString('hex'); // Transform public key to public address

console.log('Public Address: ', publicAddr);

// web3.eth.getBalance('0xe5ED3589Fa45bb03a0fcb727EdF799727C849D6c', (error, result) => {
// 	if (error) {
// 		console.log('Error:', error);
// 		return;
// 	}
// 	console.log('Balance: ' +  web3.utils.fromWei(result.toString(), 'ether') + ' Ether');
// });

// web3.eth.getTransactionCount('0x64B15665779A8D85D79ac81ec71E4985D61dc606', (err, txCount) => {
// 	if (err) {
// 		console.log('An error occured:', err.message);
// 		return;
// 	}

// 	// Build the transaction
// 	const txObject = {
// 		nonce: 	  web3.utils.toHex(txCount), // nonce is basically that account's transaction count. It helps to prevent double-spending problem
// 		gasLimit: web3.utils.toHex(1000000),
// 		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // web3.utils.toHex(web3.eth.getGasPrice()),
// 		to: 	  publicAddr, // Contract adress or public adress
// 		value: web3.utils.toHex(web3.utils.toWei('0.003', 'ether')),
// 	}

// 	// console.log(txObject);

// 	// Sign
// 	const tx = new Tx(txObject);
// 	let bufferPK = Buffer.from('979AE75C5C10F836E001CAFB83EA306C3B758308FD140EAE45439606F8DB3621', 'hex');
// 	tx.sign(bufferPK);

// 	const serializeTx = tx.serialize();
// 	const raw = '0x' + serializeTx.toString('hex');	

// 	// Broadcast
// 	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
// 		if (err) {
// 			console.log("SendSignedTransaction -> Error:", err.message)
// 		} else {
// 			console.log('txHash:', txHash);	
// 		}
// 	});
// })
// .then(() => {
// 	sampleContract.methods.get().call()
// 	.then(result => console.log('Sonuç2: ' + result))
// 	.catch(error => console.log('An error occured! --> ' + error));
// });

// TODO: OLD ONE IS BELOW HERE

// var aday = web3.utils.fromAscii('Mehmet');

// web3.eth.getTransactionCount('0xC6d2b08205c885122392db41B39addea0C3cfA84', (err, txCount) => {
// 	if (err) {
// 		console.log('An error occured:', err.message);
// 		return;
// 	}
// 	// Build the transaction
// 	const txObject = {
// 		nonce: 	  web3.utils.toHex(txCount), // nonce is basically that account's transaction count. It helps to prevent double-spending problem
// 		gasLimit: web3.utils.toHex(1000000),
// 		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // web3.utils.toHex(web3.eth.getGasPrice()),
// 		to: 	  '0x1aC6C472b95b96b53F68fCBc6AE88509e2EDEeA5', // Contract adress or public adress
// 		data:	  denemelerContract.methods.createElection("Yerel Seçimler", [aday], 1, 2, 3).encodeABI(),
// 		// value: web3.utils.toHex(web3.utils.toWei('0.09', 'ether')),
// 	}

// 	// console.log(txObject);

// 	// Sign
// 	const tx = new Tx(txObject);
// 	let bufferPK = Buffer.from('1cadfe2cf958bb40f8a0fc17ed28f8cb1da7cf8a5f3786a81c6bab9f65d45edf', 'hex');
// 	tx.sign(bufferPK);

// 	const serializeTx = tx.serialize();
// 	const raw = '0x' + serializeTx.toString('hex');	

// 	// Broadcast
// 	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
// 		if (err) {
// 			console.log("SendSignedTransaction -> Error:", err.message)
// 		} else {
// 			console.log('txHash:', txHash);	
// 		}
// 	});
// })
// .then(() => {
// 	denemelerContract.methods.getCandidateVoteCount(0, web3.utils.fromAscii('Mehmetz')).call()
// 	.then(result => console.log('Sonuç2: ' + result))
// 	.catch(error => console.log('An error occured! --> ' + error));
// });


// console.log('Creating a new account...');
// let newAccount = web3.eth.accounts.create();
// console.log("Public Key:", newAccount.address);
// console.log("Private Key:", newAccount.privateKey);

// FIXME: Uncomment web app section of program

// app.get('/', function (req, res) {
// 	res.sendFile('index.html', {
// 		root: __dirname + '/../static'
// 	});
// });

// app.use(express.static(__dirname + '/../static'));

// app.listen(8080, function () {
// 	console.log('Example app listening on port 8080!');
// });