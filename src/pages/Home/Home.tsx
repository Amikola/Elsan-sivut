import { NavLink } from "react-router-dom";
import { InstagramEmbed } from 'react-social-media-embed';

function Home() {
  return (
    <div>
      <div>
        <h1>Tervetuloa hierontaan.</h1>
        <p>Meiltä saat hierontaa juuri omiin tarpeisiisi, halusit sitten rentoutua, vähentää lihaskipuja, parantaa liikkuvuutta tai palautua nopeammin.</p>
        <NavLink to="/reservation" className="button">Varaa aika!</NavLink>     
        </div>
      <div>
        <img src="src/assets/IMG_0418.PNG" alt="Logo"></img>
      </div>
      <div>
        <h1>Palvelut</h1>
        
        <div>
          <img src="src/assets/IMG_7104.jpg" alt="Kuva"></img>
          <h2>Urheiluhieronta</h2>
          <p>Urheiluhieronta sopii jokaiselle liikkujalle. Oli sitten tavoitteena palautua menneistä harjoituksista tai ylläpitää liikuntakykyä. Käytän tarvittaessa myös erilaisia erikoistekniikoita.</p>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>  
        </div>

        <div>
          <img src="src/assets/IMG_7094.jpg" alt="Kuva"></img>
          <h2>Klassinen hieronta</h2>
          <p>Klassinen hieronta sopii kaikille jotka haluavat rentoutua. Hieronta tutkitusti vähentää stressiä ja rentouttaa, joten se on oiva myös toimistotyöntekijöille.</p>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>  
        </div>
        <blockquote data-instgrm-permalink="https://www.instagram.com/instagram/" data-instgrm-version="12"></blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
    <InstagramEmbed url="https://www.instagram.com/hierojaelsa?igsh=MXBmcjl1bzFmM3ZobA%3D%3D&utm_source=qr" width={800} />
    </div>
      
    </div>
  );
}

export default Home;