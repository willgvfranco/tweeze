import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Container,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Card,
  Button,
  List,
  ListItem,
  TextField,
  CircularProgress
} from '@material-ui/core';
import {
  ArrowBack,
  MailOutlineTwoTone,
  LockTwoTone,
  Favorite,
  Whatshot,
  EmojiObjects
} from '@material-ui/icons';

import SocialButtons from './SocialButtons';

import ConditionalRender from '../../components/ConditionalRender';
import Notify from '../../components/Notify';

import logoTweeze from '../../assets/images/logo/logo_twz_azul.png';
import hero6 from '../../assets/images/hero-bg/hero-1.jpg';
import PoliticaPrivacidade from '../../assets/pdf/Minuta_politica_de_privacidade.pdf';
import TermosServico from '../../assets/pdf/Minuta_termos_de_Servico.pdf';

import { login, loginWithToken, clearStatus } from '../../reducers/AuthDuck';
import { emailValidation } from '../../utils/validations';

const LoginForm = ({
  login,
  loginWithToken,
  isLogged,
  token,
  status,
  clearStatus
}) => {
  const [form, setForm] = useState({
    password: '',
    email: ''
  });
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState('');
  const [openNotify, setOpenNotify] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogged) {
      history.push('/noticias');
    }
    if (token !== null && !isLogged) {
      setLoading('token');
      loginWithToken(token);
    }
  }, [isLogged]);

  useEffect(() => {
    if (status.description.includes('login')) {
      setOpenNotify(true);
      setLoading('');
    }
  }, [status]);

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handleRemeberAccess = (event) => setChecked(event.target.checked);

  const handleLogin = () => {
    if (!emailValidation(form.email)) {
      return;
    }

    setLoading('login');
    login(form);
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
      <ConditionalRender conditional={loading === 'token'}>
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: `url(${hero6})` }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container>
                <Card className="rounded-sm modal-content p-3 bg-white-10">
                  <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column">
                        <NavLink
                          to="/"
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
                            alt="Tweeze logo"
                          />

                          <p className="mb-0 text-black-50">
                            Acesso ao Painel de Controle
                          </p>
                        </div>
                        <div className="py-4">
                          <div className="text-center cadastro-button-loginmidiassociais">
                            <SocialButtons></SocialButtons>
                          </div>
                          <div className="text-center text-black-50 py-2 mb-4">
                            ou entre com as suas credenciais
                          </div>
                          <div>
                            <div className="mb-4">
                              <TextField
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                id="textfield-email"
                                label="Email"
                                name="email"
                                error={
                                  !emailValidation(form.email) &&
                                  form.email !== ''
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MailOutlineTwoTone />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <div className="mb-3">
                              <TextField
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                id="textfield-password"
                                label="Password"
                                name="password"
                                type="password"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LockTwoTone />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={checked}
                                    onChange={handleRemeberAccess}
                                    value="checked"
                                    color="primary"
                                  />
                                }
                                className="font-size-md"
                                label="Lembrar acesso"
                              />
                              <div>
                                <NavLink
                                  className="text-first"
                                  to="/recuperar-senha">
                                  Recupere a sua senha
                                </NavLink>
                              </div>
                            </div>
                            <div className="text-center py-4">
                              <Button
                                onClick={handleLogin}
                                className="btn-second font-weight-bold w-50 my-2">
                                {loading === 'login' ? (
                                  <CircularProgress
                                    style={{
                                      width: '18px',
                                      height: '18px',
                                      color: 'white'
                                    }}
                                  />
                                ) : (
                                  'Logar!'
                                )}
                              </Button>
                            </div>
                            <div className="text-center text-black-50 mt-3">
                              Não tem uma conta?{' '}
                              <NavLink
                                className="nav-link-simple"
                                to="/cadastro">
                                Crie aqui.
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column bg-secondary">
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
                                As mais modernas tecnologias para captura,
                                análise e distribuição de informações.
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
                                Nosso compromisso é deixar nossos clientes o
                                mais informado possível. Somente nos ultimos 4
                                meses foram captadas aproximadamente 2 milhões
                                de notícias do Brasil e do mundo.
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
                                nossos clientes informações úteis sobre a marca
                                e temas de interesse. Em nossas próximas
                                atualizações, ampliaremos o serviço para mídias
                                sociais. Fique por dentro!
                              </p>
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
                  <a href={PoliticaPrivacidade} target="_blank">
                    <ListItem button className="text-white-50">
                      Política de privacidade
                    </ListItem>
                  </a>
                  <a href={TermosServico} target="_blank">
                    <ListItem button className="text-white-50">
                      Termos de serviço
                    </ListItem>
                  </a>
                </List>
              </div>
            </Container>
          </div>
        </div>
        <Notify
          open={openNotify}
          handleClose={handleClose}
          msg={status.msg}
          type={status.type || 'error'}
        />
      </ConditionalRender>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLogged: auth.isLogged,
  token: auth.accessToken,
  status: auth.status
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login, loginWithToken, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
