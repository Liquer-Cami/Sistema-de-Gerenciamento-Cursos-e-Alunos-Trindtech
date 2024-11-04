import api from "../services/api";
import { useEffect, useState } from "react";

function TableAlunos() {
  const [alunos, setAlunos] = useState([]);

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
        {alunos.map((aluno) => (
          <tr key={aluno.aluno_id}>
            <td className="td-cadastro">{aluno.dataCadastro}</td>
            <td className="td-nome">{aluno.nome}</td>
            <td className="td-estado">{aluno.estado}</td>
            <td>{aluno.cursos}</td>
            <td>
              <button
                className="button-trash-edit"
                onClick={() => deleteAlunos(aluno.aluno_id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
            <td>
              <button className="button-trash-edit">
                <i className="fa fa-edit"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableAlunos;
