import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CountdownTimer from './components/CountdownTimer';
import contractABI from './contractABI.json';
import { CONTRACT_ADDRESS } from './config';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    }
  };

  const initContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const voteContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    setContract(voteContract);
    const candidatesList = await voteContract.getAllCandidates();
    setCandidates(candidatesList);
    const end = await voteContract.votingDeadline();
    setDeadline(parseInt(end.toString()) * 1000); // convert to ms
    const voted = await voteContract.hasVoted(await signer.getAddress());
    setHasVoted(voted);
  };

  const vote = async (name) => {
    if (!contract || hasVoted) return;
    try {
      const tx = await contract.vote(name);
      await tx.wait();
      alert(`Đã bỏ phiếu cho ${name}`);
      setHasVoted(true);
    } catch (err) {
      alert("Lỗi khi bỏ phiếu hoặc đã hết thời gian!");
    }
  };

  useEffect(() => {
    connectWallet().then(initContract);
  }, []);

  const votingClosed = deadline && Date.now() > deadline;

  return (
    <div style={{ padding: 20 }}>
      <h1>🗳️ Hệ thống Biểu quyết Blockchain</h1>
      {deadline && <CountdownTimer deadline={deadline} />}
      {!votingClosed ? (
        <>
          <h2>Chọn ứng viên để bỏ phiếu:</h2>
          {candidates.map((c, i) => (
            <button key={i} onClick={() => vote(c)} disabled={hasVoted}>
              {c}
            </button>
          ))}
          {hasVoted && <p>Bạn đã bỏ phiếu.</p>}
        </>
      ) : (
        <h2>⏰ Thời gian bỏ phiếu đã kết thúc.</h2>
      )}
    </div>
  );
}

export default App;
