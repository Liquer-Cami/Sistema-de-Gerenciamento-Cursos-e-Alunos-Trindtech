import "./App.css";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import TableAlunos from "./components/tableAlunos";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api from "./services/api";
import { useState } from "react";

function Home() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="search-bar-container">
        <SearchBar className="search-bar" ></SearchBar>
      </div>
      <div>
        <TableAlunos></TableAlunos>
      </div>
    </div>
  );
}

export default Home;
