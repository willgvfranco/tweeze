--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-03-30 13:35:29 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 18818)
-- Name: frontend_fonte; Type: TABLE; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

CREATE TABLE public.frontend_fonte (
    id integer NOT NULL,
    criado timestamp with time zone NOT NULL,
    modificado timestamp with time zone,
    ativo boolean,
    source_slug character varying(255) NOT NULL,
    source_url_global character varying(255) NOT NULL,
    source_type character varying(255) NOT NULL,
    source_initial_timer integer,
    source_regex character varying(255),
    source_category character varying(255),
    news_source character varying(255) NOT NULL,
    news_container character varying(255) NOT NULL,
    news_title character varying(255) NOT NULL,
    news_description character varying(255),
    news_date character varying(255),
    news_category character varying(255),
    news_url character varying(255)
);


ALTER TABLE public.frontend_fonte OWNER TO "tweeze_AC6244FB933CF3F";

--
-- TOC entry 227 (class 1259 OID 18816)
-- Name: frontend_fonte_id_seq; Type: SEQUENCE; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

CREATE SEQUENCE public.frontend_fonte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.frontend_fonte_id_seq OWNER TO "tweeze_AC6244FB933CF3F";

--
-- TOC entry 3066 (class 0 OID 0)
-- Dependencies: 227
-- Name: frontend_fonte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

ALTER SEQUENCE public.frontend_fonte_id_seq OWNED BY public.frontend_fonte.id;


--
-- TOC entry 2926 (class 2604 OID 18821)
-- Name: frontend_fonte id; Type: DEFAULT; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

ALTER TABLE ONLY public.frontend_fonte ALTER COLUMN id SET DEFAULT nextval('public.frontend_fonte_id_seq'::regclass);


--
-- TOC entry 3060 (class 0 OID 18818)
-- Dependencies: 228
-- Data for Name: frontend_fonte; Type: TABLE DATA; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

COPY public.frontend_fonte (id, criado, modificado, ativo, source_slug, source_url_global, source_type, source_initial_timer, source_regex, source_category, news_source, news_container, news_title, news_description, news_date, news_category, news_url) FROM stdin;
1	2021-03-30 03:02:19.118949+00	2021-03-30 03:02:19.118949+00	t	G1	https://g1.globo.com/rss/g1/	xml	15	\N	Geral	G1	item	title	description	pubDate	category	guid
2	2021-03-30 03:03:30.380568+00	2021-03-30 03:03:30.380568+00	t	UOL	http://rss.uol.com.br/feed/noticias.xml	xml	20	\N	Geral	UOL	item	title	description	pubDate	\N	link
3	2021-03-30 03:07:14.853491+00	2021-03-30 03:07:14.853491+00	t	folha	https://feeds.folha.uol.com.br/emcimadahora/rss091.xml	Geral	20	\N	xml	Folha de São Paulo	item	title	description	pubDate	\N	link
4	2021-03-30 03:17:31.123707+00	2021-03-30 03:17:31.123707+00	t	r7	https://noticias.r7.com/feed.xml	xml	25	\N	Geral	mediasource	entry	title	description	published	\N	url
5	2021-03-30 03:19:18.125989+00	2021-03-30 03:19:18.125989+00	t	bbc	https://www.bbc.com/portuguese/topicos/brasil/index.xml	xml	30	\N	Internacional	bbc	entry	title	summary	published	\N	link
6	2021-03-30 03:22:37.07831+00	2021-03-30 03:22:37.07831+00	t	ebc	https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml	xml	60	\N	Geral	Agência Brasil	item	title	description	pubDate	\N	link
7	2021-03-30 03:24:26.868419+00	2021-03-30 03:24:26.868419+00	t	jc	https://www.jornaldocomercio.com/_conteudo/ultimas_noticias/rss.xml	xml	60	\N	Brasil	Jornal do Comércio	item	title	description	pubDate	author	link
8	2021-03-30 03:26:41.327834+00	2021-03-30 03:26:41.327834+00	t	camara_federal	https://www.camara.leg.br/noticias/rss/ultimas-noticias	xml	120	\N	Governo	Câmara dos Deputados	item	title	description	pubDate	\N	guid
\.


--
-- TOC entry 3067 (class 0 OID 0)
-- Dependencies: 227
-- Name: frontend_fonte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

SELECT pg_catalog.setval('public.frontend_fonte_id_seq', 8, true);


--
-- TOC entry 2928 (class 2606 OID 18826)
-- Name: frontend_fonte frontend_fonte_pkey; Type: CONSTRAINT; Schema: public; Owner: tweeze_AC6244FB933CF3F
--

ALTER TABLE ONLY public.frontend_fonte
    ADD CONSTRAINT frontend_fonte_pkey PRIMARY KEY (id);


-- Completed on 2021-03-30 13:35:29 UTC

--
-- PostgreSQL database dump complete
--

