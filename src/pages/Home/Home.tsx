import { NavLink } from "react-router-dom";
import {InstagramEmbed } from 'react-social-media-embed';
import './Home.css';
import { useMediaQuery } from 'react-responsive';

function Home() {

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  return (
    <div>
      <div className="TitleHome">
        <div className="Text">
        <h1>Tervetuloa hierontaan.</h1>
        <p>Meiltä saat hierontaa juuri omiin tarpeisiisi, halusit sitten rentoutua, vähentää lihaskipuja, parantaa liikkuvuutta tai palautua nopeammin.</p>
        <NavLink to="/reservation" className="button">Varaa aika!</NavLink>
        </div>
        <img src="src/assets/IMG_0418.PNG" alt="Logo"></img>
        </div>
      <div className="Services">
        <h1>Palvelut</h1>
        
        <div className="Sports">
          <img src="src/assets/IMG_7104.jpg" alt="Kuva"></img>
          <h2>Urheiluhieronta</h2>
          <p>Urheiluhieronta sopii jokaiselle liikkujalle. Oli sitten tavoitteena palautua menneistä harjoituksista tai ylläpitää liikuntakykyä. Käytän tarvittaessa myös erilaisia erikoistekniikoita.</p>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>  
        </div>

        <div className="Classic">
          <img src="src/assets/IMG_7094.jpg" alt="Kuva"></img>
          <h2>Klassinen hieronta</h2>
          <p>Klassinen hieronta sopii kaikille jotka haluavat rentoutua. Hieronta tutkitusti vähentää stressiä ja rentouttaa, joten se on oiva myös toimistotyöntekijöille.</p>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>  
        </div>
      </div>
      <div className="Socials">
      <h1>Seuraa meitä</h1>
      <p>Facebookissa ja Instagramissa!</p>
      <InstagramEmbed 
      url="https://www.instagram.com/hierojaelsa?igsh=MXBmcjl1bzFmM3ZobA%3D%3D&utm_source=qr" 
      width={isMobile ? 400 : 800}/>
    <div className="Links">
    <a href="https://www.facebook.com/profile.php?id=61565476470926"> Facebook</a>
    <a href="https://www.facebook.com/profile.php?id=61565476470926"> Instagram</a>
    </div>
    </div>
      
    </div>
  );
}

export default Home;