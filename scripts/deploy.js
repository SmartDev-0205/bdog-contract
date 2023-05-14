
const fs = require("fs");
const colors = require("colors");
const { ethers } = require("hardhat");
// const ERC20ABI =
//     require("../artifacts/contracts/ERC20.sol/ERC20.json").abi;
// const AirdropAbi =
//     require("../artifacts/contracts/airdrop.sol/Airdrop.json").abi;
async function main() {
    // get network
    let [owner] = await ethers.getSigners();
    console.log(owner.address);
    let network = await owner.provider._networkPromise;

    //QE token deployment
    const ERC20TOKEN = await ethers.getContractFactory("ERC20");
    const tokenContract = await ERC20TOKEN.deploy("LUCKY SHIBA", "LShiba");
    await tokenContract.deployed();

    console.log("Lucky contract",tokenContract.address);

    const approveTokenContract = await ERC20TOKEN.deploy("Approve Token", "Apv");
    await approveTokenContract.deployed();

    console.log("Approve contract",approveTokenContract.address);

    const AirdropContract = await ethers.getContractFactory("Airdrop");
    const airdropContract = await AirdropContract.deploy(tokenContract.address, approveTokenContract.address);
    await airdropContract.deployed();
    console.log("Airdrop contract",airdropContract.address);
}

main()
    .then(() => {
        console.log("complete".green);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });