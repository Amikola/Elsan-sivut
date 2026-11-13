
import './Reservation.css';

function Reservation() {
  return (
    <div className="reservation-container">
      <h1>Ajanvaraus</h1>
      <p>Varaus tapahtuu Nordhealtin sivuilla</p>
      <a
        href="https://www.nordhealth.fi/fi/koulutettu-hieroja/jarvenpaa/elsa-ikola?clinic=jarvenpaan-fysikaalinen-hoitokeidas"
        className="button"
        target="_blank"
        rel="noopener noreferrer"
      >
        Varaa aika!
      </a>
    </div>
  );
}

export default Reservation;
