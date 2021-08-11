import React, { useState, useEffect } from 'react';

function TopTime() {
  const [time, setTime] = useState('');

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

    if (hours < 0) hours += 24;

    if (hours < 10) hours = `0${hours}`;
    if (mins < 10) mins = `0${mins}`;

    setTime(`${hours}:${mins}`);
  }
  return <span>{time}</span>;
}

export default TopTime;
