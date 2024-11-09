-- DropForeignKey
ALTER TABLE "AlunoCurso" DROP CONSTRAINT "AlunoCurso_aluno_id_fkey";

-- DropForeignKey
ALTER TABLE "AlunoCurso" DROP CONSTRAINT "AlunoCurso_curso_id_fkey";

-- AddForeignKey
ALTER TABLE "AlunoCurso" ADD CONSTRAINT "AlunoCurso_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("aluno_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoCurso" ADD CONSTRAINT "AlunoCurso_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "Curso"("curso_id") ON DELETE CASCADE ON UPDATE CASCADE;
