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
        <p>Tarjolla eri pituisia hieronta -ja osteopatia-aikoja asiakkaan toiveiden mukaan. Valitsen tekniikat aina asiakkaan tarpeiden ja toiveiden perusteella. </p>
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
                <li><p>Hieronta 30 min</p> <p>37 €</p></li>
                <li><p>Hieronta 45 min</p> <p>52 €</p></li>
                <li><p>Hieronta 60 min</p> <p>67 €</p></li>
                <li><p>Lisäaika +15 min</p> <p>15 €</p></li>
              </ul>
              <NavLink to="/reservation" className="button1">
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
              <li><p>Osteopatia (45 min)</p> <p>52 €</p></li>
              <li><p>Osteopatia (60 min)</p> <p>67 €</p></li>
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