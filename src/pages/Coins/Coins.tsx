// ...existing code...
import { useState, useEffect } from 'react';
import {API_URL, TOKEN} from '../../../secrets.tsx';

import './Coins.css';

declare const process: any;

function Coins() {
  const [message, setMessage] = useState('Loading...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message || JSON.stringify(data)))
      .catch(err => setMessage('Fetch failed: ' + String(err)));
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);

    console.log('Creating user:', username);

    try {
      const res = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, token: TOKEN }),
      });

      const body = await (res.headers.get('content-type')?.includes('json') ? res.json() : res.text());

      if (!res.ok) {
        setError(typeof body === 'string' ? body : JSON.stringify(body));
      } else {
        setMessage('User created: ' + (body.message || JSON.stringify(body)));
        setUsername('');
        setPassword('');
      }
    } catch (err: any) {
      setError(String(err));
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="CoinsPage">
      <h1>Coins Page</h1>

      <section className="api-response">
        <h2>API response</h2>
        <p>{message}</p>
      </section>

      <section className="create-user">
        <h2>Luo käyttäjä</h2>
        <form onSubmit={handleCreateUser}>
          <div>
            <label>
              Käyttäjätunnus
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </label>
          </div>
          <div>
            <label>
              Salasana
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </label>
          </div>
          <div>
            <button type="submit" disabled={creating}>
              {creating ? 'Luo...' : 'Luo käyttäjä'}
            </button>
          </div>
          {error && <p className="error">Virhe: {error}</p>}
        </form>
      </section>
    </div>
  );
}

export default Coins;
