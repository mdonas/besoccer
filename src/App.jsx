import React from "react";
import Header from "./componentes/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <div>
        {/* se utiliza para mostrar el contenido de la ruta actual */}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
