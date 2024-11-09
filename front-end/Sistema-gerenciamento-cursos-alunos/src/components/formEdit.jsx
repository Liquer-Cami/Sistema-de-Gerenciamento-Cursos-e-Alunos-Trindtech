import { Link, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import api from "../services/api";
import apiViaCep from "../services/viaCep";

function EditForm() {
  const { id } = useParams();
  const [cursos, setCursos] = useState([{ nome: "", dataConclusao: "" }]);
  const handleCursoChange = (index, field, value) => {
    const novosCursos = [...cursos];
    novosCursos[index][field] = value;
    setCursos(novosCursos);
  };

  const addCurso = () => {
    setCursos([...cursos, { nome: "", dataConclusao: "" }]);
  };

  const removeCurso = (index) => {
    setCursos(cursos.filter((_, i) => i !== index));
  };

  const InputNome = useRef();
  const InputSobrenome = useRef();
  const InputDataDeNascimento = useRef();
  const InputCPF = useRef();
  const InputGenero = useRef();
  const InputEmail = useRef();
  const InputCEP = useRef();
  const InputPais = useRef();
  const InputRua = useRef();
  const InputBairro = useRef();
  const InputComplemento = useRef();
  const InputNumero = useRef();
  const InputCidade = useRef();
  const InputEstado = useRef();

  useEffect(() => {
    async function ObterDados() {
      try {
        const response = await api.get(`/${id}`);
        const aluno = response.data.find((aluno) => aluno.aluno_id === parseInt(id));
        
        InputNome.current.value = aluno.nome;
        InputSobrenome.current.value = aluno.sobrenome;
        InputDataDeNascimento.current.value = aluno.dataNascimento ? aluno.dataNascimento.split('T')[0] : '';
        InputCPF.current.value = aluno.cpf;
        InputGenero.current.value = aluno.genero;
        InputEmail.current.value = aluno.email;
        InputCEP.current.value = aluno.cep;
        InputPais.current.value = aluno.pais || "Brasil";
        InputRua.current.value = aluno.rua;
        InputBairro.current.value = aluno.bairro;
        InputComplemento.current.value = aluno.complemento;
        InputNumero.current.value = aluno.numeroCasa;
        InputCidade.current.value = aluno.cidade;
        InputEstado.current.value = aluno.estado;

        if (aluno.cursos && Array.isArray(aluno.cursos)) {
          const cursosFormatados = aluno.cursos.map((curso) => ({
            nome: curso.curso.nome_curso,
            dataConclusao: curso.curso.data_conclusao.split("T")[0],
          }));
          setCursos(cursosFormatados);
        }
      } catch (error) {
        console.error("Erro ao obter dados do aluno:", error);
      }
    }
    ObterDados();
  }, [id]);

  async function updateAlunosCursos(e) {
    e.preventDefault();
    try {
      await api.put(`/edit/${id}`, {
        nome: InputNome.current.value,
        sobrenome: InputSobrenome.current.value,
        dataNascimento: InputDataDeNascimento.current.value,
        cpf: InputCPF.current.value,
        genero: InputGenero.current.value,
        email: InputEmail.current.value,
        cep: InputCEP.current.value,
        pais: InputPais.current.value,
        rua: InputRua.current.value,
        bairro: InputBairro.current.value,
        complemento: InputComplemento.current.value,
        numeroCasa: InputNumero.current.value,
        cidade: InputCidade.current.value,
        estado: InputEstado.current.value,
        cursos: cursos,
      });
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const mensagensErro = error.response.data.errors
          .map((err) => err.msg)
          .join("\n");
        alert("Erros de validação:\n" + mensagensErro);
      } else {
        alert("Erro ao atualizar aluno e curso: " + error.message);
      }
    }
  }

  async function cep() {
    const cep = InputCEP.current.value;
    try {
      const response = await apiViaCep.get(`/${cep}/json/`);
      if (!response.data.erro) {
        InputRua.current.value = response.data.logradouro;
        InputBairro.current.value = response.data.bairro;
        InputCidade.current.value = response.data.localidade;
        InputEstado.current.value = response.data.uf;
        InputPais.current.value = "Brasil";
      } else {
        alert("CEP não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  }

  return (
    <div>
    <form className="form-container" onSubmit={updateAlunosCursos}>
      <div className="form-group">
        <label>Nome*</label>
        <input type="text" className="input-form" ref={InputNome} />
      </div>
      <div className="form-group">
        <label>Sobrenome</label>
        <input type="text" className="input-form" ref={InputSobrenome} />
      </div>
      <div className="form-group">
        <label>Data de Nascimento</label>
        <input type="date" className="input-form" ref={InputDataDeNascimento} />
      </div>
      <div className="form-group">
        <label>CPF</label>
        <input type="text" className="input-form" ref={InputCPF} />
      </div>
      <div className="form-group">
        <label>Gênero</label>
        <select name="genero" className="input-form" ref={InputGenero}>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <div className="form-group">
        <label>Email*</label>
        <input type="email" className="input-form" ref={InputEmail} />
      </div>

      <h2 className="title-forms">Localização</h2>
      <h2></h2>

      <div className="form-group">
        <label>CEP*</label>
        <input type="text" className="input-form" ref={InputCEP} onBlur={cep} />
      </div>
      <div className="form-group">
        <label>País*</label>
        <input type="text" className="input-form" ref={InputPais} />
      </div>
      <div className="form-group">
        <label>Rua</label>
        <input type="text" className="input-form" ref={InputRua} />
      </div>
      <div className="form-group">
        <label>Bairro</label>
        <input type="text" className="input-form" ref={InputBairro} />
      </div>
      <div className="form-group">
        <label>Número*</label>
        <input type="text" className="input-form" ref={InputNumero} />
      </div>
      <div className="form-group">
        <label>Complemento</label>
        <input type="text" className="input-form" ref={InputComplemento} />
      </div>
      <div className="form-group">
        <label>Cidade</label>
        <input type="text" className="input-form" ref={InputCidade} />
      </div>
      <div className="form-group">
        <label>Estado</label>
        <input type="text" className="input-form" ref={InputEstado} />
      </div>

      <h2 className="title-forms">Cursos</h2>
      <h2></h2>
      <div className="form-container-cursos">
      {cursos.map((curso, index) => (
        <div key={index}>
          <div className="form-cursos-group">
            <label>Nome do Curso</label>
            <input
              type="text"
              className="input-form-curso"
              value={curso.nome}
              onChange={(e) => handleCursoChange(index, "nome", e.target.value)}
            />
          </div>
          <div className="form-cursos-group">
            <label>Data de Conclusão</label>
            <input
              type="date"
              className="input-form-curso"
              value={curso.dataConclusao}
              onChange={(e) =>
                handleCursoChange(index, "dataConclusao", e.target.value)
              }
            />
          </div>
          <button
            type="button"
            className="fa fa-trash"
            onClick={() => removeCurso(index)}
          >
            {" "}
          </button>
        </div>
      ))}
      <div>
        <button type="button" className="fas fa-plus" onClick={addCurso}></button>
      </div>
      </div>
    </form>
    <div className="buttons">
        <button type="submit" className="add-new-button">
          Editar
        </button>
        <Link to={"/"} className="link">
          <button type="button" className="add-new-button">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditForm;
