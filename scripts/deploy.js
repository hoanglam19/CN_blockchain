async function main() {
  const GuessNumber = await ethers.getContractFactory("GuessNumber");
  const contract = await GuessNumber.deploy(); // ❌ Không truyền 7
  await contract.deployed();
  console.log("✅ Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
