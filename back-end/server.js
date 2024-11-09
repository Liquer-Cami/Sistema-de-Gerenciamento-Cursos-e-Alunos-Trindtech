import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { body, validationResult } from "express-validator";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post(
  "/cadastro",
  [
    body("nome").isString().notEmpty().withMessage("Digite um nome válido."),
    body("sobrenome")
      .isString()
      .optional()
      .withMessage("Digite um sobrenome válido."),
    body("cpf")
      .optional()
      .isLength({ min: 11, max: 11 })
      .isInt()
      .withMessage("Digite um CPF válido (Apenas números)."),
    body("genero")
      .optional()
      .isString()
      .withMessage("Digite um gênero válido."),
    body("email").isEmail().notEmpty().withMessage("Digite um email válido."),
    body("cep")
      .isLength({ min: 8, max: 8 })
      .notEmpty()
      .withMessage("Digite um CEP válido."),
    body("pais").isString().notEmpty().withMessage("Digite um País válido."),
    body("numeroCasa")
      .isInt()
      .notEmpty()
      .withMessage("Digite um número válido."),
    body("bairro")
      .optional()
      .isString()
      .withMessage("Digite um bairro válido."),
    body("rua").optional().isString().withMessage("Digite uma rua válida."),
    body("cidade")
      .optional()
      .isString()
      .withMessage("Digite uma cidade válida."),
    body("estado")
      .optional()
      .isString()
      .withMessage("Digite um estado válido."),
    body("nome_curso")
      .isString()
      .optional()
      .withMessage("Digite um nome de curso válido."),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const aluno = await prisma.aluno.create({
        data: {
          nome: req.body.nome,
          email: req.body.email,
          cep: req.body.cep,
          pais: req.body.pais,
          numeroCasa: req.body.numeroCasa,
          sobrenome: req.body.sobrenome,
          dataDeNascimento: req.body.dataDeNascimento,
          cpf: req.body.cpf,
          genero: req.body.genero,
          bairro: req.body.bairro,
          rua: req.body.rua,
          complemento: req.body.complemento,
          cidade: req.body.cidade,
          estado: req.body.estado,
        },
      });

      for (let curso of req.body.cursos) {
        const novoCurso = await prisma.curso.create({
          data: {
            nome_curso: curso.nome,
            data_conclusao: new Date(curso.dataConclusao).toISOString(),
          },
        });

        await prisma.alunoCurso.create({
          data: {
            aluno_id: aluno.aluno_id,
            curso_id: novoCurso.curso_id,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno e curso:", error);
      res.status(500).json({
        error: "Erro ao cadastrar aluno e curso",
        details: error.message,
      });
    }
  }
);

app.get("/", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      where: req.query.nome ? { nome: req.query.nome } : {},
      include: {
        cursos: {
          include: {
            curso: true,
          },
        },
      },
    });
    res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      where: req.query.nome ? { nome: req.query.nome } : {},
      include: {
        cursos: {
          include: {
            curso: true,
          },
        },
      },
    });
    res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
});

app.put(
  "/edit/:id",

  [
    body("nome").isString().notEmpty().withMessage("Digite um nome válido."),
    body("sobrenome")
      .isString()
      .optional()
      .withMessage("Digite um sobrenome válido."),
    body("cpf")
      .optional()
      .isLength({ min: 11, max: 11 })
      .isInt()
      .withMessage("Digite um CPF válido (Apenas números)."),
    body("genero")
      .optional()
      .isString()
      .withMessage("Digite um gênero válido."),
    body("email").isEmail().notEmpty().withMessage("Digite um email válido."),
    body("cep")
      .isLength({ min: 8, max: 8 })
      .notEmpty()
      .withMessage("Digite um CEP válido."),
    body("pais").isString().notEmpty().withMessage("Digite um País válido."),
    body("numeroCasa")
      .isInt()
      .notEmpty()
      .withMessage("Digite um número válido."),
    body("bairro")
      .optional()
      .isString()
      .withMessage("Digite um bairro válido."),
    body("rua").optional().isString().withMessage("Digite uma rua válida."),
    body("cidade")
      .optional()
      .isString()
      .withMessage("Digite uma cidade válida."),
    body("estado")
      .optional()
      .isString()
      .withMessage("Digite um estado válido."),
    body("cursos")
      .isArray()
      .withMessage("Cursos devem ser um array.")
      .custom((value) => {
        if (value.some((curso) => !curso.nome || !curso.dataConclusao)) {
          throw new Error("Cada curso deve ter um nome e uma data de conclusão.");
        }
        return true;
      }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const alunoId = parseInt(req.params.id);

    try {
      const updatedAluno = await prisma.aluno.update({
        where: { aluno_id: alunoId },
        data: {
          nome: req.body.nome,
          email: req.body.email,
          cep: req.body.cep,
          pais: req.body.pais,
          numeroCasa: req.body.numeroCasa,
          sobrenome: req.body.sobrenome,
          dataDeNascimento: req.body.dataDeNascimento,
          cpf: req.body.cpf,
          genero: req.body.genero,
          bairro: req.body.bairro,
          rua: req.body.rua,
          complemento: req.body.complemento,
          cidade: req.body.cidade,
          estado: req.body.estado,
        },
      });

      const cursoIds = [];

      for (let curso of req.body.cursos) {
        let existingCurso = await prisma.curso.findFirst({
          where: {
            nome_curso: curso.nome,
          },
        });

        let novoCurso;

        if (existingCurso) {
          novoCurso = await prisma.curso.update({
            where: { curso_id: existingCurso.curso_id },
            data: {
              nome_curso: curso.nome,
              data_conclusao: new Date(curso.dataConclusao).toISOString(),
            },
          });
        } else {
          novoCurso = await prisma.curso.create({
            data: {
              nome_curso: curso.nome,
              data_conclusao: new Date(curso.dataConclusao).toISOString(),
            },
          });
        }

        cursoIds.push(novoCurso.curso_id);

        await prisma.alunoCurso.upsert({
          where: {
            aluno_id_curso_id: {
              aluno_id: alunoId,
              curso_id: novoCurso.curso_id,
            },
          },
          update: {},
          create: {
            aluno_id: alunoId,
            curso_id: novoCurso.curso_id,
          },
        });
      }

      await prisma.alunoCurso.deleteMany({
        where: {
          aluno_id: alunoId,
          curso_id: {
            notIn: cursoIds,
          },
        },
      });

      res.status(200).json(updatedAluno);
    } catch (error) {
      console.error("Erro ao editar aluno:", error);
      res.status(500).json({ error: "Erro ao editar aluno e cursos." });
    }
  }
);

app.delete("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.aluno.delete({
      where: { aluno_id: parseInt(id) },
    });
    await prisma.alunoCurso.deleteMany({
      where: { curso_id: parseInt(id) },
    });
    res.status(204).json({ message: "Usuário deletado" });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ error: "Erro ao deletar aluno." });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
