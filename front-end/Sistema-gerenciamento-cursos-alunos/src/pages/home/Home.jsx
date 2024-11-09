import Navbar from "../../components/navbar";
import TableAlunos from "../../components/tableAlunos";
import "../../App.css";

function Home() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <TableAlunos></TableAlunos>
      </div>
    </div>
  );
}

export default Home;
