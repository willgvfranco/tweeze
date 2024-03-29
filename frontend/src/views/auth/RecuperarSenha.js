import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputAdornment,
  Card,
  Button,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { ArrowBack, MailOutlineTwoTone, LockTwoTone } from '@material-ui/icons';

import Notify from '../../components/Notify';

import particles3 from '../../assets/images/hero-bg/particles-3.svg';
import logoTweeze from '../../assets/images/logo/logo_twz_azul.png';

import {
  passwordEmailSend,
  passwordChange,
  clearStatus
} from '../../reducers/AuthDuck';
import { emailValidation } from '../../utils/validations';

const PageRecover = ({
  passwordEmailSend,
  passwordChange,
  status,
  clearStatus
}) => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [hasError, setHasError] = useState('');
  const [openNotify, setOpenNotify] = useState(false);

  useEffect(() => {
    if (
      status.description.includes('passwordEmailSend') ||
      status.description.includes('passwordChange')
    ) {
      setOpenNotify(true);
      setLoading(false);
    }
  }, [status]);

  const params = new URLSearchParams(window.location.search);
  const auth = params.get('auth');

  const sendEmailHandler = () => {
    setHasError('');
    if (!emailValidation(email)) {
      setHasError('email');
      return;
    }
    setLoading(true);
    passwordEmailSend(email);
  };

  const changePasswordHandler = () => {
    setHasError('');
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      setHasError('password');
      return;
    }
    setLoading(true);
    passwordChange({ password, accessToken: auth });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotify(false);
    clearStatus();
  };

  const handleInputRender = () => {
    if (!auth) {
      return (
        <TextField
          fullWidth
          variant="outlined"
          id="textfield-email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          error={hasError === 'email'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineTwoTone />
              </InputAdornment>
            )
          }}
        />
      );
    }
    return (
      <>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '20px' }}
          variant="outlined"
          fullWidth
          placeholder="Entre com a sua senha"
          type="password"
          name="password"
          label="Senha"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockTwoTone />
              </InputAdornment>
            )
          }}
          error={password !== passwordConfirm || hasError === 'password'}
        />
        <TextField
          onChange={(e) => setPasswordConfirm(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Entre com a sua senha"
          type="password"
          name="password_confirm"
          label="Confirmar senha"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockTwoTone />
              </InputAdornment>
            )
          }}
          error={password !== passwordConfirm || hasError === 'password'}
        />
      </>
    );
  };

  const handleButtonRender = () => {
    if (!auth) {
      return (
        <Button
          fullWidth
          className="text-uppercase font-weight-bold font-size-sm mt-4 btn-primary"
          onClick={sendEmailHandler}>
          {loading ? (
            <CircularProgress
              style={{
                width: '18px',
                height: '18px',
                color: 'white'
              }}
            />
          ) : (
            'Enviar senha!'
          )}
        </Button>
      );
    }
    return (
      <Button
        fullWidth
        className="text-uppercase font-weight-bold font-size-sm mt-4 btn-primary"
        onClick={changePasswordHandler}>
        {loading ? (
          <CircularProgress
            style={{
              width: '18px',
              height: '18px',
              color: 'white'
            }}
          />
        ) : (
          'Enviar senha!'
        )}
      </Button>
    );
  };

  return (
    <div className="app-wrapper min-vh-100 bg-white">
      <div className="hero-wrapper w-100 bg-composed-wrapper bg-second min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-6"
            style={{ backgroundImage: `url(${particles3})` }}
          />
          <div className="bg-composed-wrapper--bg bg-light-pure opacity-2" />
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
                          alt=""></img>
                        <h1 className="display-4 mb-1 font-weight-bold">
                          Recuperação de Senha
                        </h1>
                        <p className="font-size-lg mb-0 text-black-50">
                          Esqueceu a sua senha? Vamos te ajudar!
                        </p>
                      </div>
                      <div className="p-5 w-100">
                        <div>{handleInputRender()}</div>
                        <div className="text-center mb-4">
                          {handleButtonRender()}
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
  bindActionCreators(
    { passwordEmailSend, passwordChange, clearStatus },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PageRecover);
