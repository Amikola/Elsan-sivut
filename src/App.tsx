import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Reservation from './pages/Reservation/Reservation';
import GiftCard from './pages/GiftCard/GiftCard';
import Contact from './pages/Contact/Contact';
import CancelationPolicy from './pages/CancelationPolicy/CancelationPolicy';
import ReservationButton from './components/ReservationButton';
import ArrivalGuide from './pages/ArrivalGuide/ArrivalGuide';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 810px)' });

  useEffect(() => {
    if (isMobile) {
      console.log('Loading Mobile.css');
      import('./Mobile.css');
    } else {
      console.log('Loading App.css');
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
        <a href="/">
          <img src="assets/IMG_0418.PNG" alt="Logo" className="navbar-image" />
        </a>
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
            <NavLink to="/arrivalguide" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Saapumisohjeet</NavLink>
          </li>
          <li>
            <NavLink to="/giftcard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Lahjakortti</NavLink>
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
          <Route path="/cancelationpolicy" element={<CancelationPolicy />} />
          <Route path="/arrivalguide" element={<ArrivalGuide />} />
        </Routes>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-text">
          <NavLink to="/"><img src="assets/IMG_0418.PNG" alt="Logo" className="bottom-bar-image" /></NavLink>
          <p>Hieroja Ikola Elsa</p>
          <a href='https://www.google.com/maps?q=Arolantie+1+As+57+P%C3%B6yt%C3%A4alho,+04410+J%C3%A4rvenp%C3%A4%C3%A4'>Arolantie 1 As 57 Pöytäalho, 04410 Järvenpää</a>
          <p>tmi.ikolaelsa@gmail.com</p>
          <p>0452684099</p>
        </div>
        <div className='bottom-bar-links'>
          <NavLink to="/cancelationpolicy" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>Peruutusehdot</NavLink>
          <a href="https://varaa.timma.fi/dataprotection/hierojaikolaelsa" target="_blank" rel="noopener noreferrer">Tietosuoja</a>
        </div>
      </div>
    </Router>
  );
}

export default App;