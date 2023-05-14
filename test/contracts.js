const { expect } = require("chai");
const fs = require("fs");
const { ethers } = require("hardhat");
const { delay, fromBigNum, toBigNum } = require("./utils.js")

var owner;
var tokenContract;
var approveTokenContract;
var airdropContract;


describe("deploy contracts", function () {
	it("Create account", async function () {
		[owner,addr2] = await ethers.getSigners();
		console.log("This is owner address : ",owner.address);
		
		
	});

	it("deploy contracts", async function () {
		const ERC20TOKEN = await ethers.getContractFactory("ERC20");
		tokenContract = await ERC20TOKEN.deploy("QEToken", "QE");
		await tokenContract.deployed();

		approveTokenContract = await ERC20TOKEN.deploy("Approve", "AP");
		await approveTokenContract.deployed();


		const airdropContracTemp = await ethers.getContractFactory("Airdrop");
		airdropContract = await airdropContracTemp.deploy(tokenContract.address,approveTokenContract.address);
		await airdropContract.deployed();
	})
	
});


describe("Test contract", function () {
	it("Deposit Test", async function () {
		await tokenContract.approve(airdropContract.address,"10000000000000000000000")
		let tx = await  airdropContract.deposit("10000000000000000000000");
		await tx.wait();
	});

	it("withdraw Test", async function () {
		let tx = await  airdropContract.withdraw("1000000000000000000000");
		await tx.wait();
	});
	

	it("Airdrop Test", async function () {
		let tx = await  airdropContract.airdrop("1000");
		await tx.wait();
	});
	
	it("Airdrop Test", async function () {
		await expect(airdropContract.connect(addr2).airdrop("1000")).to.be.revertedWith(
			"You should be token holder"
		  );
	});
});