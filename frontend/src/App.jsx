import { useState } from "react";
import Header from "./components/Header";
import Clientes from "./components/Clientes";
import Celulares from "./components/Celulares";
import "./index.css";

export default function App() {
  const [vista, setVista] = useState("clientes");

  return (
    <>
      <Header setVista={setVista} />
      {vista === "clientes" && <Clientes />}
      {vista === "celulares" && <Celulares />}
    </>
  );
}
