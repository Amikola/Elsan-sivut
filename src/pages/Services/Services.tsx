import CancelationPolicy from "../CancelationPolicy/CancellationPolicy";
import './Services.css';
import { NavLink } from "react-router-dom";

function Services() {
  return (
    <div>
      <div className="Title">
      <h1>Palvelut</h1>
      <p>Tarjolla eri pituisia hieronta-aikoja asiakkaan toiveiden mukaan. Valitsen tekniikat aina asiakkaan tarpeiden ja toiveiden perusteella. </p>
      </div>
      <div className="Services"> 
        <div className="Classical">
          <h2>Klassinen hieronta</h2>
          <p>Klassinen hieronta stressin ja jännitysten lievitykseen, sekä hyvinvoinnin työkaluna.</p>
          <ul>
          <li><p>Klassinen hieronta</p> <p>30 €</p></li>
          <li><p>Klassinen hieronta</p> <p>40 €</p></li>
          <li><p>Klassinen hieronta</p> <p>50 €</p></li>
          <li><p>Klassinen hieronta</p> <p>60 €</p></li>
          <li><p>Klassinen hieronta</p> <p>70 €</p></li>
          <li><p>Klassinen hieronta</p> <p>90 €</p></li>
          </ul>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>
        </div>
        <div className="Sports">
        <h2>Urheiluhieronta</h2>
        <p>Urheiluhieronta sopii kaikille aktiivisille ihmisille, kilpaurheilijoista tavalliseen arkiliikkujaan. Vastaanotolla voidaan käyttää liikelaajuuksia parantavia tekniikoita asiakkaan toiveden mukaan.</p>
        <ul>
          <li><p>Urheilu hieronta</p> <p>30 €</p></li>
          <li><p>Urheilu hieronta</p> <p>40 €</p></li>
          <li><p>Urheilu hieronta</p> <p>50 €</p></li>
          <li><p>Urheilu hieronta</p> <p>60 €</p></li>
          <li><p>Urheilu hieronta</p> <p>70 €</p></li>
          <li><p>Urheilu hieronta</p> <p>90 €</p></li>
          </ul>
          <NavLink to="/reservation" className="button">Varaa aika!</NavLink>
        </div>
      </div>
      <CancelationPolicy/>
    </div>
  );
}

export default Services;