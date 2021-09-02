import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaskedInput from 'react-maskedinput';
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
  FormControlLabel,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { sendPayment, resetErrorState } from '../reducers/AuthDuck';

import svgImage1 from '../assets/images/illustrations/pack4/business_plan.svg';
import svgImage2 from '../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage3 from '../assets/images/illustrations/pack4/powerful.svg';

import { GetCardType } from '../utils/validations';

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    width: '75vw',
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
  },
  paymentWrapper: {
    display: 'flex',
    padding: '2rem 2rem 5rem',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 3rem 5rem'
    }
  },
  paymentBtn: {
    margin: '5rem auto 0 auto',
    width: '20rem',
    fontSize: '1.2rem',
    [theme.breakpoints.down('lg')]: {
      margin: '3rem auto 0 auto'
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2rem auto 0 auto'
    }
  }
}));

const CardNumberMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask="1111 1111 1111 1111"
      size="19"
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
    />
  );
};

const CpfMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask="111.111.111-11"
      size="14"
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
    />
  );
};

const ExpireDateMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask="11/1111"
      size="7"
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
    />
  );
};

const PhoneMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask="(11) 11111-1111"
      size="15"
      style={{ width: '100%' }}
      placeholderChar={'\u2000'}
    />
  );
};

const Message = (props) => {
  return (
    <Alert
      elevation={6}
      variant="filled"
      {...props}
      style={{ color: 'white', fontSize: '16px' }}
    />
  );
};

const Subscription = ({
  selectedPlan,
  goBack,
  sendPayment,
  loading,
  setLoading
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [creditCard, setCreditCard] = useState({
    number: '',
    name: '',
    brand: '',
    cvv: '',
    expire: '',
    cpf: '',
    birthday: null,
    phone: ''
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    cpf: ''
  });

  const handleDateChange = (date) =>
    setCreditCard({
      ...creditCard,
      birthday: date
    });

  const handleCardFormChange = (event) => {
    if (event.target.id === 'cvv') {
      if (event.target.value.length <= 4 && !isNaN(event.target.value)) {
        setCreditCard({
          ...creditCard,
          [event.target.id]: event.target.value
        });
      }
      return;
    }

    if (event.target.id === 'number') {
      setCreditCard({
        ...creditCard,
        [event.target.id]: event.target.value,
        brand: GetCardType(event.target.value) || ''
      });
      return;
    }

    setCreditCard({
      ...creditCard,
      [event.target.id || event.target.name]: event.target.value
    });
  };

  const handleUserFormChange = (event) =>
    setUserInfo({
      ...userInfo,
      [event.target.id]: event.target.value
    });

  const isEmpty = (type) => {
    if (type === 'creditCard') {
      return (
        creditCard.number === '' ||
        creditCard.name === '' ||
        creditCard.expire === '' ||
        creditCard.cpf === '' ||
        creditCard.cvv === '' ||
        creditCard.phone === '' ||
        !creditCard.birthday
      );
    }
    if (type === 'userInfo') {
      return userInfo.name === '' || userInfo.cpf === '';
    }
  };

  const hasEmptyFields = () => {
    if (checked) {
      return isEmpty('creditCard') || isEmpty('userInfo');
    }
    return isEmpty('creditCard');
  };

  const handleSend = () => {
    if (hasEmptyFields()) {
      return;
    }

    setLoading(true);
    if (checked) {
      sendPayment({
        card: { ...creditCard },
        user: { ...userInfo }
      });
    } else {
      sendPayment({ card: { ...creditCard } });
    }
  };

  return (
    <Card className={`rounded w-100 bg-white mt-3 ${classes.paymentWrapper}`}>
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
          <CardHeader
            subheader="Informações do titular do cartão"
            style={{ padding: '0 8px' }}
          />
        </Grid>
        <Grid item xl={4} md={6} xs={12}>
          <TextField
            id="number"
            value={creditCard.number}
            onChange={handleCardFormChange}
            name="number"
            InputProps={{
              inputComponent: CardNumberMask
            }}
            label="Número do cartão"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={4} md={6} xs={12}>
          <TextField
            id="name"
            value={creditCard.name}
            onChange={handleCardFormChange}
            label="Nome do Titular"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={4} md={6} xs={12}>
          <TextField
            id="cpf"
            value={creditCard.cpf}
            onChange={handleCardFormChange}
            InputProps={{
              inputComponent: CpfMask
            }}
            label="CPF"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={4} md={6} xs={12}>
          <TextField
            id="phone"
            value={creditCard.phone}
            onChange={handleCardFormChange}
            InputProps={{
              inputComponent: PhoneMask
            }}
            label="Telefone"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={2} md={4} xs={12}>
          <TextField
            id="cvv"
            value={creditCard.cvv}
            onChange={handleCardFormChange}
            label="CVV"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={2} md={4} xs={12}>
          <TextField
            id="expire"
            value={creditCard.expire}
            onChange={handleCardFormChange}
            InputProps={{
              inputComponent: ExpireDateMask
            }}
            label="Data de expiração"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xl={4} md={4} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
            <KeyboardDatePicker
              style={{ marginTop: 0 }}
              variant="inline"
              disableFuture
              format="dd/MM/yyyy"
              margin="normal"
              id="birthdate"
              label="Data de Nascimento"
              inputVariant="outlined"
              value={creditCard.birthday}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            color="primary"
          />
        }
        style={{ margin: '1rem 0 1rem 0.5rem' }}
        label="Titularidade diferente"
      />

      <Grid container spacing={2}>
        <Grid item xl={4} md={6} xs={12}>
          <TextField
            className={!checked && classes.sameUserClass}
            id="name"
            label="Nome"
            value={userInfo.name}
            onChange={handleUserFormChange}
            variant="outlined"
            disabled={!checked}
            fullWidth
          />
        </Grid>

        <Grid item xl={4} md={6} xs={12}>
          <TextField
            className={!checked && classes.sameUserClass}
            id="cpf"
            value={userInfo.cpf}
            onChange={handleUserFormChange}
            InputProps={{
              inputComponent: CpfMask
            }}
            label="CPF"
            variant="outlined"
            disabled={!checked}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        className={`btn-primary ${classes.paymentBtn}`}
        onClick={handleSend}
        disabled={hasEmptyFields()}>
        {loading ? (
          <CircularProgress
            style={{
              width: '18px',
              height: '18px',
              color: 'white'
            }}
          />
        ) : (
          'Enviar pagamento'
        )}
      </Button>
    </Card>
  );
};

const PaymentModal = ({
  open,
  onClose,
  sendPayment,
  authError,
  resetErrorState
}) => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [openWarning, setOpenWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      resetErrorState();
    };
  }, []);

  useEffect(() => {
    if (authError === 'wrongCard') {
      setWarningMessage('Cartão incorreto!');
      setOpenWarning(true);
      setLoading(false);
    } else if (authError !== '') {
      setWarningMessage('Erro ao enviar o pagamento');
      setOpenWarning(true);
      setLoading(false);
    }
  }, [authError]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenWarning(false);
  };

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
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <Plans />
      )}

      <Snackbar
        open={openWarning}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={5000}>
        <Message severity="error" onClose={handleClose}>
          {warningMessage}
        </Message>
      </Snackbar>
    </Dialog>
  );
};

const mapStateToProps = ({ auth }) => ({
  authError: auth.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendPayment, resetErrorState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
