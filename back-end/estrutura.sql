--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Aluno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Aluno" (
    aluno_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    cep character varying(8) NOT NULL,
    pais character varying(50) NOT NULL,
    "numeroCasa" character varying(10) NOT NULL,
    sobrenome character varying(100),
    "dataDeNascimento" timestamp(3) without time zone,
    cpf character varying(11),
    genero character varying(20),
    bairro character varying(100),
    rua character varying(100),
    complemento character varying(100),
    cidade character varying(100),
    estado character varying(50),
    "dataCadastro" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Aluno" OWNER TO postgres;

--
-- Name: AlunoCurso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AlunoCurso" (
    aluno_id integer NOT NULL,
    curso_id integer NOT NULL,
    data_conclusao timestamp(3) without time zone
);


ALTER TABLE public."AlunoCurso" OWNER TO postgres;

--
-- Name: Aluno_aluno_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Aluno_aluno_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Aluno_aluno_id_seq" OWNER TO postgres;

--
-- Name: Aluno_aluno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Aluno_aluno_id_seq" OWNED BY public."Aluno".aluno_id;


--
-- Name: Curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Curso" (
    curso_id integer NOT NULL,
    nome_curso character varying(100),
    data_conclusao timestamp(3) without time zone
);


ALTER TABLE public."Curso" OWNER TO postgres;

--
-- Name: Curso_curso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Curso_curso_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Curso_curso_id_seq" OWNER TO postgres;

--
-- Name: Curso_curso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Curso_curso_id_seq" OWNED BY public."Curso".curso_id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Aluno aluno_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aluno" ALTER COLUMN aluno_id SET DEFAULT nextval('public."Aluno_aluno_id_seq"'::regclass);


--
-- Name: Curso curso_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Curso" ALTER COLUMN curso_id SET DEFAULT nextval('public."Curso_curso_id_seq"'::regclass);


--
-- Name: AlunoCurso AlunoCurso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCurso"
    ADD CONSTRAINT "AlunoCurso_pkey" PRIMARY KEY (aluno_id, curso_id);


--
-- Name: Aluno Aluno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Aluno"
    ADD CONSTRAINT "Aluno_pkey" PRIMARY KEY (aluno_id);


--
-- Name: Curso Curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Curso"
    ADD CONSTRAINT "Curso_pkey" PRIMARY KEY (curso_id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: AlunoCurso AlunoCurso_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCurso"
    ADD CONSTRAINT "AlunoCurso_aluno_id_fkey" FOREIGN KEY (aluno_id) REFERENCES public."Aluno"(aluno_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: AlunoCurso AlunoCurso_curso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AlunoCurso"
    ADD CONSTRAINT "AlunoCurso_curso_id_fkey" FOREIGN KEY (curso_id) REFERENCES public."Curso"(curso_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

