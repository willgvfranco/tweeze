import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import 'date-fns';

import {
  TextField,
  Card,
  CardHeader,
  Grid,
  Button,
  OutlinedInput
} from '@material-ui/core';
import { ArrowBack, AccountCircle } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import PageTitle from '../../components/PageTitle';

import { CpfValidation } from 'utils/validations';

const TextMaskPhone = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '+',
        '5',
        '5',
        ' ',
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
      guide={true}
    />
  );
};

const Informacoes = () => {
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [physicalForm, setPhysicalForm] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    phone: '',
    address: '',
    complement: '',
    cep: ''
  });
  const [legalForm, setLegalForm] = useState({
    enterpriseName: '',
    fantasyName: '',
    cnpj: '',
    stateRegistration: ''
  });

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
                  id="firstName"
                  label="Primeiro Nome"
                  value={physicalForm.firstName}
                  onChange={handlePhysicalFormChange}
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <TextField
                  className="m-2"
                  id="lastName"
                  value={physicalForm.lastName}
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
                <OutlinedInput
                  className="m-2"
                  style={{ width: '45%' }}
                  value={physicalForm.phone}
                  onChange={handlePhysicalFormChange}
                  name="phone"
                  id="phone"
                  inputComponent={TextMaskPhone}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="address"
                  value={physicalForm.address}
                  onChange={handlePhysicalFormChange}
                  label="Endereço"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="complement"
                  value={physicalForm.complement}
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
              className="btn-primary m-2 ml-auto mt-auto">
              Salvar alterações
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
                  id="enterpriseName"
                  onChange={handleLegalFormChange}
                  label="Nome Empresarial"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="fantasyName"
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
                  id="stateRegistration"
                  onChange={handleLegalFormChange}
                  label="Inscrição Estadual"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className="btn-primary m-2 ml-auto mt-auto">
              Salvar alterações
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Informacoes;
