import { useState, useEffect } from 'react';
import API_URL from '../../../secrets.tsx';

import './Coins.css';

declare const process: any;

function Coins() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    

    fetch(API_URL)
      .then(res => res.json())              // parse JSON body
      .then(data => setMessage(data.message || data)) // store in state

  }, []);

  return (
    <div>
      <h1>Coins Page</h1>
      <p>{message}</p> {/* This will display Lambda response */}
    </div>
  );
}

export default Coins;
