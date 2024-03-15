import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PartidoCard = ({ partido }) => {
  const urlEscudo = (id) => {
    return (
      "https://t.resfu.com/img_data/equipos/" +
      id +
      ".png?size=80x&ext=png&lossy=1&12"
    );
  };
  const setResult = (partido) => {
    return partido.result === "x-x"
      ? partido.hour + " : " + partido.minute
      : partido.result;
  };
  return (
    <Link
      to="/Partidos/Partido"
      key={partido.id}
      state={{ partido }}
      className="card mb-4 border-0 col-5"
    >
      <div className="card-body row text-center bg-naranja rounded">
        <div className="col-5">
          <img src={urlEscudo(partido.dteam1)} alt="" />
          <h4 className="col">{partido.local}</h4>
        </div>
        <div
          className={`col-2 ${
            partido.status === -1 ? "align-self-center" : "align-self-end"
          }`}
        >
          <h4 className="">{setResult(partido)}</h4>
          {partido.status === 0 && (
            <p className="bg-success text-white">{partido.live_minute}&quot;</p>
          )}
          {partido.status === 1 && (
            <p
              className="text-white"
              style={{ backgroundColor: "var(--bs-gray)" }}
            >
              FIN
            </p>
          )}
        </div>
        <div className="col-5">
          <img src={urlEscudo(partido.dteam2)} alt="" />
          <h4 className="col">{partido.visitor}</h4>
        </div>
      </div>
    </Link>
  );
};
PartidoCard.propTypes = {
  partido: PropTypes.object.isRequired,
};
export default PartidoCard;
