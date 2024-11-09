import api from "../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TableAlunos() {
  const [busca, setBusca] = useState("");
  console.log(busca);

  const [alunos, setAlunos] = useState([]);

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(busca.toLowerCase())
  );

  async function getAlunos() {
    const alunosFromApi = await api.get("/");
    setAlunos(alunosFromApi.data);
  }

  async function deleteAlunos(id) {
    await api.delete(`/alunos/${id}`);
    getAlunos();
  }

  useEffect(() => {
    getAlunos();
  }, []);

  return (
    <div className="itens">
      <div className="itens-search">
        <div className="search-bar">
          <input
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
            type="text"
            placeholder="Buscar por aluno"
            className="search-input"
          />
          <button className="search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="add-new">
          <Link to={"/cadastro"} className="link">
            <button className="add-new-button">
              <img src="./group-add.png" alt="Icone adicionar aluno" />
              <p>Adicionar</p>
            </button>
          </Link>
        </div>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Data de cadastro</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Cursos</th>
          </tr>
        </thead>
        <tbody>
          {alunosFiltrados.map((aluno) => (
            <tr key={aluno.aluno_id}>
              <td className="td-cadastro">
                {new Date(aluno.dataCadastro).toLocaleDateString("pt-BR")}
              </td>
              <td className="td-nome">{aluno.nome}</td>
              <td className="td-estado">{aluno.estado}</td>
              <td className="td-cursos">
                {aluno.cursos.map((alunoCurso) => (
                  <div key={alunoCurso.curso_id}>
                    {alunoCurso.curso.nome_curso}
                  </div>
                ))}
              </td>
              <td>
                <button
                  className="button-trash-edit"
                  onClick={() => deleteAlunos(aluno.aluno_id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
              <td>
                <Link to={`/edit/${aluno.aluno_id}`}>
                  <button className="button-trash-edit">
                    <i className="fa fa-edit"></i>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableAlunos;
