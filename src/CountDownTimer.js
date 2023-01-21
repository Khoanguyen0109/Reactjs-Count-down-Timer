import React, { useEffect, useRef, useState } from 'react';
import './countdown.css';
// const defaultRemainingTime = {
//   days: '00',
//   hours: '00',
//   minutes: '00',
//   seconds: '00',
// };
function CountDownTimer() {
  const [remainingTime, setRemainingTime] = useState(0);
  const [pause, setPause] = useState(true);
  const tick = useRef();
  const firstStart = useRef(true);
  const onChange = (e, type) => {
    if (e.target.value === '') {
      return;
    }
    let time = remainingTime;
    switch (type) {
      case 'days':
        time +=
          (parseInt(e.target.value) -
            Math.floor(remainingTime / (1000 * 60 * 60 * 24))) *
          1000 *
          60 *
          60 *
          24;
        break;
      case 'hours':
        time +=
          (parseInt(e.target.value) -
            Math.floor(
              (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )) *
          1000 *
          60 *
          60;
        break;
      case 'minutes':
        time +=
          (parseInt(e.target.value) -
            Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))) *
          1000 *
          60;
        break;
      case 'seconds':
        time +=
          (parseInt(e.target.value) -
            Math.floor((remainingTime % (1000 * 60)) / 1000)) *
          1000;

        break;
      default:
        break;
    }
    return setRemainingTime(time);
  };

  useEffect(() => {
    if (firstStart.current) {
      console.log("first render, don't run useEffect for timer");
      firstStart.current = !firstStart.current;
      return;
    }
    if (!pause) {
      tick.current = setInterval(() => {
        setRemainingTime((preState) => preState - 1000);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current);
  }, [pause]);

  useEffect(() => {
    if (remainingTime <= 0) {
      setRemainingTime(0);
      setPause(true)
    }
  }, [remainingTime]);

  const onPause = () => {
    setPause((preState) => !preState);
  };
  const onReset = () => {
    setRemainingTime(0);
    firstStart.current = true;
    tick.current = null
  };
  var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  return (
    <div>
      <div>
        <label for='days'>Days</label>
        <input type='number' id='days' onChange={(e) => onChange(e, 'days')} />
        <label for='hours'>Hours</label>
        <input
          type='number'
          id='hours'
          onChange={(e) => onChange(e, 'hours')}
        />
        <label for='minutes'>Minutes</label>
        <input
          type='number'
          id='minutes'
          onChange={(e) => onChange(e, 'minutes')}
        />
        <label for='seconds'>Seconds</label>
        <input
          type='number'
          id='seconds'
          onChange={(e) => onChange(e, 'seconds')}
        />
      </div>
      <div className='countdown-timer'>
        <span>{days}</span>
        <span>days</span>
        <span className='two-numbers'>{hours}</span>
        <span>hours</span>
        <span className='two-numbers'>{minutes}</span>
        <span>minutes</span>
        <span className='two-numbers'>{seconds}</span>
        <span>seconds</span>
      </div>
      <br />
      <div>
        <button onClick={onPause}>{!pause ? 'Pause' : tick.current?'continue' :'Start'}</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

export default CountDownTimer;
