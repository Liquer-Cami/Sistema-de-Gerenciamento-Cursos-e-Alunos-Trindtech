import api from "../services/api";
import { useState } from "react";

function SearchBar() {
  const [busca, setBusca] = useState("")
  console.log(busca)

  return (
    <div className="itens-search-bar">
      <div className="search">
        <input value={busca} onChange={(ev) => setBusca(ev.target.value)}
          type="text"
          placeholder="Buscar por aluno"
          className="search-input"
        />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="add-new">
        <button className="add-new-button">
          <img src="./group-add.png" alt="Icone adicionar aluno" />
          <p>Adicionar</p>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
