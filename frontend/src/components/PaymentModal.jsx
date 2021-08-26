import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import 'date-fns';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Dialog,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import Select from './Select';

import { sendPayment } from '../reducers/AuthDuck';

import svgImage1 from '../assets/images/illustrations/pack4/business_plan.svg';
import svgImage2 from '../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage3 from '../assets/images/illustrations/pack4/powerful.svg';

import {
  creditCardValidation,
  CpfValidation,
  PhoneValidation,
  emailValidation,
  GetCardType
} from '../utils/validations';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: '80vw',
    maxWidth: 'none',
    [theme.breakpoints.down('md')]: {
      width: '95vw',
      margin: '10px'
    },
    '& > div': {
      [theme.breakpoints.down('lg')]: {
        overflowY: 'auto'
      }
    }
  },
  planWrapper: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'initial'
    }
  },
  planList: {
    marginBottom: '0',
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  imgWrapperClass: {
    marginBottom: '3rem',
    [theme.breakpoints.down('lg')]: {
      width: '50%',
      marginBottom: '0'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  imgClass: {
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      width: '25%'
    }
  },
  sameUserClass: {
    opacity: 0.5
  }
}));

const Subscription = ({ selectedPlan, goBack, sendPayment }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [cardBirthday, setCardBirthday] = useState(null);
  const [creditCardForm, setCreditCardForm] = useState({
    cardNumber: '',
    cardOwner: '',
    cardBrand: '',
    cardCvv: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    cardCpf: '',
    email: '',
    number: ''
  });
  const [userInfoForm, setUserInfoForm] = useState({
    name: '',
    cpf: '',
    address: ''
  });

  const handleDateChange = (date) => setCardBirthday(date);

  const handleCardFormChange = (event) => {
    if (event.target.id === 'cardCvv') {
      if (event.target.value.length <= 4 && !isNaN(event.target.value)) {
        setCreditCardForm({
          ...creditCardForm,
          [event.target.id]: event.target.value
        });
      }
      return;
    }

    if (event.target.id === 'cardNumber') {
      const cardNumber = creditCardValidation(event);
      if (cardNumber || cardNumber === '') {
        setCreditCardForm({
          ...creditCardForm,
          [event.target.id]: cardNumber,
          cardBrand: GetCardType(cardNumber) || ''
        });
      }
      return;
    }

    if (event.target.id === 'cardCpf') {
      const cardCpf = CpfValidation(event);
      if (cardCpf || cardCpf === '') {
        setCreditCardForm({
          ...creditCardForm,
          [event.target.id]: cardCpf
        });
      }
      return;
    }
    if (event.target.id === 'number') {
      const number = PhoneValidation(event);
      if (number || number === '') {
        setCreditCardForm({
          ...creditCardForm,
          [event.target.id]: number
        });
      }
      return;
    }
    setCreditCardForm({
      ...creditCardForm,
      [event.target.id || event.target.name]: event.target.value
    });
  };

  const handleUserFormChange = (event) => {
    if (event.target.id === 'cpf') {
      const cpf = CpfValidation(event);
      if (cpf || cpf === '') {
        setUserInfoForm({
          ...userInfoForm,
          [event.target.id]: cpf
        });
      }
      return;
    }

    setUserInfoForm({
      ...userInfoForm,
      [event.target.id]: event.target.value
    });
  };

  const isEmpty = (type) => {
    if (type === 'creditCardForm') {
      return (
        creditCardForm.cardNumber === '' ||
        creditCardForm.cardOwner === '' ||
        creditCardForm.cardExpirationMonth === '' ||
        creditCardForm.cardExpirationYear === '' ||
        creditCardForm.cardExpirationYear === '' ||
        creditCardForm.cardCpf === '' ||
        creditCardForm.cardCvv === '' ||
        creditCardForm.email === '' ||
        creditCardForm.number === '' ||
        !cardBirthday
      );
    }
    if (type === 'userInfoForm') {
      return (
        userInfoForm.name === '' ||
        userInfoForm.cpf === '' ||
        userInfoForm.address === ''
      );
    }
  };

  const hasEmptyFields = () => {
    if (checked) {
      return isEmpty('creditCardForm') || isEmpty('userInfoForm');
    }
    return isEmpty('creditCardForm');
  };

  const handleSend = () => {
    if (hasEmptyFields()) {
      return;
    }

    if (checked) {
      sendPayment({
        ...creditCardForm,
        ...cardBirthday,
        ...userInfoForm
      });
    } else {
      sendPayment({
        ...creditCardForm,
        ...cardBirthday
      });
    }
  };

  return (
    <Card
      style={{
        display: 'flex',
        padding: '2rem 12rem 5rem 12rem',
        flexDirection: 'column'
      }}
      className="rounded w-100 bg-white mt-3">
      <CardHeader title={`Plano selecionado: ${selectedPlan}`} />
      <CardHeader
        subheader={<a href="#">Voltar</a>}
        onClick={(e) => {
          e.preventDefault();
          goBack();
        }}
        style={{
          position: 'absolute',
          top: '1px',
          left: '2%'
        }}
      />
      <Grid container spacing={2}>
        <Grid item xl={12}>
          <CardHeader subheader="Forma de pagamento" />
          <TextField
            className="m-2"
            id="cardNumber"
            value={creditCardForm.cardNumber}
            onChange={(e) => handleCardFormChange(e)}
            label="Número do cartão"
            variant="outlined"
            style={{ width: '45%' }}
          />
          <TextField
            className="m-2"
            id="cardOwner"
            value={creditCardForm.cardOwner}
            onChange={handleCardFormChange}
            label="Nome do Titular"
            variant="outlined"
            style={{ width: '45%' }}
          />
          <TextField
            className="m-2"
            id="cardCvv"
            value={creditCardForm.cardCvv}
            onChange={handleCardFormChange}
            label="Código de segurança"
            variant="outlined"
            style={{ width: '45%' }}
          />
          <Select
            className="m-2"
            style={{ width: '8rem' }}
            name="cardExpirationMonth"
            onChange={handleCardFormChange}
            labelId="cardExpirationMonth"
            label="Mês"
            value={creditCardForm.cardExpirationMonth}
            items={['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          />
          <Select
            className="m-2 ml-auto"
            style={{ width: '8rem' }}
            name="cardExpirationYear"
            onChange={handleCardFormChange}
            labelId="cardExpirationYear"
            label="Ano"
            value={creditCardForm.cardExpirationYear}
            items={[
              '',
              2022,
              2023,
              2024,
              2025,
              2026,
              2027,
              2028,
              2029,
              2030,
              2031,
              2032
            ]}
          />
          <TextField
            className="m-2"
            id="cardCpf"
            value={creditCardForm.cardCpf}
            onChange={handleCardFormChange}
            label="CPF"
            variant="outlined"
            style={{ width: '45%', marginRight: 'auto' }}
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
              value={cardBirthday}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            className="m-2"
            id="email"
            label="E-mail"
            value={creditCardForm.email}
            onChange={handleCardFormChange}
            variant="outlined"
            type="email"
            error={
              !!creditCardForm.email && !emailValidation(creditCardForm.email)
            }
            style={{ width: '45%' }}
          />
          <TextField
            className="m-2"
            id="number"
            value={creditCardForm.number}
            onChange={handleCardFormChange}
            label="Telefone"
            variant="outlined"
            style={{ width: '45%' }}
          />
        </Grid>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            />
          }
          style={{ marginLeft: '0.5rem' }}
          label="Mesma titularidade"
        />

        <Grid item xs={12}>
          <TextField
            className={`m-2 ${!checked && classes.sameUserClass}`}
            id="name"
            label="Nome"
            value={userInfoForm.name}
            onChange={handleUserFormChange}
            variant="outlined"
            style={{ width: '45%' }}
            disabled={!checked}
          />

          <TextField
            className={`m-2 ${!checked && classes.sameUserClass}`}
            id="cpf"
            value={userInfoForm.cpf}
            onChange={handleUserFormChange}
            label="CPF"
            variant="outlined"
            style={{ width: '45%' }}
            disabled={!checked}
          />
          <TextField
            className={`m-2 ${!checked && classes.sameUserClass}`}
            id="address"
            value={userInfoForm.address}
            onChange={handleUserFormChange}
            label="Endereço"
            variant="outlined"
            style={{ width: '93%' }}
            disabled={!checked}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        className="btn-primary"
        onClick={handleSend}
        disabled={hasEmptyFields()}
        style={{
          margin: '5rem auto 0 auto',
          width: '20rem',
          fontSize: '1.2rem'
        }}>
        Enviar pagamento
      </Button>
    </Card>
  );
};

const PaymentModal = ({ open, onClose, sendPayment }) => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState('');

  const Plans = () => (
    <Card className="modal-content tweeze-scrollbar">
      <div
        className="bg-light d-flex"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <div id="planos" className="text-center my-3">
          <div className="display-4 text-black font-weight-bold">
            Planos e preços
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="container-fluid">
          <Grid container spacing={6}>
            <Plan
              title="Básico"
              description="Cientistas, curiosos e profissionais interessados no mercado financeiro"
              img={svgImage1}
              handleClick={() => setSelectedPlan('Básico - R$ 49/mês')}
              value="R$ 49/mês"
              features={[
                'Trial de 30 dias',
                'Acesso à 2 grupos de palavras chaves ILIMITADAS',
                'Support',
                'Sem Ads'
              ]}
            />
            <Plan
              title="Padrão"
              description="Produto destinado a pequenas e médias empresas"
              img={svgImage2}
              handleClick={() => setSelectedPlan('Padrão - R$ 590/mês')}
              value="R$ 590/mês"
              features={[
                'Trial de 30 dias',
                'Acesso à 5 grupos de palavras chaves ILIMITADAS',
                'Relatório de Clipping com business intelligence',
                'Sem Ads',
                'Suport Premium',
                'Envio de e-mail automatizado'
              ]}
            />
            <Plan
              title="Ilimitado"
              description="Destinado a assessoria de imprensa, agências e marcas"
              img={svgImage3}
              handleClick={() => setSelectedPlan('Ilimitado')}
              value="Sob Consulta"
              features={[
                'Trial de 30 dias',
                'Mídias sociais',
                'Grupos ilimitados de palavras chaves',
                'Automatização por e-mail',
                'Inteligência artificial - alerta de gerênciamento de crise',
                'API de integração do nosso sistema'
              ]}
            />
          </Grid>
        </div>
      </CardContent>
    </Card>
  );

  const Plan = ({ title, description, img, handleClick, value, features }) => (
    <Grid item xl={4}>
      <div className="divider-v divider-v-lg" />
      <div className={`py-3 ${classes.planWrapper}`}>
        <div
          className={`feature-box text-center mt-2 ${classes.imgWrapperClass}`}>
          <img
            src={img}
            className={`mx-auto d-block img-fluid ${classes.imgClass}`}
            alt="Plan img"
          />
          <h3 className="font-size-xxl font-weight-bold mt-4">{title}</h3>
          <p className="text-black-50 mb-4">{description}</p>
          <Button
            onClick={handleClick}
            className="btn-first"
            title="Selecionar">
            <span>{value}</span>
          </Button>
        </div>
        <div className="divider my-4" />
        <ul
          className={`list-unstyled text-left font-weight-bold font-size-sm ${classes.planList}`}>
          {features.map((el, index) => (
            <li className="px-4 py-2" key={index}>
              <div className="badge badge-success badge-circle-inner mr-2">
                Success
              </div>
              {el}
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.paperRoot }}>
      {selectedPlan ? (
        <Subscription
          selectedPlan={selectedPlan}
          goBack={() => setSelectedPlan('')}
          sendPayment={sendPayment}
        />
      ) : (
        <Plans />
      )}
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendPayment }, dispatch);

export default connect(null, mapDispatchToProps)(PaymentModal);
