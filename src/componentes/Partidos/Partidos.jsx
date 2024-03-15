import React, { useState, useEffect } from "react";
import PartidoCard from "./PartidoCard";

export default function Partidos() {
  const [matchsDay, setMatchsDay] = useState([]);
  const apiKey = "b3fcd6725e03f4e5d588f6624cac5522";

  const matchDayUrl = `https://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&format=json&req=matchsday`;

  const urlLogoCompe = (id) => {
    return (
      "https://t.resfu.com/img_data/competiciones/logo/" +
      id +
      ".png?size=120x&lossy=1&v=28"
    );
  };

  const renderCompetitionHeader = (competitionMatch) => {
    return (
      <div className="row justify-content-center align-items-center mb-4 bgHeaderPartidos py-3">
        <div className="col-3 text-center">
          <img
            src={urlLogoCompe(competitionMatch.matches[0].category_id)}
            alt=""
          />
        </div>
        <h3 className="col-3 text-white text-center">
          {competitionMatch.competition}
        </h3>
        <div className="col-3 text-center">
          <img src={competitionMatch.matches[0].cflag} alt="" />
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.matches);
      //creamo array de partidos por competicion
      const matchesByCompetition = {};
      //con el for iteramos sobre el data matches
      //comprobamos si esa competicion ya esta en el array
      //si ya eata añladimos el aprtido sino creamos la competicion
      for (const match of data.matches) {
        if (!matchesByCompetition[match.competition_name]) {
          matchesByCompetition[match.competition_name] = [];
        }
        matchesByCompetition[match.competition_name].push(match);
      }
      //convierte los partidos por competicion en un array con clave valor
      //donde la clave es la competicion y el valor los partidos de la competicion

      //Object es para convertirl9o en objeto valor
      //Entries para cada objeto de entrada genera un array con dos elementos, clave y valor

      const competitionMatches = Object.entries(matchesByCompetition).map(
        ([competition, matches]) => ({ competition, matches })
      );
      console.log(competitionMatches);
      setMatchsDay(competitionMatches);
    };
    fetchData(matchDayUrl);
  }, [apiKey]);
  return (
    <>
      <div className="contenedor">
        <h3 className="kanit m-5 text-white text-center">PARTIDOS DEL DÍA</h3>
        {matchsDay.map((competitionMatch) => (
          <>
            <div key={Math.random * competitionMatch.id}>
              {renderCompetitionHeader(competitionMatch)}
              <div
                key={Math.random * competitionMatch.id}
                className="row align-items-center justify-content-between gx-0"
              >
                {competitionMatch.matches.map((partido) => (
                  <PartidoCard key={partido.id} partido={partido} />
                ))}
              </div>
              <button
                className="btn btn-secondary btn-floating btn-lg scroll"
                onClick={() => window.scrollTo({ top: 0 })}
              >
                ↑
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
