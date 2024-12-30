import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">Kuka on Elsa Ikola?</h1>
      <p className="about-description">Koulutettu Hieroja || Osteopaattiopiskelija || Ringettevalmentaja || Ringette maalivahti Sm-sarja</p>
      <div className="about-box">
        <div className="about-image-container">
          <img src="src/assets/IMG_7094.jpg" alt="Elsa Ikola" className="about-image" />
        </div>
        <div className="about-text-container">
          <h2 className="about-subtitle">Elsa Ikola</h2>
          <p className="about-text">Koulutettu hieroja</p>
          <p className="about-text">Kiinnostuksen kohteenani ovat erilaiset kiputilat ja niiden hoito sekä liikuntakyvyn ylläpito ja kehittäminen. Vapaa-aikani pyrin pyhittämään ystäville, läheisille ja rentoutumiselle.</p>
          <a href="https://www.instagram.com/ikolaelsa/?igsh=YXN1Zmcyb2Q0aGF0&utm_source=qr" className="about-link">
            <img src="src/assets/Instagram-logo.png" alt="Instagram" className="instagram-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;