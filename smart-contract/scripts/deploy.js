// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const candidates = ["Alice", "Bob", "Charlie"]; // 🧑‍💼 Danh sách ứng viên
  const durationInMinutes = 5; // ⏱️ Thời gian biểu quyết

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidates, durationInMinutes);

  await voting.deployed();
  console.log("✅ Voting contract deployed to:", voting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
