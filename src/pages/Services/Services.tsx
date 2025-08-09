import { useState } from "react";
import CancelationPolicy from "../CancelationPolicy/CancelationPolicy";
import './Services.css';
import { NavLink } from "react-router-dom";

function Services() {
  const [activeTab, setActiveTab] = useState<'massage' | 'osteopathic' | 'none'>('none');

  // Toggle logic: clicking the active tab again closes both
  const handleTabClick = (tab: 'massage' | 'osteopathic') => {
    setActiveTab(prev => (prev === tab ? 'none' : tab));
  };

  return (
    <div>
      <div className="TitleServices">
        <h1>Palvelut</h1>
        <p>Tarjolla eri pituisia hieronta-aikoja asiakkaan toiveiden mukaan. Valitsen tekniikat aina asiakkaan tarpeiden ja toiveiden perusteella. </p>
      </div>

      <div className="tab-buttons">
        <button
          className={`tab-btn${activeTab === 'massage' ? ' active' : ''}`}
          onClick={() => handleTabClick('massage')}
        >
          Hieronta
        </button>
        <button
          className={`tab-btn${activeTab === 'osteopathic' ? ' active' : ''}`}
          onClick={() => handleTabClick('osteopathic')}
        >
          Osteopatia
        </button>
      </div>

      <div className="Services">
        {activeTab === 'massage' && (
          <>
            <div className="ClassicalServices">
              <h2>Klassinen hieronta</h2>
              <p>Klassinen hieronta stressin ja jännitysten lievitykseen, sekä hyvinvoinnin työkaluna.</p>
              <ul>
                <li><p>Klassinen hieronta (30 min)</p> <p>40 €</p></li>
                <li><p>Klassinen hieronta (45 min)</p> <p>50 €</p></li>
                <li><p>Klassinen hieronta (60 min)</p> <p>60 €</p></li>
                <li><p>Klassinen hieronta (75 min)</p> <p>70 €</p></li>
                <li><p>Klassinen hieronta (90 min)</p> <p>80 €</p></li>
                <li><p>Klassinen hieronta (120 min)</p> <p>100 €</p></li>
              </ul>
              <NavLink to="/reservation" className="button1">
                Varaa aika!
              </NavLink>
            </div>
            <div className="SportsServices">
              <h2>Urheiluhieronta</h2>
              <p>Urheiluhieronta sopii kaikille aktiivisille ihmisille, kilpaurheilijoista tavalliseen arkiliikkujaan. Vastaanotolla voidaan käyttää liikelaajuuksia parantavia tekniikoita asiakkaan toiveden mukaan.</p>
              <ul>
                <li><p>Urheilu hieronta (30 min)</p> <p>40 €</p></li>
                <li><p>Urheilu hieronta (45 min)</p> <p>50 €</p></li>
                <li><p>Urheilu hieronta (60 min)</p> <p>60 €</p></li>
                <li><p>Urheilu hieronta (75 min)</p> <p>70 €</p></li>
                <li><p>Urheilu hieronta (90 min)</p> <p>80 €</p></li>
                <li><p>Urheilu hieronta (120 min)</p> <p>100 €</p></li>
              </ul>
              <NavLink to="/reservation" className="button2">
                Varaa aika!
              </NavLink>
            </div>
          </>
        )}
        {activeTab === 'osteopathic' && (
          <div className="OsteopathicServices">
            <h2>Osteopatia</h2>
            <p>Osteopatia on kokonaisvaltainen hoitomuoto, joka keskittyy kehon rakenteen ja toiminnan väliseen yhteyteen.</p>
            <ul>
              <li><p>Osteopatia (30 min)</p> <p>40 €</p></li>
              <li><p>Osteopatia (45 min)</p> <p>50 €</p></li>
              <li><p>Osteopatia (60 min)</p> <p>60 €</p></li>
              <li><p>Osteopatia (75 min)</p> <p>70 €</p></li>
              <li><p>Osteopatia (90 min)</p> <p>80 €</p></li>
              <li><p>Osteopatia (120 min)</p> <p>100 €</p></li>
            </ul>
            <NavLink to="/reservation" className="button1">
              Varaa aika!
            </NavLink>
          </div>
        )}
      </div>
      <CancelationPolicy />
    </div>
  );
}

export default Services;