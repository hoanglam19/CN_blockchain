
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ deadline }) => {
  const [remainingTime, setRemainingTime] = useState(deadline);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="countdown-timer">
      <strong>⏳ Thời gian còn lại: {formatTime(remainingTime)}</strong>
    </div>
  );
};

export default CountdownTimer;
