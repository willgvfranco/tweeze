import React, { useState, useEffect } from 'react';
import MaskedInput from 'react-maskedinput';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Grid,
  Container,
  Card,
  List,
  ListItem,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import Notify from '../components/Notify';
import hero3 from '../assets/images/hero-bg/hero-5.jpg';

import { sendForm, clearStatus } from '../reducers/ContactDuck';
import { emailValidation } from '../utils/validations';

const PhoneMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask="(11) 11111-1111"
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
    />
  );
};

const PageRegister = ({ sendForm, status, clearStatus }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [news, setNews] = useState(false);
  const [social, setSocial] = useState(false);
  const [radio, setRadio] = useState(false);
  const [tv, setTv] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);

  useEffect(() => {
    if (status.description.includes('sendForm')) {
      setOpenNotify(true);
      setLoading(false);
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotify(false);
    clearStatus();
  };

  const hasEmptyFields = () => {
    if (!name || !company || !job || !email || !phone || !message) {
      return true;
    }
    return false;
  };

  const handleSend = () => {
    if (hasEmptyFields() || !emailValidation(email)) {
      return;
    }
    setLoading(true);
    sendForm({
      name,
      company,
      job,
      email,
      phone,
      features: { news, social, radio, tv },
      message
    });
  };

  const handleDisableSend = () => {
    if (hasEmptyFields() || !emailValidation(email)) {
      return true;
    }

    return false;
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
                <Card
                  className="rounded-sm shadow-none font-size-sm"
                  style={{ padding: '7rem 5rem' }}>
                  <Grid container spacing={0}>
                    <NavLink
                      to="/"
                      className="mr-auto ml-1 mt-2"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '4rem',
                        position: 'relative',
                        top: '-75px'
                      }}>
                      <ArrowBack />
                      <span style={{ fontSize: '1rem' }}>voltar</span>
                    </NavLink>
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '2rem'
                      }}>
                      <Typography variant="h3" gutterBottom color="primary">
                        Formulário de Contato
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        id="fulllname"
                        label="Nome Completo"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        id="company"
                        label="Nome da Empresa"
                        variant="outlined"
                        fullWidth
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        id="job"
                        label="Cargo ou Função"
                        variant="outlined"
                        fullWidth
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        fullWidth
                        variant="outlined"
                        id="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!emailValidation(email) && email !== ''}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        id="phone"
                        InputProps={{
                          inputComponent: PhoneMask
                        }}
                        label="Telefone"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} className="m-2">
                      <FormControl
                        component="fieldset"
                        style={{ margin: '1rem 0' }}>
                        <FormLabel component="legend">
                          O que a sua empresa precisa monitorar?
                        </FormLabel>
                        <FormGroup>
                          <Grid container spacing={0}>
                            <Grid item xs={12} lg={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => setNews(e.target.checked)}
                                    checked={news}
                                    name="news"
                                    color="primary"
                                  />
                                }
                                label="Notícias em sites jornalísticos?"
                              />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) =>
                                      setSocial(e.target.checked)
                                    }
                                    checked={social}
                                    name="social"
                                    color="primary"
                                  />
                                }
                                label="Notícias em mídias sociais?"
                              />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => setRadio(e.target.checked)}
                                    checked={radio}
                                    name="radio"
                                    color="primary"
                                  />
                                }
                                label="Notícias de Rádio?"
                              />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onChange={(e) => setTv(e.target.checked)}
                                    checked={tv}
                                    name="tv"
                                    color="primary"
                                  />
                                }
                                label="Notícias de Televisão?"
                              />
                            </Grid>
                          </Grid>
                        </FormGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        className="m-2"
                        id="message"
                        label="Mensagem"
                        multiline
                        fullWidth
                        rows={6}
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSend}
                        disabled={handleDisableSend()}
                        style={{
                          width: '40%',
                          fontSize: '22px',
                          marginTop: '2rem'
                        }}>
                        {loading ? (
                          <CircularProgress
                            style={{
                              width: '18px',
                              height: '18px',
                              color: 'white'
                            }}
                          />
                        ) : (
                          'Enviar'
                        )}
                      </Button>
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

const mapStateToProps = ({ contact }) => ({ status: contact.status });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendForm, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageRegister);
