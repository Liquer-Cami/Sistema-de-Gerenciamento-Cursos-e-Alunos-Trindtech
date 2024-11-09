-- CreateTable
CREATE TABLE "Aluno" (
    "aluno_id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "numeroCasa" VARCHAR(10) NOT NULL,
    "sobrenome" VARCHAR(100),
    "dataDeNascimento" TIMESTAMP(3),
    "cpf" VARCHAR(11),
    "genero" VARCHAR(20),
    "bairro" VARCHAR(100),
    "rua" VARCHAR(100),
    "complemento" VARCHAR(100),
    "cidade" VARCHAR(100),
    "estado" VARCHAR(50),
    "dataCadastro" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("aluno_id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "curso_id" SERIAL NOT NULL,
    "nome_curso" VARCHAR(100) NOT NULL,
    "data_conclusao" TIMESTAMP(3),

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("curso_id")
);

-- CreateTable
CREATE TABLE "AlunoCurso" (
    "aluno_id" INTEGER NOT NULL,
    "curso_id" INTEGER NOT NULL,
    "data_conclusao" TIMESTAMP(3),

    CONSTRAINT "AlunoCurso_pkey" PRIMARY KEY ("aluno_id","curso_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");

-- AddForeignKey
ALTER TABLE "AlunoCurso" ADD CONSTRAINT "AlunoCurso_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("aluno_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoCurso" ADD CONSTRAINT "AlunoCurso_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("curso_id") ON DELETE RESTRICT ON UPDATE CASCADE;
