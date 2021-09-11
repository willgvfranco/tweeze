import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import PageTitle from '../components/PageTitle';
import PaymentModal from '../components/PaymentModal';
import placeholder from '../assets/images/illustrations/pack1/time.svg';

import { resetStatusState } from '../reducers/PaymentDuck';

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

const Home = ({ paymentStatus, resetStatusState, paymentRefused }) => {
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    return () => {
      resetStatusState();
    };
  }, []);

  useEffect(() => {
    if (paymentStatus === 'paymentSuccess') {
      setSuccessMessage('Pagamento enviado com sucesso!');
      setOpenSuccess(true);
      setOpen(false);
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (!paymentRefused) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [paymentRefused]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  return (
    <>
      <PageTitle
        titleHeading="Tweeze Dashboard"
        titleDescription="Painel de controle de inteligência da Tweeze"
      />

      <Card
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        className="rounded w-100 bg-white mt-3 p-3">
        <div style={{ fontSize: '1.8rem', opacity: '0.8' }}>
          Em construção..
        </div>
        <img
          alt="..."
          className="img-fluid"
          src={placeholder}
          style={{ width: '50%' }}
        />
      </Card>

      <Snackbar
        open={openSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={5000}>
        <Message severity="success" onClose={handleClose}>
          {successMessage}
        </Message>
      </Snackbar>

      <PaymentModal open={open} />
    </>
  );
};

const mapStateToProps = ({ payment }) => ({
  paymentStatus: payment.status,
  paymentRefused: !!payment.refuse
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetStatusState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
