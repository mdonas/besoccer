import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <>
      <header className="">
        <nav className="navbar bg-naranja text-center">
          <Link to="/" className="navbar-brand col border-end border-light">
            Home
          </Link>
          <Link to="/Equipos" className="navbar-brand col border-end border-light" >
            Equipos
          </Link>
          <Link to="/Partidos" className="navbar-brand col border-end border-light" >
            Partidos
          </Link>
          <Link to="/Ligas" className="navbar-brand col" >
            Ligas
          </Link>
        </nav>
      </header>
    </>

  );
};

export default Header;
