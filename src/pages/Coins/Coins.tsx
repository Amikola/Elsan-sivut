import { useEffect, useState } from 'react';
import { API_URL } from '../../../secrets.tsx';
import CoinForm from './CoinForm';
import './Coins.css';

function Coins() {
  const [message, setMessage] = useState('Loading...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);
  const [regMessage, setRegMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!bearerToken) {
      const savedToken = localStorage.getItem('bearerToken');
      if (savedToken) setBearerToken(savedToken);
    }
  }, [bearerToken]);

  useEffect(() => {
    if (!bearerToken) return;

    fetch(`${API_URL}/loginToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.message || JSON.stringify(data));

        if (data.message === 'Bearer token valid') {
          setIsLoggedIn(true);
          setIsAdmin(!!data.admin);
          setLoggedInUsername(data.username || null);
          return;
        }

        setIsLoggedIn(false);
        setIsAdmin(false);
        setBearerToken(null);
        setLoggedInUsername(null);
        localStorage.removeItem('bearerToken');
      })
      .catch(fetchError => setMessage(`Fetch failed: ${String(fetchError)}`));
  }, [bearerToken]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setCreating(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const contentType = response.headers.get('content-type');
      const body = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        setError(typeof body === 'string' ? body : JSON.stringify(body));
        setIsLoggedIn(false);
        setBearerToken(null);
        setLoggedInUsername(null);
        return;
      }

      const authHeader =
        response.headers.get('Authorization') ||
        response.headers.get('authorization');

      if (authHeader) {
        const token = authHeader.replace(/^Bearer\s+/i, '');
        setBearerToken(token);
        localStorage.setItem('bearerToken', token);
      }

      if (typeof body === 'object' && body !== null) {
        setMessage(`Tervetuloa! ${body.message}. Käyttäjä ID: ${body.userId}.`);
        setIsAdmin(!!body.admin);
        setLoggedInUsername(body.username || null);
      }

      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (loginError) {
      setError(String(loginError));
      setIsLoggedIn(false);
      setBearerToken(null);
      setLoggedInUsername(null);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setRegError(null);
    setRegMessage(null);

    try {
      const response = await fetch(`${API_URL}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ username: regUsername, password: regPassword }),
      });

      const body = await response.json();

      if (!response.ok) {
        setRegError(body.error || JSON.stringify(body));
        return;
      }

      setRegMessage(`User created: ${body.message || 'successfully'}`);
      setRegUsername('');
      setRegPassword('');
    } catch (registrationError) {
      setRegError(String(registrationError));
    }
  };

  const handleLogout = () => {
    fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({}),
    }).catch(logoutError => console.error('Logout fetch failed:', logoutError));

    setIsLoggedIn(false);
    setIsAdmin(false);
    setBearerToken(null);
    setLoggedInUsername(null);
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
            <label>
              Käyttäjätunnus
              <input
                type="text"
                value={username}
                onChange={event => setUsername(event.target.value)}
                required
                autoComplete="username"
              />
            </label>
            <label>
              Salasana
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </label>
            <button type="submit" disabled={creating}>
              {creating ? 'Kirjaudu...' : 'Kirjaudu'}
            </button>
            {error && <p className="error">Virhe: {error}</p>}
          </form>
        </section>
      ) : (
        <section className={isAdmin ? 'register-section' : undefined}>
          <div style={{ marginBottom: '1em' }}>
            <strong>Käyttäjä:</strong> {loggedInUsername}
            <br />
            <button onClick={handleLogout} style={{ marginTop: '0.5em' }}>
              Kirjaudu ulos
            </button>
          </div>

          {isAdmin && (
            <>
              <h2>Luo käyttäjä</h2>
              <form onSubmit={handleCreateUser}>
                <label>
                  Käyttäjätunnus
                  <input
                    type="text"
                    value={regUsername}
                    onChange={event => setRegUsername(event.target.value)}
                    required
                    autoComplete="username"
                  />
                </label>
                <label>
                  Salasana
                  <input
                    type="password"
                    value={regPassword}
                    onChange={event => setRegPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </label>
                <button type="submit">Luo käyttäjä</button>
                {regError && <p className="error">Virhe: {regError}</p>}
                {regMessage && <p className="success">{regMessage}</p>}
              </form>
            </>
          )}
        </section>
      )}

      {isLoggedIn && bearerToken && <CoinForm bearerToken={bearerToken} />}
    </div>
  );
}

export default Coins;
