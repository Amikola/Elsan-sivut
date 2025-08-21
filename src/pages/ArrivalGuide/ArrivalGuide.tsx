import "./ArrivalGuide.css"

function ArrivalGuide() {
    return (
      <div>
        <div className="ArrivalContent">
          <h1>Saapumisohjeet</h1>
          <div className="ArrivalText">
            <p>Vastaanotto sijaitsee <strong>Fysiokeitaan</strong> tiloissa.</p><br />
            <p><strong>Osoite:</strong><br />
              Fysiokeidas<br />
              Helsingintie 13, 04400 Järvenpää<br />
              Ajanvaraus puh. 09 271 2966
            </p><br />
            <p>
              Vastaanoton edessä on muutama kahden tunnin kiekkopaikka. Lisäksi Neuvoksenkuja 2 -parkkialueella on lisää kahden tunnin kiekkopaikkoja.
            </p>
          </div>
        </div>
      </div>
    );
}

export default ArrivalGuide;