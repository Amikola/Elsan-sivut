import { NavLink } from 'react-router-dom';
import './ReservationButton.css';

const ReservationButton = () => {
  return (
    <NavLink to="https://www.nordhealth.fi/fi/koulutettu-hieroja/jarvenpaa/elsa-ikola?clinic=jarvenpaan-fysikaalinen-hoitokeidas" className="reservation-button">
      Varaa aika!
    </NavLink>
  );
};

export default ReservationButton;