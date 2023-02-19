import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); // TODO set true
  const handleStopTimer= () => setIsActive(false)

  useEffect(() => {
    let interval;
    if (isActive)
      interval = setInterval(() => setSeconds((seconds) => seconds + 0.1), 100);

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return <h2 style={{ justifySelf: 'flex-end' }}>{seconds.toFixed(1)}s</h2>;
};

export default Timer;
