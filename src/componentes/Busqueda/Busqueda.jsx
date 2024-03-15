import React from 'react';
import PropTypes from 'prop-types';

const Busqueda = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3 col-4 pl-150 mt-5">
            <label htmlFor="search" className="form-label text-white fs-1">
                Buscar equipo:
            </label>
            <input
                type="text"
                id="search"
                className="form-control"
                value={searchTerm}
                onChange={onSearchChange}
            />
        </div>
    );
};

Busqueda.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default Busqueda;
