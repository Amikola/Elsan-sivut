import { useState, useEffect } from 'react';
import { API_URL } from '../../../secrets.tsx';
import './Coins.css';

declare const process: any;

function Coins() {
  const [message, setMessage] = useState('Loading...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Add a state for the logged-in username
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!bearerToken) {
      const saved = localStorage.getItem('bearerToken');
      if (saved) setBearerToken(saved);
    }
  }, []);

  useEffect(() => {
    if (bearerToken) {
      fetch(`${API_URL}/loginToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {})
        },
        body: JSON.stringify({}),
      })
        .then(res => res.json())
        .then(data => {
          setMessage(data.message || JSON.stringify(data));
          if (data.message === "Bearer token valid") {
            setIsLoggedIn(true);
            setIsAdmin(data.admin);
            setLoggedInUsername(data.username || null);
            
          } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setBearerToken(null);
            setLoggedInUsername(null);
            localStorage.removeItem('bearerToken');
          }
        })
        .catch(err => setMessage('Fetch failed: ' + String(err)));
    }
  }, [bearerToken]);

  // Also set username after login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let body: any;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
        try {
          body = JSON.parse(body);
        } catch {
          // body remains as text
        }
      }

      if (!res.ok) {
        setError(typeof body === 'string' ? body : JSON.stringify(body));
        setIsLoggedIn(false);
        setBearerToken(null);
        setLoggedInUsername(null);
      } else if (typeof body === 'object' && body !== null) {
        setMessage(`Tervetuloa! ${body.message}. Käyttäjä ID: ${body.userId}.`);
        // Get token from Authorization header
        console.log('Response headers:', res.headers);
        const authHeader = res.headers.get('Authorization') || res.headers.get('authorization');
        if (authHeader) {
          const token = authHeader.replace('Bearer ', '');
          setBearerToken(token);
          localStorage.setItem('bearerToken', token);
        } else {
          setBearerToken(null);
          localStorage.removeItem('bearerToken');
        }
        setIsLoggedIn(true);
        setIsAdmin(!!body.admin);
        setLoggedInUsername(body.username || null);
        setError(null);
        setUsername('');
        setPassword('');
      } else {
        setMessage('Kirjautuminen onnistui, mutta vastaus oli odottamaton: ' + String(body));
        setIsLoggedIn(true);
        setLoggedInUsername(null);
        setError(null);
        setUsername('');
        setPassword('');
      }
    } catch (err: any) {
      setError(String(err));
      setIsLoggedIn(false);
      setBearerToken(null);
      setLoggedInUsername(null);
    } finally {
      setCreating(false);
    }
  };

  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regMessage, setRegMessage] = useState<string | null>(null);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    try {
      const res = await fetch(`${API_URL}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {})
        },
        body: JSON.stringify({ username: regUsername, password: regPassword }),
      });

      const body = await (res.headers.get('content-type')?.includes('json') ? res.json() : res.text());

      if (!res.ok) {
        setRegError(typeof body === 'string' ? body : JSON.stringify(body));
        setRegMessage(null);
      } else {
        setRegMessage('User created: ' + (body.message || JSON.stringify(body)));
        setRegUsername('');
        setRegPassword('');
        setRegError(null);
      }
    } catch (err: any) {
      setRegError(String(err));
      setRegMessage(null);
    }
  };

  const handleLogout = () => {

    fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bearerToken ? { 'Authorization': `Bearer ${bearerToken}` } : {})
      },
      body: JSON.stringify({}),
    }).catch(err => console.error('Logout fetch failed:', err));

    setIsLoggedIn(false);
    setBearerToken(null);
    localStorage.removeItem('bearerToken');
    setMessage('Kirjauduttu ulos.');
  };

  return (
    <div className="CoinsPage">
      <h1>Coins Page</h1>

      <section className="api-response">
        <h2>API response</h2>
        <p>{message}</p>
      </section>

      {!isLoggedIn ? (
        <section className="login-section">
          <h2>Kirjaudu sisään</h2>
          <form onSubmit={handleLogin}>
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
                  autoComplete="current-password"
                />
              </label>
            </div>
            <div>
              <button type="submit" disabled={creating}>
                {creating ? 'Kirjaudu...' : 'Kirjaudu'}
              </button>
            </div>
            {error && <p className="error">Virhe: {error}</p>}
          </form>
        </section>
      ) : isAdmin ? (
        <section className="register-section">
          <div style={{ marginBottom: '1em' }}>
            <strong>Käyttäjä:</strong> {loggedInUsername}
            <br />
            <button onClick={handleLogout} style={{ marginTop: '0.5em' }}>
              Kirjaudu ulos
            </button>
          </div>
          <h2>Luo käyttäjä</h2>
          <form onSubmit={handleCreateUser}>
            <div>
              <label>
                Käyttäjätunnus
                <input
                  type="text"
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value)}
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
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </label>
            </div>
            <div>
              <button type="submit">
                Luo käyttäjä
              </button>
            </div>
            {regError && <p className="error">Virhe: {regError}</p>}
            {regMessage && <p className="success">{regMessage}</p>}
          </form>
        </section>
      ) : (
        <section>
          <div style={{ marginBottom: '1em' }}>
            <strong>Käyttäjä:</strong> {loggedInUsername}
            <br />
            <button onClick={handleLogout} style={{ marginTop: '0.5em' }}>
              Kirjaudu ulos
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Coins;


