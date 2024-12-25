import { NavLink } from 'react-router-dom';
import './ReservationButton.css';

const ReservationButton = () => {
  return (
    <NavLink to="/reservation" className="reservation-button">
      Varaa aika!
    </NavLink>
  );
};

export default ReservationButton;