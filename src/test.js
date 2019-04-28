const express = require('express');
const app = express();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
const SampleContract = require('../build/contracts/Sample.json');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/* TODO: GETTING VALUE FROM CONTRACT */

// `truffle compile` dan sonra `build` klasörünün içinde contractların ABI bilgilerini içeren JSON dosyaları oluşturulur
// Bu oluşturulan dosyayı import ettikten sonra contract'ın ABI bilgisini çektim
let contractABI = SampleContract.abi;

// // Parameters ---> web3.eth.Contract(jsonInterface, address (optional), options (optional))
let sampleContract = new web3.eth.Contract(contractABI, '0xC2FF7F94EB89089D1Fefabd1DC5b69a864773D67');

// // Buradaki `get` contract içerisindeki fonksiyonun ismi
sampleContract.methods.get().call()
	.then(result => console.log('Sonuç: ' + result))
	.catch(error => console.log('An error occured! --> ' + error));

/* TODO: <<< END >>>*/
// ----------------------------------------------------------------------------

accPublicKey  = '0x5b7EFc1ECe8429A71cE8c311a29799Ee5711269b';
accPrivateKey = '96e72ad0493bf4dde3023188b08492042a72b59941029bf0e884dec02752b73a';

// web3.eth.getTransactionCount(accPublicKey, (err, txCount) => {
// 	if (err) {
// 		console.log('An error occured:', err.message);
// 		return;
// 	}
	
// 	// Build the transaction
// 	const txObject = {
// 		nonce: web3.utils.toHex(txCount), // nonce is basically that account's transaction count. It helps to prevent double-spending problem
// 		to: '0xDBec1b9104D1046bEe8dA3fA11d41519DC4a0A45', // Contract adress or public adress
// 		value: web3.utils.toHex(web3.utils.toWei('0.001', 'ether')),
// 		gasLimit: web3.utils.toHex(21000),
// 		gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
// 	}

// 	console.log(txObject);

// 	// Sign
// 	const tx = new Tx(txObject);
// 	let bufferPK = Buffer.from(accPrivateKey, 'hex');
// 	tx.sign(bufferPK);

// 	const serializeTx = tx.serialize();
// 	const raw = '0x' + serializeTx.toString('hex');	

// 	// Broadcast
// 	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
// 		if (err) {
// 			console.log("Error:", err.message)
// 		} else {
// 			console.log('txHash:', txHash);	
// 		}
// 	});
// });

// console.log('Creating a new account...');
// let newAccount = web3.eth.accounts.create();
// console.log("Public Key:", newAccount.address);
// console.log("Private Key:", newAccount.privateKey);




// FIXME: Uncomment web app section of program

app.get('/', function (req, res) {
	res.sendFile('index.html', {
		root: __dirname + '/../static'
	});
});

app.use(express.static(__dirname + '/../static'));

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});
