import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Reservation from './pages/Reservation';
import GiftCard from './pages/GiftCard';
import Contact from './pages/Contact';
import ReservationButton from './components/ReservationButton';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Etusivu</NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Palvelut</NavLink>
          </li>
          <li>
            <NavLink to="/reservation" className={({ isActive }) => (isActive ? 'active' : '')}>Ajanvaraus</NavLink>
          </li>
          <li>
            <NavLink to="/giftcard" className={({ isActive }) => (isActive ? 'active' : '')}>Lahjakorti</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>Meistä</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Yhteystiedot</NavLink>
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