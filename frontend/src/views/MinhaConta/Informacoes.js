import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import 'date-fns';

import {
  TextField,
  Card,
  CardHeader,
  Grid,
  Button,
  CircularProgress
} from '@material-ui/core';
import { ArrowBack, AccountCircle } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import PageTitle from '../../components/PageTitle';
import Notify from '../../components/Notify';

import { changePersonalInfo, clearStatus } from '../../reducers/AuthDuck';
import {
  CpfValidation,
  PhoneValidation,
  CepValidation
} from 'utils/validations';

const Informacoes = ({ changePersonalInfo, user, status, clearStatus }) => {
  const history = useHistory();
  const [openNotify, setOpenNotify] = useState(false);
  const [loading, setLoading] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [physicalForm, setPhysicalForm] = useState({
    first_name: '',
    last_name: '',
    cpf: '',
    telefone: '',
    endereco: '',
    complemento: '',
    cep: ''
  });
  const [legalForm, setLegalForm] = useState({
    nome_empresarial: '',
    nome_fantasia: '',
    cnpj: '',
    inscricao_estadual: ''
  });

  useEffect(() => {
    if (user?.id) {
      setSelectedDate(user?.data_nascimento || null);
      setPhysicalForm({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        cpf: user?.cpf || '',
        telefone: user?.telefone || '',
        endereco: user?.endereco || '',
        complemento: user?.complemento || '',
        cep: user?.cep || ''
      });
      setLegalForm({
        nome_empresarial: user?.nome_empresarial || '',
        nome_fantasia: user?.nome_fantasia || '',
        cnpj: user?.cnpj || '',
        inscricao_estadual: user?.inscricao_estadual || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (status.description.includes('changePersonalInfo')) {
      setOpenNotify(true);
      setLoading('');
    }
  }, [status]);

  const handleDateChange = (date) => setSelectedDate(date);

  const handlePhysicalFormChange = (event) => {
    if (event.target.id === 'cpf') {
      const cpf = CpfValidation(event);
      if (cpf || cpf === '') {
        setPhysicalForm({
          ...physicalForm,
          [event.target.id]: cpf
        });
      }
      return;
    }
    if (event.target.id === 'telefone') {
      const telefone = PhoneValidation(event);
      if (telefone || telefone === '') {
        setPhysicalForm({
          ...physicalForm,
          [event.target.id]: telefone
        });
      }
      return;
    }
    if (event.target.id === 'cep') {
      const cep = CepValidation(event);
      if (cep || cep === '') {
        setPhysicalForm({
          ...physicalForm,
          [event.target.id]: cep
        });
      }
      return;
    }
    setPhysicalForm({
      ...physicalForm,
      [event.target.id]: event.target.value
    });
  };

  const handleLegalFormChange = (event) => {
    setLegalForm({
      ...legalForm,
      [event.target.id]: event.target.value
    });
  };

  const handlePhysicalFormSend = () => {
    setLoading('physical');
    if (selectedDate) {
      changePersonalInfo({ ...physicalForm, data_nascimento: selectedDate });
      return;
    }
    changePersonalInfo(physicalForm);
  };

  const handleLegalFormSend = () => {
    setLoading('legal');
    changePersonalInfo(legalForm);
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
        titleHeading="Informações da Conta"
        titleDescription="Alterar informações pessoais e/ou financeiras"
        icon={<AccountCircle />}
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

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card
            className="rounded w-100 bg-white p-3"
            style={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Pessoa Física" />

            <Grid container spacing={2} style={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="first_name"
                  label="Primeiro Nome"
                  value={physicalForm.first_name}
                  onChange={handlePhysicalFormChange}
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <TextField
                  className="m-2"
                  id="last_name"
                  value={physicalForm.last_name}
                  onChange={handlePhysicalFormChange}
                  label="Sobrenome"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="cpf"
                  value={physicalForm.cpf}
                  onChange={handlePhysicalFormChange}
                  label="CPF"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                  <KeyboardDatePicker
                    style={{
                      width: '45%',
                      marginTop: '8px',
                      marginLeft: '4px'
                    }}
                    variant="inline"
                    disableFuture
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="birthdate"
                    label="Data de Nascimento"
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="telefone"
                  value={physicalForm.telefone}
                  onChange={handlePhysicalFormChange}
                  label="Telefone"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="endereco"
                  value={physicalForm.endereco}
                  onChange={handlePhysicalFormChange}
                  label="Endereço"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="complemento"
                  value={physicalForm.complemento}
                  onChange={handlePhysicalFormChange}
                  label="Complemento"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <TextField
                  className="m-2"
                  id="cep"
                  label="CEP"
                  value={physicalForm.cep}
                  onChange={handlePhysicalFormChange}
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              className="btn-primary w-25 m-2 ml-auto mt-auto"
              onClick={handlePhysicalFormSend}>
              {loading === 'physical' ? (
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
        </Grid>

        <Grid item xs={6}>
          <Card
            className="rounded w-100 bg-white p-3 h-100"
            style={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Pessoa Jurídica" />

            <Grid container spacing={2} style={{ marginBottom: '2rem' }}>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="nome_empresarial"
                  onChange={handleLegalFormChange}
                  label="Nome Empresarial"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="nome_fantasia"
                  onChange={handleLegalFormChange}
                  label="Nome de Fantasia"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="cnpj"
                  onChange={handleLegalFormChange}
                  label="CNPJ"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="inscricao_estadual"
                  onChange={handleLegalFormChange}
                  label="Inscrição Estadual"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className="btn-primary w-25 m-2 ml-auto mt-auto"
              onClick={handleLegalFormSend}>
              {loading === 'legal' ? (
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
        </Grid>
      </Grid>

      <Notify
        open={openNotify}
        handleClose={handleClose}
        msg={status.msg}
        type={status.type || 'error'}
      />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth, status: auth.status });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changePersonalInfo, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Informacoes);
