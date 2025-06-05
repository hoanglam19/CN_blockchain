<<<<<<< HEAD
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./contractABI.json";
import { CONTRACT_ADDRESS } from "./config";

function App() {
  const [account, setAccount] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [voteStatus, setVoteStatus] = useState("");
  const [isVoting, setIsVoting] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        fetchData(); // Gọi fetch lại sau khi kết nối ví
      } catch (err) {
        console.error("Lỗi khi kết nối ví:", err);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask!");
    }
  };

  const fetchData = async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

      const candidateList = await contract.getAllCandidates();
      setCandidates(candidateList);

      const timeLeft = await contract.getRemainingTime();
      setRemainingTime(parseInt(timeLeft));
    } catch (error) {
      console.error("Lỗi fetch dữ liệu:", error);
    }
  };

  const castVote = async () => {
    if (!selectedCandidate) {
      setVoteStatus("❗ Vui lòng chọn ứng viên trước khi biểu quyết.");
      return;
    }

    try {
      setIsVoting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const hasVoted = await contract.hasVoted(account);
      if (hasVoted) {
        setVoteStatus("❗ Bạn đã biểu quyết rồi.");
        return;
      }

      const tx = await contract.vote(selectedCandidate);
      await tx.wait();

      setVoteStatus("✅ Biểu quyết thành công!");
    } catch (error) {
      console.error("Vote error:", error);
      setVoteStatus("❌ Lỗi biểu quyết. Vui lòng thử lại.");
    } finally {
      setIsVoting(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      fetchData();
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🗳️ Hệ thống Biểu quyết Blockchain</h1>

      {!account ? (
        <button onClick={connectWallet}>🔌 Kết nối ví</button>
      ) : (
        <div>
          <p>✅ Đã kết nối</p>
          <p>👛 Ví: {account}</p>
        </div>
      )}

      <hr />

      <p>⏳ Thời gian còn lại: {formatTime(remainingTime)}</p>

      <h3>Chọn ứng viên:</h3>
      {candidates.length === 0 ? (
        <p>⏳ Đang tải danh sách ứng viên...</p>
      ) : (
        candidates.map((candidate, index) => (
          <button
            key={index}
            onClick={() => setSelectedCandidate(candidate)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedCandidate === candidate ? "lightgreen" : "#eee",
            }}
          >
            {candidate}
          </button>
        ))
      )}

      {selectedCandidate && (
        <p>✅ Ứng viên đã chọn: <strong>{selectedCandidate}</strong></p>
      )}

      <br />
      <button
        onClick={castVote}
        disabled={isVoting || remainingTime === 0 || !account}
      >
        🗳️ Biểu quyết
      </button>

      <p>{voteStatus}</p>
=======
import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const ABI = [
  "function guess(uint number) public payable returns (bool)",
  "event GuessResult(address indexed player, bool success, uint guessedNumber)",
  "function revealSecretNumber() public view returns (uint)"
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState(null);
  const [correctNumber, setCorrectNumber] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, _signer);
      const address = await _signer.getAddress();

      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);
      setAccount(address);
      setMessage("✅ Đã kết nối ví!");
    } else {
      setMessage("❌ Cài đặt MetaMask trước.");
    }
  };

  const sendGuess = async () => {
    if (!contract) return setMessage("❗ Kết nối ví trước đã.");

    try {
      const tx = await contract.guess(guess, {
        value: ethers.parseEther("0.01"),
      });
      await tx.wait();

      const receipt = await provider.getTransactionReceipt(tx.hash);
      const iface = new ethers.Interface(ABI);
      const event = iface.parseLog(receipt.logs[0]);

      if (event.args.success) {
        setMessage("🎉 Bạn đã đoán đúng! Nhận thưởng thành công.");
      } else {
        setMessage("😢 Bạn đoán sai. Không nhận được thưởng.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Lỗi giao dịch.");
    }
  };

  const revealSecret = async () => {
    if (!contract) return;
    try {
      const number = await contract.revealSecretNumber();
      setCorrectNumber(Number(number));
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Không thể hiển thị số bí mật.");
    }
  };

  const shortenAddress = (addr) =>
    addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "";

  return (
    <div className="app">
      <h1>🎮 Trò chơi Đoán Số</h1>

      {account ? (
        <p>🦊 Đã kết nối ví: <strong>{shortenAddress(account)}</strong></p>
      ) : (
        <button onClick={connectWallet}>🔗 Kết nối ví</button>
      )}

      <input
        type="number"
        placeholder="Nhập số (0 - 100)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={sendGuess}>🚀 Gửi phỏng đoán</button>

      <p>{message}</p>

      <button onClick={revealSecret}>👁️ Hiển thị số đúng</button>

      {correctNumber !== null && (
        <p>🎯 Số bí mật là: <strong>{correctNumber}</strong></p>
      )}
>>>>>>> 2dfa8f32eaabf709a8c34a2cfb69a1b985a61bce
    </div>
  );
}

export default App;
