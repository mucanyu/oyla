// Ropsten Test Network Account Details [Current Balance: ~1 ETH]
// Public  Key: 0x64B15665779A8D85D79ac81ec71E4985D61dc606
// Private Key: 979AE75C5C10F836E001CAFB83EA306C3B758308FD140EAE45439606F8DB3621

const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
const SampleContract = require('../build/contracts/Sample.json');

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

accPublicKey  = '0x5b7EFc1ECe8429A71cE8c311a29799Ee5711269b';
accPrivateKey = '96e72ad0493bf4dde3023188b08492042a72b59941029bf0e884dec02752b73a';

web3.eth.getTransactionCount(accPublicKey, (err, txCount) => {
	if (err) {
		console.log('An error occured:', err.message);
		return;
    }

    // Build the transaction
    const txObject = {        
        // to: -> There is no need to specify an adress because we're broadcasting it to entire network not to the specific recipient.
        nonce: txCount, // nonce is basically that account's transaction count. It helps to prevent double-spending problem
        gasLimit: web3.utils.toHex(1000000), // Deploying contract to the blockchain is usually costs much more than a normal TX.
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: SampleContract.bytecode
    }
    // Sign
    const tx = new Tx(txObject);
    let bufferPK = Buffer.from(accPrivateKey, 'hex');
    tx.sign(bufferPK);

    const serializeTx = tx.serialize();
    const raw = '0x' + serializeTx.toString('hex');

    // Broadcast
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) {
            console.log("Error:", err.message)
        } else {
            console.log('txHash:', txHash);	
        }
    });
});