import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import {
  Grid,
  Container,
  Card,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core';
import {
  ArrowBack,
  Favorite,
  Whatshot,
  EmojiObjects
} from '@material-ui/icons';

import SocialButtons from './SocialButtons';
import Notify from '../../components/Notify';

import { register, clearStatus } from '../../reducers/AuthDuck';
import { emailValidation } from '../../utils/validations';

import hero3 from '../../assets/images/hero-bg/hero-5.jpg';
import logoTweeze from '../../assets/images/logo/logo_twz_azul.png';
import PoliticaPrivacidade from '../../assets/pdf/Minuta_politica_de_privacidade.pdf';
import TermosServico from '../../assets/pdf/Minuta_termos_de_Servico.pdf';

const PageRegister = ({ register, clearStatus, status, isLogged }) => {
  const history = useHistory();
  const [form, setForm] = useState({
    password: '',
    password_confirm: '',
    email: '',
    first_name: '',
    last_name: ''
  });
  const [hasError, setHasError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  useEffect(() => {
    if (status.description.includes('register')) {
      setOpenNotify(true);
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (isLogged) {
      history.push('/home');
    }
  }, [isLogged]);

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const sendRegister = async () => {
    setLoading(true);
    setHasError('');
    if (form.password !== form.password_confirm) {
      setHasError('password_confirm');
      setLoading(false);
      return;
    }
    if (
      !form.email ||
      !form.first_name ||
      !form.last_name ||
      !form.password ||
      !form.password_confirm
    ) {
      setHasError('hasError');
      setLoading(false);
      return;
    }
    if (!emailValidation(form.email)) {
      setLoading(false);
      return;
    }
    register(form);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotify(false);
    clearStatus();
  };

  return (
    <div className="app-wrapper min-vh-100 bg-white">
      <div className="hero-wrapper w-100 bg-composed-wrapper bg-light-pure min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-6"
            style={{ backgroundImage: `url(${hero3}` }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-7" />
          <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
          <div className="bg-composed-wrapper--content">
            <Container>
              <Card className="rounded-sm modal-content p-3 bg-white-10">
                <Card className="rounded-sm shadow-none font-size-sm p-3 p-sm-0">
                  <Grid container spacing={0}>
                    <Grid
                      item
                      lg={6}
                      className="d-flex align-items-center justify-content-center flex-column">
                      <NavLink
                        to="/login"
                        className="mr-auto ml-1 mt-2"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '4rem'
                        }}>
                        <ArrowBack />
                        <span style={{ fontSize: '1rem' }}>voltar</span>
                      </NavLink>
                      <div className="divider-v divider-v-lg d-none d-lg-block" />
                      <div className="text-center">
                        <img
                          className="logo-tweeze-css"
                          src={logoTweeze}
                          alt="Logo Tweeze"></img>
                        <h1 className="font-size-xxl mb-1 font-weight-bold landingcadastro-acerto-header">
                          Criação de conta
                        </h1>
                        <p className="mb-0 text-black-50">
                          Comece com os benefícios de nossa plataforma agora
                          mesmo.
                        </p>
                      </div>
                      <div className="text-center mb-3 cadastro-button-loginmidiassociais">
                        <SocialButtons></SocialButtons>
                      </div>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="px-5 py-1">
                        <div className="mb-3">
                          <label className="font-weight-bold mb-2">
                            Email*
                          </label>
                          <TextField
                            onChange={(event) => handleChange(event)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Entre com seu e-mail"
                            type="email"
                            name="email"
                            error={
                              (hasError === 'hasError' && form.email === '') ||
                              !emailValidation(form.email)
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <label className="font-weight-bold mb-2">
                              Senha*
                            </label>
                          </div>
                          <TextField
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Entre com a sua senha"
                            type="password"
                            name="password"
                            error={
                              (hasError === 'hasError' &&
                                form.password === '') ||
                              hasError === 'password_confirm'
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between">
                            <label className="font-weight-bold mb-2">
                              Confirme a senha*
                            </label>
                          </div>
                          <TextField
                            onChange={(e) => handleChange(e)}
                            variant="outlined"
                            size="small"
                            fullWidth
                            placeholder="Entre com a sua senha"
                            type="password"
                            name="password_confirm"
                            error={
                              (hasError === 'hasError' &&
                                form.password_confirm === '') ||
                              hasError === 'password_confirm'
                            }
                          />
                        </div>
                        <Grid container spacing={6}>
                          <Grid item md={6}>
                            <div>
                              <label className="font-weight-bold mb-2">
                                Nome*
                              </label>
                              <TextField
                                onChange={(e) => handleChange(e)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder="Nome"
                                name="first_name"
                                error={
                                  hasError === 'hasError' &&
                                  form.first_name === ''
                                }
                              />
                            </div>
                          </Grid>
                          <Grid className="cadastro-no-top-padding" item md={6}>
                            <div>
                              <label className="font-weight-bold mb-2">
                                Sobrenome*
                              </label>
                              <TextField
                                onChange={(e) => handleChange(e)}
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder="Sobrenome"
                                name="last_name"
                                error={
                                  hasError === 'hasError' &&
                                  form.last_name === ''
                                }
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <div className="my-4">
                          Clicando no botão <strong>Criar Conta</strong> você
                          concorda com os{' '}
                          <a
                            href={TermosServico}
                            target="_blank"
                            style={{ textDecoration: 'underline' }}>
                            termos de serviço
                          </a>{' '}
                          e a{' '}
                          <a
                            href={PoliticaPrivacidade}
                            target="_blank"
                            style={{ textDecoration: 'underline' }}>
                            política de privacidade.
                          </a>
                        </div>
                        <div className="text-center mb-4">
                          <Button
                            onClick={() => sendRegister()}
                            className="btn-primary text-uppercase w-50 font-weight-bold font-size-sm my-3">
                            {loading ? (
                              <CircularProgress
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  color: 'white'
                                }}
                              />
                            ) : (
                              'Criar Conta'
                            )}
                          </Button>
                        </div>
                      </form>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      className="d-flex align-items-center justify-content-center flex-column">
                      <div className="p-3">
                        <div className="p-4">
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                            <div
                              className="mt-0 mt-xl-1"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem'
                              }}>
                              <Favorite
                                className="text-first"
                                style={{ marginRight: '10px' }}
                              />
                              <div className="text-black font-weight-bold font-size-lg">
                                Tweeze
                              </div>
                            </div>
                            <p className="mb-0 text-black-50">
                              As mais modernas tecnologias para captura, análise
                              e distribuição de informações.
                            </p>
                          </div>
                        </div>

                        <div className="p-4">
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                            <div
                              className="mt-0 mt-xl-1"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem'
                              }}>
                              <EmojiObjects
                                className="text-first"
                                style={{ marginRight: '10px' }}
                              />
                              <div className="text-black font-weight-bold font-size-lg">
                                Compromisso!
                              </div>
                            </div>
                            <p className="mb-0 text-black-50">
                              Nosso compromisso é deixar nossos clientes o mais
                              informado possível. Somente nos ultimos 4 meses
                              foram captadas aproximadamente 2 milhões de
                              notícias do Brasil e do mundo.
                            </p>
                          </div>
                        </div>

                        <div className="p-4">
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                            <div
                              className="mt-0 mt-xl-1"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem'
                              }}>
                              <Whatshot
                                className="text-first"
                                style={{ marginRight: '10px' }}
                              />
                              <div className="text-black font-weight-bold font-size-lg">
                                Novidades
                              </div>
                            </div>
                            <p className="mb-0 text-black-50">
                              Estamos continuamente trabalhando para levar aos
                              nossos clientes informações úteis sobre a marca e
                              temas de interesse. Em nossas próximas
                              atualizações, ampliaremos o serviço para mídias
                              sociais. Fique por dentro!
                            </p>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <div className="text-center d-block mb-3">
                    Copyright &copy; 2021 - Tweeze
                  </div>
                </Card>
              </Card>
            </Container>
          </div>
        </div>
        <Notify
          open={openNotify}
          handleClose={handleClose}
          msg={status.msg}
          type={status.type || 'error'}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  status: auth.status,
  isLogged: auth.isLogged
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ register, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageRegister);
