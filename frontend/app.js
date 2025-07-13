const pinataJWT = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZThjNDU3ZC1lNzM1LTQwM2ItOTBlOS1lZjc2OGRhZTdiNGQiLCJlbWFpbCI6InN0YWtlbWFpbDA1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2ZGUwZWFjMTFlNmU1NTNjZGM3MSIsInNjb3BlZEtleVNlY3JldCI6IjdjNjRiZWY0M2Y5YzU3MmY1ZGI3YTU5OThkMmE0MGRhOGY2NWMyNDJlNjhlZjA4MmMzZmNhMzg4YzNkMjY4ZTgiLCJleHAiOjE3ODM2MDM4OTB9.JY_oPpA88d1OB08p5hooouzhfTJXiw-Zg8dhCFsjVt8"; // <-- Replace this with your actual JWT

// const pinataJWT = "Bearer eyJhbGciOi..."; // Your real JWT here
const contractAddress = "0x6dc92f0fc3fe66af0d9fa138bb37c86538b2c1bd"; // The FileSharing.sol contract
let contractABI;
let web3;
let currentAccount;
let contract;

async function loadABI() {
  const res = await fetch("abi.json");
  contractABI = await res.json();
}

async function init() {
  await loadABI();

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts();
    currentAccount = accounts[0];

    document.getElementById("walletAddress").innerText = `Connected Wallet: ${currentAccount}`;

    contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const web3Ganache = new Web3("http://127.0.0.1:7545");
      const allAccounts = await web3Ganache.eth.getAccounts();
      console.log("Ganache Accounts:", allAccounts);

      const select = document.getElementById("recipientSelect");
      select.innerHTML = allAccounts
        .filter(acc => acc !== currentAccount)
        .map(acc => `<option value="${acc}">${acc}</option>`)
        .join("");

      if (allAccounts.length === 0) {
        alert("No Ganache accounts found. Check Ganache setup.");
      }
    } catch (error) {
      console.error("Error fetching Ganache accounts:", error);
      alert("Failed to fetch Ganache accounts. Make sure Ganache is running.");
    }

  } else {
    alert("MetaMask not detected.");
  }
}

window.addEventListener("load", init);

async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const recipient = document.getElementById("recipientSelect").value;

  if (!file || !recipient) {
    alert("Please select a file and a recipient wallet address.");
    return;
  }

  console.log("Selected recipient:", recipient);
  console.log("Current account:", currentAccount);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: pinataJWT
      }
    });

    const data = await res.json();
    const ipfsHash = data.IpfsHash;
    console.log("Uploading file with IPFS hash:", ipfsHash);

    const tx = await contract.methods.shareFile(recipient, ipfsHash).send({ from: currentAccount });
    console.log("Transaction complete:", tx);
    alert("File shared successfully!");
  } catch (err) {
    console.error("Upload/share failed:", err);
    alert("Something went wrong. Check console.");
  }
}
async function getReceivedFiles() {
  const files = await contract.methods.getMyFiles().call({ from: currentAccount });
  const list = document.getElementById("receivedList");
  list.innerHTML = "";

  files.forEach(entry => {
    const url = `https://ipfs.io/ipfs/${entry.ipfsHash}`;
    const li = document.createElement("li");
    li.innerHTML = `From: ${entry.uploader} — <a href="${url}" target="_blank">${url}</a>`;
    list.appendChild(li);
  });
}


