/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Partido() {
  const { state } = useLocation();
  const partido = state.partido;
  console.log(partido);
  //lista de partidos por competiciones
  //lista de partidos por competiciones
  const [ultPartidos1, setUltPartidos1] = useState([]);
  //5 ultimos aprtidos sin importar la competicion
  //5 ultimos aprtidos sin importar la competicion
  const [ultimos5Partidos1, setUltimos5Partidos1] = useState([]);
  const [ultPartidos2, setUltPartidos2] = useState([]);
  const [ultimos5Partidos2, setUltimos5Partidos2] = useState([]);
  const setResult = (partido) => {
    if (partido.result === "x-x") {
      return (
        <>
          <h3 className="bg-naranja w-25 text-center">{partido.hour}</h3>
          <h3 className="bg-naranja w-25 text-center">:</h3>
          <h3 className="bg-naranja w-25 text-center">{partido.minute} </h3>
        </>
      );
    } else {
      const cadena = partido.result;
      const marcador = cadena.match(/\d+/g);
      return (
        <>
          <h3 className="bg-naranja w-25 text-center">{marcador[0]}</h3>
          <h3 className="bg-naranja w-25 text-center">-</h3>
          <h3 className="bg-naranja w-25 text-center">{marcador[1]}</h3>
        </>
      );
    }
  };
  const setResultResumen = (match, locVisMain) => {
    let marcador = match.result.match(/\d+/g);
    switch (locVisMain) {
      case "local":
        return (
          <>
            <h3
              className={`bg-azul w-50 text-center text-white ${
                match.t2_name === partido.local ? "text-opacity-50" : ""
              }`}
            >
              {marcador[0]}
            </h3>
            <h3 className="w-25 text-center">-</h3>
            <h3
              className={`bg-azul w-50 text-center text-white ${
                match.t1_name === partido.local ? "text-opacity-50" : ""
              }`}
            >
              {marcador[1]}
            </h3>
          </>
        );
      case "visitante":
        return (
          <>
            <h3
              className={`bg-azul w-50 text-center text-white ${
                match.t2_name === partido.visitor ? "text-opacity-50" : ""
              }`}
            >
              {marcador && marcador[0]}
            </h3>
            <h3 className="w-25 text-center">-</h3>
            <h3
              className={`bg-azul w-50 text-center text-white ${
                match.t1_name === partido.visitor ? "text-opacity-50" : ""
              }`}
            >
              {marcador && marcador[1]}
            </h3>
          </>
        );

      default:
        break;
    }
  };
  const urlEscudo = (id) => {
    return (
      "https://t.resfu.com/img_data/equipos/" +
      id +
      ".png?size=150x&ext=png&lossy=1&12"
    );
  };
  const urlLogoCompe = (id) => {
    return (
      "https://t.resfu.com/img_data/competiciones/logo/" +
      id +
      ".png?size=60x&lossy=1&v=28"
    );
  };
  const urlHistorial = (id) => {
    return (
      "https://apiclient.besoccerapps.com/scripts/api/api.php?key=b3fcd6725e03f4e5d588f6624cac5522&format=json&req=matches_team&id=" +
      id
    );
  };
  const setEstilo = (match, locVis, locVisMain) => {
    switch (locVisMain) {
      case "local":
        switch (locVis) {
          case "local":
            if (match.t1_name === partido.local) {
              if (match.r1 > match.r2) {
                return "border-win";
              } else if (match.r1 === match.r2) {
                return "border-draft";
              } else {
                return "border-lose";
              }
            }
            break;
          case "visitante":
            if (match.t2_name === partido.local) {
              if (match.r2 > match.r1) {
                return "border-win";
              } else if (match.r2 === match.r1) {
                return "border-draft";
              } else {
                return "border-lose";
              }
            }
            break;
          default:
            break;
        }
        break;
      case "visitante":
        switch (locVis) {
          case "local":
            if (match.t1_name === partido.visitor) {
              if (match.r1 > match.r2) {
                return "border-win";
              } else if (match.r1 === match.r2) {
                return "border-draft";
              } else {
                return "border-lose";
              }
            }
            break;
          case "visitante":
            if (match.t2_name === partido.visitor) {
              if (match.r2 > match.r1) {
                return "border-win";
              } else if (match.r2 === match.r1) {
                return "border-draft";
              } else {
                return "border-lose";
              }
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };
  const getLogoCompe = (match, locVis) => {
    let compe = null;
    switch (locVis) {
      case 1:
        compe = ultPartidos1.find((comp) => comp.league_id === match.league_id);
        return compe ? urlLogoCompe(compe.id) : urlLogoCompe(1);
      case 2:
        compe = ultPartidos2.find((comp) => comp.league_id === match.league_id);
        return compe ? urlLogoCompe(compe.id) : urlLogoCompe(1);
      default:
        break;
    }
  };
  const getPosiCompe = (partido) => {
    const compe1 = ultPartidos1.find(
      (comp) => comp.league_id === partido.league_id
    );
    const compe2 = ultPartidos2.find(
      (comp) => comp.league_id === partido.league_id
    );
    return (
      compe1 &&
      compe1.position_table &&
      compe2 &&
      compe2.position_table && (
        <>
          <div className="d-flex bg-naranja w-100 text-center h3 align-items-center py-2">
            <span className="col">{compe1.position_table}º</span>
            <img className="col-4" src={urlLogoCompe(compe1.id)} alt="" />
            <span className="col">{compe2.position_table}º</span>
          </div>
        </>
      )
    );
  };
  useEffect(() => {
    const fetchData = async (url, idEquipo) => {
      const response = await fetch(url);
      const data = await response.json();
      const fechaActual = Date.now();
      if (idEquipo === 1) {
        setUltPartidos1(data.matches);
        const partidosPlanos = ultPartidos1.flatMap(
          (competicion) => competicion.matches
        );
        const partidosFiltrados = partidosPlanos.filter(
          (partido) => partido.status === 1
        );
        const partidosOrdenados = partidosFiltrados.sort((a, b) => {
          b = Date.parse(b.shedule);
          a = Date.parse(a.shedule);
          return b - a;
        });
        const ultimos5Partidos = partidosOrdenados.slice(0, 5);
        setUltimos5Partidos1(ultimos5Partidos);
      } else {
        setUltPartidos2(data.matches);
        const partidosPlanos = ultPartidos2.flatMap(
          (competicion) => competicion.matches
        );
        const partidosFiltrados = partidosPlanos.filter(
          (partido) => partido.status === 1
        );
        const partidosOrdenados = partidosFiltrados.sort((a, b) => {
          b = Date.parse(b.shedule);
          a = Date.parse(a.shedule);
          return b - a;
        });
        const ultimos5Partidos = partidosOrdenados.slice(0, 5);
        setUltimos5Partidos2(ultimos5Partidos);
      }
    };
    fetchData(urlHistorial(partido.dteam1), 1);
    fetchData(urlHistorial(partido.dteam2), 2);
  }, [ultPartidos1, ultPartidos2, partido.dteam1, partido.dteam2]);
  console.log(ultPartidos1);
  console.log(ultimos5Partidos2);
  return (
    <div className="contenedor" id="partido1">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-2 text-center text-white">
          <img
            src={urlEscudo(partido.dteam1)}
            alt={partido.local}
            className="img-fluid"
          />
          <p className="h1">{partido.local}</p>
        </div>
        <div className="col-2">
          {getPosiCompe(partido)}
          <div className="d-flex justify-content-between">
            {setResult(partido)}
          </div>
          <div className="d-block">
            <h3 className="bg-naranja w-100 text-center">{partido.date}</h3>
          </div>
          <div className="d-block">
            <h3
              className={`w-100 text-center ${
                partido.status === 0 ? "bg-success text-white" : "bg-naranja"
              }`}
            >
              {partido.extraTxt ? partido.extraTxt : partido.live_minute + '"'}
            </h3>
          </div>
        </div>
        <div className="col-2 text-center text-white">
          <img
            src={urlEscudo(partido.dteam2)}
            alt={partido.visitor}
            className="img-fluid"
          />
          <p className="h1">{partido.visitor}</p>
        </div>
      </div>
      <div className="row align-items-center justify-content-around mt-5">
        <div className="col-5 bg-naranja mb-3">
          <h2 className="m-3 text-center">Ultimos Partidos</h2>
          <div className="contenedor  ">
            {ultimos5Partidos1.map((match) => (
              <>
                <div key={match.id} className="primerPartido p-3">
                  <div className="row justify-content-center">
                    <div
                      className={`col-3 text-center text-white pb-2 ${setEstilo(
                        match,
                        "local",
                        "local"
                      )}`}
                    >
                      <img
                        src={urlEscudo(match.t1_id)}
                        alt={match.local}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-4 align-self-center">
                      <div className="d-flex justify-content-between ">
                        {setResultResumen(match, "local")}
                      </div>
                      <div className="align-self-center text-center">
                        <img src={getLogoCompe(match, 1)} alt="" />
                      </div>
                    </div>
                    <div
                      className={`col-3 text-center text-white pb-2 ${setEstilo(
                        match,
                        "visitante",
                        "local"
                      )}`}
                    >
                      <img
                        src={urlEscudo(match.t2_id)}
                        alt={match.visitor}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="col-5 bg-naranja mb-3">
          <h2 className="m-3 text-center">Ultimos Partidos</h2>
          <div className="contenedor  ">
            {ultimos5Partidos2.map((match) => (
              <>
                <div key={match.id} className="primerPartido p-3">
                  <div className="row justify-content-center">
                    <div
                      className={`col-3 text-center text-white pb-2 ${setEstilo(
                        match,
                        "local",
                        "visitante"
                      )}`}
                    >
                      <img
                        src={urlEscudo(match.t1_id)}
                        alt={match.local}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-4 align-self-center">
                      <div className="d-flex justify-content-between ">
                        {setResultResumen(match, "visitante")}
                      </div>
                      <div className="align-self-center text-center">
                        <img src={getLogoCompe(match, 2)} alt="" />
                      </div>
                    </div>
                    <div
                      className={`col-3 text-center text-white pb-2 ${setEstilo(
                        match,
                        "visitante",
                        "visitante"
                      )}`}
                    >
                      <img
                        src={urlEscudo(match.t2_id)}
                        alt={match.visitor}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
