import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "../services/api";
import apiViaCep from "../services/viaCep";

function Form() {
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

  async function createAlunos() {
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
    });
  }

  async function cep() {
    const cep = InputCEP.current.value;
    const response = await apiViaCep.get(`/${cep}/json/
`);

    InputRua.current.value = response.data.logradouro;
    InputBairro.current.value = response.data.bairro;
    InputCidade.current.value = response.data.localidade;
    InputEstado.current.value = response.data.uf;
    InputPais.current.value = "Brasil";
  }

  return (
    <div>
      <form className="form-container" onSubmit={createAlunos}>
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
          <input
            type="date"
            className="input-form"
            ref={InputDataDeNascimento}
          />
        </div>
        <div className="form-group">
          <label>CPF</label>
          <input type="text" className="input-form" ref={InputCPF} />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <input type="text" className="input-form" ref={InputGenero} />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" className="input-form" ref={InputEmail} />
        </div>

        <h2 className="location">Localização</h2>

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
        <div>
          <button type="submit" className="add-new-button">
            Adicionar
          </button>
          <Link to={"/"} className="link">
            <button className="add-new-button">Voltar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
