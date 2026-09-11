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

  const [coin, setCoin] = useState({
    country: '',
    coinName: '',
    denomination: '',
    currency: '',
    year: '',
    quantity: '1',
    comments: '',
  });

  const [coinMessage, setCoinMessage] = useState<string | null>(null);
  const [coinError, setCoinError] = useState<string | null>(null);
  const [savingCoin, setSavingCoin] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreateCoin = async (event: React.FormEvent) => {
    event.preventDefault();
    setCoinMessage(null);
    setCoinError(null);
    setSavingCoin(true);

    try {
      const imageBase64 = imageFile
        ? await fileToBase64(imageFile)
        : null;

      const response = await fetch(`${API_URL}/createCoin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          ...coin,
          year: Number(coin.year),
          quantity: Number(coin.quantity),
          imageBase64,
          imageType: imageFile?.type ?? null,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || 'Coin creation failed');
      }

      setCoinMessage(`Coin created: ${body.coinId}`);
      setCoin({
        country: '',
        coinName: '',
        denomination: '',
        currency: '',
        year: '',
        quantity: '1',
        comments: '',
      });
    } catch (error) {
      setCoinError(error instanceof Error ? error.message : 'Request failed');
    } finally {
      setSavingCoin(false);
    }
  };

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = String(reader.result);
        resolve(result.split(',')[1] ?? '');
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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
      {isLoggedIn && (
        <section className="coin-form-section">
          <h2>Add coin</h2>

          <form onSubmit={handleCreateCoin}>
            <label>
              Country
              <input
                value={coin.country}
                onChange={event =>
                  setCoin({ ...coin, country: event.target.value })
                }
                required
              />
            </label>

            <label>
              Coin name
              <input
                value={coin.coinName}
                onChange={event =>
                  setCoin({ ...coin, coinName: event.target.value })
                }
                required
              />
            </label>

            <label>
              Denomination
              <input
                value={coin.denomination}
                onChange={event =>
                  setCoin({ ...coin, denomination: event.target.value })
                }
                required
              />
            </label>

            <label>
              Currency
              <input
                value={coin.currency}
                onChange={event =>
                  setCoin({ ...coin, currency: event.target.value })
                }
                required
              />
            </label>

            <label>
              Year
              <input
                type="number"
                min="1"
                value={coin.year}
                onChange={event =>
                  setCoin({ ...coin, year: event.target.value })
                }
                required
              />
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                value={coin.quantity}
                onChange={event =>
                  setCoin({ ...coin, quantity: event.target.value })
                }
                required
              />
            </label>

            <label>
              Comments
              <textarea
                value={coin.comments}
                onChange={event =>
                  setCoin({ ...coin, comments: event.target.value })
                }
              />
            </label>

            <label>
              Coin image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={event => {
                  setImageFile(event.target.files?.[0] ?? null);
                }}
              />
            </label>

            <button type="submit" disabled={savingCoin}>
              {savingCoin ? 'Saving...' : 'Add coin'}
            </button>

            {coinMessage && <p className="success">{coinMessage}</p>}
            {coinError && <p className="error">{coinError}</p>}
          </form>
        </section>
      )}
    </div>
  );
}

export default Coins;


