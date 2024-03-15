import React from 'react';
import PropTypes from 'prop-types';

const Desplegables = ({ ligas, handleLigaChange, filterEquiposBySearchTerm }) => {
    return (
        <div className="mb-3 col-6 pl-150">
            <label htmlFor="liga" className="form-label text-white fs-1">
                Seleccionar liga:
            </label>

            <ul className="list-unstyled">
                {ligas.map((liga) => (
                    <li key={liga.id} className={`bg-azul border rounded row ${liga.isActive && 'active'}`}>
                        <button
                            className="btn btn-link text-white bg-naranja text-decoration-none fs-2"
                            onClick={() => handleLigaChange(liga.id)}
                        >
                            {liga.name}
                            <img className="img-fluid px-5 w-1" src="/flecha.svg" alt="" />
                        </button>
                        {liga.isActive && (
                            <ul className="list-group w-100 border-0 mx-2 row">
                                {filterEquiposBySearchTerm(liga.equipos).map((equipo) => (
                                    <li key={equipo.id} className="list-group-item bg-azul  border-0 border-bottom col-10 py-5">
                                        {equipo.shield_png && (
                                            <img src={equipo.shield_png} alt={equipo.fullName} className="w-50" />
                                        )}
                                        {equipo.fullName && (
                                            <h2 className="text-white fs-1">{equipo.fullName}</h2>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

Desplegables.propTypes = {
    ligas: PropTypes.array.isRequired,
    handleLigaChange: PropTypes.func.isRequired,
    filterEquiposBySearchTerm: PropTypes.func.isRequired,
};

export default Desplegables;
