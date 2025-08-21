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
            <div className="OsteopathicFlow">
              <h3>Vastaanoton kulku:</h3>
              <p>
                Hoito aloitetaan perusteellisella alkuhaastattelulla, jossa käydään läpi tulosyy ja terveyshistoria siltä osin kuin se on oleellista nykytilanteeseen. Haastattelun jälkeen tehdään kliininen tutkimus, johon kuuluu aina voimien ja liikeratojen mittaaminen, hermoston toiminnan tutkiminen sekä alueen palpaatio.
              </p>
              <p>
                Tutkimisen jälkeen alkaa hoito. Hoitomuoto valitaan haastattelun ja tutkimusten perusteella. Käytän hoitomuotoina erilaisia manuaalisen terapian tekniikoita (hieronta, mobilisaatio jne.) sekä vahvistavia harjoitteita. Vastaanotolla käydään myös läpi mahdolliset koti-ohjeet ja jatkosuunnitelma.
              </p>
              <p>
                Vastaanotto on aina ihmistä varten ja hoito perustuu kokonaisvaltaiseen hyvinvointiin. Asiakkaan ohjaus on tärkeä osa vastaanottoaikaa. Sen tavoitteena on lisätä ymmärrystä oireesta, sen syistä sekä taustatekijöistä, jotka vaikuttavat oireen kokemiseen. Älä siis epäröi kysyä, jos jokin jää epäselväksi.
              </p> <br />
              <h3>Osteopaatin vastaanotolle kannattaa tulla, jos sinulla on:</h3>
              <ul>
                <li>• Akuutti tai krooninen kipu</li>
                <li>• Liikunta- tai rasitusvamma (esim. juoksijan polvi, nilkan nyrjähdys)</li>
                <li>• Nivelkipuja</li>
                <li>• Jäykkyyttä nivelissä tai kireyttä kehossa</li>
                <li>• Hermo-oireita (Esim. sormien puutumista, pistelyä tai tunnon muutoksia)</li>
                <li>• Leikkauksen jälkeinen tai ennen tapahtuva kuntoutus</li>
                <li>• Muu ilman leikkausta hoidettavissa oleva TULE-vaiva</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <CancelationPolicy />
    </div>
  );
}

export default Services;