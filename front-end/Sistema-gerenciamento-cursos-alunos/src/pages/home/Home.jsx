import Navbar from "../../components/navbar";
import SearchBar from "../../components/searchBar";
import TableAlunos from "../../components/tableAlunos";
import "../../App.css";

function Home() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="search-bar-container">
        <SearchBar className="search-bar"></SearchBar>
      </div>
      <div>
        <TableAlunos></TableAlunos>
      </div>
    </div>
  );
}

export default Home;
