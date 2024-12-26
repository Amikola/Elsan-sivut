import { useEffect } from 'react';

function Reservation() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js';
    script.onload = () => {
      // @ts-ignore
      iFrameResize({ checkOrigin: false }, '#reservationIframe60670');
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <iframe
        width="100%"
        frameBorder="0"
        src="https://varaa.timma.fi/reservation/hierojaikolaelsa"
        id="reservationIframe60670"
      ></iframe>
    </div>
  );
}

export default Reservation;