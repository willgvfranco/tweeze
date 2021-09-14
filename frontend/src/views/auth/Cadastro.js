import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  Card,
  Button,
  List,
  ListItem,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import SocialButtons from './SocialButtons';
import Notify from '../../components/Notify';

import { register, clearStatus } from '../../reducers/AuthDuck';
import { emailValidation } from '../../utils/validations';

import hero3 from '../../assets/images/hero-bg/hero-5.jpg';
import logoTweeze from '../../assets/images/logo/logo_twz_azul.png';

const PageRegister = ({ register, clearStatus, status }) => {
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
          <div className="bg-composed-wrapper--content p-3 p-md-5">
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
                      <div className="text-center mt-5">
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
                        className="px-5 py-4">
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
                          concorda com os termos de serviço e a política de
                          privacidade.
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
                          <div className="d-block d-xl-flex">
                            <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                              <FontAwesomeIcon
                                icon={['far', 'heart']}
                                className="font-size-xl text-first"
                              />
                            </div>
                            <div className="pl-0 pl-xl-3">
                              <div className="text-black font-weight-bold font-size-lg mb-1">
                                Tweeze
                              </div>
                              <p className="mb-0 text-black-50">
                                As mais modernas tecnologias para captura,
                                análise e distribuição de informações.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="d-block d-xl-flex">
                            <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                              <FontAwesomeIcon
                                icon={['far', 'lightbulb']}
                                className="font-size-xl text-first"
                              />
                            </div>
                            <div className="pl-0 pl-xl-3">
                              <div className="text-black font-weight-bold font-size-lg mb-1">
                                Compromisso!
                              </div>
                              <p className="mb-0 text-black-50">
                                Nosso compromisso é deixar nossos clientes o
                                mais informado possível. Somente nos ultimos 4
                                meses foram captadas aproximadamente 2 milhões
                                de notícias do Brasil e do mundo.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="d-block d-xl-flex">
                            <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                              <FontAwesomeIcon
                                icon={['far', 'user']}
                                className="font-size-xl text-first"
                              />
                            </div>
                            <div className="pl-0 pl-xl-3">
                              <div className="text-black font-weight-bold font-size-lg mb-1">
                                Jul.IA
                              </div>
                              <p className="mb-0 text-black-50">
                                Jul.IA é inteligência artificial desenvolvida
                                com foco no processamento de linguagem natural.
                                Do Brasil para o mundo, antenada, conectada e
                                extremamente rápida. Jul.IA está presente em
                                todo o nosso sistema, gerenciamento marcas e
                                auxiliando na identificação de potenciais
                                crises.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Card>
            </Container>
          </div>
        </div>
        <div className="hero-footer w-100 pb-4">
          <Container>
            <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
              <div className="text-center d-block mb-3 mb-md-0 text-white">
                Copyright &copy; 2021 - Tweeze
              </div>
              <List
                component="div"
                className="nav-transparent text-nowrap d-flex justify-content-center">
                <ListItem
                  button
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Política de privacidade
                </ListItem>
                <ListItem
                  button
                  className="text-white-50"
                  href="#/"
                  onClick={(e) => e.preventDefault()}>
                  Termos de Serviço
                </ListItem>
              </List>
            </div>
          </Container>

          <Notify
            open={openNotify}
            handleClose={handleClose}
            msg={status.msg}
            type={status.type || 'error'}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  status: auth.status
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ register, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageRegister);
