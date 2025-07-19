# IPFS_BlockChain_FileUploading

The following code is a simple implementation of a blockchain-based file uploading system using IPFS (InterPlanetary File System).

We used the following libraries:
- `ipfs` for interacting with IPFS
- `hashlib` for generating hashes of files
- `json` for storing and retrieving data from the blockchain
- `time` for timestamping blocks

We used Pinata as our IPFS gateway.
This can be run on a Local Machine using Ganache and used Remix to get Contract address and ABI.

Ganache
- Ganache is a local Ethereum blockchain development environment that allows you to run a local Ethereum node and deploy smart contracts to it.
- It is a great tool for testing and development of smart contracts.

Solidity
- Solidity is a contract-oriented programming language for implementing smart contracts.
- It is the primary language used for developing smart contracts on the Ethereum blockchain.

Pinata
- Pinata is a decentralized storage service that allows users to store and share files.
- It is used as an IPFS gateway in this code.

Our Application provides the following functionality:
- Users can upload files to IPFS using the `upload_file` function.
- The `upload_file` function generates a hash of the file and stores it in the blockchain.
- The `get_file` function retrieves a file from IPFS using its hash.

The Web application will be built using React and will interact with the smart contract using Web3.js and it have great UI/UX.
