import { useState, useEffect, useRef } from 'react';

const SessionTimer = () => {
  const [minutes, setMinutes] = useState(50);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return; // if timer is already running, do nothing
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          setMinutes(prevMinutes => prevMinutes !== 0 ? prevMinutes - 1 : 25);
          return 59;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalRef.current === null) return; // if timer is not running, do nothing
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMinutes(50);
    setSeconds(0);
  };

  useEffect(() => {
    return () => { // cleanup function to clear interval on component unmount
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="timer">
      <div className='timer-tools'>
        <button className='start-timer' onClick={startTimer} disabled={isRunning}>
        </button>
        <button className='stop-timer' onClick={stopTimer} disabled={!isRunning}>
        </button>
        <button className='reset-timer' onClick={resetTimer}>
        </button>
      </div>
      <div className="clock">
        <p>{timerMinutes}:{timerSeconds}</p>
      </div>
    </div>
  );
};

export default SessionTimer;