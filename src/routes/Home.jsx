import React from "react";

import "../App.css";

export default function HomeRoute() {
  return (
    <>
      <img src="/beSOCCER.png" alt="" className="w-90 img" />
      <a
        href="https://api.besoccer.com/"
        className="text-white bg-azul border p-3 boton"
        target="_blank"
        rel="noreferrer"
      >
        Ver API
      </a>
    </>
  );
}
