import React, { useState, useEffect } from 'react';

function TopTime() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    setInterval(getTime, 1000);
    return () => {
      setInterval(getTime, 1000);
    };
  }, []);

  function getTime() {
    let fixDate = new Date().setHours(7, 0, 0);
    let currDate = new Date();

    const diff = fixDate - currDate;
    let hours = Math.floor(diff / (60 * 60 * 1000));
    let mins = Math.floor((diff - hours * 60 * 60 * 1000) / (60 * 1000));
    let secs = Math.floor(
      (diff - hours * 60 * 60 * 1000 - mins * 60 * 1000) / 1000,
    );

    if (hours < 0) hours += 24;

    if (hours < 10) hours = `0${hours}`;
    if (mins < 10) mins = `0${mins}`;
    if (secs < 10) secs = `0${secs}`;

    setTime(`${hours}:${mins}:${secs}`);
  }
  return <span>{time}</span>;
}

export default TopTime;
