import React, { useState, useEffect } from 'react';

export default function Ligas() {
    const [competiciones, setCompeticiones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = "b3fcd6725e03f4e5d588f6624cac5522";
            const competicionURL = `https://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe%2FMadrid&req=categories&filter=my_leagues&format=json`;

            try {
                const response = await fetch(competicionURL);
                const data = await response.json();
                const competicionesData = data?.category || [];
                setCompeticiones(competicionesData);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };

        fetchData();
    }, []);

    const filteredCompeticiones = competiciones.filter(competicion =>
        competicion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="mb-3 col-4 pl-150 mt-5">
                <label htmlFor="search" className="form-label text-white fs-1">Buscar competición:</label>
                <input
                    type="text"
                    id="search"
                    className="form-control"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="row gx-0">
                {filteredCompeticiones.map((competicion, index) => (
                    <div key={index} className="col-4 card bg-naranja col-4 align-items-center m-110">
                        <img
                            className="card-img-top w-25 mt-3"
                            src={competicion.logo_png}
                            alt={competicion.name}
                        />
                        <div className="card-body align-self-start">
                            <h4 className="card-title">Inicio: {competicion.start_date}</h4>
                            <h4 className="card-title">Final: {competicion.end_date}</h4>
                            <h4 className="card-title">Pais: {competicion.country}</h4>
                            <h4 className="card-title">Estado: {competicion.end}</h4>
                        </div>
                    </div>
                ))}
            </div>


               {/* Botón para volver arriba */}
         <button
                className="btn btn-secondary btn-floating btn-lg scroll"
                onClick={() => window.scrollTo({ top: 0 })}
            >
                ↑
            </button>
        </>
    );
}