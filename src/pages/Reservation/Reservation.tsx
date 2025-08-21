import { useState, useRef, useEffect } from 'react';
import './Reservation.css';

function Reservation() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIframeLoaded(true);

    if (iframeRef.current) {
      iframeRef.current.style.height = `${window.innerHeight}px`;
      iframeRef.current.style.width = `${window.innerWidth}px`;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight}px`;
        iframeRef.current.style.width = `${window.innerWidth}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="reservation-container">
      <h1>Ajanvaraus</h1>
      <div className="reservation-content-wrapper">
        <div className="reservation-instructions-wrapper">
          <div className="reservation-instructions">
            <p><strong>Ajanvaraus hierontaan</strong></p>
            <ol>
              <li>Valitse palveluksi Hieronta</li>
              <li>Valitse aika</li>
              <li>Valitse työntekijä (Elsa)</li>
              <li>Valitse päivämäärä</li>
            </ol>
          </div>
          <div className="reservation-instructions">
            <p><strong>Ajanvaraus osteopatiaan opiskelijatyönä</strong></p>
            <ol>
              <li>Valitse palveluksi Osteopatia</li>
              <li>Valitse Osteopatia opiskelijatyönä</li>
              <li>Valitse kesto</li>
              <li>Valitse päivämäärä</li>
            </ol>
          </div>
        </div>
        <div className="reservation-box">
          {!iframeLoaded && <p>Ladataan ajanvaraus järjestelmää. Ole hyvä ja odota.</p>}
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src="https://www.varaaheti.fi/hoitokeidas/fi"
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Reservation;