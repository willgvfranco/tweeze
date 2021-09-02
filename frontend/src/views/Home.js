import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import PageTitle from '../components/PageTitle';
import PaymentModal from '../components/PaymentModal';
import placeholder from '../assets/images/illustrations/pack1/time.svg';

import { resetStatusState } from '../reducers/AuthDuck';

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

const Home = ({ authStatus, resetStatusState }) => {
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    return () => {
      resetStatusState();
    };
  }, []);

  useEffect(() => {
    if (authStatus === 'paymentSuccess') {
      setSuccessMessage('Pagamento enviado com sucesso!');
      setOpenSuccess(true);
      setOpen(false);
    }
  }, [authStatus]);

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
        <Button className="btn-primary m-2" onClick={() => setOpen(true)}>
          Payment
        </Button>
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

      <PaymentModal open={open} onClose={() => setOpen(!open)} />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  authStatus: auth.status
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ resetStatusState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
