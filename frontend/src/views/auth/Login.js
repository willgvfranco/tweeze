import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  TextField
} from '@material-ui/core';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';

import logoTweeze from '../../assets/images/logo/logo_twz_azul.png';
import { login } from '../../reducers/AuthDuck';
import hero6 from '../../assets/images/hero-bg/hero-1.jpg';

const LoginForm = ({ login }) => {
  const [form, setForm] = useState({
    password: '',
    email: ''
  });
  const [checked1, setChecked] = useState(true);

  const history = useHistory();
  const isLogged = useSelector(({ auth }) => auth.isLogged);

  useEffect(() => {
    if (isLogged) {
      history.push('/home');
    }
  }, [isLogged]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    const field = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [field]: value });
  };

  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: 'url(' + hero6 + ')' }}
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
                          <div className="text-center mb-3">
                            <Button
                              className="m-2 btn-pill px-4 font-weight-bold btn-google"
                              size="small">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fab', 'google']} />
                              </span>
                              <span className="btn-wrapper--label">
                                Login com Google
                              </span>
                            </Button>
                            <Button
                              className="m-2 btn-pill px-4 font-weight-bold btn-facebook"
                              size="small">
                              <span className="btn-wrapper--icon">
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                              </span>
                              <span className="btn-wrapper--label">
                                Login com Facebook
                              </span>
                            </Button>
                          </div>
                          <div className="text-center text-black-50 py-2 mb-4">
                            ou entre com as suas credenciais
                          </div>
                          <div>
                            <div className="mb-4">
                              <TextField
                                onChange={(event) => {
                                  handleChange(event);
                                }}
                                fullWidth
                                variant="outlined"
                                id="textfield-email"
                                label="Email"
                                name="email"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <MailOutlineTwoToneIcon />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <div className="mb-3">
                              <TextField
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                fullWidth
                                variant="outlined"
                                id="textfield-password"
                                label="Password"
                                name="password"
                                type="password"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LockTwoToneIcon />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={checked1}
                                    onChange={handleChange}
                                    value="checked"
                                    color="primary"
                                  />
                                }
                                className="font-size-md"
                                label="Lembrar acesso"
                              />
                              <div>
                                <a
                                  className="text-first"
                                  href="#/"
                                  onClick={(e) => e.preventDefault()}>
                                  Recupere a sua senha
                                </a>
                              </div>
                            </div>
                            <div className="text-center py-4">
                              <Button
                                onClick={() => login(form)}
                                className="btn-second font-weight-bold w-50 my-2">
                                Logar!
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
                                  com foco no processamento de linguagem
                                  natural. Do Brasil para o mundo, antenada,
                                  conectada e extremamente rápida. Jul.IA está
                                  presente em todo o nosso sistema,
                                  gerenciamento marcas e auxiliando na
                                  identificação de potenciais crises.
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
                    Termos de serviço
                  </ListItem>
                </List>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ login }, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
