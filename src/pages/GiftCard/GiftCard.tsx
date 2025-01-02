import { useEffect } from 'react';
import "./GiftCard.css";

function GiftCard() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js';
    script.onload = () => {
      // @ts-ignore
      iFrameResize({ checkOrigin: false }, '#giftCardIframe34070');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="giftCardContainer">
      <h1>Lahjakortit</h1>
      <p>Anna lahjaksi hyvinvointia! </p>
      <div className="giftCardInfo">
      <iframe
        width="100%"
        frameBorder="0"
        src="https://varaa.timma.fi/giftcard/hierojaikolaelsa"
        id="giftCardIframe34070"
      ></iframe>
      </div>
    </div>
  );
}

export default GiftCard;