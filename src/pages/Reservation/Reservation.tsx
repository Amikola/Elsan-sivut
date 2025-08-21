import { useState, useRef, useEffect } from 'react';
import './Reservation.css';

function Reservation() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    setIframeLoaded(true);

    // Set iframe height and width to 100% of the viewport
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
      <p>Meillä maksutapana käy kortti, mobilepay sekä erilaiset hyvinvointi edut kuten E-passi, Smartum sekä Edenred.</p>
      <div className="reservation-box">
        {!iframeLoaded && <p>Ladataan ajanvaraus järjestelmää. Ole hyvä ja odota.</p>}
        <iframe
          ref={iframeRef}
          width="50%"
          height="100%"
          src="https://www.varaaheti.fi/hoitokeidas/fi"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
}

export default Reservation;