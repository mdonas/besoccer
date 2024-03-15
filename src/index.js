//importamos los componentes de la aplicacion que vamos a utilizar
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App.jsx"
import Error from "./routes/Error.jsx"
import HomeRoute from './routes/Home.jsx';
import EquiposRoute from './routes/Equipos.jsx';
import PartidosRoute from './routes/Partidos.jsx';
import PartidoRoute from './routes/Partido.jsx';
import LigasRoute from './routes/Ligas.jsx';

//crea un "root" para ReactDOM, renderiza la aplicación de React en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

//configurar las rutas del navegador
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomeRoute />
      },
      {
        path: "Equipos",
        element: <EquiposRoute />
      },
      {
        path: "Partidos",
        element: <PartidosRoute />,

      },
      {
        path: "Partidos/Partido",
        element: <PartidoRoute />
      },
      {
        path: "Ligas",
        element: <LigasRoute />
      }
    ]
  },

]);

//reenderizar la aplicacion
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);