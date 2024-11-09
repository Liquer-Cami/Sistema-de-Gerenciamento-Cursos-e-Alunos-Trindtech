import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../services/api";
import apiViaCep from "../services/viaCep";

function Form() {
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

  async function createAlunosCursos(e) {
    e.preventDefault();
    try {
      await api.post("/cadastro", {
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
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const mensagensErro = error.response.data.errors
          .map((err) => err.msg)
          .join("\n");
        alert("Erros de validação:\n" + mensagensErro);
      } else {
        alert("Erro ao cadastrar aluno e curso: " + error.message);
      }
    }
  }

  async function cep() {
    const cep = InputCEP.current.value;
    const response = await apiViaCep.get(`/${cep}/json/`);

    InputRua.current.value = response.data.logradouro;
    InputBairro.current.value = response.data.bairro;
    InputCidade.current.value = response.data.localidade;
    InputEstado.current.value = response.data.uf;
    InputPais.current.value = "Brasil";
  }

  return (
    <div>
      <form className="form-container" onSubmit={createAlunosCursos} id="form">
        <div className="form-group">
          <label>Nome*</label>
          <input type="text" className="input-form required" ref={InputNome} />
        </div>
        <div className="form-group">
          <label>Sobrenome</label>
          <input
            type="text"
            className="input-form required"
            ref={InputSobrenome}
          />
        </div>

        <div className="form-group required">
          <label>Data de Nascimento</label>
          <input
            type="date"
            className="input-form required"
            ref={InputDataDeNascimento}
          />
        </div>
        <div className="form-group required">
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
          <input
            type="text"
            className="input-form"
            ref={InputCEP}
            onBlur={cep}
          />
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

        {cursos.map((curso, index) => (
          <div key={index}>
            <div className="form-group">
              <label>Nome do Curso</label>
              <input
                type="text"
                className="input-form-curso"
                value={curso.nome}
                onChange={(e) =>
                  handleCursoChange(index, "nome", e.target.value)
                }
              />
            </div>
            <div className="form-group">
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
            <div>
              <button
                type="button"
                className="fa fa-trash"
                onClick={() => removeCurso(index)}
              >
                {" "}
              </button>
              <button
                type="button"
                class="fas fa-plus"
                onClick={addCurso}
              ></button>
            </div>
          </div>
        ))}
      </form>
      <div className="buttons">
          <button type="submit" className="add-new-button">
            Adicionar
          </button>
          <Link to={"/"} className="link">
            <button className="add-new-button">Voltar</button>
          </Link>
        </div>
    </div>
  );
}

export default Form;
