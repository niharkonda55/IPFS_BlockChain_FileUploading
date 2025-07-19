// const pinataJWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZThjNDU3ZC1lNzM1LTQwM2ItOTBlOS1lZjc2OGRhZTdiNGQiLCJlbWFpbCI6InN0YWtlbWFpbDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2ZGUwZWFjMTFlNmU1NTNjZGM3MSIsInNjb3BlZEtleVNlY3JldCI6IjdjNjRiZWY0M2Y5YzU3MmY1ZGI3YTU5OThkMmE0MGRhOGY2NWMyNDJlNjhlZjA4MmMzZmNhMzg4YzNkMjY4ZTgiLCJleHAiOjE3ODM2MDM4OTB9.JY_oPpA88d1OB08p5hooouzhfTJXiw-Zg8dhCFsjVt8"; // <-- Replace this with your actual JWT

// // const pinataJWT = "Bearer eyJhbGciOi..."; // Your real JWT here
// const contractAddress = "0x6dc92f0fc3fe66af0d9fa138bb37c86538b2c1bd"; // The FileSharing.sol contract
// let contractABI;
// let web3;
// let currentAccount;
// let contract;

// async function loadABI() {
//   const res = await fetch("abi.json");
//   contractABI = await res.json();
// }

// async function init() {
//   await loadABI();

//   if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const accounts = await web3.eth.getAccounts();
//     currentAccount = accounts[0];

//     document.getElementById("walletAddress").innerText = `Connected Wallet: ${currentAccount}`;

//     contract = new web3.eth.Contract(contractABI, contractAddress);

//     try {
//       const web3Ganache = new Web3("http://127.0.0.1:7545");
//       const allAccounts = await web3Ganache.eth.getAccounts();
//       console.log("Ganache Accounts:", allAccounts);

//       const select = document.getElementById("recipientSelect");
//       select.innerHTML = allAccounts
//         .filter(acc => acc !== currentAccount)
//         .map(acc => `<option value="${acc}">${acc}</option>`)
//         .join("");

//       if (allAccounts.length === 0) {
//         alert("No Ganache accounts found. Check Ganache setup.");
//       }
//     } catch (error) {
//       console.error("Error fetching Ganache accounts:", error);
//       alert("Failed to fetch Ganache accounts. Make sure Ganache is running.");
//     }

//   } else {
//     alert("MetaMask not detected.");
//   }
// }

// window.addEventListener("load", init);

// async function uploadFile() {
//   const file = document.getElementById("fileInput").files[0];
//   const recipient = document.getElementById("recipientSelect").value;

//   if (!file || !recipient) {
//     alert("Please select a file and a recipient wallet address.");
//     return;
//   }

//   console.log("Selected recipient:", recipient);
//   console.log("Current account:", currentAccount);

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//       method: "POST",
//       body: formData,
//       headers: {
//         Authorization: pinataJWT
//       }
//     });

//     const data = await res.json();
//     const ipfsHash = data.IpfsHash;
//     console.log("Uploading file with IPFS hash:", ipfsHash);

//     const tx = await contract.methods.shareFile(recipient, ipfsHash).send({ from: currentAccount });
//     console.log("Transaction complete:", tx);
//     alert("File shared successfully!");
//   } catch (err) {
//     console.error("Upload/share failed:", err);
//     alert("Something went wrong. Check console.");
//   }
// }
// async function getReceivedFiles() {
//   const files = await contract.methods.getMyFiles().call({ from: currentAccount });
//   const list = document.getElementById("receivedList");
//   list.innerHTML = "";

//   files.forEach(entry => {
//     const url = `https://ipfs.io/ipfs/${entry.ipfsHash}`;
//     const li = document.createElement("li");
//     li.innerHTML = `From: ${entry.uploader} — <a href="${url}" target="_blank">${url}</a>`;
//     list.appendChild(li);
//   });
// }


// Global variables
// const pinataJWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZThjNDU3ZC1lNzM1LTQwM2ItOTBlOS1lZjc2OGRhZTdiNGQiLCJlbWFpbCI6InN0YWtlbWFpbDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvblxbb3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOeWMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmRlMGVhYzExZTZlNTVjZGNjNzEiLCJzY29wZWRLZXlTZWNyZXQiOiI3YzY0YmVmNDNmOWM1NzJmNWRiN2E1OTk4ZDJhNDBkYThmNjVjMjQyZTY4ZWYwODJjM2ZjYTM4OGMzZDI2OGU4IiwiZXhwIjoxNzgzNjAzODkwfQ.JY_oPpA88d1OB08p5hooouzhfTJXiw-Zg8dhCFsjVt8";
// const contractAddress = "0x6dc92f0fc3fe66af0d9fa138bb37c86538b2c1bd"; // The FileSharing.sol contract

// Global variables
// IMPORTANT: The JWT string itself should NOT contain "Bearer ".
// "Bearer " is added in the 'headers' object.
const pinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZThjNDU3ZC1lNzM1LTQwM2ItOTBlOS1lZjc2OGRhZTdiNGQiLCJlbWFpbCI6InN0YWtlbWFpbDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2ZGUwZWFjMTFlNmU1NTNjZGM3MSIsInNjb3BlZEtleVNlY3JldCI6IjdjNjRiZWY0M2Y5YzU3MmY1ZGI3YTU5OThkMmE0MGRhOGY2NWMyNDJlNjhlZjA4MmMzZmNhMzg4YzNkMjY4ZTgiLCJleHAiOjE3ODM2MDM4OTB9.JY_oPpA88d1OB08p5hooouzhfTJXiw-Zg8dhCFsjVt8"; // <-- Replace this with your actual JWT
const contractAddress = "0x6dc92f0fc3fe66af0d9fa138bb37c86538b2c1bd"; // The FileSharing.sol contract address

let web3;
let contract;
let currentAccount;
let contractABI; // Loaded from abi.json

// Function to load the contract ABI from abi.json
async function loadABI() {
  try {
    const res = await fetch("abi.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    contractABI = await res.json();
    console.log("Contract ABI loaded successfully.");
  } catch (error) {
    console.error("Error loading ABI:", error);
    alert("Failed to load contract ABI. Please ensure 'abi.json' is in the same directory.");
  }
}

// Function to initialize Web3, connect wallet, and load Ganache accounts
async function init() {
  await loadABI(); // Ensure ABI is loaded before trying to create contract instance

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      currentAccount = accounts[0];
      document.getElementById("walletAddress").innerHTML = `Connected Wallet: <span style="font-weight: 500;">${currentAccount}</span>`;

      // Initialize contract instance
      if (contractABI && contractAddress) {
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Smart contract loaded.");
      } else {
        console.error("Contract ABI or Address is missing. Cannot initialize contract.");
        alert("Contract initialization failed. Check console for details and ensure contractABI/contractAddress are set.");
        return; // Stop execution if contract cannot be initialized
      }

      // --- MetaMask Event Listeners for better UX ---
      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts) => {
        if (newAccounts.length === 0) {
          // User disconnected all accounts
          document.getElementById("walletAddress").innerHTML = `Connected Wallet: <span style="font-weight: 500;">Not connected</span>`;
          currentAccount = null;
          document.getElementById("receivedList").innerHTML = '<li style="text-align: center; color: #777;">Please connect your wallet to view files.</li>';
          document.getElementById("recipientSelect").innerHTML = '<option value="">-- Select Wallet --</option>'; // Clear recipient options
          alert("Wallet disconnected. Please refresh or connect again.");
        } else {
          currentAccount = newAccounts[0];
          document.getElementById("walletAddress").innerHTML = `Connected Wallet: <span style="font-weight: 500;">${currentAccount}</span>`;
          console.log("Account changed to:", currentAccount);
          // Re-fetch received files for the new account
          getReceivedFiles();
        }
      });

      // Listen for chain changes (e.g., switching from Ganache to Mainnet)
      window.ethereum.on('chainChanged', (chainId) => {
        console.log("Chain changed to:", chainId);
        // Prompt user to reload for a clean state on network change
        alert("Network changed. Please confirm the correct network in MetaMask and reload the page.");
        window.location.reload();
      });
      // --- End MetaMask Event Listeners ---

      // Fetch Ganache accounts for the recipient select dropdown
      try {
        const web3Ganache = new Web3("http://127.0.0.1:7545"); // Assuming Ganache is running locally
        const allAccounts = await web3Ganache.eth.getAccounts();
        console.log("Ganache Accounts:", allAccounts);

        const select = document.getElementById("recipientSelect");
        // Clear existing options and add default
        select.innerHTML = '<option value="">-- Select Wallet --</option>';
        // Populate dropdown, filtering out the current connected account
        allAccounts
          .filter(acc => acc.toLowerCase() !== currentAccount.toLowerCase()) // Case-insensitive comparison
          .forEach(acc => {
            const option = document.createElement('option');
            option.value = acc;
            option.textContent = acc;
            select.appendChild(option);
          });

        if (allAccounts.length === 0) {
          alert("No Ganache accounts found. Check Ganache setup.");
        } else if (select.options.length === 1 && allAccounts.length > 1) { // Only default option and other accounts exist
          // This means current account is the only Ganache account, or all others were filtered.
          alert("No other Ganache accounts available to share with. Please ensure you have multiple accounts in Ganache.");
        }
      } catch (error) {
        console.error("Error fetching Ganache accounts (Ganache not running?):", error);
        alert("Failed to fetch Ganache accounts. Make sure Ganache is running on http://127.0.0.1:7545.");
        document.getElementById("recipientSelect").innerHTML = '<option value="">-- Ganache not connected --</option>'; // Indicate issue in dropdown
      }

      // Immediately fetch and display received files after successful init
      getReceivedFiles();

    } catch (error) {
      console.error("User denied account access or other MetaMask error:", error);
      document.getElementById("walletAddress").innerHTML = `Connected Wallet: <span style="font-weight: 500;">Connection denied</span>`;
      alert("MetaMask connection denied or failed. Please allow access to your wallet.");
    }

  } else {
    document.getElementById("walletAddress").innerHTML = `Connected Wallet: <span style="font-weight: 500;">MetaMask not detected</span>`;
    alert("MetaMask not detected. Please install MetaMask browser extension to use this DApp.");
  }
}

// Attach init function to window load event
window.addEventListener("load", init);

// Function to upload file to Pinata and share via contract
async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const recipient = document.getElementById("recipientSelect").value;

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }
  if (!recipient) {
    alert("Please select a recipient wallet address from the dropdown.");
    return;
  }
  if (!contract || !currentAccount) {
    alert("Wallet not connected or contract not initialized. Please refresh the page.");
    return;
  }

  console.log("Selected recipient:", recipient);
  console.log("Current account:", currentAccount);
  console.log("File to upload:", file.name, file.size, file.type);

  const formData = new FormData();
  formData.append("file", file);

  // Provide user feedback during upload and disable button
  const uploadButton = document.querySelector('button[onclick="uploadFile()"]');
  const originalButtonText = uploadButton.textContent;
  uploadButton.textContent = "Uploading & Sharing...";
  uploadButton.disabled = true;

  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${pinataJWT}` // CORRECT: Adds "Bearer " prefix here
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Pinata upload failed: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    const ipfsHash = data.IpfsHash;
    console.log("File uploaded to IPFS with hash:", ipfsHash);

    // Send transaction to share file on the blockchain
    console.log("Sending blockchain transaction to share file...");
    const tx = await contract.methods.shareFile(recipient, ipfsHash).send({ from: currentAccount });
    console.log("Transaction complete:", tx);
    alert("File shared successfully!");

    // Clear the file input and refresh received files
    fileInput.value = '';
    getReceivedFiles(); // Refresh the list to show newly shared file if it's for current user

  } catch (err) {
    console.error("Upload/share failed:", err);
    // Provide more detailed alert to the user
    alert(`Something went wrong during upload or blockchain transaction. Please check the browser console for details.\nError: ${err.message || err}`);
  } finally {
    // Always reset button state
    uploadButton.textContent = originalButtonText;
    uploadButton.disabled = false;
  }
}

// Function to get and display received files
async function getReceivedFiles() {
  const list = document.getElementById("receivedList");
  // Show a loading indicator while fetching
  list.innerHTML = '<li style="text-align: center; color: #777;">Loading files...</li>';

  if (!contract || !currentAccount) {
    // Display appropriate message if wallet not connected or contract not loaded
    list.innerHTML = '<li style="text-align: center; color: #777;">Please connect your wallet to view files.</li>';
    return;
  }

  try {
    const files = await contract.methods.getMyFiles().call({ from: currentAccount });
    list.innerHTML = ""; // Clear loading indicator and previous items

    if (files.length === 0) {
      // Display message if no files are found for the current account
      list.innerHTML = '<li style="text-align: center; color: #777;">No files received yet.</li>';
      return;
    }

    // Iterate through files and create list items dynamically
    files.forEach(entry => {
      const url = `https://ipfs.io/ipfs/${entry.ipfsHash}`;
      const li = document.createElement("li");

      // Create the wrapper div to match the CSS structure for proper link wrapping
      const fileInfoDiv = document.createElement('div');
      fileInfoDiv.classList.add('file-info');

      const fromSpan = document.createElement('span');
      // Display a shortened version of the uploader's address for better readability
      const shortUploader = `${entry.uploader.substring(0, 6)}...${entry.uploader.slice(-4)}`;
      fromSpan.textContent = `From: ${shortUploader}`;

      const linkAnchor = document.createElement("a");
      linkAnchor.href = url;
      linkAnchor.target = "_blank"; // Opens the link in a new browser tab
      linkAnchor.textContent = url; // Display the full IPFS link

      fileInfoDiv.appendChild(fromSpan);
      fileInfoDiv.appendChild(linkAnchor);
      li.appendChild(fileInfoDiv);

      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching received files:", err);
    // Display an error message to the user in the list
    list.innerHTML = `<li style="text-align: center; color: red;">Failed to load files. Error: ${err.message || "Unknown error"}</li>`;
    alert("Failed to fetch received files. Check browser console for more details.");
  }
}