const { ethers } = require('ethers');

// Environment variables
const RPC_URL = process.env.LUKSO_TESTNET_RPC_URL;
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

async function tranferLYX(to, amount) {
	try {
		// Ensure required environment variables are available
		if (!RPC_URL || !PRIVATE_KEY) {
			throw new Error(
				'RPC_URL or PRIVATE_KEY is not defined in the environment variables.'
			);
		}

		// Initialize JSON-RPC provider for LUKSO testnet
		const provider = new ethers.JsonRpcProvider(RPC_URL);

		// Create wallet instance using private key and provider
		const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

		// Prepare and send transaction
		const tx = await wallet.sendTransaction({
			to,
			value: ethers.parseEther(amount.toString()), 
		});

		// Wait until the transaction is confirmed
		await tx.wait();

		// Log transaction hash
		console.log('LYX sent successfully:', tx.hash);

	} catch (error) {
		console.error('Error while sending LYX:', error.message);
		throw error; 
	}
};

module.exports = {
	tranferLYX,
};
