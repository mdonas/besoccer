import React, { useState, useEffect } from 'react';
//import Busqueda from "./componentes/Busqueda/Busqueda";
//import Desplegables from './Desplegables';
import Busqueda from '../Busqueda/Busqueda';
import Desplegables from '../Desplegables/Desplegables';


export default function Equipos() {
    const [ligas, setLigas] = useState([
        { id: 'liga1', name: 'LALIGA', equipos: [], isActive: false },
        { id: 'liga2', name: 'SEGUNDA DIVISIÓN', equipos: [], isActive: false },
        { id: 'liga3', name: 'SEGUNDA DIVISIÓN B', equipos: [], isActive: false },
        { id: 'liga4', name: 'TERCERA FEDERACIÓN', equipos: [], isActive: false },
        { id: 'liga5', name: 'PRIMERA FEDERACIÓN', equipos: [], isActive: false },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const apiKey = "b3fcd6725e03f4e5d588f6624cac5522";
    const leagueUrls = [
        `http://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe/Madrid&format=json&req=teams&league=1`,
        `http://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe/Madrid&format=json&req=teams&league=2`,
        `http://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe/Madrid&format=json&req=teams&league=3`,
        `http://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe/Madrid&format=json&req=teams&league=4`,
        `http://apiclient.besoccerapps.com/scripts/api/api.php?key=${apiKey}&tz=Europe/Madrid&format=json&req=teams&league=5`,
    ];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterEquiposBySearchTerm = (equipos) => {
        return equipos.filter((equipo) =>
            equipo.fullName && equipo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            equipo.shield_png
        );
    };


    const handleLigaChange = (ligaId) => {
        setLigas((prevLigas) =>
            prevLigas.map((liga) => ({
                ...liga,
                isActive: liga.id === ligaId ? !liga.isActive : liga.isActive,
            }))
        );
    };

    useEffect(() => {
        const fetchData = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.team);
            return data.team;
        };


        const fetchDataLeagues = async () => {
            const data = await Promise.all(leagueUrls.map((url) => fetchData(url)));
            setLigas((prevLigas) =>
                prevLigas.map((liga, index) => ({ ...liga, equipos: data[index] }))
            );
        };

        fetchDataLeagues();
    }, [apiKey, leagueUrls]);

    return (
        <>
            <Busqueda searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Desplegables
                ligas={ligas}
                handleLigaChange={handleLigaChange}
                filterEquiposBySearchTerm={filterEquiposBySearchTerm}
            />

            {searchTerm && (
                <div className="mb-3 col-6 pl-150">
                    <h2 className="text-white fs-1">Resultados de la búsqueda:</h2>
                    <ul className="list-group w-100 border-0 mx-2 row">
                        {filterEquiposBySearchTerm(ligas.flatMap((liga) => liga.equipos)).map((equipo) => (
                            <li key={equipo.id} className="list-group-item bg-azul  border-0 border-bottom col-10 py-5">
                                <img src={equipo.shield_png} alt={equipo.fullName} className="w-50" />
                                <h2 className="text-white fs-1">{equipo.fullName}</h2>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


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