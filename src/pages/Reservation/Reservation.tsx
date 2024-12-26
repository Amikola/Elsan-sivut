import { useEffect, useState } from 'react';
import './Reservation.css';

function Reservation() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js';
    script.onload = () => {
      // @ts-ignore
      iFrameResize({ checkOrigin: false }, '#reservationIframe60670');
    };
    document.body.appendChild(script);
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="reservation-container">
      <h1>Ajanvaraus</h1>
      <p>Meillä maksutapana käy kortti, mobilepay sekä erilaiset hyvinvointi edut kuten E-passi, Smartum sekä Edenred.</p>
      {!iframeLoaded && <p>Ladataan ajanvaraus järjestelmää. Ole hyvä ja odota.</p>}
      <iframe
        width="100%"
        frameBorder="0"
        src="https://varaa.timma.fi/reservation/hierojaikolaelsa"
        id="reservationIframe60670"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
}

export default Reservation;