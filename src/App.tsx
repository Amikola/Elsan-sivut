import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import GiftCard from './pages/GiftCard';
import Contact from './pages/Contact';
import ReservationButton from './components/ReservationButton';
import './App.css'; // Default to desktop CSS

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  useEffect(() => {
    if (isMobile) {
      import('./Mobile.css');
    } else {
      import('./App.css');
    }
  }, [isMobile]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Router>
      <nav className={`navbar ${menuOpen ? 'expanded' : ''}`}>
        {isMobile && (
          <div className="menu-toggle" onClick={toggleMenu}>
            &#9776; {/* Unicode character for hamburger menu */}
          </div>
        )}
        <img src="src/assets/IMG_0418.PNG" alt="Logo" className="navbar-image" />
        <ul className={isMobile && menuOpen ? 'show' : ''}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Etusivu</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Palvelut</NavLink>
          </li>
          <li>
            <NavLink to="/reservation" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Ajanvaraus</NavLink>
          </li>
          <li>
            <NavLink to="/giftcard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Lahjakorti</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Meistä</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Yhteystiedot</NavLink>
          </li>
        </ul>
        <ReservationButton />
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/giftcard" element={<GiftCard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;