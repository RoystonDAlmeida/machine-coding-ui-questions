import { useState, useEffect } from "react";

function CounterApp() {
  // Initialise state variables(time and running)
  const [time, setTime] = useState(0);
  const [isRunning, setisRunning] = useState(false);
  const [inputTime, setInputTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      // Run this function every 1000ms(1 sec)
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setisRunning(false); // Stop the timer when it reaches 0
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startTimer = () => {
    if(time > 0)
    {
      setisRunning(true);
    }
  }

  const handleSetTime = () => {
    setTime(inputTime);
  };

  const stopTimer = () => {
    setisRunning(false);
  }

  const resetTimer = () => {
    setisRunning(false);
    setTime(0);
    setInputTime(0);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputTime(value >= 0 ? value: 0);
  }

  return (
    <>
      <div>{formatTime(time)}</div>

      <div>
        <input
          type="number"
          value={inputTime}
          onChange={handleInputChange}
          min="0"
        />
        <button onClick={handleSetTime}>Set Time</button>
      </div> 
      
      <button onClick = {startTimer} disabled = {isRunning}>Start</button>
      <button onClick = {stopTimer} disabled = {!isRunning}>Stop</button>
      <button onClick = {resetTimer}>Reset</button>
    </>
  );
}

export default CounterApp;
