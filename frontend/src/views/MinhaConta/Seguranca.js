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
import Notify from '../../components/Notify';

import { passwordChange, clearStatus } from '../../reducers/AuthDuck';

const Informacoes = ({ passwordChange, token, status, clearStatus }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (status.description.includes('passwordChange')) {
      setOpenNotify(true);
      setLoading(false);

      if (status.type === 'success') {
        setPassword('');
        setPasswordConfirm('');
      }
    }
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
    passwordChange({ password, accessToken: token });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotify(false);
    clearStatus();
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

        <Button
          variant="contained"
          className="btn-primary w-25 m-2 ml-auto mt-auto"
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
            'Salvar alterações'
          )}
        </Button>
      </Card>

      <Notify
        open={openNotify}
        handleClose={handleClose}
        msg={status.msg}
        type={status.type || 'error'}
      />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  status: auth.status,
  token: auth.accessToken
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ passwordChange, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Informacoes);
