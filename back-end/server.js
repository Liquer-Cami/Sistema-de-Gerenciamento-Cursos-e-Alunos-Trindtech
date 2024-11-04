import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/cadastro", async (req, res) => {
  await prisma.aluno.create({
    data: {
      nome: req.body.nome,
      email: req.body.email,
      cep: req.body.cep,
      pais: req.body.pais,
      numeroCasa: req.body.numeroCasa,
      sobrenome: req.body.sobrenome,
      dataNascimento: req.body.dataNascimento,
      cpf: req.body.cpf,
      genero: req.body.genero,
      bairro: req.body.bairro,
      rua: req.body.rua,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
    },
  });

  res.status(201).json(req.body);
});

app.get("/", async (req, res) => {
  let alunos = [];

  if (req.query) {
    alunos = await prisma.aluno.findMany({
      where: {
        nome: req.query.nome,
      },
    });
  } else {
    alunos = await prisma.aluno.findMany();
  }

  res.status(200).json(alunos);
});

app.put("/alunos/:id", async (req, res) => {
  const alunoId = parseInt(req.params.id);
  await prisma.aluno.update({
    where: {
      aluno_id: alunoId,
    },
    data: {
      nome: req.body.nome,
      email: req.body.email,
      cep: req.body.cep,
      pais: req.body.pais,
      numeroCasa: req.body.numeroCasa,
      sobrenome: req.body.sobrenome,
      dataNascimento: req.body.dataNascimento,
      cpf: req.body.cpf,
      genero: req.body.genero,
      bairro: req.body.bairro,
      rua: req.body.rua,
      complemento: req.body.complemento,
      cidade: req.body.cidade,
      estado: req.body.estado,
      dataCadastro: req.body.dataCadastro,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/alunos/:id", async (req, res) => {
  const alunoId = parseInt(req.params.id);
  await prisma.aluno.delete({
    where: {
      aluno_id: alunoId,
    },
  });
  res.status(201).json({ message: "Usuário deletado" });
});

app.listen(3001);
