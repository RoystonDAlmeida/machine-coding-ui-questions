import { useState, useEffect } from "react";

function StopWatch()
{
  // State variables to keep track of time and running state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    
    if(isRunning)
    {
      // Increment time every second
      intervalId = setInterval(() => setTime(time => time + 1), 1000);
    }

    return () => clearInterval(intervalId); // Used to clear interval and avoid memory leaks
  }, [isRunning]);  // Hook will run only when isRunning changes

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  }

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <h1>StopWatch</h1>
      <p>{formatTime(time)}</p>
      <button onClick = {handleStartStop}>
        {isRunning ? "Stop":"Start"}
      </button>
      <button onClick = {handleReset}>
        Reset
      </button>
    </>
  );
}

export default StopWatch;
