import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <div className="title">
        <h1>Yhteystiedot</h1>
        <p>Jäikö vielä jokin mietityttämään. Ota minuun yhteyttä sähköpostilla tai puhelimitse!</p>
      </div>
      <div className="contact-data">
        <h2>Hieroja Ikola Elsa</h2>
        <div className="elsa-data">
          <p>Hieroja Ikola Elsa</p>
          <a href='https://maps.app.goo.gl/kGA14droDJYtDrh1A'>Helsingintie 13, 04400 Järvenpää</a>
          <p>tmi.ikolaelsa@gmail.com</p>
          <p>0452684099</p>
        </div>
        <div className="dev-data">
          <h2>Developer of the website</h2>
          <p>Atte Ikola</p>
          <p>Atte.ikola@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;