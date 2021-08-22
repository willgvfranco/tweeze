import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Card,
  CardHeader,
  Grid,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  CircularProgress
} from '@material-ui/core';
import {
  ArrowBack,
  Visibility,
  VisibilityOff,
  Security
} from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';

import { passwordChange, setStatus } from '../../reducers/AuthDuck';

const Informacoes = ({ passwordChange, token, status, setStatus }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (status !== '') {
      setLoading(false);
    }
    if (status === 'password') {
      setPassword('');
      setPasswordConfirm('');
    }
    return () => {
      if (status === 'password') {
        setStatus('');
      }
    };
  }, [status]);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const handleMouseDown = (event) => event.preventDefault();

  const changePasswordHandler = () => {
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      return;
    }
    setLoading(true);
    passwordChange({ password, token });
  };

  const Warning = () => {
    if (loading) {
      return (
        <CircularProgress
          style={{
            width: '24px',
            height: '24px'
          }}
        />
      );
    }
    if (status === 'password') {
      return (
        <div style={{ color: 'green', fontSize: '1rem', paddingLeft: '1rem' }}>
          Senha alterada com sucesso!
        </div>
      );
    }
    if (status === 'passwordChange') {
      return (
        <div style={{ color: 'red', fontSize: '1rem', paddingLeft: '1rem' }}>
          Erro ao enviar a solicitação.. Tente novamente mais tarde
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <PageTitle
        titleHeading="Segurança"
        titleDescription="Alterar dados sensíveis"
        icon={<Security />}
        action={
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}>
            <ArrowBack style={{ marginRight: '0.5rem' }} />
            Voltar
          </a>
        }
      />

      <Card
        className="rounded bg-white p-3 h-100"
        style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
        <CardHeader title="Segurança" />
        <Grid container spacing={2}>
          <Grid item xs={12} className="mb-5">
            <FormControl variant="outlined" style={{ width: '45%' }}>
              <InputLabel
                htmlFor="password"
                style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}>
                Alterar senha
              </InputLabel>
              <OutlinedInput
                className="m-2"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDown}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={110}
              />
            </FormControl>

            <FormControl variant="outlined" style={{ width: '45%' }}>
              <InputLabel
                htmlFor="password-confirm"
                style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}>
                Confirmar nova senha
              </InputLabel>
              <OutlinedInput
                className="m-2"
                id="password-confirm"
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle passwordConfirm visibility"
                      onClick={handleShowPasswordConfirm}
                      onMouseDown={handleMouseDown}>
                      {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={170}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Warning />

        <Button
          variant="contained"
          className="btn-primary m-2 ml-auto mt-auto"
          onClick={changePasswordHandler}>
          Salvar alterações
        </Button>
      </Card>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  status: auth.status,
  token: auth.token
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ passwordChange, setStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Informacoes);
