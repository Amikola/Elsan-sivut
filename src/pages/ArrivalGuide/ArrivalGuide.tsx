import "./ArrivalGuide.css"

function ArrivalGuide() {
    return (
      <div>
        <div className="ArrivalContent">
        <h1>Saapumisohjeet</h1>
        <div className="ArrivalText">
        <p>Vastaanotto sijaitsee osoitteessa </p> <a href="https://www.google.com/maps?q=Arolantie+1+As+57+P%C3%B6yt%C3%A4alho,+04410+J%C3%A4rvenp%C3%A4%C3%A4"> Arolantie 1, 04410 Järvenpää.</a> 
        <p> Ovi sijaitsee Kartanonpolun puolella. Odotathan ulkona niin tulen avaamaan oven muutamaa minuuttia ennen aikaasi.</p>
        </div>
        <p className="ParkingText">Autolla 🚗 tultaessa voit pysäköidä tienvarteen Arolantielle, Kartanontielle tai Kartanonpolulle. </p>
        </div>

        <div className="ArrivalImages">
        <img src="assets/ReittiElsa.png"></img>
        <img src="assets/ElsaOvi.png"></img>
        </div>
      </div>
    );
  }
  
  export default ArrivalGuide;